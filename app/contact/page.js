"use client";

import { useState, useCallback, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  X,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authService } from "../../lib/firebaseService";

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type, visible }) {
  return (
    <div
      className={`ct-toast ${visible ? "ct-toast-visible" : ""} ${
        type === "success" ? "ct-toast-success" : "ct-toast-error"
      }`}
      role="status"
      aria-live="polite"
    >
      {type === "success" ? (
        <Check size={14} strokeWidth={2.5} />
      ) : (
        <X size={14} strokeWidth={2.5} />
      )}{" "}
      {message}
    </div>
  );
}

// ─── SVG Social Icons ──────────────────────────────────────────────────────
const SocialIcon = ({ name, color = "#FFFFFF", size = 24 }) => {
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

// ─── Social Links Data (UPDATED) ──────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    id: 'facebook',
    platform: 'Facebook',
    handle: 'DazzlerPriyaJazz',
    url: 'https://www.facebook.com/DazzlerPriyaJazz/',
    icon: 'facebook',
    color: '#3B5998',
    label: 'Facebook'
  },
  {
    id: 'instagram1',
    platform: 'Priya Kathak',
    handle: '@priya_kathak_jabalpur',
    url: 'https://www.instagram.com/priya_kathak_jabalpur?utm_source=qr&igsh=MmpxYnk2bjhpeTNr',
    icon: 'instagram',
    color: '#C13584',
    label: 'Priya Kathak'
  },
  {
    id: 'instagram2',
    platform: 'Wedding Move',
    handle: '@itswedding_move',
    url: 'https://www.instagram.com/itswedding_move?utm_source=qr&igsh=MnQ1Z2Vza2ZvOGgw',
    icon: 'instagram',
    color: '#E1306C',
    label: 'Wedding Move'
  },
  {
    id: 'instagram3',
    platform: 'Dazzle Studio',
    handle: '@priya_dazzlestudio',
    url: 'https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA%3D%3D',
    icon: 'instagram',
    color: '#F56040',
    label: 'Dazzle Studio'
  },
  {
    id: 'whatsapp1',
    platform: 'WhatsApp',
    handle: '+91 99810 40151',
    url: 'https://wa.me/919981040151',
    icon: 'whatsapp',
    color: '#25D366',
    label: 'WhatsApp 1'
  },
  {
    id: 'whatsapp2',
    platform: 'WhatsApp',
    handle: '+91 83599 14344',
    url: 'https://wa.me/918359914344',
    icon: 'whatsapp',
    color: '#128C7E',
    label: 'WhatsApp 2'
  },
];

// ─── Contact Info Data (UPDATED Phone Numbers) ────────────────────────────
const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Dazzle Dance & Fitness Studio, Jabalpur.",
    detail: "Jabalpur",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 99810 40151",
    href: "tel:+919981040151",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 83599 14344",
    href: "tel:+918359914344",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "dazzledanceandfitnessstudio@gmail.com",
    href: "mailto:dazzledanceandfitnessstudio@gmail.com",
  },
  {
    icon: Clock,
    label: "Studio Hours",
    value: "Mon — Fri: 9 AM — 10 PM",
    detail: "Sat — Sun: 10 AM — 8 PM",
  },
];

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [submitting, setSubmitting] = useState(false);

  // ── Auth state ──
  useEffect(() => {
    let mounted = true;

    authService.getCurrentUser().then((currentUser) => {
      if (mounted) {
        setUser(currentUser);
        if (currentUser) {
          setForm((prev) => ({
            ...prev,
            name: currentUser.displayName || "",
            email: currentUser.email || "",
          }));
        }
        setLoading(false);
      }
    });

    const firebaseAuth = authService.auth || authService.getAuth?.();
    let unsubscribe = null;
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
      unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
        if (mounted) {
          setUser(u);
          if (u) {
            setForm((prev) => ({
              ...prev,
              name: u.displayName || "",
              email: u.email || "",
            }));
          }
          setLoading(false);
        }
      });
    }

    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // ── Actions ──
  const handleSignIn = async () => {
    try {
      const result = await authService.signInWithGoogle();
      if (result.success) {
        setUser(result.user);
        setForm((prev) => ({
          ...prev,
          name: result.user.displayName || "",
          email: result.user.email || "",
        }));
        showToast("Signed in successfully");
      } else {
        showToast(result.error || "Sign in failed", "error");
      }
    } catch (err) {
      console.error("Sign in failed:", err);
      showToast("Sign in failed", "error");
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
      }));
      showToast("Signed out successfully");
    } catch (err) {
      console.error("Sign out failed:", err);
      showToast("Sign out failed", "error");
    }
  };

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const emailResponse = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact-form",
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          subject: form.subject || "General Inquiry",
          message: form.message,
        }),
      });

      const emailResult = await emailResponse.json();

      if (!emailResult.success) {
        throw new Error(emailResult.error || "Failed to send email");
      }

      await fetch("/api/fcm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notification: {
            title: "📩 New Contact Form Submission",
            body: `${form.name} (${form.email}) sent a message: "${form.message.substring(0, 50)}${form.message.length > 50 ? "..." : ""}"`,
          },
          data: {
            type: "CONTACT_FORM",
            name: form.name,
            email: form.email,
            phone: form.phone || "",
            subject: form.subject || "General Inquiry",
          },
        }),
      });

      showToast("Thanks for reaching out! We'll be in touch soon.");
      setForm((prev) => ({
        ...prev,
        subject: "",
        message: "",
      }));
    } catch (err) {
      console.error("Submit error:", err);
      showToast(err.message || "Failed to send message. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Header 
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      
      {/* ── Hero ── */}
      <header className="ct-hero">
        <div className="ct-hero-inner">
          <p className="ct-eyebrow">
            <Mail size={13} strokeWidth={2.5} />
            Contact Us
          </p>
          <h1 className="ct-hero-title">Drop In or Drop a Line</h1>
          <p className="ct-hero-subtitle">
            Questions about classes, private sessions, or studio rentals? We&apos;re
            here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <div className="ct-hero-bar" aria-hidden="true" />
      </header>

      <main className="ct-container">
        <div className="ct-split">
          {/* ── Left: Contact Info ── */}
          <div className="ct-info-col">
            <h2 className="ct-info-heading">Get in Touch</h2>
            <p className="ct-info-desc">
              Stop by the studio, give us a call, or send an email. We&apos;d love
              to hear from you.
            </p>

            <div className="ct-info-cards">
              {CONTACT_INFO.map((item, index) => (
                <div className="ct-info-card" key={index}>
                  <div className="ct-info-icon">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <div className="ct-info-text">
                    <span className="ct-info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="ct-info-value ct-info-link">
                        {item.value}
                      </a>
                    ) : (
                      <span className="ct-info-value">{item.value}</span>
                    )}
                    {item.detail && (
                      <span className="ct-info-detail">{item.detail}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Embed */}
            <div className="ct-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d14631.375985874892!2d79.9669403!3d23.170889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDEwJzE1LjIiTiA3OcKwNTgnMDEuMCJF!5e1!3m2!1sen!2sin!4v1732284567890!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dazzle Dance Studio Location"
              />
            </div>

            {/* Social Links - Updated */}
            <div className="ct-social-links">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ct-social-link ${link.icon}`}
                  style={{
                    color: link.color,
                    borderColor: `${link.color}33`,
                    backgroundColor: `${link.color}14`,
                  }}
                >
                  <SocialIcon name={link.icon} color={link.color} size={20} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Enquiry Form ── */}
          <div className="ct-form-col">
            <div className="ct-form-card">
              <h2 className="ct-form-heading">Send an Enquiry</h2>
              <p className="ct-form-desc">
                {user ? (
                  "Hi " + (user.displayName || "there") + "! Fill out the form below and we'll get back to you."
                ) : (
                  "Sign in to auto-fill your details, or fill out the form below."
                )}
              </p>

              <form onSubmit={handleSubmit} className="ct-form" id="contact-form">
                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label htmlFor="ct-name" className="ct-label">
                      Full Name <span className="ct-required">*</span>
                    </label>
                    <input
                      id="ct-name"
                      name="name"
                      type="text"
                      className="ct-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      readOnly={!!user}
                      style={user ? { opacity: 0.7, cursor: "not-allowed" } : {}}
                    />
                    {user && (
                      <small style={{ color: "var(--body-text, #B0A8C0)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                        <Check size={12} style={{ display: "inline", marginRight: "4px", color: "#22C55E" }} />
                        Auto-filled from your account
                      </small>
                    )}
                  </div>
                  <div className="ct-form-group">
                    <label htmlFor="ct-email" className="ct-label">
                      Email <span className="ct-required">*</span>
                    </label>
                    <input
                      id="ct-email"
                      name="email"
                      type="email"
                      className="ct-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      readOnly={!!user}
                      style={user ? { opacity: 0.7, cursor: "not-allowed" } : {}}
                    />
                    {user && (
                      <small style={{ color: "var(--body-text, #B0A8C0)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                        <Check size={12} style={{ display: "inline", marginRight: "4px", color: "#22C55E" }} />
                        Auto-filled from your account
                      </small>
                    )}
                  </div>
                </div>

                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label htmlFor="ct-phone" className="ct-label">
                      Phone
                    </label>
                    <input
                      id="ct-phone"
                      name="phone"
                      type="tel"
                      className="ct-input"
                      placeholder="+91 **********"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ct-form-group">
                    <label htmlFor="ct-subject" className="ct-label">
                      Subject
                    </label>
                    <input
                      id="ct-subject"
                      name="subject"
                      type="text"
                      className="ct-input"
                      placeholder="e.g. Private session inquiry"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="ct-form-group">
                  <label htmlFor="ct-message" className="ct-label">
                    Message <span className="ct-required">*</span>
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    className="ct-input ct-textarea"
                    placeholder="Tell us what you&apos;re looking for…"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="ct-btn-submit"
                  disabled={submitting}
                  id="contact-submit-btn"
                >
                  {submitting ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <Send size={16} strokeWidth={2} />
                      Send Message
                    </>
                  )}
                </button>

                {!user && (
                  <p style={{ 
                    textAlign: "center", 
                    fontSize: "0.8125rem", 
                    color: "var(--body-text, #B0A8C0)",
                    marginTop: "0.5rem"
                  }}>
                    <button
                      type="button"
                      onClick={handleSignIn}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--primary, #FF1F6D)",
                        cursor: "pointer",
                        fontWeight: "600",
                        textDecoration: "underline"
                      }}
                    >
                      Sign in
                    </button>
                    {" "}to auto-fill your name and email.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <Footer />

      <style jsx>{`
        .contact-page {
          background: var(--background);
          color: var(--foreground);
          min-height: 100vh;
        }

        /* ============================================================
           HERO
           ============================================================ */
        .ct-hero {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 4rem 1.25rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .ct-hero-inner {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .ct-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.07);
          padding: 0.3rem 0.875rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }

        .ct-hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.875rem;
          line-height: 1.15;
        }

        .ct-hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.0625rem;
          color: var(--body-text);
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto;
        }

        .ct-hero-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
        }

        /* ============================================================
           MAIN CONTAINER
           ============================================================ */
        .ct-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.25rem 5rem;
        }

        .ct-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        /* ============================================================
           LEFT - CONTACT INFO
           ============================================================ */
        .ct-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .ct-info-heading {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0;
        }

        .ct-info-desc {
          font-size: 0.9375rem;
          color: var(--body-text);
          line-height: 1.65;
          margin: 0;
        }

        .ct-info-cards {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ct-info-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          transition: all 0.3s ease-out;
        }

        .ct-info-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          border-color: rgba(255, 31, 109, 0.2);
        }

        .ct-info-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 31, 109, 0.07);
          color: #FF1F6D;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ct-info-text {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
        }

        .ct-info-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .ct-info-value {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .ct-info-link {
          text-decoration: none;
          transition: color 0.15s ease-out;
        }

        .ct-info-link:hover {
          color: #FF1F6D;
        }

        .ct-info-detail {
          font-size: 0.8125rem;
          color: var(--body-text);
        }

        /* ============================================================
           MAP
           ============================================================ */
        .ct-map-container {
          margin-top: 0.5rem;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        /* ============================================================
           SOCIAL LINKS - All Platforms
           ============================================================ */
        .ct-social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .ct-social-link {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.8125rem;
          transition: all 0.3s ease-out;
          border: 1.5px solid transparent;
        }

        .ct-social-link:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .ct-social-link.instagram:hover {
          background: #C13584 !important;
          color: #FFFFFF !important;
          border-color: #C13584 !important;
        }

        .ct-social-link.instagram:hover svg {
          stroke: #FFFFFF !important;
        }

        .ct-social-link.facebook:hover {
          background: #3B5998 !important;
          color: #FFFFFF !important;
          border-color: #3B5998 !important;
        }

        .ct-social-link.facebook:hover svg {
          stroke: #FFFFFF !important;
        }

        .ct-social-link.youtube:hover {
          background: #FF0000 !important;
          color: #FFFFFF !important;
          border-color: #FF0000 !important;
        }

        .ct-social-link.youtube:hover svg {
          stroke: #FFFFFF !important;
        }

        .ct-social-link.whatsapp:hover {
          background: #25D366 !important;
          color: #FFFFFF !important;
          border-color: #25D366 !important;
        }

        .ct-social-link.whatsapp:hover svg {
          stroke: #FFFFFF !important;
        }

        /* ============================================================
           RIGHT - FORM
           ============================================================ */
        .ct-form-col {
          display: flex;
          flex-direction: column;
        }

        .ct-form-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .ct-form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
        }

        .ct-form-heading {
          font-family: 'Poppins', sans-serif;
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.375rem;
        }

        .ct-form-desc {
          font-size: 0.875rem;
          color: var(--body-text);
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }

        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
        }

        .ct-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.125rem;
        }

        .ct-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .ct-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--foreground);
        }

        .ct-required {
          color: #FF1F6D;
        }

        .ct-input {
          background: var(--surface-alt);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          color: var(--foreground);
          outline: none;
          transition: all 0.3s ease-out;
          width: 100%;
        }

        .ct-input:focus {
          border-color: #FF1F6D;
          box-shadow: 0 0 0 3px rgba(255, 31, 109, 0.1);
        }

        .ct-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .ct-btn-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease-out;
          box-shadow: 0 4px 20px rgba(255, 31, 109, 0.25);
          width: 100%;
          margin-top: 0.375rem;
        }

        .ct-btn-submit:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(255, 31, 109, 0.35);
        }

        .ct-btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ============================================================
           TOAST
           ============================================================ */
        .ct-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 0.75rem 1.5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          opacity: 0;
          transition: transform 0.35s ease-out, opacity 0.35s ease-out;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ct-toast.ct-toast-visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .ct-toast-success {
          border-color: rgba(198, 255, 61, 0.3);
        }

        .ct-toast-error {
          border-color: rgba(255, 31, 109, 0.3);
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (min-width: 640px) {
          .ct-form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 768px) {
          .ct-hero-title {
            font-size: 3.5rem;
          }
        }

        @media (min-width: 1024px) {
          .ct-split {
            grid-template-columns: 5fr 7fr;
            gap: 3rem;
          }
        }

        @media (max-width: 480px) {
          .ct-hero-title {
            font-size: 2rem;
          }
          .ct-form-card {
            padding: 1.5rem;
          }
          .ct-info-card {
            padding: 1rem;
          }
          .ct-social-link {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}








// "use client";

// import { useState, useCallback, useEffect } from "react";
// import {
//   MapPin,
//   Phone,
//   Mail,
//   Clock,
//   Send,
//   Check,
//   X,
// } from "lucide-react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { authService } from "../../lib/firebaseService";

// // ─── Toast ──────────────────────────────────────────────────────────────────
// function Toast({ message, type, visible }) {
//   return (
//     <div
//       className={`ct-toast ${visible ? "ct-toast-visible" : ""} ${
//         type === "success" ? "ct-toast-success" : "ct-toast-error"
//       }`}
//       role="status"
//       aria-live="polite"
//     >
//       {type === "success" ? (
//         <Check size={14} strokeWidth={2.5} />
//       ) : (
//         <X size={14} strokeWidth={2.5} />
//       )}{" "}
//       {message}
//     </div>
//   );
// }

// // ─── SVG Social Icons ──────────────────────────────────────────────────────
// const SocialIcon = ({ name, color = "#FFFFFF", size = 24 }) => {
//   const icons = {
//     instagram: (
//       <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
//         <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
//         <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
//       </svg>
//     ),
//     facebook: (
//       <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
//       </svg>
//     ),
//     youtube: (
//       <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
//         <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
//       </svg>
//     ),
//     twitter: (
//       <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
//       </svg>
//     ),
//     whatsapp: (
//       <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
//       </svg>
//     ),
//   };
//   return icons[name] || null;
// };

// // ─── Social Links Data ─────────────────────────────────────────────────────
// const SOCIAL_LINKS = [
//   {
//     id: 'facebook',
//     platform: 'Facebook',
//     handle: 'Dazzle Studio',
//     url: 'https://facebook.com/dazzlestudio',
//     icon: 'facebook',
//     color: '#3B5998',
//     label: 'Facebook'
//   },
//   {
//     id: 'instagram1',
//     platform: 'Instagram',
//     handle: '@dazzlestudio',
//     url: 'https://instagram.com/dazzlestudio',
//     icon: 'instagram',
//     color: '#C13584',
//     label: 'Instagram'
//   },
//   {
//     id: 'instagram2',
//     platform: 'Priyaangan Kathak',
//     handle: '@priyaangan_kathak',
//     url: 'https://instagram.com/priyaangan_kathak',
//     icon: 'instagram',
//     color: '#E1306C',
//     label: 'Kathak Insta'
//   },
//   {
//     id: 'youtube',
//     platform: 'YouTube',
//     handle: 'Dazzle Dance',
//     url: 'https://youtube.com/dazzledance',
//     icon: 'youtube',
//     color: '#FF0000',
//     label: 'YouTube'
//   },
//   {
//     id: 'whatsapp',
//     platform: 'WhatsApp',
//     handle: '+91 83599 14344',
//     url: 'https://wa.me/918359914344',
//     icon: 'whatsapp',
//     color: '#25D366',
//     label: 'WhatsApp'
//   },
// ];

// // ─── Contact Info Data ──────────────────────────────────────────────────────
// const CONTACT_INFO = [
//   {
//     icon: MapPin,
//     label: "Visit Us",
//     value: "Dazzle Dance & Fitness Studio, Jabalpur.",
//     detail: "Jabalpur",
//   },
//   {
//     icon: Phone,
//     label: "Call Us",
//     value: "+91 83599 14344",
//     href: "tel:+918359914344",
//   },
//   {
//     icon: Mail,
//     label: "Email Us",
//     value: "dazzledanceandfitnessstudio@gmail.com",
//     href: "mailto:dazzledanceandfitnessstudio@gmail.com",
//   },
//   {
//     icon: Clock,
//     label: "Studio Hours",
//     value: "Mon — Fri: 9 AM — 10 PM",
//     detail: "Sat — Sun: 10 AM — 8 PM",
//   },
// ];

// // ─── Main Page ──────────────────────────────────────────────────────────────
// export default function ContactPage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [toast, setToast] = useState({ message: "", type: "", visible: false });
//   const [submitting, setSubmitting] = useState(false);

//   // ── Auth state ──
//   useEffect(() => {
//     let mounted = true;

//     authService.getCurrentUser().then((currentUser) => {
//       if (mounted) {
//         setUser(currentUser);
//         if (currentUser) {
//           setForm((prev) => ({
//             ...prev,
//             name: currentUser.displayName || "",
//             email: currentUser.email || "",
//           }));
//         }
//         setLoading(false);
//       }
//     });

//     const firebaseAuth = authService.auth || authService.getAuth?.();
//     let unsubscribe = null;
//     if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
//       unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
//         if (mounted) {
//           setUser(u);
//           if (u) {
//             setForm((prev) => ({
//               ...prev,
//               name: u.displayName || "",
//               email: u.email || "",
//             }));
//           }
//           setLoading(false);
//         }
//       });
//     }

//     return () => {
//       mounted = false;
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   // ── Actions ──
//   const handleSignIn = async () => {
//     try {
//       const result = await authService.signInWithGoogle();
//       if (result.success) {
//         setUser(result.user);
//         setForm((prev) => ({
//           ...prev,
//           name: result.user.displayName || "",
//           email: result.user.email || "",
//         }));
//         showToast("Signed in successfully");
//       } else {
//         showToast(result.error || "Sign in failed", "error");
//       }
//     } catch (err) {
//       console.error("Sign in failed:", err);
//       showToast("Sign in failed", "error");
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await authService.signOut();
//       setUser(null);
//       setForm((prev) => ({
//         ...prev,
//         name: "",
//         email: "",
//         phone: "",
//       }));
//       showToast("Signed out successfully");
//     } catch (err) {
//       console.error("Sign out failed:", err);
//       showToast("Sign out failed", "error");
//     }
//   };

//   const showToast = useCallback((message, type = "success") => {
//     setToast({ message, type, visible: true });
//     setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
//   }, []);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
//       showToast("Please fill in all required fields.", "error");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const emailResponse = await fetch("/api/email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           type: "contact-form",
//           name: form.name,
//           email: form.email,
//           phone: form.phone || "Not provided",
//           subject: form.subject || "General Inquiry",
//           message: form.message,
//         }),
//       });

//       const emailResult = await emailResponse.json();

//       if (!emailResult.success) {
//         throw new Error(emailResult.error || "Failed to send email");
//       }

//       await fetch("/api/fcm", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           notification: {
//             title: "📩 New Contact Form Submission",
//             body: `${form.name} (${form.email}) sent a message: "${form.message.substring(0, 50)}${form.message.length > 50 ? "..." : ""}"`,
//           },
//           data: {
//             type: "CONTACT_FORM",
//             name: form.name,
//             email: form.email,
//             phone: form.phone || "",
//             subject: form.subject || "General Inquiry",
//           },
//         }),
//       });

//       showToast("Thanks for reaching out! We'll be in touch soon.");
//       setForm((prev) => ({
//         ...prev,
//         subject: "",
//         message: "",
//       }));
//     } catch (err) {
//       console.error("Submit error:", err);
//       showToast(err.message || "Failed to send message. Please try again.", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="contact-page">
//       <Header 
//         user={user}
//         onSignIn={handleSignIn}
//         onSignOut={handleSignOut}
//       />
      
//       {/* ── Hero ── */}
//       <header className="ct-hero">
//         <div className="ct-hero-inner">
//           <p className="ct-eyebrow">
//             <Mail size={13} strokeWidth={2.5} />
//             Contact Us
//           </p>
//           <h1 className="ct-hero-title">Drop In or Drop a Line</h1>
//           <p className="ct-hero-subtitle">
//             Questions about classes, private sessions, or studio rentals? We&apos;re
//             here to help. Reach out and we&apos;ll get back to you within 24 hours.
//           </p>
//         </div>
//         <div className="ct-hero-bar" aria-hidden="true" />
//       </header>

//       <main className="ct-container">
//         <div className="ct-split">
//           {/* ── Left: Contact Info ── */}
//           <div className="ct-info-col">
//             <h2 className="ct-info-heading">Get in Touch</h2>
//             <p className="ct-info-desc">
//               Stop by the studio, give us a call, or send an email. We&apos;d love
//               to hear from you.
//             </p>

//             <div className="ct-info-cards">
//               {CONTACT_INFO.map((item) => (
//                 <div className="ct-info-card" key={item.label}>
//                   <div className="ct-info-icon">
//                     <item.icon size={20} strokeWidth={2} />
//                   </div>
//                   <div className="ct-info-text">
//                     <span className="ct-info-label">{item.label}</span>
//                     {item.href ? (
//                       <a href={item.href} className="ct-info-value ct-info-link">
//                         {item.value}
//                       </a>
//                     ) : (
//                       <span className="ct-info-value">{item.value}</span>
//                     )}
//                     {item.detail && (
//                       <span className="ct-info-detail">{item.detail}</span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Google Maps Embed */}
//             <div className="ct-map-container">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d14631.375985874892!2d79.9669403!3d23.170889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDEwJzE1LjIiTiA3OcKwNTgnMDEuMCJF!5e1!3m2!1sen!2sin!4v1732284567890!5m2!1sen!2sin"
//                 width="100%"
//                 height="250"
//                 style={{ border: 0, borderRadius: "12px" }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Dazzle Dance Studio Location"
//               />
//             </div>

//             {/* Social Links - All Platforms */}
//             <div className="ct-social-links">
//               {SOCIAL_LINKS.map((link) => (
//                 <a
//                   key={link.id}
//                   href={link.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`ct-social-link ${link.icon}`}
//                   style={{
//                     color: link.color,
//                     borderColor: `${link.color}33`,
//                     backgroundColor: `${link.color}14`,
//                   }}
//                 >
//                   <SocialIcon name={link.icon} color={link.color} size={20} />
//                   <span>{link.label}</span>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* ── Right: Enquiry Form ── */}
//           <div className="ct-form-col">
//             <div className="ct-form-card">
//               <h2 className="ct-form-heading">Send an Enquiry</h2>
//               <p className="ct-form-desc">
//                 {user ? (
//                   "Hi " + (user.displayName || "there") + "! Fill out the form below and we'll get back to you."
//                 ) : (
//                   "Sign in to auto-fill your details, or fill out the form below."
//                 )}
//               </p>

//               <form onSubmit={handleSubmit} className="ct-form" id="contact-form">
//                 <div className="ct-form-row">
//                   <div className="ct-form-group">
//                     <label htmlFor="ct-name" className="ct-label">
//                       Full Name <span className="ct-required">*</span>
//                     </label>
//                     <input
//                       id="ct-name"
//                       name="name"
//                       type="text"
//                       className="ct-input"
//                       placeholder="Your name"
//                       value={form.name}
//                       onChange={handleChange}
//                       required
//                       readOnly={!!user}
//                       style={user ? { opacity: 0.7, cursor: "not-allowed" } : {}}
//                     />
//                     {user && (
//                       <small style={{ color: "var(--body-text, #B0A8C0)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
//                         <Check size={12} style={{ display: "inline", marginRight: "4px", color: "#22C55E" }} />
//                         Auto-filled from your account
//                       </small>
//                     )}
//                   </div>
//                   <div className="ct-form-group">
//                     <label htmlFor="ct-email" className="ct-label">
//                       Email <span className="ct-required">*</span>
//                     </label>
//                     <input
//                       id="ct-email"
//                       name="email"
//                       type="email"
//                       className="ct-input"
//                       placeholder="you@example.com"
//                       value={form.email}
//                       onChange={handleChange}
//                       required
//                       readOnly={!!user}
//                       style={user ? { opacity: 0.7, cursor: "not-allowed" } : {}}
//                     />
//                     {user && (
//                       <small style={{ color: "var(--body-text, #B0A8C0)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
//                         <Check size={12} style={{ display: "inline", marginRight: "4px", color: "#22C55E" }} />
//                         Auto-filled from your account
//                       </small>
//                     )}
//                   </div>
//                 </div>

//                 <div className="ct-form-row">
//                   <div className="ct-form-group">
//                     <label htmlFor="ct-phone" className="ct-label">
//                       Phone
//                     </label>
//                     <input
//                       id="ct-phone"
//                       name="phone"
//                       type="tel"
//                       className="ct-input"
//                       placeholder="+91 **********"
//                       value={form.phone}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="ct-form-group">
//                     <label htmlFor="ct-subject" className="ct-label">
//                       Subject
//                     </label>
//                     <input
//                       id="ct-subject"
//                       name="subject"
//                       type="text"
//                       className="ct-input"
//                       placeholder="e.g. Private session inquiry"
//                       value={form.subject}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="ct-form-group">
//                   <label htmlFor="ct-message" className="ct-label">
//                     Message <span className="ct-required">*</span>
//                   </label>
//                   <textarea
//                     id="ct-message"
//                     name="message"
//                     className="ct-input ct-textarea"
//                     placeholder="Tell us what you&apos;re looking for…"
//                     rows={5}
//                     value={form.message}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="ct-btn-submit"
//                   disabled={submitting}
//                   id="contact-submit-btn"
//                 >
//                   {submitting ? (
//                     <>Sending…</>
//                   ) : (
//                     <>
//                       <Send size={16} strokeWidth={2} />
//                       Send Message
//                     </>
//                   )}
//                 </button>

//                 {!user && (
//                   <p style={{ 
//                     textAlign: "center", 
//                     fontSize: "0.8125rem", 
//                     color: "var(--body-text, #B0A8C0)",
//                     marginTop: "0.5rem"
//                   }}>
//                     <button
//                       type="button"
//                       onClick={handleSignIn}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         color: "var(--primary, #FF1F6D)",
//                         cursor: "pointer",
//                         fontWeight: "600",
//                         textDecoration: "underline"
//                       }}
//                     >
//                       Sign in
//                     </button>
//                     {" "}to auto-fill your name and email.
//                   </p>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Toast message={toast.message} type={toast.type} visible={toast.visible} />
//       <Footer />

//       <style jsx>{`
//         .contact-page {
//           background: var(--background);
//           color: var(--foreground);
//           min-height: 100vh;
//         }

//         /* ============================================================
//            HERO
//            ============================================================ */
//         .ct-hero {
//           background: var(--surface);
//           border-bottom: 1px solid var(--border);
//           padding: 4rem 1.25rem 3rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .ct-hero-inner {
//           max-width: 720px;
//           margin: 0 auto;
//           text-align: center;
//           position: relative;
//           z-index: 1;
//         }

//         .ct-eyebrow {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.375rem;
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.75rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           color: #FF1F6D;
//           background: rgba(255, 31, 109, 0.07);
//           padding: 0.3rem 0.875rem;
//           border-radius: 999px;
//           margin-bottom: 1.25rem;
//         }

//         .ct-hero-title {
//           font-family: 'Poppins', sans-serif;
//           font-size: 2.5rem;
//           font-weight: 800;
//           color: var(--foreground);
//           margin: 0 0 0.875rem;
//           line-height: 1.15;
//         }

//         .ct-hero-subtitle {
//           font-family: 'Inter', sans-serif;
//           font-size: 1.0625rem;
//           color: var(--body-text);
//           line-height: 1.65;
//           max-width: 520px;
//           margin: 0 auto;
//         }

//         .ct-hero-bar {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           height: 3px;
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//         }

//         /* ============================================================
//            MAIN CONTAINER
//            ============================================================ */
//         .ct-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 3rem 1.25rem 5rem;
//         }

//         .ct-split {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 2.5rem;
//         }

//         /* ============================================================
//            LEFT - CONTACT INFO
//            ============================================================ */
//         .ct-info-col {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .ct-info-heading {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1.5rem;
//           font-weight: 800;
//           color: var(--foreground);
//           margin: 0;
//         }

//         .ct-info-desc {
//           font-size: 0.9375rem;
//           color: var(--body-text);
//           line-height: 1.65;
//           margin: 0;
//         }

//         .ct-info-cards {
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//         }

//         .ct-info-card {
//           display: flex;
//           align-items: flex-start;
//           gap: 1rem;
//           background: var(--surface);
//           border: 1px solid var(--border);
//           border-radius: 14px;
//           padding: 1.25rem 1.5rem;
//           transition: all 0.3s ease-out;
//         }

//         .ct-info-card:hover {
//           box-shadow: var(--shadow-md);
//           transform: translateY(-2px);
//           border-color: rgba(255, 31, 109, 0.2);
//         }

//         .ct-info-icon {
//           width: 44px;
//           height: 44px;
//           border-radius: 12px;
//           background: rgba(255, 31, 109, 0.07);
//           color: #FF1F6D;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .ct-info-text {
//           display: flex;
//           flex-direction: column;
//           gap: 0.125rem;
//           min-width: 0;
//         }

//         .ct-info-label {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.6875rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           color: var(--muted);
//         }

//         .ct-info-value {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.9375rem;
//           font-weight: 600;
//           color: var(--foreground);
//         }

//         .ct-info-link {
//           text-decoration: none;
//           transition: color 0.15s ease-out;
//         }

//         .ct-info-link:hover {
//           color: #FF1F6D;
//         }

//         .ct-info-detail {
//           font-size: 0.8125rem;
//           color: var(--body-text);
//         }

//         /* ============================================================
//            MAP
//            ============================================================ */
//         .ct-map-container {
//           margin-top: 0.5rem;
//           border-radius: 14px;
//           overflow: hidden;
//           border: 1px solid var(--border);
//         }

//         /* ============================================================
//            SOCIAL LINKS - All Platforms
//            ============================================================ */
//         .ct-social-links {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.75rem;
//         }

//         .ct-social-link {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.625rem;
//           padding: 0.5rem 1rem;
//           border-radius: 10px;
//           text-decoration: none;
//           font-family: 'Poppins', sans-serif;
//           font-weight: 600;
//           font-size: 0.8125rem;
//           transition: all 0.3s ease-out;
//           border: 1.5px solid transparent;
//         }

//         .ct-social-link:hover {
//           transform: translateY(-2px) scale(1.05);
//           box-shadow: 0 8px 24px rgba(0,0,0,0.15);
//         }

//         .ct-social-link.instagram:hover {
//           background: #C13584 !important;
//           color: #FFFFFF !important;
//           border-color: #C13584 !important;
//         }

//         .ct-social-link.instagram:hover svg {
//           stroke: #FFFFFF !important;
//         }

//         .ct-social-link.facebook:hover {
//           background: #3B5998 !important;
//           color: #FFFFFF !important;
//           border-color: #3B5998 !important;
//         }

//         .ct-social-link.facebook:hover svg {
//           stroke: #FFFFFF !important;
//         }

//         .ct-social-link.youtube:hover {
//           background: #FF0000 !important;
//           color: #FFFFFF !important;
//           border-color: #FF0000 !important;
//         }

//         .ct-social-link.youtube:hover svg {
//           stroke: #FFFFFF !important;
//         }

//         .ct-social-link.whatsapp:hover {
//           background: #25D366 !important;
//           color: #FFFFFF !important;
//           border-color: #25D366 !important;
//         }

//         .ct-social-link.whatsapp:hover svg {
//           stroke: #FFFFFF !important;
//         }

//         .ct-social-link.twitter:hover {
//           background: #55ACEE !important;
//           color: #FFFFFF !important;
//           border-color: #55ACEE !important;
//         }

//         .ct-social-link.twitter:hover svg {
//           stroke: #FFFFFF !important;
//         }

//         /* ============================================================
//            RIGHT - FORM
//            ============================================================ */
//         .ct-form-col {
//           display: flex;
//           flex-direction: column;
//         }

//         .ct-form-card {
//           background: var(--surface);
//           border: 1px solid var(--border);
//           border-radius: 14px;
//           padding: 2rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .ct-form-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 3px;
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//         }

//         .ct-form-heading {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1.375rem;
//           font-weight: 800;
//           color: var(--foreground);
//           margin: 0 0 0.375rem;
//         }

//         .ct-form-desc {
//           font-size: 0.875rem;
//           color: var(--body-text);
//           line-height: 1.6;
//           margin: 0 0 1.5rem;
//         }

//         .ct-form {
//           display: flex;
//           flex-direction: column;
//           gap: 1.125rem;
//         }

//         .ct-form-row {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 1.125rem;
//         }

//         .ct-form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.375rem;
//         }

//         .ct-label {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.75rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           color: var(--foreground);
//         }

//         .ct-required {
//           color: #FF1F6D;
//         }

//         .ct-input {
//           background: var(--surface-alt);
//           border: 1px solid var(--border);
//           border-radius: 12px;
//           padding: 0.75rem 1rem;
//           font-family: 'Inter', sans-serif;
//           font-size: 0.9375rem;
//           color: var(--foreground);
//           outline: none;
//           transition: all 0.3s ease-out;
//           width: 100%;
//         }

//         .ct-input:focus {
//           border-color: #FF1F6D;
//           box-shadow: 0 0 0 3px rgba(255, 31, 109, 0.1);
//         }

//         .ct-textarea {
//           resize: vertical;
//           min-height: 120px;
//         }

//         .ct-btn-submit {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//           color: #FFFFFF;
//           font-family: 'Poppins', sans-serif;
//           font-weight: 700;
//           font-size: 0.9375rem;
//           padding: 0.875rem 2rem;
//           border: none;
//           border-radius: 14px;
//           cursor: pointer;
//           transition: all 0.3s ease-out;
//           box-shadow: 0 4px 20px rgba(255, 31, 109, 0.25);
//           width: 100%;
//           margin-top: 0.375rem;
//         }

//         .ct-btn-submit:hover:not(:disabled) {
//           transform: translateY(-2px) scale(1.02);
//           box-shadow: 0 8px 30px rgba(255, 31, 109, 0.35);
//         }

//         .ct-btn-submit:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//           transform: none;
//           box-shadow: none;
//         }

//         /* ============================================================
//            TOAST
//            ============================================================ */
//         .ct-toast {
//           position: fixed;
//           bottom: 2rem;
//           left: 50%;
//           transform: translateX(-50%) translateY(100px);
//           background: var(--surface);
//           border: 1px solid var(--border);
//           border-radius: 14px;
//           padding: 0.75rem 1.5rem;
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.875rem;
//           font-weight: 600;
//           color: var(--foreground);
//           box-shadow: var(--shadow-lg);
//           z-index: 1000;
//           opacity: 0;
//           transition: transform 0.35s ease-out, opacity 0.35s ease-out;
//           pointer-events: none;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .ct-toast.ct-toast-visible {
//           transform: translateX(-50%) translateY(0);
//           opacity: 1;
//         }

//         .ct-toast-success {
//           border-color: rgba(198, 255, 61, 0.3);
//         }

//         .ct-toast-error {
//           border-color: rgba(255, 31, 109, 0.3);
//         }

//         /* ============================================================
//            RESPONSIVE
//            ============================================================ */
//         @media (min-width: 640px) {
//           .ct-form-row {
//             grid-template-columns: 1fr 1fr;
//           }
//         }

//         @media (min-width: 768px) {
//           .ct-hero-title {
//             font-size: 3.5rem;
//           }
//         }

//         @media (min-width: 1024px) {
//           .ct-split {
//             grid-template-columns: 5fr 7fr;
//             gap: 3rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .ct-hero-title {
//             font-size: 2rem;
//           }
//           .ct-form-card {
//             padding: 1.5rem;
//           }
//           .ct-info-card {
//             padding: 1rem;
//           }
//           .ct-social-link {
//             padding: 0.4rem 0.8rem;
//             font-size: 0.75rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }





