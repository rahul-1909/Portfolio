import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { GitHubIcon } from '../../components/replica/ReplicaIcons';
import { projectsData } from '../../data/projects';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaProject: React.FC = () => {
  const { projectId, slug } = useParams<{ projectId?: string; slug?: string }>();
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const activeId = slug || projectId;
  const project = projectsData.find((p) => p.id === activeId);

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

  // Pure illustrative WebP renders (no live website screenshots)
  const screens = project.detailImages && project.detailImages.length > 0
    ? project.detailImages
    : [project.coverImage];

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
                {project.description || project.oneLineOutcome}
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

      {/* 2. Right Main Column: Stack of Illustrative Images (radius 32px) */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {screens.map((screenUrl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-[#EDEDED]"
            >
              <img
                src={screenUrl}
                alt={`${project.title} - View ${idx + 1}`}
                className="w-full h-auto block select-none"
                style={{ objectFit: 'cover' }}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};
