'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * SkillsVisual: Gyroscopic Resonance & Orbital Rings on #9f9f9f Console (1:1 Square, 0 Text)
 * Meditative orbital motion in slate (#26272b) and white on a #9f9f9f console surface (~7.5s loop).
 */
export const SkillsVisual: React.FC = () => {
  return (
    <div className="w-full h-full p-[2rem] flex items-center justify-center relative overflow-hidden select-none">
      {/* Soft ambient center glow */}
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-white/10 blur-[30px] pointer-events-none" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 200 200" fill="none">
        {/* Concentric Radiating Rings */}
        {[0, 2.5, 5.0].map((delay, idx) => (
          <motion.circle
            key={idx}
            cx="100"
            cy="100"
            r="16"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.2"
            fill="none"
            initial={{ r: 14, opacity: 0.7 }}
            animate={{
              r: [14, 76],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}

        {/* Gyroscopic Orbit 1 (Tilted 30deg, Clockwise) */}
        <motion.g
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        >
          <ellipse
            cx="100"
            cy="100"
            rx="62"
            ry="22"
            stroke="#26272b"
            strokeWidth="1.8"
            strokeDasharray="6 3"
            fill="none"
            transform="rotate(30 100 100)"
          />
          {/* Orbiting Particle 1 */}
          <circle cx="154" cy="131" r="4" fill="#26272b" stroke="#ffffff" strokeWidth="1.5" />
        </motion.g>

        {/* Gyroscopic Orbit 2 (Tilted -45deg, Counter-Clockwise) */}
        <motion.g
          animate={{ rotate: [360, 180, 0] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        >
          <ellipse
            cx="100"
            cy="100"
            rx="62"
            ry="22"
            stroke="#ffffff"
            strokeWidth="1.8"
            fill="none"
            transform="rotate(-45 100 100)"
          />
          {/* Orbiting Particle 2 */}
          <circle cx="56" cy="56" r="4" fill="#ffffff" stroke="#26272b" strokeWidth="1.5" />
        </motion.g>

        {/* Horizontal Ambient Ring */}
        <motion.g
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3.75, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '100px', originY: '100px' }}
        >
          <ellipse
            cx="100"
            cy="100"
            rx="66"
            ry="26"
            stroke="rgba(38, 39, 43, 0.2)"
            strokeWidth="1.2"
            strokeDasharray="2 4"
            fill="none"
            transform="rotate(90 100 100)"
          />
        </motion.g>

        {/* Central Calming Nucleus */}
        <motion.circle
          cx="100"
          cy="100"
          r="14"
          fill="#ffffff"
          stroke="#26272b"
          strokeWidth="2.2"
          animate={{
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Inner Peaceful Core */}
        <motion.circle
          cx="100"
          cy="100"
          r="5"
          fill="#26272b"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
};
