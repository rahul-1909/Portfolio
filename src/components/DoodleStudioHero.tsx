import React from 'react';
import { 
  FileText, 
  FolderGit2, 
  Send, 
  Terminal, 
  Code2
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

interface DoodleStudioHeroProps {
  onOpenResume: () => void;
}

export const DoodleStudioHero: React.FC<DoodleStudioHeroProps> = ({ onOpenResume }) => {
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
    { name: 'FastAPI', icon: SiFastapi, note: 'REST APIs' },
    { name: 'Spring Boot 3.5', icon: SiSpringboot, note: 'JWT / RBAC' },
    { name: 'AWS Cloud', icon: FaAws, note: 'Cloud Arch' },
    { name: 'Docker', icon: SiDocker, note: 'Containers' },
    { name: 'PostgreSQL', icon: SiPostgresql, note: 'SQL & Indexing' },
    { name: 'Redis', icon: SiRedis, note: 'Cache & PubSub' },
  ];

  return (
    <section 
      id="studio" 
      className="relative w-full bg-white text-black pt-28 pb-20 sm:pt-36 sm:pb-28 border-b-2 border-black overflow-hidden notebook-paper"
    >
      <div className="content-wrapper max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hand-Drawn Masking Tape Banner */}
        <div className="w-fit mx-auto mb-8 relative">
          <div className="px-5 py-1.5 bg-amber-100 border-2 border-black font-mono text-xs font-bold uppercase tracking-widest doodle-box-sm shadow-[3px_3px_0px_0px_#000] rotate-[-1deg]">
            <span>✦ Software Developer · Backend Engineering & AI Systems</span>
          </div>
        </div>

        {/* Center Canvas: Name & Doodles */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main Hand-Drawn Name */}
          <div className="relative inline-block">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-[1000] tracking-tight text-black uppercase leading-none select-none">
              Rahul Teja
            </h1>
            
            {/* Hand-Drawn Squiggle Underline */}
            <svg 
              className="w-full h-4 sm:h-6 text-black mt-1" 
              viewBox="0 0 400 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 14C50 4 120 18 200 8C270 -2 330 16 395 10" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
            </svg>
          </div>

          {/* Hand-Drawn Comic Speech Bubble */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="p-5 sm:p-6 bg-white border-2 border-black doodle-box shadow-[5px_6px_0px_0px_#000] text-center">
              <p className="text-base sm:text-lg text-black font-semibold leading-relaxed">
                "I architect high-throughput <span className="bg-yellow-200 px-1 rounded border border-black/20">ASGI microservices</span>, distributed database backends, and autonomous <span className="bg-cyan-100 px-1 rounded border border-black/20">multi-agent RAG state machines</span>."
              </p>
            </div>
            {/* Speech Bubble Pointer */}
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-black mx-auto" />
          </div>

          {/* Hand-Drawn Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => scrollTo('blueprints')}
              className="px-6 py-3 bg-black text-white text-xs sm:text-sm font-bold doodle-btn flex items-center gap-2"
            >
              <FolderGit2 className="h-4 w-4" />
              <span>Explore Blueprints</span>
            </button>

            <button
              onClick={() => scrollTo('credentials')}
              className="px-6 py-3 bg-white text-black text-xs sm:text-sm font-bold doodle-btn flex items-center gap-2"
            >
              <Terminal className="h-4 w-4" />
              <span>Tenure & Credentials</span>
            </button>

            <button
              onClick={onOpenResume}
              className="px-6 py-3 bg-yellow-200 text-black text-xs sm:text-sm font-bold doodle-btn flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Verified Resume</span>
            </button>

            <button
              onClick={() => scrollTo('connect')}
              className="px-6 py-3 bg-white text-black text-xs sm:text-sm font-bold doodle-btn flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Drop a Line</span>
            </button>
          </div>

        </div>

        {/* 3 Playful Tilted Sticky Notes (Doodle Studio Desk) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          
          {/* Sticky 1: Foundations */}
          <div className="relative p-5 bg-yellow-100 border-2 border-black doodle-box shadow-[4px_5px_0px_0px_#000] rotate-[-2deg] hover:rotate-0 transition-transform">
            <div className="font-mono text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>⚡ NOTE #01</span>
              <span>·</span>
              <span>ALGORITHMS</span>
            </div>
            <h3 className="font-[900] text-lg text-black leading-snug">
              100+ LeetCode Challenges
            </h3>
            <p className="mt-2 text-xs text-black/80 font-medium leading-relaxed">
              Deep CS rigor in time-complexity optimization, memory layouts, graph traversal, and concurrent state primitives.
            </p>
          </div>

          {/* Sticky 2: Virtusa Commercial Tenure */}
          <div className="relative p-5 bg-emerald-100 border-2 border-black doodle-box shadow-[4px_5px_0px_0px_#000] rotate-[1.5deg] hover:rotate-0 transition-transform">
            <div className="font-mono text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🏢 NOTE #02</span>
              <span>·</span>
              <span>COMMERCIAL</span>
            </div>
            <h3 className="font-[900] text-lg text-black leading-snug">
              Virtusa Associate Engineer
            </h3>
            <p className="mt-2 text-xs text-black/80 font-medium leading-relaxed">
              Commercial enterprise software engineering tenure in Chennai, India. Production microservices and verified experience letter.
            </p>
          </div>

          {/* Sticky 3: Autonomous AI */}
          <div className="relative p-5 bg-purple-100 border-2 border-black doodle-box shadow-[4px_5px_0px_0px_#000] rotate-[-1deg] hover:rotate-0 transition-transform">
            <div className="font-mono text-[10px] font-bold text-black/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🧠 NOTE #03</span>
              <span>·</span>
              <span>AGENTIC AI</span>
            </div>
            <h3 className="font-[900] text-lg text-black leading-snug">
              Sub-14ms Vector RAG
            </h3>
            <p className="mt-2 text-xs text-black/80 font-medium leading-relaxed">
              Cyclic LangGraph state machine orchestrations with Qdrant and ChromaDB dense vector indexing to eliminate hallucinations.
            </p>
          </div>

        </div>

        {/* Weapons of Choice / Stack Strip */}
        <div className="mt-16 pt-8 border-t-2 border-black">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60 flex items-center gap-1.5">
              <Code2 className="h-4 w-4" />
              <span>Weapons of Choice</span>
            </span>
            <span className="font-mono text-[11px] font-bold text-black/40 hidden sm:inline">
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
