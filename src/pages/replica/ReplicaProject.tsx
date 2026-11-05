import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { projectsDeck } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-[2.2rem] h-[2.2rem]" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`${className} fill-current`}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

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

  // Handle ESC key to navigate back to Home or close info panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isInfoOpen) {
          setIsInfoOpen(false);
        } else {
          navigate('/');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, isInfoOpen]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  // Screens list for vertical scroll
  const projectScreens: string[] = [];
  if (project.imageUrl) projectScreens.push(project.imageUrl);
  if (project.id === 'gold-lending-platform') {
    projectScreens.push('/assets/projects/gold-lending-platform-desktop.webp');
    projectScreens.push('/assets/projects/gold-lending-platform-mobile.webp');
  } else if (project.id === 'multi-agent-autonomous-rag') {
    projectScreens.push('/assets/projects/multi-agent-autonomous-rag-desktop.webp');
    projectScreens.push('/assets/projects/multi-agent-autonomous-rag-mobile.webp');
  } else if (project.id === 'linkedin-intelligence-api') {
    projectScreens.push('/assets/projects/linkedin-intelligence-api-desktop.webp');
    projectScreens.push('/assets/projects/linkedin-intelligence-api-mobile.webp');
  } else if (project.id === 'nl-to-sql-converter') {
    projectScreens.push('/assets/projects/nl-to-sql-converter-desktop.webp');
    projectScreens.push('/assets/projects/nl-to-sql-converter-mobile.webp');
  }

  return (
    <main className="relative min-h-screen w-full bg-light-grey text-light-black overflow-x-hidden">
      {/* 1. Left Column: Vertically Centered Title, Subtitle, & Below It: Info + External Pills */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[42rem] flex flex-col justify-center items-start gap-[3.2rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-10 max-phone:pb-6 max-phone:left-0 max-phone:items-center max-phone:text-center">
        
        {/* Name / Project Title Block */}
        <div className="flex flex-col gap-0 select-none pointer-events-auto">
          <ReplicaHeader
            title={project.title}
            subtitle={project.category}
            isProject={true}
          />
        </div>

        {/* Two Pills directly below title & subtitle: Info Pill (ⓘ) and External Link Pill (↗) */}
        <div className="flex items-center gap-[1.2rem] max-phone:gap-[0.8rem] pointer-events-auto">
          {/* Back Pill */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2"
            aria-label="Back to Projects Wheel"
          >
            <ArrowLeft className="w-[2.2rem] h-[2.2rem] text-light-black" />
          </motion.button>

          {/* Info Pill (ⓘ) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className={`w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] flex items-center justify-center shadow-sm cursor-pointer select-none transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 ${
              isInfoOpen ? 'bg-light-black text-white' : 'bg-white text-light-black hover:shadow-md'
            }`}
            aria-label="Toggle Project Overview Information"
            aria-expanded={isInfoOpen}
          >
            <span className="font-mono text-[2.2rem] font-bold">ⓘ</span>
          </motion.button>

          {/* External Live Link Pill (↗) */}
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2"
              aria-label="Open Live Application"
            >
              <ArrowUpRight className="w-[2.2rem] h-[2.2rem] text-light-black" />
            </motion.a>
          )}

          {/* Source Code Link Pill */}
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2"
              aria-label="View Source Code on GitHub"
            >
              <GitHubIcon className="w-[2.2rem] h-[2.2rem] text-light-black" />
            </motion.a>
          )}
        </div>

        {/* Info Overlay Panel: Toggled by ⓘ Pill over the Left Column */}
        <AnimatePresence>
          {isInfoOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="absolute left-0 top-[calc(50%+6.5rem)] w-[44rem] max-phone:static max-phone:w-full p-8 rounded-[32px] bg-white/95 backdrop-blur-md shadow-2xl border border-border-light pointer-events-auto z-50 text-light-black max-phone:mt-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border-light mb-4">
                <span className="text-xs uppercase font-mono tracking-widest text-grey">Project Details</span>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="p-1 rounded-full hover:bg-light-grey text-grey hover:text-light-black transition-colors"
                  aria-label="Close Info Panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[1.4rem] leading-relaxed text-light-black mb-4">
                {project.summary || project.oneLineOutcome}
              </p>

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
        <div className="w-[58rem] max-phone:w-full flex flex-col gap-10">
          {projectScreens.length > 0 ? (
            projectScreens.map((screenUrl, idx) => (
              <div
                key={idx}
                className="w-full rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-[#EDEDED]"
              >
                <img
                  src={screenUrl}
                  alt={`${project.title} - View ${idx + 1}`}
                  className="w-full h-auto object-cover select-none"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))
          ) : (
            /* Fallback Cover for Projects with no image */
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
