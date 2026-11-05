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
    <footer className="relative bg-white text-black border-t-2 border-black pt-16 pb-12">
      <div className="content-wrapper max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b-2 border-black">
          
          {/* Left: Bio / Info */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white font-mono text-xs font-bold border-2 border-black">
                RT
              </div>
              <span className="font-[1000] text-lg uppercase tracking-tight text-black">
                Rahul Teja
              </span>
            </div>

            <p className="text-sm text-black/75 font-medium leading-relaxed mb-6">
              Software Developer building distributed backend services, asynchronous APIs, and autonomous AI agents. Based in Hyderabad, India.
            </p>

            <div className="flex items-center gap-2">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>

              <a
                href={profileData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex flex-wrap gap-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60 block mb-4">
                The Canvas Navigation
              </span>
              <ul className="space-y-2 font-mono text-xs font-bold uppercase tracking-wider">
                <li>
                  <button onClick={() => scrollToSection('stage')} className="hover:underline">
                    01. Full Crowd Stage
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('story')} className="hover:underline">
                    02. Comic Odyssey
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('workbench')} className="hover:underline">
                    03. The Workbench
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('stack')} className="hover:underline">
                    04. The Tool Chest
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('connect')} className="hover:underline">
                    05. Connect & Chat
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60 block mb-4">
                Verified Credentials
              </span>
              <ul className="space-y-2 font-mono text-xs font-medium text-black/80">
                <li>Virtusa Associate Engineer Tenure</li>
                <li>Microsoft Certified MLOps Associate</li>
                <li>AWS Cloud Practitioner</li>
                <li>Anthropic Claude 101</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-black/60 font-semibold">
          <span>© {currentYear} Rahul Teja · Hand-Drawn Doodle & Skiper39 Crowd Engine</span>
          <span>Built with OpenPeeps · React · Vite · TypeScript</span>
        </div>
      </div>
    </footer>
  );
};
