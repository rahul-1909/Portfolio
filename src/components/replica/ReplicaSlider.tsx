import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { FormattedProject } from '../../data/portfolio';

interface ReplicaSliderProps {
  projects: FormattedProject[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelectProject: (project: FormattedProject) => void;
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const pointerStartRef = useRef<{ y: number; x: number; isDown: boolean }>({ y: 0, x: 0, isDown: false });
  const lastStepTimeRef = useRef(0);

  const total = projects.length;

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

  const nextProject = useCallback(() => {
    onActiveIndexChange((activeIndex + 1) % total);
  }, [activeIndex, total, onActiveIndexChange]);

  const prevProject = useCallback(() => {
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
        nextProject();
      } else if (e.deltaY < -15) {
        lastStepTimeRef.current = now;
        prevProject();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [nextProject, prevProject, prefersReducedMotion]);

  // Keyboard navigation: ArrowDown / ArrowRight = next, ArrowUp / ArrowLeft = prev, Enter = open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextProject();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevProject();
      } else if (e.key === 'Enter') {
        const activeProj = projects[activeIndex];
        if (activeProj) {
          e.preventDefault();
          onSelectProject(activeProj);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject, activeIndex, projects, onSelectProject]);

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

  // Render Accessible Reduced-Motion Fallback List (No 3D)
  if (prefersReducedMotion) {
    return (
      <div
        role="region"
        aria-label="Accessible Projects List"
        className="w-full max-w-2xl mx-auto px-6 py-24 overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-light-black mb-8">Selected Projects</h2>
        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              tabIndex={0}
              role="button"
              aria-label={`Open project: ${project.title}`}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectProject(project)}
              className="p-6 rounded-3xl bg-white border border-border-light shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black cursor-pointer transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-grey font-medium">{project.category}</span>
                <span className="text-xs font-mono text-grey">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-light-black mb-2">{project.title}</h3>
              <p className="text-sm text-grey line-clamp-2 mb-4">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-light-grey text-xs text-light-black">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Standard 3D Cylindrical Perspective Wheel
  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="3D Project Slider. Use arrow keys to rotate, Enter to open active project."
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
        {projects.map((project, idx) => {
          const { translateY, rotateX, scale, opacity, zIndex, isActive } = calculateCardTransform(idx);

          return (
            <motion.li
              key={project.id}
              tabIndex={isActive ? 0 : -1}
              role="button"
              aria-label={`${project.title} - ${project.category} (${isActive ? 'Active project. Press Enter to view.' : 'Click to rotate to this project.'})`}
              className="absolute top-[50%] -translate-y-1/2 left-0 w-[33.5rem] h-[34.4rem] max-phone:w-[26.9rem] max-phone:h-[26.9rem] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-black"
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
            >
              {/* Card Container */}
              <div
                className="relative w-full h-full overflow-hidden bg-[#EAEAEA] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                style={{ borderRadius: 32 }}
              >
                {/* Visual Representation: Live Screenshot vs Clean Typographic Card */}
                {project.hasLiveScreenshot && project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    style={{ borderRadius: 32 }}
                    loading="eager"
                  />
                ) : (
                  /* Clean Typographic Card: Title on #EAEAEA */
                  <div
                    className="h-full w-full bg-[#EAEAEA] p-8 flex flex-col justify-between"
                    style={{ borderRadius: 32 }}
                  >
                    {/* Top Row: Category Pill & Monospace Label */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/80 text-[1.1rem] font-medium tracking-wide text-light-black shadow-xs">
                        {project.category}
                      </span>
                      <span className="font-mono text-[1.1rem] text-[#808080]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Middle: Architectural Blueprint Summary */}
                    <div className="flex flex-col gap-2 my-auto">
                      <h4 className="text-[2.2rem] max-phone:text-[1.8rem] font-bold text-light-black tracking-tight leading-[1.15]">
                        {project.title}
                      </h4>
                      <p className="text-[1.2rem] max-phone:text-[1.1rem] text-grey line-clamp-3 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Bottom Metadata Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full bg-white/70 text-[1rem] text-[#555] font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Title Overlay for image cards (Bottom-Left with mix-blend-mode: exclusion) */}
                {project.hasLiveScreenshot && (
                  <p
                    className="text-h3 max-phone:text-h3-mobile font-bold text-white absolute bottom-[2.4rem] left-[2.4rem] select-none pointer-events-none drop-shadow-md"
                    style={{ mixBlendMode: 'exclusion' }}
                  >
                    {project.title}
                  </p>
                )}
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
