  import { ArrowRight } from 'lucide-react';
  import { HeroVisual } from './HeroVisual';
  import { YellowBox } from '../effects/YellowBox';

  // @ts-expect-error
  import cslBook from '../../../Elements/LOGOS/CSL -BOOK.png';
  // @ts-expect-error
  import cslC from '../../../Elements/LOGOS/CSL-C.png';

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
      <div id="hero" className="relative min-h-screen overflow-hidden flex flex-col justify-between cursor-default bg-[#FBF7F4] mt-16 pt-4 sm:pt-6 pb-8 md:pb-12">
        {/* Static Background Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>



        {/* Main Hero Content (Responsive: Left Text + Right Visual on md+, Mobile: Stacked) */}
        <main className="flex-1 relative z-10 section-container flex flex-col md:flex-row items-center justify-center pt-2 sm:pt-4 md:pt-2 lg:pt-0 pb-4 sm:pb-6 md:pb-4 lg:pb-0 h-full pointer-events-none gap-6 md:gap-4 lg:gap-8">

          {/* Left Column (Desktop & Tablet text column) / Mobile Headline & Info (order-1) */}
          <div className="w-full md:w-[52%] lg:w-[50%] flex flex-col justify-center h-full md:pr-2 lg:pr-0 xl:pl-6 pointer-events-auto order-1">
            <div className="mb-2 sm:mb-3" data-distort="text">
              <img 
                src={cslBook} 
                alt="CSL Logo" 
                className="w-12 sm:w-14 md:w-16 lg:w-24 h-auto object-contain" 
              />
            </div>

            <h1 
              data-distort="text"
              className="text-4xl sm:text-5xl md:text-[2.75rem] lg:text-[4rem] font-extrabold text-csl-text leading-[1.08] md:leading-[1.05] tracking-tight mb-2.5 sm:mb-3 md:mb-4 inline-block"
            >
              Creator<br />Space Lab
            </h1>
            
            <h2 className="text-base sm:text-lg md:text-lg lg:text-2xl italic font-semibold text-csl-text mb-3 sm:mb-4 md:mb-4 tracking-wide leading-snug">
              Driving Innovation<br />Through Partnership
            </h2>
            
            <p
              className="text-xs sm:text-sm md:text-sm lg:text-base text-csl-muted max-w-[430px] leading-[1.8] md:leading-[1.85] mb-5 sm:mb-6 md:mb-7"
              style={{
                wordSpacing: '0.14em',
                letterSpacing: '0.015em',
              }}
            >
              From your first line of code to your first job offer — we're with you at every step.
            </p>
            
            {/* Desktop & Tablet CTAs */}
            <div className="hidden md:flex flex-row items-center gap-3 lg:gap-4 flex-wrap">
              <a href="#courses" className="flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-bold text-xs lg:text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm shrink-0">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={navigateToStudentPortal}
                className="flex items-center justify-center gap-2 bg-csl-deep-blue text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-bold text-xs lg:text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm shrink-0"
              >
                Go to Student Portal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column (Desktop & Tablet Visual) / Mobile Bitmap (order-2) */}
          <div className="w-full md:w-[48%] lg:w-[50%] flex items-center justify-center mt-2 md:mt-0 relative pointer-events-auto order-2" data-distort="text">
            <HeroVisual />
          </div>

          {/* Mobile-Only CTAs (hidden on md+) */}
          <div className="flex md:hidden flex-col sm:flex-row items-center gap-3 w-full mt-4 pointer-events-auto order-3">
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
