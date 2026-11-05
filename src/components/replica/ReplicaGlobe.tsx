import React, { useEffect, useRef, useState } from 'react';

interface ReplicaGlobeProps {
  onLocationChange?: (location: 'Hyderabad' | 'Chennai') => void;
}

export const ReplicaGlobe: React.FC<ReplicaGlobeProps> = ({ onLocationChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentCity, setCurrentCity] = useState<'Hyderabad' | 'Chennai'>('Hyderabad');
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.3, y: 1.37 }); // Centered near India
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.3, y: 1.37 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Coordinates
  // Hyderabad: lat ~17.38, lon ~78.48
  // Chennai: lat ~13.08, lon ~80.27
  const toggleLocation = () => {
    if (currentCity === 'Hyderabad') {
      setCurrentCity('Chennai');
      targetRotationRef.current = { x: 0.23, y: 1.4 };
      if (onLocationChange) onLocationChange('Chennai');
    } else {
      setCurrentCity('Hyderabad');
      targetRotationRef.current = { x: 0.3, y: 1.37 };
      if (onLocationChange) onLocationChange('Hyderabad');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let autoRotate = 0.0015;

    // Set high-DPI canvas
    const size = 320;
    canvas.width = size * 2;
    canvas.height = size * 2;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = (size * 2) * 0.44;

      // Smooth interpolation to target rotation
      if (!isDraggingRef.current) {
        targetRotationRef.current.y += autoRotate;
      }
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;

      const rotX = currentRotationRef.current.x;
      const rotY = currentRotationRef.current.y;

      // 1. Base sphere with soft shadow & matte light grey shading
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      // Shading gradient: light off-white from top-left, muted light grey shadow on bottom-right
      const sphereGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      sphereGrad.addColorStop(0, '#FFFFFF');
      sphereGrad.addColorStop(0.5, '#ECECEC');
      sphereGrad.addColorStop(0.85, '#D8D8D8');
      sphereGrad.addColorStop(1, '#BFBFBF');
      ctx.fillStyle = sphereGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Continents and terrain outlines (subtle embossing)
      ctx.strokeStyle = 'rgba(180, 180, 180, 0.45)';
      ctx.lineWidth = 2.5;

      // Draw latitude and longitude grid rings for 3D globe depth
      const numLatLines = 6;
      for (let i = 1; i < numLatLines; i++) {
        const lat = ((i / numLatLines) - 0.5) * Math.PI;
        const latR = r * Math.cos(lat);
        const latY = cy + r * Math.sin(lat) * Math.cos(rotX);
        const latH = Math.abs(latR * Math.sin(rotX));
        
        ctx.beginPath();
        ctx.ellipse(cx, latY, latR, latH, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(215, 215, 215, 0.5)';
        ctx.stroke();
      }

      // Draw subtle landmass blobs
      // Simulating land clusters with spherical projection
      const landClusters = [
        { lat: 0.35, lon: 1.35, size: 0.28 }, // India / South Asia
        { lat: 0.45, lon: 0.25, size: 0.35 }, // Europe / Eurasia
        { lat: 0.1, lon: 0.4, size: 0.4 },   // Africa
        { lat: 0.55, lon: -1.7, size: 0.42 }, // North America
        { lat: -0.25, lon: -1.1, size: 0.32 }, // South America
        { lat: -0.45, lon: 2.3, size: 0.3 },  // Australia
        { lat: 0.6, lon: 2.1, size: 0.45 },  // East Asia
      ];

      landClusters.forEach(cluster => {
        // Project cluster to screen
        const lon = cluster.lon + rotY;
        const lat = cluster.lat;

        // 3D sphere coordinates
        const x3 = r * Math.cos(lat) * Math.sin(lon);
        const y3 = -r * Math.sin(lat) * Math.cos(rotX) + r * Math.cos(lat) * Math.cos(lon) * Math.sin(rotX);
        const z3 = r * Math.cos(lat) * Math.cos(lon) * Math.cos(rotX) + r * Math.sin(lat) * Math.sin(rotX);

        if (z3 > -r * 0.2) { // visible hemisphere
          const alpha = Math.max(0, (z3 + r * 0.2) / (r * 1.2));
          ctx.beginPath();
          ctx.ellipse(cx + x3, cy + y3, cluster.size * r, cluster.size * r * 0.75, rotX * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(205, 205, 205, ${alpha * 0.65})`;
          ctx.fill();
        }
      });

      // 3. Airplane / City Marker
      // Current active city coordinates
      const markerLat = currentCity === 'Hyderabad' ? 0.30 : 0.23;
      const markerLon = (currentCity === 'Hyderabad' ? 1.37 : 1.40) + rotY;
      const mx = r * Math.cos(markerLat) * Math.sin(markerLon);
      const my = -r * Math.sin(markerLat) * Math.cos(rotX) + r * Math.cos(markerLat) * Math.cos(markerLon) * Math.sin(rotX);
      const mz = r * Math.cos(markerLat) * Math.cos(markerLon) * Math.cos(rotX) + r * Math.sin(markerLat) * Math.sin(rotX);

      if (mz > 0) {
        // Draw airplane silhouette or stylish pin
        ctx.save();
        ctx.translate(cx + mx, cy + my);
        ctx.scale(1.2, 1.2);

        // Airplane icon
        ctx.fillStyle = '#1A1A1A';
        ctx.beginPath();
        // Fuselage
        ctx.moveTo(0, -9);
        ctx.lineTo(2, 6);
        ctx.lineTo(0, 8);
        ctx.lineTo(-2, 6);
        ctx.closePath();
        ctx.fill();
        // Wings
        ctx.beginPath();
        ctx.moveTo(-11, 0);
        ctx.lineTo(11, 0);
        ctx.lineTo(3, 4);
        ctx.lineTo(-3, 4);
        ctx.closePath();
        ctx.fill();
        // Tail
        ctx.beginPath();
        ctx.moveTo(-5, 6);
        ctx.lineTo(5, 6);
        ctx.lineTo(2, 8);
        ctx.lineTo(-2, 8);
        ctx.closePath();
        ctx.fill();

        // Pulsing radar ring
        ctx.beginPath();
        ctx.arc(0, 0, 14 + Math.sin(Date.now() * 0.005) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();

      // Subtle edge vignette
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse drag support for interactive rotation
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      targetRotationRef.current.y += dx * 0.008;
      targetRotationRef.current.x = Math.max(-0.5, Math.min(0.5, targetRotationRef.current.x + dy * 0.008));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [currentCity]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 select-none">
      <div
        onClick={toggleLocation}
        className="cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
        title="Click to travel between Hyderabad and Chennai"
      >
        <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing" />
      </div>

      <button
        onClick={toggleLocation}
        className="text-[1.2rem] text-grey hover:text-light-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-black cursor-pointer font-normal flex items-center gap-1.5"
      >
        <span>Click to travel ·</span>
        <span className="font-medium text-light-black">{currentCity}</span>
      </button>
    </div>
  );
};
