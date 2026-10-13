import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

// Import the 12 authentic internship photos from Elements/INTERNSHIPS/NEW
// @ts-ignore
import img1 from '../../../../Elements/INTERNSHIPS/NEW/creator-space-lab-pudupakkam-chennai-educational-institutions-r9d4cozjn3.webp';
// @ts-ignore
import img2 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (1).webp';
// @ts-ignore
import img3 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (2).webp';
// @ts-ignore
import img4 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (3).webp';
// @ts-ignore
import img5 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (4).webp';
// @ts-ignore
import img6 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (5).webp';
// @ts-ignore
import img7 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (6).webp';
// @ts-ignore
import img8 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (7).webp';
// @ts-ignore
import img9 from '../../../../Elements/INTERNSHIPS/NEW/unnamed (8).webp';
// @ts-ignore
import img10 from '../../../../Elements/INTERNSHIPS/NEW/unnamed.webp';
// @ts-ignore
import img11 from '../../../../Elements/INTERNSHIPS/NEW/WhatsApp Image 2026-09-29 at 10.42.20 AM.jpeg';
// @ts-ignore
import img12 from '../../../../Elements/INTERNSHIPS/NEW/WhatsApp Image 2026-09-29 at 10.42.27 AM.jpeg';

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  { id: 1, src: img1, alt: 'CSL Internship cohort presenting project certificates at the lab' },
  { id: 2, src: img2, alt: 'Internship participants celebrating successful program completion' },
  { id: 3, src: img3, alt: 'Interns receiving practical training certificates at Creator Space Lab' },
  { id: 4, src: img4, alt: 'Engineering students with completed project credentials' },
  { id: 5, src: img5, alt: 'Internship cohort group at Creator Space Lab' },
  { id: 6, src: img6, alt: 'Hands-on practical training experience at CSL' },
  { id: 7, src: img7, alt: 'Student team celebrating project milestones' },
  { id: 8, src: img8, alt: 'CSL interns collaborating during lab session' },
  { id: 9, src: img9, alt: 'Hands-on project work and certificate distribution' },
  { id: 10, src: img10, alt: 'Internship batch completion at Creator Space Lab' },
  { id: 11, src: img11, alt: 'Certificate presentation following project review' },
  { id: 12, src: img12, alt: 'Mentor presenting internship completion certificate' },
];

// Background Yellow Voxel Floating Blocks specifically positioned for Gallery
const galleryYellowBlocks = [
  { size: 'w-10 h-10', pos: 'top-[8%] left-[5%]', delay: 0.2, duration: 7 },
  { size: 'w-20 h-20', pos: 'top-[36%] left-[7%]', delay: 0.8, duration: 8.5 },
  { size: 'w-14 h-14', pos: 'top-[12%] right-[6%]', delay: 1.2, duration: 7.5 },
  { size: 'w-9 h-9', pos: 'bottom-[12%] right-[8%]', delay: 0.5, duration: 6.5 },
  { size: 'w-8 h-8', pos: 'bottom-[14%] left-[10%]', delay: 1.5, duration: 8 },
];

export function InternshipGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = GALLERY_PHOTOS.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay rhythm:
  // PAUSE (4.2s) -> MOVE (smooth transition) -> PAUSE
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Helper to determine role of each slide relative to currentIndex
  const getSlidePosition = (index: number) => {
    const diff = (index - currentIndex + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    return 'hidden';
  };

  return (
    <section 
      id="gallery" 
      className="relative w-full py-12 md:py-16 bg-[#FBF7F4] border-y border-csl-gold/20 overflow-hidden"
      aria-label="Internship Experience Gallery"
    >
      {/* CSL Floating Yellow Boxes Background */}
      <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto opacity-70">
        {galleryYellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      {/* Decorative ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-csl-gold/15 via-csl-blue/8 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 section-container">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-10 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <Sparkles className="w-3.5 h-3.5 text-csl-gold" />
            <span>Life at CSL</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
            Internship <span className="text-csl-blue">Experience</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading mx-auto">
            A glimpse into the real learning environment, mentor interactions, and project achievements of students at Creator Space Lab.
          </p>
        </div>

        {/* Photographed Stack Carousel Container (Tight, optically centered, scaled +12-15%) */}
        <div 
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative w-full max-w-5xl mx-auto h-[325px] sm:h-[385px] md:h-[435px] lg:h-[475px] flex items-center justify-center select-none outline-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Internship life photo stack"
        >
          {/* Photos Stack Wrapper - Symmetrically centered on page axis */}
          <div className="relative w-full h-full flex items-center justify-center">
            {GALLERY_PHOTOS.map((photo, index) => {
              const position = getSlidePosition(index);
              const isCenter = position === 'center';
              const isLeft = position === 'left';
              const isRight = position === 'right';

              if (position === 'hidden') {
                return null;
              }

              // Motion configuration for symmetrical, tighter overlapping stack
              let animateConfig = {};
              let zIndex = 10;

              if (isCenter) {
                // Dominant center card: exactly at optical center
                animateConfig = {
                  x: '-50%',
                  y: '-50%',
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                  filter: 'brightness(1)',
                };
                zIndex = 30;
              } else if (isLeft) {
                // Left card: symmetrically tucked slightly behind left edge
                animateConfig = {
                  x: 'calc(-50% - 27%)',
                  y: 'calc(-50% + 4px)',
                  rotate: -6,
                  scale: 0.86,
                  opacity: 0.78,
                  filter: 'brightness(0.92)',
                };
                zIndex = 15;
              } else if (isRight) {
                // Right card: symmetrically tucked slightly behind right edge
                animateConfig = {
                  x: 'calc(-50% + 27%)',
                  y: 'calc(-50% - 4px)',
                  rotate: 6,
                  scale: 0.86,
                  opacity: 0.78,
                  filter: 'brightness(0.92)',
                };
                zIndex = 15;
              }

              return (
                <motion.div
                  key={photo.id}
                  className={`absolute top-1/2 left-1/2 w-[84%] sm:w-[62%] md:w-[52%] lg:w-[46%] max-w-[480px] cursor-pointer ${
                    !isCenter ? 'hidden sm:block' : ''
                  }`}
                  style={{ zIndex }}
                  initial={false}
                  animate={animateConfig}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1], // Smooth, premium ease-out
                  }}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    if (isRight) handleNext();
                  }}
                >
                  {/* Tactile Photographic Card Frame */}
                  <div className={`relative p-2 sm:p-3 bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                    isCenter 
                      ? 'border-csl-gold/50 shadow-[0_16px_40px_rgba(0,30,80,0.16)] ring-1 ring-csl-gold/20' 
                      : 'border-csl-gold/20 shadow-[0_10px_25px_rgba(0,30,80,0.08)] hover:border-csl-gold/45'
                  }`}>
                    {/* Photo Container with fixed 4:3 aspect ratio */}
                    <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-csl-bg">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading={isCenter ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover"
                      />
                      {/* Subtle ambient inner border */}
                      <div className="absolute inset-0 ring-1 ring-black/5 rounded-xl sm:rounded-2xl pointer-events-none" />
                    </div>

                    {/* Subtle Polaroid-style bottom bar with logo and badge */}
                    <div className="pt-2 px-1.5 flex items-center justify-between text-csl-muted text-[11px] sm:text-xs">
                      <span className="font-semibold tracking-wider text-csl-deep-blue uppercase text-[10px] sm:text-[11px]">
                        Creator Space Lab
                      </span>
                      <span className="font-mono text-csl-gold font-bold">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Symmetrical Carousel Navigation Controls */}
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-1 sm:left-2 md:-left-2 lg:-left-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-csl-gold/40 text-csl-deep-blue shadow-md hover:bg-csl-blue hover:text-white hover:border-csl-blue transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-csl-blue/40"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-1 sm:right-2 md:-right-2 lg:-right-3 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-csl-gold/40 text-csl-deep-blue shadow-md hover:bg-csl-blue hover:text-white hover:border-csl-blue transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-csl-blue/40"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Carousel Progress Indicators (No status or autoplay text) */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            {GALLERY_PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === currentIndex 
                    ? 'w-6 h-1.5 bg-csl-blue' 
                    : 'w-1.5 h-1.5 bg-csl-gold/40 hover:bg-csl-gold'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
