import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode2, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Users2, 
  Code2, 
  FileEdit, 
  Handshake, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

// @ts-expect-error
import servicesIllustration from '../../../../Elements/SERVICES/SERVICES.png';

const servicesList = [
  {
    icon: FileCode2,
    title: 'IEEE Project Development',
    description: 'End-to-end IEEE standard project development with documentation & implementation.',
  },
  {
    icon: Globe,
    title: 'International Conference Publication',
    description: 'Paper writing, formatting, and publication support for Scopus & UGC care journals.',
  },
  {
    icon: GraduationCap,
    title: 'PhD Research Implementation',
    description: 'Full PhD project guidance including simulation, coding, publication & thesis support.',
  },
  {
    icon: Briefcase,
    title: 'MBA Project & Research',
    description: 'Complete MBA project support with data analysis, reports, and presentation.',
  },
  {
    icon: Cpu,
    title: 'Final Year Projects (CSE, IT, ECE)',
    description: 'AI/ML, IoT, Cloud, Full Stack, Cybersecurity, and blockchain projects.',
  },
  {
    icon: Users2,
    title: 'Corporate & Student Training',
    description: 'Hands-on training in AI, ML, Data Science, Full Stack, Cloud & Cybersecurity.',
  },
  {
    icon: Code2,
    title: 'Product & Prototype Development',
    description: 'Custom software, mobile apps, dashboards, and automation platforms.',
  },
  {
    icon: FileEdit,
    title: 'Research Paper Guidance',
    description: 'Paper writing, review, plagiarism correction & journal publication.',
  },
  {
    icon: Handshake,
    title: 'Training Partners for Colleges',
    description: 'Dedicated training programs, workshops, seminars, internships, and placement support exclusively for colleges.',
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(4); // Default to Final Year Projects (bottom active in reference)
  const [isPaused, setIsPaused] = useState(false);

  const nextService = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % servicesList.length);
  }, []);

  const prevService = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + servicesList.length) % servicesList.length);
  }, []);

  // Controlled Carousel Interaction: move -> pause -> move (reduced animation time)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextService();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, nextService]);

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[5%]', delay: 0.3, duration: 7 },
    { size: 'w-16 h-16', pos: 'top-[10%] right-[35%]', delay: 1.2, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'top-[32%] right-[6%]', delay: 0.8, duration: 6 },
    { size: 'w-14 h-14', pos: 'bottom-[22%] left-[6%]', delay: 2.0, duration: 7.5 },
    { size: 'w-10 h-10', pos: 'bottom-[12%] right-[28%]', delay: 1.5, duration: 8 },
    { size: 'w-20 h-20', pos: 'top-[20%] right-[8%]', delay: 0.5, duration: 9 },
  ];

  // 9 positions along a circle (radius 48%)
  const total = servicesList.length;
  const radiusPercent = 48; // orbital distance from center
  const rotationAngle = -(activeIndex - 4) * (360 / total);

  return (
    <section 
      className="relative w-full py-10 md:py-16 flex flex-col items-center justify-center bg-csl-bg overflow-hidden mx-auto"
    >
      {/* Decorative Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Decorative Floating Yellow Blocks */}
      <div className="absolute inset-0 pointer-events-none z-10 2xl:max-w-[1600px] 2xl:mx-auto">
        {yellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center transform scale-[0.88] origin-center">
        
        {/* MAIN ROW: LEFT CONTENT & RIGHT ORBITAL CAROUSEL */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: INFORMATIONAL BLOCK (Aligned to top corner) */}
          <div className="flex flex-col items-start w-full max-w-lg pt-2 lg:pt-4">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                Services
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>

            {/* Headline */}
            <h2 
              className="text-4xl md:text-[3.2rem] font-extrabold text-csl-text tracking-tight leading-[1.08] mb-2" 
              data-distort="text"
            >
              Our <span className="text-csl-blue">Services</span>
            </h2>
            <div className="h-[2px] w-12 bg-csl-gold/50 mb-5"></div>

            {/* Main General Description */}
            <p className="text-csl-muted font-medium text-sm md:text-[15px] leading-relaxed mb-6 max-w-md">
              We provide end-to-end academic, research and technology solutions designed to help students, researchers and organizations innovate, build and grow with confidence.
            </p>

            {/* Dynamic Active Service Info Card */}
            <div className="w-full bg-white/75 backdrop-blur-sm border border-csl-gold/30 rounded-2xl p-5 md:p-6 mb-7 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {(() => {
                      const ActiveIcon = servicesList[activeIndex].icon;
                      return (
                        <div className="w-9 h-9 rounded-xl bg-csl-blue/10 border border-csl-blue/20 flex items-center justify-center text-csl-blue shrink-0">
                          <ActiveIcon className="w-5 h-5 stroke-[1.8]" />
                        </div>
                      );
                    })()}
                    <h3 className="text-lg md:text-xl font-bold text-csl-blue tracking-tight leading-snug">
                      {servicesList[activeIndex].title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-csl-muted font-medium leading-relaxed pl-12">
                    {servicesList[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA Button: Our Works */}
            <a 
              href="/services" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/services');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-gold via-[#FFBA26] to-[#FFAE1A] text-csl-text px-8 py-3.5 rounded-xl font-bold text-sm hover:scale-105 hover:shadow-lg hover:shadow-csl-gold/30 active:scale-95 transition-all duration-300 shadow-sm"
            >
              Our Works
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* RIGHT COLUMN: ORBITAL HEXAGONAL CAROUSEL */}
          <div 
            className="w-full flex flex-col items-center justify-center relative select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Circular Orbit Area Container */}
            <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] flex items-center justify-center">
              
              {/* Spinning Orbital Track with Framer Motion (Animation reduced by 0.2s from 0.75s to 0.55s) */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: rotationAngle }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Golden Dashed Orbital Path Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-csl-gold/40 pointer-events-none"></div>

                {/* Decorative Orbital Nodes / Tiny Dots */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(18)].map((_, i) => {
                    const dotAngle = (i * 20) * (Math.PI / 180);
                    const dotX = 50 + radiusPercent * Math.cos(dotAngle);
                    const dotY = 50 + radiusPercent * Math.sin(dotAngle);
                    return (
                      <div 
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-csl-gold/60 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${dotX}%`, top: `${dotY}%` }}
                      />
                    );
                  })}
                </div>

                {/* Orbital Hexagonal Buttons (9 Services) */}
                {servicesList.map((service, idx) => {
                  const IconComponent = service.icon;
                  const isActive = idx === activeIndex;

                  // Base angle around circle with index 4 at 90 deg (bottom)
                  const baseAngleDeg = 90 + (idx - 4) * (360 / total);
                  const angleRad = baseAngleDeg * (Math.PI / 180);
                  const x = 50 + radiusPercent * Math.cos(angleRad);
                  const y = 50 + radiusPercent * Math.sin(angleRad);

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={service.title}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group cursor-pointer focus:outline-none ${
                        isActive ? 'scale-[1.3] z-30' : 'scale-100 hover:scale-115 z-20'
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      {/* Counter-rotate so icons and hexagons stay perfectly upright while orbit spins */}
                      <motion.div 
                        animate={{ rotate: -rotationAngle }}
                        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? 'drop-shadow-[0_0_28px_rgba(255,183,3,0.85)]' 
                            : 'drop-shadow-[0_8px_20px_rgba(14,62,203,0.35)] group-hover:drop-shadow-[0_0_18px_rgba(55,94,248,0.6)]'
                        }`}
                      >
                        {/* Hexagon Geometry Body with Reference 3D Gradients */}
                        <div
                          className={`w-full h-full flex items-center justify-center transition-all duration-500 ${
                            isActive 
                              ? 'bg-gradient-to-br from-[#FFE169] via-[#FFB703] to-[#FB8500]' 
                              : 'bg-gradient-to-br from-[#1E5BF8] via-[#0E3ECB] to-[#08299B]'
                          }`}
                          style={{
                            clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                          }}
                        >
                          {/* Hexagon Inner Bevel / Specular Highlight */}
                          <div 
                            className="w-[88%] h-[88%] flex items-center justify-center transition-all duration-500"
                            style={{
                              clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                              background: isActive 
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,183,3,0.15) 100%)' 
                                : 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(14,62,203,0.1) 100%)'
                            }}
                          >
                            <IconComponent 
                              className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300 ${
                                isActive 
                                  ? 'text-[#381F00] drop-shadow-sm' 
                                  : 'text-white group-hover:scale-110 drop-shadow-sm'
                              }`} 
                              strokeWidth={1.8}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </button>
                  );
                })}
              </motion.div>

              {/* Central 3D Artwork (Fixed in center) */}
              <motion.div
                className="relative w-[68%] max-w-[370px] flex flex-col items-center justify-center z-0 pointer-events-none"
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-3xl rounded-full scale-90"></div>

                {/* Voxel Drift Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-csl-gold/50 border border-csl-gold/70 backdrop-blur-sm"
                      animate={{
                        y: [0, -16, 0],
                        x: [0, (i % 2 === 0 ? 8 : -8), 0],
                        opacity: [0.3, 0.85, 0.3],
                        scale: [0.8, 1.1, 0.8]
                      }}
                      transition={{
                        duration: 3.5 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                      style={{
                        left: `${25 + (i * 12)}%`,
                        top: `${20 + ((i * 14) % 60)}%`
                      }}
                    />
                  ))}
                </div>

                <img 
                  src={servicesIllustration} 
                  alt="Services 3D Ecosystem" 
                  className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,30,80,0.14)]"
                />
              </motion.div>

            </div>

            {/* Bottom Navigation Controls (Arrows + Pagination Dots) */}
            <div className="flex items-center justify-center gap-6 mt-6">
              
              {/* Left Arrow Button */}
              <button 
                onClick={prevService}
                aria-label="Previous service"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-csl-gold/30 shadow-sm flex items-center justify-center text-csl-blue hover:bg-csl-blue hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* 9 Pagination Dots with Clear Active & Inactive Indicators */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {servicesList.map((_, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Select service ${idx + 1}`}
                      className="p-1 cursor-pointer focus:outline-none group"
                    >
                      <div 
                        className={`transition-all duration-300 rounded-full ${
                          isActive 
                            ? 'w-7 h-2.5 bg-gradient-to-r from-csl-deep-blue to-csl-blue shadow-sm' 
                            : 'w-2.5 h-2.5 bg-csl-gold/30 border border-csl-gold/50 group-hover:bg-csl-gold/70 group-hover:scale-110'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              <button 
                onClick={nextService}
                aria-label="Next service"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-csl-gold/30 shadow-sm flex items-center justify-center text-csl-blue hover:bg-csl-blue hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
