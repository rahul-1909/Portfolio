import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectDetailModal } from '../components/ProjectDetailModal';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & LLM', 'Backend & APIs', 'Fintech'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getProjectRoute = (id: string) => {
    switch (id) {
      case 'gold-lending-platform':
        return '/work/gold-lending-platform';
      case 'multi-agent-autonomous-rag':
        return '/work/rag-engine';
      case 'nl-to-sql-converter':
        return '/work/nl-sql-copilot';
      case 'linkedin-intelligence-api':
        return '/work/profile-intelligence';
      case 'production-ai-customer-support-agent':
        return '/work/ai-support-agent';
      default:
        return `/work/${id}`;
    }
  };

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <header className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
            <span>GET /projects</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-text-light dark:text-text-dark tracking-display">
            Selected Work
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Real codebases exploring distributed backend APIs, agentic LangGraph workflows, and strict data validation. Every project is backed by verified GitHub source repositories.
          </p>
        </header>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-border-light dark:border-border-dark">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-text-mutedLight dark:text-text-mutedDark" />
            <input
              type="text"
              placeholder="Search by technology, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pl-10 pr-4 py-2 text-xs font-mono text-text-light dark:text-text-dark placeholder-text-mutedLight dark:placeholder-text-mutedDark focus:border-accent-light dark:focus:border-accent-dark focus:outline-none"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-md px-3 py-1.5 text-xs font-mono transition-colors ${
                  activeFilter === cat
                    ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
                    : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List — Route-Style Rows */}
        <div className="flex flex-col">
          {filteredProjects.map((project) => {
            const route = getProjectRoute(project.id);
            return (
              <article
                key={project.id}
                className="group border-b border-border-light dark:border-border-dark py-8 transition-colors hover:bg-surface-light/40 dark:hover:bg-surface-dark/40"
              >
                <div className="flex flex-col">
                  {/* Route & Category Meta */}
                  <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-light dark:text-accent-dark font-bold">GET</span>
                      <span>{route}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark ml-2">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-[11px]">200 OK</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-text-light dark:text-text-dark mb-3 tracking-tight group-hover:-translate-y-0.5 transition-transform">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-text-secondaryLight dark:text-text-secondaryDark max-w-3xl leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2.5 py-1 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-accent-light dark:hover:text-accent-dark transition-colors px-2.5 py-1 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
                        >
                          <span>Live</span>
                          <span>↗</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-accent-light dark:hover:text-accent-dark transition-colors px-2.5 py-1 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
                        >
                          <span>Source</span>
                          <span>↗</span>
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-text-light dark:hover:text-text-dark transition-colors px-2.5 py-1 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-strongLight dark:border-border-strongDark"
                      >
                        <Info className="h-3 w-3" />
                        <span>Architecture</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Modal for Architecture Breakdown */}
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};
