import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaSlider } from '../../components/replica/ReplicaSlider';
import { ReplicaStepper } from '../../components/replica/ReplicaStepper';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
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

  const handleOpenContainer = (container: HomeContainerItem) => {
    navigate(container.path);
  };

  return (
    <main className="relative w-full h-screen max-phone:h-dvh overflow-hidden bg-light-grey text-light-black select-none">
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

      {/* 2. Right Column: 3D Wheel with Exactly 4 Containers */}
      <div className="max-phone:absolute max-phone:inset-0 max-phone:flex max-phone:items-center max-phone:justify-center">
        <ReplicaSlider
          containers={homeContainers}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          onOpenContainer={handleOpenContainer}
        />
      </div>

      {/* 3. Stepper Indicators: Exactly 4 dots on far right */}
      <ReplicaStepper
        total={homeContainers.length}
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />
    </main>
  );
};
