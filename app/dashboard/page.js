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
  Copy,
  CheckCircle,
  Link as LinkIcon,
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

// ─── Session Row Component ─────────────────────────────────
function SessionRow({ session, index }) {
  const [copied, setCopied] = useState(false);
  const meetingLink = session.meetingLink || null;

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    if (!meetingLink) return;
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div 
      className="session-row" 
      key={session.id || index}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1rem",
        background: "var(--surface-alt, rgba(255,255,255,0.03))",
        borderRadius: "10px",
        border: "1px solid var(--border, rgba(255,255,255,0.06))",
        transition: "all 0.2s ease",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--surface, rgba(255,255,255,0.06))";
        e.currentTarget.style.borderColor = "rgba(147,51,234,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--surface-alt, rgba(255,255,255,0.03))";
        e.currentTarget.style.borderColor = "var(--border, rgba(255,255,255,0.06))";
      }}
    >
      <div className="session-info" style={{ flex: 1, minWidth: "0" }}>
        <div className="session-title" style={{ 
          fontWeight: 600, 
          fontSize: "0.875rem",
          color: "var(--foreground)",
          marginBottom: "0.125rem"
        }}>
          {session.title || `Session ${index + 1}`}
        </div>
        <div className="session-date" style={{ 
          fontSize: "0.75rem", 
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            <Calendar size={12} strokeWidth={2} />
            {session.sessionDate ? formatDate(session.sessionDate) : "Date TBD"}
          </span>
          {session.sessionDate && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <Clock size={12} strokeWidth={2} />
              {formatTime(session.sessionDate)}
            </span>
          )}
        </div>
        
        {/* Meeting Link Display */}
        {meetingLink && (
          <div style={{ 
            marginTop: "0.375rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}>
            <LinkIcon size={12} strokeWidth={2} style={{ color: "var(--muted)", flexShrink: 0 }} />
            <span style={{ 
              fontSize: "0.7rem",
              color: "var(--muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "200px",
            }}>
              {meetingLink}
            </span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
        {meetingLink && (
          <>
            <button
              onClick={handleCopyLink}
              style={{
                padding: "0.35rem 0.6rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.7rem",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted)";
              }}
            >
              {copied ? (
                <CheckCircle size={14} strokeWidth={2} style={{ color: "#22C55E" }} />
              ) : (
                <Copy size={14} strokeWidth={2} />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
            
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient-cta btn-gradient-sm"
              id={`dashboard-join-session-${session.id}`}
              style={{
                padding: "0.35rem 0.875rem",
                borderRadius: "8px",
                fontSize: "0.7rem",
                fontWeight: "600",
                background: "linear-gradient(135deg, #9333EA, #DB2777)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 10px rgba(147,51,234,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(147,51,234,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(147,51,234,0.25)";
              }}
            >
              <ExternalLink size={12} strokeWidth={2} />
              Join
            </a>
          </>
        )}
        
        {!meetingLink && (
          <span style={{ 
            fontSize: "0.7rem", 
            color: "var(--muted)",
            padding: "0.35rem 0.875rem",
            background: "var(--surface)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
          }}>
            No link
          </span>
        )}
      </div>
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
  const [darkMode, setDarkMode] = useState(false);

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

  // ── Data fetching ──
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        const [userEnrollments, userEnrolledEvents] = await Promise.all([
          enrollmentService.getUserEnrollments(user.uid),
          eventService.getUserEnrolledEvents(user.uid),
        ]);
        if (cancelled) return;

        setEnrollments(userEnrollments);
        setEnrolledEvents(userEnrolledEvents);

        const evtMap = {};
        userEnrolledEvents.forEach((e) => {
          evtMap[e.id] = e;
        });

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

        const sessionMap = {};
        await Promise.all(
          userEnrolledEvents.map(async (event) => {
            try {
              const sessions = await sessionService.getSessionsByEvent(event.id);
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

    const unsubEnrollments = notificationService.subscribeToEnrollments(
      user.uid,
      async (updatedEnrollments) => {
        setEnrollments(updatedEnrollments);
        try {
          const freshEvents = await eventService.getUserEnrolledEvents(user.uid);
          setEnrolledEvents(freshEvents);

          const evtMap = {};
          freshEvents.forEach((e) => {
            evtMap[e.id] = e;
          });

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

          const sessionMap = {};
          await Promise.all(
            freshEvents.map(async (event) => {
              try {
                const sessions = await sessionService.getSessionsByEvent(event.id);
                sessionMap[event.id] = sessions;
              } catch {
                sessionMap[event.id] = [];
              }
            })
          );
          setEventSessions(sessionMap);
        } catch {
          // Non-critical
        }
      }
    );

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
  const approvedEnrollments = enrollments.filter((e) => e.status === "APPROVED");
  const pendingEnrollments = enrollments.filter((e) => e.status === "PENDING");
  const rejectedEnrollments = enrollments.filter((e) => e.status === "REJECTED");

  const totalSessions = Object.values(eventSessions).reduce(
    (sum, sessions) => sum + sessions.length,
    0
  );

  const themeClass = darkMode ? "dashboard dashboard-dark" : "dashboard";

  // ── RENDER: Sign-In Prompt ──
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

  // ── RENDER: Loading ──
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
            <div className="skeleton skeleton-line" style={{ marginBottom: "1.25rem" }} />
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

  // ── RENDER: Dashboard ──
  return (
    <div className={themeClass}>
      <Header user={user} onSignOut={handleSignOut} />
      <div className="dash-container">
        {error && (
          <div className="error-banner fade-in" style={{ marginBottom: "1.5rem" }}>
            <AlertTriangle size={18} strokeWidth={2} className="error-banner-icon" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Header */}
        <div className="dash-card-hero fade-in">
          <div className="profile-header">
            <div className="profile-top">
              <div className="profile-avatar">
                {profile?.photoUrl ? (
                  <img src={profile.photoUrl} alt={profile?.name || "User"} referrerPolicy="no-referrer" />
                ) : (
                  <span className="profile-avatar-fallback">{getInitials(profile?.name)}</span>
                )}
              </div>
              <div className="profile-info">
                <div className="profile-name">{profile?.name || "Dancer"}</div>
                <div className="profile-email">{profile?.email || user?.email}</div>
                {profile?.phone && (
                  <div className="dash-caption" style={{ marginTop: "0.125rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <Phone size={13} strokeWidth={2} />
                    {profile.phone}
                  </div>
                )}
              </div>
            </div>
            <div className="profile-actions">
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
                {editingProfile ? <><X size={15} strokeWidth={2} /> Cancel</> : <><Edit3 size={15} strokeWidth={2} /> Edit Profile</>}
              </button>
              <button className="btn-ghost" onClick={handleSignOut} id="dashboard-signout-btn">
                <LogOut size={15} strokeWidth={2} /> Sign Out
              </button>
            </div>
          </div>

          {editingProfile && (
            <div className="profile-edit-form fade-in">
              <div className="form-group">
                <label className="form-label" htmlFor="edit-name">Name</label>
                <input
                  className="form-input"
                  id="edit-name"
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="edit-phone">Phone</label>
                <input
                  className="form-input"
                  id="edit-phone"
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
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
                  {savingProfile ? <><Loader2 size={16} strokeWidth={2} className="spin-icon" /> Saving…</> : <><Save size={16} strokeWidth={2} /> Save Changes</>}
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    setEditingProfile(false);
                    setEditForm({ name: profile?.name || "", phone: profile?.phone || "" });
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="dash-stats-row fade-in fade-in-delay-1" style={{ marginTop: "1.5rem" }}>
          <div className="dash-stat-card stat-card-events">
            <div className="stat-icon-wrap stat-icon-primary"><Target size={20} strokeWidth={2} /></div>
            <span className="dash-stat-number">{approvedEnrollments.length}</span>
            <span className="dash-stat-label">Enrolled Events</span>
          </div>
          <div className="dash-stat-card stat-card-sessions">
            <div className="stat-icon-wrap stat-icon-tertiary"><Activity size={20} strokeWidth={2} /></div>
            <span className="dash-stat-number">{totalSessions}</span>
            <span className="dash-stat-label">Upcoming Sessions</span>
          </div>
          <div className="dash-stat-card stat-card-pending">
            <div className="stat-icon-wrap stat-icon-secondary"><Clock size={20} strokeWidth={2} /></div>
            <span className="dash-stat-number">{pendingEnrollments.length}</span>
            <span className="dash-stat-label">Pending Requests</span>
          </div>
        </div>

        {/* My Events */}
        <div className="section-header fade-in fade-in-delay-2">
          <Target size={22} strokeWidth={2} className="section-icon-svg" />
          <h2>My Events</h2>
          {approvedEnrollments.length > 0 && <span className="section-count">{approvedEnrollments.length}</span>}
        </div>

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
            <div className="empty-state-icon-wrap"><Flame size={36} strokeWidth={1.5} /></div>
            <div className="empty-state-title">Drop into Your First Class</div>
            <div className="empty-state-desc">You haven't enrolled in any events yet. Browse what's coming up and jump in!</div>
            <a href="/events" className="btn-gradient-cta" id="dashboard-browse-events-link">
              <Flame size={16} strokeWidth={2} /> Browse Events
            </a>
          </div>
        ) : enrolledEvents.length === 0 ? (
          <div className="dash-card empty-state fade-in" style={{ padding: "2rem" }}>
            <div className="empty-state-icon-wrap"><Clock size={36} strokeWidth={1.5} /></div>
            <div className="empty-state-title">No Approved Events Yet</div>
            <div className="empty-state-desc">Your enrollment requests are being reviewed. Check back soon!</div>
          </div>
        ) : (
          <div className="dash-grid fade-in fade-in-delay-2">
            {enrolledEvents.map((event) => {
              const sessions = eventSessions[event.id] || [];
              const isExpanded = expandedEvents[event.id];
              const bannerImage = event.bannerUrl || event.imageUrl || null;

              return (
                <div className="event-card" key={event.id}>
                  {bannerImage && (
                    <div className="event-card-banner" style={{ height: "140px", overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={bannerImage}
                        alt={event.title}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}
                  
                  <div className="event-card-body">
                    <div className="event-card-meta">
                      <span className="badge badge-approved">Enrolled</span>
                      {event.danceStyle && <span className="badge badge-style">{event.danceStyle}</span>}
                    </div>
                    <div className="event-card-title">{event.title}</div>
                    {event.description && <div className="event-card-desc">{event.description}</div>}
                    <div className="event-card-footer">
                      <div className="dash-caption" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        {event.eventDate && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <Calendar size={13} strokeWidth={2} /> {formatDate(event.eventDate)}
                          </span>
                        )}
                        {event.venue && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <MapPin size={13} strokeWidth={2} /> {event.venue}
                          </span>
                        )}
                      </div>
                    </div>

                    {sessions.length > 0 && (
                      <button
                        className="sessions-toggle"
                        onClick={() => toggleEventSessions(event.id)}
                        id={`dashboard-toggle-sessions-${event.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "transparent",
                          border: "none",
                          color: "var(--muted)",
                          cursor: "pointer",
                          padding: "0.5rem 0",
                          fontSize: "0.8125rem",
                          fontWeight: "500",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}
                      >
                        <ChevronRight
                          size={14}
                          strokeWidth={2.5}
                          style={{
                            transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                        {sessions.length} Session{sessions.length !== 1 ? "s" : ""}
                      </button>
                    )}
                    {sessions.length === 0 && (
                      <div className="dash-caption" style={{ opacity: 0.6 }}>No sessions scheduled yet</div>
                    )}
                  </div>

                  {isExpanded && sessions.length > 0 && (
                    <div className="sessions-panel" style={{ padding: "0 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {sessions.map((session, idx) => (
                        <SessionRow key={session.id || idx} session={session} index={idx} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pending Requests */}
        {pendingEnrollments.length > 0 && (
          <>
            <div className="section-header fade-in fade-in-delay-3">
              <Clock size={22} strokeWidth={2} className="section-icon-svg" />
              <h2>Pending Requests</h2>
              <span className="section-count">{pendingEnrollments.length}</span>
            </div>
            <div className="fade-in fade-in-delay-3" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pendingEnrollments.map((enrollment) => {
                const event = allEvents[enrollment.eventId];
                return (
                  <div className="pending-card" key={enrollment.id}>
                    <div className="pending-card-info">
                      <div className="pending-card-title">{event?.title || "Loading event…"}</div>
                      <div className="pending-card-date">Requested {formatDateTime(enrollment.requestedAt || enrollment.createdAt)}</div>
                      <span className="badge badge-pending" style={{ marginTop: "0.375rem", alignSelf: "flex-start" }}>Pending Review</span>
                    </div>
                    <button
                      className="btn-danger"
                      onClick={() => handleCancelEnrollment(enrollment.id, enrollment.eventId)}
                      disabled={cancellingId === enrollment.id}
                      id={`dashboard-cancel-enrollment-${enrollment.id}`}
                    >
                      {cancellingId === enrollment.id ? <><Loader2 size={14} strokeWidth={2} className="spin-icon" /> Cancelling…</> : <><XCircle size={14} strokeWidth={2} /> Cancel</>}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Rejected */}
        {rejectedEnrollments.length > 0 && (
          <>
            <div className="section-header fade-in fade-in-delay-4">
              <XCircle size={22} strokeWidth={2} className="section-icon-svg" />
              <h2>Rejected</h2>
            </div>
            <div className="fade-in fade-in-delay-4" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {rejectedEnrollments.map((enrollment) => {
                const event = allEvents[enrollment.eventId];
                return (
                  <div className="rejected-card" key={enrollment.id}>
                    <div className="pending-card-info">
                      <div className="pending-card-title">{event?.title || "Event"}</div>
                      <div className="pending-card-date">Requested {formatDateTime(enrollment.requestedAt || enrollment.createdAt)}</div>
                    </div>
                    <span className="badge badge-rejected">Rejected</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <Footer />

      <style jsx>{`
        .session-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: var(--surface-alt, rgba(255,255,255,0.03));
          border-radius: 10px;
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          transition: all 0.2s ease;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .session-row:hover {
          background: var(--surface, rgba(255,255,255,0.06));
          border-color: rgba(147,51,234,0.2);
        }
        .session-info {
          flex: 1;
          min-width: 0;
        }
        .session-title {
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--foreground);
          margin-bottom: 0.125rem;
        }
        .session-date {
          font-size: 0.75rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .btn-copy {
          padding: 0.35rem 0.6rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          font-family: var(--font-body);
        }
        .btn-copy:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        .btn-join {
          padding: 0.35rem 0.875rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 600;
          background: linear-gradient(135deg, #9333EA, #DB2777);
          color: #fff;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(147,51,234,0.25);
        }
        .btn-join:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 4px 20px rgba(147,51,234,0.35);
        }
        .btn-no-link {
          font-size: 0.7rem;
          color: var(--muted);
          padding: 0.35rem 0.875rem;
          background: var(--surface);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .link-display {
          margin-top: 0.375rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .link-display span {
          font-size: 0.7rem;
          color: var(--muted);
          overflow: hidden;
          textOverflow: ellipsis;
          whiteSpace: nowrap;
          maxWidth: 200px;
        }
        .session-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .session-row {
            flex-direction: column;
            align-items: stretch;
          }
          .session-actions {
            justify-content: flex-start;
          }
          .link-display span {
            maxWidth: 150px;
          }
        }
      `}</style>
    </div>
  );
}

