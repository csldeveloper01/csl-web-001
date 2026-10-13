import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

interface VideoTestimonial {
  id: number;
  title: string;
  tag: string;
  poster: string;
  videoSrc: string;
}

const TESTIMONIAL_VIDEOS: VideoTestimonial[] = [
  {
    id: 1,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_1.jpg',
    videoSrc: '/internships/videos/video_1.mp4',
  },
  {
    id: 2,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_2.jpg',
    videoSrc: '/internships/videos/video_2.mp4',
  },
  {
    id: 3,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_3.jpg',
    videoSrc: '/internships/videos/video_3.mp4',
  },
  {
    id: 4,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_4.jpg',
    videoSrc: '/internships/videos/video_4.mp4',
  },
  {
    id: 5,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_5.jpg',
    videoSrc: '/internships/videos/video_5.mp4',
  },
  {
    id: 6,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_6.jpg',
    videoSrc: '/internships/videos/video_6.mp4',
  },
  {
    id: 7,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_7.jpg',
    videoSrc: '/internships/videos/video_7.mp4',
  },
  {
    id: 8,
    title: 'INTERNSHIP EXPERIENCE',
    tag: 'CSL COHORT',
    poster: '/internships/posters/poster_8.jpg',
    videoSrc: '/internships/videos/video_8.mp4',
  },
];

// Subtle YellowBox blocks for ambient CSL warmth in video section
const videoYellowBlocks = [
  { size: 'w-10 h-10', pos: 'top-[14%] right-[6%]', delay: 0.3, duration: 7.5 },
  { size: 'w-14 h-14', pos: 'bottom-[10%] left-[5%]', delay: 1.0, duration: 8 },
];

export function InternshipVideoTestimonials() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayVideo = (id: number) => {
    setActiveVideoId(id);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 280;
      const scrollAmount = (cardWidth + 20) * 2;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="video-testimonials"
      className="relative w-full py-14 md:py-20 bg-[#FDFBF9] border-b border-csl-gold/20 overflow-hidden"
      aria-label="Video Testimonials"
    >
      {/* Background Yellow Voxel Floating Blocks */}
      <div className="absolute inset-0 pointer-events-none z-0 2xl:max-w-[1600px] 2xl:mx-auto opacity-60">
        {videoYellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      <div className="relative z-10 section-container">
        
        {/* Header */}
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="section-eyebrow">
            <Video className="w-3.5 h-3.5 text-csl-gold" />
            <span>Video Testimonials</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-3">
            Hear From <span className="text-csl-blue">Our Interns</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base section-subheading">
            Authentic reflections and learning experiences directly from students who underwent hands-on internship programs at Creator Space Lab.
          </p>
        </div>

        {/* Carousel Track Wrapper with Vertically Centered Left/Right Arrows */}
        <div className="relative w-full">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll testimonials left"
            className="absolute -left-2 sm:-left-4 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-csl-gold/40 text-csl-blue shadow-[0_4px_20px_rgba(0,30,80,0.12)] hover:bg-csl-blue hover:text-white hover:border-csl-blue transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-csl-blue/40"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll testimonials right"
            className="absolute -right-2 sm:-right-4 md:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-csl-gold/40 text-csl-blue shadow-[0_4px_20px_rgba(0,30,80,0.12)] hover:bg-csl-blue hover:text-white hover:border-csl-blue transition-all duration-200 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-csl-blue/40"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>

          {/* Video Cards Scroll Track (Strictly Portrait 9:16 Aspect Ratio) */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {TESTIMONIAL_VIDEOS.map((item, idx) => {
            const isPlaying = activeVideoId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="w-[240px] sm:w-[270px] md:w-[290px] lg:w-[calc(25%-18px)] shrink-0 snap-start flex flex-col"
              >
                {/* Portrait Video Card Frame */}
                <div className="relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-csl-gold/35 shadow-md shadow-csl-gold/5 group hover:border-csl-gold/60 transition-all duration-300">
                  
                  {isPlaying ? (
                    /* Active Video Player (Loaded strictly on user demand) */
                    <video
                      src={item.videoSrc}
                      controls
                      autoPlay
                      playsInline
                      preload="none"
                      onEnded={() => setActiveVideoId(null)}
                      className="w-full h-full object-cover rounded-2xl sm:rounded-3xl bg-black"
                    />
                  ) : (
                    /* Lightweight Poster & Centered Sleek Play Button */
                    <div 
                      onClick={() => handlePlayVideo(item.id)}
                      className="relative w-full h-full cursor-pointer select-none"
                    >
                      {/* Lightweight Thumbnail Image */}
                      <img
                        src={item.poster}
                        alt={`${item.title} video thumbnail`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                      />

                      {/* Vignette & Soft Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25 group-hover:from-black/75 transition-colors" />

                      {/* Centered Sleek CSL Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 backdrop-blur-md text-csl-deep-blue flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-csl-blue group-hover:text-white transition-all duration-300 ring-2 ring-csl-gold/30">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                        </div>
                      </div>

                      {/* Bottom Clean Metadata */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full bg-csl-gold/90 text-csl-deep-blue font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-white tracking-tight drop-shadow-sm uppercase">
                          {item.title}
                        </h3>
                      </div>

                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  </section>
  );
}
