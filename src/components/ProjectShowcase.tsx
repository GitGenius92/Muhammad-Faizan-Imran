import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, CursorMode } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectShowcaseProps {
  onOpenCaseStudy: (project: Project) => void;
  setCursorMode: (mode: CursorMode) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  onOpenCaseStudy,
  setCursorMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const currentProject = PROJECTS[currentIndex];

  return (
    <section
      id="work"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#080808] border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
              02 // SELECTED WORK
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
              SELECTED WORK.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-sm font-mono text-white/50 max-w-sm">
              &ldquo;THREE SYSTEMS. THREE DIFFERENT PROBLEMS.&rdquo;
            </p>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className="p-3 rounded-full border border-white/15 bg-white/[0.03] text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all focus:outline-none"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className="p-3 rounded-full border border-white/15 bg-white/[0.03] text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all focus:outline-none"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
          {PROJECTS.map((proj, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={proj.id}
                onClick={() => setCurrentIndex(idx)}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#00E5FF] text-black font-bold border-[#00E5FF]'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/25'
                }`}
              >
                {proj.number} // {proj.title.split(' ')[0]} {proj.title.split(' ')[1] || ''}
              </button>
            );
          })}
        </div>

        {/* Current Active Project Presentation */}
        <div
          onMouseEnter={() => setCursorMode('project')}
          onMouseLeave={() => setCursorMode('default')}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={currentProject}
                totalProjects={PROJECTS.length}
                onOpenCaseStudy={onOpenCaseStudy}
                setCursorMode={setCursorMode}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination & Progress Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.08] text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="text-[#00E5FF] font-bold">
              0{currentIndex + 1}
            </span>
            <span>/</span>
            <span>0{PROJECTS.length}</span>
          </div>

          {/* Bar indicator */}
          <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#00E5FF]"
              animate={{
                width: `${((currentIndex + 1) / PROJECTS.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="hover:text-white transition-colors"
            >
              PREV
            </button>
            <span>·</span>
            <button
              onClick={handleNext}
              className="hover:text-white transition-colors"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
