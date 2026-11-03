import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DoodleStudioHero } from '../components/DoodleStudioHero';
import { DoodleBlueprints } from '../components/DoodleBlueprints';
import { DoodleCredentialsWall } from '../components/DoodleCredentialsWall';
import { DoodleCoffeeConnect } from '../components/DoodleCoffeeConnect';

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
      {/* 1. The Doodle Studio / Hero */}
      <DoodleStudioHero onOpenResume={onOpenResume} />

      {/* 2. Project Blueprints & Schematics */}
      <DoodleBlueprints />

      {/* 3. The Credentials & Commercial Experience Wall */}
      <DoodleCredentialsWall />

      {/* 4. Coffee Stand / Direct Connect */}
      <DoodleCoffeeConnect onOpenResume={onOpenResume} />
    </div>
  );
};
