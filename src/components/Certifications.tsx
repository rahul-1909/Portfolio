import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, Calendar } from 'lucide-react';
import { certificationsData } from '../data/certifications';

export const Certifications: React.FC = () => {
  const [providerFilter, setProviderFilter] = useState<string>('All');

  const providers = ['All', 'Microsoft', 'Amazon Web Services (AWS)', 'Anthropic'];

  const filteredCertifications = providerFilter === 'All'
    ? certificationsData
    : certificationsData.filter(c => c.issuer === providerFilter);

  return (
    <section id="certifications" className="py-20 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
              <Award className="h-3.5 w-3.5" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Official Certifications
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Formally verified credentials demonstrating practical knowledge across AI/ML operations, SQL development, cloud architecture, and LLM systems.
            </p>
          </div>

          {/* Provider Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 self-start md:self-auto">
            {providers.map((p) => (
              <button
                key={p}
                onClick={() => setProviderFilter(p)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  providerFilter === p
                    ? 'bg-accent-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {p === 'Amazon Web Services (AWS)' ? 'AWS' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid: 3 cols on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert) => (
            <div
              key={cert.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-xl hover:shadow-accent-500/5 hover:-translate-y-1 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-accent-500/30 dark:hover:bg-white/[0.04]"
            >
              <div>
                {/* Provider Tag & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold ${cert.badgeAccent.bgLight} ${cert.badgeAccent.bgDark} ${cert.badgeAccent.text} border ${cert.badgeAccent.border}`}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {cert.issuer}
                  </span>

                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    {cert.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {cert.title}
                </h3>

                {/* Dates if available */}
                {cert.issueDate && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3 w-3 text-accent-500" />
                    <span>Issued: {cert.issueDate}</span>
                    {cert.expirationDate && (
                      <span> · Exp: {cert.expirationDate}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Verification CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 px-4 text-xs font-bold text-slate-700 transition hover:border-accent-500/50 hover:bg-accent-50 hover:text-accent-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08] dark:hover:text-accent-400"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
