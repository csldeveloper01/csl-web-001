import { ArrowRight, ChevronRight, Flame } from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

const coursesData = [
  {
    id: '01',
    deepLinkId: 'full-stack-ai-python',
    title: 'Full Stack Development with AI - Python',
    description: 'Build modern full stack applications with React, Python, APIs, databases, and AI-powered features.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '02',
    deepLinkId: 'full-stack-ai-java',
    title: 'Full Stack Development with AI - Java',
    description: 'Build enterprise-ready full stack applications with React, Java, Spring Boot, databases, and AI-powered features.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
      id: '03',
      deepLinkId: 'ai-fundamentals',
      title: 'AI/ML with Automation Process',
      description: 'Learn how to integrate AI/ML with automation processes for enhanced productivity.',
      image: 'https://images.unsplash.com/photo-1745674684539-d90293d659a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const trendingWorkshopsData = [
  {
    id: '01',
    title: 'AI/ML with Automation',
    deepLinkId: 'ai-ml',
    count: '6 Workshops',
  },
  {
    id: '02',
    title: 'Full Stack Development with AI & Automation — Java',
    deepLinkId: 'full-stack-java',
    count: '6 Workshops',
  },
  {
    id: '03',
    title: 'Full Stack Development with AI & Automation — Python',
    deepLinkId: 'full-stack-python',
    count: '6 Workshops',
  },
  {
    id: '04',
    title: 'Data Analyst with AI & Automation',
    deepLinkId: 'data-analyst',
    count: '6 Workshops',
  },
  {
    id: '05',
    title: 'Data Science & Machine Learning',
    deepLinkId: 'data-science',
    count: '6 Workshops',
  },
  {
    id: '06',
    title: 'Cybersecurity & Ethical Hacking',
    deepLinkId: 'cyber-security',
    count: '6 Workshops',
  },
  {
    id: '07',
    title: 'DevOps with AWS (AI & Automation Deployment)',
    deepLinkId: 'cloud-devops',
    count: '6 Workshops',
  },
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
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
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

      <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
        
        {/* LEFT COLUMN: COURSES */}
        <div className="flex flex-col w-full">
          {/* Eyebrow */}
          <div className="section-eyebrow">
            <span>Courses</span>
            <div></div>
          </div>
          
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl md:text-[3.2rem] font-extrabold text-csl-text section-heading tracking-tight mb-4 max-w-lg" data-distort="text">
            Learn What <br className="hidden sm:block" />
            Moves You <span className="text-csl-blue">forward.</span>
          </h2>

          <p className="text-csl-muted text-sm sm:text-base section-subheading mb-8 max-w-md">
            Industry-focused courses designed around practical skills, real projects, and technologies that actually get used.
          </p>

          {/* Mobile & Tablet Courses: Compact Course List */}
          <div className="lg:hidden flex flex-col gap-3 w-full mb-4">
            {coursesData.map((course) => (
              <a
                key={`mobile-${course.id}`}
                href={`/courses#${course.deepLinkId}`}
                onClick={(e) => handleNavigateToPath(e, `/courses#${course.deepLinkId}`)}
                className="group flex items-center justify-between p-3 sm:p-3.5 bg-white/95 rounded-2xl border border-csl-gold/30 hover:border-csl-blue/60 hover:bg-white shadow-xs hover:shadow-md transition-all duration-200 gap-3.5 sm:gap-4 cursor-pointer"
              >
                {/* LEFT: Small course thumbnail */}
                <div className="relative w-[78px] sm:w-[96px] h-[64px] sm:h-[76px] rounded-xl overflow-hidden shrink-0 bg-csl-bg border border-csl-gold/25">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>

                {/* CENTER: Course title + short existing description */}
                <div className="flex flex-col flex-1 min-w-0 pr-1">
                  <span className="text-[10px] font-mono font-extrabold text-csl-gold leading-none mb-1">
                    PROGRAM {course.id}
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-extrabold text-csl-text group-hover:text-csl-blue transition-colors leading-snug line-clamp-2 mb-0.5">
                    {course.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-csl-muted line-clamp-1 font-medium leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* RIGHT: Arrow icon */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-csl-gold/35 flex items-center justify-center text-csl-text group-hover:bg-csl-blue group-hover:text-white group-hover:border-csl-blue transition-all duration-200 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>

          {/* Desktop Courses List: Retained existing layout */}
          <div className="hidden lg:flex flex-col gap-6">
            {coursesData.map((course) => (
              <a
                key={course.id}
                href={`/courses#${course.deepLinkId}`}
                onClick={(e) => handleNavigateToPath(e, `/courses#${course.deepLinkId}`)}
                className="group flex flex-row items-center justify-between p-4 sm:p-5 border border-csl-gold/25 rounded-2xl bg-white/60 backdrop-blur-sm hover:border-csl-gold hover:bg-white/90 hover:shadow-lg transition-all duration-300 gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-6 flex-1">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-csl-gold/30">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      loading="lazy"
                      decoding="async"
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

                <div className="self-center w-8 h-8 rounded-full border border-csl-gold/40 flex items-center justify-center text-csl-text group-hover:bg-csl-blue group-hover:text-white group-hover:border-csl-blue transition-all duration-300 shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
          <div className="hidden lg:flex mt-8">
            <a
              href="/courses"
              onClick={(e) => handleNavigateToPath(e, '/courses')}
              className="inline-flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-8 py-3.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              Explore All Courses
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* MOBILE: COURSE + WORKSHOP BUTTONS */}
        <div className="flex lg:hidden flex-col w-full gap-3">
          <a
            href="/courses"
            onClick={(e) => handleNavigateToPath(e, '/courses')}
            className="w-full inline-flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-8 py-3.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
          >
            Explore All Courses
            <ArrowRight className="w-4 h-4" />
          </a>

          
        </div>

        {/* RIGHT COLUMN: WORKSHOPS & EMERGING TECH */}
        <div className="flex flex-col w-full">
          {/* Eyebrow */}
          <div className="section-eyebrow">
            <span>Workshops & Emerging Tech</span>
            <div></div>
          </div>
          
          {/* Subheading */}
          <h3 className="text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-csl-text section-heading tracking-tight mb-6 sm:mb-8" data-distort="text">
            Hands-On Workshops in <br />
            High-Demand Domains
          </h3>

          {/* Workshop Items List: Top 6 Trending Domains */}
          <div className="flex flex-col gap-3 w-full mb-8">
            {trendingWorkshopsData.map((workshop) => (
              <a 
                key={workshop.id} 
                href="/workshops"
                onClick={(e) => handleNavigateToPath(e, '/workshops')}
                className="group relative flex flex-col p-3.5 sm:p-4 bg-white/75 backdrop-blur-sm border border-csl-gold/25 rounded-2xl hover:border-csl-gold/60 hover:bg-white/95 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-csl-gold/15 text-csl-text font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-csl-gold/30">
                      {workshop.id}
                    </span>
                    <h4 className="text-sm sm:text-[15px] font-bold text-csl-text group-hover:text-csl-blue transition-colors leading-snug">
                      {workshop.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30">
                      <Flame className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                      TRENDING
                    </span>
                    <ChevronRight className="w-4 h-4 text-csl-muted group-hover:text-csl-blue group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-csl-gold/15 text-xs">
                  <span className="font-bold text-csl-blue text-[11px]">
                    {workshop.count}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-csl-muted">
                    <span className="text-emerald-700 font-bold">BASIC</span>
                    <span>•</span>
                    <span className="text-blue-700 font-bold">INTERMEDIATE</span>
                    <span>•</span>
                    <span className="text-purple-700 font-bold">ADVANCED</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Desktop CTA (Explore Workshops) */}
          <div className="hidden lg:flex">
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
          <div className="flex lg:hidden w-full flex-col gap-3">
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
