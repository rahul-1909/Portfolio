import React from 'react';
import type { HomeContainerId } from '../../data/homeContainers';

interface ReplicaHomeCoverProps {
  id: HomeContainerId;
}

export const ReplicaHomeCover: React.FC<ReplicaHomeCoverProps> = ({ id }) => {
  switch (id) {
    case 'projects':
      return (
        <div className="relative w-full h-full bg-[#E3E7EB] text-light-black flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none border border-black/[0.04]">
          {/* Layered Perspective System Cards Graphic */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            {/* Card 3: NexusAI DAG (Back) */}
            <div
              className="absolute w-[82%] h-[60%] rounded-2xl bg-white/80 border border-black/5 shadow-md p-4 flex flex-col justify-between transition-transform"
              style={{
                transform: 'translateY(-28px) scale(0.88)',
                filter: 'brightness(0.96)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-grey uppercase tracking-wider">NexusAI · CRAG</span>
                <span className="text-[10px] font-mono text-emerald-600">Self-Correcting</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 my-auto">
                {['Router', 'Retrieve', 'Grade', 'Generate'].map((node, i) => (
                  <div key={node} className="p-1.5 rounded-lg bg-[#E3E7EB]/60 text-center">
                    <span className="text-[8px] font-mono font-medium text-grey block">{node}</span>
                    <span className="text-[10px] font-mono font-bold text-light-black block">0{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-3/4" />
              </div>
            </div>

            {/* Card 2: Star Finance Bullion Engine (Middle) */}
            <div
              className="absolute w-[87%] h-[64%] rounded-2xl bg-white/90 border border-black/5 shadow-lg p-5 flex flex-col justify-between transition-transform"
              style={{
                transform: 'translateY(-10px) scale(0.94)',
                filter: 'brightness(0.98)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-[11px] font-semibold text-light-black">Star Finance Bullion</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 font-medium">
                  75% LTV
                </span>
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-grey">Appraisal Purity</span>
                  <span className="font-bold text-light-black">24K Bullion</span>
                </div>
                <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-4/5" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-grey pt-2 border-t border-black/5">
                <span>Spring Boot 3.5</span>
                <span>Stateless JWT RBAC</span>
              </div>
            </div>

            {/* Card 1: Faultline Simulator (Front) */}
            <div
              className="absolute w-[92%] h-[68%] rounded-2xl bg-white border border-black/5 shadow-xl p-5 flex flex-col justify-between"
              style={{
                transform: 'translateY(14px) scale(1.0)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[12px] font-bold text-light-black">Faultline Simulator</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 font-medium">
                  C++17 · Go
                </span>
              </div>
              <div className="space-y-2 my-auto">
                <p className="text-[11px] text-grey leading-snug">
                  Deterministic discrete-event failure cascades, retry storms, and partition modeling.
                </p>
                <div className="flex items-end gap-1 h-8 pt-1">
                  <div className="w-1/6 h-[35%] bg-blue-400/40 rounded-t" />
                  <div className="w-1/6 h-[60%] bg-blue-400/60 rounded-t" />
                  <div className="w-1/6 h-[90%] bg-blue-500 rounded-t" />
                  <div className="w-1/6 h-[45%] bg-blue-400/50 rounded-t" />
                  <div className="w-1/6 h-[75%] bg-blue-500/80 rounded-t" />
                  <div className="w-1/6 h-[55%] bg-blue-400/50 rounded-t" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-grey pt-2 border-t border-black/5">
                <span>Queue Backpressure</span>
                <span className="text-blue-600 font-medium">Zero Flake</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-black/5 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-light-black tracking-tight">Projects</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-grey">05</span>
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="relative w-full h-full bg-[#E9E8E3] text-light-black flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none border border-black/[0.04]">
          {/* Grid of Clean White Brand Pill Badges */}
          <div className="flex-1 flex flex-col justify-center space-y-3 py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {['Python', 'Java 17', 'Go Lang', 'TypeScript', 'SQL'].map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-1.5 rounded-2xl bg-white border border-black/5 text-[11px] font-mono font-medium text-light-black shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {['Spring Boot 3.5', 'FastAPI', 'PostgreSQL', 'MySQL 9'].map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-1.5 rounded-2xl bg-white border border-black/5 text-[11px] font-mono font-medium text-light-black shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {['LangGraph', 'Qdrant', 'RAG', 'Docker', 'AWS', 'Azure'].map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-1.5 rounded-2xl bg-white border border-black/5 text-[11px] font-mono font-medium text-light-black shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-black/5 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-light-black tracking-tight">Skills</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-grey">12</span>
          </div>
        </div>
      );

    case 'certifications':
      return (
        <div className="relative w-full h-full bg-[#E4E9E3] text-light-black flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none border border-black/[0.04]">
          {/* Stacked White Certificate Badges */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            {/* Cert 3: Anthropic Claude 101 */}
            <div
              className="absolute w-[86%] h-[58%] rounded-2xl bg-white/85 border border-black/5 shadow-md p-4 flex flex-col justify-between"
              style={{
                transform: 'translateY(-24px) scale(0.9)',
                filter: 'brightness(0.97)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-grey uppercase tracking-wider">Anthropic</span>
                <span className="text-[10px] font-mono text-grey">Verified</span>
              </div>
              <h4 className="text-[13px] font-bold text-light-black">Claude 101 & AI Fluency</h4>
              <p className="text-[10px] font-mono text-grey">Prompt Architecture & Tool Use</p>
            </div>

            {/* Cert 2: AWS Certified Cloud Practitioner */}
            <div
              className="absolute w-[90%] h-[62%] rounded-2xl bg-white/90 border border-black/5 shadow-lg p-4 flex flex-col justify-between"
              style={{
                transform: 'translateY(-8px) scale(0.95)',
                filter: 'brightness(0.98)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-700 uppercase tracking-wider font-medium">Amazon Web Services</span>
                <span className="text-[10px] font-mono text-grey">Credential Active</span>
              </div>
              <h4 className="text-[13px] font-bold text-light-black">AWS Cloud Practitioner</h4>
              <p className="text-[10px] font-mono text-grey">Cloud Infrastructure & Security</p>
            </div>

            {/* Cert 1: Microsoft Certified MLOps */}
            <div
              className="absolute w-[94%] h-[66%] rounded-2xl bg-white border border-black/5 shadow-xl p-5 flex flex-col justify-between"
              style={{
                transform: 'translateY(12px) scale(1.0)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-blue-700 uppercase tracking-wider font-semibold">Microsoft Certified</span>
                <span className="text-[10px] font-mono text-emerald-600 font-medium">Verified ↗</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-light-black leading-tight">
                  Azure MLOps & SQL AI Associate
                </h4>
                <p className="text-[11px] font-mono text-grey">
                  Production ML Pipelines & Vector Search
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-grey border-t border-black/5 pt-2">
                <span>Official Transcript Share</span>
                <span className="text-light-black font-semibold">Associate</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-black/5 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-light-black tracking-tight">Certifications</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-grey">06</span>
          </div>
        </div>
      );

    case 'experience':
      return (
        <div className="relative w-full h-full bg-[#EDE7E2] text-light-black flex flex-col justify-between p-8 max-phone:p-6 overflow-hidden rounded-[32px] select-none border border-black/[0.04]">
          {/* Virtusa Experience Wordmark & Role */}
          <div className="flex-1 flex flex-col justify-center items-start space-y-4 py-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-grey">
                Internship · Chennai
              </span>
              <h3 className="text-[3.8rem] max-phone:text-[2.8rem] font-bold tracking-tight text-light-black leading-none">
                Virtusa
              </h3>
            </div>

            <div className="space-y-1.5 border-l-2 border-black/15 pl-4 py-1">
              <p className="text-[1.4rem] max-phone:text-[1.2rem] font-semibold text-light-black">
                Full Stack Software Intern
              </p>
              <p className="text-[1.1rem] font-mono text-grey">
                August 2025 – June 2026
              </p>
            </div>

            <p className="text-[1.2rem] leading-relaxed text-grey max-w-sm">
              Backend services, API endpoints, relational SQL optimization, and automated CI/CD workflows.
            </p>
          </div>

          {/* Bottom Row: Label & Count */}
          <div className="flex items-center justify-between pt-4 border-t border-black/5 relative z-10">
            <span className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-light-black tracking-tight">Experience</span>
            <span className="text-[1.3rem] max-phone:text-[1.1rem] font-mono font-medium text-grey">01</span>
          </div>
        </div>
      );
  }
};
