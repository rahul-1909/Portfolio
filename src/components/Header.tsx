import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/90 dark:bg-[#0a0a0f]/90 bg-white/90 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5 py-3 shadow-md'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="content-wrapper flex items-center justify-between">
        {/* Brand Logo (Arshad Style: square violet icon with slash + name.) */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-600 shadow-md shadow-accent-600/30 group-hover:scale-105 transition-transform">
            <div className="h-3.5 w-0.5 rotate-12 rounded-full bg-white"></div>
          </div>
          <div className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            <span>rahul</span>
            <span className="text-accent-500">.</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm">
          <Link
            to="/projects"
            className={`nav-link ${isActive('/projects') ? 'text-accent-500 font-semibold active' : ''}`}
          >
            Projects
          </Link>

          <Link
            to="/today-i-learned"
            className={`nav-link ${isActive('/today-i-learned') ? 'text-accent-500 font-semibold active' : ''}`}
          >
            T.I.L
          </Link>

          {/* Work Navigation Group matching reference */}
          <div className="flex items-center bg-slate-100/60 dark:bg-white/[0.04] rounded-xl px-2 py-0.5 border border-slate-200/50 dark:border-white/5">
            <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
              Work
              <span className="text-[10px]">▶</span>
            </span>

            <Link
              to="/work/skills-and-tools"
              className={`nav-link text-xs ${isActive('/work/skills-and-tools') ? 'text-accent-500 font-bold active' : ''}`}
            >
              Skills & Tools
            </Link>
            <span className="text-slate-300 dark:text-slate-700 text-xs">·</span>

            <Link
              to="/work/experience"
              className={`nav-link text-xs ${isActive('/work/experience') ? 'text-accent-500 font-bold active' : ''}`}
            >
              Experience
            </Link>
            <span className="text-slate-300 dark:text-slate-700 text-xs">·</span>

            <Link
              to="/work/certifications"
              className={`nav-link text-xs ${isActive('/work/certifications') ? 'text-accent-500 font-bold active' : ''}`}
            >
              Certifications
            </Link>
            <span className="text-slate-300 dark:text-slate-700 text-xs">·</span>

            <Link
              to="/work/contact"
              className={`nav-link text-xs ${isActive('/work/contact') ? 'text-accent-500 font-bold active' : ''}`}
            >
              Contact
            </Link>
          </div>
        </nav>

        {/* Right Action Icons: Twitter, GitHub, Divider, Quick Access, Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Social Icons */}
          <div className="hidden sm:flex items-center gap-1">
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noreferrer nofollow"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white transition"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer nofollow"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200/60 text-slate-700 hover:bg-slate-300/60 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-700/60 transition"
            aria-label="Toggle theme"
            title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {/* Quick Access Button with Q shortcut indicator */}
          <button
            onClick={onOpenQuickAccess}
            className="flex h-9 items-center gap-2 rounded-xl bg-slate-200/60 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-300/60 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-700/60 transition"
            aria-label="Open Quick Access"
            title="Open Quick Access (Press Q)"
          >
            <Compass className="h-4 w-4" />
            <span className="hidden xl:inline">Quick Access</span>
            <kbd className="rounded border border-slate-400 bg-slate-300 px-1 py-0.5 font-mono text-[10px] font-bold text-slate-700 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-300">
              Q
            </kbd>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-slate-200/60 text-slate-800 dark:bg-slate-800/60 dark:text-slate-200"
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
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Home Dashboard
            </Link>
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Projects
            </Link>
            <Link
              to="/today-i-learned"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Today I Learned (T.I.L)
            </Link>

            <div className="pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3">
              Work & Capabilities
            </div>
            <Link
              to="/work/skills-and-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Skills & Tools
            </Link>
            <Link
              to="/work/experience"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Experience
            </Link>
            <Link
              to="/work/certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Certifications
            </Link>
            <Link
              to="/work/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.05]"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
