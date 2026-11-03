import React from 'react';

export const CircleClipTransition: React.FC = () => {
  return (
    <section className="relative w-full bg-[#0E1017] text-white py-20 px-6 sm:px-8 border-b-4 border-black overflow-hidden select-none">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Dynamic Water Wave Doodle SVG */}
        <div className="w-full flex justify-center mb-8">
          <svg 
            className="w-full max-w-4xl h-14 sm:h-20 text-[#FFE600]" 
            viewBox="0 0 1000 100" 
            fill="none" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0 50 C 150 100, 300 0, 450 50 C 600 100, 750 0, 900 50 L 1000 50" 
              stroke="currentColor" 
              strokeWidth="6" 
              strokeLinecap="round" 
            />
          </svg>
        </div>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight leading-[0.9] mb-4">
          TANTI PROGETTI RIPIENI<br />
          <span className="text-[#FFE600]">DI LINEE E COLORI</span>
        </h2>

        <p className="font-par text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
          Dai brand internazionali alle grandi tele urbane, ogni progetto è un viaggio dentro l'errore che diventa armonia.
        </p>

      </div>
    </section>
  );
};
