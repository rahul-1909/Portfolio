import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowUpRight, Lightbulb, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { tilEntries } from '../data/til';

export const TILPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const scrollToEntry = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="pt-28 pb-24 scroll-smooth">
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="mb-10 max-w-3xl">
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

          {/* Quick-Jump Smooth Scroll Anchor Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-accent-500" />
              Quick Jump:
            </span>
            {tilEntries.map((entry, idx) => (
              <button
                key={entry.id}
                onClick={() => scrollToEntry(entry.id)}
                className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-accent-500 hover:bg-accent-50/60 hover:text-accent-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-accent-500/50 dark:hover:text-white"
              >
                #{idx + 1} {entry.topic.split(' ')[0]}
              </button>
            ))}
          </div>
        </header>

        {/* Smooth Animated Timeline Layout */}
        <div className="relative max-w-4xl pl-6 sm:pl-10">
          {/* Continuous Vertical Glowing Spine */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-6 w-[2px] bg-gradient-to-b from-accent-500 via-blue-500/50 to-transparent" />

          <div className="space-y-8">
            {tilEntries.map((entry, idx) => {
              const isExpanded = expandedId === entry.id;

              return (
                <div
                  id={entry.id}
                  key={entry.id}
                  className="relative group transition-all duration-300 scroll-mt-28"
                >
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute -left-[30px] sm:-left-[39px] top-6 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border-2 border-accent-500 shadow-[0_0_12px_rgba(56,189,248,0.5)] group-hover:scale-125 transition-transform duration-300 z-10">
                    <span className="h-2 w-2 rounded-full bg-accent-400 animate-ping" />
                  </div>

                  {/* Card Content with Smooth Lift & Glow */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-2xl hover:shadow-accent-500/5 hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-accent-500/40">
                    {/* Top Row: Date, Entry Index & Source Project */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="rounded-md bg-accent-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-accent-600 dark:text-accent-400">
                          ENTRY #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <Calendar className="h-3.5 w-3.5 text-accent-500" />
                          <span>{entry.date}</span>
                        </div>
                      </div>

                      {entry.projectRef && (
                        <a
                          href={entry.projectRef.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-[#38bdf8] transition"
                        >
                          <span>Case Study: {entry.projectRef.name}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Topic Heading */}
                    <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                      {entry.topic}
                    </h2>

                    {/* Summary */}
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                      {entry.summary}
                    </p>

                    {/* Key Engineering Takeaway Callout */}
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-4 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                      <Lightbulb className="h-5 w-5 mt-0.5 text-amber-500 shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="font-bold text-amber-950 dark:text-amber-100 block mb-0.5">
                          Key Engineering Takeaway:
                        </strong>
                        <span>{entry.keyTakeaway}</span>
                      </div>
                    </div>

                    {/* Expandable Architecture Deep-Dive Toggle */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/[0.04] dark:text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleExpand(entry.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
                      >
                        <span>{isExpanded ? 'Less' : 'Details'}</span>
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    {/* Expanded Insight Panel */}
                    {isExpanded && (
                      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-700 dark:border-white/5 dark:bg-white/[0.02] dark:text-slate-300 animate-fadeIn">
                        <p className="font-semibold text-slate-900 dark:text-white mb-1">
                          Production Implementation Note:
                        </p>
                        <p className="leading-relaxed">
                          This insight is implemented and actively running in the <strong>{entry.projectRef?.name || 'verified portfolio projects'}</strong> codebase. You can explore the source code directly on GitHub or check the project modal for architecture breakdown.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
