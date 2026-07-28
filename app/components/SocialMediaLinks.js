// components/SocialMediaLinks.js
"use client";

export default function SocialMediaLinks({ variant = 'horizontal' }) {
  const socialLinks = [
    {
      id: 'instagram1',
      platform: 'Instagram',
      handle: '@dazzlestudio',
      url: 'https://instagram.com/dazzlestudio',
      icon: 'instagram',
      color: '#E4405F',
      bgColor: 'rgba(228, 64, 95, 0.1)'
    },
    {
      id: 'instagram2',
      platform: 'Instagram',
      handle: '@priyaangan_kathak',
      url: 'https://instagram.com/priyaangan_kathak',
      icon: 'instagram',
      color: '#E4405F',
      bgColor: 'rgba(228, 64, 95, 0.1)'
    },
    {
      id: 'facebook',
      platform: 'Facebook',
      handle: 'Dazzle Studio',
      url: 'https://facebook.com/dazzlestudio',
      icon: 'facebook',
      color: '#1877F2',
      bgColor: 'rgba(24, 119, 242, 0.1)'
    },
    {
      id: 'youtube',
      platform: 'YouTube',
      handle: 'Dazzle Dance',
      url: 'https://youtube.com/dazzledance',
      icon: 'youtube',
      color: '#FF0000',
      bgColor: 'rgba(255, 0, 0, 0.1)'
    },
    {
      id: 'twitter',
      platform: 'Twitter',
      handle: '@dazzle_dance',
      url: 'https://twitter.com/dazzle_dance',
      icon: 'twitter',
      color: '#1DA1F2',
      bgColor: 'rgba(29, 161, 242, 0.1)'
    },
    {
      id: 'whatsapp',
      platform: 'WhatsApp',
      handle: '+91 98765 43210',
      url: 'https://wa.me/919876543210',
      icon: 'whatsapp',
      color: '#25D366',
      bgColor: 'rgba(37, 211, 102, 0.1)'
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
      value: 'info@dazzlestudio.com',
      href: 'mailto:info@dazzlestudio.com'
    },
    {
      icon: 'location',
      label: 'Location',
      value: 'Mumbai, India',
      href: 'https://maps.google.com'
    },
    {
      icon: 'website',
      label: 'Website',
      value: 'www.dazzlestudio.com',
      href: 'https://dazzlestudio.com'
    }
  ];

  // SVG Icon Components
  const SocialIcon = ({ name, color, size = 20 }) => {
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
    <div className={`social-links ${variant}`}>
      <div className="social-links-container">
        <div className="social-title">
          <h3>Connect With Us</h3>
          <p>Follow us on social media for updates and inspiration</p>
        </div>

        <div className="social-grid">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-item"
              style={{ '--hover-color': link.color }}
              aria-label={`Follow us on ${link.platform}`}
            >
              <div className="social-icon-wrapper" style={{ background: link.bgColor }}>
                <SocialIcon name={link.icon} color={link.color} size={22} />
              </div>
              <div className="social-link-info">
                <span className="social-platform">{link.platform}</span>
                <span className="social-handle">{link.handle}</span>
              </div>
              <span className="social-follow">Follow</span>
            </a>
          ))}
        </div>

        <div className="contact-grid">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="contact-item"
              target={item.label === 'Location' || item.label === 'Website' ? '_blank' : '_self'}
              rel={item.label === 'Location' || item.label === 'Website' ? 'noopener noreferrer' : ''}
            >
              <div className="contact-icon-wrapper">
                <SocialIcon name={item.icon} color="#FF1F6D" size={18} />
              </div>
              <div className="contact-info">
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .social-links {
          background: var(--surface);
          padding: 3rem 0 2rem;
          border-top: 1px solid var(--border);
        }

        .social-links-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        .social-title {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .social-title h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.5rem;
        }

        .social-title p {
          font-size: 1rem;
          color: var(--body-text);
          margin: 0;
        }

        .social-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .social-link-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1.25rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease-out;
          position: relative;
          overflow: hidden;
        }

        .social-link-item::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          background: var(--hover-color);
          transition: opacity 0.25s ease-out;
          pointer-events: none;
        }

        .social-link-item:hover::before {
          opacity: 0.05;
        }

        .social-link-item:hover {
          border-color: var(--hover-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .social-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease-out;
        }

        .social-link-item:hover .social-icon-wrapper {
          transform: scale(1.05);
        }

        .social-link-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          flex: 1;
        }

        .social-platform {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .social-handle {
          font-size: 0.75rem;
          color: var(--muted);
        }

        .social-follow {
          font-family: 'Poppins', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--hover-color);
          padding: 0.25rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          transition: all 0.2s ease-out;
          flex-shrink: 0;
        }

        .social-link-item:hover .social-follow {
          background: var(--hover-color);
          color: #FFFFFF;
          border-color: var(--hover-color);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1.25rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease-out;
        }

        .contact-item:hover {
          border-color: var(--foreground);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .contact-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(255, 31, 109, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF1F6D;
          flex-shrink: 0;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          flex: 1;
        }

        .contact-label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .contact-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
        }

        @media (min-width: 640px) {
          .social-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .social-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .contact-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 480px) {
          .social-link-item {
            padding: 0.75rem 1rem;
          }
          .social-platform {
            font-size: 0.75rem;
          }
          .social-handle {
            font-size: 0.6875rem;
          }
          .contact-item {
            padding: 0.75rem 1rem;
          }
          .contact-value {
            font-size: 0.8125rem;
          }
          .social-icon-wrapper {
            width: 38px;
            height: 38px;
          }
          .contact-icon-wrapper {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>
  );
}