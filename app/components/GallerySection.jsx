"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      src: "/gallery/dance-class-1.jpg",
      alt: "Dance class at Dazzle Studio",
      title: "Hip-Hop Workshop"
    },
    {
      src: "/gallery/dance-class-2.jpg",
      alt: "Students performing",
      title: "Annual Performance 2024"
    },
    {
      src: "/gallery/dance-class-3.jpg",
      alt: "Group dance session",
      title: "Bollywood Fusion"
    },
    {
      src: "/gallery/dance-class-4.jpg",
      alt: "Kathak dance class",
      title: "Kathak Certification"
    },
    {
      src: "/gallery/dance-class-5.jpg",
      alt: "Wedding choreography",
      title: "Wedding Special"
    },
    {
      src: "/gallery/dance-class-6.jpg",
      alt: "Kids dance class",
      title: "Kids Dance Program"
    }
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <div className="gallery-badge">📸 Gallery</div>
          <h2 className="gallery-title">
            Dance <span className="gallery-title-highlight">Moments</span>
          </h2>
          <p className="gallery-subtitle">
            Capturing the energy, passion, and joy of our dance community
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-image-wrapper">
                <div className="gallery-image-placeholder">
                  <span className="gallery-image-emoji">💃</span>
                  <span className="gallery-image-title">{image.title}</span>
                </div>
                <div className="gallery-image-overlay">
                  <span className="gallery-image-label">{image.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage !== null && (
          <div 
            className="gallery-lightbox"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="gallery-lightbox-close"
              onClick={closeLightbox}
            >
              <X size={28} />
            </button>
            <button
              className="gallery-lightbox-nav gallery-lightbox-prev"
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="gallery-lightbox-nav gallery-lightbox-next"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
            >
              <ChevronRight size={32} />
            </button>
            <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <div className="gallery-lightbox-image">
                <div className="gallery-lightbox-placeholder">
                  <span className="gallery-lightbox-emoji">💃</span>
                  <span className="gallery-lightbox-title">
                    {galleryImages[currentIndex].title}
                  </span>
                </div>
              </div>
              <div className="gallery-lightbox-info">
                <h3>{galleryImages[currentIndex].title}</h3>
                <p>{currentIndex + 1} / {galleryImages.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .gallery-section {
          padding: 5rem 1.5rem;
          background: var(--background);
          /* CHANGED: Now matches the About section background */
        }
        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .gallery-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF1F6D;
          background: rgba(255,31,109,0.07);
          padding: 0.3rem 1rem;
          border-radius: 50px;
        }
        .gallery-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--foreground);
          margin: 0.5rem 0 0.5rem;
        }
        .gallery-title-highlight {
          background: linear-gradient(135deg, #FF1F6D, #7B2FFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gallery-subtitle {
          font-size: 1rem;
          color: var(--body-text);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .gallery-item {
          aspect-ratio: 4/3;
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-item:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        .gallery-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          background: var(--gradient-primary);
        }
        .gallery-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          gap: 0.5rem;
        }
        .gallery-image-emoji {
          font-size: 3rem;
        }
        .gallery-image-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.9);
        }
        .gallery-image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gallery-item:hover .gallery-image-overlay {
          opacity: 1;
        }
        .gallery-image-label {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.875rem;
          color: #fff;
        }

        .gallery-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .gallery-lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .gallery-lightbox-close:hover {
          background: rgba(255,255,255,0.2);
        }
        .gallery-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .gallery-lightbox-nav:hover {
          background: rgba(255,255,255,0.2);
        }
        .gallery-lightbox-prev {
          left: 1.5rem;
        }
        .gallery-lightbox-next {
          right: 1.5rem;
        }
        .gallery-lightbox-content {
          max-width: 800px;
          width: 100%;
        }
        .gallery-lightbox-image {
          aspect-ratio: 4/3;
          background: var(--gradient-primary);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gallery-lightbox-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: rgba(255,255,255,0.7);
        }
        .gallery-lightbox-emoji {
          font-size: 5rem;
        }
        .gallery-lightbox-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          color: rgba(255,255,255,0.9);
        }
        .gallery-lightbox-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.25rem;
          color: #fff;
        }
        .gallery-lightbox-info h3 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.125rem;
          margin: 0;
        }
        .gallery-lightbox-info p {
          color: rgba(255,255,255,0.5);
          font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .gallery-section {
            padding: 3rem 1rem;
          }
          .gallery-title {
            font-size: 1.75rem;
          }
          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .gallery-lightbox-nav {
            width: 40px;
            height: 40px;
          }
          .gallery-lightbox-prev {
            left: 0.5rem;
          }
          .gallery-lightbox-next {
            right: 0.5rem;
          }
          .gallery-lightbox-close {
            top: 0.75rem;
            right: 0.75rem;
            width: 40px;
            height: 40px;
          }
          .gallery-lightbox-emoji {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}