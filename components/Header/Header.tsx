'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/portfolioData';
import { BackArrowIcon } from '@/components/Icons/SiteIcons';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isSection = pathname.startsWith('/section/') || pathname.startsWith('/project/');

  const projectId = pathname.startsWith('/section/')
    ? pathname.replace('/section/', '')
    : pathname.startsWith('/project/')
    ? pathname.replace('/project/', '')
    : null;
  const currentProject = projectId ? projects.find((p) => p.id === projectId) : null;

  const [parisTime, setParisTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setParisTime(new Intl.DateTimeFormat('fr-FR', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // On home, about, and section/project pages, headers and navigation are rendered directly in the layout matching the exact design
  if (isHome || pathname === '/about' || isSection) {
    return null;
  }

  const title = isSection && currentProject ? currentProject.title : 'Rahul Teja';
  const subtitle = isSection && currentProject ? currentProject.date : 'AI Engineer';

  return (
    <header className="fixed top-0 left-0 w-full z-40 p-[3.2rem] max-phone:p-[2rem] flex items-start justify-between pointer-events-none">
      <div className="flex items-start gap-[2rem] pointer-events-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -10 }}
          onClick={() => router.push('/')}
          className="w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-full bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label="Back to Home"
        >
          <BackArrowIcon width="1.4rem" height="1.4rem" color="#F6F6F6" />
        </motion.button>

        {/* Title & Subtitle with sliding text animation */}
        <div className="flex flex-col select-none">
          <div className="overflow-hidden pb-1">
            <AnimatePresence mode="wait">
              <motion.h1
                key={title}
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[3.2rem] max-phone:text-[2.2rem] font-normal text-light-black tracking-[-0.025em] leading-none"
              >
                {title}
              </motion.h1>
            </AnimatePresence>
          </div>
          <div className="overflow-hidden pb-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={subtitle}
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="text-[3.2rem] max-phone:text-[2.2rem] font-normal text-grey tracking-[-0.025em] leading-none"
              >
                {subtitle}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Paris Local Time Indicator */}
      <div className="pointer-events-auto text-right select-none">
        <p className="text-[1.4rem] font-medium text-light-black">
          Paris, FR
        </p>
        <p className="text-[1.4rem] font-mono text-grey tabular-nums">
          {parisTime ? `${parisTime} CET` : '14:30 CET'}
        </p>
      </div>
    </header>
  );
};
