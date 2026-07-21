import Link from "next/link";
import Image from "next/image";
import { Camera, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="ld-footer">
      <div className="ld-container">
        <div className="ld-footer-grid">
          <div className="ld-footer-col">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem' }}>
              <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={32} height={32} style={{ borderRadius: '6px' }} />
              Dazzle Dance Studio
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Unleashing creativity and rhythm in every step. Join our vibrant
              community and find your groove.
            </p>
            <div className="ld-socials">
              <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" className="ld-social-link" target="_blank" rel="noopener noreferrer"><Camera size={22} /></a>
              <a href="https://www.facebook.com/share/14i2QhGkLd4/" className="ld-social-link" target="_blank" rel="noopener noreferrer"><MessageCircle size={22} /></a>
            </div>
          </div>

          <div className="ld-footer-col">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Contact Us</h3>
            <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
              <Mail size={18} /> dazzledanceandfitnessstudio@gmail.com
            </p>
            <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
              <Phone size={18} /> +91 98765 43210
            </p>
            <p style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
              <MapPin size={18} /> Dazzle Dance & Fitness Studio, Jabalpur
            </p>
          </div>

          <div className="ld-footer-col">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Quick Links</h3>
            <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
              <Link href="/courses" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Courses</Link>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
              <Link href="/events" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Classes &amp; Events</Link>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
              <Link href="/services" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Services &amp; Rentals</Link>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
              <Link href="/posts" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Studio News</Link>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
              <Link href="/about" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>About Us</Link>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
              <Link href="/contact" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Contact</Link>
            </p>
            <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>
              <Link href="/dashboard" className="ld-social-link" style={{ textDecoration: "none", fontSize: '1rem' }}>Student Dashboard</Link>
            </p>
          </div>
        </div>
        <div className="ld-footer-bottom" style={{ fontSize: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1.5rem' }}>
          © {new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}



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
