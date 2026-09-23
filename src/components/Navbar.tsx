import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Compass
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

interface NavbarProps {
  onOpenQuickAccess: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuickAccess, onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'T.I.L.', href: '#til' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-2.5"
          aria-label="Rahul Teja Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-600 text-white shadow-md shadow-accent-600/30 transition group-hover:scale-105">
            <span className="font-extrabold text-sm font-mono tracking-tighter">R</span>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
            rahul<span className="text-accent-500">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 transition hover:text-accent-600 dark:hover:text-accent-400 hover:bg-slate-100/60 dark:hover:bg-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Socials */}
        <div className="flex items-center gap-2">
          {/* Social Icons (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 border-r border-slate-200 pr-2 mr-1 dark:border-white/10">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.1] transition"
            aria-label="Toggle theme"
            title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {/* Quick Access Button with Q shortcut indicator */}
          <button
            onClick={onOpenQuickAccess}
            className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 text-xs font-semibold text-slate-700 hover:border-accent-500/50 hover:text-accent-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.1] dark:hover:text-accent-400 transition shadow-sm"
            aria-label="Open Quick Access"
            title="Open Quick Access (Press Q)"
          >
            <Compass className="h-4 w-4 text-accent-500" />
            <span className="hidden sm:inline">Quick Access</span>
            <kbd className="hidden sm:inline-block rounded border border-slate-300 bg-slate-100 px-1 py-0.2 text-[10px] font-mono font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              Q
            </kbd>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0e0e16]/95 transition-all">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-accent-600 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-accent-400"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-100 pt-3 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="text-xs font-semibold text-accent-600 dark:text-accent-400"
              >
                View CV / Resume →
              </button>
              <div className="flex gap-3 text-slate-500">
                <a href={profileData.socials.github} target="_blank" rel="noreferrer"><GithubIcon className="h-4 w-4" /></a>
                <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon className="h-4 w-4" /></a>
                <a href={profileData.socials.twitter} target="_blank" rel="noreferrer"><TwitterIcon className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
