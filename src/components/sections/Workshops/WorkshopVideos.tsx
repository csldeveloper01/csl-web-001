import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { WORKSHOP_VIDEOS, WorkshopVideoItem } from './workshopsData';

export function WorkshopVideos() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({
    'wk-vid-1': false,
    'wk-vid-2': false,
    'wk-vid-3': false,
    'wk-vid-4': false,
    'wk-vid-5': false,
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handlePlayToggle = (video: WorkshopVideoItem) => {
    const currentRef = videoRefs.current[video.id];
    if (!currentRef) return;

    if (playingId === video.id) {
      currentRef.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing video first
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      currentRef.play().then(() => {
        setPlayingId(video.id);
      }).catch((err) => {
        console.warn('Playback interrupted:', err);
      });
    }
  };

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedStates((prev) => ({ ...prev, [id]: vid.muted }));
    }
  };

  const handleFullscreen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      }
    }
  };

  const landscapeVideo = WORKSHOP_VIDEOS.find((v) => v.aspectRatio === 'landscape')!;
  const portraitVideos = WORKSHOP_VIDEOS.filter((v) => v.aspectRatio === 'portrait');

  return (
    <section id="workshop-experience" className="relative w-full py-16 md:py-24 bg-[#FAF7F3] border-b border-csl-gold/20">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="mb-14 text-center flex flex-col items-center">
          <div className="section-eyebrow justify-center">
            <span>ON-CAMPUS HIGHLIGHTS</span>
            <div></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-csl-text section-heading tracking-tight mb-4">
            Workshop <span className="text-csl-blue">Experiences</span>
          </h2>
          <p className="text-csl-muted font-medium text-sm md:text-base max-w-2xl section-subheading">
            Authentic footage from live university workshops, hands-on programming labs, and interactive seminars conducted across premier engineering and arts colleges.
          </p>
        </div>

        {/* ==================================================
            FEATURED LANDSCAPE VIDEO (Campus Lab & Auditorium)
           ================================================== */}
        {landscapeVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white rounded-3xl p-4 sm:p-6 border border-csl-gold/30 shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Video Player (Landscape 16:9) */}
              <div className="lg:col-span-8 relative aspect-video bg-black rounded-2xl overflow-hidden group shadow-md">
                <video
                  ref={(el) => { videoRefs.current[landscapeVideo.id] = el; }}
                  src={landscapeVideo.src}
                  poster={landscapeVideo.poster}
                  preload="none"
                  playsInline
                  controls={playingId === landscapeVideo.id}
                  onEnded={() => setPlayingId(null)}
                  className="w-full h-full object-cover"
                />

                {/* Custom Overlay when paused */}
                {playingId !== landscapeVideo.id && (
                  <div 
                    onClick={() => handlePlayToggle(landscapeVideo)}
                    className="absolute inset-0 bg-black/35 hover:bg-black/25 flex items-center justify-center cursor-pointer transition-all duration-300"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-csl-blue flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                      <Play className="w-8 h-8 ml-1 text-csl-blue fill-csl-blue" />
                    </div>
                  </div>
                )}

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                    <Sparkles className="w-3 h-3 text-csl-gold" />
                    {landscapeVideo.tag}
                  </span>
                </div>
              </div>

              {/* Video Details Column */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-xs font-bold text-csl-gold font-mono mb-2">
                  <MapPin className="w-4 h-4 text-csl-gold" />
                  <span>{landscapeVideo.collegeOrEvent}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-csl-text mb-1 leading-tight">
                  {landscapeVideo.title}
                </h3>

                <span className="text-xs sm:text-sm font-semibold text-csl-blue mb-3 block">
                  Celebrating Independence Through Giving
                </span>

                <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed mb-6">
                  {landscapeVideo.caption}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-csl-gold/15">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-csl-muted font-medium">Event Focus:</span>
                    <span className="font-bold text-csl-text">Independence Day Celebration</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-csl-muted font-medium">Community:</span>
                    <span className="font-bold text-csl-text">Student & Community Outreach</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-csl-muted font-medium">Impact:</span>
                    <span className="font-bold text-csl-text">Stationery Donation & Community Engagement</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handlePlayToggle(landscapeVideo)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-csl-blue text-white text-xs font-bold shadow-md hover:bg-csl-deep-blue hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {playingId === landscapeVideo.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause Video</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>Watch Video</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==================================================
            PORTRAIT VIDEOS
            Mobile & Tablet: Compact YouTube Shorts-style swipeable carousel with arrow navigation (9:16 aspect ratio, partial next card)
            Desktop (lg+): Retain existing 4-card grid layout unchanged
           ================================================== */}
        
        {/* MOBILE & TABLET SHORTS FEED HEADER (Title + Navigation Arrows) */}
        <div className="lg:hidden flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-csl-text tracking-wide uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-csl-blue animate-pulse"></span>
            <span>Student & Campus Reels</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCarousel('left')}
              disabled={!canScrollLeft}
              aria-label="Previous reel"
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'border-csl-gold/40 bg-white text-csl-text shadow-xs hover:border-csl-blue hover:text-csl-blue active:scale-95'
                  : 'border-csl-gold/15 bg-white/50 text-csl-muted/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              disabled={!canScrollRight}
              aria-label="Next reel"
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'border-csl-gold/40 bg-white text-csl-text shadow-xs hover:border-csl-blue hover:text-csl-blue active:scale-95'
                  : 'border-csl-gold/15 bg-white/50 text-csl-muted/40 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MOBILE & TABLET SHORTS FEED (Swipeable horizontal row with snap + arrow navigation) */}
        <div
          ref={carouselRef}
          onScroll={checkScrollState}
          className="lg:hidden flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {portraitVideos.map((video) => {
            const isPlaying = playingId === video.id;
            const isMuted = mutedStates[video.id] ?? false;

            return (
              <div
                key={`mobile-${video.id}`}
                className="w-[230px] sm:w-[270px] shrink-0 snap-start bg-white rounded-2xl p-3 border border-csl-gold/30 shadow-sm flex flex-col justify-between"
              >
                {/* 9:16 Compact Portrait Container */}
                <div className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden mb-2.5 shadow-inner">
                  <video
                    ref={(el) => { 
                      // If on mobile/tablet, bind ref if desktop ref not active
                      if (!videoRefs.current[video.id] || window.innerWidth < 1024) {
                        videoRefs.current[video.id] = el; 
                      }
                    }}
                    src={video.src}
                    poster={video.poster}
                    preload="none"
                    playsInline
                    controls={isPlaying}
                    onEnded={() => setPlayingId(null)}
                    className="w-full h-full object-cover"
                  />

                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <div
                      onClick={() => handlePlayToggle(video)}
                      className="absolute inset-0 bg-black/40 hover:bg-black/30 flex items-center justify-center cursor-pointer transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/95 text-csl-blue flex items-center justify-center shadow-lg active:scale-95 transition-all">
                        <Play className="w-5 h-5 ml-0.5 text-csl-blue fill-csl-blue" />
                      </div>
                    </div>
                  )}

                  {/* Shorts Badge */}
                  <div className="absolute top-2 left-2 pointer-events-none">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20">
                      {video.tag}
                    </span>
                  </div>

                  {/* Controls */}
                  {isPlaying && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
                      <button
                        onClick={(e) => toggleMute(video.id, e)}
                        className="p-1 rounded-full bg-black/60 text-white"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={(e) => handleFullscreen(video.id, e)}
                        className="p-1 rounded-full bg-black/60 text-white"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Compact Info */}
                <div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-csl-gold font-mono mb-1 truncate">
                    <MapPin className="w-2.5 h-2.5 text-csl-gold shrink-0" />
                    <span className="truncate">{video.collegeOrEvent}</span>
                  </div>

                  <h4 className="text-xs font-extrabold text-csl-text mb-1 line-clamp-1 leading-snug">
                    {video.title}
                  </h4>

                  <p className="text-[11px] text-csl-muted line-clamp-2 leading-tight mb-2">
                    {video.caption}
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handlePlayToggle(video)}
                  className="w-full py-1.5 rounded-lg border border-csl-gold/30 text-[11px] font-bold text-csl-text flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-csl-gold" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-csl-blue fill-csl-blue" />
                      <span>Play Reel</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* DESKTOP (lg+) GRID VIEW (Retained unchanged) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {portraitVideos.map((video, idx) => {
            const isPlaying = playingId === video.id;
            const isMuted = mutedStates[video.id] ?? false;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl p-4 border border-csl-gold/30 hover:border-csl-gold/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* 9:16 Video Player Container */}
                <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-4 shadow-inner">
                  <video
                    ref={(el) => { 
                      if (window.innerWidth >= 1024 || !videoRefs.current[video.id]) {
                        videoRefs.current[video.id] = el; 
                      }
                    }}
                    src={video.src}
                    poster={video.poster}
                    preload="none"
                    playsInline
                    controls={isPlaying}
                    onEnded={() => setPlayingId(null)}
                    className="w-full h-full object-cover"
                  />

                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <div
                      onClick={() => handlePlayToggle(video)}
                      className="absolute inset-0 bg-black/40 hover:bg-black/30 flex items-center justify-center cursor-pointer transition-all"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/95 text-csl-blue flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
                        <Play className="w-6 h-6 ml-0.5 text-csl-blue fill-csl-blue" />
                      </div>
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20">
                      {video.tag}
                    </span>
                  </div>

                  {/* Quick mute / fullscreen controls overlay when playing */}
                  {isPlaying && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                      <button
                        onClick={(e) => toggleMute(video.id, e)}
                        className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={(e) => handleFullscreen(video.id, e)}
                        className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Text Info */}
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-csl-gold font-mono mb-1 truncate">
                    <MapPin className="w-3 h-3 text-csl-gold shrink-0" />
                    <span className="truncate">{video.collegeOrEvent}</span>
                  </div>

                  <h4 className="text-sm font-extrabold text-csl-text group-hover:text-csl-blue transition-colors mb-2 leading-snug">
                    {video.title}
                  </h4>

                  <p className="text-xs text-csl-muted line-clamp-2 leading-relaxed mb-3">
                    {video.caption}
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handlePlayToggle(video)}
                  className="w-full mt-2 py-2 rounded-xl border border-csl-gold/30 hover:border-csl-gold hover:bg-csl-bg text-xs font-bold text-csl-text flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-csl-gold" />
                      <span>Pause Video</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-csl-blue fill-csl-blue" />
                      <span>Play Footage</span>
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
