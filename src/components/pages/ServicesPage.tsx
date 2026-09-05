import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  MessageSquare,
  Clock,
  UserCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';

// @ts-ignore
import heroServicesVisual from '../../../Elements/SERVICES/SERVICES.png';

// 1. SERVICES DIRECTORY DATA (9 Services with existing CSL Icon Assignment)
const servicesData = [
  {
    num: '01',
    icon: FileCode2,
    title: 'IEEE Project Development',
    description: 'End-to-end IEEE standard project development with documentation & implementation.',
  },
  {
    num: '02',
    icon: Globe,
    title: 'International Conference Publication',
    description: 'Paper writing, formatting, and publication support for Scopus & UGC care journals.',
  },
  {
    num: '03',
    icon: GraduationCap,
    title: 'PhD Research Implementation',
    description: 'Full PhD project guidance including simulation, coding, publication & thesis support.',
  },
  {
    num: '04',
    icon: Briefcase,
    title: 'MBA Project & Research',
    description: 'Complete MBA project support with data analysis, reports, and presentation.',
  },
  {
    num: '05',
    icon: Cpu,
    title: 'Final Year Projects',
    description: 'AI/ML, IoT, Cloud, Full Stack, Cybersecurity, and blockchain projects.',
  },
  {
    num: '06',
    icon: Users2,
    title: 'Corporate & Student Training',
    description: 'Hands-on training in AI, ML, Data Science, Full Stack, Cloud & Cybersecurity.',
  },
  {
    num: '07',
    icon: Code2,
    title: 'Product & Prototype Development',
    description: 'Custom software, mobile apps, dashboards, and automation platforms.',
  },
  {
    num: '08',
    icon: FileEdit,
    title: 'Research Paper Guidance',
    description: 'Paper writing, review, plagiarism correction & journal publication.',
  },
  {
    num: '09',
    icon: Handshake,
    title: 'Training Partners for Colleges',
    description: 'Dedicated training programs, workshops, seminars, internships, and placement support exclusively for colleges.',
  },
];

// 2. METRICS DATA
const metricsData = [
  { value: '76+', label: 'PROJECTS DELIVERED', sub: 'Production-grade engineering & research' },
  { value: '98%', label: 'CLIENT SATISFACTION', sub: 'Across academia, startups & enterprises' },
  { value: '₹15M+', label: 'COST SAVINGS GENERATED', sub: 'Through operational efficiency & automation' },
  { value: '12+', label: 'TEAM MEMBERS', sub: 'Engineers, researchers & domain specialists' },
];

// 3. CASE STUDY DATA (6 Detailed Projects with Representative High-Quality Web Visuals & Alt Text)
export interface CaseStudyProject {
  id: string;
  num: string;
  categories: string[];
  duration: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  technologies: string[];
  client: string;
  team: string;
  image: string;
  altText: string;
}

const caseStudiesData: CaseStudyProject[] = [
  {
    id: 'tata-electronics',
    num: '01',
    categories: ['ENTERPRISE', 'IoT'],
    duration: '8 months',
    title: 'Tata Electronics Dashboard & Report Generator',
    description: 'Revolutionary IoT-powered solution transforming EV charging station management with real-time analytics and automated reporting.',
    challenge: 'Manual reporting processes consuming 200+ hours monthly, inefficient energy monitoring, and delayed decision-making.',
    solution: 'Developed dashboard with live visualization, automated reporting, and predictive analytics.',
    results: [
      { value: '40%', label: 'Efficiency' },
      { value: '200+', label: 'Hours Saved / Month' },
      { value: '₹2.5M', label: 'Annual Cost Reduction' }
    ],
    technologies: ['Python', 'MongoDB', 'React', 'IoT Integration', 'Machine Learning'],
    client: 'Fortune 500 Manufacturing',
    team: '6 specialists',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000&h=700',
    altText: 'Tata Electronics inspired industrial IoT analytics dashboard'
  },
  {
    id: 'cybersecurity-ai',
    num: '02',
    categories: ['AI & ML', 'RESEARCH'],
    duration: '24 months',
    title: 'AI-Powered Cybersecurity Research',
    description: 'Cutting-edge AI research project developing next-generation anomaly detection systems for enterprise cybersecurity.',
    challenge: 'Traditional security systems failing to detect sophisticated threats, high false-positive rates, and delayed response.',
    solution: 'Developed deep learning and ensemble models for real-time threat detection.',
    results: [
      { value: '90%', label: 'Accuracy' },
      { value: '3x', label: 'Faster Response Time' },
      { value: '65%', label: 'Reduction in False Positives' }
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Kafka', 'Docker'],
    client: 'Academic & Enterprise',
    team: 'Research team of 4',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000&h=700',
    altText: 'AI cybersecurity threat detection visualization'
  },
  {
    id: 'pegatron-automation',
    num: '03',
    categories: ['ENTERPRISE', 'AUTOMATION'],
    duration: '6 months',
    title: 'Pegatron Operational Excellence Platform',
    description: 'Enterprise workflow automation with real-time operational dashboards.',
    challenge: 'Manual processes, fragmented workflows, and reporting delays.',
    solution: 'Built automated workflow, monitoring, and intelligent reporting.',
    results: [
      { value: '20%', label: 'Efficiency' },
      { value: '50+', label: 'Processes Automated' },
      { value: '25%', label: 'Increase in Productivity' }
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Microservices', 'AWS'],
    client: 'Global Technology Manufacturer',
    team: '8 developers',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000&h=700',
    altText: 'Enterprise manufacturing workflow dashboard'
  },
  {
    id: 'e-commerce-suite',
    num: '04',
    categories: ['DIGITAL COMMERCE'],
    duration: '4 months',
    title: 'E-Commerce Transformation Suite',
    description: 'Complete digital transformation with advanced e-commerce ecosystem.',
    challenge: 'Poor engagement, manual inventory, limited online presence.',
    solution: 'AI recommendations, automated inventory, customer analytics.',
    results: [
      { value: '30%', label: 'Sales Increase' },
      { value: '25%', label: 'Customer Retention' },
      { value: '35%', label: 'Reduction in Operational Costs' }
    ],
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'Redis', 'Vercel'],
    client: 'Retail & Textile',
    team: '5 specialists',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=700',
    altText: 'Modern digital commerce analytics interface'
  },
  {
    id: 'few-shot-learning',
    num: '05',
    categories: ['AI & ML', 'RESEARCH'],
    duration: '12 months',
    title: 'Few-Shot Learning Object Detection',
    description: 'Advanced meta-learning system for object detection with minimal data.',
    challenge: 'High data requirement & costly training for traditional models.',
    solution: 'Few-shot learning with transfer & meta-learning.',
    results: [
      { value: '85%+', label: 'Accuracy' },
      { value: '90%', label: 'Data Reduction' },
      { value: '5x', label: 'Faster Deployment Time' }
    ],
    technologies: ['PyTorch', 'CUDA', 'OpenCV', 'Docker', 'Kubernetes'],
    client: 'Research & Healthcare',
    team: '3 researchers',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=1000&h=700',
    altText: 'Computer vision object detection visualization'
  },
  {
    id: 'smart-home-ux',
    num: '06',
    categories: ['UI/UX', 'IoT'],
    duration: '5 months',
    title: 'Smart Home Mobile Experience',
    description: 'User-friendly mobile interface for smart home automation.',
    challenge: 'Complex device management & low user adoption.',
    solution: 'Intuitive design with predictive automation and voice control.',
    results: [
      { value: '95%', label: 'User Satisfaction' },
      { value: '40%', label: 'Increase in App Downloads' },
      { value: '60%', label: 'Reduction in Support Tickets' }
    ],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'IoT APIs', 'Figma'],
    client: 'Smart Home',
    team: '4 developers',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000&h=700',
    altText: 'Smart home mobile automation interface'
  }
];

const categoryFilterOptions = [
  'ALL',
  'ENTERPRISE',
  'IoT',
  'AI & ML',
  'RESEARCH',
  'AUTOMATION',
  'DIGITAL COMMERCE',
  'UI/UX'
];

import { NavigationRail, SectionInfo } from '../layout/NavigationRail';

const servicesSections: SectionInfo[] = [
  { id: 'hero', title: 'SERVICES' },
  { id: 'our-services', title: 'SERVICES LIST' },
  { id: 'metrics', title: 'METRICS' },
  { id: 'selected-work', title: 'PROJECTS' },
  { id: 'final-cta', title: 'CTA' },
];

export function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeSection, setActiveSection] = useState('hero');

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

    servicesSections.forEach((section) => {
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

  const filteredCaseStudies = caseStudiesData.filter((project) => {
    if (activeFilter === 'ALL') return true;
    return project.categories.includes(activeFilter);
  });

  const handleNavigateToContact = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
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
      <NavigationRail sections={servicesSections} activeSection={activeSection} />
      
      {/* ==================================================
          1. SERVICES HERO SECTION
         ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden"
      >
        {/* Background Yellow Voxel Floating Blocks */}
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
                SERVICES
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] font-extrabold text-csl-text leading-[1.06] tracking-tight mb-2">
              We build what moves <br />
              <span className="text-csl-blue">ideas forward.</span>
            </h1>
          </div>

          {/* Mobile Order 2: Hero Visual Asset */}
          <div className="order-2 lg:order-none flex items-center justify-center relative w-full">
            <motion.div
              className="relative w-full max-w-[500px] sm:max-w-[580px]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/20 via-transparent to-csl-blue/15 blur-3xl -z-10 rounded-full scale-90" />
              
              <img 
                src={heroServicesVisual} 
                alt="CSL Services Standalone 3D Asset" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>
          </div>

          {/* Mobile Order 3: Description & CTA */}
          <div className="order-3 lg:order-none flex flex-col items-start max-w-xl">
            <p className="text-csl-muted font-medium text-base sm:text-lg leading-relaxed mb-8">
              Delivering AI, research, full-stack, IoT, automation, and end-to-end engineering solutions for students, startups, and enterprises.
            </p>

            <a 
              href="#selected-work" 
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Our Work
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </motion.section>

      {/* FOREGROUND SLIDING CONTENT WRAPPER */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. OUR SERVICES (Structured Vertical List)
           ================================================== */}
        <section id="our-services" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                Our Offerings
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              Our <span className="text-csl-blue">Services</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              From research and engineering to training and product development, we turn complex ideas into practical solutions.
            </p>
          </div>

          {/* Structured Vertical Service Rows */}
          <div className="flex flex-col gap-4 w-full">
            {servicesData.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative bg-white/70 backdrop-blur-md border border-csl-gold/25 hover:border-csl-gold/70 rounded-2xl p-5 sm:p-7 transition-all duration-300 hover:shadow-lg hover:shadow-csl-gold/10 hover:bg-white/95 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 cursor-default overflow-hidden"
                >
                  {/* Left Accent Bar on Hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-csl-gold to-csl-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Left Content: Number, Icon, Title & Description */}
                  <div className="flex items-start md:items-center gap-4 sm:gap-6 flex-1">
                    {/* Number */}
                    <span className="text-lg sm:text-xl font-extrabold font-mono text-csl-gold/80 group-hover:text-csl-gold transition-colors shrink-0">
                      {service.num}
                    </span>

                    {/* CSL Pixel/Bitmap Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0 group-hover:bg-csl-blue group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
                      <IconComp className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    {/* Title & Description */}
                    <div className="flex flex-col">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-csl-text group-hover:text-csl-blue transition-colors tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow Indicator */}
                  <div className="hidden md:flex items-center text-csl-muted/60 group-hover:text-csl-blue transition-all duration-300 group-hover:translate-x-1.5 shrink-0 pl-4">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </section>

        {/* ==================================================
            3. BUILT TO DELIVER / METRICS SECTION
           ================================================== */}
        <section id="metrics" className="relative w-full py-16 md:py-24 bg-white/40 border-y border-csl-gold/20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center flex flex-col items-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                  PROVEN IMPACT
                </span>
                <div className="h-[2px] w-8 bg-csl-gold/60"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
                Built to <span className="text-csl-blue">Deliver.</span>
              </h2>
              <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
                Real projects, measurable outcomes, and a team focused on turning ideas into working solutions.
              </p>
            </div>

            {/* 4 Large Editorial Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-csl-gold/20 w-full">
              {metricsData.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-6 lg:px-8 first:pt-0 last:pb-0 lg:py-4"
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-csl-text tracking-tight mb-2 font-mono">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider text-csl-blue uppercase mb-1">
                    {metric.label}
                  </span>
                  <span className="text-xs text-csl-muted font-medium leading-normal max-w-[200px]">
                    {metric.sub}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================================================
            4. SELECTED WORK / CASE STUDY PRESENTATION
           ================================================== */}
        <section id="selected-work" className="relative w-full py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Header */}
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                CASE STUDIES
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              Selected <span className="text-csl-blue">Work</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl leading-relaxed">
              A look at the engineering, research, and digital solutions we've built across industries.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14 w-full max-w-4xl mx-auto">
            {categoryFilterOptions.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-csl-blue text-white shadow-md shadow-csl-blue/20 scale-105'
                      : 'bg-white/80 text-csl-text hover:bg-white hover:text-csl-blue border border-csl-gold/25'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Alternating Case Study Sequence */}
          <div className="flex flex-col gap-16 md:gap-24 w-full">
            {filteredCaseStudies.map((project, idx) => {
              const isEven = idx % 2 === 1; // Alternating layout flag

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white/80 backdrop-blur-md border border-csl-gold/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-csl-gold/5 group`}
                >
                  {/* Left or Right Info Column based on Alternating isEven */}
                  <div className={`flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    <div>
                      {/* Category & Duration Row */}
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <div className="flex gap-1.5">
                          {project.categories.map((c) => (
                            <span 
                              key={c}
                              className="px-3 py-1 rounded-full bg-csl-blue/10 border border-csl-blue/20 text-csl-blue font-bold text-xs uppercase tracking-wider"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-csl-muted">
                          <Clock className="w-3.5 h-3.5 text-csl-gold" />
                          <span>{project.duration}</span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-csl-text group-hover:text-csl-blue transition-colors mb-3 tracking-tight">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Challenge & Solution Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-csl-bg/80 border border-csl-gold/20 rounded-2xl p-4">
                          <span className="text-[11px] font-extrabold text-csl-gold uppercase tracking-wider block mb-1">
                            Challenge
                          </span>
                          <p className="text-xs text-csl-text font-medium leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                        <div className="bg-csl-bg/80 border border-csl-blue/20 rounded-2xl p-4">
                          <span className="text-[11px] font-extrabold text-csl-blue uppercase tracking-wider block mb-1">
                            Solution
                          </span>
                          <p className="text-xs text-csl-text font-medium leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Key Results Grid (Prominent Metric Typography) */}
                      <div className="bg-gradient-to-r from-csl-bg via-white to-csl-bg border border-csl-gold/30 rounded-2xl p-4 sm:p-5 mb-6">
                        <span className="text-[11px] font-extrabold text-csl-text uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-csl-gold" />
                          Key Results
                        </span>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          {project.results.map((res, rIdx) => (
                            <div key={rIdx} className="flex flex-col items-center">
                              <span className="text-lg sm:text-2xl font-extrabold text-csl-blue font-mono tracking-tight">
                                {res.value}
                              </span>
                              <span className="text-[10px] sm:text-xs font-semibold text-csl-muted leading-tight mt-0.5">
                                {res.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Technologies & Meta Footer */}
                    <div className="pt-4 border-t border-csl-gold/20 flex flex-col gap-3">
                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-1 text-[11px] font-semibold text-csl-text bg-white border border-csl-gold/30 rounded-lg shadow-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Client & Team */}
                      <div className="flex items-center justify-between text-xs font-semibold text-csl-muted pt-1">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-csl-gold" />
                          <span>Client: <strong className="text-csl-text">{project.client}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-csl-blue" />
                          <span>Team: <strong className="text-csl-text">{project.team}</strong></span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Left or Right Visual Column with High-Resolution Representative Web Imagery */}
                  <div className={`relative w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden border border-csl-gold/25 bg-csl-bg shadow-md ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img 
                      src={project.image} 
                      alt={project.altText} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03] saturate-[1.05]" 
                    />
                    
                    {/* Subtle CSL Deep Blue Ambient Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-csl-deep-blue/40 via-transparent to-transparent pointer-events-none" />

                    {/* Number Badge (Top Left) */}
                    <div className="absolute top-4 left-4 bg-csl-deep-blue/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-csl-blue/30 shadow-md">
                      <span className="text-base font-extrabold text-csl-gold font-mono tracking-tight">
                        {project.num}
                      </span>
                    </div>

                    {/* Representative Visual Badge (Bottom Right) */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-csl-gold/30 shadow-sm">
                      <span className="text-[10px] font-bold text-csl-muted uppercase tracking-wider">
                        Representative Visual
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </section>

        {/* ==================================================
            5. FINAL CLOSING CTA SECTION
           ================================================== */}
        <section id="final-cta" className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white/40 via-[#FBF7F4] to-csl-bg border-t border-csl-gold/20">
          <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
            
            <div className="w-12 h-12 rounded-2xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-6 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text tracking-tight mb-4">
              Have something <span className="text-csl-blue">worth building?</span>
            </h2>

            <p className="text-csl-muted font-medium text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Tell us what you're working on. We'll figure out what it takes to turn the idea into something real.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleNavigateToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/918056052806"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 border border-csl-gold/40 text-csl-text hover:text-csl-blue px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                Chat on WhatsApp
              </a>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
