import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const PageProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the raw scroll data for a fluid fill effect
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-8 left-8 z-[60] mix-blend-difference pointer-events-none">
      <svg width="24" height="24" viewBox="0 0 100 100" className="transform -rotate-90">
        {/* Background Track */}
        <circle 
          cx="50" 
          cy="50" 
          r="40" 
          stroke="white" 
          strokeWidth="12" 
          fill="none" 
          opacity="0.2" 
        />
        {/* Progress Fill */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="white"
          strokeWidth="12"
          fill="none"
          style={{ pathLength }}
          strokeLinecap="butt"
        />
      </svg>
    </div>
  );
};