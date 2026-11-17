'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { TravelGlobe } from '@/components/Globe/TravelGlobe';
import {
  MailIcon,
  XIcon,
  LinkedinIcon,
  GitHubIcon,
  BackArrowIcon,
} from '@/components/Icons/SiteIcons';

export default function AboutPage() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mailHovered, setMailHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('nrahulteja@outlook.com');
    }
    setCopied(true);
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setShowToast(false);
      setCopied(false);
    }, 3500);
  };

  // Global wheel routing: wherever the user scrolls on the screen (over the globe, margins, empty space),
  // the content scrolls smoothly and uninterrupted!
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden flex max-phone:flex-col bg-[#f6f6f6] select-none relative">
      {/* MOBILE TOP HEADER: Pinned at top center with frosted blur */}
      <div className="flex md:hidden fixed top-0 left-0 w-full pt-[2.2rem] pb-[1.4rem] bg-[#f6f6f6]/90 backdrop-blur-md flex-col items-center justify-center text-center z-40 pointer-events-none select-none px-4 border-b border-black/[0.03]">
        <h1 className="text-[2.2rem] font-normal text-light-black leading-none m-0 tracking-tight">
          Rahul Teja
        </h1>
        <p className="text-[2.2rem] font-normal text-grey leading-none m-0 tracking-tight mt-[0.4rem]">
          Software Engineer
        </p>
      </div>

      {/* MOBILE BOTTOM DOCK: Back button + 4 Socials centered at bottom */}
      <div className="flex md:hidden fixed bottom-[2.4rem] left-1/2 -translate-x-1/2 z-40 items-center justify-center gap-[0.6rem] pointer-events-auto select-none">
        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/')}
          className="w-[4.6rem] h-[4.6rem] rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          aria-label="Back to Home"
        >
          <BackArrowIcon width="1.4rem" height="1.4rem" color="#F6F6F6" />
        </motion.button>

        {/* Mail Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyEmail}
          className="w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          style={{ borderRadius: 13 }}
          aria-label="Copy email"
        >
          <MailIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
        </motion.button>

        {/* X / Twitter */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href="https://x.com/Knightswatch__"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          style={{ borderRadius: 13 }}
          aria-label="X (Twitter)"
        >
          <XIcon width="1.3rem" height="1.2rem" color="#1A1A1A" />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href="https://www.linkedin.com/in/nallarahulteja/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          style={{ borderRadius: 13 }}
          aria-label="LinkedIn"
        >
          <LinkedinIcon width="1.3rem" height="1.3rem" color="#1A1A1A" />
        </motion.a>

        {/* GitHub */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href="https://github.com/rahul-1909"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          style={{ borderRadius: 13 }}
          aria-label="GitHub Profile"
        >
          <GitHubIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
        </motion.a>
      </div>

      {/* LEFT COLUMN: Scrollable Story, Recognitions, Info */}
      <div
        ref={scrollContainerRef}
        className="w-[58%] max-phone:w-full h-full overflow-y-auto scrollbar-none px-[12vw] max-phone:px-[6vw] pt-[15vh] max-phone:pt-[8rem] pb-[20vh] max-phone:pb-[14rem] relative z-10"
      >
        {/* Desktop Header: Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-[2.4rem] hidden md:block"
        >
          <h1 className="text-[3.2rem] font-normal text-light-black tracking-[-0.025em] leading-none mb-[0.6rem]">
            Rahul Teja
          </h1>
          <p className="text-[3.2rem] font-normal text-grey tracking-[-0.025em] leading-none">
            Software Engineer
          </p>
        </motion.div>

        {/* Desktop 4 Action Buttons: Back, Mail, X, LinkedIn, GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center gap-[0.4rem] mb-[5.8rem]"
        >
          {/* Back Button (Circular container matching size 5.4rem x 5.4rem, no shadow) */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/')}
            className="w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0"
            style={{
              boxShadow: 'none',
              transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
            }}
            aria-label="Back to Home"
          >
            <BackArrowIcon width="1.4rem" height="1.4rem" color="#F6F6F6" />
          </motion.button>

          {/* Mail Button with "click to copy" caption */}
          <div className="relative">
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyEmail}
              onMouseEnter={() => setMailHovered(true)}
              onMouseLeave={() => setMailHovered(false)}
              aria-label="Copy email"
              className="w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-none"
              style={{
                borderRadius: 15,
                boxShadow: 'none',
                transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
              }}
            >
              <MailIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
            </motion.button>

            {/* "click to copy" caption directly below button */}
            <AnimatePresence>
              {mailHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-30"
                  style={{ top: 'calc(100% + 0.8rem)' }}
                >
                  <span className="text-[1.2rem] text-light-black leading-none font-normal select-none">
                    {copied ? 'copied!' : 'click to copy'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* X / Twitter (5.4rem x 5.4rem, rounded-1.5rem, no shadow) */}
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            href="https://x.com/Knightswatch__"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0"
            style={{
              borderRadius: 15,
              boxShadow: 'none',
              transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
            }}
            aria-label="X / Twitter"
          >
            <XIcon width="1.3rem" height="1.2rem" color="#1A1A1A" />
          </motion.a>

          {/* LinkedIn (5.4rem x 5.4rem, rounded-1.5rem, no shadow) */}
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            href="https://www.linkedin.com/in/nallarahulteja/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0"
            style={{
              borderRadius: 15,
              boxShadow: 'none',
              transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
            }}
            aria-label="LinkedIn"
          >
            <LinkedinIcon width="1.3rem" height="1.3rem" color="#1A1A1A" />
          </motion.a>

          {/* GitHub (5.4rem x 5.4rem, rounded-1.5rem, no shadow) */}
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            href="https://github.com/rahul-1909"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0"
            style={{
              borderRadius: 15,
              boxShadow: 'none',
              transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
            }}
            aria-label="GitHub Profile"
          >
            <GitHubIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
          </motion.a>
        </motion.div>

        {/* Status indicator: Open to work */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-[11.2rem] text-[1.86rem] max-phone:text-[1.5rem] font-normal text-grey tracking-[-0.01em] md:-mt-[3.6rem] mt-[1.2rem] md:mt-0 mb-[3.6rem] md:mb-[5.2rem] select-none whitespace-nowrap"
        >
          Open to work
        </motion.p>

        {/* Narrative / Intro Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-[3.2rem] mb-[6.4rem] text-[2.2rem] max-phone:text-[1.8rem] leading-[1.38]"
        >
          <p>
            <span className="font-bold text-light-black">Software Engineer & AI Developer</span>
            <span className="font-medium text-grey">, building autonomous agent workflows, corrective RAG engines and high-performance microservices.</span>
          </p>
          <p>
            <span className="font-medium text-grey">Driven by the intersection of </span>
            <span className="font-bold text-light-black">practical machine learning</span>
            <span className="font-medium text-grey"> and </span>
            <span className="font-bold text-light-black">robust backend engineering</span>
            <span className="font-medium text-grey">, crafting dependable systems that solve real-world problems.</span>
          </p>
        </motion.div>

        {/* Recognitions / Milestones Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-[1.6rem] mb-[7.4rem]"
        >
          <p className="text-[1.4rem] font-normal text-light-black/80">Recognitions & Milestones:</p>
          <ul className="flex flex-col gap-[0.4rem] text-[2.4rem] max-phone:text-[1.8rem] leading-[1.24]">
            <li className="whitespace-nowrap">
              <span className="text-light-black">Industry Certifications</span>
              <span className="text-grey font-normal"> (6)</span>
            </li>
            <li className="whitespace-nowrap">
              <span className="text-light-black">Open-Source Projects</span>
              <span className="text-grey font-normal"> (22+)</span>
            </li>
            <li className="whitespace-nowrap">
              <span className="text-light-black">Featured Architectures</span>
              <span className="text-grey font-normal"> (6)</span>
            </li>
            <li className="whitespace-nowrap">
              <span className="text-light-black">Verified Tech Stacks</span>
              <span className="text-grey font-normal"> (37)</span>
            </li>
            <li className="whitespace-nowrap">
              <span className="text-light-black">Virtusa Enterprise Mandate</span>
              <span className="text-grey font-normal"> (1)</span>
            </li>
          </ul>
        </motion.div>

        {/* Outro Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-[0.8rem] mb-[8rem] text-[2.2rem] max-phone:text-[1.8rem] leading-[1.38]"
        >
          <p className="font-medium text-grey">
            Available for full-time engineering roles, innovative AI projects and{' '}
            <span className="font-bold text-light-black">software development opportunities.</span>
          </p>
        </motion.div>

        {/* MOBILE 3D GLOBE (In-flow beneath biography, exactly like Gabriel's mobile site) */}
        <div className="flex md:hidden w-full items-center justify-center my-[3.2rem] pointer-events-none select-none">
          <div className="w-[28rem] h-[28rem] flex items-center justify-center">
            <TravelGlobe className="w-full h-full" />
          </div>
        </div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="text-[1.3rem] font-normal text-grey leading-[1.5] pb-[6rem]"
        >
          Designed & engineered for{' '}
          <span className="font-bold text-light-black">Rahul Teja</span>.
        </motion.div>

        {/* Bottom Fade Gradient for smooth scroll vanishing */}
        <div className="fixed bottom-0 left-0 w-[58%] max-phone:w-full h-[12rem] pointer-events-none bg-gradient-to-t from-[#f6f6f6] to-transparent z-20" />
      </div>

      {/* FIXED 3D EARTH GLOBE & FLYING AIRPLANE (Desktop only) */}
      <div className="fixed right-[8rem] desktop:right-[10rem] top-1/2 -translate-y-1/2 z-20 w-[40rem] h-[40rem] desktop:w-[42rem] desktop:h-[42rem] hidden md:flex pointer-events-none select-none items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full flex items-center justify-center"
        >
          <TravelGlobe className="w-full h-full" />
        </motion.div>
      </div>

      {/* Toast Notification: copied to clipboard (Centered at bottom) */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[3.2rem] left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none"
          >
            <div className="bg-white rounded-[1rem] min-h-[4.8rem] px-[2.4rem] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-[1.4rem] text-[#1A1A1A] font-normal tracking-tight">
              copied to clipboard
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
