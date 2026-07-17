"use client";

import { useState } from "react";
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
import "./services.css";

// ─── Demo services — hardcoded, never written to Firestore ─────────────────
const DEMO_SERVICES = [
  {
    id: "svc-1",
    title: "Private Choreography",
    description:
      "Book one-on-one sessions with our award-winning choreographers. Whether you're preparing for a competition, music video, or personal project — we'll craft a custom routine that highlights your strengths and pushes your movement vocabulary.",
    icon: "Music",
    price: "From $120 / session",
    features: [
      "Custom routine creation",
      "Video recording included",
      "Flexible scheduling",
      "All styles available",
    ],
  },
  {
    id: "svc-2",
    title: "Studio Space Rental",
    description:
      "Need a professional studio for rehearsals, content shoots, or private practice? Our climate-controlled spaces feature sprung floors, wall-to-wall mirrors, and premium sound systems — ready to book by the hour.",
    icon: "Building2",
    price: "From $65 / hour",
    features: [
      "3 studio rooms available",
      "Sprung hardwood floors",
      "Pro sound system & mirrors",
      "After-hours access available",
    ],
  },
  {
    id: "svc-3",
    title: "Wedding Dance Prep",
    description:
      "Make your first dance unforgettable. Our instructors work with couples of all experience levels to choreograph a wedding dance that feels natural, confident, and perfectly timed to your chosen song.",
    icon: "Heart",
    price: "From $250 / package",
    features: [
      "3–8 session packages",
      "Song editing included",
      "Partner & solo coaching",
      "Day-of rehearsal available",
    ],
  },
  {
    id: "svc-4",
    title: "Event & Performance Booking",
    description:
      "Bring the energy of Dazzle to your event. Our performance crew is available for corporate events, festivals, brand activations, and private parties — fully choreographed, costumed, and show-ready.",
    icon: "Mic2",
    price: "Custom quote",
    features: [
      "5–20 dancer crews",
      "Fully choreographed sets",
      "Custom themes & costumes",
      "Setup & sound coordination",
    ],
  },
  {
    id: "svc-5",
    title: "Group Workshops",
    description:
      "Perfect for team-building, birthday parties, or friend groups. Choose your style, and one of our instructors will lead a high-energy workshop tailored to your group's level and vibe.",
    icon: "Users",
    price: "From $350 / group",
    features: [
      "1–3 hour sessions",
      "Up to 30 participants",
      "All skill levels welcome",
      "Multiple styles available",
    ],
  },
  {
    id: "svc-6",
    title: "Content Creation Studio",
    description:
      "Creators and influencers — our space is Instagram and TikTok ready. Book a studio with ring lights, backdrop options, and Bluetooth speakers for your next dance content shoot.",
    icon: "Camera",
    price: "From $45 / hour",
    features: [
      "Ring light & lighting kit",
      "Colored backdrop options",
      "Bluetooth speaker included",
      "Tripod & phone mount available",
    ],
  },
];

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
            href="mailto:hello@dazzledance.com?subject=Inquiry: "
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
  const services = DEMO_SERVICES;

  return (
    <div className="services-page">
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
            <a href="mailto:hello@dazzledance.com" className="svc-contact-pill">
              <Mail size={14} strokeWidth={2} />
              hello@dazzledance.com
            </a>
            <a href="tel:+15551234567" className="svc-contact-pill">
              <Phone size={14} strokeWidth={2} />
              +1 (555) 123-4567
            </a>
          </div>
        </div>
        <div className="svc-hero-bar" aria-hidden="true" />
      </header>

      <main className="svc-container">
        {/* ── Service Grid ── */}
        <div className="svc-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="svc-bottom-cta">
          <h2 className="svc-bottom-title">
            Have something custom in mind?
          </h2>
          <p className="svc-bottom-desc">
            We love creative briefs. Reach out and let's build something
            unforgettable together.
          </p>
          <a
            href="mailto:hello@dazzledance.com?subject=Custom Inquiry"
            className="svc-btn-primary"
            id="services-custom-inquiry"
          >
            <Mail size={16} strokeWidth={2} />
            Get in Touch
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </main>
    </div>
  );
}
