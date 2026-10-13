import { Star, MessageSquareQuote } from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

interface ReviewItem {
  id: number;
  name: string;
  domain?: string;
  review: string;
}

// Authentic reviews provided from actual internship students
const REVIEWS_ROW_1: ReviewItem[] = [
  {
    id: 1,
    name: 'Ulasa Reshma',
    review: 'I had a good learning experience at CreatorSpaceLab. The trainers explained concepts clearly and were supportive throughout the learning process. The hands-on projects and practical sessions helped me improve my technical skills and confidence.',
  },
  {
    id: 2,
    name: 'Sudeeswaran R',
    domain: 'Generative AI',
    review: 'Had a great internship experience at Creators Space Lab. The mentors were supportive, and the hands-on learning in generative AI helped me improve my technical and analytical skills. Highly recommended for practical industry exposure.',
  },
  {
    id: 3,
    name: 'Sanjay Thuraka',
    domain: 'AI/ML & Full Stack',
    review: 'I worked on AI/ML and Full Stack Development projects, which helped me improve my technical and problem-solving skills. The mentors were supportive, provided valuable guidance, and encouraged hands-on learning.',
  },
  {
    id: 4,
    name: 'Flame Hashira',
    domain: 'AI Research',
    review: 'The mentors were supportive and provided guidance throughout the program. The internship helped me understand AI research, publication processes, and how research work is carried out.',
  },
  {
    id: 5,
    name: 'Thanga Lakshmi',
    review: 'My internship at Creator Space Lab was an excellent learning experience. The training was well-structured, practical, and highly relevant to current industry requirements. The mentors were knowledgeable, approachable, and always willing to guide us.',
  },
  {
    id: 6,
    name: 'Prathap Prathap',
    domain: 'Full Stack Development',
    review: 'Excellent internship experience! I completed a 15-day Full Stack Developer internship at Creator Space Lab. The training was practical, the mentors were very helpful, and I learned a lot by building a real-world project.',
  },
  {
    id: 7,
    name: 'Monisha',
    review: 'My internship at Creator Space Lab was a great learning experience. I gained practical knowledge, improved my technical skills, and received valuable guidance from the mentors. The projects were engaging and practical.',
  },
  {
    id: 8,
    name: 'Deepesh',
    domain: 'DevOps & Cloud',
    review: 'Before joining the internship, I did not know much about how different IT fields worked. After joining, I learned a lot especially in DevOps and Cloud Computing. As a beginner, it gave me a solid introduction and encouraged me to keep learning.',
  },
  {
    id: 9,
    name: 'Supriya V',
    review: 'Great place to learn and gain practical experience. The staff were supportive, and the internship was very helpful in improving my skills. Thank you for the wonderful experience!',
  },
  {
    id: 10,
    name: 'Keshavarthini',
    review: 'Excellent learning center for internship. More natural realtime working feel and made me more confident in projects, with good mentors to guide students.',
  },
  {
    id: 11,
    name: 'Hema Sri',
    domain: 'Full Stack Development',
    review: 'It was a nice experience to work with Creator Space Lab. They guide the students well and the practical project training has been very helpful.',
  },
  {
    id: 12,
    name: 'Narmatha K',
    review: 'I recently completed my internship at Creative Space Lab and had a very positive learning experience. The internship provided practical exposure, guidance from supportive mentors, and opportunities to improve technical skills.',
  },
];

const REVIEWS_ROW_2: ReviewItem[] = [
  {
    id: 13,
    name: 'Anshuman Rout',
    domain: 'Web Development & AI',
    review: 'I had a great internship experience at Creator Space Lab. The team was supportive and provided hands-on learning opportunities in web development, Git and AI-assisted coding. I gained practical knowledge on a real-world e-commerce project.',
  },
  {
    id: 14,
    name: 'Afia Jahan',
    review: 'The internship focused on practical learning through real-world projects rather than just theory. The mentors were supportive and guided us throughout the internship. I improved my technical skills and learned industry development workflows.',
  },
  {
    id: 15,
    name: 'Karan Kumar',
    domain: 'DevOps & Cloud Computing',
    review: 'I had a wonderful experience during my DevOps and Cloud Computing internship. The internship provided excellent practical exposure to industry-standard tools and workflows. The training sessions were well-structured and interactive.',
  },
  {
    id: 16,
    name: 'Vidhya',
    review: 'This internship provided valuable hands-on experience that helped me strengthen my technical and problem-solving skills through real-world projects. The mentors were knowledgeable, approachable, and always willing to guide us.',
  },
  {
    id: 17,
    name: 'Boomika Raja',
    domain: 'ML & LangChain',
    review: 'I had a great learning experience during this internship. I gained knowledge about n8n, Machine Learning, RAG, LangChain, and Web Development. The mentors were supportive and guided us throughout the program.',
  },
  {
    id: 18,
    name: 'Karthika M',
    domain: 'AI & Machine Learning',
    review: 'I had a great experience during my AI & Machine Learning internship at Creator Space Lab. The mentors were supportive, and the sessions were very informative. I gained practical knowledge and improved my skills.',
  },
  {
    id: 19,
    name: 'Kavya Kumar',
    domain: 'Data Analytics & BI',
    review: 'I had a great learning experience in the Data Analysis and Business Intelligence domain. I gained hands-on knowledge of SQL, Excel, Power BI, and basics of Machine Learning through practical sessions and project work.',
  },
  {
    id: 20,
    name: 'Subash Subash',
    domain: 'UI/UX Design',
    review: 'Very good internship at Creator Space Lab. The training coach was friendly and the learning in UI/UX design was easy to understand.',
  },
  {
    id: 21,
    name: 'Ganga Shree',
    review: 'Good internship experience. Got hands-on exposure through projects, and the mentors were helpful. It was a nice opportunity to learn and improve my skills.',
  },
  {
    id: 22,
    name: 'Subash Chandra Bose',
    review: 'Had a wonderful experience at Creator Space Lab. The team was supportive, and the environment was inspiring. Great place to learn and build real projects.',
  },
  {
    id: 23,
    name: 'Santha Kumar',
    review: 'Thank you for providing me with this valuable learning opportunity. The guidance and support helped me improve my technical skills and project performance.',
  },
];

// Subtle YellowBox blocks for ambient CSL warmth
const reviewYellowBlocks = [
  { size: 'w-12 h-12', pos: 'top-[15%] left-[4%]', delay: 0.4, duration: 8 },
  { size: 'w-16 h-16', pos: 'bottom-[12%] right-[5%]', delay: 1.1, duration: 7 },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="w-[300px] sm:w-[340px] md:w-[380px] shrink-0 bg-white/90 backdrop-blur-sm border border-csl-gold/30 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-csl-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between select-none">
      <div>
        {/* Rating Stars & Domain Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-0.5 text-csl-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          {review.domain && (
            <span className="px-2.5 py-0.5 rounded-full bg-csl-gold/15 border border-csl-gold/35 text-csl-deep-blue font-bold text-[10px] tracking-wide">
              {review.domain}
            </span>
          )}
        </div>

        {/* Review Quote */}
        <p className="text-xs sm:text-[13px] text-csl-text/85 font-medium leading-relaxed italic line-clamp-4">
          "{review.review}"
        </p>
      </div>

      {/* Reviewer Name */}
      <div className="pt-3 mt-3 border-t border-csl-gold/15 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-csl-text tracking-tight">
          {review.name}
        </span>
        <span className="text-[10px] font-semibold text-csl-muted uppercase tracking-wider">
          Intern
        </span>
      </div>
    </div>
  );
}

export function InternshipReviewsMarquee() {
  // Seamless loop by duplicating items
  const row1Items = [...REVIEWS_ROW_1, ...REVIEWS_ROW_1];
  const row2Items = [...REVIEWS_ROW_2, ...REVIEWS_ROW_2];

  return (
    <section 
      id="intern-reviews"
      className="relative w-full py-12 md:py-16 bg-[#FAF6F2] border-b border-csl-gold/20 overflow-hidden"
      aria-label="What Our Interns Say"
    >
      {/* Background Yellow Voxel Floating Blocks */}
      <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto opacity-60">
        {reviewYellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      {/* Section Header */}
      <div className="relative z-10 section-container mb-8 md:mb-10 text-center flex flex-col items-center">
        <div className="section-eyebrow justify-center">
          <MessageSquareQuote className="w-3.5 h-3.5 text-csl-gold" />
          <span>Student Voices</span>
          <div></div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
          What Our <span className="text-csl-blue">Interns Say</span>
        </h2>
        <p className="text-csl-muted font-medium text-sm md:text-base max-w-xl section-subheading mx-auto">
          Genuine feedback and learning experiences shared by students who completed practical internship programs at Creator Space Lab.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Rows */}
      <div className="relative z-10 w-full flex flex-col gap-4 sm:gap-5 overflow-hidden">
        
        {/* Soft edge blur vignettes for seamless edge entry and exit */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-[#FAF6F2] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-[#FAF6F2] to-transparent z-20 pointer-events-none" />

        {/* Row 1: Moving Left Continuously */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-4 sm:gap-5 py-1">
            {row1Items.map((rev, idx) => (
              <ReviewCard key={`r1-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>
        </div>

        {/* Row 2: Moving Right Continuously */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex gap-4 sm:gap-5 py-1">
            {row2Items.map((rev, idx) => (
              <ReviewCard key={`r2-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
