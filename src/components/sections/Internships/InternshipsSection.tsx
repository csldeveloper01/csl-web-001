import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Cloud, PenTool, Database } from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

// @ts-expect-error
import internshipsIllustration from '../../../../Elements/INTERNSHIPS/INTERNSHIPS.png';

const internshipTracks = [
  {
    icon: BarChart3,
    title: 'Data Science & Analytics',
  },
  {
    icon: Cloud,
    title: 'Full-Stack Cloud Development',
  },
  {
    icon: PenTool,
    title: 'UI/UX & Frontend Engineering',
  },
  {
    icon: Database,
    title: 'Cloud Data Engineering',
  },
];

export function InternshipsSection() {
  const yellowBlocks = [
    { size: 'w-14 h-14', pos: 'top-[12%] left-[48%]', delay: 0.3, duration: 7 },
    { size: 'w-8 h-8', pos: 'top-[22%] left-[6%]', delay: 1.1, duration: 6 },
    { size: 'w-16 h-16', pos: 'bottom-[10%] left-[4%]', delay: 0.8, duration: 8 },
    { size: 'w-10 h-10', pos: 'bottom-[15%] right-[44%]', delay: 2.0, duration: 7.5 },
    { size: 'w-20 h-20', pos: 'top-[18%] right-[8%]', delay: 1.4, duration: 9 },
    { size: 'w-12 h-12', pos: 'bottom-[14%] right-[8%]', delay: 0.5, duration: 6.5 },
  ];

  return (
    <section 
      className="relative w-full py-10 md:py-16 flex items-center justify-center bg-csl-bg overflow-hidden mx-auto"
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: TRACK OFFERINGS & CTA */}
        <div className="flex flex-col w-full max-w-xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
              Internships
            </span>
            <div className="h-[2px] w-8 bg-csl-gold/60"></div>
          </div>
          
          {/* Header */}
          <h2 
            className="text-3xl sm:text-4xl md:text-[3.1rem] font-extrabold text-csl-text leading-[1.08] tracking-tight mb-4" 
            data-distort="text"
          >
            Build beyond <br />
            the <span className="text-csl-blue">classroom.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-csl-muted font-medium text-sm md:text-base mb-6 lg:mb-9 leading-relaxed max-w-lg">
            Work on real-world problems, build with modern technologies, and turn your skills into experience.
          </p>

          {/* MOBILE ONLY: 3D Artwork Image directly after Title & Description */}
          <div className="w-full flex lg:hidden items-center justify-center relative mb-8">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] flex items-center justify-center">
              <img 
                src={internshipsIllustration} 
                alt="Internships 3D Workspace" 
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,30,80,0.12)]"
              />
            </div>
          </div>

          {/* Internship Tracks List without week duration */}
          <div className="flex flex-col gap-3.5 w-full mb-8 lg:mb-9">
            {internshipTracks.map((track, idx) => {
              const IconComponent = track.icon;
              return (
                <a
                  key={idx}
                  href="#internships"
                  className="group flex items-center justify-between px-5 sm:px-6 py-4 bg-white/70 backdrop-blur-sm border border-csl-gold/25 rounded-2xl hover:border-csl-gold/60 hover:bg-white/95 hover:shadow-lg hover:shadow-csl-gold/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 rounded-xl bg-csl-blue/[0.06] border border-csl-blue/15 flex items-center justify-center text-csl-blue group-hover:scale-105 group-hover:bg-csl-blue group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="text-sm sm:text-[15px] font-bold text-csl-text group-hover:text-csl-blue transition-colors">
                      {track.title}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-csl-blue group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div>
            <a 
              href="/internships" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/internships');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-csl-blue/25 active:scale-95 shadow-sm"
            >
              Explore Internships
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* DESKTOP ONLY: RIGHT COLUMN 3D ISOMETRIC ARTWORK */}
        <div className="hidden lg:flex w-full items-center justify-center relative mt-6 lg:mt-0">
          <motion.div
            className="relative w-full max-w-[620px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -12, 0]
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Ambient gold voxel glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/15 via-transparent to-csl-blue/10 blur-3xl -z-10 rounded-full scale-90 pointer-events-none"></div>

            {/* Drifting decorative voxel particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2.5 h-2.5 bg-csl-gold/50 border border-csl-gold/70 backdrop-blur-sm"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, (i % 2 === 0 ? 10 : -10), 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{
                    duration: 3.5 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}
                  style={{
                    left: `${20 + (i * 12)}%`,
                    top: `${15 + ((i * 14) % 70)}%`
                  }}
                />
              ))}
            </div>

            {/* Main 3D Artwork Image */}
            <img 
              src={internshipsIllustration} 
              alt="Internships 3D Workspace" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,30,80,0.12)]"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
