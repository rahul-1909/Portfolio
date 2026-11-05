import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowLeft, ArrowUpRight, MessageSquare, X } from 'lucide-react';
import { replicaAbout } from '../../data/replicaData';

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
  const isAboutPage = location.pathname === '/about';
  const [socialsOpen, setSocialsOpen] = useState(false);

  return (
    <nav
      data-site-header-anchor="true"
      aria-label="Navigation Dock"
      className="flex items-center gap-[0.4rem] pointer-events-auto"
    >
      {/* 1. About / User / Back Pill */}
      {!isAboutPage ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none"
        >
          {isProject ? (
            <button
              onClick={onToggleProjectInfo}
              className="h-full w-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-black rounded-full"
              aria-label="Toggle Project Information"
            >
              <span className={`font-mono text-sm font-bold transition-transform ${isProjectInfoOpen ? 'rotate-90' : ''}`}>
                ⓘ
              </span>
            </button>
          ) : (
            <Link
              to="/about"
              className="h-full w-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-black rounded-full"
              aria-label="Open About Page"
            >
              <User className="w-[1.6rem] h-[1.6rem] text-light-black" />
            </Link>
          )}
        </motion.div>
      ) : (
        /* Back to Home Button on About Page */
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none"
        >
          <button
            onClick={() => navigate('/')}
            className="h-full w-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-black rounded-full"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-[1.6rem] h-[1.6rem] text-light-black" />
          </button>
        </motion.div>
      )}

      {/* 2. Message / Socials Pill */}
      <div className="relative flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSocialsOpen(!socialsOpen)}
          className={`h-[5.4rem] min-w-[5.4rem] px-[1.8rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-black transition-colors ${
            socialsOpen ? 'bg-light-black text-white' : ''
          }`}
          aria-label={socialsOpen ? 'Close Social Links' : 'Open Social Links'}
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
                <X className="w-[1.6rem] h-[1.6rem]" />
              </motion.div>
            ) : (
              <motion.div
                key="msg"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-[1.6rem] h-[1.6rem]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Expandable Social Links Tray */}
        <AnimatePresence>
          {socialsOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.94 }}
              animate={{ opacity: 1, x: 8, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="flex items-center gap-1.5 p-1 rounded-full bg-white shadow-md text-xs font-medium whitespace-nowrap z-50"
            >
              <a
                href={replicaAbout.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full hover:bg-light-grey text-light-black transition-colors inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-grey" />
              </a>

              <a
                href={replicaAbout.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full hover:bg-light-grey text-light-black transition-colors inline-flex items-center gap-1"
              >
                <span>Twitter / X</span>
                <ArrowUpRight className="w-3 h-3 text-grey" />
              </a>

              <a
                href={replicaAbout.socials.email}
                className="px-3.5 py-2 rounded-full hover:bg-light-grey text-light-black transition-colors inline-flex items-center gap-1"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3 h-3 text-grey" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
