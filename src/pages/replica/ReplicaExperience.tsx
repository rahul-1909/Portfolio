import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

      {/* 2. Right Main Column: Virtusa Container & Responsibilities Stack (NO GLOBE) */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {/* Main Virtusa Container Card */}
          <div className="w-full rounded-[32px] p-10 max-phone:p-6 bg-[#1A1D20] text-white shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-[1.1rem] font-mono uppercase tracking-widest text-emerald-400">
                Internship · Chennai
              </span>
              <span className="text-[1.1rem] font-mono text-white/50">
                Aug 2025 – Jun 2026
              </span>
            </div>

            <div className="py-8 space-y-3">
              <h3 className="text-[3.8rem] max-phone:text-[2.6rem] font-black tracking-tight text-white leading-none">
                Virtusa
              </h3>
              <p className="text-[1.8rem] max-phone:text-[1.4rem] font-semibold text-white/90">
                Full Stack Software Intern
              </p>
              <p className="text-[1.35rem] text-white/70 pt-2 leading-relaxed font-normal">
                {exp.summary}
              </p>
            </div>

            {/* Verified Responsibilities from src/data/experience.ts */}
            <div className="py-6 border-t border-white/10 space-y-4">
              <span className="text-[1.1rem] font-mono uppercase tracking-wider text-white/40 block">
                Engineering Responsibilities
              </span>
              <div className="space-y-3">
                {exp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-[1.3rem] text-white/80 leading-relaxed">
                    <span className="text-emerald-400 font-mono text-[1.1rem] shrink-0 mt-1">0{idx + 1}.</span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Technologies */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-[1.1rem] font-mono uppercase tracking-wider text-white/40 block mb-3">
                Verified Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/10 text-[1.1rem] font-mono text-white/80 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
