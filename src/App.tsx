import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { QuickAccessModal } from './components/QuickAccessModal';
import { ResumeModal } from './components/ResumeModal';

// Doodle Studio Portfolio
import { Home } from './pages/Home';

export function App() {
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-white text-black transition-colors duration-200">
          {/* Scroll reset or smooth scroll to hash on route change */}
          <ScrollToTop />

          {/* Single-Page Minimalist Navigation Header */}
          <Header
            onOpenQuickAccess={() => setQuickAccessOpen(true)}
          />

          {/* Page Routing */}
          <main className="relative z-10 min-h-[calc(100vh-280px)]">
            <Routes>
              <Route path="/" element={<Home onOpenResume={() => setResumeOpen(true)} />} />
              <Route path="/studio" element={<Navigate to="/#studio" replace />} />
              <Route path="/blueprints" element={<Navigate to="/#blueprints" replace />} />
              <Route path="/projects" element={<Navigate to="/#blueprints" replace />} />
              <Route path="/credentials" element={<Navigate to="/#credentials" replace />} />
              <Route path="/experience" element={<Navigate to="/#credentials" replace />} />
              <Route path="/work/experience" element={<Navigate to="/#credentials" replace />} />
              <Route path="/certifications" element={<Navigate to="/#credentials" replace />} />
              <Route path="/work/certifications" element={<Navigate to="/#credentials" replace />} />
              <Route path="/skills" element={<Navigate to="/#credentials" replace />} />
              <Route path="/work/skills-and-tools" element={<Navigate to="/#credentials" replace />} />
              <Route path="/connect" element={<Navigate to="/#connect" replace />} />
              <Route path="/contact" element={<Navigate to="/#connect" replace />} />
              <Route path="/work/contact" element={<Navigate to="/#connect" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Pure Full-Width Crowd Canvas Footer */}
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
