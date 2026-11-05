import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';

// Phase 1 Replica Pages (Faithful structural replica of gabrielbeaugonin.com)
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
          {/* Gabriel Beaugonin Exact Replica Routes */}
          <Route path="/" element={<ReplicaHome />} />
          <Route path="/about" element={<ReplicaAbout />} />
          <Route path="/project/:projectId" element={<ReplicaProject />} />

          {/* Redirect auxiliary routes to home during Phase 1 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
