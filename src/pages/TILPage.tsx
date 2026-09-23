import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Calendar, ArrowUpRight, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { tilEntries } from '../data/til';

interface TimelineCardProps {
  entry: typeof tilEntries[0];
  index: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ entry, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entryItem]) => {
        if (entryItem.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      id={entry.id}
      className={`relative w-full mb-12 sm:mb-16 md:mb-20 scroll-mt-32 flex flex-col md:flex-row ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      {/* Center Node on the middle line (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0f] border-2 border-accent-500 shadow-[0_0_16px_rgba(56,189,248,0.6)]">
          <span className="h-2 w-2 rounded-full bg-accent-400 animate-ping" />
        </div>
      </div>

      {/* Mobile Node on the left line */}
      <div className="md:hidden absolute -left-[27px] top-6 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0f] border-2 border-accent-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-ping" />
      </div>

      {/* Alternating Card: Left on even, Right on odd */}
      <div
        className={`w-full md:w-[calc(50%-2.5rem)] transform transition-all duration-700 ease-out ${
          isVisible
            ? 'opacity-100 scale-100 translate-y-0 translate-x-0'
            : isLeft
            ? 'opacity-0 scale-90 -translate-x-8 translate-y-12'
            : 'opacity-0 scale-90 translate-x-8 translate-y-12'
        }`}
      >
        <div className="group rounded-2xl border border-slate-200/80 bg-white/80 p-6 sm:p-7 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-accent-500/50 hover:bg-white hover:shadow-2xl hover:shadow-accent-500/10 hover:-translate-y-1 dark:border-white/10 dark:bg-[#0e101f]/90 dark:hover:border-accent-500/50">
          {/* Top Row: Entry Index & Date */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-accent-500/10 px-2.5 py-1 font-mono text-xs font-bold text-accent-600 dark:text-accent-400">
                ENTRY #{index + 1}
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
                <span>{entry.projectRef.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {/* Topic Title */}
          <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {entry.topic}
          </h2>

          {/* Summary */}
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {entry.summary}
          </p>

          {/* Key Takeaway Callout */}
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-4 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <Lightbulb className="h-5 w-5 mt-0.5 text-amber-500 shrink-0" />
            <div className="leading-relaxed">
              <strong className="font-bold text-amber-950 dark:text-amber-100 block mb-0.5">
                Key Engineering Takeaway:
              </strong>
              <span>{entry.keyTakeaway}</span>
            </div>
          </div>

          {/* Footer Tags & Details Toggle */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
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
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
            >
              <span>{isExpanded ? 'Less' : 'Details'}</span>
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Expanded Implementation Details */}
          {isExpanded && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-700 dark:border-white/5 dark:bg-white/[0.02] dark:text-slate-300 animate-fadeIn">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Production Implementation Context:
              </p>
              <p className="leading-relaxed">
                Applied and validated in the <strong>{entry.projectRef?.name || 'distributed system'}</strong> repository. Evaluated under edge conditions for memory overhead, failover tolerance, and determinism.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TILPage: React.FC = () => {
  return (
    <div className="pt-28 pb-28 scroll-smooth">
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="mb-14 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3.5 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Continuous Knowledge Log</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
            Today I Learned (T.I.L.)
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            An engineering journal documenting technical architecture decisions, system edge-cases, and practical insights discovered while building distributed backend and agentic AI systems.
          </p>
        </header>

        {/* Center Alternating Timeline Spine */}
        <div className="relative max-w-5xl mx-auto pl-7 md:pl-0">
          {/* Continuous Glowing Line in the exact center on Desktop, on the left on Mobile */}
          <div className="absolute left-[0px] md:left-1/2 top-4 bottom-10 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent-500 via-blue-500/50 to-purple-500/10 shadow-[0_0_8px_rgba(56,189,248,0.4)]" />

          {/* Alternating Entries (Left 1, Right 2, Left 3, Right 4, Left 5) */}
          <div className="relative z-10">
            {tilEntries.map((entry, index) => (
              <TimelineCard key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
