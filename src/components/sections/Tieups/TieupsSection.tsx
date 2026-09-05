import { motion } from 'framer-motion';
import { YellowBox } from '../../effects/YellowBox';

// @ts-expect-error
import logoAccenture from '../../../../Elements/TIE-UPS/accenture.png';
// @ts-expect-error
import logoTata from '../../../../Elements/TIE-UPS/tata electic.png';
// @ts-expect-error
import logoHcl from '../../../../Elements/TIE-UPS/hcl.png';
// @ts-expect-error
import logoWipro from '../../../../Elements/TIE-UPS/wipro.png';
// @ts-expect-error
import logoCapgemini from '../../../../Elements/TIE-UPS/capgemini.png';
// @ts-expect-error
import logoDbs from '../../../../Elements/TIE-UPS/dbs.png';
// @ts-expect-error
import logoPhonepe from '../../../../Elements/TIE-UPS/phonepe.png';
// @ts-expect-error
import logoIdbi from '../../../../Elements/TIE-UPS/idbi.png';
// @ts-expect-error
import logoTcs from '../../../../Elements/TIE-UPS/tcs.png';

const row1Logos = [
  { name: 'Accenture', logo: logoAccenture },
  { name: 'Tata', logo: logoTata },
  { name: 'HCLTech', logo: logoHcl },
  { name: 'TCS', logo: logoTcs },
  { name: 'Wipro', logo: logoWipro },
  { name: 'Capgemini', logo: logoCapgemini },
];

const row2Logos = [
  { name: 'DBS Bank', logo: logoDbs },
  { name: 'PhonePe', logo: logoPhonepe },
  { name: 'IDBI Bank', logo: logoIdbi },
  { name: 'Wipro', logo: logoWipro },
  { name: 'TCS', logo: logoTcs },
  { name: 'Accenture', logo: logoAccenture },
];

export function TieupsSection() {
  const yellowBlocks = [
    { size: 'w-14 h-14', pos: 'top-[12%] right-[14%]', delay: 0.5, duration: 7.5 },
    { size: 'w-8 h-8', pos: 'top-[25%] right-[28%]', delay: 1.2, duration: 6 },
    { size: 'w-10 h-10', pos: 'bottom-[18%] left-[6%]', delay: 0.8, duration: 7 },
    { size: 'w-16 h-16', pos: 'bottom-[10%] right-[8%]', delay: 1.8, duration: 8.5 },
  ];

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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-start transform scale-[0.88] origin-center">
        
        {/* Header */}
        <div className="mb-10 w-full">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
              Tie-ups
            </span>
            <div className="h-[2px] w-8 bg-csl-gold/60"></div>
          </div>
          <h2 
            className="text-4xl md:text-[3.2rem] font-extrabold text-csl-text tracking-tight leading-[1.12]" 
            data-distort="text"
          >
            Trusted by Global <br />
            Enterprises & <span className="text-csl-blue">125+ Startups</span>
          </h2>
        </div>

        {/* Infinite Looping Logo Marquee Container (Ultra Smooth & Slow in Full Color) */}
        <div className="relative w-full overflow-hidden flex flex-col gap-4 md:gap-5 py-3 group mb-10">
          
          {/* Side Edge Fade Gradients for Seamless Depth */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-csl-bg via-csl-bg/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-csl-bg via-csl-bg/80 to-transparent z-20 pointer-events-none"></div>

          {/* Row 1: Scrolling Left (Ultra-smooth 75s duration) */}
          <div className="flex overflow-hidden select-none">
            <motion.div 
              className="flex gap-4 md:gap-5 shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 75,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos].map((item, idx) => (
                <div
                  key={idx}
                  className="w-44 sm:w-52 h-24 md:h-28 bg-white/80 backdrop-blur-sm border border-csl-gold/25 rounded-2xl px-6 py-4 flex items-center justify-center hover:border-csl-gold/60 hover:bg-white hover:shadow-lg hover:shadow-csl-gold/15 transition-all duration-300 shrink-0 cursor-pointer group/card"
                >
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    className="max-h-11 md:max-h-12 w-auto max-w-[85%] object-contain opacity-95 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-300" 
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Scrolling Right (Ultra-smooth 80s duration) */}
          <div className="flex overflow-hidden select-none">
            <motion.div 
              className="flex gap-4 md:gap-5 shrink-0"
              animate={{ x: ['-50%', '0%'] }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos].map((item, idx) => (
                <div
                  key={idx}
                  className="w-44 sm:w-52 h-24 md:h-28 bg-white/80 backdrop-blur-sm border border-csl-gold/25 rounded-2xl px-6 py-4 flex items-center justify-center hover:border-csl-gold/60 hover:bg-white hover:shadow-lg hover:shadow-csl-gold/15 transition-all duration-300 shrink-0 cursor-pointer group/card"
                >
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    className="max-h-11 md:max-h-12 w-auto max-w-[85%] object-contain opacity-95 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-300" 
                  />
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Partnership Description */}
        <div className="w-full max-w-5xl mt-2">
          <p className="text-csl-muted font-medium text-sm md:text-[15px] leading-relaxed md:leading-loose">
            We build meaningful partnerships with leading enterprises, institutions, and emerging startups to bridge the gap between learning and the real world. Through these collaborations, we create opportunities for students and aspiring professionals to gain industry exposure, participate in practical projects, access mentorship, and understand evolving technology landscapes. Our growing network of 125+ startups and industry connections strengthens our ability to bring relevant knowledge, innovative ideas, and career opportunities closer to learners. Together with our partners, we aim to create an ecosystem where education, technology, and industry come together to inspire innovation, develop talent, and shape future-ready professionals.
          </p>
        </div>

      </div>
    </section>
  );
}
