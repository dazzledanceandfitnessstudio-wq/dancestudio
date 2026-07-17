"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  authService,
  eventService,
  enrollmentService,
} from "../../lib/firebaseService";
import {
  Calendar,
  MapPin,
  Users,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Lock,
  ArrowRight,
  AlertTriangle,
  Check,
  X,
  Loader2,
  Search,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Helpers ───────────────────────────────────────────────
function formatDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ─── Toast ─────────────────────────────────────────────────
function Toast({ message, type, visible }) {
  return (
    <div
      className={`ev-toast ${visible ? "ev-toast-visible" : ""} ${
        type === "success" ? "ev-toast-success" : "ev-toast-error"
      }`}
      role="status"
      aria-live="polite"
    >
      {type === "success" ? (
        <Check size={14} strokeWidth={2.5} />
      ) : (
        <X size={14} strokeWidth={2.5} />
      )}{" "}
      {message}
    </div>
  );
}

// ─── Enrollment CTA Button ────────────────────────────────
function EnrollmentCTA({
  event,
  user,
  enrollmentMap,
  enrollingId,
  cancellingId,
  onEnroll,
  onCancel,
  onSignIn,
}) {
  // FIX 1: Add null check for enrollmentMap[event.id]
  const enrollment = event?.id ? enrollmentMap[event.id] : null;
  
  const isFull =
    event.maxParticipants &&
    event.enrolledCount != null &&
    event.enrolledCount >= event.maxParticipants;

  // Not signed in
  if (!user) {
    return (
      <button
        className="ev-btn-signin"
        onClick={onSignIn}
        id={`events-signin-${event.id}`}
      >
        <Shield size={15} strokeWidth={2} />
        Sign in to Enroll
      </button>
    );
  }

  // Full event — always show full regardless of enrollment status
  if (isFull) {
    // If already approved, still let them go to dashboard
    if (enrollment?.status === "APPROVED") {
      return (
        <a
          href="/dashboard"
          className="ev-btn-approved"
          id={`events-dashboard-${event.id}`}
        >
          <CheckCircle size={15} strokeWidth={2} />
          View in Dashboard
        </a>
      );
    }
    return (
      <div className="ev-btn-full" id={`events-full-${event.id}`}>
        <Lock size={15} strokeWidth={2} />
        Class Full
      </div>
    );
  }

  if (!enrollment) {
    // Not enrolled — can request
    return (
      <button
        className="ev-btn-enroll"
        onClick={() => onEnroll(event.id)}
        disabled={enrollingId === event.id}
        id={`events-enroll-${event.id}`}
      >
        {enrollingId === event.id ? (
          <>
            <Loader2 size={15} strokeWidth={2} className="ev-spin" />
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

  if (enrollment.status === "PENDING") {
    return (
      <button
        className="ev-btn-pending"
        onClick={() => onCancel(enrollment.id, event.id)}
        disabled={cancellingId === enrollment.id}
        id={`events-cancel-${event.id}`}
      >
        {cancellingId === enrollment.id ? (
          <>
            <Loader2 size={14} strokeWidth={2} className="ev-spin" />
            Cancelling…
          </>
        ) : (
          <>
            <Clock size={15} strokeWidth={2} />
            Pending — Cancel Request
          </>
        )}
      </button>
    );
  }

  if (enrollment.status === "APPROVED") {
    return (
      <a
        href="/dashboard"
        className="ev-btn-approved"
        id={`events-dashboard-${event.id}`}
      >
        <CheckCircle size={15} strokeWidth={2} />
        View in Dashboard
        <ArrowRight size={14} strokeWidth={2} />
      </a>
    );
  }

  if (enrollment.status === "REJECTED") {
    return (
      <div className="ev-btn-rejected" id={`events-rejected-${event.id}`}>
        <XCircle size={15} strokeWidth={2} />
        Application Rejected
      </div>
    );
  }

  // Fallback
  return null;
}

// ─── Spots Indicator ───────────────────────────────────────
function SpotsIndicator({ event }) {
  if (!event.maxParticipants) return null;

  const enrolled = event.enrolledCount || 0;
  const spots = event.maxParticipants - enrolled;

  if (spots <= 0) {
    return (
      <span className="ev-spots ev-spots-full">
        <Lock size={11} strokeWidth={2} />
        Full
      </span>
    );
  }

  if (spots <= 5) {
    return (
      <span className="ev-spots ev-spots-limited">
        <Users size={11} strokeWidth={2} />
        {spots} spot{spots !== 1 ? "s" : ""} left
      </span>
    );
  }

  return (
    <span className="ev-spots ev-spots-available">
      <Users size={11} strokeWidth={2} />
      {spots} spots open
    </span>
  );
}

// ─── Main Events Page ──────────────────────────────────────
export default function EventsPage() {
  // Data state
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [enrollmentMap, setEnrollmentMap] = useState({});

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollingId, setEnrollingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [darkMode, setDarkMode] = useState(false);

  // Theme class
  const themeClass = darkMode ? "events-page events-page-dark" : "events-page";

  // ── Toast ──
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  // ── Build enrollment map from array ──
  const buildEnrollmentMap = useCallback((enrollments) => {
    const map = {};
    enrollments.forEach((en) => {
      if (en.eventId) { // FIX 2: Ensure eventId exists
        map[en.eventId] = { id: en.id, status: en.status };
      }
    });
    return map;
  }, []);

  // ── FIX 3: Add a function to fetch all data ──
  const fetchAllData = useCallback(async (currentUser = null) => {
    try {
      // Always fetch events (public)
      const allEvents = await eventService.getAllEvents();
      setEvents(allEvents);

      // If signed in, fetch enrollments for the map
      if (currentUser) {
        try {
          const enrollments = await enrollmentService.getUserEnrollments(
            currentUser.uid
          );
          setEnrollmentMap(buildEnrollmentMap(enrollments));
        } catch (err) {
          console.error("Failed to fetch enrollments:", err);
          // Non-critical: enrollment status won't show, but events still render
        }
      } else {
        setEnrollmentMap({}); // Clear enrollment map when signed out
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to load events. Please try refreshing.");
      throw err;
    }
  }, [buildEnrollmentMap]);

  // ── Initial fetch ──
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        // Check auth first
        const currentUser = await authService.getCurrentUser();
        if (!mounted) return;
        setUser(currentUser);

        await fetchAllData(currentUser);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load events");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [fetchAllData]);

  // ── FIX 5: Add auth state listener using Firebase auth directly ──
  useEffect(() => {
    // Check if authService has the auth instance exposed
    // Most authService wrappers expose the Firebase auth instance
    const firebaseAuth = authService.auth || authService.getAuth?.();
    
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === 'function') {
      const unsubscribe = firebaseAuth.onAuthStateChanged(async (authUser) => {
        setUser(authUser);
        if (authUser) {
          try {
            const enrollments = await enrollmentService.getUserEnrollments(
              authUser.uid
            );
            setEnrollmentMap(buildEnrollmentMap(enrollments));
          } catch (err) {
            console.error("Failed to fetch enrollments after auth change:", err);
          }
        } else {
          setEnrollmentMap({});
        }
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    } else {
      // Fallback: poll for auth state changes
      console.warn("onAuthStateChanged not available, using polling fallback");
      let authCheckInterval = setInterval(async () => {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (err) {
          console.error("Auth polling error:", err);
        }
      }, 5000);

      return () => {
        if (authCheckInterval) clearInterval(authCheckInterval);
      };
    }
  }, [buildEnrollmentMap]);

  // ── FIX 6: Add real-time event listener ──
  useEffect(() => {
    // Check if eventService has the onEventsChanged method
    if (typeof eventService.onEventsChanged === 'function') {
      const unsubscribe = eventService.onEventsChanged((updatedEvents) => {
        if (updatedEvents) {
          setEvents(updatedEvents);
        }
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    } else {
      // Fallback: poll for event changes
      console.warn("onEventsChanged not available, using polling fallback");
      let eventCheckInterval = setInterval(async () => {
        try {
          const allEvents = await eventService.getAllEvents();
          setEvents(allEvents);
        } catch (err) {
          console.error("Event polling error:", err);
        }
      }, 10000);

      return () => {
        if (eventCheckInterval) clearInterval(eventCheckInterval);
      };
    }
  }, []);

  // ── Actions ──
  const handleSignIn = useCallback(async () => {
    try {
      const result = await authService.signInWithGoogle();
      if (result.success) {
        setUser(result.user);
        // Fetch enrollments for the newly signed-in user
        try {
          const enrollments = await enrollmentService.getUserEnrollments(
            result.user.uid
          );
          setEnrollmentMap(buildEnrollmentMap(enrollments));
        } catch (err) {
          console.error("Failed to fetch enrollments after sign in:", err);
        }
        showToast("Signed in successfully");
      } else {
        showToast(result.error || "Sign in failed", "error");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      showToast("Sign in failed", "error");
    }
  }, [buildEnrollmentMap, showToast]);

  const handleEnroll = useCallback(async (eventId) => {
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
      // Optimistically update the map
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
  }, [user, showToast]);

  const handleCancel = useCallback(async (enrollmentId, eventId) => {
    setCancellingId(enrollmentId);
    try {
      await enrollmentService.cancelEnrollment(enrollmentId, eventId);
      // Remove from map
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
  }, [showToast]);

  // ── Derived data ──
  const danceStyles = useMemo(() => {
    return [
      "All",
      ...new Set(events.map((e) => e.danceStyle).filter(Boolean)),
    ];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return activeFilter === "All"
      ? events
      : events.filter((e) => e.danceStyle === activeFilter);
  }, [events, activeFilter]);

  // ── Handle loading state properly ──
  if (loading) {
    return (
      <div className={themeClass}>
        <div className="ev-container">
          <div className="ev-skeleton ev-skeleton-hero" />
          <div className="ev-skeleton ev-skeleton-filter" />
          <div className="ev-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div className="ev-skeleton ev-skeleton-card" key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // RENDER: Page
  // ─────────────────────────────────────────────────────────
  return (
    <div className={themeClass}>
      <Header user={user} onSignIn={handleSignIn} />
      <div className="ev-container">
        {/* ── Error Banner ── */}
        {error && (
          <div className="ev-error ev-fade-in">
            <AlertTriangle size={18} strokeWidth={2} />
            <span>{error}</span>
          </div>
        )}

        {/* ── Hero ── */}
        <div className="ev-hero ev-fade-in">
          {/* Theme toggle */}
          <button
            className="ev-theme-toggle"
            onClick={() => setDarkMode((d) => !d)}
            id="events-theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <h1>
            <span className="ev-gradient-text">Explore Events</span>
          </h1>
          <p className="ev-hero-subtitle">
            From hip-hop to contemporary — find your next class, request a spot,
            and level up your dance game.
          </p>
          {events.length > 0 && (
            <div className="ev-hero-count">
              <Sparkles size={13} strokeWidth={2} />
              {events.length} Active Event{events.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* ── Filter Pills ── */}
        {danceStyles.length > 1 && (
          <div className="ev-filters ev-fade-in ev-fade-delay-1">
            {danceStyles.map((style) => (
              <button
                key={style}
                className={`ev-filter-pill ${
                  activeFilter === style ? "ev-filter-active" : ""
                }`}
                onClick={() => setActiveFilter(style)}
                id={`events-filter-${style.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {style}
              </button>
            ))}
          </div>
        )}

        {/* ── Event Grid ── */}
        {filteredEvents.length === 0 ? (
          <div className="ev-empty ev-fade-in">
            <div className="ev-empty-icon">
              <Search size={32} strokeWidth={1.5} />
            </div>
            <div className="ev-empty-title">
              {activeFilter !== "All"
                ? `No ${activeFilter} events right now`
                : "No events available"}
            </div>
            <div className="ev-empty-desc">
              {activeFilter !== "All"
                ? "Try a different style or check back soon for new classes."
                : "New events are added regularly. Check back soon!"}
            </div>
            {activeFilter !== "All" && (
              <button
                className="ev-filter-pill"
                onClick={() => setActiveFilter("All")}
                style={{ marginTop: "0.5rem" }}
              >
                Show All Events
              </button>
            )}
          </div>
        ) : (
          <div className="ev-grid ev-fade-in ev-fade-delay-2">
            {filteredEvents.map((event) => {
              const isFull =
                event.maxParticipants &&
                event.enrolledCount != null &&
                event.enrolledCount >= event.maxParticipants;

              return (
                <div className="ev-card" key={event.id}>
                  {/* Banner */}
                  <div className="ev-card-banner">
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        loading="lazy"
                      />
                    )}
                    <div className="ev-card-banner-scrim" />
                  </div>

                  {/* Body */}
                  <div className="ev-card-body">
                    {/* Badges */}
                    <div className="ev-card-badges">
                      {isFull ? (
                        <span className="ev-badge ev-badge-full">Full</span>
                      ) : (
                        <span className="ev-badge ev-badge-active">Active</span>
                      )}
                      {event.danceStyle && (
                        <span className="ev-badge ev-badge-style">
                          {event.danceStyle}
                        </span>
                      )}
                      {event.level && (
                        <span className="ev-badge ev-badge-level">
                          {event.level}
                        </span>
                      )}
                    </div>

                    {/* Title & description */}
                    <h3 className="ev-card-title">{event.title}</h3>
                    {event.description && (
                      <p className="ev-card-desc">{event.description}</p>
                    )}

                    {/* Meta */}
                    <div className="ev-card-meta">
                      {event.eventDate && (
                        <span className="ev-card-meta-item">
                          <Calendar size={13} strokeWidth={2} />
                          {formatShortDate(event.eventDate)}
                        </span>
                      )}
                      {event.venue && (
                        <span className="ev-card-meta-item">
                          <MapPin size={13} strokeWidth={2} />
                          {event.venue}
                        </span>
                      )}
                      <SpotsIndicator event={event} />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="ev-card-footer">
                    <EnrollmentCTA
                      event={event}
                      user={user}
                      enrollmentMap={enrollmentMap}
                      enrollingId={enrollingId}
                      cancellingId={cancellingId}
                      onEnroll={handleEnroll}
                      onCancel={handleCancel}
                      onSignIn={handleSignIn}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Toast ── */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />
      <Footer />
    </div>
  );
}