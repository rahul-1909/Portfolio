import React from 'react';
import { Sparkles, Heart, Code2 } from 'lucide-react';

export const FeatureContainers: React.FC = () => {
  const features = [
    {
      title: "Secure & Reliable",
      description: "Prioritizing data protection, authentication, and fault tolerance to ensure safe and steady performance.",
      icon: Sparkles,
      gradient: "from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600"
    },
    {
      title: "Scalable Architecture",
      description: "Designing systems that grow effortlessly, whether it's handling 10 or 10 million requests.",
      icon: Heart,
      gradient: "from-pink-400 to-rose-500 dark:from-pink-500 dark:to-rose-600"
    },
    {
      title: "High Performance",
      description: "Optimized for speed and efficiency to deliver seamless experiences behind the scenes.",
      icon: Code2,
      gradient: "from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600"
    }
  ];

  return (
    <div className="-mt-8 mb-16 md:-mt-12 md:mb-20 lg:-mt-16 lg:mb-24">
      <div className="content-wrapper">
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative z-10 flex-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:border-slate-700 shadow-sm"
              >
                {/* Glow layer on hover */}
                <div className="pointer-events-none absolute inset-0 z-[-1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-accent-50/50 via-transparent to-blue-50/30 dark:from-accent-900/10 dark:to-blue-900/10" />

                <div className="mb-4 flex items-center gap-4">
                  <div className="shrink-0">
                    <div className={`rounded-xl bg-gradient-to-br ${feature.gradient} p-3 shadow-md`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {feature.title}
                  </div>
                </div>

                <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
