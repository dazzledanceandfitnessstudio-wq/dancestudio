// // app/post/[id]/page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { postService } from "../../../lib/firebaseService";
// import { Calendar, ArrowLeft, Tag, Sparkles } from "lucide-react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import { authService } from "../../../lib/firebaseService";

// function formatDate(timestamp) {
//   if (!timestamp) return "";
//   const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//   return d.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// // Helper to extract post ID from slug (handles both old and new URL formats)
// function extractPostId(slug) {
//   if (!slug) return null;
//   // If slug contains '-', extract everything after the last '-'
//   // This handles both: "post-id-xyz123" and just "xyz123"
//   if (slug.includes('-')) {
//     const parts = slug.split('-');
//     // Check if the last part looks like a Firebase ID (contains letters and numbers)
//     const lastPart = parts[parts.length - 1];
//     // Firebase IDs are typically 20 characters with letters and numbers
//     if (lastPart.length >= 10) {
//       return lastPart;
//     }
//     // If last part is too short, join all parts after first one
//     // This handles cases where the ID might contain hyphens
//     return parts.slice(1).join('-');
//   }
//   return slug;
// }

// export default function SinglePostPage() {
//   const params = useParams();
//   const slug = params.id;
  
//   // Extract actual post ID from the slug
//   const postId = extractPostId(slug);
  
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);

//   // ── Auth state ──
//   useEffect(() => {
//     let mounted = true;

//     authService.getCurrentUser().then((currentUser) => {
//       if (mounted) setUser(currentUser);
//     });

//     const firebaseAuth = authService.auth || authService.getAuth?.();
//     let unsubscribe = null;
//     if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
//       unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
//         if (mounted) setUser(u);
//       });
//     }

//     return () => {
//       mounted = false;
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   // ── Actions ──
//   const handleSignIn = async () => {
//     try {
//       const result = await authService.signInWithGoogle();
//       if (result.success) {
//         setUser(result.user);
//       }
//     } catch (err) {
//       console.error("Sign in failed:", err);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await authService.signOut();
//       setUser(null);
//     } catch (err) {
//       console.error("Sign out failed:", err);
//     }
//   };

//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       if (!postId) {
//         setError("No post ID provided");
//         setLoading(false);
//         return;
//       }
      
//       try {
//         const fetched = await postService.getPost(postId);
        
//         if (cancelled) return;

//         if (fetched) {
//           setPost(fetched);
//         } else {
//           setError("Post not found.");
//         }
//       } catch (err) {
//         console.error("Error fetching post:", err);
//         if (!cancelled) {
//           setError(err.message || "Failed to load post.");
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [postId]);

//   if (loading) {
//     return (
//       <div className="posts-page">
//         <Header 
//           user={user} 
//           onSignIn={handleSignIn} 
//           onSignOut={handleSignOut} 
//         />
//         <div style={{ 
//           maxWidth: "800px", 
//           margin: "4rem auto", 
//           padding: "0 1.5rem",
//           textAlign: "center",
//           color: "var(--body-text, #B0A8C0)"
//         }}>
//           <div style={{ 
//             width: "60px", 
//             height: "60px", 
//             borderRadius: "50%",
//             border: "3px solid var(--border, #2D2840)",
//             borderTopColor: "var(--primary, #FF1F6D)",
//             animation: "spin 0.8s linear infinite",
//             margin: "0 auto 1.5rem"
//           }} />
//           <p>Loading post...</p>
//         </div>
//         <Footer />
//         <style>{`
//           @keyframes spin {
//             to { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error || !post) {
//     return (
//       <div className="posts-page">
//         <Header 
//           user={user} 
//           onSignIn={handleSignIn} 
//           onSignOut={handleSignOut} 
//         />
//         <div style={{ 
//           maxWidth: "800px", 
//           margin: "4rem auto", 
//           padding: "0 1.5rem",
//           textAlign: "center"
//         }}>
//           <div style={{
//             padding: "3rem",
//             background: "var(--surface, #16131F)",
//             border: "1px solid var(--border, #2D2840)",
//             borderRadius: "16px"
//           }}>
//             <h2 style={{ color: "var(--foreground, #F5F3F7)", marginBottom: "0.5rem" }}>
//               ⚠️ {error || "Post not found"}
//             </h2>
//             <p style={{ color: "var(--body-text, #B0A8C0)", marginBottom: "1rem", fontSize: "0.875rem" }}>
//               Post ID: {postId}
//             </p>
//             <Link href="/posts" style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "0.5rem",
//               color: "var(--primary, #FF1F6D)",
//               fontWeight: "600",
//               textDecoration: "none"
//             }}>
//               <ArrowLeft size={18} />
//               Back to Posts
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const category = post.category || post.tag || "Studio News";
//   const postContent = post.description || post.content || post.excerpt || "No content available.";

//   return (
//     <div className="posts-page">
//       <Header 
//         user={user} 
//         onSignIn={handleSignIn} 
//         onSignOut={handleSignOut} 
//       />

//       <header style={{
//         background: "var(--surface, #16131F)",
//         borderBottom: "1px solid var(--border, #2D2840)",
//         position: "relative",
//         overflow: "hidden",
//         padding: "3rem 1.25rem 2.5rem"
//       }}>
//         <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
//           <div style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "0.375rem",
//             fontFamily: "var(--font-display, Poppins)",
//             fontSize: "0.75rem",
//             fontWeight: "700",
//             textTransform: "uppercase",
//             letterSpacing: "0.08em",
//             color: "var(--primary, #FF1F6D)",
//             background: "rgba(255,31,109,0.07)",
//             padding: "0.3rem 0.875rem",
//             borderRadius: "999px",
//             marginBottom: "1rem"
//           }}>
//             <Sparkles size={13} strokeWidth={2.5} />
//             Dazzle Dance Studio
//           </div>
          
//           <h1 style={{
//             fontFamily: "var(--font-display, Poppins)",
//             fontSize: "2.5rem",
//             fontWeight: "800",
//             color: "var(--foreground, #F5F3F7)",
//             margin: "0 0 0.875rem",
//             lineHeight: "1.15"
//           }}>
//             {post.title}
//           </h1>
          
//           <div style={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "0.75rem",
//             color: "var(--body-text, #B0A8C0)",
//             fontSize: "0.875rem"
//           }}>
//             <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
//               <Calendar size={14} strokeWidth={2} />
//               {formatDate(post.createdAt)}
//             </span>
//             <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
//               <Tag size={14} strokeWidth={2} />
//               {category}
//             </span>
//           </div>
//         </div>
//         <div style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: "3px",
//           background: "var(--gradient-cta, linear-gradient(135deg, #FF1F6D, #00E5FF))"
//         }} />
//       </header>

//       <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
//         {post.imageUrl && (
//           <div style={{
//             borderRadius: "16px",
//             overflow: "hidden",
//             marginBottom: "2rem",
//             background: "var(--surface-alt, #1E1A28)"
//           }}>
//             <img 
//               src={post.imageUrl} 
//               alt={post.title}
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         )}

//         {post.description ? (
//           <div style={{
//             fontSize: "1.0625rem",
//             lineHeight: "1.8",
//             color: "var(--foreground, #F5F3F7)"
//           }}>
//             {post.description}
//           </div>
//         ) : post.content ? (
//           <div 
//             dangerouslySetInnerHTML={{ __html: post.content }}
//             style={{
//               fontSize: "1.0625rem",
//               lineHeight: "1.8",
//               color: "var(--foreground, #F5F3F7)"
//             }}
//           />
//         ) : post.excerpt ? (
//           <p style={{
//             fontSize: "1.0625rem",
//             lineHeight: "1.8",
//             color: "var(--foreground, #F5F3F7)"
//           }}>
//             {post.excerpt}
//           </p>
//         ) : (
//           <p style={{
//             fontSize: "1.0625rem",
//             lineHeight: "1.8",
//             color: "var(--body-text, #B0A8C0)",
//             textAlign: "center"
//           }}>
//             No content available.
//           </p>
//         )}

//         <Link href="/posts" style={{
//           display: "inline-flex",
//           alignItems: "center",
//           gap: "0.5rem",
//           marginTop: "2.5rem",
//           color: "var(--primary, #FF1F6D)",
//           fontWeight: "600",
//           textDecoration: "none"
//         }}>
//           <ArrowLeft size={18} />
//           Back to Posts
//         </Link>
//       </main>

//       <Footer />
//     </div>
//   );
// }




// app/post/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { postService } from "../../../lib/firebaseService";
import { Calendar, ArrowLeft, Tag, Sparkles } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { authService } from "../../../lib/firebaseService";

function formatDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Helper to extract post ID from slug
function extractPostId(slug) {
  if (!slug) return null;
  if (slug.includes('-')) {
    const parts = slug.split('-');
    const lastPart = parts[parts.length - 1];
    if (lastPart.length >= 10) return lastPart;
    return parts.slice(1).join('-');
  }
  return slug;
}

// 🔍 YouTube Video ID extractor
function extractYouTubeId(url) {
  if (!url || typeof url !== "string") return null;
  const match = url.match(
    /(?:v=|youtu\.be\/|shorts\/|embed\/|\/v\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

// 🎬 Responsive YouTube Embed
function YouTubeEmbed({ videoId, title = "YouTube video" }) {
  if (!videoId) return null;
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        borderRadius: "16px",
        marginBottom: "1.5rem",
        background: "var(--surface-alt, #1E1A28)",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

// 🔁 Text ke andar jitne bhi YouTube links hain, unhe video se replace karo
function renderContentWithVideos(text, title) {
  if (!text) return null;

  // YouTube URL ka broad regex (watch, youtu.be, shorts, embed)
  const urlRegex =
    /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|shorts\/|v\/)?([a-zA-Z0-9_-]{11})[^\s]*/g;

  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    // Link se pehle ka text add karo
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${key++}`}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }

    // Link ki jagah video embed karo
    const videoId = match[5];
    parts.push(
      <YouTubeEmbed key={`video-${key++}`} videoId={videoId} title={title} />
    );

    lastIndex = match.index + match[0].length;
  }

  // Bache hue text ko add karo
  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-${key++}`}>{text.slice(lastIndex)}</span>
    );
  }

  // Agar koi link nahi mila, to pura text return karo
  if (parts.length === 0) {
    return <span>{text}</span>;
  }

  return parts;
}

export default function SinglePostPage() {
  const params = useParams();
  const slug = params.id;
  const postId = extractPostId(slug);

  const [post, setPost] = useState(null);
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
      if (result.success) setUser(result.user);
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
      if (!postId) {
        setError("No post ID provided");
        setLoading(false);
        return;
      }

      try {
        const fetched = await postService.getPost(postId);
        if (cancelled) return;

        if (fetched) {
          setPost(fetched);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        if (!cancelled) setError(err.message || "Failed to load post.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (loading) {
    return (
      <div className="posts-page">
        <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
        <div style={{
          maxWidth: "800px", margin: "4rem auto", padding: "0 1.5rem",
          textAlign: "center", color: "var(--body-text, #B0A8C0)"
        }}>
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            border: "3px solid var(--border, #2D2840)",
            borderTopColor: "var(--primary, #FF1F6D)",
            animation: "spin 0.8s linear infinite", margin: "0 auto 1.5rem"
          }} />
          <p>Loading post...</p>
        </div>
        <Footer />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="posts-page">
        <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
        <div style={{
          maxWidth: "800px", margin: "4rem auto", padding: "0 1.5rem", textAlign: "center"
        }}>
          <div style={{
            padding: "3rem", background: "var(--surface, #16131F)",
            border: "1px solid var(--border, #2D2840)", borderRadius: "16px"
          }}>
            <h2 style={{ color: "var(--foreground, #F5F3F7)", marginBottom: "0.5rem" }}>
              ⚠️ {error || "Post not found"}
            </h2>
            <p style={{ color: "var(--body-text, #B0A8C0)", marginBottom: "1rem", fontSize: "0.875rem" }}>
              Post ID: {postId}
            </p>
            <Link href="/posts" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              color: "var(--primary, #FF1F6D)", fontWeight: "600", textDecoration: "none"
            }}>
              <ArrowLeft size={18} />
              Back to Posts
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category = post.category || post.tag || "Studio Vibes";

  // Post-level video link (agar alag field me diya ho)
  const postVideoId =
    extractYouTubeId(post.youtubeUrl) ||
    extractYouTubeId(post.videoUrl) ||
    extractYouTubeId(post.youtubeLink) ||
    extractYouTubeId(post.videoLink) ||
    extractYouTubeId(post.link);

  // Text content (description/content/excerpt)
  const textContent = post.description || post.content || post.excerpt || "";

  // Text ke andar YouTube link hai ya nahi
  const textHasYouTubeLink = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(textContent);

  return (
    <div className="posts-page">
      <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />

      <header style={{
        background: "var(--surface, #16131F)",
        borderBottom: "1px solid var(--border, #2D2840)",
        position: "relative", overflow: "hidden",
        padding: "3rem 1.25rem 2.5rem"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            fontFamily: "var(--font-display, Poppins)", fontSize: "0.75rem",
            fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em",
            color: "var(--primary, #FF1F6D)", background: "rgba(255,31,109,0.07)",
            padding: "0.3rem 0.875rem", borderRadius: "999px", marginBottom: "1rem"
          }}>
            <Sparkles size={13} strokeWidth={2.5} />
            Dazzle Dance Studio
          </div>

          <h1 style={{
            fontFamily: "var(--font-display, Poppins)", fontSize: "2.5rem",
            fontWeight: "800", color: "var(--foreground, #F5F3F7)",
            margin: "0 0 0.875rem", lineHeight: "1.15"
          }}>
            {post.title}
          </h1>

          <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "center", gap: "0.75rem",
            color: "var(--body-text, #B0A8C0)", fontSize: "0.875rem"
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={14} strokeWidth={2} />
              {formatDate(post.createdAt)}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Tag size={14} strokeWidth={2} />
              {category}
            </span>
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
          background: "var(--gradient-cta, linear-gradient(135deg, #FF1F6D, #00E5FF))"
        }} />
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* 🖼️ Image wali jagah — photo pehle priority, video sirf tab jab photo na ho */}
        {post.imageUrl ? (
          <div style={{
            borderRadius: "16px", overflow: "hidden", marginBottom: "2rem",
            background: "var(--surface-alt, #1E1A28)"
          }}>
            <img
              src={post.imageUrl}
              alt={post.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ) : postVideoId ? (
          <YouTubeEmbed videoId={postVideoId} title={post.title} />
        ) : null}

        {/* 📝 Text content — jahan-jahan YouTube link hai wahan video embed ho */}
        {textContent ? (
          textHasYouTubeLink ? (
            <div style={{
              fontSize: "1.0625rem", lineHeight: "1.8",
              color: "var(--foreground, #F5F3F7)"
            }}>
              {renderContentWithVideos(textContent, post.title)}
            </div>
          ) : post.description ? (
            <div style={{
              fontSize: "1.0625rem", lineHeight: "1.8",
              color: "var(--foreground, #F5F3F7)"
            }}>
              {post.description}
            </div>
          ) : post.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: "1.0625rem", lineHeight: "1.8",
                color: "var(--foreground, #F5F3F7)"
              }}
            />
          ) : (
            <p style={{
              fontSize: "1.0625rem", lineHeight: "1.8",
              color: "var(--foreground, #F5F3F7)"
            }}>
              {post.excerpt}
            </p>
          )
        ) : (
          <p style={{
            fontSize: "1.0625rem", lineHeight: "1.8",
            color: "var(--body-text, #B0A8C0)", textAlign: "center"
          }}>
            No content available.
          </p>
        )}

        <Link href="/posts" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          marginTop: "2.5rem", color: "var(--primary, #FF1F6D)",
          fontWeight: "600", textDecoration: "none"
        }}>
          <ArrowLeft size={18} />
          Back to Posts
        </Link>
      </main>

      <Footer />
    </div>
  );
}