import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PIPELINE_STAGES } from '../data/portfolioData';
import { CursorMode } from '../types';
import { Database, BrainCircuit, Server, Layout, Container, ChevronRight, Activity } from 'lucide-react';

interface EngineeringPipelineProps {
  setCursorMode: (mode: CursorMode) => void;
}

export const EngineeringPipeline: React.FC<EngineeringPipelineProps> = ({ setCursorMode }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const stageIcons = [
    <Database key="data" className="w-5 h-5" />,
    <BrainCircuit key="model" className="w-5 h-5" />,
    <Server key="api" className="w-5 h-5" />,
    <Layout key="ui" className="w-5 h-5" />,
    <Container key="prod" className="w-5 h-5" />,
  ];

  const currentStage = PIPELINE_STAGES[activeStageIndex];

  return (
    <section
      id="pipeline"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase block mb-3">
              01 // CORE PIPELINE ARCHITECTURE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              FROM DATA TO PRODUCT.
            </h2>
          </div>
          <p className="text-sm font-mono text-white/50 max-w-md">
            The five discipline stages transforming raw unstructured signals into resilient, production-ready software.
          </p>
        </div>

        {/* Stage Selection Bar / Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStageIndex(idx)}
                onMouseEnter={() => setCursorMode('link')}
                onMouseLeave={() => setCursorMode('default')}
                className={`relative flex flex-col p-4 text-left rounded-lg transition-all border ${
                  isActive
                    ? 'bg-white/[0.06] border-[#00E5FF] text-white shadow-[0_0_20px_rgba(0,229,255,0.08)]'
                    : 'bg-white/[0.02] border-white/[0.07] text-white/50 hover:border-white/20 hover:text-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className={isActive ? 'text-[#00E5FF] font-bold' : 'text-white/40'}>
                    {stage.step}
                  </span>
                  <div className={isActive ? 'text-[#00E5FF]' : 'text-white/30'}>
                    {stageIcons[idx]}
                  </div>
                </div>
                <span className="font-display text-lg font-bold tracking-wide">
                  {stage.title}
                </span>
                <span className="text-[11px] font-mono text-white/40 truncate mt-1">
                  {stage.stack.join(' · ')}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activePipelineIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E5FF]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0D0D0D] border border-white/[0.08] rounded-xl p-6 md:p-10">
          {/* Left Column: Stage Editorial Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 tracking-wider">
                  STAGE {currentStage.step} // {currentStage.badge}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                {currentStage.title}
              </h3>

              <p className="text-base text-white/70 font-sans leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                TECHNOLOGY & TOOLCHAIN
              </span>
              <div className="flex flex-wrap gap-2">
                {currentStage.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF]/80 mt-2">
                <Activity className="w-3.5 h-3.5" />
                <span>{currentStage.highlight}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Visual Simulator for this Stage */}
          <div className="lg:col-span-6 min-h-[320px] bg-[#070707] border border-white/[0.08] rounded-lg p-6 flex flex-col justify-center relative overflow-hidden font-mono text-xs">
            <AnimatePresence mode="wait">
              {activeStageIndex === 0 && (
                <motion.div
                  key="data-visual"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between text-white/40 border-b border-white/[0.08] pb-2">
                    <span>// RAW_STREAM_INGESTION.bin</span>
                    <span className="text-[#00E5FF]">SAMPLING: 10,000 pkts/sec</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[11px] text-white/60">
                    <div className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded">
                      <div className="text-white/40 text-[9px]">FLOW_DUR</div>
                      <div className="text-white font-mono font-bold mt-1">1.482 ms</div>
                    </div>
                    <div className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded">
                      <div className="text-white/40 text-[9px]">BYTE_ENTROPY</div>
                      <div className="text-[#00E5FF] font-mono font-bold mt-1">7.924 bits</div>
                    </div>
                    <div className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded">
                      <div className="text-white/40 text-[9px]">SYN_RATIO</div>
                      <div className="text-white font-mono font-bold mt-1">0.034</div>
                    </div>
                    <div className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded">
                      <div className="text-white/40 text-[9px]">STATUS</div>
                      <div className="text-emerald-400 font-mono font-bold mt-1">NORMALIZED</div>
                    </div>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-white/[0.05] text-[11px] text-white/70 flex flex-col gap-1.5">
                    <span className="text-white/40"># Vector Normalization & Imputation Pipeline</span>
                    <span className="text-emerald-400">&gt; df = pd.DataFrame(raw_telemetry).dropna()</span>
                    <span className="text-cyan-300">&gt; scaled_features = StandardScaler().fit_transform(df)</span>
                    <span className="text-white/50">&gt; tensor_inputs = torch.from_numpy(scaled_features)</span>
                  </div>
                </motion.div>
              )}

              {activeStageIndex === 1 && (
                <motion.div
                  key="model-visual"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between text-white/40 border-b border-white/[0.08] pb-2">
                    <span>// NEURAL_WEIGHT_EVALUATION</span>
                    <span className="text-emerald-400">TRAINING CONVERGED</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4 bg-black/40 rounded border border-white/[0.06]">
                    <div>
                      <div className="text-white/40 text-[10px]">EPOCH 40/40</div>
                      <div className="text-xl font-bold text-white font-mono">LOSS: 0.042</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/40 text-[10px]">VAL ACCURACY</div>
                      <div className="text-xl font-bold text-[#00E5FF] font-mono">91.8%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-white/[0.02] border border-white/[0.06] rounded text-[11px]">
                    <span className="text-white/50">PyTorch SiLU + BatchNorm1d Encoder</span>
                    <span className="text-cyan-300 font-bold">FP16 QUANTIZED</span>
                  </div>
                </motion.div>
              )}

              {activeStageIndex === 2 && (
                <motion.div
                  key="api-visual"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between text-white/40 border-b border-white/[0.08] pb-2">
                    <span>// ASYNC_FASTAPI_INSPECTOR</span>
                    <span className="text-emerald-400">STATUS 200 OK</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-white/[0.06] flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-purple-400 font-bold">POST /v1/classify-flow</span>
                      <span className="text-white/40">LATENCY: 14.2ms</span>
                    </div>
                    <div className="text-white/60 text-[11px]">
                      Payload: &#123; &quot;features&quot;: [0.12, 0.94, -0.4, 1.2], &quot;auth&quot;: &quot;JWT_VERIFIED&quot; &#125;
                    </div>
                    <div className="text-emerald-400 text-[11px]">
                      Response: &#123; &quot;classification&quot;: &quot;BENIGN&quot;, &quot;confidence&quot;: 0.984 &#125;
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStageIndex === 3 && (
                <motion.div
                  key="ui-visual"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between text-white/40 border-b border-white/[0.08] pb-2">
                    <span>// REACT_STREAMLIT_DASHBOARD</span>
                    <span className="text-cyan-400">TELEMETRY STREAM: LIVE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded">
                      <div className="text-white/40 text-[9px]">ANOMALY RATE</div>
                      <div className="text-white font-bold text-lg font-mono">0.08%</div>
                    </div>
                    <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded">
                      <div className="text-white/40 text-[9px]">MODEL DRIFT</div>
                      <div className="text-emerald-400 font-bold text-lg font-mono">STABLE</div>
                    </div>
                  </div>
                  <div className="h-16 flex items-end gap-1.5 p-2 bg-black/40 rounded border border-white/[0.05]">
                    {[40, 65, 30, 85, 45, 95, 60, 40, 75, 50, 80, 45, 90, 35].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#00E5FF]/40 hover:bg-[#00E5FF] transition-all rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeStageIndex === 4 && (
                <motion.div
                  key="product-visual"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between text-white/40 border-b border-white/[0.08] pb-2">
                    <span>// DOCKER_DEPLOYMENT_CONTAINER</span>
                    <span className="text-emerald-400">HEALTH: PASSING</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-white/[0.06] flex flex-col gap-2 font-mono text-[11px]">
                    <div className="text-white/80">$ docker ps --filter &quot;name=ai-system&quot;</div>
                    <div className="text-white/50">CONTAINER ID: 7f3b89a01c</div>
                    <div className="text-white/50">IMAGE: faizan/ml-pipeline:v1.2</div>
                    <div className="text-[#00E5FF]">UPTIME: 99.98% · MEMORY: 342MB / 1024MB</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
