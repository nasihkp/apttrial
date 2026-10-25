import React, { useState } from 'react';
import { ThreatAlert } from '../types';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Download, 
  ExternalLink,
  ChevronRight,
  ShieldBan,
  CheckCircle,
  FileCode
} from 'lucide-react';

interface AlertsTableProps {
  alerts: ThreatAlert[];
  onInvestigateAlert: (alert: ThreatAlert) => void;
  onUpdateAlertStatus: (alertId: string, status: ThreatAlert['status']) => void;
}

export const AlertsTable: React.FC<AlertsTableProps> = ({
  alerts,
  onInvestigateAlert,
  onUpdateAlertStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<ThreatAlert | null>(null);

  const filtered = alerts.filter(a => 
    a.alert_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.initial_ingress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.kill_chain_stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: ThreatAlert['status']) => {
    switch (status) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">HIGH</span>;
      case 'INVESTIGATING':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800">INVESTIGATING</span>;
      case 'RESOLVED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">RESOLVED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-300">BENIGN</span>;
    }
  };

  const exportAlertJSON = (alert: ThreatAlert) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(alert, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${alert.alert_id}_investigation.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h3 className="font-semibold text-slate-100 text-sm">
            Live Detected APT Kill-Chain Scenarios
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            {alerts.length} Incidents
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by host, ingress, tactic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 font-mono border-b border-slate-800 uppercase text-[11px]">
            <tr>
              <th className="py-2.5 px-4">Alert ID</th>
              <th className="py-2.5 px-4">Timestamp</th>
              <th className="py-2.5 px-4">Host Target</th>
              <th className="py-2.5 px-4">Threat Score</th>
              <th className="py-2.5 px-4">Initial Ingress Vector</th>
              <th className="py-2.5 px-4">Kill-Chain Stage Progression</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4 text-right">SOC Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filtered.map((alert) => (
              <tr 
                key={alert.alert_id} 
                className="hover:bg-slate-800/40 transition cursor-pointer"
                onClick={() => onInvestigateAlert(alert)}
              >
                <td className="py-3 px-4 font-bold text-cyan-400 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  {alert.alert_id}
                </td>
                <td className="py-3 px-4 text-slate-400">{alert.timestamp}</td>
                <td className="py-3 px-4 text-slate-200">{alert.host}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-400">{alert.risk_score.toFixed(2)}</span>
                    <span className="text-slate-500 text-[10px]">(&tau; &ge; {alert.threshold})</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-300 max-w-xs truncate" title={alert.initial_ingress}>
                  {alert.initial_ingress}
                </td>
                <td className="py-3 px-4 text-slate-400 max-w-xs truncate" title={alert.kill_chain_stage}>
                  {alert.kill_chain_stage}
                </td>
                <td className="py-3 px-4">
                  {getStatusBadge(alert.status)}
                </td>
                <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onInvestigateAlert(alert)}
                      className="p-1 rounded hover:bg-slate-800 text-cyan-400 hover:text-cyan-300"
                      title="Investigate Subgraph"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => exportAlertJSON(alert)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                      title="Export Alert JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    {alert.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => onUpdateAlertStatus(alert.alert_id, 'RESOLVED')}
                        className="p-1 rounded hover:bg-slate-800 text-emerald-400 hover:text-emerald-300"
                        title="Mark Resolved"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onUpdateAlertStatus(alert.alert_id, 'CRITICAL')}
                        className="p-1 rounded hover:bg-slate-800 text-rose-400 hover:text-rose-300"
                        title="Reopen Threat"
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 font-mono">
                  No alerts match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
