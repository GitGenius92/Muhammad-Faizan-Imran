import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Layers, ArrowRight } from 'lucide-react';
import { CursorMode } from '../types';

interface StatementProps {
  setCursorMode: (mode: CursorMode) => void;
  onExplorePipeline: () => void;
}

export const Statement: React.FC<StatementProps> = ({ setCursorMode, onExplorePipeline }) => {
  const words = [
    'Machine',
    'learning',
    'is',
    'only',
    'one',
    'part',
    'of',
    'the',
    'product.',
    'I',
    'work',
    'across',
    'data,',
    'models,',
    'APIs',
    'and',
    'interfaces',
    'to',
    'turn',
    'intelligent',
    'systems',
    'into',
    'usable,',
    'resilient',
    'software.',
  ];

  return (
    <section
      id="statement"
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#080808] border-t border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Editorial Sub-marker */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#00E5FF]">
          <Terminal className="w-3.5 h-3.5" />
          <span>00 // THE ENGINEERING PHILOSOPHY</span>
        </div>

        {/* Large Statement Headlines */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-sm tracking-[0.25em] text-white/40 uppercase block mb-4">
              PARADIGM SHIFT
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]">
              NOT JUST MODELS.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/40 leading-[0.95]">
              I BUILD THE SYSTEM <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00E5FF]">
                AROUND THEM.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Progressive Word Reveal Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-white/[0.08]">
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
              THE FULL-CYCLE DISCIPLINE
            </span>
            <p className="text-sm font-mono text-white/60 leading-relaxed">
              Models residing solely in Jupyter notebooks solve zero production challenges. True intelligence demands robust ingestion streams, strict API contracts, and real-time observability.
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="font-sans text-xl sm:text-2xl md:text-3xl text-white/90 font-light leading-relaxed tracking-normal">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.2, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.03 * i }}
                  className="inline-block mr-2.5 hover:text-[#00E5FF] transition-colors"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            {/* Quick Link into Pipeline */}
            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={onExplorePipeline}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00E5FF] uppercase hover:text-white transition-colors"
              >
                <span>EXPLORE PIPELINE ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
