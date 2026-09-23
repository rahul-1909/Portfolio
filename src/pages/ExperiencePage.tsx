import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { experienceData } from '../data/experience';

export const ExperiencePage: React.FC = () => {
  const serviceLetterUrl = "https://drive.google.com/file/d/13vHdfLoxY705xedUs1SP6itxNkY2wXp-/view?usp=sharing";

  return (
    <div className="pt-28 pb-20">
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Professional Career History</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
            Experience
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Hands-on software development experience across backend architectures, full-stack workflows, API integration, and production-oriented engineering practices.
          </p>
        </header>

        {/* Experience Timeline */}
        <div className="space-y-8 max-w-4xl">
          {experienceData.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 backdrop-blur-md shadow-sm transition hover:border-accent-500/40 hover:shadow-xl dark:border-white/5 dark:bg-slate-900/60"
            >
              {/* Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 dark:border-white/5">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {item.company}
                    </h2>
                    <span className="rounded-full bg-accent-500/10 px-3 py-0.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {item.role}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-accent-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {item.summary}
              </p>

              {/* Responsibilities list */}
              <div className="mt-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Key Responsibilities & Engineering Highlights
                </h3>
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {item.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent-500 flex-shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Service / Experience Letter Verification Card */}
              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-4 dark:border-emerald-500/15 dark:bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
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
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Issued by Virtusa Consulting Services Pvt. Ltd. verifying tenure, designation, and project contributions.
                    </p>
                  </div>
                </div>

                <a
                  href={serviceLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  <FileText className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span>View Service Letter</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </div>

              {/* Technologies Pills */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mr-1">
                  Technologies:
                </span>
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
