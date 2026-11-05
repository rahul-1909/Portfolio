import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { tilEntries } from '../data/til';

export const TILPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTags = ['All', ...Array.from(new Set(tilEntries.flatMap((e) => e.tags)))];

  const filteredEntries = tilEntries.filter((entry) => {
    const matchesTag = selectedTag === 'All' || entry.tags.includes(selectedTag);
    const matchesSearch =
      entry.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <header className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
            <span>CHANGELOG</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-text-light dark:text-text-dark tracking-display">
            Today I Learned
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Continuous engineering logs, architecture breakthroughs, and practical discoveries across distributed systems, multi-agent AI, and low-latency databases.
          </p>
        </header>

        {/* Search & Tag Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-border-light dark:border-border-dark">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-text-mutedLight dark:text-text-mutedDark" />
            <input
              type="text"
              placeholder="Filter by keyword, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pl-10 pr-4 py-2 text-xs font-mono text-text-light dark:text-text-dark placeholder-text-mutedLight dark:placeholder-text-mutedDark focus:border-accent-light dark:focus:border-accent-dark focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  selectedTag === tag
                    ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
                    : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Changelog Entries Timeline */}
        {filteredEntries.length === 0 ? (
          <div className="py-16 text-center font-mono text-sm text-text-mutedLight dark:text-text-mutedDark border border-dashed border-border-light dark:border-border-dark rounded-lg">
            No entries found matching your query.
          </div>
        ) : (
          <div className="flex flex-col border-l border-border-light dark:border-border-dark ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12">
            {filteredEntries.map((entry) => (
              <article key={entry.id} className="relative">
                {/* Timeline node */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-2.5 w-2.5 rounded-full bg-background-light dark:bg-background-dark border-2 border-accent-light dark:border-accent-dark" />

                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs mb-2">
                  <span className="text-text-mutedLight dark:text-text-mutedDark">{entry.date}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-accent-light dark:text-accent-dark bg-accent-mutedLight dark:bg-accent-mutedDark px-2 py-0.5 rounded text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-light dark:text-text-dark mb-3">
                  {entry.topic}
                </h2>

                <p className="text-sm sm:text-base text-text-secondaryLight dark:text-text-secondaryDark max-w-3xl leading-relaxed mb-4">
                  {entry.summary}
                </p>

                {/* Key takeaway */}
                <div className="font-mono text-xs text-text-secondaryLight dark:text-text-secondaryDark bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-4 rounded-md max-w-2xl mb-4">
                  <span className="text-accent-light dark:text-accent-dark font-semibold">Key Takeaway: </span>
                  <span>{entry.keyTakeaway}</span>
                </div>

                {entry.projectRef && (
                  <div className="font-mono text-xs">
                    <span className="text-text-mutedLight dark:text-text-mutedDark">Reference Codebase: </span>
                    <a
                      href={entry.projectRef.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-light dark:text-accent-dark hover:underline inline-flex items-center gap-1"
                    >
                      <span>{entry.projectRef.name}</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
