import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle, Code2, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { CursorMode } from '../../types';

interface ApiSecurityVisualProps {
  setCursorMode?: (mode: CursorMode) => void;
}

export const ApiSecurityVisual: React.FC<ApiSecurityVisualProps> = ({ setCursorMode }) => {
  const [activeTab, setActiveTab] = useState<'VULNERABLE' | 'REMEDIATED'>('VULNERABLE');
  const [selectedThreat, setSelectedThreat] = useState('SQL_INJECTION');

  const threats = [
    { id: 'SQL_INJECTION', label: 'SQL INJECTION', fix: 'PARAMETERIZED QUERIES' },
    { id: 'IDOR', label: 'IDOR (BOLA)', fix: 'JWT OBJECT CHECK' },
    { id: 'BROKEN_AUTH', label: 'BROKEN AUTH', fix: 'JWT ENFORCEMENT' },
    { id: 'RATE_LIMIT', label: 'NO THROTTLING', fix: 'RATE LIMITING (60/m)' },
  ];

  const codeExamples = {
    VULNERABLE: `# ❌ VULNERABLE ENDPOINT: Direct query concatenation & zero auth
@app.get("/api/v1/records/{record_id}")
async def get_record(record_id: str):
    # Unsanitized user parameter passed directly to raw SQL engine:
    raw_query = f"SELECT * FROM records WHERE id = '{record_id}'"
    return db.execute_raw(raw_query)`,
    REMEDIATED: `#  REMEDIATED ENDPOINT: Parameterized + Verified JWT Guard + Rate Limit
@app.get("/api/v1/records/{record_id}", response_model=RecordSchema)
@limiter.limit("60/minute")
async def get_record(
    record_id: UUID,
    current_user: User = Depends(get_current_active_user)
):
    # Validates tenant boundary & passes bound parameterized parameters
    return await db.fetch_one(
        "SELECT * FROM records WHERE id = :id AND tenant_id = :tenant_id",
        values={"id": record_id, "tenant_id": current_user.tenant_id}
    )`,
  };

  return (
    <div className="w-full h-full min-h-[360px] bg-[#070707] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden font-mono select-none">
      {/* Top Header & 92.3% Metric */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4 text-xs">
        <div className="flex items-center gap-2 text-white/60">
          <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>AST_SECURITY_SCANNER // OWASP_API_BENCHMARK</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40">ACCURACY:</span>
          <span className="text-sm font-bold text-[#00E5FF] font-display">92.3%</span>
          <span className="text-[10px] text-white/40">CLASSIFICATION</span>
        </div>
      </div>

      {/* Threat Selector Pills */}
      <div className="py-2 flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-white/40 mr-1 uppercase">DETECTED THREAT:</span>
        {threats.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedThreat(t.id)}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border ${
              selectedThreat === t.id
                ? 'bg-red-500/10 border-red-500/40 text-red-300'
                : 'bg-white/[0.02] border-white/[0.06] text-white/40 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Code Editor Transformation Window */}
      <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-lg overflow-hidden my-2">
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#121212] border-b border-white/[0.06] text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('VULNERABLE')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                activeTab === 'VULNERABLE'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>VULNERABLE AST</span>
            </button>
            <button
              onClick={() => setActiveTab('REMEDIATED')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                activeTab === 'REMEDIATED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>PATCHED (FASTAPI)</span>
            </button>
          </div>

          <button
            onClick={() =>
              setActiveTab((prev) => (prev === 'VULNERABLE' ? 'REMEDIATED' : 'VULNERABLE'))
            }
            className="flex items-center gap-1 text-[10px] text-white/50 hover:text-[#00E5FF] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>TOGGLE PATCH</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 text-xs font-mono overflow-x-auto text-white/80 leading-relaxed bg-[#080808]">
          <pre className="whitespace-pre">
            <code>{codeExamples[activeTab]}</code>
          </pre>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[#00E5FF]">SUPPORTED:</span>
          <span>SQL INJECTION · IDOR · XSS · BROKEN AUTH</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-emerald-400">
          <span>REMEDIATION VERIFIED</span>
          <CheckCircle className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
