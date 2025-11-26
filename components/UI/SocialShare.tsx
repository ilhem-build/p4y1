import React, { useState } from 'react';
import { Share2, Link, MessageCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export const SocialShare: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleShare = () => setIsOpen(!isOpen);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsOpen(false);
  };

  const openSocial = (url: string) => {
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: 20, 
      scale: 0.8,
      filter: "blur(10px)",
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    show: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-row-reverse items-center gap-4">
      {/* Main Toggle Button - Styled like Music Icon (Gold) */}
      <button 
        onClick={toggleShare}
        className={`w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 group z-20 ${
          isOpen 
            ? 'bg-heritage-gold text-heritage-900 border-heritage-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
            : 'bg-heritage-gold/20 border border-heritage-gold/50 text-heritage-gold hover:bg-heritage-gold hover:text-heritage-900'
        }`}
        aria-label="Share"
      >
        <Share2 size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
      </button>

      {/* Pop-out Stack - Expanding Sideways (Left) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-row-reverse gap-3 pr-2"
          >
            {/* eBay Store - Primary Action */}
            <motion.button
              variants={itemVariants}
              onClick={() => openSocial('https://ebay.us/m/aQBIHm')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 text-white backdrop-blur-md hover:bg-white hover:text-[#e53238] transition-colors"
              title="Visit eBay Store"
            >
              <ShoppingBag size={20} />
            </motion.button>

            {/* WhatsApp */}
            <motion.button
              variants={itemVariants}
              onClick={() => openSocial('http://wa.me/919152231348')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 text-white backdrop-blur-md hover:bg-white hover:text-[#25d366] transition-colors"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};