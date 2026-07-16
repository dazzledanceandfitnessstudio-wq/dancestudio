"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  authService,
  eventService,
  postService,
  enrollmentService,
} from "../lib/firebaseService";
import {
  db,
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  serverTimestamp,
} from "../lib/firebase";
import {
  Sparkles,
  Zap,
  ArrowRight,
  Shield,
  Clock,
  Camera,
  MessageCircle,
  Video,
  Mail,
  MapPin,
  Phone,
  Check,
  X,
  Loader2,
  User,
  LogIn,
} from "lucide-react";
import "./landing.css";

// ─── Seed Data (written to Firestore if empty) ─────────────
const SEED_EVENTS = [
  {
    id: "hiphop_intro",
    title: "Intro to Hip Hop",
    description:
      "Master the foundations of hip hop dance. Perfect for beginners looking to find their groove.",
    imageUrl:
      "https://cdn.prod.website-files.com/5dbb40d6d8c97447e9450447/60baaab0aa12e6d6ad9074b6_STEEZY_HIPHOP-min.avif",
    danceStyle: "Hip Hop",
    level: "Beginner",
    venue: "Studio A",
    maxParticipants: 30,
    enrolledCount: 0,
    pendingCount: 0,
    status: "ACTIVE",
  },
  {
    id: "jazz_funk",
    title: "Jazz Funk Fundamentals",
    description:
      "Combine the technique of jazz with the raw street style of hip hop in this high-energy class.",
    imageUrl:
      "https://cdn.prod.website-files.com/5dbb40d6d8c97447e9450447/60baaab0f8caa4145fe07fef_STEEZY_JAZZ-min.avif",
    danceStyle: "Jazz Funk",
    level: "Intermediate",
    venue: "Studio B",
    maxParticipants: 25,
    enrolledCount: 0,
    pendingCount: 0,
    status: "ACTIVE",
  },
  {
    id: "contemporary_ballet",
    title: "Contemporary Ballet",
    description:
      "A modern twist on classical ballet focusing on expression, fluidity, and core strength.",
    imageUrl:
      "https://cdn.prod.website-files.com/5dbb40d6d8c97447e9450447/60baaab004cd38de543dd7a1_STEEZY_BALLET-min.avif",
    danceStyle: "Ballet",
    level: "All Levels",
    venue: "Main Hall",
    maxParticipants: 20,
    enrolledCount: 0,
    pendingCount: 0,
    status: "ACTIVE",
  },
];

const DEMO_POSTS = [
  {
    id: "demo_post_1",
    title: "5 Tips to Improve Your Groove",
    excerpt:
      "Stop overthinking your moves and start feeling the music. Here is how to loosen up and find your natural groove on the dance floor.",
    createdAt: new Date(),
    isDemo: true,
  },
  {
    id: "demo_post_2",
    title: "Meet Our New Instructors",
    excerpt:
      "We are thrilled to welcome two world-class choreographers to the Dazzle family this season.",
    createdAt: new Date(Date.now() - 86400000 * 3),
    isDemo: true,
  },
  {
    id: "demo_post_3",
    title: "The Importance of Stretching",
    excerpt:
      "Don't skip the warm-up! Why flexibility and dynamic stretching are critical for preventing dance injuries.",
    createdAt: new Date(Date.now() - 86400000 * 7),
    isDemo: true,
  },
];

// ─── One-time DB seeding ───────────────────────────────────
async function seedEventsIfEmpty() {
  try {
    const q = query(
      collection(db, "events"),
      where("status", "==", "ACTIVE")
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("[Dazzle] No active events found — seeding database…");
      const promises = SEED_EVENTS.map((event) => {
        const { id, ...data } = event;
        return setDoc(doc(db, "events", id), {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });
      await Promise.all(promises);
      console.log("[Dazzle] Seeded 3 events successfully.");
      return true;
    }
    return false;
  } catch (err) {
    console.error("[Dazzle] Seed error:", err);
    return false;
  }
}

// ─── Helpers ───────────────────────────────────────────────
function formatShortDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Toast({ message, type, visible }) {
  return (
    <div
      className={`ld-toast ${visible ? "ld-toast-visible" : ""} ${
        type === "success" ? "ld-toast-success" : "ld-toast-error"
      }`}
      role="status"
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

// ─── Main Component ────────────────────────────────────────
export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  // Profile Modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", phone: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [pendingEventId, setPendingEventId] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  // ── Initialization ──
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // Auth
      try {
        const redirectResult = await authService.handleRedirectResult();
        if (redirectResult && redirectResult.success) {
          if (!cancelled) setUser(redirectResult.user);
        } else {
          const currentUser = await authService.getCurrentUser();
          if (!cancelled) {
            setUser(currentUser);
            if (!currentUser && !sessionStorage.getItem("hasAttemptedOneTap")) {
              sessionStorage.setItem("hasAttemptedOneTap", "true");
              authService.signInWithOneTap().catch(() => {});
            }
          }
        }
      } catch (err) {
        console.error("Auth init:", err);
      }

      // Seed events if DB is empty, then fetch
      try {
        const didSeed = await seedEventsIfEmpty();
        const fetchedEvents = await eventService.getAllEvents();
        if (!cancelled) {
          setEvents(fetchedEvents.length > 0 ? fetchedEvents : SEED_EVENTS);
          setLoadingEvents(false);
        }
      } catch {
        if (!cancelled) {
          setEvents(SEED_EVENTS);
          setLoadingEvents(false);
        }
      }

      // Posts
      try {
        const fetchedPosts = await postService.getAllPosts();
        if (!cancelled) {
          const topPosts = fetchedPosts.slice(0, 3);
          setPosts(topPosts.length > 0 ? topPosts : DEMO_POSTS);
          setLoadingPosts(false);
        }
      } catch {
        if (!cancelled) {
          setPosts(DEMO_POSTS);
          setLoadingPosts(false);
        }
      }
    };

    init();
    return () => { cancelled = true; };
  }, []);

  // ── Enrollment Logic ──
  const handleSignIn = async () => {
    try {
      const result = await authService.signInWithGoogle();
      if (result.success) {
        setUser(result.user);
        showToast("Signed in successfully");
      } else {
        showToast(result.error || "Sign in failed", "error");
      }
    } catch {
      showToast("Sign in failed", "error");
    }
  };

  const handleEnrollClick = async (eventId) => {
    if (!user) {
      await handleSignIn();
      return;
    }

    setEnrollingId(eventId);
    try {
      const profile = await authService.getUserProfile(user.uid);
      if (!profile || !profile.name || !profile.phone) {
        setProfileForm({
          name: profile?.name || user.displayName || "",
          phone: profile?.phone || "",
        });
        setPendingEventId(eventId);
        setShowProfileModal(true);
        setEnrollingId(null);
        return;
      }
      await processEnrollment(user.uid, eventId);
    } catch {
      showToast("Error checking profile", "error");
      setEnrollingId(null);
    }
  };

  const processEnrollment = async (userId, eventId) => {
    setEnrollingId(eventId);
    try {
      await enrollmentService.requestEnrollment(userId, eventId);
      showToast("Enrollment request sent!");
    } catch (err) {
      showToast(err.message || "Failed to enroll", "error");
    } finally {
      setEnrollingId(null);
      setPendingEventId(null);
    }
  };

  const handleSaveProfile = async () => {
    if (!profileForm.name.trim() || !profileForm.phone.trim()) {
      showToast("Please fill in all fields", "error");
      return;
    }
    setSavingProfile(true);
    try {
      await authService.updateUserProfile(user.uid, {
        name: profileForm.name.trim(),
        phone: profileForm.phone.trim(),
      });
      setShowProfileModal(false);
      showToast("Profile updated");
      if (pendingEventId) {
        await processEnrollment(user.uid, pendingEventId);
      }
    } catch {
      showToast("Failed to save profile", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setUser(null);
    showToast("Signed out");
  };

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <div className="landing-page">
      {/* ── Sticky Navbar ── */}
      <nav className="ld-navbar">
        <div className="ld-container ld-navbar-inner">
          <Link href="/" className="ld-logo">
            <Sparkles size={22} color="#FF1F6D" />
            DAZZLE
          </Link>

          <ul className="ld-nav-links">
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>

          <div className="ld-nav-actions">
            {user ? (
              <>
                <Link href="/dashboard" className="ld-btn-login">
                  <User size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
                  {user.displayName?.split(" ")[0] || "Dashboard"}
                </Link>
                <button className="ld-btn-login" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="ld-btn-login" onClick={handleSignIn}>
                  <LogIn size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "4px" }} />
                  Log In
                </button>
                <button className="ld-btn-signup" onClick={handleSignIn}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Split Hero ── */}
      <div className="ld-hero-split">
        <div className="ld-hero-media">
          <img
            src="https://media4.giphy.com/media/13hxeOYjoTWtK8/giphy.gif"
            alt="Dance performance"
          />
        </div>
        <div className="ld-hero-content">
          {user ? (
            <>
              <h1>
                WELCOME
                <br />
                BACK,
                <br />
                {(user.displayName?.split(" ")[0] || "DANCER").toUpperCase()}
              </h1>
              <p>
                Your dashboard is ready. Track your classes, discover new events,
                and stay in rhythm.
              </p>
              <Link href="/dashboard" className="btn-gradient-cta">
                <Sparkles size={18} />
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <h1>
                REACH
                <br />
                YOUR
                <br />
                DANCE
                <br />
                GOALS
              </h1>
              <p>
                With world-class instructors, intensive programs, and a vibrant community.
              </p>
              <button className="btn-gradient-cta" onClick={handleSignIn}>
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Events Slider ── */}
      <section className="ld-section ld-container">
        <div className="ld-section-title">
          <Zap size={24} color="#FF1F6D" />
          <h2>Featured Classes</h2>
        </div>

        {loadingEvents ? (
          <div className="ld-slider" style={{ gap: "1.5rem" }}>
            {[1, 2, 3].map((i) => (
              <div className="ld-skeleton ld-skeleton-card" key={i} style={{ flex: "0 0 320px" }} />
            ))}
          </div>
        ) : (
          <div className="ld-slider-wrapper">
            <div className="ld-slider">
              {events.map((event) => (
                <div className="ld-slide-card" key={event.id}>
                  <div className="ld-slide-banner">
                    {event.imageUrl && (
                      <img src={event.imageUrl} alt={event.title} loading="lazy" />
                    )}
                  </div>
                  <div className="ld-slide-body">
                    <h3 className="ld-slide-title">{event.title}</h3>
                    <p className="ld-slide-desc">{event.description}</p>
                    <div className="ld-slide-meta">
                      {event.danceStyle && (
                        <span style={{ color: "#FF1F6D", fontWeight: 600 }}>
                          {event.danceStyle}
                        </span>
                      )}
                      {event.level && <span>• {event.level}</span>}
                      {event.venue && (
                        <span>
                          <MapPin size={12} /> {event.venue}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ld-slide-footer">
                    <button
                      className="btn-enroll-neon"
                      style={{ width: "100%" }}
                      disabled={enrollingId === event.id}
                      onClick={() => handleEnrollClick(event.id)}
                    >
                      {enrollingId === event.id ? (
                        <>
                          <Loader2 size={16} className="ld-spin" /> Enrolling…
                        </>
                      ) : (
                        <>
                          <Zap size={16} /> Enroll Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/events" className="btn-secondary">
            More Events <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Recent Posts ── */}
      <section className="ld-section ld-container">
        <div className="ld-section-title">
          <Clock size={24} color="#3366FF" />
          <h2>Studio News</h2>
        </div>

        {loadingPosts ? (
          <div className="ld-posts-grid">
            {[1, 2, 3].map((i) => (
              <div className="ld-skeleton" key={i} style={{ height: 180 }} />
            ))}
          </div>
        ) : (
          <div className="ld-posts-grid">
            {posts.map((post) => (
              <Link
                href={`/post/${post.id}`}
                className="ld-post-card"
                key={post.id}
                onClick={(e) => {
                  if (post.isDemo) e.preventDefault();
                }}
                style={post.isDemo ? { cursor: "default" } : {}}
              >
                <h3 className="ld-post-title">{post.title}</h3>
                <p className="ld-post-excerpt">{post.excerpt}</p>
                <span className="ld-post-date">
                  {formatShortDate(post.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="ld-footer">
        <div className="ld-container">
          <div className="ld-footer-grid">
            <div className="ld-footer-col">
              <h3>
                <Sparkles
                  size={18}
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: "6px",
                    color: "#FF1F6D",
                  }}
                />
                Dazzle Dance Studio
              </h3>
              <p>
                Unleashing creativity and rhythm in every step. Join our vibrant
                community and find your groove.
              </p>
              <div className="ld-socials">
                <a href="#" className="ld-social-link"><Camera size={20} /></a>
                <a href="#" className="ld-social-link"><MessageCircle size={20} /></a>
                <a href="#" className="ld-social-link"><Video size={20} /></a>
              </div>
            </div>

            <div className="ld-footer-col">
              <h3>Contact Us</h3>
              <p><Mail size={16} /> hello@dazzledance.com</p>
              <p><Phone size={16} /> +1 (555) 123-4567</p>
              <p><MapPin size={16} /> 123 Rhythm Avenue, NY 10001</p>
            </div>

            <div className="ld-footer-col">
              <h3>Quick Links</h3>
              <p>
                <Link href="/events" className="ld-social-link" style={{ textDecoration: "none" }}>
                  Classes & Events
                </Link>
              </p>
              <p>
                <Link href="/dashboard" className="ld-social-link" style={{ textDecoration: "none" }}>
                  Student Dashboard
                </Link>
              </p>
            </div>
          </div>
          <div className="ld-footer-bottom">
            © {new Date().getFullYear()} Dazzle Dance Studio. All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* ── Profile Modal ── */}
      {showProfileModal && (
        <div className="ld-modal-overlay">
          <div className="ld-modal">
            <h2 className="ld-modal-title">Complete Your Profile</h2>
            <p className="ld-modal-desc">
              We need a few details before you can enroll in a class.
            </p>

            <div className="ld-form-group">
              <label className="ld-form-label">Full Name</label>
              <input
                type="text"
                className="ld-form-input"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>

            <div className="ld-form-group">
              <label className="ld-form-label">Phone Number</label>
              <input
                type="tel"
                className="ld-form-input"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, phone: e.target.value })
                }
                placeholder="Enter your phone number"
              />
            </div>

            <div className="ld-modal-actions">
              <button
                className="btn-gradient-cta"
                style={{ flex: 1 }}
                onClick={handleSaveProfile}
                disabled={savingProfile}
              >
                {savingProfile ? (
                  <>
                    <Loader2 size={16} className="ld-spin" /> Saving…
                  </>
                ) : (
                  "Save & Continue"
                )}
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowProfileModal(false);
                  setPendingEventId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
