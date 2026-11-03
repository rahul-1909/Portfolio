import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Server, 
  Cpu, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { 
  SiPython, 
  SiGo, 
  SiFastapi, 
  SiSpringboot, 
  SiDocker, 
  SiPostgresql, 
  SiRedis 
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';

interface KineticHeroProps {
  onOpenResume: () => void;
}

export const KineticHero: React.FC<KineticHeroProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'backend' | 'aiml'>('backend');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 3D Kinetic Neural Sphere Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D sphere points (Fibonacci sphere distribution)
    const numPoints = 140;
    const points: { x: number; y: number; z: number; baseRadius: number }[] = [];
    const radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        baseRadius: radius,
      });
    }

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      // Smooth mouse follow interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      rotY += 0.007 + mouseRef.current.x * 0.01;
      rotX += 0.004 + mouseRef.current.y * 0.01;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Project & draw connecting lines for nearby points
      const projected = points.map((p) => {
        // Rotate around Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective scale
        const fov = 350;
        const scale = fov / (fov + z2);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          pz: z2,
          scale,
        };
      });

      // Sort by depth (back to front)
      projected.sort((a, b) => b.pz - a.pz);

      // Draw faint interconnecting lattice
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 6, projected.length); j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            const alpha = (1 - dist / 45) * 0.25 * (projected[i].scale / 1.5);
            ctx.strokeStyle = activeTab === 'backend' 
              ? `rgba(139, 92, 246, ${alpha})` 
              : `rgba(6, 182, 212, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      projected.forEach((p) => {
        const alpha = Math.max(0.15, Math.min(1, (p.pz + radius) / (2 * radius)));
        const size = Math.max(1, 2.5 * p.scale);

        ctx.fillStyle = activeTab === 'backend'
          ? `rgba(196, 181, 253, ${alpha})`
          : `rgba(103, 232, 249, ${alpha})`;

        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [activeTab]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[140px]" />
        <div className="background-grid background-grid--fade-out absolute inset-0 opacity-40" />
      </div>

      <div className="content-wrapper relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Personal Authority & Core Positioning */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Availability Beacon */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Open for Backend Engineering & AI/ML Roles</span>
            </div>

            {/* Headline */}
            <div>
              <div className="flex items-center gap-2.5 text-lg sm:text-xl font-medium text-slate-500 dark:text-slate-400 mb-2">
                <span>Hi, I'm</span>
                <span className="font-bold text-slate-900 dark:text-white">Rahul Teja</span>
                <span className="text-xl inline-block animate-bounce" role="img" aria-label="hand gesture">🤟</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-[1000] tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Architecting High-Throughput{' '}
                <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400">
                  Backends & Autonomous AI
                </span>{' '}
                Engines.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              Software Developer specializing in asynchronous ASGI microservices, distributed system security, 
              and enterprise multi-agent RAG pipelines. Built with production rigor and modern design standards.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:bg-violet-700 hover:shadow-violet-600/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Selected Works</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white/80 px-5 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-md shadow-sm transition hover:border-violet-500 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-violet-500/50 dark:hover:bg-slate-800/80"
              >
                <span>Let's Connect</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-slate-100/90 px-4 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
                title="View Resume Document"
              >
                <FileText className="h-4 w-4 text-violet-500" />
                <span>Resume</span>
              </button>
            </div>

            {/* Core Runtimes & Languages Strip */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2.5">
                Primary Languages & Infrastructure Stack
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[
                  { name: 'Python', icon: SiPython, color: 'text-[#3776AB]' },
                  { name: 'Go Lang', icon: SiGo, color: 'text-[#00ADD8]' },
                  { name: 'Java', icon: FaJava, color: 'text-[#E76F00]' },
                  { name: 'FastAPI', icon: SiFastapi, color: 'text-[#009688]' },
                  { name: 'Spring Boot', icon: SiSpringboot, color: 'text-[#6DB33F]' },
                  { name: 'AWS Cloud', icon: FaAws, color: 'text-[#FF9900]' },
                  { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
                  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#4169E1]' },
                  { name: 'Redis', icon: SiRedis, color: 'text-[#DC382D]' },
                ].map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-200 backdrop-blur-sm transition hover:border-violet-500/40 hover:-translate-y-0.5"
                    >
                      <Icon className={`h-3.5 w-3.5 ${tech.color}`} />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: The Kinetic Telemetry Bento (A + C Hybrid) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Bento Tile 1: Interactive 3D Neural Particle Core (Option A) */}
            <div className="group relative rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl shadow-xl shadow-black/5 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-2xl dark:shadow-violet-950/20 overflow-hidden transition-all duration-300 hover:border-violet-500/40">
              
              {/* Header inside canvas tile */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Kinetic Telemetry Core
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                  3D Canvas Node • 60 FPS
                </span>
              </div>

              {/* The 3D Canvas Sphere */}
              <div className="relative h-[220px] sm:h-[240px] w-full cursor-crosshair">
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
                
                {/* Floating telemetry coordinates overlay */}
                <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-2 font-mono text-[9px] text-slate-400 dark:text-slate-500">
                  <span>SYS: ONLINE</span>
                  <span>•</span>
                  <span>LAT: 17.3850° N</span>
                </div>
                <div className="pointer-events-none absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] text-violet-500 dark:text-violet-400">
                  <Sparkles className="h-3 w-3" />
                  <span>Interactive Parallax</span>
                </div>
              </div>
            </div>

            {/* Bento Tile 2: Interactive Stack Mode Switcher (Option C) */}
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl shadow-md dark:border-white/10 dark:bg-slate-900/60">
              
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Engineering Focus Toggle
                </span>
                
                {/* Switcher Pills */}
                <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5">
                  <button
                    onClick={() => setActiveTab('backend')}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      activeTab === 'backend'
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Server className="h-3 w-3" />
                    <span>Backend</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('aiml')}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      activeTab === 'aiml'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Cpu className="h-3 w-3" />
                    <span>AI / ML</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Telemetry Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {activeTab === 'backend' ? (
                  <>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <Zap className="h-3.5 w-3.5 text-violet-500" />
                        <span>p99 Async Latency</span>
                      </div>
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        &lt; 14ms
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        ASGI Fast Execution
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        <span>System Uptime</span>
                      </div>
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        99.98%
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Stateless RBAC Security
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <Cpu className="h-3.5 w-3.5 text-cyan-500" />
                        <span>Dense Vectors</span>
                      </div>
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        1.2M+
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        HNSW Qdrant / Chroma
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <Layers className="h-3.5 w-3.5 text-violet-500" />
                        <span>State Machines</span>
                      </div>
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        LangGraph
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Multi-Agent Evaluator
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Architecture Blueprint Pills */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 mr-1">
                  Architecture Patterns:
                </span>
                {(activeTab === 'backend'
                  ? ['Stateless JWT RBAC', 'REST / ASGI', 'PostgreSQL ACID', 'Event-Driven']
                  : ['Anti-Hallucination RAG', 'Multi-Agent Loops', 'Vector Embeddings', 'Prompt Guardrails']
                ).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-white/[0.04] dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
