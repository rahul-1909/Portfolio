import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Compass, 
  Layers, 
  FolderGit2, 
  Briefcase, 
  BookOpen, 
  Send 
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

  // Track scroll position for backdrop blur and section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scroll spy
      const sections = ['hero', 'projects', 'skills', 'experience', 'til', 'contact'];
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
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Stack', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'til', label: 'T.I.L', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#07070b]/85 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/5 py-3 shadow-sm'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="content-wrapper max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group text-left cursor-pointer"
          aria-label="Scroll to top"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 shadow-md shadow-violet-600/30 group-hover:scale-105 transition-transform">
            <span className="font-[900] text-xs tracking-tight text-white select-none">RT</span>
          </div>
          <div className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            <span>rahul</span>
            <span className="text-violet-500">.</span>
          </div>
        </button>

        {/* Desktop Anchor Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-white/[0.03] p-1.5 rounded-2xl border border-slate-200/70 dark:border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-violet-600 dark:text-white bg-white dark:bg-white/10 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.05]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-violet-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Twitter, GitHub, Quick Access, Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Social Icons */}
          <div className="hidden sm:flex items-center gap-1">
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noreferrer nofollow"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white transition"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer nofollow"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-white/10 transition border border-slate-200/60 dark:border-white/5"
            aria-label="Toggle theme"
            title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {/* Quick Access Button */}
          <button
            onClick={onOpenQuickAccess}
            className="flex h-9 items-center gap-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] px-3 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-white/10 transition border border-slate-200/60 dark:border-white/5"
            aria-label="Open Quick Access"
            title="Open Quick Access (Press Q)"
          >
            <Compass className="h-4 w-4 text-violet-500" />
            <span className="hidden xl:inline">Quick Access</span>
            <kbd className="rounded border border-slate-300 bg-slate-200/80 px-1 py-0.5 font-mono text-[10px] font-bold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              Q
            </kbd>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-white/[0.05] dark:text-slate-200 border border-slate-200/60 dark:border-white/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/95 shadow-xl transition-all">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Home Top
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
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
