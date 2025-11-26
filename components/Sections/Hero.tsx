import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ParticleLogo } from '../UI/ParticleLogo';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // --- Mouse Interaction for 3D Tilt Container ---
  // We keep this to tilt the ENTIRE particle canvas plane for extra depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Convert mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [15, -15]); 
  const rotateY = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // --- Animation Phases ---
  
  // Logo Specific Dynamics - Exit on Scroll
  const logoExitY = useTransform(scrollYProgress, [0.6, 1], [0, -300]);
  const logoSpringY = useSpring(logoExitY, { 
    stiffness: 120,
    damping: 25,
    mass: 1.5 
  });
  const logoExitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div id="home" ref={containerRef} className="h-[150vh] relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000">
        
        {/* Main Brand Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 perspective-1000 w-full h-full"
        >
          {/* Interactive Particle Logo Container */}
          {/* 
            UPDATED: Wrapper is now absolute full screen to allow the 
            ParticleLogo canvas to cover everything. 
          */}
          <motion.div 
             style={{ 
               y: logoSpringY, 
               opacity: logoExitOpacity,
               rotateX: rotateX,
               rotateY: rotateY,
               transformStyle: "preserve-3d"
             }}
             className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          >
             <ParticleLogo />
          </motion.div>

          {/* Brand Name - Positioned relative to sit nicely with the logo */}
          {/* Customization: Increased padding to 30vh to push text down clear of the 25% logo anchor */}
          <div className="mb-6 overflow-hidden pointer-events-none pt-[25vh]">
             <motion.h1 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
               className="text-6xl md:text-9xl font-serif font-bold text-heritage-gold tracking-widest uppercase drop-shadow-2xl"
             >
              Phila4You
            </motion.h1>
          </div>

          {/* Heritage details */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center gap-4 pointer-events-none"
          >
            <p className="text-xl md:text-2xl font-sans font-light tracking-[0.5em] text-heritage-800 dark:text-heritage-cream/80">
              EST. 2009
            </p>
            
            {/* Divider Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: 96 }} // 24 * 4 = 96px
              transition={{ duration: 1, delay: 1 }}
              className="w-[1px] bg-gradient-to-b from-heritage-gold to-transparent mt-8"
            ></motion.div>
          </motion.div>

        </motion.div>
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-heritage-cream dark:to-heritage-900 opacity-80 pointer-events-none"></div>
      </div>
    </div>
  );
};