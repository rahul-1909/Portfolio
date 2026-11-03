import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FraDoodleCursor } from '../components/FraDoodleCursor';
import { FraDoodleHero } from '../components/FraDoodleHero';
import { DoodleMarquee } from '../components/DoodleMarquee';
import { FraAboutSection } from '../components/FraAboutSection';
import { CircleClipTransition } from '../components/CircleClipTransition';
import { FraProjectsSection } from '../components/FraProjectsSection';
import { FraMenuWrap } from '../components/FraMenuWrap';
import { FraChallengesSection } from '../components/FraChallengesSection';
import { FraCrowdContactSection } from '../components/FraCrowdContactSection';

interface HomeProps {
  onOpenResume: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenResume }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [location.hash]);

  return (
    <div className="relative overflow-hidden bg-white text-black min-h-screen">
      {/* Interactive Custom Doodle Cursor (tracks and reacts on desktop) */}
      <FraDoodleCursor />

      {/* 1. Fra! Doodle Hero with Matter.js Interactive 2D Physics Canvas */}
      <FraDoodleHero onOpenResume={onOpenResume} />

      {/* Marquee Ticker 1 (High-Contrast Black Band) */}
      <DoodleMarquee 
        items={[
          'HIGH-THROUGHPUT ASGI MICROSERVICES', 
          'LANGGRAPH MULTI-AGENT RAG', 
          'SUB-14MS VECTOR SEARCH', 
          'GO LANG & PYTHON', 
          'VIRTUSA ALUMNI',
          'DOCKER & AWS CLOUD',
          'DISTRIBUTED REDIS CACHING'
        ]} 
        bgColor="bg-black" 
        textColor="text-white" 
      />

      {/* 2. Who is Rahul? (Ma chi è Rahul? - Dark Story & Verified Vault) */}
      <FraAboutSection />

      {/* 3. Circle Clip / Doodle Wave Transition */}
      <CircleClipTransition />

      {/* 4. Selected Projects Packed with Lines & Logic */}
      <FraProjectsSection />

      {/* Marquee Ticker 2 (Vibrant Yellow Reverse Band) */}
      <DoodleMarquee 
        items={[
          'ARCHITECTURAL BLUEPRINTS', 
          'SUB-14MS P99 LATENCY', 
          'AST QUERY VALIDATION', 
          'JWT STATELESS RBAC',
          'DISTRIBUTED MUTEX LOCKS',
          'ZERO DOWNTIME ROLLOVERS'
        ]} 
        reverse={true} 
        bgColor="bg-[#FFE600]" 
        textColor="text-black" 
        speed="fast" 
      />

      {/* 5. The Technical Repertoire (Interactive Capabilities Menu) */}
      <FraMenuWrap />

      {/* 6. The Engineering Challenges (Le Sfide Carousel + Challenge Him CTA) */}
      <FraChallengesSection />

      {/* 7. The Grand Crowd Contact Hub + Edge-to-Edge Animated Skiper UI Crowd Canvas */}
      <FraCrowdContactSection onOpenResume={onOpenResume} />
    </div>
  );
};
