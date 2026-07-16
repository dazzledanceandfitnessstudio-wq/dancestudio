"use client";

import { useState, useEffect, useCallback } from "react";
import {
  authService,
  eventService,
  enrollmentService,
  sessionService,
  notificationService,
} from "../../lib/firebaseService";
import {
  Target,
  Activity,
  Flame,
  User,
  LogOut,
  Edit3,
  X,
  Check,
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  ChevronRight,
  ExternalLink,
  Clock,
  Shield,
  Save,
  Sun,
  Moon,
  Zap,
  XCircle,
  Loader2,
} from "lucide-react";
import "./dashboard.css";

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

function formatTime(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateTime(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Toast Component ───────────────────────────────────────
function Toast({ message, type, visible }) {
  return (
    <div
      className={`toast ${visible ? "visible" : ""} ${
        type === "success" ? "toast-success" : "toast-error"
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

// ─── Main Dashboard ────────────────────────────────────────
export default function DashboardPage() {
  // Auth state
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Data state
  const [enrollments, setEnrollments] = useState([]);
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [eventSessions, setEventSessions] = useState({});
  const [allEvents, setAllEvents] = useState({});

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState({});
  const [cancellingId, setCancellingId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [activeTab, setActiveTab] = useState("active");
  const [darkMode, setDarkMode] = useState(true);

  // ── Toast helper ──
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  // ── Auth check ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (cancelled) return;
        setUser(currentUser);
        setAuthChecked(true);

        if (!currentUser) {
          setLoading(false);
          return;
        }

        // Fetch profile
        const userProfile = await authService.getUserProfile(currentUser.uid);
        if (cancelled) return;
        setProfile(userProfile);
        setEditForm({
          name: userProfile?.name || "",
          phone: userProfile?.phone || "",
        });
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load your profile. Please try again.");
          setLoading(false);
          setAuthChecked(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Data fetching (runs after auth) ──
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        // Fetch enrollments + enrolled events in parallel
        const [userEnrollments, userEnrolledEvents] = await Promise.all([
          enrollmentService.getUserEnrollments(user.uid),
          eventService.getUserEnrolledEvents(user.uid),
        ]);
        if (cancelled) return;

        setEnrollments(userEnrollments);
        setEnrolledEvents(userEnrolledEvents);

        // Build a map of events for quick lookup (for pending/rejected cards)
        const evtMap = {};
        userEnrolledEvents.forEach((e) => {
          evtMap[e.id] = e;
        });

        // Fetch event details for non-approved enrollments (pending/rejected)
        const nonApprovedIds = userEnrollments
          .filter((en) => en.status !== "APPROVED" && !evtMap[en.eventId])
          .map((en) => en.eventId);

        const uniqueIds = [...new Set(nonApprovedIds)];
        if (uniqueIds.length > 0) {
          const eventDocs = await Promise.all(
            uniqueIds.map((id) => eventService.getEvent(id))
          );
          eventDocs.forEach((ev) => {
            if (ev) evtMap[ev.id] = ev;
          });
        }
        if (cancelled) return;
        setAllEvents(evtMap);

        // Fetch sessions for each approved event
        const sessionMap = {};
        await Promise.all(
          userEnrolledEvents.map(async (event) => {
            try {
              const sessions = await sessionService.getSessionsByEvent(
                event.id
              );
              sessionMap[event.id] = sessions;
            } catch {
              sessionMap[event.id] = [];
            }
          })
        );
        if (cancelled) return;
        setEventSessions(sessionMap);
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load dashboard data. Please try refreshing.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // ── Real-time subscriptions ──
  useEffect(() => {
    if (!user) return;

    // Subscribe to enrollment changes
    const unsubEnrollments = notificationService.subscribeToEnrollments(
      user.uid,
      async (updatedEnrollments) => {
        setEnrollments(updatedEnrollments);

        // Re-fetch enrolled events when enrollment statuses change
        try {
          const freshEvents = await eventService.getUserEnrolledEvents(
            user.uid
          );
          setEnrolledEvents(freshEvents);

          // Update event map
          const evtMap = {};
          freshEvents.forEach((e) => {
            evtMap[e.id] = e;
          });

          // Fetch event details for non-approved
          const nonApprovedIds = updatedEnrollments
            .filter((en) => en.status !== "APPROVED" && !evtMap[en.eventId])
            .map((en) => en.eventId);
          const uniqueIds = [...new Set(nonApprovedIds)];
          if (uniqueIds.length > 0) {
            const eventDocs = await Promise.all(
              uniqueIds.map((id) => eventService.getEvent(id))
            );
            eventDocs.forEach((ev) => {
              if (ev) evtMap[ev.id] = ev;
            });
          }
          setAllEvents(evtMap);

          // Re-fetch sessions for new approved events
          const sessionMap = {};
          await Promise.all(
            freshEvents.map(async (event) => {
              try {
                const sessions = await sessionService.getSessionsByEvent(
                  event.id
                );
                sessionMap[event.id] = sessions;
              } catch {
                sessionMap[event.id] = [];
              }
            })
          );
          setEventSessions(sessionMap);
        } catch {
          // Non-critical: real-time will catch up
        }
      }
    );

    // Subscribe to profile changes
    const unsubProfile = notificationService.subscribeToUserProfile(
      user.uid,
      (updatedProfile) => {
        setProfile(updatedProfile);
        setEditForm({
          name: updatedProfile?.name || "",
          phone: updatedProfile?.phone || "",
        });
      }
    );

    return () => {
      unsubEnrollments();
      unsubProfile();
    };
  }, [user]);

  // ── Actions ──
  const handleSignIn = async () => {
    const result = await authService.signInWithGoogle();
    if (result.success) {
      setUser(result.user);
      setLoading(true);
    } else {
      showToast(result.error || "Sign in failed", "error");
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
    setEnrollments([]);
    setEnrolledEvents([]);
    setEventSessions({});
    setAuthChecked(true);
    setLoading(false);
  };

  const handleProfileSave = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      await authService.updateUserProfile(user.uid, {
        name: editForm.name,
        phone: editForm.phone,
      });
      setEditingProfile(false);
      showToast("Profile updated");
    } catch {
      showToast("Failed to update profile", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelEnrollment = async (enrollmentId, eventId) => {
    setCancellingId(enrollmentId);
    try {
      await enrollmentService.cancelEnrollment(enrollmentId, eventId);
      showToast("Enrollment request cancelled");
    } catch {
      showToast("Failed to cancel request", "error");
    } finally {
      setCancellingId(null);
    }
  };

  const toggleEventSessions = (eventId) => {
    setExpandedEvents((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  // ── Derived data ──
  const approvedEnrollments = enrollments.filter(
    (e) => e.status === "APPROVED"
  );
  const pendingEnrollments = enrollments.filter((e) => e.status === "PENDING");
  const rejectedEnrollments = enrollments.filter(
    (e) => e.status === "REJECTED"
  );

  const totalSessions = Object.values(eventSessions).reduce(
    (sum, sessions) => sum + sessions.length,
    0
  );

  // Theme class
  const themeClass = darkMode ? "dashboard" : "dashboard dashboard-light";

  // ─────────────────────────────────────────────────────────
  // RENDER: Sign-In Prompt
  // ─────────────────────────────────────────────────────────
  if (authChecked && !user) {
    return (
      <div className={themeClass}>
        <div className="signin-prompt fade-in">
          <div className="signin-prompt-icon-wrap">
            <Zap size={48} strokeWidth={1.5} className="signin-hero-icon" />
          </div>
          <h1>
            <span className="gradient-text">Your Dance Hub</span>
          </h1>
          <p>
            Sign in to view your enrolled classes, track sessions, and manage
            your dance journey.
          </p>
          <button
            className="btn-gradient-cta"
            onClick={handleSignIn}
            id="dashboard-signin-btn"
          >
            <Shield size={18} strokeWidth={2} />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // RENDER: Loading Skeleton
  // ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={themeClass}>
        <div className="dash-container">
          <div className="skeleton skeleton-hero" />
          <div className="dash-stats-row" style={{ marginTop: "1.5rem" }}>
            <div className="skeleton skeleton-stat" />
            <div className="skeleton skeleton-stat" />
            <div className="skeleton skeleton-stat" />
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <div
              className="skeleton skeleton-line"
              style={{ marginBottom: "1.25rem" }}
            />
            <div className="dash-grid">
              <div className="skeleton skeleton-card" />
              <div className="skeleton skeleton-card" />
              <div className="skeleton skeleton-card" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // RENDER: Dashboard
  // ─────────────────────────────────────────────────────────
  return (
    <div className={themeClass}>
      <div className="dash-container">
        {/* ── Error Banner ── */}
        {error && (
          <div className="error-banner fade-in" style={{ marginBottom: "1.5rem" }}>
            <AlertTriangle size={18} strokeWidth={2} className="error-banner-icon" />
            <span>{error}</span>
          </div>
        )}

        {/* ── Profile Header ── */}
        <div className="dash-card-hero fade-in">
          <div className="profile-header">
            <div className="profile-top">
              <div className="profile-avatar">
                {profile?.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile?.name || "User"}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="profile-avatar-fallback">
                    {getInitials(profile?.name)}
                  </span>
                )}
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  {profile?.name || "Dancer"}
                </div>
                <div className="profile-email">
                  {profile?.email || user?.email}
                </div>
                {profile?.phone && (
                  <div className="dash-caption" style={{ marginTop: "0.125rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <Phone size={13} strokeWidth={2} />
                    {profile.phone}
                  </div>
                )}
              </div>
            </div>
            <div className="profile-actions">
              {/* Dark / Light mode toggle */}
              <button
                className="btn-ghost"
                onClick={() => setDarkMode((d) => !d)}
                id="dashboard-theme-toggle-btn"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
                {darkMode ? "Light" : "Dark"}
              </button>
              <button
                className="btn-ghost"
                onClick={() => setEditingProfile(!editingProfile)}
                id="dashboard-edit-profile-btn"
              >
                {editingProfile ? (
                  <><X size={15} strokeWidth={2} /> Cancel</>
                ) : (
                  <><Edit3 size={15} strokeWidth={2} /> Edit Profile</>
                )}
              </button>
              <button
                className="btn-ghost"
                onClick={handleSignOut}
                id="dashboard-signout-btn"
              >
                <LogOut size={15} strokeWidth={2} />
                Sign Out
              </button>
            </div>
          </div>

          {/* ── Inline Profile Edit Form ── */}
          {editingProfile && (
            <div className="profile-edit-form fade-in">
              <div className="form-group">
                <label className="form-label" htmlFor="edit-name">
                  Name
                </label>
                <input
                  className="form-input"
                  id="edit-name"
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="edit-phone">
                  Phone
                </label>
                <input
                  className="form-input"
                  id="edit-phone"
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="Your phone number"
                />
              </div>
              <div className="form-actions">
                <button
                  className="btn-gradient-cta"
                  onClick={handleProfileSave}
                  disabled={savingProfile}
                  id="dashboard-save-profile-btn"
                >
                  {savingProfile ? (
                    <><Loader2 size={16} strokeWidth={2} className="spin-icon" /> Saving…</>
                  ) : (
                    <><Save size={16} strokeWidth={2} /> Save Changes</>
                  )}
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    setEditingProfile(false);
                    setEditForm({
                      name: profile?.name || "",
                      phone: profile?.phone || "",
                    });
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Stats Row ── */}
        <div
          className="dash-stats-row fade-in fade-in-delay-1"
          style={{ marginTop: "1.5rem" }}
        >
          <div className="dash-stat-card stat-card-events">
            <div className="stat-icon-wrap stat-icon-primary">
              <Target size={20} strokeWidth={2} />
            </div>
            <span className="dash-stat-number">
              {approvedEnrollments.length}
            </span>
            <span className="dash-stat-label">Enrolled Events</span>
          </div>
          <div className="dash-stat-card stat-card-sessions">
            <div className="stat-icon-wrap stat-icon-tertiary">
              <Activity size={20} strokeWidth={2} />
            </div>
            <span className="dash-stat-number">{totalSessions}</span>
            <span className="dash-stat-label">Upcoming Sessions</span>
          </div>
          <div className="dash-stat-card stat-card-pending">
            <div className="stat-icon-wrap stat-icon-secondary">
              <Clock size={20} strokeWidth={2} />
            </div>
            <span className="dash-stat-number">
              {pendingEnrollments.length}
            </span>
            <span className="dash-stat-label">Pending Requests</span>
          </div>
        </div>

        {/* ── My Events Section Header + Toggle ── */}
        <div className="section-header fade-in fade-in-delay-2">
          <Target size={22} strokeWidth={2} className="section-icon-svg" />
          <h2>My Events</h2>
          {approvedEnrollments.length > 0 && (
            <span className="section-count">{approvedEnrollments.length}</span>
          )}
        </div>

        {/* ── Segmented Toggle ── */}
        <div className="segment-toggle fade-in fade-in-delay-2">
          <button
            className={`segment-btn ${activeTab === "active" ? "segment-active" : ""}`}
            onClick={() => setActiveTab("active")}
            id="dashboard-tab-active"
          >
            Active Sessions
          </button>
          <button
            className={`segment-btn ${activeTab === "history" ? "segment-active" : ""}`}
            onClick={() => setActiveTab("history")}
            id="dashboard-tab-history"
          >
            Past History
          </button>
        </div>

        {enrolledEvents.length === 0 && pendingEnrollments.length === 0 && rejectedEnrollments.length === 0 ? (
          <div className="dash-card empty-state fade-in">
            <div className="empty-state-icon-wrap">
              <Flame size={36} strokeWidth={1.5} />
            </div>
            <div className="empty-state-title">Drop into Your First Class</div>
            <div className="empty-state-desc">
              You haven&apos;t enrolled in any events yet. Browse what&apos;s coming up
              and jump in!
            </div>
            <a href="/events" className="btn-gradient-cta" id="dashboard-browse-events-link">
              <Flame size={16} strokeWidth={2} />
              Browse Events
            </a>
          </div>
        ) : enrolledEvents.length === 0 ? (
          <div className="dash-card empty-state fade-in" style={{ padding: "2rem" }}>
            <div className="empty-state-icon-wrap">
              <Clock size={36} strokeWidth={1.5} />
            </div>
            <div className="empty-state-title">No Approved Events Yet</div>
            <div className="empty-state-desc">
              Your enrollment requests are being reviewed. Check back soon!
            </div>
          </div>
        ) : (
          <div className="dash-grid fade-in fade-in-delay-2">
            {enrolledEvents.map((event) => {
              const sessions = eventSessions[event.id] || [];
              const isExpanded = expandedEvents[event.id];
              return (
                <div className="event-card" key={event.id}>
                  <div className="event-card-body">
                    <div className="event-card-meta">
                      <span className="badge badge-approved">Enrolled</span>
                      {event.danceStyle && (
                        <span className="badge badge-style">
                          {event.danceStyle}
                        </span>
                      )}
                    </div>
                    <div className="event-card-title">{event.title}</div>
                    {event.description && (
                      <div className="event-card-desc">{event.description}</div>
                    )}
                    <div className="event-card-footer">
                      <div className="dash-caption" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        {event.eventDate && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <Calendar size={13} strokeWidth={2} />
                            {formatDate(event.eventDate)}
                          </span>
                        )}
                        {event.venue && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <MapPin size={13} strokeWidth={2} />
                            {event.venue}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Sessions toggle */}
                    {sessions.length > 0 && (
                      <button
                        className="sessions-toggle"
                        onClick={() => toggleEventSessions(event.id)}
                        id={`dashboard-toggle-sessions-${event.id}`}
                      >
                        <ChevronRight
                          size={14}
                          strokeWidth={2.5}
                          className={`sessions-toggle-chevron ${isExpanded ? "open" : ""}`}
                        />
                        {sessions.length} Session
                        {sessions.length !== 1 ? "s" : ""}
                      </button>
                    )}
                    {sessions.length === 0 && (
                      <div className="dash-caption" style={{ opacity: 0.6 }}>
                        No sessions scheduled yet
                      </div>
                    )}
                  </div>

                  {/* Expanded sessions panel */}
                  {isExpanded && sessions.length > 0 && (
                    <div className="sessions-panel">
                      {sessions.map((session) => (
                        <div className="session-row" key={session.id}>
                          <div className="session-info">
                            <div className="session-title">
                              {session.title || "Session"}
                            </div>
                            <div className="session-date">
                              {session.sessionDate
                                ? `${formatDate(session.sessionDate)} · ${formatTime(session.sessionDate)}`
                                : "Date TBD"}
                            </div>
                          </div>
                          {session.meetingLink && (
                            <a
                              href={session.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-gradient-cta btn-gradient-sm"
                              id={`dashboard-join-session-${session.id}`}
                            >
                              <ExternalLink size={14} strokeWidth={2} />
                              Join
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pending Requests ── */}
        {pendingEnrollments.length > 0 && (
          <>
            <div className="section-header fade-in fade-in-delay-3">
              <Clock size={22} strokeWidth={2} className="section-icon-svg" />
              <h2>Pending Requests</h2>
              <span className="section-count">{pendingEnrollments.length}</span>
            </div>
            <div
              className="fade-in fade-in-delay-3"
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {pendingEnrollments.map((enrollment) => {
                const event = allEvents[enrollment.eventId];
                return (
                  <div className="pending-card" key={enrollment.id}>
                    <div className="pending-card-info">
                      <div className="pending-card-title">
                        {event?.title || "Loading event…"}
                      </div>
                      <div className="pending-card-date">
                        Requested {formatDateTime(enrollment.requestedAt || enrollment.createdAt)}
                      </div>
                      <span className="badge badge-pending" style={{ marginTop: "0.375rem", alignSelf: "flex-start" }}>
                        Pending Review
                      </span>
                    </div>
                    <button
                      className="btn-danger"
                      onClick={() =>
                        handleCancelEnrollment(
                          enrollment.id,
                          enrollment.eventId
                        )
                      }
                      disabled={cancellingId === enrollment.id}
                      id={`dashboard-cancel-enrollment-${enrollment.id}`}
                    >
                      {cancellingId === enrollment.id ? (
                        <><Loader2 size={14} strokeWidth={2} className="spin-icon" /> Cancelling…</>
                      ) : (
                        <><XCircle size={14} strokeWidth={2} /> Cancel</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Rejected ── */}
        {rejectedEnrollments.length > 0 && (
          <>
            <div className="section-header fade-in fade-in-delay-4">
              <XCircle size={22} strokeWidth={2} className="section-icon-svg" />
              <h2>Rejected</h2>
            </div>
            <div
              className="fade-in fade-in-delay-4"
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {rejectedEnrollments.map((enrollment) => {
                const event = allEvents[enrollment.eventId];
                return (
                  <div className="rejected-card" key={enrollment.id}>
                    <div className="pending-card-info">
                      <div className="pending-card-title">
                        {event?.title || "Event"}
                      </div>
                      <div className="pending-card-date">
                        Requested {formatDateTime(enrollment.requestedAt || enrollment.createdAt)}
                      </div>
                    </div>
                    <span className="badge badge-rejected">Rejected</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ── Toast ── */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
      />
    </div>
  );
}
