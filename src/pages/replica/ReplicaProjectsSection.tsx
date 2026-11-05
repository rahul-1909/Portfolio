import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { projectsDeck } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaProjectsSection: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Projects | Rahul Teja - Software Engineer',
    description: 'Production engineering, distributed systems, and AI workflows built by Rahul Teja.',
    url: 'https://www.nrahulteja.me/projects',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <main className="relative min-h-screen w-full bg-light-grey text-light-black overflow-x-hidden select-none">
      {/* 1. Left Column: Vertically Centered Title & Dock */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[42rem] flex flex-col justify-center items-start gap-[2.4rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-10 max-phone:pb-6 max-phone:left-0 max-phone:items-center max-phone:text-center">
        <div className="pointer-events-auto">
          <ReplicaHeader
            title="Projects"
            subtitle="Selected Works"
            isProject={true}
          />
        </div>

        <div className="pointer-events-auto">
          <ReplicaDock />
        </div>
      </div>

      {/* 2. Right Main Column: Scrolling Stack of 5 Full-Bleed Project Containers */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {projectsDeck.map((project, idx) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`Open project details for ${project.title}`}
              onClick={() => navigate(`/work/${project.id}`)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/work/${project.id}`)}
              className="relative w-full h-[55rem] max-phone:h-[38rem] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer group bg-[#16171D]"
            >
              {project.imageUrl ? (
                <>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </>
              ) : (
                <div
                  className="w-full h-full p-10 flex flex-col justify-between text-white"
                  style={{ backgroundColor: project.backgroundColor || '#1B1C20' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[1.1rem] font-mono tracking-widest uppercase text-white/50">
                      {project.category}
                    </span>
                    <span className="text-[1.2rem] font-mono text-white/40">0{idx + 1}</span>
                  </div>
                  <div className="my-auto">
                    <h3 className="text-[3rem] max-phone:text-[2.2rem] font-bold text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[1.3rem] text-white/70 pt-3 leading-relaxed max-w-md">
                      {project.oneLineOutcome}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.threeTags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-[1.1rem] font-mono text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Title & Count Overlay at Bottom */}
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between pointer-events-none z-10">
                <div>
                  <span className="text-[1.1rem] font-mono uppercase tracking-widest text-white/60 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-[2.2rem] max-phone:text-[1.7rem] font-bold text-white tracking-tight leading-tight drop-shadow-md">
                    {project.title}
                  </h3>
                </div>
                <span className="text-[1.4rem] font-mono font-medium text-white/70">
                  0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
