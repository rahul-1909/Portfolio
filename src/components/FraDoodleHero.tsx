import React, { useState } from 'react';
import { FraPhysicsWorld } from './FraPhysicsWorld';
import { FraShowreelModal } from './FraShowreelModal';

export const FraDoodleHero: React.FC = () => {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMoveBadge = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 24, y: -y * 24 });
  };

  const handleMouseLeaveBadge = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-white text-black pt-28 pb-16 sm:pt-36 sm:pb-24 border-b-4 border-black overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Background Matter.js Physics Engine with 36 Authentic Fra Doodle Objects */}
      <FraPhysicsWorld />

      {/* Top Banner Notice */}
      <div className="relative z-20 text-center mb-4">
        <span className="font-par text-[11px] sm:text-xs text-gray-500 uppercase tracking-widest bg-white/80 px-4 py-1 rounded-full border border-black/10">
          Per una migliore esperienza si consiglia di utilizzare Chrome o Firefox
        </span>
      </div>

      {/* 2. Floating Parallax Doodle Elements (Clouds, Rocket, Omino) */}
      <div className="hidden lg:block absolute top-28 left-8 pointer-events-none z-10 animate-float">
        <img 
          src="/images/fra/cloud-yellow.svg" 
          alt="Cloud" 
          className="w-24 h-auto drop-shadow-[2px_2px_0px_#000]" 
        />
      </div>

      <div className="hidden lg:block absolute top-36 right-12 pointer-events-none z-10 animate-float-reverse">
        <img 
          src="/images/fra/rocket.svg" 
          alt="Rocket" 
          className="w-20 h-auto drop-shadow-[2px_2px_0px_#000]" 
        />
      </div>

      <div className="hidden md:block absolute bottom-36 left-12 pointer-events-none z-10 animate-wobble">
        <img 
          src="/images/fra/cloud-smile.svg" 
          alt="Cloud Smile" 
          className="w-20 h-auto drop-shadow-[2px_2px_0px_#000]" 
        />
      </div>

      {/* 3. Main Center Content (Fra display title + floating interactive showreel button) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center pointer-events-none my-auto">
        
        {/* Floating 3D Tilting Showreel Badge (layer-btn) */}
        <div className="inline-block mb-6 pointer-events-auto">
          <div
            onMouseMove={handleMouseMoveBadge}
            onMouseLeave={handleMouseLeaveBadge}
            onClick={() => setShowreelOpen(true)}
            style={{
              transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="group cursor-pointer relative inline-flex items-center justify-center p-2 hover:scale-105 transition-transform"
            title="Guarda lo showreel"
          >
            <img 
              src="/images/fra/btn-showreel.png" 
              alt="Showreel button" 
              className="w-28 sm:w-32 h-auto drop-shadow-[4px_4px_0px_#000]" 
            />
            <img 
              src="/images/fra/btn-showreel-face.png" 
              alt="Showreel face" 
              className="absolute inset-0 m-auto w-12 sm:w-14 h-auto group-hover:rotate-12 transition-transform" 
            />
          </div>
        </div>

        {/* Massive Authentic Display Headline */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-black uppercase leading-[0.88] tracking-tight mb-4">
          BENVENUT* NELLA<br />
          <span className="relative inline-block text-black">
            DOODLE ART
            {/* Hand-Drawn Yellow Marker Underline Doodle */}
            <svg 
              className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-4 sm:h-7 text-[#FFE600] pointer-events-none -z-10" 
              viewBox="0 0 400 20" 
              fill="none" 
              preserveAspectRatio="none"
            >
              <path 
                d="M5 12C80 4 200 18 395 8" 
                stroke="currentColor" 
                strokeWidth="14" 
                strokeLinecap="round" 
              />
            </svg>
          </span><br />
          DI FRA!
        </h1>

        {/* Subtitle with Playful Parenthesis */}
        <div className="mt-4 pointer-events-auto">
          <button
            onClick={() => scrollTo('intro')}
            className="font-par text-base sm:text-xl font-bold uppercase tracking-widest text-black/80 hover:text-black hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>(SCROLLA)</span>
            <span className="animate-bounce">↓</span>
          </button>
        </div>

      </div>

      {/* Bottom Physics Prompt */}
      <div className="relative z-20 flex justify-center pointer-events-none">
        <span className="font-mono text-[11px] font-bold text-gray-500 bg-white/90 px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_#000]">
          ✦ Afferra e lancia i 36 doodle con il mouse!
        </span>
      </div>

      {/* Showreel Lightbox Modal */}
      <FraShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />
    </section>
  );
};
