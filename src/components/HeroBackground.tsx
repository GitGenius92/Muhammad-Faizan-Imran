import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../hooks/usePreferences';

interface HeroBackgroundProps {
  mouseX: number;
  mouseY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  pulsePhase: number;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ mouseX, mouseY }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNetwork();
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes representing tensor graphs & signal nodes
    let particles: Particle[] = [];
    let signals: Signal[] = [];

    const initNetwork = () => {
      particles = [];
      signals = [];
      const count = Math.min(Math.floor((width * height) / 28000), 55);

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() < 0.2 ? 2.5 : Math.random() < 0.6 ? 1.5 : 1,
          color: Math.random() < 0.35 ? '#00E5FF' : '#FFFFFF',
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize signals along close pairs
      for (let i = 0; i < 6; i++) {
        const fromIdx = Math.floor(Math.random() * particles.length);
        let toIdx = (fromIdx + 1 + Math.floor(Math.random() * 3)) % particles.length;
        signals.push({
          fromIdx,
          toIdx,
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.005,
        });
      }
    };

    initNetwork();

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      targetMouseX = mouseX;
      targetMouseY = mouseY;
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      const maxDist = 140;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!reducedMotion) {
          p1.x += p1.vx;
          p1.y += p1.vy;

          // Gentle bounds bounce
          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;

          // Mouse nudge
          const dx = p1.originX - (currentMouseX + 1) * 0.5 * width;
          const dy = p1.originY - (currentMouseY + 1) * 0.5 * height;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 220) {
            const force = (220 - distToMouse) / 220;
            p1.x += (dx / distToMouse) * force * 1.5;
            p1.y += (dy / distToMouse) * force * 1.5;
          }
        }

        // Draw links to nearest nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        const pulse = Math.sin(p1.pulsePhase += 0.02) * 0.3 + 0.7;
        ctx.fillStyle = p1.color === '#00E5FF' 
          ? `rgba(0, 229, 255, ${0.4 * pulse})` 
          : `rgba(255, 255, 255, ${0.25 * pulse})`;
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw traveling signals (model states / packet impulses)
      if (!reducedMotion) {
        signals.forEach((sig) => {
          sig.progress += sig.speed;
          if (sig.progress >= 1) {
            sig.progress = 0;
            sig.fromIdx = Math.floor(Math.random() * particles.length);
            sig.toIdx = (sig.fromIdx + 2) % particles.length;
          }

          const from = particles[sig.fromIdx];
          const to = particles[sig.toIdx];
          if (from && to) {
            const sx = from.x + (to.x - from.x) * sig.progress;
            const sy = from.y + (to.y - from.y) * sig.progress;

            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 229, 255, 0.9)';
            ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
            ctx.fill();

            // Tiny trail
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx - (to.x - from.x) * 0.05, sy - (to.y - from.y) * 0.05);
            ctx.stroke();
          }
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
