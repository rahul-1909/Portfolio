import React, { useState } from 'react';
import { ExternalLink, Check, Copy } from 'lucide-react';
import { certificationsData } from '../data/certifications';

export const CertificationsPage: React.FC = () => {
  const [providerFilter, setProviderFilter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const providers = ['All', 'Microsoft', 'Amazon Web Services (AWS)', 'Anthropic'];

  const filteredCertifications =
    providerFilter === 'All'
      ? certificationsData
      : certificationsData.filter((c) => c.issuer === providerFilter);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <header className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
            <span>GET /work/certifications</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-text-light dark:text-text-dark tracking-display">
            Verified Credentials
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Formally accredited credentials across AI/ML operations, SQL intelligence, enterprise cloud architecture, and LLM reasoning.
          </p>
        </header>

        {/* Provider Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-border-light dark:border-border-dark font-mono text-xs">
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setProviderFilter(p)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                providerFilter === p
                  ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
                  : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Certifications List */}
        <div className="flex flex-col space-y-6">
          {filteredCertifications.map((cert) => (
            <article
              key={cert.id}
              className="p-6 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                  <span className="text-accent-light dark:text-accent-dark uppercase tracking-wider font-semibold">
                    {cert.issuer}
                  </span>
                  <span className="text-text-mutedLight dark:text-text-mutedDark">•</span>
                  <span className="text-text-mutedLight dark:text-text-mutedDark">
                    {cert.category}
                  </span>
                </div>

                {cert.issueDate && (
                  <span className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark">
                    Issued {cert.issueDate}
                  </span>
                )}
              </div>

              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-text-light dark:text-text-dark mb-2">
                {cert.title}
              </h2>

              <p className="text-sm sm:text-base text-text-secondaryLight dark:text-text-secondaryDark max-w-3xl leading-relaxed mb-4">
                {cert.description}
              </p>

              {/* Verified Skills & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border-light dark:border-border-dark font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {cert.credentialId && (
                    <button
                      onClick={() => handleCopyCode(cert.credentialId!)}
                      className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-text-light dark:hover:text-text-dark transition-colors"
                    >
                      {copiedId === cert.credentialId ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span>ID Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  )}

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent-light dark:text-accent-dark hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
