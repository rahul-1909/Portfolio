import React from 'react';
import { CrowdCanvas } from './Skiper39';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="crowd" className="relative w-full bg-white text-black border-t-2 border-black overflow-hidden select-none">
      
      {/* Top Header Tag matching the exact Skiper-UI reference */}
      <div className="pt-12 sm:pt-16 pb-4 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="font-mono text-xs sm:text-sm tracking-[0.4em] text-black font-bold uppercase">
          <div>CROWD</div>
          <div>CANVAS</div>
        </div>
        {/* Delicate vertical hairline from reference */}
        <div className="w-[1px] h-10 bg-black/30 my-3" />
      </div>

      {/* The Full-Bleed Edge-to-Edge Crowd Canvas Stage */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] pointer-events-none">
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="w-full h-full"
        />
      </div>

      {/* Clean, Professional Bottom Bar (Zero Framework/Library Credits) */}
      <div className="border-t-2 border-black bg-white py-5 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="font-mono text-xs font-bold text-black uppercase tracking-wider">
          © {currentYear} Rahul Teja · All rights reserved.
        </div>

        {/* Minimal Social Links & Direct Email */}
        <div className="flex items-center gap-4">
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border-2 border-black bg-white hover:bg-neutral-100 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border-2 border-black bg-white hover:bg-neutral-100 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <a
            href={profileData.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border-2 border-black bg-white hover:bg-neutral-100 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Twitter / X"
          >
            <TwitterIcon className="h-4 w-4" />
          </a>

          <a
            href={`mailto:${profileData.email}`}
            className="font-mono text-xs font-bold text-black hover:underline ml-2"
          >
            {profileData.email}
          </a>
        </div>
      </div>

    </footer>
  );
};
