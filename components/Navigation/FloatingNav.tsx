'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { projects } from '@/data/portfolioData';
import {
  MailIcon,
  LinkedinIcon,
  XIcon,
  GitHubIcon,
  InfoIcon,
  CloseIcon,
  ExternalLinkIcon,
} from '@/components/Icons/SiteIcons';

interface FloatingNavProps {
  onToggleInfo?: () => void;
  showInfo?: boolean;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onToggleInfo, showInfo = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isTravel = pathname === '/travel';
  const isProject = pathname.startsWith('/section/') || pathname.startsWith('/project/');

  const projectId = pathname.startsWith('/section/')
    ? pathname.replace('/section/', '')
    : pathname.startsWith('/project/')
    ? pathname.replace('/project/', '')
    : null;
  const currentProject = projectId ? projects.find((p) => p.id === projectId) : null;

  return (
    <nav className="fixed bottom-[3.2rem] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto">
      <div className="flex items-center gap-[0.8rem] bg-white/95 backdrop-blur-md px-[1.2rem] py-[0.8rem] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/5">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-[0.4rem]">
          <button
            onClick={() => router.push('/')}
            className={`px-[1.6rem] py-[0.8rem] rounded-full text-[1.4rem] font-medium transition-all duration-200 ${
              isHome
                ? 'bg-light-black text-white shadow-sm'
                : 'text-light-black hover:text-black hover:bg-black/5'
            }`}
          >
            Work
          </button>
          <button
            onClick={() => router.push('/about')}
            className={`px-[1.6rem] py-[0.8rem] rounded-full text-[1.4rem] font-medium transition-all duration-200 ${
              isAbout
                ? 'bg-light-black text-white shadow-sm'
                : 'text-light-black hover:text-black hover:bg-black/5'
            }`}
          >
            About
          </button>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-[2rem] bg-black/10 mx-[0.4rem]" />

        {/* Project Specific Controls */}
        {isProject && currentProject ? (
          <div className="flex items-center gap-[0.6rem]">
            {currentProject.websiteUrl && (
              <a
                href={currentProject.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[0.4rem] px-[1.4rem] py-[0.8rem] rounded-full text-[1.4rem] font-medium text-light-black bg-black/5 hover:bg-black/10 transition-colors"
              >
                <span>See live</span>
                <ExternalLinkIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
              </a>
            )}
            {onToggleInfo && (
              <button
                onClick={onToggleInfo}
                className="flex items-center gap-[0.4rem] px-[1.4rem] py-[0.8rem] rounded-full text-[1.4rem] font-medium text-light-black bg-black/5 hover:bg-black/10 transition-colors"
              >
                {showInfo ? (
                  <>
                    <CloseIcon width="1.2rem" height="1.2rem" color="#1A1A1A" />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <InfoIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
                    <span>Infos</span>
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          /* Social Links with 3D Flip */
          <div className="flex items-center gap-[0.6rem]">
            <motion.a
              href="mailto:nrahulteja@outlook.com"
              aria-label="Email"
              className="p-[0.8rem] rounded-full text-light-black hover:bg-black/5 transition-all"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MailIcon className="w-[1.6rem] h-[1.6rem]" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/nallarahulteja/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-[0.8rem] rounded-full text-light-black hover:bg-black/5 transition-all"
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkedinIcon className="w-[1.6rem] h-[1.6rem]" />
            </motion.a>
            <motion.a
              href="https://github.com/rahul-1909"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-[0.8rem] rounded-full text-light-black hover:bg-black/5 transition-all"
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitHubIcon className="w-[1.6rem] h-[1.6rem]" />
            </motion.a>
            <motion.a
              href="https://x.com/Knightswatch__"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter Profile"
              className="p-[0.8rem] rounded-full text-light-black hover:bg-black/5 transition-all"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <XIcon className="w-[1.6rem] h-[1.6rem]" />
            </motion.a>
          </div>
        )}
      </div>
    </nav>
  );
};
