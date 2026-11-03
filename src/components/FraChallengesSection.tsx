import React from 'react';
import { Send, Sparkles } from 'lucide-react';

const CHALLENGES = [
  {
    num: '01',
    title: 'Guinness World Record 568 mq',
    category: 'Record Mondiale',
    desc: 'Disegnare l\'opera a mano libera più grande del pianeta su una superficie continua di 568 metri quadrati.',
    result: 'Record Ufficiale Guinness World Records omologato.',
  },
  {
    num: '02',
    title: 'Live Painting 24h Non-Stop',
    category: 'Endurance Performance',
    desc: 'Dipingere ininterrottamente per 24 ore di fronte al pubblico, trasformando pareti spoglie in un universo brulicante di personaggi.',
    result: 'Oltre 10.000 spettatori dal vivo.',
  },
  {
    num: '03',
    title: 'Doodle Art & Augmented Reality',
    category: 'Innovazione Digitale',
    desc: 'Fondere l\'inchiostro nero analogico con filtri di realtà aumentata e animazioni 3D interattive per smartphone.',
    result: 'Campagna virale con milioni di interazioni.',
  },
];

export const FraChallengesSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 sm:py-36 bg-[#0E1017] text-white border-b-4 border-black relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-block px-3 py-1 bg-[#FFE600] text-black font-par text-xs font-bold uppercase tracking-wider rounded mb-3 shadow-[2px_2px_0px_#FFF] -rotate-1">
            <Sparkles size={13} className="inline mr-1" />
            THE CHALLENGES
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight leading-[0.9]">
            LE SFIDE DI FRA!
          </h2>
          <p className="font-par text-sm sm:text-base text-gray-300 mt-2">
            Grandi formati, record mondiali e prove estreme di creatività.
          </p>
        </div>

        {/* 3 Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CHALLENGES.map((c) => (
            <div
              key={c.num}
              className="bg-[#161A26] p-7 rounded-3xl border-3 border-white/20 hover:border-[#FFE600] shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#FFE600] hover:-translate-y-1.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-700 mb-4">
                  <span className="font-display text-3xl text-[#FFE600]">
                    #{c.num}
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase bg-white/10 text-white px-2.5 py-0.5 rounded-full border border-white/20">
                    {c.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wide mb-3">
                  {c.title}
                </h3>
                <p className="font-par text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {c.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-800 text-xs font-mono font-bold text-[#FFE600]">
                ✓ {c.result}
              </div>
            </div>
          ))}
        </div>

        {/* High-Energy CTA Box ("Hai una vera sfida da propormi? Sfidalo!") */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFE600] text-black border-4 border-black shadow-[10px_10px_0px_#FFF] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-3 py-1 rounded inline-block mb-3">
              ✦ SFIDA APERTA ✦
            </span>
            <h3 className="font-display text-4xl sm:text-6xl uppercase tracking-tight leading-[0.95]">
              HAI UNA VERA SFIDA DA PROPORMI?
            </h3>
            <p className="font-par text-sm sm:text-base text-black/85 mt-2 font-medium">
              Murales mastodontici, live show o concept impossibili: mettilo alla prova!
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="flex items-center gap-3 px-8 py-4 bg-black text-white font-par text-base font-bold rounded-2xl border-3 border-black shadow-[5px_5px_0px_#FFF] hover:bg-white hover:text-black hover:border-black hover:shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all shrink-0"
          >
            <span>SFIDALO!</span>
            <Send size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
