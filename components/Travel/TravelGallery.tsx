'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations, Destination } from '@/data/portfolioData';
import { ArrowLeft, Plane, X } from 'lucide-react';

export const TravelGallery: React.FC = () => {
  const router = useRouter();
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const currentDest = destinations[activeDestIndex] || destinations[0];

  const galleryRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col justify-between p-[3.2rem] max-phone:p-[2rem] select-none overflow-x-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between w-full z-20">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-[0.8rem] px-[1.6rem] py-[0.8rem] rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-[1.4rem] transition-colors"
        >
          <ArrowLeft className="w-[1.6rem] h-[1.6rem]" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-[1.2rem]">
          <Plane className="w-[1.8rem] h-[1.8rem] text-white/60 animate-pulse" />
          <span className="text-[1.4rem] font-mono tracking-widest text-white/60 uppercase">
            Travel Log
          </span>
        </div>
      </div>

      {/* Main Destination Showcase */}
      <div className="flex-1 flex flex-col justify-center my-[4rem] z-10">
        <div className="flex items-baseline justify-between mb-[2.4rem]">
          <div>
            <span className="text-[1.4rem] font-mono text-white/40 uppercase">Destination</span>
            <h2 className="text-[6.4rem] max-phone:text-[4rem] font-bold tracking-tight text-white leading-none">
              {currentDest.airport_code}
            </h2>
          </div>
          <span className="text-[2rem] text-white/60 font-medium">{currentDest.name}</span>
        </div>

        {/* Photo Gallery Grid / Strip */}
        <div
          ref={galleryRef}
          className="flex gap-[2rem] overflow-x-auto pb-[2rem] scrollbar-none snap-x snap-mandatory"
        >
          {currentDest.photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative shrink-0 w-[30rem] h-[40rem] max-phone:w-[24rem] max-phone:h-[32rem] rounded-[2rem] overflow-hidden bg-white/5 cursor-pointer snap-center group shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPhoto(photo.image)}
            >
              <img
                src={photo.image}
                alt={`${currentDest.name} photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Destination Switcher Carousel */}
      <div className="flex items-center justify-center gap-[1.2rem] py-[2rem] z-20 overflow-x-auto">
        {destinations.map((dest, i) => (
          <button
            key={dest.id}
            onClick={() => setActiveDestIndex(i)}
            className={`px-[1.6rem] py-[0.8rem] rounded-full text-[1.4rem] font-mono transition-all duration-200 ${
              i === activeDestIndex
                ? 'bg-white text-black font-bold scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
            }`}
          >
            {dest.airport_code}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-[4rem]"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-[3.2rem] right-[3.2rem] p-[1.2rem] rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-[2.4rem] h-[2.4rem]" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedPhoto}
              alt="Enlarged view"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-[1.6rem] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
