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

interface DoodleCoffeeConnectProps {
  onOpenResume: () => void;
}

export const DoodleCoffeeConnect: React.FC<DoodleCoffeeConnectProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="connect" className="py-24 bg-white text-black relative notebook-paper">
      <div className="content-wrapper max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-black px-3.5 py-1 doodle-box-sm font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_0px_#000]">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>PULL UP A CHAIR · DIRECT INQUIRIES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-[1000] tracking-tight text-black uppercase leading-none">
            Let's Talk Shop.
          </h2>

          <p className="mt-4 text-base text-black/75 max-w-lg mx-auto font-medium leading-relaxed">
            Whether you have an engineering role, an ambitious backend architecture to solve, or want to discuss multi-agent AI systems.
          </p>
        </div>

        {/* Central Hand-Drawn Contact Card */}
        <div className="max-w-2xl mx-auto relative">
          <div className="bg-white p-8 sm:p-10 doodle-box shadow-[6px_8px_0px_0px_#000]">
            
            {/* Top Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse border border-black" />
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black block">
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
            <div className="mt-8 p-6 bg-neutral-50 doodle-box-sm border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] font-bold text-black/60 uppercase block">
                  Official Email
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-lg sm:text-xl font-mono font-bold text-black hover:underline"
                >
                  {profileData.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 bg-white font-mono text-xs font-bold doodle-btn"
                >
                  {copiedEmail ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </span>
                  )}
                </button>

                <a
                  href={`mailto:${profileData.email}`}
                  className="px-4 py-2 bg-black text-white font-mono text-xs font-bold doodle-btn flex items-center gap-1.5"
                >
                  <span>Compose</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Resume & Social Links */}
            <div className="mt-8 pt-6 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onOpenResume}
                className="px-4 py-2 bg-yellow-200 border-2 border-black font-mono text-xs font-bold doodle-btn flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Grab Official Resume</span>
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
    </section>
  );
};
