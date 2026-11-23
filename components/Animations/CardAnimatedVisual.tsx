'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardAnimatedVisualProps {
  projectId: string;
}

interface SectionVisualConfig {
  text: string;
  containerClass: string;
  fontSize: string;
  tracking: string;
  textColor: string;
  fontFamily: string;
  textShadow: string;
}

// Crisp scalable 4-pointed sparkle star with organic concave curvature
const FourPointedStar = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M12 0C12 7.2 7.2 12 0 12C7.2 12 12 16.8 12 24C12 16.8 16.8 12 24 12C16.8 12 12 7.2 12 0Z" />
  </svg>
);

const SECTION_CONFIGS: Record<string, SectionVisualConfig> = {
  experience: {
    text: 'EXPERIENCE',
    containerClass: 'absolute top-[28%] left-[33%] w-[34%] h-[44%]',
    fontSize: 'text-[1.8rem] max-phone:text-[1.2rem]',
    tracking: 'tracking-[0.10em]',
    textColor: 'text-white',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 229, 153, 0.4)',
  },
  projects: {
    text: 'PROJECTS',
    containerClass: 'absolute top-[28%] left-[11.5%] w-[77%] h-[42%]',
    fontSize: 'text-[4.2rem] max-phone:text-[2.6rem]',
    tracking: 'tracking-[0.14em]',
    textColor: 'text-white',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.9)',
  },
  skills: {
    text: 'SKILLS',
    containerClass: 'absolute top-[27.8%] left-[11.6%] w-[77.1%] h-[40.5%]',
    fontSize: 'text-[4.0rem] max-phone:text-[2.4rem]',
    tracking: 'tracking-[0.18em]',
    textColor: 'text-white',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 14px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.85)',
  },
  certifications: {
    text: 'CERTIFICATIONS',
    containerClass: 'absolute top-[28.2%] left-[11.4%] w-[77.2%] h-[43.6%]',
    fontSize: 'text-[2.2rem] max-phone:text-[1.4rem]',
    tracking: 'tracking-[0.06em]',
    textColor: 'text-[#1a1a1a]',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  },
  'coercive-control': {
    text: 'EXPERIENCE',
    containerClass: 'absolute top-[28%] left-[33%] w-[34%] h-[44%]',
    fontSize: 'text-[1.8rem] max-phone:text-[1.2rem]',
    tracking: 'tracking-[0.10em]',
    textColor: 'text-white',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 229, 153, 0.4)',
  },
  candiac: {
    text: 'PROJECTS',
    containerClass: 'absolute top-[28%] left-[11.5%] w-[77%] h-[42%]',
    fontSize: 'text-[4.2rem] max-phone:text-[2.6rem]',
    tracking: 'tracking-[0.14em]',
    textColor: 'text-white',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.9)',
  },
  mcalpine: {
    text: 'SKILLS',
    containerClass: 'absolute top-[27.8%] left-[11.6%] w-[77.1%] h-[40.5%]',
    fontSize: 'text-[4.0rem] max-phone:text-[2.4rem]',
    tracking: 'tracking-[0.18em]',
    textColor: 'text-white',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 14px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.85)',
  },
  lightship: {
    text: 'CERTIFICATIONS',
    containerClass: 'absolute top-[28.2%] left-[11.4%] w-[77.2%] h-[43.6%]',
    fontSize: 'text-[2.2rem] max-phone:text-[1.4rem]',
    tracking: 'tracking-[0.06em]',
    textColor: 'text-[#1a1a1a]',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  },
};

/**
 * CardAnimatedVisual: Inspired Architectural & Digital Showcase Consoles
 * For Experience, Projects, and Skills: section title blooms dynamically.
 * For Certifications: a 4-pointed star animation emerges and sparkles first,
 * followed by the elegant CERTIFICATIONS serif text displaying into the console.
 */
export const CardAnimatedVisual: React.FC<CardAnimatedVisualProps> = ({ projectId }) => {
  const isCertifications = projectId === 'certifications' || projectId === 'lightship';
  const isExperience = projectId === 'experience' || projectId === 'coercive-control';

  const config = SECTION_CONFIGS[projectId] || {
    text: projectId.toUpperCase(),
    containerClass: 'absolute top-[28%] left-[11.5%] w-[77%] h-[42%]',
    fontSize: 'text-[3.4rem] max-phone:text-[2.2rem]',
    tracking: 'tracking-[0.12em]',
    textColor: 'text-white',
    fontFamily: "'Cormorant Garamond', 'Playfair Display', Didot, serif",
    textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
  };

  if (isCertifications) {
    return (
      <div
        className={`${config.containerClass} flex items-center justify-center pointer-events-none select-none overflow-visible z-20`}
      >
        {/* Phase 1: Star Animation (Emerges, sparkles & breathes, then dissolves) */}
        <motion.div
          key="cert-star"
          className="relative flex items-center justify-center"
          animate={{
            opacity: [0, 1, 1, 1, 1, 0, 0, 0],
            scale: [0.2, 1.18, 0.96, 1.08, 1.0, 0.15, 0, 0],
            rotate: [-30, 8, -4, 6, 0, 45, 0, 0],
            filter: [
              'blur(4px)',
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              'blur(4px)',
              'blur(6px)',
              'blur(6px)',
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            times: [0, 0.08, 0.14, 0.22, 0.30, 0.36, 0.38, 1],
            ease: 'easeInOut',
          }}
        >
          <FourPointedStar className="w-[3.6rem] h-[3.6rem] max-phone:w-[2.4rem] max-phone:h-[2.4rem] text-[#1a1a1a]" />
          {/* Micro companion sparkle dot */}
          <motion.div
            className="absolute translate-x-[2.4rem] translate-y-[1.5rem]"
            animate={{
              opacity: [0, 0.85, 0.4, 0.9, 0.3, 0, 0, 0],
              scale: [0, 1.1, 0.8, 1.2, 0.9, 0, 0, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              times: [0, 0.1, 0.16, 0.24, 0.30, 0.35, 0.38, 1],
              ease: 'easeInOut',
            }}
          >
            <FourPointedStar className="w-[1.1rem] h-[1.1rem] max-phone:w-[0.8rem] max-phone:h-[0.8rem] text-[#1a1a1a]" />
          </motion.div>
        </motion.div>

        {/* Phase 2: CERTIFICATIONS Text Display (Blooms as star dissolves, displays, then fades) */}
        <motion.span
          key="cert-text"
          animate={{
            opacity: [0, 0, 0, 1, 1, 1, 0, 0],
            scale: [0.92, 0.92, 0.94, 1, 1, 1, 0.96, 0.92],
            filter: [
              'blur(8px)',
              'blur(8px)',
              'blur(8px)',
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              'blur(6px)',
              'blur(8px)',
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            times: [0, 0.34, 0.38, 0.46, 0.76, 0.84, 0.92, 1],
            ease: 'easeInOut',
          }}
          className={`absolute font-serif font-normal uppercase text-center leading-none select-none pointer-events-none ${config.textColor} ${config.fontSize} ${config.tracking}`}
          style={{
            fontFamily: config.fontFamily,
            textShadow: config.textShadow,
          }}
        >
          {config.text}
        </motion.span>
      </div>
    );
  }

  if (isExperience) {
    return (
      <div
        className={`${config.containerClass} flex items-center justify-center pointer-events-none select-none overflow-visible z-20`}
      >
        {/* Phase 1: Kinetic Enterprise / Tech Star Animation (Emerges, pulses with telemetry aura, then dissolves) */}
        <motion.div
          key="exp-star"
          className="relative flex items-center justify-center"
          animate={{
            opacity: [1, 1, 1, 1, 1, 0, 0, 1],
            scale: [1.0, 1.15, 0.96, 1.06, 1.0, 0.15, 0, 1.0],
            rotate: [0, 8, -4, 5, 0, 40, 0, 0],
            filter: [
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              'blur(6px)',
              'blur(8px)',
              'blur(0px)',
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            times: [0, 0.08, 0.14, 0.22, 0.30, 0.36, 0.38, 1],
            ease: 'easeInOut',
          }}
        >
          {/* Ambient Glowing Aura */}
          <div className="absolute w-[8.4rem] h-[8.4rem] rounded-full bg-gradient-to-tr from-emerald-500/25 via-teal-400/30 to-cyan-400/20 blur-[24px] pointer-events-none" />

          {/* Kinetic Orbit Pulse Ring */}
          <motion.div
            className="absolute w-[5.4rem] h-[5.4rem] rounded-full border border-emerald-400/40"
            animate={{
              scale: [0.8, 1.45, 1.6],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Concentric Dashed Orbit */}
          <motion.div
            className="absolute w-[4.6rem] h-[4.6rem] rounded-full border border-dashed border-teal-300/30"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Central Radiant 4-Pointed Star */}
          <svg
            viewBox="0 0 24 24"
            className="w-[3.8rem] h-[3.8rem] max-phone:w-[2.6rem] max-phone:h-[2.6rem] relative z-10 drop-shadow-[0_0_12px_rgba(0,229,153,0.7)]"
          >
            <defs>
              <linearGradient id="expStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e599" />
                <stop offset="50%" stopColor="#00ffb2" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>
            <path
              d="M12 0C12 7.2 7.2 12 0 12C7.2 12 12 16.8 12 24C12 16.8 16.8 12 24 12C16.8 12 12 7.2 12 0Z"
              fill="url(#expStarGrad)"
            />
            <circle cx="12" cy="12" r="2" fill="#ffffff" opacity="0.95" />
          </svg>

          {/* Companion Micro Sparkle Dots */}
          <motion.div
            className="absolute -top-[0.8rem] right-[0.2rem]"
            animate={{
              scale: [0, 1.2, 0.8, 1.1, 0],
              opacity: [0, 0.9, 0.4, 0.85, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-[0.5rem] h-[0.5rem] rounded-full bg-emerald-300 shadow-[0_0_6px_#00ffb2]" />
          </motion.div>

          <motion.div
            className="absolute -bottom-[0.6rem] -left-[0.4rem]"
            animate={{
              scale: [0, 0.9, 1.3, 0.7, 0],
              opacity: [0, 0.7, 0.95, 0.3, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: 0.6,
              ease: 'easeInOut',
            }}
          >
            <div className="w-[0.4rem] h-[0.4rem] rounded-full bg-cyan-300 shadow-[0_0_6px_#00b4d8]" />
          </motion.div>
        </motion.div>

        {/* Phase 2: EXPERIENCE Text Display (Blooms as star dissolves, displays, then fades) */}
        <motion.span
          key="exp-text"
          animate={{
            opacity: [0, 0, 0, 1, 1, 1, 0, 0],
            scale: [0.92, 0.92, 0.94, 1, 1, 1, 0.96, 0.92],
            filter: [
              'blur(8px)',
              'blur(8px)',
              'blur(8px)',
              'blur(0px)',
              'blur(0px)',
              'blur(0px)',
              'blur(6px)',
              'blur(8px)',
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            times: [0, 0.34, 0.38, 0.46, 0.76, 0.84, 0.92, 1],
            ease: 'easeInOut',
          }}
          className={`absolute font-serif font-normal uppercase text-center leading-none select-none pointer-events-none ${config.textColor} ${config.fontSize} ${config.tracking}`}
          style={{
            fontFamily: config.fontFamily,
            textShadow: config.textShadow,
          }}
        >
          {config.text}
        </motion.span>
      </div>
    );
  }

  return (
    <div
      className={`${config.containerClass} flex items-center justify-center pointer-events-none select-none overflow-visible z-20`}
    >
      <motion.span
        key={config.text}
        initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
        animate={{
          opacity: [0, 0, 1, 1, 1, 0, 0],
          scale: [0.94, 0.94, 1, 1, 1, 0.98, 0.94],
          filter: [
            'blur(8px)',
            'blur(8px)',
            'blur(0px)',
            'blur(0px)',
            'blur(0px)',
            'blur(6px)',
            'blur(8px)',
          ],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          times: [0, 0.08, 0.22, 0.72, 0.88, 0.96, 1],
          ease: 'easeInOut',
        }}
        className={`font-serif font-normal uppercase text-center leading-none select-none pointer-events-none ${config.textColor} ${config.fontSize} ${config.tracking}`}
        style={{
          fontFamily: config.fontFamily,
          textShadow: config.textShadow,
        }}
      >
        {config.text}
      </motion.span>
    </div>
  );
};
