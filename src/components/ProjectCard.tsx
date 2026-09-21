import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { Project, CursorMode } from '../types';
import { NetworkIntrusionVisual } from './visuals/NetworkIntrusionVisual';
import { AgenticRagVisual } from './visuals/AgenticRagVisual';
import { ApiSecurityVisual } from './visuals/ApiSecurityVisual';

interface ProjectCardProps {
  project: Project;
  totalProjects: number;
  onOpenCaseStudy: (project: Project) => void;
  setCursorMode: (mode: CursorMode) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  totalProjects,
  onOpenCaseStudy,
  setCursorMode,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full bg-[#0B0B0B] border border-white/[0.08] rounded-2xl p-6 sm:p-8 md:p-12 flex flex-col gap-10 hover:border-white/20 transition-all group"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorMode('project');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorMode('default');
      }}
    >
      {/* Top Number & Category Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs sm:text-sm text-[#00E5FF] tracking-[0.25em] font-semibold">
            {project.number} / 0{totalProjects}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-xs font-mono tracking-widest text-white/50 uppercase">
            {project.category}
          </span>
        </div>

        <button
          onClick={() => onOpenCaseStudy(project)}
          onMouseEnter={() => setCursorMode('link')}
          onMouseLeave={() => setCursorMode('project')}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/80 group-hover:text-[#00E5FF] transition-colors self-start sm:self-auto"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Giant Typography Headline */}
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.02]">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-mono text-white/60">
          {project.subtitle}
        </p>
      </div>

      {/* Main Interactive System Visual */}
      <div className="w-full">
        {project.id === 'nids' && <NetworkIntrusionVisual isHovered={isHovered} />}
        {project.id === 'agentic-rag' && <AgenticRagVisual isHovered={isHovered} />}
        {project.id === 'api-security' && <ApiSecurityVisual setCursorMode={setCursorMode} />}
      </div>

      {/* Editorial Story Grid: Problem, System, Model, Result, Stack */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/[0.08] text-sm font-sans">
        {/* The Problem */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
            THE PROBLEM
          </span>
          <p className="text-white/70 leading-relaxed text-sm">
            {project.problem}
          </p>
        </div>

        {/* The System & Model */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
              THE ARCHITECTURE & MODEL
            </span>
            <p className="text-white/70 leading-relaxed text-sm">
              {project.system}
            </p>
          </div>
        </div>

        {/* The Result & Metric */}
        <div className="md:col-span-3 flex flex-col justify-between gap-4 bg-white/[0.02] border border-white/[0.06] p-5 rounded-xl">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase block mb-1">
              EVALUATION RESULT
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                {project.metric}
              </span>
              <span className="text-[11px] font-mono text-white/70 font-semibold">
                {project.metricLabel}
              </span>
            </div>
            <p className="text-[11px] font-mono text-white/40 mt-1.5 leading-snug">
              {project.metricContext}
            </p>
          </div>

          <button
            onClick={() => onOpenCaseStudy(project)}
            className="w-full py-2.5 px-4 bg-white/[0.08] hover:bg-[#00E5FF] hover:text-black transition-all rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-center mt-2"
          >
            DEEP DIVE CASE STUDY →
          </button>
        </div>
      </div>

      {/* The Stack Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-mono text-white/40 mr-2 uppercase">STACK:</span>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white/80"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
