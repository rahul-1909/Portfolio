import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FraDoodleHero } from '../components/FraDoodleHero';
import { DoodleMarquee } from '../components/DoodleMarquee';
import { FraAboutSection } from '../components/FraAboutSection';
import { FraProjectsSection } from '../components/FraProjectsSection';
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
      {/* 1. Fra! Doodle Hero */}
      <FraDoodleHero onOpenResume={onOpenResume} />

      {/* Marquee Ticker 1 */}
      <DoodleMarquee 
        items={[
          'BACKEND ARCHITECTURES', 
          'ASGI MICROSERVICES', 
          'LANGGRAPH MULTI-AGENT RAG', 
          'SUB-14MS VECTOR SEARCH', 
          'PYTHON & GO LANG', 
          'VIRTUSA ALUMNI',
          'DOCKER & AWS'
        ]} 
        bgColor="bg-black" 
        textColor="text-white" 
      />

      {/* 2. Who is Rahul? (Ma chi è fra?) */}
      <FraAboutSection />

      {/* Marquee Ticker 2 (Yellow Reverse) */}
      <DoodleMarquee 
        items={[
          'SELECTED PRODUCTION WORKS', 
          'HIGH-THROUGHPUT PIPELINES', 
          'ARCHITECTURAL BLUEPRINTS', 
          'AST QUERY VALIDATION', 
          'JWT STATELESS RBAC'
        ]} 
        reverse={true} 
        bgColor="bg-[#FFE600]" 
        textColor="text-black" 
        speed="fast" 
      />

      {/* 3. Projects Packed with Lines & Code */}
      <FraProjectsSection />

      {/* 4. The Grand Crowd Contact Hub (Contact Station + Skiper UI Crowd Canvas) */}
      <FraCrowdContactSection onOpenResume={onOpenResume} />
    </div>
  );
};
