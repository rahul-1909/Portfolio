import React from 'react';
import { 
  ArrowDown, 
  FileText, 
  FolderGit2, 
  Send, 
  BookOpen
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

interface DoodleHeroProps {
  onOpenResume: () => void;
}

export const DoodleHero: React.FC<DoodleHeroProps> = ({ onOpenResume }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryStack = [
    { name: 'Python', icon: SiPython, tag: 'Async / Core' },
    { name: 'Go Lang', icon: SiGo, tag: 'Concurrency' },
    { name: 'Java', icon: FaJava, tag: 'Enterprise' },
    { name: 'FastAPI', icon: SiFastapi, tag: 'ASGI / REST' },
    { name: 'Spring Boot 3.5', icon: SiSpringboot, tag: 'RBAC Security' },
    { name: 'AWS Cloud', icon: FaAws, tag: 'Infrastructure' },
    { name: 'Docker', icon: SiDocker, tag: 'Containers' },
    { name: 'PostgreSQL', icon: SiPostgresql, tag: 'Relational' },
    { name: 'Redis', icon: SiRedis, tag: 'Caching / Queue' },
  ];

  return (
    <section 
      id="hero" 
      className="relative w-full bg-white text-black pt-28 pb-20 sm:pt-36 sm:pb-24 border-b-2 border-black overflow-hidden"
    >
      {/* Subtle Graph Paper Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(#000000 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="content-wrapper max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Availability Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-black bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit mb-6">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse border border-black" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
            Available for Software Engineering & AI Roles
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-[1000] tracking-tight text-black uppercase leading-[1.05]">
            Rahul Teja
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-lg bg-black text-white font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
              Software Developer
            </span>
            <span className="px-3.5 py-1 rounded-lg border-2 border-black bg-white font-mono text-sm sm:text-base font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Backend & AI Systems
            </span>
          </div>

          <p className="mt-6 text-lg sm:text-xl text-black/80 max-w-3xl font-medium leading-relaxed">
            I engineer high-throughput <strong className="text-black font-bold underline decoration-2">ASGI microservices</strong>, distributed system architectures, and autonomous <strong className="text-black font-bold underline decoration-2">multi-agent RAG pipelines</strong>. Tested with production rigor and commercial enterprise tenure.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => scrollTo('workbench')}
            className="group flex items-center gap-2 px-5 py-3 bg-black text-white text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>Explore Selected Works</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollTo('story')}
            className="flex items-center gap-2 px-5 py-3 bg-white text-black text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <BookOpen className="h-4 w-4" />
            <span>The Odyssey (Experience)</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-3 bg-amber-200 text-black text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <FileText className="h-4 w-4" />
            <span>Verified Resume</span>
          </button>

          <button
            onClick={() => scrollTo('connect')}
            className="flex items-center gap-2 px-5 py-3 bg-white text-black text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <Send className="h-4 w-4" />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Core Runtimes & Languages Strip */}
        <div className="mt-14 pt-8 border-t-2 border-black">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">
              Primary Runtimes & Infrastructure Stack
            </span>
            <span className="font-mono text-xs font-bold text-black/40 hidden sm:inline">
              Commercial & Production Tested
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {primaryStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
                >
                  <Icon className="h-6 w-6 text-black mb-1.5" />
                  <span className="font-bold text-xs text-black leading-tight">
                    {tech.name}
                  </span>
                  <span className="font-mono text-[9px] text-black/60 font-semibold mt-0.5">
                    {tech.tag}
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
