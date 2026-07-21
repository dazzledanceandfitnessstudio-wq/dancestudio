"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { postService } from "../../../lib/firebaseService";
import { Calendar, ArrowLeft, Tag, Sparkles } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function formatDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SinglePostPage() {
  const params = useParams();
  const postId = params.id;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!postId) {
        setError("No post ID provided");
        setLoading(false);
        return;
      }
      
      try {
        // ✅ FIXED: Use getPost instead of getPostById
        const fetched = await postService.getPost(postId);
        
        if (cancelled) return;

        if (fetched) {
          setPost(fetched);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        if (!cancelled) {
          setError(err.message || "Failed to load post.");
        }
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
        <Header />
        <div style={{ 
          maxWidth: "800px", 
          margin: "4rem auto", 
          padding: "0 1.5rem",
          textAlign: "center",
          color: "var(--body-text, #B0A8C0)"
        }}>
          <div style={{ 
            width: "60px", 
            height: "60px", 
            borderRadius: "50%",
            border: "3px solid var(--border, #2D2840)",
            borderTopColor: "var(--primary, #FF1F6D)",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 1.5rem"
          }} />
          <p>Loading post...</p>
        </div>
        <Footer />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="posts-page">
        <Header />
        <div style={{ 
          maxWidth: "800px", 
          margin: "4rem auto", 
          padding: "0 1.5rem",
          textAlign: "center"
        }}>
          <div style={{
            padding: "3rem",
            background: "var(--surface, #16131F)",
            border: "1px solid var(--border, #2D2840)",
            borderRadius: "16px"
          }}>
            <h2 style={{ color: "var(--foreground, #F5F3F7)", marginBottom: "0.5rem" }}>
              ⚠️ {error || "Post not found"}
            </h2>
            <p style={{ color: "var(--body-text, #B0A8C0)", marginBottom: "1rem", fontSize: "0.875rem" }}>
              Post ID: {postId}
            </p>
            <Link href="/posts" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--primary, #FF1F6D)",
              fontWeight: "600",
              textDecoration: "none"
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

  const category = post.category || post.tag || "Studio News";

  return (
    <div className="posts-page">
      <Header />

      <header style={{
        background: "var(--surface, #16131F)",
        borderBottom: "1px solid var(--border, #2D2840)",
        position: "relative",
        overflow: "hidden",
        padding: "3rem 1.25rem 2.5rem"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.75rem",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--primary, #FF1F6D)",
            background: "rgba(255,31,109,0.07)",
            padding: "0.3rem 0.875rem",
            borderRadius: "999px",
            marginBottom: "1rem"
          }}>
            <Sparkles size={13} strokeWidth={2.5} />
            Dazzle Dance Studio
          </div>
          
          <h1 style={{
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "var(--foreground, #F5F3F7)",
            margin: "0 0 0.875rem",
            lineHeight: "1.15"
          }}>
            {post.title}
          </h1>
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            color: "var(--body-text, #B0A8C0)",
            fontSize: "0.875rem"
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
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "var(--gradient-cta, linear-gradient(135deg, #FF1F6D, #00E5FF))"
        }} />
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        {post.imageUrl && (
          <div style={{
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "2rem",
            background: "var(--surface-alt, #1E1A28)"
          }}>
            <img 
              src={post.imageUrl} 
              alt={post.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {post.content ? (
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontSize: "1.0625rem",
              lineHeight: "1.8",
              color: "var(--foreground, #F5F3F7)"
            }}
          />
        ) : post.excerpt ? (
          <p style={{
            fontSize: "1.0625rem",
            lineHeight: "1.8",
            color: "var(--foreground, #F5F3F7)"
          }}>
            {post.excerpt}
          </p>
        ) : (
          <p style={{
            fontSize: "1.0625rem",
            lineHeight: "1.8",
            color: "var(--body-text, #B0A8C0)",
            textAlign: "center"
          }}>
            No content available.
          </p>
        )}

        <Link href="/posts" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "2.5rem",
          color: "var(--primary, #FF1F6D)",
          fontWeight: "600",
          textDecoration: "none"
        }}>
          <ArrowLeft size={18} />
          Back to Posts
        </Link>
      </main>

      <Footer />
    </div>
  );
}