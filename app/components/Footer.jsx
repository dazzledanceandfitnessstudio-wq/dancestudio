"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="ld-footer">
      <div className="ld-container">
        <div className="ld-footer-grid">
          
          {/* Column 1: Brand & Socials */}
          <div className="ld-footer-col">
            <h3 className="ld-brand-title">
              <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={32} height={32} style={{ borderRadius: '6px' }} />
              Dazzle Dance Studio
            </h3>
            <p className="ld-brand-desc">
              Unleashing creativity and rhythm in every step. Join our vibrant
              community and find your groove.
            </p>



            <div className="ld-socials">
              
              
              
              
              
              
              
              
              <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" className="ld-social-link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>


  <a href="https://www.instagram.com/itswedding_move?utm_source=qr&igsh=MnQ1Z2Vza2ZvOGgw" className="ld-social-link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>


  <a href="https://www.instagram.com/priya_kathak_jabalpur?utm_source=qr&igsh=MmpxYnk2bjhpeTNr" className="ld-social-link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>



              <a href="https://www.facebook.com/DazzlerPriyaJazz/" className="ld-social-link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="ld-footer-col">
            <h3 className="ld-col-heading">Contact Us</h3>
            <p className="ld-contact-item">
              <svg className="ld-contact-icon" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg> 
              <span>dazzledanceandfitnessstudio@gmail.com</span>
            </p>
            <p className="ld-contact-item">
              <svg className="ld-contact-icon" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg> 
              <span>+918359914344</span>
            </p>

              <p className="ld-contact-item">
              <svg className="ld-contact-icon" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg> 
              <span>+91 9981040151</span>
            </p>
            <p className="ld-contact-item">
              <svg className="ld-contact-icon" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg> 
              <a href="https://maps.app.goo.gl/W1MgfA3J1dJhdkSH9?g_st=aw" target="_blank" rel="noopener noreferrer" className="ld-location-link">
                Dazzle Dance & Fitness Studio, Jabalpur
              </a>
            </p>
          </div>

          {/* Column 3: Quick Links */}
          <div className="ld-footer-col">
            <h3 className="ld-col-heading">Quick Links</h3>
            <p className="ld-quick-link-wrap">
              <Link href="/courses" className="ld-quick-link">Courses</Link>
            </p>
            <p className="ld-quick-link-wrap">
              <Link href="/events" className="ld-quick-link">Classes &amp; Events</Link>
            </p>
            <p className="ld-quick-link-wrap">
              <Link href="/services" className="ld-quick-link">Services &amp; Rentals</Link>
            </p>
            <p className="ld-quick-link-wrap">
              <Link href="/posts" className="ld-quick-link">Studio Posts</Link>
            </p>
            <p className="ld-quick-link-wrap">
              <Link href="/about" className="ld-quick-link">About Us</Link>
            </p>
            <p className="ld-quick-link-wrap">
              <Link href="/contact" className="ld-quick-link">Contact</Link>
            </p>
            <p className="ld-quick-link-wrap">
              <Link href="/dashboard" className="ld-quick-link">Student Dashboard</Link>
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Credits */}
        <div className="ld-footer-bottom">
          <p className="ld-copyright-text">
            © {new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
          </p>
          <p className="ld-credit-text">
            Designed and developed by{" "}
            <a href="https://softmax.in" target="_blank" rel="noopener noreferrer" className="ld-softmax-link">
              softmax.in
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .ld-footer {
          background: #111111;
          color: #ffffff;
          padding: 4rem 0 2rem;
          font-family: 'Poppins', sans-serif;
          width: 100%;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .ld-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
          box-sizing: border-box;
        }

        .ld-footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          width: 100%;
        }

        .ld-footer-col {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* Typography & Spacing Fixes */
        .ld-brand-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.3rem;
          margin: 0 0 1rem 0;
          color: #ffffff;
        }

        .ld-brand-desc {
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.9;
          margin: 0;
        }

        .ld-col-heading {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: #ffffff;
        }

        /* Social Icons */
        .ld-socials {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .ld-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .ld-social-link:hover {
          background: #FF1F6D;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(255, 31, 109, 0.4);
        }

        /* Contact Items Fixed for Mobile */
        .ld-contact-item {
          font-size: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 0 0 0.8rem 0;
          word-break: break-word;
          overflow-wrap: break-word;
          line-height: 1.5;
        }

        .ld-contact-icon {
          flex-shrink: 0;
          margin-top: 3px;
        }

        .ld-location-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .ld-location-link:hover {
          color: #FF1F6D;
        }

        /* Quick Links */
        .ld-quick-link-wrap {
          margin: 0 0 0.6rem 0;
        }

        .ld-quick-link {
          text-decoration: none;
          color: #ffffff;
          opacity: 0.85;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .ld-quick-link:hover {
          opacity: 1;
          color: #FF1F6D;
        }

        /* Footer Bottom & Credits */
        .ld-footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 3rem;
          width: 100%;
          text-align: center;
        }

        .ld-copyright-text {
          font-size: 0.9rem;
          margin: 0;
          opacity: 0.7;
        }

        .ld-credit-text {
          font-size: 0.85rem;
          margin: 0;
          opacity: 0.8;
        }

        .ld-softmax-link {
          color: #38bdf8; /* Bright Sky Blue */
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: all 0.3s ease;
        }

        .ld-softmax-link:hover {
          color: #bae6fd; /* Lighter sky blue on hover for max contrast */
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.6); /* Glowing effect */
        }

        @media (min-width: 768px) {
          .ld-footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 2rem;
          }
          
          .ld-footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
          
          .ld-copyright-text {
            font-size: 1rem;
          }
          
          .ld-credit-text {
            font-size: 0.95rem;
          }

          .ld-contact-item {
            align-items: center;
          }
          
          .ld-contact-icon {
            margin-top: 0;
          }
        }
      `}</style>
    </footer>
  );
}
























// "use client";

// import Link from "next/link";
// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer className="ld-footer">
//       <div className="ld-container">
//         <div className="ld-footer-grid">
          
//           {/* Column 1: Brand & Socials */}
//           <div className="ld-footer-col">
//             <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', marginBottom: '1rem' }}>
//               <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={32} height={32} style={{ borderRadius: '6px' }} />
//               Dazzle Dance Studio
//             </h3>
//             <p style={{ fontSize: '1rem', lineHeight: '1.6', opacity: '0.9' }}>
//               Unleashing creativity and rhythm in every step. Join our vibrant
//               community and find your groove.
//             </p>
//             <div className="ld-socials">
//               <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" className="ld-social-link" target="_blank" rel="noopener noreferrer">
//                 <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
//                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
//                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
//                 </svg>
//               </a>
//               <a href="https://www.facebook.com/share/14i2QhGkLd4/" className="ld-social-link" target="_blank" rel="noopener noreferrer">
//                 <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Column 2: Contact Info */}
//           <div className="ld-footer-col">
//             <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Contact Us</h3>
//             <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
//               <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                 <polyline points="22,6 12,13 2,6"/>
//               </svg> 
//               dazzledanceandfitnessstudio@gmail.com
//             </p>
//             <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
//               <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
//               </svg> 
//               +91 98765 43210
//             </p>
//             <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
//               <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//                 <circle cx="12" cy="10" r="3"/>
//               </svg> 
//               <a href="https://maps.app.goo.gl/W1MgfA3J1dJhdkSH9?g_st=aw" target="_blank" rel="noopener noreferrer" className="ld-location-link">
//                 Dazzle Dance & Fitness Studio, Jabalpur
//               </a>
//             </p>
//           </div>

//           {/* Column 3: Quick Links */}
//           <div className="ld-footer-col">
//             <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Quick Links</h3>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/courses" className="ld-quick-link">Courses</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/events" className="ld-quick-link">Classes &amp; Events</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/services" className="ld-quick-link">Services &amp; Rentals</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/posts" className="ld-quick-link">Studio News</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/about" className="ld-quick-link">About Us</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/contact" className="ld-quick-link">Contact</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/dashboard" className="ld-quick-link">Student Dashboard</Link>
//             </p>
//           </div>
//         </div>

//         <div className="ld-footer-bottom">
//           © {new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
//         </div>
//       </div>

//       <style jsx>{`
//         .ld-footer {
//           background: #111111; /* Dark background */
//           color: #ffffff; /* White text */
//           padding: 4rem 0 2rem;
//           font-family: 'Poppins', sans-serif;
//         }

//         .ld-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 1.25rem;
//         }

//         .ld-footer-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 3rem;
//         }

//         .ld-footer-col {
//           display: flex;
//           flex-direction: column;
//         }

//         .ld-footer-col h3 {
//           margin-top: 0;
//           color: #ffffff;
//         }

//         .ld-socials {
//           display: flex;
//           gap: 1rem;
//           margin-top: 1.5rem;
//         }

//         .ld-social-link {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           width: 44px;
//           height: 44px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.1);
//           color: #ffffff;
//           transition: all 0.3s ease;
//         }

//         .ld-social-link:hover {
//           background: #FF1F6D; /* Pink hover effect */
//           transform: translateY(-3px);
//           box-shadow: 0 5px 15px rgba(255, 31, 109, 0.4);
//         }

//         .ld-location-link {
//           color: inherit;
//           text-decoration: none;
//           transition: color 0.2s ease;
//         }

//         .ld-location-link:hover {
//           color: #FF1F6D;
//         }

//         .ld-quick-link {
//           text-decoration: none;
//           color: #ffffff;
//           opacity: 0.85;
//           transition: all 0.2s ease;
//         }

//         .ld-quick-link:hover {
//           opacity: 1;
//           color: #FF1F6D;
//         }

//         .ld-footer-bottom {
//           font-size: 1rem;
//           text-align: center;
//           padding-top: 1.5rem;
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//           margin-top: 3rem;
//           opacity: 0.7;
//         }

//         @media (min-width: 768px) {
//           .ld-footer-grid {
//             grid-template-columns: 1.5fr 1fr 1fr;
//             gap: 2rem;
//           }
//         }
//       `}</style>
//     </footer>
//   );
// }












// import Link from "next/link";
// import Image from "next/image";
// import { Camera, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="ld-footer">
//       <div className="ld-container">
//         <div className="ld-footer-grid">
//           <div className="ld-footer-col">
//             <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem' }}>
//               <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={32} height={32} style={{ borderRadius: '6px' }} />
//               Dazzle Dance Studio
//             </h3>
//             <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
//               Unleashing creativity and rhythm in every step. Join our vibrant
//               community and find your groove.
//             </p>
//             <div className="ld-socials">
//               <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" className="ld-social-link" target="_blank" rel="noopener noreferrer"><Camera size={22} /></a>
//               <a href="https://www.facebook.com/share/14i2QhGkLd4/" className="ld-social-link" target="_blank" rel="noopener noreferrer"><MessageCircle size={22} /></a>
//             </div>
//           </div>

//           <div className="ld-footer-col">
//             <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Contact Us</h3>
//             <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
//               <Mail size={18} /> dazzledanceandfitnessstudio@gmail.com
//             </p>
//             <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
//               <Phone size={18} /> +91 98765 43210
//             </p>
//             <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
//               <MapPin size={18} /> Dazzle Dance & Fitness Studio, Jabalpur
//             </p>
//           </div>

//           <div className="ld-footer-col">
//             <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Quick Links</h3>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/courses" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Courses</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/events" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Classes &amp; Events</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/services" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Services &amp; Rentals</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/posts" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Studio News</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/about" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>About Us</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/contact" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Contact</Link>
//             </p>
//             <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
//               <Link href="/dashboard" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Student Dashboard</Link>
//             </p>
//           </div>
//         </div>
//         <div className="ld-footer-bottom" style={{ fontSize: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1.5rem' }}>
//           © {new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }



// import Link from "next/link";
// import Image from "next/image";
// import { Camera, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="ld-footer">
//       <div className="ld-container">
//         <div className="ld-footer-grid">
//           <div className="ld-footer-col">
//             <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={32} height={32} style={{ borderRadius: '6px' }} />
//               Dazzle Dance Studio
//             </h3>
//             <p>
//               Unleashing creativity and rhythm in every step. Join our vibrant
//               community and find your groove.
//             </p>
//             <div className="ld-socials">
//               <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" className="ld-social-link" target="_blank" rel="noopener noreferrer"><Camera size={20} /></a>
//               <a href="https://www.facebook.com/share/14i2QhGkLd4/" className="ld-social-link" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /></a>
//             </div>
//           </div>

//           <div className="ld-footer-col">
//             <h3>Contact Us</h3>
//             <p><Mail size={16} /> dazzledanceandfitnessstudio@gmail.com</p>
//             <p><Phone size={16} /> +1 (555) 123-4567</p>
//             <p><MapPin size={16} /> Dazzle Dance & Fitness Studio, Jabalpur</p>
//           </div>

//           <div className="ld-footer-col">
//             <h3>Quick Links</h3>
//             <p><Link href="/courses" className="ld-social-link" style={{ textDecoration: "none" }}>Courses</Link></p>
//             <p><Link href="/events" className="ld-social-link" style={{ textDecoration: "none" }}>Classes &amp; Events</Link></p>
//             <p><Link href="/services" className="ld-social-link" style={{ textDecoration: "none" }}>Services &amp; Rentals</Link></p>
//             <p><Link href="/posts" className="ld-social-link" style={{ textDecoration: "none" }}>Studio News</Link></p>
//             <p><Link href="/about" className="ld-social-link" style={{ textDecoration: "none" }}>About Us</Link></p>
//             <p><Link href="/contact" className="ld-social-link" style={{ textDecoration: "none" }}>Contact</Link></p>
//             <p><Link href="/dashboard" className="ld-social-link" style={{ textDecoration: "none" }}>Student Dashboard</Link></p>
//           </div>
//         </div>
//         <div className="ld-footer-bottom">
//           © {new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }
