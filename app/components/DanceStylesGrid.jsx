"use client";

import { useState } from 'react';
import { Sparkles, Music, Activity, ChevronDown, ChevronUp } from 'lucide-react';

const DANCE_STYLES = [
  { name: "Kathak", emoji: "🕉️", classes: "Classical Dance", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Bharatanatyam", emoji: "🪷", classes: "Classical Dance", bg: "rgba(123, 47, 255, 0.06)" },
  { name: "Semi-Classical", emoji: "💫", classes: "Fusion Dance", bg: "rgba(0, 229, 255, 0.08)" },
  { name: "Bollywood", emoji: "🎬", classes: "Commercial Dance", bg: "rgba(198, 255, 61, 0.10)" },
  { name: "Western Dance", emoji: "🌍", classes: "International", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Contemporary", emoji: "🌊", classes: "Modern Dance", bg: "rgba(123, 47, 255, 0.06)" },
  { name: "Freestyle", emoji: "🎵", classes: "Improvisation", bg: "rgba(0, 229, 255, 0.08)" },
  { name: "Folk Dance", emoji: "🎭", classes: "Traditional", bg: "rgba(198, 255, 61, 0.10)" },
  { name: "Kids Dance", emoji: "🧒", classes: "Age 4+", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Ladies Batch", emoji: "👩", classes: "Women Only", bg: "rgba(123, 47, 255, 0.06)" },
  { name: "Wedding Choreo", emoji: "💍", classes: "Special Events", bg: "rgba(0, 229, 255, 0.08)" },
  { name: "Stage Performance", emoji: "🎪", classes: "Show Training", bg: "rgba(198, 255, 61, 0.10)" },
];

const FITNESS_PROGRAMS = [
  { name: "Strength Training", emoji: "💪", classes: "Build Muscle", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Fat Loss", emoji: "🔥", classes: "Weight Management", bg: "rgba(198, 255, 61, 0.10)" },
  { name: "Functional Training", emoji: "🏋️", classes: "Daily Movement", bg: "rgba(123, 47, 255, 0.06)" },
  { name: "Endurance", emoji: "⚡", classes: "Stamina Building", bg: "rgba(0, 229, 255, 0.08)" },
  { name: "Power Yoga", emoji: "🧘", classes: "Flexibility", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Zumba", emoji: "🎵", classes: "Dance Fitness", bg: "rgba(198, 255, 61, 0.10)" },
  { name: "Cardio", emoji: "❤️", classes: "Heart Health", bg: "rgba(123, 47, 255, 0.06)" },
  { name: "Core Strength", emoji: "🎯", classes: "Mobility", bg: "rgba(0, 229, 255, 0.08)" },
  { name: "Personalized Plans", emoji: "📋", classes: "Custom Workouts", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Health Guidance", emoji: "🍎", classes: "Lifestyle", bg: "rgba(198, 255, 61, 0.10)" },
  { name: "Ladies Fitness", emoji: "👩", classes: "Women Special", bg: "rgba(123, 47, 255, 0.06)" },
];

export default function DanceStylesGrid() {
  const [danceExpanded, setDanceExpanded] = useState(false);
  const [fitnessExpanded, setFitnessExpanded] = useState(false);

  const getVisibleItems = (items, expanded) => {
    return expanded ? items : items.slice(0, 4);
  };

  return (
    <section className="ld-section ld-container ds-grid-section">
      <div className="ds-header">
        <div className="ds-title-wrapper">
          <Sparkles size={24} color="#FF1F6D" />
          <h2>Our Programs</h2>
        </div>
        <p className="ds-subtitle">Explore our comprehensive range of dance and fitness programs</p>
      </div>

      <div className="ds-programs-wrapper">
        {/* Dance Section - Left */}
        <div className="ds-program-column dance-column">
          <div className="ds-program-header">
            <div className="ds-program-icon dance-icon">
              <Music size={24} />
            </div>
            <h3 className="ds-program-title">Dance Programs</h3>
            <span className="ds-program-count">{DANCE_STYLES.length} Styles</span>
          </div>
          <div className="ds-grid dance-grid">
            {getVisibleItems(DANCE_STYLES, danceExpanded).map((style) => (
              <div className="ds-card" key={style.name}>
                <div className="ds-card-icon" style={{ background: style.bg }}>
                  <span className="ds-card-emoji">{style.emoji}</span>
                </div>
                <div className="ds-card-text">
                  <span className="ds-card-name">{style.name}</span>
                  <span className="ds-card-count">{style.classes}</span>
                </div>
              </div>
            ))}
          </div>
          {DANCE_STYLES.length > 4 && (
            <button 
              className="ds-toggle-btn dance-toggle"
              onClick={() => setDanceExpanded(!danceExpanded)}
            >
              <span>{danceExpanded ? 'Show Less' : `Show All (${DANCE_STYLES.length})`}</span>
              {danceExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          )}
        </div>

        {/* Fitness Section - Right */}
        <div className="ds-program-column fitness-column">
          <div className="ds-program-header">
            <div className="ds-program-icon fitness-icon">
              <Activity size={24} />
            </div>
            <h3 className="ds-program-title">Fitness Programs</h3>
            <span className="ds-program-count">{FITNESS_PROGRAMS.length} Programs</span>
          </div>
          <div className="ds-grid fitness-grid">
            {getVisibleItems(FITNESS_PROGRAMS, fitnessExpanded).map((program) => (
              <div className="ds-card" key={program.name}>
                <div className="ds-card-icon" style={{ background: program.bg }}>
                  <span className="ds-card-emoji">{program.emoji}</span>
                </div>
                <div className="ds-card-text">
                  <span className="ds-card-name">{program.name}</span>
                  <span className="ds-card-count">{program.classes}</span>
                </div>
              </div>
            ))}
          </div>
          {FITNESS_PROGRAMS.length > 4 && (
            <button 
              className="ds-toggle-btn fitness-toggle"
              onClick={() => setFitnessExpanded(!fitnessExpanded)}
            >
              <span>{fitnessExpanded ? 'Show Less' : `Show All (${FITNESS_PROGRAMS.length})`}</span>
              {fitnessExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .ds-grid-section {
          padding: 4rem 0;
          background: var(--background);
          color: var(--foreground);
        }

        .ds-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .ds-title-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .ds-title-wrapper h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0;
        }

        .ds-subtitle {
          font-size: 1.0625rem;
          color: var(--body-text);
          margin: 0;
        }

        .ds-programs-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        .ds-program-column {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.5rem;
          transition: all 0.3s ease-out;
          display: flex;
          flex-direction: column;
        }

        .dance-column {
          border-top: 4px solid #FF1F6D;
        }

        .fitness-column {
          border-top: 4px solid #00E5FF;
        }

        .ds-program-column:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }

        .ds-program-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .ds-program-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          flex-shrink: 0;
        }

        .dance-icon {
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
        }

        .fitness-icon {
          background: linear-gradient(135deg, #00E5FF, #0088FF);
        }

        .ds-program-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
          flex: 1;
        }

        .ds-program-count {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--muted);
          background: var(--surface-alt);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          white-space: nowrap;
        }

        .ds-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .ds-card {
          background: var(--surface-alt);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease-out;
          cursor: default;
          min-height: 56px;
        }

        .ds-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          border-color: rgba(255, 31, 109, 0.15);
        }

        .dance-column .ds-card:hover {
          border-color: rgba(255, 31, 109, 0.2);
          background: rgba(255, 31, 109, 0.03);
        }

        .fitness-column .ds-card:hover {
          border-color: rgba(0, 229, 255, 0.2);
          background: rgba(0, 229, 255, 0.03);
        }

        .ds-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ds-card-emoji {
          font-size: 1.25rem;
        }

        .ds-card-text {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
          flex: 1;
        }

        .ds-card-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--foreground);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ds-card-count {
          font-size: 0.6875rem;
          color: var(--muted);
          font-weight: 500;
        }

        /* Toggle Button */
        .ds-toggle-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
          width: 100%;
        }

        .dance-toggle:hover {
          border-color: #FF1F6D;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.05);
        }

        .fitness-toggle:hover {
          border-color: #00E5FF;
          color: #00E5FF;
          background: rgba(0, 229, 255, 0.05);
        }

        .ds-toggle-btn svg {
          transition: transform 0.3s ease;
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (min-width: 640px) {
          .ds-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .ds-programs-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          .ds-program-column {
            padding: 2rem;
          }

          .ds-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 1024px) {
          .ds-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .ds-title-wrapper h2 {
            font-size: 3rem;
          }

          .ds-card {
            padding: 0.875rem 1.125rem;
            min-height: 64px;
          }

          .ds-card-name {
            font-size: 0.9375rem;
          }

          .ds-card-icon {
            width: 44px;
            height: 44px;
          }

          .ds-card-emoji {
            font-size: 1.375rem;
          }
        }

        @media (max-width: 480px) {
          .ds-title-wrapper h2 {
            font-size: 2rem;
          }

          .ds-subtitle {
            font-size: 0.9375rem;
          }

          .ds-program-column {
            padding: 1rem;
          }

          .ds-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .ds-card {
            padding: 0.5rem 0.75rem;
            min-height: 48px;
            gap: 0.5rem;
          }

          .ds-card-icon {
            width: 32px;
            height: 32px;
          }

          .ds-card-emoji {
            font-size: 1rem;
          }

          .ds-card-name {
            font-size: 0.75rem;
          }

          .ds-card-count {
            font-size: 0.625rem;
          }

          .ds-program-title {
            font-size: 1rem;
          }

          .ds-program-header {
            gap: 0.5rem;
          }

          .ds-program-icon {
            width: 36px;
            height: 36px;
          }

          .ds-program-icon svg {
            width: 18px;
            height: 18px;
          }

          .ds-toggle-btn {
            font-size: 0.75rem;
            padding: 0.4rem 1rem;
          }
        }

        @media (max-width: 380px) {
          .ds-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}












// "use client";

// import Link from "next/link";
// import { Sparkles } from "lucide-react";

// const DANCE_STYLES = [
//   { name: "Open Style", emoji: "🎵", classes: "12+ Classes", bg: "rgba(255, 31, 109, 0.06)" },
//   { name: "Hip Hop", emoji: "🔥", classes: "10+ Classes", bg: "rgba(198, 255, 61, 0.10)" },
//   { name: "Ballet", emoji: "🩰", classes: "8 Classes", bg: "rgba(123, 47, 255, 0.06)" },
//   { name: "Contemporary", emoji: "🌊", classes: "6 Classes", bg: "rgba(0, 229, 255, 0.08)" },
//   { name: "Jazz Funk", emoji: "💃", classes: "9 Classes", bg: "rgba(255, 31, 109, 0.06)" },
//   { name: "Breaking", emoji: "⚡", classes: "7 Classes", bg: "rgba(198, 255, 61, 0.10)" },
//   { name: "Heels", emoji: "👠", classes: "5 Classes", bg: "rgba(123, 47, 255, 0.06)" },
//   { name: "House", emoji: "🎶", classes: "4 Classes", bg: "rgba(0, 229, 255, 0.08)" },
// ];

// export default function DanceStylesGrid() {
//   return (
//     <section className="ld-section ld-container ds-grid-section">
//       <div className="ld-section-title">
//         <Sparkles size={24} color="#FF1F6D" />
//         <h2>Browse by Style</h2>
//       </div>
//       <div className="ds-grid">
//         {DANCE_STYLES.map((style) => (
//           <Link href="/courses" className="ds-card" key={style.name}>
//             <div className="ds-card-icon" style={{ background: style.bg }}>
//               {style.emoji}
//             </div>
//             <div className="ds-card-text">
//               <span className="ds-card-name">{style.name}</span>
//               <span className="ds-card-count">{style.classes}</span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }





// import Link from "next/link";
// import { Sparkles } from "lucide-react";

// const DANCE_STYLES = [
//   { name: "Open Style", emoji: "🎵", classes: "12+ Classes", bg: "rgba(255, 31, 109, 0.06)" },
//   { name: "Hip Hop", emoji: "🔥", classes: "10+ Classes", bg: "rgba(198, 255, 61, 0.10)" },
//   { name: "Ballet", emoji: "🩰", classes: "8 Classes", bg: "rgba(123, 47, 255, 0.06)" },
//   { name: "Contemporary", emoji: "🌊", classes: "6 Classes", bg: "rgba(0, 229, 255, 0.08)" },
//   { name: "Jazz Funk", emoji: "💃", classes: "9 Classes", bg: "rgba(255, 31, 109, 0.06)" },
//   { name: "Breaking", emoji: "⚡", classes: "7 Classes", bg: "rgba(198, 255, 61, 0.10)" },
//   { name: "Heels", emoji: "👠", classes: "5 Classes", bg: "rgba(123, 47, 255, 0.06)" },
//   { name: "House", emoji: "🎶", classes: "4 Classes", bg: "rgba(0, 229, 255, 0.08)" },
// ];

// export default function DanceStylesGrid() {
//   return (
//     <section className="ld-section ld-container ds-grid-section">
//       <div className="ld-section-title">
//         <Sparkles size={24} color="#FF1F6D" />
//         <h2>Browse by Style</h2>
//       </div>
//       <div className="ds-grid">
//         {DANCE_STYLES.map((style) => (
//           <Link href="/courses" className="ds-card" key={style.name}>
//             <div className="ds-card-icon" style={{ background: style.bg }}>
//               {style.emoji}
//             </div>
//             <div className="ds-card-text">
//               <span className="ds-card-name">{style.name}</span>
//               <span className="ds-card-count">{style.classes}</span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }
