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
  Sparkles,
  ArrowRight,
  Camera,
  MessageCircle,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authService } from "../../lib/firebaseService";
import { fcmService } from "../../lib/fcmService";

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

// ─── Contact Info Data ──────────────────────────────────────────────────────
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
          // Auto-fill form from logged-in user
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

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Send email to admin
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

      // 2. Send FCM notification to admins
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
        phone: prev.phone, // Keep phone if user entered it
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
              {CONTACT_INFO.map((item) => (
                <div className="ct-info-card" key={item.label}>
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

            {/* Map placeholder */}
            <div className="ct-map-placeholder">
              <MapPin size={28} strokeWidth={1.5} />
              <span>Interactive map coming soon</span>
            </div>

            {/* Social Links */}
            <div className="ct-social-links" style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
              <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                <Camera size={20} /> Instagram
              </a>
              <a href="https://www.facebook.com/share/14i2QhGkLd4/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                <MessageCircle size={20} /> Facebook
              </a>
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
                      placeholder="+91 83599 14344"
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
    </div>
  );
}










// "use client";

// import { useState, useCallback } from "react";
// import {
//   MapPin,
//   Phone,
//   Mail,
//   Clock,
//   Send,
//   Check,
//   X,
//   Sparkles,
//   ArrowRight,
//   Camera,
//   MessageCircle,
// } from "lucide-react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

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
//     value: "+1 (555) 123-4567",
//     href: "tel:+15551234567",
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
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [toast, setToast] = useState({ message: "", type: "", visible: false });
//   const [submitting, setSubmitting] = useState(false);

//   const showToast = useCallback((message, type = "success") => {
//     setToast({ message, type, visible: true });
//     setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
//   }, []);

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
//       showToast("Please fill in all required fields.", "error");
//       return;
//     }

//     setSubmitting(true);

//     // Simulate a short processing delay (no actual Firebase write)
//     setTimeout(() => {
//       showToast("Thanks for reaching out! We'll be in touch soon.");
//       setForm({ name: "", email: "", phone: "", subject: "", message: "" });
//       setSubmitting(false);
//     }, 800);
//   };

//   return (
//     <div className="contact-page">
//       <Header />
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

//             {/* Map placeholder */}
//             <div className="ct-map-placeholder">
//               <MapPin size={28} strokeWidth={1.5} />
//               <span>Interactive map coming soon</span>
//             </div>

//             {/* Social Links */}
//             <div className="ct-social-links" style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
//               <a href="https://www.instagram.com/priya_dazzlestudio?utm_source=qr&igsh=MWl4ZzRpbmJucGo0MA==" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
//                 <Camera size={20} /> Instagram
//               </a>
//               <a href="https://www.facebook.com/share/14i2QhGkLd4/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
//                 <MessageCircle size={20} /> Facebook
//               </a>
//             </div>
//           </div>

//           {/* ── Right: Enquiry Form ── */}
//           <div className="ct-form-col">
//             <div className="ct-form-card">
//               <h2 className="ct-form-heading">Send an Enquiry</h2>
//               <p className="ct-form-desc">
//                 Fill out the form below and we&apos;ll get back to you as soon as
//                 possible.
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
//                     />
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
//                     />
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
//                       placeholder="+1 (555) 000-0000"
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
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Toast message={toast.message} type={toast.type} visible={toast.visible} />
//       <Footer />
//     </div>
//   );
// }
