'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * ExperienceVisual: Kinetic Wave Flow on #9f9f9f Console (1:1 Square, 0 Text)
 * Rendered in monochromatic slate (#26272b) and white on a #9f9f9f console surface (~7.5s loop).
 */
export const ExperienceVisual: React.FC = () => {
  return (
    <div className="w-full h-full p-[2rem] flex items-center justify-center relative overflow-hidden select-none">
      {/* Soft ambient center glow */}
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-white/10 blur-[30px] pointer-events-none" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id="expSwapWave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#26272b" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#26272b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#26272b" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="expSwapWave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Concentric Growth Rings */}
        {[0, 2.5, 5.0].map((delay, idx) => (
          <motion.circle
            key={idx}
            cx="100"
            cy="100"
            r="18"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.2"
            fill="none"
            initial={{ r: 16, opacity: 0.7 }}
            animate={{
              r: [16, 78],
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

        {/* Primary Sine Wave Curve 1 */}
        <motion.path
          d="M 20 100 C 60 70, 80 130, 100 100 C 120 70, 140 130, 180 100"
          stroke="url(#expSwapWave1)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              'M 20 100 C 60 65, 80 135, 100 100 C 120 65, 140 135, 180 100',
              'M 20 100 C 60 135, 80 65, 100 100 C 120 135, 140 65, 180 100',
              'M 20 100 C 60 65, 80 135, 100 100 C 120 65, 140 135, 180 100',
            ],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary Harmonizing Counter-Wave Curve 2 */}
        <motion.path
          d="M 20 100 C 60 120, 80 80, 100 100 C 120 120, 140 80, 180 100"
          stroke="url(#expSwapWave2)"
          strokeWidth="1.8"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              'M 20 100 C 60 120, 80 80, 100 100 C 120 120, 140 80, 180 100',
              'M 20 100 C 60 80, 80 120, 100 100 C 120 80, 140 120, 180 100',
              'M 20 100 C 60 120, 80 80, 100 100 C 120 120, 140 80, 180 100',
            ],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gentle Horizon Baseline */}
        <line
          x1="20"
          y1="100"
          x2="180"
          y2="100"
          stroke="rgba(38, 39, 43, 0.2)"
          strokeWidth="1"
        />

        {/* Travelling Droplet Node 1 */}
        <motion.circle
          r="4.5"
          fill="#26272b"
          stroke="#ffffff"
          strokeWidth="1.5"
          animate={{
            cx: [20, 60, 100, 140, 180],
            cy: [100, 65, 100, 135, 100],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Counter Travelling Subtle Droplet Node 2 */}
        <motion.circle
          r="3.5"
          fill="#ffffff"
          stroke="#26272b"
          strokeWidth="1.2"
          animate={{
            cx: [180, 140, 100, 60, 20],
            cy: [100, 65, 100, 135, 100],
            opacity: [0, 0.9, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            delay: 3.75,
            ease: 'easeInOut',
          }}
        />

        {/* Central Anchor Node with Subtle Breathing Pulse */}
        <motion.circle
          cx="100"
          cy="100"
          r="6.5"
          fill="#ffffff"
          stroke="#26272b"
          strokeWidth="2"
          animate={{
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 3.75,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <circle cx="100" cy="100" r="2.5" fill="#26272b" />

        {/* Side Stationary Anchor Nodes */}
        <circle cx="40" cy="100" r="2.5" fill="#26272b" opacity={0.6} />
        <circle cx="160" cy="100" r="2.5" fill="#26272b" opacity={0.6} />
      </svg>
    </div>
  );
};
