import React from 'react';
import type { HomeContainerId } from '../../data/homeContainers';

interface ReplicaHomeCoverProps {
  id: HomeContainerId;
}

export const ReplicaHomeCover: React.FC<ReplicaHomeCoverProps> = ({ id }) => {
  switch (id) {
    case 'projects':
      return (
        <div className="relative w-full h-full bg-[#16171D] text-white flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none">
          {/* Layered Perspective Project Cards Graphic */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            {/* Card 3: SQL Analytics Copilot (Back) */}
            <div
              className="absolute w-[82%] h-[62%] rounded-2xl bg-[#1E222D]/90 border border-white/10 shadow-2xl p-4 flex flex-col justify-between transition-transform"
              style={{
                transform: 'translateY(-28px) scale(0.88)',
                filter: 'brightness(0.75)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[10px] font-mono text-white/40 tracking-wider">NL2SQL · WHISPER</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="h-2 w-3/4 bg-white/20 rounded" />
                <div className="h-2 w-1/2 bg-white/10 rounded" />
              </div>
              <div className="flex items-end gap-1.5 h-10 pt-2 border-t border-white/5">
                <div className="w-1/5 h-[40%] bg-blue-500/40 rounded-t" />
                <div className="w-1/5 h-[70%] bg-blue-500/60 rounded-t" />
                <div className="w-1/5 h-[95%] bg-blue-500/80 rounded-t" />
                <div className="w-1/5 h-[60%] bg-blue-500/50 rounded-t" />
                <div className="w-1/5 h-[80%] bg-blue-500/70 rounded-t" />
              </div>
            </div>

            {/* Card 2: Autonomous Multi-Agent RAG (Middle) */}
            <div
              className="absolute w-[86%] h-[66%] rounded-2xl bg-[#1C202B] border border-white/15 shadow-2xl p-4 flex flex-col justify-between transition-transform"
              style={{
                transform: 'translateY(-12px) scale(0.94)',
                filter: 'brightness(0.9)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400/80 tracking-wider">LANGGRAPH · QDRANT</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 my-auto py-2">
                <div className="p-2 rounded bg-white/5 border border-white/5 text-center">
                  <span className="text-[9px] font-mono text-white/50 block">ROUTER</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mx-auto mt-1" />
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5 text-center">
                  <span className="text-[9px] font-mono text-white/50 block">RETRIEVE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mx-auto mt-1" />
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5 text-center">
                  <span className="text-[9px] font-mono text-white/50 block">GRADE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mx-auto mt-1" />
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5 text-center">
                  <span className="text-[9px] font-mono text-white/50 block">GENERATE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mx-auto mt-1" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/5 pt-2">
                <span>Vector Index: 10,000 Turns</span>
                <span className="text-emerald-400">Validated</span>
              </div>
            </div>

            {/* Card 1: Gold Lending Platform (Front) */}
            <div
              className="absolute w-[92%] h-[72%] rounded-2xl bg-[#232733] border border-white/20 shadow-2xl p-5 flex flex-col justify-between"
              style={{
                transform: 'translateY(12px) scale(1.0)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                  <span className="text-[12px] font-semibold text-white tracking-wide">StarFinance Gold Lending</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  75% LTV
                </span>
              </div>

              <div className="space-y-2.5 my-auto">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] text-white/60 font-medium">Bullion Appraisal</span>
                  <span className="text-[14px] font-mono font-bold text-white">24K · ₹6,850/g</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-200 h-full rounded-full w-3/4" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>Spring Boot 3.5</span>
                  <span>Angular 20 · MySQL 9</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-white/70 border-t border-white/10 pt-3">
                <span>Stateless JWT RBAC</span>
                <span className="text-emerald-400 font-semibold">● Production Ready</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-white tracking-tight">Projects</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-white/60">05</span>
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="relative w-full h-full bg-[#131B2A] text-white flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none">
          {/* Tidy Grid of Technology Pills */}
          <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {['Python', 'Java 17', 'TypeScript', 'Go Lang', 'SQL'].map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-medium text-white tracking-wide shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {['Spring Boot 3.5', 'FastAPI', 'Node.js', 'REST APIs', 'JWT RBAC'].map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[11px] font-mono font-medium text-blue-200 tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {['LangGraph', 'Qdrant', 'RAG Anti-Hallucination', 'ChromaDB', 'Groq Whisper'].map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-mono font-medium text-emerald-200 tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {['PostgreSQL', 'MySQL 9', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Azure'].map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-medium text-white/90 tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-white tracking-tight">Skills</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-white/60">32</span>
          </div>
        </div>
      );

    case 'certifications':
      return (
        <div className="relative w-full h-full bg-[#1E2028] text-white flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none">
          {/* Stacked Certificate Badges in Perspective */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            {/* Cert 3: Anthropic Claude 101 */}
            <div
              className="absolute w-[86%] h-[58%] rounded-2xl bg-[#261E1E] border border-orange-500/25 shadow-2xl p-4 flex flex-col justify-between"
              style={{
                transform: 'translateY(-26px) scale(0.9)',
                filter: 'brightness(0.8)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-orange-400 tracking-wider uppercase">Anthropic</span>
                <span className="text-[10px] font-mono text-white/40">Verified</span>
              </div>
              <h4 className="text-[13px] font-bold text-white">Claude 101 & AI Fluency</h4>
              <p className="text-[10px] font-mono text-white/50">LLM Architecture · Prompt Engineering</p>
            </div>

            {/* Cert 2: AWS Certified Cloud Practitioner */}
            <div
              className="absolute w-[90%] h-[62%] rounded-2xl bg-[#25201A] border border-amber-500/30 shadow-2xl p-4 flex flex-col justify-between"
              style={{
                transform: 'translateY(-10px) scale(0.95)',
                filter: 'brightness(0.92)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 tracking-wider uppercase">Amazon Web Services</span>
                <span className="text-[10px] font-mono text-white/40">Credential ID: cae1d06c</span>
              </div>
              <h4 className="text-[13px] font-bold text-white">AWS Certified Cloud Practitioner</h4>
              <p className="text-[10px] font-mono text-white/50">Cloud Architecture · IAM · Security · VPC</p>
            </div>

            {/* Cert 1: Microsoft Certified MLOps & Azure Data */}
            <div
              className="absolute w-[94%] h-[66%] rounded-2xl bg-[#1C2430] border border-blue-400/40 shadow-2xl p-5 flex flex-col justify-between"
              style={{
                transform: 'translateY(12px) scale(1.0)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-[11px] font-mono text-blue-300 uppercase tracking-wider">Microsoft Certified</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Active</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-white leading-tight">
                  MLOps Engineer Associate & Azure Data
                </h4>
                <p className="text-[11px] font-mono text-white/60">
                  Production ML Pipelines · Vector Search · SQL AI
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 pt-2">
                <span>Official Microsoft Credential Share</span>
                <span className="text-blue-300">Verified ↗</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-white tracking-tight">Certifications</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-white/60">06</span>
          </div>
        </div>
      );

    case 'experience':
      return (
        <div className="relative w-full h-full bg-[#1A1D20] text-white flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none">
          {/* Virtusa Experience Wordmark & Role Card */}
          <div className="flex-1 flex flex-col justify-center items-start space-y-4 py-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                Current Role · Internship
              </span>
              <h3 className="text-[3.6rem] max-phone:text-[2.6rem] font-black tracking-tight text-white leading-none">
                Virtusa
              </h3>
            </div>

            <div className="space-y-2 border-l-2 border-white/20 pl-4 py-1">
              <p className="text-[1.4rem] max-phone:text-[1.2rem] font-semibold text-white/95">
                Full Stack Software Intern
              </p>
              <p className="text-[1.1rem] font-mono text-white/60">
                Chennai, India · August 2025 – June 2026
              </p>
            </div>

            <p className="text-[1.15rem] leading-relaxed text-white/70 max-w-sm">
              Backend & full-stack engineering, building REST APIs, relational databases, and production workflows.
            </p>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-white tracking-tight">Experience</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-white/60">01</span>
          </div>
        </div>
      );
  }
};
