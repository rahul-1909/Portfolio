import React from 'react';
import { Server, Brain, ShieldCheck, Database, Code2, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Server,
      title: "Backend Engineering",
      desc: "Architecting high-throughput REST and ASGI microservices using FastAPI, Spring Boot 3.5, and Node.js with strict typing and schema validation."
    },
    {
      icon: Brain,
      title: "Agentic AI & RAG",
      desc: "Building stateful LangGraph workflows, multi-agent systems, dense vector search (Qdrant, ChromaDB), and self-correcting retrieval loops."
    },
    {
      icon: ShieldCheck,
      title: "Security & Guardrails",
      desc: "Implementing stateless JWT Role-Based Access Control, dual-token telemetry, and deterministic prompt/AST injection guardrails."
    },
    {
      icon: Database,
      title: "Database Optimization",
      desc: "Managing high-concurrency relational schemas (PostgreSQL, MySQL 9) and distributed key-value caches (Redis) with transactional isolation."
    }
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <Code2 className="h-3.5 w-3.5" />
            <span>Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Driven by craftsmanship, scalability, and deterministic systems.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            I am a Software Developer targeting backend engineering and AI/ML opportunities. My approach centers on writing clean, modular code, verifying system safety, and architecting services that handle real-world load gracefully.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-xl hover:shadow-accent-500/5 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-accent-500/30 dark:hover:bg-white/[0.04]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Technical Positioning Callout */}
        <div className="mt-8 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-accent-500/[0.03] to-cyan-500/[0.03] p-6 sm:p-8 dark:border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5" />
                Continuous Learning & Real Implementations
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Every project I build is grounded in real code, verifiable repositories, and deployed services.
              </p>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 flex-shrink-0"
            >
              Inspect Featured Repositories →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
