import React from 'react';
import { 
  ArrowDown, 
  FileText, 
  FolderGit2, 
  Layers, 
  Send, 
  Sparkles,
  Terminal,
  Cpu
} from 'lucide-react';
import { CrowdCanvas } from './Skiper39';

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

  return (
    <section 
      id="stage" 
      className="relative w-full h-screen min-h-[720px] max-h-[1080px] bg-white text-black flex flex-col justify-between overflow-hidden select-none border-b-2 border-black"
    >
      {/* Subtle Hand-Drawn / Graph Paper Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(#000000 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Full-Screen Skiper39 Crowd Canvas (Behind text, walking in full viewport scale) */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="w-full h-full"
        />
      </div>

      {/* Top Center Minimalist Branding matching Skiper-UI screenshot */}
      <div className="relative z-20 pt-20 sm:pt-24 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        
        {/* CROUD CANVAS / THE STAGE minimal tag */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.35em] text-black/60 uppercase font-bold">
            STAGE 01 · CROWD CANVAS
          </span>
          {/* Vertical hairline divider from screenshot */}
          <div className="w-[1px] h-7 bg-black/30 my-2" />
        </div>

        {/* Massive Editorial Name & Title */}
        <h1 className="mt-1 text-4xl sm:text-6xl md:text-7xl font-[1000] tracking-tight text-black uppercase leading-none">
          Rahul Teja
        </h1>

        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-md font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
          <span>Software Developer</span>
          <span>·</span>
          <span>Backend & AI Systems</span>
        </div>

        {/* Bio / Positioning Statement */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-black/80 max-w-2xl font-medium leading-relaxed">
          Specializing in high-throughput <strong className="text-black font-bold underline decoration-wavy decoration-black/40">ASGI microservices</strong>, distributed system security, and autonomous <strong className="text-black font-bold underline decoration-wavy decoration-black/40">multi-agent RAG pipelines</strong>.
        </p>

        {/* Tactile Ink Neo-Brutalist Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pointer-events-auto">
          <button
            onClick={() => scrollTo('story')}
            className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <span>The Comic Odyssey</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollTo('workbench')}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-black text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>The Workbench</span>
          </button>

          <button
            onClick={() => scrollTo('stack')}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-black text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <Layers className="h-4 w-4" />
            <span>Tool Chest</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-amber-200 text-black text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <FileText className="h-4 w-4" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => scrollTo('connect')}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-black text-xs sm:text-sm font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <Send className="h-4 w-4" />
            <span>Say Hello</span>
          </button>
        </div>

        {/* Floating Comic Speech Bubbles perched right above the walking crowd */}
        <div className="hidden md:flex items-center justify-between w-full max-w-3xl mt-8 pointer-events-none">
          
          {/* Bubble 1 */}
          <div className="relative bg-white border-2 border-black px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
            <span className="font-mono text-[11px] font-bold text-black flex items-center gap-1">
              <Terminal className="h-3 w-3" />
              Sub-14ms P99 ASGI API
            </span>
            <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
          </div>

          {/* Bubble 2 */}
          <div className="relative bg-white border-2 border-black px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <span className="font-mono text-[11px] font-bold text-black flex items-center gap-1">
              <Cpu className="h-3 w-3" />
              LangGraph Multi-Agent RAG
            </span>
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
          </div>

          {/* Bubble 3 */}
          <div className="relative bg-white border-2 border-black px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <span className="font-mono text-[11px] font-bold text-black flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Virtusa Tenure Verified
            </span>
            <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
          </div>

        </div>

      </div>

      {/* Bottom Floating Scroll Indicator */}
      <div className="relative z-20 pb-4 text-center pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-black/50 uppercase font-bold">
          SCROLL DOWN TO ENTER THE ODYSSEY ↓
        </span>
      </div>

    </section>
  );
};
