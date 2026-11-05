import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { profileData } from '../data/profile';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="pt-28 pb-32">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Page Top Indicator */}
        <header className="mb-14 max-w-4xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
            <span>POST /work/contact</span>
          </div>

          <h1 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-display text-text-light dark:text-text-dark mb-6">
            Let's build something.
          </h1>

          <p className="text-base sm:text-xl text-text-secondaryLight dark:text-text-secondaryDark max-w-2xl leading-relaxed">
            I am available for backend engineering, AI/ML pipelines, and distributed systems opportunities. Reach out via direct email or any professional channel.
          </p>
        </header>

        {/* Channels */}
        <div className="flex flex-col space-y-12 max-w-3xl">
          {/* Direct Email Card */}
          <div className="p-8 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
            <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider mb-3">
              Direct Inquiries
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <a
                href={profileData.socials.email}
                className="font-mono text-xl sm:text-2xl md:text-3xl text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors inline-flex items-center gap-2"
              >
                <span>{profileData.email}</span>
                <span>↗</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-md border border-border-strongLight dark:border-border-strongDark bg-surface-elevatedLight dark:bg-surface-elevatedDark text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark transition-colors self-start sm:self-auto"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Connected Networks */}
          <div>
            <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider mb-4">
              Professional Networks
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
                    LinkedIn
                  </div>
                  <div className="text-[11px] text-text-mutedLight dark:text-text-mutedDark mt-0.5">
                    in/nallarahulteja
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              </a>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
                    GitHub
                  </div>
                  <div className="text-[11px] text-text-mutedLight dark:text-text-mutedDark mt-0.5">
                    rahul-1909
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              </a>

              <a
                href={profileData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
                    X / Twitter
                  </div>
                  <div className="text-[11px] text-text-mutedLight dark:text-text-mutedDark mt-0.5">
                    @Knightswatch__
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              </a>
            </div>
          </div>

          {/* Location & Timezone Details */}
          <div className="pt-6 border-t border-border-light dark:border-border-dark font-mono text-xs text-text-mutedLight dark:text-text-mutedDark flex flex-wrap gap-6">
            <div>
              <span className="text-text-secondaryLight dark:text-text-secondaryDark">Location: </span>
              <span>{profileData.location}</span>
            </div>
            <div>
              <span className="text-text-secondaryLight dark:text-text-secondaryDark">Timezone: </span>
              <span>{profileData.timezone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
