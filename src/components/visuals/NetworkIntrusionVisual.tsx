import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, Zap, Network, Activity } from 'lucide-react';
import { useReducedMotion } from '../../hooks/usePreferences';

interface NetworkIntrusionVisualProps {
  isHovered?: boolean;
}

export const NetworkIntrusionVisual: React.FC<NetworkIntrusionVisualProps> = ({ isHovered = false }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [classification, setClassification] = useState<'NORMAL' | 'ATTACK'>('NORMAL');
  const [packetCount, setPacketCount] = useState(1482);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 6;
        if (next === 5) {
          setClassification(Math.random() > 0.35 ? 'NORMAL' : 'ATTACK');
          setPacketCount((c) => c + 1);
        }
        return next;
      });
    }, isHovered ? 900 : 1600);

    return () => clearInterval(interval);
  }, [isHovered, reducedMotion]);

  const stages = [
    { label: 'NETWORK', sub: 'Raw Socket' },
    { label: 'CAPTURE', sub: 'Scapy Stream' },
    { label: 'EXTRACT', sub: 'Flow Vectors' },
    { label: 'PREPROCESS', sub: 'Z-Score Scale' },
    { label: 'PYTORCH', sub: 'Deep Classifier' },
    { label: 'DECISION', sub: 'Binary Class' },
  ];

  return (
    <div className="w-full h-full min-h-[360px] bg-[#070707] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden font-mono select-none">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs">
        <div className="flex items-center gap-2 text-white/60">
          <Network className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>SOCKET_STREAM // eth0.promisc</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40">INSPECTED: {packetCount} pkts</span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.05] text-[#00E5FF] text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Network Pipeline Stage Nodes */}
      <div className="relative py-6">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/10 -translate-y-1/2 z-0" />
        
        {/* Active Animated Pulse Traveling */}
        {!reducedMotion && (
          <motion.div
            className="absolute top-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent -translate-y-1/2 z-0"
            style={{ width: '25%' }}
            animate={{
              left: ['0%', '75%'],
            }}
            transition={{
              duration: isHovered ? 1.4 : 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Stages Node Points */}
        <div className="relative z-10 grid grid-cols-6 gap-1">
          {stages.map((stage, idx) => {
            const isCurrent = idx === activeStep;
            return (
              <div key={stage.label} className="flex flex-col items-center text-center">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#00E5FF] text-black shadow-[0_0_16px_rgba(0,229,255,0.7)] scale-110'
                      : 'bg-[#141414] text-white/40 border border-white/15'
                  }`}
                >
                  0{idx + 1}
                </div>
                <span
                  className={`text-[10px] tracking-wider mt-2 font-bold transition-colors ${
                    isCurrent ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {stage.label}
                </span>
                <span className="text-[8px] text-white/30 hidden sm:block">
                  {stage.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result Display Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#0D0D0D] border border-white/[0.06] p-4 rounded-lg">
        <div>
          <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">
            CLASSIFIER INFERENCE
          </span>
          <div className="flex items-center gap-2">
            {classification === 'NORMAL' ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-emerald-400 text-sm tracking-wide">
                  BENIGN TRAFFIC (NORMAL)
                </span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />
                <span className="font-bold text-red-400 text-sm tracking-wide">
                  ANOMALOUS INTRUSION DETECTED
                </span>
              </>
            )}
          </div>
        </div>

        {/* 91% Accuracy Display */}
        <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-3 sm:pt-0 sm:pl-4">
          <div className="flex sm:justify-end items-baseline gap-1.5">
            <span className="text-2xl font-bold font-display text-[#00E5FF]">91%</span>
            <span className="text-xs text-white/70 font-semibold tracking-wider">ACCURACY</span>
          </div>
          <span className="text-[10px] text-white/40 block leading-tight">
            Reported accuracy on the project&apos;s evaluation
          </span>
        </div>
      </div>
    </div>
  );
};
