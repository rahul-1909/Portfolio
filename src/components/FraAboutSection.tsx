import React from 'react';

export const FraAboutSection: React.FC = () => {
  return (
    <section 
      id="intro" 
      className="py-24 sm:py-36 bg-[#0E1017] text-white border-b-4 border-black relative overflow-hidden select-none"
    >
      {/* Background Subtle Doodle Radial Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#FFE600 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block px-3 py-1 bg-[#FFE600] text-black font-par text-xs font-bold uppercase tracking-wider rounded mb-4 shadow-[2px_2px_0px_#FFF] -rotate-1">
            ABOUT THE ARTIST
          </div>

          <h2 className="font-display text-6xl sm:text-8xl md:text-9xl text-white uppercase tracking-tight leading-none">
            MA CHI È FRA?
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Story Text */}
          <div className="lg:col-span-8 space-y-6">
            <p className="font-par text-xl sm:text-2xl text-gray-200 font-normal leading-relaxed">
              <strong className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">Francesco Caporale</strong> vive a Milano con il cuore Calabrese. Nel 2014, dopo la laurea in Graphic Design & Art Direction alla Naba, scopre la <strong className="text-[#FFE600] font-bold">DoodleArt</strong>, da lui definita <em>Arte dell'errore</em>.
            </p>

            <p className="font-par text-base sm:text-lg text-gray-400 leading-relaxed">
              Le sue linee intricate ed essenziali in bianco e nero, contaminate da pennellate di colore puro, creano mondi immaginari ed ipnotici. Dalla grafica ai grandi murales, fino alle live performance su scala internazionale.
            </p>

            {/* Tags Ribbon */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {['Doodle Art', 'Live Painting', 'Murales', 'Art Direction', 'Guinness World Record', 'NABA Milano'].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-white/10 text-white font-mono text-xs font-bold rounded-lg border border-white/20 hover:border-[#FFE600] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Omino Fra Character Illustration */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative p-6 bg-white/5 rounded-3xl border-3 border-white/20 shadow-[8px_8px_0px_#FFE600] group hover:-translate-y-1 transition-transform">
              <img 
                src="/images/fra/omino-fra-1.svg" 
                alt="FRA! Character" 
                className="w-48 sm:w-56 h-auto drop-shadow-[4px_4px_0px_#000]" 
              />
              <div className="text-center mt-3">
                <span className="font-display text-lg text-[#FFE600] tracking-wider uppercase">
                  FRA! · MILANO
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
