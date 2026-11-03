import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative mt-24 border-t border-slate-200/60 dark:border-white/5 pt-16 text-sm text-slate-900 dark:text-slate-200">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-slate-100/50 via-white to-white dark:from-[#050508] dark:via-[#07070b] dark:to-[#07070b]" />

      <div className="content-wrapper max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-10 font-semibold">
          <div className="flex flex-col-reverse gap-16 lg:flex-row">
            {/* About Me Column */}
            <div className="flex-1">
              <div className="max-w-[380px]">
                <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  About Me
                </div>
                <p className="mb-5 text-[15px] font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                  I'm Rahul, a{" "}
                  <strong className="text-slate-800 dark:text-slate-200">
                    Software Developer focused on Backend Engineering & AI/ML
                  </strong>{" "}
                  who loves intuitive, clean and modern technology development and design.
                </p>

                {/* Social Icons */}
                <ul className="-ml-2 flex gap-1">
                  <li>
                    <a
                      href={profileData.socials.twitter}
                      target="_blank"
                      rel="noreferrer nofollow"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      aria-label="Twitter profile"
                    >
                      <TwitterIcon className="h-4 w-4" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={profileData.socials.github}
                      target="_blank"
                      rel="noreferrer nofollow"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      aria-label="GitHub profile"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={profileData.socials.linkedin}
                      target="_blank"
                      rel="noreferrer nofollow"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                      aria-label="LinkedIn profile"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="-mx-2 flex flex-1 flex-col gap-8 sm:flex-row sm:gap-16 lg:mx-0">
              <div className="flex sm:gap-16 w-full">
                {/* Work Column */}
                <div className="flex-1">
                  <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Portfolio
                  </div>
                  <ul className="flex flex-col text-sm space-y-1">
                    <li>
                      <button 
                        onClick={() => scrollToSection('contact')} 
                        className="footer-link px-2 text-left cursor-pointer hover:text-violet-500"
                      >
                        Contact
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => scrollToSection('experience')} 
                        className="footer-link px-2 text-left cursor-pointer hover:text-violet-500"
                      >
                        Experience & Credentials
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => scrollToSection('skills')} 
                        className="footer-link px-2 text-left cursor-pointer hover:text-violet-500"
                      >
                        Skills and Tools
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => scrollToSection('projects')} 
                        className="footer-link px-2 text-left cursor-pointer hover:text-violet-500"
                      >
                        Projects
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Learn Column */}
                <div className="flex-1">
                  <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Learn & Connect
                  </div>
                  <ul className="flex flex-col text-sm space-y-1">
                    <li>
                      <button 
                        onClick={() => scrollToSection('til')} 
                        className="footer-link px-2 text-left cursor-pointer hover:text-violet-500 flex items-center gap-1.5"
                      >
                        <span>T.I.L</span>
                        <span className="rounded bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-bold text-violet-600 dark:text-violet-400 border border-violet-500/20">
                          new
                        </span>
                      </button>
                    </li>
                    <li>
                      <a 
                        className="footer-link px-2 hover:text-violet-500" 
                        href="https://github.com/rahul-1909?tab=repositories" 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        GitHub Repositories
                      </a>
                    </li>
                    <li>
                      <a 
                        className="footer-link px-2 hover:text-violet-500" 
                        href={profileData.socials.linkedin} 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        LinkedIn Network
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 py-6 text-xs dark:border-white/5 gap-3">
          <div className="font-semibold text-slate-500 dark:text-slate-500">
            © {currentYear}, rahul-1909.github.io · Designed for High Performance
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <a
              href="https://github.com/rahul-1909/Portfolio"
              target="_blank"
              rel="noreferrer nofollow"
              className="hover:underline flex items-center gap-1.5"
            >
              <span>Built with React + Vite + TypeScript + Tailwind</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
