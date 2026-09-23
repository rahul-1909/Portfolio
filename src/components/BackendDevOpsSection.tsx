import React from 'react';

export const BackendDevOpsSection: React.FC = () => {
  const backendItems = [
    {
      num: "1",
      title: "Architecture",
      desc: "Modular, layered architecture ensuring maintainability, clean separation of concerns, and reusability."
    },
    {
      num: "2",
      title: "Data Flow",
      desc: "Efficient API and database interaction with clean, validated request and response pipelines."
    },
    {
      num: "3",
      title: "Security",
      desc: "Stateless JWT RBAC, input sanitization, and auth protocols protecting endpoints and critical data."
    },
    {
      num: "4",
      title: "Performance",
      desc: "Optimized relational indexing, memory caching, and async processes for lightning-fast execution."
    }
  ];

  const aimlItems = [
    {
      num: "1",
      title: "Agentic Systems",
      desc: "Multi-agent workflows with state graphs, conditional routing, and deterministic validation guardrails."
    },
    {
      num: "2",
      title: "Vector Retrieval (RAG)",
      desc: "Hybrid search, semantic chunking, and low-latency vector indexing with Qdrant and ChromaDB."
    },
    {
      num: "3",
      title: "Safety & Guardrails",
      desc: "Zero-regex semantic intent routing, AST SQL query verification, and production safety filters."
    },
    {
      num: "4",
      title: "Inference & Serving",
      desc: "Optimized token streaming, async API orchestration, and resilient fallback handling for production scale."
    }
  ];

  return (
    <section className="mb-16 lg:mb-28">
      <div className="relative border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="background-grid background-grid--fade-out absolute inset-0 z-0"></div>
        <div className="content-wrapper relative z-10 pt-16 pb-12">
          {/* Top 2 Columns Section with Cards 1-4 (Matching Screenshot media_1790174572364.png) */}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Backend Column */}
            <div className="flex-1">
              <header className="mb-8">
                <span className="text-accent-600 dark:text-accent-400 mb-2 block text-xs font-bold uppercase tracking-widest">
                  BACKEND
                </span>
                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 lg:text-4xl dark:text-white">
                  Resilient, Modular & High-Performance Architecture.
                </h2>
                <p className="max-w-lg leading-relaxed text-sm text-slate-600 dark:text-slate-400">
                  Build robust systems with clean logic, optimized for speed, scalability, and security.
                </p>
              </header>

              <div className="flex flex-col gap-3">
                {backendItems.map((item) => (
                  <div
                    key={item.num}
                    className="group flex flex-1 items-center gap-5 rounded-2xl border bg-white/80 px-5 py-4 text-left backdrop-blur-sm dark:bg-[#0e101f] border-slate-200/80 hover:border-slate-300 dark:border-[#1a1f36] dark:hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="w-12 shrink-0 flex items-center justify-center text-center text-4xl sm:text-5xl font-black text-slate-300 group-hover:text-slate-400 dark:text-slate-700 dark:group-hover:text-slate-500 select-none">
                      {item.num}
                    </span>
                    <div className="flex-1 border-l border-slate-200/60 dark:border-white/5 pl-4">
                      <span className="block font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI / ML Column */}
            <div className="flex-1">
              <header className="mb-8">
                <span className="text-accent-600 dark:text-accent-400 mb-2 block text-xs font-bold uppercase tracking-widest">
                  AI / ML
                </span>
                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 lg:text-4xl dark:text-white">
                  Autonomous, Agentic & High-Throughput Pipelines.
                </h2>
                <p className="max-w-lg leading-relaxed text-sm text-slate-600 dark:text-slate-400">
                  Engineering deterministic RAG pipelines, autonomous agentic state graphs, and low-latency inference.
                </p>
              </header>

              <div className="flex flex-col gap-3">
                {aimlItems.map((item) => (
                  <div
                    key={item.num}
                    className="group flex flex-1 items-center gap-5 rounded-2xl border bg-white/80 px-5 py-4 text-left backdrop-blur-sm dark:bg-[#0e101f] border-slate-200/80 hover:border-slate-300 dark:border-[#1a1f36] dark:hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="w-12 shrink-0 flex items-center justify-center text-center text-4xl sm:text-5xl font-black text-slate-300 group-hover:text-slate-400 dark:text-slate-700 dark:group-hover:text-slate-500 select-none">
                      {item.num}
                    </span>
                    <div className="flex-1 border-l border-slate-200/60 dark:border-white/5 pl-4">
                      <span className="block font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Two Feature Blocks (Matching Lower Half of Arshad's Screenshot) */}
          <div className="mt-20 pt-16 border-t border-slate-200/60 dark:border-slate-800/60 space-y-16 max-w-4xl">
            {/* Block 1: Robust & Scalable */}
            <div>
              <span className="text-accent-600 dark:text-accent-400 mb-2 block text-xs font-bold uppercase tracking-widest">
                ROBUST & SCALABLE
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                Structured Logic with Focus on Performance and Security.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                Designing modular, secure APIs with scalable architecture, prioritizing clean code and efficient data flow.
              </p>
            </div>

            {/* Block 2: Autonomous & Adaptive (AI / ML) */}
            <div>
              <span className="text-accent-600 dark:text-accent-400 mb-2 block text-xs font-bold uppercase tracking-widest">
                AUTONOMOUS & ADAPTIVE
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                Agentic AI Workflows with Focus on Precision and Determinism.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                Engineering deterministic RAG pipelines, autonomous agentic state graphs, and low-latency inference for high-precision workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
