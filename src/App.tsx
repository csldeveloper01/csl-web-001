import { useState, useEffect } from 'react';
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
import { WorkshopsPage } from './components/pages/WorkshopsPage';
import { ComingSoonPage } from './components/pages/ComingSoonPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { IntroOverlay } from './components/intro/IntroOverlay';
import { AboutPage } from './components/pages/AboutPage';
import { CoursesPage } from './components/pages/CoursesPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { InternshipsPage } from './components/pages/InternshipsPage';
import { preloadHomeAssets } from './lib/preloadHomeAssets';
import { preloadPageAssets } from './lib/preloadPageAssets';
import { LoadingIndicator } from './components/ui/LoadingIndicator';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

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
  const [homeAssetsReady, setHomeAssetsReady] = useState(false);

  useEffect(() => {
    preloadHomeAssets().then(() => setHomeAssetsReady(true));
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const targetPath = window.location.pathname;
      setCurrentPath(targetPath);

      if (targetPath === displayedPath) return;

      setIsNavigating(true);

      const assetLoader = targetPath === '/' ? preloadHomeAssets() : preloadPageAssets(targetPath);

      assetLoader.then(() => {
        setDisplayedPath(targetPath);
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
  const homeVisible = isHomePage && homeAssetsReady && (introComplete || introFading);

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Persistent Sticky Navbar */}
      <Navbar />

      

      {/* Main Page Render Area */}
      <div className={`transition-opacity duration-300 ease-out ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
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
        ) : displayedPath === '/student-portal' ? (
          <ComingSoonPage />
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
      </div>

      {/* Universal Footer */}
      <Footer />

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
