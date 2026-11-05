import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

  return (
    <main className="relative w-full h-screen max-phone:h-dvh overflow-hidden bg-light-grey text-light-black select-none">
      {/* 1. Left Column: Brand Anchor, Vertical/Mobile Menu, & Bottom Dock */}
      <div className="flex flex-col items-start justify-between h-screen fixed left-[25.7rem] py-[12rem] z-[120] max-phone:inset-0 max-phone:h-auto max-phone:w-full max-phone:left-0 max-phone:items-center max-phone:justify-between max-phone:pt-[3rem] max-phone:pb-[4rem] max-phone:pointer-events-none">
        {/* Brand Header with Vertical Text Menu */}
        <ReplicaHeader
          title={personalInfo.name}
          subtitle={personalInfo.role}
          activeDeck={activeDeck}
          onSelectDeck={handleSelectDeck}
        />

        {/* Bottom Navigation Dock */}
        <ReplicaDock />
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
