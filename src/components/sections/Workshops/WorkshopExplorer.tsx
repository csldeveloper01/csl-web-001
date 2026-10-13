import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  X, 
  MessageCircle, 
  BookOpen, 
  ChevronRight,
  Layers,
  Cpu,
  BarChart3,
  Database,
  ShieldCheck,
  Cloud,
  Smartphone,
  Briefcase,
  Workflow,
  Palette,
  ChevronDown,
  Filter
} from 'lucide-react';
import { 
  WORKSHOP_DOMAINS,
  ALL_WORKSHOPS, 
  FOUNDATION_WORKSHOPS,
  WorkshopDomain,
  WorkshopItem, 
  WorkshopLevel
} from './workshopsData';
import { CustomDropdown, DropdownOption } from '../../ui/CustomDropdown';

interface WorkshopExplorerProps {
  selectedDomainId: string;
  onSelectDomain: (domainId: string) => void;
  onNavigateToContact: () => void;
}

const DOMAIN_OPTIONS: DropdownOption[] = [
  { value: 'all', label: `All ${WORKSHOP_DOMAINS.length} Domains` },
  { value: 'ai-ml', label: '01. AI/ML with Automation' },
  { value: 'full-stack-java', label: '02. Full Stack Development with AI & Automation — Java' },
  { value: 'full-stack-python', label: '03. Full Stack Development with AI & Automation — Python' },
  { value: 'data-analyst', label: '04. Data Analyst with AI & Automation' },
  { value: 'data-science', label: '05. Data Science & Machine Learning' },
  { value: 'cyber-security', label: '06. Cybersecurity & Ethical Hacking' },
  { value: 'cloud-devops', label: '07. DevOps with AWS' },
  { value: 'mobile-dev', label: '08. Full Stack + Mobile Development' },
  { value: 'software-testing', label: '09. Software Testing with Automation' },
  { value: 'business-analyst', label: '10. Business Analyst' },
  { value: 'crm-cloud', label: '11. ServiceNow, Salesforce & CRM' },
  { value: 'ui-ux', label: '12. UI/UX Design' },
];

const LEVEL_OPTIONS: DropdownOption[] = [
  { value: 'All', label: 'All Levels (Basic, Int, Adv)' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

const DOMAIN_ICONS: Record<string, any> = {
  'ai-ml': Cpu,
  'full-stack-java': Layers,
  'full-stack-python': Layers,
  'data-analyst': BarChart3,
  'data-science': Database,
  'cyber-security': ShieldCheck,
  'cloud-devops': Cloud,
  'mobile-dev': Smartphone,
  'software-testing': CheckCircle2,
  'business-analyst': Briefcase,
  'crm-cloud': Workflow,
  'ui-ux': Palette,
};

// Plain-English beginner-friendly summaries for each domain
const DOMAIN_PLAIN_DESCRIPTIONS: Record<string, string> = {
  'ai-ml': 'Learn how AI helps computers understand information, recognize patterns, and make intelligent decisions.',
  'full-stack-java': 'Learn enterprise web application development with React, Java, Spring Boot REST APIs, and AI integrations.',
  'full-stack-python': 'Learn modern web application development with React, Python, Flask/FastAPI REST APIs, and AI integrations.',
  'data-analyst': 'Learn how businesses use data to understand what is happening and make better decisions.',
  'data-science': 'Learn how to analyze complex data, discover hidden trends, and build automated prediction models.',
  'cyber-security': 'Learn how digital systems are protected from threats, attacks, and unauthorized access.',
  'cloud-devops': 'Learn how applications are deployed, managed, and kept running reliably in the cloud.',
  'mobile-dev': 'Learn how mobile apps are designed, coded, and published for iOS and Android smartphones.',
  'software-testing': 'Learn how software is tested for bugs, speed, and reliability using automated testing tools.',
  'business-analyst': 'Learn how to translate business needs into practical software requirements and workflows.',
  'crm-cloud': 'Learn how companies manage client relationships and streamline business processes on Salesforce and ServiceNow.',
  'ui-ux': 'Learn how to design websites and apps that are easy, clear, and enjoyable to use.',
};

export function WorkshopExplorer({
  selectedDomainId,
  onSelectDomain,
  onNavigateToContact,
}: WorkshopExplorerProps) {
  const [selectedLevel, setSelectedLevel] = useState<WorkshopLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalWorkshop, setActiveModalWorkshop] = useState<WorkshopItem | null>(null);
  const [expandedWorkshopId, setExpandedWorkshopId] = useState<string | null>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const tagButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeBtn = tagButtonRefs.current[selectedDomainId];
    const container = tagsContainerRef.current;
    if (activeBtn && container) {
      const containerWidth = container.clientWidth;
      const targetScrollLeft = activeBtn.offsetLeft + activeBtn.offsetWidth / 2 - containerWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [selectedDomainId]);

  const handleToggleExpandCard = (domainId: string) => {
    setExpandedWorkshopId((prev) => (prev === domainId ? null : domainId));
  };

  // Domains to display based on domain filter
  const displayedDomains = useMemo(() => {
    if (selectedDomainId !== 'all') {
      return WORKSHOP_DOMAINS.filter((d) => d.id === selectedDomainId);
    }
    return WORKSHOP_DOMAINS;
  }, [selectedDomainId]);

  // Filter workshops based on Domain, Level, and Search Query
  const filteredWorkshops = useMemo(() => {
    return ALL_WORKSHOPS.filter((item) => {
      // Domain filter
      if (selectedDomainId !== 'all' && item.domainId !== selectedDomainId) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'All' && item.level !== selectedLevel) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDomain = item.domainTitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTopics = item.keyTopics.some((t) => t.toLowerCase().includes(query));
        const matchesProject = item.projectOutcome.toLowerCase().includes(query);
        return matchesTitle || matchesDomain || matchesDesc || matchesTopics || matchesProject;
      }

      return true;
    });
  }, [selectedDomainId, selectedLevel, searchQuery]);

  // WhatsApp quick enquiry link generator
  const getWhatsAppLink = (workshop: WorkshopItem) => {
    const text = `Hi Creator Space Lab! I would like to enquire about the "${workshop.title}" workshop (${workshop.domainTitle} - ${workshop.level} Level). Could you share the schedule, curriculum details, and college booking options?`;
    return `https://wa.me/919940166299?text=${encodeURIComponent(text)}`;
  };

  const getLevelBadgeClass = (level: WorkshopLevel) => {
    switch (level) {
      case 'Basic':
        return 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-800 border-blue-500/30';
      case 'Advanced':
        return 'bg-purple-500/10 text-purple-800 border-purple-500/30';
    }
  };

  return (
    <section id="workshop-explorer" className="relative w-full py-14 md:py-20 bg-[#FAF7F3] border-y border-csl-gold/25">
      <div className="section-container">
        
        {/* ==================================================
            1. SECTION HEADER
           ================================================== */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <span>CURRICULUM DIRECTORY</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
            Explore <span className="text-csl-blue">Workshops</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading">
            Browse our {WORKSHOP_DOMAINS.length} industry specialization domains. Select any domain to inspect its 6 hands-on workshops structured from Basic to Advanced.
          </p>
        </div>

        {/* ==================================================
            2. PROGRESSION MINI-BANNER (Clear 3-Tier Treatment)
           ================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:px-6 bg-white/95 border border-csl-gold/30 rounded-2xl mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-csl-text">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-800 border border-emerald-500/30">
              BASIC
            </span>
            <span className="text-csl-gold font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-800 border border-blue-500/30">
              INTERMEDIATE
            </span>
            <span className="text-csl-gold font-bold">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-800 border border-purple-500/30">
              ADVANCED
            </span>
          </div>
          <span className="text-xs text-csl-muted font-semibold text-center sm:text-right">
            Progress from core fundamentals to production AI/cloud capstones.
          </span>
        </div>

        {/* ==================================================
            3. WORKSHOP FILTER AREA (Enhanced Hierarchy & Proper Stacking)
           ================================================== */}
        {/* ==================================================
            3. WORKSHOP FILTER AREA (Compact Mobile/Tablet + Structured Desktop)
           ================================================== */}
        <div className="relative z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 md:p-6 border border-csl-gold/30 shadow-md mb-6 md:mb-8">
          
          {/* Filter Area Title & Supporting Text (Compact on Mobile/Tablet) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 sm:gap-2 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-csl-gold/15">
            <div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider block">
                EXPLORE BY DOMAIN & LEVEL
              </span>
              <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-csl-text">
                Filter by Technology Domain and Skill Level
              </h3>
            </div>
            <span className="text-[11px] sm:text-xs text-csl-muted font-medium">
              {WORKSHOP_DOMAINS.length} Domains • {ALL_WORKSHOPS.length} Specialized Modules
            </span>
          </div>

          {/* DESKTOP LAYOUT (lg: 1024px+) - Exactly Preserved */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-end">
            {/* Domain Dropdown Column */}
            <div className="lg:col-span-5 flex flex-col relative z-20">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-csl-blue" />
                <span>Domain</span>
              </label>
              <CustomDropdown
                value={selectedDomainId}
                onChange={(val) => onSelectDomain(val)}
                options={DOMAIN_OPTIONS}
                placeholder="All 11 Domains"
                icon={Layers}
              />
            </div>

            {/* Level Dropdown Column */}
            <div className="lg:col-span-3 flex flex-col relative z-10">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-csl-gold" />
                <span>Level</span>
              </label>
              <CustomDropdown
                value={selectedLevel}
                onChange={(val) => setSelectedLevel(val as WorkshopLevel | 'All')}
                options={LEVEL_OPTIONS}
                placeholder="All Levels"
              />
            </div>

            {/* Search Input Column */}
            <div className="lg:col-span-4 flex flex-col relative">
              <label className="text-[11px] font-mono font-bold text-csl-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-csl-blue" />
                <span>Search Topics</span>
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-csl-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Python, RAG, Selenium..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-3.5 rounded-xl bg-white/90 border border-csl-gold/30 text-xs md:text-sm text-csl-text focus:outline-none focus:ring-1 focus:ring-csl-blue focus:border-csl-blue shadow-xs transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-csl-muted hover:text-csl-text p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE & TABLET COMPACT LAYOUT (<1024px) - Clean 2-Row Layout */}
          <div className="flex flex-col gap-2.5 lg:hidden">
            {/* Row 1: Search Field + Domain Filter side-by-side or stacked cleanly */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
              {/* Search Field (7 cols on tablet sm:, full width on phone) */}
              <div className="sm:col-span-7 relative h-10 flex items-center">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-csl-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search topics (e.g. Python, RAG)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full pl-10 pr-9 py-2 rounded-xl bg-white/95 border border-csl-gold/30 text-xs font-medium text-csl-text placeholder:text-csl-muted/80 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-csl-blue focus:border-csl-blue shadow-2xs leading-normal"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-csl-muted hover:text-csl-text p-1 cursor-pointer flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Domain Dropdown (5 cols on tablet sm:, full width on phone) */}
              <div className="sm:col-span-5 relative z-20">
                <CustomDropdown
                  value={selectedDomainId}
                  onChange={(val) => onSelectDomain(val)}
                  options={DOMAIN_OPTIONS}
                  placeholder="All Domains"
                  icon={Layers}
                  triggerClassName="!h-10 !py-0 !text-xs !bg-white/95"
                />
              </div>
            </div>

            {/* Row 2: Level Filter Pills for Quick One-Tap Filtering on Mobile/Tablet */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5 pb-0.5 scrollbar-none">
              <span className="text-[10px] font-mono font-bold text-csl-muted uppercase mr-1 shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3 text-csl-gold" />
                <span>Level:</span>
              </span>
              {(['All', 'Basic', 'Intermediate', 'Advanced'] as const).map((lvl) => {
                const isActive = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? lvl === 'Basic'
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : lvl === 'Intermediate'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : lvl === 'Advanced'
                          ? 'bg-purple-600 text-white shadow-2xs'
                          : 'bg-csl-blue text-white shadow-2xs'
                        : 'bg-white/90 text-csl-muted hover:text-csl-text border border-csl-gold/25'
                    }`}
                  >
                    {lvl === 'All' ? 'All Levels' : lvl}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Horizontal Domain Filter Tag Row (Desktop & Mobile) */}
        {searchQuery.trim() === '' && (
          <div 
            ref={tagsContainerRef}
            className="relative z-10 flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none"
          >
            <button
              ref={(el) => { tagButtonRefs.current['all'] = el; }}
              onClick={() => onSelectDomain('all')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border shrink-0 transition-all cursor-pointer ${
                selectedDomainId === 'all'
                  ? 'bg-csl-blue text-white border-csl-blue shadow-xs'
                  : 'bg-white/90 text-csl-text hover:text-csl-blue hover:border-csl-gold border-csl-gold/30'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All {WORKSHOP_DOMAINS.length} Domains</span>
            </button>
            {WORKSHOP_DOMAINS.map((dom) => (
              <button
                key={dom.id}
                ref={(el) => { tagButtonRefs.current[dom.id] = el; }}
                onClick={() => onSelectDomain(dom.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedDomainId === dom.id
                    ? 'bg-csl-blue text-white border border-csl-blue shadow-xs'
                    : 'bg-white/90 text-csl-muted hover:text-csl-text border border-csl-gold/25 hover:border-csl-gold/60'
                }`}
              >
                {dom.domainNumber < 10 ? `0${dom.domainNumber}` : dom.domainNumber}. {dom.shortTitle}
              </button>
            ))}
          </div>
        )}

        {/* ==================================================
            4. MAIN PRESENTATION: SEARCH RESULTS / 12 DOMAIN DIRECTORY
           ================================================== */}

        {/* CASE A: USER SEARCHED KEYWORD */}
        {searchQuery.trim() !== '' ? (
          <div className="relative z-10 mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-csl-muted">
                Found {filteredWorkshops.length} workshops matching "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-csl-blue font-bold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>

            {filteredWorkshops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredWorkshops.map((workshop) => (
                  <WorkshopCard 
                    key={workshop.id} 
                    workshop={workshop} 
                    onViewDetails={() => setActiveModalWorkshop(workshop)}
                    getWhatsAppLink={getWhatsAppLink}
                    getLevelBadgeClass={getLevelBadgeClass}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/70 rounded-2xl border border-csl-gold/20 p-8">
                <p className="text-sm font-semibold text-csl-text mb-2">No workshops match "{searchQuery}".</p>
                <p className="text-xs text-csl-muted mb-4">Try searching for generic terms like "Python", "SQL", "AI", or "Testing".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-csl-blue text-white text-xs font-bold hover:bg-csl-deep-blue cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          /* CASE B: CLEAN DOMAIN CATALOGUE (ONE CARD PER DOMAIN) */
          <div className="relative z-10 mb-14">
            <div className="flex items-center justify-between mb-6 px-1">
              <div>
                <span className="text-xs font-mono font-extrabold uppercase text-csl-gold tracking-wider block">
                  {displayedDomains.length === 1 ? 'SELECTED DOMAIN WORKSHOPS' : `${WORKSHOP_DOMAINS.length} DOMAIN WORKSHOPS`}
                </span>
                <span className="text-xs text-csl-muted font-medium">
                  {displayedDomains.length === 1
                    ? 'Hands-on curriculum structured across Basic, Intermediate, and Advanced tiers'
                    : `Structured curriculum across ${WORKSHOP_DOMAINS.length} domains with hands-on deliverables`}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-csl-blue">
                {displayedDomains.length} {displayedDomains.length === 1 ? 'Domain' : 'Domains'}
              </span>
            </div>

            {/* Grid of Clean Domain Cards - 2 Columns on Desktop, 1 on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
              {displayedDomains.map((domain) => (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  isExpanded={expandedWorkshopId === domain.id}
                  onToggleExpand={() => handleToggleExpandCard(domain.id)}
                  selectedLevel={selectedLevel}
                  onSelectWorkshop={(w) => setActiveModalWorkshop(w)}
                  getLevelBadgeClass={getLevelBadgeClass}
                  DOMAIN_ICONS={DOMAIN_ICONS}
                />
              ))}
            </div>
          </div>
        )}

        {/* ==================================================
            5. COMMON FOUNDATION SECTION (Immediately After Domain Cards)
           ================================================== */}
        <div className="relative z-10 mb-10 bg-white/95 rounded-2xl p-5 sm:p-6 border border-csl-gold/30 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-csl-gold/15">
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-csl-blue/10 text-csl-blue border border-csl-blue/20 inline-block mb-1">
                UNIVERSAL PREREQUISITE
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-csl-text">
                Common Foundation
              </h3>
            </div>
            <p className="text-xs text-csl-muted max-w-sm sm:text-right font-medium">
              Foundational skills designed to support all engineering and technology domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FOUNDATION_WORKSHOPS.map((fw) => (
              <div 
                key={fw.id}
                className="p-4 rounded-xl bg-csl-bg/70 border border-csl-gold/20 flex flex-col justify-between hover:border-csl-gold/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1.5">
                    <span className="text-csl-gold">0{fw.number}</span>
                    <span className="text-csl-muted">{fw.duration}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-csl-text mb-1">
                    {fw.title}
                  </h4>
                  <p className="text-xs text-csl-muted line-clamp-2 mb-3 font-medium">
                    {fw.description}
                  </p>
                </div>

                <a
                  href={`https://wa.me/919940166299?text=${encodeURIComponent(
                    `Hi Creator Space Lab! I would like to enquire about the Common Foundation workshop: "${fw.title}". Could you please share the syllabus and booking details?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-csl-blue text-white text-xs font-bold hover:bg-csl-deep-blue transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire Syllabus</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            5. WORKSHOP DETAIL MODAL
           ================================================== */}
        <AnimatePresence>
          {activeModalWorkshop && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-csl-gold/40 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalWorkshop(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-csl-bg text-csl-muted hover:text-csl-text transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Level & Domain */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${getLevelBadgeClass(activeModalWorkshop.level)}`}>
                    {activeModalWorkshop.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-csl-gold">
                    {activeModalWorkshop.domainTitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-csl-text mb-3 leading-snug">
                  {activeModalWorkshop.title}
                </h3>

                <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed mb-5">
                  {activeModalWorkshop.description}
                </p>

                {/* Key Topics List */}
                <div className="mb-5">
                  <h4 className="text-xs font-mono font-bold text-csl-gold uppercase mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-csl-blue" />
                    <span>Curriculum & Topics Covered</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-csl-text font-medium">
                    {activeModalWorkshop.keyTopics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hands-On Project Outcome */}
                <div className="bg-gradient-to-r from-csl-gold/10 via-csl-gold/5 to-csl-blue/10 border border-csl-gold/30 rounded-xl p-3.5 mb-6">
                  <span className="text-[10px] font-mono font-bold text-csl-gold uppercase block mb-1">
                    HANDS-ON PROJECT DELIVERABLE
                  </span>
                  <p className="text-xs font-bold text-csl-text leading-snug">
                    {activeModalWorkshop.projectOutcome}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-csl-gold/20">
                  <a
                    href={getWhatsAppLink(activeModalWorkshop)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setActiveModalWorkshop(null);
                      onNavigateToContact();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 border border-csl-gold/40 hover:border-csl-gold bg-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-csl-text hover:text-csl-blue transition-colors cursor-pointer"
                  >
                    <span>Contact Us Form</span>
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// ==================================================
// Clean Domain Card (One Card per Domain with Expandable Topics)
// ==================================================
interface DomainCardProps {
  domain: WorkshopDomain;
  isExpanded: boolean;
  onToggleExpand: () => void;
  selectedLevel: WorkshopLevel | 'All';
  onSelectWorkshop: (w: WorkshopItem) => void;
  getLevelBadgeClass: (l: WorkshopLevel) => string;
  DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>>;
}

function DomainCard({
  domain,
  isExpanded,
  onToggleExpand,
  selectedLevel,
  onSelectWorkshop,
  getLevelBadgeClass,
  DOMAIN_ICONS,
}: DomainCardProps) {
  const IconComponent = DOMAIN_ICONS[domain.id] || Sparkles;
  const plainDesc = DOMAIN_PLAIN_DESCRIPTIONS[domain.id] || domain.description;

  // Retrieve the 6 workshops for this domain from ALL_WORKSHOPS
  const domainWorkshops = useMemo(() => {
    return ALL_WORKSHOPS.filter((w) => w.domainId === domain.id);
  }, [domain.id]);

  const basicWorkshops = domainWorkshops.filter((w) => w.level === 'Basic');
  const intermediateWorkshops = domainWorkshops.filter((w) => w.level === 'Intermediate');
  const advancedWorkshops = domainWorkshops.filter((w) => w.level === 'Advanced');

  // If a specific level filter is selected and the card is expanded, we can filter or highlight
  const visibleWorkshops = useMemo(() => {
    if (selectedLevel === 'All') return domainWorkshops;
    return domainWorkshops.filter((w) => w.level === selectedLevel);
  }, [domainWorkshops, selectedLevel]);

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-csl-gold/30 hover:border-csl-gold/70 transition-all duration-300 shadow-xs hover:shadow-md p-4 sm:p-5 md:p-6 flex flex-col justify-between">
      <div>
        {/* Card Header: Icon, Number, Title, and Trending Badge */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-csl-gold/15 border border-csl-gold/30 flex items-center justify-center text-csl-blue shrink-0">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-csl-gold uppercase block leading-none mb-0.5 sm:mb-1">
                DOMAIN {domain.domainNumber < 10 ? `0${domain.domainNumber}` : domain.domainNumber}
              </span>
              <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-csl-text leading-snug truncate sm:whitespace-normal">
                {domain.title}
              </h3>
            </div>
          </div>

          {domain.trending && (
            <span className="shrink-0 text-[9px] sm:text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30">
              TRENDING
            </span>
          )}
        </div>

        {/* Plain-English Approachable Summary */}
        <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
          {plainDesc}
        </p>

        {/* 3 Skill Level Tier Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
          <span className="text-[9px] sm:text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 border border-emerald-500/30">
            Basic (2)
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-800 border border-blue-500/30">
            Intermediate (2)
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-800 border border-purple-500/30">
            Advanced (2)
          </span>
          <span className="text-[10px] sm:text-[11px] text-csl-muted font-medium ml-auto">
            6 Modules
          </span>
        </div>

        {/* Expandable Workshop Topics List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden pt-3 border-t border-csl-gold/15 mb-3 sm:mb-4"
            >
              {selectedLevel === 'All' ? (
                <div className="space-y-3.5 sm:space-y-4">
                  {/* Basic */}
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-800 uppercase block mb-1 sm:mb-1.5">
                      BASIC LEVEL
                    </span>
                    <div className="space-y-1.5">
                      {basicWorkshops.map((w) => (
                        <div
                          key={w.id}
                          onClick={() => onSelectWorkshop(w)}
                          className="p-2.5 sm:p-3 rounded-xl bg-csl-bg/60 hover:bg-csl-gold/15 border border-csl-gold/20 flex items-center justify-between gap-2 cursor-pointer transition-colors active:scale-[0.99]"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-csl-text leading-tight line-clamp-1 sm:line-clamp-none">
                              {w.title}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-csl-muted shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Intermediate */}
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-blue-800 uppercase block mb-1 sm:mb-1.5">
                      INTERMEDIATE LEVEL
                    </span>
                    <div className="space-y-1.5">
                      {intermediateWorkshops.map((w) => (
                        <div
                          key={w.id}
                          onClick={() => onSelectWorkshop(w)}
                          className="p-2.5 sm:p-3 rounded-xl bg-csl-bg/60 hover:bg-csl-gold/15 border border-csl-gold/20 flex items-center justify-between gap-2 cursor-pointer transition-colors active:scale-[0.99]"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-csl-text leading-tight line-clamp-1 sm:line-clamp-none">
                              {w.title}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-csl-muted shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advanced */}
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-purple-800 uppercase block mb-1 sm:mb-1.5">
                      ADVANCED LEVEL
                    </span>
                    <div className="space-y-1.5">
                      {advancedWorkshops.map((w) => (
                        <div
                          key={w.id}
                          onClick={() => onSelectWorkshop(w)}
                          className="p-2.5 sm:p-3 rounded-xl bg-csl-bg/60 hover:bg-csl-gold/15 border border-csl-gold/20 flex items-center justify-between gap-2 cursor-pointer transition-colors active:scale-[0.99]"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-csl-text leading-tight line-clamp-1 sm:line-clamp-none">
                              {w.title}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-csl-muted shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-csl-blue uppercase block mb-1 sm:mb-1.5">
                    {selectedLevel.toUpperCase()} LEVEL WORKSHOPS
                  </span>
                  {visibleWorkshops.map((w) => (
                    <div
                      key={w.id}
                      onClick={() => onSelectWorkshop(w)}
                      className="p-2.5 sm:p-3 rounded-xl bg-csl-bg/60 hover:bg-csl-gold/15 border border-csl-gold/20 flex items-center justify-between gap-2 cursor-pointer transition-colors active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${getLevelBadgeClass(w.level)}`}>
                          {w.level}
                        </span>
                        <span className="text-xs font-bold text-csl-text leading-tight truncate sm:whitespace-normal">
                          {w.title}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-csl-muted shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Footer Actions - Clean Responsive Row */}
      <div className="pt-3 sm:pt-4 border-t border-csl-gold/15 flex items-center justify-between gap-2.5 sm:gap-3">
        <button
          onClick={onToggleExpand}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-csl-blue hover:text-csl-deep-blue cursor-pointer transition-colors py-1.5"
        >
          <span>{isExpanded ? 'Hide Topics' : 'Explore Topics'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        <button
          onClick={onToggleExpand}
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-csl-blue text-white text-xs font-bold shadow-xs hover:bg-csl-deep-blue hover:scale-102 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isExpanded ? 'Collapse Curriculum' : 'View Curriculum'}</span>
        </button>
      </div>
    </div>
  );
}

// Compact Workshop Card subcomponent
interface WorkshopCardProps {
  workshop: WorkshopItem;
  onViewDetails: () => void;
  getWhatsAppLink: (w: WorkshopItem) => string;
  getLevelBadgeClass: (l: WorkshopLevel) => string;
}

function WorkshopCard({
  workshop,
  onViewDetails,
  getWhatsAppLink,
  getLevelBadgeClass,
}: WorkshopCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-5 border border-csl-gold/25 hover:border-csl-gold/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top meta tags */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getLevelBadgeClass(workshop.level)}`}>
            {workshop.level}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-csl-muted font-mono font-medium">
            <Clock className="w-3 h-3 text-csl-gold" />
            <span>{workshop.duration}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm sm:text-[15px] font-extrabold text-csl-text group-hover:text-csl-blue transition-colors mb-2 leading-snug">
          {workshop.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-csl-muted leading-relaxed mb-3 line-clamp-2 font-medium">
          {workshop.description}
        </p>

        {/* Project Outcome highlight */}
        <div className="p-2.5 rounded-xl bg-csl-bg border border-csl-gold/20 mb-4">
          <span className="text-[10px] font-mono font-bold text-csl-gold uppercase block mb-0.5">
            PROJECT DELIVERABLE:
          </span>
          <p className="text-[11px] font-semibold text-csl-text line-clamp-1">
            {workshop.projectOutcome}
          </p>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-csl-gold/15 flex items-center justify-between gap-2">
        <button
          onClick={onViewDetails}
          className="text-xs font-bold text-csl-blue hover:text-csl-deep-blue flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Curriculum Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={getWhatsAppLink(workshop)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-csl-blue text-white text-xs font-bold shadow-xs hover:bg-csl-deep-blue hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Enquire</span>
        </a>
      </div>
    </div>
  );
}
