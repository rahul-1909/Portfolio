import React, { useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { personalInfo } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

const ReplicaGlobeThree = lazy(() =>
  import('../../components/replica/ReplicaGlobeThree').then((mod) => ({ default: mod.ReplicaGlobeThree }))
);

export const ReplicaAbout: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'About | Rahul Teja - Software Engineer',
    description: personalInfo.metaDescription,
    url: 'https://www.nrahulteja.me/about',
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
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-28 overflow-x-hidden select-none">
      {/* 1. Header & Socials Pill Row */}
      <div className="pt-24 px-[25.7rem] max-phone:pt-10 max-phone:px-6 flex flex-col items-start gap-[2.4rem]">
        <ReplicaHeader
          title={personalInfo.name}
          subtitle={personalInfo.role}
        />

        {/* Back Arrow + Social Rounded Square Pills */}
        <ReplicaDock />
      </div>

      {/* 2. Main Content Grid: Large Editorial Bio on Left, 3D Earth Globe on Right */}
      <div className="mt-16 px-[25.7rem] max-phone:px-6 grid grid-cols-12 gap-12 max-phone:flex max-phone:flex-col-reverse">
        
        {/* Left Column: Editorial Bio Typography */}
        <div className="col-span-7 max-phone:col-span-12 flex flex-col gap-12 max-phone:gap-8 select-text">
          {/* Bio Paragraph 1 */}
          <p className="text-[2.6rem] max-phone:text-[1.8rem] leading-[1.35] tracking-tight font-normal">
            <span className="text-light-black font-semibold">
              Full-stack and AI engineer
            </span>
            <span className="text-[#9F9F9F]">
              {' '}building resilient systems and agentic workflows.
            </span>
          </p>

          {/* Bio Paragraph 2 */}
          <p className="text-[2.6rem] max-phone:text-[1.8rem] leading-[1.35] tracking-tight font-normal">
            <span className="text-[#9F9F9F]">Currently at </span>
            <span className="text-light-black font-semibold">Virtusa</span>
            <span className="text-[#9F9F9F]"> as a </span>
            <span className="text-light-black font-semibold">Full Stack Software Intern</span>
            <span className="text-[#9F9F9F]"> (Chennai, Aug 2025 – Jun 2026), focusing on backend architecture, API design, and production workflows.</span>
          </p>

          {/* Bio Paragraph 3 */}
          <p className="text-[2.6rem] max-phone:text-[1.8rem] leading-[1.35] tracking-tight font-normal">
            <span className="text-[#9F9F9F]">Previously built conversational AI and retrieval systems using </span>
            <span className="text-light-black font-semibold">LangGraph</span>
            <span className="text-[#9F9F9F]">, </span>
            <span className="text-light-black font-semibold">Qdrant</span>
            <span className="text-[#9F9F9F]">, and </span>
            <span className="text-light-black font-semibold">local SLMs</span>
            <span className="text-[#9F9F9F]">, with a focus on low-latency tool execution and structured generation.</span>
          </p>

          {/* Bio Paragraph 4 */}
          <p className="text-[2.6rem] max-phone:text-[1.8rem] leading-[1.35] tracking-tight font-normal">
            <span className="text-[#9F9F9F]">Graduating </span>
            <span className="text-light-black font-semibold">B.Tech in Computer Science and Engineering</span>
            <span className="text-[#9F9F9F]"> from </span>
            <span className="text-light-black font-semibold">Vardhaman College of Engineering</span>
            <span className="text-[#9F9F9F]">, Hyderabad (2022 – 2026).</span>
          </p>

          {/* Footer Attribution Line */}
          <div className="pt-8 border-t border-border-light select-none">
            <p className="text-[1.2rem] text-[#9F9F9F] font-normal">
              Interface inspired by gabrielbeaugonin.com.
            </p>
          </div>
        </div>

        {/* Right Column: 3D Matte Grey Earth Globe with Orbiting Aircraft (Zero Text Beneath) */}
        <div className="col-span-5 max-phone:col-span-12 flex justify-center items-start pt-2 max-phone:pb-6">
          <div className="sticky top-28 w-full flex justify-center">
            <Suspense
              fallback={
                <div className="w-[380px] h-[380px] rounded-full bg-[#E4E4E2]/50 animate-pulse mx-auto" />
              }
            >
              <ReplicaGlobeThree />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};
