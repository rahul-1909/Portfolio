'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectSection } from '@/data/portfolioData';
import { GitHubIcon } from '@/components/Icons/SiteIcons';

interface ProjectCardViewProps {
  section: ProjectSection;
  index: number;
  showInfo: boolean;
  onToggleInfo?: () => void;
}

// Distinct bespoke theme styles for each of the 6 projects
const projectThemes = [
  // 0: NexusAI - Amber / Obsidian
  {
    gradient: 'from-[#1a140d] via-[#120e09] to-[#0a0805]',
    accentColor: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    accentBorder: 'rgba(245, 158, 11, 0.25)',
    category: 'CORRECTIVE RAG · MULTI-AGENT',
    status: 'LIVE DEMO',
    metric: 'Groq LPU · <180ms Latency',
    highlights: ['Dynamic DAG Workflows', 'Qdrant Hybrid Search', 'Grading Agents', 'Hallucination Self-Correction'],
  },
  // 1: Faultline Simulator - Cyan / Slate
  {
    gradient: 'from-[#0b1424] via-[#080d19] to-[#04070e]',
    accentColor: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    accentBorder: 'rgba(56, 189, 248, 0.25)',
    category: 'CHAOS & DISTRIBUTED SYSTEMS',
    status: 'LIVE SIMULATOR',
    metric: 'C++17 / Go Core · Real-time Kafka',
    highlights: ['Network Partitions', 'Raft Consensus Failover', 'Split-Brain Simulation', 'Latency Spike Injection'],
  },
  // 2: QueryAI - Emerald / Navy
  {
    gradient: 'from-[#061c1a] via-[#041211] to-[#020908]',
    accentColor: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    accentBorder: 'rgba(16, 185, 129, 0.25)',
    category: 'VOICE ANALYTICS · TEXT-TO-SQL',
    status: 'STREAMLIT LIVE',
    metric: 'Groq Whisper Dictation · MySQL',
    highlights: ['Voice-to-SQL Translation', 'Schema Graph Traversal', 'Auto Plotly Visualizations', 'SQL Injection Sandbox'],
  },
  // 3: ConvoLens AI - Violet / Indigo
  {
    gradient: 'from-[#150c26] via-[#0d071a] to-[#06030c]',
    accentColor: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.12)',
    accentBorder: 'rgba(168, 85, 247, 0.25)',
    category: 'AI OBSERVABILITY & QA',
    status: 'VERCEL LIVE',
    metric: 'HDBSCAN · LLM-as-a-Judge',
    highlights: ['Multi-Rubric Evaluation', 'Unsupervised Failure Clusters', 'Automated Root Cause (RCA)', 'FastAPI Async Pipeline'],
  },
  // 4: Radar-AI - Cobalt / Blue
  {
    gradient: 'from-[#0b162c] via-[#070e1c] to-[#040810]',
    accentColor: '#60a5fa',
    accentBg: 'rgba(96, 165, 250, 0.12)',
    accentBorder: 'rgba(96, 165, 250, 0.25)',
    category: 'AUTONOMOUS QA PLATFORM',
    status: 'OPEN SOURCE',
    metric: 'Next.js 16 · Selenium Chromium',
    highlights: ['Autonomous Test Synthesis', 'Self-Healing Selectors', 'Parallel Newman API Runner', 'Predictive Release Risk'],
  },
  // 5: Star Finance - Gold / Onyx
  {
    gradient: 'from-[#1c1508] via-[#130e05] to-[#0a0702]',
    accentColor: '#eab308',
    accentBg: 'rgba(234, 179, 8, 0.12)',
    accentBorder: 'rgba(234, 179, 8, 0.25)',
    category: 'ENTERPRISE FINTECH',
    status: 'ENTERPRISE SUITE',
    metric: 'Java 17 · Spring Boot 3.5 · Angular 20',
    highlights: ['Live Bullion Appraisals', 'Automated LTV Schedules', 'Multi-Factor Cashier RBAC', 'Immutable Audit Trails'],
  },
  // 6: Explore All Repositories - Obsidian Purple / Neon Violet
  {
    gradient: 'from-[#140e2b] via-[#0d091d] to-[#07050f]',
    accentColor: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.15)',
    accentBorder: 'rgba(168, 85, 247, 0.35)',
    category: 'GITHUB ECOSYSTEM · 22+ REPOS',
    status: 'ACTIVE PROFILE',
    metric: '22 Public Repositories · Active Contributions',
    highlights: ['Multi-Agent AI & Corrective RAG', 'Distributed Consensus & Chaos', 'Enterprise Java Microservices', 'Autonomous Test & QA Platforms'],
  },
];

export const ProjectCardView: React.FC<ProjectCardViewProps> = ({
  section,
  index,
  showInfo,
  onToggleInfo,
}) => {
  const isExploreRepos =
    section.section_title.toLowerCase().includes('explore') ||
    section.section_title.toLowerCase().includes('repositories') ||
    (section.repo_url && section.repo_url.includes('tab=repositories'));

  const theme = isExploreRepos
    ? projectThemes[6]
    : projectThemes[index % projectThemes.length];

  const techList = section.tech ? section.tech.split('·').map((t) => t.trim()) : [];
  const primaryUrl = section.live_url || section.repo_url;
  const isLiveDemo = !isExploreRepos && !!section.live_url && !section.live_url.includes('github.com');

  return (
    <div className="w-full h-full relative select-none flex flex-col justify-between overflow-hidden" style={{ borderRadius: 64 }}>
      {/* Front Card Surface */}
      <div
        className={`w-full h-full p-[5.4rem] max-phone:p-[3.2rem] flex flex-col justify-between bg-gradient-to-br ${theme.gradient} text-white relative overflow-hidden`}
        style={{ borderRadius: 64 }}
      >
        {/* Subtle decorative mesh glow */}
        <div
          className="absolute -top-[20%] -right-[20%] w-[36rem] h-[36rem] rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: theme.accentColor }}
        />

        {/* GitHub Watermark for Explore Repositories Card */}
        {isExploreRepos && (
          <div className="absolute -bottom-[4rem] -right-[4rem] opacity-[0.06] pointer-events-none text-white">
            <GitHubIcon width="36rem" height="36rem" color="#ffffff" />
          </div>
        )}

        {/* Top Header: Category Tag & Status Badge */}
        <div className="flex items-center justify-between w-full relative z-10 gap-[1.2rem] flex-wrap">
          <div className="flex items-center gap-[0.8rem]">
            {isExploreRepos && (
              <GitHubIcon className="w-[1.6rem] h-[1.6rem]" color={theme.accentColor} />
            )}
            <span
              className="text-[1.2rem] max-phone:text-[1rem] font-mono font-bold tracking-wider uppercase px-[1.2rem] py-[0.5rem] rounded-full border"
              style={{
                color: theme.accentColor,
                backgroundColor: theme.accentBg,
                borderColor: theme.accentBorder,
              }}
            >
              {theme.category}
            </span>
          </div>

          <div className="flex items-center gap-[0.6rem] bg-white/[0.06] border border-white/10 px-[1.2rem] py-[0.5rem] rounded-full">
            <span
              className={`w-[0.7rem] h-[0.7rem] rounded-full ${
                isLiveDemo || isExploreRepos ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-[1.1rem] max-phone:text-[0.95rem] font-mono text-white/80 font-medium">
              {theme.status}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="my-auto py-[2.4rem] relative z-10 flex flex-col gap-[1.8rem]">
          <div>
            <h2 className="text-[4.6rem] max-phone:text-[3rem] font-bold tracking-tight text-white leading-none mb-[1rem]">
              {section.section_title}
            </h2>
            <p className="text-[2rem] max-phone:text-[1.5rem] font-medium text-white/70 tracking-tight leading-snug">
              {section.subtitle}
            </p>
          </div>

          {/* Interactive Feature Architecture Box */}
          <div className="p-[2.2rem] max-phone:p-[1.6rem] rounded-[22px] bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col gap-[1.4rem]">
            <div className="flex items-center justify-between text-[1.2rem] font-mono text-white/50 border-b border-white/10 pb-[1rem]">
              <span>{isExploreRepos ? 'GITHUB ECOSYSTEM' : 'CORE ARCHITECTURE'}</span>
              <span style={{ color: theme.accentColor }}>{theme.metric}</span>
            </div>

            <div className="grid grid-cols-2 max-phone:grid-cols-1 gap-[1rem]">
              {theme.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-[0.8rem] text-[1.3rem] max-phone:text-[1.15rem] text-white/85">
                  <span
                    className="w-[0.5rem] h-[0.5rem] rounded-full shrink-0"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                  <span className="font-medium tracking-tight truncate">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer: Tech Badges & Live/Details Action */}
        <div className="flex items-end justify-between pt-[2.4rem] border-t border-white/10 relative z-10 gap-[1.6rem] flex-wrap">
          {/* Tech Badges */}
          <div className="flex items-center gap-[0.8rem] flex-wrap max-w-[65%] max-phone:max-w-full">
            {techList.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-[1.15rem] max-phone:text-[1rem] font-mono px-[1.1rem] py-[0.4rem] rounded-full bg-white/[0.08] text-white/90 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Interactive Action Badge / Explore CTA Button */}
          {isExploreRepos ? (
            <a
              href="https://github.com/rahul-1909?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="group/btn flex items-center gap-[1rem] text-[1.35rem] max-phone:text-[1.15rem] font-mono font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-[2rem] py-[0.9rem] rounded-full transition-all shrink-0 shadow-[0_4px_24px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_32px_rgba(168,85,247,0.5)] cursor-pointer"
            >
              <GitHubIcon className="w-[1.6rem] h-[1.6rem] text-white" />
              <span>Explore All Repositories</span>
              <span className="text-[#a855f7] font-bold text-[1.6rem] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">↗</span>
            </a>
          ) : (
            <div className="flex items-center gap-[0.6rem] text-[1.3rem] max-phone:text-[1.15rem] font-mono text-white/80 bg-white/10 hover:bg-white/20 px-[1.6rem] py-[0.8rem] rounded-full transition-colors shrink-0">
              <span>{isLiveDemo ? 'Live Demo' : 'View Code'}</span>
              <span style={{ color: theme.accentColor }}>↗</span>
            </div>
          )}
        </div>
      </div>

      {/* Description Overlay: Opens on Eye Button Click or Card Click */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-white/95 backdrop-blur-xl p-[5.4rem] max-phone:p-[3.2rem] flex flex-col justify-between z-30 select-text overflow-y-auto"
            style={{ borderRadius: 64 }}
            onClick={(e) => {
              // Allow interacting with links and text without bubbling to parent click
              e.stopPropagation();
            }}
          >
            <div className="flex flex-col justify-between h-full gap-[2.4rem]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header: Status & Tech */}
                <div className="flex items-center justify-between mb-[1.4rem] flex-wrap gap-[1rem]">
                  <span
                    className="text-[1.3rem] font-mono font-bold uppercase tracking-wider px-[1.2rem] py-[0.4rem] rounded-full"
                    style={{
                      color: theme.accentColor,
                      backgroundColor: theme.accentBg,
                    }}
                  >
                    {theme.category}
                  </span>
                  <span className="text-[1.2rem] font-mono bg-black/5 px-[1.2rem] py-[0.4rem] rounded-full text-light-black font-semibold">
                    {section.tech}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-[3.6rem] max-phone:text-[2.6rem] font-bold text-light-black tracking-tight leading-tight mb-[0.6rem]">
                  {section.section_title}
                </h2>
                <p className="text-[1.8rem] max-phone:text-[1.4rem] font-semibold text-grey mb-[2.4rem] tracking-tight">
                  {section.subtitle}
                </p>

                {/* Structured Body / README Description */}
                <div className="text-[1.6rem] max-phone:text-[1.35rem] leading-[1.65] text-[#333333] space-y-[1.6rem] font-normal">
                  {section.body.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('KEY ARCHITECTURE') || paragraph.startsWith('CORE ENGINEERING')) {
                      return (
                        <div
                          key={pIdx}
                          className="pt-[1.4rem] border-t border-black/10 text-[1.3rem] font-mono font-bold uppercase tracking-wider text-light-black"
                        >
                          {paragraph}
                        </div>
                      );
                    }
                    if (/^\d+\./.test(paragraph.trim())) {
                      return (
                        <div
                          key={pIdx}
                          className="pl-[1.4rem] border-l-2 border-light-black/20 text-[#222222] font-medium"
                        >
                          {paragraph}
                        </div>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-[#333333]">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </motion.div>

              {/* Bottom Actions: Live Demo / GitHub Link */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="pt-[2rem] border-t border-black/10 flex items-center justify-between flex-wrap gap-[1.2rem]"
              >
                <div className="flex items-center gap-[1.2rem]">
                  {primaryUrl && (
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-[2.2rem] py-[1.1rem] rounded-full bg-light-black text-white text-[1.4rem] font-semibold flex items-center gap-[0.8rem] hover:bg-black transition-colors"
                    >
                      <span>{isLiveDemo ? 'Open Live Demo' : 'View on GitHub'}</span>
                      <span className="text-[1.5rem]">↗</span>
                    </a>
                  )}
                  {section.repo_url && section.repo_url !== primaryUrl && (
                    <a
                      href={section.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-[2.2rem] py-[1.1rem] rounded-full bg-black/5 hover:bg-black/10 text-light-black text-[1.4rem] font-semibold flex items-center gap-[0.8rem] transition-colors"
                    >
                      <span>GitHub</span>
                      <span className="text-[1.5rem]">↗</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onToggleInfo}
                  className="text-[1.3rem] font-mono text-grey hover:text-light-black transition-colors underline cursor-pointer"
                >
                  Close Details
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
