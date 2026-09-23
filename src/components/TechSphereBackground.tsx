import React from 'react';

export const TechSphereBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[#070312] dark:bg-[#070312]" />

      {/* Central Nebula Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] md:h-[800px] md:w-[800px] rounded-full bg-gradient-to-tr from-purple-700/35 via-fuchsia-600/25 to-blue-600/15 blur-[120px] opacity-70 animate-pulse duration-[8000ms]" />

      {/* 3D Cyber Wireframe Sphere in the Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] sm:h-[550px] sm:w-[550px] opacity-60">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#070312" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Central Glowing Fill */}
          <circle cx="200" cy="200" r="160" fill="url(#sphereGlow)" />

          {/* Outer Equator & Latitude Rings */}
          <circle cx="200" cy="200" r="160" fill="none" stroke="url(#ringGrad)" strokeWidth="1.2" strokeDasharray="4 4" className="animate-[spin_40s_linear_infinite]" />
          <ellipse cx="200" cy="200" rx="160" ry="120" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="160" ry="80" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="0.8" />
          <ellipse cx="200" cy="200" rx="160" ry="40" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="0.8" />
          <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(192, 132, 252, 0.5)" strokeWidth="1" />

          {/* Longitude Ellipses with 3D Rotation Feel */}
          <ellipse cx="200" cy="200" rx="120" ry="160" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="80" ry="160" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="0.8" />
          <ellipse cx="200" cy="200" rx="40" ry="160" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="0.8" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(192, 132, 252, 0.5)" strokeWidth="1" />

          {/* Diagonal Orbital Rings */}
          <ellipse cx="200" cy="200" rx="175" ry="60" fill="none" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.2" transform="rotate(-25 200 200)" />
          <ellipse cx="200" cy="200" rx="175" ry="60" fill="none" stroke="rgba(192, 132, 252, 0.3)" strokeWidth="1.2" transform="rotate(25 200 200)" />
        </svg>
      </div>

      {/* Perspective Horizon Lines radiating outward */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#070312_85%)]" />
      <div className="background-grid background-grid--fade-out absolute inset-0 opacity-20" />
    </div>
  );
};
