import React from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu } from 'lucide-react';
import type { Project } from '../data/projects';
import { GithubIcon } from './SocialIcons';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#12121a] sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full bg-accent-500/10 px-3 py-0.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
                {project.category}
              </span>
              {project.isLive && (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Deployment
                </span>
              )}
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Overview
            </h3>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
          </div>

          {/* Key Metrics / Highlights if any */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {project.stats.map((stat, i) => (
                <div key={i} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                  <span className="block text-[11px] font-medium text-slate-400">{stat.label}</span>
                  <span className="mt-0.5 block text-sm font-bold text-accent-600 dark:text-accent-400">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Architectural Deep-Dive */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Cpu className="h-4 w-4 text-accent-500" />
              Architecture & Engineering Implementation
            </h3>
            <div className="mt-3 space-y-2.5">
              {project.architectureDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent-500 flex-shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Layers className="h-4 w-4 text-accent-500" />
              Technologies Used
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/5 dark:bg-white/[0.04] dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <GithubIcon className="h-4 w-4" />
            View Repository
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-accent-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-accent-600/25 transition hover:bg-accent-700"
            >
              <ExternalLink className="h-4 w-4" />
              Launch Live App
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
