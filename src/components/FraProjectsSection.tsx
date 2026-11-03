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
    <section id="projects" className="py-24 sm:py-32 bg-white text-black border-b-4 border-black relative notebook-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Fra bold comic style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-black px-3.5 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-[3px_3px_0px_#000] -rotate-1">
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>SELECTED ARCHITECTURES · PACKED WITH CODE & LOGIC</span>
            </div>
            
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-black uppercase leading-[0.9]">
              SELECTED WORKS
            </h2>

            <p className="mt-3 font-mono text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
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
              className="w-full bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-mono text-black placeholder:text-black/40 focus:outline-none border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_#000]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-4 border-b-3 border-black">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider rounded-xl border-2 border-black transition-all ${
                activeFilter === cat
                  ? 'bg-black text-white shadow-[3px_3px_0px_#FFE600]'
                  : 'bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between bg-white p-7 rounded-2xl border-3 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#FFE600] hover:-translate-y-1.5 transition-all relative overflow-hidden"
            >
              {/* Top Tilted Sticker Tape Label */}
              <div className="flex items-center justify-between gap-2 mb-4 border-b-2 border-black/15 pb-3">
                <span className="px-2.5 py-1 bg-black text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded border border-black">
                  #{idx + 1} · {project.category}
                </span>

                {project.featured && (
                  <span className="flex items-center gap-1 font-mono text-[11px] font-bold text-black bg-[#FFE600] border-2 border-black px-2 py-0.5 rounded shadow-[2px_2px_0px_#000] -rotate-2">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </span>
                )}
              </div>

              <div>
                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-black tracking-tight leading-snug group-hover:text-amber-600 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 font-mono text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 border border-black bg-neutral-50 font-mono text-[10px] font-bold text-black rounded shadow-[1px_1px_0px_#000]"
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-black hover:text-amber-600 transition-colors"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span>Blueprint Spec ➔</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFE600] text-black font-mono text-xs font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-400 transition-colors"
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
                    className="p-1.5 border-2 border-black bg-white hover:bg-neutral-100 transition rounded-lg shadow-[2px_2px_0px_0px_#000]"
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
