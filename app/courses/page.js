"use client";

import { useState, useEffect } from "react";
import { eventService, enrollmentService } from "../../lib/firebaseService";
import {
  Sparkles,
  Clock,
  MapPin,
  Users,
  Zap,
  ArrowRight,
  Loader2,
  Search,
  GraduationCap,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
  Shield,
  Lock,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authService } from "../../lib/firebaseService";

// ─── Toast Component ────────────────────────────────────────────────────────
function Toast({ message, type, visible }) {
  return (
    <div
      className={`ld-toast ${visible ? "ld-toast-visible" : ""} ${
        type === "success" ? "ld-toast-success" : "ld-toast-error"
      }`}
      role="status"
    >
      {message}
    </div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="crs-skeleton-card" aria-hidden="true">
      <div className="crs-skeleton crs-skeleton-img" />
      <div className="crs-skeleton-body">
        <div className="crs-skeleton crs-skeleton-badge" />
        <div className="crs-skeleton crs-skeleton-title" />
        <div className="crs-skeleton crs-skeleton-line" />
        <div className="crs-skeleton crs-skeleton-line crs-skeleton-short" />
      </div>
    </div>
  );
}

// ─── Course Card ────────────────────────────────────────────────────────────
function CourseCard({ 
  course, 
  index, 
  user, 
  enrollmentMap, 
  enrollingId, 
  cancellingId, 
  onEnroll, 
  onCancel, 
  onSignIn 
}) {
  const spotsLeft = course.maxParticipants
    ? course.maxParticipants - (course.enrolledCount || 0)
    : null;

  const isFull = course.maxParticipants && course.enrolledCount != null && 
    course.enrolledCount >= course.maxParticipants;

  const enrollment = course?.id ? enrollmentMap[course.id] : null;

  // 🔥 FIX: Check both bannerUrl and imageUrl
  const imageSrc = course.bannerUrl || course.imageUrl || null;

  // ── Enrollment Button ──
  const renderEnrollButton = () => {
    // User not signed in
    if (!user) {
      return (
        <button
          className="crs-btn-enroll"
          onClick={onSignIn}
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            border: "2px solid rgba(147,51,234,0.3)",
            background: "transparent",
            color: "var(--primary, #9333EA)",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.875rem",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(147,51,234,0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          <Shield size={15} strokeWidth={2} />
          Sign in to Enroll
        </button>
      );
    }

    // Class Full
    if (isFull) {
      if (enrollment?.status === "APPROVED") {
        return (
          <a
            href="/dashboard"
            className="crs-btn-enroll"
            style={{
              width: "100%",
              padding: "0.75rem 1.5rem",
              borderRadius: "12px",
              background: "rgba(34,197,94,0.15)",
              color: "#22C55E",
              fontWeight: "600",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-display, Poppins)",
              fontSize: "0.875rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(34,197,94,0.25)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(34,197,94,0.15)";
            }}
          >
            <CheckCircle size={15} strokeWidth={2} />
            View Dashboard
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        );
      }
      return (
        <div
          className="crs-btn-enroll"
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            background: "rgba(239,68,68,0.1)",
            color: "#EF4444",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            cursor: "not-allowed",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.875rem",
          }}
        >
          <Lock size={15} strokeWidth={2} />
          Class Full
        </div>
      );
    }

    // Not enrolled
    if (!enrollment) {
      return (
        <button
          className="crs-btn-enroll"
          onClick={() => onEnroll(course.id)}
          disabled={enrollingId === course.id}
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #9333EA, #DB2777)",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 15px rgba(147,51,234,0.3)",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.875rem",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(147,51,234,0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(147,51,234,0.3)";
          }}
        >
          {enrollingId === course.id ? (
            <>
              <Loader2 size={15} strokeWidth={2} className="ld-spin" />
              Requesting…
            </>
          ) : (
            <>
              <Zap size={15} strokeWidth={2} />
              Request to Enroll
            </>
          )}
        </button>
      );
    }

    // Pending
    if (enrollment.status === "PENDING") {
      return (
        <button
          className="crs-btn-enroll"
          onClick={() => onCancel(enrollment.id, course.id)}
          disabled={cancellingId === enrollment.id}
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            border: "2px solid rgba(234,179,8,0.3)",
            background: "transparent",
            color: "#EAB308",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.875rem",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(234,179,8,0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          {cancellingId === enrollment.id ? (
            <>
              <Loader2 size={14} strokeWidth={2} className="ld-spin" />
              Cancelling…
            </>
          ) : (
            <>
              <Clock size={15} strokeWidth={2} />
              Pending — Cancel
            </>
          )}
        </button>
      );
    }

    // Approved
    if (enrollment.status === "APPROVED") {
      return (
        <a
          href="/dashboard"
          className="crs-btn-enroll"
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            background: "rgba(34,197,94,0.15)",
            color: "#22C55E",
            fontWeight: "600",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.875rem",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(34,197,94,0.25)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(34,197,94,0.15)";
          }}
        >
          <CheckCircle size={15} strokeWidth={2} />
          View Dashboard
          <ArrowRight size={14} strokeWidth={2} />
        </a>
      );
    }

    // Rejected
    if (enrollment.status === "REJECTED") {
      return (
        <div
          className="crs-btn-enroll"
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            background: "rgba(239,68,68,0.1)",
            color: "#EF4444",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-display, Poppins)",
            fontSize: "0.875rem",
          }}
        >
          <XCircle size={15} strokeWidth={2} />
          Application Rejected
        </div>
      );
    }

    return null;
  };

  return (
    <article
      className="crs-card"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image */}
      <div className="crs-card-img-wrap">
        {imageSrc ? (
          <img src={imageSrc} alt={course.title} loading="lazy" />
        ) : (
          <div className="crs-card-img-placeholder">
            <GraduationCap size={40} strokeWidth={1.5} />
          </div>
        )}
        <div className="crs-card-img-scrim" />

        {/* Level badge overlay */}
        {course.level && (
          <span className="crs-level-badge">
            {course.level.toUpperCase()}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="crs-card-body">
        {/* Style tag */}
        {course.danceStyle && (
          <span className="crs-style-tag">
            <Tag size={11} strokeWidth={2.5} />
            {course.danceStyle}
          </span>
        )}

        <h3 className="crs-card-title">{course.title}</h3>

        {course.description && (
          <p className="crs-card-desc">{course.description}</p>
        )}

        {/* Meta pills */}
        <div className="crs-card-meta">
          {course.duration && (
            <span className="crs-meta-item">
              <Clock size={13} strokeWidth={2} />
              {course.duration}
            </span>
          )}
          {course.venue && (
            <span className="crs-meta-item">
              <MapPin size={13} strokeWidth={2} />
              {course.venue}
            </span>
          )}
          {spotsLeft !== null && (
            <span
              className={`crs-meta-item ${
                spotsLeft <= 5 ? "crs-meta-warn" : ""
              }`}
            >
              <Users size={13} strokeWidth={2} />
              {spotsLeft <= 0
                ? "Full"
                : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`}
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="crs-card-footer">
        {renderEnrollButton()}
      </div>
    </article>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [user, setUser] = useState(null);
  const [enrollmentMap, setEnrollmentMap] = useState({});
  const [enrollingId, setEnrollingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  // ── Toast helper ──
  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  // ── Build enrollment map ──
  const buildEnrollmentMap = (enrollments) => {
    const map = {};
    enrollments.forEach((en) => {
      if (en.eventId) {
        map[en.eventId] = { id: en.id, status: en.status };
      }
    });
    return map;
  };

  // ── Fetch user enrollments ──
  const fetchUserEnrollments = async (userId) => {
    try {
      const enrollments = await enrollmentService.getUserEnrollments(userId);
      setEnrollmentMap(buildEnrollmentMap(enrollments));
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    }
  };

  // ── Auth state ──
  useEffect(() => {
    let mounted = true;

    authService.getCurrentUser().then(async (currentUser) => {
      if (mounted) {
        setUser(currentUser);
        if (currentUser) {
          await fetchUserEnrollments(currentUser.uid);
        }
      }
    });

    const firebaseAuth = authService.auth || authService.getAuth?.();
    let unsubscribe = null;
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
      unsubscribe = firebaseAuth.onAuthStateChanged(async (u) => {
        if (mounted) {
          setUser(u);
          if (u) {
            await fetchUserEnrollments(u.uid);
          } else {
            setEnrollmentMap({});
          }
        }
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
        await fetchUserEnrollments(result.user.uid);
        showToast("Signed in successfully");
      } else {
        showToast(result.error || "Sign in failed", "error");
      }
    } catch (err) {
      console.error("Sign in failed:", err);
      showToast("Sign in failed", "error");
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setEnrollmentMap({});
      showToast("Signed out successfully");
    } catch (err) {
      console.error("Sign out failed:", err);
      showToast("Sign out failed", "error");
    }
  };

  const handleEnroll = async (eventId) => {
    if (!user) {
      showToast("Please sign in first", "error");
      return;
    }
    
    setEnrollingId(eventId);
    try {
      const result = await enrollmentService.requestEnrollment(
        user.uid,
        eventId
      );
      setEnrollmentMap((prev) => ({
        ...prev,
        [eventId]: { id: result.enrollmentId, status: "PENDING" },
      }));
      showToast("Enrollment request sent!");
    } catch (err) {
      console.error("Enrollment error:", err);
      showToast(err.message || "Failed to enroll", "error");
    } finally {
      setEnrollingId(null);
    }
  };

  const handleCancel = async (enrollmentId, eventId) => {
    setCancellingId(enrollmentId);
    try {
      await enrollmentService.cancelEnrollment(enrollmentId, eventId);
      setEnrollmentMap((prev) => {
        const next = { ...prev };
        delete next[eventId];
        return next;
      });
      showToast("Enrollment request cancelled");
    } catch (err) {
      console.error("Cancel error:", err);
      showToast("Failed to cancel request", "error");
    } finally {
      setCancellingId(null);
    }
  };

  // ── Fetch courses ──
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const fetched = await eventService.getAllEvents();
        if (cancelled) return;

        if (fetched && fetched.length > 0) {
          setCourses(fetched);
        } else {
          setCourses([]);
        }
      } catch (err) {
        if (!cancelled) {
          setCourses([]);
          setError("Failed to load courses.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Derived filters
  const styles = [
    "All",
    ...new Set(courses.map((c) => c.danceStyle).filter(Boolean)),
  ];

  const filtered =
    activeFilter === "All"
      ? courses
      : courses.filter((c) => c.danceStyle === activeFilter);

  // ────────────────────────────────────────────────────────────────
  return (
    <div className="courses-page">
      {/* 🔥 FIX: Pass user props to Header */}
      <Header 
        user={user} 
        onSignIn={handleSignIn} 
        onSignOut={handleSignOut} 
      />
      
      {/* ── Hero ── */}
      <header className="crs-hero">
        <div className="crs-hero-inner">
          <p className="crs-eyebrow">
            <GraduationCap size={14} strokeWidth={2.5} />
            Dazzle Dance Studio
          </p>
          <h1 className="crs-hero-title">Explore Our Courses</h1>
          <p className="crs-hero-subtitle">
            Structured programs from beginner to advanced — Bollywood, Freestyle, Hip-Hop, Semi-Classical, Kathak (Basic to Advanced), and more. Find your style and level up.
          </p>
          {!loading && courses.length > 0 && (
            <div className="crs-hero-count">
              <Sparkles size={13} strokeWidth={2} />
              {courses.length} Program{courses.length !== 1 ? "s" : ""}{" "}
              Available
            </div>
          )}
        </div>
        <div className="crs-hero-bar" aria-hidden="true" />
      </header>

      <main className="crs-container">
        {/* ── Core Programs ── */}
        <section className="crs-static-programs" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem' }}>Our Core Offerings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <article className="crs-card" style={{ background: 'var(--color-surface-alt)', padding: '2rem', borderRadius: 'var(--radius-xl)', height: 'auto', display: 'block' }}>
              <div style={{ display: 'inline-block', background: '#C6FF3D', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Dance Forms</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Basic to Advanced Training</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-body-text)' }}>
                <li>✨ Bollywood</li>
                <li>✨ Freestyle</li>
                <li>✨ Hip-Hop</li>
                <li>✨ Semi-Classical</li>
                <li>✨ Kathak</li>
              </ul>
            </article>
            <article className="crs-card" style={{ background: 'var(--color-surface-alt)', padding: '2rem', borderRadius: 'var(--radius-xl)', height: 'auto', display: 'block' }}>
              <div style={{ display: 'inline-block', background: '#C6FF3D', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Certification & Degree</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Kathak Professional Courses</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-body-text)' }}>
                <li>🎓 1-Year Diploma</li>
                <li>🎓 2-Year Diploma</li>
                <li>🎓 Sangeet Prabhakar</li>
                <li>🎓 BPA (Bachelor of Performing Arts) in Kathak</li>
                <li>🎓 MA (Master of Arts) in Kathak</li>
              </ul>
            </article>
          </div>
        </section>

        {/* ── Error fallback notice ── */}
        {error && (
          <div className="crs-demo-notice" role="status" style={{color: "var(--color-primary)", borderColor: "rgba(255, 31, 109, 0.25)", background: "rgba(255, 31, 109, 0.08)"}}>
            <Sparkles size={14} strokeWidth={2} />
            {error}
          </div>
        )}

        {/* ── Filter Pills ── */}
        {!loading && styles.length > 1 && (
          <div className="crs-filters">
            {styles.map((style) => (
              <button
                key={style}
                className={`crs-filter-pill${
                  activeFilter === style ? " crs-filter-active" : ""
                }`}
                onClick={() => setActiveFilter(style)}
                id={`courses-filter-${style
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {style}
              </button>
            ))}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="crs-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="crs-grid">
            {filtered.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                index={i}
                user={user}
                enrollmentMap={enrollmentMap}
                enrollingId={enrollingId}
                cancellingId={cancellingId}
                onEnroll={handleEnroll}
                onCancel={handleCancel}
                onSignIn={handleSignIn}
              />
            ))}
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && filtered.length === 0 && !error && (
          <div className="crs-empty">
            <div className="crs-empty-icon">
              <Search size={36} strokeWidth={1.5} />
            </div>
            <div className="crs-empty-title">
              {activeFilter !== "All"
                ? `No ${activeFilter} courses right now`
                : "No courses available"}
            </div>
            <div className="crs-empty-desc">
              {activeFilter !== "All"
                ? "Try a different style or check back soon."
                : "New programs launch regularly. Stay tuned!"}
            </div>
            {activeFilter !== "All" && (
              <button
                className="crs-filter-pill crs-filter-active"
                onClick={() => setActiveFilter("All")}
                style={{ marginTop: "0.5rem" }}
              >
                Show All Courses
              </button>
            )}
          </div>
        )}
      </main>
      
      <Footer />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />
    </div>
  );
}