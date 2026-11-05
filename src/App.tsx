import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { QuickAccessModal } from './components/QuickAccessModal';
import { ResumeModal } from './components/ResumeModal';

// Pages
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CertificationsPage } from './pages/CertificationsPage';
import { TILPage } from './pages/TILPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll>
          <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans transition-colors duration-300">
            {/* Scroll reset on route change */}
            <ScrollToTop />

            {/* Custom Magnetic Cursor (Desktop) */}
            <CustomCursor />

            {/* Navigation Header */}
            <Header
              onOpenQuickAccess={() => setQuickAccessOpen(true)}
              onOpenResume={() => setResumeOpen(true)}
            />

            {/* Main Page Routing */}
            <main className="relative z-10 min-h-[calc(100vh-240px)]">
              <Routes>
                <Route path="/" element={<Home onOpenResume={() => setResumeOpen(true)} />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/today-i-learned" element={<TILPage />} />
                <Route path="/til" element={<Navigate to="/today-i-learned" replace />} />
                <Route path="/work/skills-and-tools" element={<SkillsPage />} />
                <Route path="/skills" element={<Navigate to="/work/skills-and-tools" replace />} />
                <Route path="/work/experience" element={<ExperiencePage />} />
                <Route path="/experience" element={<Navigate to="/work/experience" replace />} />
                <Route path="/work/certifications" element={<CertificationsPage />} />
                <Route path="/certifications" element={<Navigate to="/work/certifications" replace />} />
                <Route path="/work/contact" element={<ContactPage />} />
                <Route path="/contact" element={<Navigate to="/work/contact" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Editorial Footer */}
            <Footer />

            {/* Quick Access & Resume Modals */}
            <QuickAccessModal
              isOpen={quickAccessOpen}
              onClose={() => setQuickAccessOpen(false)}
              onOpenResume={() => setResumeOpen(true)}
            />

            <ResumeModal
              isOpen={resumeOpen}
              onClose={() => setResumeOpen(false)}
            />
          </div>
        </SmoothScroll>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
