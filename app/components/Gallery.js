// components/Gallery.js
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Play, Pause, 
  Heart, Share2, Download, Loader2, AlertTriangle 
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  increment,
  onSnapshot,
  where,
  Timestamp
} from 'firebase/firestore';
import { authService } from '../../lib/firebaseService';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [likedImages, setLikedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [likeCounts, setLikeCounts] = useState({});
  
  const autoPlayRef = useRef(null);

  // ─── Get Current User ───
  useEffect(() => {
    const getUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    };
    getUser();
  }, []);

  // ─── Fetch Gallery Images from Firestore ───
  useEffect(() => {
    let unsubscribe = null;

    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Create query to get all gallery images sorted by date
        const galleryRef = collection(db, 'gallery');
        const q = query(galleryRef, orderBy('createdAt', 'desc'));
        
        // Real-time listener
        unsubscribe = onSnapshot(q, (snapshot) => {
          const imageData = [];
          const categorySet = new Set(['all']);
          
          snapshot.forEach((doc) => {
            const data = doc.data();
            const image = {
              id: doc.id,
              ...data,
              // Ensure date is formatted
              date: data.date || data.createdAt?.toDate?.()?.toISOString().split('T')[0] || '',
              likes: data.likes || 0,
              // Convert timestamp to Date if needed
              createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date()
            };
            imageData.push(image);
            
            // Add category to set
            if (data.category) {
              categorySet.add(data.category);
            }
          });
          
          setImages(imageData);
          setCategories([...categorySet]);
          
          // Initialize like counts
          const counts = {};
          imageData.forEach(img => {
            counts[img.id] = img.likes || 0;
          });
          setLikeCounts(counts);
          
          setLoading(false);
        }, (err) => {
          console.error('Error fetching gallery:', err);
          setError('Failed to load gallery images. Please try again.');
          setLoading(false);
        });

      } catch (err) {
        console.error('Error setting up gallery:', err);
        setError('Failed to load gallery images. Please try again.');
        setLoading(false);
      }
    };

    fetchGalleryImages();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // ─── Filter images based on selected category ───
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  // ─── Get current image for lightbox ───
  const currentImage = filteredImages[currentIndex] || null;

  // ─── Auto-play functionality ───
  useEffect(() => {
    if (isAutoPlay && isLightboxOpen && filteredImages.length > 1) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    } else {
      clearInterval(autoPlayRef.current);
    }
    
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, isLightboxOpen, currentIndex, filteredImages.length]);

  // ─── Handle like toggle ───
  const handleLike = useCallback(async (imageId) => {
    if (!user) {
      alert('Please sign in to like images');
      return;
    }

    const isLiked = likedImages.includes(imageId);
    const imageRef = doc(db, 'gallery', imageId);
    
    try {
      // Optimistic update
      setLikedImages(prev => {
        if (isLiked) {
          return prev.filter(id => id !== imageId);
        } else {
          return [...prev, imageId];
        }
      });

      setLikeCounts(prev => ({
        ...prev,
        [imageId]: isLiked ? (prev[imageId] || 0) - 1 : (prev[imageId] || 0) + 1
      }));

      // Update Firestore
      if (isLiked) {
        // Unlike: remove user from likedBy array and decrement likes
        await updateDoc(imageRef, {
          likes: increment(-1),
          likedBy: arrayRemove(user.uid)
        });
      } else {
        // Like: add user to likedBy array and increment likes
        await updateDoc(imageRef, {
          likes: increment(1),
          likedBy: arrayUnion(user.uid)
        });
      }
    } catch (err) {
      console.error('Error updating like:', err);
      // Revert optimistic update
      setLikedImages(prev => {
        if (isLiked) {
          return [...prev, imageId];
        } else {
          return prev.filter(id => id !== imageId);
        }
      });
      setLikeCounts(prev => ({
        ...prev,
        [imageId]: isLiked ? (prev[imageId] || 0) + 1 : (prev[imageId] || 0) - 1
      }));
      alert('Failed to update like. Please try again.');
    }
  }, [user, likedImages]);

  // ─── Check if user has liked an image ───
  const checkUserLikes = useCallback(async () => {
    if (!user || images.length === 0) return;

    try {
      const likedIds = [];
      for (const img of images) {
        if (img.likedBy && img.likedBy.includes(user.uid)) {
          likedIds.push(img.id);
        }
      }
      setLikedImages(likedIds);
    } catch (err) {
      console.error('Error checking likes:', err);
    }
  }, [user, images]);

  // ─── Check likes when user or images change ───
  useEffect(() => {
    checkUserLikes();
  }, [user, checkUserLikes]);

  // ─── Lightbox navigation ───
  const handlePrevious = () => {
    if (filteredImages.length === 0) return;
    setCurrentIndex(prev => prev === 0 ? filteredImages.length - 1 : prev - 1);
  };

  const handleNext = () => {
    if (filteredImages.length === 0) return;
    setCurrentIndex(prev => prev === filteredImages.length - 1 ? 0 : prev + 1);
  };

  // ─── Open lightbox ───
  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // ─── Close lightbox ───
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsAutoPlay(false);
    document.body.style.overflow = 'auto';
  };

  // ─── Keyboard navigation ───
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentIndex, handlePrevious, handleNext]);

  // ─── Loading State ───
  if (loading) {
    return (
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-loading">
            <Loader2 size={48} strokeWidth={2} className="gallery-spinner" />
            <p>Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // ─── Error State ───
  if (error) {
    return (
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-error">
            <AlertTriangle size={48} strokeWidth={2} />
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="gallery-retry-btn">
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ─── Empty State ───
  if (images.length === 0) {
    return (
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-empty">
            <div className="gallery-empty-icon">📷</div>
            <h3 className="gallery-empty-title">No Images Found</h3>
            <p className="gallery-empty-desc">
              No images have been uploaded to the gallery yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        {/* Section Header */}
        <div className="gallery-header">
          <div className="gallery-header-content">
            <span className="gallery-eyebrow">📸 Capture the Movement</span>
            <h2 className="gallery-title">
              Our <span className="gradient-text">Gallery</span>
            </h2>
            <p className="gallery-subtitle">
              Explore the energy, passion, and artistry of our dance community through these moments frozen in time.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`gallery-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentIndex(0);
              }}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => {
            const isLiked = likedImages.includes(image.id);
            const likeCount = likeCounts[image.id] || image.likes || 0;
            
            return (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(image, index)}
              >
                <div className="gallery-item-image">
                  {image.src ? (
                    <img 
                      src={image.src} 
                      alt={image.alt || image.title || 'Gallery image'}
                      className="gallery-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.gallery-item-placeholder').style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="gallery-item-placeholder" style={{ display: image.src ? 'none' : 'flex' }}>
                    <div className="gallery-item-placeholder-content">
                      <div className="placeholder-icon">🎭</div>
                      <span className="placeholder-text">{image.title || 'No image'}</span>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="gallery-item-overlay">
                    <div className="gallery-item-overlay-content">
                      <span className="gallery-item-category">{image.category || 'uncategorized'}</span>
                      <h3 className="gallery-item-title">{image.title || 'Untitled'}</h3>
                      <button 
                        className="gallery-item-view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(image, index);
                        }}
                      >
                        View <span className="view-btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item Footer */}
                <div className="gallery-item-footer">
                  <div className="gallery-item-info">
                    <span className="gallery-item-date">
                      {image.date || image.createdAt?.toLocaleDateString?.() || ''}
                    </span>
                    <span className="gallery-item-likes">
                      <Heart 
                        className={`like-icon ${isLiked ? 'liked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(image.id);
                        }}
                        size={16}
                        fill={isLiked ? '#FF1F6D' : 'none'}
                      />
                      {likeCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State for filtered view */}
        {filteredImages.length === 0 && (
          <div className="gallery-empty">
            <div className="gallery-empty-icon">📷</div>
            <h3 className="gallery-empty-title">No Images Found</h3>
            <p className="gallery-empty-desc">
              No images available for "{selectedCategory}". Try selecting a different category.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && currentImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Header */}
            <div className="lightbox-header">
              <button 
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
              <div className="lightbox-controls-left">
                {filteredImages.length > 1 && (
                  <button
                    className="lightbox-autoplay-btn"
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    aria-label={isAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                )}
                <button
                  className="lightbox-share-btn"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: currentImage.title || 'Gallery Image',
                        text: currentImage.description || '',
                        url: window.location.href
                      }).catch(() => {});
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href)
                        .then(() => alert('Link copied to clipboard!'))
                        .catch(() => {});
                    }
                  }}
                  aria-label="Share image"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="lightbox-image-container">
              {filteredImages.length > 1 && (
                <button 
                  className="lightbox-nav lightbox-nav-prev"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} />
                </button>
              )}

              <div className="lightbox-image-wrapper">
                {currentImage.src ? (
                  <img 
                    src={currentImage.src} 
                    alt={currentImage.alt || currentImage.title || 'Gallery image'}
                    className="lightbox-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.querySelector('.lightbox-image-placeholder').style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="lightbox-image-placeholder" style={{ display: currentImage.src ? 'none' : 'flex' }}>
                  <div className="lightbox-placeholder-content">
                    <span className="lightbox-placeholder-icon">🎭</span>
                    <span className="lightbox-placeholder-title">{currentImage.title || 'No image'}</span>
                  </div>
                </div>
                
                {/* Image Info Overlay */}
                <div className="lightbox-image-info">
                  <div className="lightbox-image-info-content">
                    <h3 className="lightbox-image-title">{currentImage.title || 'Untitled'}</h3>
                    {currentImage.description && (
                      <p className="lightbox-image-desc">{currentImage.description}</p>
                    )}
                    <div className="lightbox-image-meta">
                      <span className="lightbox-meta-item">
                        <span className="meta-icon">📅</span>
                        {currentImage.date || currentImage.createdAt?.toLocaleDateString?.() || 'Date unknown'}
                      </span>
                      {currentImage.photographer && (
                        <span className="lightbox-meta-item">
                          <span className="meta-icon">📸</span>
                          {currentImage.photographer}
                        </span>
                      )}
                      <span className="lightbox-meta-item">
                        <Heart size={14} />
                        {likeCounts[currentImage.id] || currentImage.likes || 0} likes
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {filteredImages.length > 1 && (
                <button 
                  className="lightbox-nav lightbox-nav-next"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="lightbox-footer">
              <div className="lightbox-counter">
                {currentIndex + 1} / {filteredImages.length}
              </div>
              <div className="lightbox-actions">
                <button
                  className={`lightbox-like-btn ${likedImages.includes(currentImage.id) ? 'liked' : ''}`}
                  onClick={() => handleLike(currentImage.id)}
                >
                  <Heart 
                    size={20} 
                    fill={likedImages.includes(currentImage.id) ? '#FF1F6D' : 'none'}
                  />
                  <span>{likeCounts[currentImage.id] || currentImage.likes || 0}</span>
                </button>
                <button
                  className="lightbox-download-btn"
                  onClick={() => {
                    if (currentImage.src) {
                      // Create download link
                      const link = document.createElement('a');
                      link.href = currentImage.src;
                      link.download = currentImage.title || 'gallery-image';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } else {
                      alert('Download not available for this image');
                    }
                  }}
                >
                  <Download size={18} />
                </button>
              </div>
              {currentImage.category && (
                <div className="lightbox-category-tag">
                  {currentImage.category}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ============================================================
           GALLERY SECTION
           ============================================================ */
        .gallery-section {
          padding: 4rem 0 5rem;
          background: var(--background, #0B0A0F);
          color: var(--foreground, #F5F3F7);
          min-height: 100vh;
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        /* Header */
        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .gallery-header-content {
          max-width: 680px;
          margin: 0 auto;
        }

        .gallery-eyebrow {
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

        .gallery-title {
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

        .gallery-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.0625rem;
          color: var(--body-text, #B0A8C0);
          line-height: 1.65;
          margin: 0;
        }

        /* Filters */
        .gallery-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .gallery-filter-btn {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.4375rem 1.125rem;
          border: 1.5px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 999px;
          background: transparent;
          color: var(--body-text, #B0A8C0);
          cursor: pointer;
          transition: all 0.25s ease-out;
          white-space: nowrap;
        }

        .gallery-filter-btn:hover {
          border-color: var(--foreground, #F5F3F7);
          color: var(--foreground, #F5F3F7);
          transform: translateY(-1px);
        }

        .gallery-filter-btn.active {
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(255, 31, 109, 0.25);
        }

        /* Gallery Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .gallery-item {
          cursor: pointer;
          border-radius: 14px;
          overflow: hidden;
          background: var(--surface, rgba(255,255,255,0.05));
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
          position: relative;
        }

        .gallery-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        .gallery-item-image {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--surface-alt, rgba(255,255,255,0.03));
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-item-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
        }

        .gallery-item-placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .placeholder-icon {
          font-size: 3rem;
          opacity: 0.5;
        }

        .placeholder-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--muted, #8A7A9E);
        }

        /* Overlay */
        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%);
          opacity: 0;
          transition: opacity 0.3s ease-out;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-item-overlay-content {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          width: 100%;
        }

        .gallery-item-category {
          font-family: 'Poppins', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.1);
          padding: 0.15rem 0.625rem;
          border-radius: 999px;
          width: fit-content;
          backdrop-filter: blur(4px);
        }

        .gallery-item-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .gallery-item-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.375rem 1rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
          width: fit-content;
          margin-top: 0.25rem;
        }

        .gallery-item-view-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(255, 31, 109, 0.3);
        }

        .view-btn-arrow {
          transition: transform 0.2s ease-out;
        }

        .gallery-item-view-btn:hover .view-btn-arrow {
          transform: translateX(3px);
        }

        /* Item Footer */
        .gallery-item-footer {
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .gallery-item-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.8125rem;
          color: var(--muted, #8A7A9E);
        }

        .gallery-item-date {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .gallery-item-likes {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          transition: color 0.2s ease-out;
        }

        .like-icon {
          transition: transform 0.2s ease-out, color 0.2s ease-out;
          color: var(--muted, #8A7A9E);
        }

        .like-icon.liked {
          color: #FF1F6D;
          animation: likePop 0.3s ease-out;
        }

        @keyframes likePop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        /* Loading State */
        .gallery-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
        }

        .gallery-spinner {
          animation: spin 1s linear infinite;
          color: var(--primary, #FF1F6D);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Error State */
        .gallery-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 400px;
          gap: 1rem;
          color: #EF4444;
        }

        .gallery-error h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .gallery-error p {
          color: var(--body-text, #B0A8C0);
          max-width: 400px;
        }

        .gallery-retry-btn {
          padding: 0.625rem 1.5rem;
          background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 999px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease-out;
        }

        .gallery-retry-btn:hover {
          transform: scale(1.05);
        }

        /* Empty State */
        .gallery-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 1.5rem;
          gap: 1rem;
          background: var(--surface, rgba(255,255,255,0.05));
          border: 1px solid var(--border, rgba(255,255,255,0.06));
          border-radius: 14px;
        }

        .gallery-empty-icon {
          font-size: 4rem;
          opacity: 0.5;
        }

        .gallery-empty-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground, #F5F3F7);
          margin: 0;
        }

        .gallery-empty-desc {
          font-size: 0.9375rem;
          color: var(--body-text, #B0A8C0);
          max-width: 340px;
          line-height: 1.6;
          margin: 0;
        }

        /* ============================================================
           LIGHTBOX
           ============================================================ */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: lightboxFadeIn 0.3s ease-out;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-content {
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
        }

        /* Lightbox Header */
        .lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.5rem;
        }

        .lightbox-close {
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
          transition: background 0.2s ease-out, transform 0.2s ease-out;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .lightbox-controls-left {
          display: flex;
          gap: 0.5rem;
        }

        .lightbox-autoplay-btn,
        .lightbox-share-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease-out, color 0.2s ease-out;
        }

        .lightbox-autoplay-btn:hover,
        .lightbox-share-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        /* Image Container */
        .lightbox-image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 400px;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #FFFFFF;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease-out, transform 0.2s ease-out;
          z-index: 10;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav-prev {
          left: 0;
        }

        .lightbox-nav-next {
          right: 0;
        }

        .lightbox-image-wrapper {
          width: 100%;
          max-height: 60vh;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .lightbox-image {
          width: 100%;
          height: 100%;
          max-height: 60vh;
          object-fit: contain;
          display: block;
        }

        .lightbox-image-placeholder {
          width: 100%;
          height: 100%;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-alt, rgba(255,255,255,0.03));
        }

        .lightbox-placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .lightbox-placeholder-icon {
          font-size: 5rem;
        }

        .lightbox-placeholder-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .lightbox-image-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 1.5rem 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        }

        .lightbox-image-info-content {
          color: #FFFFFF;
        }

        .lightbox-image-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.375rem;
        }

        .lightbox-image-desc {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 0.75rem;
          line-height: 1.5;
        }

        .lightbox-image-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .lightbox-meta-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .meta-icon {
          font-size: 0.875rem;
        }

        /* Lightbox Footer */
        .lightbox-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.5rem 0;
          color: rgba(255, 255, 255, 0.6);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .lightbox-counter {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .lightbox-actions {
          display: flex;
          gap: 0.5rem;
        }

        .lightbox-like-btn,
        .lightbox-download-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease-out;
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
        }

        .lightbox-like-btn:hover,
        .lightbox-download-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        .lightbox-like-btn.liked {
          color: #FF1F6D;
          background: rgba(255, 31, 109, 0.2);
        }

        .lightbox-category-tag {
          font-family: 'Poppins', sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Responsive */
        @media (min-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .gallery-title {
            font-size: 3rem;
          }
        }

        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            gap: 1rem;
          }
          .gallery-item-overlay {
            padding: 1rem;
          }
          .gallery-item-title {
            font-size: 1rem;
          }
          .lightbox-nav {
            width: 36px;
            height: 36px;
          }
          .lightbox-nav svg {
            width: 24px;
            height: 24px;
          }
          .lightbox-image-title {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
}










// // components/Gallery.js
// "use client";

// import { useState, useEffect, useRef } from 'react';
// import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2, Minimize2, Heart, Share2, Download } from 'lucide-react';

// export default function Gallery() {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(false);
//   const [likedImages, setLikedImages] = useState([]);
//   const autoPlayRef = useRef(null);

//   // Gallery Images Data
//   const galleryData = {
//     categories: ['all', 'hiphop', 'contemporary', 'ballet', 'street', 'performances'],
    
//     images: [
//       // Hip Hop
//       {
//         id: 1,
//         src: '/gallery/hiphop-1.jpg',
//         alt: 'Hip Hop Dance Class',
//         category: 'hiphop',
//         title: 'Hip Hop Energy',
//         description: 'High-energy hip hop class at Dazzle Studio',
//         date: '2024-12-15',
//         likes: 45,
//         photographer: 'Studio Photographer'
//       },
//       {
//         id: 2,
//         src: '/gallery/hiphop-2.jpg',
//         alt: 'Hip Hop Crew',
//         category: 'hiphop',
//         title: 'Crew Session',
//         description: 'Our hip hop crew practicing for competition',
//         date: '2024-12-10',
//         likes: 38,
//         photographer: 'Studio Photographer'
//       },
      
//       // Contemporary
//       {
//         id: 3,
//         src: '/gallery/contemporary-1.jpg',
//         alt: 'Contemporary Dance',
//         category: 'contemporary',
//         title: 'Contemporary Flow',
//         description: 'Beautiful contemporary dance performance',
//         date: '2024-12-08',
//         likes: 52,
//         photographer: 'Studio Photographer'
//       },
//       {
//         id: 4,
//         src: '/gallery/contemporary-2.jpg',
//         alt: 'Contemporary Duet',
//         category: 'contemporary',
//         title: 'Duet Performance',
//         description: 'Contemporary duet showcasing emotion and technique',
//         date: '2024-12-05',
//         likes: 41,
//         photographer: 'Studio Photographer'
//       },
      
//       // Ballet
//       {
//         id: 5,
//         src: '/gallery/ballet-1.jpg',
//         alt: 'Ballet Class',
//         category: 'ballet',
//         title: 'Ballet Excellence',
//         description: 'Intermediate ballet class in session',
//         date: '2024-12-03',
//         likes: 33,
//         photographer: 'Studio Photographer'
//       },
//       {
//         id: 6,
//         src: '/gallery/ballet-2.jpg',
//         alt: 'Ballet Performance',
//         category: 'ballet',
//         title: 'Ballet Showcase',
//         description: 'Annual ballet showcase performance',
//         date: '2024-11-28',
//         likes: 47,
//         photographer: 'Studio Photographer'
//       },
      
//       // Street Dance
//       {
//         id: 7,
//         src: '/gallery/street-1.jpg',
//         alt: 'Street Dance Battle',
//         category: 'street',
//         title: 'Street Battle',
//         description: 'Intense street dance battle at Dazzle Studio',
//         date: '2024-11-25',
//         likes: 56,
//         photographer: 'Studio Photographer'
//       },
//       {
//         id: 8,
//         src: '/gallery/street-2.jpg',
//         alt: 'Street Dance Workshop',
//         category: 'street',
//         title: 'Street Workshop',
//         description: 'Special street dance workshop with guest instructor',
//         date: '2024-11-20',
//         likes: 39,
//         photographer: 'Studio Photographer'
//       },
      
//       // Performances
//       {
//         id: 9,
//         src: '/gallery/performance-1.jpg',
//         alt: 'Annual Show',
//         category: 'performances',
//         title: 'Annual Performance 2024',
//         description: 'Our annual dance showcase extravaganza',
//         date: '2024-11-15',
//         likes: 68,
//         photographer: 'Studio Photographer'
//       },
//       {
//         id: 10,
//         src: '/gallery/performance-2.jpg',
//         alt: 'Performance Rehearsal',
//         category: 'performances',
//         title: 'Rehearsal Session',
//         description: 'Behind the scenes of our performance rehearsal',
//         date: '2024-11-10',
//         likes: 44,
//         photographer: 'Studio Photographer'
//       },
//       {
//         id: 11,
//         src: '/gallery/performance-3.jpg',
//         alt: 'Final Performance',
//         category: 'performances',
//         title: 'Final Show',
//         description: 'Grand finale of our performance season',
//         date: '2024-11-08',
//         likes: 72,
//         photographer: 'Studio Photographer'
//       }
//     ]
//   };

//   // Filter images based on selected category
//   const filteredImages = selectedCategory === 'all'
//     ? galleryData.images
//     : galleryData.images.filter(img => img.category === selectedCategory);

//   // Get current image for lightbox
//   const currentImage = filteredImages[currentIndex];

//   // Auto-play functionality
//   useEffect(() => {
//     if (isAutoPlay && isLightboxOpen) {
//       autoPlayRef.current = setInterval(() => {
//         handleNext();
//       }, 3000);
//     } else {
//       clearInterval(autoPlayRef.current);
//     }
    
//     return () => clearInterval(autoPlayRef.current);
//   }, [isAutoPlay, isLightboxOpen, currentIndex]);

//   // Handle like toggle
//   const handleLike = (imageId) => {
//     setLikedImages(prev => {
//       if (prev.includes(imageId)) {
//         return prev.filter(id => id !== imageId);
//       } else {
//         return [...prev, imageId];
//       }
//     });
//   };

//   // Lightbox navigation
//   const handlePrevious = () => {
//     setCurrentIndex(prev => prev === 0 ? filteredImages.length - 1 : prev - 1);
//   };

//   const handleNext = () => {
//     setCurrentIndex(prev => prev === filteredImages.length - 1 ? 0 : prev + 1);
//   };

//   // Open lightbox
//   const openLightbox = (image, index) => {
//     setSelectedImage(image);
//     setCurrentIndex(index);
//     setIsLightboxOpen(true);
//     document.body.style.overflow = 'hidden';
//   };

//   // Close lightbox
//   const closeLightbox = () => {
//     setIsLightboxOpen(false);
//     setIsAutoPlay(false);
//     document.body.style.overflow = 'auto';
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isLightboxOpen) return;
      
//       if (e.key === 'Escape') closeLightbox();
//       if (e.key === 'ArrowLeft') handlePrevious();
//       if (e.key === 'ArrowRight') handleNext();
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [isLightboxOpen, currentIndex]);

//   return (
//     <section className="gallery-section">
//       <div className="gallery-container">
//         {/* Section Header */}
//         <div className="gallery-header">
//           <div className="gallery-header-content">
//             <span className="gallery-eyebrow">📸 Capture the Movement</span>
//             <h2 className="gallery-title">
//               Our <span className="gradient-text">Gallery</span>
//             </h2>
//             <p className="gallery-subtitle">
//               Explore the energy, passion, and artistry of our dance community through these moments frozen in time.
//             </p>
//           </div>
//         </div>

//         {/* Category Filters */}
//         <div className="gallery-filters">
//           {galleryData.categories.map((category) => (
//             <button
//               key={category}
//               className={`gallery-filter-btn ${selectedCategory === category ? 'active' : ''}`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Gallery Grid */}
//         <div className="gallery-grid">
//           {filteredImages.map((image, index) => {
//             const isLiked = likedImages.includes(image.id);
            
//             return (
//               <div
//                 key={image.id}
//                 className="gallery-item"
//                 onClick={() => openLightbox(image, index)}
//               >
//                 <div className="gallery-item-image">
//                   <div className="gallery-item-placeholder">
//                     {/* Replace with actual images */}
//                     <div className="gallery-item-placeholder-content">
//                       <div className="placeholder-icon">🎭</div>
//                       <span className="placeholder-text">{image.title}</span>
//                     </div>
//                   </div>
                  
//                   {/* Overlay */}
//                   <div className="gallery-item-overlay">
//                     <div className="gallery-item-overlay-content">
//                       <span className="gallery-item-category">{image.category}</span>
//                       <h3 className="gallery-item-title">{image.title}</h3>
//                       <button 
//                         className="gallery-item-view-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           openLightbox(image, index);
//                         }}
//                       >
//                         View <span className="view-btn-arrow">→</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Item Footer */}
//                 <div className="gallery-item-footer">
//                   <div className="gallery-item-info">
//                     <span className="gallery-item-date">{image.date}</span>
//                     <span className="gallery-item-likes">
//                       <Heart 
//                         className={`like-icon ${isLiked ? 'liked' : ''}`}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleLike(image.id);
//                         }}
//                         size={16}
//                         fill={isLiked ? '#FF1F6D' : 'none'}
//                       />
//                       {image.likes + (isLiked ? 1 : 0)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Empty State */}
//         {filteredImages.length === 0 && (
//           <div className="gallery-empty">
//             <div className="gallery-empty-icon">📷</div>
//             <h3 className="gallery-empty-title">No Images Found</h3>
//             <p className="gallery-empty-desc">
//               No images available for this category. Try selecting a different one.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Lightbox */}
//       {isLightboxOpen && currentImage && (
//         <div className="lightbox-overlay" onClick={closeLightbox}>
//           <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
//             {/* Lightbox Header */}
//             <div className="lightbox-header">
//               <button 
//                 className="lightbox-close"
//                 onClick={closeLightbox}
//                 aria-label="Close lightbox"
//               >
//                 <X size={24} />
//               </button>
//               <div className="lightbox-controls-left">
//                 <button
//                   className="lightbox-autoplay-btn"
//                   onClick={() => setIsAutoPlay(!isAutoPlay)}
//                   aria-label={isAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
//                 >
//                   {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
//                 </button>
//                 <button
//                   className="lightbox-share-btn"
//                   onClick={() => {
//                     if (navigator.share) {
//                       navigator.share({
//                         title: currentImage.title,
//                         text: currentImage.description,
//                         url: window.location.href
//                       });
//                     }
//                   }}
//                   aria-label="Share image"
//                 >
//                   <Share2 size={18} />
//                 </button>
//               </div>
//             </div>

//             {/* Image Container */}
//             <div className="lightbox-image-container">
//               <button 
//                 className="lightbox-nav lightbox-nav-prev"
//                 onClick={handlePrevious}
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft size={32} />
//               </button>

//               <div className="lightbox-image-wrapper">
//                 <div className="lightbox-image-placeholder">
//                   <div className="lightbox-placeholder-content">
//                     <span className="lightbox-placeholder-icon">🎭</span>
//                     <span className="lightbox-placeholder-title">{currentImage.title}</span>
//                   </div>
//                 </div>
                
//                 {/* Image Info Overlay */}
//                 <div className="lightbox-image-info">
//                   <div className="lightbox-image-info-content">
//                     <h3 className="lightbox-image-title">{currentImage.title}</h3>
//                     <p className="lightbox-image-desc">{currentImage.description}</p>
//                     <div className="lightbox-image-meta">
//                       <span className="lightbox-meta-item">
//                         <span className="meta-icon">📅</span>
//                         {currentImage.date}
//                       </span>
//                       <span className="lightbox-meta-item">
//                         <span className="meta-icon">📸</span>
//                         {currentImage.photographer}
//                       </span>
//                       <span className="lightbox-meta-item">
//                         <Heart size={14} />
//                         {currentImage.likes + (likedImages.includes(currentImage.id) ? 1 : 0)} likes
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <button 
//                 className="lightbox-nav lightbox-nav-next"
//                 onClick={handleNext}
//                 aria-label="Next image"
//               >
//                 <ChevronRight size={32} />
//               </button>
//             </div>

//             {/* Lightbox Footer */}
//             <div className="lightbox-footer">
//               <div className="lightbox-counter">
//                 {currentIndex + 1} / {filteredImages.length}
//               </div>
//               <div className="lightbox-actions">
//                 <button
//                   className={`lightbox-like-btn ${likedImages.includes(currentImage.id) ? 'liked' : ''}`}
//                   onClick={() => handleLike(currentImage.id)}
//                 >
//                   <Heart 
//                     size={20} 
//                     fill={likedImages.includes(currentImage.id) ? '#FF1F6D' : 'none'}
//                   />
//                   <span>{currentImage.likes + (likedImages.includes(currentImage.id) ? 1 : 0)}</span>
//                 </button>
//                 <button
//                   className="lightbox-download-btn"
//                   onClick={() => {
//                     // In a real implementation, this would download the actual image
//                     alert('Download functionality would be implemented here');
//                   }}
//                 >
//                   <Download size={18} />
//                 </button>
//               </div>
//               <div className="lightbox-category-tag">
//                 {currentImage.category}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CSS Styles */}
//       <style jsx>{`
//         /* ============================================================
//            GALLERY SECTION
//            ============================================================ */
//         .gallery-section {
//           padding: 4rem 0 5rem;
//           background: var(--background);
//           color: var(--foreground);
//         }

//         .gallery-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 1.25rem;
//         }

//         /* Header */
//         .gallery-header {
//           text-align: center;
//           margin-bottom: 3rem;
//         }

//         .gallery-header-content {
//           max-width: 680px;
//           margin: 0 auto;
//         }

//         .gallery-eyebrow {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.375rem;
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.75rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           color: #FF1F6D;
//           background: rgba(255, 31, 109, 0.07);
//           padding: 0.3rem 0.875rem;
//           border-radius: 999px;
//           margin-bottom: 1rem;
//         }

//         .gallery-title {
//           font-family: 'Poppins', sans-serif;
//           font-size: 2.5rem;
//           font-weight: 800;
//           color: var(--foreground);
//           margin: 0 0 0.75rem;
//           line-height: 1.15;
//         }

//         .gradient-text {
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .gallery-subtitle {
//           font-family: 'Inter', sans-serif;
//           font-size: 1.0625rem;
//           color: var(--body-text);
//           line-height: 1.65;
//           margin: 0;
//         }

//         /* Filters */
//         .gallery-filters {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//           justify-content: center;
//           margin-bottom: 2.5rem;
//         }

//         .gallery-filter-btn {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.8125rem;
//           font-weight: 600;
//           padding: 0.4375rem 1.125rem;
//           border: 1.5px solid var(--border);
//           border-radius: 999px;
//           background: transparent;
//           color: var(--body-text);
//           cursor: pointer;
//           transition: all 0.25s ease-out;
//           white-space: nowrap;
//         }

//         .gallery-filter-btn:hover {
//           border-color: var(--foreground);
//           color: var(--foreground);
//           transform: translateY(-1px);
//         }

//         .gallery-filter-btn.active {
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//           color: #FFFFFF;
//           border-color: transparent;
//           box-shadow: 0 4px 15px rgba(255, 31, 109, 0.25);
//         }

//         /* Gallery Grid */
//         .gallery-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }

//         .gallery-item {
//           cursor: pointer;
//           border-radius: 14px;
//           overflow: hidden;
//           background: var(--surface);
//           border: 1px solid var(--border);
//           transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
//           position: relative;
//         }

//         .gallery-item:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
//         }

//         .gallery-item-image {
//           position: relative;
//           overflow: hidden;
//           aspect-ratio: 4/3;
//           background: var(--surface-alt);
//         }

//         .gallery-item-placeholder {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, rgba(255, 31, 109, 0.05), rgba(123, 47, 255, 0.05));
//         }

//         .gallery-item-placeholder-content {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .placeholder-icon {
//           font-size: 3rem;
//           opacity: 0.5;
//         }

//         .placeholder-text {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.8125rem;
//           font-weight: 600;
//           color: var(--muted);
//         }

//         /* Overlay */
//         .gallery-item-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%);
//           opacity: 0;
//           transition: opacity 0.3s ease-out;
//           display: flex;
//           align-items: flex-end;
//           padding: 1.5rem;
//         }

//         .gallery-item:hover .gallery-item-overlay {
//           opacity: 1;
//         }

//         .gallery-item-overlay-content {
//           display: flex;
//           flex-direction: column;
//           gap: 0.375rem;
//           width: 100%;
//         }

//         .gallery-item-category {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.625rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.1em;
//           color: rgba(255, 255, 255, 0.6);
//           background: rgba(255, 255, 255, 0.1);
//           padding: 0.15rem 0.625rem;
//           border-radius: 999px;
//           width: fit-content;
//           backdrop-filter: blur(4px);
//         }

//         .gallery-item-title {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1.125rem;
//           font-weight: 700;
//           color: #FFFFFF;
//           margin: 0;
//           text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
//         }

//         .gallery-item-view-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.375rem;
//           background: linear-gradient(135deg, #FF1F6D 0%, #7B2FFF 100%);
//           color: #FFFFFF;
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.75rem;
//           font-weight: 700;
//           padding: 0.375rem 1rem;
//           border: none;
//           border-radius: 999px;
//           cursor: pointer;
//           transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
//           width: fit-content;
//           margin-top: 0.25rem;
//         }

//         .gallery-item-view-btn:hover {
//           transform: scale(1.05);
//           box-shadow: 0 4px 15px rgba(255, 31, 109, 0.3);
//         }

//         .view-btn-arrow {
//           transition: transform 0.2s ease-out;
//         }

//         .gallery-item-view-btn:hover .view-btn-arrow {
//           transform: translateX(3px);
//         }

//         /* Item Footer */
//         .gallery-item-footer {
//           padding: 0.75rem 1rem;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .gallery-item-info {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           font-size: 0.8125rem;
//           color: var(--muted);
//         }

//         .gallery-item-date {
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//         }

//         .gallery-item-likes {
//           display: flex;
//           align-items: center;
//           gap: 0.25rem;
//           cursor: pointer;
//           transition: color 0.2s ease-out;
//         }

//         .like-icon {
//           transition: transform 0.2s ease-out, color 0.2s ease-out;
//           color: var(--muted);
//         }

//         .like-icon.liked {
//           color: #FF1F6D;
//           animation: likePop 0.3s ease-out;
//         }

//         @keyframes likePop {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.4); }
//           100% { transform: scale(1); }
//         }

//         /* Empty State */
//         .gallery-empty {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           padding: 4rem 1.5rem;
//           gap: 1rem;
//           background: var(--surface);
//           border: 1px solid var(--border);
//           border-radius: 14px;
//         }

//         .gallery-empty-icon {
//           font-size: 4rem;
//           opacity: 0.5;
//         }

//         .gallery-empty-title {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1.25rem;
//           font-weight: 700;
//           color: var(--foreground);
//           margin: 0;
//         }

//         .gallery-empty-desc {
//           font-size: 0.9375rem;
//           color: var(--body-text);
//           max-width: 340px;
//           line-height: 1.6;
//           margin: 0;
//         }

//         /* ============================================================
//            LIGHTBOX
//            ============================================================ */
//         .lightbox-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.92);
//           backdrop-filter: blur(12px);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 1rem;
//           animation: lightboxFadeIn 0.3s ease-out;
//         }

//         @keyframes lightboxFadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         .lightbox-content {
//           width: 100%;
//           max-width: 1200px;
//           max-height: 90vh;
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           position: relative;
//         }

//         /* Lightbox Header */
//         .lightbox-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 0.5rem;
//         }

//         .lightbox-close {
//           background: rgba(255, 255, 255, 0.1);
//           border: none;
//           color: #FFFFFF;
//           width: 44px;
//           height: 44px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: background 0.2s ease-out, transform 0.2s ease-out;
//         }

//         .lightbox-close:hover {
//           background: rgba(255, 255, 255, 0.2);
//           transform: rotate(90deg);
//         }

//         .lightbox-controls-left {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .lightbox-autoplay-btn,
//         .lightbox-share-btn {
//           background: rgba(255, 255, 255, 0.1);
//           border: none;
//           color: rgba(255, 255, 255, 0.8);
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: background 0.2s ease-out, color 0.2s ease-out;
//         }

//         .lightbox-autoplay-btn:hover,
//         .lightbox-share-btn:hover {
//           background: rgba(255, 255, 255, 0.2);
//           color: #FFFFFF;
//         }

//         /* Image Container */
//         .lightbox-image-container {
//           flex: 1;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           min-height: 400px;
//         }

//         .lightbox-nav {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           background: rgba(255, 255, 255, 0.1);
//           border: none;
//           color: #FFFFFF;
//           width: 48px;
//           height: 48px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: background 0.2s ease-out, transform 0.2s ease-out;
//           z-index: 10;
//         }

//         .lightbox-nav:hover {
//           background: rgba(255, 255, 255, 0.2);
//           transform: translateY(-50%) scale(1.1);
//         }

//         .lightbox-nav-prev {
//           left: 0;
//         }

//         .lightbox-nav-next {
//           right: 0;
//         }

//         .lightbox-image-wrapper {
//           width: 100%;
//           max-height: 60vh;
//           position: relative;
//           border-radius: 12px;
//           overflow: hidden;
//         }

//         .lightbox-image-placeholder {
//           width: 100%;
//           height: 100%;
//           min-height: 400px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: var(--surface-alt);
//         }

//         .lightbox-placeholder-content {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 1rem;
//           color: rgba(255, 255, 255, 0.3);
//         }

//         .lightbox-placeholder-icon {
//           font-size: 5rem;
//         }

//         .lightbox-placeholder-title {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1.5rem;
//           font-weight: 700;
//         }

//         .lightbox-image-info {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           padding: 2rem 1.5rem 1.5rem;
//           background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
//         }

//         .lightbox-image-info-content {
//           color: #FFFFFF;
//         }

//         .lightbox-image-title {
//           font-family: 'Poppins', sans-serif;
//           font-size: 1.5rem;
//           font-weight: 700;
//           margin: 0 0 0.375rem;
//         }

//         .lightbox-image-desc {
//           font-size: 0.9375rem;
//           color: rgba(255, 255, 255, 0.7);
//           margin: 0 0 0.75rem;
//           line-height: 1.5;
//         }

//         .lightbox-image-meta {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }

//         .lightbox-meta-item {
//           display: flex;
//           align-items: center;
//           gap: 0.375rem;
//           font-size: 0.8125rem;
//           color: rgba(255, 255, 255, 0.6);
//         }

//         .meta-icon {
//           font-size: 0.875rem;
//         }

//         /* Lightbox Footer */
//         .lightbox-footer {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0.5rem 0.5rem 0;
//           color: rgba(255, 255, 255, 0.6);
//           flex-wrap: wrap;
//           gap: 0.75rem;
//         }

//         .lightbox-counter {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.875rem;
//           font-weight: 600;
//         }

//         .lightbox-actions {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .lightbox-like-btn,
//         .lightbox-download-btn {
//           display: flex;
//           align-items: center;
//           gap: 0.375rem;
//           background: rgba(255, 255, 255, 0.1);
//           border: none;
//           color: rgba(255, 255, 255, 0.8);
//           padding: 0.5rem 1rem;
//           border-radius: 999px;
//           cursor: pointer;
//           transition: all 0.2s ease-out;
//           font-size: 0.875rem;
//           font-family: 'Inter', sans-serif;
//         }

//         .lightbox-like-btn:hover,
//         .lightbox-download-btn:hover {
//           background: rgba(255, 255, 255, 0.2);
//           color: #FFFFFF;
//         }

//         .lightbox-like-btn.liked {
//           color: #FF1F6D;
//           background: rgba(255, 31, 109, 0.2);
//         }

//         .lightbox-category-tag {
//           font-family: 'Poppins', sans-serif;
//           font-size: 0.6875rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           background: rgba(255, 255, 255, 0.1);
//           padding: 0.25rem 0.75rem;
//           border-radius: 999px;
//           color: rgba(255, 255, 255, 0.6);
//         }

//         /* Responsive */
//         @media (min-width: 640px) {
//           .gallery-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (min-width: 768px) {
//           .gallery-title {
//             font-size: 3rem;
//           }
//         }

//         @media (min-width: 1024px) {
//           .gallery-grid {
//             grid-template-columns: repeat(3, 1fr);
//           }
//           .gallery-item-image {
//             aspect-ratio: 4/3;
//           }
//         }

//         @media (max-width: 480px) {
//           .gallery-grid {
//             gap: 1rem;
//           }
//           .gallery-item-overlay {
//             padding: 1rem;
//           }
//           .gallery-item-title {
//             font-size: 1rem;
//           }
//           .lightbox-nav {
//             width: 36px;
//             height: 36px;
//           }
//           .lightbox-nav svg {
//             width: 24px;
//             height: 24px;
//           }
//           .lightbox-image-title {
//             font-size: 1.125rem;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }