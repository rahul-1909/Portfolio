import React, { useState, useEffect } from 'react';
import { getISTDateTime } from '../utils/time';
import type { ISTTimeInfo } from '../utils/time';

interface AppleLockscreenClockProps {
  className?: string;
}

export const AppleLockscreenClock: React.FC<AppleLockscreenClockProps> = ({ className = '' }) => {
  const [timeInfo, setTimeInfo] = useState<ISTTimeInfo>(getISTDateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(getISTDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 12-hour format matching Apple lockscreen (e.g. 9:10)
  const hours = timeInfo.hours12;
  const minutes = timeInfo.minutes;

  return (
    <div 
      className={`inline-flex items-center justify-center select-none bg-transparent p-0 m-0 border-0 shadow-none ${className}`}
      aria-label={`Current time: ${hours}:${minutes}`}
    >
      {/* Liquid Glass Hours */}
      <span className="apple-liquid-glass text-7xl sm:text-8xl md:text-9xl font-bold leading-none select-none tracking-tight">
        {hours}
      </span>

      {/* Liquid Glass Colon Dots */}
      <div className="flex flex-col justify-center items-center gap-3.5 sm:gap-4 md:gap-5 px-2 sm:px-3 md:px-4 py-2">
        <span className="apple-glass-dot h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rounded-full" />
        <span className="apple-glass-dot h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rounded-full" />
      </div>

      {/* Liquid Glass Minutes */}
      <span className="apple-liquid-glass text-7xl sm:text-8xl md:text-9xl font-bold leading-none select-none tracking-tight">
        {minutes}
      </span>
    </div>
  );
};
