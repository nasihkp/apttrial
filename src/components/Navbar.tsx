import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  GitFork, 
  Cpu, 
  Terminal, 
  BookOpen, 
  Server,
  Database,
  Radio
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'investigation' | 'pipeline' | 'architecture' | 'api' | 'research';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeDatasetId: string;
  setActiveDatasetId: (id: string) => void;
  datasets: Array<{ id: string; name: string; os: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeDatasetId,
  setActiveDatasetId,
  datasets
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Mission Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10">
            <ShieldAlert className="w-6 h-6 animate-pulse text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider text-slate-100 font-mono">AEGIS-PROV</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                GAT-GRU-VGAE v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Enterprise APT Provenance Investigation & Threat Reconstruction System
            </p>
          </div>
        </div>

        {/* Dataset Selector & Live Stream Status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Telemetry:</span>
            <select
              value={activeDatasetId}
              onChange={(e) => setActiveDatasetId(e.target.value)}
              className="bg-transparent text-cyan-300 font-mono focus:outline-none cursor-pointer"
            >
              {datasets.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-900 text-slate-200">
                  {d.name} ({d.os.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/60 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-mono">
            <Radio className="w-3 h-3 animate-spin text-emerald-400" />
            <span>FPR: 0.08% (Frozen $\tau$)</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mt-3 flex items-center gap-1 overflow-x-auto pb-1 border-t border-slate-900/60 pt-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'dashboard'
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>SOC Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('investigation')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'investigation'
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <GitFork className="w-4 h-4" />
          <span>Causal Tracer & ATT&CK</span>
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'pipeline'
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Pipeline Runner</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'architecture'
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Neural Model & Ablation</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'api'
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>REST API Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('research')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'research'
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Research & Papers</span>
        </button>
      </div>
    </header>
  );
};
