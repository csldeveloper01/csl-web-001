import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DecryptText } from '../effects/DecryptTitle';

// @ts-expect-error
import state1 from '../../../Elements/HERO/STATE 1.png';
// @ts-expect-error
import state2 from '../../../Elements/HERO/STATE 2.png';
// @ts-expect-error
import state3 from '../../../Elements/HERO/STATE 3.png';
// @ts-expect-error
import state4 from '../../../Elements/HERO/STATE 4.png';

interface HotspotPiece {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
  offset: string;
  panelTop: string;
}

const pieces: HotspotPiece[] = [
  {
    id: 'learn',
    title: 'LEARN',
    subtitle: 'Build the skills that shape your future.',
    description: 'Hands-on learning, industry-ready knowledge, and practical experience.',
    src: state1,
    offset: 'ml-0',
    panelTop: 'md:top-[-10px]',
  },
  {
    id: 'build',
    title: 'BUILD',
    subtitle: 'Turn knowledge into something real.',
    description: 'Work on projects that transform concepts into working solutions.',
    src: state2,
    offset: 'ml-12',
    panelTop: 'md:top-[85px]',
  },
  {
    id: 'create',
    title: 'CREATE',
    subtitle: 'Ideas become impact when you create.',
    description: 'Experiment, design, innovate, and bring your ideas to life.',
    src: state3,
    offset: '-ml-4',
    panelTop: 'md:top-[190px]',
  },
  {
    id: 'grow',
    title: 'GROW',
    subtitle: 'Keep learning. Keep evolving.',
    description: 'Gain experience, discover opportunities, and grow with every step',
    src: state4,
    offset: 'ml-0 translate-y-14 -translate-x-6',
    panelTop: 'md:top-[305px]',
  },
];

export function HeroVisual() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mobile scroll-based active state trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) return; // Desktop handles hover
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;

      if (scrollY < windowH * 0.15) {
        setHoveredId('learn');
      } else if (scrollY < windowH * 0.3) {
        setHoveredId('build');
      } else if (scrollY < windowH * 0.45) {
        setHoveredId('create');
      } else if (scrollY < windowH * 0.6) {
        setHoveredId('grow');
      } else {
        setHoveredId(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[520px] lg:h-[660px] flex flex-col items-center justify-center pt-4 sm:pt-10 lg:pt-0">
      
      {/* Voxel Bitmap Pieces Container with Original Hover & Float Behavior */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[380px]">
        {pieces.map((piece, index) => {
          const isHovered = hoveredId === piece.id;
          const isOtherHovered = hoveredId !== null && hoveredId !== piece.id;

          return (
            <motion.div
              key={piece.id}
              className={`relative flex items-center justify-center w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[320px] ${piece.offset} ${
                index !== 0 ? '-mt-12 lg:-mt-20' : ''
              }`}
              style={{ zIndex: (index + 1) * 10 }}
              onMouseEnter={() => setHoveredId(piece.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setHoveredId(piece.id)}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4,
              }}
            >
              {/* Original Interactive Bitmap Asset with Hover Responsive Dynamics */}
              <img
                src={piece.src}
                alt={`Hero ${piece.title}`}
                className={`w-full h-auto drop-shadow-2xl transition-all duration-500 ease-out cursor-pointer select-none ${
                  isHovered
                    ? 'scale-110 -translate-y-4 brightness-110 drop-shadow-[0_20px_30px_rgba(245,184,61,0.2)]'
                    : isOtherHovered
                    ? 'grayscale opacity-50 scale-95'
                    : ''
                }`}
              />

              {/* Anchor Connector Node (on the left edge of bitmap on desktop) */}
              <div 
                className={`absolute -left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-[#FFB703] transition-all duration-300 pointer-events-none z-30 ${
                  isHovered ? 'bg-[#FFB703] scale-125 shadow-[0_0_10px_#FFB703]' : 'bg-white/40 opacity-0'
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Stained-Glass Hotspot Panels:
          - Mobile: Perfectly centered in the viewport
          - Desktop: Snug right beside the active hovered state
      */}
      <AnimatePresence mode="wait">
        {pieces.map((piece) => {
          if (hoveredId !== piece.id) return null;

          return (
            <motion.div
              key={`panel-${piece.id}`}
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:translate-x-0 md:translate-y-0 md:left-[-125px] lg:md:left-[-135px] xl:md:left-[-145px] ${piece.panelTop} z-50 w-[270px] sm:w-[285px] md:w-[245px] pointer-events-none`}
            >
              {/* Stained Glass Panel Box */}
              <div className="relative bg-[#FFFBEA]/95 md:bg-[#FFFBEA]/90 backdrop-blur-md border border-[#FFB703]/70 md:border-[#FFB703]/60 shadow-2xl shadow-[#FFB703]/25 md:shadow-xl md:shadow-[#FFB703]/15 rounded-xl p-3.5 md:p-4 flex flex-col">
                
                {/* Connector Line to the Bitmap on Desktop */}
                <div className="absolute top-1/2 -right-3 w-3 h-[1.5px] bg-[#FFB703]/70 pointer-events-none hidden md:block" />

                {/* Header with Title Decrypt Animation ONLY */}
                <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[#FFB703]/30">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-3 bg-gradient-to-b from-csl-blue to-csl-deep-blue rounded-sm" />
                    <DecryptText
                      text={piece.title}
                      isActive={hoveredId === piece.id}
                      speed={26}
                      className="text-xs md:text-sm font-extrabold tracking-widest text-csl-blue font-mono uppercase"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-csl-gold/80 uppercase tracking-wider">
                    CSL
                  </span>
                </div>

                {/* Subtitle (Static text) */}
                <h4 className="text-[11px] md:text-xs font-bold text-csl-text leading-snug mb-1">
                  {piece.subtitle}
                </h4>

                {/* Description (Static text) */}
                <p className="text-[10px] md:text-[11px] text-csl-muted font-medium leading-relaxed">
                  {piece.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

    </div>
  );
}
