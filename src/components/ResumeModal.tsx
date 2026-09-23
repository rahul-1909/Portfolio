import React from 'react';
import { X, Download, Mail, ExternalLink, Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { certificationsData } from '../data/certifications';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#12121a] sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 dark:border-white/10">
          <div>
            <span className="inline-block rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400">
              Curriculum Vitae Overview
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {profileData.name}
            </h2>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Software Developer — Backend Engineering & AI/ML
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {/* Executive Summary */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Briefcase className="h-3.5 w-3.5 text-accent-500" /> Professional Profile
            </h3>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
              Software Developer targeting Backend Engineering, AI/ML, and Software Engineering positions. Hands-on experience developing asynchronous RESTful APIs, agentic multi-agent RAG pipelines, stateless JWT RBAC architectures, and containerized microservices.
            </p>
          </div>

          {/* Experience Highlight */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Virtusa</span>
                <span className="text-xs text-slate-500 ml-2">Software Intern / Full Stack Intern</span>
              </div>
              <span className="text-xs font-medium text-accent-600 dark:text-accent-400">
                August 2025 – June 2026
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                <span>Engineered robust RESTful backend services adhering to production design standards.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                <span>Optimized SQL database queries and schema constraints for reliability and throughput.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                <span>Collaborated in CI/CD pipeline automation, Docker containerization, and unit testing.</span>
              </li>
            </ul>
          </div>

          {/* Key Verified Certifications */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Award className="h-3.5 w-3.5 text-accent-500" /> Key Certifications
            </h3>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {certificationsData.slice(0, 4).map((c) => (
                <a
                  key={c.id}
                  href={c.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-slate-200/70 p-2.5 text-xs transition hover:border-accent-500/40 hover:bg-accent-50/20 dark:border-white/5 dark:hover:bg-white/[0.04]"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{c.title}</span>
                  <ExternalLink className="h-3 w-3 text-slate-400 flex-shrink-0 ml-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Key Technical Competencies */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <GraduationCap className="h-3.5 w-3.5 text-accent-500" /> Core Tech Stack
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                "Python", "Java 17", "FastAPI", "Spring Boot 3.5", "LangGraph", "RAG",
                "Qdrant", "ChromaDB", "MySQL 9", "PostgreSQL", "Docker", "AWS", "JWT RBAC"
              ].map(tech => (
                <span
                  key={tech}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-white/10">
          <a
            href={profileData.socials.email}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"
          >
            <Mail className="h-4 w-4" />
            Request Full PDF by Email ({profileData.email})
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // If a PDF is placed in public/resume.pdf, it downloads; otherwise notifies recruiter
                const link = document.createElement('a');
                link.href = '#contact';
                window.location.hash = '#contact';
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl bg-accent-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-accent-600/25 transition hover:bg-accent-700"
            >
              <Download className="h-3.5 w-3.5" />
              Get in Touch for PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
