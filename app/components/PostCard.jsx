import Link from "next/link";
import { Calendar, ArrowRight, Tag, Newspaper } from "lucide-react";

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

export default function PostCard({ post }) {
  const excerpt = getExcerpt(post);
  const category = post.category || post.tag || "Studio News";

  return (
    <article className="ld-post-card" style={{ 
      background: "var(--surface, #16131F)",
      border: "1px solid var(--border, #2D2840)",
      borderRadius: "16px",
      overflow: "hidden",
      transition: "transform 0.25s ease-out, box-shadow 0.25s ease-out",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}>
      {/* Image */}
      <Link href={`/post/${post.id}`} style={{ display: "block", position: "relative", overflow: "hidden", height: "200px", flexShrink: 0 }}>
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              transition: "transform 0.4s ease-out"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          />
        ) : (
          <div style={{ 
            width: "100%", 
            height: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            background: "var(--gradient-primary, linear-gradient(135deg, #FF1F6D, #7B2FFF))",
            color: "rgba(255,255,255,0.6)"
          }}>
            <Newspaper size={48} strokeWidth={1.5} />
          </div>
        )}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to top, rgba(11,10,15,0.5) 0%, transparent 100%)",
          pointerEvents: "none"
        }} />
        {/* Category Badge */}
        <span style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          background: "rgba(255,31,109,0.9)",
          color: "#fff",
          fontSize: "0.65rem",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          padding: "4px 12px",
          borderRadius: "999px",
          zIndex: 2
        }}>
          <Tag size={11} strokeWidth={2.5} />
          {category}
        </span>
      </Link>

      {/* Body */}
      <div style={{ padding: "1.25rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
        <h3 style={{
          fontFamily: "var(--font-display, Poppins)",
          fontSize: "1.125rem",
          fontWeight: "700",
          color: "var(--foreground, #F5F3F7)",
          lineHeight: "1.35",
          margin: 0
        }}>
          <Link href={`/post/${post.id}`} style={{ color: "inherit", textDecoration: "none" }}>
            {post.title}
          </Link>
        </h3>
        
        {excerpt && (
          <p style={{
            fontSize: "0.875rem",
            color: "var(--body-text, #B0A8C0)",
            lineHeight: "1.6",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            margin: 0,
            flex: 1
          }}>
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          flexWrap: "wrap",
          paddingTop: "0.875rem",
          borderTop: "1px solid var(--border, #2D2840)",
          marginTop: "auto"
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.8125rem",
            fontWeight: "500",
            color: "var(--muted, #6B6080)"
          }}>
            <Calendar size={13} strokeWidth={2} />
            {formatShortDate(post.createdAt)}
          </span>
          <Link href={`/post/${post.id}`} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "var(--gradient-cta, linear-gradient(135deg, #FF1F6D, #00E5FF))",
            color: "#FFFFFF",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.8125rem",
            fontWeight: "700",
            padding: "0.5rem 1.125rem",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
            boxShadow: "0 4px 12px rgba(255,31,109,0.2)"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1.03)";
            e.target.style.boxShadow = "0 6px 20px rgba(255,31,109,0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 12px rgba(255,31,109,0.2)";
          }}>
            Read More
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}






// import Link from "next/link";

// function formatShortDate(timestamp) {
//   if (!timestamp) return "";
//   const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//   return d.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// export default function PostCard({ post }) {
//   return (
//     <Link
//       href={`/post/${post.id}`}
//       className="ld-post-card"
//       onClick={(e) => {
//         // handle navigation normally
//       }}
//     >
//       <h3 className="ld-post-title">{post.title}</h3>
//       <p className="ld-post-excerpt">{post.excerpt}</p>
//       <span className="ld-post-date">
//         {formatShortDate(post.createdAt)}
//       </span>
//     </Link>
//   );
// }
