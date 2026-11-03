import React from 'react';
import { CrowdCanvas } from '../components/Skiper39';

interface HomeProps {
  onOpenResume?: () => void;
}

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className="relative min-h-screen bg-white text-black flex flex-col justify-between overflow-hidden">
      {/* Clean Slate Canvas Area Ready for Step-by-Step Redesign */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-32 text-center">
        <div className="inline-block px-3 py-1 bg-[#FFE600] border-2 border-black rounded font-mono text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000] mb-4">
          CLEAN SLATE · READY FOR INSTRUCTIONS
        </div>

        <h1 className="font-display text-5xl sm:text-7xl font-bold uppercase tracking-tight text-black">
          RAHUL TEJA
        </h1>

        <p className="font-mono text-sm text-gray-500 mt-2 max-w-md">
          All previous content, sentences, and sections have been removed. Ready to rebuild step by step.
        </p>
      </div>

      {/* Full-Screen Edge-to-Edge Skiper UI Crowd Canvas (Footer) */}
      <footer className="relative w-full border-t-4 border-black bg-white">
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] pointer-events-none select-none overflow-hidden">
          <CrowdCanvas
            src="/images/peeps/all-peeps.png"
            rows={15}
            cols={7}
            className="w-full h-full block"
          />
        </div>

        <div className="w-full bg-black text-white py-4 px-6 text-center border-t-2 border-black">
          <span className="font-mono text-xs text-gray-300">
            © 2026 Rahul Teja
          </span>
        </div>
      </footer>
    </div>
  );
};
