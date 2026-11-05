import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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

  // Pointer Drag Handlers (threshold 45px)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerStartRef.current = { y: e.clientY, x: e.clientX, isDown: true };
    setIsGrabbing(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartRef.current.isDown) return;
    const deltaY = e.clientY - pointerStartRef.current.y;
    const deltaX = e.clientX - pointerStartRef.current.x;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) >= 45) {
      const now = performance.now();
      if (now - lastStepTimeRef.current >= 170) {
        lastStepTimeRef.current = now;
        if (deltaY < 0) {
          nextCard();
        } else {
          prevCard();
        }
        pointerStartRef.current.y = e.clientY;
        pointerStartRef.current.x = e.clientX;
      }
    }
  };

  const handlePointerUp = () => {
    pointerStartRef.current.isDown = false;
    setIsGrabbing(false);
  };

  // Cylindrical transformation calculation (exact reference parameters with active translateZ)
  const calculateCardTransform = (idx: number) => {
    let distance = idx - activeIndex;
    if (distance < -Math.floor(total / 2)) distance += total;
    if (distance > Math.floor(total / 2)) distance -= total;

    const isActive = distance === 0;
    const g = isMobile ? 0.37 : 0.4;
    const stepK = isMobile ? 43 : 35;
    const maxRotate = isMobile ? 93 : 98;

    let translateY = 0;
    if (distance > 0) {
      translateY = 1 * (windowHeight * g) + (distance > 1 ? (distance - 1) * stepK : 0);
    } else if (distance < 0) {
      translateY = -1 * (windowHeight * g) + (distance < -1 ? (distance + 1) * stepK : 0);
    }

    const rotateX = isActive ? 0 : distance > 0 ? -maxRotate : maxRotate;
    // translateZ gives active card physical 3D elevation above rotated neighbors to prevent see-through clipping
    const translateZ = isActive ? (isMobile ? 35 : 65) : -Math.abs(distance) * 20;
    const scale = isActive ? 1.0 : isMobile ? 0.78 : 0.82;
    // Sharp images at lower opacity, never blurred
    const opacity = isActive ? 1.0 : isMobile ? 0.32 : 0.35;
    const zIndex = isActive ? 50 : 20 - Math.abs(distance);

    return {
      translateY,
      translateZ,
      rotateX,
      scale,
      opacity,
      zIndex,
      isActive,
    };
  };

  // Render Accessible Reduced-Motion Fallback List (No 3D)
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
              <div className="flex flex-wrap gap-2 pt-2">
                {card.threeTags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-light-grey text-xs text-light-black font-medium">
                    {tag}
                  </span>
                ))}
              </div>
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
                {/* Card Container: Soft muted background color per card, 100% opaque */}
                <div
                  className="relative w-full h-full overflow-hidden p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    backgroundColor: card.backgroundColor || '#EAEAEA',
                    borderRadius: 32,
                  }}
                >
                  {/* Top Portion: Clean Rounded Frame with Uncropped Content */}
                  <div className="w-full h-[68%] rounded-[20px] bg-white shadow-xs border border-black/5 overflow-hidden flex flex-col relative">
                    {/* Window Frame Bar */}
                    <div className="h-6 px-3 bg-[#F9F9F9] border-b border-black/5 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
                        <span className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
                        <span className="w-2 h-2 rounded-full bg-[#E0E0E0]" />
                      </div>
                      <span className="text-[0.9rem] font-mono text-[#A0A0A0] uppercase tracking-wider">
                        {card.category}
                      </span>
                    </div>

                    {/* Frame Inner Body */}
                    <div className="flex-1 w-full h-full overflow-hidden flex items-center justify-center p-2.5 bg-white">
                      {/* Case A: Project with live 2x uncropped screenshot */}
                      {'hasLiveScreenshot' in card && card.hasLiveScreenshot && card.imageUrl ? (
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          className="w-full h-full object-contain object-top rounded-lg"
                          loading="eager"
                        />
                      ) : 'mandate' in card ? (
                        /* Case B: Skills Deck Card */
                        <div className="w-full h-full p-2 flex flex-col justify-between">
                          <p className="text-[1.2rem] max-phone:text-[1.1rem] text-grey leading-relaxed line-clamp-3">
                            {card.mandate}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {card.skills.slice(0, 7).map((skill, sI) => (
                              <span
                                key={sI}
                                className="px-2 py-0.5 rounded-full bg-light-grey text-[1rem] text-light-black font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : 'issuer' in card ? (
                        /* Case C: Certifications Deck Card */
                        <div className="w-full h-full p-3 flex flex-col justify-between">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[1rem] uppercase tracking-wider font-bold text-light-black">
                              {card.issuer}
                            </span>
                            <h4 className="text-[1.5rem] max-phone:text-[1.3rem] font-bold text-light-black leading-snug">
                              {card.title}
                            </h4>
                          </div>
                          <div className="inline-flex items-center gap-1 text-[1.1rem] font-semibold text-light-black pt-1">
                            <span>Verify Credential</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-grey" />
                          </div>
                        </div>
                      ) : (
                        /* Case D: Project without live screen - Designed card with outcome */
                        <div className="w-full h-full p-3 flex flex-col justify-between">
                          <div className="flex flex-col gap-2">
                            <span className="text-[1rem] uppercase tracking-widest text-grey font-mono">
                              System Architecture
                            </span>
                            <p className="text-[1.25rem] max-phone:text-[1.15rem] font-medium text-light-black leading-relaxed">
                              {'oneLineOutcome' in card ? card.oneLineOutcome : 'summary' in card ? (card as any).summary : ''}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-[1rem] font-mono text-[#00A86B]">
                            <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                            <span>Production Engine</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Portion: Card Title & 3 Tech Tags at the Bottom */}
                  <div className="h-[28%] flex flex-col justify-end gap-1.5 px-2 select-none">
                    <h3 className="text-[1.8rem] max-phone:text-[1.5rem] font-bold text-light-black leading-tight tracking-tight truncate">
                      {card.title}
                    </h3>
                    <p className="text-[1.15rem] max-phone:text-[1.05rem] text-[#666] font-normal truncate">
                      {card.threeTags.join('  ·  ')}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Top & Bottom Vignette Gradient Masks */}
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-b from-light-grey to-transparent z-40" />
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-light-grey to-transparent z-40" />
    </div>
  );
};
