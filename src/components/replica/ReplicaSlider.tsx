import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface SliderItem {
  id: string;
  title: string;
  subtitle?: string;
  [key: string]: any;
}

interface ReplicaSliderProps<T extends SliderItem> {
  items: T[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelectItem?: (item: T) => void;
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  ariaLabel?: string;
}

export function ReplicaSlider<T extends SliderItem>({
  items,
  activeIndex,
  onActiveIndexChange,
  onSelectItem,
  renderItem,
  ariaLabel = "3D Interactive Slider",
}: ReplicaSliderProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const pointerStartRef = useRef<{ y: number; x: number; isDown: boolean }>({ y: 0, x: 0, isDown: false });
  const lastStepTimeRef = useRef(0);

  const total = items.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

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

  const nextItem = useCallback(() => {
    if (total === 0) return;
    onActiveIndexChange((activeIndex + 1) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  const prevItem = useCallback(() => {
    if (total === 0) return;
    onActiveIndexChange((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  // Mouse Wheel navigation (throttled at 180ms)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastStepTimeRef.current < 180) return;

      if (e.deltaY > 15) {
        lastStepTimeRef.current = now;
        nextItem();
      } else if (e.deltaY < -15) {
        lastStepTimeRef.current = now;
        prevItem();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [nextItem, prevItem, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextItem();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevItem();
      } else if (e.key === 'Enter') {
        const activeItem = items[activeIndex];
        if (activeItem && onSelectItem) {
          e.preventDefault();
          onSelectItem(activeItem);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextItem, prevItem, activeIndex, items, onSelectItem]);

  // Drag / Pointer gestures
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

    if (Math.abs(dy) > 36 || (isMobile && Math.abs(dx) > 36)) {
      if (dy < -36 || (isMobile && dx < -36)) {
        nextItem();
      } else {
        prevItem();
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
   * Reference Spec 3D Wheel:
   * cardHeight: 550px (desktop), 269px (mobile).
   * step1: cardHeight * 0.4 (220px desktop, 107px mobile)
   * step2: step1 + 35px (255px desktop, 142px mobile)
   * rotateX: +-98deg
   * scale: 0.8 on step 1, 0.74 on step 2
   */
  const cardHeight = isMobile ? 269 : 550;
  const step1 = cardHeight * 0.4;
  const step2 = step1 + 35;

  const calculateTransform = (index: number) => {
    let offset = ((index - activeIndex) % total + total) % total;
    if (offset > total / 2) offset -= total;

    const isActive = offset === 0;

    let translateY = 0;
    let translateZ = 0;
    let rotateX = 0;
    let scale = 1.0;
    let opacity = 1.0;
    let zIndex = 100;
    let isSliver = false;

    if (offset === 0) {
      translateY = 0;
      translateZ = 0;
      rotateX = 0;
      scale = 1.0;
      opacity = 1.0;
      zIndex = 100;
      isSliver = false;
    } else if (offset === -1) {
      translateY = -step1;
      translateZ = -90;
      rotateX = 98;
      scale = 0.8;
      opacity = 0.88;
      zIndex = 40;
      isSliver = true;
    } else if (offset === -2) {
      translateY = -step2;
      translateZ = -160;
      rotateX = 98;
      scale = 0.74;
      opacity = 0.5;
      zIndex = 30;
      isSliver = true;
    } else if (offset === 1) {
      translateY = step1;
      translateZ = -90;
      rotateX = -98;
      scale = 0.8;
      opacity = 0.88;
      zIndex = 40;
      isSliver = true;
    } else if (offset === 2) {
      translateY = step2;
      translateZ = -160;
      rotateX = -98;
      scale = 0.74;
      opacity = 0.5;
      zIndex = 30;
      isSliver = true;
    } else {
      translateY = offset > 0 ? step2 + 40 : -(step2 + 40);
      translateZ = -220;
      rotateX = offset > 0 ? -98 : 98;
      scale = 0.65;
      opacity = 0;
      zIndex = 10;
      isSliver = true;
    }

    return { translateY, translateZ, rotateX, scale, opacity, zIndex, isActive, isSliver };
  };

  // Accessible Fallback for prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label={`${ariaLabel} Accessible List`}
        className="w-full max-w-2xl mx-auto px-6 py-24 overflow-y-auto"
      >
        <div className="flex flex-col gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              tabIndex={0}
              role="button"
              aria-label={`Open: ${item.title}`}
              onClick={() => onSelectItem?.(item)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.(item)}
              className="p-6 rounded-3xl bg-white border border-border-light shadow-sm hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-grey font-medium">{item.subtitle}</span>
                <span className="text-xs font-mono text-grey">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-light-black">{item.title}</h3>
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
      aria-label={`${ariaLabel}. Arrow keys to rotate, Enter to open.`}
      tabIndex={0}
      data-wheel-container="true"
      className={`fixed top-1/2 -translate-y-1/2 right-[25.7rem] w-[536px] h-[550px] select-none max-phone:right-auto max-phone:left-1/2 max-phone:-translate-x-1/2 max-phone:w-[269px] max-phone:h-[269px] focus-visible:outline-none z-10 ${
        isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        touchAction: 'none',
        maskImage: 'linear-gradient(to bottom, transparent 0px, black 128px, black calc(100% - 128px), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 128px, black calc(100% - 128px), transparent 100%)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 3D Perspective Stage */}
      <ul
        className="relative w-full h-full list-none p-0 m-0"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, idx) => {
          const { translateY, translateZ, rotateX, scale, opacity, zIndex, isActive, isSliver } =
            calculateTransform(idx);

          return (
            <motion.li
              key={item.id}
              tabIndex={isActive ? 0 : -1}
              role="button"
              aria-label={`${item.title} (${isActive ? 'Active. Press Enter to view.' : 'Click to select.'})`}
              data-active-card={isActive ? "true" : undefined}
              className="absolute top-0 left-0 w-full h-full will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black cursor-pointer"
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
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                if (isActive) {
                  onSelectItem?.(item);
                } else {
                  onActiveIndexChange(idx);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSelectItem?.(item);
                }
              }}
            >
              {isSliver ? (
                /* Flat, pale panel (#EDEDED) with NO readable content */
                <div
                  className="w-full h-full bg-[#EDEDED] shadow-sm pointer-events-none"
                  style={{ borderRadius: 32 }}
                />
              ) : (
                /* Active Container with real cover art */
                <div
                  className="relative w-full h-full overflow-hidden shadow-sm"
                  style={{
                    borderRadius: 32,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderItem(item, isActive)}
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
