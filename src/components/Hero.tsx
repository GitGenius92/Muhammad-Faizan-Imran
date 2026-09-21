import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Cpu, Sparkles } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { useMousePosition, useReducedMotion } from '../hooks/usePreferences';
import { CursorMode } from '../types';

interface HeroProps {
  onScrollToExplore: () => void;
  setCursorMode: (mode: CursorMode) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToExplore, setCursorMode }) => {
  const { normalizedX, normalizedY } = useMousePosition();
  const reducedMotion = useReducedMotion();

  // Subtle parallax translation calculation
  const titleOffsetX = reducedMotion ? 0 : normalizedX * 8;
  const titleOffsetY = reducedMotion ? 0 : normalizedY * 8;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#0A0A0A] select-none"
    >
      {/* Background Interactive System */}
      <HeroBackground mouseX={normalizedX} mouseY={normalizedY} />

      {/* Subtle top metadata */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-7xl w-full mx-auto text-xs font-mono tracking-widest text-white/45">
        <div className="flex items-center gap-3">
          <span className="text-[#00E5FF] font-semibold">// 2026 REEL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="text-white/80">MUHAMMAD FAIZAN IMRAN</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-[11px]">
          <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>AI/ML · DEEP LEARNING · FULL STACK</span>
        </div>
      </div>

      {/* Main Massive Viewport Typography */}
      <div className="relative z-10 my-auto py-12 max-w-7xl w-full mx-auto">
        <motion.div
          animate={{
            x: titleOffsetX,
            y: titleOffsetY,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 200 }}
          className="flex flex-col"
        >
          {/* Primary Giant Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold tracking-[-0.04em] text-[15vw] sm:text-[13vw] md:text-[12vw] lg:text-[11vw] leading-[0.88] text-white"
          >
            AI/ML
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              ENGINEER.
            </span>
          </motion.h1>

          {/* Secondary Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-12 max-w-4xl"
          >
            <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white/90 leading-tight">
              &ldquo;I BUILD INTELLIGENT SYSTEMS
              <br className="hidden sm:inline" />
              <span className="text-white/40"> AND TURN THEM INTO REAL SOFTWARE.&rdquo;</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Row Controls */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-end justify-between pt-6 border-t border-white/[0.08] text-xs font-mono text-white/50">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-sm bg-[#00E5FF]/80" />
          <span className="tracking-widest uppercase">SYS_STATUS: ACTIVE RESEARCH & PRODUCTION</span>
        </div>

        <button
          onClick={onScrollToExplore}
          onMouseEnter={() => setCursorMode('link')}
          onMouseLeave={() => setCursorMode('default')}
          className="group flex items-center gap-2.5 text-white/70 hover:text-[#00E5FF] transition-colors focus:outline-none"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#00E5FF]" />
          </motion.div>
        </button>
      </div>
    </section>
  );
};
