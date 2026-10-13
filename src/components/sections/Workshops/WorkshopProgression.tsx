import { motion } from 'framer-motion';
import { Compass, BookOpen, Code2, Cpu, Rocket } from 'lucide-react';
import { WORKSHOP_PROGRESSION } from './workshopsData';

const STAGE_ICONS = [Compass, BookOpen, Code2, Cpu, Rocket];

export function WorkshopProgression() {
  return (
    <section id="progression" className="relative w-full py-16 md:py-24 bg-white/50 border-y border-csl-gold/20">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="mb-14 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <span>LEARNING METHODOLOGY</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
            Workshop <span className="text-csl-blue">Progression Pipeline</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-2xl section-subheading">
            Every Creator Space Lab workshop follows a battle-tested 5-stage progression designed to take participants from initial discovery to production-ready project delivery.
          </p>
        </div>

        {/* 5-Stage Pipeline Desktop / Tablet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full relative">
          {WORKSHOP_PROGRESSION.map((step, idx) => {
            const Icon = STAGE_ICONS[idx] || Code2;
            return (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group relative bg-white/95 backdrop-blur-md border border-csl-gold/30 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-csl-gold/80 transition-all duration-300"
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-extrabold text-csl-gold tracking-wider">
                      STAGE {step.stage}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-csl-blue/10 text-csl-blue border border-csl-blue/20">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-csl-blue/15 to-csl-gold/15 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-csl-blue group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 transition-colors" />
                  </div>

                  {/* Stage Name */}
                  <h3 className="text-base font-black text-csl-text tracking-wide font-mono uppercase mb-1 group-hover:text-csl-blue transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-xs font-semibold text-csl-gold/90 mb-3">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-csl-muted font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Subtle indicator bar */}
                <div className="mt-5 w-full h-1 bg-csl-gold/15 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-csl-gold to-csl-blue transition-all duration-500 group-hover:w-full"
                    style={{ width: `${(idx + 1) * 20}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
