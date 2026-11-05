import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Mail, FileText } from 'lucide-react';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { personalInfo, groupedSkills } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

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
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-24 overflow-x-hidden">
      {/* 1. Left Fixed Column: Title, Short Description, & Navigation Dock */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[38rem] flex flex-col justify-between py-[12rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-8 max-phone:pb-4 max-phone:left-0 max-phone:items-center">
        <div className="flex flex-col gap-4 max-phone:items-center max-phone:text-center pointer-events-auto">
          <ReplicaHeader
            title="About"
            subtitle="Rahul Teja"
            isProject={true}
          />
          <p className="text-[1.4rem] max-phone:text-[1.6rem] text-grey leading-relaxed max-w-sm pt-2">
            Software Engineer focused on backend engineering, AI/ML, and scalable distributed systems in Hyderabad.
          </p>
        </div>

        {/* Navigation Dock */}
        <ReplicaDock />
      </div>

      {/* 2. Right Main Column: Exactly 3 Clean Blocks */}
      <div className="w-full flex justify-end pt-28 px-8 max-phone:pt-6 max-phone:px-4">
        <div className="w-[58rem] max-phone:w-full flex flex-col gap-8">
          {/* BLOCK 1: Bio & Engineering Identity */}
          <div className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-grey">
                  {personalInfo.location} · Available Now
                </span>
                <h1 className="text-2xl font-bold text-light-black mt-1">
                  {personalInfo.name}
                </h1>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-light-grey text-xs font-medium text-light-black">
                <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                <span>Open to roles</span>
              </div>
            </div>

            <p className="text-[1.4rem] max-phone:text-[1.6rem] text-[#4A4A4A] leading-relaxed pt-2">
              {personalInfo.bio}
            </p>

            <ul className="space-y-2.5 pt-2">
              {personalInfo.aboutHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[1.4rem] max-phone:text-[1.6rem] text-grey leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-light-black mt-2.5 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BLOCK 2: Technical Capabilities & Grouped Stack */}
          <section className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-6">
            <h2 className="text-lg font-bold text-light-black">
              Technical Stack &amp; Capabilities
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {groupedSkills.map((group, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-light-black">
                    {group.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-full bg-light-grey text-[1.2rem] max-phone:text-[1.3rem] font-medium text-light-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BLOCK 3: Connect & Credentials */}
          <section className="p-8 max-phone:p-6 rounded-[24px] bg-white border border-border-light shadow-2xs flex flex-col gap-5">
            <h2 className="text-lg font-bold text-light-black">
              Connect &amp; Contact
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={personalInfo.socials.email}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-light-black text-white text-sm font-medium hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-opacity"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-border-light text-light-black text-sm font-medium hover:bg-light-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>

              <a
                href={personalInfo.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-border-light text-light-black text-sm font-medium hover:bg-light-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-colors"
              >
                <span>𝕏 (@Knightswatch__)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>

              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-border-light text-light-black text-sm font-medium hover:bg-light-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-border-light text-light-black text-sm font-medium hover:bg-light-grey focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black transition-colors"
                onClick={(e) => {
                  if (personalInfo.resumeUrl === '#resume') {
                    e.preventDefault();
                    alert('Resume link: Placeholder enabled. Will be updated with direct PDF.');
                  }
                }}
              >
                <FileText className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
