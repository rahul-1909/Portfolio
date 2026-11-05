import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { homeContainers, type HomeContainerItem } from '../../data/homeContainers';
import { ReplicaHomeCover } from './ReplicaHomeCover';

interface ReplicaSliderProps {
  containers?: HomeContainerItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onOpenContainer: (container: HomeContainerItem) => void;
}

export const ReplicaSlider: React.FC<ReplicaSliderProps> = ({
  containers = homeContainers,
  activeIndex,
  onActiveIndexChange,
  onOpenContainer,
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

  const total = containers.length;

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
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

  const nextContainer = useCallback(() => {
    if (total === 0) return;
    onActiveIndexChange((activeIndex + 1) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  const prevContainer = useCallback(() => {
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
        nextContainer();
      } else if (e.deltaY < -15) {
        lastStepTimeRef.current = now;
        prevContainer();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [nextContainer, prevContainer, prefersReducedMotion]);

  // Keyboard navigation: ArrowDown/ArrowRight = next, ArrowUp/ArrowLeft = prev, Enter = open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextContainer();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevContainer();
      } else if (e.key === 'Enter') {
        const activeItem = containers[activeIndex];
        if (activeItem) {
          e.preventDefault();
          onOpenContainer(activeItem);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextContainer, prevContainer, activeIndex, containers, onOpenContainer]);

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

    if (Math.abs(dy) > 42 || (isMobile && Math.abs(dx) > 42)) {
      if (dy < -42 || (isMobile && dx < -42)) {
        nextContainer();
      } else {
        prevContainer();
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
   * Reference Spec 3D Wheel Formula for 4 items:
   * - Offset 0: Active, opacity: 1, scale: 1.0, rotateX: 0, translateY: 0
   * - Offset -1: Top neighbor, opacity: 0.37, scale: 0.8, rotateX: 98deg, translateY: -228px
   * - Offset +1: Bottom neighbor, opacity: 0.37, scale: 0.8, rotateX: -98deg, translateY: +228px
   * - Offset +2: Opposite, opacity: 0.12, scale: 0.65, rotateX: -135deg, translateY: +380px
   */
  const calculateTransform = (index: number) => {
    let offset = (index - activeIndex) % 4;
    if (offset < -1) offset += 4;
    if (offset > 2) offset -= 4;

    const isActive = offset === 0;
    const stepY = isMobile ? 180 : Math.min(235, windowHeight * 0.26);

    let translateY = 0;
    let translateZ = 0;
    let rotateX = 0;
    let scale = 1.0;
    let opacity = 1.0;
    let zIndex = 100;

    if (offset === 0) {
      translateY = 0;
      translateZ = 0;
      rotateX = 0;
      scale = 1.0;
      opacity = 1.0;
      zIndex = 100;
    } else if (offset === -1) {
      translateY = -stepY;
      translateZ = -120;
      rotateX = 98;
      scale = 0.8;
      opacity = 0.37;
      zIndex = 50;
    } else if (offset === 1) {
      translateY = stepY;
      translateZ = -120;
      rotateX = -98;
      scale = 0.8;
      opacity = 0.37;
      zIndex = 50;
    } else {
      // offset === 2 (opposite)
      translateY = stepY * 1.65;
      translateZ = -220;
      rotateX = -135;
      scale = 0.65;
      opacity = 0.12;
      zIndex = 20;
    }

    return { translateY, translateZ, rotateX, scale, opacity, zIndex, isActive };
  };

  // Accessible Fallback for prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label="Accessible Portfolio Containers List"
        className="w-full max-w-2xl mx-auto px-6 py-24 overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-light-black mb-6">Portfolio Sections</h2>
        <div className="flex flex-col gap-6">
          {containers.map((container, idx) => (
            <div
              key={container.id}
              tabIndex={0}
              role="button"
              aria-label={`Open section: ${container.title}`}
              onClick={() => onOpenContainer(container)}
              onKeyDown={(e) => e.key === 'Enter' && onOpenContainer(container)}
              className="p-6 rounded-3xl bg-white border border-border-light shadow-sm hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-grey font-medium">{container.subtitle}</span>
                <span className="text-xs font-mono text-grey">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-light-black">{container.title}</h3>
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
      aria-label="3D Interactive Portfolio Slider. Use arrow keys to rotate, Enter to open active section."
      tabIndex={0}
      className={`absolute right-[25.7rem] top-[50%] -translate-y-1/2 w-[33.5rem] h-full select-none max-phone:right-auto max-phone:left-1/2 max-phone:-translate-x-1/2 max-phone:w-[26.9rem] focus-visible:outline-none z-10 ${
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
        className="w-full h-full flex flex-col items-center justify-center list-none p-0 m-0"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {containers.map((container, idx) => {
          const { translateY, translateZ, rotateX, scale, opacity, zIndex, isActive } = calculateTransform(idx);

          return (
            <motion.li
              key={container.id}
              tabIndex={isActive ? 0 : -1}
              role="button"
              aria-label={`${container.title} (${isActive ? 'Active. Press Enter to view.' : 'Click to select.'})`}
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
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                if (isActive) {
                  onOpenContainer(container);
                } else {
                  onActiveIndexChange(idx);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onOpenContainer(container);
                }
              }}
            >
              {/* Every container is rendered, showing its real cover art */}
              <div
                className="relative w-full h-full overflow-hidden shadow-sm"
                style={{
                  borderRadius: 32,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <ReplicaHomeCover id={container.id} />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
