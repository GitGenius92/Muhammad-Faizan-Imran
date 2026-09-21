import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft, ExternalLink, GitBranch, CheckCircle, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { Project, CursorMode } from '../types';
import { NetworkIntrusionVisual } from './visuals/NetworkIntrusionVisual';
import { AgenticRagVisual } from './visuals/AgenticRagVisual';
import { ApiSecurityVisual } from './visuals/ApiSecurityVisual';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  setCursorMode: (mode: CursorMode) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  setCursorMode,
}) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl overflow-y-auto"
    >
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.08] px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          onMouseEnter={() => setCursorMode('link')}
          onMouseLeave={() => setCursorMode('default')}
          className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/70 hover:text-[#00E5FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO PORTFOLIO</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#00E5FF] hidden sm:inline">
            CASE STUDY // {project.number}
          </span>
          <button
            onClick={onClose}
            onMouseEnter={() => setCursorMode('link')}
            onMouseLeave={() => setCursorMode('default')}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Case Study Article Body */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col gap-16">
        {/* Header Title Section */}
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-12">
          <div className="flex items-center gap-3 text-xs font-mono text-[#00E5FF]">
            <span>{project.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="text-white/50">{project.tagline}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[0.95]">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl font-mono text-white/70 leading-relaxed">
            {project.subtitle}
          </p>

          {/* Key Metric Bar */}
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-white/40 uppercase">EVALUATION METRIC</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-4xl font-black text-[#00E5FF]">
                  {project.metric}
                </span>
                <span className="text-xs font-mono text-white/80 font-bold">
                  {project.metricLabel}
                </span>
              </div>
            </div>

            <div className="flex flex-col max-w-sm">
              <span className="text-xs font-mono text-white/40 uppercase">REPORTED CONTEXT</span>
              <span className="text-xs font-mono text-white/60 mt-1">
                {project.metricContext}
              </span>
            </div>
          </div>
        </div>

        {/* Live Interactive Architecture Visualizer */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <span>// INTERACTIVE_SYSTEM_SIMULATION</span>
            <span className="text-[#00E5FF]">LIVE TOPOLOGY</span>
          </div>
          <div className="w-full min-h-[380px]">
            {project.id === 'nids' && <NetworkIntrusionVisual isHovered={true} />}
            {project.id === 'agentic-rag' && <AgenticRagVisual isHovered={true} />}
            {project.id === 'api-security' && <ApiSecurityVisual setCursorMode={setCursorMode} />}
          </div>
        </div>

        {/* Deep Dive Breakdown: Problem, System, Model, Result */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
          {/* Section: The Problem */}
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
              01 // THE PROBLEM STATEMENT
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Why Heuristics Failed
            </h3>
            <p className="text-sm font-sans text-white/70 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Section: System Ingestion */}
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
              02 // SYSTEM PIPELINE
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              End-to-End Orchestration
            </h3>
            <p className="text-sm font-sans text-white/70 leading-relaxed">
              {project.system}
            </p>
          </div>

          {/* Section: Neural / AI Architecture */}
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
              03 // MODEL & ALGORITHMS
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Weights, Latency & Pruning
            </h3>
            <p className="text-sm font-sans text-white/70 leading-relaxed">
              {project.model}
            </p>
          </div>

          {/* Section: Result & Verification */}
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
              04 // VERIFIED RESULT
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Quantifiable Outcome
            </h3>
            <p className="text-sm font-sans text-white/70 leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>

        {/* Code Snippet Window */}
        {project.codeSnippet && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-white/50">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>{project.codeSnippet.title}</span>
              </span>
              <span className="text-white/30">{project.codeSnippet.language.toUpperCase()}</span>
            </div>

            <div className="bg-[#050505] border border-white/[0.08] rounded-xl p-6 font-mono text-xs overflow-x-auto text-white/80 leading-relaxed">
              <pre className="whitespace-pre">
                <code>
                  {project.codeSnippet.code ||
                    `${project.codeSnippet.beforeCode}\n\n${project.codeSnippet.afterCode}`}
                </code>
              </pre>
            </div>
            <p className="text-xs font-mono text-white/40">
              // {project.codeSnippet.explanation}
            </p>
          </div>
        )}

        {/* Tech Stack Breakdown */}
        <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-8">
          <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
            FULL SYSTEM STACK
          </span>
          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-white font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Back Action */}
        <div className="border-t border-white/[0.08] pt-10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="py-3 px-6 rounded-lg bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#00E5FF] transition-colors"
          >
            ← CLOSE CASE STUDY
          </button>
          <span className="text-xs font-mono text-white/40">
            SYSTEM DESIGN BY MUHAMMAD FAIZAN IMRAN
          </span>
        </div>
      </div>
    </motion.div>
  );
};
