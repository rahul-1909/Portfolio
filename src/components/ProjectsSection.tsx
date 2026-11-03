import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Search, 
  Info, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../data/projects';
import { GithubIcon } from './SocialIcons';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
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
    <section id="projects" className="py-24 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="content-wrapper max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400 mb-3 border border-violet-500/20">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Production Systems & Research Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
              Selected Works
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineered for high throughput, algorithmic precision, and distributed reliability. 
              Explore architecture blueprints and live demos.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by keyword, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-white/80 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-white backdrop-blur-md"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200/60 dark:border-white/5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeFilter === category
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1 dark:border-white/5 dark:bg-slate-900/60 dark:hover:border-violet-500/40"
            >
              <div>
                {/* Category & Status Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
                    <Sparkles className="h-3 w-3" />
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
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
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
                  className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition"
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
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm hover:bg-violet-700 transition"
                      title="Launch Live Application"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Compact Box: Explore All Projects */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://github.com/rahul-1909?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-slate-300/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-violet-500 hover:bg-violet-600 hover:text-white hover:shadow-lg hover:shadow-violet-600/25 hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-violet-500 dark:hover:bg-violet-600"
          >
            <span>Explore All Projects</span>
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Architecture Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
