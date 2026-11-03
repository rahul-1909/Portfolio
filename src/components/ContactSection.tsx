import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  MessageSquare 
} from 'lucide-react';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { CrowdCanvas } from './Skiper39';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative pt-24 pb-12 border-t border-slate-200/60 dark:border-white/5 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[450px] w-[600px] rounded-full bg-gradient-to-r from-violet-600/10 via-cyan-600/10 to-transparent blur-[140px] dark:from-violet-600/15 dark:via-cyan-600/15" />
      </div>

      <div className="content-wrapper max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 mb-4 border border-violet-500/20">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Direct Communications & Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-[1000] tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-300 dark:to-cyan-400">
              Exceptional.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you have an engineering role, an ambitious distributed backend architecture to design, or an AI research problem - my inbox is always open.
          </p>
        </div>

        {/* Central Obsidian Floating Glass Contact Dock */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-7 sm:p-10 backdrop-blur-xl shadow-2xl dark:border-white/10 dark:bg-[#0c0d16]/90 transition-all">
            
            {/* Top Status & Telemetry Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block">
                    Available for Full-Time Roles & Systems Work
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Typical response latency &lt; 4 hours
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-white/5">
                <Clock className="h-3.5 w-3.5 text-violet-500" />
                <span>IST (UTC+5:30) · {profileData.location.split(',')[0]}</span>
              </div>
            </div>

            {/* Email Action Box */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-violet-500/[0.05] via-transparent to-cyan-500/[0.05] p-5 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/30">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-white transition hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700 hover:shadow-violet-600/40"
                >
                  <span>Compose</span>
                  <Send className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect Directly
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition"
                >
                  <LinkedinIcon className="h-4 w-4 text-blue-500" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profileData.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 transition"
                >
                  <TwitterIcon className="h-4 w-4 text-sky-400" />
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Skiper39 Animated Crowd Walk Cycle Base Layer */}
        <div className="relative w-full max-w-5xl mx-auto mt-6 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-white/5 bg-slate-100/40 dark:bg-white/[0.01]">
          <div className="absolute top-2 left-4 z-20 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              Live Network Pulse · Powered by Skiper39 Crowd Engine
            </span>
          </div>

          <CrowdCanvas
            src="/images/peeps/all-peeps.png"
            rows={15}
            cols={7}
            className="w-full h-40 sm:h-52 select-none"
          />

          {/* Bottom fade mask into page boundary */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
        </div>

      </div>
    </section>
  );
};
