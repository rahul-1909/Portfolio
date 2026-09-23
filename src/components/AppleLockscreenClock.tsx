import React, { useState, useEffect } from 'react';
import { getISTDateTime } from '../utils/time';
import type { ISTTimeInfo } from '../utils/time';

interface AppleLockscreenClockProps {
  className?: string;
}

export const AppleLockscreenClock: React.FC<AppleLockscreenClockProps> = ({ className = '' }) => {
  const [timeInfo, setTimeInfo] = useState<ISTTimeInfo>(getISTDateTime());
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(getISTDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = is24Hour ? timeInfo.hours24 : timeInfo.hours12;
  const minutes = timeInfo.minutes;

  return (
    <div 
      className={`group relative inline-flex flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/70 px-6 py-4.5 sm:px-8 sm:py-5 backdrop-blur-2xl shadow-xl shadow-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:shadow-2xl dark:shadow-purple-950/20 transition-all duration-300 hover:border-accent-500/40 hover:bg-white/85 dark:hover:bg-white/[0.06] hover:scale-[1.01] select-none ${className}`}
      onClick={() => setIs24Hour(prev => !prev)}
      title="Click to toggle 12h / 24h format"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIs24Hour(prev => !prev);
        }
      }}
    >
      {/* Ambient soft backlight */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-accent-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      {/* Apple Lockscreen Date: "Mon Jun 23" Style */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm sm:text-base font-semibold tracking-wide text-slate-700 dark:text-white/90 drop-shadow-sm font-sans">
          {timeInfo.appleDateStr}
        </span>
      </div>

      {/* Big Apple Lockscreen Clock Typography (Matching iOS 16/17 Glass Style) */}
      <div className="flex items-center justify-center leading-none">
        {/* Hours */}
        <span className="font-appleClock text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight apple-lockscreen-digits leading-none">
          {hours}
        </span>

        {/* Apple Lockscreen Dual-Dot Colon */}
        <div className="flex flex-col justify-center items-center gap-3 sm:gap-3.5 px-1.5 sm:px-2.5 py-1">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 rounded-full bg-gradient-to-b from-slate-700 to-slate-500 dark:from-white/95 dark:to-white/50 shadow-[0_1px_4px_rgba(255,255,255,0.25)] animate-pulse" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 rounded-full bg-gradient-to-b from-slate-700 to-slate-500 dark:from-white/95 dark:to-white/50 shadow-[0_1px_4px_rgba(255,255,255,0.25)] animate-pulse" />
        </div>

        {/* Minutes */}
        <span className="font-appleClock text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight apple-lockscreen-digits leading-none">
          {minutes}
        </span>
      </div>

      {/* Bottom Live IST Status Pill */}
      <div className="mt-2.5 flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        <span className="tracking-wide">IST (GMT+5:30)</span>
        {!is24Hour && (
          <>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="rounded bg-accent-500/10 px-1.5 py-0.2 text-[10px] font-bold text-accent-600 dark:text-accent-300">
              {timeInfo.ampm}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
