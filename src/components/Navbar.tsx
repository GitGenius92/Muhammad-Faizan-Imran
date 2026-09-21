import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CursorMode } from '../types';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  setCursorMode: (mode: CursorMode) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, setCursorMode, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', id: 'work' },
    { label: 'PIPELINE', id: 'pipeline' },
    { label: 'ABOUT', id: 'about' },
    { label: 'EXPERIENCE', id: 'experience' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/[0.07]'
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleLinkClick('hero')}
            onMouseEnter={() => setCursorMode('link')}
            onMouseLeave={() => setCursorMode('default')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Faizan Imran Home"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-mono text-sm tracking-[0.2em] font-semibold text-white/90 group-hover:text-[#00E5FF] transition-colors">
              FAIZAN.IMRAN
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-white/60">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className="hover:text-white transition-colors uppercase tracking-[0.18em] py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#00E5FF] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}

            {/* Small Studio CTA */}
            <button
              onClick={onOpenContact}
              onMouseEnter={() => setCursorMode('link')}
              onMouseLeave={() => setCursorMode('default')}
              className="ml-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all text-xs tracking-wider"
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-mono tracking-wider"
            >
              TALK →
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#0A0A0A] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono tracking-widest text-[#00E5FF]">INDEX // DIRECTORY</span>
              <div className="flex flex-col gap-5">
                {navLinks.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={() => handleLinkClick(item.id)}
                    className="text-left text-3xl font-display font-medium tracking-tight text-white hover:text-[#00E5FF] transition-colors flex items-baseline justify-between border-b border-white/[0.08] pb-4"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>MUHAMMAD FAIZAN IMRAN</span>
                <span className="text-[#00E5FF]">AI/ML ENGINEER</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3.5 bg-white text-black font-mono text-xs tracking-widest font-bold uppercase rounded-lg hover:bg-[#00E5FF] transition-colors flex items-center justify-center gap-2"
              >
                <span>LET&apos;S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
