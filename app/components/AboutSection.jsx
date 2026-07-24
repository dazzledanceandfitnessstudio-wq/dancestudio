"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-grid">
          {/* Image Column */}
          <div className="about-image-col">
            <div className="about-image-wrapper">
              <Image
                src="/priya-thakur.jpg"
                alt="Priya Thakur - Founder of Dazzle Dance Studio"
                width={500}
                height={600}
                className="about-image"
                priority
              />
              <div className="about-image-overlay">
                <span className="about-founder-tag">Founder</span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="about-text-col">
            <div className="about-badge">About Us</div>
            <h2 className="about-title">
              Where Passion Meets
              <span className="about-title-highlight"> Performance</span>
            </h2>
            <p className="about-description">
              At Dazzle Dance & Fitness Studio, Jabalpur, we believe that dance is more than just movement — 
              it's a way of life. Founded by <strong>Priya Thakur</strong>, a passionate dancer and choreographer 
              with over a decade of experience, our studio is dedicated to transforming passion into performance.
            </p>
            <p className="about-description">
              We offer structured training programs for all ages and skill levels, from beginners taking their 
              first steps to advanced dancers preparing for professional careers. Our curriculum blends 
              traditional techniques with contemporary styles, ensuring every student finds their unique rhythm.
            </p>
            
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-number">10+</span>
                <span className="about-stat-label">Years Experience</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">500+</span>
                <span className="about-stat-label">Students Trained</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">20+</span>
                <span className="about-stat-label">Dance Styles</span>
              </div>
            </div>

            <div className="about-features">
              <div className="about-feature">
                <span className="about-feature-icon">🎯</span>
                <span>Personalized Training</span>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">🏆</span>
                <span>Competition Ready</span>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">🎭</span>
                <span>Stage Performance</span>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">📜</span>
                <span>Certification Programs</span>
              </div>
            </div>

            <a href="/about" className="about-cta-btn">
              Learn More About Us
              <svg className="about-cta-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.8333 4.16669L15.8333 10L10.8333 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 5rem 1.5rem;
          background: var(--background);
          /* REMOVED: border-top and border-bottom to eliminate the thin line */
        }
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .about-image-col {
          position: relative;
        }
        .about-image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .about-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }
        .about-image-wrapper:hover .about-image {
          transform: scale(1.03);
        }
        .about-image-overlay {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(255,31,109,0.9);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          backdrop-filter: blur(8px);
        }
        .about-founder-tag {
          color: #fff;
          font-weight: 700;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .about-text-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .about-badge {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF1F6D;
          background: rgba(255,31,109,0.07);
          padding: 0.3rem 1rem;
          border-radius: 50px;
          width: fit-content;
        }
        .about-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--foreground);
          line-height: 1.15;
          margin: 0;
        }
        .about-title-highlight {
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-description {
          font-size: 1rem;
          color: var(--body-text);
          line-height: 1.8;
          margin: 0;
        }
        .about-description strong {
          color: var(--foreground);
        }
        .about-stats {
          display: flex;
          gap: 2.5rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        .about-stat-number {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--foreground);
          line-height: 1;
        }
        .about-stat-label {
          font-size: 0.75rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .about-feature {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
        }
        .about-feature-icon {
          font-size: 1.125rem;
        }
        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--gradient-cta);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.875rem 2rem;
          border-radius: 14px;
          text-decoration: none;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
          box-shadow: 0 4px 15px rgba(255,31,109,0.25);
          width: fit-content;
        }
        .about-cta-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(255,31,109,0.35);
        }
        .about-cta-icon {
          transition: transform 0.2s ease;
        }
        .about-cta-btn:hover .about-cta-icon {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .about-grid {
            gap: 2.5rem;
          }
          .about-title {
            font-size: 2rem;
          }
        }
        @media (max-width: 768px) {
          .about-section {
            padding: 3rem 1.25rem;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .about-image-col {
            order: -1;
          }
          .about-image-wrapper {
            max-width: 400px;
            margin: 0 auto;
          }
          .about-stats {
            gap: 1.5rem;
            flex-wrap: wrap;
          }
          .about-features {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }
          .about-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .about-title {
            font-size: 1.5rem;
          }
          .about-features {
            grid-template-columns: 1fr;
          }
          .about-stats {
            flex-direction: column;
            gap: 0.75rem;
          }
          .about-stat {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}</style>
    </section>
  );
}