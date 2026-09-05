import { motion, AnimatePresence } from 'framer-motion';

export interface SectionInfo {
  id: string;
  title: string;
}

export const HOMEPAGE_SECTIONS: SectionInfo[] = [
  { id: 'hero', title: 'HERO' },
  { id: 'about', title: 'ABOUT' },
  { id: 'courses', title: 'COURSES' },
  { id: 'internships', title: 'INTERNSHIPS' },
  { id: 'services', title: 'SERVICES' },
  { id: 'tie-ups', title: 'TIE-UPS' },
  { id: 'success-stories', title: 'SUCCESS STORIES' },
  { id: 'contact', title: 'CONTACT' },
];

export const SECTIONS = HOMEPAGE_SECTIONS;

interface NavigationRailProps {
  activeSection: string;
  sections?: SectionInfo[];
  onNavigate?: (id: string) => void;
}

export function NavigationRail({ activeSection, sections = HOMEPAGE_SECTIONS, onNavigate }: NavigationRailProps) {
  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  const handleScrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Compute dynamic sliding window of 3 to 5 items centered on activeIndex
  const minIndex = Math.max(0, currentIndex - 2);
  const maxIndex = Math.min(sections.length - 1, currentIndex + 2);
  const visibleSections = sections.slice(minIndex, maxIndex + 1);

  return (
    <div 
      className="fixed left-3 lg:left-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center pointer-events-auto select-none py-4"
      aria-label="Section progress rail"
    >
      {/* Background Vertical Hairline */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-csl-gold/30 to-transparent pointer-events-none" />

      {/* Dynamic 3 to 5 Window List Centered on Active */}
      <div className="flex flex-col items-center gap-6 lg:gap-7 relative z-10">
        <AnimatePresence mode="popLayout">
          {visibleSections.map((section) => {
            const originalIndex = sections.findIndex((s) => s.id === section.id);
            const distance = Math.abs(originalIndex - currentIndex);
            const isActive = originalIndex === currentIndex;

            // Opacity levels: Active = 100%, Adjacent (dist=1) = 55%, Outer (dist=2) = 25%
            let opacityClass = 'opacity-25 text-csl-muted hover:opacity-60';
            if (isActive) {
              opacityClass = 'opacity-100 text-csl-blue font-bold scale-105';
            } else if (distance === 1) {
              opacityClass = 'opacity-55 text-csl-text font-semibold hover:opacity-85';
            }

            return (
              <motion.button
                key={section.id}
                layout
                initial={{ opacity: 0, y: originalIndex > currentIndex ? 12 : -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: originalIndex > currentIndex ? 12 : -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleScrollTo(section.id)}
                aria-label={`Scroll to ${section.title}`}
                className="group relative flex flex-col items-center py-1 focus:outline-none cursor-pointer"
              >
                {/* Active Marker Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="rail-active-indicator"
                    className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full bg-gradient-to-b from-csl-blue to-csl-deep-blue shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Vertical Section Title */}
                <span
                  className={`text-[9px] lg:text-[10px] tracking-widest uppercase transition-all duration-300 ${opacityClass}`}
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                  }}
                >
                  {section.title}
                </span>

                {/* Subtle Node Dot */}
                <div 
                  className={`w-1.5 h-1.5 rounded-full mt-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-csl-blue scale-125' 
                      : distance === 1
                      ? 'bg-csl-gold/60 group-hover:bg-csl-gold group-hover:scale-110'
                      : 'bg-csl-gold/30 group-hover:bg-csl-gold/70'
                  }`} 
                />
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
