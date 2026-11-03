import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCard {
  id: string;
  title: string;
  category: string;
  desc: string;
  image: string;
  link: string;
}

const PROJECTS: ProjectCard[] = [
  {
    id: 'ikea',
    title: 'IKEA',
    category: 'Live Painting · Event',
    desc: "Campagna in Live painting per la giornata mondiale della casa durante l'IKEA FESTIVAL.",
    image: '/images/fra/copertina-ikea.jpg',
    link: 'https://fradesign.it/works/ikea/',
  },
  {
    id: 'wami',
    title: 'WAMI',
    category: 'Vetrina · Water Day',
    desc: "Con gli amici di Wami, in occasione della giornata mondiale dell'acqua, abbiamo realizzato una super vetrina in live painting.",
    image: '/images/fra/copertina-wami.jpg',
    link: 'https://fradesign.it/works/wami/',
  },
  {
    id: 'xiaomi',
    title: 'XIAOMI GUINNESS WORLD RECORD',
    category: '568 mq · Record Mondiale',
    desc: "L'idea di realizzare il 'disegno più grande del mondo' disegnato da una sola persona: 568 mq di pura doodle art.",
    image: '/images/fra/copertina-xiaomi.jpg',
    link: 'https://fradesign.it/works/xiaomi-guinnes-world-record/',
  },
];

export const FraProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 sm:py-36 bg-[#0E1017] text-white border-b-4 border-black relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFE600] px-3 py-1 bg-white/10 rounded border border-white/20">
              SELECTED CLIENT WORKS
            </span>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight mt-3">
              OPERE IN EVIDENZA
            </h2>
          </div>

          <a 
            href="https://fradesign.it/works/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE600] text-black font-par text-sm font-bold uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#FFF] hover:bg-yellow-300 transition-colors self-center sm:self-auto"
          >
            <span>TUTTI I PROGETTI</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* 3 Large Showcase Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col justify-between bg-[#161A26] rounded-3xl border-3 border-white/20 hover:border-[#FFE600] shadow-[8px_8px_0px_#000] hover:shadow-[10px_10px_0px_#FFE600] hover:-translate-y-2 transition-all overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 font-mono text-[11px] font-bold uppercase tracking-wider bg-black/80 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                  {p.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight group-hover:text-[#FFE600] transition-colors mb-3">
                    {p.title}
                  </h3>
                  <p className="font-par text-sm text-gray-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Card Link */}
                <div className="mt-6 pt-4 border-t border-gray-700 flex items-center justify-between">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-par text-xs font-bold uppercase tracking-wider text-[#FFE600] hover:underline"
                  >
                    <span>Scopri di più</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
