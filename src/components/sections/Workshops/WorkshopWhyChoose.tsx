import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Code2, 
  TrendingUp, 
  Award, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { WHY_CHOOSE_WORKSHOPS } from './workshopsData';

const WHY_CHOOSE_ICONS = [Zap, Code2, TrendingUp, Award, Building2];

export function WorkshopWhyChoose() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="why-choose" className="relative w-full py-16 md:py-24 section-container">
      
      {/* Section Header */}
      <div className="mb-12">
        <div className="section-eyebrow">
          <span>VALUE PROPOSITION</span>
          <div></div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
          Why Choose <span className="text-csl-blue">CSL Workshops?</span>
        </h2>
        <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
          Engineered to replace passive theory with rigorous, mentor-guided project implementation that translates directly to placements and industry capability.
        </p>
      </div>

      {/* 5 Vertical Timeline Items */}
      <div className="flex flex-col gap-4 w-full">
        {WHY_CHOOSE_WORKSHOPS.map((item, idx) => {
          const ItemIcon = WHY_CHOOSE_ICONS[idx] || Zap;
          const isActive = activeIndex === idx;

          return (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer border ${
                isActive 
                  ? 'bg-white/95 border-csl-gold/70 shadow-lg shadow-csl-gold/10' 
                  : 'bg-white/60 border-csl-gold/25 hover:bg-white/80'
              }`}
            >
              {/* Left Golden Accent Line */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-gradient-to-b from-csl-gold to-csl-blue transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`} 
              />

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

              {/* Right Chevron indicator */}
              <div className="hidden md:flex items-center text-csl-gold">
                <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'translate-x-1 text-csl-blue' : 'text-csl-gold/40'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
