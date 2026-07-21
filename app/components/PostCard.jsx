import Link from "next/link";
import { Calendar, ArrowRight, Tag, Newspaper, Clock } from "lucide-react";

function formatShortDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "short",
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

export default function PostCard({ post, isFeatured = false }) {
  const excerpt = getExcerpt(post);
  const category = post.category || post.tag || "Studio News";
  const imageSrc = post.imageUrl || null;

  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  ];
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  // Featured post - bigger image
  const imageHeight = isFeatured ? "320px" : "200px";
  const titleSize = isFeatured ? "1.5rem" : "1.125rem";
  const excerptSize = isFeatured ? "1rem" : "0.875rem";
  const excerptLines = isFeatured ? 3 : 2;

  return (
    <article 
      className="ld-post-card" 
      style={{ 
        background: "var(--surface, #16131F)",
        border: "1px solid var(--border, #2D2840)",
        borderRadius: isFeatured ? "20px" : "16px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `translateY(${isFeatured ? '-8px' : '-6px'})`;
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
        e.currentTarget.style.borderColor = "rgba(147,51,234,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--border, #2D2840)";
      }}
    >
      {/* Image */}
      <Link 
        href={`/post/${post.id}`} 
        style={{ 
          display: "block", 
          position: "relative", 
          overflow: "hidden", 
          height: imageHeight, 
          flexShrink: 0,
          background: randomGradient,
        }}
      >
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={post.title} 
            loading="lazy"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          />
        ) : (
          <div style={{ 
            width: "100%", 
            height: "100%", 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            color: "rgba(255,255,255,0.7)",
            gap: "0.5rem",
          }}>
            <Newspaper size={isFeatured ? 64 : 48} strokeWidth={1.5} />
            <span style={{ fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {category}
            </span>
          </div>
        )}
        
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: isFeatured ? "40%" : "50%",
          background: "linear-gradient(to top, rgba(11,10,15,0.8) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        <span style={{
          position: "absolute",
          top: isFeatured ? "14px" : "10px",
          right: isFeatured ? "14px" : "10px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          fontSize: isFeatured ? "0.65rem" : "0.6rem",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          padding: isFeatured ? "6px 14px" : "4px 10px",
          borderRadius: "999px",
          zIndex: 2,
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <Tag size={isFeatured ? 11 : 10} strokeWidth={2.5} />
          {isFeatured ? "Featured" : category}
        </span>

        {post.readTime && (
          <span style={{
            position: "absolute",
            bottom: isFeatured ? "14px" : "10px",
            left: isFeatured ? "14px" : "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: isFeatured ? "0.65rem" : "0.6rem",
            fontWeight: "600",
            padding: isFeatured ? "4px 12px" : "3px 8px",
            borderRadius: "999px",
            zIndex: 2,
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <Clock size={isFeatured ? 12 : 10} strokeWidth={2} />
            {post.readTime}
          </span>
        )}
      </Link>

      {/* Body */}
      <div style={{ 
        padding: isFeatured ? "1.25rem 1.5rem 1.5rem" : "1rem 1.25rem 1.25rem", 
        display: "flex", 
        flexDirection: "column", 
        gap: "0.5rem", 
        flex: 1,
      }}>
        <h3 style={{
          fontFamily: "var(--font-display, Poppins)",
          fontSize: titleSize,
          fontWeight: isFeatured ? "800" : "700",
          color: "var(--foreground, #F5F3F7)",
          lineHeight: "1.3",
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          <Link 
            href={`/post/${post.id}`} 
            style={{ 
              color: "inherit", 
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => e.target.style.color = "var(--primary, #9333EA)"}
            onMouseLeave={(e) => e.target.style.color = "inherit"}
          >
            {post.title}
          </Link>
        </h3>
        
        {excerpt && (
          <p style={{
            fontSize: excerptSize,
            color: "var(--body-text, #B0A8C0)",
            lineHeight: isFeatured ? "1.7" : "1.5",
            display: "-webkit-box",
            WebkitLineClamp: excerptLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            margin: 0,
            flex: 1,
          }}>
            {excerpt}
          </p>
        )}

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          flexWrap: "wrap",
          paddingTop: isFeatured ? "0.875rem" : "0.5rem",
          borderTop: "1px solid var(--border, #2D2840)",
          marginTop: "auto",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: isFeatured ? "0.8125rem" : "0.7rem",
            fontWeight: "500",
            color: "var(--muted, #6B6080)",
          }}>
            <Calendar size={isFeatured ? 14 : 11} strokeWidth={2} />
            {formatShortDate(post.createdAt)}
          </span>
          
          <Link 
            href={`/post/${post.id}`} 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, #9333EA, #DB2777)",
              color: "#FFFFFF",
              fontFamily: "var(--font-display, Poppins)",
              fontSize: isFeatured ? "0.875rem" : "0.7rem",
              fontWeight: "700",
              padding: isFeatured ? "0.6rem 1.25rem" : "0.35rem 0.875rem",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isFeatured ? "0 4px 15px rgba(147,51,234,0.3)" : "0 3px 12px rgba(147,51,234,0.25)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
              e.target.style.boxShadow = isFeatured ? "0 8px 25px rgba(147,51,234,0.4)" : "0 6px 20px rgba(147,51,234,0.35)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = isFeatured ? "0 4px 15px rgba(147,51,234,0.3)" : "0 3px 12px rgba(147,51,234,0.25)";
            }}
          >
            {isFeatured ? "Read More" : "Read"}
            <ArrowRight size={isFeatured ? 16 : 12} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}


// import Link from "next/link";
// import { Calendar, ArrowRight, Tag, Newspaper, Clock } from "lucide-react";

// function formatShortDate(timestamp) {
//   if (!timestamp) return "";
//   const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//   return d.toLocaleDateString("en-US", {
//     month: "short",
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

// export default function PostCard({ post, isFeatured = false }) {
//   const excerpt = getExcerpt(post);
//   const category = post.category || post.tag || "Studio News";
//   const imageSrc = post.imageUrl || null;

//   const gradients = [
//     "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//     "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//     "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//   ];
//   const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

//   const imageHeight = isFeatured ? "300px" : "200px";
//   const titleSize = isFeatured ? "1.5rem" : "1.125rem";
//   const excerptSize = isFeatured ? "1rem" : "0.875rem";

//   return (
//     <article 
//       className="ld-post-card" 
//       style={{ 
//         background: "var(--surface, #16131F)",
//         border: "1px solid var(--border, #2D2840)",
//         borderRadius: isFeatured ? "20px" : "16px",
//         overflow: "hidden",
//         transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         position: "relative",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = `translateY(${isFeatured ? '-8px' : '-6px'})`;
//         e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
//         e.currentTarget.style.borderColor = "rgba(147,51,234,0.3)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "none";
//         e.currentTarget.style.borderColor = "var(--border, #2D2840)";
//       }}
//     >
//       {/* Image */}
//       <Link 
//         href={`/post/${post.id}`} 
//         style={{ 
//           display: "block", 
//           position: "relative", 
//           overflow: "hidden", 
//           height: imageHeight, 
//           flexShrink: 0,
//           background: randomGradient,
//         }}
//       >
//         {imageSrc ? (
//           <img 
//             src={imageSrc} 
//             alt={post.title} 
//             loading="lazy"
//             style={{ 
//               width: "100%", 
//               height: "100%", 
//               objectFit: "cover",
//               display: "block",
//               transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
//             }}
//             onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
//             onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
//           />
//         ) : (
//           <div style={{ 
//             width: "100%", 
//             height: "100%", 
//             display: "flex", 
//             flexDirection: "column",
//             alignItems: "center", 
//             justifyContent: "center",
//             color: "rgba(255,255,255,0.7)",
//             gap: "0.5rem",
//           }}>
//             <Newspaper size={isFeatured ? 64 : 48} strokeWidth={1.5} />
//             <span style={{ fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>
//               {category}
//             </span>
//           </div>
//         )}
        
//         <div style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: "50%",
//           background: "linear-gradient(to top, rgba(11,10,15,0.8) 0%, transparent 100%)",
//           pointerEvents: "none",
//         }} />

//         <span style={{
//           position: "absolute",
//           top: isFeatured ? "14px" : "10px",
//           right: isFeatured ? "14px" : "10px",
//           display: "inline-flex",
//           alignItems: "center",
//           gap: "6px",
//           background: "rgba(0,0,0,0.7)",
//           backdropFilter: "blur(8px)",
//           color: "#fff",
//           fontSize: isFeatured ? "0.65rem" : "0.6rem",
//           fontWeight: "700",
//           textTransform: "uppercase",
//           letterSpacing: "0.06em",
//           padding: isFeatured ? "6px 14px" : "4px 10px",
//           borderRadius: "999px",
//           zIndex: 2,
//           border: "1px solid rgba(255,255,255,0.1)",
//         }}>
//           <Tag size={isFeatured ? 11 : 10} strokeWidth={2.5} />
//           {isFeatured ? "Featured" : category}
//         </span>

//         {post.readTime && (
//           <span style={{
//             position: "absolute",
//             bottom: isFeatured ? "14px" : "10px",
//             left: isFeatured ? "14px" : "10px",
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "6px",
//             background: "rgba(0,0,0,0.6)",
//             backdropFilter: "blur(8px)",
//             color: "#fff",
//             fontSize: isFeatured ? "0.65rem" : "0.6rem",
//             fontWeight: "600",
//             padding: isFeatured ? "4px 12px" : "3px 8px",
//             borderRadius: "999px",
//             zIndex: 2,
//             border: "1px solid rgba(255,255,255,0.08)",
//           }}>
//             <Clock size={isFeatured ? 12 : 10} strokeWidth={2} />
//             {post.readTime}
//           </span>
//         )}
//       </Link>

//       {/* Body */}
//       <div style={{ 
//         padding: isFeatured ? "1.5rem 1.5rem 1.5rem" : "1rem 1.25rem 1.25rem", 
//         display: "flex", 
//         flexDirection: "column", 
//         gap: "0.5rem", 
//         flex: 1,
//       }}>
//         <h3 style={{
//           fontFamily: "var(--font-display, Poppins)",
//           fontSize: titleSize,
//           fontWeight: isFeatured ? "800" : "700",
//           color: "var(--foreground, #F5F3F7)",
//           lineHeight: "1.3",
//           margin: 0,
//           display: "-webkit-box",
//           WebkitLineClamp: 2,
//           WebkitBoxOrient: "vertical",
//           overflow: "hidden",
//         }}>
//           <Link 
//             href={`/post/${post.id}`} 
//             style={{ 
//               color: "inherit", 
//               textDecoration: "none",
//               transition: "color 0.2s ease",
//             }}
//             onMouseEnter={(e) => e.target.style.color = "var(--primary, #9333EA)"}
//             onMouseLeave={(e) => e.target.style.color = "inherit"}
//           >
//             {post.title}
//           </Link>
//         </h3>
        
//         {excerpt && (
//           <p style={{
//             fontSize: excerptSize,
//             color: "var(--body-text, #B0A8C0)",
//             lineHeight: isFeatured ? "1.7" : "1.6",
//             display: "-webkit-box",
//             WebkitLineClamp: isFeatured ? 3 : 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             margin: isFeatured ? "0.5rem 0 0.5rem" : 0,
//             flex: 1,
//           }}>
//             {excerpt}
//           </p>
//         )}

//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "0.75rem",
//           flexWrap: "wrap",
//           paddingTop: isFeatured ? "0.875rem" : "0.5rem",
//           borderTop: "1px solid var(--border, #2D2840)",
//           marginTop: "auto",
//         }}>
//           <span style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "6px",
//             fontSize: isFeatured ? "0.8125rem" : "0.7rem",
//             fontWeight: "500",
//             color: "var(--muted, #6B6080)",
//           }}>
//             <Calendar size={isFeatured ? 14 : 11} strokeWidth={2} />
//             {formatShortDate(post.createdAt)}
//           </span>
          
//           <Link 
//             href={`/post/${post.id}`} 
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "6px",
//               background: "linear-gradient(135deg, #9333EA, #DB2777)",
//               color: "#FFFFFF",
//               fontFamily: "var(--font-display, Poppins)",
//               fontSize: isFeatured ? "0.875rem" : "0.7rem",
//               fontWeight: "700",
//               padding: isFeatured ? "0.6rem 1.25rem" : "0.35rem 0.875rem",
//               borderRadius: "999px",
//               textDecoration: "none",
//               transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//               boxShadow: isFeatured ? "0 4px 15px rgba(147,51,234,0.3)" : "0 3px 12px rgba(147,51,234,0.25)",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = "translateY(-2px) scale(1.05)";
//               e.target.style.boxShadow = isFeatured ? "0 8px 25px rgba(147,51,234,0.4)" : "0 6px 20px rgba(147,51,234,0.35)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = "scale(1)";
//               e.target.style.boxShadow = isFeatured ? "0 4px 15px rgba(147,51,234,0.3)" : "0 3px 12px rgba(147,51,234,0.25)";
//             }}
//           >
//             {isFeatured ? "Read More" : "Read"}
//             <ArrowRight size={isFeatured ? 16 : 12} strokeWidth={2.5} />
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }