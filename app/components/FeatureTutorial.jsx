"use client";

import Link from "next/link";
import { Play, Video, ArrowRight, Sparkles, Star } from "lucide-react";

export default function FeatureTutorial() {
  return (
    <section className="ld-section ld-container ft-section">
      {/* Section Badge */}
      <div className="ft-section-badge">
        <Sparkles size={14} />
        <span>Featured</span>
      </div>

      <div className="ft-split">
        {/* Left Side - Video */}
        <div className="ft-media-wrapper">
          <div className="ft-media">
            <div className="ft-video-container">
              <iframe 
                src="https://www.youtube.com/embed/G3HRD5f0YEQ?si=evRbbeET0AVUwLbU&autoplay=0&rel=0" 
                title="Dazzle Dance Studio - Why Choose Us" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="ft-video-iframe"
              />
            </div>
            {/* Play Button Overlay - Hidden, but kept for design */}
            <div className="ft-play-overlay">
              <div className="ft-play-pulse"></div>
             
            </div>
          </div>
          {/* Video Stats */}
          <div className="ft-video-stats">
            <span className="ft-stat-item">
              <span className="ft-stat-dot"></span>
              2.5K+ Views
            </span>
            <span className="ft-stat-item">
              <span className="ft-stat-dot"></span>
              98% Positive
            </span>
            <span className="ft-stat-item">
              <span className="ft-stat-dot"></span>
              Featured
            </span>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="ft-text">
          <span className="ft-eyebrow">
            <Video size={13} strokeWidth={2.5} />
            Why Dazzle
          </span>
          <h2 className="ft-title">
            Not Your Average
            <br />
            <span className="ft-title-highlight">Online Tutorial</span>
          </h2>
          <p className="ft-desc">
            Learn from competition champions and music-video choreographers in
            real time. Our classes blend structured technique with creative
            freestyle so you actually retain what you learn — and have fun doing it.
          </p>
          
          {/* Features List */}
          <ul className="ft-features-list">
            <li>
              <Star size={16} className="ft-feature-icon" />
              <span>Expert instructors with years of experience</span>
            </li>
            <li>
              <Star size={16} className="ft-feature-icon" />
              <span>Structured curriculum for all skill levels</span>
            </li>
            <li>
              <Star size={16} className="ft-feature-icon" />
              <span>Creative freestyle and performance training</span>
            </li>
          </ul>

          <Link href="/courses" className="btn-gradient-cta">
            Explore Courses <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .ft-section {
          padding: 5rem 0;
          background: var(--background);
          color: var(--foreground);
          position: relative;
        }

        .ft-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.07);
          padding: 0.3rem 1rem;
          border-radius: 999px;
          margin-bottom: 2rem;
        }

        .ft-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        /* ============================================================
           LEFT - VIDEO
           ============================================================ */
        .ft-media-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ft-media {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #0B0A0F;
          aspect-ratio: 16/9;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          transition: all 0.4s ease-out;
          border: 1px solid var(--border);
        }

        .ft-media:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
          border-color: rgba(255, 31, 109, 0.2);
        }

        .ft-video-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .ft-video-iframe {
          width: 100%;
          height: 100%;
          min-height: 250px;
          border: none;
        }

        /* Play Button Overlay */
        .ft-play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease-out;
        }

        .ft-media:hover .ft-play-overlay {
          opacity: 1;
        }

        .ft-play-pulse {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 31, 109, 0.15);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }

        .ft-play-btn {
          position: relative;
          z-index: 2;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          border: none;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease-out;
          box-shadow: 0 0 40px rgba(255, 31, 109, 0.3);
          pointer-events: auto;
        }

        .ft-play-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 60px rgba(255, 31, 109, 0.5);
        }

        /* Video Stats */
        .ft-video-stats {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .ft-stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--body-text);
          font-weight: 500;
        }

        .ft-stat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF1F6D;
        }

        /* ============================================================
           RIGHT - CONTENT
           ============================================================ */
        .ft-text {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ft-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.07);
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          width: fit-content;
        }

        .ft-title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--foreground);
          line-height: 1.15;
          margin: 0;
        }

        .ft-title-highlight {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ft-desc {
          font-size: 1.0625rem;
          color: var(--body-text);
          line-height: 1.7;
          margin: 0;
          max-width: 480px;
        }

        .ft-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ft-features-list li {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.9375rem;
          color: var(--body-text);
          padding: 0.375rem 0;
        }

        .ft-feature-icon {
          color: #FF1F6D;
          flex-shrink: 0;
        }

        .btn-gradient-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease-out;
          box-shadow: 0 4px 20px rgba(255, 31, 109, 0.25);
          text-decoration: none;
          width: fit-content;
        }

        .btn-gradient-cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(255, 31, 109, 0.35);
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (min-width: 768px) {
          .ft-split {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }

          .ft-title {
            font-size: 2.75rem;
          }
        }

        @media (min-width: 1024px) {
          .ft-split {
            gap: 4rem;
          }

          .ft-title {
            font-size: 3rem;
          }

          .ft-video-iframe {
            min-height: 320px;
          }

          .ft-play-btn {
            width: 80px;
            height: 80px;
          }

          .ft-play-btn svg {
            width: 32px;
            height: 32px;
          }
        }

        @media (max-width: 480px) {
          .ft-title {
            font-size: 1.75rem;
          }

          .ft-desc {
            font-size: 0.9375rem;
          }

          .ft-features-list li {
            font-size: 0.875rem;
          }

          .ft-video-iframe {
            min-height: 200px;
          }

          .ft-play-btn {
            width: 56px;
            height: 56px;
          }

          .ft-play-btn svg {
            width: 22px;
            height: 22px;
          }

          .ft-play-pulse {
            width: 80px;
            height: 80px;
          }

          .ft-video-stats {
            gap: 1rem;
          }

          .ft-stat-item {
            font-size: 0.7rem;
          }

          .btn-gradient-cta {
            width: 100%;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
}