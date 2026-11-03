import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { KineticHero } from '../components/KineticHero';
import { ProjectsSection } from '../components/ProjectsSection';
import { SkillsSection } from '../components/SkillsSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { TILSection } from '../components/TILSection';
import { ContactSection } from '../components/ContactSection';

interface HomeProps {
  onOpenResume: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenResume }) => {
  const location = useLocation();

  // Scroll to hash anchor on mount or location hash change
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
    <div className="relative overflow-hidden">
      {/* 1. Kinetic Telemetry Hero (Option A + C Hybrid) */}
      <div id="hero">
        <KineticHero onOpenResume={onOpenResume} />
      </div>

      {/* 2. Selected Works / Projects */}
      <ProjectsSection />

      {/* 3. Technical Arsenal / Skills & Stack */}
      <SkillsSection />

      {/* 4. Experience & Verified Credentials */}
      <ExperienceSection />

      {/* 5. Today I Learned (T.I.L) Architectural Logbook */}
      <TILSection />

      {/* 6. Direct Contact & Communications Dock with Skiper39 Crowd Canvas */}
      <ContactSection />
    </div>
  );
};
