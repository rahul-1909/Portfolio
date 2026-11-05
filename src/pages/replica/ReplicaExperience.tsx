import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { experienceData } from '../../data/experience';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaExperience: React.FC = () => {
  const navigate = useNavigate();
  const exp = experienceData[0];

  useSEO({
    title: 'Experience | Rahul Teja - Software Engineer',
    description: 'Professional software engineering experience at Virtusa as Full Stack Software Intern.',
    url: 'https://www.nrahulteja.me/experience',
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
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-32 overflow-x-hidden select-none">
      {/* 1. Left Column: Vertically Centered Title, Subtitle, & Dock */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[42rem] flex flex-col justify-center items-start gap-[2.4rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-10 max-phone:pb-6 max-phone:left-0 max-phone:items-center max-phone:text-center">
        <div className="pointer-events-auto">
          <ReplicaHeader
            title="Experience"
            subtitle="Work History"
            isProject={true}
          />
        </div>

        <div className="pointer-events-auto">
          <ReplicaDock />
        </div>

        {/* Verified Editorial Summary on Left */}
        <div className="pointer-events-auto max-phone:px-2 pt-2 max-w-[38rem]">
          <p className="text-[1.8rem] max-phone:text-[1.5rem] leading-[1.35] tracking-tight font-normal select-text">
            <span className="text-light-black font-semibold">Full Stack Software Intern</span>
            <span className="text-grey"> at </span>
            <span className="text-light-black font-semibold">Virtusa</span>
            <span className="text-grey"> (Chennai, India · August 2025 – June 2026).</span>
          </p>
        </div>
      </div>

      {/* 2. Right Main Column: Soft-Tinted Virtusa Container */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {/* Main Virtusa Container Card in Soft Clay Palette */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[32px] p-10 max-phone:p-6 bg-[#EDE7E2] text-light-black shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-6 border-b border-light-black/10">
              <span className="text-[1.1rem] font-mono uppercase tracking-widest text-[#555555]">
                Internship · Chennai
              </span>
              <span className="text-[1.1rem] font-mono text-[#777777]">
                Aug 2025 – Jun 2026
              </span>
            </div>

            <div className="py-8 space-y-3">
              <h3 className="text-[3.8rem] max-phone:text-[2.6rem] font-black tracking-tight text-light-black leading-none">
                Virtusa
              </h3>
              <p className="text-[1.8rem] max-phone:text-[1.4rem] font-semibold text-light-black">
                Full Stack Software Intern
              </p>
              <p className="text-[1.35rem] text-[#555555] pt-2 leading-relaxed font-normal">
                {exp.summary}
              </p>
            </div>

            {/* Verified Responsibilities */}
            <div className="py-6 border-t border-light-black/10 space-y-4">
              <span className="text-[1.1rem] font-mono uppercase tracking-wider text-[#777777] block">
                Engineering Responsibilities
              </span>
              <div className="space-y-3">
                {exp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-[1.35rem] text-[#333333] leading-relaxed">
                    <span className="text-light-black font-mono font-semibold text-[1.1rem] shrink-0 mt-1">0{idx + 1}.</span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Technologies */}
            <div className="pt-6 border-t border-light-black/10">
              <span className="text-[1.1rem] font-mono uppercase tracking-wider text-[#777777] block mb-3">
                Verified Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/70 text-[1.1rem] font-mono text-light-black shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
