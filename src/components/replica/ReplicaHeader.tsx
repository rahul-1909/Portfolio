import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { DeckType } from '../../data/portfolio';

interface ReplicaHeaderProps {
  title?: string;
  subtitle?: string;
  isProject?: boolean;
  activeDeck?: DeckType;
  onSelectDeck?: (deck: DeckType) => void;
}

export const ReplicaHeader: React.FC<ReplicaHeaderProps> = ({
  title = "Rahul Teja",
  subtitle = "Software Engineer",
  isProject = false,
  activeDeck = 'projects',
  onSelectDeck,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';
  const isExperiencePage = location.pathname === '/experience';

  const menuItems = [
    { id: 'projects', label: 'Projects', isDeck: true },
    { id: 'skills', label: 'Skills', isDeck: true },
    { id: 'certifications', label: 'Certifications', isDeck: true },
    { id: 'experience', label: 'Experience', isDeck: false, href: '/experience' },
    { id: 'about', label: 'About', isDeck: false, href: '/about' },
  ] as const;

  const handleMenuClick = (item: typeof menuItems[number]) => {
    if (item.isDeck) {
      if (!isHomePage) {
        navigate(`/?deck=${item.id}`);
      } else if (onSelectDeck) {
        onSelectDeck(item.id as DeckType);
      }
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <header
      data-site-header-anchor="true"
      className="flex flex-col gap-0 select-none max-phone:items-center max-phone:text-center pointer-events-auto"
    >
      {/* Name / Page Title */}
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
            {isHomePage ? (
              <span className="cursor-default">{title}</span>
            ) : (
              <Link to="/" className="hover:opacity-80 transition-opacity">
                {title}
              </Link>
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

      {/* Vertical Text Menu on Desktop & Compact Horizontal Row on Mobile */}
      <nav
        aria-label="Portfolio sections navigation"
        className="pt-6 max-phone:pt-3 flex flex-col gap-2 max-phone:w-[92vw] max-phone:max-w-[370px] max-phone:overflow-x-auto max-phone:px-1 max-phone:py-1 pointer-events-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <ul className="flex flex-col gap-1.5 max-phone:flex-row max-phone:items-center max-phone:gap-3 list-none p-0 m-0 max-phone:whitespace-nowrap max-phone:flex-nowrap">
          {menuItems.map((item) => {
            const isActive =
              (item.id === 'experience' && isExperiencePage) ||
              (item.id === 'about' && isAboutPage) ||
              (isHomePage && item.isDeck && activeDeck === item.id);

            return (
              <li key={item.id} className="relative flex items-center shrink-0">
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`text-[1.3rem] max-phone:text-[1.15rem] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-black rounded-sm cursor-pointer inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'text-light-black font-semibold'
                      : 'text-grey hover:text-light-black font-normal'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="w-1.5 h-1.5 rounded-full bg-light-black shrink-0"
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Sub-menu Muted Metadata Lines */}
        <div className="pt-3 flex flex-col gap-0.5 text-[1.1rem] max-phone:text-[1rem] text-[#8C8C8C] font-normal leading-tight max-phone:hidden">
          <span>Backend · AI/ML · Data</span>
          <span className="text-[#A5A5A5]">Open to work · Hyderabad</span>
        </div>
      </nav>
    </header>
  );
};
