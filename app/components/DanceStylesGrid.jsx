"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const DANCE_STYLES = [
  { name: "Open Style", emoji: "🎵", classes: "12+ Classes", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Hip Hop", emoji: "🔥", classes: "10+ Classes", bg: "rgba(198, 255, 61, 0.10)" },
  { name: "Ballet", emoji: "🩰", classes: "8 Classes", bg: "rgba(123, 47, 255, 0.06)" },
  { name: "Contemporary", emoji: "🌊", classes: "6 Classes", bg: "rgba(0, 229, 255, 0.08)" },
  { name: "Jazz Funk", emoji: "💃", classes: "9 Classes", bg: "rgba(255, 31, 109, 0.06)" },
  { name: "Breaking", emoji: "⚡", classes: "7 Classes", bg: "rgba(198, 255, 61, 0.10)" },
  { name: "Heels", emoji: "👠", classes: "5 Classes", bg: "rgba(123, 47, 255, 0.06)" },
  { name: "House", emoji: "🎶", classes: "4 Classes", bg: "rgba(0, 229, 255, 0.08)" },
];

export default function DanceStylesGrid() {
  return (
    <section className="ld-section ld-container ds-grid-section">
      <div className="ld-section-title">
        <Sparkles size={24} color="#FF1F6D" />
        <h2>Browse by Style</h2>
      </div>
      <div className="ds-grid">
        {DANCE_STYLES.map((style) => (
          <Link href="/courses" className="ds-card" key={style.name}>
            <div className="ds-card-icon" style={{ background: style.bg }}>
              {style.emoji}
            </div>
            <div className="ds-card-text">
              <span className="ds-card-name">{style.name}</span>
              <span className="ds-card-count">{style.classes}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}





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
