"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Award,
  Heart,
  Users,
  Music,
  Star,
  ArrowRight,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { authService } from "../../lib/firebaseService";

// ─── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Active Students", value: "350+", icon: Users },
  { label: "Dance Styles", value: "8", icon: Music },
  { label: "Years of Experience", value: "12", icon: Award },
  { label: "Community Events", value: "40+", icon: Heart },
];

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ── Auth state ──
  useEffect(() => {
    let mounted = true;

    authService.getCurrentUser().then((currentUser) => {
      if (mounted) setUser(currentUser);
    });

    const firebaseAuth = authService.auth || authService.getAuth?.();
    let unsubscribe = null;
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
      unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
        if (mounted) setUser(u);
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
      }
    } catch (err) {
      console.error("Sign in failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  useEffect(() => {
    let cancelled = false;
    setTimeout(() => {
      if (!cancelled) {
        setInstructors([]);
        setLoading(false);
      }
    }, 500);
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="about-page">
      {/* 🔥 FIX: Pass user props to Header */}
      <Header 
        user={user} 
        onSignIn={handleSignIn} 
        onSignOut={handleSignOut} 
      />
      
      {/* ── Hero ── */}
      <header className="abt-hero">
        <div className="abt-hero-split">
          <div className="abt-hero-media">
            <img
              src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&q=80"
              alt="Dancers in the Dazzle studio"
            />
            <div className="abt-hero-media-scrim" />
          </div>

          <div className="abt-hero-content">
            <p className="abt-eyebrow">
              <Sparkles size={13} strokeWidth={2.5} />
              Our Story
            </p>
            <h1 className="abt-hero-title">
              More Than Just a Studio.
              <br />A Community.
            </h1>
            <p className="abt-hero-subtitle">
              Dazzle Dance Studio was built on one belief: everyone deserves
              access to world-class dance education — no audition required.
              Whether you&apos;re taking your first groove class or training for a
              national competition, you belong here.
            </p>
            <a href="/courses" className="abt-btn-primary" id="about-explore-courses">
              <Zap size={16} strokeWidth={2} />
              Explore Courses
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
        <div className="abt-hero-bar" aria-hidden="true" />
      </header>

      <main className="abt-container">
        {/* ── Our Mission ── */}
        <section className="abt-mission">
          <h2 className="abt-section-title">What Drives Us</h2>
          <p className="abt-mission-text">
            We started in a single rented room with a Bluetooth speaker and six
            students. Today, Dazzle runs 40+ classes a week across hip-hop,
            breaking, jazz funk, heels, house, ballet, and contemporary. Our
            instructors are competition champions, music-video veterans, and
            working professionals who teach because they believe movement
            changes lives. No gatekeeping. No hierarchy. Just the floor, the
            music, and you.
          </p>
        </section>

        {/* ── Founder Bio ── */}
        <section className="abt-mission" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 className="abt-section-title">Priya Thakur, Director &amp; Founder – Since 2013</h2>
          <div style={{ margin: '2rem 0' }}>
            <Image 
              src="/priya-thakur.jpg" 
              alt="Priya Thakur" 
              width={250} 
              height={250} 
              style={{ borderRadius: '50%', objectFit: 'cover' }} 
            />
          </div>
          <p className="abt-mission-text">
            With 15+ years of experience and an FSSA Certified Fitness Coach certification, I am passionate about helping people grow through dance and fitness. Since establishing Dazzle Dance &amp; Fitness Studio in 2013, I have trained students in Bollywood, Hip-Hop, Kathak, Dance Fitness, Functional Training, Modeling &amp; Grooming, and Personality Development. I also organize dance competitions, stage shows, workshops, and cultural events, providing young talent with opportunities to perform, build confidence, and pursue their passion.
          </p>
        </section>

        {/* ── Stats Band ── */}
        <section className="abt-stats-band">
          {STATS.map((stat) => (
            <div className="abt-stat-card" key={stat.label}>
              <div className="abt-stat-icon">
                <stat.icon size={22} strokeWidth={2} />
              </div>
              <span className="abt-stat-value">{stat.value}</span>
              <span className="abt-stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* ── Instructor Grid ── */}
        <section className="abt-instructors">
          <h2 className="abt-section-title">Meet the Faculty</h2>
          <p className="abt-section-subtitle">
            World-class educators who live and breathe dance. Each brings a
            unique movement language and years of professional experience.
          </p>

          <div className="abt-instructor-grid">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="abt-skeleton-card" />
              ))
            ) : instructors.length > 0 ? (
              instructors.map((inst, i) => (
                <article
                  className="abt-inst-card"
                  key={inst.id}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="abt-inst-img-wrap">
                    <img src={inst.imageUrl} alt={inst.name} loading="lazy" />
                  </div>
                  <div className="abt-inst-body">
                    <span className="abt-inst-style-badge">
                      {inst.style.toUpperCase()}
                    </span>
                    <h3 className="abt-inst-name">{inst.name}</h3>
                    <span className="abt-inst-role">{inst.role}</span>
                    <p className="abt-inst-bio">{inst.bio}</p>
                  </div>
                </article>
              ))
            ) : (
              <div className="abt-empty-state">
                <Users size={36} strokeWidth={1.5} />
                <h2>Faculty profiles coming soon.</h2>
                <p>We are currently updating our instructor directory.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="abt-bottom-cta">
          <h2 className="abt-bottom-title">Ready to Move?</h2>
          <p className="abt-bottom-desc">
            Drop into your first class or book a private session — no
            experience necessary. Just bring your energy.
          </p>
          <div className="abt-bottom-actions">
            <a href="/courses" className="abt-btn-primary" id="about-cta-courses">
              <Zap size={16} strokeWidth={2} />
              Browse Courses
            </a>
            <a href="/contact" className="abt-btn-secondary" id="about-cta-contact">
              Get in Touch
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* ─── CSS ─── */}
      <style jsx>{`
        .about-page {
          background: var(--background);
          color: var(--foreground);
          min-height: 100vh;
        }

        .abt-hero {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .abt-hero-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 70vh;
        }

        .abt-hero-media {
          position: relative;
          overflow: hidden;
          background: var(--surface-alt);
        }

        .abt-hero-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .abt-hero-media-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(11, 10, 15, 0.4) 0%, transparent 100%);
          pointer-events: none;
        }

        .abt-hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 3rem;
          background: var(--surface);
        }

        .abt-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: var(--font-display, Poppins);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary);
          background: rgba(255, 31, 109, 0.07);
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          width: fit-content;
          margin-bottom: 1.25rem;
        }

        .abt-hero-title {
          font-family: var(--font-display, Poppins);
          font-size: 3rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.875rem;
          line-height: 1.1;
        }

        .abt-hero-subtitle {
          font-family: var(--font-body, Inter);
          font-size: 1.0625rem;
          color: var(--body-text);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 0 2rem;
        }

        .abt-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--gradient-cta);
          color: #FFFFFF;
          font-family: var(--font-display, Poppins);
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: var(--radius-xl, 14px);
          cursor: pointer;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(255, 31, 109, 0.25);
          width: fit-content;
        }

        .abt-btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(255, 31, 109, 0.35);
        }

        .abt-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--foreground);
          font-family: var(--font-display, Poppins);
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.875rem 2rem;
          border: 2px solid var(--border);
          border-radius: var(--radius-xl, 14px);
          cursor: pointer;
          transition: all 0.2s ease-out;
          text-decoration: none;
        }

        .abt-btn-secondary:hover {
          border-color: var(--foreground);
          color: var(--foreground);
        }

        .abt-hero-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-cta);
        }

        .abt-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }

        .abt-mission {
          max-width: 800px;
          margin: 0 auto;
        }

        .abt-section-title {
          font-family: var(--font-display, Poppins);
          font-size: 2rem;
          font-weight: 800;
          color: var(--foreground);
          margin-bottom: 1rem;
          text-align: center;
        }

        .abt-mission-text {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--body-text);
          text-align: center;
        }

        .abt-stats-band {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 4rem 0;
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .abt-stat-card {
          text-align: center;
          padding: 1rem;
        }

        .abt-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 31, 109, 0.07);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem;
        }

        .abt-stat-value {
          display: block;
          font-family: var(--font-display, Poppins);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--foreground);
          line-height: 1;
        }

        .abt-stat-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--body-text);
          margin-top: 0.25rem;
        }

        .abt-instructors {
          margin-top: 4rem;
        }

        .abt-section-subtitle {
          text-align: center;
          font-size: 1rem;
          color: var(--body-text);
          max-width: 560px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .abt-instructor-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .abt-inst-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl, 14px);
          overflow: hidden;
          transition: box-shadow 0.25s ease-out, transform 0.25s ease-out;
        }

        .abt-inst-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }

        .abt-inst-img-wrap {
          height: 220px;
          overflow: hidden;
          background: var(--surface-alt);
        }

        .abt-inst-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .abt-inst-body {
          padding: 1.25rem 1.5rem 1.5rem;
        }

        .abt-inst-style-badge {
          display: inline-block;
          font-family: var(--font-display, Poppins);
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--primary);
          background: rgba(255, 31, 109, 0.07);
          padding: 0.2rem 0.625rem;
          border-radius: 999px;
          margin-bottom: 0.5rem;
        }

        .abt-inst-name {
          font-family: var(--font-display, Poppins);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }

        .abt-inst-role {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--primary);
          margin: 0.125rem 0 0.5rem;
        }

        .abt-inst-bio {
          font-size: 0.875rem;
          color: var(--body-text);
          line-height: 1.6;
          margin: 0;
        }

        .abt-skeleton-card {
          height: 380px;
          background: var(--surface-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl, 14px);
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .abt-empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl, 14px);
        }

        .abt-empty-state svg {
          color: var(--muted);
          margin-bottom: 1rem;
        }

        .abt-empty-state h2 {
          font-family: var(--font-display, Poppins);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 0.5rem;
        }

        .abt-empty-state p {
          color: var(--body-text);
          font-size: 0.9375rem;
          margin: 0;
        }

        .abt-bottom-cta {
          margin-top: 4rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl, 14px);
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .abt-bottom-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-cta);
        }

        .abt-bottom-title {
          font-family: var(--font-display, Poppins);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.625rem;
        }

        .abt-bottom-desc {
          font-size: 1rem;
          color: var(--body-text);
          line-height: 1.65;
          max-width: 460px;
          margin: 0 auto 1.5rem;
        }

        .abt-bottom-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .abt-hero-split {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .abt-hero-media {
            min-height: 300px;
          }
          .abt-hero-content {
            padding: 3rem 1.5rem;
          }
          .abt-hero-title {
            font-size: 2.5rem;
          }
          .abt-instructor-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .abt-stats-band {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .abt-hero-title {
            font-size: 2rem;
          }
          .abt-hero-subtitle {
            font-size: 0.9375rem;
          }
          .abt-instructor-grid {
            grid-template-columns: 1fr;
          }
          .abt-stats-band {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .abt-stat-value {
            font-size: 1.75rem;
          }
          .abt-bottom-actions {
            flex-direction: column;
            align-items: center;
          }
          .abt-btn-primary,
          .abt-btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .abt-stats-band {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            padding: 1rem 0;
          }
          .abt-stat-card {
            padding: 0.5rem;
          }
          .abt-stat-icon {
            width: 36px;
            height: 36px;
            font-size: 0.875rem;
          }
          .abt-stat-value {
            font-size: 1.5rem;
          }
          .abt-stat-label {
            font-size: 0.6875rem;
          }
        }
      `}</style>
    </div>
  );
}