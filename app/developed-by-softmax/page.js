// app/developed-by-softmax/page.js
"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Zap, CheckCircle, Code, Smartphone, Database, Shield } from "lucide-react";

export default function DevelopedBySoftmaxPage() {
  return (
    <div className="softmax-page">
      <div className="sm-container">
        {/* Header */}
        <div className="sm-header">
          <div className="sm-badge">
            <Zap size={14} />
            Developed By
          </div>
          <h1 className="sm-title">
            <span className="sm-gradient">Softmax</span> Technologies
          </h1>
          <p className="sm-subtitle">
            Indore's Fastest Growing Software Company — Quality Software Without The High Cost
          </p>
        </div>

        {/* Quick Stats */}
        <div className="sm-stats">
          <div className="sm-stat">
            <span className="sm-stat-num">150+</span>
            <span className="sm-stat-label">Projects</span>
          </div>
          <div className="sm-stat-divider" />
          <div className="sm-stat">
            <span className="sm-stat-num">40%</span>
            <span className="sm-stat-label">More Affordable</span>
          </div>
          <div className="sm-stat-divider" />
          <div className="sm-stat">
            <span className="sm-stat-num">5-7</span>
            <span className="sm-stat-label">Day Prototype</span>
          </div>
          <div className="sm-stat-divider" />
          <div className="sm-stat">
            <span className="sm-stat-num">98%</span>
            <span className="sm-stat-label">Satisfaction</span>
          </div>
        </div>

        {/* Services */}
        <div className="sm-services">
          <h2 className="sm-section-title">What We Build</h2>
          <div className="sm-services-grid">
            <div className="sm-service">
              <Code size={28} />
              <h3>Web Development</h3>
              <p>React, Next.js, Node.js</p>
            </div>
            <div className="sm-service">
              <Smartphone size={28} />
              <h3>Mobile Apps</h3>
              <p>Flutter, iOS, Android</p>
            </div>
            <div className="sm-service">
              <Database size={28} />
              <h3>AI & Automation</h3>
              <p>Python, ML, OpenAI</p>
            </div>
            <div className="sm-service">
              <Shield size={28} />
              <h3>MVP & Startup</h3>
              <p>Rapid Development</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="sm-links">
          <a 
            href="https://softmax.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="sm-btn-primary"
          >
            Visit Softmax.in
            <ExternalLink size={18} />
          </a>
          <a 
            href="https://clients.softmax.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="sm-btn-secondary"
          >
            Client Portal
            <ExternalLink size={16} />
          </a>
          <a 
            href="https://instagram.com/softmax.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="sm-btn-secondary"
          >
            Instagram
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Footer */}
        <div className="sm-footer">
          <p>© 2026 Softmax Technologies & IT Services, Indore</p>
          <div className="sm-footer-links">
            <a href="https://softmax.in" target="_blank" rel="noopener noreferrer">softmax.in</a>
            <span>·</span>
            <a href="https://clients.softmax.in" target="_blank" rel="noopener noreferrer">clients.softmax.in</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .softmax-page {
          min-height: 100vh;
          background: #0A0A0F;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'Inter', sans-serif;
        }

        .sm-container {
          max-width: 800px;
          width: 100%;
          background: #111118;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        /* Header */
        .sm-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .sm-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.1);
          padding: 0.25rem 0.875rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }

        .sm-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0 0 0.5rem;
          line-height: 1.1;
        }

        .sm-gradient {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sm-subtitle {
          font-size: 0.9375rem;
          color: #888888;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Stats */
        .sm-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem 2rem;
          flex-wrap: wrap;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 2rem;
        }

        .sm-stat {
          text-align: center;
        }

        .sm-stat-num {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .sm-stat-label {
          font-size: 0.7rem;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sm-stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.05);
        }

        /* Services */
        .sm-services {
          margin-bottom: 2rem;
        }

        .sm-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          text-align: center;
          margin: 0 0 1.25rem;
          color: #FFFFFF;
        }

        .sm-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .sm-service {
          background: #1A1A2E;
          border-radius: 12px;
          padding: 1.25rem 1rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease-out;
        }

        .sm-service:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 31, 109, 0.2);
        }

        .sm-service svg {
          color: #FF1F6D;
          margin-bottom: 0.5rem;
        }

        .sm-service h3 {
          font-size: 0.875rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
        }

        .sm-service p {
          font-size: 0.75rem;
          color: #666666;
          margin: 0;
        }

        /* Links */
        .sm-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sm-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.875rem;
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s ease-out;
          box-shadow: 0 4px 15px rgba(255, 31, 109, 0.25);
        }

        .sm-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(255, 31, 109, 0.35);
        }

        .sm-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.6rem 1.5rem;
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s ease-out;
        }

        .sm-btn-secondary:hover {
          border-color: #7B2FFF;
          background: rgba(123, 47, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Footer */
        .sm-footer {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sm-footer p {
          font-size: 0.75rem;
          color: #444444;
          margin: 0 0 0.5rem;
        }

        .sm-footer-links {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          font-size: 0.75rem;
          color: #444444;
        }

        .sm-footer-links a {
          color: #666666;
          text-decoration: none;
          transition: color 0.2s ease-out;
        }

        .sm-footer-links a:hover {
          color: #FFFFFF;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .sm-container { padding: 1.5rem 1rem; }
          .sm-title { font-size: 2rem; }
          .sm-services-grid { grid-template-columns: 1fr 1fr; }
          .sm-links { flex-direction: column; align-items: stretch; }
          .sm-btn-primary, .sm-btn-secondary { justify-content: center; }
          .sm-stats { gap: 0.5rem 1rem; }
          .sm-stat-num { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  );
}