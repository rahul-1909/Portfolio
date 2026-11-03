import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Copy, 
  Check 
} from 'lucide-react';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';

export const ExperienceSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [providerFilter, setProviderFilter] = useState<string>('All');
  const serviceLetterUrl = "https://drive.google.com/file/d/13vHdfLoxY705xedUs1SP6itxNkY2wXp-/view?usp=sharing";

  const providers = ['All', 'Microsoft', 'Amazon Web Services (AWS)', 'Anthropic'];

  const filteredCertifications = providerFilter === 'All'
    ? certificationsData
    : certificationsData.filter(c => c.issuer === providerFilter);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="experience" className="py-24 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="content-wrapper max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 border border-emerald-500/20">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Commercial Tenure & Formal Accreditations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
            Experience & Credentials
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Enterprise software engineering tenure at Virtusa paired with formal cloud, MLOps, and LLM accreditations.
          </p>
        </div>

        {/* Part 1: Commercial Experience Timeline */}
        <div className="space-y-8 mb-20">
          {experienceData.map((item) => (
            <div
              key={item.id}
              className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-10 backdrop-blur-md shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-xl dark:border-white/5 dark:bg-[#0c0d16]/80"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 dark:border-white/5">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-[900] text-slate-900 dark:text-white">
                      {item.company}
                    </h3>
                    <span className="rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {item.role}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg font-mono">
                    <Calendar className="h-4 w-4 text-emerald-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {item.summary}
              </p>

              {/* Responsibilities list */}
              <div className="mt-8 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Key Responsibilities & Architectural Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {item.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] p-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-white/5">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Service / Experience Letter Verification Card */}
              <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 dark:border-emerald-500/20 dark:bg-emerald-500/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        Official Virtusa Service & Experience Letter
                      </span>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Issued by Virtusa Consulting Services Pvt. Ltd. verifying tenure, designation, and project engineering contributions.
                    </p>
                  </div>
                </div>

                <a
                  href={serviceLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-emerald-600/30"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>View Official Letter</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Formally Verified Certifications Vault */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2.5">
              <Award className="h-5 w-5 text-amber-500" />
              <h3 className="text-xl sm:text-2xl font-[900] text-slate-900 dark:text-white">
                Verified Credentials Vault
              </h3>
            </div>

            {/* Provider Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              {providers.map((p) => (
                <button
                  key={p}
                  onClick={() => setProviderFilter(p)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                    providerFilter === p
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {p === 'Amazon Web Services (AWS)' ? 'AWS' : p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 hover:bg-white hover:shadow-xl hover:-translate-y-1 dark:border-white/5 dark:bg-[#0c0d16]/80 dark:hover:border-amber-500/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${cert.badgeAccent.bgLight} ${cert.badgeAccent.bgDark} ${cert.badgeAccent.text} border ${cert.badgeAccent.border}`}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {cert.issuer}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {cert.category}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {cert.title}
                  </h4>

                  <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                  {cert.credentialId && (
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]">
                        ID: {cert.credentialId}
                      </span>
                      <button
                        onClick={() => handleCopyCode(cert.credentialId!)}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:opacity-80"
                      >
                        {copiedId === cert.credentialId ? (
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
                  )}

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
