import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Briefcase, Layers, Mail, X, Cpu, Info, ArrowUpRight, ChevronDown, ChevronRight, Cloud, Brain, BarChart3, PieChart, Palette, ShieldCheck, CheckSquare, Megaphone } from 'lucide-react';
import { coursesCatalog } from '../pages/CoursesPage';

// @ts-ignore
import cslTypography from '../../../Elements/LOGOS/CSL-TYPOGRAPHY.png';

interface NavItem {
  label: string;
  targetId: string;
  isHomeLink?: boolean;
  icon: any;
}

const homeNavItems: NavItem[] = [
  { label: 'Home', targetId: 'hero', isHomeLink: true, icon: Home },
  { label: 'About Us', targetId: 'about', icon: Info },
  { label: 'Courses', targetId: 'courses', icon: BookOpen },
  { label: 'Services', targetId: 'services', icon: Layers },
  { label: 'Internships', targetId: 'internships', icon: Briefcase },
  { label: 'Careers', targetId: 'careers', icon: Briefcase },
  { label: 'Workshops', targetId: 'workshops', icon: Cpu },
  { label: 'Contact', targetId: 'contact', icon: Mail },
];

const standaloneNavItems: NavItem[] = [
  { label: 'Home', targetId: 'hero', isHomeLink: true, icon: Home },
  { label: 'About Us', targetId: 'about', icon: Info },
  { label: 'Courses', targetId: 'courses', icon: BookOpen },
  { label: 'Services', targetId: 'services', icon: Layers },
  { label: 'Internships', targetId: 'internships', icon: Briefcase },
  { label: 'Careers', targetId: 'careers', icon: Briefcase },
  { label: 'Workshops', targetId: 'workshops', icon: Cpu },
  { label: 'Contact', targetId: 'contact', icon: Mail },
];

const allDrawerSections = [
  { label: 'Home', targetId: 'hero', isHomeLink: true, desc: 'Return to Homepage Top' },
  { label: 'About Us', targetId: 'about', desc: 'Who We Are & Brand Story' },
  { label: 'Courses', targetId: 'courses', desc: 'Career-Ready Programs & Catalogue' },
  { label: 'Services', targetId: 'services', desc: 'End-to-End Solutions & Case Studies' },
  { label: 'Internships', targetId: 'internships', desc: 'Hands-On Real Experience' },
  { label: 'Careers', targetId: 'careers', desc: 'Current Openings & Opportunities' },
  { label: 'Tie-Ups', targetId: 'tie-ups', desc: 'Industry Partnerships' },
  { label: 'Success Stories', targetId: 'success-stories', desc: 'Student Placements' },
  { label: 'Workshops', targetId: 'workshops', desc: 'Hands-On Tech Workshops' },
  { label: 'Contact', targetId: 'contact', desc: 'Get in Touch With Us' },
];

// ==================================================
// COURSES MEGA-MENU DATA
// Derived from the canonical coursesCatalog (Courses page)
// so the navbar stays automatically synchronized with it.
// ==================================================
const COURSE_CATEGORY_ORDER = [
  'Development',
  'AI/ML',
  'Data Science',
  'Data Analytics',
  'Cloud',
  'Design',
  'Testing & QA',
  'Cybersecurity',
  'Enterprise Systems',
  'Business Analysis',
  'Marketing',
] as const;

const courseCategoryDisplay: Record<string, { icon: any }> = {
  'Development': { icon: BookOpen },
  'AI/ML': { icon: Brain },
  'Data Science': { icon: BarChart3 },
  'Data Analytics': { icon: PieChart },
  'Cloud': { icon: Cloud },
  'Design': { icon: Palette },
  'Testing & QA': { icon: CheckSquare },
  'Cybersecurity': { icon: ShieldCheck },
  'Enterprise Systems': { icon: Layers },
  'Business Analysis': { icon: Briefcase },
  'Marketing': { icon: Megaphone },
};

interface CourseMenuCategory {
  name: string;
  icon: any;
  courses: { id: string; title: string }[];
}

const courseMenuCategories: CourseMenuCategory[] = COURSE_CATEGORY_ORDER
  .map((category) => ({
    name: category,
    icon: courseCategoryDisplay[category]?.icon ?? BookOpen,
    courses: coursesCatalog
      .filter((course) => course.category === category)
      .map((course) => ({ id: course.id, title: course.title })),
  }))
  .filter((category) => category.courses.length > 0);


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);
  const [isMobileCareersOpen, setIsMobileCareersOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const coursesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const careersCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Environment-based external assessment app URL (Vite client env convention)
  const rawAssessmentUrl = import.meta.env.VITE_ONLINE_ASSESSMENT_URL;
  const isAssessmentUrlValid = typeof rawAssessmentUrl === 'string' && /^https?:\/\/.+/i.test(rawAssessmentUrl.trim());
  const assessmentUrl = isAssessmentUrlValid ? rawAssessmentUrl.trim() : '';

  const openCoursesMenu = () => {
    if (coursesCloseTimer.current) {
      clearTimeout(coursesCloseTimer.current);
      coursesCloseTimer.current = null;
    }
    setIsCoursesOpen(true);
    setIsCareersOpen(false);
  };

  const closeCoursesMenuWithDelay = () => {
    if (coursesCloseTimer.current) clearTimeout(coursesCloseTimer.current);
    coursesCloseTimer.current = setTimeout(() => {
      setIsCoursesOpen(false);
      coursesCloseTimer.current = null;
    }, 160);
  };

  const openCareersMenu = () => {
    if (careersCloseTimer.current) {
      clearTimeout(careersCloseTimer.current);
      careersCloseTimer.current = null;
    }
    setIsCareersOpen(true);
    setIsCoursesOpen(false);
  };

  const closeCareersMenuWithDelay = () => {
    if (careersCloseTimer.current) clearTimeout(careersCloseTimer.current);
    careersCloseTimer.current = setTimeout(() => {
      setIsCareersOpen(false);
      careersCloseTimer.current = null;
    }, 160);
  };

  useEffect(() => {
    return () => {
      if (coursesCloseTimer.current) clearTimeout(coursesCloseTimer.current);
      if (careersCloseTimer.current) clearTimeout(careersCloseTimer.current);
    };
  }, []);

  const isStandalonePage =
    currentPath === '/about' ||
    currentPath === '/courses' ||
    currentPath === '/services' ||
    currentPath === '/internships' ||
    currentPath === '/careers' ||
    currentPath === '/workshops';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setIsCoursesOpen(false);
      setIsMobileCoursesOpen(false);
      setIsCareersOpen(false);
      setIsMobileCareersOpen(false);
      handleScroll();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsCoursesOpen(false);
        setIsMobileCoursesOpen(false);
        setIsCareersOpen(false);
        setIsMobileCareersOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleLocationChange);
    handleScroll();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const isItemActive = (targetId: string, isHomeLink?: boolean) => {
    if (isHomeLink || targetId === 'hero') {
      return currentPath === '/' && !activeSection;
    }
    if (targetId === 'contact') {
      return activeSection === 'contact';
    }
    return currentPath === `/${targetId}`;
  };

  const handleScrollTo = (targetId: string, isHomeLink: boolean = false) => {
    // Only Contact can use activeSection.
    // Navigating anywhere else clears the Contact active state.
    setActiveSection(targetId === 'contact' ? 'contact' : null);

    setIsMenuOpen(false);
    setIsCoursesOpen(false);
    setIsMobileCoursesOpen(false);

    // If target is contact, scroll specifically to the contact form rather than the section heading
    const resolvedTargetId = targetId === 'contact' ? 'contact-form' : targetId;

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

    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const el = document.getElementById(resolvedTargetId) || document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(resolvedTargetId) || document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToCoursesPage = () => {
    setActiveSection(null);
    
    setIsMenuOpen(false);
    setIsCoursesOpen(false);
    setIsMobileCoursesOpen(false);
    setIsCareersOpen(false);
    setIsMobileCareersOpen(false);
    if (window.location.pathname !== '/courses') {
      window.history.pushState({}, '', '/courses');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCareersOpenings = () => {
    setActiveSection(null);

    setIsMenuOpen(false);
    setIsCoursesOpen(false);
    setIsMobileCoursesOpen(false);
    setIsCareersOpen(false);
    setIsMobileCareersOpen(false);

    if (window.location.pathname !== '/careers') {
      window.history.pushState({}, '', '/careers#openings');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      setTimeout(() => {
        const el = document.getElementById('openings');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('openings');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const activeNavItems = isStandalonePage ? standaloneNavItems : homeNavItems;
  const activeDrawerSections = isStandalonePage ? allDrawerSections : allDrawerSections.filter(s => !s.isHomeLink);

  return (
    <>
      <AnimatePresence>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 inset-x-0 w-full z-50 px-3.5 xs:px-4.5 sm:px-6 py-2.5 xs:py-3 sm:py-2.5 md:px-8 lg:px-12 min-h-[52px] sm:min-h-0 flex items-center justify-between bg-csl-bg border border-csl-gold/20 rounded-2xl ${isScrolled ? 'shadow-md' : ''}`}
        >
          {/* Left side: Logo */}
          <div className="flex items-center shrink-0">
            <img
              src={cslTypography}
              alt="Creator Space Lab"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain cursor-pointer drop-shadow-sm max-w-[130px] xs:max-w-none"
              onClick={() => handleScrollTo('hero', true)}
            />
          </div>

          {/* Desktop Links */}
          <div className="custom1195:hidden flex flex-1 items-center justify-center gap-6 xl:gap-8 2xl:gap-10">
            {activeNavItems.map(item => (
              item.label === 'Courses' ? (
                /* COURSES — Static Multi-Column Mega Dropdown Trigger */
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openCoursesMenu}
                  onMouseLeave={closeCoursesMenuWithDelay}
                >
                  <button
                    onClick={handleNavigateToCoursesPage}
                    onMouseEnter={openCoursesMenu}
                    aria-expanded={isCoursesOpen}
                    aria-haspopup="true"
                    className={`group flex items-center gap-2.5 font-bold text-sm lg:text-[15px] transition-colors cursor-pointer ${
                      currentPath === '/courses' || isCoursesOpen
                        ? 'text-csl-blue'
                        : 'text-csl-text hover:text-csl-blue'
                    }`}>
                    {item.label}
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-csl-gold transition-all shadow-xs opacity-80 group-hover:opacity-100 group-hover:scale-125" />
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isCoursesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Mega Dropdown Panel — anchored under the navbar container */}
                  <AnimatePresence>
                    {isCoursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-0 mx-auto top-[60px] w-[min(1080px,calc(100vw-32px))] z-50"
                        onMouseEnter={openCoursesMenu}
                        onMouseLeave={closeCoursesMenuWithDelay}
                      >
                        <div className="bg-white border border-csl-gold/30 rounded-2xl shadow-xl shadow-csl-blue/5 overflow-hidden max-h-[calc(100vh-80px)] flex flex-col">
                          {/* Panel Header */}
                          <div className="shrink-0 flex items-center justify-between gap-3 px-7 pt-5 pb-4 border-b border-csl-gold/20 bg-white">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] font-bold tracking-widest uppercase text-csl-blue">
                                Course Catalogue
                              </span>
                              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
                            </div>
                            <button
                              onClick={handleNavigateToCoursesPage}
                              className="flex items-center gap-1.5 text-[11px] font-bold text-csl-blue hover:text-csl-deep-blue transition-colors cursor-pointer"
                            >
                              View All Courses
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Compact Multi-Column Masonry/Grid Category Layout */}
                          <div className="px-5 sm:px-7 py-4 overflow-y-auto max-h-[calc(100vh-160px)] columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                            {courseMenuCategories.map((category) => {
                              const CategoryIcon = category.icon;
                              return (
                                <div key={category.name} className="break-inside-avoid w-full bg-white/70 p-3 rounded-xl border border-csl-gold/20 hover:border-csl-gold/50 hover:bg-white transition-all shadow-xs">
                                  {/* Category Heading */}
                                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-csl-gold/25">
                                    <CategoryIcon className="w-3.5 h-3.5 text-csl-gold shrink-0" />
                                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-csl-text">
                                      {category.name}
                                    </span>
                                  </div>
                                  {/* Course Links — deep links to course cards on the Courses page */}
                                  <ul className="flex flex-col space-y-0.5">
                                    {category.courses.map((course) => (
                                      <li key={course.id}>
                                        <a
                                          href={`/courses#${course.id}`}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setIsCoursesOpen(false);
                                            window.history.pushState({}, '', `/courses#${course.id}`);
                                            window.dispatchEvent(new PopStateEvent('popstate'));
                                            window.dispatchEvent(new HashChangeEvent('hashchange'));
                                          }}
                                          className="group/item flex items-center justify-between gap-1.5 py-1 px-1.5 rounded text-[12px] font-semibold text-csl-muted hover:text-csl-blue hover:bg-csl-blue/[0.04] transition-colors cursor-pointer"
                                        >
                                          <span className="leading-snug line-clamp-1">{course.title}</span>
                                          <ChevronRight className="w-3 h-3 shrink-0 opacity-0 -translate-x-0.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-csl-blue" />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.label === 'Careers' ? (
                /* CAREERS — Custom Dropdown Trigger (Openings & Online Assessment) */
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openCareersMenu}
                  onMouseLeave={closeCareersMenuWithDelay}
                >
                  <button
                    onClick={handleNavigateToCareersOpenings}
                    onMouseEnter={openCareersMenu}
                    aria-expanded={isCareersOpen}
                    aria-haspopup="true"
                    className={`group flex items-center gap-2.5 font-bold text-sm lg:text-[15px] transition-colors cursor-pointer ${
                      currentPath === '/careers' || isCareersOpen
                        ? 'text-csl-blue'
                        : 'text-csl-text hover:text-csl-blue'
                    }`}>
                    {item.label}
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-csl-gold transition-all shadow-xs opacity-80 group-hover:opacity-100 group-hover:scale-125" />
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isCareersOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Custom Dropdown Menu */}
                  <AnimatePresence>
                    {isCareersOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, x: '-50%', scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                        exit={{ opacity: 0, y: 6, x: '-50%', scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full pt-2 z-50 w-64 origin-top"
                        onMouseEnter={openCareersMenu}
                        onMouseLeave={closeCareersMenuWithDelay}
                      >
                        <div className="relative overflow-hidden rounded-2xl border border-csl-gold/30 bg-white/95 backdrop-blur-xl p-2 shadow-xl shadow-csl-blue/10">
                          {/* Subtle CSL Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-csl-blue/5 via-transparent to-csl-gold/10 pointer-events-none" />

                          <div className="relative flex flex-col gap-1">
                            {/* 1. Openings */}
                            <button
                              onClick={handleNavigateToCareersOpenings}
                              className="group/link flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-left text-xs md:text-sm font-semibold text-csl-text hover:bg-csl-blue/10 hover:text-csl-blue transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                <Briefcase className="w-4 h-4 text-csl-blue shrink-0" />
                                <span>Openings</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all text-csl-blue" />
                            </button>

                            {/* 2. Online Assessment */}
                            {isAssessmentUrlValid ? (
                              <a
                                href={assessmentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsCareersOpen(false)}
                                className="group/link flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-left text-xs md:text-sm font-semibold text-csl-text hover:bg-csl-blue/10 hover:text-csl-blue transition-all cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <CheckSquare className="w-4 h-4 text-csl-gold shrink-0" />
                                  <span>Online Assessment</span>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all text-csl-blue" />
                              </a>
                            ) : (
                              <div
                                title="Online Assessment URL is not configured. Set VITE_ONLINE_ASSESSMENT_URL in .env"
                                className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-left text-xs md:text-sm font-semibold text-csl-muted/50 bg-gray-50/60 cursor-not-allowed select-none"
                              >
                                <div className="flex items-center gap-2.5">
                                  <CheckSquare className="w-4 h-4 text-csl-muted/40 shrink-0" />
                                  <span>Online Assessment</span>
                                </div>
                                <span className="text-[10px] uppercase font-bold text-csl-muted/60 tracking-wider">
                                  Unavailable
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.isHomeLink) {
                        handleScrollTo(item.targetId, true);
                    } else if (item.targetId === 'contact') {
                      // Contact has no standalone page — scroll to the contact section
                      handleScrollTo('contact');
                    } else {

                        // Clear Contact active state when navigating to another page
                        setActiveSection(null);

                        // Navigate to standalone page based on targetId
                        const path = `/${item.targetId}`;
                        setIsMenuOpen(false);
                        setIsCoursesOpen(false);
                        setIsMobileCoursesOpen(false);
                        setIsCareersOpen(false);
                        setIsMobileCareersOpen(false);
                        if (window.location.pathname !== path) {
                          window.history.pushState({}, '', path);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`group flex items-center gap-2.5 font-bold text-sm lg:text-[15px] transition-colors cursor-pointer ${
                      isItemActive(item.targetId, item.isHomeLink)
                        ? 'text-csl-blue'
                        : 'text-csl-text hover:text-csl-blue'
                    }`} 
                  >
                    {item.label}
                    <span className={`w-1.5 h-1.5 rounded-[1px] transition-all shadow-xs ${
                      isItemActive(item.targetId, item.isHomeLink)
                        ? 'bg-csl-blue opacity-100 scale-125'
                        : 'bg-csl-gold opacity-80 group-hover:opacity-100 group-hover:scale-125'
                    }`} />
                  </button>
                )
            ))}
          </div>

          {/* Mobile/Tablet Header Actions: [ Student Portal ] then [ Custom Menu Icon ] */}
          <div className="hidden custom1195:flex items-center justify-end gap-1.5 xs:gap-2 sm:gap-2.5 ml-auto shrink-0">
            {/* Student Portal Text + Arrow */}
            <button
              onClick={() => {
                window.history.pushState({}, '', '/student-portal');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({
                  top: 0,
                  behavior: 'instant',
                });
              }}
              className="group inline-flex items-center justify-center gap-1 xs:gap-1.5 py-1 px-1.5 font-bold text-[11px] xs:text-xs text-csl-blue hover:text-csl-deep-blue transition-colors duration-200 cursor-pointer shrink-0 leading-none whitespace-nowrap"
            >
              <span>Student Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-csl-blue group-hover:text-csl-deep-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Custom Bold Sharp 2x2 Outlined Square Boxes Icon */}
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="group inline-flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-white/90 border border-csl-gold/35 hover:border-csl-blue/60 hover:bg-white transition-all shadow-xs shrink-0 cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-csl-blue stroke-[2.2]" />
              ) : (
                <svg
                  viewBox="0 0 16 16"
                  className="w-4 h-4 text-csl-blue group-hover:scale-105 transition-transform"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Exactly 4 sharp-cornered outlined squares in a 2x2 grid with bold CSL-blue stroke */}
                  {/* Top-Left */}
                  <rect x="1" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
                  {/* Top-Right */}
                  <rect x="9.5" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
                  {/* Bottom-Left */}
                  <rect x="1" y="9.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
                  {/* Bottom-Right */}
                  <rect x="9.5" y="9.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
                </svg>
              )}
            </button>
          </div>

          {/* CTA (Desktop Only) */}
          <div className="hidden custom1195:hidden md:flex items-center shrink-0">
            <button
              onClick={() => {
                window.history.pushState({}, '', '/student-portal');
                window.dispatchEvent(new PopStateEvent('popstate'));

                window.scrollTo({
                  top: 0,
                  behavior: 'instant',
                });
              }}
              className="group inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl font-bold text-xs md:text-sm bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white shadow-xs hover:shadow-lg hover:shadow-csl-blue/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer leading-none"
            >
              <span>Student Portal</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Full-Page Glassmorphic Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] backdrop-blur-2xl bg-csl-bg flex flex-col justify-between p-5 sm:p-7 overflow-y-auto"
          >
            {/* Header: Logo & Close Button */}
            <div className="flex items-center justify-between pb-3.5 border-b border-csl-gold/25 max-w-2xl mx-auto w-full">
              <img
                src={cslTypography}
                alt="Creator Space Lab"
                className="h-6 sm:h-7 w-auto object-contain cursor-pointer"
                onClick={() => handleScrollTo('hero', true)}
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full bg-white/95 border border-csl-gold/30 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:scale-105 transition-all shadow-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Structured Navigation Grid (Clean Tablet 2-column & Compact Mobile presentation) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="my-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 max-w-2xl mx-auto w-full"
            >
              {activeDrawerSections.map((section, idx) => (
                section.label === 'Courses' ? (
                  /* COURSES — Expandable Section with Course List */
                  <div
                    key={section.label}
                    className={`col-span-1 md:col-span-2 flex flex-col backdrop-blur-md rounded-2xl transition-all duration-300 overflow-hidden ${
                      currentPath === '/courses'
                        ? 'border-2 border-csl-blue bg-white/95 shadow-sm'
                        : isMobileCoursesOpen
                        ? 'border border-csl-gold/70 bg-white/95 shadow-md shadow-csl-gold/10'
                        : 'border border-csl-gold/25 bg-white/75 hover:bg-white/90'
                    }`}
                  >
                    <button
                      onClick={() => setIsMobileCoursesOpen((prev) => !prev)}
                      aria-expanded={isMobileCoursesOpen}
                      className="flex flex-col text-left p-3 sm:p-3.5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-0.5">
                        <span className={`text-sm font-bold transition-colors ${
                          currentPath === '/courses' ? 'text-csl-blue' : 'text-csl-text group-hover:text-csl-blue'
                        }`}>
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

                    {/* Expandable Course List (grouped by existing categories) */}
                    <AnimatePresence initial={false}>
                      {isMobileCoursesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 flex flex-col gap-2.5 max-h-[38vh] overflow-y-auto">
                            <button
                              onClick={handleNavigateToCoursesPage}
                              className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue font-bold text-xs hover:bg-csl-blue hover:text-white transition-all cursor-pointer"
                            >
                              <span>Explore All Courses</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>

                            {courseMenuCategories.map((category) => (
                              <div key={category.name} className="bg-white/60 p-2 rounded-lg border border-csl-gold/15">
                                <span className="block px-1 mb-1 text-[10px] font-extrabold tracking-wider uppercase text-csl-gold">
                                  {category.name}
                                </span>
                                <div className="flex flex-col space-y-0.5">
                                  {category.courses.map((course) => (
                                    <button
                                      key={course.id}
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsMobileCoursesOpen(false);
                                        window.history.pushState({}, '', `/courses#${course.id}`);
                                        window.dispatchEvent(new PopStateEvent('popstate'));
                                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                                      }}
                                      className="flex items-center justify-between gap-2 w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-csl-text hover:bg-white hover:text-csl-blue active:bg-csl-blue/10 transition-colors cursor-pointer"
                                    >
                                      <span className="leading-snug line-clamp-1">{course.title}</span>
                                      <ChevronRight className="w-3 h-3 shrink-0 text-csl-gold" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : section.label === 'Careers' ? (
                  /* CAREERS — Expandable Section with Openings & Online Assessment */
                  <div
                    key={section.label}
                    className={`col-span-1 md:col-span-2 flex flex-col backdrop-blur-md rounded-2xl transition-all duration-300 overflow-hidden ${
                      currentPath === '/careers'
                        ? 'border-2 border-csl-blue bg-white/95 shadow-sm'
                        : isMobileCareersOpen
                        ? 'border border-csl-gold/70 bg-white/95 shadow-md shadow-csl-gold/10'
                        : 'border border-csl-gold/25 bg-white/75 hover:bg-white/90'
                    }`}
                  >
                    <button
                      onClick={() => setIsMobileCareersOpen((prev) => !prev)}
                      aria-expanded={isMobileCareersOpen}
                      className="flex flex-col text-left p-3 sm:p-3.5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-0.5">
                        <span className={`text-sm font-bold transition-colors ${
                          currentPath === '/careers' ? 'text-csl-blue' : 'text-csl-text group-hover:text-csl-blue'
                        }`}>
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

                    {/* Expandable Careers Options */}
                    <AnimatePresence initial={false}>
                      {isMobileCareersOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 flex flex-col gap-2">
                            {/* 1. Openings */}
                            <button
                              onClick={() => {
                                handleNavigateToCareersOpenings();
                              }}
                              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-white/90 border border-csl-gold/20 text-csl-text hover:text-csl-blue hover:bg-csl-blue/10 transition-all cursor-pointer text-xs font-semibold"
                            >
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5 text-csl-blue" />
                                <span>Openings</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-csl-blue" />
                            </button>

                            {/* 2. Online Assessment */}
                            {isAssessmentUrlValid ? (
                              <a
                                href={assessmentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsMobileCareersOpen(false);
                                }}
                                className="flex items-center justify-between w-full p-2.5 rounded-xl bg-white/90 border border-csl-gold/20 text-csl-text hover:text-csl-blue hover:bg-csl-blue/10 transition-all cursor-pointer text-xs font-semibold"
                              >
                                <div className="flex items-center gap-2">
                                  <CheckSquare className="w-3.5 h-3.5 text-csl-gold" />
                                  <span>Online Assessment</span>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-csl-blue" />
                              </a>
                            ) : (
                              <div
                                title="Online Assessment URL is not configured. Set VITE_ONLINE_ASSESSMENT_URL in .env"
                                className="flex items-center justify-between w-full p-2.5 rounded-xl bg-gray-50/70 border border-gray-200/50 text-csl-muted/50 cursor-not-allowed select-none text-xs font-semibold"
                              >
                                <div className="flex items-center gap-2">
                                  <CheckSquare className="w-3.5 h-3.5 text-csl-muted/40" />
                                  <span>Online Assessment</span>
                                </div>
                                <span className="text-[10px] uppercase font-bold text-csl-muted/60 tracking-wider">
                                  Unavailable
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={section.label}
                    onClick={() => {
                      if (section.isHomeLink) {
                        handleScrollTo(section.targetId, true);
                      } else if (section.targetId === 'contact') {
                        handleScrollTo('contact');
                      } else if (
                        section.targetId === 'tie-ups' ||
                        section.targetId === 'success-stories'
                      ) {
                        handleScrollTo(section.targetId);
                      } else {
                        const path = `/${section.targetId}`;

                        setIsMenuOpen(false);
                        setIsCoursesOpen(false);
                        setIsMobileCoursesOpen(false);

                        if (window.location.pathname !== path) {
                          window.history.pushState({}, '', path);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        }

                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className={`group flex flex-col text-left p-3 sm:p-3.5 backdrop-blur-md rounded-2xl transition-all duration-200 cursor-pointer ${
                      isItemActive(section.targetId, section.isHomeLink)
                        ? 'bg-white/95 border-2 border-csl-blue text-csl-blue shadow-sm'
                        : 'bg-white/75 border border-csl-gold/25 hover:border-csl-gold/60 hover:bg-white/95'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-0.5">
                      <span className={`text-sm font-bold transition-colors ${
                        isItemActive(section.targetId, section.isHomeLink) ? 'text-csl-blue' : 'text-csl-text group-hover:text-csl-blue'
                      }`}>
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
                )
              ))}
            </motion.div>

            {/* Footer Area */}
            <div className="pt-3 border-t border-csl-gold/20 flex flex-col w-full max-w-2xl mx-auto shrink-0">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  window.history.pushState({}, '', '/student-portal');
                  window.dispatchEvent(new PopStateEvent('popstate'));

                  window.scrollTo({
                    top: 0,
                    behavior: 'instant',
                  });
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Student Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
