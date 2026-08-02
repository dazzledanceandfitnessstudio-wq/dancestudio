"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function KathakSection() {
  return (
    <section className="kathak-section">
      <div className="kathak-container">
        <div className="kathak-content">
          {/* Background Decorative Elements */}
          <div className="kathak-bg-decoration"></div>
          
          <div className="kathak-grid">
            {/* Left Side - Text Content */}
            <div className="kathak-text-content">
              {/* Badge */}
              <div className="kathak-badge">
                <Sparkles size={16} />
                <span>Classical Dance</span>
              </div>

              {/* Title */}
              <h2 className="kathak-title">
                <span className="kathak-title-main">प्रियांगन कथक केंद्र</span>
                <span className="kathak-title-sub">Priyaangan Kathak Kendra</span>
              </h2>

              {/* Description */}
              <p className="kathak-description">
                Discover the rich heritage of Kathak with expert training in a warm and inspiring environment.
                From beginners to advanced learners, we nurture rhythm, expression, and stage presence.
              </p>

              {/* Features List */}
              <ul className="kathak-features-list">
                <li>🎵 Grace & Rhythm Training</li>
                <li>💃 Expert Kathak Instructors</li>
                <li>🏆 Performance Opportunities</li>
                <li>📜 Certification & Degrees</li>
              </ul>

              {/* CTA Button */}
              <Link href="/kathak" className="kathak-btn">
                <span>Explore Kathak</span>
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Right Side - Image */}
            <div className="kathak-image-wrapper">
              <div className="kathak-image-container">
                <div className="kathak-image">
                  <Image
                    src="/Natraj/image.png"
                    alt="Kathak Dance Natraj"
                    layout="fill"
                    objectFit="contain" // Ensures the PNG is not cropped
                    className="kathak-image-photo"
                  />
                </div>
                {/* Decorative elements */}
                <div className="kathak-image-decoration kathak-image-decoration-1">
                  <span className="kathak-image-dot"></span>
                </div>
                <div className="kathak-image-decoration kathak-image-decoration-2">
                  <span className="kathak-image-dot"></span>
                </div>
                <div className="kathak-image-decoration kathak-image-decoration-3">
                  <span className="kathak-image-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kathak-section {
          padding: 4rem 0 5rem;
          background: var(--background);
          color: var(--foreground);
          position: relative;
          overflow: hidden;
        }

        .kathak-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        .kathak-content {
          position: relative;
          background: linear-gradient(135deg, 
            rgba(255, 31, 109, 0.03), 
            rgba(123, 47, 255, 0.03)
          );
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 3rem;
          overflow: hidden;
        }

        .kathak-bg-decoration {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 31, 109, 0.05), transparent);
          pointer-events: none;
        }

        .kathak-grid {
          display: flex;
          flex-direction: column-reverse; /* Puts Image ABOVE text on mobile */
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* ============================================================
           LEFT SIDE - TEXT CONTENT
           ============================================================ */
        .kathak-text-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
        }

        .kathak-badge {
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

        .kathak-title {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin: 0;
        }

        .kathak-title-main {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .kathak-title-sub {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--body-text);
        }

        .kathak-description {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--body-text);
          margin: 0;
          max-width: 520px;
        }

        .kathak-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 1.5rem;
        }

        .kathak-features-list li {
          font-size: 0.9375rem;
          color: var(--body-text);
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0;
        }

        /* ============================================================
           RIGHT SIDE - IMAGE
           ============================================================ */
        .kathak-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .kathak-image-container {
          position: relative;
          width: 100%;
          max-width: 350px;
          aspect-ratio: 1; /* Perfect square ratio for transparent PNGs */
          border-radius: 50%; /* Circular soft glow background */
          background: radial-gradient(circle, rgba(255, 31, 109, 0.15) 0%, rgba(123, 47, 255, 0.05) 60%, transparent 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kathak-image {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Image Decorations */
        .kathak-image-decoration {
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

        .kathak-image-decoration-1 {
          width: 60px;
          height: 60px;
          top: 0px;
          right: 10px;
        }

        .kathak-image-decoration-2 {
          width: 40px;
          height: 40px;
          bottom: 20px;
          left: 0px;
          animation-delay: 1s;
        }

        .kathak-image-decoration-3 {
          width: 30px;
          height: 30px;
          top: 50%;
          right: -10px;
          animation-delay: 2s;
        }

        .kathak-image-dot {
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
          .kathak-grid {
            display: grid; /* Switch back to grid on desktop */
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }

          .kathak-content {
            padding: 4rem;
          }

          .kathak-title-main {
            font-size: 3rem;
          }

          .kathak-image-container {
            max-width: 400px;
          }
        }

        @media (min-width: 1024px) {
          .kathak-content {
            padding: 5rem 4rem;
          }

          .kathak-grid {
            gap: 4rem;
          }

          .kathak-title-main {
            font-size: 3.5rem;
          }

          .kathak-image-container {
            max-width: 450px;
          }

          .kathak-description {
            font-size: 1.125rem;
          }

          .kathak-features-list li {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .kathak-content {
            padding: 2rem 1.25rem;
          }

          .kathak-title-main {
            font-size: 2rem;
          }

          .kathak-title-sub {
            font-size: 1rem;
          }

          .kathak-description {
            font-size: 0.9375rem;
          }

          .kathak-features-list {
            grid-template-columns: 1fr;
          }

          .kathak-image-container {
            max-width: 280px;
          }

          .kathak-image-decoration-1 {
            width: 40px;
            height: 40px;
          }

          .kathak-image-decoration-2 {
            width: 30px;
            height: 30px;
          }

          .kathak-image-decoration-3 {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>

      {/* Global Styles for Next.js <Link> components and Image */}
      <style jsx global>{`
        /* Added drop-shadow for a gorgeous 3D effect on transparent PNGs */
        .kathak-image-photo {
          filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.15));
        }

        .kathak-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.875rem 2.5rem;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease-out;
          box-shadow: 0 4px 20px rgba(255, 31, 109, 0.25);
          text-decoration: none;
          width: fit-content;
        }

        .kathak-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(255, 31, 109, 0.35);
        }

        @media (max-width: 480px) {
          .kathak-btn {
            padding: 0.75rem 2rem;
            font-size: 0.875rem;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}









// "use client";

// import Link from 'next/link';
// import { ArrowRight, Sparkles } from 'lucide-react';
// import Image from 'next/image';

// export default function KathakSection() {
//   return (
//     <section className="kathak-section">
//       <div className="kathak-container">
//         <div className="kathak-content">
//           {/* Background Decorative Elements */}
//           <div className="kathak-bg-decoration"></div>
          
//           <div className="kathak-grid">
//             {/* Left Side - Text Content */}
//             <div className="kathak-text-content">
//               {/* Badge */}
//               <div className="kathak-badge">
//                 <Sparkles size={16} />
//                 <span>Classical Dance</span>
//               </div>

//               {/* Title */}
//               <h2 className="kathak-title">
//                 <span className="kathak-title-main">प्रियांगन कथक केंद्र</span>
//                 <span className="kathak-title-sub">Priyaangan Kathak Kendra</span>
//               </h2>

//               {/* Description */}
//               <p className="kathak-description">
//                 Discover the rich heritage of Kathak with expert training in a warm and inspiring environment.
//                 From beginners to advanced learners, we nurture rhythm, expression, and stage presence.
//               </p>

//               {/* Features List */}
//               <ul className="kathak-features-list">
//                 <li>🎵 Grace & Rhythm Training</li>
//                 <li>💃 Expert Kathak Instructors</li>
//                 <li>🏆 Performance Opportunities</li>
//                 <li>📜 Certification & Degrees</li>
//               </ul>

//               {/* CTA Button */}
//               <Link href="/kathak" className="kathak-btn">
//                 <span>Explore Kathak</span>
//                 <ArrowRight size={20} />
//               </Link>
//             </div>

//             {/* Right Side - Image */}
//             <div className="kathak-image-wrapper">
//               <div className="kathak-image-container">
//                 <div className="kathak-image">
//                   <Image
//                     src="/Natraj/image.png"
//                     alt="Kathak Dance"
//                     layout="fill"
//                     objectFit="cover"
//                     className="kathak-image-photo"
//                   />
//                   {/* <span className="kathak-image-emoji">💃</span>
//                   <span className="kathak-image-label">Classical Dance</span> */}
//                 </div>
//                 {/* Decorative elements */}
//                 <div className="kathak-image-decoration kathak-image-decoration-1">
//                   <span className="kathak-image-dot"></span>
//                 </div>
//                 <div className="kathak-image-decoration kathak-image-decoration-2">
//                   <span className="kathak-image-dot"></span>
//                 </div>
//                 <div className="kathak-image-decoration kathak-image-decoration-3">
//                   <span className="kathak-image-dot"></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .kathak-section {
//           padding: 4rem 0 5rem;
//           background: var(--background);
//           color: var(--foreground);
//           position: relative;
//           overflow: hidden;
//         }

//         .kathak-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 1.25rem;
//         }

//         .kathak-content {
//           position: relative;
//           background: linear-gradient(135deg, 
//             rgba(255, 31, 109, 0.03), 
//             rgba(123, 47, 255, 0.03)
//           );
//           border: 1px solid var(--border);
//           border-radius: 24px;
//           padding: 3rem;
//           overflow: hidden;
//         }

//         .kathak-bg-decoration {
//           position: absolute;
//           top: -50%;
//           right: -20%;
//           width: 400px;
//           height: 400px;
//           border-radius: 50%;
//           background: radial-gradient(circle, rgba(255, 31, 109, 0.05), transparent);
//           pointer-events: none;
//         }

//         .kathak-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 2.5rem;
//           align-items: center;
//           position: relative;
//           z-index: 1;
//         }

//         /* ============================================================
//            LEFT SIDE - TEXT CONTENT
//            ============================================================ */
//         .kathak-text-content {
//           display: flex;
//           flex-direction: column;
//           gap: 1.25rem;
//         }

//         .kathak-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.75rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           color: #FF1F6D;
//           background: rgba(255, 31, 109, 0.07);
//           padding: 0.4rem 1rem;
//           border-radius: 999px;
//           width: fit-content;
//         }

//         .kathak-title {
//           display: flex;
//           flex-direction: column;
//           gap: 0.25rem;
//           margin: 0;
//         }

//         .kathak-title-main {
//           font-family: 'Poppins', sans-serif;
//           font-size: 2.5rem;
//           font-weight: 800;
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .kathak-title-sub {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: var(--body-text);
//         }

//         .kathak-description {
//           font-size: 1.0625rem;
//           line-height: 1.7;
//           color: var(--body-text);
//           margin: 0;
//           max-width: 520px;
//         }

//         .kathak-features-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 0.5rem 1.5rem;
//         }

//         .kathak-features-list li {
//           font-size: 0.9375rem;
//           color: var(--body-text);
//           display: flex;
//           align-items: center;
//           gap: 0.375rem;
//           padding: 0.25rem 0;
//         }

//         /* ============================================================
//            RIGHT SIDE - IMAGE
//            ============================================================ */
//         .kathak-image-wrapper {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .kathak-image-container {
//           position: relative;
//           width: 100%;
//           max-width: 400px;
//           aspect-ratio: 4/3;
//           border-radius: 16px;
//           overflow: hidden;
//           background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
//           border: 1px solid var(--border);
//         }

//         .kathak-image {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, rgba(255, 31, 109, 0.08), rgba(123, 47, 255, 0.08));
//           gap: 0.5rem;
//         }

//         .kathak-image-emoji {
//           font-size: 5rem;
//           opacity: 0.5;
//           animation: float 3s ease-in-out infinite;
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }

//         .kathak-image-label {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1rem;
//           font-weight: 600;
//           color: var(--muted);
//         }

//         /* Image Decorations */
//         .kathak-image-decoration {
//           position: absolute;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
//           opacity: 0.12;
//           animation: pulse 3s ease-in-out infinite;
//           pointer-events: none;
//         }

//         @keyframes pulse {
//           0%, 100% { transform: scale(1); opacity: 0.12; }
//           50% { transform: scale(1.1); opacity: 0.2; }
//         }

//         .kathak-image-decoration-1 {
//           width: 60px;
//           height: 60px;
//           top: -15px;
//           right: -15px;
//         }

//         .kathak-image-decoration-2 {
//           width: 40px;
//           height: 40px;
//           bottom: -10px;
//           left: -10px;
//           animation-delay: 1s;
//         }

//         .kathak-image-decoration-3 {
//           width: 30px;
//           height: 30px;
//           top: 50%;
//           right: -8px;
//           animation-delay: 2s;
//         }

//         .kathak-image-dot {
//           display: block;
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
//         }

//         /* ============================================================
//            RESPONSIVE
//            ============================================================ */
//         @media (min-width: 768px) {
//           .kathak-content {
//             padding: 4rem;
//           }

//           .kathak-grid {
//             grid-template-columns: 1fr 1fr;
//             gap: 3rem;
//           }

//           .kathak-title-main {
//             font-size: 3rem;
//           }

//           .kathak-image-container {
//             max-width: 450px;
//           }

//           .kathak-image-emoji {
//             font-size: 6rem;
//           }
//         }

//         @media (min-width: 1024px) {
//           .kathak-content {
//             padding: 5rem 4rem;
//           }

//           .kathak-grid {
//             gap: 4rem;
//           }

//           .kathak-title-main {
//             font-size: 3.5rem;
//           }

//           .kathak-image-container {
//             max-width: 500px;
//           }

//           .kathak-description {
//             font-size: 1.125rem;
//           }

//           .kathak-features-list li {
//             font-size: 1rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .kathak-content {
//             padding: 2rem 1.25rem;
//           }

//           .kathak-title-main {
//             font-size: 2rem;
//           }

//           .kathak-title-sub {
//             font-size: 1rem;
//           }

//           .kathak-description {
//             font-size: 0.9375rem;
//           }

//           .kathak-features-list {
//             grid-template-columns: 1fr;
//           }

//           .kathak-image-container {
//             max-width: 100%;
//           }

//           .kathak-image-emoji {
//             font-size: 4rem;
//           }

//           .kathak-image-decoration-1 {
//             width: 40px;
//             height: 40px;
//           }

//           .kathak-image-decoration-2 {
//             width: 30px;
//             height: 30px;
//           }

//           .kathak-image-decoration-3 {
//             width: 20px;
//             height: 20px;
//           }
//         }
//       `}</style>

//       {/* Global Styles for Next.js <Link> components */}
//       <style jsx global>{`
//         .kathak-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.625rem;
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//           color: #FFFFFF;
//           font-family: 'Poppins', sans-serif;
//           font-weight: 700;
//           font-size: 1rem;
//           padding: 0.875rem 2.5rem;
//           border: none;
//           border-radius: 14px;
//           cursor: pointer;
//           transition: all 0.3s ease-out;
//           box-shadow: 0 4px 20px rgba(255, 31, 109, 0.25);
//           text-decoration: none;
//           width: fit-content;
//         }

//         .kathak-btn:hover {
//           transform: translateY(-3px) scale(1.02);
//           box-shadow: 0 8px 30px rgba(255, 31, 109, 0.35);
//         }

//         @media (max-width: 480px) {
//           .kathak-btn {
//             padding: 0.75rem 2rem;
//             font-size: 0.875rem;
//             width: 100%;
//             justify-content: center;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }