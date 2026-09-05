import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown, 
  ChevronRight, 
  Sparkles, 
  Cpu, 
  Cloud, 
  Server, 
  Code, 
  Award, 
  Users, 
  Zap, 
  Layers
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { useDeepLinkHighlight } from '../../hooks/useDeepLinkHighlight';

// @ts-ignore
import iconBanner from '../../../Elements/COURSES/AI + Cloud + AWS = Future Skills.png';
// @ts-ignore
import iconAI from '../../../Elements/COURSES/AI and Machine Learning.png';
// @ts-ignore
import iconCloud from '../../../Elements/COURSES/Cloud and AWS Development.png';
// @ts-ignore
import iconFullStack from '../../../Elements/COURSES/Full Stack Development.png';
// @ts-ignore
import iconCyber from '../../../Elements/COURSES/Cybersecurity and Ethical Hacking.png';
// @ts-ignore
import iconUIUX from '../../../Elements/COURSES/UIUX Front End design.png';
// @ts-ignore
import cslEmblem from '../../../Elements/LOGOS/CSL-C.png';

// 5 EXACT SPECIALIZATION TRACKS FROM SOURCE DOCUMENT
const specializationTracks = [
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    icon: iconAI,
    posDesktop: 'top-0 left-1/2 -translate-x-1/2',
    desc: 'Machine learning models, neural networks, and AI integration'
  },
  {
    id: 'cloud-aws',
    title: 'Cloud & AWS Deployment',
    icon: iconCloud,
    posDesktop: 'top-[16%] right-0',
    desc: 'AWS infrastructure, serverless architecture, and cloud deployment'
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    icon: iconFullStack,
    posDesktop: 'bottom-[16%] right-0',
    desc: 'End-to-end web applications with modern frontend & backend'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    icon: iconCyber,
    posDesktop: 'bottom-[16%] left-0',
    desc: 'Defensive security, vulnerability analysis, and ethical hacking'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Frontend Design',
    icon: iconUIUX,
    posDesktop: 'top-[16%] left-0',
    desc: 'User interface design, interactive prototyping, and modern frontend'
  }
];

// 5 EXACT WHY CHOOSE ITEMS FROM SOURCE DOCUMENT
const whyChooseItems = [
  {
    num: '01',
    title: 'Most Requested Program',
    description: 'One of the most requested programs across colleges',
    icon: Zap
  },
  {
    num: '02',
    title: 'AI & AWS Focus',
    description: 'Special sessions on AI applications and AWS Cloud deployment',
    icon: Cpu
  },
  {
    num: '03',
    title: 'Real Projects',
    description: 'Includes industry-level AI & Cloud-based projects',
    icon: Layers
  },
  {
    num: '04',
    title: 'Certification',
    description: 'Certificate of Participation for all attendees',
    icon: Award
  },
  {
    num: '05',
    title: 'Industry Mentors',
    description: 'Networking with IT professionals from top companies',
    icon: Users
  }
];

// ANIMATED SPECIALIZATION CARD (SEPARATES POSITION FROM ANIMATION + DEEP LINK HIGHLIGHT)
function SpecializationCard({ track, idx, isHighlighted }: { track: any; idx: number; isHighlighted?: boolean }) {
  return (
    <motion.div
      id={track.id}
      data-deep-link-id={track.id}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 w-full h-full flex flex-col justify-between ${
        isHighlighted
          ? 'border-2 border-csl-gold ring-4 ring-csl-gold/50 shadow-2xl scale-[1.04] z-30 animate-pulse'
          : 'border border-csl-gold/30 hover:border-csl-gold/80 shadow-md hover:shadow-xl hover:shadow-csl-gold/15'
      }`}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ 
          duration: 5.5 + (idx % 3), 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: idx * 0.4 
        }}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-xl bg-csl-blue/10 border border-csl-blue/20 p-2 shrink-0 group-hover:bg-csl-blue group-hover:border-csl-blue transition-all duration-300 flex items-center justify-center">
            <img src={track.icon} alt={track.title} className="w-full h-full object-contain group-hover:brightness-200 transition-all duration-300" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-csl-gold uppercase tracking-wider block mb-0.5">
              TRACK 0{idx + 1}
            </span>
            <h4 className="text-base font-extrabold text-csl-text group-hover:text-csl-blue transition-colors leading-tight">
              {track.title}
            </h4>
          </div>
        </div>

        <p className="text-xs text-csl-muted font-medium leading-relaxed group-hover:text-csl-text transition-colors">
          {track.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

import { NavigationRail, SectionInfo } from '../layout/NavigationRail';

const workshopsSections: SectionInfo[] = [
  { id: 'hero', title: 'WORKSHOP' },
  { id: 'domains', title: 'DOMAINS' },
  { id: 'pipeline', title: 'PIPELINE' },
  { id: 'why-choose', title: 'WHY CHOOSE' },
  { id: 'participation-cta', title: 'JOIN' },
];

export function WorkshopsPage() {
  const [activeWhyChooseIndex, setActiveWhyChooseIndex] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const highlightedId = useDeepLinkHighlight();

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

    workshopsSections.forEach((section) => {
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

  const handleNavigateToContact = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.4, duration: 7 },
    { size: 'w-24 h-24', pos: 'top-[22%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'bottom-[20%] left-[10%]', delay: 1.8, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[15%] right-[25%]', delay: 0.9, duration: 7.5 },
  ];

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      {/* Page Internal Navigation Rail */}
      <NavigationRail sections={workshopsSections} activeSection={activeSection} />
      
      {/* ==================================================
          1. WORKSHOP HERO SECTION
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
          
          {/* Mobile Order 1: Title & Eyebrow & Formula Pill */}
          <div className="order-1 lg:order-none flex flex-col items-start max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                CreatorSpaceLab
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-csl-text leading-[1.08] tracking-tight mb-4">
              AI & Cloud AWS <br />
              <span className="text-csl-blue">Industry Workshop</span>
            </h1>

            {/* Formula Banner Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-csl-gold/20 via-csl-gold/10 to-csl-blue/15 border border-csl-gold/40 px-4 py-2 rounded-xl mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 text-csl-gold" />
              <span className="text-xs sm:text-sm font-extrabold text-csl-text font-mono">
                AI + Cloud + AWS = Future Skills
              </span>
            </div>
          </div>

          {/* Mobile Order 2: AI + Cloud + AWS Bitmap Visual Asset */}
          <div className="order-2 lg:order-none flex items-center justify-center relative w-full">
            <motion.div
              className="relative w-full max-w-[460px] sm:max-w-[520px]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-3xl -z-10 rounded-full scale-90" />
              <img 
                src={iconBanner} 
                alt="AI Cloud AWS Industry Workshop" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>
          </div>

          {/* Mobile Order 3: Description & CTA */}
          <div className="order-3 lg:order-none flex flex-col items-start max-w-xl">
            {/* Exact Source Description */}
            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-8">
              Learn AI, Cloud & AWS deployment from IT industry experts. Build and deploy real-world AI-powered cloud applications with live mentorship.
            </p>

            <a 
              href="#domains"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Explore Domains
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>

        </div>
      </motion.section>

      {/* FOREGROUND SLIDING CONTENT WRAPPER */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. WORKSHOP FORMULA IDENTITY BAR
           ================================================== */}
        <section className="relative w-full py-12 bg-white/40 border-b border-csl-gold/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xl sm:text-3xl font-black text-csl-text tracking-tight text-center">
              <span className="px-4 py-2 rounded-xl bg-csl-blue/10 text-csl-blue border border-csl-blue/20">AI</span>
              <span className="text-csl-gold">+</span>
              <span className="px-4 py-2 rounded-xl bg-csl-gold/15 text-csl-text border border-csl-gold/30">Cloud</span>
              <span className="text-csl-gold">+</span>
              <span className="px-4 py-2 rounded-xl bg-csl-blue/10 text-csl-blue border border-csl-blue/20">AWS</span>
              <span className="text-csl-gold">=</span>
              <span className="px-5 py-2 rounded-xl bg-gradient-to-r from-csl-gold to-csl-blue text-white shadow-md">
                Future Skills
              </span>
            </div>
          </div>
        </section>

        {/* ==================================================
            3. SPECIALIZATION TRACKS (Connected Radial Composition)
           ================================================== */}
        <section id="domains" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <div className="mb-14 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                DOMAINS
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-3">
              Specialization <span className="text-csl-blue">Tracks</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              Focus on AI, Cloud & AWS with expert guidance
            </p>
          </div>

          {/* DESKTOP FIXED RADIAL COMPOSITION */}
          <div className="hidden lg:block relative w-full max-w-5xl mx-auto h-[600px]">
            
            {/* Central CSL Emblem Anchor */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div 
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-44 h-44 flex items-center justify-center bg-white/95 border border-csl-gold/40 rounded-full shadow-2xl pointer-events-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/25 via-transparent to-csl-blue/20 blur-2xl rounded-full scale-125 -z-10" />
                <img src={cslEmblem} alt="CSL Emblem" className="w-22 h-22 object-contain drop-shadow-md" />
              </motion.div>
            </div>

            {/* Position 1: Top Center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 z-20">
              <SpecializationCard track={specializationTracks[0]} idx={0} isHighlighted={highlightedId === specializationTracks[0].id} />
            </div>

            {/* Position 2: Top Right */}
            <div className="absolute top-[20%] right-0 w-80 h-36 z-20">
              <SpecializationCard track={specializationTracks[1]} idx={1} isHighlighted={highlightedId === specializationTracks[1].id} />
            </div>

            {/* Position 3: Bottom Right */}
            <div className="absolute bottom-[8%] right-[8%] w-80 h-36 z-20">
              <SpecializationCard track={specializationTracks[2]} idx={2} isHighlighted={highlightedId === specializationTracks[2].id} />
            </div>

            {/* Position 4: Bottom Left */}
            <div className="absolute bottom-[8%] left-[8%] w-80 h-36 z-20">
              <SpecializationCard track={specializationTracks[3]} idx={3} isHighlighted={highlightedId === specializationTracks[3].id} />
            </div>

            {/* Position 5: Top Left */}
            <div className="absolute top-[20%] left-0 w-80 h-36 z-20">
              <SpecializationCard track={specializationTracks[4]} idx={4} isHighlighted={highlightedId === specializationTracks[4].id} />
            </div>

          </div>

          {/* MOBILE VERTICAL SEQUENCE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6 w-full">
            {specializationTracks.map((track, idx) => (
              <div key={track.id} className="w-full">
                <SpecializationCard track={track} idx={idx} isHighlighted={highlightedId === track.id} />
              </div>
            ))}
          </div>

        </section>

        {/* ==================================================
            4. FROM CONCEPT TO CLOUD (Visual Pipeline)
           ================================================== */}
        <section id="pipeline" className="relative w-full py-16 md:py-24 bg-white/40 border-y border-csl-gold/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            
            {/* Header */}
            <div className="mb-14 text-center flex flex-col items-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                  PROGRESSION PIPELINE
                </span>
                <div className="h-[2px] w-8 bg-csl-gold/60"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
                From Concept to <span className="text-csl-blue">Cloud</span>
              </h2>
              <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
                Learn AI, Cloud & AWS deployment from IT industry experts. Build and deploy real-world AI-powered cloud applications with live mentorship.
              </p>
            </div>

            {/* 5-Stage Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
              {[
                { stage: '01', title: 'AI', icon: Cpu },
                { stage: '02', title: 'APPLICATION', icon: Code },
                { stage: '03', title: 'CLOUD', icon: Cloud },
                { stage: '04', title: 'AWS', icon: Server },
                { stage: '05', title: 'DEPLOYMENT', icon: Zap }
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.stage}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative bg-white/90 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-csl-gold/70 transition-all"
                  >
                    <span className="text-xs font-mono font-bold text-csl-gold mb-3">
                      STAGE {step.stage}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-3">
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-black text-csl-text tracking-wider font-mono uppercase">
                      {step.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ==================================================
            5. WHY CHOOSE OUR AI & AWS WORKSHOP (Vertical Sequence)
           ================================================== */}
        <section id="why-choose" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                EXCELLENCE
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-3">
              Why Choose Our <span className="text-csl-blue">AI & AWS Workshop?</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              Industry-grade training with real results
            </p>
          </div>

          {/* 5 Vertical Timeline Items */}
          <div className="flex flex-col gap-4 w-full">
            {whyChooseItems.map((item, idx) => {
              const ItemIcon = item.icon;
              const isActive = activeWhyChooseIndex === idx;

              return (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onMouseEnter={() => setActiveWhyChooseIndex(idx)}
                  className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-default border ${
                    isActive 
                      ? 'bg-white/95 border-csl-gold/70 shadow-lg shadow-csl-gold/10' 
                      : 'bg-white/60 border-csl-gold/25 hover:bg-white/80'
                  }`}
                >
                  {/* Left Golden Accent Line */}
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
            6. PARTICIPATION / CLOSING CTA SECTION
           ================================================== */}
        <section id="participation-cta" className="relative w-full py-20 md:py-28 bg-gradient-to-b from-csl-bg via-[#FBF7F4] to-white border-t border-csl-gold/20">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            
            {/* Banner Formula Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-csl-gold/20 via-csl-gold/10 to-csl-blue/15 border border-csl-gold/40 px-5 py-2.5 rounded-xl mb-6 shadow-xs">
              <Sparkles className="w-5 h-5 text-csl-gold" />
              <span className="text-sm sm:text-base font-extrabold text-csl-text font-mono">
                AI + Cloud + AWS = Future Skills
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              Learn AI, Cloud & AWS deployment from <span className="text-csl-blue">IT industry experts.</span>
            </h2>

            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
              Build and deploy real-world AI-powered cloud applications with live mentorship.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#domains"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Explore Domains
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={handleNavigateToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 border border-csl-gold/40 text-csl-text hover:text-csl-blue px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Contact Us
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
