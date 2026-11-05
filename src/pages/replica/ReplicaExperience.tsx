import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { experience } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaExperience: React.FC = () => {
  const navigate = useNavigate();
  const virtusa = experience[0];

  useSEO({
    title: 'Experience | Rahul Teja - Software Engineer',
    description: 'Professional software engineering experience at Virtusa. Full Stack Software Intern specializing in backend APIs and data systems.',
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
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-24 overflow-x-hidden">
      {/* 1. Left Fixed Column: Title, Short Description, & Navigation Dock */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[38rem] flex flex-col justify-between py-[12rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-8 max-phone:pb-4 max-phone:left-0 max-phone:items-center">
        <div className="flex flex-col gap-4 max-phone:items-center max-phone:text-center pointer-events-auto">
          <ReplicaHeader
            title="Experience"
            subtitle="Professional History"
            isProject={true}
          />
          <p className="text-[1.4rem] max-phone:text-[1.6rem] text-grey leading-relaxed max-w-sm pt-2">
            Engineering scalable backend services, microservices APIs, and automated development environments.
          </p>
        </div>

        {/* Navigation Dock */}
        <ReplicaDock />
      </div>

      {/* 2. Right Main Column: Exactly 3 Clean Blocks */}
      <div className="w-full flex justify-end pt-28 px-8 max-phone:pt-6 max-phone:px-4">
        <div className="w-[58rem] max-phone:w-full flex flex-col gap-8">
          {/* BLOCK 1: Role & Company Overview */}
          <div className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-grey">
                  {virtusa.company} · {virtusa.location}
                </span>
                <h1 className="text-2xl font-bold text-light-black mt-1">
                  {virtusa.role}
                </h1>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-light-grey font-mono text-xs text-light-black font-medium">
                {virtusa.period}
              </span>
            </div>

            <p className="text-[1.4rem] max-phone:text-[1.6rem] text-[#4A4A4A] leading-relaxed pt-2">
              {virtusa.summary}
            </p>
          </div>

          {/* BLOCK 2: Core Engineering Contributions */}
          <section className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-5">
            <h2 className="text-lg font-bold text-light-black">
              Key Engineering Responsibilities
            </h2>
            <ul className="space-y-3.5">
              {virtusa.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[1.4rem] max-phone:text-[1.6rem] text-grey leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-light-black mt-2.5 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* BLOCK 3: Technology Stack & Core Competencies */}
          <section className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-4">
            <h2 className="text-lg font-bold text-light-black">
              Technologies & Tooling
            </h2>
            <div className="flex flex-wrap gap-2">
              {virtusa.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-light-grey text-[1.2rem] max-phone:text-[1.3rem] font-medium text-light-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
