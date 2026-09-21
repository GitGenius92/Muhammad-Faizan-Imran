import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Cpu, Database, Search, Bot, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from '../../hooks/usePreferences';

interface AgenticRagVisualProps {
  isHovered?: boolean;
}

export const AgenticRagVisual: React.FC<AgenticRagVisualProps> = ({ isHovered = false }) => {
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();

  const steps = [
    { title: 'DOCUMENT', desc: 'Tech Spec PDF/MD', icon: <FileText className="w-3.5 h-3.5" /> },
    { title: 'CHUNKING', desc: 'Recursive AST', icon: <span className="text-[10px] font-bold">1/4</span> },
    { title: 'EMBEDDINGS', desc: 'all-MiniLM-L6', icon: <span className="text-[10px] font-mono">[v]</span> },
    { title: 'CHROMADB', desc: 'Vector Store', icon: <Database className="w-3.5 h-3.5" /> },
    { title: 'QUERY', desc: 'User Intent', icon: <Search className="w-3.5 h-3.5" /> },
    { title: 'RETRIEVAL', desc: 'Cosine Sim Top-K', icon: <span className="text-[10px] font-mono">k=4</span> },
    { title: 'RERANKING', desc: 'Cross-Encoder', icon: <span className="text-[10px] font-mono">score</span> },
    { title: 'LOCAL LLM', desc: 'Llama 3 / Mistral', icon: <Cpu className="w-3.5 h-3.5" /> },
    { title: 'ANSWER', desc: 'Grounded Citation', icon: <Bot className="w-3.5 h-3.5" /> },
  ];

  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, isHovered ? 800 : 1400);

    return () => clearInterval(timer);
  }, [isHovered, reducedMotion, steps.length]);

  return (
    <div className="w-full h-full min-h-[360px] bg-[#070707] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden font-mono select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs">
        <div className="flex items-center gap-2 text-white/60">
          <Database className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>ZERO_CLOUD_RAG // chroma.local:8000</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
            100% OFFLINE / ZERO LEAKAGE
          </span>
        </div>
      </div>

      {/* RAG Pipeline Flow Nodes */}
      <div className="py-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
          {steps.map((step, idx) => {
            const isCurrent = idx === activeStep;
            return (
              <div
                key={step.title}
                className={`p-2.5 rounded flex flex-col items-center text-center transition-all border ${
                  isCurrent
                    ? 'bg-white/[0.08] border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)] scale-105'
                    : 'bg-[#111] border-white/[0.06] text-white/40'
                }`}
              >
                <div className={`mb-1.5 ${isCurrent ? 'text-[#00E5FF]' : 'text-white/30'}`}>
                  {step.icon}
                </div>
                <span
                  className={`text-[9px] font-bold tracking-tight ${
                    isCurrent ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[8px] text-white/30 truncate max-w-full">
                  {step.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Local Synthesis Simulator Box */}
      <div className="bg-[#0D0D0D] border border-white/[0.06] p-4 rounded-lg flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[11px] text-white/50 border-b border-white/[0.06] pb-1.5">
          <span>QUERY: &ldquo;How does authentication token caching behave on edge?&rdquo;</span>
          <span className="text-[#00E5FF]">OLLAMA // LLAMA 3 (8B)</span>
        </div>

        <div className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white/90">
              Tokens persist in local encrypted storage with SHA-256 validation. Cache expires deterministically after 900s.
            </span>
            <span className="inline-block ml-2 text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#00E5FF]">
              doc: auth_spec_v2.md:§4.2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
