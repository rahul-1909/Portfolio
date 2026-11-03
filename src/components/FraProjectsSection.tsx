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

export const FraProjectsSection: React.FC = () => {
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
    <section id="projects" className="py-24 bg-white text-black border-b-2 border-black relative notebook-paper">
      <div className="content-wrapper max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Fra style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-black px-3.5 py-1 doodle-box-sm font-mono text-xs font-[1000] uppercase tracking-wider mb-3 shadow-[3px_3px_0px_#000]">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>TANTI PROGETTI · PACKED WITH CODE & LOGIC</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-[1000] tracking-tight text-black uppercase leading-[0.95]">
              Selected Works
            </h2>
            <p className="mt-3 text-base sm:text-lg text-black/75 leading-relaxed font-medium">
              Engineered with algorithmic precision, AST query safety, sub-14ms retrieval latency, and distributed fault tolerance.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/50" />
            <input
              type="text"
              placeholder="Search by stack, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-black placeholder:text-black/40 focus:outline-none doodle-box shadow-[3px_3px_0px_0px_#000]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-4 border-b-2 border-black">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 font-mono text-xs font-[1000] uppercase tracking-wider doodle-btn ${
                activeFilter === cat
                  ? 'bg-black text-white'
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
              className="group flex flex-col justify-between bg-white p-7 doodle-box shadow-[6px_8px_0px_0px_#000] hover:shadow-[9px_12px_0px_0px_#000] hover:-translate-y-1 transition-all"
            >
              <div>
                {/* Top Blueprint Header */}
                <div className="flex items-center justify-between gap-2 mb-4 border-b-2 border-black/15 pb-3">
                  <span className="px-2.5 py-0.5 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="flex items-center gap-1 font-mono text-[11px] font-bold text-amber-900 bg-amber-100 border border-black px-2 py-0.5 rounded">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-[1000] text-black tracking-tight leading-snug group-hover:underline decoration-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-black/75 leading-relaxed font-medium">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 border border-black bg-neutral-50 font-mono text-[10px] font-bold text-black rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between gap-3">
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
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFE600] text-black font-mono text-xs font-[1000] doodle-btn"
                      title="Launch Live Demo"
                    >
                      <span>Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border-2 border-black bg-white hover:bg-neutral-100 transition doodle-box-sm shadow-[2px_2px_0px_0px_#000]"
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
