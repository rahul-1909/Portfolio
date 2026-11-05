import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Layers, 
  BookOpen, 
  Mail, 
  FileText, 
  Sun, 
  Moon, 
  X,
  ExternalLink,
  Check,
  Copy
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';
import { tilEntries } from '../data/til';
import { profileData } from '../data/profile';

interface FloatingDockProps {
  onOpenResume?: () => void;
}

type DrawerSection = 'experience' | 'stack' | 'changelog' | 'contact' | null;

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<DrawerSection>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Exact approved skills list
  const trimmedSkills = [
    { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
    { category: 'Backend', items: ['Spring Boot', 'FastAPI', 'Node.js'] },
    { category: 'AI & ML', items: ['LangGraph', 'RAG', 'PyTorch', 'TensorFlow'] },
    { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Qdrant'] },
    { category: 'Cloud & DevOps', items: ['Docker', 'AWS', 'Azure', 'Linux', 'Git', 'CI/CD'] },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      {/* Floating Pill Bar (Gabriel Beaugonin Style Dock) */}
      <nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-[5.5rem] lg:translate-x-0 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-xl border border-border-strongLight dark:border-border-strongDark shadow-2xl"
        aria-label="Floating Navigation Dock"
      >
        {/* Experience Pill */}
        <button
          onClick={() => setActiveSection(activeSection === 'experience' ? null : 'experience')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs transition-colors ${
            activeSection === 'experience'
              ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
              : 'text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-elevatedLight dark:hover:bg-surface-elevatedDark'
          }`}
          title="Experience & Career History"
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Experience</span>
        </button>

        {/* Stack & Credentials Pill */}
        <button
          onClick={() => setActiveSection(activeSection === 'stack' ? null : 'stack')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs transition-colors ${
            activeSection === 'stack'
              ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
              : 'text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-elevatedLight dark:hover:bg-surface-elevatedDark'
          }`}
          title="Tech Stack & Certifications"
        >
          <Layers className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Stack</span>
        </button>

        {/* Changelog Pill */}
        <button
          onClick={() => setActiveSection(activeSection === 'changelog' ? null : 'changelog')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs transition-colors ${
            activeSection === 'changelog'
              ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
              : 'text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-elevatedLight dark:hover:bg-surface-elevatedDark'
          }`}
          title="Learning Log & Changelog"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Log</span>
        </button>

        {/* Contact Pill */}
        <button
          onClick={() => setActiveSection(activeSection === 'contact' ? null : 'contact')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs transition-colors ${
            activeSection === 'contact'
              ? 'bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold'
              : 'text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-elevatedLight dark:hover:bg-surface-elevatedDark'
          }`}
          title="Contact & Direct Inquiries"
        >
          <Mail className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Contact</span>
        </button>

        <div className="h-4 w-px bg-border-light dark:bg-border-dark mx-0.5" />

        {/* Resume Pill */}
        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full font-mono text-xs text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            title="Open Resume"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Resume</span>
          </button>
        )}

        {/* Theme Toggle Pill */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondaryLight dark:text-text-secondaryDark hover:text-text-light dark:hover:text-text-dark transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-slate-700" />}
        </button>
      </nav>

      {/* Slide-over Overlay Panel (Gabriel Beaugonin Detail View) */}
      {activeSection && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveSection(null)}
          />

          {/* Slide-over Drawer */}
          <div className="relative w-full max-w-2xl h-full bg-background-light dark:bg-background-dark border-l border-border-light dark:border-border-dark shadow-2xl p-6 sm:p-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-border-light dark:border-border-dark">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-light dark:text-accent-dark">
                {activeSection === 'experience' && 'GET /experience'}
                {activeSection === 'stack' && 'GET /stack'}
                {activeSection === 'changelog' && 'GET /today-i-learned'}
                {activeSection === 'contact' && 'POST /contact'}
              </span>

              <button
                onClick={() => setActiveSection(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border-light dark:border-border-dark text-text-mutedLight dark:text-text-mutedDark hover:text-text-light dark:hover:text-text-dark"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Experience Section Content */}
            {activeSection === 'experience' && (
              <div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-light dark:text-text-dark mb-4">
                  Experience
                </h2>
                <p className="text-sm text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed mb-8">
                  Hands-on software development across scalable backend microservices, SQL performance, and CI/CD automation.
                </p>

                {experienceData.map((exp) => (
                  <div key={exp.id} className="mb-8 pb-8 border-b border-border-light dark:border-border-dark">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <h3 className="font-display font-bold text-xl text-text-light dark:text-text-dark">
                        {exp.role}{' '}
                        <span className="text-accent-light dark:text-accent-dark font-sans font-medium">
                          @ {exp.company}
                        </span>
                      </h3>
                      <span className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark">
                        {exp.period}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-4">
                      {exp.location} • {exp.type}
                    </div>

                    <ul className="flex flex-col gap-2 mb-6">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="relative pl-5 text-xs sm:text-sm text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">
                          <span className="absolute left-0 top-0 font-mono text-accent-light dark:text-accent-dark">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span key={t} className="font-mono text-xs px-2 py-0.5 rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <Link
                  to="/work/experience"
                  onClick={() => setActiveSection(null)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-light dark:text-accent-dark hover:underline"
                >
                  <span>Open Dedicated Experience Page</span>
                  <span>→</span>
                </Link>
              </div>
            )}

            {/* Stack & Credentials Content */}
            {activeSection === 'stack' && (
              <div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-light dark:text-text-dark mb-4">
                  Stack &amp; Credentials
                </h2>
                <p className="text-sm text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed mb-8">
                  Core technologies and formally verified professional certifications.
                </p>

                {/* Technologies */}
                <div className="mb-10">
                  <h3 className="font-display font-bold text-lg text-text-light dark:text-text-dark pb-2 border-b border-border-light dark:border-border-dark mb-4">
                    Technologies
                  </h3>
                  <div className="space-y-4">
                    {trimmedSkills.map((cat) => (
                      <div key={cat.category}>
                        <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider mb-1.5">
                          {cat.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((skill) => (
                            <span key={skill} className="font-mono text-xs px-2.5 py-1 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-8">
                  <h3 className="font-display font-bold text-lg text-text-light dark:text-text-dark pb-2 border-b border-border-light dark:border-border-dark mb-4">
                    Verified Certifications
                  </h3>
                  <div className="space-y-3">
                    {certificationsData.map((c) => (
                      <a
                        key={c.id}
                        href={c.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors group"
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                          <span className="text-accent-light dark:text-accent-dark">{c.issuer}</span>
                          <span className="text-text-mutedLight dark:text-text-mutedDark">{c.category}</span>
                        </div>
                        <div className="font-sans font-semibold text-sm text-text-light dark:text-text-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
                          {c.title}
                        </div>
                        <span className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark inline-flex items-center gap-1 mt-1">
                          Verify Credential ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 font-mono text-xs">
                  <Link to="/work/skills-and-tools" onClick={() => setActiveSection(null)} className="text-accent-light dark:text-accent-dark hover:underline">
                    Skills Page →
                  </Link>
                  <Link to="/work/certifications" onClick={() => setActiveSection(null)} className="text-accent-light dark:text-accent-dark hover:underline">
                    Certifications Page →
                  </Link>
                </div>
              </div>
            )}

            {/* Changelog Content */}
            {activeSection === 'changelog' && (
              <div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-light dark:text-text-dark mb-4">
                  Today I Learned
                </h2>
                <p className="text-sm text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed mb-8">
                  Continuous architecture breakthroughs and distributed systems takeaways.
                </p>

                <div className="flex flex-col border-l border-border-light dark:border-border-dark ml-2 pl-6 space-y-8 mb-8">
                  {tilEntries.map((e) => (
                    <article key={e.id} className="relative">
                      <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-background-light dark:bg-background-dark border-2 border-accent-light dark:border-accent-dark" />
                      <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark mb-1">
                        {e.date} • <span className="text-accent-light dark:text-accent-dark">{e.tags[0]}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-text-light dark:text-text-dark mb-1.5">
                        {e.topic}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed mb-2">
                        {e.summary}
                      </p>
                      <div className="font-mono text-xs text-text-secondaryLight dark:text-text-secondaryDark bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-2.5 rounded">
                        <span className="text-accent-light dark:text-accent-dark font-semibold">Takeaway: </span>
                        <span>{e.keyTakeaway}</span>
                      </div>
                    </article>
                  ))}
                </div>

                <Link
                  to="/today-i-learned"
                  onClick={() => setActiveSection(null)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-light dark:text-accent-dark hover:underline"
                >
                  <span>Open Full Changelog Page</span>
                  <span>→</span>
                </Link>
              </div>
            )}

            {/* Contact Content */}
            {activeSection === 'contact' && (
              <div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-light dark:text-text-dark mb-4">
                  Let's build something.
                </h2>
                <p className="text-sm text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed mb-8">
                  Available for backend engineering and AI systems roles worldwide.
                </p>

                <div className="p-6 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark mb-6">
                  <div className="font-mono text-xs text-text-mutedLight dark:text-text-mutedDark uppercase tracking-wider mb-2">
                    Direct Email
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a
                      href={profileData.socials.email}
                      className="font-mono text-lg text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                    >
                      {profileData.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-surface-elevatedLight dark:bg-surface-elevatedDark border border-border-strongLight dark:border-border-strongDark text-text-light dark:text-text-dark"
                    >
                      {copiedEmail ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs mb-8">
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors flex items-center justify-between"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3 w-3 text-accent-light dark:text-accent-dark" />
                  </a>
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors flex items-center justify-between"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3 text-accent-light dark:text-accent-dark" />
                  </a>
                  <a
                    href={profileData.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-accent-borderLight dark:hover:border-accent-borderDark transition-colors flex items-center justify-between"
                  >
                    <span>Twitter / X</span>
                    <ExternalLink className="h-3 w-3 text-accent-light dark:text-accent-dark" />
                  </a>
                </div>

                <Link
                  to="/work/contact"
                  onClick={() => setActiveSection(null)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-light dark:text-accent-dark hover:underline"
                >
                  <span>Open Contact Page</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
