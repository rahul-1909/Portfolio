import React from 'react';
import { CrowdCanvas } from './Skiper39';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-white text-black border-t-2 border-black overflow-hidden select-none">
      {/* Pure, Uncluttered, Edge-to-Edge Animated Crowd Stage */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] pointer-events-none">
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="w-full h-full"
        />
      </div>
    </footer>
  );
};
