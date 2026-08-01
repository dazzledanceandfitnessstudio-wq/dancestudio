// components/DanceFitnessSection.js
"use client";

import { useState } from 'react';
import { Activity, Music, ChevronDown, ChevronUp } from 'lucide-react';

export default function DanceFitnessSection() {
  const [danceExpanded, setDanceExpanded] = useState(false);
  const [fitnessExpanded, setFitnessExpanded] = useState(false);

  const danceStyles = [
    'Kathak',
    'Bharatanatyam',
    'Semi-Classical Dance',
    'Bollywood Dance',
    'Western Dance',
    'Contemporary Dance',
    'Freestyle',
    'Folk Dance',
    'Kids Dance Classes',
    'Ladies Dance Batches',
    'Wedding Choreography',
    'Stage Performance Training',
    'Annual Show Preparation',
    'Competition & Event Training'
  ];

  const fitnessPrograms = [
    'Strength Training',
    'Fat Loss & Weight Management',
    'Functional Training',
    'Endurance & Stamina Building',
    'Power Yoga & Flexibility',
    'Zumba Fitness',
    'Cardio Conditioning',
    'Mobility & Core Strength',
    'Personalized Workout Plans',
    'Health & Lifestyle Guidance',
    'Ladies Special Fitness Batches'
  ];

  // Show only first 4 items when collapsed
  const getVisibleItems = (items, expanded) => {
    return expanded ? items : items.slice(0, 4);
  };

  return (
    <section className="dance-fitness-section">
      <div className="df-container">
        {/* Programs Section */}
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
                {getVisibleItems(danceStyles, danceExpanded).map((style, index) => (
                  <li key={index} className="df-program-item">
                    <span className="df-program-bullet dance-bullet">✦</span>
                    {style}
                  </li>
                ))}
              </ul>
              {danceStyles.length > 4 && (
                <button 
                  className="df-toggle-btn"
                  onClick={() => setDanceExpanded(!danceExpanded)}
                >
                  <span>{danceExpanded ? 'Show Less' : `Show All (${danceStyles.length})`}</span>
                  {danceExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              )}
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
                {getVisibleItems(fitnessPrograms, fitnessExpanded).map((program, index) => (
                  <li key={index} className="df-program-item">
                    <span className="df-program-bullet fitness-bullet">▶</span>
                    {program}
                  </li>
                ))}
              </ul>
              {fitnessPrograms.length > 4 && (
                <button 
                  className="df-toggle-btn"
                  onClick={() => setFitnessExpanded(!fitnessExpanded)}
                >
                  <span>{fitnessExpanded ? 'Show Less' : `Show All (${fitnessPrograms.length})`}</span>
                  {fitnessExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              )}
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
           PROGRAMS SECTION
           ============================================================ */
        .df-programs {
          margin-top: 0;
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
          transition: all 0.3s ease;
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

        /* Toggle Button */
        .df-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.5rem 1.25rem;
          background: transparent;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          color: var(--body-text);
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease-out;
        }

        .df-toggle-btn:hover {
          border-color: #FF1F6D;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.05);
        }

        .df-toggle-btn svg {
          transition: transform 0.3s ease;
        }

        /* Responsive */
        @media (min-width: 640px) {
          .df-program-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .df-programs-grid {
            grid-template-columns: 1fr 1fr;
          }

          .df-program-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .df-program-card {
            padding: 1.5rem;
          }

          .df-program-item {
            font-size: 0.875rem;
            padding: 0.375rem 0.5rem;
          }

          .df-toggle-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}