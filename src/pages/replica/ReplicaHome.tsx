import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaSlider } from '../../components/replica/ReplicaSlider';
import { ReplicaStepper } from '../../components/replica/ReplicaStepper';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import {
  projectsDeck,
  skillsDeck,
  certificationsDeck,
  personalInfo,
  type DeckType,
  type DeckCardItem,
} from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read deck from URL or default to 'projects'
  const initialDeck = (searchParams.get('deck') as DeckType) || 'projects';
  const [activeDeck, setActiveDeck] = useState<DeckType>(
    ['projects', 'skills', 'certifications'].includes(initialDeck) ? initialDeck : 'projects'
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Synchronize deck changes with URL query parameter
  const handleSelectDeck = (deck: DeckType) => {
    setActiveDeck(deck);
    setActiveIndex(0);
    setSearchParams(deck === 'projects' ? {} : { deck });
  };

  useSEO({
    title: personalInfo.headline,
    description: personalInfo.metaDescription,
    url: 'https://www.nrahulteja.me/',
  });

  // Get active deck cards
  const cards: DeckCardItem[] =
    activeDeck === 'projects'
      ? projectsDeck
      : activeDeck === 'skills'
      ? skillsDeck
      : certificationsDeck;

  const handleSelectCard = (card: DeckCardItem) => {
    if (activeDeck === 'projects') {
      navigate(`/work/${card.id}`);
    } else if (activeDeck === 'certifications' && 'verificationUrl' in card) {
      window.open(card.verificationUrl, '_blank', 'noopener,noreferrer');
    } else if (activeDeck === 'skills') {
      navigate('/about');
    }
  };

  const menuItems = [
    { id: 'projects', label: 'Projects', isDeck: true },
    { id: 'skills', label: 'Skills', isDeck: true },
    { id: 'certifications', label: 'Certifications', isDeck: true },
    { id: 'experience', label: 'Experience', isDeck: false, href: '/experience' },
    { id: 'about', label: 'About', isDeck: false, href: '/about' },
  ] as const;

  const handleMenuClick = (item: typeof menuItems[number]) => {
    if (item.isDeck) {
      handleSelectDeck(item.id as DeckType);
    } else if (item.href) {
      navigate(item.href);
    }
  };

  return (
    <main className="relative w-full h-screen max-phone:h-dvh overflow-hidden bg-light-grey text-light-black select-none">
      {/* 1. Left Column: Vertically Centered Name, Pills, & 5-Item Menu */}
      <div className="flex flex-col items-start justify-center h-screen fixed left-[25.7rem] gap-[2.8rem] z-[120] max-phone:fixed max-phone:inset-0 max-phone:h-auto max-phone:w-full max-phone:left-0 max-phone:items-center max-phone:justify-between max-phone:pt-[3rem] max-phone:pb-[4rem] max-phone:gap-0 max-phone:pointer-events-none">
        
        {/* Name Block: Vertically centered in left column */}
        <div className="pointer-events-auto">
          <ReplicaHeader
            title={personalInfo.name}
            subtitle={personalInfo.role}
          />
        </div>

        {/* Two Pills: Directly below the name block */}
        <div className="pointer-events-auto max-phone:order-last">
          <ReplicaDock />
        </div>

        {/* 5-Item Menu & Muted Line: Directly below the pills */}
        <nav
          aria-label="Portfolio Sections Menu"
          className="flex flex-col gap-2 pointer-events-auto max-phone:order-2 max-phone:w-[92vw] max-phone:max-w-[370px] max-phone:overflow-x-auto max-phone:px-1 max-phone:py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <ul className="flex flex-col gap-1.5 max-phone:flex-row max-phone:items-center max-phone:gap-3 list-none p-0 m-0 max-phone:whitespace-nowrap">
            {menuItems.map((item) => {
              const isActive = item.isDeck && activeDeck === item.id;

              return (
                <li key={item.id} className="relative flex items-center shrink-0">
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`text-[1.3rem] max-phone:text-[1.15rem] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-black rounded-sm cursor-pointer inline-flex items-center gap-1.5 ${
                      isActive
                        ? 'text-light-black font-semibold'
                        : 'text-grey hover:text-light-black font-normal'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-dot"
                        className="w-1.5 h-1.5 rounded-full bg-light-black shrink-0"
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sub-menu Muted Line */}
          <div className="pt-2 text-[1.15rem] max-phone:text-[1rem] text-[#8C8C8C] font-normal leading-tight max-phone:hidden">
            Backend · AI/ML · Data · Open to work · Hyderabad
          </div>
        </nav>
      </div>

      {/* 2. 3D Cylindrical Perspective Deck Slider */}
      <ReplicaSlider
        cards={cards}
        deckType={activeDeck}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onSelectCard={handleSelectCard}
      />

      {/* 3. Right-Side Stepper Indicators: Dynamic length matching active deck size */}
      <ReplicaStepper
        total={cards.length}
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />
    </main>
  );
};
