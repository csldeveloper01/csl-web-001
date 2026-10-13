import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Globe2
} from 'lucide-react';
import { YellowBox } from '../effects/YellowBox';
import { InternshipDetails } from '../sections/Internships/InternshipDetails';
import { InternshipGallery } from '../sections/Internships/InternshipGallery';
import { InternshipReviewsMarquee } from '../sections/Internships/InternshipReviewsMarquee';
import { InternshipVideoTestimonials } from '../sections/Internships/InternshipVideoTestimonials';
import { InternshipModal } from '../sections/Internships/InternshipModal';
import { InternshipApplicationForm } from '../sections/Internships/InternshipApplicationForm';

// @ts-ignore
import heroStandaloneVisual from '../../../Elements/INTERNSHIPS/INTERNSHIPS - Standalone.png';

export type InternshipMode = 'Online' | 'Offline' | 'Hybrid' | 'Online / Offline' | 'Online / Hybrid' | 'Offline / Hybrid' | 'All Modes';

export interface InternshipTrack {
  id: string;
  title: string;
  description: string;
  image: string;
  techs: string[];
  duration: string;
  mode: InternshipMode;
  projects: string[];
}

// 8 Official Internship Domains from CSL Brochure
const tracksData: InternshipTrack[] = [
  {
    id: '01',
    title: 'Artificial Intelligence & Machine Learning Engineering',
    description: 'Build predictive machine learning models, neural networks, and computer vision pipelines for real-world applications.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    techs: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Neural Networks', 'MLOps'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Supervised & unsupervised predictive models',
      'Computer vision classification pipeline',
      'Model performance optimization & evaluation'
    ]
  },
  {
    id: '02',
    title: 'Generative AI & Prompt Engineering',
    description: 'Master advanced prompt architecture, contextual Retrieval-Augmented Generation (RAG), and LLM application development.',
    image: 'https://images.unsplash.com/photo-1677691824188-3e266886cb27?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    techs: ['LLMs', 'Prompt Engineering', 'RAG Pipelines', 'OpenAI API', 'LangChain', 'Vector DBs'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Context-aware knowledge base assistant',
      'Advanced prompt chaining pipeline',
      'Retrieval-augmented conversational agent'
    ]
  },
  {
    id: '03',
    title: 'Agentic AI & Intelligent Automation',
    description: 'Architect multi-agent autonomous systems, intelligent tool-calling workflows, and goal-driven decision loops.',
    image: 'https://images.unsplash.com/photo-1746286720984-72f386e1872e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    techs: ['AI Agents', 'Autonomous Workflows', 'Tool Calling', 'CrewAI', 'LangGraph', 'Automations'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Multi-agent collaborative research system',
      'Autonomous task executor with external tool calling',
      'Automated intelligence report generator'
    ]
  },
  {
    id: '04',
    title: 'Full Stack Web & Mobile Application Development',
    description: 'Design and deploy modern full-stack web platforms and cross-platform mobile apps using industry-standard frameworks.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Responsive web portal with secure authentication',
      'Full-stack dynamic data-driven dashboard',
      'Cross-platform responsive client interfaces'
    ]
  },
  {
    id: '05',
    title: 'DevOps & Cloud Engineering',
    description: 'Implement automated CI/CD delivery pipelines, containerization, microservices deployment, and cloud infrastructure.',
    image: 'https://images.unsplash.com/photo-1690627931320-16ac56eb2588?q=80&w=2093&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    techs: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux', 'Terraform'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Automated GitHub Actions build & deploy pipeline',
      'Containerized multi-service Docker deployment',
      'Cloud resource provisioning and monitoring'
    ]
  },
  {
    id: '06',
    title: 'Software Testing & QA Automation',
    description: 'Master manual and automated testing methodologies, API verification, test frameworks, and defect tracking lifecycles.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['Selenium', 'Cypress', 'API Testing', 'Postman', 'TestNG', 'QA Frameworks'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Automated UI test suite for web applications',
      'Comprehensive REST API integration test collection',
      'Regression test plan and bug reporting documentation'
    ]
  },
  {
    id: '07',
    title: 'UI/UX Product Design',
    description: 'Create user journeys, design systems, accessible interfaces, and interactive Figma prototypes tested for usability.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['Figma', 'User Research', 'Design Systems', 'Wireframing', 'Prototyping', 'Usability'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Complete product design system and component library',
      'High-fidelity interactive prototype with micro-interactions',
      'Usability research and user journey mapping'
    ]
  },
  {
    id: '08',
    title: 'Data Analytics & Business Intelligence',
    description: 'Transform complex datasets into actionable business intelligence using SQL, statistical analysis, and executive dashboards.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=450',
    techs: ['Power BI', 'SQL', 'Python', 'Excel', 'Tableau', 'Data Modeling'],
    duration: '15 or 30 Days',
    mode: 'Hybrid',
    projects: [
      'Interactive Power BI executive performance dashboard',
      'Relational database querying and data modeling',
      'Statistical trends analysis and business reporting'
    ]
  }
];

export function InternshipsPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTrackDomain, setSelectedTrackDomain] = useState<string>('');

  // Reclining Hero Scroll Effect
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const heroY = useTransform(scrollY, [0, 600], [0, -35]);

  const handleSelectTrack = (title: string) => {
    setSelectedTrackDomain(title);
    setIsApplyModalOpen(true);
  };

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[14%] left-[6%]', delay: 0.4, duration: 7 },
    { size: 'w-24 h-24', pos: 'top-[22%] right-[10%]', delay: 1.1, duration: 8.5 },
    { size: 'w-8 h-8', pos: 'bottom-[20%] left-[10%]', delay: 1.8, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[15%] right-[25%]', delay: 0.9, duration: 7.5 },
  ];

  return (
    <div className="relative w-full min-h-screen bg-csl-bg overflow-x-hidden">
      
      {/* ==================================================
          1. HERO SECTION (RECLINING SCROLL EFFECT)
        ================================================== */}
      <motion.section 
        id="hero"
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="sticky top-0 z-0 w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-center bg-[#FBF7F4] pt-24 pb-12 overflow-hidden"
      >
        {/* Background Yellow Voxel Floating Blocks */}
        <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto">
          {yellowBlocks.map((block, i) => (
            <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
          ))}
        </div>

        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT — COMPLETE HERO CONTENT STACK */}
          <div className="order-1 flex flex-col items-start max-w-xl">

            <div className="section-eyebrow">
              <span>INTERNSHIPS</span>
              <div></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-csl-text leading-[1.05] tracking-tight mb-6">
              Build beyond the <br />
              <span className="text-csl-blue">classroom.</span>
            </h1>

            <p className="text-csl-muted font-medium text-base sm:text-lg md:text-xl leading-relaxed mb-8">
              Work on real-world problems, build with modern technologies, and turn your skills into experience.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-csl-blue/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Explore Tracks
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#details"
                className="inline-flex items-center justify-center gap-2 bg-white/90 border border-csl-gold/40 text-csl-deep-blue px-6 py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-white hover:border-csl-blue transition-all duration-300"
              >
                Program Details
              </a>
            </div>

          </div>

          {/* RIGHT — HERO VISUAL ASSET */}
          <div className="order-2 flex items-center justify-center relative w-full">

            <motion.div
              className="relative w-full max-w-[540px] sm:max-w-[620px]"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/20 via-transparent to-csl-blue/15 blur-3xl -z-10 rounded-full scale-90" />

              <img
                src={heroStandaloneVisual}
                alt="CSL Internships Standalone 3D Asset"
                className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,30,80,0.14)]"
              />
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* FOREGROUND SLIDING CONTENT WRAPPER (Slides smoothly over hero) */}
      <div className="relative z-10 bg-csl-bg shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-csl-gold/20">

        {/* ==================================================
            2. INTERNSHIP PROGRAMS / DOMAINS SECTION
          ================================================== */}
        <section id="tracks" className="relative w-full py-16 md:py-24 section-container">
          
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="section-eyebrow">
              <span>Career-Ready Experience</span>
              <div></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
              Internship <span className="text-csl-blue">Domains</span>
            </h2>
            <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
              Select your domain and gain production-grade engineering and design experience through structured project deliverables.
            </p>
          </div>

          {/* MOBILE & TABLET: COMPACT INTERNSHIP TRACK LIST (lg:hidden) */}
          <div className="lg:hidden flex flex-col gap-3 w-full">
            {tracksData.map((track) => (
              <div
                key={`mobile-${track.id}`}
                onClick={() => handleSelectTrack(track.title)}
                className="group flex items-center justify-between p-3 bg-white/95 rounded-2xl border border-csl-gold/30 hover:border-csl-blue/60 hover:bg-white shadow-xs hover:shadow-md transition-all duration-200 gap-3 cursor-pointer"
              >
                {/* LEFT: Small Thumbnail with ID badge */}
                <div className="relative w-[76px] sm:w-[92px] h-[66px] sm:h-[76px] rounded-xl overflow-hidden shrink-0 bg-csl-bg border border-csl-gold/25">
                  <img 
                    src={track.image} 
                    alt={track.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-1 left-1 bg-csl-deep-blue/90 px-1.5 py-0.5 rounded-md border border-csl-blue/30">
                    <span className="text-[9px] font-extrabold text-csl-gold font-mono leading-none">
                      {track.id}
                    </span>
                  </div>
                </div>

                {/* CENTER: Track title + short description + duration/mode */}
                <div className="flex flex-col flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-mono font-extrabold text-csl-gold leading-none">
                      {track.duration}
                    </span>
                    <span className="text-[9px] text-csl-muted leading-none">•</span>
                    <span className="text-[9px] font-medium text-csl-blue leading-none">
                      {track.mode}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-[13px] font-extrabold text-csl-text group-hover:text-csl-blue transition-colors leading-snug line-clamp-1 mb-0.5">
                    {track.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-csl-muted line-clamp-2 font-medium leading-relaxed">
                    {track.description}
                  </p>
                </div>

                {/* RIGHT: Arrow Icon */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-csl-gold/35 flex items-center justify-center text-csl-text group-hover:bg-csl-blue group-hover:text-white group-hover:border-csl-blue transition-all duration-200 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP: EXISTING TRACK CARDS (hidden lg:flex) */}
          <div className="hidden lg:flex flex-col gap-6 md:gap-8 w-full">
            {tracksData.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white/80 backdrop-blur-sm border border-csl-gold/25 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm hover:border-csl-gold/60 hover:shadow-xl hover:shadow-csl-gold/10 transition-all duration-300 grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-6 lg:gap-8 items-center group"
              >
                {/* 1. Left Thumbnail with Number Overlay */}
                <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[190px] rounded-2xl overflow-hidden border border-csl-gold/20 bg-csl-bg shadow-inner">
                  <img 
                    src={track.image} 
                    alt={track.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-csl-deep-blue/90 backdrop-blur-md px-3 py-1 rounded-xl border border-csl-blue/30 shadow-md">
                    <span className="text-base font-extrabold text-csl-gold font-mono tracking-tight">
                      {track.id}
                    </span>
                  </div>
                </div>

                {/* 2. Middle Details & Tech Tags */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-csl-text group-hover:text-csl-blue transition-colors mb-2 tracking-tight">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-csl-muted font-medium mb-4 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {track.techs.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-csl-text bg-white/90 border border-csl-gold/30 rounded-lg shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Right Meta, Projects & CTA */}
                <div className="flex flex-col justify-between h-full lg:border-l lg:border-csl-gold/20 lg:pl-6 pt-4 lg:pt-0 border-t border-csl-gold/15 lg:border-t-0">
                  <div>
                    {/* Duration & Mode Badges */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-csl-text">
                        <Calendar className="w-3.5 h-3.5 text-csl-gold" />
                        <span>{track.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-csl-blue">
                        <Globe2 className="w-3.5 h-3.5 text-csl-blue" />
                        <span>{track.mode}</span>
                      </div>
                    </div>

                    {/* Project Outcomes */}
                    <div className="flex flex-col gap-1.5 mb-5">
                      {track.projects.map((proj, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-csl-muted font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-csl-gold mt-1.5 shrink-0" />
                          <span className="leading-snug">{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explore CTA */}
                  <button 
                    onClick={() => handleSelectTrack(track.title)}
                    className="inline-flex items-center justify-start gap-2 text-xs sm:text-sm font-bold text-csl-blue hover:text-csl-deep-blue transition-colors group/link cursor-pointer"
                  >
                    <span>Apply for Internship</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </section>

        {/* ==================================================
            3. INTERNSHIP DETAILS (DURATION, FEES, MODE, ELIGIBILITY)
          ================================================== */}
        <InternshipDetails />

        {/* ==================================================
            4. INTERNSHIP EXPERIENCE (ANGLED PHOTO CAROUSEL)
          ================================================== */}
        <InternshipGallery />

        {/* ==================================================
            5. WHAT OUR INTERNS SAY (SEAMLESS INFINITE REVIEW MARQUEE)
          ================================================== */}
        <InternshipReviewsMarquee />

        {/* ==================================================
            6. VIDEO TESTIMONIALS (HEAR FROM OUR INTERNS)
          ================================================== */}
        <InternshipVideoTestimonials />

        {/* ==================================================
            6. ORIGINAL INTERNSHIP ENQUIRY FORM SECTION (FULL PAGE)
          ================================================== */}
        <section id="apply-form" className="relative w-full py-16 md:py-24 section-container">
          
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-10">
              <div className="section-eyebrow justify-center">
                <span>Availability Enquiry</span>
                <div></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
                Looking for an <span className="text-csl-blue">Internship?</span>
              </h2>
              <p className="text-csl-muted font-medium text-sm md:text-base section-subheading max-w-xl mx-auto">
                Tell us a little about yourself and the kind of internship you're looking for. Send us an enquiry and our team will get in touch regarding available internship opportunities that match your interests and background.
              </p>
            </div>

            {/* Application Card Form Container */}
            <div className="relative w-full bg-white/90 backdrop-blur-md border border-csl-gold/30 rounded-3xl p-6 sm:p-10 shadow-xl shadow-csl-gold/5 overflow-hidden">
              <InternshipApplicationForm
                initialDomain=""
                context="full-page"
              />
            </div>

          </div>
        </section>

      </div>
      {/* Internship Enquiry Modal (Triggered by CTAs) */}
      <InternshipModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialDomain={selectedTrackDomain}
      />
    </div>
  );
}
