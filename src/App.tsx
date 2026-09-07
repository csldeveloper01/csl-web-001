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

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
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

  const isStandalonePage = currentPath === '/internships' || currentPath === '/services' || currentPath === '/courses' || currentPath === '/about' || currentPath === '/workshops';

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Persistent Sticky Navbar */}
      <Navbar />

      {/* Persistent Left-Side Vertical Sideways Section Rail (on Home Page) */}
      {!isStandalonePage && (
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
        <>
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
        </>
      ) : (
        <NotFoundPage />
      )}

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}

export default App;
