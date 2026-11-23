'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects, Project } from '@/data/portfolioData';
import { VirtusaLogo } from '@/components/Icons/VirtusaLogo';
import { VirtusaDescriptionCards } from '@/components/Cards/VirtusaDescriptionCards';
import { ProjectCardView } from '@/components/Cards/ProjectCardView';
import { CertificationCardView } from '@/components/Cards/CertificationCardView';
import { SkillsAppGrid } from '@/components/Skills/SkillsAppGrid';
import { CardAnimatedVisual } from '@/components/Animations/CardAnimatedVisual';
import {
  UserIcon,
  ChatIcon,
  MailIcon,
  LinkedinIcon,
  XIcon,
  GitHubIcon,
  BackArrowIcon,
  InfoIcon,
  ExternalLinkIcon,
} from '@/components/Icons/SiteIcons';

// Compress / Minimize Icon (4 inward-pointing arrows, exactly as shown next to the title in the reference image)
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

export const ProjectSlider: React.FC = () => {
  const router = useRouter();

  // Initial active project is Coercive Control (index 0)
  const defaultIdx = 0;

  const [virtualIndex, setVirtualIndex] = useState(defaultIdx);
  const [showSocials, setShowSocials] = useState(false);
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

  const [windowHeight, setWindowHeight] = useState(800);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [activeDescTab, setActiveDescTab] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const targetScrollTop = useRef(0);
  const currentScrollTop = useRef(0);
  const isAnimatingScroll = useRef(false);
  const animFrameId = useRef<number | null>(null);

  // Unexpand button vertical motion state:
  const targetButtonY = useMotionValue(170);
  const smoothButtonY = useSpring(targetButtonY, {
    stiffness: 260,
    damping: 30,
    mass: 0.6,
  });

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId) || null
    : null;

  const currentSection = selectedProject?.sections[activeSectionIndex] || selectedProject?.sections[0];
  const currentExternalUrl =
    selectedProject?.id === 'projects' || selectedProject?.id === 'certifications'
      ? currentSection?.live_url || currentSection?.repo_url
      : selectedProject?.websiteUrl;

  const handleSelectDescTab = (index: number) => {
    setActiveDescTab(index);
    const targetCard = document.getElementById(`virtusa-card-${index}`);
    if (targetCard && rightScrollRef.current) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Calculates which card container is currently in view
  const updateActiveSectionIndex = useCallback(() => {
    const container = rightScrollRef.current;
    if (!container) return;

    if (selectedProject?.id === 'experience' && showInfo) {
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
  }, [selectedProject?.id, showInfo]);

  // Reset active section index whenever selected project changes
  useEffect(() => {
    setActiveSectionIndex(0);
  }, [selectedProjectId]);

  // Seamless click handler: activates in-place morph and updates browser URL
  const handleCardClick = (project: Project, offset: number, e?: React.MouseEvent) => {
    if (offset !== 0) {
      setVirtualIndex((prev) => prev + offset);
      return;
    }
    if (e && typeof window !== 'undefined') {
      const buttonHeight = 50;
      const minY = 20;
      const maxY = window.innerHeight - 20 - buttonHeight;
      const initialY = Math.max(minY, Math.min(maxY, e.clientY - buttonHeight / 2));
      targetButtonY.set(initialY);
      smoothButtonY.jump(initialY);
    }
    setSelectedProjectId(project.id);
    setActiveSectionIndex(0);
    setShowInfo(false);
    try {
      window.history.pushState({ projectId: project.id }, '', `/section/${project.id}`);
    } catch {}
  };

  // Close project handler: smooth reverse morph back into slider
  const handleCloseProject = () => {
    setSelectedProjectId(null);
    setActiveSectionIndex(0);
    setShowInfo(false);
    try {
      window.history.pushState(null, '', '/');
    } catch {}
  };

  // Browser back/forward button support
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/\/(?:section|project)\/([^/]+)/);
      if (match) {
        setSelectedProjectId(match[1]);
      } else {
        setSelectedProjectId(null);
      }
      setActiveSectionIndex(0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global smooth mouse wheel scroll routing when project view is open:
  // Wherever the cursor is on the page, the right-side container scrolls with ultra-smooth lerp.
  // Wheel scroll does NOT move the unexpand button.
  useEffect(() => {
    if (!selectedProjectId) return;
    const container = rightScrollRef.current;
    if (!container) return;

    targetScrollTop.current = container.scrollTop;
    currentScrollTop.current = container.scrollTop;

    const smoothScrollStep = () => {
      if (!rightScrollRef.current) return;
      const diff = targetScrollTop.current - currentScrollTop.current;
      if (Math.abs(diff) > 0.3) {
        currentScrollTop.current += diff * 0.22;
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
  }, [selectedProjectId]);

  // Unexpand button vertical motion on mouse movement:
  useEffect(() => {
    if (!selectedProjectId || typeof window === 'undefined') return;

    const buttonHeight = 54;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const minY = 20;
      const maxY = window.innerHeight - 20 - buttonHeight;
      const nextY = Math.max(minY, Math.min(maxY, e.clientY - buttonHeight / 2));
      targetButtonY.set(nextY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [selectedProjectId, targetButtonY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const dragStartY = useRef(0);
  const currentDragY = useRef(0);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const accumulatedDelta = useRef(0);
  const isWheelLocked = useRef(false);
  const wheelTimer = useRef<NodeJS.Timeout | null>(null);

  const total = Math.min(4, projects.length);

  // Active project index in circular array
  const activeProjectIndex = ((virtualIndex % total) + total) % total;

  // Advance down: next card unfolds from top horizontal stack to vertical
  const scrollDown = useCallback(() => {
    setScrollDirection('down');
    setVirtualIndex((prev) => prev - 1);
  }, []);

  // Advance up: reverse direction
  const scrollUp = useCallback(() => {
    setScrollDirection('up');
    setVirtualIndex((prev) => prev + 1);
  }, []);

  // Smooth wheel listener with delta accumulation for the home slider
  const handleWheel = (e: React.WheelEvent) => {
    if (selectedProjectId) return; // Delegate to global wheel when project is open

    accumulatedDelta.current += e.deltaY;

    if (!isWheelLocked.current && Math.abs(accumulatedDelta.current) >= 18) {
      isWheelLocked.current = true;
      if (accumulatedDelta.current > 0) {
        scrollDown();
      } else {
        scrollUp();
      }
      accumulatedDelta.current = 0;

      const cooldown = Math.max(90, 240 - Math.min(140, Math.abs(e.deltaY)));
      setTimeout(() => {
        isWheelLocked.current = false;
        accumulatedDelta.current = 0;
      }, cooldown);
    }

    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      accumulatedDelta.current = 0;
      isWheelLocked.current = false;
    }, 140);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProjectId) {
        handleCloseProject();
        return;
      }
      if (selectedProjectId) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        scrollDown();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        scrollUp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollDown, scrollUp, selectedProjectId]);

  // Pointer drag gestures with smooth responsiveness
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    currentDragY.current = e.clientY;
    hasMoved.current = false;
    isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    currentDragY.current = e.clientY;
    if (Math.abs(e.clientY - dragStartY.current) > 10) {
      hasMoved.current = true;
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const diff = currentDragY.current - dragStartY.current;
    if (Math.abs(diff) > 28) {
      if (diff > 0) {
        scrollDown();
      } else {
        scrollUp();
      }
    }
  };

  // 5-card sliding window centered on virtualIndex
  const windowOffsets = [-2, -1, 0, 1, 2];

  // 3D Stack Transforms matching Gabriel Beaugonin's exact formula:
  const getCardTransforms = (distance: number) => {
    if (distance === 0) {
      return {
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
      };
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const K = isMobile ? 43 : 35;
    const g = isMobile ? 0.37 : 0.4;
    const p = isMobile ? -93 : -98;
    const nc = isMobile ? 0.76 : 0.8;
    const baseOffset = Math.round(windowHeight * g);

    if (distance > 0) {
      // Bottom stack: Card +1 and Card +2
      const y = baseOffset + (distance > 1 ? (distance - 1) * K : 0);
      return {
        y,
        rotateX: -p,
        scale: nc,
        opacity: 1,
        zIndex: 20 - distance,
      };
    } else {
      // Top stack: Card -1 and Card -2
      const y = -baseOffset + (distance < -1 ? (distance + 1) * K : 0);
      return {
        y,
        rotateX: p,
        scale: nc,
        opacity: 1,
        zIndex: 20 - Math.abs(distance),
      };
    }
  };

  return (
    <div
      className={`w-full h-screen relative flex max-phone:flex-col items-center justify-between select-none overflow-hidden bg-[#f6f6f6] transition-[padding] duration-500 ease-out ${
        selectedProject ? 'px-0 max-phone:px-[6vw]' : 'px-0'
      }`}
      onWheel={handleWheel}
      style={{ touchAction: selectedProject ? 'auto' : 'none' }}
    >
      {/* DESKTOP FLOATING UNEXPAND BUTTON: Moves vertically with cursor */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="desktop-unexpand-button"
            className="fixed top-0 z-50 hidden md:block"
            style={{
              right:
                selectedProject.id === 'experience' || selectedProject.id === 'skills'
                  ? 'calc(59rem + 4rem)'
                  : selectedProject.id === 'certifications'
                  ? 'calc(74rem + 4rem)'
                  : 'calc(69rem + 4rem)',
              y: smoothButtonY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCloseProject}
              className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-none"
              style={{
                borderRadius: 15,
                boxShadow: 'none',
                transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
              }}
              aria-label="Back to home"
            >
              <CompressIcon className="w-[1.4rem] h-[1.4rem]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE UNEXPAND BUTTON: Fixed at bottom right */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed right-[2rem] bottom-[2.4rem] z-50 block md:hidden">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCloseProject}
              className="social-button w-[5rem] h-[5rem] min-w-[5rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-none"
              style={{
                borderRadius: 15,
                boxShadow: 'none',
              }}
              aria-label="Back to home"
            >
              <CompressIcon className="w-[1.4rem] h-[1.4rem]" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE HEADER: Fixed at top center with frosted blur */}
      <div className="flex md:hidden fixed top-0 left-0 w-full pt-[2.2rem] pb-[1.4rem] bg-[#f6f6f6]/90 backdrop-blur-md flex-col items-center justify-center text-center z-40 pointer-events-none select-none px-4 border-b border-black/[0.03]">
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            <motion.div
              key="mobile-home-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-[2.2rem] font-normal text-light-black leading-none m-0 tracking-tight">
                Rahul Teja
              </h1>
              <p className="text-[2.2rem] font-normal text-grey leading-none m-0 tracking-tight mt-[0.4rem]">
                Software Engineer
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`mobile-project-header-${selectedProject.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-[2.2rem] font-normal text-light-black leading-none m-0 tracking-tight">
                {selectedProject.id === 'experience' && showInfo ? 'Virtusa' : selectedProject.title}
              </h1>
              <p className="text-[2.2rem] font-normal text-grey leading-none m-0 tracking-tight mt-[0.4rem]">
                {selectedProject.id === 'experience' && showInfo
                  ? activeDescTab === 0
                    ? 'Mandate & Overview'
                    : activeDescTab === 1
                    ? 'Core Responsibilities'
                    : 'Verified Production Stack'
                  : selectedProject.id === 'projects' || selectedProject.id === 'skills' || selectedProject.id === 'certifications'
                  ? selectedProject.sections[activeSectionIndex]?.section_title || selectedProject.sections[0]?.section_title
                  : selectedProject.date}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE BOTTOM DOCK (Home View): Centered bottom action bar */}
      {!selectedProject && (
        <div className="flex md:hidden fixed bottom-[2.4rem] left-1/2 -translate-x-1/2 z-40 items-center justify-center gap-[0.6rem] pointer-events-auto select-none">
          {/* About Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/about')}
            className="social-button w-[4.6rem] h-[4.6rem] rounded-[1.4rem] bg-white flex shrink-0 items-center justify-center text-light-black cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            style={{ borderRadius: 14 }}
            aria-label="Open About Page"
          >
            <UserIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
          </motion.button>

          {/* Contact Button / Close Morph */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSocials(!showSocials)}
            className="social-button w-[4.6rem] h-[4.6rem] rounded-[1.4rem] flex shrink-0 items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.06)] relative overflow-hidden"
            animate={{
              rotate: showSocials ? -90 : 0,
              borderRadius: showSocials ? '50%' : '1.4rem',
              backgroundColor: showSocials ? '#000000' : '#FFFFFF',
            }}
            transition={{
              rotate: { type: 'spring', stiffness: 220, damping: 20 },
              borderRadius: { duration: 0.28, ease: [0.785, 0.135, 0.15, 0.86] },
              backgroundColor: { duration: 0.28, ease: [0.785, 0.135, 0.15, 0.86] },
            }}
            aria-label={showSocials ? 'Close Social Links' : 'Open Social Links'}
          >
            <motion.div
              className="absolute flex items-center justify-center pointer-events-none"
              animate={{ opacity: showSocials ? 0 : 1, scale: showSocials ? 0.4 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <ChatIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
            </motion.div>
            <motion.div
              className="absolute flex items-center justify-center pointer-events-none"
              animate={{ opacity: showSocials ? 1 : 0, scale: showSocials ? 1 : 0.4 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="1.4rem" height="1.4rem" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 2.5L11.5 11.5M11.5 2.5L2.5 11.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.button>

          {/* When showSocials is open, reveal social buttons in the same centered row */}
          <AnimatePresence>
            {showSocials && (
              <>
                {/* Mail Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -6 }}
                  transition={{ duration: 0.22 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className="social-button w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.06)] shrink-0"
                  style={{ borderRadius: 13 }}
                  aria-label="Copy email"
                >
                  <MailIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
                </motion.button>

                {/* X / Twitter */}
                <motion.a
                  initial={{ opacity: 0, scale: 0.8, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -6 }}
                  transition={{ duration: 0.22, delay: 0.03 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://x.com/Knightswatch__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.06)] shrink-0"
                  style={{ borderRadius: 13 }}
                  aria-label="X (Twitter)"
                >
                  <XIcon width="1.3rem" height="1.2rem" color="#1A1A1A" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  initial={{ opacity: 0, scale: 0.8, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -6 }}
                  transition={{ duration: 0.22, delay: 0.06 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/nallarahulteja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.06)] shrink-0"
                  style={{ borderRadius: 13 }}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon width="1.3rem" height="1.3rem" color="#1A1A1A" />
                </motion.a>

                {/* GitHub */}
                <motion.a
                  initial={{ opacity: 0, scale: 0.8, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -6 }}
                  transition={{ duration: 0.22, delay: 0.09 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/rahul-1909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button w-[4.4rem] h-[4.4rem] rounded-[1.3rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.06)] shrink-0"
                  style={{ borderRadius: 13 }}
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
                </motion.a>
              </>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* MOBILE BOTTOM DOCK (Project View): Info + Live Site on left, Unexpand on right */}
      {selectedProject && (
        <div className="flex md:hidden fixed bottom-[2.4rem] left-0 w-full px-[2rem] items-center justify-between z-50 pointer-events-none select-none">
          <div className="flex items-center gap-[0.6rem] pointer-events-auto">
            {/* Info Button (if not skills) */}
            {selectedProject.id !== 'skills' && (
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCloseProject}
            className="pointer-events-auto w-[4.8rem] h-[4.8rem] rounded-[1.4rem] bg-white text-light-black flex items-center justify-center cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
            aria-label="Back to home"
          >
            <CompressIcon className="w-[1.6rem] h-[1.6rem]" />
          </motion.button>
        </div>
      )}

      {/* DESKTOP LEFT COLUMN: Pinned with responsive clamp, vertically centered */}
      <div
        className="hidden md:flex flex-col items-start justify-center h-screen fixed gap-[5rem] z-50 pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: 'clamp(3.2rem, calc(100vw - 110rem), 25.7rem)',
        }}
      >
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            /* Home Author Header */
            <motion.div
              key="home-hero"
              initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-[5rem] max-phone:gap-0 max-phone:h-full max-phone:justify-between max-phone:w-full max-phone:items-center"
            >
              <div className="flex flex-col gap-2 max-phone:items-center">
                <div className="overflow-hidden pb-1 relative w-[40rem] max-phone:w-auto max-phone:whitespace-nowrap">
                  <h1 className="text-[3.2rem] max-phone:text-[1.8rem] font-normal text-light-black leading-none m-0 tracking-normal">
                    Rahul Teja
                  </h1>
                </div>
                <div className="overflow-hidden pb-2 relative w-[40rem] max-phone:w-auto max-phone:whitespace-nowrap">
                  <p className="text-[3.2rem] max-phone:text-[1.8rem] font-normal text-grey leading-none m-0 tracking-normal">
                    Software Engineer
                  </p>
                </div>
              </div>

              {/* Buttons Row: About Button & Connect Socials Button (no shadow) */}
              <div className="relative flex gap-[0.4rem] items-center pointer-events-auto">
                <motion.button
                  whileHover={{ scale: 1.037 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push('/about')}
                  className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] p-[2rem] rounded-[1.5rem] bg-white flex shrink-0 items-center justify-center text-light-black cursor-pointer shadow-none"
                  style={{
                    borderRadius: 15,
                    boxShadow: 'none',
                    transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
                  }}
                  aria-label="Open About Page"
                >
                  <UserIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
                </motion.button>

                <div className="relative flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.037 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowSocials(!showSocials)}
                    className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] flex shrink-0 items-center justify-center cursor-pointer shadow-none relative overflow-hidden"
                    animate={{
                      rotate: showSocials ? -90 : 0,
                      borderRadius: showSocials ? '50%' : '1.5rem',
                      backgroundColor: showSocials ? '#000000' : '#FFFFFF',
                    }}
                    transition={{
                      rotate: { type: 'spring', stiffness: 220, damping: 20 },
                      borderRadius: { duration: 0.28, ease: [0.785, 0.135, 0.15, 0.86] },
                      backgroundColor: { duration: 0.28, ease: [0.785, 0.135, 0.15, 0.86] },
                    }}
                    style={{
                      boxShadow: 'none',
                    }}
                    aria-label={showSocials ? 'Close Social Links' : 'Open Social Links'}
                  >
                    {/* Chat Icon (Visible when closed) */}
                    <motion.div
                      className="absolute flex items-center justify-center pointer-events-none"
                      initial={false}
                      animate={{
                        opacity: showSocials ? 0 : 1,
                        scale: showSocials ? 0.4 : 1,
                      }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <ChatIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
                    </motion.div>

                    {/* Close / X Icon (Visible when opened into black circle) */}
                    <motion.div
                      className="absolute flex items-center justify-center pointer-events-none"
                      initial={false}
                      animate={{
                        opacity: showSocials ? 1 : 0,
                        scale: showSocials ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <svg
                        width="1.4rem"
                        height="1.4rem"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 2.5L11.5 11.5M11.5 2.5L2.5 11.5"
                          stroke="#FFFFFF"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {showSocials && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-full ml-[0.4rem] flex gap-[0.4rem] items-center"
                      >
                        {/* 1. Mail Button with "click to copy" Caption */}
                        <div className="relative">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.037 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleCopyEmail}
                            onMouseEnter={() => setMailHovered(true)}
                            onMouseLeave={() => setMailHovered(false)}
                            aria-label="Copy email"
                            className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-none"
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

                        {/* 2. X (Twitter) Button */}
                        <motion.a
                          whileHover={{ scale: 1.037 }}
                          whileTap={{ scale: 0.97 }}
                          href="https://x.com/Knightswatch__"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X (Twitter)"
                          className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-none"
                          style={{
                            borderRadius: 15,
                            boxShadow: 'none',
                            transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
                          }}
                        >
                          <XIcon width="1.3rem" height="1.2rem" color="#1A1A1A" />
                        </motion.a>

                        {/* 3. LinkedIn Button */}
                        <motion.a
                          whileHover={{ scale: 1.037 }}
                          whileTap={{ scale: 0.97 }}
                          href="https://www.linkedin.com/in/nallarahulteja/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-none"
                          style={{
                            borderRadius: 15,
                            boxShadow: 'none',
                            transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
                          }}
                        >
                          <LinkedinIcon width="1.3rem" height="1.3rem" color="#1A1A1A" />
                        </motion.a>

                        {/* 4. GitHub Button */}
                        <motion.a
                          whileHover={{ scale: 1.037 }}
                          whileTap={{ scale: 0.97 }}
                          href="https://github.com/rahul-1909"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Profile"
                          className="social-button w-[5.4rem] h-[5.4rem] min-w-[5.4rem] rounded-[1.5rem] bg-white text-light-black flex items-center justify-center cursor-pointer shadow-none"
                          style={{
                            borderRadius: 15,
                            boxShadow: 'none',
                            transition: 'scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',
                          }}
                        >
                          <GitHubIcon width="1.4rem" height="1.4rem" color="#1A1A1A" />
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Project Header Matching Reference Image (Exact Home Column Sizing) */
            <motion.div
              key={`project-hero-${selectedProject.id}`}
              initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-[5rem] max-phone:gap-0 max-phone:h-full max-phone:justify-between max-phone:w-full max-phone:items-center"
            >
              <div className="flex flex-col gap-2 max-phone:items-center">
                <div className="overflow-hidden pb-1 relative w-[40rem] max-phone:w-auto max-phone:whitespace-nowrap">
                  <h1 className="text-[3.2rem] max-phone:text-[1.8rem] font-normal text-light-black leading-none m-0 tracking-normal">
                    {selectedProject.id === 'experience' && showInfo ? 'Virtusa' : selectedProject.title}
                  </h1>
                </div>
                <div className="overflow-hidden pb-2 relative w-[40rem] max-phone:w-auto max-phone:whitespace-nowrap">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={
                        selectedProject.id === 'experience' && showInfo
                          ? `virtusa-slider-desc-${activeDescTab}`
                          : selectedProject.id === 'projects' || selectedProject.id === 'skills' || selectedProject.id === 'certifications'
                          ? `proj-title-${activeSectionIndex}`
                          : `proj-date-${selectedProject.id}`
                      }
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[3.2rem] max-phone:text-[1.8rem] font-normal text-grey leading-none m-0 tracking-normal"
                    >
                      {selectedProject.id === 'experience' && showInfo
                        ? activeDescTab === 0
                          ? 'Mandate & Overview'
                          : activeDescTab === 1
                          ? 'Core Responsibilities'
                          : 'Verified Production Stack'
                        : selectedProject.id === 'projects' || selectedProject.id === 'skills' || selectedProject.id === 'certifications'
                        ? selectedProject.sections[activeSectionIndex]?.section_title || selectedProject.sections[0]?.section_title
                        : selectedProject.date}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Buttons: Info Toggle & External Website Link */}
              <div className="relative flex gap-[0.4rem] items-center pointer-events-auto">
                {/* Mobile Unexpand Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleCloseProject}
                  className="w-[5.4rem] h-[5.4rem] rounded-[1.5rem] bg-white text-light-black items-center justify-center shrink-0 hidden max-phone:flex cursor-pointer"
                  style={{ boxShadow: 'none' }}
                  aria-label="Back to home"
                >
                  <CompressIcon className="w-[1.8rem] h-[1.8rem]" />
                </motion.button>
                {/* Info Button — hidden in skills section, square when off, circular when on (5.4rem x 5.4rem) */}
                {selectedProject.id !== 'skills' && (
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

                {/* External Link Button — icon-only square when closed (5.4rem x 5.4rem), pill with text when info open */}
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
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN: Either 3D Card Slider OR 4-Box Scroll Container */}
      <AnimatePresence>
        {!selectedProject ? (
          /* 3D Horizontal-to-Vertical Card Carousel Container */
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center md:justify-end md:pr-[25.7rem] z-20 overflow-hidden">
            <motion.div
              key="home-slider"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
              role="region"
              aria-label="3D Project Card Slider"
              className="relative w-[27rem] h-[27rem] md:w-[33.5rem] md:h-[34.4rem] select-none cursor-grab active:cursor-grabbing pointer-events-auto"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <ul
                className="w-full h-full flex perspective-normal transform-3d flex-col"
                style={{
                  perspective: '1500px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {windowOffsets.map((offset) => {
                  const cardIndex = virtualIndex + offset;
                  const projectIndex = ((cardIndex % total) + total) % total;
                  const project = projects[projectIndex];
                  const isCenter = offset === 0;
                  const theme = projectThemes[project.id] || { bg: '#141414', text: '#ffffff' };
                  const style = getCardTransforms(offset);

                  return (
                    <motion.li
                      key={`card-view-${cardIndex}`}
                      className="absolute inset-0 w-full h-full will-change-transform cursor-pointer shadow-none"
                      style={{
                        borderRadius: 32,
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center center',
                        zIndex: style.zIndex,
                      }}
                    initial={false}
                    animate={{
                      y: style.y,
                      rotateX: style.rotateX,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    exit={{
                      y: offset < 0 ? -windowHeight * 0.7 : offset > 0 ? windowHeight * 0.7 : 0,
                      opacity: isCenter ? 1 : 0,
                      transition: { duration: 0.45, ease: [0.32, 0, 0, 1] },
                    }}
                    transition={{
                      y: {
                        type: 'spring',
                        stiffness: 140,
                        damping: 14,
                        mass: 0.85,
                      },
                      rotateX: {
                        type: 'spring',
                        stiffness: 125,
                        damping: 12.8,
                        mass: 0.85,
                      },
                      scale: {
                        type: 'spring',
                        stiffness: 150,
                        damping: 16,
                        mass: 0.8,
                      },
                      opacity: {
                        duration: 0.35,
                        ease: [0.32, 0, 0, 1],
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasMoved.current) return;
                      handleCardClick(project, offset, e);
                    }}
                  >
                    <motion.div
                      layoutId={isCenter ? `card-container-${project.id}` : undefined}
                      whileHover={isCenter ? { scale: 1.03, transition: { duration: 0.3, ease: [0.075, 0.82, 0.165, 1] } } : undefined}
                      whileTap={isCenter ? { scale: 0.97 } : undefined}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (hasMoved.current) return;
                        handleCardClick(project, offset, e);
                      }}
                      className="relative w-full h-full rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-none bg-[#EAEAEA]"
                      style={{
                        borderRadius: 32,
                        boxShadow: 'none',
                      }}
                    >
                      {/* Inner Card Content: 100% visible on active center card, cleanly fades to 0 on stacked slabs */}
                      <motion.div
                        className="absolute inset-0 w-full h-full overflow-hidden"
                        style={{ borderRadius: 32 }}
                        initial={false}
                        animate={{ opacity: isCenter ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0, 0, 1] }}
                      >
                        {/* Card Background Photo: Distinct inspired aesthetic for each card */}
                        <img
                          src={
                            project.id === 'experience' || project.id === 'coercive-control'
                              ? '/images/card-experience-bg.jpg'
                              : project.id === 'projects' || project.id === 'candiac'
                              ? '/images/card-projects-bg.jpg'
                              : project.id === 'certifications' || project.id === 'lightship'
                              ? '/images/card-certifications-bg.jpg'
                              : '/images/card-architecture-bg.jpg'
                          }
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        />

                        {/* Animated Central Title Typography (Emerges out of nowhere) */}
                        {isCenter && (
                          <CardAnimatedVisual projectId={project.id} />
                        )}

                        {/* Bottom-left Card Label (Matched to Gabriel's exact style) */}
                        <p
                          className="text-[1.6rem] text-white absolute bottom-12 left-12 font-normal leading-none tracking-normal select-none pointer-events-none"
                          style={{ mixBlendMode: 'exclusion' }}
                        >
                          {project.title}
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
          </div>
        ) : (
          /* Project View: Stack Pinned to Right Edge. If single card (e.g. Experience, Skills), center vertically with equal top/bottom space. If multi-card, scrollable stack */
          <motion.div
            key={`project-view-right-${selectedProject.id}`}
            ref={rightScrollRef}
            onScroll={updateActiveSectionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 right-0 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-none flex justify-center md:justify-end px-4 md:px-8 pt-[7.5rem] md:pt-0 pb-[12rem] md:pb-0 z-10"
            style={{
              paddingTop:
                selectedProject.id === 'skills' || selectedProject.id === 'certifications'
                  ? 'clamp(6rem, 10vh, 12rem)'
                  : selectedProject.id === 'experience'
                  ? 'max(2rem, calc((100vh - 60.58rem) / 2))'
                  : 'max(2rem, calc((100vh - 70.85rem) / 2))',
              paddingBottom:
                selectedProject.id === 'skills' || selectedProject.id === 'certifications'
                  ? '24rem'
                  : selectedProject.id === 'experience'
                  ? showInfo
                    ? '24rem'
                    : 'max(2rem, calc((100vh - 60.58rem) / 2))'
                  : 'max(2rem, calc((100vh - 70.85rem) / 2))',
            }}
          >
            <div
              className={`flex flex-col gap-8 max-md:gap-[2rem] ${
                selectedProject.id === 'experience' || selectedProject.id === 'skills'
                  ? 'w-full max-w-[35.5rem] md:w-[59rem] md:max-w-none'
                  : selectedProject.id === 'certifications'
                  ? 'w-full max-w-[38rem] md:w-[74rem] md:max-w-none'
                  : 'w-full max-w-[35.5rem] md:w-[69rem] md:max-w-none'
              } shrink-0 items-center md:items-end mx-auto md:mx-0`}
            >
              {selectedProject.id === 'skills' ? (
                <motion.div
                  data-section-index={0}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0, 0, 1] }}
                  className="w-full relative shrink-0 cursor-default"
                >
                  <SkillsAppGrid />
                </motion.div>
              ) : selectedProject.id === 'experience' ? (
                showInfo ? (
                  <VirtusaDescriptionCards
                    activeTab={activeDescTab}
                    onSelectTab={handleSelectDescTab}
                    onClose={() => setShowInfo(false)}
                  />
                ) : (
                  <motion.div
                    data-section-index={0}
                    layoutId={`card-container-${selectedProject.id}`}
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
                selectedProject.sections.map((section, idx) => {
                const isFirstCard = idx === 0;

                return (
                  <motion.div
                    key={`section-box-${selectedProject.id}-${idx}`}
                    data-section-index={idx}
                    layoutId={isFirstCard ? `card-container-${selectedProject.id}` : undefined}
                    initial={isFirstCard ? false : { opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 60 }}
                    transition={{
                      layout: {
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      duration: 0.5,
                      delay: isFirstCard ? 0 : 0.08 + idx * 0.06,
                      ease: [0.32, 0, 0, 1],
                    }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      if (selectedProject.id === 'certifications') {
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
                      selectedProject.id === 'certifications'
                        ? 'h-auto rounded-[16px] md:rounded-[24px] bg-transparent'
                        : selectedProject.id === 'projects'
                        ? 'h-auto md:aspect-square rounded-[32px] md:rounded-[64px] bg-[#EAEAEA]'
                        : selectedProject.id === 'experience' || isFirstCard
                        ? 'aspect-[33.5/34.4] rounded-[32px] md:rounded-[64px] bg-[#EAEAEA]'
                        : 'aspect-square rounded-[32px] md:rounded-[64px] bg-[#EAEAEA]'
                    } overflow-hidden relative shrink-0 cursor-pointer group`}
                    style={{
                      overflow: 'hidden',
                      boxShadow: 'none',
                      border: 'none',
                      outline: 'none',
                    }}
                  >
                    {selectedProject.id === 'projects' ? (
                      <ProjectCardView
                        section={section}
                        index={idx}
                        showInfo={showInfo}
                        onToggleInfo={() => setShowInfo(!showInfo)}
                      />
                    ) : selectedProject.id === 'certifications' ? (
                      <CertificationCardView
                        section={section}
                        index={idx}
                        showInfo={showInfo}
                        onToggleInfo={() => setShowInfo(!showInfo)}
                      />
                    ) : (
                      <div className="w-full h-full relative select-none flex items-center justify-center overflow-hidden bg-[#EAEAEA]">
                        {section.video_url ? (
                          <video
                            src={section.video_url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={selectedProject.thumbnail}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                          />
                        ) : (
                          <img
                            src={section.image || selectedProject.thumbnail}
                            alt={section.section_title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                          />
                        )}

                        {/* Bottom-left Card Label */}
                        <p
                          className="text-[1.6rem] text-white absolute bottom-12 left-12 font-normal leading-none tracking-normal select-none pointer-events-none z-10"
                          style={{ mixBlendMode: 'exclusion' }}
                        >
                          {section.section_title}
                        </p>

                        {/* Info Overlay on Toggle */}
                        <AnimatePresence>
                          {showInfo && (
                            <motion.div
                              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute inset-0 bg-white p-[6rem] max-phone:p-[3.2rem] flex flex-col justify-between z-30 cursor-pointer select-text overflow-y-auto"
                              style={{ borderRadius: 64 }}
                            >
                              <div className="flex flex-col justify-between h-full">
                                <div>
                                  <span className="text-[1.4rem] font-mono font-semibold uppercase tracking-wider text-grey block mb-[1.2rem]">
                                    0{idx + 1} · Professional Certification
                                  </span>
                                  <h3 className="text-[3.2rem] max-phone:text-[2.4rem] font-bold text-light-black tracking-tight leading-tight mb-[2rem]">
                                    {section.section_title}
                                  </h3>
                                  <p className="text-[1.8rem] max-phone:text-[1.5rem] leading-[1.65] text-light-black/85">
                                    {section.body}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAR RIGHT: 4 Vertical Pagination Dots (visible on home slider) */}
      {!selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-[8.1rem] top-1/2 -translate-y-1/2 max-phone:right-[2.5rem] flex flex-col gap-[0.8rem] z-20"
        >
          {Array.from({ length: total }).map((_, dotIdx) => {
            const isActive = dotIdx === activeProjectIndex;
            return (
              <button
                key={dotIdx}
                onClick={() => {
                  const diff = dotIdx - activeProjectIndex;
                  let step = diff;
                  if (diff > total / 2) step = diff - total;
                  if (diff < -total / 2) step = diff + total;
                  setVirtualIndex((prev) => prev + step);
                }}
                className="w-[3px] h-[3px] rounded-full bg-light-black transition-all duration-300 cursor-pointer p-0 border-0"
                style={{
                  opacity: isActive ? 1 : 0.2,
                  transform: isActive ? 'scale(1.4)' : 'scale(1)',
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            );
          })}
        </motion.div>
      )}

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
};
