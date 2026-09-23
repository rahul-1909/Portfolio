import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { TIL } from './components/TIL';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { QuickAccessModal } from './components/QuickAccessModal';
import { ResumeModal } from './components/ResumeModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import type { Project } from './data/projects';

export function App() {
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Ambient Canvas Background */}
        <InteractiveCanvas />

        {/* Global Navigation */}
        <Navbar
          onOpenQuickAccess={() => setQuickAccessOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <About />
          <Experience />
          <Projects onSelectProject={(p) => setSelectedProject(p)} />
          <Skills />
          <Certifications />
          <TIL />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Command Dialogs */}
        <QuickAccessModal
          isOpen={quickAccessOpen}
          onClose={() => setQuickAccessOpen(false)}
          onOpenResume={() => setResumeOpen(true)}
        />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
