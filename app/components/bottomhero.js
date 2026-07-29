"use client";

import { Award, Sparkles, ArrowRight, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BottomHero() {
  return (
    <section className="bottom-hero-section">
      <div className="bottom-hero-container">
        <div className="bottom-hero-grid">
          {/* Left Side - Text Content */}
          <div className="bottom-hero-content-wrapper">
            <div className="bottom-hero-content">
              {/* Premium Badge */}
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

              {/* Certification Badge - Premium Realistic Look */}
              <div className="bottom-hero-certification">
                <div className="bottom-hero-cert-badge">
                  <div className="cert-icon-wrapper">
                    <Award size={24} className="cert-icon" />
                  </div>
                  <div className="cert-text">
                    <span className="cert-label">Official Certification</span>
                    <span className="cert-name">FSSA</span>
                    <span className="cert-full">Fitness Science & Sports Association</span>
                  </div>
                </div>
              </div>

              {/* Buttons - Below Certification */}
              <div className="bottom-hero-actions">
                <Link href="/registration" className="bottom-hero-btn-primary">
                  <span>Enroll Now</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="tel:+919876543210" className="bottom-hero-btn-secondary">
                  <Phone size={18} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="bottom-hero-image-wrapper">
            <div className="bottom-hero-image-container">
              <Image
                src="/bottomhero/image.png"
                alt="Dance & Fitness Studio"
                fill
                className="bottom-hero-image"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={100}
              />
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

        /* Premium Badge - Pink */
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

        /* ============================================================
           FSSA CERTIFICATION BADGE - REALISTIC DESIGN
           ============================================================ */
        .bottom-hero-certification {
          margin-top: 0.5rem;
        }

        .bottom-hero-cert-badge {
          display: inline-flex;
          align-items: center;
          gap: 1.25rem;
          background: linear-gradient(135deg, #ffffff 0%, #faf8f2 100%);
          border: 2px solid #D4AF37;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          box-shadow: 
            0 10px 25px -5px rgba(212, 175, 55, 0.15),
            0 0 10px rgba(212, 175, 55, 0.1) inset;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .bottom-hero-cert-badge:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 15px 30px -5px rgba(212, 175, 55, 0.25),
            0 0 15px rgba(212, 175, 55, 0.15) inset;
        }

        /* Sweeping Shine Animation across the badge */
        .bottom-hero-cert-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          transform: skewX(-20deg);
          animation: goldSweep 5s infinite;
          z-index: 1;
        }

        @keyframes goldSweep {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

        .cert-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #AA7700 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid #FFF;
          box-shadow: 0 4px 10px rgba(170, 119, 0, 0.4);
          z-index: 2;
          position: relative;
        }

        .cert-icon {
          color: #FFF;
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
        }

        .cert-text {
          display: flex;
          flex-direction: column;
          z-index: 2;
          position: relative;
        }

        .cert-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8C6A1C;
        }

        .cert-name {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #B8860B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }

        .cert-full {
          font-size: 0.7rem;
          color: #666;
          font-weight: 500;
          margin-top: 0.125rem;
        }

        /* ============================================================
           BUTTONS - BELOW CERTIFICATION
           ============================================================ */
        .bottom-hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        /* Call Now - Outlined (Needs to go above global styles) */
        .bottom-hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
          text-decoration: none;
          min-width: 160px;
          text-align: center;
        }

        .bottom-hero-btn-secondary span {
          display: inline-block;
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
          max-width: 600px;
          aspect-ratio: 2/3;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        }

        .bottom-hero-image {
          object-fit: cover;
          transition: transform 0.6s ease-out;
        }

        .bottom-hero-image-container:hover .bottom-hero-image {
          transform: scale(1.03);
        }

        .bottom-hero-decoration {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
          opacity: 0.12;
          animation: pulse 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.12; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }

        .bottom-hero-decoration-1 {
          width: 100px;
          height: 100px;
          top: -30px;
          right: -30px;
        }

        .bottom-hero-decoration-2 {
          width: 70px;
          height: 70px;
          bottom: -20px;
          left: -20px;
          animation-delay: 1s;
        }

        .bottom-hero-decoration-3 {
          width: 50px;
          height: 50px;
          top: 30%;
          right: -15px;
          animation-delay: 2s;
        }

        .bottom-hero-decoration-4 {
          width: 60px;
          height: 60px;
          bottom: 30%;
          left: -15px;
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

          .bottom-hero-image-container {
            max-width: 500px;
            aspect-ratio: 2/3;
          }

          .bottom-hero-title-studio {
            font-size: 3.5rem;
          }

          .bottom-hero-title-studio-highlight {
            font-size: 2.75rem;
          }
        }

        @media (min-width: 1024px) {
          .bottom-hero-image-container {
            max-width: 550px;
            aspect-ratio: 2/3;
          }

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

          .bottom-hero-image-container {
            max-width: 100%;
            aspect-ratio: 2/3;
          }

          .bottom-hero-description {
            font-size: 0.9375rem;
          }

          .bottom-hero-cert-badge {
            padding: 0.75rem 1rem;
            flex-wrap: wrap;
          }

          .cert-name {
            font-size: 1.25rem;
          }

          .bottom-hero-btn-secondary {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
            width: 100%;
            min-width: unset;
            justify-content: center;
          }

          .bottom-hero-actions {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
      
      {/* Global styles for the Next.js Link component */}
      <style jsx global>{`
        /* Enroll Now - Premium Pink Button */
        .bottom-hero-btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #FF5E96 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.875rem 2.5rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px -5px rgba(255, 31, 109, 0.5), 0 8px 10px -6px rgba(255, 31, 109, 0.3);
          text-decoration: none;
          min-width: 160px;
          text-align: center;
          overflow: hidden;
          z-index: 1;
        }

        /* Shine Effect Animation */
        .bottom-hero-btn-primary::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: skewX(-20deg);
          transition: all 0.6s ease-in-out;
          z-index: -1;
        }

        .bottom-hero-btn-primary span {
          display: inline-block;
        }

        .bottom-hero-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px -5px rgba(255, 31, 109, 0.6), 0 10px 15px -5px rgba(255, 31, 109, 0.4);
          background: linear-gradient(135deg, #E0185E 0%, #FF4583 100%);
        }

        .bottom-hero-btn-primary:hover::after {
          left: 150%;
        }
        
        @media (max-width: 480px) {
          .bottom-hero-btn-primary {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
            width: 100%;
            min-width: unset;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}