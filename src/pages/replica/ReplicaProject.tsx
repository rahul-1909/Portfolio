import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { projectsDeck } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaProject: React.FC = () => {
  const { projectId, slug } = useParams<{ projectId?: string; slug?: string }>();
  const navigate = useNavigate();

  const activeId = slug || projectId;
  const project = projectsDeck.find((p) => p.id === activeId);

  useSEO({
    title: project ? `${project.title} | Rahul Teja - Software Engineer` : 'Project | Rahul Teja',
    description: project ? project.oneLineOutcome : 'Production engineering project architecture.',
    url: project ? `https://www.nrahulteja.me/work/${project.id}` : 'https://www.nrahulteja.me/',
  });

  // Handle ESC key to navigate back to Home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-24 overflow-x-hidden">
      {/* 1. Left Fixed Column: Title, Short Description, & Navigation Dock */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[38rem] flex flex-col justify-between py-[12rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-8 max-phone:pb-4 max-phone:left-0 max-phone:items-center">
        <div className="flex flex-col gap-4 max-phone:items-center max-phone:text-center pointer-events-auto">
          {/* Header */}
          <ReplicaHeader
            title={project.title}
            subtitle={project.category}
            isProject={true}
          />

          {/* Short Description in Left Column */}
          <p className="text-[1.4rem] max-phone:text-[1.6rem] text-grey leading-relaxed max-w-sm pt-2">
            {project.oneLineOutcome}
          </p>
        </div>

        {/* Navigation Dock */}
        <ReplicaDock />
      </div>

      {/* 2. Right Main Column: Exactly 3 Blocks (Image First -> Overview -> Stack & Links) */}
      <div className="w-full flex justify-end pt-28 px-8 max-phone:pt-6 max-phone:px-4">
        <div className="w-[58rem] max-phone:w-full flex flex-col gap-8">
          {/* BLOCK 1: Image First (Uncropped in Rounded Frame on Soft Muted Background) */}
          <div
            className="w-full p-6 max-phone:p-4 rounded-[28px] shadow-sm border border-black/5 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: project.backgroundColor || '#EAEAEA' }}
          >
            <div className="w-full rounded-[20px] bg-white shadow-xs border border-black/5 overflow-hidden flex flex-col">
              {/* Window Bar */}
              <div className="h-7 px-3.5 bg-[#F9F9F9] border-b border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0E0E0]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0E0E0]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0E0E0]" />
                </div>
                <span className="text-xs font-mono text-grey uppercase tracking-wider">
                  {project.category} · Live Application
                </span>
              </div>

              {/* Uncropped Frame Content */}
              <div className="w-full max-h-[38rem] max-phone:max-h-[26rem] p-3 flex items-center justify-center bg-white overflow-hidden">
                {project.hasLiveScreenshot && project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto max-h-[36rem] max-phone:max-h-[24rem] object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full py-16 px-8 flex flex-col items-center text-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-light-grey text-xs uppercase font-mono tracking-widest text-light-black">
                      System Architecture
                    </span>
                    <h3 className="text-2xl font-bold text-light-black max-w-md">
                      {project.title}
                    </h3>
                    <p className="text-sm text-grey max-w-sm">
                      {project.oneLineOutcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BLOCK 2: Overview (Summary & Core Architecture Implementation) */}
          <section className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-5">
            <h2 className="text-lg font-bold text-light-black">
              Overview & Engineering Implementation
            </h2>
            <p className="text-[1.4rem] max-phone:text-[1.6rem] text-[#4A4A4A] leading-relaxed">
              {project.summary}
            </p>
            <ul className="space-y-3 pt-2">
              {project.architectureDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[1.4rem] max-phone:text-[1.6rem] text-grey leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-light-black mt-2.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* BLOCK 3: Stack & Links */}
          <section className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-light-black">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-light-grey text-[1.2rem] max-phone:text-[1.3rem] font-medium text-light-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-border-light flex-wrap">
              {project.isLive && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-light-black text-white text-sm font-medium hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-opacity"
                  aria-label={`Visit live deployment for ${project.title}`}
                >
                  <span>Visit Live Platform</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border-light text-light-black text-sm font-medium hover:bg-light-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-colors"
                aria-label={`View GitHub repository for ${project.title}`}
              >
                <svg className="w-4 h-4 fill-current text-light-black" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                <span>Source Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
