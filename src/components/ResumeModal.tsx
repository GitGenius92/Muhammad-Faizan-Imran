import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Download, Printer, ExternalLink, GraduationCap, Briefcase, Code, Shield } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE_HISTORY } from '../data/portfolioData';
import { CursorMode } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCursorMode: (mode: CursorMode) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  setCursorMode,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      <div className="relative w-full max-w-4xl bg-[#0D0D0D] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[90vh]">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141414] border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            <span>CURRICULUM VITAE // VERIFIED SOURCE OF TRUTH</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Structured Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans flex flex-col gap-10 text-white/90 leading-normal">
          {/* Resume Header */}
          <div className="border-b border-white/[0.08] pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white">
                {PERSONAL_INFO.name}
              </h1>
              <p className="font-mono text-sm text-[#00E5FF] mt-1">
                {PERSONAL_INFO.title} · {PERSONAL_INFO.subtitle}
              </p>
            </div>
            <div className="text-xs font-mono text-white/60 sm:text-right flex flex-col gap-1">
              <span>{PERSONAL_INFO.email}</span>
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00E5FF] uppercase border-b border-white/[0.06] pb-1">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h2 className="font-bold text-base text-white">
                  {PERSONAL_INFO.education.degree}
                </h2>
                <p className="text-sm text-white/70 font-mono">
                  {PERSONAL_INFO.education.institution}
                </p>
              </div>
              <span className="text-xs font-mono text-white/40">
                {PERSONAL_INFO.education.period}
              </span>
            </div>
          </div>

          {/* Documented Projects */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00E5FF] uppercase border-b border-white/[0.06] pb-1">
              <Code className="w-4 h-4" />
              <span>ENGINEERED AI & SECURITY SYSTEMS</span>
            </div>

            <div className="flex flex-col gap-6">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-bold text-sm text-white">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-[#00E5FF] font-semibold">
                      {proj.metric} {proj.metricLabel}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {proj.description}
                  </p>
                  <div className="text-[11px] font-mono text-white/40">
                    Stack: {proj.stack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00E5FF] uppercase border-b border-white/[0.06] pb-1">
              <Briefcase className="w-4 h-4" />
              <span>EXPERIENCE HISTORY</span>
            </div>

            <div className="flex flex-col gap-6">
              {EXPERIENCE_HISTORY.map((exp) => (
                <div key={exp.company} className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-sm text-white">{exp.company}</span>
                      <span className="text-xs text-[#00E5FF] font-mono ml-2">({exp.role})</span>
                    </div>
                    <span className="text-xs font-mono text-white/40">{exp.year}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-white/70 flex flex-col gap-1">
                    {exp.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Toolkit */}
          <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-4 text-xs font-mono text-white/60">
            <span className="text-[#00E5FF] font-bold uppercase">TECHNICAL SKILLS:</span>
            <span>
              Python, PyTorch, Scikit-learn, Transformers, LangChain, Hugging Face, Ollama, ChromaDB, FastAPI, Node.js, Express, React, Streamlit, Scapy, Docker, Git.
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#141414] border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[11px] font-mono text-white/40">
            OFFICIAL RESUME · MUHAMMAD FAIZAN IMRAN
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase rounded hover:bg-[#00E5FF] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </motion.div>
  );
};
