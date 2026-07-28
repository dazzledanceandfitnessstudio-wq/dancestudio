// components/ReviewSlider.js
"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function ReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Kathak Student",
      avatar: "PS",
      rating: 5,
      text: "Dazzle Studio has transformed my dancing journey. The Kathak training is exceptional, and the instructors are incredibly knowledgeable and patient. I've grown so much as a dancer!",
      date: "December 2024",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Aarav Patel",
      role: "Hip Hop Dancer",
      avatar: "AP",
      rating: 5,
      text: "The energy at Dazzle Studio is unmatched! The hip hop classes are amazing and the community is so supportive. Best dance studio I've ever been to.",
      date: "November 2024",
      location: "Delhi"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      role: "Contemporary Dancer",
      avatar: "SR",
      rating: 5,
      text: "I've been dancing at Dazzle for 2 years now and it's been an incredible journey. The contemporary classes push me to explore new movements and express myself better.",
      date: "October 2024",
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Ballet Student",
      avatar: "VS",
      rating: 5,
      text: "The ballet training at Dazzle Studio is world-class. The attention to technique and form is outstanding. I feel more confident and graceful with each class.",
      date: "September 2024",
      location: "Chennai"
    },
    {
      id: 5,
      name: "Ananya Gupta",
      role: "Parent of Student",
      avatar: "AG",
      rating: 5,
      text: "My daughter has been learning Kathak at Dazzle Studio and the transformation is remarkable. The structured curriculum and caring teachers make all the difference.",
      date: "August 2024",
      location: "Pune"
    },
    {
      id: 6,
      name: "Rahul Verma",
      role: "Street Dance Enthusiast",
      avatar: "RV",
      rating: 5,
      text: "Best decision I made was joining Dazzle Studio. The street dance classes are fire and the instructors bring out the best in every student. Highly recommend!",
      date: "July 2024",
      location: "Hyderabad"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }
    
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(prev => prev === 0 ? reviews.length - 1 : prev - 1);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev === reviews.length - 1 ? 0 : prev + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);
  const remaining = 3 - visibleReviews.length;
  const extendedReviews = [...visibleReviews, ...reviews.slice(0, remaining)];

  return (
    <section className="review-section">
      <div className="review-container">
        {/* Section Header */}
        <div className="review-header">
          <span className="review-eyebrow">💫 Testimonials</span>
          <h2 className="review-title">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="review-subtitle">
            Real stories from our amazing dance community
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="review-grid">
          {extendedReviews.map((review, index) => (
            <div key={`${review.id}-${index}`} className="review-card">
              <div className="review-card-content">
                {/* Quote Icon */}
                <div className="review-quote-icon">
                  <Quote size={32} />
                </div>

                {/* Rating Stars */}
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`review-star ${i < review.rating ? 'filled' : ''}`}
                      fill={i < review.rating ? '#FF1F6D' : 'none'}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="review-text">"{review.text}"</p>

                {/* Reviewer Info */}
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.avatar}
                  </div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.name}</div>
                    <div className="reviewer-role">{review.role}</div>
                    <div className="reviewer-meta">
                      <span className="reviewer-location">{review.location}</span>
                      <span className="reviewer-date">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="review-controls">
          <button 
            className="review-nav-btn"
            onClick={handlePrevious}
            aria-label="Previous reviews"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="review-dots">
            {reviews.slice(0, Math.ceil(reviews.length / 3)).map((_, index) => (
              <button
                key={index}
                className={`review-dot ${currentIndex === index * 3 ? 'active' : ''}`}
                onClick={() => goToSlide(index * 3)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            className="review-nav-btn"
            onClick={handleNext}
            aria-label="Next reviews"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style jsx>{`
        /* ============================================================
           REVIEW SECTION
           ============================================================ */
        .review-section {
          padding: 4rem 0 5rem;
          background: var(--background);
          color: var(--foreground);
          border-top: 1px solid var(--border);
        }

        .review-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        .review-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .review-eyebrow {
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
          margin-bottom: 1rem;
        }

        .review-title {
          font-family: 'Poppins', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0 0 0.75rem;
          line-height: 1.15;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .review-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.0625rem;
          color: var(--body-text);
          line-height: 1.65;
          margin: 0;
        }

        /* Review Grid */
        .review-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .review-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          animation: fadeInUp 0.5s ease-out;
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 31, 109, 0.2);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .review-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .review-quote-icon {
          color: rgba(255, 31, 109, 0.15);
          margin-bottom: -0.25rem;
        }

        .review-stars {
          display: flex;
          gap: 0.25rem;
        }

        .review-star {
          color: #D1D1D6;
          transition: color 0.2s ease-out;
        }

        .review-star.filled {
          color: #FF1F6D;
        }

        .review-text {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--body-text);
          margin: 0;
          font-style: italic;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }

        .reviewer-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .reviewer-details {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          flex: 1;
        }

        .reviewer-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: var(--foreground);
        }

        .reviewer-role {
          font-size: 0.8125rem;
          color: var(--muted);
        }

        .reviewer-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.6875rem;
          color: var(--muted);
          margin-top: 0.125rem;
        }

        .reviewer-location::after {
          content: '•';
          margin-left: 0.75rem;
        }

        /* Controls */
        .review-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .review-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--foreground);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease-out;
        }

        .review-nav-btn:hover {
          background: var(--foreground);
          color: var(--background);
          border-color: var(--foreground);
        }

        .review-dots {
          display: flex;
          gap: 0.5rem;
        }

        .review-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: var(--border);
          cursor: pointer;
          transition: all 0.3s ease-out;
        }

        .review-dot.active {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          width: 28px;
          border-radius: 999px;
        }

        /* Responsive */
        @media (min-width: 640px) {
          .review-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .review-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .review-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .review-card {
            padding: 1.25rem;
          }
          .review-text {
            font-size: 0.875rem;
          }
          .reviewer-avatar {
            width: 40px;
            height: 40px;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
}