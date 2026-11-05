import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { ReplicaSlider } from '../../components/replica/ReplicaSlider';
import { ReplicaStepper } from '../../components/replica/ReplicaStepper';
import { ReplicaSkillCard } from '../../components/replica/ReplicaSkillCard';
import { skillsWheelData } from '../../data/skillsWheel';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaSkillsSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSkill = skillsWheelData[activeIndex] || skillsWheelData[0];

  useSEO({
    title: `${currentSkill.name} | Skills | Rahul Teja`,
    description: `Technical competencies in ${currentSkill.category}: ${currentSkill.descriptor}`,
    url: 'https://www.nrahulteja.me/skills',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-light-grey text-light-black select-none">
      {/* 1. Left Column: Vertically Centered Header (Dynamic Swap) & Dock */}
      <div className="flex flex-col items-start justify-center h-screen fixed left-[25.7rem] gap-[2.4rem] z-[120] max-phone:fixed max-phone:inset-0 max-phone:h-auto max-phone:w-full max-phone:left-0 max-phone:items-center max-phone:justify-between max-phone:pt-[3.6rem] max-phone:pb-[3.6rem] max-phone:gap-0 max-phone:pointer-events-none">
        {/* Dynamic Header Swap on Wheel Rotation */}
        <div className="pointer-events-auto flex flex-col items-start max-phone:items-center max-phone:text-center min-w-[280px]">
          <ReplicaHeader
            title={currentSkill.name}
            subtitle={currentSkill.category}
          />
          <p className="hidden max-phone:block text-[1.15rem] text-grey tracking-wide font-normal pt-2 cursor-default">
            Skills · {activeIndex + 1} of {skillsWheelData.length}
          </p>
        </div>

        {/* Two Pills: Back (<) and Mail */}
        <div className="pointer-events-auto max-phone:order-last">
          <ReplicaDock />
        </div>

        {/* Desktop indicator */}
        <div className="pointer-events-auto max-phone:hidden">
          <p className="text-[1.25rem] text-grey tracking-wide font-normal cursor-default">
            Skills · {activeIndex + 1} of {skillsWheelData.length}
          </p>
        </div>
      </div>

      {/* 2. Right Column: Exactly Centered 3D Wheel with 13 Skills */}
      <ReplicaSlider
        items={skillsWheelData}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onSelectItem={() => {}}
        renderItem={(skill, isActive) => (
          <ReplicaSkillCard item={skill} isActive={isActive} />
        )}
        ariaLabel="Skills 3D Wheel"
      />

      {/* 3. Stepper Indicators: 13 dots on far right, centered on the same line */}
      <ReplicaStepper
        total={skillsWheelData.length}
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />
    </main>
  );
};
