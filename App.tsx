import React, { useState, useEffect } from 'react';
import { Cursor } from './components/UI/Cursor';
import { AudioPlayer } from './components/UI/AudioPlayer';
import { Navigation } from './components/UI/Navigation';
import { PageProgress } from './components/UI/PageProgress';
import { SocialShare } from './components/UI/SocialShare';
import { Hero } from './components/Sections/Hero';
import { Timeline } from './components/Sections/Timeline';
import { Authority } from './components/Sections/Authority';
import { ServicesContact } from './components/Sections/ServicesContact';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [textSize, setTextSize] = useState(100); // Percentage

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Apply text size scaling to root element
  useEffect(() => {
    document.documentElement.style.fontSize = `${textSize}%`;
  }, [textSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  const increaseTextSize = () => setTextSize(prev => Math.min(prev + 10, 130)); // Max 130%
  const decreaseTextSize = () => setTextSize(prev => Math.max(prev - 10, 80));  // Min 80%

  return (
    <div className={`min-h-screen w-full relative`}>
      {/* Film Grain Overlay */}
      <div className="grain"></div>
      
      <Cursor />
      <PageProgress />
      
      <Navigation 
        theme={theme} 
        toggleTheme={toggleTheme}
        onTextIncrease={increaseTextSize}
        onTextDecrease={decreaseTextSize}
      />
      
      <AudioPlayer />
      <SocialShare />
      
      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Authority />
        <ServicesContact />
      </main>
    </div>
  );
}

export default App;