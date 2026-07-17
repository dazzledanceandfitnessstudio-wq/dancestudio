"use client";

import Link from "next/link";
import { Zap, MapPin, ArrowRight, Loader2 } from "lucide-react";

export default function EventSlider({ events, loadingEvents, enrollingId, onEnrollClick }) {
  return (
    <section className="ld-section ld-container">
      <div className="ld-section-title">
        <Zap size={24} color="#FF1F6D" />
        <h2>Featured Classes</h2>
      </div>

      {loadingEvents ? (
        <div className="ld-slider" style={{ gap: "1.5rem" }}>
          {[1, 2, 3].map((i) => (
            <div className="ld-skeleton ld-skeleton-card" key={i} style={{ flex: "0 0 320px" }} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-muted)" }}>
          <p>New events coming soon!</p>
        </div>
      ) : (
        <div className="ld-slider-wrapper">
          <div className="ld-slider">
            {events.map((event) => (
              <div className="ld-slide-card" key={event.id}>
                <div className="ld-slide-banner">
                  {event.imageUrl && (
                    <img src={event.imageUrl} alt={event.title} loading="lazy" />
                  )}
                </div>
                <div className="ld-slide-body">
                  <h3 className="ld-slide-title">{event.title}</h3>
                  <p className="ld-slide-desc">{event.description}</p>
                  <div className="ld-slide-meta">
                    {event.danceStyle && (
                      <span style={{ color: "#FF1F6D", fontWeight: 600 }}>
                        {event.danceStyle}
                      </span>
                    )}
                    {event.level && <span>• {event.level}</span>}
                    {event.venue && (
                      <span>
                        <MapPin size={12} /> {event.venue}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ld-slide-footer">
                  <button
                    className="btn-enroll-neon"
                    style={{ width: "100%" }}
                    disabled={enrollingId === event.id}
                    onClick={() => onEnrollClick(event.id)}
                  >
                    {enrollingId === event.id ? (
                      <>
                        <Loader2 size={16} className="ld-spin" /> Enrolling…
                      </>
                    ) : (
                      <>
                        <Zap size={16} /> Enroll Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link href="/events" className="btn-secondary">
          More Events <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
