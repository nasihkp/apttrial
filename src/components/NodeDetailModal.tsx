import React from 'react';
import { GraphNode, GraphEdge } from '../types';
import { 
  X, 
  Terminal, 
  FileText, 
  Globe, 
  User, 
  Hash, 
  ArrowRightLeft, 
  AlertOctagon,
  Copy,
  Check
} from 'lucide-react';

interface NodeDetailModalProps {
  node: GraphNode | null;
  edges: GraphEdge[];
  onClose: () => void;
  onTraceSeed: (nodeId: number) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  edges,
  onClose,
  onTraceSeed
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!node) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const ingressEdges = edges.filter(e => e.dst === node.id);
  const egressEdges = edges.filter(e => e.src === node.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl shadow-cyan-950/20">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              node.type === 'socket' ? 'bg-rose-950/80 border border-rose-800 text-rose-400' :
              node.type === 'process' ? 'bg-cyan-950/80 border border-cyan-800 text-cyan-400' :
              node.type === 'file' ? 'bg-amber-950/80 border border-amber-800 text-amber-400' :
              'bg-purple-950/80 border border-purple-800 text-purple-400'
            }`}>
              {node.type === 'process' && <Terminal className="w-5 h-5" />}
              {node.type === 'file' && <FileText className="w-5 h-5" />}
              {node.type === 'socket' && <Globe className="w-5 h-5" />}
              {node.type === 'principal' && <User className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-slate-100">{node.label}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {node.type}
                </span>
                {node.isSeed && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                    APT SEED
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5 truncate max-w-sm">
                UUID: {node.uuid}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Key Attributes */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2 text-xs font-mono">
            <div className="text-slate-400 font-semibold mb-2 flex items-center justify-between">
              <span>CDM RECORD ATTRIBUTES</span>
              <button
                onClick={() => handleCopy(JSON.stringify(node, null, 2))}
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            {node.cid !== undefined && (
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-500">Process ID (CID/PID):</span>
                <span className="text-cyan-300">{node.cid}</span>
              </div>
            )}

            {node.cmdline && (
              <div className="py-1 border-b border-slate-900">
                <span className="text-slate-500 block mb-1">Command Line Execution:</span>
                <span className="text-slate-200 bg-slate-900 px-2 py-1 rounded block overflow-x-auto text-[11px]">
                  {node.cmdline}
                </span>
              </div>
            )}

            {node.path && (
              <div className="py-1 border-b border-slate-900">
                <span className="text-slate-500 block mb-1">Canonical File Path:</span>
                <span className="text-amber-300 bg-slate-900 px-2 py-1 rounded block overflow-x-auto text-[11px]">
                  {node.path}
                </span>
              </div>
            )}

            {node.remote_ip && (
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-500">Remote Socket Endpoint:</span>
                <span className="text-rose-400 font-bold">{node.remote_ip}:{node.remote_port}</span>
              </div>
            )}
          </div>

          {/* Causal Provenance Neighborhood */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Ingress (Predecessors) */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
              <span className="text-slate-400 font-medium block mb-2 font-mono flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
                Ingress Edges ({ingressEdges.length})
              </span>
              {ingressEdges.length === 0 ? (
                <span className="text-slate-600 font-mono text-[11px]">Root Source (No parent events)</span>
              ) : (
                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  {ingressEdges.map((e) => (
                    <div key={e.id} className="text-[11px] font-mono bg-slate-900/90 p-1.5 rounded flex items-center justify-between">
                      <span className="text-slate-300">{e.relation.toUpperCase()}</span>
                      <span className="text-slate-500 text-[10px]">count: {e.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Egress (Successors) */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
              <span className="text-slate-400 font-medium block mb-2 font-mono flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                Egress Edges ({egressEdges.length})
              </span>
              {egressEdges.length === 0 ? (
                <span className="text-slate-600 font-mono text-[11px]">Leaf Entity (No children)</span>
              ) : (
                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  {egressEdges.map((e) => (
                    <div key={e.id} className="text-[11px] font-mono bg-slate-900/90 p-1.5 rounded flex items-center justify-between">
                      <span className="text-slate-300">{e.relation.toUpperCase()}</span>
                      <span className="text-slate-500 text-[10px]">count: {e.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Node ID: #{node.id}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onTraceSeed(node.id);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs transition shadow-sm font-mono"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Trace Causal Blast Radius</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
