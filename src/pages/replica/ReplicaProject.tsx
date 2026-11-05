import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { selectedProjects } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaProject: React.FC = () => {
  const { projectId, slug } = useParams<{ projectId?: string; slug?: string }>();
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const activeId = slug || projectId;
  const project = selectedProjects.find((p) => p.id === activeId);

  useSEO({
    title: project ? `${project.title} — Rahul Teja` : 'Project — Rahul Teja',
    description: project ? project.summary : 'Project details and architecture.',
    url: project ? `https://www.nrahulteja.me/work/${project.id}` : 'https://www.nrahulteja.me/',
  });

  // Handle ESC key to navigate back to Home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showInfo) {
          setShowInfo(false);
        } else {
          navigate('/');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showInfo, navigate]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-24 overflow-x-hidden">
      {/* 1. Left Fixed Header + Dock Column (matches desktop anchor layout) */}
      <div className="fixed top-0 left-[25.7rem] h-screen flex flex-col justify-between py-[12rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:px-6 max-phone:pt-8 max-phone:pb-4 max-phone:left-0 max-phone:items-center">
        {/* Dynamic Header */}
        <ReplicaHeader
          title={project.title}
          subtitle={project.category}
          isProject={true}
        />

        {/* Navigation Dock with ⓘ toggle */}
        <ReplicaDock
          isProject={true}
          isProjectInfoOpen={showInfo}
          onToggleProjectInfo={() => setShowInfo(!showInfo)}
        />
      </div>

      {/* 2. Main Content Area: Right-aligned media & sections layout */}
      <div className="w-full flex justify-end pt-28 px-8 max-phone:pt-4 max-phone:px-4">
        <div className="w-[58rem] max-phone:w-full flex flex-col gap-10">
          {/* Hero Visual Card: Screenshot or Typographic Hero */}
          <div
            className="w-full h-[38rem] max-phone:h-[26rem] overflow-hidden bg-[#EAEAEA] shadow-md flex items-center justify-center relative"
            style={{ borderRadius: 32 }}
          >
            {project.hasLiveScreenshot && project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ borderRadius: 32 }}
              />
            ) : (
              <div className="w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br from-[#EAEAEA] to-[#DFDFDF]">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-white text-xs font-semibold uppercase tracking-wider text-light-black">
                    {project.category}
                  </span>
                  <span className="font-mono text-sm text-grey">Production Architecture</span>
                </div>
                <div className="my-auto">
                  <h2 className="text-3xl font-extrabold text-light-black tracking-tight mb-3">
                    {project.title}
                  </h2>
                  <p className="text-sm text-grey leading-relaxed max-w-lg">
                    {project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white/80 text-xs font-mono text-light-black">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Links: Visit Live Platform & GitHub Source */}
          <div className="flex items-center justify-end gap-3 flex-wrap">
            {project.isLive && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-light-black text-sm font-medium shadow-sm hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-transform"
                aria-label={`Visit live deployment for ${project.title}`}
              >
                <span>Visit Live Platform</span>
                <ArrowUpRight className="w-4 h-4 text-grey" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-light-black text-sm font-medium shadow-sm hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-transform"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <svg className="w-4 h-4 fill-current text-light-black" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
              <span>Source Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
            </a>
          </div>

          {/* Overview & Architecture Details */}
          <div className="flex flex-col gap-6">
            <section className="p-8 rounded-[24px] bg-white/70 backdrop-blur-sm border border-border-light flex flex-col gap-4">
              <h2 className="text-xl font-bold text-light-black">
                Overview & System Mandate
              </h2>
              <p className="text-base text-grey leading-relaxed whitespace-pre-line">
                {project.summary}
              </p>
            </section>

            {/* Architecture Highlights */}
            {project.architectureDetails.length > 0 && (
              <section className="p-8 rounded-[24px] bg-white/70 backdrop-blur-sm border border-border-light flex flex-col gap-4">
                <h2 className="text-xl font-bold text-light-black">
                  Architecture & Engineering Implementation
                </h2>
                <ul className="space-y-3">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-grey leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-light-black mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Stats / Benchmark Metrics */}
            {project.stats && project.stats.length > 0 && (
              <section className="p-8 rounded-[24px] bg-white/70 backdrop-blur-sm border border-border-light flex flex-col gap-4">
                <h2 className="text-xl font-bold text-light-black">
                  Performance & Core Metrics
                </h2>
                <div className="grid grid-cols-2 max-phone:grid-cols-1 gap-4">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-light-grey/60 border border-border-light flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-wider text-grey">{stat.label}</span>
                      <span className="text-lg font-bold text-light-black">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            <section className="p-8 rounded-[24px] bg-white/70 backdrop-blur-sm border border-border-light flex flex-col gap-4">
              <h2 className="text-xl font-bold text-light-black">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-light-grey border border-border-light text-xs font-mono font-medium text-light-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Slide-over Project Info Drawer */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="fixed top-28 left-8 z-50 w-[32rem] p-6 rounded-[24px] bg-white shadow-2xl border border-border-light"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-light">
              <h3 className="font-bold text-lg text-light-black">Project Details</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="p-1.5 rounded-full hover:bg-light-grey text-grey hover:text-light-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black cursor-pointer"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 py-4 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wider text-grey block">Project</span>
                <span className="font-semibold text-light-black">{project.title}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-grey block">Domain</span>
                <span className="font-medium text-light-black">{project.category}</span>
              </div>
              {project.liveUrl && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-grey block">Live Deployment</span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-black underline truncate block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                  >
                    {project.liveUrl}
                  </a>
                </div>
              )}
              <div>
                <span className="text-xs uppercase tracking-wider text-grey block">GitHub</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-black underline truncate block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                >
                  {project.githubUrl}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
