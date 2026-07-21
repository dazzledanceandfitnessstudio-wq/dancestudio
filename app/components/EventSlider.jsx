"use client";

import Link from "next/link";
import { Zap, MapPin, ArrowRight, Loader2 } from "lucide-react";

export default function EventSlider({ events, loadingEvents, enrollingId, onEnrollClick }) {
  return (
    <section className="ld-section ld-container">
      <div className="ld-section-title">
        <Zap size={24} color="#FF1F6D" />
        <h2>Featured Events</h2>
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
            {events.map((event) => {
              const imageSrc = event.bannerUrl || event.imageUrl || null;
              return (
                <div className="ld-slide-card" key={event.id}>
                  <div className="ld-slide-banner">
                    {imageSrc ? (
                      <img 
                        src={imageSrc} 
                        alt={event.title} 
                        loading="lazy" 
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover",
                          display: "block"
                        }} 
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #9333EA, #DB2777)",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "3rem"
                      }}>
                        🎭
                      </div>
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
              );
            })}
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










// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import { Zap, MapPin, ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

// export default function EventSlider({ events, loadingEvents, enrollingId, onEnrollClick }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const autoPlayRef = useRef(null);
//   const sliderRef = useRef(null);

//   const totalSlides = events.length;

//   // Auto-slide
//   useEffect(() => {
//     if (loadingEvents || events.length === 0) return;

//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//     }

//     autoPlayRef.current = setInterval(() => {
//       if (!isPaused) {
//         setCurrentIndex((prev) => {
//           const nextIndex = prev + 1;
//           // Show 3 slides at a time, slide by 1
//           const maxIndex = Math.max(0, totalSlides - 3);
//           return nextIndex > maxIndex ? 0 : nextIndex;
//         });
//       }
//     }, 4000);

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [events.length, loadingEvents, isPaused, totalSlides]);

//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [events.length]);

//   const goToSlide = (index) => {
//     const maxIndex = Math.max(0, totalSlides - 3);
//     const targetIndex = Math.min(index, maxIndex);
//     setCurrentIndex(targetIndex);
//     if (autoPlayRef.current) {
//       clearInterval(autoPlayRef.current);
//       autoPlayRef.current = setInterval(() => {
//         if (!isPaused) {
//           setCurrentIndex((prev) => {
//             const nextIndex = prev + 1;
//             const maxIdx = Math.max(0, totalSlides - 3);
//             return nextIndex > maxIdx ? 0 : nextIndex;
//           });
//         }
//       }, 4000);
//     }
//   };

//   const nextSlide = () => {
//     const maxIndex = Math.max(0, totalSlides - 3);
//     goToSlide(currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
//   };

//   const prevSlide = () => {
//     const maxIndex = Math.max(0, totalSlides - 3);
//     goToSlide(currentIndex - 1 < 0 ? maxIndex : currentIndex - 1);
//   };

//   const handleMouseEnter = () => setIsPaused(true);
//   const handleMouseLeave = () => setIsPaused(false);

//   if (loadingEvents) {
//     return (
//       <section className="ld-section ld-container">
//         <div className="ld-section-title">
//           <Zap size={24} color="#FF1F6D" />
//           <h2>Featured Classes</h2>
//         </div>
//         <div className="ld-slider" style={{ gap: "1.5rem" }}>
//           {[1, 2, 3].map((i) => (
//             <div className="ld-skeleton ld-skeleton-card" key={i} style={{ flex: "0 0 320px" }} />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   if (events.length === 0) {
//     return (
//       <section className="ld-section ld-container">
//         <div className="ld-section-title">
//           <Zap size={24} color="#FF1F6D" />
//           <h2>Featured Classes</h2>
//         </div>
//         <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-muted)" }}>
//           <p>New events coming soon!</p>
//         </div>
//       </section>
//     );
//   }

//   // Get visible slides (3 at a time)
//   const getVisibleSlides = () => {
//     const slides = [];
//     const maxIndex = Math.max(0, totalSlides - 3);
//     const startIndex = Math.min(currentIndex, maxIndex);
//     for (let i = 0; i < 3; i++) {
//       const index = (startIndex + i) % totalSlides;
//       slides.push(events[index]);
//     }
//     return slides;
//   };

//   const visibleSlides = getVisibleSlides();

//   return (
//     <section className="ld-section ld-container">
//       <div className="ld-section-title">
//         <Zap size={24} color="#FF1F6D" />
//         <h2>Featured Classes</h2>
//       </div>

//       <div 
//         className="ld-slider-wrapper"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         style={{ position: "relative", overflow: "hidden" }}
//       >
//         <div 
//           ref={sliderRef}
//           className="ld-slider"
//           style={{
//             display: "flex",
//             gap: "1.5rem",
//             transition: "transform 0.8s ease-in-out",
//             transform: `translateX(-${currentIndex * (100 / 3)}%)`,
//           }}
//         >
//           {visibleSlides.map((event, idx) => {
//             const imageSrc = event.bannerUrl || event.imageUrl || null;
//             return (
//               <div 
//                 className="ld-slide-card" 
//                 key={`${event.id}-${idx}`}
//                 style={{
//                   flex: "0 0 calc(33.333% - 1rem)",
//                   minWidth: "calc(33.333% - 1rem)",
//                 }}
//               >
//                 <div className="ld-slide-banner" style={{ position: "relative", overflow: "hidden" }}>
//                   {imageSrc ? (
//                     <img 
//                       src={imageSrc} 
//                       alt={event.title} 
//                       loading="lazy" 
//                       style={{ 
//                         width: "100%", 
//                         height: "100%", 
//                         objectFit: "cover",
//                         display: "block"
//                       }} 
//                     />
//                   ) : (
//                     <div style={{
//                       width: "100%",
//                       height: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       background: "linear-gradient(135deg, #9333EA, #DB2777)",
//                       color: "rgba(255,255,255,0.6)",
//                       fontSize: "3rem"
//                     }}>
//                       🎭
//                     </div>
//                   )}
//                 </div>
//                 <div className="ld-slide-body">
//                   <h3 className="ld-slide-title">{event.title}</h3>
//                   <p className="ld-slide-desc">{event.description}</p>
//                   <div className="ld-slide-meta">
//                     {event.danceStyle && (
//                       <span style={{ color: "#FF1F6D", fontWeight: 600 }}>
//                         {event.danceStyle}
//                       </span>
//                     )}
//                     {event.level && <span>• {event.level}</span>}
//                     {event.venue && (
//                       <span>
//                         <MapPin size={12} /> {event.venue}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="ld-slide-footer">
//                   <button
//                     className="btn-enroll-neon"
//                     style={{ width: "100%" }}
//                     disabled={enrollingId === event.id}
//                     onClick={() => onEnrollClick(event.id)}
//                   >
//                     {enrollingId === event.id ? (
//                       <>
//                         <Loader2 size={16} className="ld-spin" /> Enrolling…
//                       </>
//                     ) : (
//                       <>
//                         <Zap size={16} /> Enroll Now
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Navigation Arrows */}
//         {totalSlides > 3 && (
//           <>
//             <button
//               onClick={prevSlide}
//               style={{
//                 position: "absolute",
//                 left: "-12px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 zIndex: 10,
//                 background: "rgba(11,10,15,0.8)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "#fff",
//                 transition: "all 0.2s ease",
//                 backdropFilter: "blur(8px)",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "rgba(255,31,109,0.8)";
//                 e.target.style.transform = "translateY(-50%) scale(1.1)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "rgba(11,10,15,0.8)";
//                 e.target.style.transform = "translateY(-50%) scale(1)";
//               }}
//             >
//               <ChevronLeft size={20} strokeWidth={2.5} />
//             </button>
//             <button
//               onClick={nextSlide}
//               style={{
//                 position: "absolute",
//                 right: "-12px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 zIndex: 10,
//                 background: "rgba(11,10,15,0.8)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 color: "#fff",
//                 transition: "all 0.2s ease",
//                 backdropFilter: "blur(8px)",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "rgba(255,31,109,0.8)";
//                 e.target.style.transform = "translateY(-50%) scale(1.1)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "rgba(11,10,15,0.8)";
//                 e.target.style.transform = "translateY(-50%) scale(1)";
//               }}
//             >
//               <ChevronRight size={20} strokeWidth={2.5} />
//             </button>
//           </>
//         )}

//         {/* Dots */}
//         {totalSlides > 1 && (
//           <div style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "0.5rem",
//             marginTop: "1.5rem"
//           }}>
//             {Array.from({ length: totalSlides }).map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => goToSlide(idx)}
//                 style={{
//                   width: idx === currentIndex ? "24px" : "10px",
//                   height: "10px",
//                   borderRadius: "5px",
//                   border: "none",
//                   background: idx === currentIndex ? "#FF1F6D" : "rgba(255,255,255,0.2)",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                 }}
//                 aria-label={`Go to slide ${idx + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <div style={{ textAlign: "center", marginTop: "2rem" }}>
//         <Link href="/events" className="btn-secondary">
//           More Events <ArrowRight size={16} />
//         </Link>
//       </div>
//     </section>
//   );
// }








// // "use client";

// // import Link from "next/link";
// // import { useState, useEffect, useRef } from "react";
// // import { Zap, MapPin, ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

// // export default function EventSlider({ events, loadingEvents, enrollingId, onEnrollClick }) {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const autoPlayRef = useRef(null);
// //   const sliderRef = useRef(null);

// //   // Total slides (show 3 at a time, but we'll slide one by one)
// //   const totalSlides = events.length;

// //   // Auto-slide logic
// //   useEffect(() => {
// //     if (loadingEvents || events.length === 0) return;

// //     // Clear existing interval
// //     if (autoPlayRef.current) {
// //       clearInterval(autoPlayRef.current);
// //     }

// //     // Start auto-play
// //     autoPlayRef.current = setInterval(() => {
// //       if (!isPaused) {
// //         setCurrentIndex((prev) => (prev + 1) % totalSlides);
// //       }
// //     }, 3000); // 3 seconds per slide

// //     return () => {
// //       if (autoPlayRef.current) {
// //         clearInterval(autoPlayRef.current);
// //       }
// //     };
// //   }, [events.length, loadingEvents, isPaused, totalSlides]);

// //   // Reset currentIndex when events change
// //   useEffect(() => {
// //     setCurrentIndex(0);
// //   }, [events.length]);

// //   // Manual navigation
// //   const goToSlide = (index) => {
// //     setCurrentIndex(index);
// //     // Reset auto-play timer
// //     if (autoPlayRef.current) {
// //       clearInterval(autoPlayRef.current);
// //       autoPlayRef.current = setInterval(() => {
// //         if (!isPaused) {
// //           setCurrentIndex((prev) => (prev + 1) % totalSlides);
// //         }
// //       }, 3000);
// //     }
// //   };

// //   const nextSlide = () => {
// //     goToSlide((currentIndex + 1) % totalSlides);
// //   };

// //   const prevSlide = () => {
// //     goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
// //   };

// //   // Handle hover pause
// //   const handleMouseEnter = () => setIsPaused(true);
// //   const handleMouseLeave = () => setIsPaused(false);

// //   if (loadingEvents) {
// //     return (
// //       <section className="ld-section ld-container">
// //         <div className="ld-section-title">
// //           <Zap size={24} color="#FF1F6D" />
// //           <h2>Featured Classes</h2>
// //         </div>
// //         <div className="ld-slider" style={{ gap: "1.5rem" }}>
// //           {[1, 2, 3].map((i) => (
// //             <div className="ld-skeleton ld-skeleton-card" key={i} style={{ flex: "0 0 320px" }} />
// //           ))}
// //         </div>
// //       </section>
// //     );
// //   }

// //   if (events.length === 0) {
// //     return (
// //       <section className="ld-section ld-container">
// //         <div className="ld-section-title">
// //           <Zap size={24} color="#FF1F6D" />
// //           <h2>Featured Classes</h2>
// //         </div>
// //         <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-muted)" }}>
// //           <p>New events coming soon!</p>
// //         </div>
// //       </section>
// //     );
// //   }

// //   // Get visible slides (3 at a time)
// //   const getVisibleSlides = () => {
// //     const slides = [];
// //     for (let i = 0; i < 3; i++) {
// //       const index = (currentIndex + i) % totalSlides;
// //       slides.push(events[index]);
// //     }
// //     return slides;
// //   };

// //   const visibleSlides = getVisibleSlides();

// //   return (
// //     <section className="ld-section ld-container">
// //       <div className="ld-section-title">
// //         <Zap size={24} color="#FF1F6D" />
// //         <h2>Featured Classes</h2>
// //       </div>

// //       <div 
// //         className="ld-slider-wrapper"
// //         onMouseEnter={handleMouseEnter}
// //         onMouseLeave={handleMouseLeave}
// //         style={{ position: "relative" }}
// //       >
// //         {/* Slider Container */}
// //         <div 
// //           ref={sliderRef}
// //           className="ld-slider"
// //           style={{
// //             display: "flex",
// //             gap: "1.5rem",
// //             transition: "transform 0.8s ease-in-out",
// //             transform: `translateX(0)`,
// //             overflow: "hidden",
// //           }}
// //         >
// //           {visibleSlides.map((event, idx) => {
// //             const imageSrc = event.imageUrl || null;
// //             return (
// //               <div 
// //                 className="ld-slide-card" 
// //                 key={`${event.id}-${idx}`}
// //                 style={{
// //                   flex: "0 0 calc(33.333% - 1rem)",
// //                   minWidth: "calc(33.333% - 1rem)",
// //                   transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
// //                 }}
// //               >
// //                 <div className="ld-slide-banner" style={{ position: "relative", overflow: "hidden" }}>
// //                   {imageSrc ? (
// //                     <img 
// //                       src={imageSrc} 
// //                       alt={event.title} 
// //                       loading="lazy" 
// //                       style={{ 
// //                         width: "100%", 
// //                         height: "100%", 
// //                         objectFit: "cover",
// //                         display: "block"
// //                       }} 
// //                     />
// //                   ) : (
// //                     <div style={{
// //                       width: "100%",
// //                       height: "100%",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       background: "linear-gradient(135deg, #9333EA, #DB2777)",
// //                       color: "rgba(255,255,255,0.6)",
// //                       fontSize: "3rem"
// //                     }}>
// //                       🎭
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className="ld-slide-body">
// //                   <h3 className="ld-slide-title">{event.title}</h3>
// //                   <p className="ld-slide-desc">{event.description}</p>
// //                   <div className="ld-slide-meta">
// //                     {event.danceStyle && (
// //                       <span style={{ color: "#FF1F6D", fontWeight: 600 }}>
// //                         {event.danceStyle}
// //                       </span>
// //                     )}
// //                     {event.level && <span>• {event.level}</span>}
// //                     {event.venue && (
// //                       <span>
// //                         <MapPin size={12} /> {event.venue}
// //                       </span>
// //                     )}
// //                   </div>
// //                 </div>
// //                 <div className="ld-slide-footer">
// //                   <button
// //                     className="btn-enroll-neon"
// //                     style={{ width: "100%" }}
// //                     disabled={enrollingId === event.id}
// //                     onClick={() => onEnrollClick(event.id)}
// //                   >
// //                     {enrollingId === event.id ? (
// //                       <>
// //                         <Loader2 size={16} className="ld-spin" /> Enrolling…
// //                       </>
// //                     ) : (
// //                       <>
// //                         <Zap size={16} /> Enroll Now
// //                       </>
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Navigation Arrows */}
// //         {totalSlides > 3 && (
// //           <>
// //             <button
// //               onClick={prevSlide}
// //               style={{
// //                 position: "absolute",
// //                 left: "-12px",
// //                 top: "50%",
// //                 transform: "translateY(-50%)",
// //                 zIndex: 10,
// //                 background: "rgba(11,10,15,0.8)",
// //                 border: "1px solid rgba(255,255,255,0.1)",
// //                 borderRadius: "50%",
// //                 width: "40px",
// //                 height: "40px",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 cursor: "pointer",
// //                 color: "#fff",
// //                 transition: "all 0.2s ease",
// //                 backdropFilter: "blur(8px)",
// //               }}
// //               onMouseEnter={(e) => {
// //                 e.target.style.background = "rgba(255,31,109,0.8)";
// //                 e.target.style.transform = "translateY(-50%) scale(1.1)";
// //               }}
// //               onMouseLeave={(e) => {
// //                 e.target.style.background = "rgba(11,10,15,0.8)";
// //                 e.target.style.transform = "translateY(-50%) scale(1)";
// //               }}
// //             >
// //               <ChevronLeft size={20} strokeWidth={2.5} />
// //             </button>
// //             <button
// //               onClick={nextSlide}
// //               style={{
// //                 position: "absolute",
// //                 right: "-12px",
// //                 top: "50%",
// //                 transform: "translateY(-50%)",
// //                 zIndex: 10,
// //                 background: "rgba(11,10,15,0.8)",
// //                 border: "1px solid rgba(255,255,255,0.1)",
// //                 borderRadius: "50%",
// //                 width: "40px",
// //                 height: "40px",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 cursor: "pointer",
// //                 color: "#fff",
// //                 transition: "all 0.2s ease",
// //                 backdropFilter: "blur(8px)",
// //               }}
// //               onMouseEnter={(e) => {
// //                 e.target.style.background = "rgba(255,31,109,0.8)";
// //                 e.target.style.transform = "translateY(-50%) scale(1.1)";
// //               }}
// //               onMouseLeave={(e) => {
// //                 e.target.style.background = "rgba(11,10,15,0.8)";
// //                 e.target.style.transform = "translateY(-50%) scale(1)";
// //               }}
// //             >
// //               <ChevronRight size={20} strokeWidth={2.5} />
// //             </button>
// //           </>
// //         )}

// //         {/* Dots Indicator */}
// //         {totalSlides > 1 && (
// //           <div style={{
// //             display: "flex",
// //             justifyContent: "center",
// //             gap: "0.5rem",
// //             marginTop: "1.5rem"
// //           }}>
// //             {Array.from({ length: totalSlides }).map((_, idx) => (
// //               <button
// //                 key={idx}
// //                 onClick={() => goToSlide(idx)}
// //                 style={{
// //                   width: idx === currentIndex ? "24px" : "10px",
// //                   height: "10px",
// //                   borderRadius: "5px",
// //                   border: "none",
// //                   background: idx === currentIndex ? "#FF1F6D" : "rgba(255,255,255,0.2)",
// //                   cursor: "pointer",
// //                   transition: "all 0.3s ease",
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   if (idx !== currentIndex) {
// //                     e.target.style.background = "rgba(255,31,109,0.5)";
// //                   }
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   if (idx !== currentIndex) {
// //                     e.target.style.background = "rgba(255,255,255,0.2)";
// //                   }
// //                 }}
// //                 aria-label={`Go to slide ${idx + 1}`}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       <div style={{ textAlign: "center", marginTop: "2rem" }}>
// //         <Link href="/events" className="btn-secondary">
// //           More Events <ArrowRight size={16} />
// //         </Link>
// //       </div>
// //     </section>
// //   );
// // }










// // // "use client";

// // // import Link from "next/link";
// // // import { Zap, MapPin, ArrowRight, Loader2 } from "lucide-react";

// // // export default function EventSlider({ events, loadingEvents, enrollingId, onEnrollClick }) {
// // //   return (
// // //     <section className="ld-section ld-container">
// // //       <div className="ld-section-title">
// // //         <Zap size={24} color="#FF1F6D" />
// // //         <h2>Featured Classes</h2>
// // //       </div>

// // //       {loadingEvents ? (
// // //         <div className="ld-slider" style={{ gap: "1.5rem" }}>
// // //           {[1, 2, 3].map((i) => (
// // //             <div className="ld-skeleton ld-skeleton-card" key={i} style={{ flex: "0 0 320px" }} />
// // //           ))}
// // //         </div>
// // //       ) : events.length === 0 ? (
// // //         <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-muted)" }}>
// // //           <p>New events coming soon!</p>
// // //         </div>
// // //       ) : (
// // //         <div className="ld-slider-wrapper">
// // //           <div className="ld-slider">
// // //             {events.map((event) => (
// // //               <div className="ld-slide-card" key={event.id}>
// // //                 <div className="ld-slide-banner">
// // //                   {event.imageUrl && (
// // //                     <img src={event.imageUrl} alt={event.title} loading="lazy" />
// // //                   )}
// // //                 </div>
// // //                 <div className="ld-slide-body">
// // //                   <h3 className="ld-slide-title">{event.title}</h3>
// // //                   <p className="ld-slide-desc">{event.description}</p>
// // //                   <div className="ld-slide-meta">
// // //                     {event.danceStyle && (
// // //                       <span style={{ color: "#FF1F6D", fontWeight: 600 }}>
// // //                         {event.danceStyle}
// // //                       </span>
// // //                     )}
// // //                     {event.level && <span>• {event.level}</span>}
// // //                     {event.venue && (
// // //                       <span>
// // //                         <MapPin size={12} /> {event.venue}
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //                 <div className="ld-slide-footer">
// // //                   <button
// // //                     className="btn-enroll-neon"
// // //                     style={{ width: "100%" }}
// // //                     disabled={enrollingId === event.id}
// // //                     onClick={() => onEnrollClick(event.id)}
// // //                   >
// // //                     {enrollingId === event.id ? (
// // //                       <>
// // //                         <Loader2 size={16} className="ld-spin" /> Enrolling…
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <Zap size={16} /> Enroll Now
// // //                       </>
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div style={{ textAlign: "center", marginTop: "2rem" }}>
// // //         <Link href="/events" className="btn-secondary">
// // //           More Events <ArrowRight size={16} />
// // //         </Link>
// // //       </div>
// // //     </section>
// // //   );
// // // }
