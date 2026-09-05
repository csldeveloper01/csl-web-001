import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// @ts-expect-error - TS doesn't know about files outside src but Vite handles it
import img1 from '../../../../Elements/ABOUT/AI INNOVATION.png';
// @ts-expect-error
import img2 from '../../../../Elements/ABOUT/CLOUD EXCELLENCE.png';
// @ts-expect-error
import img3 from '../../../../Elements/ABOUT/SECURITY FIRST.png';
// @ts-expect-error
import img4 from '../../../../Elements/ABOUT/SPEED & OPTIMIZATION.png';
// @ts-expect-error
import img5 from '../../../../Elements/ABOUT/GROWTH & ANALYTICS.png';
// @ts-expect-error
import img6 from '../../../../Elements/ABOUT/PEOPLE & COLLABORATION.png';

const carouselData = [
  {
    title: "AI Innovation",
    subtitle: "Transforming ideas into intelligent solutions.",
    description: "From predictive analytics to natural language processing, our AI systems learn, adapt, and evolve — delivering real-time insights that help you stay ahead.",
    image: img1,
  },
  {
    title: "Cloud Excellence",
    subtitle: "Secure, scalable, and built for growth.",
    description: "We design cloud architectures that are resilient, cost-effective, and adaptable — enabling seamless data flow and real-time collaboration.",
    image: img2,
  },
  {
    title: "Security First",
    subtitle: "Trust is built on protection.",
    description: "Our AI-driven security frameworks detect threats before they happen. With encrypted cloud environments, your data stays safe and compliant — always.",
    image: img3,
  },
  {
    title: "Speed & Optimization",
    subtitle: "Time is your most valuable resource.",
    description: "AI optimization algorithms and cloud load balancing ensure your systems run lightning fast — even during peak demand.",
    image: img4,
  },
  {
    title: "Growth & Analytics",
    subtitle: "Data-driven decisions for real impact.",
    description: "Our AI-powered analytics track every key metric, uncover hidden patterns, and recommend strategies that drive sustainable growth.",
    image: img5,
  },
  {
    title: "People & Collaboration",
    subtitle: "Tech works best when people work together.",
    description: "We blend AI efficiency with human creativity — building tools that help teams innovate faster, collaborate smarter, and achieve together.",
    image: img6,
  }
];

export function AboutCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const getVisibleStates = () => {
    const prev = (currentIndex - 1 + carouselData.length) % carouselData.length;
    const next = (currentIndex + 1) % carouselData.length;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleStates();

  return (
    <div 
      className="w-full flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Visual Stage */}
      <div className="relative w-full max-w-[600px] aspect-[4/3] flex items-center justify-center mb-2">
        
        {/* Controls - Left */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 z-20 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:scale-105 transition-transform text-csl-text"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Artworks Container */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="popLayout" initial={false}>
            {/* Previous State */}
            <motion.div
              key={`prev-${prev}`}
              layoutId={`artwork-${prev}`}
              className="absolute left-[5%] w-[35%] opacity-40 grayscale-[30%] pointer-events-auto cursor-pointer"
              initial={{ opacity: 0, x: -80, scale: 0.8 }}
              animate={{ opacity: 0.4, x: 0, scale: 0.85 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => goToSlide(prev)}
              whileHover={{ opacity: 0.7, scale: 0.9, filter: 'grayscale(0%)', x: 5 }}
            >
              <img src={carouselData[prev].image} alt="Previous" className="w-full h-auto object-contain" />
            </motion.div>

            {/* Next State */}
            <motion.div
              key={`next-${next}`}
              layoutId={`artwork-${next}`}
              className="absolute right-[5%] w-[35%] opacity-40 grayscale-[30%] pointer-events-auto cursor-pointer"
              initial={{ opacity: 0, x: 80, scale: 0.8 }}
              animate={{ opacity: 0.4, x: 0, scale: 0.85 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => goToSlide(next)}
              whileHover={{ opacity: 0.7, scale: 0.9, filter: 'grayscale(0%)', x: -5 }}
            >
              <img src={carouselData[next].image} alt="Next" className="w-full h-auto object-contain" />
            </motion.div>

            {/* Current Active State */}
            <motion.div
              key={`current-${current}`}
              layoutId={`artwork-${current}`}
              className="absolute z-10 w-[70%] max-w-[420px] pointer-events-auto cursor-default relative"
              initial={{ opacity: 0, scale: 0.9, filter: 'brightness(1.5) blur(4px)' }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: 'brightness(1) blur(0px)',
                y: [0, -10, 0] // Idle floating effect
              }}
              exit={{ opacity: 0, scale: 1.1, filter: 'brightness(1.5) blur(4px)' }}
              transition={{ 
                duration: 0.7, 
                ease: [0.32, 0.72, 0, 1],
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Subtle shifting voxel particles during transition */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-csl-gold/40 border border-csl-gold/60 backdrop-blur-sm"
                    initial={{ 
                      x: (Math.random() - 0.5) * 100, 
                      y: (Math.random() - 0.5) * 100,
                      opacity: 1,
                      scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 40, 
                      y: (Math.random() - 0.5) * 40,
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 40}%`,
                      top: `${50 + (Math.random() - 0.5) * 40}%`,
                    }}
                  />
                ))}
              </motion.div>

              <img 
                src={carouselData[current].image} 
                alt={carouselData[current].title} 
                className="w-full h-auto object-contain drop-shadow-2xl" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls - Right */}
        <button 
          onClick={nextSlide}
          className="absolute right-0 z-20 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center hover:scale-105 transition-transform text-csl-text"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>

      {/* Info & Pagination */}
      <div className="flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
            data-distort="text"
          >
            <h3 className="text-3xl font-bold text-csl-blue mb-2 tracking-tight">
              {carouselData[current].title}
            </h3>
            <p className="text-csl-text font-bold text-sm mb-2">
              {carouselData[current].subtitle}
            </p>
            <p className="text-csl-muted text-sm font-medium mb-4 max-w-sm">
              {carouselData[current].description}
            </p>
          </motion.div>
        </AnimatePresence>



        {/* Thumbnails Row */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4 md:gap-6 mt-4 w-full">
          {carouselData.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 group ${
                idx === current ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80 scale-100 hover:scale-105'
              }`}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all" 
                />
              </div>
              <span className={`text-[10px] md:text-xs font-semibold text-center max-w-[60px] md:max-w-[80px] leading-tight ${
                idx === current ? 'text-csl-blue' : 'text-csl-muted'
              }`}>
                {item.title}
              </span>
              {idx === current && (
                <motion.div 
                  layoutId="active-thumbnail-indicator"
                  className="h-[2px] w-4 bg-csl-blue mt-1 rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
