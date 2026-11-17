'use client';

import React from 'react';
import { ProjectSlider } from '@/components/Slider/ProjectSlider';

export default function HomePage() {
  return (
    <main className="w-screen h-screen relative overflow-hidden bg-light-grey flex items-center justify-center">
      <ProjectSlider />
    </main>
  );
}
