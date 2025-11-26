import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TESTIMONIALS } from '../../constants';

const CountUp: React.FC<{ end: number; label: string }> = ({ end, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="text-center p-8 border-l border-heritage-gold/30">
      <div className="text-6xl md:text-8xl font-serif text-heritage-gold font-thin">
        {isInView ? <Counter to={end} /> : 0}
        <span className="text-4xl">+</span>
      </div>
      <p className="mt-4 text-sm uppercase tracking-widest text-heritage-800 dark:text-heritage-cream/70">{label}</p>
    </div>
  );
};

// Simple hook-based counter animation
const Counter = ({ to }: { to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  React.useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = { value: 0 };
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      node.textContent = Math.floor(progress * to).toLocaleString();
      if (progress < 1) window.requestAnimationFrame(step);
    };
    
    window.requestAnimationFrame(step);
  }, [to]);

  return <span ref={nodeRef} />;
};

export const Authority: React.FC = () => {
  return (
    <section id="authority" className="bg-heritage-800 text-heritage-cream py-32 overflow-hidden relative">
       {/* Years / Stats */}
       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-48 px-4">
         <CountUp end={15} label="Years of Expertise" />
         <CountUp end={4500} label="Assets Authenticated" />
         <CountUp end={120} label="Global Partners" />
       </div>

       {/* Award Spotlight */}
       <div className="relative max-w-7xl mx-auto px-4 mb-48">
         <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="aspect-[3/4] rounded-full overflow-hidden border border-heritage-gold/20 p-8 relative">
                  <div className="absolute inset-0 animate-spin-slow border-2 border-dashed border-heritage-gold/30 rounded-full"></div>
                  <img src="https://picsum.photos/id/450/600/800" alt="Award" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500" />
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
               <h3 className="text-heritage-gold uppercase tracking-widest font-sans text-sm">Industry Recognition</h3>
               <h2 className="text-5xl font-serif leading-tight">Heritage Excellence Award <br/><span className="italic text-white/50">2023 Recipient</span></h2>
               <p className="text-white/70 font-light leading-relaxed">
                 Recognized for outstanding contribution to the preservation of numismatic history and the ethical trading of cultural artifacts.
               </p>
            </div>
         </div>
       </div>

       {/* Automatic Marquee Testimonials */}
       <div className="py-24 bg-heritage-900 border-y border-heritage-gold/10 overflow-hidden">
         <div className="flex overflow-hidden relative">
            <motion.div 
              className="flex gap-24 min-w-max px-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 40, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="w-[400px] md:w-[600px] flex flex-col gap-6 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-6xl text-heritage-gold font-serif">"</span>
                  <p className="text-2xl md:text-3xl font-light font-serif leading-snug">{t}</p>
                </div>
              ))}
            </motion.div>
         </div>
       </div>
    </section>
  );
};