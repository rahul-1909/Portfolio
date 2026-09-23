import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { AppleLockscreenClock } from '../components/AppleLockscreenClock';
import { TechStackStrip } from '../components/TechStackStrip';
import { FeatureContainers } from '../components/FeatureContainers';
import { DashboardQuote } from '../components/DashboardQuote';
import { BackendDevOpsSection } from '../components/BackendDevOpsSection';
interface HomeProps {
  onOpenResume: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenResume }) => {
  const [scrollY, setScrollY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

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
                {/* Apple Lockscreen Time and Date Widget */}
                <div className="mb-6">
                  <AppleLockscreenClock />
                </div>

                {/* Hi there! + Single Animated Gesture Emoji */}
                <div className="mb-2 flex items-center gap-3 text-2xl font-medium text-slate-600 md:mb-3 md:text-4xl dark:text-slate-300">
                  <span>Hi there!</span>
                  <span
                    className="text-3xl md:text-4xl select-none inline-block animate-bounce hover:scale-125 transition-transform cursor-default"
                    aria-label="Love-you gesture"
                  >
                    🤟
                  </span>
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

                {/* CTAs */}
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

              {/* Right Column: 3D Animated Dark Theme Eren Yeager with Scroll & Parallax Reaction */}
              <div 
                className="relative select-none flex justify-center lg:justify-end items-center flex-1"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="relative w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] xl:w-[520px] transition-transform duration-300 ease-out"
                  style={{
                    transform: `perspective(1000px) rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 8}deg) translateY(${Math.min(scrollY * 0.12, 45)}px)`,
                  }}
                >
                  {/* Glowing ambient radial nebula matching dark background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-600/25 via-blue-600/15 to-transparent blur-3xl opacity-75 animate-pulse duration-[6000ms]" />

                  {/* Borderless Image Container with Feathered Edge Dissolve */}
                  <div className="relative overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
                    <img
                      src="/assets/images/eren-dark-theme.jpg"
                      alt="Eren Yeager Wings of Freedom"
                      className="w-full h-auto object-contain select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
                      loading="eager"
                    />
                  </div>

                  {/* Subtle 3D Depth Indicator Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-purple-300 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                    <span>Wings of Freedom · Scout</span>
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
