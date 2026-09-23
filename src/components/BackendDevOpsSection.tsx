import React from 'react';

export const BackendDevOpsSection: React.FC = () => {
  const backendItems = [
    {
      num: "1",
      title: "Architecture",
      desc: "Modular, layered architecture ensuring maintainability and reusability."
    },
    {
      num: "2",
      title: "Data Flow",
      desc: "Efficient API and database interaction with clean request/response handling."
    },
    {
      num: "3",
      title: "Security",
      desc: "Input validation, encryption, and auth protocols to protect data and services."
    },
    {
      num: "4",
      title: "Performance",
      desc: "Optimized queries, caching, and async processes for lightning-fast execution."
    }
  ];

  const devopsItems = [
    {
      num: "1",
      title: "Infrastructure as Code",
      desc: "Declarative configurations using Docker containers and cloud-native patterns."
    },
    {
      num: "2",
      title: "CI/CD Pipelines",
      desc: "Automated testing, build, and deployment for rapid delivery cycles."
    },
    {
      num: "3",
      title: "Monitoring & Traces",
      desc: "Logging, health checks, and metrics tracking for system reliability."
    },
    {
      num: "4",
      title: "Scalability",
      desc: "Cloud-native services and asynchronous workers for on-demand scaling."
    }
  ];

  return (
    <section className="mb-16 lg:mb-28">
      <div className="relative border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="background-grid background-grid--fade-out absolute inset-0 z-0"></div>
        <div className="content-wrapper relative z-10 pt-16 pb-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* Backend Column */}
            <div className="flex-1">
              <header className="mb-8">
                <span className="text-accent-600 mb-2 block text-xs font-bold uppercase tracking-widest dark:text-accent-400">
                  Backend
                </span>
                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-slate-800 lg:text-4xl dark:text-slate-100">
                  Resilient, Modular & High-Performance Architecture.
                </h2>
                <p className="max-w-lg leading-relaxed text-sm text-slate-500 dark:text-slate-400">
                  Build robust systems with clean logic, optimized for speed, scalability, and security.
                </p>
              </header>

              <div className="flex flex-col gap-3">
                {backendItems.map((item) => (
                  <div
                    key={item.num}
                    className="group flex flex-1 items-start gap-4 rounded-2xl border bg-white/80 px-5 py-4 text-left backdrop-blur-sm dark:bg-slate-900/60 border-slate-200/80 hover:border-slate-300 dark:border-slate-700/50 dark:hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="hidden w-16 shrink-0 justify-center text-center text-5xl font-black xl:flex text-slate-300 group-hover:text-slate-400 dark:text-slate-700 dark:group-hover:text-slate-600 select-none">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <span className="block font-bold text-slate-800 dark:text-slate-200">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DevOps & AI Column */}
            <div className="flex-1">
              <header className="mb-8">
                <span className="text-accent-600 mb-2 block text-xs font-bold uppercase tracking-widest dark:text-accent-400">
                  DevOps
                </span>
                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-slate-800 lg:text-4xl dark:text-slate-100">
                  Automated, Scalable & CD Pipelines.
                </h2>
                <p className="max-w-lg leading-relaxed text-sm text-slate-500 dark:text-slate-400">
                  Streamlining infrastructure and CI/CD workflows to support seamless development.
                </p>
              </header>

              <div className="flex flex-col gap-3">
                {devopsItems.map((item) => (
                  <div
                    key={item.num}
                    className="group flex flex-1 items-start gap-4 rounded-2xl border bg-white/80 px-5 py-4 text-left backdrop-blur-sm dark:bg-slate-900/60 border-slate-200/80 hover:border-slate-300 dark:border-slate-700/50 dark:hover:border-slate-600 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="hidden w-16 shrink-0 justify-center text-center text-5xl font-black xl:flex text-slate-300 group-hover:text-slate-400 dark:text-slate-700 dark:group-hover:text-slate-600 select-none">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <span className="block font-bold text-slate-800 dark:text-slate-200">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
