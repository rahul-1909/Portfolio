import React from 'react';
import { BookOpen, Calendar, ArrowUpRight, Lightbulb } from 'lucide-react';
import { tilEntries } from '../data/til';

export const TILPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Continuous Knowledge Log</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
            Today I Learned (T.I.L.)
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            An engineering journal documenting technical architecture decisions, system edge-cases, and practical insights discovered while building distributed backend and agentic AI systems.
          </p>
        </header>

        {/* Timeline Entries */}
        <div className="space-y-6 max-w-4xl">
          {tilEntries.map((entry) => (
            <div
              key={entry.id}
              className="relative rounded-2xl border border-slate-200/80 bg-white/80 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-xl dark:border-white/5 dark:bg-slate-900/60 dark:hover:border-accent-500/30"
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
              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                {entry.topic}
              </h2>

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
    </div>
  );
};
