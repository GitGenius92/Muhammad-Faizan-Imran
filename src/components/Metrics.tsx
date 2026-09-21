import React from 'react';
import { motion } from 'motion/react';
import { METRICS_DATA } from '../data/portfolioData';
import { CursorMode } from '../types';

interface MetricsProps {
  setCursorMode: (mode: CursorMode) => void;
}

export const Metrics: React.FC<MetricsProps> = ({ setCursorMode }) => {
  return (
    <section
      id="metrics"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
              05 // SYSTEM METRICS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase">
              EVALUATION & IMPACT.
            </h2>
          </div>
          <p className="text-sm font-mono text-white/50 max-w-sm">
            Documented project evaluation metrics and operational full-stack engineering outcomes.
          </p>
        </div>

        {/* Metrics Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METRICS_DATA.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase">
                  {item.sublabel}
                </span>
                <span className="font-display text-5xl sm:text-6xl font-black text-white tracking-tight">
                  {item.value}
                </span>
                <span className="font-mono text-sm font-bold text-white/90 tracking-wide">
                  {item.label}
                </span>
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-white/40 leading-relaxed">
                {item.context}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
