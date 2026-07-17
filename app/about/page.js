"use client";

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

// ─── Demo Instructors — hardcoded, never written to Firestore ──────────────
const DEMO_INSTRUCTORS = [
  {
    id: "inst-1",
    name: "Kai Rivera",
    role: "Lead Hip Hop Instructor",
    style: "Hip Hop",
    bio: "Former STEEZY Studio choreographer with 12+ years in hip-hop and urban choreography. Kai's teaching philosophy: feel first, clean later.",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
  {
    id: "inst-2",
    name: "Mia Chen",
    role: "Contemporary & Ballet Director",
    style: "Ballet",
    bio: "Classically trained at Juilliard with a decade of contemporary performance. Mia bridges technique and raw expression in every class.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: "inst-3",
    name: "Dex Okafor",
    role: "Breaking Coach",
    style: "Breaking",
    bio: "2x national breaking champion and Red Bull BC One competitor. Dex teaches power moves, footwork, and the culture behind them.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    id: "inst-4",
    name: "Luna Park",
    role: "Jazz Funk & Heels",
    style: "Jazz Funk",
    bio: "Luna has danced backup for major recording artists and brings fierce stage presence and musicality to every heels and jazz funk session.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    id: "inst-5",
    name: "Marcus James",
    role: "House & Social Dance",
    style: "House",
    bio: "A fixture of the NYC club scene for 15 years. Marcus teaches jacking, footwork, and lofting with an emphasis on musicality and freestyle.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    id: "inst-6",
    name: "Anika Desai",
    role: "Youth Programs Director",
    style: "All Styles",
    bio: "With a background in education and dance therapy, Anika designs age-appropriate curricula that build confidence and creative expression in young dancers.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Active Students", value: "350+", icon: Users },
  { label: "Dance Styles", value: "8", icon: Music },
  { label: "Years of Experience", value: "12", icon: Award },
  { label: "Community Events", value: "40+", icon: Heart },
];

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AboutPage() {
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
            {DEMO_INSTRUCTORS.map((inst, i) => (
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
            ))}
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
