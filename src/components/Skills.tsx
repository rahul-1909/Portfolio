import React, { useState } from 'react';
import { 
  Code, 
  Server, 
  Brain, 
  Layout, 
  Database, 
  Cloud, 
  BarChart3, 
  Wrench
} from 'lucide-react';
import { skillCategories } from '../data/skills';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'languages': return Code;
      case 'backend': return Server;
      case 'ai-ml': return Brain;
      case 'frontend': return Layout;
      case 'databases': return Database;
      case 'cloud-devops': return Cloud;
      case 'data-analytics': return BarChart3;
      case 'tools': return Wrench;
      default: return Code;
    }
  };

  const displayedCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.id === selectedCategory);

  return (
    <section id="skills" className="py-20 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <Wrench className="h-3.5 w-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Skills & Tools
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Look at all the programming languages, backend frameworks, and engineering tools I've worked with.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-200/70 dark:border-white/5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-accent-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
            }`}
          >
            All Categories
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-accent-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <div
                key={category.id}
                className="group rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-white hover:shadow-lg dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-accent-500/30 dark:hover:bg-white/[0.04]"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {category.skills.length} core items
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/pill inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-accent-500/30 hover:bg-accent-50/50 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.06]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                      <span>{skill.name}</span>
                      {skill.tag && (
                        <span className="text-[10px] font-semibold text-accent-600 dark:text-accent-400 opacity-80">
                          [{skill.tag}]
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
