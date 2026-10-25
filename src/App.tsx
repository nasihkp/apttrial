import React, { useState, useMemo, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { MetricCards } from './components/MetricCards';
import { AttackGraphCanvas } from './components/AttackGraphCanvas';
import { NodeDetailModal } from './components/NodeDetailModal';
import { AlertsTable } from './components/AlertsTable';
import { CausalInvestigationView } from './components/CausalInvestigationView';
import { PipelineRunnerView } from './components/PipelineRunnerView';
import { NeuralArchitectureLab } from './components/NeuralArchitectureLab';
import { ApiSimulatorView } from './components/ApiSimulatorView';
import { ResearchLibraryView } from './components/ResearchLibraryView';

import { 
  CADETS_DATASET, 
  THEIA_DATASET, 
  TRACE_DATASET, 
  DatasetBundle 
} from './data/mockDatasets';
import { AegisProvenanceEngine } from './lib/aegisEngine';
import { GraphNode, ThreatAlert, MitreTTP } from './types';
import { ShieldAlert, Network, Layers, Play } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [activeDatasetId, setActiveDatasetId] = useState<string>('cadets_e3');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  
  // Available benchmark datasets
  const datasets = useMemo(() => [
    CADETS_DATASET,
    THEIA_DATASET,
    TRACE_DATASET
  ], []);

  const activeDataset: DatasetBundle = useMemo(() => {
    return datasets.find(d => d.id === activeDatasetId) || CADETS_DATASET;
  }, [datasets, activeDatasetId]);

  // Initial provenance engine instantiated with current dataset
  const engine = useMemo(() => {
    const eng = new AegisProvenanceEngine();
    eng.loadBundle(
      activeDataset.subjects,
      activeDataset.files,
      activeDataset.netflows,
      activeDataset.events
    );
    return eng;
  }, [activeDataset]);

  // Graph elements
  const graphData = useMemo(() => {
    return engine.getFullGraph();
  }, [engine]);

  // Alert management state
  const [alerts, setAlerts] = useState<ThreatAlert[]>(activeDataset.alerts);
  const [selectedAlertForInvestigation, setSelectedAlertForInvestigation] = useState<ThreatAlert | null>(
    activeDataset.alerts[0] || null
  );

  // When dataset changes, reset alerts and selection
  useEffect(() => {
    setAlerts(activeDataset.alerts);
    setSelectedAlertForInvestigation(activeDataset.alerts[0] || null);
  }, [activeDataset]);

  // Causal trace calculation state
  const [causalResults, setCausalResults] = useState<{
    nodes: GraphNode[];
    edges: any[];
    matchedTTPs: MitreTTP[];
    threatScore: number;
    blastRadiusCount: number;
  } | undefined>(undefined);

  const handleRunCausalTrace = (seedId: number, depth: number) => {
    const res = engine.traceCausalAttackSubgraph([seedId], depth);
    setCausalResults(res);
  };

  const handleInvestigateAlert = (alert: ThreatAlert) => {
    setSelectedAlertForInvestigation(alert);
    const seedIds = alert.flagged_nodes.slice(0, 2);
    const res = engine.traceCausalAttackSubgraph(seedIds, 3);
    setCausalResults(res);
    setActiveTab('investigation');
  };

  const handleUpdateAlertStatus = (alertId: string, status: ThreatAlert['status']) => {
    setAlerts(prev => prev.map(a => a.alert_id === alertId ? { ...a, status } : a));
  };

  const handleNewAlertCreated = (newAlert: ThreatAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeDatasetId={activeDatasetId}
        setActiveDatasetId={setActiveDatasetId}
        datasets={datasets.map(d => ({ id: d.id, name: d.name, os: d.os }))}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Metric Cards (always accessible or on SOC Dashboard) */}
        <MetricCards
          totalAlerts={alerts.filter(a => a.status === 'CRITICAL' || a.status === 'HIGH').length}
          totalEntities={graphData.nodes.length}
        />

        {/* Tab 1: SOC Dashboard (Faithful Streamlit Re-implementation & Elevation) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Live Detected APT Scenarios Table */}
            <AlertsTable
              alerts={alerts}
              onInvestigateAlert={handleInvestigateAlert}
              onUpdateAlertStatus={handleUpdateAlertStatus}
            />

            {/* Reconstructed Attack Graph Canvas */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm font-mono flex items-center gap-2">
                    <Network className="w-4 h-4 text-cyan-400" />
                    Reconstructed {activeDataset.name} Attack Provenance Graph
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interactive multi-hop provenance topology. Red nodes and borders indicate flagged APT kill-chain components.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('investigation')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-xs font-mono transition"
                  >
                    <span>Launch Blast Radius Tracer</span>
                  </button>
                </div>
              </div>

              <AttackGraphCanvas
                nodes={graphData.nodes}
                edges={graphData.edges}
                onSelectNode={(node) => setSelectedNode(node)}
                selectedNodeId={selectedNode?.id}
                highlightedNodeIds={selectedAlertForInvestigation?.flagged_nodes}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Causal Tracer & MITRE ATT&CK */}
        {activeTab === 'investigation' && (
          <CausalInvestigationView
            alert={selectedAlertForInvestigation}
            nodes={graphData.nodes}
            edges={graphData.edges}
            onSelectNode={(node) => setSelectedNode(node)}
            onRunCausalTrace={handleRunCausalTrace}
            causalResults={causalResults}
          />
        )}

        {/* Tab 3: Turnkey Pipeline Runner (run_pipeline.py) */}
        {activeTab === 'pipeline' && (
          <PipelineRunnerView
            dataset={activeDataset}
            engine={engine}
            onPipelineCompleted={() => {
              if (activeDataset.alerts.length > 0) {
                setSelectedAlertForInvestigation(activeDataset.alerts[0]);
              }
            }}
          />
        )}

        {/* Tab 4: Neural Architecture & Ablation Benchmarks */}
        {activeTab === 'architecture' && (
          <NeuralArchitectureLab />
        )}

        {/* Tab 5: REST API Studio (FastAPI) */}
        {activeTab === 'api' && (
          <ApiSimulatorView
            alerts={alerts}
            onNewAlertCreated={handleNewAlertCreated}
          />
        )}

        {/* Tab 6: Research Papers & Knowledge Base */}
        {activeTab === 'research' && (
          <ResearchLibraryView />
        )}
      </main>

      {/* Node Detail Inspector Modal */}
      {selectedNode && (
        <NodeDetailModal
          node={selectedNode}
          edges={graphData.edges}
          onClose={() => setSelectedNode(null)}
          onTraceSeed={(nodeId) => {
            handleRunCausalTrace(nodeId, 3);
            setActiveTab('investigation');
          }}
        />
      )}

      {/* Enterprise Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500 font-mono">
        AEGIS-PROV &bull; Graph Attention Network + Gated Recurrent Unit + Variational Graph Auto-Encoder &bull; DARPA Transparent Computing E3
      </footer>
    </div>
  );
};
