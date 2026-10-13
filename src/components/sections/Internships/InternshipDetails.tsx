import { motion } from 'framer-motion';
import { Clock, Globe2, GraduationCap, CheckCircle2 } from 'lucide-react';

export function InternshipDetails() {
  const details = [
    {
      icon: Clock,
      title: 'Internship Programs',
      subtitle: 'Hands-on project durations',
      badge: 'Duration',
      items: [
        { label: '15 Days Internship', desc: 'Accelerated intensive project curriculum' },
        { label: '30 Days Internship', desc: 'Comprehensive end-to-end practical training' },
      ],
    },
    {
      icon: Globe2,
      title: 'Internship Mode',
      subtitle: 'Flexible delivery formats',
      badge: 'Learning Mode',
      items: [
        { label: 'Online Mode', desc: 'Live interactive mentor-led sessions with remote lab access' },
        { label: 'Offline Mode', desc: 'In-person practical training at Creator Space Lab facility' },
        { label: 'Hybrid Mode', desc: 'Flexible blend of in-person lab training and remote guidance' },
      ],
    },
    {
      icon: GraduationCap,
      title: 'Eligibility Criteria',
      subtitle: 'Open for students & graduates',
      badge: 'Who Can Apply',
      items: [
        { label: 'B.E / B.Tech', desc: 'Engineering & technology disciplines' },
        { label: 'B.Sc IT, CS, AI & DS', desc: 'Undergraduate science & tech tracks' },
        { label: 'BCA / BA / B.Com', desc: 'Computer applications & commerce graduates' },
        { label: 'MBA / MCA', desc: 'Postgraduate management & computer disciplines' },
        { label: 'Computer Science / IT / Related Fields', desc: 'Engineering & diploma streams' },
      ],
    },
  ];

  return (
    <section 
      id="details" 
      className="relative w-full py-16 md:py-24 bg-white/50 border-t border-csl-gold/20"
      aria-label="Internship Details and Eligibility"
    >
      <div className="section-container">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <span>Program Specifications</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
            Internship <span className="text-csl-blue">Details</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading mx-auto">
            Clear guidelines on program durations, delivery modes, and academic eligibility requirements.
          </p>
        </div>

        {/* 3 Detail Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {details.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white/85 backdrop-blur-sm border border-csl-gold/30 rounded-3xl p-6 shadow-sm hover:border-csl-gold/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-csl-blue/10 border border-csl-blue/20 flex items-center justify-center text-csl-blue group-hover:bg-csl-blue group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-csl-gold/15 border border-csl-gold/30 text-csl-text font-bold text-xs font-mono">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-csl-text mb-1 tracking-tight group-hover:text-csl-blue transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-csl-muted font-medium mb-5">
                    {card.subtitle}
                  </p>

                  {/* Detail Items List */}
                  <div className="flex flex-col gap-3 pt-2 border-t border-csl-gold/15">
                    {card.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-csl-gold shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-csl-text leading-snug">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-csl-muted font-medium leading-snug mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
