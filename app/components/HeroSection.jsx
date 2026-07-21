"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection({ user, onSignIn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const content = [
    {
      heading: "🎯 Our Mission",
      text: "At Dazzle Dance & Fitness Studio, Jabalpur, we transform passion into performance with structured training programs for all ages and skill levels."
    },
    {
      heading: "💃 Dance Forms We Offer",
      text: "From Bollywood and Hip-Hop to Semi-Classical and Kathak, we offer diverse dance forms that cater to every style and personality."
    },
    {
      heading: "📜 Certification & Degrees",
      text: "Our Kathak Certification & Degree Courses include 1-Year Diploma, 2-Year Diploma, Sangeet Prabhakar, BPA, and MA in Kathak."
    },
    {
      heading: "🎭 Special Choreography",
      text: "We also provide customized choreography for School Functions, College Events, Wedding Choreography, and Stage Shows."
    },
    {
      heading: "🌟 Why Join Us?",
      text: "Join us to build strong fundamentals, confidence, stage presence, and professional performance skills starting from age 4!"
    }
  ];

  useEffect(() => {
    let timeout;
    
    if (charIndex < content[currentIndex].text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + content[currentIndex].text[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 20);
    } else {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % content.length);
        setDisplayText("");
        setCharIndex(0);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, currentIndex, content]);

  return (
    <div className="ld-hero-split">
      <div className="ld-hero-media">
        <div className="ld-video-wrapper">
          <iframe
            src="https://player.vimeo.com/video/938419168?badge=0&autopause=0&player_id=0&app_id=58479&controls=0&autoplay=1&muted=1&loop=1&background=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="Dazzle Dance Studio"
            className="ld-hero-video"
            allowFullScreen
          />
        </div>
      </div>
      <div className="ld-hero-content">
        {user ? (
          <>
            <h1>
              WELCOME
              <br />
              BACK,
              <br />
              {(user.displayName?.split(" ")[0] || "DANCER").toUpperCase()}
            </h1>
            <p>
              Your dashboard is ready. Track your classes, discover new events,
              and stay in rhythm.
            </p>
            <Link href="/dashboard" className="btn-gradient-cta">
              <Sparkles size={18} />
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <h1>
              REACH
              <br />
              YOUR
              <br />
              DANCE
              <br />
              GOALS
            </h1>
            <div>
              <h3 style={{ 
                fontSize: "1.4rem", 
                fontWeight: "700", 
                color: "#FFD93D",
                marginBottom: "0.5rem",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}>
                {content[currentIndex].heading}
              </h3>
              <p>
                {displayText}
                <span 
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "1em",
                    backgroundColor: "#fff",
                    marginLeft: "2px",
                    animation: "blink 0.8s step-end infinite",
                  }}
                />
              </p>
            </div>
            <button className="btn-gradient-cta" onClick={onSignIn}>
              Get Started
            </button>
          </>
        )}  
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}






// "use client";

// import Link from "next/link";
// import { Sparkles } from "lucide-react";

// export default function HeroSection({ user, onSignIn }) {
//   return (
//     <div className="ld-hero-split">
//       <div className="ld-hero-media">
//         <div className="ld-video-wrapper">
//           <iframe
//             src="https://player.vimeo.com/video/938419168?badge=0&autopause=0&player_id=0&app_id=58479&controls=0&autoplay=1&muted=1&loop=1&background=1"
//             frameBorder="0"
//             allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
//             title="Dazzle Dance Studio"
//             className="ld-hero-video"
//             allowFullScreen
//           />
//         </div>
//       </div>
//       <div className="ld-hero-content">
//         {user ? (
//           <>
//             <h1>
//               WELCOME
//               <br />
//               BACK,
//               <br />
//               {(user.displayName?.split(" ")[0] || "DANCER").toUpperCase()}
//             </h1>
//             <p>
//               Your dashboard is ready. Track your classes, discover new events,
//               and stay in rhythm.
//             </p>
//             <Link href="/dashboard" className="btn-gradient-cta">
//               <Sparkles size={18} />
//               Go to Dashboard
//             </Link>
//           </>
//         ) : (
//           <>
//             <h1>
//               REACH
//               <br />
//               YOUR
//               <br />
//               DANCE
//               <br />
//               GOALS
//             </h1>
//             <p>
//               With world-class instructors, intensive programs, and a vibrant community.
//             </p>
//             <button className="btn-gradient-cta" onClick={onSignIn}>
//               Get Started
//             </button>
//           </>
//         )}  
//       </div>
//     </div>
//   );
// }





