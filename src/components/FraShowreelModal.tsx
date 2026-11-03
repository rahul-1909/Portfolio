import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, CheckCircle2, Terminal, ExternalLink, Sparkles } from 'lucide-react';

interface FraShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjects: () => void;
}

export const FraShowreelModal: React.FC<FraShowreelModalProps> = ({
  isOpen,
  onClose,
  onOpenProjects,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'ASGI Microservice Cluster Boot',
      cmd: 'uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4 --loop uvloop',
      metric: '4 workers active · 0.42ms startup',
      detail: 'Initializing async event loop, connection pool to PostgreSQL (max 100), and Redis Pub/Sub channels.',
    },
    {
      title: 'Sub-14ms Vector Search & Reranking',
      cmd: 'curl -X POST /api/v1/search -d \'{"query": "distributed consensus", "top_k": 5}\'',
      metric: 'P99 Latency: 11.8ms (Target: < 14ms)',
      detail: 'Qdrant HNSW index queried across 128,000 dense vectors with cross-encoder reciprocal rank fusion.',
    },
    {
      title: 'LangGraph Multi-Agent Swarm Execution',
      cmd: 'python -m agents.orchestrator --mode autonomous --nodes 3',
      metric: 'State Convergence: 100% · 0 Hallucinations',
      detail: 'Researcher agent -> Validator agent -> Synthesizer agent looping through deterministic state graph.',
    },
    {
      title: 'SQL AST Query Firewall & Defense',
      cmd: 'pytest tests/test_ast_guard.py -v --benchmark',
      metric: '68/68 Injection Vectors Blocked · 0.28ms overhead',
      detail: 'Abstract Syntax Tree parser intercepts and disarms malicious SQL tokens prior to database driver execution.',
    },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_#000] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Comic Window Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#FFE600] border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-black" />
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-black" />
            <span className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-black" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider ml-2 text-black">
              Rahul Teja · System Showreel & Benchmarks
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_#000]"
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Video / Terminal Simulator Canvas */}
        <div className="p-6 bg-[#0E1017] text-white font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#FFE600]" />
              <span>Production Pipeline Simulator v2.4</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-800 border border-gray-700 text-xs hover:text-[#FFE600] transition-colors"
              >
                {isPlaying ? <RotateCcw size={12} /> : <Play size={12} />}
                {isPlaying ? 'Pause Loop' : 'Resume'}
              </button>
              <span className="text-[11px] text-[#FFE600] font-bold">
                Step {activeStep + 1} of {steps.length}
              </span>
            </div>
          </div>

          {/* Active Step Content */}
          <div className="py-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/40 rounded-full text-xs font-bold">
              <Sparkles size={12} />
              {steps[activeStep].title}
            </div>

            <div className="bg-black/60 p-4 rounded-xl border border-gray-800 space-y-2">
              <div className="text-gray-400 text-xs">Executing command:</div>
              <div className="text-emerald-400 text-xs sm:text-sm font-semibold break-all">
                $ {steps[activeStep].cmd}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/30 p-3 rounded-lg border border-amber-900/50">
              <CheckCircle2 size={16} className="text-[#FFE600] shrink-0" />
              <span>Verified Result: <strong>{steps[activeStep].metric}</strong></span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {steps[activeStep].detail}
            </p>
          </div>

          {/* Step Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeStep ? 'bg-[#FFE600]' : 'bg-gray-800 hover:bg-gray-700'
                }`}
                title={s.title}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gray-50 border-t-4 border-black">
          <span className="text-xs font-mono text-gray-600">
            Real benchmarked performance from Rahul's GitHub projects.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenProjects();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FFE600] text-black font-mono text-xs font-bold rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] transition-all"
            >
              <span>Explore Blueprints</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
