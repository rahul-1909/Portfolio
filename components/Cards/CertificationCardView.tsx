'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectSection } from '@/data/portfolioData';

// TOGGLE FLAG: Set to true for full-size original certificates; set to false to revert to synthetic UI cards.
export const USE_ORIGINAL_CERTIFICATES = true;

interface CertificationCardViewProps {
  section: ProjectSection;
  index: number;
  showInfo: boolean;
  onToggleInfo?: () => void;
}

// Visual styling metadata for certificates & fallback cards
const certThemes = [
  // 0: Microsoft MLOps Associate
  {
    gradient: 'from-[#0b172a] via-[#07101e] to-[#040810]',
    cardBg: '#ffffff',
    certFile: 'cert_ms_mlops_master.png',
    accentColor: '#00a4ef',
    accentBg: 'rgba(0, 164, 239, 0.12)',
    accentBorder: 'rgba(0, 164, 239, 0.28)',
    category: 'AI / MLOPS',
    issuer: 'Microsoft',
    recordType: 'OFFICIAL RECORD',
    status: 'VERIFIED CREDENTIAL',
    metric: 'Credential ID: 351C672DE3DD3551',
    logoType: 'microsoft',
    highlights: ['Production ML Pipelines', 'Azure ML Workspaces', 'Model Deployment', 'CI/CD & Monitoring'],
  },
  // 1: Microsoft SQL AI Developer
  {
    gradient: 'from-[#061c1a] via-[#041211] to-[#020908]',
    cardBg: '#ffffff',
    certFile: 'cert_ms_sql_ai_master.png',
    accentColor: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    accentBorder: 'rgba(16, 185, 129, 0.28)',
    category: 'DATA & SQL AI',
    issuer: 'Microsoft',
    recordType: 'OFFICIAL RECORD',
    status: 'VERIFIED CREDENTIAL',
    metric: 'Credential ID: B7191AAF49134FC8',
    logoType: 'microsoft',
    highlights: ['Semantic Search Workflows', 'Vector Embeddings', 'AI Data Pipelines', 'T-SQL Query Optimization'],
  },
  // 2: Microsoft Azure Data
  {
    gradient: 'from-[#0d1c33] via-[#091424] to-[#050a12]',
    cardBg: '#ffffff',
    certFile: 'cert_ms_azure_data_master.png',
    accentColor: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    accentBorder: 'rgba(56, 189, 248, 0.28)',
    category: 'AZURE CLOUD DATA',
    issuer: 'Microsoft',
    recordType: 'OFFICIAL RECORD',
    status: 'VERIFIED CREDENTIAL',
    metric: 'Credential ID: FEDB73DCFCA7E3E0',
    logoType: 'microsoft',
    highlights: ['Azure Data Architecture', 'Cosmos DB NoSQL Modeling', 'Relational SQL Analytics', 'Modern Lakehouse & ETL'],
  },
  // 3: Microsoft Azure AI Fundamentals
  {
    gradient: 'from-[#0a1633] via-[#060e24] to-[#040814]',
    cardBg: '#ffffff',
    certFile: 'cert_ms_azure_ai_master.png',
    accentColor: '#0078d4',
    accentBg: 'rgba(0, 120, 212, 0.12)',
    accentBorder: 'rgba(0, 120, 212, 0.28)',
    category: 'AI FUNDAMENTALS',
    issuer: 'Microsoft',
    recordType: 'OFFICIAL RECORD',
    status: 'VERIFIED CREDENTIAL',
    metric: 'Certiport: SrMn-uScT',
    logoType: 'microsoft',
    highlights: ['Azure AI Services', 'Computer Vision Workloads', 'Natural Language Processing', 'Conversational AI'],
  },
  // 4: AWS Certified Cloud Practitioner
  {
    gradient: 'from-[#1c1408] via-[#140e05] to-[#0a0702]',
    cardBg: '#ffffff',
    certFile: 'cert_aws_practitioner_master.png',
    accentColor: '#ff9900',
    accentBg: 'rgba(255, 153, 0, 0.14)',
    accentBorder: 'rgba(255, 153, 0, 0.3)',
    category: 'CLOUD ARCHITECTURE',
    issuer: 'Amazon Web Services (AWS)',
    recordType: 'OFFICIAL CERTIFICATE',
    status: 'VERIFIED CREDENTIAL',
    metric: 'Issued: August 4, 2024',
    logoType: 'aws',
    highlights: ['AWS Core Infrastructure', 'IAM & Zero-Trust Security', 'High Availability Design', 'Cloud Cost Optimization'],
  },
  // 5: Anthropic Claude 101
  {
    gradient: 'from-[#1c1214] via-[#140c0e] to-[#0a0607]',
    cardBg: '#ffffff',
    certFile: 'cert_anthropic_claude_101.png',
    accentColor: '#cc785c',
    accentBg: 'rgba(204, 120, 92, 0.15)',
    accentBorder: 'rgba(204, 120, 92, 0.35)',
    category: 'LLM & PROMPTING',
    issuer: 'Anthropic',
    recordType: 'OFFICIAL CERTIFICATE',
    status: 'VERIFIED CREDENTIAL',
    metric: 'Credential: dsermfpyca5o',
    logoType: 'anthropic',
    highlights: ['Claude 3.5 Architecture', 'Prompt Engineering Principles', 'Long-Context Optimization', 'Tool Use & Function Calling'],
  },
  // 6: Anthropic AI Fluency
  {
    gradient: 'from-[#170e28] via-[#100a1c] to-[#08050e]',
    cardBg: '#ffffff',
    certFile: 'cert_anthropic_ai_fluency.png',
    accentColor: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.14)',
    accentBorder: 'rgba(168, 85, 247, 0.32)',
    category: 'AGENTIC AI SYSTEMS',
    issuer: 'Anthropic',
    recordType: 'OFFICIAL CERTIFICATE',
    status: 'VERIFIED CREDENTIAL',
    metric: 'Credential: g59ydrrtrryt',
    logoType: 'anthropic',
    highlights: ['Frontier Model Foundations', 'Autonomous Agentic Systems', 'AI Safety & Alignment', 'Rigorous Model Evaluation'],
  },
];

export const CertificationCardView: React.FC<CertificationCardViewProps> = ({
  section,
  index,
  showInfo,
  onToggleInfo,
}) => {
  const theme = certThemes[index % certThemes.length];
  const skillsList = section.tech ? section.tech.split('·').map((t) => t.trim()) : [];
  const verifyUrl = section.live_url || section.repo_url;
  const certImageSrc = section.image || `/certificates/${theme.certFile}`;

  return (
    <div
      className="w-full h-auto relative select-none flex flex-col justify-center items-center overflow-hidden rounded-[16px] md:rounded-[24px] touch-pan-y"
      style={{ touchAction: 'pan-y' }}
    >
      {USE_ORIGINAL_CERTIFICATES ? (
        /* ================= FULL-SIZE ORIGINAL MASTER CERTIFICATE VIEW ================= */
        <div
          className="w-full h-auto relative flex items-center justify-center overflow-hidden rounded-[16px] md:rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.14)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)] transition-all duration-300 border border-black/10 bg-white group/cert touch-pan-y"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Natural Full-Length Certificate Image */}
          <img
            src={certImageSrc}
            alt={section.section_title}
            className="w-full h-auto object-contain block select-none pointer-events-none transition-transform duration-500 ease-out group-hover/cert:scale-[1.01]"
            loading="eager"
          />

          {/* Dedicated Floating Verification CTA at Bottom Right (Only if valid verification URL exists) */}
          {verifyUrl && (
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute bottom-[1.4rem] right-[1.4rem] md:bottom-[2.2rem] md:right-[2.2rem] z-20 flex items-center gap-[0.8rem] text-[1.2rem] md:text-[1.3rem] font-mono font-semibold px-[1.6rem] md:px-[2rem] py-[0.8rem] md:py-[1rem] rounded-full bg-black/30 hover:bg-black/45 text-white backdrop-blur-xl border border-white/25 hover:border-white/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.5)] cursor-pointer group/cta"
            >
              <span>Verify Credential</span>
              <span className="font-bold text-[1.4rem] md:text-[1.5rem] group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform">
                ↗
              </span>
            </a>
          )}
        </div>
      ) : (
        /* ================= PREVIOUS SYNTHETIC UI CARD VIEW (PRESERVED FOR INSTANT REVERT) ================= */
        <div
          className={`w-full h-auto md:h-full p-[2.4rem] md:p-[4.4rem] flex flex-col justify-between bg-gradient-to-br ${theme.gradient} text-white relative overflow-hidden rounded-[32px] md:rounded-[64px] gap-[2rem] md:gap-0`}
        >
          <div
            className="absolute -top-[20%] -right-[20%] w-[38rem] h-[38rem] rounded-full blur-[110px] pointer-events-none opacity-25"
            style={{ backgroundColor: theme.accentColor }}
          />

          <div className="flex items-center justify-between w-full relative z-10 gap-[1rem] flex-wrap">
            <div className="flex items-center gap-[1.2rem]">
              <div className="p-[0.8rem] rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 shadow-sm">
                {theme.logoType === 'microsoft' && (
                  <div className="grid grid-cols-2 gap-[2px] w-[1.7rem] h-[1.7rem]">
                    <div className="w-[0.75rem] h-[0.75rem] bg-[#F25022] rounded-[2px]" />
                    <div className="w-[0.75rem] h-[0.75rem] bg-[#7FBA00] rounded-[2px]" />
                    <div className="w-[0.75rem] h-[0.75rem] bg-[#00A4EF] rounded-[2px]" />
                    <div className="w-[0.75rem] h-[0.75rem] bg-[#FFB900] rounded-[2px]" />
                  </div>
                )}
                {theme.logoType === 'aws' && (
                  <div className="w-[1.7rem] h-[1.7rem] rounded-full bg-[#FF9900] flex items-center justify-center text-[0.95rem] font-bold text-white leading-none">
                    A
                  </div>
                )}
                {theme.logoType === 'anthropic' && (
                  <div className="w-[1.7rem] h-[1.7rem] rounded-full bg-white text-black flex items-center justify-center text-[1rem] font-bold leading-none">
                    ✦
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-[1.25rem] font-mono font-bold uppercase tracking-wider text-white">
                  {theme.issuer}
                </span>
                <span className="text-[1.05rem] font-mono uppercase tracking-widest text-white/50">
                  {section.badge || `Credential 0${index + 1}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-[0.8rem]">
              <span
                className="text-[1.05rem] md:text-[1.1rem] font-mono font-bold tracking-wider uppercase px-[1.1rem] py-[0.4rem] rounded-full border"
                style={{
                  color: theme.accentColor,
                  backgroundColor: theme.accentBg,
                  borderColor: theme.accentBorder,
                }}
              >
                {theme.category}
              </span>

              <div className="flex items-center gap-[0.5rem] bg-white/[0.06] border border-white/10 px-[1.1rem] py-[0.4rem] rounded-full">
                <span className="w-[0.65rem] h-[0.65rem] rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[1rem] md:text-[1.05rem] font-mono text-white/80 font-medium">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          <div className="my-auto py-[1.2rem] md:py-[1.8rem] relative z-10 flex flex-col gap-[1.4rem]">
            <div>
              <h2 className="text-[2.2rem] md:text-[3.2rem] font-bold tracking-tight text-white leading-[1.2] mb-[0.8rem]">
                {section.section_title}
              </h2>
              <p className="text-[1.35rem] md:text-[1.5rem] font-normal text-white/70 tracking-tight leading-relaxed max-w-[50rem]">
                {section.body.split('\n\n')[0]}
              </p>
            </div>

            <div className="p-[1.6rem] md:p-[1.8rem] rounded-[20px] bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col gap-[1.2rem]">
              <div className="flex items-center justify-between text-[1.1rem] md:text-[1.15rem] font-mono text-white/50 border-b border-white/10 pb-[0.8rem] flex-wrap gap-[0.4rem]">
                <span>VALIDATED COMPETENCIES</span>
                <span style={{ color: theme.accentColor }}>{theme.metric}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.8rem]">
                {theme.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-[0.7rem] text-[1.15rem] md:text-[1.2rem] text-white/85">
                    <span
                      className="w-[0.5rem] h-[0.5rem] rounded-full shrink-0"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <span className="font-medium tracking-tight">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-[1.6rem] md:pt-[1.8rem] border-t border-white/10 relative z-10 gap-[1.2rem] flex-wrap">
            <div className="flex items-center gap-[0.6rem] flex-wrap max-w-full">
              {skillsList.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[1.05rem] md:text-[1.1rem] font-mono px-[1rem] py-[0.35rem] rounded-full bg-white/[0.08] text-white/90 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {verifyUrl && (
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="group/btn flex items-center gap-[0.8rem] text-[1.2rem] md:text-[1.3rem] font-mono font-semibold text-white bg-black/30 hover:bg-black/45 border border-white/25 hover:border-white/40 px-[1.6rem] md:px-[1.8rem] py-[0.8rem] rounded-full backdrop-blur-xl transition-all shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <span>Verify Credential</span>
                <span
                  style={{ color: theme.accentColor }}
                  className="font-bold text-[1.4rem] md:text-[1.5rem] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                >
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Description Overlay: Opens on Eye Button Click */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-white/95 backdrop-blur-xl p-[5.4rem] max-phone:p-[3.2rem] flex flex-col justify-between z-30 select-text overflow-y-auto rounded-[16px] md:rounded-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col justify-between h-full gap-[2.4rem]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
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

                <h2 className="text-[3.4rem] max-phone:text-[2.4rem] font-bold text-light-black tracking-tight leading-tight mb-[0.6rem]">
                  {section.section_title}
                </h2>
                <p className="text-[1.8rem] max-phone:text-[1.4rem] font-semibold text-grey mb-[2.4rem] tracking-tight">
                  {section.subtitle}
                </p>

                <div className="text-[1.6rem] max-phone:text-[1.35rem] leading-[1.65] text-[#333333] space-y-[1.6rem] font-normal">
                  {section.body.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('VALIDATED CAPABILITIES')) {
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

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="pt-[2rem] border-t border-black/10 flex items-center justify-between flex-wrap gap-[1.2rem]"
              >
                {verifyUrl ? (
                  <a
                    href={verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-[2.4rem] py-[1.2rem] rounded-full bg-light-black text-white text-[1.4rem] font-semibold flex items-center gap-[0.8rem] hover:bg-black transition-colors"
                  >
                    <span>Open Official Verification</span>
                    <span className="text-[1.5rem]">↗</span>
                  </a>
                ) : (
                  <span className="px-[2.4rem] py-[1.2rem] rounded-full bg-black/5 text-[#555555] text-[1.3rem] font-mono font-medium">
                    Offline Verifiable Credential
                  </span>
                )}

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
