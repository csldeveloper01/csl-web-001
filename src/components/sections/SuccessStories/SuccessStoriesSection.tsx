import { Calendar, Quote } from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';

// @ts-expect-error
import imgArshath from '../../../../Elements/SUCCESS STORIES/Arshath.png';
// @ts-expect-error
import imgEzhil from '../../../../Elements/SUCCESS STORIES/Ezhil Moli.png';
// @ts-expect-error
import imgAfshan from '../../../../Elements/SUCCESS STORIES/Afshan.png';
// @ts-expect-error
import imgManniyan from '../../../../Elements/SUCCESS STORIES/Manniyan.jpg';
// @ts-expect-error
import imgRohit from '../../../../Elements/SUCCESS STORIES/rohit.jpg';
// @ts-expect-error
import imgSupriya from '../../../../Elements/SUCCESS STORIES/supriya.png';
// @ts-expect-error
import imgAyeesha from '../../../../Elements/SUCCESS STORIES/Ayesha.jpg';

const successStories = [
  {
    name: 'Arshath',
    role: 'Software Engineer',
    package: '3 LPA',
    achievement: 'Career growth achieved',
    timeline: 'Placed in 4 months',
    image: imgArshath,
  },
  {
    name: 'Ezhil Moli',
    role: 'Content Writer',
    package: '3 LPA',
    achievement: 'Career growth achieved',
    timeline: 'Placed in 1 month',
    image: imgEzhil,
  },
  {
    name: 'Afshan',
    role: 'Python Developer',
    package: '3 LPA',
    achievement: 'Career transformation',
    timeline: 'Placed in 3 months',
    image: imgAfshan,
  },
  {
    name: 'Manniyan',
    role: 'Software Engineer',
    package: '3 LPA',
    achievement: 'Career growth achieved',
    timeline: 'Placed in 5 months',
    image: imgManniyan,
  },
  {
    name: 'Rohit',
    role: 'Software Engineer',
    package: '6 LPA',
    achievement: 'Secured top package',
    timeline: 'Placed in 6 months',
    image: imgRohit,
  },
  {
    name: 'Supriya',
    role: 'Designer',
    package: '3 LPA',
    achievement: 'Career growth achieved',
    timeline: 'Placed in 3 months',
    image: imgSupriya,
  },
  {
    name: 'Ayeesha',
    role: 'Cloud Engineer',
    package: '6 LPA',
    achievement: 'Secured top package',
    timeline: 'Placed in 5 months',
    image: imgAyeesha,
  },
];

export function SuccessStoriesSection() {
  const yellowBlocks = [
    { size: 'w-14 h-14', pos: 'top-[14%] right-[14%]', delay: 0.5, duration: 7.5 },
    { size: 'w-8 h-8', pos: 'top-[22%] left-[46%]', delay: 1.2, duration: 6 },
    { size: 'w-10 h-10', pos: 'bottom-[20%] left-[8%]', delay: 0.8, duration: 7 },
    { size: 'w-16 h-16', pos: 'bottom-[12%] right-[10%]', delay: 1.8, duration: 8.5 },
    { size: 'w-12 h-12', pos: 'top-[28%] right-[5%]', delay: 0.4, duration: 8 },
  ];

  return (
    <section 
      className="relative w-full py-10 md:py-16 flex flex-col items-center justify-center bg-csl-bg overflow-hidden mx-auto"
    >
      {/* Decorative Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Decorative Floating Yellow Blocks */}
      <div className="absolute inset-0 pointer-events-none z-10 2xl:max-w-[1600px] 2xl:mx-auto">
        {yellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-start">
        
        {/* Header Block */}
        <div className="mb-8 lg:mb-10 w-full">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
              Success Stories
            </span>
            <div className="h-[2px] w-8 bg-csl-gold/60"></div>
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-[3.2rem] font-extrabold text-csl-text tracking-tight leading-[1.08] mb-4" 
            data-distort="text"
          >
            Our <br />
            <span className="text-csl-blue">Success Stories</span>
          </h2>
          <p className="text-csl-muted font-medium text-xs md:text-sm leading-relaxed max-w-lg">
            Real people. Real journeys. Real success. <br />
            Here are some of our learners who transformed their careers with the right skills and guidance.
          </p>
        </div>

        {/* 7 Student Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 w-full">
          {successStories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm border border-csl-gold/25 rounded-3xl p-6 shadow-sm hover:border-csl-gold/50 hover:shadow-lg hover:shadow-csl-gold/10 transition-all duration-300 flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Top Row: Avatar + Info + Quote Icon */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  {/* Avatar */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-csl-gold/35 overflow-hidden shrink-0 shadow-sm bg-csl-bg">
                    <img 
                      src={story.image} 
                      alt={story.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Name, Role & Package */}
                  <div className="flex flex-col flex-1 pl-1">
                    <h3 className="text-base sm:text-lg font-bold text-csl-blue tracking-tight leading-snug">
                      {story.name}
                    </h3>
                    <span className="text-xs font-semibold text-csl-muted mb-1 leading-tight">
                      {story.role}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-csl-blue tracking-tight">
                        {story.package.split(' ')[0]}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-csl-blue">
                        {story.package.split(' ')[1]}
                      </span>
                    </div>
                  </div>

                  {/* Gold Quote Icon */}
                  <div className="text-csl-gold/60 shrink-0">
                    <Quote className="w-5 h-5 fill-csl-gold/30 stroke-[1.5]" />
                  </div>
                </div>

                {/* Subtle Gold Accent Divider */}
                <div className="w-12 h-[2px] bg-csl-gold/40 mx-auto my-3 rounded-full"></div>
              </div>

              {/* Bottom Row: Achievement & Timeline Badge */}
              <div className="flex flex-col items-center text-center mt-1">
                <span className="text-xs font-semibold text-csl-text mb-2">
                  {story.achievement}
                </span>
                <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-medium text-csl-muted">
                  <Calendar className="w-3.5 h-3.5 text-csl-muted/80" />
                  <span>{story.timeline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
