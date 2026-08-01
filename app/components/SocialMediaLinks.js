"use client";

export default function SocialMediaLinks() {
  const socialLinks = [
    {
      id: 'facebook',
      platform: 'Facebook',
      handle: 'Dazzle Studio',
      url: 'https://facebook.com/dazzlestudio',
      icon: 'facebook',
      color: '#3B5998', // Classic Facebook Blue
    },
    {
      id: 'twitter',
      platform: 'Twitter',
      handle: '@dazzle_dance',
      url: 'https://twitter.com/dazzle_dance',
      icon: 'twitter',
      color: '#55ACEE', // Classic Twitter Light Blue
    },
    {
      id: 'instagram1',
      platform: 'Instagram',
      handle: '@dazzlestudio',
      url: 'https://instagram.com/dazzlestudio',
      icon: 'instagram',
      color: '#C13584', // Instagram Pink/Purple
    },
    {
      id: 'instagram2',
      platform: 'Priyaangan Kathak',
      handle: '@priyaangan_kathak',
      url: 'https://instagram.com/priyaangan_kathak',
      icon: 'instagram',
      color: '#E1306C', // Slightly different shade for the second one
    },
    {
      id: 'youtube',
      platform: 'YouTube',
      handle: 'Dazzle Dance',
      url: 'https://youtube.com/dazzledance',
      icon: 'youtube',
      color: '#FF0000', // YouTube Red
    },
    {
      id: 'whatsapp',
      platform: 'WhatsApp',
      handle: '+91 98765 43210',
      url: 'https://wa.me/919876543210',
      icon: 'whatsapp',
      color: '#25D366', // WhatsApp Green
    }
  ];

  const contactInfo = [
    {
      icon: 'phone',
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: 'email',
      label: 'Email',
      value: 'info@dazzlestudios.in',
      href: 'mailto:info@dazzlestudios.in'
    },
    {
      icon: 'location',
      label: 'Location',
      value: 'Jabalpur ,india',
      href: 'https://maps.google.com'
    },
    {
      icon: 'website',
      label: 'Website',
      value: 'www.dazzlestudios.in',
      href: 'https://dazzlestudios.in'
    }
  ];

  // SVG Icon Components
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
      twitter: (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      ),
      whatsapp: (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
      phone: (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      email: (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      location: (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      website: (
        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    };
    return icons[name] || null;
  };

  return (
    <div className="social-section-wrapper">
      <div className="social-links-container">
        
        {/* Main Inspired Social Header */}
        <div className="social-header-content">
          <h2>Follow us on Social</h2>
          <p>Looking for the latest industry insights, timely studio updates? Follow us on social:</p>
          
          {/* Circular Hover Icons (Gool Icons) */}
          <div className="social-circle-icons">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="circle-icon-link"
                style={{ '--brand-color': link.color }}
                aria-label={`Follow us on ${link.platform}`}
                title={`${link.platform} - ${link.handle}`}
              >
                <SocialIcon name={link.icon} color="#FFFFFF" size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Information Grid below */}
        {/* <div className="contact-info-grid">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="contact-card-item"
              target={item.label === 'Location' || item.label === 'Website' ? '_blank' : '_self'}
              rel={item.label === 'Location' || item.label === 'Website' ? 'noopener noreferrer' : ''}
            >
              <div className="contact-icon-mini">
                <SocialIcon name={item.icon} color="#FF1F6D" size={18} />
              </div>
              <div className="contact-text-group">
                <span className="contact-label-text">{item.label}</span>
                <span className="contact-value-text">{item.value}</span>
              </div>
            </a>
          ))}
        </div> */}

      </div>

      <style jsx>{`
        .social-section-wrapper {
          background: var(--surface, #FAFAFA);
          padding: 5rem 0 4rem;
          border-top: 1px solid var(--border);
        }

        .social-links-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ============================================================
           HEADER & CIRCULAR ICONS (Inspired by image_b3ecfd.png)
           ============================================================ */
        .social-header-content {
          text-align: center;
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .social-header-content h2 {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          // color: #111111;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }

        .social-header-content p {
          font-size: 1.125rem;
          // color: #555555;
          margin: 0 0 2rem;
          max-width: 600px;
          line-height: 1.6;
        }

        .social-circle-icons {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        /* The Round Icon Design with Hover Effect */
        .circle-icon-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%; /* Makes it totally round (gool) */
          background-color: var(--brand-color);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Smooth bounce transition */
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          color: white;
        }

        .circle-icon-link:hover {
          transform: translateY(-8px) scale(1.1); /* Lifts up and scales up */
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
          filter: brightness(1.1); /* Makes the color pop slightly */
        }

        /* ============================================================
           CONTACT INFO GRID
           ============================================================ */
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1rem;
          width: 100%;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding-top: 3rem;
        }

        .contact-card-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease-out;
        }

        .contact-card-item:hover {
          border-color: #FF1F6D;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 31, 109, 0.08);
        }

        .contact-icon-mini {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 31, 109, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-text-group {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .contact-label-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #888888;
        }

        .contact-value-text {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #222222;
        }

        /* ============================================================
           RESPONSIVE DESIGN
           ============================================================ */
        @media (min-width: 640px) {
          .contact-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .contact-info-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 480px) {
          .social-header-content h2 {
            font-size: 2rem;
          }
          
          .social-header-content p {
            font-size: 0.9375rem;
          }
          
          .circle-icon-link {
            width: 50px;
            height: 50px;
          }

          .contact-card-item {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}