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

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [displayedPath, setDisplayedPath] = useState<string>(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.location.pathname !== '/') return true;
    return sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
  });
  const [introFading, setIntroFading] = useState(false);
  
  useEffect(() => {
    const handleLocationChange = () => {
      const targetPath = window.location.pathname;
      setCurrentPath(targetPath);

      if (targetPath === displayedPath) return;

      setIsNavigating(true);

      const assetLoader = targetPath === '/' ? preloadHomeAssets() : preloadPageAssets(targetPath);

      assetLoader.then(() => {
        setDisplayedPath(targetPath);
        if (!window.location.hash) {
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

  // Removed side‑rail IntersectionObserver; no longer needed after NavigationRail removal.

  const handleIntroFadeStart = () => {
    setIntroFading(true);
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setIntroComplete(true);
    setIntroFading(false);
  };

  const isHomePage = currentPath === '/';
  const showIntro = isHomePage && !introComplete;
  const homeVisible = isHomePage && (introComplete || introFading);

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Persistent Sticky Navbar */}
      <Navbar />

      

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
          ) : displayedPath === '/' ? (
          <div
            className={`transition-opacity duration-500 ease-out ${homeVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!homeVisible}
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
        ) : (
          <NotFoundPage />
        )}
        </Suspense>
      </div>

      {/* Universal Footer */}
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Intro Overlay — Video Only, pure white background */}
      {showIntro && (
        <IntroOverlay onFadeStart={handleIntroFadeStart} onComplete={handleIntroComplete} />
      )}

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
