import React from 'react';
import { motion } from 'motion/react';
import { BUILD_PRINCIPLES } from '../data/portfolioData';
import { CursorMode } from '../types';

interface HowIBuildProps {
  setCursorMode: (mode: CursorMode) => void;
}

export const HowIBuild: React.FC<HowIBuildProps> = ({ setCursorMode }) => {
  return (
    <section
      id="how-i-build"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
              03 // METHODOLOGY
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase">
              HOW I BUILD.
            </h2>
          </div>
          <p className="text-sm font-mono text-white/50 max-w-sm">
            A disciplined engineering sequence ensuring AI architectures translate seamlessly into reliable software.
          </p>
        </div>

        {/* 6 Steps Grid with Massive Numbers and Clean Editorial Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BUILD_PRINCIPLES.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="group p-8 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between gap-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl sm:text-6xl font-black text-white/20 group-hover:text-[#00E5FF] transition-colors">
                    {item.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#00E5FF] transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-[#00E5FF]/80">
                    {item.tagline}
                  </span>
                </div>

                <p className="text-sm font-sans text-white/65 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
