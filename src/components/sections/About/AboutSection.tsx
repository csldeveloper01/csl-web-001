import { AboutCopy } from './AboutCopy';
import { AboutCarousel } from './AboutCarousel';
import { YellowBox } from '../../effects/YellowBox';

export function AboutSection() {
  const yellowBlocks = [
    { size: 'w-10 h-10', pos: 'top-[15%] left-[45%]', delay: 0.5, duration: 6 },
    { size: 'w-24 h-24', pos: 'top-[10%] right-[12%]', delay: 1.2, duration: 8 },
    { size: 'w-8 h-8', pos: 'bottom-[25%] left-[8%]', delay: 2.1, duration: 7 },
    { size: 'w-16 h-16', pos: 'bottom-[20%] right-[32%]', delay: 1.5, duration: 6.5 },
  ];

  return (
    <section 
      className="relative w-full py-10 md:py-16 flex items-center justify-center bg-csl-bg overflow-hidden mx-auto"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none z-10 2xl:max-w-[1600px] 2xl:mx-auto">
        {yellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-8 transform scale-90 origin-center">
        
        {/* Left Column - Copy */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center" data-distort="text">
          <AboutCopy />
        </div>

        {/* Right Column - Visual Carousel */}
        <div className="w-full lg:w-[60%] flex items-center justify-center relative">
          <AboutCarousel />
        </div>

      </div>
    </section>
  );
}
