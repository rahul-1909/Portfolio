import React, { useState } from 'react';

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export const SkillsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Exact approved skills list
  const categories: SkillCategory[] = [
    {
      id: 'languages',
      title: 'Programming Languages',
      description: 'Core languages used for backend architectures, systems programming, and algorithms.',
      skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      id: 'backend',
      title: 'Backend Frameworks & Services',
      description: 'High-throughput microservices, ASGI asynchronous APIs, and enterprise server architectures.',
      skills: ['Spring Boot', 'FastAPI', 'Node.js'],
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Autonomous multi-agent systems, stateful state machines, dense semantic vector retrieval, and neural modeling.',
      skills: ['LangGraph', 'RAG', 'PyTorch', 'TensorFlow'],
    },
    {
      id: 'databases',
      title: 'Databases & Storage Engines',
      description: 'Relational data stores, high-concurrency vector indices, in-memory caching, and document collections.',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Qdrant'],
    },
    {
      id: 'devops',
      title: 'Cloud, Infrastructure & Tooling',
      description: 'Containerization, cloud infrastructure deployment, distributed version control, and automated build pipelines.',
      skills: ['Docker', 'AWS', 'Azure', 'Linux', 'Git', 'CI/CD'],
    },
  ];

  const filteredCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <header className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
            <span>GET /work/skills-and-tools</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-text-light dark:text-text-dark tracking-display">
            Stack &amp; Technologies
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Curated technical stack focused on scalable backend architectures, multi-agent AI systems, and low-latency databases.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-border-light dark:border-border-dark font-mono text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'all'
                ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
                : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeCategory === cat.id
                  ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
                  : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories List */}
        <div className="flex flex-col space-y-12">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="border-b border-border-light dark:border-border-dark pb-12"
            >
              <div className="max-w-2xl mb-6">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-light dark:text-text-dark mb-2">
                  {cat.title}
                </h2>
                <p className="text-sm text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-sm px-4 py-2 rounded-md bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
