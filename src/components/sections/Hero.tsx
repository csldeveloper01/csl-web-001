import { ArrowRight, BookOpen, Briefcase, Layers, Mail } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { YellowBox } from '../effects/YellowBox';

// @ts-expect-error
import cslBook from '../../../Elements/LOGOS/CSL -BOOK.png';
// @ts-expect-error
import cslC from '../../../Elements/LOGOS/CSL-C.svg';

const heroNavItems = [
  { label: 'Courses', href: '#courses', icon: BookOpen },
  { label: 'Internships', href: '#internships', icon: Briefcase },
  { label: 'Services', href: '#services', icon: Layers },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const navigateToStudentPortal = () => {
  window.history.pushState({}, '', '/student-portal');
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export function Hero() {
  const yellowBlocks = [
    { size: 'w-10 h-10', pos: 'top-[18%] left-[8%]', delay: 0.5, duration: 6 },
    { size: 'w-32 h-16', pos: 'top-[32%] left-[28%]', delay: 1.2, duration: 8 },
    { size: 'w-48 h-48', pos: 'top-[12%] right-[12%]', delay: 0.2, duration: 10 },
    { size: 'w-8 h-8', pos: 'bottom-[25%] right-[32%]', delay: 2.1, duration: 7 },
    { size: 'w-32 h-56', pos: 'bottom-[12%] left-[10%]', delay: 3.0, duration: 9 },
    { size: 'w-16 h-16', pos: 'bottom-[20%] left-[45%]', delay: 1.5, duration: 6.5 },
    { size: 'w-12 h-12', pos: 'top-[22%] left-[42%]', delay: 0.8, duration: 7.5 },
    { size: 'w-24 h-12', pos: 'bottom-[35%] right-[15%]', delay: 2.5, duration: 8.5 },
  ];

  return (
    <div id="hero" className="relative min-h-screen overflow-hidden flex flex-col justify-between cursor-default bg-[#FBF7F4] pt-4 sm:pt-6 pb-8 md:pb-12">
      {/* Static Background Blocks */}
      <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
        {yellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      {/* Standalone Integrated Navbar for Hero */}
      <header className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-3 sm:py-4 flex items-center justify-center pointer-events-auto">
        <nav className="w-full flex items-center justify-center gap-6 sm:gap-10 md:gap-20 lg:gap-24">
          {heroNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <a 
                key={item.label} 
                href={item.href} 
                aria-label={item.label}
                className="group flex items-center gap-2 text-csl-text font-bold text-sm lg:text-[15px] hover:text-csl-blue transition-colors tracking-wide p-1.5 md:p-0"
              >
                <Icon className="w-4 h-4 md:hidden text-csl-blue" />
                <span className="hidden md:inline">{item.label}</span>
                <span className="hidden md:inline-block w-1.5 h-1.5 rounded-[1px] bg-csl-gold opacity-0 group-hover:opacity-100 transition-all group-hover:scale-125 shadow-xs" />
              </a>
            );
          })}
        </nav>
      </header>

      {/* Main Hero Content (Mobile: Title -> Bitmap -> Buttons) */}
      <main className="flex-1 relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-center pt-4 sm:pt-6 lg:pt-0 pb-4 sm:pb-6 lg:pb-0 h-full pointer-events-none">

        {/* Left Column (Desktop) / Mobile Headline & Info (order-1) */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center h-full xl:pl-6 pointer-events-auto order-1">
          <div className="mb-3" data-distort="text">
            <img 
              src={cslBook} 
              alt="CSL Logo" 
              className="w-14 sm:w-16 h-auto md:w-20 lg:w-24 object-contain" 
            />
          </div>

          <h1 
            data-distort="text"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-csl-text leading-[1.05] tracking-tight mb-3 sm:mb-4 inline-block"
          >
            Creator<br />Space Lab
          </h1>
          
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl italic font-semibold text-csl-text mb-4 sm:mb-5 tracking-wide">
            Driving Innovation<br />Through Partnership
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-csl-muted max-w-[360px] leading-relaxed mb-6 sm:mb-8">
            From your first line of code to your<br className="hidden md:block"/>
            first job offer — we're with you<br className="hidden md:block"/>
            at every step.
          </p>
          
          {/* Desktop CTAs */}
          <div className="hidden lg:flex flex-row items-center gap-4">
            <a href="#courses" className="flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-6 py-3 rounded-lg font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm">
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={navigateToStudentPortal}
              className="flex items-center justify-center gap-2 bg-csl-deep-blue text-white px-6 py-3 rounded-lg font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              Go to Student Portal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column (Desktop) / Mobile Bitmap (order-2) */}
        <div className="w-full lg:w-[50%] flex items-center justify-center mt-6 lg:mt-0 relative pointer-events-auto order-2" data-distort="text">
          <HeroVisual />
        </div>

        {/* Mobile CTAs (order-3, directly below bitmap) */}
        <div className="flex lg:hidden flex-col sm:flex-row items-center gap-3 w-full mt-6 pointer-events-auto order-3">
          <a href="#courses" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-6 py-3 rounded-lg font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm">
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={navigateToStudentPortal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-csl-deep-blue text-white px-6 py-3 rounded-lg font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            Go to Student Portal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <img 
        src={cslC} 
        alt="CSL Mark" 
        className="absolute bottom-0 right-0 w-64 md:w-96 lg:w-[500px] h-auto object-contain opacity-[0.03] grayscale pointer-events-none z-0 translate-x-1/4 translate-y-1/4"
      />
    </div>
  );
}
