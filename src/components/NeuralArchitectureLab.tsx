import React, { useState } from 'react';
import { ABLATION_STUDY_DATA } from '../data/mockDatasets';
import { Cpu, Award, Zap, Layers, GitCommit, CheckCircle2, ChevronRight, Binary } from 'lucide-react';

export const NeuralArchitectureLab: React.FC = () => {
  const [selectedRunId, setSelectedRunId] = useState('B7');

  const selectedRun = ABLATION_STUDY_DATA.find(r => r.id === selectedRunId) || ABLATION_STUDY_DATA[7];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100 font-mono">
              Hybrid GAT-GRU-VGAE Architecture & Ablation Study (Runs B0–B7)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Empirical validation of spatial relational attention, recurrent temporal tracking, and generative directed link reconstruction over DARPA TC E3 benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-cyan-400">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Optimal Config: B7 (Full System + Tracing)</span>
        </div>
      </div>

      {/* 3 Core Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Relation-Aware GAT */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span className="font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              1. Relation-Aware GAT
            </span>
            <span className="text-[10px] bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">Spatial</span>
          </div>
          <div className="text-xs text-slate-200 font-semibold">
            Multi-Head Edge Relational Attention
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Distinguishes between 8 system relation types (<code className="text-cyan-300">fork</code>, <code className="text-cyan-300">execve</code>, <code className="text-cyan-300">read</code>, <code className="text-cyan-300">write</code>, <code className="text-cyan-300">connect</code>, etc.). Projects nodes &amp; relations into relational attention space.
          </p>
          <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-cyan-300/90 border border-slate-900">
            e_ji = LeakyReLU( a^T [ h_i || h_j || e_r ] )
          </div>
        </div>

        {/* Pillar 2: Temporal GRU */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span className="font-bold flex items-center gap-1.5">
              <GitCommit className="w-4 h-4" />
              2. Temporal GRU
            </span>
            <span className="text-[10px] bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">Sequence</span>
          </div>
          <div className="text-xs text-slate-200 font-semibold">
            Chronological Trajectory Memory
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Maintains internal hidden states over a sliding history window <code className="text-amber-300">G_(t-w) ... G_(t-1)</code>. Tracks persistent entity behaviors (e.g., socket opened 30s ago, followed by shell execution).
          </p>
          <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-amber-300/90 border border-slate-900">
            h_temp = (1 - z_t) &odot; h_(t-1) + z_t &odot; h_candidate
          </div>
        </div>

        {/* Pillar 3: VGAE Directed Link Decoder */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span className="font-bold flex items-center gap-1.5">
              <Binary className="w-4 h-4" />
              3. Directed VGAE Decoder
            </span>
            <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">Generative</span>
          </div>
          <div className="text-xs text-slate-200 font-semibold">
            Asymmetric Causality Link Reconstruction
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Projects <code className="text-emerald-300">[h_spatial || h_temporal]</code> into continuous Gaussian latent space <code className="text-emerald-300">N(&mu;, &sigma;^2)</code> and predicts candidate directed edges via asymmetric MLP decoder.
          </p>
          <div className="bg-slate-950 p-2 rounded text-[11px] font-mono text-emerald-300/90 border border-slate-900">
            p(u &rarr; v) = Sigmoid( MLP( [z_u || W_r e_r || z_v] ) )
          </div>
        </div>
      </div>

      {/* Ablation Benchmark Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm font-mono">
              Standardized Ablation Study Table (Runs B0 through B7)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Evaluated on DARPA Transparent Computing CADETS E3
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800 uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Run ID</th>
                <th className="py-2.5 px-3">Spatial Encoder</th>
                <th className="py-2.5 px-3">Temporal Memory</th>
                <th className="py-2.5 px-3">Generative Decoder</th>
                <th className="py-2.5 px-3">Detection Signal</th>
                <th className="py-2.5 px-3 text-right">Precision</th>
                <th className="py-2.5 px-3 text-right">Recall</th>
                <th className="py-2.5 px-3 text-right">FPR</th>
                <th className="py-2.5 px-3 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ABLATION_STUDY_DATA.map((run) => {
                const isSelected = selectedRunId === run.id;
                return (
                  <tr
                    key={run.id}
                    onClick={() => setSelectedRunId(run.id)}
                    className={`cursor-pointer transition ${
                      run.highlight 
                        ? 'bg-cyan-950/20 hover:bg-cyan-950/40' 
                        : 'hover:bg-slate-800/40'
                    } ${isSelected ? 'border-l-4 border-cyan-400 bg-slate-800/60' : ''}`}
                  >
                    <td className="py-2.5 px-3 font-bold text-slate-100 flex items-center gap-1.5">
                      {run.highlight && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>}
                      {run.id}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{run.spatialEncoder}</td>
                    <td className="py-2.5 px-3 text-slate-300">{run.temporalMemory}</td>
                    <td className="py-2.5 px-3 text-slate-400">{run.generativeDecoder}</td>
                    <td className="py-2.5 px-3 text-slate-400">{run.detectionSignal}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">{run.precision.toFixed(1)}%</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">{run.recall.toFixed(1)}%</td>
                    <td className="py-2.5 px-3 text-right text-rose-300 font-bold">{run.fpr.toFixed(2)}%</td>
                    <td className="py-2.5 px-3 text-right text-amber-300">{run.latencyMs} ms</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Run Details Drawer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0">
            <ChevronRight className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100 font-mono flex items-center gap-2">
              <span>{selectedRun.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                F1 Score: {selectedRun.f1.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {selectedRun.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
