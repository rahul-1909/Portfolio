import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Compass 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { GithubIcon, TwitterIcon } from './SocialIcons';
import { profileData } from '../data/profile';

interface HeaderProps {
  onOpenQuickAccess: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuickAccess }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'hero', label: 'Studio' },
    { id: 'about', label: 'Who is Rahul?' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b-2 border-black py-2.5 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm py-3.5'
      }`}
    >
      <div className="content-wrapper max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group text-left cursor-pointer"
          aria-label="Scroll to top"
        >
          <div className="flex h-8 w-8 items-center justify-center bg-black text-white doodle-box-sm font-mono text-xs font-[1000] shadow-[2px_2px_0px_0px_#000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            <span>RT</span>
          </div>
          <div className="font-[1000] text-lg tracking-tight text-black uppercase">
            <span>rahul teja</span>
          </div>
        </button>

        {/* Desktop Anchor Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-neutral-50 doodle-box-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-1 font-mono text-xs font-[1000] uppercase tracking-wider transition-all rounded ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'text-black hover:bg-neutral-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Twitter, GitHub, Quick Access, Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Social Icons */}
          <div className="hidden sm:flex items-center gap-1.5">
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noreferrer nofollow"
              className="p-1.5 doodle-box-sm bg-white hover:bg-neutral-100 transition shadow-[2px_2px_0px_0px_#000]"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="h-3.5 w-3.5" />
            </a>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer nofollow"
              className="p-1.5 doodle-box-sm bg-white hover:bg-neutral-100 transition shadow-[2px_2px_0px_0px_#000]"
              aria-label="GitHub"
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Quick Access Button */}
          <button
            onClick={onOpenQuickAccess}
            className="flex items-center gap-1.5 px-3 py-1.5 doodle-box-sm bg-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition"
            aria-label="Open Quick Access"
          >
            <Compass className="h-3.5 w-3.5 text-black" />
            <span className="hidden lg:inline">Find</span>
            <kbd className="rounded border border-black/30 bg-neutral-100 px-1 font-mono text-[10px]">
              Q
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 doodle-box-sm bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5 text-amber-500" /> : <Moon className="h-3.5 w-3.5 text-black" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center doodle-box-sm bg-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-black bg-white px-5 py-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left font-mono text-sm font-bold uppercase tracking-wider py-1.5 text-black hover:opacity-70"
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
