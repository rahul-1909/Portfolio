'use client';

import React, { useEffect, useState } from 'react';

export const GridOverlay: React.FC = () => {
  const [mode, setMode] = useState<'hidden' | 'normal' | 'highlighted'>('hidden');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'g') {
        setMode((prev) => (prev === 'hidden' ? 'normal' : prev === 'normal' ? 'highlighted' : 'hidden'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (mode === 'hidden') return null;

  const opacity = mode === 'highlighted' ? 0.35 : 0.15;

  return (
    <div id="grid" style={{ opacity }} aria-hidden="true">
      <div id="grid_wrapper">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
};
