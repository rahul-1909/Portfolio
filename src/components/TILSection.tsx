import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  ArrowUpRight, 
  Lightbulb, 
  Tag 
} from 'lucide-react';
import { tilEntries } from '../data/til';

export const TILSection: React.FC = () => {
  return (
    <section id="til" className="py-24 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="content-wrapper max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3 border border-blue-500/20">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Engineering Logbook & Architecture Decisions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
            Today I Learned (T.I.L)
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Technical breakthroughs, distributed systems insights, and production incident post-mortems documented in the trenches.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-white/10 space-y-8 max-w-4xl">
          {tilEntries.map((entry, index) => {
            return (
              <div key={entry.id} className="relative group">
                {/* Glowing Node on Left Vertical Line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 dark:bg-[#0c0d16] border-2 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                </div>

                {/* Entry Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 sm:p-7 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-white hover:shadow-xl dark:border-white/5 dark:bg-[#0c0d16]/80 dark:hover:border-blue-500/30">
                  {/* Top Bar: Index & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-md bg-blue-500/10 px-2.5 py-1 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        DECISION #{index + 1}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5 text-blue-500" />
                        <span>{entry.date}</span>
                      </div>
                    </div>

                    {entry.projectRef && (
                      <a
                        href={entry.projectRef.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>{entry.projectRef.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {entry.topic}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {entry.summary}
                  </p>

                  {/* Key Takeaway Box */}
                  <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-50/50 p-4 dark:border-blue-500/15 dark:bg-blue-950/20">
                    <div className="flex items-start gap-2.5">
                      <Lightbulb className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block mb-0.5">
                          Architectural Takeaway
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                          "{entry.keyTakeaway}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                      >
                        <Tag className="h-3 w-3 text-slate-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
