import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  ChevronLeft, 
  ChevronRight,
  Send
} from 'lucide-react';

interface ChallengeItem {
  id: string;
  num: string;
  title: string;
  bottleneck: string;
  breakthrough: string;
  metric: string;
  tech: string[];
}

const CHALLENGES: ChallengeItem[] = [
  {
    id: 'ch-1',
    num: '01',
    title: 'Sub-14ms P99 Vector Search Latency',
    bottleneck: 'HNSW vector searches degraded to 48ms latency under multi-tenant concurrent query loads on dense embeddings.',
    breakthrough: 'Implemented scalar vector quantization, memory-mapped index caches, and reciprocal rank fusion within an async ASGI worker pool.',
    metric: 'P99: 11.8ms (75% latency reduction)',
    tech: ['Qdrant', 'FastAPI', 'Quantization', 'Python ASGI'],
  },
  {
    id: 'ch-2',
    num: '02',
    title: 'Eliminating Infinite Loops in Multi-Agent Swarms',
    bottleneck: 'Autonomous LLM agents looping infinitely when resolving conflicting information or ambiguous retrieval prompts.',
    breakthrough: 'Engineered a deterministic LangGraph state machine with cyclic recursion caps and an independent reflection/grader node.',
    metric: '100% Convergence · 0 Infinite Loops',
    tech: ['LangGraph', 'State Machine', 'ChromaDB', 'LLM Agents'],
  },
  {
    id: 'ch-3',
    num: '03',
    title: 'Zero-Downtime Database Migration on 10M+ Rows',
    bottleneck: 'Exclusive table locks triggering connection pool exhaustion and API timeouts during schema alterations.',
    breakthrough: 'Orchestrated dual-write shadow columns with background batch backfilling and concurrent index builds (CREATE INDEX CONCURRENTLY).',
    metric: '0s Downtime · 0 Dropped Transactions',
    tech: ['PostgreSQL', 'PgBouncer', 'Database Migration', 'SQL'],
  },
  {
    id: 'ch-4',
    num: '04',
    title: 'Thwarting Cache Stampedes Under 10,000 Req/Sec',
    bottleneck: 'Simultaneous key expirations under sudden traffic spikes bombarding the primary database with duplicate queries.',
    breakthrough: 'Applied the XFetch probabilistic early expiration algorithm combined with Redis distributed mutex locks (Redlock).',
    metric: '99.98% Cache Hit Ratio Preserved',
    tech: ['Redis', 'Redlock', 'XFetch Algorithm', 'Distributed Locks'],
  },
];

export const FraChallengesSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const nextChallenge = () => {
    setCurrentIdx((prev) => (prev + 1) % CHALLENGES.length);
  };

  const prevChallenge = () => {
    setCurrentIdx((prev) => (prev - 1 + CHALLENGES.length) % CHALLENGES.length);
  };

  const activeChallenge = CHALLENGES[currentIdx];

  return (
    <section className="py-24 sm:py-32 bg-[#0C0E15] text-white border-b-4 border-black relative overflow-hidden select-none">
      
      {/* Background Doodle Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#FFE600 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFE600] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-md mb-3 shadow-[3px_3px_0px_#FFF] -rotate-1">
              <Flame size={14} className="fill-black" />
              <span>THE ENGINEERING CHALLENGES · (LE SFIDE)</span>
            </div>

            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.9]">
              OBSTACLES CONQUERED
            </h2>
            <p className="mt-3 font-mono text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
              Real high-stakes bottlenecks solved across distributed systems, agentic loops, and database concurrency.
            </p>
          </div>

          {/* Carousel Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevChallenge}
              className="w-12 h-12 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center hover:bg-[#FFE600] hover:text-black hover:border-black transition-all shadow-[3px_3px_0px_#000]"
              aria-label="Previous challenge"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="font-mono text-sm font-bold text-[#FFE600] px-2">
              {currentIdx + 1} / {CHALLENGES.length}
            </span>

            <button
              onClick={nextChallenge}
              className="w-12 h-12 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center hover:bg-[#FFE600] hover:text-black hover:border-black transition-all shadow-[3px_3px_0px_#000]"
              aria-label="Next challenge"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Featured Interactive Challenge Card */}
        <div className="bg-[#141824] p-8 sm:p-12 rounded-3xl border-3 border-white/20 shadow-[8px_8px_0px_#000] relative overflow-hidden mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-gray-700 pb-6 mb-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE600] text-black font-display text-2xl font-bold border-2 border-black shadow-[3px_3px_0px_#FFF]">
                {activeChallenge.num}
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Challenge #{activeChallenge.num}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-wide mt-0.5">
                  {activeChallenge.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/40 rounded-full text-emerald-400 font-mono text-xs sm:text-sm font-bold">
              <CheckCircle2 size={16} />
              <span>{activeChallenge.metric}</span>
            </div>
          </div>

          {/* Problem vs Breakthrough */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                <AlertTriangle size={14} />
                <span>The Production Bottleneck</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed">
                {activeChallenge.bottleneck}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <Zap size={14} className="text-[#FFE600]" />
                <span>The Engineering Breakthrough</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed">
                {activeChallenge.breakthrough}
              </p>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-800">
            <div className="flex flex-wrap gap-2">
              {activeChallenge.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs font-bold px-3 py-1 bg-white/10 text-gray-200 border border-white/20 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {CHALLENGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentIdx ? 'w-8 bg-[#FFE600]' : 'w-2.5 bg-gray-700 hover:bg-gray-500'
                  }`}
                  aria-label={`Jump to challenge ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* High-Energy Fra CTA Box ("Hai una vera sfida da propormi? Sfidalo!") */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFE600] text-black border-4 border-black shadow-[10px_10px_0px_#FFF] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-3 py-1 rounded inline-block mb-3">
              ✦ REAL CHALLENGES WELCOME ✦
            </span>
            <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight leading-[0.95]">
              GOT A REAL TECHNICAL CHALLENGE TO PROPOSE?
            </h3>
            <p className="font-mono text-sm sm:text-base text-black/85 mt-2 font-medium">
              Distributed systems, high-concurrency microservices, or complex agentic pipelines — challenge Rahul to build it.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="flex items-center gap-3 px-8 py-4 bg-black text-white font-mono text-base font-bold rounded-2xl border-3 border-black shadow-[5px_5px_0px_#FFF] hover:bg-white hover:text-black hover:border-black hover:shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all shrink-0"
          >
            <span>CHALLENGE HIM!</span>
            <Send size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
