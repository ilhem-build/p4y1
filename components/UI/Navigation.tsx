import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Plus, Minus } from 'lucide-react';
import { Theme } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  theme: Theme;
  toggleTheme: () => void;
  onTextIncrease: () => void;
  onTextDecrease: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme, onTextIncrease, onTextDecrease }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#home' },
    { name: 'Journey', href: '#journey' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-8 right-8 z-[60] flex flex-col gap-4 items-end mix-blend-difference text-white">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm pointer-events-auto cursor-pointer"
          data-hoverable="true"
          aria-label="Toggle Theme"
        >
          {theme === Theme.DARK ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Menu Trigger */}
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm group pointer-events-auto cursor-pointer"
          data-hoverable="true"
          aria-label="Open Menu"
        >
          <Menu size={20} className="group-hover:rotate-90 transition-transform duration-300"/>
        </button>

        {/* Text Size Controls (Moved Below Menu) */}
        <button 
          onClick={onTextIncrease}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm pointer-events-auto cursor-pointer"
          data-hoverable="true"
          aria-label="Increase Text Size"
        >
          <Plus size={20} />
        </button>

        <button 
          onClick={onTextDecrease}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm pointer-events-auto cursor-pointer"
          data-hoverable="true"
          aria-label="Decrease Text Size"
        >
          <Minus size={20} />
        </button>
        
        {/* Vertical Line Indicator */}
        <div className="w-[1px] h-24 bg-white/20 mx-auto mr-[23px]"></div>
      </nav>

      {/* Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-3/4 md:w-1/4 bg-heritage-900 border-l border-heritage-gold/20 z-[80] p-8 md:p-12 flex flex-col justify-between"
            >
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-heritage-cream hover:text-heritage-gold transition-colors"
                  data-hoverable="true"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-4xl md:text-5xl font-serif text-heritage-cream hover:text-heritage-gold hover:pl-4 transition-all duration-300"
                    data-hoverable="true"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="text-heritage-cream/40 text-sm font-sans uppercase tracking-widest">
                <p>Est. 2009</p>
                <p>Philadelphia / Global</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};