import React, { useState, useRef } from 'react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed interaction required", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-40">
      <style>{`
        @keyframes visualize {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .visualizer-bar {
          width: 3px;
          background-color: currentColor;
          border-radius: 999px;
          animation: visualize 0.6s ease-in-out infinite;
        }
      `}</style>

      <audio ref={audioRef} loop>
        {/* 
          CUSTOMIZATION INSTRUCTIONS:
          1. Place your audio file in the 'public/media' folder.
          2. Name it 'ambient.mp3' (or update the src below).
        */}
        <source src="/media/ambient.mp3" type="audio/mpeg" />
        {/* Fallback online track if local file is missing */}
        <source src="https://res.cloudinary.com/dhpqnaqgd/video/upload/v1764060590/main_jwb7wi.mp3" type="audio/mpeg" />
      </audio>
      
      <button 
        onClick={toggleAudio}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-heritage-gold/20 backdrop-blur-md border border-heritage-gold/50 text-heritage-gold hover:bg-heritage-gold hover:text-heritage-900 transition-all duration-300 group"
        data-hoverable="true"
        aria-label={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
      >
        <div className="flex items-center gap-[3px] h-4">
          <div 
            className={`w-[3px] bg-current rounded-full transition-all duration-300 ${isPlaying ? 'visualizer-bar' : 'h-[3px]'}`}
            style={{ animationDelay: '0s' }} 
          />
          <div 
            className={`w-[3px] bg-current rounded-full transition-all duration-300 ${isPlaying ? 'visualizer-bar' : 'h-[3px]'}`}
            style={{ animationDelay: '0.2s' }} 
          />
          <div 
            className={`w-[3px] bg-current rounded-full transition-all duration-300 ${isPlaying ? 'visualizer-bar' : 'h-[3px]'}`}
            style={{ animationDelay: '0.4s' }} 
          />
        </div>
      </button>
    </div>
  );
};