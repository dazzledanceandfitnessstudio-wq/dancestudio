"use client";

import { useState, useEffect } from "react";
import { eventService } from "../../lib/firebaseService";
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
} from "lucide-react";
import "./courses.css";

// ─── No Demo Fallback ────────────────────────────────────────────────────────

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
function CourseCard({ course, index }) {
  const spotsLeft = course.maxParticipants
    ? course.maxParticipants - (course.enrolledCount || 0)
    : null;

  return (
    <article
      className="crs-card"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image */}
      <div className="crs-card-img-wrap">
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.title} loading="lazy" />
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
        <a
          href="/events"
          className="crs-btn-enroll"
          id={`courses-enroll-${course.id}`}
        >
          <Zap size={15} strokeWidth={2} />
          Enroll Now
        </a>
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
      {/* ── Hero ── */}
      <header className="crs-hero">
        <div className="crs-hero-inner">
          <p className="crs-eyebrow">
            <GraduationCap size={14} strokeWidth={2.5} />
            Dazzle Dance Studio
          </p>
          <h1 className="crs-hero-title">Explore Our Courses</h1>
          <p className="crs-hero-subtitle">
            Structured programs from beginner to advanced — hip-hop, breaking,
            ballet, jazz funk, heels, and more. Find your style and level up.
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
              <CourseCard key={course.id} course={course} index={i} />
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
    </div>
  );
}
