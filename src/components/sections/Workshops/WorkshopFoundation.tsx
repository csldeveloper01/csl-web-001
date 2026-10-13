import { motion } from 'framer-motion';
import { Database, Binary, GitFork, Sparkles, CheckCircle2, Clock, MessageCircle } from 'lucide-react';
import { FOUNDATION_WORKSHOPS } from './workshopsData';

interface WorkshopFoundationProps {
  onNavigateToContact: () => void;
}

const FOUNDATION_ICONS = [Database, Binary, GitFork];

export function WorkshopFoundation({ onNavigateToContact }: WorkshopFoundationProps) {
  const getWhatsAppLink = (title: string) => {
    const text = `Hi Creator Space Lab! I would like to enquire about the "${title}" Common Foundation Workshop. Please share schedule and delivery options.`;
    return `https://wa.me/919940166299?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="foundation" className="relative w-full py-16 md:py-24 bg-white/60 border-b border-csl-gold/20">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="mb-14 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <span>CROSS-DOMAIN EXCELLENCE</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
            Common Foundation <span className="text-csl-blue">Modules</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-2xl section-subheading">
            Universal core engineering competencies built to support every career track. Whether entering AI, Cloud, Mobile, or Blockchain, these three modules power lasting technical success.
          </p>
        </div>

        {/* 3 Foundation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FOUNDATION_WORKSHOPS.map((module, idx) => {
            const Icon = FOUNDATION_ICONS[idx] || Database;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl p-7 border border-csl-gold/30 hover:border-csl-gold/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-extrabold text-csl-gold tracking-widest">
                      FOUNDATION 0{module.number}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/25">
                      Universal Core
                    </span>
                  </div>

                  {/* Icon Box & Title */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-csl-blue/15 to-csl-gold/15 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-csl-blue group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-extrabold text-csl-text group-hover:text-csl-blue transition-colors mb-2 leading-tight">
                    {module.title}
                  </h3>

                  <p className="text-xs font-semibold text-csl-gold/90 mb-3 italic">
                    "{module.tagline}"
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-csl-muted font-medium mb-4">
                    <Clock className="w-3.5 h-3.5 text-csl-gold" />
                    <span>{module.duration}</span>
                  </div>

                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-5">
                    {module.description}
                  </p>

                  {/* Key Topics */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono font-bold text-csl-muted uppercase block">
                      Curriculum Pillars:
                    </span>
                    {module.keyTopics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-csl-text font-medium leading-snug">{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hands-On Outcome */}
                  <div className="bg-gradient-to-r from-csl-gold/10 via-csl-gold/5 to-csl-blue/10 border border-csl-gold/30 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-csl-gold mb-1">
                      <Sparkles className="w-3 h-3 text-csl-gold" />
                      <span>HANDS-ON OUTCOME:</span>
                    </div>
                    <p className="text-xs font-bold text-csl-text leading-snug">
                      {module.handsOnOutcome}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-csl-gold/15 flex items-center justify-between gap-3">
                  <button
                    onClick={onNavigateToContact}
                    className="text-xs font-bold text-csl-muted hover:text-csl-blue transition-colors cursor-pointer"
                  >
                    Host on Campus
                  </button>

                  <a
                    href={getWhatsAppLink(module.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-csl-blue text-white text-xs font-bold shadow-xs hover:bg-csl-deep-blue hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
