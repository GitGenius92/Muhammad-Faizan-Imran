/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { EngineeringPipeline } from './components/EngineeringPipeline';
import { ProjectShowcase } from './components/ProjectShowcase';
import { HowIBuild } from './components/HowIBuild';
import { TechStack } from './components/TechStack';
import { Metrics } from './components/Metrics';
import { Experience } from './components/Experience';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { Project, CursorMode } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Check URL hash on initial load for direct project deep links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('project-')) {
        const slug = hash.replace('project-', '');
        const found = PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setActiveCaseStudy(found);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCaseStudy = (project: Project) => {
    setActiveCaseStudy(project);
    window.history.pushState(null, '', `#project-${project.slug}`);
  };

  const handleCloseCaseStudy = () => {
    setActiveCaseStudy(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans antialiased relative selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Bespoke Desktop Creative Studio Cursor */}
      <CustomCursor mode={cursorMode} />

      {/* Global Minimalist Navigation */}
      <Navbar
        onNavigate={scrollToSection}
        setCursorMode={setCursorMode}
        onOpenContact={() => scrollToSection('contact')}
      />

      {/* Main Continuous Editorial Canvas */}
      <main className="w-full flex flex-col">
        {/* 01: Hero with Viewport Typography & Neural Particle System */}
        <Hero
          onScrollToExplore={() => scrollToSection('statement')}
          setCursorMode={setCursorMode}
        />

        {/* 02: Introduction Statement ("Not Just Models. I Build The System Around Them.") */}
        <Statement
          setCursorMode={setCursorMode}
          onExplorePipeline={() => scrollToSection('pipeline')}
        />

        {/* 03: The Engineering Pipeline (5 Horizontal Stages) */}
        <EngineeringPipeline setCursorMode={setCursorMode} />

        {/* 04: Selected Work (3 Editorial Systems, Live Visuals, Case Studies) */}
        <ProjectShowcase
          onOpenCaseStudy={handleOpenCaseStudy}
          setCursorMode={setCursorMode}
        />

        {/* 05: How I Build (6-Step Disciplined Sequence) */}
        <HowIBuild setCursorMode={setCursorMode} />

        {/* 06: Technology Is A Tool (Interactive Matrix & Ticker) */}
        <TechStack setCursorMode={setCursorMode} />

        {/* 07: System Evaluation & Impact Metrics */}
        <Metrics setCursorMode={setCursorMode} />

        {/* 08: Minimalist Experience Timeline */}
        <Experience setCursorMode={setCursorMode} />

        {/* 09: Computer Engineering Identity & Education */}
        <About
          onOpenResume={() => setIsResumeOpen(true)}
          setCursorMode={setCursorMode}
        />

        {/* 10: Final Massive Call to Action ("Let's Build Something Intelligent.") */}
        <Contact setCursorMode={setCursorMode} />
      </main>

      {/* Global Minimal Studio Footer */}
      <Footer
        onScrollToTop={() => scrollToSection('hero')}
        setCursorMode={setCursorMode}
      />

      {/* In-depth Editorial Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={handleCloseCaseStudy}
        setCursorMode={setCursorMode}
      />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        setCursorMode={setCursorMode}
      />
    </div>
  );
}
