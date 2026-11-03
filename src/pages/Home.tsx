import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FraDoodleHero } from '../components/FraDoodleHero';
import { DoodleMarquee } from '../components/DoodleMarquee';
import { FraAboutSection } from '../components/FraAboutSection';
import { CircleClipTransition } from '../components/CircleClipTransition';
import { FraProjectsSection } from '../components/FraProjectsSection';
import { FraMenuWrap } from '../components/FraMenuWrap';
import { FraChallengesSection } from '../components/FraChallengesSection';
import { FraCrowdContactSection } from '../components/FraCrowdContactSection';

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location.hash]);

  const clientMarquee = [
    'Vodafone',
    'Walt Disney',
    'Epsilon',
    'Clipper',
    'Nespresso',
    'Bic',
    'Superga',
    'Technogym',
    'Grazia',
    'Everli',
    'Ikea',
    'Pentel',
    'Vans',
    'Seat',
    'Timberland',
    'Eon',
    'Bombay Sapphire',
    'Metro',
    'Xiaomi',
    'Moleskine'
  ];

  return (
    <div className="relative overflow-hidden bg-white text-black min-h-screen">
      {/* 1. Hero with Matter.js Interactive 3D Physics Canvas & Tilting Showreel */}
      <FraDoodleHero />

      {/* Marquee Ticker 1: Disciplines */}
      <DoodleMarquee 
        bgColor="bg-black" 
        textColor="text-white" 
      />

      {/* 2. Ma chi è fra? (Dark Story Section with Omino Fra) */}
      <FraAboutSection />

      {/* 3. Wave / Circle Clip Transition */}
      <CircleClipTransition />

      {/* 4. Selected Works Showcase (IKEA, WAMI, XIAOMI GUINNESS RECORD) */}
      <FraProjectsSection />

      {/* Marquee Ticker 2: Major Brand Clients */}
      <DoodleMarquee 
        items={clientMarquee}
        reverse={true} 
        bgColor="bg-[#FFE600]" 
        textColor="text-black" 
        speed="fast" 
      />

      {/* 5. The 11 Core Specialties Menu (menu-wrap) */}
      <div id="services">
        <FraMenuWrap />
      </div>

      {/* 6. Le Sfide di Fra! (The Challenges & Sfidalo CTA) */}
      <FraChallengesSection />

      {/* 7. Contact Hub + Edge-to-Edge Animated Crowd Canvas + Fatto a Mano Footer */}
      <FraCrowdContactSection />
    </div>
  );
};
