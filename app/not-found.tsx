'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FloatingNav } from '@/components/Navigation/FloatingNav';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-[3.2rem] text-center select-none">
      <h1 className="text-[6.4rem] font-bold text-light-black tracking-tight leading-none mb-[1.6rem]">
        404
      </h1>
      <p className="text-[2rem] text-grey max-w-[40rem] mb-[3.2rem]">
        This page does not exist. Return to Gabriel Beaugonin’s portfolio home.
      </p>
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-[0.8rem] px-[2.4rem] py-[1.2rem] rounded-full bg-light-black text-white text-[1.4rem] font-medium shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-[1.6rem] h-[1.6rem]" />
        <span>Back to Home</span>
      </button>
      <FloatingNav />
    </div>
  );
}
