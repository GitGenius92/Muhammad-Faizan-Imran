import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_HISTORY } from '../data/portfolioData';
import { CursorMode } from '../types';
import { Briefcase, ArrowUpRight } from 'lucide-react';

interface ExperienceProps {
  setCursorMode: (mode: CursorMode) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ setCursorMode }) => {
  return (
    <section
      id="experience"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#080808] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
              06 // TIMELINE & RECORD
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase">
              EXPERIENCE.
            </h2>
          </div>
          <p className="text-sm font-mono text-white/50 max-w-sm">
            Professional track record delivering responsive web applications and scalable frontends.
          </p>
        </div>

        {/* Minimalist Editorial Timeline */}
        <div className="flex flex-col divide-y divide-white/[0.08]">
          {EXPERIENCE_HISTORY.map((item, idx) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-white/[0.01] transition-colors -mx-4 px-4 rounded-xl"
            >
              {/* Year & Company */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <span className="font-display text-3xl sm:text-4xl font-black text-white/40">
                  {item.year}
                </span>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                  {item.company}
                </h3>
                <span className="font-mono text-sm text-[#00E5FF] font-medium">
                  {item.role}
                </span>
                <span className="text-xs font-mono text-white/40">
                  {item.location} // {item.type}
                </span>
              </div>

              {/* Achievements & Responsibilities */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <ul className="flex flex-col gap-3 text-sm font-sans text-white/70 leading-relaxed">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded bg-white/[0.04] text-[11px] font-mono text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlight Metric */}
              <div className="lg:col-span-3 flex flex-col justify-center p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1">
                  HIGHLIGHT OUTCOME
                </span>
                <div className="font-display text-4xl font-extrabold text-[#00E5FF]">
                  {item.metricNumber}
                </div>
                <span className="text-xs font-mono text-white/70 mt-1">
                  {item.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
