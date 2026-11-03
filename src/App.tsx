import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { QuickAccessModal } from './components/QuickAccessModal';
import { ResumeModal } from './components/ResumeModal';

// Fra! Doodle Portfolio
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
          <Header />

          {/* Page Routing */}
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hero" element={<Navigate to="/#hero" replace />} />
              <Route path="/about" element={<Navigate to="/#intro" replace />} />
              <Route path="/intro" element={<Navigate to="/#intro" replace />} />
              <Route path="/projects" element={<Navigate to="/#projects" replace />} />
              <Route path="/works" element={<Navigate to="/#projects" replace />} />
              <Route path="/services" element={<Navigate to="/#services" replace />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

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
