import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { experienceData } from '../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Professional Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineering contributions & work history.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Hands-on software development experience across backend architectures, full-stack workflows, API integration, and production-oriented engineering practices.
          </p>
        </div>

        {/* Experience Timeline / Cards */}
        <div className="space-y-6">
          {experienceData.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl border border-slate-200/80 bg-white/70 p-6 sm:p-8 backdrop-blur-md shadow-sm transition hover:border-accent-500/40 hover:shadow-lg dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-accent-500/25"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 dark:border-white/5">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.company}
                    </h3>
                    <span className="rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {item.role}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                {item.summary}
              </p>

              {/* Responsibilities */}
              <div className="mt-6 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Key Responsibilities & Contributions
                </h4>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {item.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-accent-500 flex-shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Pills */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mr-1">
                  Stack:
                </span>
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-200/80 bg-slate-50/70 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
