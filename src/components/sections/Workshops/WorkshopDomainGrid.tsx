import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  BarChart3, 
  Cloud, 
  ShieldCheck, 
  Gamepad2, 
  Smartphone, 
  Palette, 
  Link2, 
  Radio, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { WORKSHOP_DOMAINS } from './workshopsData';

interface WorkshopDomainGridProps {
  onSelectDomain: (domainId: string) => void;
  selectedDomainId: string;
  highlightedId?: string | null;
}

export const DOMAIN_ICONS: Record<string, any> = {
  Cpu,
  Layers,
  'full-stack-java': Layers,
  'full-stack-python': Layers,
  BarChart3,
  Cloud,
  ShieldCheck,
  Gamepad2,
  Smartphone,
  Palette,
  Link2,
  Radio,
  CheckCircle2,
};

export function WorkshopDomainGrid({ onSelectDomain, selectedDomainId, highlightedId }: WorkshopDomainGridProps) {
  const trendingDomains = WORKSHOP_DOMAINS.filter((d) => d.trending);
  const otherDomains = WORKSHOP_DOMAINS.filter((d) => !d.trending);

  const isDomainHighlighted = (id: string) => {
    if (!highlightedId) return false;
    if (highlightedId === id || highlightedId === `domain-${id}`) return true;
    if (id === 'cloud-devops' && highlightedId === 'cloud-aws') return true;
    if (id === 'cyber-security' && highlightedId === 'cybersecurity') return true;
    return false;
  };

  const handleDomainClick = (domainId: string) => {
    onSelectDomain(domainId);
    const explorerEl = document.getElementById('workshop-explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="domains" className="relative w-full py-16 md:py-24 section-container">
      
      {/* ==================================================
          SECTION HEADER
         ================================================== */}
      <div className="mb-14 text-center flex flex-col items-center">
        <div className="section-eyebrow justify-center">
          <span>CURRICULUM DIRECTORY</span>
          <div></div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
          Industry <span className="text-csl-blue">Specialization Domains</span>
        </h2>
        <p className="text-csl-muted font-medium text-sm md:text-base max-w-2xl section-subheading">
          Explore our complete catalog of {WORKSHOP_DOMAINS.length * 6} hands-on workshops across {WORKSHOP_DOMAINS.length} high-growth technology domains, designed for collegiate symposiums, faculty development, and student career acceleration.
        </p>
      </div>

      {/* ==================================================
          PART 1: FEATURED / TRENDING DOMAINS (TOP 6)
         ================================================== */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            Top 6 High-Demand Tracks
          </div>
          <span className="text-xs text-csl-muted font-medium hidden sm:inline">
            Most requested by universities & student placement cells
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingDomains.map((domain, idx) => {
            const Icon = DOMAIN_ICONS[domain.iconName] || Cpu;
            const isSelected = selectedDomainId === domain.id;
            const isHighlighted = isDomainHighlighted(domain.id);

            return (
              <motion.div
                key={domain.id}
                id={domain.id}
                data-deep-link-id={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onClick={() => handleDomainClick(domain.id)}
                className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isHighlighted
                    ? 'bg-white border-2 border-csl-gold ring-4 ring-csl-gold/50 shadow-2xl scale-[1.03] z-20 animate-pulse'
                    : isSelected
                    ? 'bg-white border-csl-gold ring-2 ring-csl-gold/40 shadow-xl'
                    : 'bg-white/90 backdrop-blur-md border-csl-gold/30 hover:border-csl-gold/80 hover:shadow-xl hover:bg-white'
                }`}
              >
                {/* Top Row: Domain Number + Trending Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono font-extrabold text-csl-gold tracking-widest">
                      TRACK 0{domain.domainNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-700">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Trending
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center shrink-0 group-hover:bg-csl-blue group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-csl-text group-hover:text-csl-blue transition-colors leading-snug">
                        {domain.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-csl-muted line-clamp-1">
                        {domain.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-csl-muted font-medium leading-relaxed mb-4">
                    {domain.description}
                  </p>

                  {/* Levels preview pills */}
                  <div className="space-y-1.5 pt-3 border-t border-csl-gold/15 mb-4 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] shrink-0">BASIC</span>
                      <span className="text-csl-muted truncate">{domain.levelsSummary.basic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded text-[10px] shrink-0">INTERMEDIATE</span>
                      <span className="text-csl-muted truncate">{domain.levelsSummary.intermediate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-purple-600 bg-purple-500/10 px-1.5 py-0.5 rounded text-[10px] shrink-0">ADVANCED</span>
                      <span className="text-csl-muted truncate">{domain.levelsSummary.advanced}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-csl-gold/15 flex items-center justify-between text-xs font-bold text-csl-blue group-hover:text-csl-deep-blue">
                  <span className="font-mono text-csl-muted group-hover:text-csl-text transition-colors">
                    6 Specialized Workshops
                  </span>
                  <div className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Workshops</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ==================================================
          PART 2: ADDITIONAL SPECIALIZED DOMAINS (7-11)
         ================================================== */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-csl-text flex items-center gap-2">
            <span>Additional Specialized Domains</span>
            <span className="text-xs font-normal text-csl-muted">
              (Core Engineering & High-Precision Tracks)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {otherDomains.map((domain, idx) => {
            const Icon = DOMAIN_ICONS[domain.iconName] || Cpu;
            const isSelected = selectedDomainId === domain.id;

            const isHighlighted = isDomainHighlighted(domain.id);

            return (
              <motion.div
                key={domain.id}
                id={domain.id}
                data-deep-link-id={domain.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onClick={() => handleDomainClick(domain.id)}
                className={`group rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isHighlighted
                    ? 'bg-white border-2 border-csl-gold ring-4 ring-csl-gold/50 shadow-2xl scale-[1.03] z-20 animate-pulse'
                    : isSelected
                    ? 'bg-white border-csl-gold ring-2 ring-csl-gold/40 shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm border-csl-gold/25 hover:border-csl-gold/70 hover:shadow-md hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-csl-gold">
                      TRACK {domain.domainNumber < 10 ? `0${domain.domainNumber}` : domain.domainNumber}
                    </span>
                    <span className="text-[10px] font-medium text-csl-muted">
                      6 Modules
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-csl-blue/10 border border-csl-blue/20 text-csl-blue flex items-center justify-center mb-3 group-hover:bg-csl-blue group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-sm font-extrabold text-csl-text group-hover:text-csl-blue transition-colors mb-1.5 leading-snug">
                    {domain.title}
                  </h4>

                  <p className="text-[11px] text-csl-muted line-clamp-2 leading-relaxed mb-4">
                    {domain.tagline}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-csl-blue group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
