import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
import { TechStackStrip } from '../components/TechStackStrip';
import { FeatureContainers } from '../components/FeatureContainers';
import { DashboardQuote } from '../components/DashboardQuote';
import { BackendDevOpsSection } from '../components/BackendDevOpsSection';
import { getISTDateTime } from '../utils/time';
import type { ISTTimeInfo } from '../utils/time';

interface HomeProps {
  onOpenResume: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenResume }) => {
  const [istTime, setIstTime] = useState<ISTTimeInfo>(getISTDateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setIstTime(getISTDateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-48 lg:pb-28">
        {/* Ambient Glows & Grid */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-[0.08] bg-accent-500 blur-[120px] dark:opacity-[0.14]" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full opacity-[0.06] bg-blue-500 blur-[100px] dark:opacity-[0.1]" />
          <div className="background-grid background-grid--fade-out absolute inset-0"></div>
        </div>

        <div className="content-wrapper relative z-10">
          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
              {/* Left Column Text */}
              <div className="max-w-2xl relative z-20">
                {/* Real-time IST dynamic badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 backdrop-blur-md shadow-sm">
                  <Clock className="h-3.5 w-3.5 text-accent-500 animate-pulse" />
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {istTime.timeStr}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span>{istTime.dateStr}</span>
                  <span className="text-slate-400 text-[11px]">(IST, GMT+5:30)</span>
                </div>

                {/* Hi there! + Gesture emoji */}
                <div className="mb-2 flex items-center gap-2.5 text-2xl font-medium text-slate-500 md:mb-3 md:gap-3 md:text-4xl dark:text-slate-400">
                  <span>Hi there!</span>
                  <img
                    alt="Love-you Gesture"
                    src="/assets/emojis/love-you-gesture.png"
                    className="w-7 md:w-9 inline-block select-none"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="text-2xl select-none" aria-hidden="true">🤟</span>
                </div>

                {/* I'm Rahul Teja, */}
                <h1 className="mb-4 block text-[2.5rem] font-[1000] tracking-tight leading-[1.1] md:mb-6 md:text-7xl text-slate-900 dark:text-white">
                  I'm{" "}
                  <strong className="bg-gradient-to-r from-accent-600 to-blue-600 bg-clip-text text-transparent dark:from-accent-400 dark:to-blue-400">
                    Rahul Teja
                  </strong>
                  ,
                </h1>

                {/* Subtitle matching Arshad's clean structure */}
                <p className="block max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
                  A{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Software Developer focused on Backend Engineering & AI/ML
                  </span>{" "}
                  who loves intuitive, clean and modern technologies.
                </p>

                {/* CTAs matching screenshot */}
                <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
                  <Link
                    to="/work/contact"
                    className="inline-flex min-w-[140px] items-center justify-center rounded-xl bg-accent-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-600/30 transition hover:bg-accent-700 hover:shadow-accent-600/40 hover:-translate-y-0.5"
                  >
                    Get in Touch
                  </Link>

                  <button
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/60 px-5 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-md transition hover:border-slate-400 hover:bg-slate-100/80 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800/60"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Resume</span>
                  </button>
                </div>

                {/* Tech Stack & Tools Icon Strip */}
                <TechStackStrip />
              </div>

              {/* Right Column: Anime Style Portrait Illustration (as in Arshad screenshot) */}
              <div className="relative hidden select-none lg:flex justify-end items-center flex-1">
                <div className="relative h-[480px] w-[420px] xl:h-[540px] xl:w-[480px]">
                  {/* Subtle radial glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-accent-500/20 via-blue-500/10 to-transparent blur-3xl opacity-60 dark:opacity-40" />
                  
                  {/* Illustration Image Container with Arched Silhouette */}
                  <div className="relative h-full w-full overflow-hidden rounded-[3rem] border border-slate-200/50 dark:border-white/10 shadow-2xl bg-[#0c0c14]/40 backdrop-blur-sm">
                    <img
                      src="/assets/images/animated.png"
                      alt="Rahul Teja Portrait"
                      className="h-full w-full object-cover object-center dark:brightness-95 contrast-105 transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Feature Containers (Screenshot 3) */}
      <FeatureContainers />

      {/* Dashboard Quote Section (Screenshot 4) */}
      <DashboardQuote />

      {/* 2-Column Architecture & Pipelines Section (Screenshot 5) */}
      <BackendDevOpsSection />
    </div>
  );
};
