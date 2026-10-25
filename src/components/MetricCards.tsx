import React from 'react';
import { Target, CheckCircle2, ShieldCheck, Zap, AlertTriangle, Network } from 'lucide-react';

interface MetricCardsProps {
  totalAlerts: number;
  totalEntities: number;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ totalAlerts, totalEntities }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Metric 1: Precision */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Precision</span>
          <Target className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-cyan-400">100.0%</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-0.5">0.0% False Positives</div>
        </div>
      </div>

      {/* Metric 2: Recall */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Recall</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-emerald-400">100.0%</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-0.5">0.0% False Negatives</div>
        </div>
      </div>

      {/* Metric 3: Operational FPR */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Operational FPR</span>
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-indigo-300">0.08%</div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">Target &le; 0.10%</div>
        </div>
      </div>

      {/* Metric 4: Latency */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Inference Latency</span>
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-amber-300">2.8 ms</div>
          <div className="text-[11px] text-amber-400/80 font-mono mt-0.5">Real-Time Streaming</div>
        </div>
      </div>

      {/* Metric 5: Active Kill-Chains */}
      <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:border-rose-700/60 transition">
        <div className="flex items-center justify-between text-rose-300 mb-1">
          <span className="text-xs font-medium">APT Kill-Chains</span>
          <AlertTriangle className="w-4 h-4 text-rose-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-rose-400">{totalAlerts} Active</div>
          <div className="text-[11px] text-rose-400/80 font-mono mt-0.5">MITRE Correlated</div>
        </div>
      </div>

      {/* Metric 6: Monitored Entities */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:border-slate-700 transition">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Provenance Graph</span>
          <Network className="w-4 h-4 text-sky-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-sky-300">{totalEntities} Nodes</div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">CDM Normalized</div>
        </div>
      </div>
    </div>
  );
};
