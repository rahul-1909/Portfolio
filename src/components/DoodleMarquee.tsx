import React from 'react';

interface DoodleMarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: 'normal' | 'fast';
  bgColor?: string;
  textColor?: string;
}

const DOODLE_SEPARATORS = ['★', '⚡', '✦', '☕', '☁️', '🚀', '😊'];

export const DoodleMarquee: React.FC<DoodleMarqueeProps> = ({
  items,
  reverse = false,
  speed = 'normal',
  bgColor = 'bg-black',
  textColor = 'text-white',
}) => {
  // Repeat items to make an endless seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  const animClass = reverse 
    ? 'animate-marquee-reverse' 
    : speed === 'fast' 
    ? 'animate-marquee-fast' 
    : 'animate-marquee';

  return (
    <div className={`w-full overflow-hidden border-y-3 sm:border-y-4 border-black ${bgColor} ${textColor} py-3 sm:py-4 select-none relative z-20`}>
      <div className={animClass}>
        {repeatedItems.map((item, index) => {
          const sep = DOODLE_SEPARATORS[index % DOODLE_SEPARATORS.length];
          return (
            <div key={index} className="flex items-center gap-6 sm:gap-8 mx-4 sm:mx-6 shrink-0">
              <span className="font-display text-base sm:text-xl font-bold uppercase tracking-wider whitespace-nowrap">
                {item}
              </span>
              <span className="text-[#FFE600] text-lg select-none shrink-0 drop-shadow-[1px_1px_0px_#000]">
                {sep}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
