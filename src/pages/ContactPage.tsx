import React, { useState } from 'react';
import { Mail, ExternalLink, Copy, Check } from 'lucide-react';
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
    <div className="pt-28 pb-24">
      <div className="content-wrapper max-w-4xl">
        {/* Page Top Indicator matching Arshad MQ */}
        <div className="mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
            WORK
          </span>
        </div>

        {/* Large Page Title */}
        <h1 className="text-4xl sm:text-6xl font-[1000] tracking-tight text-slate-900 dark:text-white mb-4">
          Contact
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-12">
          Get in touch with me anytime through social media or direct email.
        </p>

        {/* Content Area with subtle vertical left rule */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-200/80 dark:border-white/10 space-y-10">
          {/* Business purpose disclaimer notice */}
          <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            <p>
              Just a friendly reminder that the information provided here is for{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">
                business purposes only
              </strong>
              . If you have any questions, feel free to chat with me directly on my social media.
            </p>
            <p>
              I appreciate your understanding in using this responsibly.
            </p>
          </div>

          <hr className="border-slate-200/80 dark:border-white/10" />

          {/* Section: Contact */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
              Contact
            </h2>

            {/* Contact Details Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-[#1e2235] bg-white dark:bg-[#0c0d16] shadow-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 dark:border-[#1e2235] bg-slate-50 dark:bg-[#121422] text-xs font-bold text-slate-700 dark:text-slate-300">
                    <th className="py-3 px-4 sm:px-6 w-1/3">Contact</th>
                    <th className="py-3 px-4 sm:px-6">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-[#1e2235]/60 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-500 dark:text-slate-400">
                      Address
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 dark:text-slate-200">
                      {profileData.location}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-500 dark:text-slate-400">
                      Timezone
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-medium text-slate-900 dark:text-slate-200">
                      GMT+5.30
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-500 dark:text-slate-400">
                      E-mail Official
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={`mailto:${profileData.email}`}
                          className="inline-flex items-center gap-2 font-mono text-blue-600 dark:text-[#38bdf8] hover:underline"
                        >
                          <Mail className="h-4 w-4" />
                          <span>{profileData.email}</span>
                        </a>
                        <button
                          onClick={handleCopyEmail}
                          title="Copy Email"
                          className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white transition"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note below table */}
            <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              If you need any further information, such as my phone number, please do not hesitate to send me an email first.
            </p>
          </div>

          <hr className="border-slate-200/80 dark:border-white/10" />

          {/* Section: Social Media */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              Social Media
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Connect with me or follow my latest work across my primary profiles below.
            </p>

            {/* Social Media Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-[#1e2235] bg-white dark:bg-[#0c0d16] shadow-sm">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 dark:border-[#1e2235] bg-slate-50 dark:bg-[#121422] text-xs font-bold text-slate-700 dark:text-slate-300">
                    <th className="py-3 px-4 sm:px-6 w-1/3">Social Media</th>
                    <th className="py-3 px-4 sm:px-6">Profile URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-[#1e2235]/60 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 dark:text-slate-200">
                      LinkedIn
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <a
                        href={profileData.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 dark:text-[#38bdf8] hover:underline"
                      >
                        <span className="truncate">{profileData.socials.linkedin}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 dark:text-slate-200">
                      Twitter
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <a
                        href={profileData.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 dark:text-[#38bdf8] hover:underline"
                      >
                        <span className="truncate">{profileData.socials.twitter}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 dark:text-slate-200">
                      GitHub
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <a
                        href={profileData.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 dark:text-[#38bdf8] hover:underline"
                      >
                        <span className="truncate">{profileData.socials.github}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
