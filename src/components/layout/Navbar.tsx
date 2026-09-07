import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Briefcase, Layers, Mail, LayoutGrid, X, Cpu, Info, ArrowUpRight } from 'lucide-react';

// @ts-ignore
import cslTypography from '../../../Elements/LOGOS/CSL-TYPOGRAPHY.png';

interface NavItem {
  label: string;
  targetId: string;
  isHomeLink?: boolean;
  icon: any;
}

const homeNavItems: NavItem[] = [
  { label: 'About Us', targetId: 'about', icon: Info },
  { label: 'Courses', targetId: 'courses', icon: BookOpen },
  { label: 'Services', targetId: 'services', icon: Layers },
  { label: 'Internships', targetId: 'internships', icon: Briefcase },
  { label: 'Workshops', targetId: 'workshops', icon: Cpu },
  { label: 'Contact', targetId: 'contact', icon: Mail },
];

const standaloneNavItems: NavItem[] = [
  { label: 'Home', targetId: 'hero', isHomeLink: true, icon: Home },
  { label: 'About Us', targetId: 'about', icon: Info },
  { label: 'Courses', targetId: 'courses', icon: BookOpen },
  { label: 'Services', targetId: 'services', icon: Layers },
  { label: 'Internships', targetId: 'internships', icon: Briefcase },
  { label: 'Workshops', targetId: 'workshops', icon: Cpu },
  { label: 'Contact', targetId: 'contact', icon: Mail },
];

const allDrawerSections = [
  { label: 'Home', targetId: 'hero', isHomeLink: true, desc: 'Return to Homepage Top' },
  { label: 'About Us', targetId: 'about', desc: 'Who We Are & Brand Story' },
  { label: 'Courses', targetId: 'courses', desc: 'Career-Ready Programs & Catalogue' },
  { label: 'Services', targetId: 'services', desc: 'End-to-End Solutions & Case Studies' },
  { label: 'Internships', targetId: 'internships', desc: 'Hands-On Real Experience' },
  { label: 'Tie-Ups', targetId: 'tie-ups', desc: 'Industry Partnerships' },
  { label: 'Success Stories', targetId: 'success-stories', desc: 'Student Placements' },
  { label: 'Workshops', targetId: 'workshops', desc: 'Hands-On Tech Workshops' },
  { label: 'Contact', targetId: 'contact', desc: 'Get in Touch With Us' },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const isStandalonePage = 
    currentPath === '/about' || 
    currentPath === '/courses' || 
    currentPath === '/services' || 
    currentPath === '/internships' || 
    currentPath === '/workshops';

  useEffect(() => {
    const handleScroll = () => {
      const path = window.location.pathname;
      if (path !== '/' || window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleLocationChange);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleScrollTo = (targetId: string, isHomeLink: boolean = false) => {
    setIsMenuOpen(false);

    // If clicking Home or targeting Hero: Navigate to homepage top (0, 0)
    if (isHomeLink || targetId === 'hero') {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // If on a standalone page, navigate to homepage (/) and scroll to target section
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // If already on homepage, scroll directly to section element
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeNavItems = isStandalonePage ? standaloneNavItems : homeNavItems;
  const activeDrawerSections = isStandalonePage ? allDrawerSections : allDrawerSections.filter(s => !s.isHomeLink);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 sm:top-6 inset-x-0 mx-auto w-[94%] max-w-[1400px] z-50 px-4 sm:px-6 py-2 sm:py-2.5 md:px-8 lg:px-12 flex items-center justify-between bg-csl-bg/90 backdrop-blur-md shadow-lg border border-csl-gold/20 rounded-2xl"
          >
            {/* Left side: Logo */}
            <div className="flex items-center">
              <img 
                src={cslTypography} 
                alt="Creator Space Lab" 
                className="h-6 sm:h-7 md:h-8 w-auto object-contain cursor-pointer drop-shadow-sm"
                onClick={() => handleScrollTo('hero', true)}
              />
            </div>

            {/* Desktop Links (with Little Square Boxes) */}
            <div className="custom1195:hidden flex flex-1 items-center justify-center gap-8 lg:gap-10">
              {activeNavItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.targetId, item.isHomeLink)}
                  className="group flex items-center gap-2.5 font-bold text-sm lg:text-[15px] transition-colors cursor-pointer text-csl-text hover:text-csl-blue"
                >
                  {item.label}
                  {/* Little Square Box Indicator */}
                  <span 
                    className="w-1.5 h-1.5 rounded-[1px] bg-csl-gold transition-all shadow-xs opacity-80 group-hover:opacity-100 group-hover:scale-125" 
                  />
                </button>
              ))}
            </div>

            {/* Mobile Navigation Icons + 2x2 "More" Icon */}
            <div className="hidden custom1195:flex items-center gap-2.5 sm:gap-3.5">
              {activeNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleScrollTo(item.targetId, item.isHomeLink)}
                    aria-label={item.label}
                    className="p-1.5 rounded-lg transition-colors text-csl-text hover:text-csl-blue hover:bg-csl-gold/10"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}

              {/* 2x2 Grid Icon for all sections */}
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="More navigation options"
                className="p-1.5 rounded-lg text-csl-blue bg-csl-blue/10 border border-csl-blue/20 hover:bg-csl-blue hover:text-white transition-all shadow-sm"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Right: CTA (Desktop) */}
            <div className="hidden md:block">
              <button 
                onClick={() => { window.history.pushState({}, '', '/student-portal'); window.dispatchEvent(new PopStateEvent('popstate')); } }
                className="group flex items-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-5 py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:shadow-lg hover:shadow-csl-blue/20 transition-all duration-300 cursor-pointer"
              >
                Student Portal
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Full-Page Glassmorphic Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] backdrop-blur-2xl bg-csl-bg/90 flex flex-col justify-between p-5 sm:p-7 overflow-y-auto"
          >
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-csl-gold/25">
              <img 
                src={cslTypography} 
                alt="Creator Space Lab" 
                className="h-6 sm:h-7 w-auto object-contain cursor-pointer"
                onClick={() => handleScrollTo('hero', true)}
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full bg-white/90 border border-csl-gold/30 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:scale-105 transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Animated In Content Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="my-auto py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto w-full"
            >
              {activeDrawerSections.map((section, idx) => (
                <button
                  key={section.label}
                  onClick={() => handleScrollTo(section.targetId, section.isHomeLink)}
                  className="group flex flex-col text-left p-3.5 bg-white/70 backdrop-blur-md border border-csl-gold/25 hover:border-csl-gold/70 rounded-2xl hover:bg-white/95 hover:shadow-lg hover:shadow-csl-gold/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between w-full mb-0.5">
                    <span className="text-sm font-bold text-csl-text group-hover:text-csl-blue transition-colors">
                      {section.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-csl-blue">
                      0{idx + 1}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-csl-muted leading-tight">
                    {section.desc}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Footer Area */}
            <div className="pt-4 border-t border-csl-gold/20 flex flex-col w-full max-w-lg mx-auto">
              <button
                onClick={() => { window.history.pushState({}, '', '/student-portal'); window.dispatchEvent(new PopStateEvent('popstate')); } }
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Student Portal
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
