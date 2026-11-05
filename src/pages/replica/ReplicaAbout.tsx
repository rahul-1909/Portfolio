import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ArrowUpRight, FileText, CheckCircle2 } from 'lucide-react';
import { personalInfo, experience, certifications, groupedSkills } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaAbout: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'About — Rahul Teja | Software Developer',
    description: 'Software Developer based in Hyderabad, specializing in Backend Engineering, Distributed Systems, and AI/ML architectures.',
    url: 'https://www.nrahulteja.me/about',
  });

  // Handle ESC key to return home
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
    <main
      data-about-page=""
      className="relative min-h-screen w-full bg-light-grey text-light-black pb-[18rem] max-phone:pb-[12rem] select-none overflow-x-hidden"
    >
      {/* Top Header & Navigation Section */}
      <div className="pt-[18rem] max-phone:pt-[6rem] pl-[25.7rem] pr-[25.7rem] max-phone:px-[4.4rem]">
        <div className="flex items-start justify-between max-phone:flex-col max-phone:items-center max-phone:gap-12">
          {/* Left: Brand Header + Back & Social Pills */}
          <div className="flex flex-col gap-6 max-phone:items-center max-phone:text-center">
            {/* Header Title */}
            <div>
              <h1 className="text-h1 max-phone:text-h1-mobile font-bold text-light-black tracking-normal leading-[1.08]">
                {personalInfo.name}
              </h1>
              <p className="text-h1 max-phone:text-h1-mobile font-normal text-grey tracking-normal leading-[1.08] mt-1">
                {personalInfo.role}
              </p>
            </div>

            {/* Navigation & Social Action Pills Row (Directly Below Title) */}
            <div className="flex items-center gap-[0.8rem] pt-2 flex-wrap max-phone:justify-center">
              {/* Back to Home Button (Black circular pill) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-light-black text-white flex items-center justify-center shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                aria-label="Back to Home"
              >
                <ArrowLeft className="w-[1.6rem] h-[1.6rem]" />
              </motion.button>

              {/* Email Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.socials.email}
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm hover:shadow transition-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                aria-label="Send Email to Rahul Teja"
              >
                <Mail className="w-[1.6rem] h-[1.6rem]" />
              </motion.a>

              {/* LinkedIn Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm hover:shadow transition-shadow font-bold text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-[1.6rem] h-[1.6rem] fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </motion.a>

              {/* X / Twitter Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm hover:shadow transition-shadow font-bold text-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                aria-label="X Profile (@Knightswatch__)"
              >
                <span>𝕏</span>
              </motion.a>

              {/* GitHub Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm hover:shadow transition-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                aria-label="GitHub Profile"
              >
                <svg className="w-[1.6rem] h-[1.6rem] fill-current text-light-black" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </motion.a>

              {/* Resume Link Pill */}
              {/* TODO: Replace #resume placeholder with hosted resume PDF URL when uploaded */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.resumeUrl}
                className="h-[5.4rem] px-[2.2rem] rounded-full bg-white text-light-black flex items-center justify-center gap-2 shadow-sm hover:shadow transition-shadow font-medium text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
                aria-label="Download or View Resume"
                onClick={(e) => {
                  if (personalInfo.resumeUrl === '#resume') {
                    e.preventDefault();
                    alert('Resume link: Placeholder enabled. Will be updated with direct PDF.');
                  }
                }}
              >
                <FileText className="w-[1.4rem] h-[1.4rem]" />
                <span>Resume</span>
              </motion.a>
            </div>
          </div>

          {/* Right: Modern Identity Graphic / Engineering Badge */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[21.4rem] h-[21.4rem] rounded-full bg-gradient-to-br from-white via-[#EFEFEF] to-[#E2E2E2] shadow-sm border border-border-light flex flex-col items-center justify-center p-6 text-center select-none">
              <span className="font-mono text-xs uppercase tracking-widest text-grey">Location</span>
              <span className="font-bold text-lg text-light-black mt-1">Hyderabad, IN</span>
              <span className="text-xs text-grey mt-2">UTC+05:30 (IST)</span>
              <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[1.1rem] text-light-black shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                <span className="font-medium">Open to roles</span>
              </div>
            </div>
            <span className="text-xs text-grey tracking-wider font-medium">
              Software Developer
            </span>
          </div>
        </div>

        {/* Narrative & Profile Details Body */}
        <div className="w-[57.1rem] max-phone:w-full flex flex-col gap-16 mt-28 max-phone:mt-16">
          {/* Bio & Highlights */}
          <section className="flex flex-col gap-6 text-[1.6rem] max-phone:text-[1.4rem] leading-[1.5] tracking-normal">
            <p className="font-normal text-grey">
              <span className="font-bold text-light-black">Software Developer</span> focused on Backend Engineering, Scalable Distributed Systems, and AI/ML architectures.
            </p>

            <p className="text-grey font-normal">
              {personalInfo.bio}
            </p>

            <div className="space-y-3 pt-2">
              {personalInfo.aboutHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-grey leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-light-black shrink-0 mt-1" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Block: Virtusa */}
          <section className="flex flex-col gap-6 pt-6 border-t border-border-light">
            <h2 className="text-[1.8rem] font-bold text-light-black">
              Professional Experience
            </h2>

            <div className="flex flex-col gap-6">
              {experience.map((exp) => (
                <div key={exp.id} className="p-6 rounded-[20px] bg-white border border-border-light shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-base font-bold text-light-black">{exp.role}</h3>
                      <p className="text-xs text-grey font-medium">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-light-grey text-grey font-medium">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-grey leading-relaxed pt-1">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2 pt-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-grey leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-light-black mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-light-grey text-[1.1rem] text-light-black font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Grouped: Languages, Backend, AI & ML, Databases, Cloud & Tools */}
          <section className="flex flex-col gap-6 pt-6 border-t border-border-light">
            <h2 className="text-[1.8rem] font-bold text-light-black">
              Technical Stack &amp; Capabilities
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {groupedSkills.map((group, idx) => (
                <div key={idx} className="p-5 rounded-[18px] bg-white border border-border-light shadow-xs flex flex-col gap-2.5">
                  <span className="text-xs uppercase font-bold tracking-wider text-light-black">
                    {group.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-full bg-light-grey text-xs text-light-black font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications with Verification Links */}
          <section className="flex flex-col gap-6 pt-6 border-t border-border-light">
            <h2 className="text-[1.8rem] font-bold text-light-black">
              Verified Certifications
            </h2>

            <div className="flex flex-col divide-y divide-border-light text-[1.4rem] max-phone:text-[1.2rem]">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="py-4 flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex flex-col gap-1 w-2/3 max-phone:w-full">
                    <span className="font-bold text-light-black text-sm">
                      {cert.title}
                    </span>
                    <span className="text-xs text-grey">
                      {cert.issuer} • {cert.category}
                    </span>
                  </div>

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-light-black hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black py-1 px-3 rounded-full bg-white border border-border-light shadow-2xs"
                    aria-label={`Verify credential for ${cert.title}`}
                  >
                    <span>Verify</span>
                    <ArrowUpRight className="w-3 h-3 text-grey" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Colophon */}
          <section className="pt-6 border-t border-border-light text-[1.2rem] text-grey flex items-center justify-between">
            <p>Engineered by Rahul Teja — Hyderabad, India</p>
            <p className="font-mono text-xs">2026</p>
          </section>
        </div>
      </div>
    </main>
  );
};
