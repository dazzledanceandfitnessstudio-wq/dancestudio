// app/enrollment/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Sparkles,
  Users,
  Calendar,
  Award,
  Check,
  Loader2,
  ExternalLink,
  FileUp,
} from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authService } from "../../lib/firebaseService";

// ─── Toast Component ──────────────────────────────────────────────────────
function Toast({ message, type, visible }) {
  return (
    <div
      className={`en-toast ${visible ? "en-toast-visible" : ""} ${
        type === "success" ? "en-toast-success" : "en-toast-error"
      }`}
      role="status"
      aria-live="polite"
    >
      {type === "success" ? (
        <Check size={14} strokeWidth={2.5} />
      ) : (
        <Loader2 size={14} strokeWidth={2.5} className="en-spin" />
      )}{" "}
      {message}
    </div>
  );
}

// ─── Main Enrollment Page ──────────────────────────────────────────────────
export default function EnrollmentPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScZoPhjeNzSatDskyMUPLjTxBwvhpnKDCxYC8xNE0VLdTTeaQ/viewform?usp=sharing&ouid=101070178090514117796";

  // ── Auth State ──
  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (mounted) {
          setUser(currentUser);
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth error:", err);
        if (mounted) setLoading(false);
      }
    };

    loadUser();

    const firebaseAuth = authService.auth || authService.getAuth?.();
    let unsubscribe = null;
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
      unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
        if (mounted) {
          setUser(u);
          setLoading(false);
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
        showToast("Signed in successfully!");
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
      showToast("Signed out successfully");
    } catch (err) {
      console.error("Sign out failed:", err);
      showToast("Sign out failed", "error");
    }
  };

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
  }, []);

  // ── Open Form in New Tab ──
  const openForm = () => {
    window.open(FORM_URL, "_blank", "noopener,noreferrer");
    showToast("Opening enrollment form in new tab...");
  };

  // ── Get Pre-filled URL ──
  const getPrefilledUrl = () => {
    if (!user) return FORM_URL;

    const baseUrl = FORM_URL.split("?")[0];
    const params = new URLSearchParams({
      usp: "sharing",
      ouid: "101070178090514117796",
    });

    // Add prefill parameters - REPLACE THESE WITH YOUR ACTUAL ENTRY IDs
    // Example: params.set("entry.123456789", user.displayName || "");
    // Example: params.set("entry.987654321", user.email || "");

    return `${baseUrl}?${params.toString()}`;
  };

  if (loading) {
    return (
      <div className="en-loading">
        <Loader2 size={40} className="en-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="enrollment-page">
      {/* Header */}
      <Header user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />

      {/* Main Content */}
      <main className="en-main">
        {/* ── Hero Banner ── */}
        <header className="en-hero">
          <div className="en-hero-inner">
            <p className="en-eyebrow">
              <Sparkles size={13} strokeWidth={2.5} />
              Enroll Now
            </p>
            <h1 className="en-hero-title">
              Start Your <br />
              <span className="en-gradient">Dance Journey</span>
            </h1>
            <p className="en-hero-subtitle">
              Fill out the enrollment form to join our exciting dance programs.
              We offer Kathak, Bollywood, Hip-Hop, Semi-Classical, and more!
            </p>

            {/* Stats */}
            <div className="en-stats">
              <div className="en-stat-item">
                <Users size={20} />
                <span>500+ Students</span>
              </div>
              <div className="en-stat-item">
                <Award size={20} />
                <span>Expert Trainers</span>
              </div>
              <div className="en-stat-item">
                <Calendar size={20} />
                <span>Flexible Batches</span>
              </div>
            </div>
          </div>
          <div className="en-hero-bar" aria-hidden="true" />
        </header>

        {/* ── Form Section ── */}
        <section className="en-form-section">
          <div className="en-container">
            {/* User Status Bar */}
            <div className="en-user-bar">
              <div className="en-user-info">
                {user ? (
                  <>
                    <div className="en-user-avatar">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} />
                      ) : (
                        <span>{user.displayName?.[0] || "U"}</span>
                      )}
                    </div>
                    <div className="en-user-details">
                      <span className="en-user-name">{user.displayName || "User"}</span>
                      <span className="en-user-email">{user.email}</span>
                    </div>
                  </>
                ) : (
                  <div className="en-user-guest">
                    <span>👋 Not signed in yet</span>
                  </div>
                )}
              </div>
              <div className="en-user-actions">
                {user ? (
                  <button
                    onClick={() => {
                      const url = getPrefilledUrl();
                      window.open(url, "_blank", "noopener,noreferrer");
                      showToast("Opening form with your details...");
                    }}
                    className="en-btn-prefill"
                  >
                    <Sparkles size={16} />
                    Open with your details
                  </button>
                ) : (
                  <button onClick={handleSignIn} className="en-btn-signin">
                    Sign in to auto-fill
                  </button>
                )}
              </div>
            </div>

            {/* Form Card - Open in New Tab */}
            <div className="en-form-card">
              <div className="en-form-icon-big">
                <FileUp size={48} strokeWidth={1.5} />
              </div>
              <h2 className="en-form-title">Enrollment Form</h2>
              <p className="en-form-description">
                {user
                  ? `Hi ${user.displayName || "there"}! Click the button below to open the enrollment form.`
                  : "Sign in above to auto-fill your details, or click below to open the form."}
              </p>
              <p className="en-form-note">
                <span className="en-form-note-icon">📎</span>
                The form includes file upload fields, so it opens in a new tab.
              </p>

              <button onClick={openForm} className="en-btn-primary">
                <ExternalLink size={20} />
                Open Enrollment Form
                <span className="en-btn-badge">New Tab</span>
              </button>

              <div className="en-form-alternate">
                <p>Or copy this link to share:</p>
                <div className="en-form-link-wrapper">
                  <input
                    type="text"
                    value={FORM_URL}
                    readOnly
                    className="en-form-link-input"
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(FORM_URL);
                      showToast("Link copied to clipboard!");
                    }}
                    className="en-btn-copy"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="en-help">
              <div className="en-help-card">
                <div className="en-help-icon">💡</div>
                <div className="en-help-content">
                  <h4>Need Help?</h4>
                  <p>
                    If you face any issues with the form, please contact us at{" "}
                    <a href="mailto:dazzledanceandfitnessstudio@gmail.com">
                      dazzledanceandfitnessstudio@gmail.com
                    </a>{" "}
                    or call{" "}
                    <a href="tel:+918359914344">+91 83599 14344</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="en-back-wrapper">
              <Link href="/" className="en-back-btn">
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />

      <style jsx>{`
        .enrollment-page {
          background: var(--background);
          color: var(--foreground);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .en-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 1rem;
          color: var(--body-text);
          font-family: "Poppins", sans-serif;
        }

        .en-main {
          flex: 1;
        }

        /* ─── Hero ─── */
        .en-hero {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 3rem 1.25rem 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .en-hero-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .en-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: "Poppins", sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.07);
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }

        .en-hero-title {
          font-family: "Poppins", sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.1;
          color: var(--foreground);
          margin-bottom: 1rem;
        }

        .en-gradient {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .en-hero-subtitle {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--body-text);
          max-width: 600px;
          margin: 0 auto 1.5rem;
        }

        .en-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .en-stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #DDDDDD;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .en-stat-item svg {
          color: #FF1F6D;
        }

        .en-hero-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
        }

        /* ─── Form Section ─── */
        .en-form-section {
          padding: 2.5rem 1.25rem 4rem;
          background: var(--background);
        }

        .en-container {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── User Bar ── */
        .en-user-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1rem 1.5rem;
          margin-bottom: 2rem;
        }

        .en-user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .en-user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1rem;
          overflow: hidden;
          flex-shrink: 0;
        }

        .en-user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .en-user-details {
          display: flex;
          flex-direction: column;
        }

        .en-user-name {
          font-family: "Poppins", sans-serif;
          font-weight: 700;
          font-size: 0.9375rem;
          color: var(--foreground);
        }

        .en-user-email {
          font-size: 0.8125rem;
          color: var(--body-text);
        }

        .en-user-guest {
          font-size: 0.9375rem;
          color: var(--body-text);
        }

        .en-user-actions {
          display: flex;
          gap: 0.75rem;
        }

        .en-btn-signin {
          background: rgba(255, 31, 109, 0.1);
          color: #FF1F6D;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 10px;
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.3s ease-out;
        }

        .en-btn-signin:hover {
          background: rgba(255, 31, 109, 0.2);
          transform: translateY(-1px);
        }

        .en-btn-prefill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 10px;
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.3s ease-out;
        }

        .en-btn-prefill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(255, 31, 109, 0.3);
        }

        /* ── Form Card ── */
        .en-form-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 3rem 2.5rem;
          text-align: center;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .en-form-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
        }

        .en-form-icon-big {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 31, 109, 0.07);
          color: #FF1F6D;
          margin-bottom: 1.25rem;
        }

        .en-form-title {
          font-family: "Poppins", sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 0.5rem;
        }

        .en-form-description {
          font-size: 0.9375rem;
          color: var(--body-text);
          max-width: 500px;
          margin: 0 auto 1rem;
          line-height: 1.6;
        }

        .en-form-note {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 31, 109, 0.05);
          border: 1px solid rgba(255, 31, 109, 0.1);
          border-radius: 10px;
          padding: 0.5rem 1rem;
          font-size: 0.8125rem;
          color: var(--body-text);
          margin-bottom: 2rem;
        }

        .en-form-note-icon {
          font-size: 1rem;
        }

        .en-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-family: "Poppins", sans-serif;
          font-weight: 700;
          font-size: 1rem;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease-out;
          box-shadow: 0 4px 25px rgba(255, 31, 109, 0.3);
          position: relative;
        }

        .en-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 40px rgba(255, 31, 109, 0.4);
        }

        .en-btn-badge {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
        }

        /* ── Alternate Link ── */
        .en-form-alternate {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .en-form-alternate p {
          font-size: 0.8125rem;
          color: var(--body-text);
          margin: 0 0 0.5rem;
        }

        .en-form-link-wrapper {
          display: flex;
          gap: 0.5rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .en-form-link-input {
          flex: 1;
          background: var(--surface-alt);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.5rem 0.75rem;
          font-family: "Inter", sans-serif;
          font-size: 0.75rem;
          color: var(--body-text);
          outline: none;
          cursor: text;
          min-width: 0;
        }

        .en-form-link-input:focus {
          border-color: #FF1F6D;
        }

        .en-btn-copy {
          background: var(--surface-alt);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.5rem 1rem;
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.2s ease-out;
          white-space: nowrap;
        }

        .en-btn-copy:hover {
          border-color: #FF1F6D;
          color: #FF1F6D;
        }

        /* ── Help Card ── */
        .en-help {
          margin-top: 2rem;
        }

        .en-help-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: rgba(255, 31, 109, 0.04);
          border: 1px solid rgba(255, 31, 109, 0.1);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }

        .en-help-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .en-help-content h4 {
          font-family: "Poppins", sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 0.25rem;
        }

        .en-help-content p {
          font-size: 0.875rem;
          color: var(--body-text);
          margin: 0;
          line-height: 1.6;
        }

        .en-help-content a {
          color: #FF1F6D;
          text-decoration: none;
          font-weight: 600;
        }

        .en-help-content a:hover {
          text-decoration: underline;
        }

        /* ── Back Button ── */
        .en-back-wrapper {
          margin-top: 2.5rem;
          text-align: center;
        }

        .en-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--foreground);
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 0.9375rem;
          padding: 0.75rem 2rem;
          border: 2px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease-out;
        }

        .en-back-btn:hover {
          border-color: var(--foreground);
          background: var(--foreground);
          color: var(--background);
          transform: translateY(-2px);
        }

        /* ─── Toast ─── */
        .en-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 0.75rem 1.5rem;
          font-family: "Poppins", sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          opacity: 0;
          transition: transform 0.35s ease-out, opacity 0.35s ease-out;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .en-toast.en-toast-visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .en-toast-success {
          border-color: rgba(34, 197, 94, 0.3);
        }

        .en-toast-error {
          border-color: rgba(255, 31, 109, 0.3);
        }

        .en-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* ─── Responsive ─── */
        @media (min-width: 640px) {
          .en-hero-title {
            font-size: 3rem;
          }
        }

        @media (min-width: 768px) {
          .en-hero {
            padding: 4rem 2rem 3.5rem;
          }
          .en-hero-title {
            font-size: 3.5rem;
          }
          .en-hero-subtitle {
            font-size: 1.125rem;
          }
          .en-form-section {
            padding: 3rem 2rem 5rem;
          }
          .en-form-card {
            padding: 3.5rem 3rem;
          }
        }

        @media (min-width: 1024px) {
          .en-hero-title {
            font-size: 4.5rem;
          }
          .en-hero {
            padding: 5rem 2rem 4rem;
          }
        }

        @media (max-width: 480px) {
          .en-hero-title {
            font-size: 2rem;
          }
          .en-stats {
            gap: 1rem;
            flex-direction: column;
            align-items: center;
          }
          .en-user-bar {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
          .en-user-info {
            justify-content: center;
          }
          .en-user-actions {
            justify-content: center;
          }
          .en-form-card {
            padding: 2rem 1.25rem;
          }
          .en-form-link-wrapper {
            flex-direction: column;
          }
          .en-btn-primary {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 0.9375rem;
          }
          .en-help-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}