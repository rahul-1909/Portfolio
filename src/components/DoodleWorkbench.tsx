import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Search, 
  Sparkles,
  Info
} from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../data/projects';
import { GithubIcon } from './SocialIcons';
import { ProjectDetailModal } from './ProjectDetailModal';

export const DoodleWorkbench: React.FC = () => {
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
    <section id="workbench" className="py-24 bg-white text-black border-b-2 border-black relative">
      <div className="content-wrapper max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <FolderGit2 className="h-3.5 w-3.5 text-amber-300" />
              <span>THE WORKBENCH · PRODUCTION BLUEPRINTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-[1000] tracking-tight text-black uppercase leading-tight">
              Selected Works
            </h2>
            <p className="mt-3 text-base text-black/75 leading-relaxed font-medium">
              Engineered with mathematical precision, AST query safety, sub-14ms retrieval latency, and distributed fault tolerance.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
            <input
              type="text"
              placeholder="Filter blueprints by stack, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-2 border-black bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-black placeholder:text-black/40 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b-2 border-black">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl border-2 border-black font-mono text-xs font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-3xl border-2 border-black bg-white p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
            >
              <div>
                {/* Top Row: Category + Star */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-black text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="flex items-center gap-1 font-mono text-xs font-bold text-amber-600 bg-amber-100 border border-black/30 px-2 py-0.5 rounded-md">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-[900] text-black tracking-tight leading-snug group-hover:underline decoration-2">
                  {project.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="mt-3 text-sm text-black/75 leading-relaxed font-medium">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded border border-black/20 bg-neutral-100 font-mono text-[11px] font-semibold text-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="mt-8 pt-5 border-t-2 border-black flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-black hover:opacity-75"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span>Blueprint Spec</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black text-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 transition"
                      title="Launch Live Prototype"
                    >
                      <span>Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    title="View Source on GitHub"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
