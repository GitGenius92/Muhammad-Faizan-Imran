import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CursorMode } from '../types';

interface ContactProps {
  setCursorMode: (mode: CursorMode) => void;
}

export const Contact: React.FC<ContactProps> = ({ setCursorMode }) => {
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState('AI System Architecture');
  const [customMessage, setCustomMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const inquiryTypes = [
    'AI System Architecture',
    'Machine Learning Engineering',
    'Full-Stack Production Apps',
    'Technical Collaboration',
  ];

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`[Inquiry] ${inquiryType} — Muhammad Faizan Imran`);
    const body = encodeURIComponent(
      customMessage ||
        `Hi Faizan,\n\nI reviewed your portfolio and would like to discuss a project regarding ${inquiryType}.\n\nBest regards,`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#070707] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Massive Statement Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#00E5FF]">
            <Mail className="w-3.5 h-3.5" />
            <span>08 // DIRECT TRANSMISSION</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.03em] leading-[0.9] uppercase text-white">
            LET&apos;S BUILD <br />
            SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00E5FF]">
              INTELLIGENT.
            </span>
          </h2>
        </div>

        {/* Narrative & Action Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/[0.08] pt-12">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                DIRECT INITIATION
              </span>
              <p className="font-display text-2xl sm:text-3xl font-medium text-white/90 leading-tight">
                Have an AI problem, <br />
                a product idea, <br />
                or a system worth building?
              </p>
              <p className="text-base text-white/50 font-sans mt-2">
                Let&apos;s talk about architecture, models, and real-world deployment.
              </p>
            </div>

            {/* Email Bar with Click to Copy */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono text-white/40 uppercase">PRIMARY EMAIL</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onMouseEnter={() => setCursorMode('link')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="px-6 py-4 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-[#00E5FF] transition-all font-mono text-base sm:text-lg text-white font-semibold flex items-center justify-between gap-4 group"
                >
                  <span>{PERSONAL_INFO.email}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setCursorMode('link')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="px-5 py-4 rounded-xl border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Profile Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00E5FF] transition-colors"
              >
                <span>EMAIL ME</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/15 text-white/70 font-mono text-xs uppercase tracking-wider hover:border-white/30 transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN: {PERSONAL_INFO.linkedin}</span>
              </span>

              <span className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/15 text-white/70 font-mono text-xs uppercase tracking-wider hover:border-white/30 transition-colors">
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB: {PERSONAL_INFO.github}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Dispatch Composer */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs font-mono text-[#00E5FF]">
                // DISPATCH TRANSMISSION
              </span>
              <span className="text-[10px] font-mono text-white/40">READY</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-white/50 uppercase">
                INQUIRY DOMAIN
              </label>
              <div className="flex flex-wrap gap-2">
                {inquiryTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInquiryType(type)}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-all border ${
                      inquiryType === type
                        ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]'
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-white/50 uppercase">
                BRIEF MESSAGE (OPTIONAL)
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Describe your technical challenge, timeline, or product scope..."
                rows={4}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSendEmail}
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="w-full py-4 rounded-lg bg-[#00E5FF] text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <span>SEND INQUIRY DISPATCH</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
