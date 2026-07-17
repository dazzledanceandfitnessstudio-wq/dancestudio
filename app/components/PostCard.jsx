import Link from "next/link";

function formatShortDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="ld-post-card"
      onClick={(e) => {
        // handle navigation normally
      }}
    >
      <h3 className="ld-post-title">{post.title}</h3>
      <p className="ld-post-excerpt">{post.excerpt}</p>
      <span className="ld-post-date">
        {formatShortDate(post.createdAt)}
      </span>
    </Link>
  );
}
