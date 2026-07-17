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
import "./posts.css";

// ─── Demo fallback — rendered locally, never written to Firestore ──────────
const DEMO_POSTS = [
  {
    id: "demo-1",
    title: "Welcome to Dazzle Dance Studio",
    excerpt:
      "We officially opened our doors and we couldn't be more excited. From hip-hop fundamentals to advanced breaking — this is your home court.",
    imageUrl:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
    category: "Studio News",
    createdAt: { toDate: () => new Date("2026-06-01") },
    readTime: "3 min read",
  },
  {
    id: "demo-2",
    title: "Summer Hip-Hop Workshop Recap",
    excerpt:
      "Three days, forty dancers, one unforgettable cypher. Here's everything that went down at our inaugural summer intensive.",
    imageUrl:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
    category: "Workshops",
    createdAt: { toDate: () => new Date("2026-06-18") },
    readTime: "5 min read",
  },
  {
    id: "demo-3",
    title: "Meet Our New Instructors",
    excerpt:
      "We're thrilled to welcome three world-class educators to the Dazzle faculty — each bringing a unique movement language to our curriculum.",
    imageUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    category: "Instructors",
    createdAt: { toDate: () => new Date("2026-07-02") },
    readTime: "4 min read",
  },
  {
    id: "demo-4",
    title: "Breaking Down the Basics: Footwork 101",
    excerpt:
      "Good technique starts at ground level. Our lead breaking coach breaks down the six foundational footwork patterns every dancer needs to master.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    category: "Tutorials",
    createdAt: { toDate: () => new Date("2026-07-10") },
    readTime: "6 min read",
  },
];

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
  if (post.content) {
    const plain = post.content.replace(/<[^>]*>/g, "");
    return plain.length > 140 ? plain.slice(0, 140).trim() + "…" : plain;
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
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const fetched = await postService.getAllPosts();
        if (cancelled) return;

        if (fetched && fetched.length > 0) {
          setPosts(fetched);
        } else {
          // DB empty — silently fall back to demo data, no writes
          setPosts(DEMO_POSTS);
          setUsingDemo(true);
        }
      } catch {
        // On any error (permissions, network) — fall back gracefully
        if (!cancelled) {
          setPosts(DEMO_POSTS);
          setUsingDemo(true);
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

  // ─────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="posts-page">
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
        {/* ── Error fallback notice (demo mode) ── */}
        {!loading && usingDemo && !error && (
          <div className="posts-demo-notice" role="status">
            <Sparkles size={14} strokeWidth={2} />
            Showing demo content — connect to Firestore to load live posts.
          </div>
        )}

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
          <div className="posts-grid">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* ── Empty state (filtered to nothing) ── */}
        {!loading && filtered.length === 0 && (
          <div className="posts-empty">
            <div className="posts-empty-icon">
              <Newspaper size={36} strokeWidth={1.5} />
            </div>
            <div className="posts-empty-title">No posts in this category</div>
            <div className="posts-empty-desc">
              Try selecting a different category, or check back soon for new
              articles.
            </div>
            <button
              className="posts-filter-pill posts-filter-active"
              onClick={() => setActiveCategory("All")}
              style={{ marginTop: "0.5rem" }}
            >
              Show All Posts
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
