import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Briefcase, Layers, Mail, LayoutGrid, X, Cpu, Info, ArrowUpRight, ChevronDown, ChevronRight, Cloud, Brain, BarChart3, PieChart, Megaphone, Palette } from 'lucide-react';
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
  'Data Science',
  'Data Analytics',
  'AI/ML',
  'Cloud',
  'Design',
  'Marketing',
] as const;

const courseCategoryDisplay: Record<string, { icon: any }> = {
  'Development': { icon: BookOpen },
  'Data Science': { icon: BarChart3 },
  'Data Analytics': { icon: PieChart },
  'AI/ML': { icon: Brain },
  'Cloud': { icon: Cloud },
  'Design': { icon: Palette },
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

const mobilePrimaryLabels = ['Home', 'About Us', 'Services', 'Contact'];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const coursesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCoursesMenu = () => {
    if (coursesCloseTimer.current) {
      clearTimeout(coursesCloseTimer.current);
      coursesCloseTimer.current = null;
    }
    setIsCoursesOpen(true);
  };

  const closeCoursesMenuWithDelay = () => {
    if (coursesCloseTimer.current) clearTimeout(coursesCloseTimer.current);
    coursesCloseTimer.current = setTimeout(() => {
      setIsCoursesOpen(false);
      coursesCloseTimer.current = null;
    }, 160);
  };

  useEffect(() => {
    return () => {
      if (coursesCloseTimer.current) clearTimeout(coursesCloseTimer.current);
    };
  }, []);

  const isStandalonePage =
    currentPath === '/about' ||
    currentPath === '/courses' ||
    currentPath === '/services' ||
    currentPath === '/internships' ||
    currentPath === '/workshops';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setIsCoursesOpen(false);
      setIsMobileCoursesOpen(false);
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
    setIsCoursesOpen(false);
    setIsMobileCoursesOpen(false);

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
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToCoursesPage = () => {
    setIsMenuOpen(false);
    setIsCoursesOpen(false);
    setIsMobileCoursesOpen(false);
    if (window.location.pathname !== '/courses') {
      window.history.pushState({}, '', '/courses');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          className={`fixed top-0 inset-x-0 w-full z-50 px-4 sm:px-6 py-2 sm:py-2.5 md:px-8 lg:px-12 flex items-center justify-between bg-csl-bg border border-csl-gold/20 rounded-2xl ${isScrolled ? 'shadow-md' : ''}`}
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

          {/* Desktop Links */}
          <div className="custom1195:hidden flex flex-1 items-center justify-center gap-8 lg:gap-10">
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
                    className={`group flex items-center gap-2.5 font-bold text-sm lg:text-[15px] transition-colors cursor-pointer ${isCoursesOpen ? 'text-csl-blue' : 'text-csl-text hover:text-csl-blue'}`}
                  >
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
                        <div className="bg-white border border-csl-gold/30 rounded-2xl shadow-xl shadow-csl-blue/5 overflow-hidden">
                          {/* Panel Header */}
                          <div className="flex items-center justify-between gap-3 px-7 pt-5 pb-4 border-b border-csl-gold/20">
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

                          {/* Multi-Column Category Grid (from existing course data) */}
                          <div className="px-5 sm:px-7 py-6 flex flex-wrap justify-center gap-x-8 gap-y-7">
                            {courseMenuCategories.map((category) => {
                              const CategoryIcon = category.icon;
                              return (
                                <div key={category.name} className="flex-[1_1_170px] min-w-[170px] max-w-[220px]">
                                  {/* Category Heading */}
                                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-csl-gold/25">
                                    <CategoryIcon className="w-3.5 h-3.5 text-csl-gold" />
                                    <span className="text-[11px] font-extrabold tracking-wider uppercase text-csl-text">
                                      {category.name}
                                    </span>
                                  </div>
                                  {/* Course Links — deep links to course cards on the Courses page */}
                                  <ul className="flex flex-col">
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
                                          className="group/item flex items-center justify-between gap-2 py-1.5 text-[13px] font-semibold text-csl-muted hover:text-csl-blue transition-colors cursor-pointer"
                                        >
                                          <span className="leading-snug">{course.title}</span>
                                          <ChevronRight className="w-3 h-3 shrink-0 opacity-0 -translate-x-0.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
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
                        // Navigate to standalone page based on targetId
                        const path = `/${item.targetId}`;
                        setIsMenuOpen(false);
                        setIsCoursesOpen(false);
                        setIsMobileCoursesOpen(false);
                        if (window.location.pathname !== path) {
                          window.history.pushState({}, '', path);
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="group flex items-center gap-2.5 font-bold text-sm lg:text-[15px] transition-colors cursor-pointer text-csl-text hover:text-csl-blue"
                  >
                    {item.label}
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-csl-gold transition-all shadow-xs opacity-80 group-hover:opacity-100 group-hover:scale-125" />
                  </button>
                )
            ))}
          </div>

          {/* Mobile Navigation Icons */}
          {/* Mobile Navigation */}
          <div className="hidden custom1195:flex items-center justify-end gap-2.5 sm:gap-3.5 ml-auto">
            {activeNavItems
              .filter(item => mobilePrimaryLabels.includes(item.label))
              .map(item => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                    if (item.isHomeLink) {
                      handleScrollTo(item.targetId, true);
                    } else if (item.targetId === 'contact') {
                      handleScrollTo('contact');
                    } else {
                      const path = `/${item.targetId}`;

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
                    aria-label={item.label}
                    title={item.label}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-csl-text hover:text-csl-blue hover:bg-csl-gold/10 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}

            {/* More */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="More navigation options"
              title="More"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-csl-blue bg-csl-blue/10 border border-csl-blue/20 hover:bg-csl-blue hover:text-white transition-all shadow-sm"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
          {/* CTA (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => {
                window.history.pushState({}, '', '/student-portal');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="group flex items-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-5 py-2.5 rounded-lg font-semibold text-xs md:text-sm hover:shadow-lg hover:shadow-csl-blue/20 transition-all duration-300 cursor-pointer"
            >
              Student Portal
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
                section.label === 'Courses' ? (
                  /* COURSES — Expandable Section with Course List */
                  <div
                    key={section.label}
                    className={`col-span-1 sm:col-span-2 flex flex-col bg-white/70 backdrop-blur-md border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isMobileCoursesOpen
                        ? 'border-csl-gold/70 bg-white/95 shadow-lg shadow-csl-gold/10'
                        : 'border-csl-gold/25'
                    }`}
                  >
                    <button
                      onClick={() => setIsMobileCoursesOpen((prev) => !prev)}
                      aria-expanded={isMobileCoursesOpen}
                      className="flex flex-col text-left p-3.5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-0.5">
                        <span className="flex items-center gap-2 text-sm font-bold text-csl-text group-hover:text-csl-blue transition-colors">
                          <BookOpen className="hidden sm:block w-3.5 h-3.5 text-csl-blue" />
                          {section.label}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-csl-blue">
                            0{idx + 1}
                          </span>
                          <ChevronDown
                            className={`hidden sm:block w-4 h-4 text-csl-blue transition-transform duration-300 ${
                              isMobileCoursesOpen ? 'rotate-180' : ''
                            }`}
                          />
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
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3.5 pb-3.5 flex flex-col gap-3 max-h-[46vh] overflow-y-auto">
                            <button
                              onClick={handleNavigateToCoursesPage}
                              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue font-bold text-xs hover:bg-csl-blue hover:text-white transition-all cursor-pointer"
                            >
                              Explore All Courses
                              <ArrowUpRight className="hidden sm:block w-3.5 h-3.5" />
                            </button>

                            {courseMenuCategories.map((category) => (
                              <div key={category.name}>
                                <span className="block px-1 mb-1 text-[10px] font-extrabold tracking-wider uppercase text-csl-gold">
                                  {category.name}
                                </span>
                                <div className="flex flex-col">
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
                                      className="flex items-center justify-between gap-2 w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-semibold text-csl-text hover:bg-white hover:text-csl-blue active:bg-csl-blue/10 transition-colors cursor-pointer"
                                    >
                                      <span className="leading-snug">{course.title}</span>
                                      <ChevronRight className="hidden sm:block w-3.5 h-3.5 shrink-0 text-csl-gold" />
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
                    }}                    className="group flex flex-col text-left p-3.5 bg-white/70 backdrop-blur-md border border-csl-gold/25 hover:border-csl-gold/70 rounded-2xl hover:bg-white/95 hover:shadow-lg hover:shadow-csl-gold/10 transition-all duration-300"
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
                )
              ))}
            </motion.div>

            {/* Footer Area */}
            <div className="pt-4 border-t border-csl-gold/20 flex flex-col w-full max-w-lg mx-auto">
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/student-portal');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
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
