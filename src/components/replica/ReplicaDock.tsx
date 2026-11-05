import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowLeft, ArrowUpRight, MessageSquare, X, Mail } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

// X (formerly Twitter) official vector icon
const XIcon: React.FC<{ className?: string }> = ({ className = "w-[2.2rem] h-[2.2rem]" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`${className} fill-current`}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// LinkedIn vector icon
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-[2.2rem] h-[2.2rem]" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`${className} fill-current`}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

// GitHub vector icon
const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-[2.2rem] h-[2.2rem]" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`${className} fill-current`}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ReplicaDockProps {
  isProject?: boolean;
  liveUrl?: string;
  onToggleProjectInfo?: () => void;
  isProjectInfoOpen?: boolean;
}

export const ReplicaDock: React.FC<ReplicaDockProps> = ({
  isProject = false,
  liveUrl,
  onToggleProjectInfo,
  isProjectInfoOpen = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAboutOrExp = location.pathname === '/about' || location.pathname === '/experience';
  const querySocials = typeof window !== 'undefined' && new URLSearchParams(location.search).get('socials') === 'open';
  const [socialsOpen, setSocialsOpen] = useState(querySocials);

  // Socials list for the icon-only rounded squares
  const socialItems = [
    {
      id: 'email',
      label: 'Email Rahul Teja',
      href: personalInfo.socials.email,
      icon: <Mail className="w-[2.2rem] h-[2.2rem] text-light-black" />,
      external: false,
    },
    {
      id: 'twitter',
      label: 'X (formerly Twitter)',
      href: personalInfo.socials.twitter,
      icon: <XIcon className="w-[2rem] h-[2rem] text-light-black" />,
      external: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      href: personalInfo.socials.linkedin,
      icon: <LinkedInIcon className="w-[2rem] h-[2rem] text-light-black" />,
      external: true,
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      href: personalInfo.socials.github,
      icon: <GitHubIcon className="w-[2rem] h-[2rem] text-light-black" />,
      external: true,
    },
  ];

  return (
    <nav
      data-site-header-anchor="true"
      aria-label="Navigation Dock"
      className="flex items-center gap-[1.2rem] max-phone:gap-[0.8rem] pointer-events-auto relative z-[100]"
    >
      {/* CASE A: About / Experience Pages -> Black Circle Back Arrow + Icon-only Socials */}
      {isAboutOrExp ? (
        <>
          {/* Black Circle Back Arrow Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-full bg-light-black text-white flex items-center justify-center shadow-sm cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 shrink-0"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-[2.2rem] h-[2.2rem] text-white" />
          </motion.button>

          {/* Social Rounded Square Pills in the Same Row */}
          {socialItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              aria-label={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2"
            >
              {item.icon}
            </motion.a>
          ))}
        </>
      ) : isProject ? (
        /* CASE B: Project Detail Page -> Info Pill + Live URL Pill + Back Button */
        <>
          {/* Back Pill */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2"
            aria-label="Back to Projects"
          >
            <ArrowLeft className="w-[2.2rem] h-[2.2rem] text-light-black" />
          </motion.button>

          {/* Info Pill (ⓘ) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleProjectInfo}
            className={`w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] flex items-center justify-center shadow-sm cursor-pointer select-none transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 ${
              isProjectInfoOpen ? 'bg-light-black text-white' : 'bg-white text-light-black hover:shadow-md'
            }`}
            aria-label="Toggle Project Information"
            aria-expanded={isProjectInfoOpen}
          >
            <span className="font-mono text-[2.2rem] font-bold">ⓘ</span>
          </motion.button>

          {/* Live URL Pill (↗) */}
          {liveUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2"
              aria-label="Open Live Application in New Tab"
            >
              <ArrowUpRight className="w-[2.2rem] h-[2.2rem] text-light-black" />
            </motion.a>
          )}
        </>
      ) : (
        /* CASE C: Home Page -> Rounded Square User Pill + Socials Pill */
        <div className="flex items-center gap-[1.2rem] max-phone:gap-[0.8rem] flex-nowrap">
          {/* Pill 1: User / About -> White Rounded Square */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0"
          >
            <Link
              to="/about"
              className="h-full w-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 rounded-[2.4rem]"
              aria-label="Open About Page"
            >
              <User className="w-[2.2rem] h-[2.2rem] text-light-black" />
            </Link>
          </motion.div>

          {/* Pill 2: Socials Toggle -> Morphs into Black Circle with X when open */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSocialsOpen(!socialsOpen)}
            className={`w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] flex items-center justify-center shadow-sm cursor-pointer select-none transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 ${
              socialsOpen
                ? 'rounded-full bg-light-black text-white'
                : 'rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black hover:shadow-md'
            }`}
            aria-label={socialsOpen ? 'Close Social Links' : 'Open Social Links'}
            aria-expanded={socialsOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {socialsOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-[2.2rem] h-[2.2rem] text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="msg"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageSquare className="w-[2.2rem] h-[2.2rem] text-light-black" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* When Socials Open: Icon-only Rounded Square Pills Slide Out in the Same Row */}
          <AnimatePresence>
            {socialsOpen && (
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-[1.2rem] max-phone:gap-[0.8rem]"
              >
                {socialItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-[7.2rem] h-[7.2rem] max-phone:w-[6.2rem] max-phone:h-[6.2rem] rounded-[2.4rem] max-phone:rounded-[2rem] bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2"
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
};
