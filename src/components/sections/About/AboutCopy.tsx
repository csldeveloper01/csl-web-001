import { ArrowRight, BookOpen, Code, FileCode2 } from 'lucide-react';

export function AboutCopy() {
  return (
    <div className="flex flex-col">
      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
          Who We Are
        </span>
        <div className="h-[1px] w-12 bg-csl-gold/50"></div>
      </div>

      {/* Heading */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-csl-text leading-[1.1] tracking-tight mb-8">
        About <br />
        <span className="text-csl-gold">Creator Space Lab</span>
      </h2>

      {/* Paragraph */}
      <p className="text-base text-csl-muted leading-relaxed mb-10 max-w-lg">
        We are a modern EdTech & Software Solutions company dedicated to transforming careers and accelerating business innovation. Through hands-on training, real-world project experience, and end-to-end software development services, we empower learners and organizations to grow with confidence in a rapidly evolving digital world.
      </p>

      {/* Capabilities List */}
      <div className="flex flex-col gap-6 mb-12">
        
        <div className="flex items-center gap-6 group cursor-default">
          <div className="w-12 h-12 flex items-center justify-center border border-csl-gold/30 text-csl-gold rounded-lg group-hover:scale-105 transition-transform bg-white/50">
            <BookOpen className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <span className="text-csl-text font-bold text-sm tracking-wide">
            EdTech Learning Programs
          </span>
          <div className="flex-1 h-[1px] bg-csl-gold/20 mr-8"></div>
        </div>

        <div className="flex items-center gap-6 group cursor-default">
          <div className="w-12 h-12 flex items-center justify-center border border-csl-gold/30 text-csl-gold rounded-lg group-hover:scale-105 transition-transform bg-white/50">
            <Code className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <span className="text-csl-text font-bold text-sm tracking-wide">
            Software Development Services
          </span>
          <div className="flex-1 h-[1px] bg-csl-gold/20 mr-8"></div>
        </div>

        <div className="flex items-center gap-6 group cursor-default">
          <div className="w-12 h-12 flex items-center justify-center border border-csl-gold/30 text-csl-gold rounded-lg group-hover:scale-105 transition-transform bg-white/50">
            <FileCode2 className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <span className="text-csl-text font-bold text-sm tracking-wide">
            Project-Based Learning
          </span>
          <div className="flex-1 h-[1px] bg-csl-gold/20 mr-8"></div>
        </div>

      </div>

      {/* CTA */}
      <div>
        <a 
          href="/about" 
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/about');
            window.dispatchEvent(new PopStateEvent('popstate'));
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="inline-flex items-center justify-center gap-2 bg-csl-gold text-csl-text px-8 py-3.5 rounded-lg font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
        >
          Discover CSL
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
