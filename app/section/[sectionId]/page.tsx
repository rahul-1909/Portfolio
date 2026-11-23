'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/data/portfolioData';
import { VirtusaLogo } from '@/components/Icons/VirtusaLogo';
import { VirtusaDescriptionCards } from '@/components/Cards/VirtusaDescriptionCards';
import { ProjectCardView } from '@/components/Cards/ProjectCardView';
import { CertificationCardView } from '@/components/Cards/CertificationCardView';
import { SkillsAppGrid } from '@/components/Skills/SkillsAppGrid';
import { InfoIcon, ExternalLinkIcon } from '@/components/Icons/SiteIcons';

// Theme card background & text colors for each project
const projectThemes: Record<string, { bg: string; text: string }> = {
  experience: { bg: '#26272b', text: '#ffffff' },
  projects: { bg: '#26272b', text: '#ffffff' },
  skills: { bg: '#26272b', text: '#ffffff' },
  certifications: { bg: '#26272b', text: '#ffffff' },
  'coercive-control': { bg: '#26272b', text: '#ffffff' },
  candiac: { bg: '#26272b', text: '#ffffff' },
  mcalpine: { bg: '#26272b', text: '#ffffff' },
  lightship: { bg: '#26272b', text: '#ffffff' },
};

// Compress / Minimize Icon (4 inward-pointing arrows)
const CompressIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 9h5V4" />
    <path d="M9 9L3.5 3.5" />
    <path d="M20 9h-5V4" />
    <path d="M15 9l5.5-5.5" />
    <path d="M4 15h5v5" />
    <path d="M9 15l-5.5 5.5" />
    <path d="M20 15h-5v5" />
    <path d="M15 15l5.5 5.5" />
  </svg>
);

export default function SectionPage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = (params?.sectionId || params?.projectId) as string;

  const projectIndex = projects.findIndex((p) => p.id === sectionId);
  const project = projects[projectIndex] || projects[0];

  const theme = project
    ? projectThemes[project.id] || { bg: '#141414', text: '#ffffff' }
    : { bg: '#141414', text: '#ffffff' };

  const [showInfo, setShowInfo] = useState(false);
  const [activeDescTab, setActiveDescTab] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const targetScrollTop = useRef(0);
  const currentScrollTop = useRef(0);
  const isAnimatingScroll = useRef(false);
  const animFrameId = useRef<number | null>(null);

  const currentSection = project?.sections[activeSectionIndex] || project?.sections[0];
  const currentExternalUrl =
    project?.id === 'projects' || project?.id === 'certifications'
      ? currentSection?.live_url || currentSection?.repo_url
      : project?.websiteUrl;

  const handleSelectDescTab = (index: number) => {
    setActiveDescTab(index);
    const targetCard = document.getElementById(`virtusa-card-${index}`);
    if (targetCard && rightScrollRef.current) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Calculates which card container is currently in view
  const updateActiveSectionIndex = () => {
    const container = rightScrollRef.current;
    if (!container) return;

    if (project?.id === 'experience' && showInfo) {
      const descCards = [0, 1, 2].map((i) => document.getElementById(`virtusa-card-${i}`));
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      descCards.forEach((card, idx) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveDescTab((prev) => (prev !== closestIdx ? closestIdx : prev));
      return;
    }

    const cards = container.querySelectorAll<HTMLElement>('[data-section-index]');
    if (!cards || cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = Number(card.getAttribute('data-section-index') || 0);
      }
    });

    setActiveSectionIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
  };

  // Unexpand button vertical motion state:
  // Initial position is aligned with the title (~170px)
  const targetButtonY = useMotionValue(170);
  const smoothButtonY = useSpring(targetButtonY, {
    stiffness: 260,
    damping: 30,
    mass: 0.6,
  });

  // Global smooth wheel routing: wherever user scrolls on the screen,
  // the right-side container scrolls with ultra-smooth lerp interpolation.
  // Wheel scroll does NOT move the unexpand button.
  useEffect(() => {
    const container = rightScrollRef.current;
    if (!container) return;

    targetScrollTop.current = container.scrollTop;
    currentScrollTop.current = container.scrollTop;

    const smoothScrollStep = () => {
      if (!rightScrollRef.current) return;
      const diff = targetScrollTop.current - currentScrollTop.current;
      if (Math.abs(diff) > 0.4) {
        currentScrollTop.current += diff * 0.18;
        rightScrollRef.current.scrollTop = currentScrollTop.current;
        updateActiveSectionIndex();
        animFrameId.current = requestAnimationFrame(smoothScrollStep);
      } else {
        currentScrollTop.current = targetScrollTop.current;
        rightScrollRef.current.scrollTop = currentScrollTop.current;
        updateActiveSectionIndex();
        isAnimatingScroll.current = false;
      }
    };

    const handleGlobalWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const scroller = rightScrollRef.current;
      if (!scroller) return;

      const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      if (maxScroll <= 0) return;

      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 38; // normalize Windows mouse wheel lines to pixels
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      } else {
        delta *= 1.25; // enhance trackpad responsiveness
      }

      targetScrollTop.current = Math.max(0, Math.min(maxScroll, targetScrollTop.current + delta));

      if (!isAnimatingScroll.current) {
        isAnimatingScroll.current = true;
        animFrameId.current = requestAnimationFrame(smoothScrollStep);
      }
    };

    const handleSyncScroll = () => {
      if (!isAnimatingScroll.current && rightScrollRef.current) {
        targetScrollTop.current = rightScrollRef.current.scrollTop;
        currentScrollTop.current = rightScrollRef.current.scrollTop;
      }
    };

    container.addEventListener('scroll', handleSyncScroll, { passive: true });
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      container.removeEventListener('scroll', handleSyncScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Unexpand button moves ONLY when the mouse cursor moves:
  // Clamped between the container's top margin (20px) and bottom margin (windowHeight - 20 - 54)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize button to vertical center on mount
    const buttonHeight = 54;
    const initialY = Math.max(20, window.innerHeight / 2 - buttonHeight / 2);
    targetButtonY.set(initialY);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const minY = 20;
      const maxY = window.innerHeight - 20 - buttonHeight;
      const nextY = Math.max(minY, Math.min(maxY, e.clientY - buttonHeight / 2));
      targetButtonY.set(nextY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [targetButtonY]);

  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f6f6f6]">
        <p className="text-[1.8rem] text-grey">Section not found.</p>
      </div>
    );
  }

  // All section containers (1 for experience, 6 for projects, etc.)
  const displaySections = project.sections;
  const isSingleCard = displaySections.length === 1;

  return (
    <div className="w-full h-screen overflow-hidden flex max-phone:flex-col bg-[#f6f6f6] select-none relative">
      {/* DESKTOP FLOATING UNEXPAND BUTTON: Moves vertically with cursor */}
      <motion.div
        className="fixed top-0 z-50 hidden md:block"
        style={{
          right:
            project.id === 'experience' || project.id === 'skills'
              ? 'calc(59rem + 4rem)'
              : project.id === 'certifications'
              ? 'calc(74rem + 4rem)'
              : 'calc(69rem + 4rem)',
          y: smoothButtonY,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0"
        >
          <Link
            href="/"
            className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-none"
            style={{
              borderRadius: 15,
              boxShadow: 'none',
              transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
            }}
            aria-label="Back to home"
          >
            <CompressIcon className="w-[1.4rem] h-[1.4rem]" />
          </Link>
        </motion.div>
      </motion.div>

      {/* MOBILE HEADER: Pinned at top center with frosted blur */}
      <div className="flex md:hidden fixed top-0 left-0 w-full pt-[2.2rem] pb-[1.4rem] bg-[#f6f6f6]/90 backdrop-blur-md flex-col items-center justify-center text-center z-40 pointer-events-none select-none px-4 border-b border-black/[0.03]">
        <h1 className="text-[2.2rem] font-normal text-light-black leading-none m-0 tracking-tight">
          {project.id === 'experience' && showInfo ? 'Virtusa' : project.title}
        </h1>
        <p className="text-[2.2rem] font-normal text-grey leading-none m-0 tracking-tight mt-[0.4rem]">
          {project.id === 'experience' && showInfo
            ? activeDescTab === 0
              ? 'Mandate & Overview'
              : activeDescTab === 1
              ? 'Core Responsibilities'
              : 'Verified Production Stack'
            : project.id === 'projects' || project.id === 'skills' || project.id === 'certifications'
            ? project.sections[activeSectionIndex]?.section_title || project.sections[0]?.section_title
            : project.date}
        </p>
      </div>

      {/* MOBILE BOTTOM DOCK: Info + Live Site on left, Single Unexpand on right */}
      <div className="flex md:hidden fixed bottom-[2.4rem] left-0 w-full px-[2rem] items-center justify-between z-50 pointer-events-none select-none">
        <div className="flex items-center gap-[0.6rem] pointer-events-auto">
          {/* Info Button (if not skills) */}
          {project.id !== 'skills' && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
              animate={{
                rotate: showInfo ? -90 : 0,
                borderRadius: showInfo ? '50%' : '1.4rem',
                backgroundColor: showInfo ? '#1A1A1A' : '#ffffff',
                color: showInfo ? '#ffffff' : '#1a1a1a',
              }}
              transition={{
                rotate: { type: 'spring', stiffness: 200, damping: 17 },
                duration: 0.3,
              }}
              className="w-[4.8rem] h-[4.8rem] flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              aria-label="Toggle Project Info"
            >
              <InfoIcon width="1.4rem" height="1.4rem" color={showInfo ? '#FFFFFF' : '#1A1A1A'} />
            </motion.button>
          )}

          {/* See Live button */}
          {currentExternalUrl && (
            <motion.a
              whileTap={{ scale: 0.95 }}
              href={currentExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              animate={{
                borderRadius: showInfo ? '100px' : '1.4rem',
                paddingLeft: showInfo ? '1.6rem' : '0px',
                paddingRight: showInfo ? '1.6rem' : '0px',
                width: showInfo ? 'auto' : '4.8rem',
              }}
              className="h-[4.8rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 gap-[0.6rem] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              aria-label="Visit project website"
            >
              <ExternalLinkIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
              {showInfo && (
                <span className="text-[1.3rem] font-semibold tracking-tight whitespace-nowrap">
                  See Live
                </span>
              )}
            </motion.a>
          )}
        </div>

        {/* Single Mobile Unexpand Button on the right */}
        <Link
          href="/"
          className="pointer-events-auto w-[4.8rem] h-[4.8rem] rounded-[1.4rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          aria-label="Back to home"
        >
          <CompressIcon className="w-[1.6rem] h-[1.6rem]" />
        </Link>
      </div>

      {/* DESKTOP LEFT COLUMN: Pinned with responsive clamp, vertically centered */}
      <div
        className="hidden md:flex flex-col items-start justify-center h-screen fixed gap-[5rem] z-50 pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: 'clamp(3.2rem, calc(100vw - 110rem), 25.7rem)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-[5rem]"
        >
          {/* Header Row: Title & Subtitle */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden pb-1 relative w-[40rem]">
              <h1 className="text-[3.2rem] font-normal text-light-black leading-none m-0 tracking-normal">
                {project.id === 'experience' && showInfo ? 'Virtusa' : project.title}
              </h1>
            </div>
            <div className="overflow-hidden pb-2 relative w-[40rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={
                    project.id === 'experience' && showInfo
                      ? `virtusa-desc-tab-${activeDescTab}`
                      : project.id === 'projects' || project.id === 'skills' || project.id === 'certifications'
                      ? `${project.id}-title-${activeSectionIndex}`
                      : `proj-date-${project.id}`
                  }
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[3.2rem] font-normal text-grey leading-none m-0 tracking-normal"
                >
                  {project.id === 'experience' && showInfo
                    ? activeDescTab === 0
                      ? 'Mandate & Overview'
                      : activeDescTab === 1
                      ? 'Core Responsibilities'
                      : 'Verified Production Stack'
                    : project.id === 'projects' || project.id === 'skills' || project.id === 'certifications'
                    ? project.sections[activeSectionIndex]?.section_title || project.sections[0]?.section_title
                    : project.date}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons: Info Toggle & External Website Link */}
          <div className="relative flex gap-[0.4rem] items-center pointer-events-auto">
            {/* Info Button — hidden in skills section */}
            {project.id !== 'skills' && (
              <motion.button
                layout
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowInfo(!showInfo)}
                animate={{
                  rotate: showInfo ? -90 : 0,
                  borderRadius: showInfo ? '9999px' : '1.5rem',
                  backgroundColor: showInfo ? '#1A1A1A' : '#ffffff',
                  color: showInfo ? '#ffffff' : '#1a1a1a',
                }}
                transition={{
                  rotate: { type: 'spring', stiffness: 200, damping: 17 },
                  duration: 0.35,
                  ease: [0.32, 0, 0, 1],
                }}
                className="w-[5.4rem] h-[5.4rem] flex items-center justify-center cursor-pointer shrink-0"
                style={{
                  boxShadow: 'none',
                  transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
                }}
                aria-label="Toggle Project Info"
              >
                <InfoIcon width="1.4rem" height="1.4rem" color={showInfo ? '#FFFFFF' : '#1A1A1A'} />
              </motion.button>
            )}

            {/* External Link Button */}
            {currentExternalUrl && (
              <motion.a
                layout
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                href={currentExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  borderRadius: showInfo ? '100px' : '1.5rem',
                  paddingLeft: showInfo ? '1.8rem' : '0px',
                  paddingRight: showInfo ? '1.8rem' : '0px',
                  width: showInfo ? 'auto' : '5.4rem',
                }}
                transition={{ duration: 0.35, ease: [0.32, 0, 0, 1] }}
                className="h-[5.4rem] bg-white text-light-black flex items-center justify-center cursor-pointer overflow-hidden shrink-0 gap-[0.8rem]"
                style={{
                  boxShadow: 'none',
                  minWidth: '5.4rem',
                  transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
                }}
                aria-label="Visit project website"
              >
                <ExternalLinkIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
                <AnimatePresence>
                  {showInfo && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[1.4rem] font-semibold tracking-tight whitespace-nowrap overflow-hidden"
                    >
                      See Live
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Vertically Scrollable / Centered Box Containers */}
      <div
        ref={rightScrollRef}
        onScroll={updateActiveSectionIndex}
        className="absolute top-0 right-0 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-none flex justify-center md:justify-end px-4 md:px-8 pt-[7.5rem] md:pt-0 pb-[12rem] md:pb-0 z-10"
        style={{
          paddingTop:
            project.id === 'skills' || project.id === 'certifications'
              ? 'clamp(6rem, 10vh, 12rem)'
              : project.id === 'experience'
              ? 'max(2rem, calc((100vh - 60.58rem) / 2))'
              : 'max(2rem, calc((100vh - 70.85rem) / 2))',
          paddingBottom:
            project.id === 'skills' || project.id === 'certifications'
              ? '24rem'
              : project.id === 'experience'
              ? showInfo
                ? '24rem'
                : 'max(2rem, calc((100vh - 60.58rem) / 2))'
              : 'max(2rem, calc((100vh - 70.85rem) / 2))',
        }}
      >
        <div
          className={`flex flex-col gap-8 max-md:gap-[2rem] ${
            project.id === 'experience' || project.id === 'skills'
              ? 'w-full max-w-[35.5rem] md:w-[59rem] md:max-w-none'
              : project.id === 'certifications'
              ? 'w-full max-w-[38rem] md:w-[74rem] md:max-w-none'
              : 'w-full max-w-[35.5rem] md:w-[69rem] md:max-w-none'
          } shrink-0 items-center md:items-end mx-auto md:mx-0`}
        >
          {project.id === 'skills' ? (
            <motion.div
              data-section-index={0}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0, 0, 1] }}
              className="w-full relative shrink-0 cursor-default"
            >
              <SkillsAppGrid />
            </motion.div>
          ) : project.id === 'experience' ? (
              showInfo ? (
                <VirtusaDescriptionCards
                  activeTab={activeDescTab}
                  onSelectTab={handleSelectDescTab}
                  onClose={() => setShowInfo(false)}
                />
              ) : (
                <motion.div
                  data-section-index={0}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0, 0, 1] }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setShowInfo(true)}
                  className="w-full aspect-[33.5/34.4] !rounded-[64px] max-phone:!rounded-[32px] overflow-hidden relative shrink-0 cursor-pointer group bg-[#26272b]"
                  style={{
                    borderRadius: 64,
                    overflow: 'hidden',
                    boxShadow: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-between p-[5.4rem] max-phone:p-[3.2rem] text-white select-none relative overflow-hidden transition-colors duration-500 bg-[#26272b]">
                    {/* Top: Virtusa Official Brand Logo + Title + Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[2.4rem] max-phone:gap-[1.6rem]">
                        <VirtusaLogo className="w-[6.4rem] h-[6.4rem] max-phone:w-[5.2rem] max-phone:h-[5.2rem] shrink-0" />
                        <div>
                          <h2 className="text-[4.2rem] max-phone:text-[3rem] font-bold tracking-tight text-white leading-none">
                            Virtusa
                          </h2>
                          <span className="text-[1.3rem] font-mono uppercase tracking-wider text-white/50 block mt-[0.6rem]">
                            Enterprise Software
                          </span>
                        </div>
                      </div>
                      <span className="text-[1.2rem] font-mono uppercase tracking-wider px-[1.4rem] py-[0.6rem] rounded-full bg-white/10 text-white/70 font-medium max-phone:hidden">
                        ENTERPRISE SOFTWARE
                      </span>
                    </div>

                    {/* Middle: Role Title & Subtitle Focus */}
                    <div className="my-auto py-[2rem]">
                      <span className="text-[1.3rem] font-mono uppercase tracking-wider text-white/50 block mb-[0.8rem]">
                        Role
                      </span>
                      <h3 className="text-[3.6rem] max-phone:text-[2.6rem] font-bold text-white tracking-tight leading-tight">
                        Software Developer Intern
                      </h3>
                      <p className="text-[1.6rem] max-phone:text-[1.4rem] text-white/60 mt-[1rem] line-clamp-2 max-w-[54rem]">
                        Backend application services, RESTful API data contracts & high-reliability enterprise systems.
                      </p>
                    </div>

                    {/* Bottom: Timeline / Stack & Details Pill */}
                    <div className="flex items-end justify-between pt-[2.8rem] border-t border-white/10">
                      <div>
                        <span className="text-[1.2rem] font-mono uppercase tracking-wider text-white/40 block mb-[0.4rem]">
                          Timeline
                        </span>
                        <p className="text-[2rem] max-phone:text-[1.6rem] font-medium text-white/90 tracking-tight font-mono">
                          August 2025 to June 2026
                        </p>
                      </div>
                      <div className="flex items-center gap-[0.8rem] text-[1.3rem] font-mono text-white/80 bg-white/10 px-[1.6rem] py-[0.8rem] rounded-full hover:bg-white/20 transition-colors shadow-sm">
                        <span>Details</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ) : (
              displaySections.map((section, idx) => (
                <motion.div
                  key={idx}
                  data-section-index={idx}
                  initial={{ opacity: 0, y: idx === 0 ? 40 : 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: idx === 0 ? 0.05 : 0.08 + idx * 0.06,
                    ease: [0.32, 0, 0, 1],
                  }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    if (project.id === 'certifications') {
                      if (section.live_url) {
                        window.open(section.live_url, '_blank', 'noopener,noreferrer');
                      }
                    } else if (section.section_title === 'Explore All Repositories' || section.repo_url?.includes('tab=repositories')) {
                      window.open('https://github.com/rahul-1909?tab=repositories', '_blank', 'noopener,noreferrer');
                    } else {
                      setShowInfo(!showInfo);
                    }
                  }}
                  className={`w-full ${
                    project.id === 'certifications'
                      ? 'h-auto rounded-[16px] md:rounded-[24px] bg-transparent'
                      : project.id === 'projects'
                      ? 'h-auto md:aspect-square rounded-[32px] md:rounded-[64px] bg-[#18191c]'
                      : idx === 0
                      ? 'aspect-[33.5/34.4] rounded-[32px] md:rounded-[64px] bg-[#18191c]'
                      : 'aspect-square rounded-[32px] md:rounded-[64px] bg-[#18191c]'
                  } overflow-hidden relative shrink-0 cursor-pointer group`}
                  style={{
                    overflow: 'hidden',
                    boxShadow: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  {project.id === 'projects' ? (
                    <ProjectCardView
                      section={section}
                      index={idx}
                      showInfo={showInfo}
                      onToggleInfo={() => setShowInfo(!showInfo)}
                    />
                  ) : project.id === 'certifications' ? (
                    <CertificationCardView
                      section={section}
                      index={idx}
                      showInfo={showInfo}
                      onToggleInfo={() => setShowInfo(!showInfo)}
                    />
                  ) : section.video_url ? (
                    <video
                      src={section.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={project.thumbnail}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    />
                  ) : (
                    <img
                      src={section.image || project.thumbnail}
                      alt={section.section_title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    />
                  )}

            {/* Info Overlay with Smooth Framer Motion (for non-projects/non-experience sections) */}
            {project.id !== 'projects' && project.id !== 'experience' && (
              <AnimatePresence>
                {showInfo && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                  animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                  exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-xl p-[5.4rem] max-phone:p-[3.2rem] flex flex-col justify-between z-30 cursor-pointer select-text overflow-y-auto"
                >
                  <div className="flex flex-col justify-between h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="text-[1.4rem] font-mono font-semibold uppercase tracking-wider text-grey block mb-[0.8rem]">
                          0{idx + 1}
                        </span>
                        <h3 className="text-[3.2rem] max-phone:text-[2.4rem] font-bold text-light-black tracking-tight leading-tight">
                          {section.section_title}
                        </h3>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[2.1rem] max-phone:text-[1.6rem] font-medium leading-[1.5] text-light-black/85 whitespace-pre-line overflow-y-auto pr-[1rem]"
                      >
                        {section.body}
                      </motion.p>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
            )}
          </motion.div>
        ))
      )}
          </div>
        </div>
    </div>
  );
}
