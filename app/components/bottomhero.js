// components/bottomhero.js
"use client";

import { Award, Sparkles, ArrowRight } from 'lucide-react';

export default function BottomHero() {
  return (
    <section className="bottom-hero-section">
      <div className="bottom-hero-container">
        <div className="bottom-hero-grid">
          {/* Left Side - Text Content */}
          <div className="bottom-hero-content-wrapper">
            <div className="bottom-hero-content">
              {/* Badge */}
              <div className="bottom-hero-badge">
                <Sparkles size={16} />
                <span>Premium Dance Studio</span>
              </div>

              {/* Title */}
              <h1 className="bottom-hero-title">
                <span className="bottom-hero-title-line">Welcome to</span>
                <span className="bottom-hero-title-studio">Dazzle</span>
                <span className="bottom-hero-title-studio-highlight">Dance & Fitness Studio</span>
              </h1>

              {/* Description */}
              <p className="bottom-hero-description">
                Achieve your dance and fitness goals with expert guidance.
                Your destination for dance, fitness, and a healthier lifestyle all under one roof.
              </p>

              {/* Certification Badge - FSSA */}
              <div className="bottom-hero-certification">
                <div className="bottom-hero-cert-badge">
                  <Award size={28} className="bottom-hero-cert-icon" />
                  <div className="bottom-hero-cert-content">
                    <span className="bottom-hero-cert-label">Certified by</span>
                    <span className="bottom-hero-cert-name">FSSA</span>
                    <span className="bottom-hero-cert-full">(Fitness Science & Sports Association)</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="bottom-hero-actions">
                <button className="bottom-hero-btn-primary">
                  Get Started
                  <ArrowRight size={18} />
                </button>
                <button className="bottom-hero-btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="bottom-hero-image-wrapper">
            <div className="bottom-hero-image-container">
              <div className="bottom-hero-image-placeholder">
                <span className="bottom-hero-image-emoji">💃</span>
                <span className="bottom-hero-image-label">Dance & Fitness</span>
              </div>
              {/* Decorative elements */}
              <div className="bottom-hero-decoration bottom-hero-decoration-1">
                <span className="bottom-hero-decoration-dot"></span>
              </div>
              <div className="bottom-hero-decoration bottom-hero-decoration-2">
                <span className="bottom-hero-decoration-dot"></span>
              </div>
              <div className="bottom-hero-decoration bottom-hero-decoration-3">
                <span className="bottom-hero-decoration-dot"></span>
              </div>
              <div className="bottom-hero-decoration bottom-hero-decoration-4">
                <span className="bottom-hero-decoration-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bottom-hero-section {
          padding: 4rem 0 5rem;
          background: var(--background);
          color: var(--foreground);
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .bottom-hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
          width: 100%;
        }

        .bottom-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        /* ============================================================
           CONTENT SIDE
           ============================================================ */
        .bottom-hero-content-wrapper {
          display: flex;
          align-items: center;
          order: 2;
        }

        .bottom-hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .bottom-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.07);
          padding: 0.4rem 1rem;
          border-radius: 999px;
          width: fit-content;
        }

        .bottom-hero-title {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          margin: 0;
        }

        .bottom-hero-title-line {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--body-text);
        }

        .bottom-hero-title-studio {
          font-family: 'Poppins', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bottom-hero-title-studio-highlight {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .bottom-hero-description {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--body-text);
          margin: 0;
          max-width: 520px;
        }

        /* Certification */
        .bottom-hero-certification {
          margin-top: 0.5rem;
        }

        .bottom-hero-cert-badge {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
          border: 1.5px solid rgba(255, 31, 109, 0.15);
          padding: 0.75rem 1.5rem;
          border-radius: 14px;
          transition: all 0.3s ease-out;
        }

        .bottom-hero-cert-badge:hover {
          border-color: rgba(255, 31, 109, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 31, 109, 0.08);
        }

        .bottom-hero-cert-icon {
          color: #FF1F6D;
          flex-shrink: 0;
        }

        .bottom-hero-cert-content {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .bottom-hero-cert-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .bottom-hero-cert-name {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #FF1F6D;
          letter-spacing: 0.02em;
        }

        .bottom-hero-cert-full {
          font-size: 0.75rem;
          color: var(--body-text);
        }

        /* CTA Buttons */
        .bottom-hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .bottom-hero-btn-primary {
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
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease-out;
          box-shadow: 0 4px 20px rgba(255, 31, 109, 0.25);
        }

        .bottom-hero-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(255, 31, 109, 0.35);
        }

        .bottom-hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--foreground);
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.875rem 2rem;
          border: 2px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease-out;
        }

        .bottom-hero-btn-secondary:hover {
          border-color: var(--foreground);
          background: var(--foreground);
          color: var(--background);
        }

        /* ============================================================
           IMAGE SIDE
           ============================================================ */
        .bottom-hero-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          order: 1;
        }

        .bottom-hero-image-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/3;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
          border: 1px solid var(--border);
        }

        .bottom-hero-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.08), rgba(123, 47, 255, 0.08));
        }

        .bottom-hero-image-emoji {
          font-size: 6rem;
          opacity: 0.6;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .bottom-hero-image-label {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--muted);
          margin-top: 0.5rem;
        }

        /* Decorative elements */
        .bottom-hero-decoration {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
          opacity: 0.15;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.1); opacity: 0.25; }
        }

        .bottom-hero-decoration-1 {
          width: 80px;
          height: 80px;
          top: -20px;
          right: -20px;
        }

        .bottom-hero-decoration-2 {
          width: 60px;
          height: 60px;
          bottom: -15px;
          left: -15px;
          animation-delay: 1s;
        }

        .bottom-hero-decoration-3 {
          width: 40px;
          height: 40px;
          top: 30%;
          right: -10px;
          animation-delay: 2s;
        }

        .bottom-hero-decoration-4 {
          width: 50px;
          height: 50px;
          bottom: 30%;
          left: -10px;
          animation-delay: 1.5s;
        }

        .bottom-hero-decoration-dot {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (min-width: 768px) {
          .bottom-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }

          .bottom-hero-content-wrapper {
            order: 1;
          }

          .bottom-hero-image-wrapper {
            order: 2;
          }

          .bottom-hero-title-studio {
            font-size: 3.5rem;
          }

          .bottom-hero-title-studio-highlight {
            font-size: 2.75rem;
          }
        }

        @media (min-width: 1024px) {
          .bottom-hero-title-studio {
            font-size: 4rem;
          }

          .bottom-hero-title-studio-highlight {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .bottom-hero-title-studio {
            font-size: 2.25rem;
          }

          .bottom-hero-title-studio-highlight {
            font-size: 1.75rem;
          }

          .bottom-hero-title-line {
            font-size: 1rem;
          }

          .bottom-hero-image-emoji {
            font-size: 4rem;
          }

          .bottom-hero-description {
            font-size: 0.9375rem;
          }

          .bottom-hero-cert-badge {
            padding: 0.5rem 1rem;
          }

          .bottom-hero-cert-name {
            font-size: 1rem;
          }

          .bottom-hero-btn-primary,
          .bottom-hero-btn-secondary {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
            width: 100%;
            justify-content: center;
          }

          .bottom-hero-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}