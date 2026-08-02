// components/about/AboutPage.js
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  Award, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Zap,
  Heart,
  Star,
  Music,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const STATS = [
  { icon: Users, value: '40+', label: 'Weekly Classes' },
  { icon: Award, value: '15+', label: 'Expert Instructors' },
  { icon: Calendar, value: '10+', label: 'Years of Excellence' },
  { icon: MapPin, value: '2', label: 'Studio Locations' },
];

export default function AboutPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─── Fetch Instructors from Firestore ───
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'instructors'), orderBy('name'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className="about-page">
      {/* ─── Hero Section ─── */}
      <header className="abt-hero">
        <div className="abt-hero-split">
          {/* Left: Image - Circle with Founder Photo */}
          <div className="abt-hero-image-wrapper">
            <div className="abt-hero-image-circle">
              <Image
                src="/priya-thakur.jpg"
                alt="Priya Thakur - Founder & Director"
                width={400}
                height={400}
                className="abt-hero-image"
                priority
                onError={(e) => {
                  e.target.src = '/placeholder-founder.jpg';
                }}
              />
              <div className="abt-hero-image-ring"></div>
              <div className="abt-hero-image-glow"></div>
            </div>
            <div className="abt-hero-image-badge">
              <span className="badge-icon">👑</span>
              Founder & Director
            </div>
          </div>

          {/* Right: Content */}
          <div className="abt-hero-content">
            <div className="abt-eyebrow">
              <Heart size={14} strokeWidth={2} />
              Since 2013
            </div>
            <h1 className="abt-hero-title">
              Priya <span className="gradient-text">Thakur</span>
            </h1>
            <p className="abt-hero-subtitle">
              FSSA Certified Fitness Coach | 15+ Years Experience
            </p>
            <p className="abt-hero-bio">
              I am passionate about helping people grow through dance and fitness. 
              Since establishing Dazzle Dance &amp; Fitness Studio in 2013, I have 
              trained students in Bollywood, Hip-Hop, Kathak, Dance Fitness, 
              Functional Training, Modeling &amp; Grooming, and Personality Development.
            </p>
            <div className="abt-hero-tags">
              <span className="hero-tag">🏆 Competition Champion</span>
              <span className="hero-tag">🎭 Stage Show Organizer</span>
              <span className="hero-tag">📚 Workshop Leader</span>
            </div>
            <div className="abt-hero-actions">
              <Link href="/courses" className="abt-btn-primary">
                <Zap size={16} strokeWidth={2} />
                Explore Courses
              </Link>
              <Link href="/contact" className="abt-btn-secondary">
                Get in Touch
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
        <div className="abt-hero-bar"></div>
      </header>

      {/* <main className="abt-container"> */}
        {/* ── Our Mission ── */}
        {/* <section className="abt-mission">
          <div className="abt-mission-icon">
            <TrendingUp size={32} strokeWidth={1.5} />
          </div>
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
        </section> */}

        {/* ── Stats Band ── */}
        {/* <section className="abt-stats-band">
          {STATS.map((stat) => (
            <div className="abt-stat-card" key={stat.label}>
              <div className="abt-stat-icon">
                <stat.icon size={22} strokeWidth={2} />
              </div>
              <span className="abt-stat-value">{stat.value}</span>
              <span className="abt-stat-label">{stat.label}</span>
            </div>
          ))}
        </section> */}

        {/* ── Instructor Grid ── */}
        {/* <section className="abt-instructors">
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
                    {inst.imageUrl ? (
                      <img src={inst.imageUrl} alt={inst.name} loading="lazy" />
                    ) : (
                      <div className="abt-inst-img-placeholder">
                        <Users size={32} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="abt-inst-body">
                    <span className="abt-inst-style-badge">
                      {inst.style?.toUpperCase() || 'DANCE'}
                    </span>
                    <h3 className="abt-inst-name">{inst.name}</h3>
                    <span className="abt-inst-role">{inst.role || 'Instructor'}</span>
                    <p className="abt-inst-bio">{inst.bio || 'Passionate about teaching dance.'}</p>
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
        </section> */}

        {/* ── Bottom CTA ── */}
        {/* <section className="abt-bottom-cta">
          <h2 className="abt-bottom-title">Ready to Move?</h2>
          <p className="abt-bottom-desc">
            Drop into your first class or book a private session — no
            experience necessary. Just bring your energy.
          </p>
          <div className="abt-bottom-actions">
            <Link href="/courses" className="abt-btn-primary" id="about-cta-courses">
              <Zap size={16} strokeWidth={2} />
              Browse Courses
            </Link>
            <Link href="/contact" className="abt-btn-secondary" id="about-cta-contact">
              Get in Touch
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </section> */}
      {/* </main> */}

      <style jsx>{`
        .about-page {
          background: var(--background, #0B0A0F);
          color: var(--foreground, #F5F3F7);
          min-height: 100vh;
          font-family: 'Inter', 'Poppins', sans-serif;
        }

        /* ─── Hero Section ─── */
        .abt-hero {
          background: var(--surface, rgba(255,255,255,0.05));
          border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
          position: relative;
          overflow: hidden;
        }

        .abt-hero-split {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1.5rem;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ─── Image - Circle ─── */
        .abt-hero-image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
          width: 100%;
          max-width: 320px;
        }

        .abt-hero-image-circle {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          background: var(--surface-alt, rgba(255,255,255,0.03));
          border: 3px solid rgba(255, 31, 109, 0.3);
          box-shadow: 0 0 60px rgba(255, 31, 109, 0.1);
        }

        .abt-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .abt-hero-image-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: conic-gradient(from 0deg, #FF1F6D, #7B2FFF, #00E5FF, #FF1F6D);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
          animation: ringRotate 8s linear infinite;
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .abt-hero-image-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 31, 109, 0.15), transparent 70%);
          pointer-events: none;
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .abt-hero-image-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 1rem;
          background: rgba(255, 31, 109, 0.1);
          border: 1px solid rgba(255, 31, 109, 0.2);
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary, #FF1F6D);
          font-family: 'Poppins', sans-serif;
        }

        .badge-icon {
          font-size: 0.875rem;
        }

        /* ─── Hero Content ─── */
        .abt-hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          width: 100%;
        }

        .abt-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary, #FF1F6D);
          background: rgba(255, 31, 109, 0.07);
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          width: fit-content;
          margin: 0 auto 1rem;
        }

        .abt-hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--foreground, #F5F3F7);
          margin: 0 0 0.375rem;
          line-height: 1.1;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .abt-hero-subtitle {
          font-size: 1rem;
          font-weight: 600;
          color: var(--muted, #8A7A9E);
          margin: 0 0 1rem;
        }

        .abt-hero-bio {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--body-text, #B0A8C0);
          margin: 0 0 1.25rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .abt-hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .hero-tag {
          padding: 0.25rem 0.75rem;
          background: var(--surface-alt, rgba(255,255,255,0.03));
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--body-text, #B0A8C0);
        }

        .abt-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .abt-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(255, 31, 109, 0.25);
        }

        .abt-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(255, 31, 109, 0.35);
        }

        .abt-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--foreground, #F5F3F7);
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease-out;
          text-decoration: none;
        }

        .abt-btn-secondary:hover {
          border-color: var(--foreground, #F5F3F7);
          color: var(--foreground, #F5F3F7);
        }

        .abt-hero-bar {
          height: 3px;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
        }

        /* ─── Container ─── */
        .abt-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
        }

        /* ─── Mission ─── */
        .abt-mission {
          max-width: 800px;
          margin: 0 auto 4rem;
          text-align: center;
        }

        .abt-mission-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255, 31, 109, 0.07);
          color: var(--primary, #FF1F6D);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .abt-section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--foreground, #F5F3F7);
          margin: 0 0 1rem;
        }

        .abt-mission-text {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--body-text, #B0A8C0);
        }

        /* ─── Stats ─── */
        .abt-stats-band {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin: 3rem 0;
          padding: 2rem 0;
          border-top: 1px solid var(--border, rgba(255,255,255,0.06));
          border-bottom: 1px solid var(--border, rgba(255,255,255,0.06));
        }

        .abt-stat-card {
          text-align: center;
          padding: 0.75rem;
        }

        .abt-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 31, 109, 0.07);
          color: var(--primary, #FF1F6D);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.5rem;
        }

        .abt-stat-value {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--foreground, #F5F3F7);
          line-height: 1;
        }

        .abt-stat-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted, #8A7A9E);
          margin-top: 0.25rem;
        }

        /* ─── Instructors ─── */
        .abt-instructors {
          margin-top: 4rem;
        }

        .abt-section-subtitle {
          text-align: center;
          font-size: 0.9375rem;
          color: var(--body-text, #B0A8C0);
          max-width: 560px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .abt-instructor-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        .abt-inst-card {
          background: var(--surface, rgba(255,255,255,0.05));
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 14px;
          overflow: hidden;
          transition: box-shadow 0.25s ease-out, transform 0.25s ease-out;
          animation: fadeUp 0.5s ease-out both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .abt-inst-card:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          transform: translateY(-4px);
        }

        .abt-inst-img-wrap {
          height: 200px;
          overflow: hidden;
          background: var(--surface-alt, rgba(255,255,255,0.03));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .abt-inst-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .abt-inst-img-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted, #8A7A9E);
        }

        .abt-inst-body {
          padding: 1.25rem 1.5rem 1.5rem;
        }

        .abt-inst-style-badge {
          display: inline-block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--primary, #FF1F6D);
          background: rgba(255, 31, 109, 0.07);
          padding: 0.2rem 0.625rem;
          border-radius: 999px;
          margin-bottom: 0.5rem;
        }

        .abt-inst-name {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--foreground, #F5F3F7);
          margin: 0;
        }

        .abt-inst-role {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--primary, #FF1F6D);
          margin: 0.125rem 0 0.5rem;
        }

        .abt-inst-bio {
          font-size: 0.875rem;
          color: var(--body-text, #B0A8C0);
          line-height: 1.6;
          margin: 0;
        }

        .abt-skeleton-card {
          height: 340px;
          background: var(--surface-alt, rgba(255,255,255,0.03));
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 14px;
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
          background: var(--surface, rgba(255,255,255,0.05));
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 14px;
        }

        .abt-empty-state svg {
          color: var(--muted, #8A7A9E);
          margin-bottom: 1rem;
        }

        .abt-empty-state h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground, #F5F3F7);
          margin: 0 0 0.5rem;
        }

        .abt-empty-state p {
          color: var(--body-text, #B0A8C0);
          font-size: 0.9375rem;
          margin: 0;
        }

        /* ─── Bottom CTA ─── */
        .abt-bottom-cta {
          margin-top: 4rem;
          background: var(--surface, rgba(255,255,255,0.05));
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 14px;
          padding: 2.5rem 1.5rem;
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
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
        }

        .abt-bottom-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--foreground, #F5F3F7);
          margin: 0 0 0.625rem;
        }

        .abt-bottom-desc {
          font-size: 0.9375rem;
          color: var(--body-text, #B0A8C0);
          line-height: 1.65;
          max-width: 460px;
          margin: 0 auto 1.5rem;
        }

        .abt-bottom-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          justify-content: center;
          align-items: center;
        }

        .abt-bottom-actions .abt-btn-primary,
        .abt-bottom-actions .abt-btn-secondary {
          width: 100%;
          justify-content: center;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */

        /* ─── Tablet (640px+) ─── */
        @media (min-width: 640px) {
          .abt-stats-band {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
          }
          .abt-instructor-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .abt-hero-image-circle {
            width: 260px;
            height: 260px;
          }
        }

        /* ─── Desktop (1024px+) ─── */
        @media (min-width: 1024px) {
          .abt-hero-split {
            flex-direction: row;
            align-items: center;
            padding: 4rem 3rem;
            gap: 4rem;
          }

          .abt-hero-image-wrapper {
            max-width: 400px;
            flex-shrink: 0;
          }

          .abt-hero-image-circle {
            width: 320px;
            height: 320px;
          }

          .abt-hero-content {
            text-align: left;
            flex: 1;
          }

          .abt-eyebrow {
            margin: 0 0 1rem;
          }

          .abt-hero-title {
            font-size: 3.5rem;
          }

          .abt-hero-subtitle {
            font-size: 1.125rem;
          }

          .abt-hero-bio {
            margin-left: 0;
            margin-right: 0;
            max-width: 560px;
          }

          .abt-hero-tags {
            justify-content: flex-start;
          }

          .abt-hero-actions {
            justify-content: flex-start;
          }

          .abt-instructor-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }

          .abt-bottom-actions {
            flex-direction: row;
          }

          .abt-bottom-actions .abt-btn-primary,
          .abt-bottom-actions .abt-btn-secondary {
            width: auto;
          }
        }

        /* ─── Large Desktop (1440px+) ─── */
        @media (min-width: 1440px) {
          .abt-hero-image-circle {
            width: 380px;
            height: 380px;
          }

          .abt-hero-title {
            font-size: 4rem;
          }
        }

        /* ─── Mobile (480px) ─── */
        @media (max-width: 480px) {
          .abt-hero-image-circle {
            width: 180px;
            height: 180px;
          }

          .abt-hero-title {
            font-size: 1.75rem;
          }

          .abt-section-title {
            font-size: 1.5rem;
          }

          .abt-stats-band {
            gap: 0.5rem;
            padding: 1rem 0;
          }

          .abt-stat-value {
            font-size: 1.5rem;
          }

          .abt-stat-icon {
            width: 32px;
            height: 32px;
          }

          .abt-stat-icon svg {
            width: 18px;
            height: 18px;
          }

          .abt-bottom-cta {
            padding: 2rem 1rem;
          }

          .abt-bottom-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}