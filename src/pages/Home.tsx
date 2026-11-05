import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DoodleHero } from '../components/DoodleHero';
import { ComicOdyssey } from '../components/ComicOdyssey';
import { DoodleWorkbench } from '../components/DoodleWorkbench';
import { DoodleToolChest } from '../components/DoodleToolChest';
import { DoodleConnect } from '../components/DoodleConnect';

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
      {/* 1. Full-Screen Skiper39 Crowd Stage (Hero) */}
      <DoodleHero onOpenResume={onOpenResume} />

      {/* 2. The Comic Odyssey (4-Panel Visual Journey & Virtusa Tenure) */}
      <ComicOdyssey />

      {/* 3. The Workbench (Selected Systems & Blueprints) */}
      <DoodleWorkbench />

      {/* 4. The Tool Chest (Weapons of Choice & Verified Certifications) */}
      <DoodleToolChest />

      {/* 5. The Street Dock / Coffee Shop Connect */}
      <DoodleConnect onOpenResume={onOpenResume} />
    </div>
  );
};
