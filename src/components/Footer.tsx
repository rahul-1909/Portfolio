import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/60 dark:border-white/5 py-10 bg-white/40 dark:bg-black/20 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Identity */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              {profileData.name}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Software Developer (Backend & AI/ML)
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            © {currentYear} Rahul Teja. Crafted with clean architecture & modern frontend engineering.
          </p>
        </div>

        {/* Links & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white transition"
              aria-label="X / Twitter"
            >
              <TwitterIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={profileData.socials.email}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 hover:text-accent-600 dark:hover:bg-slate-800 dark:hover:text-accent-400 transition"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-accent-500/50 hover:text-accent-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:text-accent-400 transition"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
