import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Search, 
  Info 
} from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../data/projects';
import { GithubIcon } from '../components/SocialIcons';
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
      project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20">
      <div className="content-wrapper">
        {/* Page Header */}
        <header className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Open Source & Production Repositories</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Real codebases exploring distributed backend APIs, agentic LangGraph workflows, and strict data validation. Every project is backed by a verified GitHub repository and live deployment.
          </p>
        </header>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/60 dark:border-white/5">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tech, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/80 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-accent-500 focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeFilter === cat
                    ? 'bg-accent-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-xl hover:shadow-accent-500/5 hover:-translate-y-1 dark:border-white/5 dark:bg-slate-900/60 dark:hover:border-accent-500/30"
            >
              <div>
                {/* Category & Live Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-white/[0.05] dark:text-slate-300">
                    {project.category}
                  </span>

                  {project.isLive ? (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Demo
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      Research Repo
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-100/90 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 transition"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span>Architecture Details</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white transition"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-white shadow-sm hover:bg-accent-700 transition"
                      title="Launch Live Application"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Explore All Projects Container (Redirects to GitHub Repositories) */}
          <a
            href="https://github.com/rahul-1909?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between rounded-2xl border-2 border-dashed border-accent-500/35 bg-gradient-to-br from-accent-500/5 via-blue-500/5 to-purple-500/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-500 hover:bg-accent-500/10 hover:shadow-2xl hover:shadow-accent-500/10 hover:-translate-y-1.5 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-accent-500/50 dark:hover:bg-white/[0.05]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600 dark:text-accent-400 group-hover:scale-110 transition-transform">
                  <GithubIcon className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-bold text-accent-600 dark:text-accent-400">
                  <span>GitHub Repositories</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>

              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                Explore All Projects
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Discover all my public repositories, experimental AI/ML pipelines, backend microservices, and algorithmic contributions directly on GitHub.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-bold text-accent-600 dark:text-accent-400">
              <span>View All Repositories on GitHub</span>
              <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Architecture Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </div>
  );
};
