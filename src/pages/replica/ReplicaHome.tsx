import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaSlider } from '../../components/replica/ReplicaSlider';
import { ReplicaStepper } from '../../components/replica/ReplicaStepper';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { selectedProjects, personalInfo, type FormattedProject } from '../../data/portfolio';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaHome: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useSEO({
    title: `${personalInfo.name} — ${personalInfo.role} | Distributed Systems & AI/ML`,
    description: personalInfo.bio,
    url: 'https://www.nrahulteja.me/',
  });

  const handleSelectProject = (project: FormattedProject) => {
    navigate(`/work/${project.id}`);
  };

  return (
    <main className="relative w-full h-screen max-phone:h-dvh overflow-hidden bg-light-grey text-light-black select-none">
      {/* 1. Left Column: Brand Anchor + Bottom Dock Container */}
      <div className="flex flex-col items-start justify-center h-screen fixed left-[25.7rem] gap-[5rem] z-[200] max-phone:inset-0 max-phone:h-auto max-phone:w-full max-phone:left-0 max-phone:items-center max-phone:justify-between max-phone:pt-[3rem] max-phone:pb-[4rem] max-phone:gap-0 max-phone:pointer-events-none">
        {/* Brand Header */}
        <ReplicaHeader
          title={personalInfo.name}
          subtitle={personalInfo.role}
        />

        {/* Bottom Navigation Dock */}
        <ReplicaDock />
      </div>

      {/* 2. 3D Cylindrical Perspective Project Slider */}
      <ReplicaSlider
        projects={selectedProjects}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onSelectProject={handleSelectProject}
      />

      {/* 3. Right-Side Stepper Indicator */}
      <ReplicaStepper
        total={selectedProjects.length}
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />
    </main>
  );
};
