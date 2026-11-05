import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, Code2, Layers, ChevronUp, ChevronDown } from 'lucide-react';
import type { Project } from '../data/projects';

interface Project3DWheelProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
}

export const Project3DWheel: React.FC<Project3DWheelProps> = ({ projects, onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const lastWheelTimeRef = useRef(0);

  const total = projects.length;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Mouse Wheel navigation with throttling for smooth step
  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 280) return;

      if (e.deltaY > 20) {
        lastWheelTimeRef.current = now;
        goToNext();
      } else if (e.deltaY < -20) {
        lastWheelTimeRef.current = now;
        goToPrev();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goToNext, goToPrev]);

  // Keyboard navigation (ArrowUp, ArrowDown)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        goToNext();
      } else if (e.key === 'ArrowUp') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goToNext, goToPrev]);

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    startYRef.current = clientY;
    setDragY(0);
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;
    const delta = clientY - startYRef.current;
    setDragY(delta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragY < -60) {
      goToNext();
    } else if (dragY > 60) {
      goToPrev();
    }
    setDragY(0);
  };

  const getProjectRoute = (id: string) => {
    switch (id) {
      case 'gold-lending-platform':
        return '/work/gold-lending-platform';
      case 'multi-agent-autonomous-rag':
        return '/work/rag-engine';
      case 'nl-to-sql-converter':
        return '/work/nl-sql-copilot';
      case 'linkedin-intelligence-api':
        return '/work/profile-intelligence';
      case 'production-ai-customer-support-agent':
        return '/work/ai-support-agent';
      default:
        return `/work/${id}`;
    }
  };

  return (
    <div
      ref={wheelRef}
      className="relative w-full max-w-[540px] h-[460px] sm:h-[560px] flex items-center justify-center select-none"
      style={{ touchAction: 'none' }}
      onMouseDown={(e) => handleDragStart(e.clientY)}
      onMouseMove={(e) => handleDragMove(e.clientY)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
      onTouchEnd={handleDragEnd}
      role="region"
      aria-label="3D Interactive Project Slider"
    >
      {/* Perspective Container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {projects.map((project, idx) => {
          // Circular offset calculation relative to activeIndex
          let offset = idx - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          // Add continuous drag influence
          const dragInfluence = isDragging ? dragY / 300 : 0;
          const effectiveOffset = offset + dragInfluence;

          // 3D cylindrical transform values (mirroring Gabriel Beaugonin's exact perspective)
          const translateY = effectiveOffset * 155;
          const rotateX = effectiveOffset * -24;
          const scale = Math.max(0.72, 1 - Math.abs(effectiveOffset) * 0.12);
          const opacity = Math.max(0.15, 1 - Math.abs(effectiveOffset) * 0.35);
          const zIndex = Math.round(20 - Math.abs(effectiveOffset) * 5);
          const isCurrent = Math.abs(effectiveOffset) < 0.45;

          return (
            <div
              key={project.id}
              className={`absolute w-[92%] sm:w-[500px] rounded-[28px] p-6 sm:p-7 transition-all duration-300 ease-out border ${
                isCurrent
                  ? 'bg-white dark:bg-[#12131C] border-border-strongLight dark:border-border-strongDark shadow-2xl cursor-default'
                  : 'bg-surface-elevatedLight/95 dark:bg-[#141622]/95 border-border-light dark:border-border-dark cursor-pointer'
              }`}
              style={{
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${rotateX}deg)`,
                opacity: opacity,
                zIndex: zIndex,
                transformOrigin: 'center center',
                pointerEvents: isCurrent ? 'auto' : 'auto',
                boxShadow: isCurrent ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
              }}
              onClick={() => {
                if (!isCurrent) {
                  setActiveIndex(idx);
                }
              }}
            >
              {/* Card Top: Method & Route */}
              <div className="flex items-center justify-between font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-3 pb-2.5 border-b border-border-light dark:border-border-dark">
                <div className="flex items-center gap-2">
                  <span className="text-accent-light dark:text-accent-dark font-bold">GET</span>
                  <span className="truncate max-w-[240px] sm:max-w-[300px]">
                    {getProjectRoute(project.id)}
                  </span>
                </div>
                <span className="text-accent-light dark:text-accent-dark font-semibold text-[11px] px-2 py-0.5 rounded bg-accent-mutedLight dark:bg-accent-mutedDark">
                  200 OK
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-text-light dark:text-text-dark tracking-tight mb-2.5 leading-snug">
                {project.title}
              </h3>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-text-secondaryLight dark:text-text-secondaryDark line-clamp-3 leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="font-mono text-[11px] px-2 py-1 text-text-mutedLight dark:text-text-mutedDark">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              {/* Card Bottom Links */}
              <div className="flex items-center justify-between pt-3 border-t border-border-light dark:border-border-dark font-mono text-xs">
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-accent-light dark:text-accent-dark hover:underline"
                    >
                      <span>Live</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-text-light dark:hover:text-text-dark transition-colors"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>

                {onSelectProject && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Specs</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Side Step Controls */}
      <div className="absolute right-0 sm:-right-8 flex flex-col gap-2 z-30">
        <button
          onClick={goToPrev}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark shadow-sm transition-transform active:scale-95"
          aria-label="Previous Project"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        {/* Stepper Dots */}
        <div className="flex flex-col items-center gap-1.5 py-1">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 rounded-full transition-all ${
                i === activeIndex
                  ? 'h-4 bg-accent-light dark:bg-accent-dark'
                  : 'h-1.5 bg-border-strongLight dark:bg-border-strongDark hover:bg-text-mutedLight'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark shadow-sm transition-transform active:scale-95"
          aria-label="Next Project"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
