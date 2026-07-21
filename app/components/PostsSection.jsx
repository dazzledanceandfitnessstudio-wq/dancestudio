"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "./PostCard";

export default function PostsSection({ posts }) {
  // Debug: Check if posts are being received
  console.log("PostsSection received posts:", posts);
  
  if (!posts || posts.length === 0) {
    console.log("No posts to display");
    return null;
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1, 5);
  const hasMorePosts = posts.length > 5; // Only shows if more than 5 posts

  // Debug: Check values
  console.log("Total posts:", posts.length);
  console.log("Has more posts:", hasMorePosts);

  return (
    <section className="ld-section ld-container">
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <span style={{ 
            fontSize: "0.85rem", 
            fontWeight: "600", 
            letterSpacing: "0.1em",
            color: "var(--primary, #FF1F6D)",
            textTransform: "uppercase"
          }}>
            📰 Latest Updates
          </span>
          <h2 style={{ 
            fontSize: "2rem", 
            fontWeight: "700", 
            marginTop: "0.25rem",
            background: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Studio News
          </h2>
        </div>
      </div>

      {/* Desktop Layout: 1 Featured + 4 Grid */}
      <div className="desktop-layout" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
      }}>
        {/* Left - Featured Post */}
        <div style={{ gridColumn: "1 / 2" }}>
          <PostCard post={featuredPost} isFeatured={true} />
        </div>

        {/* Right - 4 Posts Grid */}
        <div style={{
          gridColumn: "2 / 3",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          alignContent: "start",
        }}>
          {remainingPosts.map((post) => (
            <PostCard key={post.id} post={post} isFeatured={false} />
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-layout" style={{
        display: "none",
        gridTemplateColumns: "1fr",
        gap: "1.5rem",
      }}>
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} isFeatured={false} />
        ))}
      </div>

      {/* More Posts Button - Always show if posts exist */}
      {posts.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link 
            href="/posts" 
            className="btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 2rem",
              borderRadius: "50px",
              border: "2px solid var(--primary, #FF1F6D)",
              color: "var(--primary, #FF1F6D)",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
              fontSize: "1rem",
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
            More Posts
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-layout {
            display: none !important;
          }
          .mobile-layout {
            display: grid !important;
          }
        }
      `}</style>
    </section>
  );
}








// "use client";

// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import PostCard from "./PostCard";

// export default function PostsSection({ posts }) {
//   if (!posts || posts.length === 0) {
//     return null;
//   }

//   const featuredPost = posts[0];
//   const remainingPosts = posts.slice(1, 5);
//   const hasMorePosts = posts.length > 5;

//   return (
//     <section className="ld-section ld-container">
//       <div style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "2rem",
//         flexWrap: "wrap",
//         gap: "1rem"
//       }}>
//         <div>
//           <span style={{ 
//             fontSize: "0.85rem", 
//             fontWeight: "600", 
//             letterSpacing: "0.1em",
//             color: "var(--ld-accent, #FF6B6B)",
//             textTransform: "uppercase"
//           }}>
//             📰 Latest Updates
//           </span>
//           <h2 style={{ 
//             fontSize: "2rem", 
//             fontWeight: "700", 
//             marginTop: "0.25rem",
//             background: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent"
//           }}>
//             Studio News
//           </h2>
//         </div>
//       </div>

//       {/* Desktop Layout: 1 Featured + 4 Grid */}
//       <div className="desktop-layout" style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr",
//         gap: "1.5rem",
//       }}>
//         {/* Left - Featured Post with larger image */}
//         <div style={{ gridColumn: "1 / 2" }}>
//           <PostCard post={featuredPost} isFeatured={true} />
//         </div>

//         {/* Right - 4 Posts Grid */}
//         <div style={{
//           gridColumn: "2 / 3",
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: "1.5rem",
//           alignContent: "start",
//         }}>
//           {remainingPosts.map((post) => (
//             <PostCard key={post.id} post={post} isFeatured={false} />
//           ))}
//         </div>
//       </div>

//       {/* Mobile Layout: 3 Posts Stack */}
//       <div className="mobile-layout" style={{
//         display: "none",
//         gridTemplateColumns: "1fr",
//         gap: "1.5rem",
//       }}>
//         {posts.slice(0, 3).map((post) => (
//           <PostCard key={post.id} post={post} isFeatured={false} />
//         ))}
//       </div>

//       {/* More Posts Button */}
//       {hasMorePosts && (
//         <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
//           <Link 
//             href="/posts" 
//             className="btn-secondary"
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "0.5rem",
//               padding: "0.75rem 2rem",
//               borderRadius: "50px",
//               border: "2px solid var(--ld-accent, #FF6B6B)",
//               color: "var(--ld-accent, #FF6B6B)",
//               fontWeight: "600",
//               textDecoration: "none",
//               transition: "all 0.3s ease",
//               fontSize: "1rem",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = "var(--ld-accent, #FF6B6B)";
//               e.target.style.color = "#fff";
//               e.target.style.transform = "translateY(-2px)";
//               e.target.style.boxShadow = "0 8px 25px rgba(255,107,107,0.3)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = "transparent";
//               e.target.style.color = "var(--ld-accent, #FF6B6B)";
//               e.target.style.transform = "translateY(0)";
//               e.target.style.boxShadow = "none";
//             }}
//           >
//             More Posts
//             <ArrowRight size={18} strokeWidth={2.5} />
//           </Link>
//         </div>
//       )}

//       <style jsx>{`
//         @media (max-width: 768px) {
//           .desktop-layout {
//             display: none !important;
//           }
//           .mobile-layout {
//             display: grid !important;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

// // "use client";

// // import Link from "next/link";
// // import { ArrowRight } from "lucide-react";
// // import PostCard from "./PostCard";

// // export default function PostsSection({ posts }) {
// //   if (!posts || posts.length === 0) {
// //     return null;
// //   }

// //   const featuredPost = posts[0];
// //   const remainingPosts = posts.slice(1, 5);
// //   const hasMorePosts = posts.length > 5;

// //   return (
// //     <section className="ld-section ld-container">
// //       <div style={{
// //         display: "flex",
// //         justifyContent: "space-between",
// //         alignItems: "center",
// //         marginBottom: "2rem",
// //         flexWrap: "wrap",
// //         gap: "1rem"
// //       }}>
// //         <div>
// //           <span style={{ 
// //             fontSize: "0.85rem", 
// //             fontWeight: "600", 
// //             letterSpacing: "0.1em",
// //             color: "var(--ld-accent, #FF6B6B)",
// //             textTransform: "uppercase"
// //           }}>
// //             📰 Latest Updates
// //           </span>
// //           <h2 style={{ 
// //             fontSize: "2rem", 
// //             fontWeight: "700", 
// //             marginTop: "0.25rem",
// //             background: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
// //             WebkitBackgroundClip: "text",
// //             WebkitTextFillColor: "transparent"
// //           }}>
// //             Studio News
// //           </h2>
// //         </div>
// //       </div>

// //       {/* Desktop Layout: 1 Featured + 4 Grid */}
// //       <div style={{
// //         display: "grid",
// //         gridTemplateColumns: "1fr 1fr",
// //         gap: "1.5rem",
// //       }}>
// //         {/* Left - Featured Post */}
// //         <div style={{ gridColumn: "1 / 2" }}>
// //           <PostCard post={featuredPost} isFeatured={true} />
// //         </div>

// //         {/* Right - 4 Posts Grid */}
// //         <div style={{
// //           gridColumn: "2 / 3",
// //           display: "grid",
// //           gridTemplateColumns: "1fr 1fr",
// //           gap: "1.5rem",
// //           alignContent: "start",
// //         }}>
// //           {remainingPosts.map((post) => (
// //             <PostCard key={post.id} post={post} />
// //           ))}
// //         </div>
// //       </div>

// //       {/* Mobile Layout: 3 Posts Stack */}
// //       <div style={{
// //         display: "none",
// //         gridTemplateColumns: "1fr",
// //         gap: "1.5rem",
// //       }}>
// //         {posts.slice(0, 3).map((post) => (
// //           <PostCard key={post.id} post={post} />
// //         ))}
// //       </div>

// //       {/* More Posts Button */}
// //       {hasMorePosts && (
// //         <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
// //           <Link 
// //             href="/posts" 
// //             className="btn-secondary"
// //             style={{
// //               display: "inline-flex",
// //               alignItems: "center",
// //               gap: "0.5rem",
// //               padding: "0.75rem 2rem",
// //               borderRadius: "50px",
// //               border: "2px solid var(--ld-accent, #FF6B6B)",
// //               color: "var(--ld-accent, #FF6B6B)",
// //               fontWeight: "600",
// //               textDecoration: "none",
// //               transition: "all 0.3s ease",
// //               fontSize: "1rem",
// //             }}
// //             onMouseEnter={(e) => {
// //               e.target.style.background = "var(--ld-accent, #FF6B6B)";
// //               e.target.style.color = "#fff";
// //               e.target.style.transform = "translateY(-2px)";
// //               e.target.style.boxShadow = "0 8px 25px rgba(255,107,107,0.3)";
// //             }}
// //             onMouseLeave={(e) => {
// //               e.target.style.background = "transparent";
// //               e.target.style.color = "var(--ld-accent, #FF6B6B)";
// //               e.target.style.transform = "translateY(0)";
// //               e.target.style.boxShadow = "none";
// //             }}
// //           >
// //             More Posts
// //             <ArrowRight size={18} strokeWidth={2.5} />
// //           </Link>
// //         </div>
// //       )}

// //       {/* Responsive CSS */}
// //       <style jsx>{`
// //         @media (max-width: 768px) {
// //           .ld-section {
// //             padding: 3rem 0;
// //           }
          
// //           div[style*="gridTemplateColumns: 1fr 1fr"] {
// //             display: none !important;
// //           }
          
// //           div[style*="display: none"] {
// //             display: grid !important;
// //           }
// //         }
// //       `}</style>
// //     </section>
// //   );
// // }