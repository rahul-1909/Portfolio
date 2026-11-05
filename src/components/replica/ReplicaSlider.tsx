import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ReplicaProject } from '../../data/replicaData';

interface ReplicaSliderProps {
  projects: ReplicaProject[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelectProject: (project: ReplicaProject) => void;
}

export const ReplicaSlider: React.FC<ReplicaSliderProps> = ({
  projects,
  activeIndex,
  onActiveIndexChange,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 900);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const pointerStartRef = useRef<{ y: number; x: number; isDown: boolean }>({ y: 0, x: 0, isDown: false });
  const lastStepTimeRef = useRef(0);

  const total = projects.length;

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextProject = useCallback(() => {
    onActiveIndexChange((activeIndex + 1) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  const prevProject = useCallback(() => {
    onActiveIndexChange((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  // Mouse Wheel navigation (throttled at 170ms exactly as in reference)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastStepTimeRef.current < 170) return;

      if (e.deltaY > 15) {
        lastStepTimeRef.current = now;
        nextProject();
      } else if (e.deltaY < -15) {
        lastStepTimeRef.current = now;
        prevProject();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [nextProject, prevProject]);

  // Keyboard navigation (ArrowUp, ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        nextProject();
      } else if (e.key === 'ArrowUp') {
        prevProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

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
          nextProject();
        } else {
          prevProject();
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

  // Cylindrical transformation calculation (exact reference parameters)
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
    const scale = isActive ? 1.0 : isMobile ? 0.76 : 0.8;
    const opacity = isActive ? 1.0 : isMobile ? 0.35 : 0.37;
    const zIndex = isActive ? 20 : 10 - Math.abs(distance);

    return {
      translateY,
      rotateX,
      scale,
      opacity,
      zIndex,
      isActive,
    };
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Project Slider"
      className={`absolute right-[25.7rem] top-[50%] -translate-y-1/2 w-[33.5rem] h-full select-none max-phone:right-auto max-phone:left-1/2 max-phone:-translate-x-1/2 max-phone:w-[26.9rem] ${
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
        className="w-full h-full flex flex-col items-center justify-center"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {projects.map((project, idx) => {
          const { translateY, rotateX, scale, opacity, zIndex, isActive } = calculateCardTransform(idx);

          return (
            <motion.li
              key={project.id}
              className="absolute top-[50%] -translate-y-1/2 left-0 w-[33.5rem] h-[34.4rem] max-phone:w-[26.9rem] max-phone:h-[26.9rem] will-change-transform"
              style={{
                borderRadius: 32,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                zIndex: zIndex,
              }}
              animate={{
                y: translateY,
                rotateX: rotateX,
                scale: scale,
                opacity: opacity,
              }}
              transition={{
                duration: 0.72,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                if (isActive) {
                  onSelectProject(project);
                } else {
                  onActiveIndexChange(idx);
                }
              }}
            >
              {/* Card Container */}
              <div
                className="relative w-full h-full overflow-hidden bg-[#EAEAEA] shadow-sm hover:shadow-md transition-shadow"
                style={{ borderRadius: 32 }}
              >
                {/* Media Element (Video or Image with Poster Fallback) */}
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    poster={project.id === 'lightship' ? '/images/lightship-poster.jpg' : undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                    style={{ borderRadius: 32 }}
                  />
                ) : project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    style={{ borderRadius: 32 }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#EAEAEA] to-[#D4D4D4]" style={{ borderRadius: 32 }} />
                )}

                {/* Card Title (Bottom-Left with mix-blend-mode: exclusion) */}
                <p
                  className="text-h3 max-phone:text-h3-mobile font-bold text-white absolute bottom-[2.4rem] left-[2.4rem] select-none"
                  style={{ mixBlendMode: 'exclusion' }}
                >
                  {project.title}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Top & Bottom Vignette Gradient Masks */}
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-b from-light-grey to-transparent z-50" />
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-light-grey to-transparent z-50" />
    </div>
  );
};
