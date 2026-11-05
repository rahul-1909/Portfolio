import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ReplicaHeaderProps {
  title?: string;
  subtitle?: string;
  isProject?: boolean;
}

export const ReplicaHeader: React.FC<ReplicaHeaderProps> = ({
  title = "Rahul Teja",
  subtitle = "Software Engineer",
  isProject = false,
}) => {
  return (
    <header
      data-site-header-anchor="true"
      className="flex flex-col gap-0 select-none max-phone:items-center max-phone:text-center pointer-events-auto"
    >
      {/* Title */}
      <div className="overflow-hidden pb-1 relative w-[40rem] max-phone:w-auto max-phone:whitespace-nowrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={title}
            initial={{ y: isProject ? "160%" : "-160%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isProject ? "-160%" : "160%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 max-phone:text-h1-mobile font-bold text-light-black tracking-normal leading-[1.08] will-change-transform"
          >
            {isProject ? (
              <Link to="/" className="hover:opacity-80 transition-opacity">
                {title}
              </Link>
            ) : (
              <span className="cursor-default">{title}</span>
            )}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Subtitle */}
      <div className="overflow-hidden pb-2 relative w-[40rem] max-phone:w-auto max-phone:whitespace-nowrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={subtitle}
            initial={{ y: isProject ? "160%" : "-160%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isProject ? "-160%" : "160%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 max-phone:text-h1-mobile font-normal text-grey tracking-normal leading-[1.08] will-change-transform"
          >
            {subtitle}
          </motion.p>
        </AnimatePresence>
      </div>
    </header>
  );
};
