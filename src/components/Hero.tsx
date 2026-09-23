import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  MapPin, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { profileData } from '../data/profile';
import { heroTechSkills } from '../data/skills';
import { AppleLockscreenClock } from './AppleLockscreenClock';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 right-5 sm:right-20 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-accent-500/10 blur-[120px] dark:bg-accent-500/15" />
        <div className="absolute bottom-10 left-5 sm:left-20 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-500/10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Badges Row: Availability + Real-Time Apple Lockscreen Clock */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          {/* Target Role & Open for Opportunities Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/70 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-300 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Open for Software, Backend & AI/ML Opportunities</span>
          </div>

          <AppleLockscreenClock />
        </div>

        {/* Hero Greeting & Name */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-medium text-slate-500 dark:text-slate-400 mb-3">
            <span>Hi there!</span>
            <span className="inline-block animate-bounce text-2xl" role="img" aria-label="Love-you gesture">
              🤟
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            I'm{" "}
            <span className="bg-gradient-to-r from-accent-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-accent-400 dark:via-indigo-300 dark:to-cyan-400">
              Rahul Teja
            </span>
            ,
          </h1>

          <p className="text-lg sm:text-2xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed max-w-3xl">
            A <span className="font-bold text-slate-900 dark:text-white">Software Developer</span> focused on{" "}
            <span className="font-semibold text-accent-600 dark:text-accent-400 underline decoration-accent-500/30 underline-offset-4">
              Backend Engineering
            </span>{" "}
            &{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-400 underline decoration-cyan-500/30 underline-offset-4">
              AI/ML
            </span>
            , who loves building intuitive, clean and modern technology.
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {profileData.bio}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-600/30 transition hover:bg-accent-700 hover:shadow-accent-600/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#projects"
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-700 backdrop-blur-md shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.1] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore My Work</span>
          </a>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white/50 px-5 py-3.5 text-sm font-semibold text-slate-600 backdrop-blur-md transition hover:border-accent-500/40 hover:text-accent-600 dark:border-white/10 dark:bg-transparent dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-accent-400"
          >
            <FileText className="h-4 w-4" />
            <span>Resume</span>
          </button>
        </div>

        {/* Location & Terminal Info Strip */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent-500" />
            <span>{profileData.location}</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-cyan-500" />
            <span>FastAPI · Spring Boot · LangGraph · Qdrant</span>
          </div>
        </div>

        {/* Tech Stack Strip (Inspired by reference site) */}
        <div className="mt-14 pt-8 border-t border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-2 mb-3.5">
            <Sparkles className="h-3.5 w-3.5 text-accent-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Core Technologies & Frameworks
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {heroTechSkills.map((tech) => (
              <span
                key={tech.name}
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur-md transition hover:border-accent-500/40 hover:bg-accent-50/50 hover:shadow-sm dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.08]"
              >
                <span
                  className="h-2 w-2 rounded-full transition group-hover:scale-125"
                  style={{ backgroundColor: tech.color }}
                />
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
