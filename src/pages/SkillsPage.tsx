import React, { useState } from 'react';
import { TechSphereBackground } from '../components/TechSphereBackground';
import { TechIcon } from '../components/TechIcons';

interface TechItem {
  name: string;
  category: 'languages' | 'backend' | 'ai-ml' | 'frontend' | 'databases' | 'devops' | 'tools';
}

export const SkillsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Rows strictly matching Redoyanul Haque's exact tapered pyramid matrix (12, 10, 8, 6, 4, 2)
  const techRows: TechItem[][] = [
    // Row 1 (12 items)
    [
      { name: 'Python', category: 'languages' },
      { name: 'JavaScript', category: 'languages' },
      { name: 'TypeScript', category: 'languages' },
      { name: 'Java', category: 'languages' },
      { name: 'C', category: 'languages' },
      { name: 'C++', category: 'languages' },
      { name: 'HTML', category: 'frontend' },
      { name: 'CSS', category: 'frontend' },
      { name: 'Bash', category: 'devops' },
      { name: 'React', category: 'frontend' },
      { name: 'Next.js', category: 'frontend' },
      { name: 'Tailwind', category: 'frontend' },
    ],
    // Row 2 (10 items)
    [
      { name: 'Node.js', category: 'backend' },
      { name: 'Django', category: 'backend' },
      { name: 'Flask', category: 'backend' },
      { name: 'FastAPI', category: 'backend' },
      { name: 'Spring Boot', category: 'backend' },
      { name: 'TensorFlow', category: 'ai-ml' },
      { name: 'PyTorch', category: 'ai-ml' },
      { name: 'Scikit-learn', category: 'ai-ml' },
      { name: 'OpenCV', category: 'ai-ml' },
      { name: 'NumPy', category: 'ai-ml' },
    ],
    // Row 3 (8 items)
    [
      { name: 'Pandas', category: 'ai-ml' },
      { name: 'MySQL', category: 'databases' },
      { name: 'PostgreSQL', category: 'databases' },
      { name: 'MongoDB', category: 'databases' },
      { name: 'Firebase', category: 'databases' },
      { name: 'Redis', category: 'databases' },
      { name: 'Docker', category: 'devops' },
      { name: 'Azure', category: 'devops' },
    ],
    // Row 4 (6 items)
    [
      { name: 'Git', category: 'devops' },
      { name: 'GitHub', category: 'devops' },
      { name: 'Linux', category: 'devops' },
      { name: 'AWS', category: 'devops' },
      { name: 'VS Code', category: 'tools' },
      { name: 'Vercel', category: 'devops' },
    ],
    // Row 5 (4 items)
    [
      { name: 'Jupyter', category: 'tools' },
      { name: 'Postman', category: 'tools' },
      { name: 'Power BI', category: 'tools' },
      { name: 'Streamlit', category: 'frontend' },
    ],
    // Row 6 (2 items)
    [
      { name: 'Hugging Face', category: 'ai-ml' },
      { name: 'LangGraph', category: 'ai-ml' },
    ],
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-24 bg-[#080318]">
      {/* 3D Cyber Wireframe Sphere & Ambient Space Background */}
      <TechSphereBackground />

      <div className="relative z-10 mx-auto max-w-[1400px] px-2 sm:px-4 lg:px-8">
        {/* Massive Centered Title matching Redoyanul Haque screenshot */}
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-[1000] tracking-[0.25em] text-white uppercase drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]">
            TECH STACK
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-medium tracking-wide text-purple-300/80">
            A comprehensive overview of programming languages, frameworks, and tools in my workflow
          </p>

          {/* Category Filter Pills (Minimal Glass) */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Technologies' },
              { id: 'languages', label: 'Languages' },
              { id: 'backend', label: 'Backend' },
              { id: 'ai-ml', label: 'AI & ML' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'databases', label: 'Databases' },
              { id: 'devops', label: 'DevOps & Cloud' },
              { id: 'tools', label: 'Tools' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200 ${
                  activeFilter === cat.id
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)] border border-purple-400'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* Tapered Inverted Pyramid Rows matching Redoyan screenshot */}
        <div className="w-full overflow-x-auto pb-6">
          <div className="min-w-[760px] lg:min-w-0 flex flex-col items-center gap-2.5 sm:gap-3.5 md:gap-4.5">
            {techRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex items-center justify-center gap-2 sm:gap-3 md:gap-3.5"
              >
                {row.map((item) => {
                  const isMatch = activeFilter === 'all' || item.category === activeFilter;

                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredTech(item.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`group relative flex flex-col items-center justify-center rounded-2xl p-1.5 sm:p-2.5 md:p-3 text-center transition-all duration-300 select-none cursor-pointer ${
                        isMatch
                          ? 'opacity-100'
                          : 'opacity-25 grayscale hover:grayscale-0 hover:opacity-100'
                      } ${
                        hoveredTech === item.name
                          ? 'z-30 scale-115 -translate-y-2 border-purple-400 bg-white/[0.14] shadow-[0_0_30px_rgba(168,85,247,0.65)]'
                          : 'border border-white/10 bg-[#161226]/85 hover:border-purple-400/90 hover:bg-[#20183b]/95 hover:scale-115 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                      } backdrop-blur-md w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[86px] lg:h-[86px] shrink-0`}
                    >
                      {/* Centered Vector Icon */}
                      <div className="flex items-center justify-center text-slate-200 group-hover:text-purple-300 transition-colors">
                        <TechIcon name={item.name} className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                      </div>

                      {/* Label below icon */}
                      <span className="mt-1 block max-w-full truncate px-0.5 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold text-slate-300 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Tooltip / Summary Status Bar */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-950/50 px-4 py-1.5 text-xs text-purple-300 backdrop-blur-md shadow-sm">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            <span>
              {hoveredTech ? (
                <>Inspecting: <strong className="text-white font-mono">{hoveredTech}</strong></>
              ) : (
                'Hover any skill tile to inspect technology & stack capabilities'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
