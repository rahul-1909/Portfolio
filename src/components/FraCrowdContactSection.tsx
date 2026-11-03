import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Clock, 
  MessageSquare,
  FileText
} from 'lucide-react';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { CrowdCanvas } from './Skiper39';

interface FraCrowdContactSectionProps {
  onOpenResume: () => void;
}

export const FraCrowdContactSection: React.FC<FraCrowdContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full bg-white text-black border-t-2 border-black overflow-hidden notebook-paper">
      
      {/* Top Contact Station */}
      <div className="content-wrapper max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-black px-4 py-1 doodle-box-sm font-mono text-xs font-[1000] uppercase tracking-wider mb-4 shadow-[3px_3px_0px_#000]">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>JOIN THE CROWD · PULL UP A CHAIR</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-[1000] tracking-tight text-black uppercase leading-[0.95]">
            Let's Talk Shop.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-black/75 max-w-lg mx-auto font-medium leading-relaxed">
            Whether you have a high-impact engineering role, an ambitious backend architecture to design, or want to discuss multi-agent AI systems.
          </p>
        </div>

        {/* Central Hand-Drawn Contact Station Card */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="bg-white p-7 sm:p-9 doodle-box shadow-[6px_8px_0px_0px_#000]">
            
            {/* Top Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse border border-black" />
                <div>
                  <span className="font-mono text-xs font-[1000] uppercase tracking-wider text-black block">
                    Available for Full-Time Roles
                  </span>
                  <span className="font-mono text-[11px] text-black/60 font-semibold">
                    Typical response latency &lt; 4 hours
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-bold text-black bg-neutral-100 px-3 py-1.5 rounded-lg border border-black/30">
                <Clock className="h-3.5 w-3.5" />
                <span>IST (UTC+5:30) · Hyderabad</span>
              </div>
            </div>

            {/* Email Box */}
            <div className="mt-6 p-5 sm:p-6 bg-[#FFFBEB] doodle-box-sm border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[3px_3px_0px_#000]">
              <div>
                <span className="font-mono text-[10px] font-bold text-black/60 uppercase block">
                  Official Email
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-lg sm:text-xl font-mono font-[1000] text-black hover:underline"
                >
                  {profileData.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 bg-white font-mono text-xs font-[1000] uppercase doodle-btn"
                >
                  {copiedEmail ? (
                    <span className="text-emerald-700 flex items-center gap-1 font-bold">
                      <Check className="h-3.5 w-3.5" /> Copied! 🎉
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </span>
                  )}
                </button>

                <a
                  href={`mailto:${profileData.email}`}
                  className="px-4 py-2 bg-black text-white font-mono text-xs font-[1000] uppercase doodle-btn flex items-center gap-1.5"
                >
                  <span>Compose</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Resume & Social Links */}
            <div className="mt-6 pt-5 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onOpenResume}
                className="px-4 py-2 bg-[#FFE600] border-2 border-black font-mono text-xs font-[1000] uppercase doodle-btn flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Verified Resume</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white doodle-box-sm shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>

                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white doodle-box-sm shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>

                <a
                  href={profileData.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white doodle-box-sm shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-100 transition"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* The Animated Skiper UI Crowd Canvas walking directly beneath the contact station */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] pointer-events-none border-t-2 border-black/10 select-none">
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="w-full h-full"
        />
      </div>

    </section>
  );
};
