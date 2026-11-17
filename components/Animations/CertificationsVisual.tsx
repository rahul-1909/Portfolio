'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * CertificationsVisual: Geometric Star Emblem on #9f9f9f Console (1:1 Square, 0 Text)
 * Symmetrical precision seal in slate (#26272b) and white on a #9f9f9f console surface (~8s loop).
 */
export const CertificationsVisual: React.FC = () => {
  return (
    <div className="w-full h-full p-[2rem] flex items-center justify-center relative overflow-hidden select-none">
      {/* Soft ambient center glow */}
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-white/10 blur-[30px] pointer-events-none" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 200 200" fill="none">
        {/* Outer Precision Gauge Reticle with Tick Dots */}
        <motion.circle
          cx="100"
          cy="100"
          r="78"
          stroke="rgba(38, 39, 43, 0.25)"
          strokeWidth="1.2"
          strokeDasharray="2 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        />

        {/* Counter-rotating Outer Star Points */}
        <motion.g
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 72;
            const y = 100 + Math.sin(rad) * 72;
            return <circle key={i} cx={x} cy={y} r="2.5" fill="#26272b" opacity={0.7} />;
          })}
        </motion.g>

        {/* Calming Concentric Radiant Ripples */}
        {[0, 2.6, 5.2].map((delay, idx) => (
          <motion.circle
            key={idx}
            cx="100"
            cy="100"
            r="22"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
            fill="none"
            initial={{ r: 22, opacity: 0.7 }}
            animate={{
              r: [22, 74],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}

        {/* Primary 8-Pointed Geometric Faceted Star Seal */}
        <motion.g
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.04, 1, 1.04, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ originX: '100px', originY: '100px' }}
        >
          {/* Outer Octagram Facet 1 (Square 1) */}
          <rect
            x="62"
            y="62"
            width="76"
            height="76"
            rx="10"
            fill="rgba(255, 255, 255, 0.15)"
            stroke="#26272b"
            strokeWidth="1.8"
          />

          {/* Outer Octagram Facet 2 (Square 2 - 45deg offset) */}
          <rect
            x="62"
            y="62"
            width="76"
            height="76"
            rx="10"
            fill="rgba(38, 39, 43, 0.1)"
            stroke="#26272b"
            strokeWidth="1.8"
            transform="rotate(45 100 100)"
          />

          {/* Inner Hexagonal Shield */}
          <polygon
            points="100,70 126,85 126,115 100,130 74,115 74,85"
            fill="#ffffff"
            stroke="#26272b"
            strokeWidth="1.8"
          />

          {/* Center Precision Crest */}
          <motion.circle
            cx="100"
            cy="100"
            r="14"
            fill="#26272b"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <circle cx="100" cy="100" r="8" fill="#ffffff" />
          <circle cx="100" cy="100" r="3.5" fill="#26272b" />
        </motion.g>

        {/* Subtle Corner Reticle Accents */}
        {[
          { x: 30, y: 30 },
          { x: 170, y: 30 },
          { x: 170, y: 170 },
          { x: 30, y: 170 },
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="2.5" fill="#26272b" opacity={0.6} />
            <line x1={pt.x - 4} y1={pt.y} x2={pt.x + 4} y2={pt.y} stroke="rgba(38,39,43,0.2)" strokeWidth="0.8" />
            <line x1={pt.x} y1={pt.y - 4} x2={pt.x} y2={pt.y + 4} stroke="rgba(38,39,43,0.2)" strokeWidth="0.8" />
          </g>
        ))}
      </svg>
    </div>
  );
};
