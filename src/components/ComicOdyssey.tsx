import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Briefcase, 
  Cpu, 
  Rocket, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  ShieldCheck 
} from 'lucide-react';
import { experienceData } from '../data/experience';

export const ComicOdyssey: React.FC = () => {
  const [viewMode, setViewMode] = useState<'comic' | 'recruiter'>('comic');
  const serviceLetterUrl = "https://drive.google.com/file/d/13vHdfLoxY705xedUs1SP6itxNkY2wXp-/view?usp=sharing";

  const panels = [
    {
      number: "01",
      badge: "ORIGIN & FOUNDATIONS",
      title: "The Core Blueprint",
      subtitle: "Algorithms, Concurrency & Low-Level Rigor",
      icon: Terminal,
      color: "bg-blue-100",
      doodleEmoji: "⚡",
      comicDialogue: "Before abstractions, master the primitives.",
      body: "Built a rock-solid computer science foundation by dissecting memory management, multi-threading, and distributed system algorithms. Solved 100+ data structure and algorithm problems across LeetCode and competitive platforms, focusing on time-complexity optimizations.",
      tags: ["Python", "Go Lang", "Java", "Data Structures", "Algorithms", "Concurrency"],
      stat: "100+ Algorithmic Challenges Solved"
    },
    {
      number: "02",
      badge: "ENTERPRISE CRUCIBLE",
      title: "Virtusa Commercial Tenure",
      subtitle: "Associate Engineer · Chennai, India",
      icon: Briefcase,
      color: "bg-emerald-100",
      doodleEmoji: "🏢",
      comicDialogue: "Enterprise code doesn't just run; it endures.",
      body: "Served as a full-time Associate Engineer at Virtusa Consulting Services Pvt. Ltd. Engineered resilient microservices, optimized REST API payloads, enforced automated unit/integration testing suites, and participated in rigorous production code reviews adhering to enterprise CI/CD standards.",
      tags: ["Virtusa", "Microservices", "RESTful APIs", "Spring Boot", "Enterprise Architecture"],
      stat: "Commercial Production Experience",
      hasVerifiedLetter: true
    },
    {
      number: "03",
      badge: "THE AI REVOLUTION",
      title: "Autonomous Agents & Vector Pipelines",
      subtitle: "Beyond Simple Prompts to Cyclic State Machines",
      icon: Cpu,
      color: "bg-purple-100",
      doodleEmoji: "🧠",
      comicDialogue: "Linear chains break. Cyclic state graphs heal.",
      body: "Pioneered production-grade Agentic AI architectures using LangGraph and LangChain. Implemented cyclic graph validation where an autonomous grading node inspects retrieved chunks before synthesis, suppressing over 85% of downstream hallucinations with vector indices (Qdrant & ChromaDB).",
      tags: ["LangGraph", "Qdrant", "ChromaDB", "RAG", "FastAPI", "Cosine Centroids"],
      stat: "Sub-14ms Vector Search Latency"
    },
    {
      number: "04",
      badge: "THE LIVING SYSTEMS",
      title: "Production Systems in the Wild",
      subtitle: "Microservices, Security Guardrails & Deployments",
      icon: Rocket,
      color: "bg-amber-100",
      doodleEmoji: "🚀",
      comicDialogue: "Ready to ship, scale, and monitor.",
      body: "Architecting end-to-end full stack distributed applications with FastAPI and Spring Boot 3.5. Enforced stateless JWT RBAC security filter chains, Docker containerization, AST query validation, and cloud-native deployments on AWS and Azure.",
      tags: ["Docker", "AWS Cloud", "PostgreSQL", "Redis", "JWT/RBAC", "sqlglot AST"],
      stat: "6 Production Works Shipped"
    }
  ];

  return (
    <section id="story" className="py-24 bg-white text-black border-b-2 border-black relative">
      <div className="content-wrapper max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen className="h-3.5 w-3.5 text-amber-300" />
              <span>VOLUME 01 · THE ENGINEERING ODYSSEY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[1000] tracking-tight text-black uppercase leading-tight">
              The Comic Odyssey
            </h2>
            <p className="mt-3 text-base text-black/75 leading-relaxed font-medium">
              From foundational algorithm mastery and commercial enterprise tenure at Virtusa, to autonomous AI agent state machines.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-black/5 p-1.5 rounded-xl border-2 border-black self-start md:self-end">
            <button
              onClick={() => setViewMode('comic')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'comic'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-black hover:bg-black/10'
              }`}
            >
              Comic Strip View
            </button>
            <button
              onClick={() => setViewMode('recruiter')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'recruiter'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-black hover:bg-black/10'
              }`}
            >
              Recruiter Quick Intel
            </button>
          </div>
        </div>

        {viewMode === 'comic' ? (
          /* 4-Panel Comic Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {panels.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="relative rounded-3xl border-2 border-black bg-white p-7 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  {/* Top Comic Header Bar */}
                  <div>
                    <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 px-2 items-center justify-center rounded-lg bg-black text-white font-mono text-xs font-bold gap-1.5">
                          <Icon className="h-3.5 w-3.5" />
                          <span>#{p.number}</span>
                        </span>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-black/70">
                          {p.badge}
                        </span>
                      </div>
                      <span className="text-2xl select-none" role="img" aria-label="emoji">
                        {p.doodleEmoji}
                      </span>
                    </div>

                    {/* Comic Character Speech Bubble */}
                    <div className="mb-5 relative inline-block bg-amber-50 border-2 border-black px-4 py-2 rounded-xl text-xs font-bold font-mono text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <span>"{p.comicDialogue}"</span>
                      <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-[900] text-black tracking-tight leading-snug">
                      {p.title}
                    </h3>
                    <p className="font-mono text-xs font-bold text-black/60 mt-1 mb-4">
                      {p.subtitle}
                    </p>

                    {/* Body */}
                    <p className="text-sm leading-relaxed text-black/80 font-medium">
                      {p.body}
                    </p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md border border-black/30 bg-black/5 font-mono text-[11px] font-bold text-black"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Strip: Stat or Official Service Letter Verification */}
                  <div className="mt-7 pt-4 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-mono text-xs font-bold text-black">
                        {p.stat}
                      </span>
                    </div>

                    {p.hasVerifiedLetter && (
                      <a
                        href={serviceLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-200 text-black px-3 py-1.5 rounded-lg border-2 border-black font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-300 transition"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>View Virtusa Letter</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Recruiter Quick Intel View */
          <div className="max-w-4xl mx-auto rounded-3xl border-2 border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
            <div>
              <span className="font-mono text-xs font-bold text-black uppercase tracking-wider block mb-1">
                Executive Career Summary
              </span>
              <h3 className="text-2xl font-[1000] text-black">
                Rahul Teja · Software Developer
              </h3>
              <p className="mt-2 text-sm text-black/80 leading-relaxed font-medium">
                Software developer with commercial tenure at Virtusa Consulting Services Pvt. Ltd. and specialized focus on backend architectures, high-throughput microservices, and autonomous multi-agent AI systems (LangGraph / RAG).
              </p>
            </div>

            <div className="border-t-2 border-black pt-6">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-4">
                Commercial Experience Highlights (Virtusa)
              </h4>
              <div className="space-y-3">
                {experienceData[0].responsibilities.map((r, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-black/85 font-medium">
                    <span className="font-mono font-bold text-black mt-0.5">•</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={serviceLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 transition"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Open Official Virtusa Service Letter</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
