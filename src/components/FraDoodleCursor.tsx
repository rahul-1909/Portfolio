import React, { useEffect, useState } from 'react';

export const FraDoodleCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, textarea, [data-interactive="true"], .card-interactive');
        setIsHovered(Boolean(isInteractive));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth LERP animation for the follower ring
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follower Ring / Smiley */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${
            isClicking ? 0.8 : isHovered ? 1.4 : 1
          })`,
        }}
      >
        <div
          className={`relative rounded-full transition-all duration-200 border-2 border-black flex items-center justify-center ${
            isHovered
              ? 'w-11 h-11 bg-[#FFE600] shadow-[3px_3px_0px_#000]'
              : 'w-8 h-8 bg-white/70 backdrop-blur-sm'
          }`}
        >
          {isHovered ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="9" r="1.5" fill="black" />
              <circle cx="16" cy="9" r="1.5" fill="black" />
              <path d="M7 14C8.5 17 15.5 17 17 14" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <div className="w-2 h-2 rounded-full bg-black" />
          )}
        </div>
      </div>

      {/* Center Precise Dot */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-black" />
      </div>
    </div>
  );
};
