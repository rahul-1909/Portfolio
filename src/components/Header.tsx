import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Compass, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenQuickAccess: () => void;
  onOpenResume?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuickAccess, onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Work', path: '/projects' },
    { label: 'Experience', path: '/work/experience' },
    { label: 'Stack', path: '/work/skills-and-tools' },
    { label: 'Certifications', path: '/work/certifications' },
    { label: 'Changelog', path: '/today-i-learned' },
    { label: 'Contact', path: '/work/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark py-3'
          : 'bg-background-light/60 dark:bg-background-dark/60 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-mono text-sm tracking-wide text-text-light dark:text-text-dark group"
          aria-label="Rahul Teja Homepage"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark text-accent-light dark:text-accent-dark font-bold text-xs transition-colors group-hover:border-accent-borderLight dark:group-hover:border-accent-borderDark">
            RT
          </span>
          <span className="font-semibold tracking-tight text-text-light dark:text-text-dark">
            rahulteja<span className="text-accent-light dark:text-accent-dark">.me</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-1 transition-colors ${
                isActive(link.path)
                  ? 'text-accent-light dark:text-accent-dark font-semibold'
                  : 'text-text-mutedLight dark:text-text-mutedDark hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-light dark:bg-accent-dark" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions (Resume, Theme, Quick Access, Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Resume Action */}
          {onOpenResume ? (
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-border-strongLight dark:border-border-strongDark bg-surface-elevatedLight dark:bg-surface-elevatedDark text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              aria-label="View Resume"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
              <span className="text-[10px]">↗</span>
            </button>
          ) : (
            <a
              href="#resume"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-border-strongLight dark:border-border-strongDark bg-surface-elevatedLight dark:bg-surface-elevatedDark text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              aria-label="View Resume"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-light dark:border-border-dark bg-surface-elevatedLight dark:bg-surface-elevatedDark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-300" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Quick Access Modal Trigger */}
          <button
            onClick={onOpenQuickAccess}
            className="hidden md:flex h-8 items-center gap-1.5 px-2.5 text-xs font-mono rounded-md border border-border-light dark:border-border-dark bg-surface-elevatedLight dark:bg-surface-elevatedDark text-text-mutedLight dark:text-text-mutedDark hover:text-text-light dark:hover:text-text-dark transition-colors"
            aria-label="Open Quick Access"
            title="Open Quick Access (Press Q)"
          >
            <Compass className="h-3.5 w-3.5" />
            <kbd className="px-1 py-0.2 rounded border border-border-strongLight dark:border-border-strongDark bg-surface-light dark:bg-surface-dark text-[10px]">
              Q
            </kbd>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-md border border-border-light dark:border-border-dark bg-surface-elevatedLight dark:bg-surface-elevatedDark text-text-light dark:text-text-dark"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-6 py-5 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-3 font-mono text-sm" aria-label="Mobile Navigation">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${isActive('/') ? 'text-accent-light dark:text-accent-dark font-semibold' : 'text-text-secondaryLight dark:text-text-secondaryDark'}`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 ${isActive(link.path) ? 'text-accent-light dark:text-accent-dark font-semibold' : 'text-text-secondaryLight dark:text-text-secondaryDark'}`}
              >
                {link.label}
              </Link>
            ))}
            {onOpenResume && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="py-1 text-left text-accent-light dark:text-accent-dark font-semibold"
              >
                Resume ↗
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
