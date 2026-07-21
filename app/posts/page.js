"use client";

import { useState, useEffect } from "react";
import { postService } from "../../lib/firebaseService";
import {
  Calendar,
  ArrowRight,
  Newspaper,
  Tag,
  Loader2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authService } from "../../lib/firebaseService";

// ─── No Demo Fallback ──────────────────────────────────────────

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getExcerpt(post) {
  if (post.excerpt) return post.excerpt;
  if (post.description) return post.description;
  if (post.content) {
    const plain = post.content.replace(/<[^>]*>/g, "");
    return plain.length > 200 ? plain.slice(0, 200).trim() + "…" : plain;
  }
  return "";
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="posts-skeleton-card" aria-hidden="true">
      <div className="posts-skeleton posts-skeleton-img" />
      <div className="posts-skeleton-body">
        <div className="posts-skeleton posts-skeleton-tag" />
        <div className="posts-skeleton posts-skeleton-title" />
        <div className="posts-skeleton posts-skeleton-line" />
        <div className="posts-skeleton posts-skeleton-line posts-skeleton-line-short" />
      </div>
    </div>
  );
}

// ─── Post Card ───────────────────────────────────────────────────────────────
function PostCard({ post, index }) {
  const excerpt = getExcerpt(post);
  const category = post.category || post.tag || "Studio News";

  return (
    <article
      className="post-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Image */}
      <a href={`/post/${post.id}`} className="post-card-img-wrap" tabIndex={-1} aria-hidden="true">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} loading="lazy" />
        ) : (
          <div className="post-card-img-placeholder">
            <Newspaper size={40} strokeWidth={1.5} />
          </div>
        )}
        <div className="post-card-img-scrim" />
      </a>

      {/* Body */}
      <div className="post-card-body">
        {/* Category pill */}
        <div className="post-card-meta-row">
          <span className="post-card-tag">
            <Tag size={11} strokeWidth={2.5} />
            {category}
          </span>
          {post.readTime && (
            <span className="post-card-readtime">{post.readTime}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="post-card-title">
          <a href={`/post/${post.id}`}>{post.title}</a>
        </h3>

        {/* Excerpt */}
        {excerpt && <p className="post-card-excerpt">{excerpt}</p>}

        {/* Date + CTA */}
        <div className="post-card-footer">
          <span className="post-card-date">
            <Calendar size={13} strokeWidth={2} />
            {formatDate(post.createdAt)}
          </span>
          <a
            href={`/post/${post.id}`}
            className="post-card-cta"
            id={`posts-read-more-${post.id}`}
          >
            Read More
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // ── Auth state ──
  useEffect(() => {
    let mounted = true;

    authService.getCurrentUser().then((currentUser) => {
      if (mounted) setUser(currentUser);
    });

    const firebaseAuth = authService.auth || authService.getAuth?.();
    let unsubscribe = null;
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
      unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
        if (mounted) setUser(u);
      });
    }

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // ── Actions ──
  const handleSignIn = async () => {
    try {
      const result = await authService.signInWithGoogle();
      if (result.success) {
        setUser(result.user);
      }
    } catch (err) {
      console.error("Sign in failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const fetched = await postService.getAllPosts();
        if (cancelled) return;

        if (fetched && fetched.length > 0) {
          setPosts(fetched);
        } else {
          setPosts([]);
        }
      } catch (err) {
        if (!cancelled) {
          setPosts([]);
          setError("Failed to load posts.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Category filter derived from live posts ──
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(
      posts
        .map((p) => p.category || p.tag || "Studio News")
        .filter(Boolean)
    ),
  ];

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter(
          (p) => (p.category || p.tag || "Studio News") === activeCategory
        );

  // ── Load more (show 10 then load more) ──
  const [visibleCount, setVisibleCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 10, filtered.length));
      setLoadingMore(false);
    }, 500);
  };

  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // ─────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="posts-page">
      {/* 🔥 FIX: Pass user props to Header */}
      <Header 
        user={user} 
        onSignIn={handleSignIn} 
        onSignOut={handleSignOut} 
      />
      
      {/* ── Hero ── */}
      <header className="posts-hero">
        <div className="posts-hero-inner">
          <p className="posts-eyebrow">
            <Sparkles size={13} strokeWidth={2.5} />
            Dazzle Dance Studio
          </p>
          <h1 className="posts-hero-title">Studio News &amp; Updates</h1>
          <p className="posts-hero-subtitle">
            Behind-the-scenes stories, workshop recaps, instructor spotlights,
            and everything happening on and off the floor.
          </p>
          {!loading && posts.length > 0 && (
            <div className="posts-hero-count">
              {posts.length} Article{posts.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
        {/* Decorative accent bar */}
        <div className="posts-hero-bar" aria-hidden="true" />
      </header>

      <main className="posts-container">
        {/* ── Explicit error banner ── */}
        {error && (
          <div className="posts-error" role="alert">
            <AlertTriangle size={16} strokeWidth={2} />
            {error}
          </div>
        )}

        {/* ── Category filter pills ── */}
        {!loading && categories.length > 1 && (
          <div className="posts-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`posts-filter-pill${
                  activeCategory === cat ? " posts-filter-active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
                id={`posts-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Loading skeletons ── */}
        {loading && (
          <div className="posts-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Post Grid ── */}
        {!loading && filtered.length > 0 && (
          <>
            <div className="posts-grid">
              {visiblePosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* ── Load More Button ── */}
            {hasMore && (
              <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                <button
                  className="posts-load-more"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 2rem",
                    borderRadius: "50px",
                    border: "2px solid var(--primary, #FF1F6D)",
                    color: "var(--primary, #FF1F6D)",
                    fontWeight: "600",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "1rem",
                    fontFamily: "var(--font-body, Inter)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--primary, #FF1F6D)";
                    e.target.style.color = "#fff";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(255,31,109,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "var(--primary, #FF1F6D)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 size={18} className="ld-spin" />
                      Loading…
                    </>
                  ) : (
                    <>
                      Load More
                      <ArrowRight size={18} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Empty state (no posts globally or filtered) ── */}
        {!loading && filtered.length === 0 && !error && (
          <div className="posts-empty">
            <div className="posts-empty-icon">
              <Newspaper size={36} strokeWidth={1.5} />
            </div>
            <div className="posts-empty-title">
              {activeCategory === "All"
                ? "No posts available."
                : "No posts in this category"}
            </div>
            <div className="posts-empty-desc">
              {activeCategory === "All"
                ? "Check back later for studio news and updates."
                : "Try selecting a different category, or check back soon for new articles."}
            </div>
            {activeCategory !== "All" && (
              <button
                className="posts-filter-pill posts-filter-active"
                onClick={() => setActiveCategory("All")}
                style={{ marginTop: "0.5rem" }}
              >
                Show All Posts
              </button>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}







// "use client";

// import { useState, useEffect } from "react";
// import { postService } from "../../lib/firebaseService";
// import {
//   Calendar,
//   ArrowRight,
//   Newspaper,
//   Tag,
//   Loader2,
//   AlertTriangle,
//   Sparkles,
// } from "lucide-react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// // ─── No Demo Fallback ──────────────────────────────────────────

// // ─── Helpers ────────────────────────────────────────────────────────────────
// function formatDate(timestamp) {
//   if (!timestamp) return "";
//   const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//   return d.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// function getExcerpt(post) {
//   if (post.excerpt) return post.excerpt;
//   if (post.content) {
//     const plain = post.content.replace(/<[^>]*>/g, "");
//     return plain.length > 140 ? plain.slice(0, 140).trim() + "…" : plain;
//   }
//   return "";
// }

// // ─── Skeleton Card ───────────────────────────────────────────────────────────
// function SkeletonCard() {
//   return (
//     <div className="posts-skeleton-card" aria-hidden="true">
//       <div className="posts-skeleton posts-skeleton-img" />
//       <div className="posts-skeleton-body">
//         <div className="posts-skeleton posts-skeleton-tag" />
//         <div className="posts-skeleton posts-skeleton-title" />
//         <div className="posts-skeleton posts-skeleton-line" />
//         <div className="posts-skeleton posts-skeleton-line posts-skeleton-line-short" />
//       </div>
//     </div>
//   );
// }

// // ─── Post Card ───────────────────────────────────────────────────────────────
// function PostCard({ post, index }) {
//   const excerpt = getExcerpt(post);
//   const category = post.category || post.tag || "Studio News";

//   return (
//     <article
//       className="post-card"
//       style={{ animationDelay: `${index * 0.07}s` }}
//     >
//       {/* Image */}
//       <a href={`/post/${post.id}`} className="post-card-img-wrap" tabIndex={-1} aria-hidden="true">
//         {post.imageUrl ? (
//           <img src={post.imageUrl} alt={post.title} loading="lazy" />
//         ) : (
//           <div className="post-card-img-placeholder">
//             <Newspaper size={40} strokeWidth={1.5} />
//           </div>
//         )}
//         <div className="post-card-img-scrim" />
//       </a>

//       {/* Body */}
//       <div className="post-card-body">
//         {/* Category pill */}
//         <div className="post-card-meta-row">
//           <span className="post-card-tag">
//             <Tag size={11} strokeWidth={2.5} />
//             {category}
//           </span>
//           {post.readTime && (
//             <span className="post-card-readtime">{post.readTime}</span>
//           )}
//         </div>

//         {/* Title */}
//         <h3 className="post-card-title">
//           <a href={`/post/${post.id}`}>{post.title}</a>
//         </h3>

//         {/* Excerpt */}
//         {excerpt && <p className="post-card-excerpt">{excerpt}</p>}

//         {/* Date + CTA */}
//         <div className="post-card-footer">
//           <span className="post-card-date">
//             <Calendar size={13} strokeWidth={2} />
//             {formatDate(post.createdAt)}
//           </span>
//           <a
//             href={`/post/${post.id}`}
//             className="post-card-cta"
//             id={`posts-read-more-${post.id}`}
//           >
//             Read More
//             <ArrowRight size={15} strokeWidth={2.5} />
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// }

// // ─── Main Page ───────────────────────────────────────────────────────────────
// export default function PostsPage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       try {
//         const fetched = await postService.getAllPosts();
//         if (cancelled) return;

//         if (fetched && fetched.length > 0) {
//           setPosts(fetched);
//         } else {
//           setPosts([]);
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setPosts([]);
//           setError("Failed to load posts.");
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // ── Category filter derived from live posts ──
//   const [activeCategory, setActiveCategory] = useState("All");

//   const categories = [
//     "All",
//     ...new Set(
//       posts
//         .map((p) => p.category || p.tag || "Studio News")
//         .filter(Boolean)
//     ),
//   ];

//   const filtered =
//     activeCategory === "All"
//       ? posts
//       : posts.filter(
//           (p) => (p.category || p.tag || "Studio News") === activeCategory
//         );

//   // ─────────────────────────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="posts-page">
//       <Header />
//       {/* ── Hero ── */}
//       <header className="posts-hero">
//         <div className="posts-hero-inner">
//           <p className="posts-eyebrow">
//             <Sparkles size={13} strokeWidth={2.5} />
//             Dazzle Dance Studio
//           </p>
//           <h1 className="posts-hero-title">Studio News &amp; Updates</h1>
//           <p className="posts-hero-subtitle">
//             Behind-the-scenes stories, workshop recaps, instructor spotlights,
//             and everything happening on and off the floor.
//           </p>
//           {!loading && posts.length > 0 && (
//             <div className="posts-hero-count">
//               {posts.length} Article{posts.length !== 1 ? "s" : ""}
//             </div>
//           )}
//         </div>
//         {/* Decorative accent bar */}
//         <div className="posts-hero-bar" aria-hidden="true" />
//       </header>

//       <main className="posts-container">
//         {/* ── Explicit error banner ── */}
//         {error && (
//           <div className="posts-error" role="alert">
//             <AlertTriangle size={16} strokeWidth={2} />
//             {error}
//           </div>
//         )}

//         {/* ── Category filter pills ── */}
//         {!loading && categories.length > 1 && (
//           <div className="posts-filters">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 className={`posts-filter-pill${
//                   activeCategory === cat ? " posts-filter-active" : ""
//                 }`}
//                 onClick={() => setActiveCategory(cat)}
//                 id={`posts-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* ── Loading skeletons ── */}
//         {loading && (
//           <div className="posts-grid">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         )}

//         {/* ── Post Grid ── */}
//         {!loading && filtered.length > 0 && (
//           <div className="posts-grid">
//             {filtered.map((post, i) => (
//               <PostCard key={post.id} post={post} index={i} />
//             ))}
//           </div>
//         )}

//         {/* ── Empty state (no posts globally or filtered) ── */}
//         {!loading && filtered.length === 0 && !error && (
//           <div className="posts-empty">
//             <div className="posts-empty-icon">
//               <Newspaper size={36} strokeWidth={1.5} />
//             </div>
//             <div className="posts-empty-title">
//               {activeCategory === "All"
//                 ? "No posts available."
//                 : "No posts in this category"}
//             </div>
//             <div className="posts-empty-desc">
//               {activeCategory === "All"
//                 ? "Check back later for studio news and updates."
//                 : "Try selecting a different category, or check back soon for new articles."}
//             </div>
//             {activeCategory !== "All" && (
//               <button
//                 className="posts-filter-pill posts-filter-active"
//                 onClick={() => setActiveCategory("All")}
//                 style={{ marginTop: "0.5rem" }}
//               >
//                 Show All Posts
//               </button>
//             )}
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }
