import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Database, 
  Cloud, 
  Wrench, 
  Sparkles,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import { TechIcon } from './TechIcons';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  const categories = [
    { id: 'all', label: 'All Domains', icon: Layers },
    { id: 'languages', label: 'Languages', icon: Code2 },
    { id: 'backend', label: 'Backend & Systems', icon: Terminal },
    { id: 'ai-ml', label: 'AI/ML & Agents', icon: Cpu },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'devops', label: 'Cloud & DevOps', icon: Cloud },
    { id: 'tools', label: 'Tools & Workflow', icon: Wrench },
  ];

  // Pyramid Matrix Items for Matrix View
  const matrixRows = [
    ['Python', 'Go Lang', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'FastAPI', 'Spring Boot', 'Docker', 'AWS', 'Redis', 'PostgreSQL'],
    ['LangGraph', 'Qdrant', 'PyTorch', 'TensorFlow', 'Django', 'Flask', 'Node.js', 'React', 'Next.js', 'Azure'],
    ['Git', 'GitHub', 'Linux', 'MongoDB', 'MySQL', 'Firebase', 'Scikit-learn', 'OpenCV'],
    ['Hugging Face', 'Streamlit', 'Jupyter', 'Postman', 'Tailwind', 'Vercel'],
    ['Power BI', 'Bash', 'RESTful APIs', 'JWT/RBAC'],
    ['Vector Search', 'Agentic Workflows']
  ];

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const displayedSkills = activeCategory === 'all'
    ? allSkills
    : (skillCategories.find((cat) => cat.id === activeCategory)?.skills || []);

  return (
    <section id="skills" className="py-24 border-t border-slate-200/60 dark:border-white/5 relative overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -right-48 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px] dark:bg-violet-600/15" />
        <div className="absolute bottom-10 -left-48 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px] dark:bg-cyan-600/15" />
      </div>

      <div className="content-wrapper max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-3 border border-cyan-500/20">
              <Cpu className="h-3.5 w-3.5" />
              <span>Core Competencies & Toolchain</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] tracking-tight text-slate-900 dark:text-white">
              Technical Arsenal
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineered with deep proficiency in backend distributed runtimes, AI/ML agentic state machines, vector databases, and enterprise cloud pipelines.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 self-start md:self-end bg-slate-100 dark:bg-white/[0.04] p-1 rounded-xl border border-slate-200/80 dark:border-white/10">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'matrix'
                  ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Kinetic Matrix
            </button>
          </div>
        </div>

        {/* View Mode: Cards */}
        {viewMode === 'cards' ? (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200/60 dark:border-white/5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900 scale-105'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedSkills.map((skill, idx) => (
                <div
                  key={`${skill.name}-${idx}`}
                  className="group relative rounded-2xl border border-slate-200/70 bg-white/70 p-5 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1 dark:border-white/5 dark:bg-[#0c0d16]/80 dark:hover:border-violet-500/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100/80 dark:bg-white/[0.05] p-2.5 text-slate-800 dark:text-slate-200 transition-colors group-hover:text-violet-500 dark:group-hover:text-violet-400">
                      <TechIcon name={skill.name.split(' ')[0]} className="h-6 w-6" />
                    </div>

                    {skill.proficiency && (
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        skill.proficiency === 'Core'
                          ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20'
                          : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400'
                      }`}>
                        {skill.proficiency}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {skill.name}
                    </h3>
                    
                    {skill.tag ? (
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                        {skill.tag}
                      </p>
                    ) : (
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1 capitalize">
                        {skill.category.replace('-', ' ')}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      Production Tested
                    </span>
                    <Sparkles className="h-3 w-3 text-violet-400/50 group-hover:text-violet-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Kinetic Matrix View (Tapered Pyramid) */
          <div className="relative py-8 flex flex-col items-center justify-center gap-3 sm:gap-4 overflow-x-auto">
            {matrixRows.map((row, rowIdx) => (
              <div 
                key={`matrix-row-${rowIdx}`}
                className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
              >
                {row.map((tech) => (
                  <div
                    key={tech}
                    className="group relative flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-violet-500 hover:bg-violet-500/10 hover:scale-105 shadow-sm dark:border-white/10 dark:bg-[#0c0d16]/90"
                  >
                    <TechIcon name={tech.split(' ')[0]} className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-slate-300 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors" />
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
