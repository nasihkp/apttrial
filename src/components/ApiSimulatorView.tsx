import React, { useState } from 'react';
import { Server, Send, CheckCircle2, AlertTriangle, Code, RefreshCw } from 'lucide-react';
import { ThreatAlert } from '../types';

interface ApiSimulatorViewProps {
  alerts: ThreatAlert[];
  onNewAlertCreated?: (alert: ThreatAlert) => void;
}

export const ApiSimulatorView: React.FC<ApiSimulatorViewProps> = ({ alerts, onNewAlertCreated }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'health' | 'score' | 'alerts'>('score');
  const [windowId, setWindowId] = useState('WIN-10492');
  const [nodesCount, setNodesCount] = useState(14);
  const [edgesCount, setEdgesCount] = useState(18);
  const [edgeSurpriseScore, setEdgeSurpriseScore] = useState(0.92);
  const [responseJson, setResponseJson] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const executeRequest = async () => {
    setIsLoading(true);
    const start = performance.now();

    await new Promise(r => setTimeout(r, 120));

    if (selectedEndpoint === 'health') {
      setStatusCode(200);
      setResponseJson({
        status: "healthy",
        engine: "AEGIS-PROV-GAT-GRU-VGAE",
        version: "1.0.0",
        dataset: "DARPA_TC_E3_CADETS",
        operational_fpr: 0.0008,
        uptime_seconds: 48920
      });
    } else if (selectedEndpoint === 'alerts') {
      setStatusCode(200);
      setResponseJson({
        total_alerts: alerts.length,
        alerts: alerts
      });
    } else if (selectedEndpoint === 'score') {
      const threshold = 0.78;
      const isAnomaly = edgeSurpriseScore >= threshold;
      const alertId = `ALT-${alerts.length + 1001}`;
      
      const result = {
        alert_id: alertId,
        status: isAnomaly ? "CRITICAL" : "BENIGN",
        threat_score: edgeSurpriseScore,
        threshold: threshold,
        is_anomaly: isAnomaly,
        recommended_action: isAnomaly ? "ISOLATE_AND_TRACE" : "LOG_TELEMETRY",
        window_metadata: {
          window_id: windowId,
          timestamp: Date.now() / 1000,
          nodes_count: nodesCount,
          edges_count: edgesCount
        }
      };

      setStatusCode(200);
      setResponseJson(result);

      if (isAnomaly && onNewAlertCreated) {
        onNewAlertCreated({
          alert_id: alertId,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          host: 'simulated-soc-endpoint',
          risk_score: edgeSurpriseScore,
          threshold: threshold,
          initial_ingress: 'Simulated Infiltration Burst',
          kill_chain_stage: 'Execution -> Dropper',
          status: 'CRITICAL',
          recommended_action: 'ISOLATE_AND_TRACE',
          flagged_nodes: [0, 1],
          flagged_edges: ['sim-edge-1'],
          ttps: [
            { id: 'T1059.004', name: 'Unix Shell Execution', stage: 'Execution', src: 'nginx', dst: '/bin/sh', weight: 1.5 }
          ],
          subgraphSize: { nodes: 4, edges: 3 }
        });
      }
    }

    setLatency(Math.round(performance.now() - start));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-100 font-mono">
              FastAPI Production Microservice Serving Studio (src/api/main.py)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactive REST endpoint invocation for real-time window scoring, health probing, and SOC alert delivery.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Endpoint Base:</span>
          <span className="px-2.5 py-1 rounded bg-slate-950 text-cyan-400 border border-slate-800">
            http://localhost:8000
          </span>
        </div>
      </div>

      {/* Interactive API Tester Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Request Builder */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono text-slate-200">
              HTTP REQUEST BUILDER
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedEndpoint('score')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                  selectedEndpoint === 'score'
                    ? 'bg-cyan-600 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/80'
                }`}
              >
                POST /score-window
              </button>
              <button
                onClick={() => setSelectedEndpoint('health')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                  selectedEndpoint === 'health'
                    ? 'bg-cyan-600 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/80'
                }`}
              >
                GET /health
              </button>
              <button
                onClick={() => setSelectedEndpoint('alerts')}
                className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                  selectedEndpoint === 'alerts'
                    ? 'bg-cyan-600 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/80'
                }`}
              >
                GET /alerts
              </button>
            </div>
          </div>

          {/* Dynamic Payload Form */}
          {selectedEndpoint === 'score' ? (
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Window ID:</label>
                <input
                  type="text"
                  value={windowId}
                  onChange={(e) => setWindowId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Nodes Count:</label>
                  <input
                    type="number"
                    value={nodesCount}
                    onChange={(e) => setNodesCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Edges Count:</label>
                  <input
                    type="number"
                    value={edgesCount}
                    onChange={(e) => setEdgesCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-slate-400">Edge Surprise Score (S_edge):</label>
                  <span className={`font-bold ${edgeSurpriseScore >= 0.78 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {edgeSurpriseScore.toFixed(2)} {edgeSurpriseScore >= 0.78 ? '(ANOMALY)' : '(BENIGN)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.50"
                  step="0.01"
                  value={edgeSurpriseScore}
                  onChange={(e) => setEdgeSurpriseScore(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.05 (Benign syslog)</span>
                  <span className="text-amber-400">&tau; = 0.78 (Threshold)</span>
                  <span>1.50 (APT Infiltration)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-xs font-mono py-8 text-center bg-slate-950/60 rounded-lg">
              Endpoint does not require a request body. Click &quot;Send Request&quot; below.
            </div>
          )}

          <button
            onClick={executeRequest}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold font-mono text-xs transition shadow-md"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Send Request</span>
          </button>
        </div>

        {/* Right: Response Inspector */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold font-mono text-slate-200">
                HTTP RESPONSE
              </span>
              {statusCode !== null && (
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-400 font-bold">HTTP {statusCode} OK</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-amber-300">{latency} ms</span>
                </div>
              )}
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto h-64">
              {responseJson ? (
                <pre>{JSON.stringify(responseJson, null, 2)}</pre>
              ) : (
                <div className="text-slate-600 italic py-16 text-center">
                  Response will be displayed here once sent.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>FastAPI OpenAPI Schema: <span className="text-cyan-400">/docs</span></span>
            <span>Uvicorn 0.30+ ASGI Core</span>
          </div>
        </div>
      </div>
    </div>
  );
};
