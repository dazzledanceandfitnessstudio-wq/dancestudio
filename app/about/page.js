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
import "./about.css";

// ─── No Demo Fallback ──────────────────────────────────────────────

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
      {/* ── Hero ── */}
      <header className="abt-hero">
        <div className="abt-hero-split">
          {/* Image side */}
          <div className="abt-hero-media">
            <img
              src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&q=80"
              alt="Dancers in the Dazzle studio"
            />
            <div className="abt-hero-media-scrim" />
          </div>

          {/* Text side */}
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
              Whether you're taking your first groove class or training for a
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
                <div key={i} style={{ height: "380px", background: "var(--color-surface-alt)", borderRadius: "var(--radius-xl)", animation: "pulse 1.5s infinite" }} />
              ))
            ) : instructors.length > 0 ? (
              instructors.map((inst, i) => (
                <article
                  className="abt-inst-card"
                  key={inst.id}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {/* Photo */}
                  <div className="abt-inst-img-wrap">
                    <img src={inst.imageUrl} alt={inst.name} loading="lazy" />
                  </div>

                  {/* Info */}
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
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
                <Users size={36} strokeWidth={1.5} style={{ color: "var(--color-muted)", marginBottom: "1rem" }} />
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-ink)", marginBottom: "0.5rem" }}>Faculty profiles coming soon.</h2>
                <p style={{ color: "var(--color-body-text)", fontSize: "0.9375rem" }}>We are currently updating our instructor directory.</p>
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
    </div>
  );
}
