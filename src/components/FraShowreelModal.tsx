import React, { useRef, useEffect } from 'react';
import { X, Play, Pause } from 'lucide-react';

interface FraShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FraShowreelModal: React.FC<FraShowreelModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-black border-4 border-white rounded-3xl overflow-hidden shadow-[12px_12px_0px_#FFE600]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFE600] border-b-4 border-black">
          <div className="font-display text-2xl text-black uppercase tracking-wider">
            FRA! SHOWREEL · DOODLE ART IN ACTION
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border-3 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_#000]"
            aria-label="Close showreel"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src="/images/fra/showreel-fra.mp4"
            loop
            playsInline
            autoPlay
            className="w-full h-full object-contain"
          />

          {/* Floating Play / Pause Overlay Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#FFE600] border-3 border-black text-black flex items-center justify-center shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
