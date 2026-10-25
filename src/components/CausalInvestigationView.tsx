import React, { useState } from 'react';
import { ThreatAlert, GraphNode, GraphEdge, MitreTTP } from '../types';
import { AttackGraphCanvas } from './AttackGraphCanvas';
import { 
  GitFork, 
  ShieldAlert, 
  Crosshair, 
  ArrowLeftRight, 
  Layers, 
  CheckCircle2, 
  Info,
  Maximize2
} from 'lucide-react';

interface CausalInvestigationViewProps {
  alert: ThreatAlert | null;
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
  onRunCausalTrace: (seedId: number, depth: number) => void;
  causalResults?: {
    nodes: GraphNode[];
    edges: GraphEdge[];
    matchedTTPs: MitreTTP[];
    threatScore: number;
    blastRadiusCount: number;
  };
}

export const CausalInvestigationView: React.FC<CausalInvestigationViewProps> = ({
  alert,
  nodes,
  edges,
  onSelectNode,
  onRunCausalTrace,
  causalResults
}) => {
  const [selectedDepth, setSelectedDepth] = useState(3);
  const [selectedSeedNodeId, setSelectedSeedNodeId] = useState<number>(0);

  const displayNodes = causalResults ? causalResults.nodes : nodes;
  const displayEdges = causalResults ? causalResults.edges : edges;
  const ttps = causalResults?.matchedTTPs || alert?.ttps || [];
  const score = causalResults?.threatScore || (alert ? alert.risk_score * 100 : 85.0);

  return (
    <div className="space-y-5">
      {/* Investigation Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100 font-mono">
              Phase 11: Automated Bounded Causal Tracing & ATT&CK Reconstruction
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Origin Ingress identification via backward causal graph traversal + Blast Radius estimation via forward subprocess & socket expansion.
          </p>
        </div>

        {/* Tracing Controls */}
        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-mono text-slate-300">
            <span>Seed Node:</span>
            <select
              value={selectedSeedNodeId}
              onChange={(e) => setSelectedSeedNodeId(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-cyan-400 font-mono text-xs focus:outline-none"
            >
              {nodes.map(n => (
                <option key={n.id} value={n.id}>
                  #{n.id} {n.label} ({n.type})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-slate-300">
            <span>Max Depth:</span>
            <select
              value={selectedDepth}
              onChange={(e) => setSelectedDepth(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-cyan-400 font-mono text-xs focus:outline-none"
            >
              <option value={1}>1 Hop</option>
              <option value={2}>2 Hops</option>
              <option value={3}>3 Hops (Default)</option>
              <option value={4}>4 Hops (Deep)</option>
            </select>
          </div>

          <button
            onClick={() => onRunCausalTrace(selectedSeedNodeId, selectedDepth)}
            className="flex items-center gap-1 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold font-mono transition"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Trace</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Attack Subgraph Canvas + MITRE ATT&CK Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Reconstructed Subgraph (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <Layers className="w-4 h-4 text-cyan-400" />
              Isolated Attack Scenario Subgraph ({displayNodes.length} Nodes, {displayEdges.length} Causal Edges)
            </span>
            <span className="text-emerald-400">
              Noise Reduction: {Math.max(0, 100 - Math.round((displayNodes.length / Math.max(nodes.length, 1)) * 100))}%
            </span>
          </div>

          <AttackGraphCanvas
            nodes={displayNodes}
            edges={displayEdges}
            onSelectNode={onSelectNode}
            filterAttackOnly={false}
          />
        </div>

        {/* Right: MITRE ATT&CK TTP Kill-Chain Panel (1 Col) */}
        <div className="space-y-4">
          {/* Quantitative Threat Score Card */}
          <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-4 shadow-sm">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Quantitative Scenario Threat Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-rose-400">
                {score.toFixed(1)}
              </span>
              <span className="text-xs text-rose-400/80 font-mono">/ 100 Max Risk</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Evaluated via multi-stage formula: TS(AG) = &Sigma; w_stage &middot; [Freq + Var] &middot; (1 + DA) &middot; Criticality
            </p>
          </div>

          {/* MITRE ATT&CK TTPs Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-200 font-mono flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                MITRE ATT&CK Kill-Chain TTPs
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                {ttps.length} Identified
              </span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {ttps.map((ttp, idx) => (
                <div 
                  key={`${ttp.id}-${idx}`}
                  className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-2.5 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-cyan-400">{ttp.id}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      weight: &times;{ttp.weight}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">
                    {ttp.name}
                  </div>
                  <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
                    Stage: {ttp.stage}
                  </div>
                  {ttp.details && (
                    <div className="text-[11px] text-slate-400 font-mono mt-1 bg-slate-900 p-1.5 rounded">
                      {ttp.details}
                    </div>
                  )}
                </div>
              ))}

              {ttps.length === 0 && (
                <div className="text-center py-6 text-slate-500 font-mono text-xs">
                  Run causal trace to extract and map MITRE ATT&CK techniques.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
