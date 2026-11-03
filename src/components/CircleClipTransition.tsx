import React from 'react';

export const CircleClipTransition: React.FC = () => {
  return (
    <div className="relative w-full bg-[#0C0E15] overflow-hidden py-12 select-none">
      {/* Hand-Drawn Water / Wave Divider Pattern (Inspired by Fra's water-bg) */}
      <div className="w-full flex justify-center items-center overflow-hidden">
        <svg 
          className="w-full max-w-7xl h-16 sm:h-24 text-white" 
          viewBox="0 0 1200 120" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0 60 C 150 120, 300 0, 450 60 C 600 120, 750 0, 900 60 C 1050 120, 1150 20, 1200 60" 
            stroke="#FFE600" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />
          <path 
            d="M0 80 C 150 140, 300 20, 450 80 C 600 140, 750 20, 900 80 C 1050 140, 1150 40, 1200 80" 
            stroke="#FFFFFF" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeDasharray="12 12"
          />
        </svg>
      </div>

      <div className="text-center pt-4">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFE600] px-4 py-1 border border-[#FFE600]/40 rounded-full inline-block bg-black/40">
          ✦ Transitioning into Selected Production Works ✦
        </span>
      </div>
    </div>
  );
};
