import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';

// Phase 2 Personalized Pages
import { ReplicaHome } from './pages/replica/ReplicaHome';
import { ReplicaAbout } from './pages/replica/ReplicaAbout';
import { ReplicaProject } from './pages/replica/ReplicaProject';

export function App() {
  return (
    <BrowserRouter>
      {/* Scroll reset on route change */}
      <ScrollToTop />

      {/* Main Page Routing */}
      <div className="relative min-h-screen w-full bg-light-grey text-light-black font-sans selection:bg-light-black selection:text-white">
        <Routes>
          {/* Main Portfolio Routes */}
          <Route path="/" element={<ReplicaHome />} />
          <Route path="/about" element={<ReplicaAbout />} />

          {/* Individual Project Routes (/work/:slug and backward compatible /project/:projectId) */}
          <Route path="/work/:slug" element={<ReplicaProject />} />
          <Route path="/project/:projectId" element={<ReplicaProject />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
