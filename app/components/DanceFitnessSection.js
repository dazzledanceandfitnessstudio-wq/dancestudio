// components/DanceFitnessSection.js
"use client";

import { Award, Sparkles, Heart, Activity, Music, Flame, Star } from 'lucide-react';

export default function DanceFitnessSection() {
  const danceStyles = [
    '✨ Kathak',
    '✨ Bharatanatyam',
    '✨ Semi-Classical Dance',
    '✨ Bollywood Dance',
    '✨ Western Dance',
    '✨ Contemporary Dance',
    '✨ Freestyle',
    '✨ Folk Dance',
    '✨ Kids Dance Classes',
    '✨ Ladies Dance Batches',
    '✨ Wedding Choreography',
    '✨ Stage Performance Training',
    '✨ Annual Show Preparation',
    '✨ Competition & Event Training'
  ];

  const fitnessPrograms = [
    '💪 Strength Training',
    '🔥 Fat Loss & Weight Management',
    '🏋️ Functional Training',
    '⚡ Endurance & Stamina Building',
    '🧘 Power Yoga & Flexibility',
    '🎵 Zumba Fitness',
    '❤️ Cardio Conditioning',
    '🏃 Mobility & Core Strength',
    '🎯 Personalized Workout Plans',
    '🍎 Health & Lifestyle Guidance',
    '👩 Ladies Special Fitness Batches'
  ];

  return (
    <section className="dance-fitness-section">
      <div className="df-container">
        {/* Hero Content with Image and Text */}
        <div className="df-hero-grid">
          {/* Left Side - Image */}
          <div className="df-image-wrapper">
            <div className="df-image-container">
              <div className="df-image-placeholder">
                <span className="df-image-emoji">💃</span>
                <span className="df-image-label">Dance & Fitness</span>
              </div>
              {/* Decorative elements */}
              <div className="df-decoration df-decoration-1">
                <span className="df-dot"></span>
              </div>
              <div className="df-decoration df-decoration-2">
                <span className="df-dot"></span>
              </div>
              <div className="df-decoration df-decoration-3">
                <span className="df-dot"></span>
              </div>
              <div className="df-decoration df-decoration-4">
                <span className="df-dot"></span>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="df-content-wrapper">
            <div className="df-content">
              {/* Badge */}
              <div className="df-badge">
                <Sparkles size={16} />
                <span>Premium Dance Studio</span>
              </div>

              {/* Title */}
              <h1 className="df-title">
                <span className="df-title-line">Welcome to</span>
                <span className="df-title-studio">Dazzle</span>
                <span className="df-title-studio-highlight">Dance & Fitness Studio</span>
              </h1>

              {/* Description */}
              <p className="df-description">
                Achieve your dance and fitness goals with expert guidance.
                Your destination for dance, fitness, and a healthier lifestyle all under one roof.
              </p>

              {/* Certification Badge - FSSA */}
              <div className="df-certification">
                <div className="df-cert-badge">
                  <Award size={28} className="df-cert-icon" />
                  <div className="df-cert-content">
                    <span className="df-cert-label">Certified by</span>
                    <span className="df-cert-name">FSSA</span>
                    <span className="df-cert-full">(Fitness Science & Sports Association)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dance & Fitness Programs Table */}
        <div className="df-programs">
          <div className="df-programs-header">
            <h2 className="df-programs-title">
              Our <span className="gradient-text">Programs</span>
            </h2>
            <p className="df-programs-subtitle">
              Discover our comprehensive range of dance and fitness programs
            </p>
          </div>

          <div className="df-programs-grid">
            {/* Dance Section */}
            <div className="df-program-card df-dance-card">
              <div className="df-program-header">
                <div className="df-program-icon-wrapper dance-icon">
                  <Music size={28} />
                </div>
                <h3 className="df-program-title">Dance Programs</h3>
                <p className="df-program-desc">Explore the joy of movement</p>
              </div>
              <ul className="df-program-list">
                {danceStyles.map((style, index) => (
                  <li key={index} className="df-program-item">
                    <span className="df-program-bullet dance-bullet">✦</span>
                    {style.replace('✨ ', '')}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fitness Section */}
            <div className="df-program-card df-fitness-card">
              <div className="df-program-header">
                <div className="df-program-icon-wrapper fitness-icon">
                  <Activity size={28} />
                </div>
                <h3 className="df-program-title">Fitness Programs</h3>
                <p className="df-program-desc">Transform your body and mind</p>
              </div>
              <ul className="df-program-list">
                {fitnessPrograms.map((program, index) => (
                  <li key={index} className="df-program-item">
                    <span className="df-program-bullet fitness-bullet">▶</span>
                    {program.replace(/[^\w\s]/g, '').trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dance-fitness-section {
          padding: 4rem 0 5rem;
          background: var(--background);
          color: var(--foreground);
        }

        .df-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        /* ============================================================
           HERO GRID
           ============================================================ */
        .df-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        /* Image Side */
        .df-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .df-image-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/3;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
          border: 1px solid var(--border);
        }

        .df-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.08), rgba(123, 47, 255, 0.08));
        }

        .df-image-emoji {
          font-size: 6rem;
          opacity: 0.6;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .df-image-label {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--muted);
          margin-top: 0.5rem;
        }

        /* Decorative elements */
        .df-decoration {
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

        .df-decoration-1 {
          width: 80px;
          height: 80px;
          top: -20px;
          right: -20px;
        }

        .df-decoration-2 {
          width: 60px;
          height: 60px;
          bottom: -15px;
          left: -15px;
          animation-delay: 1s;
        }

        .df-decoration-3 {
          width: 40px;
          height: 40px;
          top: 30%;
          right: -10px;
          animation-delay: 2s;
        }

        .df-decoration-4 {
          width: 50px;
          height: 50px;
          bottom: 30%;
          left: -10px;
          animation-delay: 1.5s;
        }

        .df-dot {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
        }

        /* Content Side */
        .df-content-wrapper {
          display: flex;
          align-items: center;
        }

        .df-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .df-badge {
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

        .df-title {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          margin: 0;
        }

        .df-title-line {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--body-text);
        }

        .df-title-studio {
          font-family: 'Poppins', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .df-title-studio-highlight {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .df-description {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--body-text);
          margin: 0;
          max-width: 520px;
        }

        /* Certification */
        .df-certification {
          margin-top: 0.5rem;
        }

        .df-cert-badge {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
          border: 1.5px solid rgba(255, 31, 109, 0.15);
          padding: 0.75rem 1.5rem;
          border-radius: 14px;
          transition: all 0.3s ease-out;
        }

        .df-cert-badge:hover {
          border-color: rgba(255, 31, 109, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 31, 109, 0.08);
        }

        .df-cert-icon {
          color: #FF1F6D;
          flex-shrink: 0;
        }

        .df-cert-content {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .df-cert-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .df-cert-name {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #FF1F6D;
          letter-spacing: 0.02em;
        }

        .df-cert-full {
          font-size: 0.75rem;
          color: var(--body-text);
        }

        /* ============================================================
           PROGRAMS SECTION
           ============================================================ */
        .df-programs {
          margin-top: 3rem;
        }

        .df-programs-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .df-programs-title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .df-programs-subtitle {
          font-size: 1.0625rem;
          color: var(--body-text);
          margin: 0;
        }

        .df-programs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .df-program-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.3s ease-out;
          position: relative;
          overflow: hidden;
        }

        .df-program-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .df-dance-card::before {
          background: linear-gradient(90deg, #FF1F6D, #7B2FFF);
        }

        .df-fitness-card::before {
          background: linear-gradient(90deg, #00E5FF, #C6FF3D);
        }

        .df-program-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 31, 109, 0.1);
        }

        .df-program-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .df-program-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
        }

        .dance-icon {
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
        }

        .fitness-icon {
          background: linear-gradient(135deg, #00E5FF, #0088FF);
        }

        .df-program-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }

        .df-program-desc {
          font-size: 0.875rem;
          color: var(--body-text);
          margin: 0;
        }

        .df-program-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        .df-program-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.9375rem;
          color: var(--body-text);
          transition: all 0.2s ease-out;
        }

        .df-program-item:hover {
          background: var(--background);
          transform: translateX(4px);
        }

        .df-program-bullet {
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .dance-bullet {
          color: #FF1F6D;
        }

        .fitness-bullet {
          color: #00E5FF;
        }

        /* Responsive */
        @media (min-width: 640px) {
          .df-program-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 768px) {
          .df-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }

          .df-title-studio {
            font-size: 3.5rem;
          }

          .df-title-studio-highlight {
            font-size: 2.75rem;
          }
        }

        @media (min-width: 1024px) {
          .df-programs-grid {
            grid-template-columns: 1fr 1fr;
          }

          .df-title-studio {
            font-size: 4rem;
          }

          .df-title-studio-highlight {
            font-size: 3rem;
          }

          .df-program-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .df-title-studio {
            font-size: 2.25rem;
          }

          .df-title-studio-highlight {
            font-size: 1.75rem;
          }

          .df-title-line {
            font-size: 1rem;
          }

          .df-image-emoji {
            font-size: 4rem;
          }

          .df-program-card {
            padding: 1.5rem;
          }

          .df-program-item {
            font-size: 0.875rem;
            padding: 0.375rem 0.5rem;
          }

          .df-cert-badge {
            padding: 0.5rem 1rem;
          }

          .df-cert-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}