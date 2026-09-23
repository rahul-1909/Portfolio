import React, { useEffect, useState } from 'react';
import { 
  X, 
  Moon, 
  Sun, 
  FileText, 
  Mail, 
  Layers, 
  Briefcase, 
  Award, 
  BookOpen, 
  Send, 
  Check, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

interface QuickAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const QuickAccessModal: React.FC<QuickAccessModalProps> = ({ isOpen, onClose, onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'q' || e.key === 'Q') &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks = [
    { label: 'Projects', href: '#projects', icon: Layers, desc: '6 production applications & live demos' },
    { label: 'Experience', href: '#experience', icon: Briefcase, desc: 'Virtusa internship & achievements' },
    { label: 'Skills & Tools', href: '#skills', icon: Compass, desc: 'Languages, backend, AI/ML & databases' },
    { label: 'Certifications', href: '#certifications', icon: Award, desc: 'Microsoft, AWS & Anthropic credentials' },
    { label: 'Today I Learned', href: '#til', icon: BookOpen, desc: 'Engineering insights & architecture logs' },
    { label: 'Contact', href: '#contact', icon: Send, desc: 'Get in touch & direct channels' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-all dark:border-white/10 dark:bg-[#12121a]/95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Quick Access</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Command & navigation center</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Actions Row */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-left transition hover:border-accent-500/40 hover:bg-accent-50/50 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-accent-950/30"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
              <span className="text-[10px] text-slate-500">Toggle theme</span>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenResume();
            }}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-left transition hover:border-accent-500/40 hover:bg-accent-50/50 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-accent-950/30"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">Resume</span>
              <span className="text-[10px] text-slate-500">View / Download</span>
            </div>
          </button>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-left transition hover:border-accent-500/40 hover:bg-accent-50/50 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-accent-950/30 col-span-2 sm:col-span-1"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              {copiedEmail ? <Check className="h-4 w-4 text-emerald-500" /> : <Mail className="h-4 w-4" />}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                {copiedEmail ? 'Copied!' : 'Copy Email'}
              </span>
              <span className="truncate text-[10px] text-slate-500">nrahulteja@outlook.com</span>
            </div>
          </button>
        </div>

        {/* Section Navigation List */}
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigate to Section
          </p>
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-slate-400 group-hover:text-accent-500 dark:text-slate-500" />
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent-600 dark:group-hover:text-accent-400">
                        {item.label}
                      </span>
                      <span className="hidden text-xs text-slate-400 sm:inline sm:ml-2">
                        — {item.desc}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* External Social Channels */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
          <div className="flex items-center gap-1">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              title="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              title="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              title="X / Twitter"
            >
              <TwitterIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Press</span>
            <kbd className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Q
            </kbd>
            <span>or</span>
            <kbd className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              ESC
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
