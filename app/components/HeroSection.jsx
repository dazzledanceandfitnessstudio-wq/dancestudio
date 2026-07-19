"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroSection({ user, onSignIn }) {
  return (
    <div className="ld-hero-split">
      <div className="ld-hero-media">
        <div className="ld-video-wrapper">
          <iframe
            src="https://player.vimeo.com/video/938419168?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;controls=0&amp;autoplay=1&amp;muted=1&amp;loop=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="STEEZY Site Header Video"
            className="ld-hero-video"
            data-ready="true"
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
            <p>
              With world-class instructors, intensive programs, and a vibrant community.
            </p>
            <button className="btn-gradient-cta" onClick={onSignIn}>
              Get Started
            </button>
          </>
        )}
      </div>
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
//         <img
//           src="https://media4.giphy.com/media/13hxeOYjoTWtK8/giphy.gif"
//           alt="Dance performance"
//         />
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
