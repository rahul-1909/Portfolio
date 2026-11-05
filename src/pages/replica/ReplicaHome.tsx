import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaSlider } from '../../components/replica/ReplicaSlider';
import { ReplicaStepper } from '../../components/replica/ReplicaStepper';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { ReplicaHomeCover } from '../../components/replica/ReplicaHomeCover';
import { homeContainers, type HomeContainerItem } from '../../data/homeContainers';
import { personalInfo } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaHome: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useSEO({
    title: personalInfo.headline,
    description: personalInfo.metaDescription,
    url: 'https://www.nrahulteja.me/',
  });

  // Verify and log exact vertical centering
  React.useEffect(() => {
    const measure = () => {
      const card = document.querySelector('[data-active-card="true"]');
      if (card) {
        const rect = card.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const expectedCenterY = window.innerHeight / 2;
        const diff = Math.abs(centerY - expectedCenterY);
        console.log(`[MEASUREMENT] viewport=${window.innerWidth}x${window.innerHeight} cardTop=${rect.top.toFixed(1)} cardHeight=${rect.height.toFixed(1)} cardCenterY=${centerY.toFixed(2)} expectedCenterY=${expectedCenterY.toFixed(2)} diff=${diff.toFixed(2)}px`);
      }
    };
    window.addEventListener('resize', measure);
    const t1 = setTimeout(measure, 150);
    const t2 = setTimeout(measure, 600);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeIndex]);

  const handleOpenContainer = (container: HomeContainerItem) => {
    navigate(container.path);
  };

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-light-grey text-light-black select-none">
      {/* 1. Left Column: Vertically Centered Name Block, Two Pills, & Single Muted Line */}
      <div className="flex flex-col items-start justify-center h-screen fixed left-[25.7rem] gap-[2.4rem] z-[120] max-phone:fixed max-phone:inset-0 max-phone:h-auto max-phone:w-full max-phone:left-0 max-phone:items-center max-phone:justify-between max-phone:pt-[3.6rem] max-phone:pb-[3.6rem] max-phone:gap-0 max-phone:pointer-events-none">
        {/* Name Block: Vertically centered in left column */}
        <div className="pointer-events-auto flex flex-col items-start max-phone:items-center max-phone:text-center">
          <ReplicaHeader
            title={personalInfo.name}
            subtitle={personalInfo.role}
          />
          {/* Mobile-only muted line directly under the header */}
          <p className="hidden max-phone:block text-[1.15rem] text-grey tracking-wide font-normal pt-2 cursor-default">
            Open to work · Hyderabad
          </p>
        </div>

        {/* Two Pills: Rounded squares directly below name block on desktop; pinned to bottom on mobile */}
        <div className="pointer-events-auto max-phone:order-last">
          <ReplicaDock />
        </div>

        {/* Single Muted Line below the pills on desktop */}
        <div className="pointer-events-auto max-phone:hidden">
          <p className="text-[1.25rem] text-grey tracking-wide font-normal cursor-default">
            Open to work · Hyderabad
          </p>
        </div>
      </div>

      {/* 2. Right Column: Exactly Centered 3D Wheel with 4 Containers */}
      <ReplicaSlider
        items={homeContainers}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onSelectItem={handleOpenContainer}
        renderItem={(container) => <ReplicaHomeCover id={container.id} />}
        ariaLabel="Portfolio Sections 3D Wheel"
      />

      {/* 3. Stepper Indicators: Exactly 4 dots on far right, centered on the same line */}
      <ReplicaStepper
        total={homeContainers.length}
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />
    </main>
  );
};
