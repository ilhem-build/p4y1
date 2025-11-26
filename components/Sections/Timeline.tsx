import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { TIMELINE_DATA } from '../../constants';
import { TimelineItem } from '../../types';

const TimelineNode: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const scale = useTransform(progress, [0, 0.5, 1], [0.5, 1.5, 0.5]);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const glow = useTransform(progress, [0, 0.5, 1], ["0px 0px 0px rgba(212, 175, 55, 0)", "0px 0px 20px rgba(212, 175, 55, 0.8)", "0px 0px 0px rgba(212, 175, 55, 0)"]);

  return (
    <motion.div 
      style={{ scale, opacity, boxShadow: glow }}
      className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-heritage-gold rounded-full z-20"
    />
  );
};

const TimelineCard: React.FC<{ item: TimelineItem; index: number; progress: MotionValue<number> }> = ({ item, index, progress }) => {
  // Parallax offsets: Text moves differently than image for depth
  const isLeft = index % 2 === 0;
  
  const yOffsetImage = useTransform(progress, [0, 1], [50, -50]);
  const yOffsetText = useTransform(progress, [0, 1], [0, -20]);
  
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const xOffset = useTransform(progress, [0, 0.2, 0.8, 1], 
    isLeft ? [-50, 0, 0, -50] : [50, 0, 0, 50]
  );

  return (
    <div className="relative w-full mb-48 flex justify-center items-center">
      {/* Node on central line */}
      <TimelineNode progress={progress} />

      <div className={`flex w-full max-w-6xl items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8 md:gap-24 px-4`}>
        
        {/* Content Side */}
        <motion.div 
          style={{ opacity, x: xOffset, y: yOffsetText }}
          className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}
        >
           <h3 className="text-6xl md:text-8xl font-serif text-heritage-gold/10 font-bold absolute -z-10 select-none transform translate-y-[-50%]">
             {item.year}
           </h3>
           <span className="text-heritage-gold font-sans text-xs tracking-[0.3em] uppercase block mb-4">
             {item.category}
           </span>
           <h2 className="text-3xl md:text-5xl text-heritage-800 dark:text-heritage-cream font-serif mb-6">
             {item.title}
           </h2>
           <p className="text-heritage-800/70 dark:text-heritage-cream/70 font-sans leading-relaxed text-lg">
             {item.description}
           </p>
        </motion.div>

        {/* Image Side */}
        <motion.div 
          style={{ opacity, y: yOffsetImage }}
          className="flex-1 hidden md:block"
        >
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl group border border-heritage-gold/10">
            <img 
              src={item.image} 
              alt={item.title} 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
            />
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="journey" ref={containerRef} className="relative py-32 bg-heritage-cream dark:bg-heritage-900 transition-colors duration-700 overflow-hidden">
      
      {/* Central Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-heritage-gold/30 to-transparent -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32 z-20">
           <p className="text-sm font-sans uppercase tracking-widest mb-2 text-heritage-gold">The Journey</p>
           <h2 className="text-4xl md:text-6xl font-serif text-heritage-800 dark:text-heritage-cream">A Decade of Curation</h2>
        </div>

        {TIMELINE_DATA.map((item, index) => (
           <TimelineCardWrapper key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

// Wrapper to isolate scroll progress for each card
const TimelineCardWrapper: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={ref}>
      <TimelineCard item={item} index={index} progress={scrollYProgress} />
    </div>
  );
};