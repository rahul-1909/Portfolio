'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VirtusaLogo } from '@/components/Icons/VirtusaLogo';

export interface VirtusaDescriptionCardsProps {
  activeTab?: number;
  onSelectTab?: (index: number) => void;
  onClose?: () => void;
}

export const VirtusaDescriptionCards: React.FC<VirtusaDescriptionCardsProps> = ({
  activeTab = 0,
  onSelectTab,
  onClose,
}) => {
  return (
    <div className="flex flex-col gap-8 w-full">

      {/* CARD 01: Mandate & Role Overview */}
      <motion.div
        id="virtusa-card-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-[60.6rem] h-auto rounded-[32px] md:rounded-[64px] relative shrink-0 bg-[#fafafa] text-[#141414] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-[2.6rem] md:p-[4.6rem] flex flex-col justify-between"
      >
        <div className="flex flex-col gap-[2rem] h-full justify-between">
          <div>
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between pb-[1.6rem] border-b border-black/[0.08] flex-wrap gap-[1rem]">
              <div className="flex items-center gap-[1rem]">
                <span className="w-[0.9rem] h-[0.9rem] rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[1.2rem] font-mono font-bold tracking-widest text-black/60 uppercase">
                  INTERNSHIP · CHENNAI, INDIA
                </span>
              </div>
              <span className="text-[1.3rem] font-mono text-black/50 font-medium">
                Aug 2025 – Jun 2026
              </span>
            </div>

            {/* Brand Header */}
            <div className="mt-[2rem] mb-[1.8rem]">
              <div className="flex items-center gap-[1.8rem] mb-[1rem]">
                <VirtusaLogo className="w-[5.2rem] h-[5.2rem] shrink-0" />
                <div>
                  <h3 className="text-[3.8rem] max-phone:text-[2.8rem] font-bold text-black tracking-tight leading-none">
                    Virtusa
                  </h3>
                  <span className="text-[1.2rem] font-mono uppercase tracking-wider text-black/50 block mt-[0.5rem]">
                    ENTERPRISE SOFTWARE · BACKEND & DISTRIBUTED SYSTEMS
                  </span>
                </div>
              </div>
              <h4 className="text-[2.2rem] max-phone:text-[1.8rem] font-semibold text-black/85 tracking-tight mt-[1.2rem]">
                Software Developer Intern
              </h4>
            </div>

            {/* Narrative Overview */}
            <p className="text-[1.6rem] max-phone:text-[1.4rem] leading-[1.65] text-black/75 mb-[2.2rem] font-normal">
              Contributed to core backend architecture and enterprise application services at Virtusa as a Software Developer Intern. Engineered high-throughput RESTful APIs, optimized mission-critical relational database workflows, and integrated production-ready automated systems adhering to clean domain-driven patterns and strict data contracts.
            </p>

            {/* 3 Core Architectural Pillars */}
            <div className="grid grid-cols-1 gap-[1.2rem]">
              <div className="p-[1.5rem] rounded-[20px] bg-black/[0.03] border border-black/[0.06] flex items-start gap-[1.4rem]">
                <span className="text-[1.2rem] font-mono font-bold px-[0.8rem] py-[0.3rem] rounded-md bg-black/10 text-black/70 shrink-0 mt-[0.2rem]">
                  01
                </span>
                <div>
                  <h5 className="text-[1.45rem] font-semibold text-black tracking-tight leading-snug">
                    High-Reliability Backend Systems
                  </h5>
                  <p className="text-[1.35rem] text-black/65 leading-relaxed mt-[0.3rem]">
                    Engineered resilient microservices and RESTful API data contracts with strict type validation, OpenAPI specs, and zero-defect error boundaries.
                  </p>
                </div>
              </div>

              <div className="p-[1.5rem] rounded-[20px] bg-black/[0.03] border border-black/[0.06] flex items-start gap-[1.4rem]">
                <span className="text-[1.2rem] font-mono font-bold px-[0.8rem] py-[0.3rem] rounded-md bg-black/10 text-black/70 shrink-0 mt-[0.2rem]">
                  02
                </span>
                <div>
                  <h5 className="text-[1.45rem] font-semibold text-black tracking-tight leading-snug">
                    Data Tier & Query Optimization
                  </h5>
                  <p className="text-[1.35rem] text-black/65 leading-relaxed mt-[0.3rem]">
                    Optimized PostgreSQL schemas, eliminated slow query execution paths, indexed key transaction tables, and maintained strict ACID integrity.
                  </p>
                </div>
              </div>

              <div className="p-[1.5rem] rounded-[20px] bg-black/[0.03] border border-black/[0.06] flex items-start gap-[1.4rem]">
                <span className="text-[1.2rem] font-mono font-bold px-[0.8rem] py-[0.3rem] rounded-md bg-black/10 text-black/70 shrink-0 mt-[0.2rem]">
                  03
                </span>
                <div>
                  <h5 className="text-[1.45rem] font-semibold text-black tracking-tight leading-snug">
                    Applied AI & Workflow Automation
                  </h5>
                  <p className="text-[1.35rem] text-black/65 leading-relaxed mt-[0.3rem]">
                    Leveraged LLM workflows, LangChain, and RAG retrieval pipelines to automate analytical pipelines and enhance enterprise developer operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-[1.8rem] mt-[1.2rem] border-t border-black/[0.08] flex items-center justify-between text-[1.2rem] font-mono text-black/50">
            <span>01</span>
            {onSelectTab && (
              <button
                onClick={() => onSelectTab(1)}
                className="hover:text-black transition-colors flex items-center gap-[0.4rem] cursor-pointer"
              >
                <span>Responsibilities</span>
                <span>↓</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* CARD 02: Core Engineering Responsibilities */}
      <motion.div
        id="virtusa-card-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-[60.6rem] h-auto rounded-[32px] md:rounded-[64px] relative shrink-0 bg-[#fafafa] text-[#141414] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-[2.6rem] md:p-[4.6rem] flex flex-col justify-between"
      >
        <div className="flex flex-col gap-[2rem] h-full justify-between">
          <div>
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between pb-[1.6rem] border-b border-black/[0.08] flex-wrap gap-[1rem]">
              <div className="flex items-center gap-[1rem]">
                <span className="w-[0.9rem] h-[0.9rem] rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[1.2rem] font-mono font-bold tracking-widest text-black/60 uppercase">
                  TECHNICAL SCOPE · PRODUCTION IMPACT
                </span>
              </div>
              <span className="text-[1.3rem] font-mono text-black/50 font-medium">
                Aug 2025 – Jun 2026
              </span>
            </div>

            {/* Header */}
            <div className="mt-[2rem] mb-[1.8rem]">
              <div className="flex items-center gap-[1.8rem] mb-[1rem]">
                <VirtusaLogo className="w-[5.2rem] h-[5.2rem] shrink-0" />
                <div>
                  <h3 className="text-[3.8rem] max-phone:text-[2.8rem] font-bold text-black tracking-tight leading-none">
                    Virtusa
                  </h3>
                  <span className="text-[1.2rem] font-mono uppercase tracking-wider text-black/50 block mt-[0.5rem]">
                    SYSTEMS & PRODUCTION ENGINEERING
                  </span>
                </div>
              </div>
              <h4 className="text-[2.2rem] max-phone:text-[1.8rem] font-semibold text-black/85 tracking-tight mt-[1.2rem]">
                Core Engineering Responsibilities
              </h4>
            </div>

            {/* 5 Numbered Responsibilities */}
            <div className="space-y-[1.4rem] mt-[1.8rem]">
              {[
                {
                  num: '01',
                  text: 'Engineered backend application services and API endpoints adhering to modern software design patterns, clean architecture, and strict data contracts.',
                },
                {
                  num: '02',
                  text: 'Collaborated on database interactions, writing efficient SQL queries, optimizing schema constraints, indexing, and managing migrations to eliminate execution bottlenecks.',
                },
                {
                  num: '03',
                  text: 'Assisted in full-stack feature development and API consumption, ensuring seamless state management, low latency, and responsive client interactions.',
                },
                {
                  num: '04',
                  text: 'Integrated CI/CD automated testing workflows and Dockerized local development environments for predictable builds and zero-downtime staging.',
                },
                {
                  num: '05',
                  text: 'Participated in active debugging, structured peer code reviews, defect triaging, and system performance profiling to maintain 99.9% software reliability.',
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-[1.4rem]">
                  <span className="text-[1.3rem] font-mono font-bold text-black/40 mt-[0.2rem] shrink-0">
                    {item.num}.
                  </span>
                  <p className="text-[1.55rem] max-phone:text-[1.38rem] leading-[1.6] text-black/80 font-normal">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-[1.8rem] mt-[1.2rem] border-t border-black/[0.08] flex items-center justify-between text-[1.2rem] font-mono text-black/50">
            <span>02</span>
            {onSelectTab && (
              <button
                onClick={() => onSelectTab(2)}
                className="hover:text-black transition-colors flex items-center gap-[0.4rem] cursor-pointer"
              >
                <span>Verified Stack</span>
                <span>↓</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* CARD 03: Verified Production Stack */}
      <motion.div
        id="virtusa-card-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-[60.6rem] h-auto rounded-[32px] md:rounded-[64px] relative shrink-0 bg-[#fafafa] text-[#141414] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-[2.6rem] md:p-[4.6rem] flex flex-col justify-between"
      >
        <div className="flex flex-col gap-[2rem] h-full justify-between">
          <div>
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between pb-[1.6rem] border-b border-black/[0.08] flex-wrap gap-[1rem]">
              <div className="flex items-center gap-[1rem]">
                <span className="w-[0.9rem] h-[0.9rem] rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[1.2rem] font-mono font-bold tracking-widest text-black/60 uppercase">
                  PRODUCTION TECHNOLOGIES · VERIFIED STACK
                </span>
              </div>
              <span className="text-[1.3rem] font-mono text-black/50 font-medium">
                Aug 2025 – Jun 2026
              </span>
            </div>

            {/* Header */}
            <div className="mt-[2rem] mb-[1.6rem]">
              <div className="flex items-center gap-[1.8rem] mb-[1rem]">
                <VirtusaLogo className="w-[5.2rem] h-[5.2rem] shrink-0" />
                <div>
                  <h3 className="text-[3.8rem] max-phone:text-[2.8rem] font-bold text-black tracking-tight leading-none">
                    Virtusa
                  </h3>
                  <span className="text-[1.2rem] font-mono uppercase tracking-wider text-black/50 block mt-[0.5rem]">
                    CORE COMPETENCIES & TOOLING
                  </span>
                </div>
              </div>
              <h4 className="text-[2.2rem] max-phone:text-[1.8rem] font-semibold text-black/85 tracking-tight mt-[1.2rem]">
                Verified Production Stack
              </h4>
            </div>

            {/* Categorized Stack Pills */}
            <div className="space-y-[1.6rem]">
              {/* Group 1: Backend & Core Architecture */}
              <div>
                <span className="text-[1.15rem] font-mono font-bold uppercase tracking-wider text-black/40 block mb-[0.7rem]">
                  Backend & Systems Architecture
                </span>
                <div className="flex flex-wrap gap-[0.7rem]">
                  {['Python', 'TypeScript', 'Java', 'FastAPI', 'RESTful APIs', 'Microservices', 'Data Contracts', 'Clean Architecture'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="text-[1.25rem] font-mono bg-white text-black/85 px-[1.3rem] py-[0.5rem] rounded-full border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.03)] font-medium"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Group 2: Databases & Data Tier */}
              <div>
                <span className="text-[1.15rem] font-mono font-bold uppercase tracking-wider text-black/40 block mb-[0.7rem]">
                  Databases & Query Optimization
                </span>
                <div className="flex flex-wrap gap-[0.7rem]">
                  {['PostgreSQL', 'MySQL', 'Relational Schemas', 'SQL Query Optimization', 'Database Migrations', 'ACID Transactions'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="text-[1.25rem] font-mono bg-white text-black/85 px-[1.3rem] py-[0.5rem] rounded-full border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.03)] font-medium"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Group 3: AI & Intelligent Systems */}
              <div>
                <span className="text-[1.15rem] font-mono font-bold uppercase tracking-wider text-black/40 block mb-[0.7rem]">
                  AI & Intelligent Automation
                </span>
                <div className="flex flex-wrap gap-[0.7rem]">
                  {['LLM Integration', 'LangChain', 'RAG Retrieval', 'Vector Search', 'AI Automation Pipelines'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="text-[1.25rem] font-mono bg-white text-black/85 px-[1.3rem] py-[0.5rem] rounded-full border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.03)] font-medium"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Group 4: DevOps & Quality */}
              <div>
                <span className="text-[1.15rem] font-mono font-bold uppercase tracking-wider text-black/40 block mb-[0.7rem]">
                  DevOps, Tooling & Testing
                </span>
                <div className="flex flex-wrap gap-[0.7rem]">
                  {['Docker', 'Git / GitHub', 'CI/CD Pipelines', 'Linux', 'Unit Testing', 'Postman'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="text-[1.25rem] font-mono bg-white text-black/85 px-[1.3rem] py-[0.5rem] rounded-full border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.03)] font-medium"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-[1.8rem] mt-[1.2rem] border-t border-black/[0.08] flex items-center justify-between text-[1.2rem] font-mono text-black/50">
            <span>03</span>
            {onSelectTab && (
              <button
                onClick={() => onSelectTab(0)}
                className="hover:text-black transition-colors flex items-center gap-[0.4rem] cursor-pointer"
              >
                <span>Back to Top</span>
                <span>↑</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
