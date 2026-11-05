import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { experienceData } from '../data/experience';

export const ExperiencePage: React.FC = () => {
  const serviceLetterUrl = "https://drive.google.com/file/d/13vHdfLoxY705xedUs1SP6itxNkY2wXp-/view?usp=sharing";

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Page Header */}
        <header className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
            <span>GET /work/experience</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-text-light dark:text-text-dark tracking-display">
            Experience
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
            Hands-on software development experience across backend architectures, full-stack workflows, API integration, and production-oriented engineering practices.
          </p>
        </header>

        {/* Experience Timeline */}
        <div className="flex flex-col space-y-12 max-w-4xl">
          {experienceData.map((item) => (
            <article
              key={item.id}
              className="border-b border-border-light dark:border-border-dark pb-12"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-text-light dark:text-text-dark">
                  {item.role}{' '}
                  <span className="text-accent-light dark:text-accent-dark font-sans font-medium">
                    @ {item.company}
                  </span>
                </h2>
                <span className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark">
                  {item.period}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-6">
                <span>{item.location}</span>
                <span>•</span>
                <span className="text-accent-light dark:text-accent-dark">{item.type}</span>
              </div>

              {/* Summary */}
              <p className="text-sm sm:text-base text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed mb-6">
                {item.summary}
              </p>

              {/* Responsibilities */}
              <div className="mb-6">
                <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider mb-3">
                  Key Responsibilities &amp; Impact
                </div>
                <ul className="flex flex-col gap-2.5">
                  {item.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="relative pl-6 text-sm sm:text-base text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed"
                    >
                      <span className="absolute left-0 top-0 font-mono text-accent-light dark:text-accent-dark">
                        →
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-light dark:border-border-dark">
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={serviceLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-light dark:text-accent-dark hover:underline"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Service Letter</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
