import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECH_CATEGORIES } from '../data/portfolioData';
import { CursorMode } from '../types';
import { Wrench } from 'lucide-react';

interface TechStackProps {
  setCursorMode: (mode: CursorMode) => void;
}

export const TechStack: React.FC<TechStackProps> = ({ setCursorMode }) => {
  const [activeCategory, setActiveCategory] = useState<string>('AI / ML');

  return (
    <section
      id="tech"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#080808] border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
              04 // INSTRUMENTATION
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase">
              TECHNOLOGY <br className="hidden sm:inline" />
              <span className="text-white/40">IS A TOOL.</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-white/50 max-w-sm">
            Technologies are selected strictly based on latency, model precision, memory constraints, and architectural fitness.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {TECH_CATEGORIES.map((cat) => {
            const isActive = cat.category === activeCategory;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* Interactive Matrix Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_CATEGORIES.map((cat) => {
            const isHighlighted = cat.category === activeCategory;
            return (
              <div
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[260px] ${
                  isHighlighted
                    ? 'bg-white/[0.05] border-[#00E5FF] shadow-[0_0_24px_rgba(0,229,255,0.06)]'
                    : 'bg-white/[0.015] border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isHighlighted ? 'text-[#00E5FF] font-bold' : 'text-white/40'}>
                      // {cat.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>

                  <div className="flex flex-col gap-2.5 pt-4">
                    {cat.items.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center justify-between py-1.5 border-b border-white/[0.04]"
                      >
                        <span className="font-mono text-sm font-semibold text-white/90">
                          {tech}
                        </span>
                        <span className="text-[10px] font-mono text-[#00E5FF]/60">OK</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 text-[10px] font-mono text-white/30 flex items-center justify-between">
                  <span>DEPLOYED ON HOST</span>
                  <span className="text-emerald-400">PROD-VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtle Horizontal Moving Ticker */}
        <div className="w-full overflow-hidden border-t border-b border-white/[0.06] py-4 select-none">
          <motion.div
            className="flex gap-8 whitespace-nowrap text-xs font-mono text-white/30 uppercase tracking-[0.25em]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          >
            {Array.from({ length: 4 }).flatMap(() => [
              'PYTORCH',
              '·',
              'TRANSFORMERS',
              '·',
              'FASTAPI',
              '·',
              'REACT',
              '·',
              'STREAMLIT',
              '·',
              'CHROMADB',
              '·',
              'DOCKER',
              '·',
              'OLLAMA',
              '·',
              'SCIKIT-LEARN',
              '·',
              'LANGCHAIN',
              '·',
            ])}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
