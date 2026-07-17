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

// ─── Demo fallback — never written to Firestore ────────────────────────────
const DEMO_COURSES = [
  {
    id: "demo-c1",
    title: "6-Week Hip Hop Fundamentals",
    description:
      "Build your foundation from the ground up. Learn grooves, isolations, and classic party moves in this structured beginner program.",
    imageUrl:
      "https://cdn.prod.website-files.com/5dbb40d6d8c97447e9450447/60baaab0aa12e6d9ad9074b6_STEEZY_HIPHOP-min.avif",
    danceStyle: "Hip Hop",
    level: "Beginner",
    venue: "Studio A",
    duration: "6 weeks",
    maxParticipants: 30,
    enrolledCount: 18,
  },
  {
    id: "demo-c2",
    title: "Intro to Contemporary Ballet",
    description:
      "A modern take on classical technique. Focus on fluidity, expression, and core strength through structured barre and center work.",
    imageUrl:
      "https://cdn.prod.website-files.com/5dbb40d6d8c97447e9450447/60baaab004cd38de543dd7a1_STEEZY_BALLET-min.avif",
    danceStyle: "Ballet",
    level: "All Levels",
    venue: "Main Hall",
    duration: "8 weeks",
    maxParticipants: 20,
    enrolledCount: 12,
  },
  {
    id: "demo-c3",
    title: "Jazz Funk Intensive",
    description:
      "High-energy choreography blending jazz technique with street-style attitude. Show up ready to sweat and perform.",
    imageUrl:
      "https://cdn.prod.website-files.com/5dbb40d6d8c97447e9450447/60baaab0f8caa4145fe07fef_STEEZY_JAZZ-min.avif",
    danceStyle: "Jazz",
    level: "Intermediate",
    venue: "Studio B",
    duration: "4 weeks",
    maxParticipants: 25,
    enrolledCount: 22,
  },
  {
    id: "demo-c4",
    title: "Breaking & Power Moves",
    description:
      "From top-rock entries to freeze combos — learn the vocabulary of breaking with progressive drills and creative rounds.",
    imageUrl:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
    danceStyle: "Breaking",
    level: "Intermediate",
    venue: "Studio C",
    duration: "6 weeks",
    maxParticipants: 15,
    enrolledCount: 9,
  },
  {
    id: "demo-c5",
    title: "House Dance Foundations",
    description:
      "Explore jacking, footwork, and lofting patterns rooted in club culture. A feel-good, rhythm-first class for all bodies.",
    imageUrl:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
    danceStyle: "House",
    level: "Beginner",
    venue: "Studio A",
    duration: "5 weeks",
    maxParticipants: 25,
    enrolledCount: 7,
  },
  {
    id: "demo-c6",
    title: "Heels Choreography",
    description:
      "Confidence, sass, and sharp choreography — all in heels. Emphasis on performance quality, musicality, and stage presence.",
    imageUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    danceStyle: "Heels",
    level: "All Levels",
    venue: "Main Hall",
    duration: "4 weeks",
    maxParticipants: 20,
    enrolledCount: 16,
  },
];

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
  const [usingDemo, setUsingDemo] = useState(false);
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
          setCourses(DEMO_COURSES);
          setUsingDemo(true);
        }
      } catch {
        if (!cancelled) {
          setCourses(DEMO_COURSES);
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
        {/* Demo notice */}
        {!loading && usingDemo && (
          <div className="crs-demo-notice" role="status">
            <Sparkles size={14} strokeWidth={2} />
            Showing demo content — connect to Firestore to load live courses.
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
        {!loading && filtered.length === 0 && (
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
