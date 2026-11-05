import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowLeft, ArrowUpRight, MessageSquare, X } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

interface ReplicaDockProps {
  isProject?: boolean;
  onToggleProjectInfo?: () => void;
  isProjectInfoOpen?: boolean;
}

export const ReplicaDock: React.FC<ReplicaDockProps> = ({
  isProject = false,
  onToggleProjectInfo,
  isProjectInfoOpen = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAboutOrExp = location.pathname === '/about' || location.pathname === '/experience';
  const querySocials = typeof window !== 'undefined' && new URLSearchParams(location.search).get('socials') === 'open';
  const [socialsOpen, setSocialsOpen] = useState(querySocials);

  return (
    <nav
      data-site-header-anchor="true"
      aria-label="Navigation Dock"
      className="flex items-center gap-[0.6rem] pointer-events-auto relative z-[100]"
    >
      {/* 1. About / User / Back Pill */}
      {!isAboutOrExp ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none"
        >
          {isProject ? (
            <button
              onClick={onToggleProjectInfo}
              className="h-full w-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 rounded-full cursor-pointer"
              aria-label="Toggle Project Information"
            >
              <span className={`font-mono text-sm font-bold transition-transform ${isProjectInfoOpen ? 'rotate-90' : ''}`}>
                ⓘ
              </span>
            </button>
          ) : (
            <Link
              to="/about"
              className="h-full w-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 rounded-full"
              aria-label="Open About Page"
            >
              <User className="w-[1.6rem] h-[1.6rem] text-light-black" />
            </Link>
          )}
        </motion.div>
      ) : (
        /* Back to Home Button on Detail/About Pages */
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none"
        >
          <button
            onClick={() => navigate('/')}
            className="h-full w-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 rounded-full cursor-pointer"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-[1.6rem] h-[1.6rem] text-light-black" />
          </button>
        </motion.div>
      )}

      {/* 2. Message / Socials Pill (Explicit contrasting colors, icon never vanishes) */}
      <div className="relative flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSocialsOpen(!socialsOpen)}
          className={`h-[5.4rem] min-w-[5.4rem] px-[1.8rem] rounded-full flex items-center justify-center shadow-sm cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black focus-visible:ring-offset-2 transition-colors ${
            socialsOpen ? 'bg-light-black text-white' : 'bg-white text-light-black'
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
                className="text-white"
              >
                <X className="w-[1.6rem] h-[1.6rem]" />
              </motion.div>
            ) : (
              <motion.div
                key="msg"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-light-black"
              >
                <MessageSquare className="w-[1.6rem] h-[1.6rem]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Expandable Social Links Tray: Properly Spaced & Zero Overlap */}
        <AnimatePresence>
          {socialsOpen && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.94, x: -8 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              className="absolute left-[calc(100%+0.8rem)] top-1/2 -translate-y-1/2 flex items-center gap-1.5 p-2 rounded-full bg-white shadow-xl border border-border-light whitespace-nowrap z-[150] max-phone:fixed max-phone:left-1/2 max-phone:-translate-x-1/2 max-phone:top-auto max-phone:bottom-[11.5rem] max-phone:translate-y-0 max-phone:w-auto max-phone:max-w-[92vw] max-phone:px-4 max-phone:overflow-x-auto"
              role="menu"
              aria-label="Social Profiles"
            >
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label="LinkedIn Profile"
                className="px-3 py-1.5 rounded-full hover:bg-light-grey text-light-black font-semibold text-[1.2rem] max-phone:text-[1.1rem] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-black transition-colors inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>

              <a
                href={personalInfo.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label="X (formerly Twitter) Profile"
                className="px-3 py-1.5 rounded-full hover:bg-light-grey text-light-black font-semibold text-[1.2rem] max-phone:text-[1.1rem] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-black transition-colors inline-flex items-center gap-1"
              >
                <span>𝕏 (@Knightswatch__)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>

              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label="GitHub Profile"
                className="px-3 py-1.5 rounded-full hover:bg-light-grey text-light-black font-semibold text-[1.2rem] max-phone:text-[1.1rem] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-black transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>

              <a
                href={personalInfo.socials.email}
                role="menuitem"
                aria-label="Send Email to Rahul Teja"
                className="px-3 py-1.5 rounded-full hover:bg-light-grey text-light-black font-semibold text-[1.2rem] max-phone:text-[1.1rem] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-black transition-colors inline-flex items-center gap-1"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
