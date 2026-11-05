import React from 'react';
import type { SkillWheelItem } from '../../data/skillsWheel';

interface ReplicaSkillCardProps {
  item: SkillWheelItem;
  isActive: boolean;
}

export const ReplicaSkillCard: React.FC<ReplicaSkillCardProps> = ({ item }) => {
  // Brand SVGs - large, sharp vector graphics
  const renderIcon = () => {
    switch (item.iconName) {
      case 'python':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M11.91 2C6.98 2 7.29 4.14 7.29 4.14L7.3 6.36H12v.71H4.63S2 6.77 2 11.75c0 4.97 2.29 4.8 2.29 4.8h1.37v-2.02s-.07-2.3 2.26-2.3h4.63s2.19.03 2.19-2.12V4.86S15.22 2 11.91 2zM9.41 3.5a.86.86 0 110 1.71.86.86 0 010-1.71z"
              fill="#3776AB"
            />
            <path
              d="M12.09 22c4.93 0 4.62-2.14 4.62-2.14l-.01-2.22H12v-.71h7.37s2.63.3 2.63-4.68c0-4.97-2.29-4.8-2.29-4.8h-1.37v2.02s.07 2.3-2.26 2.3H11.4s-2.19-.03-2.19 2.12v4.25S8.78 22 12.09 22zm2.5-1.5a.86.86 0 110-1.71.86.86 0 010 1.71z"
              fill="#FFD43B"
            />
          </svg>
        );
      case 'java':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M8.86 19.34s-1.8.38 0 1.34c2.27 1.2 5.86 1.15 8.12.06.67-.32 1.48-1.02.58-1.38-1.52-.6-3.13-.39-4.96-.36-1.34.02-2.58-.02-3.74.34zM8.33 16.78c-2.04.48-2.34 1.77-.39 2.13 3.65.67 7.7.75 11.1-.38.83-.28 1.47-.94.75-1.42-1.72-1.15-4.22-.64-6.66-.66-1.68-.01-3.34-.05-4.8.33zm5.66-5.83c1.22 1.34.45 2.58-.29 3.86 1.48-.77 2.87-1.87 2.18-3.48-.73-1.71-2.73-2.5-1.89-4.38-1.86 1.22-1.28 2.76 0 4zm-2.9-4.36c.86.99.32 1.91-.2 2.86 1.05-.57 2.03-1.38 1.54-2.57-.52-1.27-1.93-1.85-1.34-3.24-1.31.9-.9 2.05 0 2.95z"
              fill="#ED8B00"
            />
            <path
              d="M17.3 14.65c.57-.45.98-1.05.77-1.66-.43-1.25-3.39-1.2-4.88-.31-.54.32-.98.78-.58 1.19.86.88 3.52 1.32 4.69.78z"
              fill="#5382A1"
            />
          </svg>
        );
      case 'springboot':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M21.75 14.93c-.6 3.65-3.47 6.45-7.1 6.96-5.22.73-9.75-2.92-10.22-7.98-.3-3.18 1.18-6.14 3.73-7.85l1.6 2.77c-1.66 1.1-2.6 2.98-2.4 5.01.3 3.09 3.01 5.34 6.13 4.98 2.45-.28 4.41-2.12 4.88-4.54.49-2.54-.74-4.9-2.97-5.96V5.09c4.01 1.26 6.78 5.32 6.35 9.84zm-9.06-8.91V2.8L9.08 4.88l3.61 1.14z"
              fill="#6DB33F"
            />
            <path
              d="M12.69 2.8v3.22l3.61-1.14L12.69 2.8z"
              fill="#6DB33F"
            />
          </svg>
        );
      case 'fastapi':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.89 4.5l-.89 5.33h3.56L11.11 17.5l.89-5.33H8.44L12.89 6.5z"
              fill="#009688"
            />
          </svg>
        );
      case 'sql':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M12 3C6.48 3 2 4.79 2 7v10c0 2.21 4.48 4 10 4s10-1.79 10-4V7c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm8 5.1c-1.36.85-4.42 1.9-8 1.9s-6.64-1.05-8-1.9V8.87c1.8 1.09 5.04 1.63 8 1.63s6.2-.54 8-1.63V10.1zm0 5c-1.36.85-4.42 1.9-8 1.9s-6.64-1.05-8-1.9v-1.23c1.8 1.09 5.04 1.63 8 1.63s6.2-.54 8-1.63v1.23zm0 2.1c0 .66-3.58 2-8 2s-8-1.34-8-2v-1.23c1.8 1.09 5.04 1.63 8 1.63s6.2-.54 8-1.63V17.2z"
              fill="#336791"
            />
          </svg>
        );
      case 'postgresql':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.65 15.65c-2.31.25-4.32-.82-5.11-2.73-.2-.48-.28-.97-.24-1.47.16-2.03 1.92-3.6 4.08-3.63 1.25-.02 2.41.48 3.22 1.37.28.31.48.69.58 1.1.28 1.15-.09 2.37-.93 3.19-.48.47-1.04.85-1.6 1.17zm1.88-6.18c-.68-.75-1.65-1.17-2.69-1.15-1.8.03-3.27 1.34-3.4 3.03-.03.42.04.83.21 1.23.66 1.6 2.34 2.5 4.27 2.29.47-.27.94-.59 1.34-.98.7-.68 1.01-1.7.78-2.66-.08-.34-.25-.66-.49-.91l-.02.15z"
              fill="#4169E1"
            />
          </svg>
        );
      case 'mysql':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.7 13.5c-.8.6-2 .9-3.2.9-2.8 0-4.8-1.6-4.8-4.1 0-2.7 2.2-4.4 5-4.4 1.3 0 2.4.4 3.1 1.1l-1.2 1.2c-.5-.4-1.1-.7-1.9-.7-1.7 0-3.1 1.1-3.1 2.8 0 1.6 1.3 2.7 3.1 2.7.8 0 1.5-.2 2.1-.6v-1.8h-2.1v-1.5h3.8v4.4z"
              fill="#00758F"
            />
          </svg>
        );
      case 'langgraph':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" fill="#1A1A1A" />
            <circle cx="18" cy="6" r="3" fill="#1A1A1A" />
            <circle cx="12" cy="18" r="3" fill="#1A1A1A" />
            <path d="M8.5 7.5L15.5 7.5" />
            <path d="M7.5 8.5L10.5 15.5" />
            <path d="M16.5 8.5L13.5 15.5" />
          </svg>
        );
      case 'rag':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M8 8h8" />
            <path d="M8 12h5" />
            <circle cx="15.5" cy="15.5" r="2.5" />
            <path d="M17.5 17.5L20 20" />
          </svg>
        );
      case 'docker':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M13.98 10.97h2.15v2.15h-2.15v-2.15zm-2.87 0h2.15v2.15h-2.15v-2.15zm-2.86 0h2.15v2.15H8.25v-2.15zm8.6-2.86h2.15v2.15h-2.15V8.11zm-2.87 0h2.15v2.15h-2.15V8.11zm-2.87 0h2.15v2.15h-2.15V8.11zm-2.86 0h2.15v2.15H8.25V8.11zm5.73-2.87h2.15v2.15h-2.15V5.24zm-2.86 0h2.15v2.15h-2.15V5.24zM24 12.72c-.44-.31-1.46-.42-2.26-.06-.15-.74-.6-1.39-1.27-1.83l-.68-.42-.45.65c-.57.82-.76 1.83-.55 2.8-.46.22-1.01.35-1.69.35H2.43c-.42 0-.82.16-1.12.45-.3.29-.46.68-.46 1.09 0 3.32 1.63 6.33 4.41 8.1 2.21 1.4 4.79 2.15 7.46 2.15 8.11 0 11.23-5.26 11.28-5.35.48-.82.47-1.81.04-2.61-.17-.32-.42-.64-.74-.95-.08-.07-.18-.15-.3-.22z"
              fill="#2496ED"
            />
          </svg>
        );
      case 'aws':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M7.74 13.72c-.89 0-1.57-.21-2.03-.64-.46-.43-.69-1.05-.69-1.85 0-.85.27-1.51.81-1.99.54-.47 1.34-.71 2.39-.71.86 0 1.57.14 2.12.43v-.68c0-.52-.16-.92-.47-1.2-.31-.28-.79-.42-1.43-.42-.58 0-1.19.12-1.83.35l-.47-1.3c.77-.31 1.63-.47 2.58-.47 1.25 0 2.2.33 2.84 1 .64.67.96 1.62.96 2.85v5.39h-1.61v-1.14c-.66.86-1.55 1.28-2.66 1.28zm.51-1.44c.66 0 1.23-.23 1.71-.68.48-.46.72-1.07.72-1.83-.41-.2-.97-.3-1.68-.3-.72 0-1.25.15-1.59.45-.34.3-.51.72-.51 1.24 0 .75.45 1.12 1.35 1.12zM21.2 18.06c-2.38 1.4-5.24 2.14-8.58 2.14-4.22 0-7.85-1.28-10.87-3.83l.87-1.18c2.78 2.34 6.13 3.51 10.05 3.51 3.03 0 5.62-.67 7.78-1.94l.75 1.3z"
              fill="#FF9900"
            />
          </svg>
        );
      case 'azure':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M5.44 3.5L12.5 14.8l-4.5 2.7L2 14.2l3.44-10.7zm7.64 3.73l2.8-4.73H22L13.78 20.5l-4.7-2.82 3.8-6.85.2-.6z"
              fill="#0078D4"
            />
          </svg>
        );
      case 'git':
        return (
          <svg viewBox="0 0 24 24" className="w-16 h-16 max-phone:w-12 max-phone:h-12" fill="none">
            <path
              d="M21.62 10.88l-8.5-8.5a1.59 1.59 0 00-2.24 0l-1.9 1.9 2.4 2.4a1.89 1.89 0 012.39 2.39l2.31 2.31a1.89 1.89 0 11-1.13 1.12l-2.15-2.15v4.57a1.89 1.89 0 11-1.6 0v-4.7a1.89 1.89 0 01-1.02-2.48L7.8 5.36 2.38 10.78a1.59 1.59 0 000 2.24l8.5 8.5c.62.62 1.62.62 2.24 0l8.5-8.4a1.59 1.59 0 000-2.24z"
              fill="#F05032"
            />
          </svg>
        );
      default:
        return (
          <div className="w-16 h-16 rounded-full bg-light-black/10 flex items-center justify-center font-bold text-2xl text-light-black">
            {item.name.charAt(0)}
          </div>
        );
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between py-12 px-10 max-phone:py-8 max-phone:px-6 select-none"
      style={{ backgroundColor: item.backgroundColor }}
    >
      {/* Top Bar: Category Label & Stack Indicator (inset safely from top edge) */}
      <div className="w-full flex items-center justify-between z-10 pt-1">
        <span className="text-[1.25rem] max-phone:text-[1.1rem] font-mono uppercase tracking-widest text-[#555555] font-semibold">
          {item.category}
        </span>
        <span className="text-[1.15rem] font-mono uppercase tracking-wider text-[#777777]">
          Stack
        </span>
      </div>

      {/* EXACT CENTER OF THE CONTAINER: Large, Prominent Skill Brand Icon */}
      <div className="my-auto flex flex-col items-center justify-center z-10">
        <div className="w-36 h-36 max-phone:w-28 max-phone:h-28 rounded-[32px] bg-white shadow-md flex items-center justify-center p-6 transition-transform duration-300 hover:scale-105">
          {renderIcon()}
        </div>
      </div>

      {/* Bottom Content: Centered Name + 100% Fully Visible Descriptor */}
      <div className="flex flex-col items-center text-center gap-2.5 z-10 pb-8 max-phone:pb-3">
        <h2 className="text-[3.2rem] max-phone:text-[2.2rem] font-bold text-[#1A1A1A] leading-tight tracking-tight">
          {item.name}
        </h2>
        <p className="text-[1.38rem] max-phone:text-[1.18rem] text-[#333333] leading-snug max-w-[420px] mx-auto px-2 font-normal">
          {item.descriptor}
        </p>
      </div>
    </div>
  );
};
