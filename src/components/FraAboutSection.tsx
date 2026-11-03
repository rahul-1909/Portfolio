import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Award, 
  Copy, 
  Check, 
  CheckCircle2, 
  Terminal, 
  Briefcase, 
  Cpu, 
  Rocket 
} from 'lucide-react';
import { certificationsData } from '../data/certifications';

export const FraAboutSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const serviceLetterUrl = "https://drive.google.com/file/d/13vHdfLoxY705xedUs1SP6itxNkY2wXp-/view?usp=sharing";

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const storyCards = [
    {
      num: "01",
      badge: "FOUNDATIONS",
      title: "Core Rigor & Algorithms",
      icon: Terminal,
      bg: "bg-[#FFE600]",
      body: "Built a rock-solid computer science foundation by dissecting memory layouts, multi-threading, and distributed system algorithms. Solved 100+ data structure and algorithm problems across competitive platforms with strict time/space complexity optimization.",
      tags: ["Python", "Go Lang", "Java", "Algorithms", "Concurrency"]
    },
    {
      num: "02",
      badge: "ENTERPRISE",
      title: "Virtusa Commercial Tenure",
      icon: Briefcase,
      bg: "bg-sky-200",
      body: "Served as a full-time Associate Engineer at Virtusa Consulting Services Pvt. Ltd. in Chennai, India. Engineered resilient microservices, optimized REST API payloads, enforced automated unit/integration test suites, and contributed to production code reviews adhering to enterprise CI/CD standards.",
      tags: ["Microservices", "RESTful APIs", "Spring Boot", "Enterprise Arch"],
      hasLetter: true
    },
    {
      num: "03",
      badge: "AGENTIC AI",
      title: "Cyclic State Machine RAG",
      icon: Cpu,
      bg: "bg-purple-200",
      body: "Pioneered production-grade Agentic AI architectures using LangGraph and LangChain. Implemented cyclic graph validation where an autonomous grading node inspects retrieved chunks before synthesis, suppressing over 85% of downstream hallucinations with vector indices (Qdrant & ChromaDB).",
      tags: ["LangGraph", "Qdrant", "ChromaDB", "FastAPI", "Sub-14ms Latency"]
    },
    {
      num: "04",
      badge: "LIVING SYSTEMS",
      title: "Production In The Wild",
      icon: Rocket,
      bg: "bg-emerald-200",
      body: "Architecting end-to-end distributed applications with FastAPI and Spring Boot 3.5. Enforced stateless JWT RBAC security filter chains, Docker containerization, AST query validation, and cloud-native deployments on AWS and Azure.",
      tags: ["Docker", "AWS Cloud", "PostgreSQL", "Redis", "JWT/RBAC"]
    }
  ];

  return (
    <section id="about" className="py-24 bg-white text-black border-b-2 border-black relative notebook-paper">
      <div className="content-wrapper max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white font-mono text-xs font-[1000] uppercase tracking-wider rounded-md mb-4 shadow-[3px_3px_0px_#FFE600]">
            <span>MA CHI È FRA? · WHO IS RAHUL?</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-[1000] tracking-tight text-black uppercase leading-none">
            Lines, Logic & Systems
          </h2>

          <p className="mt-4 text-base sm:text-lg text-black/75 max-w-2xl mx-auto font-medium leading-relaxed">
            From algorithmic foundations and enterprise tenure at Virtusa, to autonomous AI agent state machines.
          </p>
        </div>

        {/* 4 Story Cards (Fra style grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {storyCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="bg-white p-7 sm:p-8 doodle-box shadow-[6px_8px_0px_0px_#000] hover:shadow-[9px_11px_0px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-8 px-2.5 items-center justify-center rounded-md border-2 border-black ${card.bg} font-mono text-xs font-[1000]`}>
                        #{card.num}
                      </span>
                      <span className="font-mono text-xs font-[1000] uppercase tracking-wider text-black">
                        {card.badge}
                      </span>
                    </div>
                    <Icon className="h-5 w-5 text-black" />
                  </div>

                  <h3 className="text-2xl font-[1000] text-black tracking-tight leading-snug uppercase">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm text-black/80 font-medium leading-relaxed">
                    {card.body}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 border border-black bg-neutral-50 font-mono text-[10px] font-bold text-black rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {card.hasLetter && (
                  <div className="mt-7 pt-4 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold text-black flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Virtusa Tenure Formally Verified
                    </span>
                    <a
                      href={serviceLetterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#FFE600] text-black font-mono text-xs font-[1000] doodle-btn flex items-center gap-1.5"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>View Official Letter</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Formally Verified Certifications Wall */}
        <div className="pt-12 border-t-2 border-black">
          <div className="flex items-center gap-2 mb-8">
            <Award className="h-6 w-6 text-black" />
            <h3 className="text-2xl sm:text-3xl font-[1000] text-black uppercase tracking-tight">
              Verified Credentials Vault
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-6 doodle-box shadow-[4px_5px_0px_0px_#000] hover:shadow-[7px_8px_0px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 border-2 border-black bg-yellow-200 font-mono text-xs font-[1000] text-black rounded">
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-black/60">
                      {cert.category}
                    </span>
                  </div>

                  <h4 className="font-[1000] text-base text-black leading-snug">
                    {cert.title}
                  </h4>

                  <p className="mt-2 text-xs text-black/75 leading-relaxed font-medium">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-black space-y-2.5">
                  {cert.credentialId && (
                    <div className="flex items-center justify-between p-2 bg-neutral-50 border border-black rounded font-mono text-xs">
                      <span className="truncate max-w-[160px] text-black/70">
                        ID: {cert.credentialId}
                      </span>
                      <button
                        onClick={() => handleCopyCode(cert.credentialId!)}
                        className="font-bold text-black hover:opacity-75 flex items-center gap-1"
                      >
                        {copiedId === cert.credentialId ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-black text-white font-mono text-xs font-[1000] doodle-btn flex items-center justify-center gap-1.5"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
