import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Info
} from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../data/projects';
import { GithubIcon } from './SocialIcons';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'AI & LLM', 'Backend & APIs', 'Fintech'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Verified Repositories & Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured Engineering Projects
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Real codebases exploring distributed backend APIs, agentic LangGraph workflows, and strict data validation. Every project is backed by a live GitHub repository and verified deployment.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeFilter === cat
                    ? 'bg-accent-600 text-white shadow-md shadow-accent-600/25'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-xl hover:shadow-accent-500/5 hover:-translate-y-1 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-accent-500/30 dark:hover:bg-white/[0.04]"
            >
              <div>
                {/* Top Meta Row */}
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

                {/* Project Title */}
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-100/90 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="rounded-md bg-slate-100/90 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-white/[0.04] dark:text-slate-400">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
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
                    aria-label={`View GitHub repository for ${project.title}`}
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
                      aria-label={`Launch live app for ${project.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
