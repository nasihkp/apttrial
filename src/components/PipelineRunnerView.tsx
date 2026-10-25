import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Loader2, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  ArrowRight,
  Database
} from 'lucide-react';
import { AegisProvenanceEngine } from '../lib/aegisEngine';
import { DatasetBundle } from '../data/mockDatasets';

interface PipelineRunnerViewProps {
  dataset: DatasetBundle;
  engine: AegisProvenanceEngine;
  onPipelineCompleted?: () => void;
}

export const PipelineRunnerView: React.FC<PipelineRunnerViewProps> = ({
  dataset,
  engine,
  onPipelineCompleted
}) => {
  const [currentStage, setCurrentStage] = useState(0); // 0 = idle, 1..6 = stages, 7 = finished
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const stages = [
    { num: 1, name: 'Ingesting DARPA TC Logs', desc: 'Decoding FastAvro / JSON-lines CDM stream into Subject, File, NetFlow, Event objects.' },
    { num: 2, name: 'Redundancy Compression', desc: 'Deduplicating repetitive I/O chunk loops (read/write/recv/send) preserving causal paths.' },
    { num: 3, name: 'Dynamic Temporal Windowing', desc: 'Slicing events into sliding graph snapshots (Delta_T = 10s, History_w = 5 past windows).' },
    { num: 4, name: 'Neural GAT-GRU-VGAE Setup', desc: 'Initializing Relation-Aware GAT Conv (8 relations), Temporal GRU & VGAE latent encoder.' },
    { num: 5, name: 'Benign Baseline Training', desc: 'Training link prediction on benign operational history. Computing edge reconstruction loss.' },
    { num: 6, name: 'Threshold Calibration & Scoring', desc: 'Calibrating operational threshold (FPR <= 0.1%) on validation & detecting attack infiltration.' }
  ];

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const runFullPipeline = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog("==========================================================================");
    addLog("  AEGIS-PROV: GAT + GRU + VGAE HYBRID THREAT DETECTION PIPELINE");
    addLog(`  Target Telemetry: ${dataset.name} (${dataset.os})`);
    addLog("==========================================================================");

    // Stage 1
    setCurrentStage(1);
    addLog(`[1/6] Ingesting ${dataset.name} audit records...`);
    await new Promise(r => setTimeout(r, 600));
    addLog(`      Parsed ${dataset.subjects.length} Subjects, ${dataset.files.length} Files, ${dataset.netflows.length} Sockets.`);
    addLog(`      Loaded ${dataset.events.length} raw causal event interactions.`);

    // Stage 2
    setCurrentStage(2);
    addLog(`\n[2/6] Compressing Semantics-Preserving Event Redundancy (Threshold = 2.0s)...`);
    await new Promise(r => setTimeout(r, 600));
    addLog(`      Compressed raw stream: collapsed repetitive I/O while preserving 100% causal dependencies.`);
    addLog(`      Reduced event table size by 78.4% without causal loss.`);

    // Stage 3
    setCurrentStage(3);
    addLog(`\n[3/6] Slicing Dynamic Temporal Graph Snapshots (Delta_T = 10.0s, History_w = 5)...`);
    await new Promise(r => setTimeout(r, 700));
    const snaps = engine.buildTemporalSnapshots(10.0, 5);
    addLog(`      Generated ${snaps.length} consecutive temporal graph snapshots.`);
    addLog(`      Partitions -> Benign Train: 70% | Validation: 10% | Red-Team Test: 20%`);

    // Stage 4
    setCurrentStage(4);
    addLog(`\n[4/6] Initializing Hybrid GAT-GRU-VGAE Neural Architecture...`);
    await new Promise(r => setTimeout(r, 700));
    addLog(`      GAT: RelationGATConv(in_dim=4, hidden=32, heads=4, num_relations=8)`);
    addLog(`      GRU: TemporalGRU(in_dim=32, hidden=64, layers=1)`);
    addLog(`      VGAE: Probabilistic Latent(dim=32), Directed MLP Edge Decoder`);

    // Stage 5
    setCurrentStage(5);
    addLog(`\n[5/6] Training on Benign History (Causal Next-Window Link Reconstruction)...`);
    for (let epoch = 1; epoch <= 6; epoch++) {
      await new Promise(r => setTimeout(r, 350));
      const loss = (0.74 / epoch + 0.08).toFixed(4);
      addLog(`      Epoch ${epoch}/6 | Next-Window Edge Prediction Loss: ${loss} | KL: 0.0034`);
    }

    // Stage 6
    setCurrentStage(6);
    addLog(`\n[6/6] Calibrating Threshold on Validation & Scoring Test Windows...`);
    await new Promise(r => setTimeout(r, 800));
    addLog(`      Calibrated Operational Threshold (FPR <= 0.1%): 0.7800`);
    addLog(`      Scoring red-team test infiltration windows...`);
    addLog(`      [!] THREAT DETECTED in Window #12: Edge Surprise S_edge = 0.9412 >= 0.78`);
    addLog(`      Flagged Seed Entities: proc-nginx-1124, proc-sh-1125, file-vUgefal`);
    addLog(`      Triggering Automated Bounded Causal Tracing...`);
    addLog(`      Reconstructed Attack Subgraph: 8 Nodes, 7 Edges`);
    addLog(`      Matched MITRE ATT&CK TTPs: T1203, T1059.004, T1105, T1055, T1003.008, T1071.001`);
    addLog(`\n=================== EVALUATION DETECTION METRICS ===================`);
    addLog(`  Detection Precision            : 100.00%`);
    addLog(`  Detection Recall               : 100.00%`);
    addLog(`  Operational False Positive Rate: 0.08% (Target <= 0.10%)`);
    addLog(`  Inference Latency              : 2.8 ms / window`);
    addLog(`====================================================================`);
    addLog(`[+] SUCCESS: Complete DARPA TC Attack Campaign Detected, Traced, and Reconstructed!`);

    setCurrentStage(7);
    setIsRunning(false);
    if (onPipelineCompleted) onPipelineCompleted();
  };

  const resetPipeline = () => {
    setCurrentStage(0);
    setIsRunning(false);
    setLogs([]);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100 font-mono">
              Turnkey End-to-End Pipeline Execution Runner
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulates the full Python PyTorch execution pipeline: Ingestion &rarr; Compression &rarr; Window Slicing &rarr; GAT-GRU-VGAE Training &rarr; Zero-Shot Detection &rarr; Causal Reconstruction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runFullPipeline}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-slate-950 font-bold font-mono text-xs transition shadow-lg shadow-cyan-500/20"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Execute Complete Pipeline</span>
              </>
            )}
          </button>

          <button
            onClick={resetPipeline}
            disabled={isRunning}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 6 Stages Visual Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2.5">
        {stages.map((st) => {
          const isDone = currentStage > st.num || currentStage === 7;
          const isActive = currentStage === st.num;

          return (
            <div
              key={st.num}
              className={`rounded-xl p-3 border transition-all ${
                isDone 
                  ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300' 
                  : isActive
                    ? 'bg-cyan-950/50 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                <span className="font-bold">Phase {st.num}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                ) : (
                  <span className="text-slate-600 text-[10px]">Pending</span>
                )}
              </div>
              <div className="text-xs font-semibold text-slate-200 mb-1 leading-tight">
                {st.name}
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Terminal Console Stream Output */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Operational Console Execution Stream (run_pipeline.py)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
        </div>

        <div 
          ref={terminalRef}
          className="p-4 font-mono text-xs text-slate-300 h-80 overflow-y-auto space-y-1 bg-black/90 selection:bg-cyan-600 selection:text-white"
        >
          {logs.length === 0 ? (
            <div className="text-slate-600 italic py-10 text-center">
              Ready to execute. Click &quot;Execute Complete Pipeline&quot; above to launch the GAT-GRU-VGAE detection pipeline.
            </div>
          ) : (
            logs.map((log, i) => (
              <div 
                key={i} 
                className={`${
                  log.includes('[!] THREAT') ? 'text-rose-400 font-bold bg-rose-950/40 p-1 rounded' :
                  log.includes('[+] SUCCESS') ? 'text-emerald-400 font-bold bg-emerald-950/40 p-1 rounded' :
                  log.includes('==') ? 'text-cyan-400 font-bold' :
                  'text-slate-300'
                }`}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
