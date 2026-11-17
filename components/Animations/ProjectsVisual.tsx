'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProjectsVisual: Isometric Geometry on #9f9f9f Console (1:1 Square, 0 Text)
 * Slow, soothing 3D geometric rotation in monochromatic slate (#26272b) and white (~8s loop).
 */
export const ProjectsVisual: React.FC = () => {
  return (
    <div className="w-full h-full p-[2rem] flex items-center justify-center relative overflow-hidden select-none">
      {/* Soft ambient center glow */}
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-white/10 blur-[30px] pointer-events-none" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 200 200" fill="none">
        {/* Subtle Outer Compass Reticle */}
        <motion.circle
          cx="100"
          cy="100"
          r="76"
          stroke="rgba(38, 39, 43, 0.25)"
          strokeWidth="1.2"
          strokeDasharray="3 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        />

        {/* Slow Rotating Isometric Prism Structure */}
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
          {/* Top Diamond Facet */}
          <motion.polygon
            points="100,50 142,75 100,100 58,75"
            fill="rgba(255, 255, 255, 0.25)"
            stroke="#26272b"
            strokeWidth="1.8"
            animate={{
              fillOpacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Left Vertical Facet */}
          <motion.polygon
            points="58,75 100,100 100,150 58,125"
            fill="rgba(38, 39, 43, 0.15)"
            stroke="#26272b"
            strokeWidth="1.8"
            animate={{
              fillOpacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1.3,
              ease: 'easeInOut',
            }}
          />

          {/* Right Vertical Facet */}
          <motion.polygon
            points="100,100 142,75 142,125 100,150"
            fill="rgba(255, 255, 255, 0.35)"
            stroke="#26272b"
            strokeWidth="1.8"
            animate={{
              fillOpacity: [0.35, 0.15, 0.35],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 2.6,
              ease: 'easeInOut',
            }}
          />

          {/* Inner Suspended Wireframe Diamond */}
          <motion.polygon
            points="100,75 121,87.5 100,100 79,87.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            animate={{
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ originX: '100px', originY: '87.5px' }}
          />

          {/* Vertex Anchor Nodes */}
          {[
            { cx: 100, cy: 50 },
            { cx: 142, cy: 75 },
            { cx: 142, cy: 125 },
            { cx: 100, cy: 150 },
            { cx: 58, cy: 125 },
            { cx: 58, cy: 75 },
            { cx: 100, cy: 100 },
          ].map((pt, i) => (
            <motion.circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r="3.5"
              fill="#ffffff"
              stroke="#26272b"
              strokeWidth="1.8"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.g>

        {/* Counter-rotating Subtle Accent Markers */}
        <motion.g
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        >
          <circle cx="100" cy="24" r="3" fill="#ffffff" stroke="#26272b" strokeWidth="1" />
          <circle cx="100" cy="176" r="3" fill="#ffffff" stroke="#26272b" strokeWidth="1" />
          <circle cx="24" cy="100" r="3" fill="#26272b" stroke="#ffffff" strokeWidth="1" />
          <circle cx="176" cy="100" r="3" fill="#26272b" stroke="#ffffff" strokeWidth="1" />
        </motion.g>
      </svg>
    </div>
  );
};
