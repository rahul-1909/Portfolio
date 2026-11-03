import React, { useState } from 'react';
import { Send, Copy, Check, ArrowUp } from 'lucide-react';
import { CrowdCanvas } from './Skiper39';
import confetti from 'canvas-confetti';

export const FraCrowdContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'info@fradesign.it';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#FFE600', '#000000', '#FFFFFF'],
      });
    } catch {}
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full bg-white text-black border-t-4 border-black overflow-hidden notebook-paper select-none">
      
      {/* 1. Contact & Social Hub */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-12 relative z-10 text-center">
        
        <div className="inline-block px-3 py-1 bg-[#FFE600] border-2 border-black rounded font-mono text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000] mb-4">
          SCRIVIMI · PARLIAMO DI PROGETTI
        </div>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-black uppercase tracking-tight leading-[0.9] mb-4">
          HAI FAME DI DOODLE<br />
          <span className="text-[#FFE600] bg-black px-3 py-0.5 rounded-lg inline-block mt-1">
            ALL'INFINITO?
          </span>
        </h2>

        <p className="font-par text-base sm:text-lg text-gray-700 max-w-md mx-auto mb-8">
          Per collaborazioni commerciali, live performance, murales o workshop: scrivimi un'email!
        </p>

        {/* Email Pill with One-Click Copy */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-[#FFFBEB] p-4 sm:p-5 rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] mb-10">
          <a
            href={`mailto:${email}`}
            className="font-mono text-lg sm:text-2xl font-bold text-black hover:underline"
          >
            {email}
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white font-mono text-xs font-bold uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-100 transition-colors"
            >
              {copied ? (
                <span className="text-emerald-700 flex items-center gap-1 font-bold">
                  <Check size={14} /> Copiato! 🎉
                </span>
              ) : (
                <span className="flex items-center gap-1 text-black">
                  <Copy size={14} /> Copia Email
                </span>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="px-4 py-2 bg-black text-white font-mono text-xs font-bold uppercase rounded-xl border-2 border-black shadow-[2px_2px_0px_#FFE600] hover:bg-[#FFE600] hover:text-black hover:border-black transition-colors flex items-center gap-1.5"
            >
              <span>Scrivi</span>
              <Send size={14} />
            </a>
          </div>
        </div>

        {/* Social Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { name: 'Instagram', url: 'https://instagram.com/fradesign.it' },
            { name: 'Facebook', url: 'https://facebook.com/fradesign.it' },
            { name: 'TikTok', url: 'https://tiktok.com/@fradesign.it' },
            { name: 'LinkedIn', url: 'https://linkedin.com' },
          ].map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE600] transition-all hover:-translate-y-0.5 font-mono text-xs font-bold uppercase tracking-wider"
            >
              {s.name}
            </a>
          ))}
        </div>

      </div>

      {/* 2. Full-Screen Edge-to-Edge Animated Crowd Canvas (Walking Peeps) */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] pointer-events-none border-t-4 border-black select-none">
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="w-full h-full block"
        />
      </div>

      {/* 3. Authentic Footer Bar */}
      <div className="w-full bg-black text-white border-t-4 border-black py-6 px-6 sm:px-10 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/fra/omino-fra-1.svg" alt="FRA! mark" className="w-8 h-8 invert" />
            <span className="font-display text-lg text-white tracking-wider uppercase">
              FATTO A MANO CON AMORE · FRA!
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-gray-400">
              © 2026 fradesign.it
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFE600] text-black font-mono text-xs font-bold border border-black hover:bg-yellow-300 transition-colors"
            >
              <span>Torna su</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
