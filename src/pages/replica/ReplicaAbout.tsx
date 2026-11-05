import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { ReplicaGlobe } from '../../components/replica/ReplicaGlobe';
import { personalInfo, certificationsDeck } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaAbout: React.FC = () => {
  const navigate = useNavigate();
  const [_currentCity, setCurrentCity] = useState<'Hyderabad' | 'Chennai'>('Hyderabad');

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
          
          {/* Paragraph 1: Identity & Engineering Philosophy */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-light-black font-semibold">Software Engineer &amp; AI Systems Developer</span>
            <span className="text-grey">, turning complex business workflows, multi-agent state machines, and high-throughput data into reliable services that feel effortless.</span>
          </p>

          {/* Paragraph 2: Professional Experience & Work */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">At </span>
            <span className="text-light-black font-semibold">Virtusa</span>
            <span className="text-grey">, I worked alongside cross-functional engineering teams building enterprise financial microservices with </span>
            <span className="text-light-black font-semibold">Java 17</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">Spring Boot 3.5</span>
            <span className="text-grey">, and </span>
            <span className="text-light-black font-semibold">Angular 20</span>
            <span className="text-grey">, crafting scalable distributed architectures.</span>
          </p>

          {/* Paragraph 3: Running Skills Text */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">Daily technical foundation includes </span>
            <span className="text-light-black font-semibold">Python</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">FastAPI</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">LangGraph</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">Qdrant &amp; ChromaDB</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">PostgreSQL</span>
            <span className="text-grey">, </span>
            <span className="text-light-black font-semibold">Docker</span>
            <span className="text-grey">, and </span>
            <span className="text-light-black font-semibold">AWS / Azure Cloud</span>
            <span className="text-grey">.</span>
          </p>

          {/* Paragraph 4: Certifications List with Direct Verification Links */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">Certified by Microsoft &amp; AWS in </span>
            <a
              href={certificationsDeck[0]?.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-black font-semibold underline decoration-border-light hover:decoration-light-black transition-colors"
            >
              Azure MLOps
            </a>
            <span className="text-grey">, </span>
            <a
              href={certificationsDeck[1]?.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-black font-semibold underline decoration-border-light hover:decoration-light-black transition-colors"
            >
              SQL AI Development
            </a>
            <span className="text-grey">, </span>
            <a
              href={certificationsDeck[2]?.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-black font-semibold underline decoration-border-light hover:decoration-light-black transition-colors"
            >
              Azure Data Fundamentals
            </a>
            <span className="text-grey">, and </span>
            <a
              href={certificationsDeck[3]?.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-black font-semibold underline decoration-border-light hover:decoration-light-black transition-colors"
            >
              AWS Cloud Practitioner
            </a>
            <span className="text-grey">.</span>
          </p>

          {/* Paragraph 5: Location & Availability */}
          <p className="text-[3rem] max-phone:text-[2rem] leading-[1.3] tracking-tight font-normal select-text">
            <span className="text-grey">Currently based in </span>
            <span className="text-light-black font-semibold">Hyderabad, India</span>
            <span className="text-grey">. Travelling, available, and </span>
            <span className="text-light-black font-semibold">open to work</span>
            <span className="text-grey"> for high-impact software engineering roles worldwide.</span>
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
