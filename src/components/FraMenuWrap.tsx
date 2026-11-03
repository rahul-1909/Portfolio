import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Layers,
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';

interface MenuCapability {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tags: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  metric: string;
  detail: string;
}

const CAPABILITIES: MenuCapability[] = [
  {
    id: 'asgi',
    num: '01',
    title: 'High-Throughput ASGI Microservices',
    subtitle: 'Asynchronous event engines & high-concurrency worker pools',
    tags: ['FastAPI', 'Python 3.12', 'uvloop', 'Uvicorn'],
    icon: Terminal,
    metric: 'Sub-14ms P99 Latency',
    detail: 'Engineered for non-blocking I/O with asyncio and uvloop, handling 10,000+ simultaneous connection streams without resource leaks.',
  },
  {
    id: 'rag',
    num: '02',
    title: 'Autonomous Multi-Agent LangGraph RAG',
    subtitle: 'Cyclic state machines, semantic routing & vector retrieval',
    tags: ['LangGraph', 'Qdrant', 'ChromaDB', 'Multi-Agent'],
    icon: Cpu,
    metric: '85% Hallucination Drop',
    detail: 'Autonomous multi-node reasoning graph where validator agents critique intermediate outputs before final clinical or technical synthesis.',
  },
  {
    id: 'cache',
    num: '03',
    title: 'Distributed Redis Caching & Pub/Sub',
    subtitle: 'Distributed mutex locks, cache stampede prevention & event streams',
    tags: ['Redis', 'Pub/Sub', 'Redlock', 'Invalidation'],
    icon: Layers,
    metric: 'Zero Cache Stampedes',
    detail: 'Probabilistic early expiration, distributed lock leases, and high-frequency real-time event streaming across microservice nodes.',
  },
  {
    id: 'db',
    num: '04',
    title: 'Database Architecture & Query Tuning',
    subtitle: 'PostgreSQL schema design, B-Tree / GIN indexing & pool optimization',
    tags: ['PostgreSQL', 'SQLAlchemy', 'Indexing', 'PgBouncer'],
    icon: Database,
    metric: '10M+ Rows Indexed',
    detail: 'Deep query plan analysis (EXPLAIN ANALYZE), multi-column compound indexes, connection pooling, and zero-downtime database migrations.',
  },
  {
    id: 'cloud',
    num: '05',
    title: 'Cloud Infrastructure & Docker Containers',
    subtitle: 'Multi-stage Docker images, AWS deployments & CI/CD workflows',
    tags: ['Docker', 'AWS ECS', 'EC2', 'GitHub Actions'],
    icon: Cloud,
    metric: 'Zero-Downtime Releases',
    detail: 'Containerized microservice topologies with automated smoke testing, health checks, environment isolation, and immutable image artifacts.',
  },
  {
    id: 'security',
    num: '06',
    title: 'AST Query Validation & System Security',
    subtitle: 'Abstract syntax tree inspection, JWT RS256 rotation & RBAC filters',
    tags: ['SQL AST', 'JWT RS256', 'Stateless RBAC', 'Security'],
    icon: ShieldCheck,
    metric: '100% Injection Blocked',
    detail: 'Compile-time and runtime syntax validation disarming malicious query payloads before database driver execution, plus cryptographic token verification.',
  },
];

export const FraMenuWrap: React.FC = () => {
  const [activeItem, setActiveItem] = useState<MenuCapability | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-white text-black border-b-4 border-black relative notebook-paper select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-black px-3.5 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-[3px_3px_0px_#000] -rotate-1">
            <Sparkles size={13} />
            <span>CORE DISCIPLINES · WHAT RAHUL BUILDS</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-black uppercase leading-[0.9]">
            TECHNICAL REPERTOIRE
          </h2>
          <p className="mt-3 font-mono text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
            Hover over any discipline to inspect architecture details, verified benchmarks, and deployment stacks.
          </p>
        </div>

        {/* The Fra-Style Menu Rows */}
        <div className="border-t-3 border-black divide-y-3 divide-black">
          {CAPABILITIES.map((item) => {
            const Icon = item.icon;
            const isHovered = activeItem?.id === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
                className={`group py-6 sm:py-8 px-4 sm:px-6 transition-all duration-150 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isHovered ? 'bg-[#FFE600] translate-x-2' : 'hover:bg-yellow-50'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  <span className="font-mono text-base sm:text-lg font-bold text-gray-500 group-hover:text-black">
                    {item.num}
                  </span>
                  <div className="hidden sm:flex w-9 h-9 rounded-lg bg-black text-white items-center justify-center group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                      <span>{item.title}</span>
                      <ArrowUpRight 
                        size={22} 
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                      />
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-gray-700 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Metric Stamp & Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                  <span className="font-mono text-xs font-bold px-3 py-1 bg-black text-white rounded-md border border-black shadow-[2px_2px_0px_#000]">
                    {item.metric}
                  </span>

                  <div className="hidden sm:flex items-center gap-1.5">
                    {item.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] font-semibold px-2 py-0.5 bg-white border border-black rounded text-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Card Below */}
        {activeItem && (
          <div className="mt-8 p-6 bg-[#0E1017] text-white rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-black flex items-center justify-center border-2 border-black shrink-0">
                <activeItem.icon size={22} />
              </div>
              <div>
                <div className="font-mono text-xs text-[#FFE600] font-bold uppercase tracking-wider">
                  Deep Architectural Profile · {activeItem.metric}
                </div>
                <p className="font-mono text-xs sm:text-sm text-gray-200 mt-1 max-w-2xl leading-relaxed">
                  {activeItem.detail}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 shrink-0">
              {activeItem.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs font-bold px-2.5 py-1 bg-white/10 text-white border border-white/20 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
