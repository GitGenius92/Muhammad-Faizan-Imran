import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CursorMode } from '../types';

interface FooterProps {
  onScrollToTop: () => void;
  setCursorMode: (mode: CursorMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, setCursorMode }) => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.08] py-12 px-6 md:px-12 lg:px-16 text-white/50 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div className="flex flex-col gap-1">
            <span className="font-display text-lg font-bold text-white tracking-tight">
              {PERSONAL_INFO.shortName}
            </span>
            <span className="text-[11px] text-white/40">
              {PERSONAL_INFO.title.toUpperCase()} · {PERSONAL_INFO.location.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="hover:text-[#00E5FF] transition-colors"
            >
              EMAIL
            </a>
            <span className="text-white/20">/</span>
            <span
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="hover:text-white transition-colors cursor-default"
              title="LinkedIn profile identifier"
            >
              LINKEDIN ({PERSONAL_INFO.linkedin})
            </span>
            <span className="text-white/20">/</span>
            <span
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="hover:text-white transition-colors cursor-default"
              title="GitHub profile identifier"
            >
              GITHUB ({PERSONAL_INFO.github})
            </span>
          </div>

          <button
            onClick={onScrollToTop}
            onMouseEnter={() => setCursorMode('link')}
            onMouseLeave={() => setCursorMode('default')}
            className="flex items-center gap-2 text-white/70 hover:text-[#00E5FF] transition-colors self-start md:self-auto"
            aria-label="Scroll to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#00E5FF]" />
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-white/30">
          <span>© 2026 MUHAMMAD FAIZAN IMRAN. ALL RIGHTS RESERVED.</span>
          <span className="text-[#00E5FF]/60">BUILT WITH REACT / TYPESCRIPT</span>
        </div>
      </div>
    </footer>
  );
};
