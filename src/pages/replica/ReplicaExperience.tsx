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
    <main className="relative min-h-screen w-full bg-light-grey text-light-black overflow-x-hidden select-none">
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

      {/* 2. Right Main Column: Vertically Centered, Expanded Virtusa Container */}
      <div className="fixed top-0 right-0 h-screen w-full flex items-center justify-end pr-[25.7rem] pointer-events-none z-30 max-phone:static max-phone:h-auto max-phone:px-6 max-phone:pb-16 max-phone:pt-6 max-phone:pr-6 max-phone:pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-[62rem] max-phone:w-full rounded-[36px] p-12 max-phone:p-7 bg-[#EDE7E2] text-light-black shadow-lg flex flex-col justify-between max-h-[88vh] overflow-y-auto"
        >
          {/* Card Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-light-black/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[1.2rem] font-mono uppercase tracking-widest text-[#555555] font-semibold">
                Internship · Chennai, India
              </span>
            </div>
            <span className="text-[1.2rem] font-mono text-[#666666] font-medium">
              Aug 2025 – Jun 2026
            </span>
          </div>

          {/* Company & Role Headline */}
          <div className="py-8 max-phone:py-6 space-y-3">
            <h3 className="text-[4.2rem] max-phone:text-[3.0rem] font-black tracking-tight text-light-black leading-none">
              Virtusa
            </h3>
            <p className="text-[2.0rem] max-phone:text-[1.6rem] font-semibold text-light-black">
              Full Stack Software Intern
            </p>
            <p className="text-[1.45rem] max-phone:text-[1.25rem] text-[#444444] pt-2 leading-relaxed font-normal">
              {exp.summary}
            </p>
          </div>

          {/* Verified Responsibilities */}
          <div className="py-6 border-t border-light-black/10 space-y-4">
            <span className="text-[1.15rem] font-mono uppercase tracking-wider text-[#666666] font-semibold block">
              Core Engineering Responsibilities
            </span>
            <div className="space-y-3.5">
              {exp.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-[1.4rem] max-phone:text-[1.2rem] text-[#222222] leading-relaxed">
                  <span className="text-light-black font-mono font-bold text-[1.2rem] shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Technologies */}
          <div className="pt-6 border-t border-light-black/10">
            <span className="text-[1.15rem] font-mono uppercase tracking-wider text-[#666666] font-semibold block mb-3">
              Verified Production Stack
            </span>
            <div className="flex flex-wrap gap-2.5">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full bg-white text-[1.15rem] max-phone:text-[1.05rem] font-mono text-light-black shadow-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
