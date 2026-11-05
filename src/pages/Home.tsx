import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';
import { tilEntries } from '../data/til';
import { profileData } from '../data/profile';
import { Project3DWheel } from '../components/Project3DWheel';
import { FloatingDock } from '../components/FloatingDock';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onOpenResume?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenResume }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullTrace = 'GET /api/v1/system/health --region=ap-south-1 [hyderabad] -> 200 OK (9ms)';
  const [traceText, setTraceText] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return fullTrace;
    }
    return '';
  });

  // Approved trimmed skills list
  const trimmedSkills = [
    { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
    { category: 'Backend', items: ['Spring Boot', 'FastAPI', 'Node.js'] },
    { category: 'AI & ML', items: ['LangGraph', 'RAG', 'PyTorch', 'TensorFlow'] },
    { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Qdrant'] },
    { category: 'Cloud & DevOps', items: ['Docker', 'AWS', 'Azure', 'Linux', 'Git', 'CI/CD'] },
  ];

  // Terminal typewriter effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= fullTrace.length) {
          setTraceText(fullTrace.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // GSAP Animations (Hero Reveal + Section Heading Reveals)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.hero-name-line', '.hero-sub-element', '.section-heading-reveal'], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      // Hero Name Reveal: upward wipe
      gsap.from('.hero-name-line', {
        yPercent: 100,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power4.out',
      });

      // Hero Sub Elements: fade & translate
      gsap.from('.hero-sub-element', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.15,
      });

      // Subtle Section Heading Reveals
      gsap.utils.toArray<HTMLElement>('.section-heading-reveal').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getProjectRoute = (id: string) => {
    switch (id) {
      case 'gold-lending-platform':
        return '/work/gold-lending-platform';
      case 'multi-agent-autonomous-rag':
        return '/work/rag-engine';
      case 'nl-to-sql-converter':
        return '/work/nl-sql-copilot';
      case 'linkedin-intelligence-api':
        return '/work/profile-intelligence';
      case 'production-ai-customer-support-agent':
        return '/work/ai-support-agent';
      default:
        return `/work/${id}`;
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Gabriel Beaugonin Style Floating Pill Dock (Quick Drawers for Experience, Stack, Log, Contact) */}
      <FloatingDock onOpenResume={onOpenResume} />

      {/* ====================================================================
          1. Hero Section (Gabriel Beaugonin 3D Perspective Stage)
          ==================================================================== */}
      <section className="relative min-h-screen lg:h-screen lg:overflow-hidden flex flex-col justify-center pt-20 pb-12 lg:pt-16 lg:pb-8">
        <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Brand & Hero Identity */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">
            {/* Live Request Trace Line */}
            <div className="hero-sub-element inline-flex items-center gap-2 font-mono text-xs text-text-mutedLight dark:text-text-mutedDark bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded px-3 py-1.5 mb-6 max-w-full overflow-x-auto whitespace-nowrap">
              <span className="text-accent-light dark:text-accent-dark font-semibold">&gt; trace</span>
              <span>{traceText}</span>
            </div>

            {/* Signature Hero Name Reveal */}
            <div className="overflow-hidden py-1">
              <h1 className="hero-name-line font-display font-extrabold text-[clamp(3.8rem,7.5vw,7.8rem)] leading-[0.88] tracking-display uppercase text-text-light dark:text-text-dark select-none">
                Rahul
              </h1>
            </div>
            <div className="overflow-hidden py-1 mb-3">
              <div className="hero-name-line font-display font-extrabold text-[clamp(3.8rem,7.5vw,7.8rem)] leading-[0.88] tracking-display uppercase text-text-light dark:text-text-dark select-none">
                Teja
                <span className="text-accent-light dark:text-accent-dark animate-cursor-blink font-light">
                  _
                </span>
              </div>
            </div>

            {/* Subtitle & Role */}
            <div className="hero-sub-element font-mono text-xs uppercase tracking-widest text-accent-light dark:text-accent-dark font-semibold mb-3">
              Software Developer • Distributed Systems &amp; AI
            </div>

            <p className="hero-sub-element text-xs sm:text-sm md:text-base text-text-secondaryLight dark:text-text-secondaryDark max-w-lg leading-relaxed mb-4 sm:mb-6 font-sans">
              {profileData.bio}
            </p>

            {/* Status & Quick Actions */}
            <div className="hero-sub-element flex flex-wrap items-center gap-4 pt-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-text-secondaryLight dark:text-text-secondaryDark">
                <span className="h-2 w-2 rounded-full bg-accent-light dark:bg-accent-dark shadow-[0_0_8px_rgba(0,229,160,0.8)]" />
                <span>Available for backend &amp; AI systems roles</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-md bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold transition hover:opacity-90"
                >
                  <span>All Projects</span>
                  <span>↗</span>
                </Link>
                <a
                  href="#work"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-md border border-border-strongLight dark:border-border-strongDark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark transition-colors"
                >
                  <span>Specs</span>
                  <span>↓</span>
                </a>
              </div>
            </div>

            {/* 3D Wheel Navigation Hint */}
            <div className="hero-sub-element hidden lg:flex items-center gap-2 mt-8 font-mono text-[11px] text-text-mutedLight dark:text-text-mutedDark">
              <span className="text-accent-light dark:text-accent-dark">✦</span>
              <span>Drag, scroll, or use arrows to rotate 3D showcase wheel</span>
            </div>
          </div>

          {/* Right Column: 3D Perspective Wheel Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative py-6 lg:py-0">
            <Project3DWheel projects={projectsData.slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. Selected Work Section (GET /work/... Route Style, No 01-05 numbers)
          ==================================================================== */}
      <section id="work" className="border-t border-border-light dark:border-border-dark py-20 sm:py-28">
        <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
              <span>GET /work</span>
            </div>
            <h2 className="section-heading-reveal font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text-light dark:text-text-dark tracking-display">
              Selected Work
            </h2>
          </div>

          {/* Project Rows */}
          <div className="flex flex-col">
            {projectsData.slice(0, 5).map((project) => {
              const route = getProjectRoute(project.id);
              return (
                <article
                  key={project.id}
                  className="group relative border-b border-border-light dark:border-border-dark py-8 transition-all hover:bg-surface-light/40 dark:hover:bg-surface-dark/40"
                >
                  <div className="flex flex-col">
                    {/* Route Bar */}
                    <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-accent-light dark:text-accent-dark font-bold">GET</span>
                        <span>{route}</span>
                      </div>
                      <span className="text-[11px] text-text-mutedLight dark:text-text-mutedDark">
                        200 OK
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-text-light dark:text-text-dark mb-3 tracking-tight group-hover:-translate-y-0.5 transition-transform">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-text-secondaryLight dark:text-text-secondaryDark max-w-3xl leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech Tags & Links */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs px-2.5 py-1 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-accent-light dark:hover:text-accent-dark transition-colors px-2 py-1 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
                          >
                            <span>Live</span>
                            <span>↗</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-text-mutedLight dark:text-text-mutedDark hover:text-accent-light dark:hover:text-accent-dark transition-colors px-2 py-1 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
                          >
                            <span>Source</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="pt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline"
            >
              <span>Explore all projects and architecture specs</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. Experience Block (Virtusa, Aug 2025 – Jun 2026)
          ==================================================================== */}
      <section id="experience" className="border-t border-border-light dark:border-border-dark py-20 sm:py-28">
        <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
              <span>GET /experience</span>
            </div>
            <h2 className="section-heading-reveal font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text-light dark:text-text-dark tracking-display">
              Experience
            </h2>
          </div>

          <div className="flex flex-col">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="py-8 border-b border-border-light dark:border-border-dark"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-text-light dark:text-text-dark">
                    {exp.role}{' '}
                    <span className="text-accent-light dark:text-accent-dark font-sans font-medium">
                      @ {exp.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark">
                    {exp.period}
                  </span>
                </div>

                <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-6">
                  {exp.location}
                </div>

                <ul className="flex flex-col gap-2.5 max-w-3xl">
                  {exp.responsibilities.map((resp, idx) => (
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
            ))}
          </div>

          <div className="pt-10">
            <Link
              to="/work/experience"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline"
            >
              <span>View complete timeline &amp; engineering achievements</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. Stack & Certifications Section (Two Columns)
          ==================================================================== */}
      <section id="stack" className="border-t border-border-light dark:border-border-dark py-20 sm:py-28">
        <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
              <span>GET /stack</span>
            </div>
            <h2 className="section-heading-reveal font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text-light dark:text-text-dark tracking-display">
              Stack &amp; Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Trimmed Approved Skills */}
            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-light dark:text-text-dark pb-3 border-b border-border-light dark:border-border-dark mb-8">
                Technologies
              </h3>

              <div className="flex flex-col gap-6">
                {trimmedSkills.map((group) => (
                  <div key={group.category}>
                    <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider mb-2.5">
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-xs px-3 py-1.5 rounded-md bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link
                  to="/work/skills-and-tools"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline"
                >
                  <span>Explore in-depth tools breakdown</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right: Verified Certifications */}
            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-light dark:text-text-dark pb-3 border-b border-border-light dark:border-border-dark mb-8">
                Verified Certifications
              </h3>

              <div className="flex flex-col gap-4">
                {certificationsData.map((cert) => (
                  <a
                    key={cert.id}
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors group"
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="text-accent-light dark:text-accent-dark uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                      <span className="text-text-mutedLight dark:text-text-mutedDark text-[11px]">
                        {cert.category}
                      </span>
                    </div>

                    <h4 className="font-sans font-semibold text-base text-text-light dark:text-text-dark mb-1 group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
                      {cert.title}
                    </h4>

                    <span className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark inline-flex items-center gap-1">
                      Verify Credential ↗
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-8">
                <Link
                  to="/work/certifications"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline"
                >
                  <span>View all certification metadata</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. Learning Log (TIL / Changelog) — Real repo data from til.ts
          ==================================================================== */}
      {tilEntries.length > 0 && (
        <section id="log" className="border-t border-border-light dark:border-border-dark py-20 sm:py-28">
          <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8">
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
                <span>CHANGELOG</span>
              </div>
              <h2 className="section-heading-reveal font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text-light dark:text-text-dark tracking-display">
                Learning Log
              </h2>
            </div>

            {/* Changelog Entries */}
            <div className="flex flex-col border-l border-border-light dark:border-border-dark ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12">
              {tilEntries.map((entry) => (
                <article key={entry.id} className="relative">
                  {/* Dot on timeline */}
                  <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-2.5 w-2.5 rounded-full bg-background-light dark:bg-background-dark border-2 border-accent-light dark:border-accent-dark" />

                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs mb-2">
                    <span className="text-text-mutedLight dark:text-text-mutedDark">{entry.date}</span>
                    <span className="text-accent-light dark:text-accent-dark bg-accent-mutedLight dark:bg-accent-mutedDark px-2 py-0.5 rounded text-[11px]">
                      {entry.tags[0] || 'Engineering'}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-text-light dark:text-text-dark mb-2">
                    {entry.topic}
                  </h3>

                  <p className="text-sm sm:text-base text-text-secondaryLight dark:text-text-secondaryDark max-w-3xl leading-relaxed mb-3">
                    {entry.summary}
                  </p>

                  <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-3 rounded-md max-w-2xl">
                    <span className="text-accent-light dark:text-accent-dark font-semibold">Key Takeaway: </span>
                    <span>{entry.keyTakeaway}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="pt-10 pl-6 sm:pl-10">
              <Link
                to="/today-i-learned"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline"
              >
                <span>Read all TIL notes &amp; takeaways</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          6. Contact Section (Large "Let's build something." headline)
          ==================================================================== */}
      <section id="contact" className="border-t border-border-light dark:border-border-dark py-24 sm:py-36">
        <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-light dark:text-accent-dark uppercase tracking-wider mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark" />
            <span>POST /contact</span>
          </div>

          <h2 className="font-display font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-display text-text-light dark:text-text-dark mb-10 max-w-4xl">
            Let's build something.
          </h2>

          <div className="flex flex-col gap-6 mb-12">
            <div>
              <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-2">
                DIRECT INQUIRIES
              </div>
              <a
                href={profileData.socials.email}
                className="font-mono text-xl sm:text-2xl md:text-3xl text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors inline-flex items-center gap-2"
              >
                <span>{profileData.email}</span>
                <span>↗</span>
              </a>
            </div>

            {/* Social Channels */}
            <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark transition-colors"
              >
                <span>GitHub</span>
                <span className="text-accent-light dark:text-accent-dark">↗</span>
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark transition-colors"
              >
                <span>LinkedIn</span>
                <span className="text-accent-light dark:text-accent-dark">↗</span>
              </a>

              <a
                href={profileData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark transition-colors"
              >
                <span>X / Twitter</span>
                <span className="text-accent-light dark:text-accent-dark">↗</span>
              </a>

              <Link
                to="/work/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-border-strongLight dark:border-border-strongDark bg-surface-elevatedLight dark:bg-surface-elevatedDark text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark transition-colors"
              >
                <span>Terminal Message Form</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
