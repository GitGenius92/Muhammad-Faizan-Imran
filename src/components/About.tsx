import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CursorMode } from '../types';
import { GraduationCap, ArrowRight, Download, Terminal, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onOpenResume: () => void;
  setCursorMode: (mode: CursorMode) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume, setCursorMode }) => {
  return (
    <section
      id="about"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
              07 // IDENTITY & FOUNDATION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.02]">
              A COMPUTER <br className="hidden sm:inline" />
              ENGINEER WHO BUILDS <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00E5FF]">
                INTELLIGENT SYSTEMS.
              </span>
            </h2>
          </div>
        </div>

        {/* Identity & Background Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Education & Academic Rigor */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-6">
              <div className="flex items-center gap-3 text-xs font-mono text-[#00E5FF]">
                <GraduationCap className="w-4 h-4" />
                <span>FORMAL COMPUTER ENGINEERING BACKGROUND</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {PERSONAL_INFO.education.degree}
                </h3>
                <span className="font-mono text-base text-white/80">
                  {PERSONAL_INFO.education.institution}
                </span>
                <div className="flex items-center gap-3 text-xs font-mono text-white/40 mt-1">
                  <span>{PERSONAL_INFO.education.period}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                  <span>{PERSONAL_INFO.education.status}</span>
                </div>
              </div>

              <p className="text-sm font-sans text-white/70 leading-relaxed border-t border-white/[0.06] pt-4">
                Grounding AI solutions in foundational computer systems principles: hardware constraints, socket-level communication, data structures, low-level concurrency, and algorithmic complexity.
              </p>
            </div>

            {/* Resume Callout Card */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase">
                  VERIFIED CREDENTIALS
                </span>
                <span className="font-display text-2xl font-bold text-white">
                  WANT THE FULL STORY?
                </span>
                <span className="text-xs font-mono text-white/40">
                  Inspect the structured engineering profile & curriculum vitae.
                </span>
              </div>

              <button
                onClick={onOpenResume}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-white text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#00E5FF] transition-colors shrink-0"
              >
                <span>DOWNLOAD RESUME</span>
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Positioning & Core Domains */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                DISCIPLINARY FOCUS
              </span>
              <p className="font-sans text-lg text-white/80 leading-relaxed font-light">
                Positioned at the convergence of machine learning and production software engineering. Bridging the gap between raw research weights and mission-critical production systems.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
              {PERSONAL_INFO.domains.map((domain, index) => (
                <div
                  key={domain}
                  className="py-4 flex items-center justify-between group hover:pl-2 transition-all cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#00E5FF]">0{index + 1}</span>
                    <span className="font-display text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {domain}
                    </span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-white/20 group-hover:text-[#00E5FF] transition-colors" />
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-white/50 flex items-center justify-between">
              <span>LOCATION: {PERSONAL_INFO.location.toUpperCase()}</span>
              <span className="text-emerald-400">READY FOR GLOBAL COLLABORATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
