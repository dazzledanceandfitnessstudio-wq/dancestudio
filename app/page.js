"use client";

import { useState, useEffect, useCallback } from "react";
import {
  authService,
  eventService,
  enrollmentService,
} from "../lib/firebaseService";

// Custom Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import FeatureTutorial from "./components/FeatureTutorial";
import DanceStylesGrid from "./components/DanceStylesGrid";
import EventSlider from "./components/EventSlider";
import PromoBanner from "./components/PromoBanner";
import LevelCards from "./components/LevelCards";

// ─── Toast ────────────────────────────────────────────────────────
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

// ─── Main Landing Page ──────────────────────────────────────────────
export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  // ── Show Toast ──
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  // ── Initial Fetch & Auth ──
  useEffect(() => {
    let mounted = true;

    // Check auth
    authService.getCurrentUser().then((currentUser) => {
      if (mounted) setUser(currentUser);
    });

    // Listen to auth changes if available
    const firebaseAuth = authService.auth || authService.getAuth?.();
    let unsubscribe = null;
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
      unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
        if (mounted) setUser(u);
      });
    }

    // Fetch featured events
    eventService
      .getAllEvents()
      .then((fetched) => {
        if (!mounted) return;
        if (fetched) {
          // Just grab a few for the landing slider
          setEvents(fetched.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error("Failed to load events", err);
      })
      .finally(() => {
        if (mounted) setLoadingEvents(false);
      });

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
        showToast(`Welcome, ${result.user.displayName}`);
      } else {
        showToast(result.error || "Sign in failed", "error");
      }
    } catch (err) {
      showToast("Sign in failed", "error");
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      showToast("Signed out successfully");
    } catch (err) {
      showToast("Sign out failed", "error");
    }
  };

  const handleEnrollClick = async (eventId) => {
    if (!user) {
      showToast("Please sign in to enroll", "error");
      return;
    }
    setEnrollingId(eventId);
    try {
      await enrollmentService.requestEnrollment(user.uid, eventId);
      showToast("Enrollment requested!");
    } catch (err) {
      showToast(err.message || "Failed to enroll", "error");
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="landing-page">
      {/* 1. Header */}
      <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />

      {/* 2. Hero Split */}
      <HeroSection user={user} onSignIn={handleSignIn} />

      {/* 3. Feature Tutorial (New) */}
      <FeatureTutorial />

      {/* 4. Browse by Style Grid (New) */}
      <DanceStylesGrid />

      {/* 5. Featured Events Slider */}
      <EventSlider
        events={events}
        loadingEvents={loadingEvents}
        enrollingId={enrollingId}
        onEnrollClick={handleEnrollClick}
      />

      {/* 6. Promo Banner (New) */}
      <PromoBanner />

      {/* 7. Level Cards (New) */}
      <LevelCards />

      {/* 8. Footer */}
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
