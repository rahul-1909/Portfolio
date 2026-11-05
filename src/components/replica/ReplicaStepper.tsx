import React from 'react';
import { motion } from 'framer-motion';

interface ReplicaStepperProps {
  total: number;
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export const ReplicaStepper: React.FC<ReplicaStepperProps> = ({
  total,
  activeIndex,
  onSelectIndex,
}) => {
  return (
    <aside
      aria-label="Slider navigation indicators"
      className="absolute right-[8.1rem] top-[50%] -translate-y-1/2 max-phone:right-[2.5rem] z-30"
    >
      <div className="relative space-y-[0.8rem] flex flex-col items-center">
        {Array.from({ length: total }).map((_, idx) => {
          // Gabriel's site renders dots in bottom-to-top or top-to-bottom order:
          // In EI: const T = A === s - 1 - i;
          const isActive = idx === activeIndex;

          return (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className="p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-black rounded-full"
              aria-label={`Jump to project ${idx + 1}`}
            >
              <motion.div
                className="w-[3px] h-[3px] bg-light-black rounded-full"
                animate={{ opacity: isActive ? 1 : 0.2 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};
