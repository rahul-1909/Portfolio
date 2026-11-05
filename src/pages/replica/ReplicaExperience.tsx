import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { ReplicaGlobe } from '../../components/replica/ReplicaGlobe';
import { personalInfo } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaExperience: React.FC = () => {
  const navigate = useNavigate();
  const [_currentCity, setCurrentCity] = useState<'Hyderabad' | 'Chennai'>('Chennai');

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
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-32 overflow-x-hidden">
      {/* 1. Header & Socials Pill Row */}
      <div className="pt-24 px-[25.7rem] max-phone:pt-10 max-phone:px-6 flex flex-col items-start gap-[2.4rem]">
        <ReplicaHeader
          title={personalInfo.name}
          subtitle={personalInfo.role}
        />

        {/* Black Circle Back Arrow + Icon-Only Rounded Squares in One Row */}
        <ReplicaDock />
      </div>

      {/* 2. Main Content Grid: Large Editorial Text on Left, 3D Rotating Globe on Right */}
      <div className="mt-20 px-[25.7rem] max-phone:px-6 grid grid-cols-12 gap-12 max-phone:flex max-phone:flex-col-reverse">
        
        {/* Left Side: Large Editorial Paragraph Typography */}
        <div className="col-span-8 max-phone:col-span-12 flex flex-col gap-14 max-phone:gap-10">
          
          {/* Paragraph 1: Role, Company, Period */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-light-black font-semibold">Full Stack Software Intern</span>
            <span className="text-grey"> at </span>
            <span className="text-light-black font-semibold">Virtusa</span>
            <span className="text-grey">, Chennai (August 2025 – June 2026).</span>
          </p>

          {/* Paragraph 2: Core Engineering Scope */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">Engineered enterprise banking microservices and administrative platforms using </span>
            <span className="text-light-black font-semibold">Java 17</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">Spring Boot 3.5</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">Angular 20</span>
            <span className="text-grey">, and </span>
            <span className="text-light-black font-semibold">MySQL 9</span>
            <span className="text-grey">.</span>
          </p>

          {/* Paragraph 3: System Architecture & Security */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">Architected role-based access control (RBAC), multi-tiered customer approval workflows, and secure microservice communication protocols with </span>
            <span className="text-light-black font-semibold">JWT security</span>
            <span className="text-grey"> and </span>
            <span className="text-light-black font-semibold">Docker CI/CD pipelines</span>
            <span className="text-grey">.</span>
          </p>

          {/* Paragraph 4: Performance & Optimization */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">Optimized SQL query execution plans, indexing strategies, and relational schema structures, slashing query latency by </span>
            <span className="text-light-black font-semibold">42%</span>
            <span className="text-grey"> across high-volume ledger records.</span>
          </p>

          {/* Paragraph 5: Collaboration & Tooling */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">Collaborated in Agile sprints across Chennai &amp; Hyderabad offices, maintaining comprehensive test suites, API contracts via </span>
            <span className="text-light-black font-semibold">Postman</span>
            <span className="text-grey">, and automated deployments with </span>
            <span className="text-light-black font-semibold">Git &amp; GitHub Actions</span>
            <span className="text-grey">.</span>
          </p>
        </div>

        {/* Right Side: Light Grey 3D Rotating Globe with Hyderabad/Chennai marker */}
        <div className="col-span-4 max-phone:col-span-12 flex justify-center items-start pt-6">
          <div className="sticky top-28">
            <ReplicaGlobe onLocationChange={setCurrentCity} />
          </div>
        </div>

      </div>
    </main>
  );
};
