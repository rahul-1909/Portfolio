import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-slate-200/60 dark:border-slate-800/60 pt-16 text-sm text-slate-900 dark:text-slate-200">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-slate-50/80 via-white to-white dark:from-[#0d1117] dark:via-[#0a0a0f] dark:to-[#0a0a0f]" />

      <div className="content-wrapper relative z-10">
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
                    Work
                  </div>
                  <ul className="flex flex-col text-sm">
                    <li>
                      <Link className="footer-link px-2" to="/work/contact">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-link px-2" to="/work/experience">
                        Experience
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-link px-2" to="/work/certifications">
                        Certifications
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-link px-2" to="/work/skills-and-tools">
                        Skills and Tools
                      </Link>
                    </li>
                    <li>
                      <Link className="footer-link px-2" to="/projects">
                        Projects
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Learn Column */}
                <div className="flex-1">
                  <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Learn
                  </div>
                  <ul className="flex flex-col text-sm">
                    <li>
                      <Link className="footer-link px-2 flex items-center gap-1.5" to="/today-i-learned">
                        <span>T.I.L</span>
                        <span className="rounded bg-accent-500/10 px-1.5 py-0.5 text-[10px] font-bold text-accent-600 dark:text-accent-400">
                          new
                        </span>
                      </Link>
                    </li>
                    <li>
                      <a 
                        className="footer-link px-2" 
                        href="https://github.com/rahul-1909?tab=repositories" 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        GitHub Repositories
                      </a>
                    </li>
                    <li>
                      <a 
                        className="footer-link px-2" 
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
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 py-6 text-xs dark:border-slate-800/60 gap-3">
          <div className="font-semibold text-slate-500 dark:text-slate-500">
            © {currentYear}, rahul-1909.github.io
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            <a
              href="https://github.com/rahul-1909/Portfolio"
              target="_blank"
              rel="noreferrer nofollow"
              className="hover:underline flex items-center gap-1.5"
            >
              <span>see the recent update on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
