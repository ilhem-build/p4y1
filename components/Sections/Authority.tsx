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
      <p className="mt-4 text-sm uppercase tracking-widest text-heritage-cream/70">{label}</p>
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
         <CountUp end={120} label="GLOBAL CLIENTELE" />
       </div>

{/* MISSION / MOTIVATION SECTION (Replaces Award) */}
       <div className="relative max-w-7xl mx-auto px-4 mb-64"> {/* Added extra bottom margin for spacing */}
         <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               {/* Image Container - Using a serene landscape or community vibe if available, otherwise keeping the aesthetic placeholder */}
               <div className="aspect-[3/4] rounded-full overflow-hidden border border-heritage-gold/20 p-8 relative">
                  <div className="absolute inset-0 animate-spin-slow border-2 border-dashed border-heritage-gold/30 rounded-full"></div>
                  {/* You can update this image link to something representing community/nature/hope */}
                  <img src="https://res.cloudinary.com/dhpqnaqgd/image/upload/v1764104378/dome.jpg" alt="Our Motivation" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500" />
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
               <h3 className="text-heritage-gold uppercase tracking-widest font-sans text-sm">Our Driving Force</h3>
               <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                 Empowered by Purpose <br/>
                 <span className="italic text-white/50 text-3xl">Beyond the Collection</span>
               </h2>
               <div className="w-24 h-[1px] bg-heritage-gold/50"></div>
               <p className="text-white/80 font-light leading-relaxed text-lg">
                 We started this journey with a vision that extends far beyond artifacts. We believe that true abundance is measured by what we give back. 
               </p>
               <p className="text-white/70 font-light leading-relaxed">
                 This commitment is our ultimate goal. Our success will be used to fuel humanitarian efforts: supporting orphans and children displaced by conflict, funding essential infrastructure like wells and community centers, and contributing to charity where the need is greatest. We strive for knowledge and influence not for their own sake, but to gain the strength to uplift others in their time of need. This is the legacy we are building.
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
            duration: 110, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="w-[400px] md:w-[600px] flex flex-col gap-6 opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-6xl text-heritage-gold font-serif">"</span>
              <p className="text-2xl md:text-3xl font-light font-serif leading-snug">{t.text}</p>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-[1px] w-8 bg-heritage-gold/50"></div>
                 <p className="text-xs font-sans uppercase tracking-widest text-heritage-gold/80">{t.author}</p>
              </div>
            </div>
          ))}
        </motion.div>
     </div>
   </div>
</section>
  );
};