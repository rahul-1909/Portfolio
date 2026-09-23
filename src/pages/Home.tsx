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
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-28">
        {/* Ambient Glows & Grid */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-[0.08] bg-accent-500 blur-[120px] dark:opacity-[0.14]" />
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full opacity-[0.06] bg-blue-500 blur-[100px] dark:opacity-[0.1]" />
          <div className="background-grid background-grid--fade-out absolute inset-0"></div>
        </div>

        <div className="content-wrapper relative z-10">
          <div className="relative">
            <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-10 lg:gap-12">
              {/* Left Column: Greeting, Name, Positioning, CTAs & Tech Strip */}
              <div className="max-w-2xl relative z-20 flex-1">
                {/* Real-time IST dynamic badge - Crisp, Clean & Prominently Visible */}
                <div className="mb-6 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-slate-300 bg-white/95 px-4 py-2 text-xs sm:text-sm font-medium text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent-600 dark:text-accent-400" />
                    <span className="font-mono text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                      {istTime.timeStr}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {istTime.dateStr}
                    </span>
                    <span className="rounded-md bg-accent-500/10 px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase text-accent-700 dark:bg-accent-400/20 dark:text-accent-300">
                      IST (GMT+5:30)
                    </span>
                  </div>
                </div>

                {/* Hi there! + Gesture emoji */}
                <div className="mb-2 flex items-center gap-2.5 text-2xl font-medium text-slate-600 md:mb-3 md:gap-3 md:text-4xl dark:text-slate-300">
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
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
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
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-md transition hover:border-slate-400 hover:bg-slate-100/90 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800/80"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Resume</span>
                  </button>
                </div>

                {/* Tech Stack & Tools Icon Strip */}
                <TechStackStrip />
              </div>

              {/* Right Column: Borderless Moving Animated Eren Yeager GIF */}
              <div className="relative select-none flex justify-center lg:justify-end items-center flex-1">
                <div className="relative w-[300px] sm:w-[360px] md:w-[420px] lg:w-[460px] xl:w-[500px]">
                  {/* Subtle radial ambient sky glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-sky-500/20 via-blue-500/15 to-purple-500/10 blur-3xl opacity-80" />
                  
                  {/* Pure Borderless Floating Animated GIF with Feathered Edge Dissolve */}
                  <div className="relative overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_72%,transparent_100%)]">
                    <img
                      src="/assets/images/dashboard-avatar.gif"
                      alt="Eren Yeager Freedom"
                      className="w-full h-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-105"
                      loading="eager"
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

      {/* 2-Column Architecture & Pipelines Section (Screenshot 5: Backend & AI/ML) */}
      <BackendDevOpsSection />
    </div>
  );
};
