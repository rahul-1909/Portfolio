import React from 'react';
import { BookOpen, Calendar, ArrowUpRight, Lightbulb } from 'lucide-react';
import { tilEntries } from '../data/til';

export const TIL: React.FC = () => {
  return (
    <section id="til" className="py-20 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Continuous Knowledge Log</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            T.I.L. - Today I Learned
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            An engineering journal documenting technical architecture decisions, system edge-cases, and practical insights discovered while building distributed backend and agentic AI systems.
          </p>
        </div>

        {/* Timeline Entries */}
        <div className="space-y-6">
          {tilEntries.map((entry) => (
            <div
              key={entry.id}
              className="relative rounded-2xl border border-slate-200/80 bg-white/70 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-lg dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-accent-500/30 dark:hover:bg-white/[0.04]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-white/5">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-600 dark:text-accent-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{entry.date}</span>
                </div>

                {entry.projectRef && (
                  <a
                    href={entry.projectRef.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400 transition"
                  >
                    <span>From: {entry.projectRef.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {/* Topic Heading */}
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                {entry.topic}
              </h3>

              {/* Summary */}
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {entry.summary}
              </p>

              {/* Key Takeaway Callout */}
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-3 text-xs text-amber-900 dark:text-amber-200">
                <Lightbulb className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="font-semibold text-amber-950 dark:text-amber-100">Key Engineering Takeaway: </strong>
                  {entry.keyTakeaway}
                </span>
              </div>

              {/* Tech Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/[0.04] dark:text-slate-400"
                  >
                    #{tag}
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
