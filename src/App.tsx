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
import { GlobalDistortionWrapper } from './components/effects/GlobalDistortionWrapper';
import { Navbar } from './components/layout/Navbar';
import { NavigationRail, SECTIONS } from './components/layout/NavigationRail';
import { InternshipsPage } from './components/pages/InternshipsPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { CoursesPage } from './components/pages/CoursesPage';
import { AboutPage } from './components/pages/AboutPage';
import { WorkshopsPage } from './components/pages/WorkshopsPage';
import { ComingSoonPage } from './components/pages/ComingSoonPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { IntroOverlay } from './components/intro/IntroOverlay';
import { LoadingIndicator } from './components/ui/LoadingIndicator';
import { preloadHomeAssets } from './lib/preloadHomeAssets';

const INTRO_SESSION_KEY = 'csl-intro-complete';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.location.pathname !== '/') return true;
    return sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';
  });
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    preloadHomeAssets().then(() => setAssetsReady(true));
  }, []);

  useEffect(() => {
    if (currentPath === '/internships' || currentPath === '/services' || currentPath === '/courses' || currentPath === '/about' || currentPath === '/workshops') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -20% 0px',
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [currentPath]);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setIntroComplete(true);
  };

  const isHomePage = currentPath === '/';
  const showIntro = isHomePage && !introComplete;
  const showHomeLoading = isHomePage && introComplete && !assetsReady;
  const homeVisible = isHomePage && introComplete && assetsReady;

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Persistent Sticky Navbar */}
      <Navbar />

      {/* Persistent Left-Side Vertical Sideways Section Rail (on Home Page) */}
      {isHomePage && homeVisible && (
        <NavigationRail activeSection={activeSection} onNavigate={handleNavigate} />
      )}

      {currentPath === '/workshops' ? (
        <WorkshopsPage />
      ) : currentPath === '/about' ? (
        <AboutPage />
      ) : currentPath === '/courses' ? (
        <CoursesPage />
      ) : currentPath === '/services' ? (
        <ServicesPage />
      ) : currentPath === '/internships' ? (
        <InternshipsPage />
      ) : currentPath === '/student-portal' ? (
        <ComingSoonPage />
      ) : currentPath === '/' ? (
        <div className={homeVisible ? '' : 'invisible'} aria-hidden={!homeVisible}>
          <div id="hero">
            <GlobalDistortionWrapper>
              <Hero />
            </GlobalDistortionWrapper>
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

      {/* Universal Footer */}
      <Footer />

      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}

      {showHomeLoading && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-csl-bg">
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
}

export default App;
