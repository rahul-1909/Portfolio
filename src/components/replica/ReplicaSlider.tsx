import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DeckCardItem, DeckType } from '../../data/portfolio';

interface ReplicaSliderProps {
  cards: DeckCardItem[];
  deckType: DeckType;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelectCard: (card: DeckCardItem) => void;
}

export const ReplicaSlider: React.FC<ReplicaSliderProps> = ({
  cards,
  deckType,
  activeIndex,
  onActiveIndexChange,
  onSelectCard,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 900);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const pointerStartRef = useRef<{ y: number; x: number; isDown: boolean }>({ y: 0, x: 0, isDown: false });
  const lastStepTimeRef = useRef(0);

  const total = cards.length;

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };

    // Listen for prefers-reduced-motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', handleResize);
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextCard = useCallback(() => {
    if (total === 0) return;
    onActiveIndexChange((activeIndex + 1) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  const prevCard = useCallback(() => {
    if (total === 0) return;
    onActiveIndexChange((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  // Mouse Wheel navigation (throttled at 170ms)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastStepTimeRef.current < 170) return;

      if (e.deltaY > 15) {
        lastStepTimeRef.current = now;
        nextCard();
      } else if (e.deltaY < -15) {
        lastStepTimeRef.current = now;
        prevCard();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [nextCard, prevCard, prefersReducedMotion]);

  // Keyboard navigation: ArrowDown/ArrowRight = next, ArrowUp/ArrowLeft = prev, Enter = open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      } else if (e.key === 'Enter') {
        const activeItem = cards[activeIndex];
        if (activeItem) {
          e.preventDefault();
          onSelectCard(activeItem);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard, activeIndex, cards, onSelectCard]);

  // Drag / Pointer Gesture support
  const handlePointerDown = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    setIsGrabbing(true);
    pointerStartRef.current = { y: e.clientY, x: e.clientX, isDown: true };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartRef.current.isDown || prefersReducedMotion) return;
    const dy = e.clientY - pointerStartRef.current.y;
    const dx = e.clientX - pointerStartRef.current.x;

    // Trigger step if dragged threshold reached
    if (Math.abs(dy) > 42 || (isMobile && Math.abs(dx) > 42)) {
      if (dy < -42 || (isMobile && dx < -42)) {
        nextCard();
      } else {
        prevCard();
      }
      pointerStartRef.current = { y: e.clientY, x: e.clientX, isDown: true };
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsGrabbing(false);
    pointerStartRef.current.isDown = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  /**
   * Reference Ground Truth 3D Transform Formula:
   * radius ~ windowHeight * 0.44
   * theta = offset * (2 * PI / total)
   * Y = radius * sin(theta)
   * Z = radius * cos(theta) - radius
   * rotX = -theta * (180 / PI)
   */
  const calculateCardTransform = (index: number) => {
    if (total === 0) return { translateY: 0, translateZ: 0, rotateX: 0, scale: 1, opacity: 0, zIndex: 0, isActive: false };

    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const isActive = offset === 0;
    const radius = windowHeight * 0.46;
    const angleStep = (2 * Math.PI) / Math.max(total, 5);
    const theta = offset * angleStep;

    const translateY = radius * Math.sin(theta);
    const translateZ = radius * (Math.cos(theta) - 1);
    const rotateX = -(theta * 180) / Math.PI;

    // Reference Scale: Active = 1.0, Inactive = 0.76
    const scale = isActive ? 1.0 : 0.76;
    const opacity = Math.abs(offset) > 2 ? 0 : Math.cos(theta * 0.7);
    const zIndex = 100 - Math.round(Math.abs(offset) * 10);

    return { translateY, translateZ, rotateX, scale, opacity, zIndex, isActive };
  };

  // Accessible Fallback for prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label="Accessible Deck Cards List"
        className="w-full max-w-2xl mx-auto px-6 py-24 overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-light-black mb-6 capitalize">{deckType} Deck</h2>
        <div className="flex flex-col gap-6">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              tabIndex={0}
              role="button"
              aria-label={`Open card: ${card.title}`}
              onClick={() => onSelectCard(card)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectCard(card)}
              className="p-6 rounded-3xl bg-white border border-border-light shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black cursor-pointer transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-grey font-medium">{card.category}</span>
                <span className="text-xs font-mono text-grey">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-light-black mb-2">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`${deckType} 3D Slider. Use arrow keys to rotate, Enter to open active card.`}
      tabIndex={0}
      className={`absolute right-[25.7rem] top-[50%] -translate-y-1/2 w-[33.5rem] h-full select-none max-phone:right-auto max-phone:left-1/2 max-phone:-translate-x-1/2 max-phone:w-[26.9rem] focus-visible:outline-none z-10 ${
        isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 3D Perspective Stage */}
      <ul
        className="w-full h-full flex flex-col items-center justify-center list-none p-0 m-0"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {cards.map((card, idx) => {
            const { translateY, translateZ, rotateX, scale, opacity, zIndex, isActive } = calculateCardTransform(idx);

            return (
              <motion.li
                key={`${deckType}-${card.id}`}
                tabIndex={isActive ? 0 : -1}
                role="button"
                aria-label={`${card.title} - ${card.category} (${isActive ? 'Active. Press Enter to view.' : 'Click to select.'})`}
                className="absolute top-[50%] -translate-y-1/2 left-0 w-[33.5rem] h-[34.4rem] max-phone:w-[26.9rem] max-phone:h-[26.9rem] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black cursor-pointer"
                style={{
                  borderRadius: 32,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  zIndex: zIndex,
                }}
                animate={{
                  y: translateY,
                  z: translateZ,
                  rotateX: rotateX,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  duration: 0.68,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (isActive) {
                    onSelectCard(card);
                  } else {
                    onActiveIndexChange(idx);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onSelectCard(card);
                  }
                }}
              >
                {/* Card Container: Plain pale slab (#EDEDED) by default */}
                <div
                  className="relative w-full h-full overflow-hidden shadow-sm"
                  style={{
                    backgroundColor: '#EDEDED',
                    borderRadius: 32,
                  }}
                >
                  {/* INACTIVE CARDS: Plain pale panels with NO visible content whatsoever (hide image and text) */}
                  {/* ACTIVE CARD: Full-bleed image or typographic cover with title at bottom-left */}
                  {isActive ? (
                    <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 32 }}>
                      {'imageUrl' in card && card.imageUrl ? (
                        /* Case A: Project with full-bleed image (object-cover) */
                        <>
                          <img
                            src={card.imageUrl}
                            alt={card.title}
                            className="w-full h-full object-cover select-none"
                            loading="eager"
                          />
                          {/* Subtle dark gradient overlay at bottom for title contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          <p
                            className="text-[1.5rem] max-phone:text-[1.3rem] font-semibold text-white absolute bottom-8 left-8 select-none pointer-events-none drop-shadow-md z-10"
                            style={{ mixBlendMode: 'exclusion' }}
                          >
                            {card.title}
                          </p>
                        </>
                      ) : deckType === 'projects' ? (
                        /* Case B: Project with no live URL -> Dark editorial cover with title */
                        <div
                          className="relative w-full h-full overflow-hidden flex flex-col justify-between p-8 text-white select-none"
                          style={{ backgroundColor: card.backgroundColor || '#1B1C20', borderRadius: 32 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[1.1rem] font-mono tracking-widest uppercase text-white/50">
                              {card.category}
                            </span>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          </div>
                          <div className="my-auto">
                            <h3 className="text-[2.6rem] max-phone:text-[2rem] font-bold text-white tracking-tight leading-snug">
                              {card.title}
                            </h3>
                          </div>
                          <p
                            className="text-[1.5rem] max-phone:text-[1.3rem] font-semibold text-white absolute bottom-8 left-8 select-none pointer-events-none drop-shadow-md z-10"
                            style={{ mixBlendMode: 'exclusion' }}
                          >
                            {card.title}
                          </p>
                        </div>
                      ) : deckType === 'skills' ? (
                        /* Case C: Skills Deck Cover -> One large title on solid color, never truncated */
                        <div
                          className="relative w-full h-full overflow-hidden flex flex-col justify-between p-8 text-white select-none"
                          style={{ backgroundColor: card.backgroundColor || '#20222B', borderRadius: 32 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[1.1rem] font-mono tracking-widest uppercase text-white/60">
                              {card.category}
                            </span>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                          </div>
                          <div className="my-auto">
                            <h3 className="text-[3rem] max-phone:text-[2.2rem] font-bold text-white tracking-tight leading-[1.15] break-words">
                              {card.title}
                            </h3>
                          </div>
                          <p
                            className="text-[1.5rem] max-phone:text-[1.3rem] font-semibold text-white absolute bottom-8 left-8 select-none pointer-events-none drop-shadow-md z-10"
                            style={{ mixBlendMode: 'exclusion' }}
                          >
                            {card.title}
                          </p>
                        </div>
                      ) : (
                        /* Case D: Certifications Deck Cover -> Issuer + Large title on solid color */
                        <div
                          className="relative w-full h-full overflow-hidden flex flex-col justify-between p-8 text-white select-none"
                          style={{ backgroundColor: card.backgroundColor || '#1E232A', borderRadius: 32 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[1.1rem] font-mono tracking-widest uppercase text-white/60">
                              {'issuer' in card ? (card as any).issuer : card.category}
                            </span>
                            <span className="text-[1.3rem] font-mono text-white/50">↗</span>
                          </div>
                          <div className="my-auto">
                            <h3 className="text-[2.6rem] max-phone:text-[2rem] font-bold text-white tracking-tight leading-[1.2] break-words">
                              {card.title}
                            </h3>
                          </div>
                          <p
                            className="text-[1.5rem] max-phone:text-[1.3rem] font-semibold text-white absolute bottom-8 left-8 select-none pointer-events-none drop-shadow-md z-10"
                            style={{ mixBlendMode: 'exclusion' }}
                          >
                            {card.title}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Inactive card: Clean blank pale slab, NO content */
                    <div className="w-full h-full bg-[#EDEDED]" style={{ borderRadius: 32 }} />
                  )}
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
};
