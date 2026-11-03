import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  { num: '01', title: 'Illustrazione', desc: 'Doodle art, copertine, packaging e illustrazioni vettoriali.' },
  { num: '02', title: 'Art direction', desc: 'Identità visiva, concept creativi e campagne integrate.' },
  { num: '03', title: 'Graphic Design', desc: 'Layout editoriali, poster, merchandise e tipografia.' },
  { num: '04', title: 'Live painting', desc: 'Performance dal vivo durante eventi, fiere e festival.' },
  { num: '05', title: 'Murales', desc: 'Interventi urbani, riqualificazione pareti e grandi superfici.' },
  { num: '06', title: 'Workshop', desc: 'Corsi interattivi sulla doodle art e il pensiero creativo.' },
  { num: '07', title: 'Team Building', desc: 'Sessioni creative di pittura collettiva per aziende.' },
  { num: '08', title: 'Motion Graphic', desc: 'Animazione dei doodle in 2D e video clip interattivi.' },
  { num: '09', title: 'Shop', desc: 'Stampe fine art, quadri originali e capsule collection.' },
  { num: '10', title: 'Video Games', desc: 'Asset grafici, personaggi e ambientazioni illustrate.' },
  { num: '11', title: 'Pasta al pomodoro', desc: 'Il segreto per alimentare ogni sessione creativa!' },
];

export const FraMenuWrap: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-36 bg-white text-black border-b-4 border-black relative notebook-paper select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Title */}
        <div className="mb-14">
          <div className="inline-block px-3 py-1 bg-black text-white font-par text-xs font-bold uppercase tracking-wider rounded mb-3 shadow-[2px_2px_0px_#FFE600] -rotate-1">
            WHAT WE DO
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-black uppercase tracking-tight leading-[0.9]">
            SERVIZI & COMPETENZE
          </h2>
          <p className="font-par text-sm sm:text-base text-gray-700 mt-2">
            Passa il mouse sulle discipline per esplorare le specialità di FRA!
          </p>
        </div>

        {/* The Menu Rows */}
        <div className="border-t-3 border-black divide-y-3 divide-black">
          {SERVICES.map((s, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={s.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`py-5 sm:py-7 px-4 sm:px-6 transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isHovered ? 'bg-[#FFE600] translate-x-2' : 'hover:bg-yellow-50'
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="font-display text-lg sm:text-2xl font-bold text-gray-500">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl sm:text-5xl text-black uppercase tracking-tight flex items-center gap-3">
                      <span>{s.title}</span>
                      <ArrowUpRight 
                        size={24} 
                        className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                      />
                    </h3>
                  </div>
                </div>

                <div className="font-par text-xs sm:text-sm text-gray-800 font-medium max-w-sm text-left sm:text-right">
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
