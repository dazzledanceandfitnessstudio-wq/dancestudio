// components/KathakSection.js
"use client";

import { useState, useRef } from 'react';
import { Play, Pause, Maximize2, X, ChevronLeft, ChevronRight, Award, Clock, Users, Star, GraduationCap, Music, Heart, Sparkles } from 'lucide-react';

export default function KathakSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef(null);

  const kathakImages = [
    { id: 1, src: '/kathak/kathak-1.jpg', alt: 'Kathak Performance' },
    { id: 2, src: '/kathak/kathak-2.jpg', alt: 'Kathak Dance Pose' },
    { id: 3, src: '/kathak/kathak-3.jpg', alt: 'Kathak Training' },
    { id: 4, src: '/kathak/kathak-4.jpg', alt: 'Kathak Presentation' },
    { id: 5, src: '/kathak/kathak-5.jpg', alt: 'Kathak Rhythms' },
    { id: 6, src: '/kathak/kathak-6.jpg', alt: 'Kathak Expressions' }
  ];

  const features = [
    {
      icon: Award,
      title: 'Expert Training',
      description: 'Learn from experienced and dedicated Kathak trainers'
    },
    {
      icon: Users,
      title: 'All Ages Welcome',
      description: 'From 4 years to seniors - dance is for everyone'
    },
    {
      icon: Star,
      title: 'Structured Curriculum',
      description: 'From beginner to advanced with personalized attention'
    },
    {
      icon: Music,
      title: 'Authentic Tradition',
      description: 'Preserving the rich heritage of Indian classical dance'
    },
    {
      icon: GraduationCap,
      title: 'Degree Programs',
      description: 'BPA, BA, MA & Diploma in Kathak available'
    },
    {
      icon: Heart,
      title: 'Supportive Environment',
      description: 'Warm and inspiring learning atmosphere'
    }
  ];

  const courses = [
    'Kathak Dance Training',
    'Semi-Classical Dance Training',
    'Basic to Advanced Level Courses',
    'Stage Performance Preparation',
    'Examination & Certification Guidance',
    'Degree & Diploma Programs'
  ];

  const degrees = [
    'BPA (Bachelor of Performing Arts)',
    'BA in Kathak',
    'MA in Kathak',
    'Diploma in Kathak'
  ];

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex(prev => prev === kathakImages.length - 1 ? 0 : prev + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? kathakImages.length - 1 : prev - 1);
  };

  // Video controls
  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
    if (isVideoOpen) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="kathak-section">
      <div className="kathak-container">
        {/* Kathak Header with Video */}
        <div className="kathak-hero">
          <div className="kathak-hero-content">
            <div className="kathak-badge">🕉️ Classical Dance</div>
            <h1 className="kathak-title">
              <span className="kathak-subtitle">DAZZLE DANCE & FITNESS STUDIO</span>
              <span className="kathak-welcome">Welcomes you to</span>
              <span className="kathak-name">प्रियांगन कथक केंद्र</span>
              <span className="kathak-tagline">Grace • Rhythm • Tradition</span>
            </h1>
            
            <p className="kathak-description">
              where the rich heritage of Kathak meets professional training in a warm and
              inspiring environment. We are dedicated to nurturing students of all ages
              through structured learning, expert guidance, and authentic classical dance
              education.
            </p>
            <p className="kathak-description">
              Whether you are a beginner or an advanced learner, our courses are designed to
              help you develop rhythm, expression, posture, confidence, and stage presence
              while preserving the beauty and traditions of Indian classical dance.
            </p>

            {/* Video Button */}
            <button className="kathak-video-btn" onClick={toggleVideo}>
              <div className="video-btn-icon">
                <Play size={24} fill="white" />
              </div>
              <span>Watch Kathak Performance</span>
            </button>
          </div>

          {/* Kathak Image Grid */}
          <div className="kathak-image-grid">
            <div className="kathak-main-image">
              <div className="image-placeholder">
                <span className="image-placeholder-icon">💃</span>
              </div>
              <button className="image-nav-btn image-nav-prev" onClick={prevImage}>
                <ChevronLeft size={20} />
              </button>
              <button className="image-nav-btn image-nav-next" onClick={nextImage}>
                <ChevronRight size={20} />
              </button>
              <div className="image-counter">
                {currentImageIndex + 1} / {kathakImages.length}
              </div>
            </div>
            <div className="kathak-thumbnails">
              {kathakImages.slice(0, 4).map((img, index) => (
                <div 
                  key={img.id} 
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="thumbnail-placeholder">
                    <span className="thumbnail-icon">🎭</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="kathak-features">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Courses & Degrees */}
        <div className="kathak-courses-section">
          <div className="kathak-courses">
            <h2 className="section-subtitle">Our Courses</h2>
            <ul className="course-list">
              {courses.map((course, index) => (
                <li key={index} className="course-item">
                  <span className="course-bullet">✦</span>
                  {course}
                </li>
              ))}
            </ul>
          </div>

          <div className="kathak-degrees">
            <h2 className="section-subtitle">Higher Education</h2>
            <p className="degree-intro">
              Students can also pursue recognized higher education in Kathak through:
            </p>
            <ul className="degree-list">
              {degrees.map((degree, index) => (
                <li key={index} className="degree-item">
                  <span className="degree-bullet">📜</span>
                  {degree}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Age Eligibility */}
        <div className="kathak-eligibility">
          <div className="eligibility-card">
            <div className="eligibility-icon">🎯</div>
            <div className="eligibility-content">
              <h3>Age Eligibility</h3>
              <p><strong>Age:</strong> 4 years and above</p>
              <p><strong>No upper age limit</strong> – Dance is for everyone, regardless of age or experience.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="kathak-why-choose">
          <h2 className="section-title">Why Choose Priyaangan Kathak Kendra?</h2>
          <div className="why-choose-grid">
            <div className="why-item">
              <span className="why-icon">✅</span>
              Experienced and dedicated trainers
            </div>
            <div className="why-item">
              <span className="why-icon">✅</span>
              Personalized attention for every student
            </div>
            <div className="why-item">
              <span className="why-icon">✅</span>
              Structured curriculum from beginner to advanced levels
            </div>
            <div className="why-item">
              <span className="why-icon">✅</span>
              Focus on technique, rhythm, expressions, and stage confidence
            </div>
            <div className="why-item">
              <span className="why-icon">✅</span>
              Opportunities for stage performances, competitions, and examinations
            </div>
            <div className="why-item">
              <span className="why-icon">✅</span>
              Supportive and inspiring learning environment
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="video-modal" onClick={toggleVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={toggleVideo}>
              <X size={24} />
            </button>
            <div className="video-wrapper">
              <video 
                ref={videoRef}
                className="kathak-video-player"
                controls
                playsInline
                poster="/kathak/video-poster.jpg"
              >
                <source src="/kathak/kathak-performance.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button className="video-play-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={48} /> : <Play size={48} />}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ============================================================
           KATHAK SECTION
           ============================================================ */
        .kathak-section {
          padding: 4rem 0 5rem;
          background: var(--background);
          color: var(--foreground);
        }

        .kathak-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        /* Hero */
        .kathak-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }

        .kathak-hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .kathak-badge {
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
          width: fit-content;
        }

        .kathak-title {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin: 0;
        }

        .kathak-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .kathak-welcome {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--body-text);
          margin-top: 0.5rem;
        }

        .kathak-name {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .kathak-tagline {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: 0.02em;
        }

        .kathak-description {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--body-text);
          margin: 0;
        }

        .kathak-video-btn {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.9375rem;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
          box-shadow: 0 4px 20px rgba(255, 31, 109, 0.25);
          width: fit-content;
        }

        .kathak-video-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(255, 31, 109, 0.35);
        }

        .video-btn-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Image Grid */
        .kathak-image-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .kathak-main-image {
          position: relative;
          aspect-ratio: 16/10;
          border-radius: 14px;
          overflow: hidden;
          background: var(--surface-alt);
          border: 1px solid var(--border);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
        }

        .image-placeholder-icon {
          font-size: 4rem;
          opacity: 0.3;
        }

        .image-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: #FFFFFF;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease-out;
          backdrop-filter: blur(4px);
        }

        .image-nav-btn:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        .image-nav-prev {
          left: 0.75rem;
        }

        .image-nav-next {
          right: 0.75rem;
        }

        .image-counter {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          background: rgba(0, 0, 0, 0.6);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }

        .kathak-thumbnails {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        .thumbnail {
          aspect-ratio: 4/3;
          border-radius: 10px;
          overflow: hidden;
          background: var(--surface-alt);
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.25s ease-out, transform 0.25s ease-out;
        }

        .thumbnail:hover {
          transform: scale(1.02);
        }

        .thumbnail.active {
          border-color: #FF1F6D;
        }

        .thumbnail-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thumbnail-icon {
          font-size: 1.5rem;
          opacity: 0.3;
        }

        /* Features */
        .kathak-features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin: 3rem 0;
        }

        .feature-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
        }

        .feature-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 31, 109, 0.07);
          color: #FF1F6D;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .feature-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 0.375rem;
        }

        .feature-description {
          font-size: 0.875rem;
          color: var(--body-text);
          line-height: 1.5;
          margin: 0;
        }

        /* Courses Section */
        .kathak-courses-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin: 3rem 0;
        }

        .section-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 1rem;
        }

        .course-list,
        .degree-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .course-item,
        .degree-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9375rem;
          color: var(--body-text);
          padding: 0.625rem 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: all 0.2s ease-out;
        }

        .course-item:hover,
        .degree-item:hover {
          border-color: rgba(255, 31, 109, 0.2);
          transform: translateX(4px);
        }

        .course-bullet {
          color: #FF1F6D;
          font-size: 1.125rem;
        }

        .degree-bullet {
          font-size: 1.125rem;
        }

        .degree-intro {
          font-size: 0.9375rem;
          color: var(--body-text);
          margin: 0 0 1rem;
        }

        /* Eligibility */
        .kathak-eligibility {
          margin: 3rem 0;
        }

        .eligibility-card {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
        }

        .eligibility-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .eligibility-content h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 0.5rem;
        }

        .eligibility-content p {
          font-size: 0.9375rem;
          color: var(--body-text);
          margin: 0 0 0.25rem;
          line-height: 1.6;
        }

        .eligibility-content p strong {
          color: var(--foreground);
        }

        /* Why Choose */
        .kathak-why-choose {
          margin: 3rem 0 0;
        }

        .section-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--foreground);
          text-align: center;
          margin: 0 0 1.5rem;
        }

        .why-choose-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        .why-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 0.9375rem;
          color: var(--body-text);
          transition: all 0.2s ease-out;
        }

        .why-item:hover {
          transform: translateX(4px);
          border-color: rgba(255, 31, 109, 0.2);
        }

        .why-icon {
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        /* Video Modal */
        .video-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .video-modal-content {
          position: relative;
          width: 100%;
          max-width: 900px;
        }

        .video-modal-close {
          position: absolute;
          top: -3.5rem;
          right: 0;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #FFFFFF;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease-out;
          z-index: 10;
        }

        .video-modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .video-wrapper {
          position: relative;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
        }

        .kathak-video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #FFFFFF;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease-out;
          backdrop-filter: blur(4px);
        }

        .video-play-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translate(-50%, -50%) scale(1.05);
        }

        /* Responsive */
        @media (min-width: 640px) {
          .kathak-features {
            grid-template-columns: repeat(2, 1fr);
          }
          .kathak-courses-section {
            grid-template-columns: 1fr 1fr;
          }
          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .kathak-hero {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          .kathak-features {
            grid-template-columns: repeat(3, 1fr);
          }
          .why-choose-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .kathak-name {
            font-size: 3.5rem;
          }
          .kathak-subtitle {
            font-size: 1.5rem;
          }
          .kathak-welcome {
            font-size: 1.75rem;
          }
          .kathak-tagline {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .kathak-name {
            font-size: 2rem;
          }
          .kathak-subtitle {
            font-size: 1rem;
          }
          .kathak-welcome {
            font-size: 1.125rem;
          }
          .kathak-tagline {
            font-size: 1.125rem;
          }
          .eligibility-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .video-play-btn {
            width: 60px;
            height: 60px;
          }
          .video-play-btn svg {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </section>
  );
}