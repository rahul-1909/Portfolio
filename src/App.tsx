import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { QuickAccessModal } from './components/QuickAccessModal';
import { ResumeModal } from './components/ResumeModal';

// Single-Page Storytelling Hub
import { Home } from './pages/Home';

export function App() {
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 transition-colors duration-300">
          {/* Scroll reset or smooth scroll to hash on route change */}
          <ScrollToTop />

          {/* Background Ambient Network */}
          <InteractiveCanvas />

          {/* Single-Page Navigation Header with Smooth Anchor Scrolling & Section Spy */}
          <Header
            onOpenQuickAccess={() => setQuickAccessOpen(true)}
          />

          {/* Page Routing */}
          <main className="relative z-10 min-h-[calc(100vh-280px)]">
            <Routes>
              <Route path="/" element={<Home onOpenResume={() => setResumeOpen(true)} />} />
              <Route path="/projects" element={<Navigate to="/#projects" replace />} />
              <Route path="/today-i-learned" element={<Navigate to="/#til" replace />} />
              <Route path="/til" element={<Navigate to="/#til" replace />} />
              <Route path="/work/skills-and-tools" element={<Navigate to="/#skills" replace />} />
              <Route path="/skills" element={<Navigate to="/#skills" replace />} />
              <Route path="/work/experience" element={<Navigate to="/#experience" replace />} />
              <Route path="/experience" element={<Navigate to="/#experience" replace />} />
              <Route path="/work/certifications" element={<Navigate to="/#experience" replace />} />
              <Route path="/certifications" element={<Navigate to="/#experience" replace />} />
              <Route path="/work/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Action Center & Modals */}
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
