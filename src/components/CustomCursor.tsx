import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CursorMode } from '../types';
import { useReducedMotion } from '../hooks/usePreferences';

interface CustomCursorProps {
  mode: CursorMode;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mode }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || reducedMotion || !isVisible) {
    return null;
  }

  const isProject = mode === 'project';
  const isDrag = mode === 'drag';
  const isLink = mode === 'link';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer follow element */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: pos.x,
          y: pos.y,
          width: isProject ? 90 : isDrag ? 90 : isLink ? 48 : 32,
          height: isProject ? 34 : isDrag ? 34 : isLink ? 48 : 32,
          backgroundColor: isProject
            ? 'rgba(0, 229, 255, 0.95)'
            : isDrag
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          borderColor: isProject || isDrag ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
          borderWidth: isProject || isDrag ? 0 : 1,
          borderRadius: 9999,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.4,
        }}
      >
        {isProject && (
          <span className="text-[11px] font-mono tracking-widest font-bold text-black uppercase">
            VIEW →
          </span>
        )}
        {isDrag && (
          <span className="text-[11px] font-mono tracking-widest font-bold text-black uppercase">
            DRAG ↔
          </span>
        )}
      </motion.div>

      {/* Tiny center pinpoint */}
      {!isProject && !isDrag && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(0,229,255,0.8)]"
          animate={{
            x: pos.x,
            y: pos.y,
            scale: isLink ? 0 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 50,
            stiffness: 700,
          }}
        />
      )}
    </div>
  );
};
