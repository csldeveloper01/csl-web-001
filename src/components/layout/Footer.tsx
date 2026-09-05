import { ArrowUpRight, Linkedin, Instagram, Youtube, Mail, Phone } from 'lucide-react';

// @ts-expect-error
import cslBook from '../../../Elements/LOGOS/CSL -BOOK.png';
// @ts-expect-error
import cslC from '../../../Elements/LOGOS/CSL-C.png';
// @ts-expect-error
import heroBitmap from '../../../Elements/HERO/BITMAP.png';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '/about' },
  { label: 'Why Choose Us', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Our Services', href: '/services' },
  { label: 'Tie-Ups', href: '#tie-ups' },
  { label: 'Internships', href: '/internships' },
  { label: 'Success Stories', href: '#success-stories' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const handleScrollTo = (href: string) => {
    if (href === '/about' || href === '#about') {
      if (window.location.pathname !== '/about') {
        window.history.pushState({}, '', '/about');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '/courses' || href === '#courses' || href === '/workshops') {
      const targetPath = href === '/workshops' ? '/workshops' : '/courses';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '/services' || href === '#services') {
      if (window.location.pathname !== '/services') {
        window.history.pushState({}, '', '/services');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '/internships' || href === '#internships') {
      if (window.location.pathname !== '/internships') {
        window.history.pushState({}, '', '/internships');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (window.location.pathname === '/about' || window.location.pathname === '/courses' || window.location.pathname === '/services' || window.location.pathname === '/internships') {
      const targetId = href.replace('#', '');
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        if (targetId && targetId !== 'hero') {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '#hero' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#FBF7F4] border-t border-csl-gold/20 pt-12 md:pt-16 pb-6 overflow-hidden text-csl-text">
      
      {/* 1. TOP-LEFT GEOMETRIC C WATERMARK (SUBSTANTIALLY REDUCED SIZE) */}
      <img 
        src={cslC} 
        alt="CSL Geometric C" 
        className="absolute -top-8 -left-8 md:-top-10 md:-left-10 w-44 md:w-56 lg:w-64 h-auto object-contain opacity-[0.03] grayscale pointer-events-none z-0 select-none"
      />

      {/* 2. LOWER-RIGHT STATIC BLURRED ATMOSPHERIC BITMAP */}
      <img 
        src={heroBitmap} 
        alt="Hero Bitmap Ambient" 
        className="absolute -bottom-10 -right-10 md:-bottom-14 md:-right-12 w-80 md:w-[420px] lg:w-[480px] h-auto object-contain opacity-[0.16] md:opacity-[0.20] blur-[6px] md:blur-[8px] pointer-events-none z-0 select-none"
      />

      {/* Decorative Dotted Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Upper Asymmetrical Row: Branding + Navigation + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 lg:gap-14 items-start">
          
          {/* Left Column: CSL Branding + Contact & Socials */}
          <div className="flex flex-col">
            
            {/* CSL Logo & Typography */}
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={cslBook} 
                alt="Creator Space Lab Book Logo" 
                className="w-11 md:w-13 h-auto object-contain"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-csl-text leading-[1.08] tracking-tight mb-2">
              Creator<br />Space Lab
            </h2>

            <p className="text-xs md:text-sm font-medium text-csl-muted max-w-sm leading-relaxed mb-4">
              Driving innovation through partnership. Empowering students, researchers, and organizations to innovate and build future-ready careers.
            </p>

            {/* Contact / CTA Presence */}
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold tracking-widest text-csl-blue uppercase">
                  Let's Build Something
                </span>
                <div className="h-[1.5px] w-5 bg-csl-gold/60" />
              </div>

              <div className="flex flex-col gap-1 text-xs md:text-sm font-semibold text-csl-text">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a 
                    href="tel:+918056052806" 
                    className="flex items-center gap-1.5 hover:text-csl-blue transition-colors group"
                  >
                    <Phone className="w-3.5 h-3.5 text-csl-gold group-hover:scale-110 transition-transform" />
                    <span>+91 80560 52806</span>
                  </a>
                  <a 
                    href="tel:+919500802806" 
                    className="flex items-center gap-1.5 hover:text-csl-blue transition-colors group"
                  >
                    <span>+91 95008 02806</span>
                  </a>
                  <a 
                    href="tel:+919680100306" 
                    className="flex items-center gap-1.5 hover:text-csl-blue transition-colors group"
                  >
                    <span>+91 96801 00306</span>
                  </a>
                </div>

                <a 
                  href="mailto:hr.info@creatorspacelab.org.in" 
                  className="flex items-center gap-2 hover:text-csl-blue transition-colors group mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-csl-gold group-hover:scale-110 transition-transform" />
                  <span>hr.info@creatorspacelab.org.in</span>
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-csl-text uppercase tracking-wider">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/90 border border-csl-gold/25 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:border-csl-blue hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/90 border border-csl-gold/25 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:border-csl-blue hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-white/90 border border-csl-gold/25 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:border-csl-blue hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Structured Navigation Grid */}
          <div className="flex flex-col lg:pl-6">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-[11px] font-bold tracking-widest text-csl-blue uppercase">
                Explore
              </span>
              <div className="h-[1.5px] w-6 bg-csl-gold/60" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.href)}
                  className="group flex items-center justify-between py-1.5 border-b border-csl-gold/15 text-left text-xs md:text-sm font-bold text-csl-text hover:text-csl-blue transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-csl-gold opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 text-csl-blue" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Divider & Legal Copyright Row */}
        <div className="border-t border-csl-gold/20 pt-5 mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] md:text-xs font-medium text-csl-muted">
          <p>
            © 2025 CreatorSpaceLab. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a href="#hero" className="hover:text-csl-blue transition-colors">
              Privacy Policy
            </a>
            <span className="text-csl-gold/50">•</span>
            <a href="#hero" className="hover:text-csl-blue transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
