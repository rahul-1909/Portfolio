import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const handleCardClick = (project: typeof projectsDeck[0]) => {
    if (project.id === 'explore-more-projects') {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/work/${project.id}`);
    }
  };

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

      {/* 2. Right Main Column: Scrolling Stack of Full-Bleed Project Containers */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {projectsDeck.map((project, idx) => (
            <motion.div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`Open project details for ${project.title}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(project)}
              className="relative w-full h-[55rem] max-phone:h-[38rem] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer group"
              style={{ backgroundColor: project.backgroundColor || '#E3E7EB' }}
            >
              {project.imageUrl ? (
                <>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                </>
              ) : null}

              {/* Title & Index Overlay at Bottom */}
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between pointer-events-none z-10">
                <div>
                  <span className="text-[1.1rem] font-mono uppercase tracking-widest text-white/80 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-[2.2rem] max-phone:text-[1.7rem] font-bold text-white tracking-tight leading-tight drop-shadow-md">
                    {project.title}
                  </h3>
                </div>
                <span className="text-[1.3rem] font-mono font-medium text-white/80">
                  0{idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};
