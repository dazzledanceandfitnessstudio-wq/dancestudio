import Link from "next/link";
import Image from "next/image";
import { Camera, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="ld-footer">
      <div className="ld-container">
        <div className="ld-footer-grid">
          <div className="ld-footer-col">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image src="/dazzle-logo.jpg" alt="Dazzle Logo" width={32} height={32} style={{ borderRadius: '6px' }} />
              Dazzle Dance Studio
            </h3>
            <p>
              Unleashing creativity and rhythm in every step. Join our vibrant
              community and find your groove.
            </p>
            <div className="ld-socials">
              <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" className="ld-social-link" target="_blank" rel="noopener noreferrer"><Camera size={20} /></a>
              <a href="https://www.facebook.com/share/14i2QhGkLd4/" className="ld-social-link" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /></a>
            </div>
          </div>

          <div className="ld-footer-col">
            <h3>Contact Us</h3>
            <p><Mail size={16} /> dazzledanceandfitnessstudio@gmail.com</p>
            <p><Phone size={16} /> +1 (555) 123-4567</p>
            <p><MapPin size={16} /> Dazzle Dance & Fitness Studio, Jabalpur</p>
          </div>

          <div className="ld-footer-col">
            <h3>Quick Links</h3>
            <p><Link href="/courses" className="ld-social-link" style={{ textDecoration: "none" }}>Courses</Link></p>
            <p><Link href="/events" className="ld-social-link" style={{ textDecoration: "none" }}>Classes &amp; Events</Link></p>
            <p><Link href="/services" className="ld-social-link" style={{ textDecoration: "none" }}>Services &amp; Rentals</Link></p>
            <p><Link href="/posts" className="ld-social-link" style={{ textDecoration: "none" }}>Studio News</Link></p>
            <p><Link href="/about" className="ld-social-link" style={{ textDecoration: "none" }}>About Us</Link></p>
            <p><Link href="/contact" className="ld-social-link" style={{ textDecoration: "none" }}>Contact</Link></p>
            <p><Link href="/dashboard" className="ld-social-link" style={{ textDecoration: "none" }}>Student Dashboard</Link></p>
          </div>
        </div>
        <div className="ld-footer-bottom">
          © {new Date().getFullYear()} Dazzle Dance Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
