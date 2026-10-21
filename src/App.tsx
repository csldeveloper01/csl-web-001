import { useState, useEffect, lazy, Suspense } from 'react';
import { Hero } from './components/sections/Hero';
import { AboutSection } from './components/sections/About/AboutSection';
import { CoursesSection } from './components/sections/Courses/CoursesSection';
import { InternshipsSection } from './components/sections/Internships/InternshipsSection';
import { ServicesSection } from './components/sections/Services/ServicesSection';
import { TieupsSection } from './components/sections/Tieups/TieupsSection';
import { SuccessStoriesSection } from './components/sections/SuccessStories/SuccessStoriesSection';
import { ContactSection } from './components/sections/Contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { IntroOverlay } from './components/intro/IntroOverlay';
import { preloadHomeAssets } from './lib/preloadHomeAssets';
import { preloadPageAssets } from './lib/preloadPageAssets';
import { LoadingIndicator } from './components/ui/LoadingIndicator';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';

// Code-split standalone secondary pages so they do NOT bloat the initial Home bundle
const WorkshopsPage = lazy(() => import('./components/pages/WorkshopsPage').then(m => ({ default: m.WorkshopsPage })));
const ComingSoonPage = lazy(() => import('./components/pages/ComingSoonPage').then(m => ({ default: m.ComingSoonPage })));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const CoursesPage = lazy(() => import('./components/pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const ServicesPage = lazy(() => import('./components/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const InternshipsPage = lazy(() => import('./components/pages/InternshipsPage').then(m => ({ default: m.InternshipsPage })));
const CareersPage = lazy(() => import('./components/pages/CareersPage').then(m => ({ default: m.CareersPage })));
const TermsPage = lazy(() => import('./components/pages/TermsPage'));
const PrivacyPage = lazy(() => import('./components/pages/PrivacyPage'));

const INTRO_SESSION_KEY = 'csl-intro-complete';

// Helper to determine if a given pathname should display the homepage content
function isHomePath(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname === '/contact' ||
    pathname === '/tieups' ||
    pathname === '/portfolio'
  );
}

// Maps special aliases/routes to the specific DOM section ID to scroll into view
function getSectionIdForPath(pathname: string): string | null {
  if (pathname === '/contact') return 'contact';
  if (pathname === '/tieups') return 'tie-ups';
  if (pathname === '/portfolio') return 'services';
  return null;
}

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [displayedPath, setDisplayedPath] = useState<string>(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const [introComplete, setIntroComplete] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    // The intro should only play on homepage entry once per session
    if (!isHomePath(window.location.pathname)) return true;
    return sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
  });
  const [introFading, setIntroFading] = useState(false);

  // Helper to scroll smoothly to a section element with retries in case layout/suspense is rendering
  const scrollToSectionWithRetry = (sectionId: string, maxAttempts = 20) => {
    let attempts = 0;
    const checkAndScroll = () => {
      // Prioritize contact-form over section header for contact
      const resolvedId = sectionId === 'contact' ? 'contact-form' : sectionId;
      const el = document.getElementById(resolvedId) || document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < maxAttempts) {
        attempts++;
        requestAnimationFrame(checkAndScroll);
      }
    };
    requestAnimationFrame(checkAndScroll);
  };
  
  useEffect(() => {
    const handleLocationChange = () => {
      const targetPath = window.location.pathname;
      setCurrentPath(targetPath);

      if (targetPath === displayedPath) {
        // If navigating to the same path or section on home, trigger section scroll if applicable
        const sectionId = getSectionIdForPath(targetPath);
        if (sectionId) {
          scrollToSectionWithRetry(sectionId);
        }
        return;
      }

      setIsNavigating(true);

      const isTargetHome = isHomePath(targetPath);
      const isDisplayedHome = isHomePath(displayedPath);

      // If we are already on home and moving between home alias routes (/contact, /tieups, /portfolio)
      if (isTargetHome && isDisplayedHome) {
        setDisplayedPath(targetPath);
        setIsNavigating(false);
        const sectionId = getSectionIdForPath(targetPath);
        if (sectionId) {
          scrollToSectionWithRetry(sectionId);
        } else if (!window.location.hash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const assetLoader = isTargetHome ? preloadHomeAssets() : preloadPageAssets(targetPath);

      assetLoader.then(() => {
        setDisplayedPath(targetPath);
        const sectionId = getSectionIdForPath(targetPath);
        if (sectionId) {
          scrollToSectionWithRetry(sectionId);
        } else if (!window.location.hash) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
        setTimeout(() => {
          setIsNavigating(false);
        }, 150);
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [displayedPath]);

  // Initial scroll if entering directly on a section route
  useEffect(() => {
    if (introComplete || introFading) {
      const sectionId = getSectionIdForPath(window.location.pathname);
      if (sectionId) {
        scrollToSectionWithRetry(sectionId);
      }
    }
  }, [introComplete, introFading]);

  const handleIntroFadeStart = () => {
    setIntroFading(true);
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setIntroComplete(true);
    setIntroFading(false);
  };

  const isCurrentHome = isHomePath(currentPath);
  const isDisplayedHome = isHomePath(displayedPath);
  const showIntro = isCurrentHome && !introComplete;
  // Homepage DOM only mounts or becomes visible when intro is fading or complete
  const homeMounted = isDisplayedHome && (introComplete || introFading);

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Intro Overlay — Mounted before homepage and rendered with top stacking order */}
      {showIntro && (
        <IntroOverlay onFadeStart={handleIntroFadeStart} onComplete={handleIntroComplete} />
      )}

      {/* Persistent Sticky Navbar — only visible when intro is fading or completed */}
      {(!showIntro || introFading) && <Navbar />}

      {/* Main Page Render Area */}
      <div className={`transition-opacity duration-300 ease-out ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <LoadingIndicator />
            </div>
          }
        >
          {displayedPath === '/workshops' ? (
            <WorkshopsPage />
          ) : displayedPath === '/about' ? (
            <AboutPage />
          ) : displayedPath === '/courses' ? (
            <CoursesPage />
          ) : displayedPath === '/services' ? (
            <ServicesPage />
          ) : displayedPath === '/internships' ? (
            <InternshipsPage />
          ) : displayedPath === '/careers' ? (
            <CareersPage />
          ) : displayedPath === '/student-portal' ? (
            <ComingSoonPage />
          ) : displayedPath === '/terms' ? (
            <TermsPage />
          ) : displayedPath === '/privacy' ? (
            <PrivacyPage />
          ) : isDisplayedHome ? (
            homeMounted ? (
              <div
                className={`transition-opacity duration-500 ease-out ${introFading || introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!introComplete && !introFading}
              >
                <div id="hero">
                  <Hero />
                </div>
                <div id="about">
                  <AboutSection />
                </div>
                <div id="courses">
                  <CoursesSection />
                </div>
                <div id="internships">
                  <InternshipsSection />
                </div>
                <div id="services">
                  <ServicesSection />
                </div>
                <div id="tie-ups">
                  <TieupsSection />
                </div>
                <div id="success-stories">
                  <SuccessStoriesSection />
                </div>
                <div id="contact">
                  <ContactSection />
                </div>
              </div>
            ) : null
          ) : (
            <NotFoundPage />
          )}
        </Suspense>
      </div>

      {/* Universal Footer — rendered only when home or page is mounted/visible */}
      {(!showIntro || introFading) && <Footer />}
      
      {/* Floating WhatsApp Button */}
      {(!showIntro || introFading) && <FloatingWhatsApp />}

      {/* Page Navigation CSL Loading GIF Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-csl-bg/95 backdrop-blur-sm transition-opacity duration-300 ease-out">
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
}

export default App;
