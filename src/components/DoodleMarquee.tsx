import React from 'react';

interface DoodleMarqueeProps {
  items?: string[];
  reverse?: boolean;
  speed?: 'normal' | 'fast';
  bgColor?: string;
  textColor?: string;
}

const DEFAULT_ITEMS = [
  'Grafica pubblicitaria',
  'Illustrazione',
  'Direzione artistica',
  'Murales',
  'Live painting',
  'Pasta al sugo'
];

export const DoodleMarquee: React.FC<DoodleMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  reverse = false,
  speed = 'normal',
  bgColor = 'bg-black',
  textColor = 'text-white',
}) => {
  const repeatedItems = [...items, ...items, ...items, ...items];

  const animClass = reverse 
    ? 'animate-marquee-reverse' 
    : speed === 'fast' 
    ? 'animate-marquee-fast' 
    : 'animate-marquee';

  return (
    <div className={`w-full overflow-hidden border-y-4 border-black ${bgColor} ${textColor} py-4 sm:py-5 select-none relative z-20`}>
      <div className={animClass}>
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-6 sm:gap-10 mx-4 sm:mx-8 shrink-0">
            <span className="font-display text-xl sm:text-3xl font-bold uppercase tracking-wider whitespace-nowrap">
              {item}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
