import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { GitHubIcon } from '../../components/replica/ReplicaIcons';
import { projectsDeck } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaProject: React.FC = () => {
  const { projectId, slug } = useParams<{ projectId?: string; slug?: string }>();
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const activeId = slug || projectId;
  const project = projectsDeck.find((p) => p.id === activeId);

  useSEO({
    title: project ? `${project.title} | Rahul Teja - Software Engineer` : 'Project | Rahul Teja',
    description: project ? project.oneLineOutcome : 'Production engineering project architecture.',
    url: project ? `https://www.nrahulteja.me/work/${project.id}` : 'https://www.nrahulteja.me/',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isInfoOpen) {
          setIsInfoOpen(false);
        } else {
          navigate('/projects');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, isInfoOpen]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Screens list: cover image + natural desktop view
  const projectScreens: string[] = [];
  if (project.imageUrl) projectScreens.push(project.imageUrl);
  if (project.id === 'gold-lending-platform') {
    projectScreens.push('/assets/projects/gold-lending-platform-desktop.webp');
  } else if (project.id === 'multi-agent-autonomous-rag') {
    projectScreens.push('/assets/projects/multi-agent-autonomous-rag-desktop.webp');
  } else if (project.id === 'linkedin-intelligence-api') {
    projectScreens.push('/assets/projects/linkedin-intelligence-api-desktop.webp');
  } else if (project.id === 'nl-to-sql-converter') {
    projectScreens.push('/assets/projects/nl-to-sql-converter-desktop.webp');
  }

  return (
    <main className="relative min-h-screen w-full bg-light-grey text-light-black overflow-x-hidden select-none">
      {/* 1. Left Column: Vertically Centered Title, Subtitle, & Dock */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[42rem] flex flex-col justify-center items-start gap-[2.4rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-10 max-phone:pb-6 max-phone:left-0 max-phone:items-center max-phone:text-center">
        {/* Name / Project Title Block */}
        <div className="flex flex-col gap-0 select-none pointer-events-auto">
          <ReplicaHeader
            title={project.title}
            subtitle={project.category}
            isProject={true}
          />
        </div>

        {/* Project Dock: Back Arrow, Info Pill, and Live URL Pill */}
        <div className="pointer-events-auto">
          <ReplicaDock
            isProject={true}
            liveUrl={project.liveUrl}
            onToggleProjectInfo={() => setIsInfoOpen(!isInfoOpen)}
            isProjectInfoOpen={isInfoOpen}
            backPath="/projects"
          />
        </div>

        {/* Info Overlay Panel: Toggled by ⓘ Pill */}
        <AnimatePresence>
          {isInfoOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="w-[42rem] max-phone:static max-phone:w-full p-8 rounded-[32px] bg-white shadow-2xl border border-border-light pointer-events-auto z-50 text-light-black max-phone:mt-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border-light mb-4">
                <span className="text-xs uppercase font-mono tracking-widest text-grey">Project Details</span>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="p-1 rounded-full hover:bg-light-grey text-grey hover:text-light-black transition-colors"
                  aria-label="Close Info Panel"
                >
                  ✕
                </button>
              </div>

              <p className="text-[1.35rem] leading-relaxed text-light-black mb-4 select-text">
                {project.summary || project.oneLineOutcome}
              </p>

              {project.architectureDetails && project.architectureDetails.length > 0 && (
                <div className="mb-4 space-y-1.5 select-text">
                  <span className="text-[1.1rem] font-mono text-grey uppercase tracking-wider block mb-2">Key Highlights</span>
                  {project.architectureDetails.map((detail, idx) => (
                    <p key={idx} className="text-[1.2rem] text-grey leading-snug">
                      • {detail}
                    </p>
                  ))}
                </div>
              )}

              {project.techStack && project.techStack.length > 0 && (
                <div className="mb-4">
                  <span className="text-[1.1rem] font-mono text-grey uppercase tracking-wider block mb-2">Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-light-grey text-[1.1rem] font-medium text-light-black">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[1.2rem] font-semibold text-light-black hover:text-grey transition-colors pt-2"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>View Repository on GitHub ↗</span>
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Right Main Column: Stack of Large Full-Bleed Rounded Images (radius 32px), No Text Boxes */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {projectScreens.length > 0 ? (
            projectScreens.map((screenUrl, idx) => (
              <div
                key={idx}
                className="w-full rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-[#EDEDED]"
              >
                <img
                  src={screenUrl}
                  alt={`${project.title} - View ${idx + 1}`}
                  className="w-full h-auto block select-none"
                  style={{ objectFit: 'contain' }}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))
          ) : (
            <div
              className="w-full h-[50rem] rounded-[32px] p-12 flex flex-col justify-between text-white shadow-sm"
              style={{ backgroundColor: project.backgroundColor || '#1B1C20' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[1.2rem] font-mono tracking-widest uppercase text-white/50">
                  {project.category}
                </span>
                <span className="w-3 h-3 rounded-full bg-white/30" />
              </div>
              <div className="my-auto">
                <h2 className="text-[3.6rem] font-bold text-white tracking-tight leading-tight">
                  {project.title}
                </h2>
                <p className="text-[1.6rem] text-white/70 pt-4 leading-relaxed max-w-lg">
                  {project.oneLineOutcome}
                </p>
              </div>
              <p className="text-[1.3rem] font-mono text-white/40">
                System Architecture
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
