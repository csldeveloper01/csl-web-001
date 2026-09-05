import { ArrowRight, ChevronRight } from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

// @ts-ignore
import iconAI from '../../../../Elements/COURSES/AI and Machine Learning.png';
// @ts-ignore
import iconCloud from '../../../../Elements/COURSES/Cloud and AWS Development.png';
// @ts-ignore
import iconFullStack from '../../../../Elements/COURSES/Full Stack Development.png';
// @ts-ignore
import iconCyber from '../../../../Elements/COURSES/Cybersecurity and Ethical Hacking.png';
// @ts-ignore
import iconUIUX from '../../../../Elements/COURSES/UIUX Front End design.png';
// @ts-ignore
import iconBanner from '../../../../Elements/COURSES/AI + Cloud + AWS = Future Skills.png';

const coursesData = [
  {
    id: '01',
    deepLinkId: 'full-stack-python',
    title: 'Full Stack Web Development',
    description: 'Master frontend & backend with hands-on projects.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '02',
    deepLinkId: 'ui-ux-design-mastery',
    title: 'UI/UX Design',
    description: 'Learn design thinking, wireframing, and interactive prototyping.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '03',
    deepLinkId: 'data-science-analytics',
    title: 'Data Science & AI',
    description: 'From Python to Machine Learning — become job-ready.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

const workshopsData = [
  { title: 'AI / Machine Learning', icon: iconAI, deepLinkId: 'ai-ml' },
  { title: 'Cloud & AWS Deployment', icon: iconCloud, deepLinkId: 'cloud-aws' },
  { title: 'Full Stack Development', icon: iconFullStack, deepLinkId: 'full-stack' },
  { title: 'Cybersecurity & Ethical Hacking', icon: iconCyber, deepLinkId: 'cybersecurity' },
  { title: 'UI/UX & Frontend Design', icon: iconUIUX, deepLinkId: 'ui-ux' }
];

export function CoursesSection() {
  const yellowBlocks = [
    { size: 'w-16 h-16', pos: 'top-[10%] left-[5%]', delay: 0.2, duration: 8 },
    { size: 'w-8 h-8', pos: 'top-[25%] left-[48%]', delay: 1.5, duration: 6 },
    { size: 'w-12 h-12', pos: 'top-[15%] right-[8%]', delay: 0.7, duration: 7 },
    { size: 'w-10 h-10', pos: 'bottom-[12%] right-[4%]', delay: 2.1, duration: 9 },
  ];

  const handleNavigateToPath = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  return (
    <section className="relative w-full py-10 md:py-16 flex items-center justify-center bg-csl-bg overflow-hidden mx-auto">
      
      {/* Decorative Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none z-10 2xl:max-w-[1600px] 2xl:mx-auto">
        {yellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-24 items-start">
        
        {/* LEFT COLUMN: COURSES */}
        <div className="flex flex-col w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
              Courses
            </span>
            <div className="h-[2px] w-8 bg-csl-gold/60"></div>
          </div>
          
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-csl-text leading-[1.1] tracking-tight mb-4" data-distort="text">
            Learn what <br className="hidden sm:block" />
            moves you <span className="text-csl-blue">forward.</span>
          </h2>

          <p className="text-csl-muted text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            Industry-focused courses designed around practical skills, real projects, and technologies that actually get used.
          </p>

          {/* Courses List */}
          <div className="flex flex-col gap-6">
            {coursesData.map((course) => (
              <a
                key={course.id}
                href={`/courses#${course.deepLinkId}`}
                onClick={(e) => handleNavigateToPath(e, `/courses#${course.deepLinkId}`)}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 border border-csl-gold/25 rounded-2xl bg-white/60 backdrop-blur-sm hover:border-csl-gold hover:bg-white/90 hover:shadow-lg transition-all duration-300 gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-6 flex-1">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-csl-gold/30">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-csl-gold text-xs font-bold mb-1 font-mono">
                      PROGRAM {course.id}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-csl-text group-hover:text-csl-blue transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-csl-muted text-xs sm:text-sm mt-1 line-clamp-1 font-medium">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center w-8 h-8 rounded-full border border-csl-gold/40 flex items-center justify-center text-csl-text group-hover:bg-csl-blue group-hover:text-white group-hover:border-csl-blue transition-all duration-300 shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: WORKSHOPS & EMERGING TECH */}
        <div className="flex flex-col w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
              Workshops & Emerging Tech
            </span>
            <div className="h-[2px] w-8 bg-csl-gold/60"></div>
          </div>
          
          {/* Subheading */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-csl-text leading-tight tracking-tight mb-8" data-distort="text">
            Hands-on workshops in <br />
            high-demand domains
          </h3>

          {/* Workshop Items List */}
          <div className="border border-csl-gold/25 rounded-2xl bg-white/40 backdrop-blur-sm divide-y divide-csl-gold/20 overflow-hidden mb-8">
            {workshopsData.map((workshop, idx) => (
              <a 
                key={idx} 
                href={`/workshops#${workshop.deepLinkId}`}
                onClick={(e) => handleNavigateToPath(e, `/workshops#${workshop.deepLinkId}`)}
                className="group flex items-center px-6 py-4 hover:bg-white/60 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center shrink-0 mr-6">
                  <img src={workshop.icon} alt={workshop.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" />
                </div>
                <h4 className="flex-1 text-[15px] font-bold text-csl-text group-hover:text-csl-blue transition-colors">
                  {workshop.title}
                </h4>
                <ChevronRight className="w-5 h-5 text-csl-muted group-hover:text-csl-blue group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>

          {/* Banner Card */}
          <div className="w-full border border-csl-gold/20 rounded-2xl p-6 md:p-8 bg-white/60 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 shrink-0">
              <img src={iconBanner} alt="AI Cloud AWS" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <div className="flex-1">
              <h4 className="text-[15px] font-bold text-csl-text mb-2">
                AI + Cloud + AWS = Future Skills
              </h4>
              <p className="text-csl-muted text-[13px] font-medium leading-relaxed">
                Learn from industry experts, work on real-world projects and explore emerging technologies.
              </p>
            </div>
          </div>

          {/* Desktop CTAs (Both buttons) */}
          <div className="hidden lg:flex self-start flex-wrap items-center gap-4">
            <a 
              href="/courses" 
              onClick={(e) => handleNavigateToPath(e, '/courses')}
              className="inline-flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-8 py-3.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              Explore All Courses
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="/workshops" 
              onClick={(e) => handleNavigateToPath(e, '/workshops')}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-csl-blue/20 active:scale-95 shadow-sm cursor-pointer"
            >
              Explore Workshops
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile CTA (Explore Workshops button) */}
          <div className="flex lg:hidden w-full">
            <a 
              href="/workshops" 
              onClick={(e) => handleNavigateToPath(e, '/workshops')}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-csl-blue/20 active:scale-95 shadow-sm cursor-pointer"
            >
              Explore Workshops
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
