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
  Rocket,
  Sparkles
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
      badge: "ALGORITHMIC RIGOR",
      title: "Core Foundations & Logic",
      icon: Terminal,
      bg: "bg-[#FFE600]",
      textColor: "text-black",
      body: "Built an uncompromising computer science foundation dissecting memory layouts, asynchronous event loops, and concurrency synchronization primitives. Solved 100+ algorithmic challenges with strict O(log n) optimization.",
      tags: ["Python", "Go Lang", "Java", "Concurrency", "Locks"]
    },
    {
      num: "02",
      badge: "ENTERPRISE PROVEN",
      title: "Virtusa Tenure & Scale",
      icon: Briefcase,
      bg: "bg-sky-400",
      textColor: "text-black",
      body: "Served as an Associate Engineer at Virtusa Consulting Services Pvt. Ltd. in Chennai, India. Engineered distributed backend microservices, optimized REST API payloads, enforced automated unit/integration suites, and maintained enterprise production releases.",
      tags: ["Microservices", "REST APIs", "Spring Boot", "CI/CD"],
      hasLetter: true
    },
    {
      num: "03",
      badge: "AGENTIC AI SWARMS",
      title: "LangGraph State Machines",
      icon: Cpu,
      bg: "bg-purple-400",
      textColor: "text-black",
      body: "Pioneered production-grade Agentic AI architectures using LangGraph and LangChain. Implemented cyclic graph validation where an autonomous grading node inspects retrieved chunks before synthesis, suppressing over 85% of downstream hallucinations with sub-14ms vector retrieval.",
      tags: ["LangGraph", "Qdrant", "ChromaDB", "FastAPI", "Sub-14ms P99"]
    },
    {
      num: "04",
      badge: "CLOUD & SECURITY",
      title: "Resilient Cloud Deployments",
      icon: Rocket,
      bg: "bg-emerald-400",
      textColor: "text-black",
      body: "Architecting end-to-end distributed applications with FastAPI and Spring Boot 3.5. Enforced stateless JWT RBAC security filter chains, Docker containerization, AST query validation, and cloud-native deployments on AWS.",
      tags: ["Docker", "AWS Cloud", "PostgreSQL", "Redis", "JWT/RBAC"]
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#0C0E15] text-white border-b-4 border-black relative overflow-hidden">
      
      {/* Background Subtle Doodle Sketch Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#FFE600 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Fra dark style) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFE600] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-md mb-4 shadow-[3px_3px_0px_#FFF] -rotate-1">
            <Sparkles size={13} />
            <span>WHO IS RAHUL? · (MA CHI È RAHUL?)</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-none">
            LINES, LOGIC & SYSTEMS
          </h2>

          <p className="mt-4 font-mono text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From algorithmic foundations and enterprise tenure at Virtusa, to autonomous AI agent state machines.
          </p>
        </div>

        {/* 4 Story Cards (Fra comic grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20">
          {storyCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="bg-[#141824] p-6 sm:p-8 rounded-2xl border-3 border-white/20 hover:border-[#FFE600] shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#FFE600] hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-8 px-2.5 items-center justify-center rounded-md border-2 border-black ${card.bg} ${card.textColor} font-mono text-xs font-bold`}>
                        #{card.num}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-300">
                        {card.badge}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#FFE600] group-hover:text-black transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wide mb-3 group-hover:text-[#FFE600] transition-colors">
                    {card.title}
                  </h3>

                  <p className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {card.body}
                  </p>
                </div>

                <div>
                  {card.hasLetter && (
                    <div className="mb-4 pt-3 border-t border-gray-800">
                      <a
                        href={serviceLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFE600] text-black font-mono text-xs font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_#FFF] hover:bg-yellow-300 transition-colors"
                      >
                        <FileText size={13} />
                        <span>Inspect Official Virtusa Service Letter</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] font-bold px-2.5 py-1 bg-white/10 text-gray-200 border border-white/20 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Credentials Vault */}
        <div className="bg-[#141824] p-6 sm:p-10 rounded-2xl border-3 border-white/20 shadow-[8px_8px_0px_#000]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-700 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-black flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#FFF]">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wider">
                  Verified Industry Credentials
                </h3>
                <p className="font-mono text-xs text-gray-400">
                  Cryptographically verifiable certifications and official credentials.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1.5 rounded-full text-xs font-mono font-bold">
              <CheckCircle2 size={14} />
              <span>All 3 Credentials Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-black/50 p-5 rounded-xl border border-gray-800 hover:border-[#FFE600] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-[#FFE600] text-black rounded border border-black">
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">
                      {cert.issueDate}
                    </span>
                  </div>

                  <h4 className="font-mono text-sm font-bold text-white mb-2 leading-snug">
                    {cert.title}
                  </h4>

                  <p className="font-mono text-xs text-gray-400 mb-4 line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => cert.credentialId && handleCopyCode(cert.credentialId)}
                    className="flex items-center gap-1 text-[11px] font-mono text-gray-300 hover:text-[#FFE600] transition-colors"
                    title="Click to copy ID"
                  >
                    {cert.credentialId && copiedId === cert.credentialId ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span className="truncate max-w-[120px]">{cert.credentialId || 'ID Verified'}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-xs font-bold text-[#FFE600] hover:underline"
                  >
                    <span>Verify</span>
                    <ExternalLink size={12} />
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
