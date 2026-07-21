"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Music,
  Building2,
  Heart,
  Camera,
  Users,
  Mic2,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authService } from "../../lib/firebaseService";

// ─── Icon resolver ──────────────────────────────────────────────────────────
const iconMap = {
  Music,
  Building2,
  Heart,
  Camera,
  Users,
  Mic2,
};

function ServiceIcon({ name, size = 28, strokeWidth = 1.5 }) {
  const Icon = iconMap[name] || Sparkles;
  return <Icon size={size} strokeWidth={strokeWidth} />;
}

// ─── Service Card ───────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  return (
    <article
      className="svc-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Icon strip */}
      <div className="svc-card-icon-wrap">
        <div className="svc-card-icon">
          <ServiceIcon name={service.icon} />
        </div>
      </div>

      {/* Content */}
      <div className="svc-card-body">
        <h3 className="svc-card-title">{service.title}</h3>
        <p className="svc-card-desc">{service.description}</p>

        {/* Feature list */}
        {service.features && service.features.length > 0 && (
          <ul className="svc-features">
            {service.features.map((feat, i) => (
              <li key={i} className="svc-feature-item">
                <span className="svc-feature-bullet" aria-hidden="true" />
                {feat}
              </li>
            ))}
          </ul>
        )}

        {/* Price + CTA */}
        <div className="svc-card-footer">
          {service.price && (
            <span className="svc-price">{service.price}</span>
          )}
          <a
            href="mailto:dazzledanceandfitnessstudio@gmail.com?subject=Inquiry: "
            className="svc-btn-inquire"
            id={`services-inquire-${service.id}`}
          >
            <Mail size={15} strokeWidth={2} />
            Inquire Now
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ── Auth state ──
  useEffect(() => {
    let mounted = true;

    authService.getCurrentUser().then((currentUser) => {
      if (mounted) setUser(currentUser);
    });

    const firebaseAuth = authService.auth || authService.getAuth?.();
    let unsubscribe = null;
    if (firebaseAuth && typeof firebaseAuth.onAuthStateChanged === "function") {
      unsubscribe = firebaseAuth.onAuthStateChanged((u) => {
        if (mounted) setUser(u);
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
      }
    } catch (err) {
      console.error("Sign in failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  // Since there is no service fetching for "services" yet, we just simulate loading and then show empty state.
  useEffect(() => {
    let cancelled = false;
    setTimeout(() => {
      if (!cancelled) {
        setServices([]);
        setLoading(false);
      }
    }, 500);
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="services-page">
      {/* 🔥 FIX: Pass user props to Header */}
      <Header 
        user={user} 
        onSignIn={handleSignIn} 
        onSignOut={handleSignOut} 
      />
      
      {/* ── Hero ── */}
      <header className="svc-hero">
        <div className="svc-hero-inner">
          <p className="svc-eyebrow">
            <Building2 size={14} strokeWidth={2.5} />
            Beyond the Classroom
          </p>
          <h1 className="svc-hero-title">Studio Services &amp; Rentals</h1>
          <p className="svc-hero-subtitle">
            From private coaching to event performances and studio rentals —
            Dazzle is more than classes. Explore everything we offer.
          </p>

          {/* Quick contact pills */}
          <div className="svc-hero-contact">
            <a href="mailto:dazzledanceandfitnessstudio@gmail.com" className="svc-contact-pill">
              <Mail size={14} strokeWidth={2} />
              dazzledanceandfitnessstudio@gmail.com
            </a>
            <a href="tel:+918359914344" className="svc-contact-pill">
              <Phone size={14} strokeWidth={2} />
              +91 83599 14344
            </a>
          </div>
        </div>
        <div className="svc-hero-bar" aria-hidden="true" />
      </header>

      <main className="svc-container">
        {/* ── Special Choreography Services ── */}
        <section className="svc-static" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem' }}>Special Choreography Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {["School Functions", "College Events", "Wedding Choreography", "Cultural Programs", "Stage Shows & Competitions"].map((service, index) => (
              <article key={index} className="svc-card" style={{ background: 'var(--color-surface-alt)', padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 31, 109, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF1F6D', marginBottom: '1.5rem' }}>
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{service}</h3>
                <p style={{ color: 'var(--color-body-text)' }}>Professional choreography tailored to your specific event needs and audience.</p>
              </article>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="svc-grid">
             {[1, 2].map((i) => (
                <div key={i} style={{ height: "300px", background: "var(--color-surface-alt)", borderRadius: "var(--radius-xl)", animation: "pulse 1.5s infinite" }} />
             ))}
          </div>
        ) : services.length > 0 ? (
          <div className="svc-grid">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 1.5rem", background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
            <Building2 size={36} strokeWidth={1.5} style={{ color: "var(--color-muted)", marginBottom: "1rem" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-ink)", marginBottom: "0.5rem" }}>No services currently listed.</h2>
            <p style={{ color: "var(--color-body-text)", fontSize: "0.9375rem" }}>Check back soon for updates to our studio offerings.</p>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="svc-bottom-cta">
          <h2 className="svc-bottom-title">
            Have something custom in mind?
          </h2>
          <p className="svc-bottom-desc">
            We love creative briefs. Reach out and let&apos;s build something
            unforgettable together.
          </p>
          <a
            href="mailto:dazzledanceandfitnessstudio@gmail.com?subject=Custom Inquiry"
            className="svc-btn-primary"
            id="services-custom-inquiry"
          >
            <Mail size={16} strokeWidth={2} />
            Get in Touch
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}









// "use client";

// import { useState, useEffect } from "react";
// import {
//   Sparkles,
//   Music,
//   Building2,
//   Heart,
//   Camera,
//   Users,
//   Mic2,
//   ArrowRight,
//   Mail,
//   Phone,
// } from "lucide-react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// // ─── No Demo Fallback ────────────────────────────────────────────────────────

// // ─── Icon resolver ──────────────────────────────────────────────────────────
// const iconMap = {
//   Music,
//   Building2,
//   Heart,
//   Camera,
//   Users,
//   Mic2,
// };

// function ServiceIcon({ name, size = 28, strokeWidth = 1.5 }) {
//   const Icon = iconMap[name] || Sparkles;
//   return <Icon size={size} strokeWidth={strokeWidth} />;
// }

// // ─── Service Card ───────────────────────────────────────────────────────────
// function ServiceCard({ service, index }) {
//   return (
//     <article
//       className="svc-card"
//       style={{ animationDelay: `${index * 0.07}s` }}
//     >
//       {/* Icon strip */}
//       <div className="svc-card-icon-wrap">
//         <div className="svc-card-icon">
//           <ServiceIcon name={service.icon} />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="svc-card-body">
//         <h3 className="svc-card-title">{service.title}</h3>
//         <p className="svc-card-desc">{service.description}</p>

//         {/* Feature list */}
//         {service.features && service.features.length > 0 && (
//           <ul className="svc-features">
//             {service.features.map((feat, i) => (
//               <li key={i} className="svc-feature-item">
//                 <span className="svc-feature-bullet" aria-hidden="true" />
//                 {feat}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Price + CTA */}
//         <div className="svc-card-footer">
//           {service.price && (
//             <span className="svc-price">{service.price}</span>
//           )}
//           <a
//             href="mailto:hello@dazzledance.com?subject=Inquiry: "
//             className="svc-btn-inquire"
//             id={`services-inquire-${service.id}`}
//           >
//             <Mail size={15} strokeWidth={2} />
//             Inquire Now
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// }

// // ─── Main Page ──────────────────────────────────────────────────────────────
// export default function ServicesPage() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Since there is no service fetching for "services" yet, we just simulate loading and then show empty state.
//   useEffect(() => {
//     let cancelled = false;
//     setTimeout(() => {
//       if (!cancelled) {
//         setServices([]);
//         setLoading(false);
//       }
//     }, 500);
//     return () => { cancelled = true; };
//   }, []);

//   return (
//     <div className="services-page">
//       <Header />
//       {/* ── Hero ── */}
//       <header className="svc-hero">
//         <div className="svc-hero-inner">
//           <p className="svc-eyebrow">
//             <Building2 size={14} strokeWidth={2.5} />
//             Beyond the Classroom
//           </p>
//           <h1 className="svc-hero-title">Studio Services &amp; Rentals</h1>
//           <p className="svc-hero-subtitle">
//             From private coaching to event performances and studio rentals —
//             Dazzle is more than classes. Explore everything we offer.
//           </p>

//           {/* Quick contact pills */}
//           <div className="svc-hero-contact">
//             <a href="mailto:dazzledanceandfitnessstudio@gmail.com" className="svc-contact-pill">
//               <Mail size={14} strokeWidth={2} />
//               dazzledanceandfitnessstudio@gmail.com
//             </a>
//             <a href="tel:+15551234567" className="svc-contact-pill">
//               <Phone size={14} strokeWidth={2} />
//               +1 (555) 123-4567
//             </a>
//           </div>
//         </div>
//         <div className="svc-hero-bar" aria-hidden="true" />
//       </header>

//       <main className="svc-container">
//         {/* ── Special Choreography Services ── */}
//         <section className="svc-static" style={{ marginBottom: '4rem' }}>
//           <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem' }}>Special Choreography Services</h2>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
//             {["School Functions", "College Events", "Wedding Choreography", "Cultural Programs", "Stage Shows & Competitions"].map((service, index) => (
//               <article key={index} className="svc-card" style={{ background: 'var(--color-surface-alt)', padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
//                 <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 31, 109, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF1F6D', marginBottom: '1.5rem' }}>
//                   <Sparkles size={24} />
//                 </div>
//                 <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{service}</h3>
//                 <p style={{ color: 'var(--color-body-text)' }}>Professional choreography tailored to your specific event needs and audience.</p>
//               </article>
//             ))}
//           </div>
//         </section>

//         {loading ? (
//           <div className="svc-grid">
//              {[1, 2].map((i) => (
//                 <div key={i} style={{ height: "300px", background: "var(--color-surface-alt)", borderRadius: "var(--radius-xl)", animation: "pulse 1.5s infinite" }} />
//              ))}
//           </div>
//         ) : services.length > 0 ? (
//           <div className="svc-grid">
//             {services.map((service, i) => (
//               <ServiceCard key={service.id} service={service} index={i} />
//             ))}
//           </div>
//         ) : (
//           <div style={{ textAlign: "center", padding: "4rem 1.5rem", background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)" }}>
//             <Building2 size={36} strokeWidth={1.5} style={{ color: "var(--color-muted)", marginBottom: "1rem" }} />
//             <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--color-ink)", marginBottom: "0.5rem" }}>No services currently listed.</h2>
//             <p style={{ color: "var(--color-body-text)", fontSize: "0.9375rem" }}>Check back soon for updates to our studio offerings.</p>
//           </div>
//         )}

//         {/* ── Bottom CTA ── */}
//         <div className="svc-bottom-cta">
//           <h2 className="svc-bottom-title">
//             Have something custom in mind?
//           </h2>
//           <p className="svc-bottom-desc">
//             We love creative briefs. Reach out and let&apos;s build something
//             unforgettable together.
//           </p>
//           <a
//             href="mailto:dazzledanceandfitnessstudio@gmail.com?subject=Custom Inquiry"
//             className="svc-btn-primary"
//             id="services-custom-inquiry"
//           >
//             <Mail size={16} strokeWidth={2} />
//             Get in Touch
//             <ArrowRight size={16} strokeWidth={2} />
//           </a>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
