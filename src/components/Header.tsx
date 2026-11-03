import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'intro', label: 'Chi sono' },
    { id: 'projects', label: 'Progetti' },
    { id: 'services', label: 'Servizi' },
    { id: 'contact', label: 'Contatto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-200 select-none ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b-3 border-black py-3 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo (FRA! authentic logo) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="FRA! Home"
        >
          <div className="flex h-9 w-9 items-center justify-center bg-black text-[#FFE600] rounded-lg border-2 border-black font-display text-xl font-bold shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
            <span>FRA!</span>
          </div>
          <div className="font-display text-2xl tracking-wide text-black uppercase">
            <span>fradesign.it</span>
          </div>
        </button>

        {/* Desktop Anchor Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 p-1 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-1.5 font-par text-xs font-bold uppercase tracking-wider text-black hover:bg-[#FFE600] rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex px-4 py-2 bg-[#FFE600] text-black font-par text-xs font-bold uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-yellow-300 hover:shadow-[1px_1px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <span>Scrivimi</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_#000]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-3 border-black bg-white px-6 py-5 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left font-display text-xl uppercase tracking-wider py-1 text-black hover:text-[#FFE600]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
