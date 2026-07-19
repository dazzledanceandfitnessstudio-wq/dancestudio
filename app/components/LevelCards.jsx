"use client";

import { Heart, Zap, Flame, Target } from "lucide-react";

const LEVELS = [
  {
    name: "Brand New",
    desc: "Never danced before? Start here. Zero pressure, all vibes.",
    icon: Heart,
    className: "level-brand-new",
  },
  {
    name: "Beginner",
    desc: "You've got the basics down. Time to build vocabulary and groove.",
    icon: Zap,
    className: "level-beginner",
  },
  {
    name: "Intermediate",
    desc: "Push your technique, master combos, and develop your style.",
    icon: Flame,
    className: "level-intermediate",
  },
  {
    name: "Advanced",
    desc: "Competition-ready. Choreography, performance, and artistry.",
    icon: Target,
    className: "level-advanced",
  },
];

export default function LevelCards() {
  return (
    <section className="ld-section ld-container level-section">
      <div className="ld-section-title">
        <Flame size={24} color="#FF1F6D" />
        <h2>Find Your Level</h2>
      </div>
      <div className="level-cards">
        {LEVELS.map((level) => (
          <div className={`level-card ${level.className}`} key={level.name}>
            <div className="level-card-icon">
              <level.icon size={22} strokeWidth={2} />
            </div>
            <span className="level-card-name">{level.name}</span>
            <span className="level-card-desc">{level.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}






// import { Heart, Zap, Flame, Target } from "lucide-react";

// const LEVELS = [
//   {
//     name: "Brand New",
//     desc: "Never danced before? Start here. Zero pressure, all vibes.",
//     icon: Heart,
//     className: "level-brand-new",
//   },
//   {
//     name: "Beginner",
//     desc: "You've got the basics down. Time to build vocabulary and groove.",
//     icon: Zap,
//     className: "level-beginner",
//   },
//   {
//     name: "Intermediate",
//     desc: "Push your technique, master combos, and develop your style.",
//     icon: Flame,
//     className: "level-intermediate",
//   },
//   {
//     name: "Advanced",
//     desc: "Competition-ready. Choreography, performance, and artistry.",
//     icon: Target,
//     className: "level-advanced",
//   },
// ];

// export default function LevelCards() {
//   return (
//     <section className="ld-section ld-container level-section">
//       <div className="ld-section-title">
//         <Flame size={24} color="#FF1F6D" />
//         <h2>Find Your Level</h2>
//       </div>
//       <div className="level-cards">
//         {LEVELS.map((level) => (
//           <div className={`level-card ${level.className}`} key={level.name}>
//             <div className="level-card-icon">
//               <level.icon size={22} strokeWidth={2} />
//             </div>
//             <span className="level-card-name">{level.name}</span>
//             <span className="level-card-desc">{level.desc}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
