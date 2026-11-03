import React from 'react';

interface DoodleMarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: 'normal' | 'fast';
  bgColor?: string;
  textColor?: string;
}

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
    <div className={`w-full overflow-hidden border-y-2 border-black ${bgColor} ${textColor} py-2.5 sm:py-3.5 select-none`}>
      <div className={animClass}>
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-6 sm:gap-8 mx-3 sm:mx-4 shrink-0">
            <span className="font-mono text-xs sm:text-sm font-[1000] uppercase tracking-[0.2em] whitespace-nowrap">
              {item}
            </span>
            <span className="text-yellow-400 text-sm sm:text-base select-none">★</span>
          </div>
        ))}
      </div>
    </div>
  );
};
