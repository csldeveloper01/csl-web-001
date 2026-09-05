import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { 
  ArrowRight, 
  Cpu, 
  Users, 
  Award, 
  Target, 
  Clock, 
  HeartHandshake,
  GraduationCap,
  Briefcase,
  Languages,
  Palette,
  Compass,
  Rocket
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { NavigationRail, SectionInfo } from '../layout/NavigationRail';

const aboutSections: SectionInfo[] = [
  { id: 'hero', title: 'ABOUT' },
  { id: 'who-we-are', title: 'IDENTITY' },
  { id: 'why-csl', title: 'WHY CSL' },
  { id: 'our-difference', title: 'METHODOLOGY' },
  { id: 'ecosystem', title: 'ECOSYSTEM' },
  { id: 'whats-next', title: 'NEXT' },
];

// @ts-ignore
import heroAboutVisual from '../../../Elements/ABOUT/AI INNOVATION.png';
// @ts-ignore
import cslEmblem from '../../../Elements/LOGOS/CSL-C.png';

// ==================================================
// COUNT-UP ANIMATION COMPONENT FOR METRICS
// ==================================================
function CountUpStat({ 
  value, 
  targetNum, 
  suffix = '', 
  prefix = '' 
}: { 
  value?: string; 
  targetNum?: number; 
  suffix?: string; 
  prefix?: string; 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayVal, setDisplayVal] = useState<number>(0);

  useEffect(() => {
    if (isInView && targetNum !== undefined) {
      const controls = animate(0, targetNum, {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayVal(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, targetNum]);

  if (value === '24/7') {
    return <span ref={ref}>24/7</span>;
  }

  if (targetNum === undefined) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}{displayVal.toLocaleString()}{suffix}
    </span>
  );
}

// ==================================================
// ECOSYSTEM CARD ANIMATED CONTENT
// (Separates inner visual animation from outer layout positioning)
// ==================================================
function EcosystemCardAnimatedContent({ area, idx, stepNumber }: { area: any; idx: number; stepNumber?: string }) {
  const AreaIcon = area.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative bg-white/95 backdrop-blur-md border border-csl-gold/30 hover:border-csl-gold/80 rounded-2xl p-5 shadow-md hover:shadow-xl hover:shadow-csl-gold/15 transition-all duration-300 w-full h-full flex flex-col justify-between"
    >
      {/* Extremely Subtle Floating Idle Loop (Max 3px vertical shift inside content wrapper) */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ 
          duration: 5.5 + (idx % 3), 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: idx * 0.45 
        }}
        className="flex flex-col h-full"
      >
        <div className="flex items-center justify-between gap-2.5 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-csl-blue/10 border border-csl-blue/20 text-csl-blue group-hover:bg-csl-blue group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
              <AreaIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            </div>
            <h4 className="text-sm font-bold text-csl-text group-hover:text-csl-blue transition-colors leading-tight">
              {area.title}
            </h4>
          </div>
          {stepNumber && (
            <span className="text-xs font-mono font-bold text-csl-gold bg-csl-gold/10 px-2 py-0.5 rounded-md">
              {stepNumber}
            </span>
          )}
        </div>
        <p className="text-xs text-csl-muted font-medium leading-relaxed group-hover:text-csl-text transition-colors">
          {area.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ==================================================
// WHAT'S NEXT FOR YOU? FINAL CTA COMPONENT
// ==================================================
function WhatsNextSection() {
  const handleNavigate = (path: string) => {
    const targetPath = path === '/portfolio' ? '/services' : path;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const destinations = [
    {
      title: 'LEARN',
      subtitle: 'Explore Courses →',
      path: '/courses',
      desc: 'Industry-focused courses & practical skills'
    },
    {
      title: 'BUILD',
      subtitle: 'Explore Services →',
      path: '/services',
      desc: 'End-to-end enterprise software solutions'
    },
    {
      title: 'GROW',
      subtitle: 'Explore Internships →',
      path: '/internships',
      desc: 'Real-world project experience & mentoring'
    }
  ];

  return (
    <section id="whats-next" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-csl-bg via-[#FBF7F4] to-white border-t border-csl-gold/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-csl-blue font-bold tracking-widest text-xs uppercase block mb-3">
            NEXT STEPS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-csl-text tracking-tight uppercase">
            WHAT'S NEXT <span className="text-csl-blue">FOR YOU?</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-csl-gold to-csl-blue mx-auto mt-4" />
        </motion.div>

        {/* 3 Editorial Destination Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full max-w-5xl">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => handleNavigate(dest.path)}
              className="group relative bg-white/90 backdrop-blur-md border border-csl-gold/30 hover:border-csl-gold/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-csl-gold/15 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5"
            >
              {/* Top Accent Line */}
              <div className="w-12 h-1 bg-gradient-to-r from-csl-gold to-csl-blue rounded-full mb-6 group-hover:w-full transition-all duration-500" />

              <div>
                <h3 className="text-3xl sm:text-4xl font-black text-csl-text tracking-tight mb-2 font-mono group-hover:text-csl-blue transition-colors">
                  {dest.title}
                </h3>
                <p className="text-xs text-csl-muted font-medium leading-relaxed mb-8">
                  {dest.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-csl-gold/20 flex items-center justify-between">
                <span className="text-sm font-extrabold text-csl-text group-hover:text-csl-blue transition-colors flex items-center gap-2">
                  {dest.subtitle}
                </span>
                <div className="w-8 h-8 rounded-full bg-csl-blue/10 text-csl-blue group-hover:bg-csl-blue group-hover:text-white flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function AboutPage() {
  const [activeDifferenceIndex, setActiveDifferenceIndex] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -20% 0px' }
    );

    aboutSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const heroY = useTransform(scrollY, [0, 600], [0, -35]);

  const handleNavigateToCourses = () => {
    if (window.location.pathname !== '/courses') {
      window.history.pushState({}, '', '/courses');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.4, duration: 7 },
    { size: 'w-24 h-24', pos: 'top-[22%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'bottom-[20%] left-[10%]', delay: 1.8, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[15%] right-[25%]', delay: 0.9, duration: 7.5 },
  ];

  // 6 Exact CSL Difference Content Items from Source
  const cslDifferenceItems = [
    {
      num: '01',
      title: 'Adaptive Learning Technology',
      description: 'AI-powered personalized learning paths that adapt to each student\'s pace, learning style, and knowledge gaps for maximum retention.',
      icon: Cpu
    },
    {
      num: '02',
      title: 'Expert Educator Network',
      description: 'Learn from certified teachers and industry professionals with proven track records in delivering exceptional educational outcomes.',
      icon: Users
    },
    {
      num: '03',
      title: 'Proven Success Metrics',
      description: '95% course completion rate and 87% improvement in student performance within the first 3 months of enrollment.',
      icon: Award
    },
    {
      num: '04',
      title: 'Goal-Oriented Curriculum',
      description: 'Every lesson is designed with clear learning objectives and measurable outcomes aligned with academic and career goals.',
      icon: Target
    },
    {
      num: '05',
      title: 'Flexible Learning Schedule',
      description: 'Study at your own pace with 24/7 access to materials, live sessions, and recorded lectures that fit your lifestyle.',
      icon: Clock
    },
    {
      num: '06',
      title: 'Comprehensive Support System',
      description: 'Dedicated mentors, peer study groups, and instant doubt resolution ensure no student is left behind.',
      icon: HeartHandshake
    }
  ];

  // 6 Exact Ecosystem Areas from Source
  const ecosystemAreas = [
    {
      id: 'k12',
      title: 'K-12 Academic Excellence',
      description: 'Complete educational foundation covering core academics, STEM programs, arts integration, critical thinking, digital literacy, and life skills development for holistic growth.',
      icon: GraduationCap,
    },
    {
      id: 'tech',
      title: 'Technology & Innovation',
      description: 'Coding, AI/ML, data science, robotics, and emerging technologies with hands-on projects and industry applications.',
      icon: Rocket,
    },
    {
      id: 'prof',
      title: 'Professional Skills Development',
      description: 'Build essential workplace skills including communication, leadership, project management, and digital literacy for career advancement.',
      icon: Compass,
    },
    {
      id: 'interview',
      title: 'Interview Preparation & Placement',
      description: 'Comprehensive interview preparation for Tier 1 companies to startups including technical rounds, HR interviews, mock sessions, resume building, and guaranteed placement support.',
      icon: Briefcase,
    },
    {
      id: 'lang',
      title: 'Language Learning',
      description: 'Master new languages through immersive experiences, native speaker interactions, and cultural context learning.',
      icon: Languages,
    },
    {
      id: 'arts',
      title: 'Creative Arts & Design',
      description: 'Explore creativity through digital art, music production, creative writing, and multimedia design courses.',
      icon: Palette,
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Page Internal Navigation Rail */}
      <NavigationRail sections={aboutSections} activeSection={activeSection} />
      
      {/* ==================================================
          1. ABOUT HERO SECTION
         ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden"
      >
        {/* Floating Voxel Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Mobile Order 1: Title & Eyebrow */}
          <div className="order-1 lg:order-none flex flex-col items-start max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                ABOUT CREATORSPACE LAB
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold text-csl-text leading-[1.06] tracking-tight mb-2">
              Building Skills, <br />
              <span className="text-csl-blue">Shaping Careers</span>
            </h1>
          </div>

          {/* Mobile Order 2: Hero Visual Asset */}
          <div className="order-2 lg:order-none flex items-center justify-center relative w-full">
            <motion.div
              className="relative w-full max-w-[460px] sm:max-w-[520px]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-3xl -z-10 rounded-full scale-90" />
              <img 
                src={heroAboutVisual} 
                alt="CreatorSpaceLab Innovation" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>
          </div>

          {/* Mobile Order 3: Description & CTA */}
          <div className="order-3 lg:order-none flex flex-col items-start max-w-xl">
            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-8">
              From your first line of code to your first job offer — we’re with you at every step.
            </p>

            <button
              onClick={handleNavigateToCourses}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Start Learning Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </motion.section>

      {/* FOREGROUND SLIDING CONTENT WRAPPER */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. HERO METRICS (Count-Up Entrance Animation)
           ================================================== */}
        <section className="relative w-full py-12 md:py-16 bg-white/40 border-b border-csl-gold/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-csl-gold/20 w-full">
              
              <div className="flex flex-col items-center text-center p-6 first:pt-0 last:pb-0 md:py-2">
                <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-csl-text tracking-tight mb-2 font-mono">
                  <CountUpStat targetNum={76} suffix="+" />
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-csl-blue uppercase">
                  Projects Completed
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-6 md:py-2">
                <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-csl-text tracking-tight mb-2 font-mono">
                  <CountUpStat targetNum={39} suffix="+" />
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-csl-blue uppercase">
                  Happy Clients
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-6 last:pb-0 md:py-2">
                <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-csl-text tracking-tight mb-2 font-mono">
                  <CountUpStat targetNum={3000} suffix="+" />
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-csl-blue uppercase">
                  Students Trained
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================
            3. WHO WE ARE (Paragraph + 3 Large Pillars with TOP-RIGHT LED DOTS)
           ================================================== */}
        <section id="who-we-are" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                IDENTITY
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-6">
              Who <span className="text-csl-blue">We Are</span>
            </h2>
            <p className="text-base sm:text-lg text-csl-text font-medium leading-relaxed">
              We are a modern EdTech & Software Solutions company dedicated to transforming careers and accelerating business innovation. Through hands-on training, real-world project experience, and end-to-end software development services, we empower learners and organizations to grow with confidence in a rapidly evolving digital world.
            </p>
          </motion.div>

          {/* 3 Large Typographic Pillars with Top-Right Status LED Dot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                line1: 'EDTECH',
                line2: 'LEARNING',
                line3: 'PROGRAMS',
                desc: 'Comprehensive industry-aligned training'
              },
              {
                line1: 'SOFTWARE',
                line2: 'DEVELOPMENT',
                line3: 'SERVICES',
                desc: 'Production-grade enterprise solutions'
              },
              {
                line1: 'PROJECT-BASED',
                line2: 'LEARNING',
                line3: 'ECOSYSTEM',
                desc: 'Hands-on practical execution'
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-csl-gold/70 hover:-translate-y-1 transition-all duration-300"
              >
                {/* TOP RIGHT CORNER STATUS LED DOT */}
                <div className="absolute top-6 right-6 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{ 
                      opacity: [0.65, 1, 0.65],
                      boxShadow: [
                        '0 0 6px rgba(255, 183, 3, 0.55)',
                        '0 0 10px rgba(255, 183, 3, 0.95)',
                        '0 0 6px rgba(255, 183, 3, 0.55)'
                      ]
                    }}
                    transition={{ 
                      duration: 3.5, 
                      repeat: Infinity, 
                      ease: 'easeInOut',
                      delay: idx * 0.45 
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-csl-gold group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(255,183,3,1)] transition-all duration-300"
                  />
                </div>

                <div className="mb-8 pr-6">
                  <span className="text-xs font-mono font-bold text-csl-gold block mb-3">
                    PILLAR 0{idx + 1}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-csl-text tracking-tight leading-[1.1] font-mono group-hover:text-csl-blue transition-colors">
                    <div>{pillar.line1}</div>
                    <div className="text-csl-blue">{pillar.line2}</div>
                    <div>{pillar.line3}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-csl-muted pt-4 border-t border-csl-gold/20">
                  {pillar.desc}
                </span>
              </motion.div>
            ))}
          </div>

        </section>

        {/* ==================================================
            4. WHY CHOOSE CREATOR SPACE LAB (Count-Up Animation)
           ================================================== */}
        <section id="why-csl" className="relative w-full py-16 md:py-24 bg-white/40 border-y border-csl-gold/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                  OUR PROMISE
                </span>
                <div className="h-[2px] w-8 bg-csl-gold/60"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-6">
                Why Choose <span className="text-csl-blue">Creator Space Lab?</span>
              </h2>
              <p className="text-base sm:text-lg text-csl-text font-medium leading-relaxed">
                We don't just deliver education—we transform learning experiences. With AI-powered personalization, expert mentorship, and proven methodologies, we turn every student's potential into measurable academic success.
              </p>
            </motion.div>

            {/* 3 Editorial Metric Blocks with Count-Up */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-csl-gold/20 w-full bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-3xl p-8 shadow-sm">
              
              <div className="flex flex-col items-center text-center p-6 first:pt-0 last:pb-0 md:py-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-csl-text tracking-tight mb-2 font-mono">
                  <CountUpStat targetNum={2} suffix="M+" />
                </span>
                <span className="text-sm font-extrabold tracking-wider text-csl-blue uppercase">
                  Students Empowered
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-6 md:py-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-csl-text tracking-tight mb-2 font-mono">
                  <CountUpStat targetNum={95} suffix="%" />
                </span>
                <span className="text-sm font-extrabold tracking-wider text-csl-blue uppercase">
                  Success Rate
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-6 last:pb-0 md:py-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-csl-text tracking-tight mb-2 font-mono">
                  <CountUpStat value="24/7" />
                </span>
                <span className="text-sm font-extrabold tracking-wider text-csl-blue uppercase">
                  Learning Support
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* ==================================================
            5. THE CSL DIFFERENCE (6 Sequential Vertical Items)
           ================================================== */}
        <section id="our-difference" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                METHODOLOGY
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              The CSL <span className="text-csl-blue">Difference</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              Six core operational principles engineered for maximum learning outcome and career transformation.
            </p>
          </motion.div>

          {/* Sequential Vertical Presentation */}
          <div className="flex flex-col gap-4 w-full">
            {cslDifferenceItems.map((item, idx) => {
              const ItemIcon = item.icon;
              const isActive = activeDifferenceIndex === idx;

              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onMouseEnter={() => setActiveDifferenceIndex(idx)}
                  className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-default border ${
                    isActive 
                      ? 'bg-white/95 border-csl-gold/70 shadow-lg shadow-csl-gold/10' 
                      : 'bg-white/60 border-csl-gold/25 hover:bg-white/80'
                  }`}
                >
                  {/* Left Golden Accent Indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-gradient-to-b from-csl-gold to-csl-blue transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Left Content */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    <span className={`text-xl sm:text-2xl font-extrabold font-mono transition-colors shrink-0 ${
                      isActive ? 'text-csl-gold' : 'text-csl-gold/70'
                    }`}>
                      {item.num}
                    </span>

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive 
                        ? 'bg-csl-blue text-white shadow-xs scale-105' 
                        : 'bg-csl-blue/10 border border-csl-blue/20 text-csl-blue'
                    }`}>
                      <ItemIcon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col">
                      <h3 className={`text-lg sm:text-xl font-bold transition-colors ${
                        isActive ? 'text-csl-blue' : 'text-csl-text'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </section>

        {/* ==================================================
            7. COMPREHENSIVE LEARNING ECOSYSTEM
            (Fixed Radial Desktop Composition + Separated Position & Animation Architecture)
           ================================================== */}
        <section id="ecosystem" className="relative w-full py-16 md:py-24 bg-white/40 border-y border-csl-gold/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="mb-14 text-center flex flex-col items-center"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                  HOLISTIC PROGRAM
                </span>
                <div className="h-[2px] w-8 bg-csl-gold/60"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
                Comprehensive <span className="text-csl-blue">Learning Ecosystem</span>
              </h2>
              <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
                An interconnected learning framework covering every stage of education, professional growth, and skill mastery.
              </p>
            </motion.div>

            {/* DESKTOP FIXED RADIAL COMPOSITION (Outer Position Wrappers + Inner Animated Content) */}
            <div className="hidden lg:block relative w-full max-w-5xl mx-auto h-[620px]">
              
              {/* Central CSL Visual Emblem Anchor */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <motion.div 
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-48 h-48 flex items-center justify-center bg-white/95 border border-csl-gold/40 rounded-full shadow-2xl pointer-events-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-2xl rounded-full scale-125 -z-10" />
                  <img src={cslEmblem} alt="CSL Emblem" className="w-24 h-24 object-contain drop-shadow-md" />
                </motion.div>
              </div>

              {/* Position 1: Top Center */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 z-20">
                <EcosystemCardAnimatedContent area={ecosystemAreas[0]} idx={0} />
              </div>

              {/* Position 2: Top Right */}
              <div className="absolute top-[12%] right-0 w-80 z-20">
                <EcosystemCardAnimatedContent area={ecosystemAreas[1]} idx={1} />
              </div>

              {/* Position 3: Bottom Right */}
              <div className="absolute bottom-[12%] right-0 w-80 z-20">
                <EcosystemCardAnimatedContent area={ecosystemAreas[2]} idx={2} />
              </div>

              {/* Position 4: Bottom Center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 z-20">
                <EcosystemCardAnimatedContent area={ecosystemAreas[3]} idx={3} />
              </div>

              {/* Position 5: Bottom Left */}
              <div className="absolute bottom-[12%] left-0 w-80 z-20">
                <EcosystemCardAnimatedContent area={ecosystemAreas[4]} idx={4} />
              </div>

              {/* Position 6: Top Left */}
              <div className="absolute top-[12%] left-0 w-80 z-20">
                <EcosystemCardAnimatedContent area={ecosystemAreas[5]} idx={5} />
              </div>

            </div>

            {/* MOBILE VERTICAL SEQUENCE (01 to 06) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6 w-full">
              {ecosystemAreas.map((area, idx) => (
                <div key={area.id} className="w-full">
                  <EcosystemCardAnimatedContent area={area} idx={idx} stepNumber={`0${idx + 1}`} />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================================================
            8. TRANSFORM YOUR LEARNING JOURNEY (CTA & 4 Steps)
           ================================================== */}
        <section id="learning-journey" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                TAKE ACTION
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-2">
              Transform Your Learning Journey Today
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-csl-blue mb-4">
              Ready to Unlock Your Full Potential?
            </h3>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              Join millions of students who have transformed their academic journey with our innovative learning platform. Start your personalized learning experience today.
            </p>
          </motion.div>

          {/* 4 Progression Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full">
            {[
              { num: '01', title: 'Instant Access' },
              { num: '02', title: 'Personalized Learning' },
              { num: '03', title: 'Expert Mentors' },
              { num: '04', title: 'Proven Results' }
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-csl-gold/20 text-csl-text font-mono font-extrabold flex items-center justify-center shrink-0">
                  {step.num}
                </div>
                <span className="text-sm font-bold text-csl-text tracking-tight">
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-center w-full">
            <button
              onClick={handleNavigateToCourses}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Start Learning Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </section>

        {/* ==================================================
            9. WHAT'S NEXT FOR YOU? (Final Destination CTA Gateway)
           ================================================== */}
        <WhatsNextSection />

      </div>
    </div>
  );
}
