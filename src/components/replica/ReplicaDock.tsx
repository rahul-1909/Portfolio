import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  MessageCircleMoreIcon,
  CloseXIcon,
  BackChevronIcon,
  MailIcon,
  XLogoIcon,
  LinkedInIcon,
  GitHubIcon,
  InfoIcon,
  ExternalLinkIcon,
} from './ReplicaIcons';
import { personalInfo } from '../../data/portfolio';

interface ReplicaDockProps {
  isProject?: boolean;
  liveUrl?: string;
  onToggleProjectInfo?: () => void;
  isProjectInfoOpen?: boolean;
  backPath?: string;
}

export const ReplicaDock: React.FC<ReplicaDockProps> = ({
  isProject = false,
  liveUrl,
  onToggleProjectInfo,
  isProjectInfoOpen = false,
  backPath = '/',
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSectionOrAbout =
    location.pathname === '/about' ||
    location.pathname === '/projects' ||
    location.pathname === '/skills' ||
    location.pathname === '/certifications' ||
    location.pathname === '/experience';

  const [socialsOpen, setSocialsOpen] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(location.search).get('socials') === 'open'
  );

  const socials = [
    {
      id: 'email',
      label: 'Email',
      href: personalInfo.socials.email,
      icon: <MailIcon className="w-[1.6rem] h-[1.6rem] text-light-black" />,
      external: false,
    },
    {
      id: 'twitter',
      label: 'X',
      href: personalInfo.socials.twitter,
      icon: <XLogoIcon className="w-[1.5rem] h-[1.5rem] text-light-black" />,
      external: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: personalInfo.socials.linkedin,
      icon: <LinkedInIcon className="w-[1.5rem] h-[1.5rem] text-light-black" />,
      external: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: personalInfo.socials.github,
      icon: <GitHubIcon className="w-[1.5rem] h-[1.5rem] text-light-black" />,
      external: true,
    },
  ];

  // CASE 1: Project Detail Page (/work/:slug)
  if (isProject) {
    return (
      <nav
        aria-label="Project Actions"
        className="flex items-center gap-[1.2rem] max-phone:gap-[0.8rem] pointer-events-auto select-none"
      >
        {/* Back Button */}
        <Link
          to={backPath || '/projects'}
          aria-label="Back to Projects"
          className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-light-black"
        >
          <BackChevronIcon className="w-[1.6rem] h-[1.6rem] text-white" />
        </Link>

        {/* Info Toggle Pill */}
        {onToggleProjectInfo && (
          <button
            onClick={onToggleProjectInfo}
            aria-label="Project Information"
            aria-pressed={isProjectInfoOpen}
            className={`w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-[24px] max-phone:rounded-[18px] flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-light-black ${
              isProjectInfoOpen
                ? 'bg-[#1A1A1A] text-white shadow-md'
                : 'bg-white text-light-black border border-border-light/60 shadow-sm hover:border-border-dark/30 hover:scale-105'
            }`}
          >
            <InfoIcon className="w-[1.6rem] h-[1.6rem]" />
          </button>
        )}

        {/* Live URL Pill */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live application in new tab"
            className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-[24px] max-phone:rounded-[18px] bg-white text-light-black border border-border-light/60 shadow-sm hover:border-border-dark/30 hover:scale-105 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-light-black"
          >
            <ExternalLinkIcon className="w-[1.6rem] h-[1.6rem]" />
          </a>
        )}
      </nav>
    );
  }

  // CASE 2: Section Pages (/projects, /skills, /certifications, /experience) & /about
  if (isSectionOrAbout) {
    return (
      <nav
        aria-label="Navigation and Contact"
        className="flex items-center gap-[1.2rem] max-phone:gap-[0.8rem] pointer-events-auto select-none"
      >
        {/* Pill 1: Black Circle Back Arrow Pill (returns to Home) */}
        <button
          onClick={() => navigate('/')}
          aria-label="Back to home"
          className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-light-black"
        >
          <BackChevronIcon className="w-[1.6rem] h-[1.6rem] text-white" />
        </button>

        {/* Pill 2: One Extra Pill (Mail) - Keeps clear gap > 48px to right container */}
        <a
          href={personalInfo.socials.email}
          aria-label="Email Rahul Teja"
          className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-[24px] max-phone:rounded-[18px] bg-white text-light-black border border-border-light/60 shadow-sm hover:border-border-dark/30 hover:scale-105 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-light-black"
        >
          <MailIcon className="w-[1.6rem] h-[1.6rem] text-light-black" />
        </a>
      </nav>
    );
  }

  // CASE 3: Home Page (/)
  return (
    <nav
      aria-label="Navigation and Socials Dock"
      className="flex items-center gap-[1.2rem] max-phone:gap-[0.8rem] pointer-events-auto select-none"
    >
      {/* Pill 1: User Icon -> Navigates to /about */}
      <Link
        to="/about"
        aria-label="About Rahul Teja"
        className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-[24px] max-phone:rounded-[18px] bg-white text-light-black border border-border-light/60 shadow-sm hover:border-border-dark/30 hover:scale-105 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-light-black"
      >
        <UserIcon className="w-[1.6rem] h-[1.6rem] text-light-black" />
      </Link>

      {/* When socials are closed: Pill 2 = Speech Bubble with 3 Dots */}
      {!socialsOpen ? (
        <button
          onClick={() => setSocialsOpen(true)}
          aria-label="Open Socials"
          aria-expanded={false}
          className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-[24px] max-phone:rounded-[18px] bg-white text-light-black border border-border-light/60 shadow-sm hover:border-border-dark/30 hover:scale-105 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-light-black"
        >
          <MessageCircleMoreIcon className="w-[1.6rem] h-[1.6rem] text-light-black" />
        </button>
      ) : (
        /* When socials are open: Black circle with ✕ to close + Social Pills */
        <AnimatePresence>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setSocialsOpen(false)}
            aria-label="Close Socials"
            aria-expanded={true}
            className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-light-black"
          >
            <CloseXIcon className="w-[1.4rem] h-[1.4rem] text-white" />
          </motion.button>

          {socials.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              aria-label={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              className="w-[7.2rem] h-[7.2rem] max-phone:w-[5.4rem] max-phone:h-[5.4rem] rounded-[24px] max-phone:rounded-[18px] bg-white text-light-black border border-border-light/60 shadow-sm hover:border-border-dark/30 hover:scale-105 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-light-black"
            >
              {item.icon}
            </motion.a>
          ))}
        </AnimatePresence>
      )}
    </nav>
  );
};
