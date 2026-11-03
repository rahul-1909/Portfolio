import React, { useState } from 'react';
import { 
  FolderGit2, 
  FileText, 
  Send, 
  Sparkles,
  ArrowDown,
  Play
} from 'lucide-react';
import { 
  SiPython, 
  SiGo, 
  SiFastapi, 
  SiSpringboot, 
  SiDocker, 
  SiPostgresql, 
  SiRedis 
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { FraPhysicsWorld } from './FraPhysicsWorld';
import { FraShowreelModal } from './FraShowreelModal';

interface FraDoodleHeroProps {
  onOpenResume: () => void;
}

export const FraDoodleHero: React.FC<FraDoodleHeroProps> = ({ onOpenResume }) => {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMoveBadge = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeaveBadge = () => {
    setTilt({ x: 0, y: 0 });
  };

  const stack = [
    { name: 'Python', icon: SiPython, note: 'Async / ASGI' },
    { name: 'Go Lang', icon: SiGo, note: 'Concurrency' },
    { name: 'Java', icon: FaJava, note: 'Enterprise' },
    { name: 'FastAPI', icon: SiFastapi, note: 'Microservices' },
    { name: 'Spring Boot 3.5', icon: SiSpringboot, note: 'JWT / RBAC' },
    { name: 'AWS Cloud', icon: FaAws, note: 'Cloud Arch' },
    { name: 'Docker', icon: SiDocker, note: 'Containers' },
    { name: 'PostgreSQL', icon: SiPostgresql, note: 'SQL & Index' },
    { name: 'Redis', icon: SiRedis, note: 'Cache & PubSub' },
  ];

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[92vh] bg-white text-black pt-24 pb-20 sm:pt-32 sm:pb-28 border-b-4 border-black overflow-hidden notebook-paper flex flex-col justify-between"
    >
      {/* 1. Background Matter.js Interactive 2D Physics Canvas */}
      <FraPhysicsWorld />

      {/* 2. Floating Animated Vector Doodles (Left & Right) */}
      
      {/* Smiling Cloud (Top Left) */}
      <div className="hidden xl:block absolute top-28 left-8 pointer-events-none z-10 animate-float">
        <svg width="105" height="75" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M25 55C15 55 8 48 8 38C8 28 16 22 25 22C27 12 37 5 48 5C60 5 70 12 73 22C82 22 92 28 92 38C92 48 84 55 75 55Z" 
            fill="#FFE600" 
            stroke="#000000" 
            strokeWidth="3.5" 
            strokeLinejoin="round"
          />
          <circle cx="38" cy="32" r="4" fill="#000000" />
          <circle cx="58" cy="32" r="4" fill="#000000" />
          <path d="M43 40C46 45 50 45 53 40" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
        <div className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_#000] -rotate-6 inline-block mt-1">
          hello world!
        </div>
      </div>

      {/* Flying Rocket with Smoke (Top Right) */}
      <div className="hidden xl:block absolute top-24 right-10 pointer-events-none z-10 animate-float-reverse">
        <svg width="90" height="90" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 10C55 20 60 40 50 60L35 45C30 35 35 20 45 10Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3.5" />
          <path d="M35 45L20 52L28 38Z" fill="#38BDF8" stroke="#000000" strokeWidth="3" />
          <path d="M50 60L57 75L43 67Z" fill="#38BDF8" stroke="#000000" strokeWidth="3" />
          <circle cx="43" cy="33" r="5" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
          <path d="M32 58C28 68 22 72 26 76C30 80 34 74 44 70Z" fill="#EF4444" stroke="#000000" strokeWidth="2.5" />
        </svg>
        <div className="font-mono text-[10px] font-bold bg-yellow-200 px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_#000] rotate-3 inline-block">
          sub-14ms
        </div>
      </div>

      {/* 3. Main Hero Content Area */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center pointer-events-none">
        
        {/* Floating Tilting Interactive Showreel Badge (Inspired by Fra's layer-btn) */}
        <div className="inline-block mb-6 pointer-events-auto">
          <div
            onMouseMove={handleMouseMoveBadge}
            onMouseLeave={handleMouseLeaveBadge}
            onClick={() => setShowreelOpen(true)}
            style={{
              transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="group cursor-pointer flex items-center gap-2.5 px-4 py-2 bg-white border-3 border-black rounded-full shadow-[4px_4px_0px_#000] hover:bg-[#FFE600] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={12} className="fill-white ml-0.5" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
              System Showreel · Live Benchmarks
            </span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
        </div>

        {/* Massive Fra-Style Display Headline */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE600] border-2 border-black rounded-md text-xs font-mono font-bold shadow-[2px_2px_0px_#000] -rotate-1">
            <Sparkles size={13} />
            <span>BACKEND & AI ARCHITECT</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-black uppercase leading-[0.9]">
            WELCOME TO THE<br />
            <span className="relative inline-block text-black">
              DOODLE UNIVERSE
              {/* Hand-Drawn Yellow Marker Underline Doodle */}
              <svg 
                className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-4 sm:h-6 text-[#FFE600] pointer-events-none -z-10" 
                viewBox="0 0 400 20" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M5 12C80 4 200 18 395 8" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                />
              </svg>
            </span><br />
            OF RAHUL!
          </h1>
        </div>

        {/* Narrative Subtitle with Playful Parenthesis */}
        <p className="max-w-2xl mx-auto font-mono text-sm sm:text-base text-gray-800 leading-relaxed mb-8">
          Building high-throughput <strong className="bg-[#FFE600] px-1 border border-black">ASGI microservices</strong>, distributed lock systems, and autonomous <strong className="bg-yellow-200 px-1 border border-black">LangGraph multi-agent RAG</strong> engines from Hyderabad, India.
          <span className="block text-xs text-gray-600 mt-1 font-semibold">
            (SCROLL DOWN TO EXPLORE · TOSS THE PHYSICS STICKERS)
          </span>
        </p>

        {/* Action Buttons (Comic 3D Style) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 pointer-events-auto">
          <button
            onClick={() => scrollTo('projects')}
            className="flex items-center gap-2 px-6 py-3.5 bg-black text-white font-mono text-sm font-bold rounded-xl border-3 border-black shadow-[4px_4px_0px_#FFE600] hover:bg-[#FFE600] hover:text-black hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <FolderGit2 size={16} />
            <span>Selected Works</span>
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 px-6 py-3.5 bg-white text-black font-mono text-sm font-bold rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-yellow-50 hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <Send size={16} />
            <span>Say Hello</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#FFE600] text-black font-mono text-sm font-bold rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] hover:bg-yellow-400 hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <FileText size={16} />
            <span>Verified Resume</span>
          </button>
        </div>

        {/* Tech Stack Sticker Ribbon */}
        <div className="pt-2 pointer-events-auto">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center justify-center gap-2">
            <span>Primary Core Technologies</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span className="text-black font-bold">100% Production Ready</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {stack.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.name}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#000] hover:bg-[#FFE600] transition-all cursor-default"
                >
                  <Icon size={14} className="text-black shrink-0" />
                  <span className="font-mono text-xs font-bold text-black">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Subtle Scroll Down Prompt at Base */}
      <div className="relative z-20 flex justify-center mt-8 pointer-events-none">
        <button 
          onClick={() => scrollTo('about')} 
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 bg-white/90 border border-black rounded-full text-[11px] font-mono text-black hover:bg-[#FFE600] transition-colors shadow-[2px_2px_0px_#000]"
        >
          <span>Scroll down for story</span>
          <ArrowDown size={12} className="animate-bounce" />
        </button>
      </div>

      {/* Showreel Modal */}
      <FraShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        onOpenProjects={() => scrollTo('projects')}
      />
    </section>
  );
};
