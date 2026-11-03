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

interface DoodleConnectProps {
  onOpenResume: () => void;
}

export const DoodleConnect: React.FC<DoodleConnectProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="connect" className="pt-24 pb-8 bg-white text-black relative overflow-hidden">
      <div className="content-wrapper max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-widest mb-4">
            <MessageSquare className="h-3.5 w-3.5 text-amber-300" />
            <span>THE FINAL STOP · PULL UP A CHAIR</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-[1000] tracking-tight text-black uppercase leading-none">
            Let's Talk Shop.
          </h2>

          <p className="mt-4 text-base text-black/75 max-w-xl mx-auto font-medium leading-relaxed">
            Whether you have a high-impact engineering role, an ambitious backend architecture to solve, or want to discuss multi-agent systems.
          </p>
        </div>

        {/* Central Hand-Drawn Speech Bubble Contact Card */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="relative rounded-3xl border-2 border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            
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
            <div className="mt-8 rounded-2xl bg-neutral-50 p-6 border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="font-mono text-xs font-bold text-black/60 uppercase block">
                  Direct Inquiries
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
                  className="px-4 py-2 rounded-xl border-2 border-black bg-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition"
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 transition"
                >
                  <span>Compose</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Action Buttons & Socials */}
            <div className="mt-8 pt-6 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-200 border-2 border-black font-mono text-xs font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 transition"
              >
                <FileText className="h-4 w-4" />
                <span>Grab Official Resume</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-black bg-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-black bg-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profileData.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-black bg-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition"
                >
                  <TwitterIcon className="h-4 w-4" />
                  <span>X</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
