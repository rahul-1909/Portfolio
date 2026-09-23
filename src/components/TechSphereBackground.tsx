import React, { useEffect, useRef } from 'react';

export const TechSphereBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      rotation += 0.005;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const cx = width / 2;
      const cy = height * 0.48; // Centered behind the middle rows of tech cards

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Space Dark Background
      ctx.fillStyle = '#080318';
      ctx.fillRect(0, 0, width, height);

      // 2. Central Nebula Glow
      const nebulaRadius = Math.min(width, height) * 0.65;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, nebulaRadius);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
      grad.addColorStop(0.3, 'rgba(126, 34, 206, 0.22)');
      grad.addColorStop(0.65, 'rgba(30, 10, 60, 0.5)');
      grad.addColorStop(1, 'rgba(8, 3, 24, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, nebulaRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Perspective Curved Wireframe Tunnel / Mesh (as in Redoyanul Haque screenshot)
      ctx.save();
      ctx.lineWidth = 1;

      // Radial perspective lines radiating outward from the central horizon
      const numRays = 28;
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const outerX = cx + Math.cos(angle) * width * 0.9;
        const outerY = cy + Math.sin(angle) * height * 0.9;

        const rayGrad = ctx.createLinearGradient(cx, cy, outerX, outerY);
        rayGrad.addColorStop(0, 'rgba(168, 85, 247, 0.35)');
        rayGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.15)');
        rayGrad.addColorStop(1, 'rgba(88, 28, 135, 0)');

        ctx.strokeStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 70, cy + Math.sin(angle) * 70);
        ctx.lineTo(outerX, outerY);
        ctx.stroke();
      }

      // Concentric elliptical contour lines expanding outward (curved warp net)
      const numContours = 9;
      for (let i = 1; i <= numContours; i++) {
        const factor = i / numContours;
        const rx = factor * width * 0.58;
        const ry = factor * height * 0.52;

        ctx.strokeStyle = `rgba(168, 85, 247, ${0.32 - factor * 0.22})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Central 3D Cyber Wireframe Sphere
      const sphereRadius = Math.min(width * 0.38, 220);

      // Core sphere inner illumination
      const sphereGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereRadius);
      sphereGlow.addColorStop(0, 'rgba(192, 132, 252, 0.45)');
      sphereGlow.addColorStop(0.6, 'rgba(147, 51, 234, 0.25)');
      sphereGlow.addColorStop(1, 'rgba(88, 28, 135, 0.05)');
      ctx.fillStyle = sphereGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sphere Outer Boundary Ring with neon glow
      ctx.strokeStyle = 'rgba(216, 180, 254, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Horizontal Latitude Lines across the sphere
      ctx.lineWidth = 1;
      const numLats = 7;
      for (let i = -numLats; i <= numLats; i++) {
        const latY = cy + (i / (numLats + 1)) * sphereRadius;
        const distFromCenter = Math.abs(latY - cy);
        const latRadius = Math.sqrt(Math.max(0, sphereRadius * sphereRadius - distFromCenter * distFromCenter));

        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.beginPath();
        ctx.ellipse(cx, latY, latRadius, latRadius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating Longitude Ellipses (creates real 3D rotation)
      const numLongs = 8;
      for (let i = 0; i < numLongs; i++) {
        const baseAngle = (i / numLongs) * Math.PI + rotation;
        const currentRx = Math.sin(baseAngle) * sphereRadius;

        ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(currentRx), sphereRadius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Orbital tilted cyan/purple neon ring
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, sphereRadius * 1.15, sphereRadius * 0.45, -0.4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full block"
      />
    </div>
  );
};
