import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Brain, 
  Sparkles, 
  Bot, 
  Code2, 
  Cloud, 
  BarChart3, 
  Clock, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';
import { InternshipModal } from './InternshipModal';

// @ts-expect-error
import internshipsIllustration from '../../../../Elements/INTERNSHIPS/INTERNSHIPS.png';

const hotInternshipDomains = [
  {
    id: '01',
    icon: Brain,
    title: 'AI & Machine Learning Engineering',
    description: 'Deep neural networks, statistical predictive models, and enterprise AI systems.',
  },
  {
    id: '02',
    icon: Sparkles,
    title: 'Generative AI & Prompt Engineering',
    description: 'LLM application development, multi-modal workflows, and prompt engineering frameworks.',
  },
  {
    id: '03',
    icon: Bot,
    title: 'Agentic AI & Intelligent Automation',
    description: 'Autonomous reasoning agents, automated tool execution, and intelligent process workflows.',
  },
  {
    id: '04',
    icon: Code2,
    title: 'Full Stack Web & Mobile App Development',
    description: 'End-to-end production web apps, cross-platform mobile frameworks, and scalable cloud APIs.',
  },
  {
    id: '05',
    icon: Cloud,
    title: 'DevOps & Cloud Engineering',
    description: 'Cloud architecture, Docker containerization, Kubernetes orchestration, and CI/CD pipelines.',
  },
  {
    id: '06',
    icon: BarChart3,
    title: 'Data Analytics & Business Intelligence',
    description: 'Data transformation, predictive SQL querying, business dashboards, and data visualization.',
  },
];

export function InternshipsSection() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');

  const yellowBlocks = [
    { size: 'w-14 h-14', pos: 'top-[12%] left-[48%]', delay: 0.3, duration: 7 },
    { size: 'w-8 h-8', pos: 'top-[22%] left-[6%]', delay: 1.1, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[10%] left-[4%]', delay: 0.8, duration: 8 },
    { size: 'w-10 h-10', pos: 'bottom-[15%] right-[44%]', delay: 2.0, duration: 7.5 },
    { size: 'w-20 h-20', pos: 'top-[18%] right-[8%]', delay: 1.4, duration: 9 },
    { size: 'w-12 h-12', pos: 'bottom-[14%] right-[8%]', delay: 0.5, duration: 6.5 },
  ];

  const handleNavigateToInternships = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/internships');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenApplyModal = (domainTitle: string) => {
    setSelectedDomain(domainTitle);
    setIsApplyModalOpen(true);
  };

  return (
    <section 
      className="relative w-full py-12 md:py-20 flex items-center justify-center bg-csl-bg overflow-hidden mx-auto"
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

      <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: HEADLINE, BADGES, 3D ILLUSTRATION & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start w-full">
          {/* Eyebrow */}
          <div className="section-eyebrow">
            <span>Internships</span>
            <div></div>
          </div>
          
          {/* Header */}
          <h2 
            className="text-3xl sm:text-4xl md:text-[3.2rem] font-extrabold text-csl-text section-heading tracking-tight mb-4"
            data-distort="text"
          >
            Build Beyond <br />
            The <span className="text-csl-blue">Classroom.</span>
          </h2>          
          
          {/* Subtitle */}
          <p className="text-csl-muted font-medium text-sm md:text-base mb-6 section-subheading max-w-lg">
            Work on real-world engineering problems, build with modern production technologies, and turn your technical skills into verified industry experience.
          </p>

          {/* Key Program Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-csl-blue/[0.08] border border-csl-blue/20 text-xs font-bold text-csl-blue">
              <Clock className="w-3.5 h-3.5" />
              15 Days / 30 Days
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-csl-gold/15 border border-csl-gold/30 text-xs font-bold text-csl-text">
              <Globe className="w-3.5 h-3.5 text-csl-gold" />
              Online / Offline
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Industry Certified
            </span>
          </div>

          {/* 3D Artwork Illustration Card */}
          <div className="w-full flex items-center justify-center my-2 lg:my-4">
            <motion.div
              className="relative w-full max-w-[280px] sm:max-w-[340px] flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Ambient gold voxel glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/20 via-transparent to-csl-blue/15 blur-2xl -z-10 rounded-full scale-95 pointer-events-none" />
              
              <img 
                src={internshipsIllustration} 
                alt="Internships 3D Workspace" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,30,80,0.12)]"
              />
            </motion.div>
          </div>

          {/* Primary CTA Button */}
          <div className="w-full pt-2">
            <a 
              href="/internships" 
              onClick={handleNavigateToInternships}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-csl-blue/25 active:scale-95 shadow-sm cursor-pointer"
            >
              Explore Internships
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 6 FEATURED HOT INTERNSHIP DOMAINS */}
        <div className="lg:col-span-7 flex flex-col w-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-extrabold uppercase text-csl-gold tracking-wider">
              HOT INTERNSHIP DOMAINS
            </span>
            <span className="text-xs font-medium text-csl-muted">
              6 Practical Tracks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
            {hotInternshipDomains.map((track) => {
              const IconComponent = track.icon;
              return (
                <div
                  key={track.id}
                  className="group relative flex flex-col justify-between p-4 sm:p-5 bg-white/75 backdrop-blur-sm border border-csl-gold/25 rounded-2xl hover:border-csl-gold/60 hover:bg-white/95 hover:shadow-lg hover:shadow-csl-gold/10 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-csl-blue/[0.07] border border-csl-blue/15 flex items-center justify-center text-csl-blue group-hover:scale-105 group-hover:bg-csl-blue group-hover:text-white transition-all duration-300">
                        <IconComponent className="w-5 h-5 stroke-[1.8]" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-csl-muted group-hover:text-csl-gold transition-colors">
                        {track.id}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-csl-text group-hover:text-csl-blue transition-colors leading-snug mb-1.5">
                      {track.title}
                    </h3>
                    <p className="text-xs text-csl-muted line-clamp-2 leading-relaxed font-medium">
                      {track.description}
                    </p>
                  </div>
                  <div className="mt-3.5 pt-2.5 border-t border-csl-gold/15">
                    <button
                      type="button"
                      onClick={() => handleOpenApplyModal(track.title)}
                      className="w-full flex items-center justify-between py-1 px-1.5 rounded-lg text-xs font-bold text-csl-text hover:text-csl-blue hover:bg-csl-blue/[0.04] transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-csl-gold" />
                        Apply
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-csl-blue" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Internship Application Modal */}
      <InternshipModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialDomain={selectedDomain}
      />
    </section>
  );
}
