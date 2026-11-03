import React from 'react';
import { 
  FolderGit2, 
  FileText, 
  Send, 
  Terminal, 
  Sparkles,
  ArrowDown
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

interface FraDoodleHeroProps {
  onOpenResume: () => void;
}

export const FraDoodleHero: React.FC<FraDoodleHeroProps> = ({ onOpenResume }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
      className="relative w-full bg-white text-black pt-28 pb-20 sm:pt-36 sm:pb-28 border-b-2 border-black overflow-hidden notebook-paper"
    >
      {/* Floating Animated Doodle Elements (Inspired by fradesign.it) */}
      
      {/* Doodle Element 1: Smiling Cloud with Eyes (Top Left) */}
      <div className="hidden lg:block absolute top-28 left-8 sm:left-14 pointer-events-none z-10 animate-float">
        <svg width="100" height="70" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud Outline */}
          <path 
            d="M25 55C15 55 8 48 8 38C8 28 16 22 25 22C27 12 37 5 48 5C60 5 70 12 73 22C82 22 92 28 92 38C92 48 84 55 75 55Z" 
            fill="#FFE600" 
            stroke="#000000" 
            strokeWidth="3" 
            strokeLinejoin="round"
          />
          {/* Eyes */}
          <circle cx="38" cy="32" r="3.5" fill="#000000" />
          <circle cx="58" cy="32" r="3.5" fill="#000000" />
          {/* Smile */}
          <path d="M43 40C46 44 50 44 53 40" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 border border-black rounded shadow-[2px_2px_0px_#000] -rotate-6 inline-block mt-1">
          hello world!
        </span>
      </div>

      {/* Doodle Element 2: Rocket with Smoke (Top Right) */}
      <div className="hidden lg:block absolute top-24 right-10 sm:right-16 pointer-events-none z-10 animate-float-reverse">
        <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rocket Body */}
          <path d="M45 10C55 20 60 40 50 60L35 45C30 35 35 20 45 10Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
          {/* Fin 1 */}
          <path d="M35 45L20 52L28 38Z" fill="#38BDF8" stroke="#000000" strokeWidth="3" />
          {/* Fin 2 */}
          <path d="M50 60L57 75L43 67Z" fill="#38BDF8" stroke="#000000" strokeWidth="3" />
          {/* Window */}
          <circle cx="43" cy="33" r="5" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
          {/* Fire Flame */}
          <path d="M32 58C28 68 22 72 26 76C30 80 34 74 44 70Z" fill="#EF4444" stroke="#000000" strokeWidth="2" />
        </svg>
        <span className="font-mono text-[10px] font-bold bg-yellow-200 px-2 py-0.5 border border-black rounded shadow-[2px_2px_0px_#000] rotate-3 inline-block">
          sub-14ms
        </span>
      </div>

      {/* Doodle Element 3: Little Lightbulb (Bottom Left) */}
      <div className="hidden md:block absolute bottom-28 left-10 pointer-events-none z-10 animate-wobble">
        <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="28" r="20" fill="#FFE600" stroke="#000000" strokeWidth="3" />
          <path d="M22 45H38V54H22V45Z" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
          <line x1="25" y1="59" x2="35" y2="59" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          {/* Rays */}
          <line x1="30" y1="3" x2="30" y2="7" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="28" x2="4" y2="28" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <line x1="52" y1="28" x2="56" y2="28" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="content-wrapper max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Playful Top Marquee / Sticker Tag */}
        <div className="w-fit mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] border-2 border-black doodle-box-sm font-mono text-xs font-[1000] uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] rotate-[-1deg]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>WELCOME TO THE DOODLE LAB OF RAHUL!</span>
          </div>
        </div>

        {/* Center Canvas Headline & Intro */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Massive Display Title (Fra style) */}
          <div className="relative inline-block mb-3">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-[1000] tracking-tight text-black uppercase leading-[0.95] select-none">
              Rahul Teja
            </h1>
            
            {/* Custom SVG Sketchy Scribble Underline */}
            <svg 
              className="w-full h-4 sm:h-7 text-[#FFE600] mt-1" 
              viewBox="0 0 500 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M4 18C80 4 180 22 280 10C360 -2 420 20 496 12" 
                stroke="#000000" 
                strokeWidth="5" 
                strokeLinecap="round" 
              />
              <path 
                d="M20 20C90 7 190 23 290 12C370 2 430 21 480 15" 
                stroke="#FFE600" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          {/* Subtitle Badge */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="px-3.5 py-1 bg-black text-white font-mono text-xs sm:text-sm font-[1000] uppercase tracking-wider rounded-md">
              Software Developer
            </span>
            <span className="px-3.5 py-1 bg-white border-2 border-black font-mono text-xs sm:text-sm font-[1000] uppercase tracking-wider doodle-box-sm shadow-[2px_2px_0px_#000]">
              Backend & AI Systems
            </span>
          </div>

          {/* Comic Dialogue Speech Bubble */}
          <div className="mt-7 max-w-2xl mx-auto relative">
            <div className="p-5 sm:p-6 bg-white border-2 border-black doodle-box shadow-[5px_6px_0px_0px_#000]">
              <p className="text-base sm:text-lg text-black font-semibold leading-relaxed">
                "I craft high-throughput <span className="bg-[#FFE600] px-1.5 py-0.5 rounded border border-black">ASGI microservices</span>, robust distributed systems, and autonomous <span className="bg-sky-200 px-1.5 py-0.5 rounded border border-black">multi-agent RAG pipelines</span>."
              </p>
            </div>
            {/* Speech Bubble Arrow */}
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-black mx-auto" />
          </div>

          {/* Playful Interactive Doodle Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 bg-black text-white font-mono text-xs sm:text-sm font-[1000] uppercase tracking-wider doodle-btn flex items-center gap-2"
            >
              <FolderGit2 className="h-4 w-4" />
              <span>Explore Projects</span>
              <ArrowDown className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => scrollTo('about')}
              className="px-6 py-3 bg-white text-black font-mono text-xs sm:text-sm font-[1000] uppercase tracking-wider doodle-btn flex items-center gap-2"
            >
              <Terminal className="h-4 w-4" />
              <span>Who is Rahul?</span>
            </button>

            <button
              onClick={onOpenResume}
              className="px-6 py-3 bg-[#FFE600] text-black font-mono text-xs sm:text-sm font-[1000] uppercase tracking-wider doodle-btn flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Verified Resume</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 bg-white text-black font-mono text-xs sm:text-sm font-[1000] uppercase tracking-wider doodle-btn flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Say Hello</span>
            </button>
          </div>

        </div>

        {/* 3 Playful Tilted Sticky Notes (Desk Vignettes) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* Card 1: Algorithms */}
          <div className="p-5 bg-[#FFE600] border-2 border-black doodle-box shadow-[4px_5px_0px_0px_#000] rotate-[-2deg] hover:rotate-0 transition-transform">
            <span className="font-mono text-[10px] font-bold text-black uppercase tracking-wider block mb-1.5">
              ⚡ 01 · ALGORITHMS & RIGOR
            </span>
            <h3 className="font-[1000] text-lg text-black leading-snug uppercase">
              100+ LeetCode Solved
            </h3>
            <p className="mt-2 text-xs text-black/85 font-medium leading-relaxed">
              Mathematical complexity bounds, graph traversals, and multi-threaded concurrency primitives built from first principles.
            </p>
          </div>

          {/* Card 2: Virtusa Commercial Tenure */}
          <div className="p-5 bg-sky-100 border-2 border-black doodle-box shadow-[4px_5px_0px_0px_#000] rotate-[1.5deg] hover:rotate-0 transition-transform">
            <span className="font-mono text-[10px] font-bold text-black uppercase tracking-wider block mb-1.5">
              🏢 02 · COMMERCIAL TENURE
            </span>
            <h3 className="font-[1000] text-lg text-black leading-snug uppercase">
              Virtusa Associate Engineer
            </h3>
            <p className="mt-2 text-xs text-black/85 font-medium leading-relaxed">
              Full-time enterprise engineering in Chennai, India. Production microservices, automated unit testing, and verified service letter.
            </p>
          </div>

          {/* Card 3: Autonomous AI */}
          <div className="p-5 bg-emerald-100 border-2 border-black doodle-box shadow-[4px_5px_0px_0px_#000] rotate-[-1deg] hover:rotate-0 transition-transform">
            <span className="font-mono text-[10px] font-bold text-black uppercase tracking-wider block mb-1.5">
              🧠 03 · AGENTIC STATE MACHINES
            </span>
            <h3 className="font-[1000] text-lg text-black leading-snug uppercase">
              Sub-14ms Vector RAG
            </h3>
            <p className="mt-2 text-xs text-black/85 font-medium leading-relaxed">
              Cyclic LangGraph state machines, Qdrant dense vector search, and anti-hallucination document grading architectures.
            </p>
          </div>

        </div>

        {/* Weapons of Choice / Stack Strip */}
        <div className="mt-14 pt-8 border-t-2 border-black">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="font-mono text-xs font-[1000] uppercase tracking-widest text-black flex items-center gap-1.5">
              <span>★ Weapons of Choice</span>
            </span>
            <span className="font-mono text-[11px] font-bold text-black/50 hidden sm:inline">
              Production Tested Backends
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {stack.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-3 bg-white border-2 border-black doodle-box-sm shadow-[3px_3px_0px_0px_#000] flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform"
                >
                  <Icon className="h-6 w-6 text-black mb-1" />
                  <span className="font-bold text-xs text-black leading-tight">
                    {item.name}
                  </span>
                  <span className="font-mono text-[9px] text-black/60 font-medium mt-0.5">
                    {item.note}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
