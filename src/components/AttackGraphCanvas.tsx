import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  GraphNode, 
  GraphEdge, 
  NodeType, 
  RelationType 
} from '../types';
import { 
  Terminal, 
  FileText, 
  Globe, 
  User, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Play, 
  Pause,
  Filter,
  Layers
} from 'lucide-react';

interface AttackGraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode: (node: GraphNode) => void;
  selectedNodeId?: number;
  highlightedNodeIds?: number[];
  filterAttackOnly?: boolean;
}

export const AttackGraphCanvas: React.FC<AttackGraphCanvasProps> = ({
  nodes,
  edges,
  onSelectNode,
  selectedNodeId,
  highlightedNodeIds,
  filterAttackOnly = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 50, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [showAttackOnly, setShowAttackOnly] = useState(filterAttackOnly);

  // Compute node layout (clean layered layout for directed provenance flow)
  const nodePositions = useMemo(() => {
    const posMap = new Map<number, { x: number; y: number }>();

    // Detect if this is CADETS layout
    const isCadets = nodes.some(n => n.cmdline?.includes('nginx') || n.path?.includes('vUgefal'));
    
    if (isCadets) {
      // Clean orchestrated layout based on the attack kill-chain
      nodes.forEach((node) => {
        let x = 300;
        let y = 200;

        if (node.type === 'socket' && node.remote_ip?.startsWith('81.')) {
          // Attacker C2
          x = 60;
          y = 180;
        } else if (node.cmdline?.includes('nginx')) {
          x = 240;
          y = 180;
        } else if (node.cmdline?.includes('/bin/sh')) {
          x = 420;
          y = 180;
        } else if (node.path?.includes('vUgefal') && node.type === 'file') {
          x = 600;
          y = 100;
        } else if (node.cmdline?.includes('vUgefal') && node.type === 'process') {
          x = 600;
          y = 260;
        } else if (node.path?.includes('passwd')) {
          x = 800;
          y = 120;
        } else if (node.path?.includes('master.passwd')) {
          x = 800;
          y = 200;
        } else if (node.cmdline?.includes('sshd')) {
          x = 800;
          y = 280;
        } else if (node.type === 'socket' && node.remote_ip?.startsWith('61.')) {
          x = 800;
          y = 360;
        } else if (node.cmdline?.includes('syslog')) {
          x = 240;
          y = 380;
        } else if (node.path?.includes('messages')) {
          x = 420;
          y = 380;
        } else if (node.cmdline?.includes('cron')) {
          x = 240;
          y = 480;
        } else if (node.path?.includes('cron')) {
          x = 420;
          y = 480;
        } else {
          // generic fallback placement
          const idx = node.id;
          x = 150 + (idx % 4) * 180;
          y = 250 + Math.floor(idx / 4) * 90;
        }

        posMap.set(node.id, { x, y });
      });
    } else {
      // General dynamic horizontal dag layout
      const ranks = new Map<number, number>();
      nodes.forEach((n, i) => ranks.set(n.id, 0));

      // Calculate ranks from edges
      edges.forEach(e => {
        const cur = ranks.get(e.dst) || 0;
        const srcRank = ranks.get(e.src) || 0;
        if (cur <= srcRank) {
          ranks.set(e.dst, srcRank + 1);
        }
      });

      const rankCounts = new Map<number, number>();
      nodes.forEach((n) => {
        const r = ranks.get(n.id) || 0;
        const count = rankCounts.get(r) || 0;
        posMap.set(n.id, {
          x: 100 + r * 190,
          y: 90 + count * 110
        });
        rankCounts.set(r, count + 1);
      });
    }

    return posMap;
  }, [nodes, edges]);

  // Filter edges and nodes if showAttackOnly is active
  const filteredEdges = useMemo(() => {
    if (!showAttackOnly) return edges;
    return edges.filter(e => e.isAnomalous || e.matchedTTP);
  }, [edges, showAttackOnly]);

  const visibleNodeIds = useMemo(() => {
    if (!showAttackOnly) return new Set(nodes.map(n => n.id));
    const ids = new Set<number>();
    filteredEdges.forEach(e => {
      ids.add(e.src);
      ids.add(e.dst);
    });
    return ids;
  }, [nodes, filteredEdges, showAttackOnly]);

  const visibleNodes = useMemo(() => {
    return nodes.filter(n => visibleNodeIds.has(n.id));
  }, [nodes, visibleNodeIds]);

  // Kill-chain timeline animation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStepIndex(prev => {
          if (prev === null || prev >= filteredEdges.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, filteredEdges.length]);

  // Pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'process': return <Terminal className="w-3.5 h-3.5 text-cyan-400" />;
      case 'file': return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      case 'socket': return <Globe className="w-3.5 h-3.5 text-rose-400" />;
      case 'principal': return <User className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const getNodeBorder = (node: GraphNode, isSelected: boolean) => {
    if (isSelected) return 'stroke-cyan-400 stroke-[2.5px] fill-cyan-950/90 shadow-cyan-500/50';
    if (node.isSeed || (highlightedNodeIds && highlightedNodeIds.includes(node.id))) {
      return 'stroke-rose-500 stroke-[2px] fill-rose-950/70';
    }
    if (node.type === 'socket') return 'stroke-rose-600/80 stroke-[1.5px] fill-slate-900/90';
    if (node.type === 'file') return 'stroke-amber-600/80 stroke-[1.5px] fill-slate-900/90';
    if (node.type === 'process') return 'stroke-cyan-600/80 stroke-[1.5px] fill-slate-900/90';
    return 'stroke-purple-600/80 stroke-[1.5px] fill-slate-900/90';
  };

  return (
    <div className="relative w-full h-[540px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner flex flex-col">
      {/* Canvas Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 backdrop-blur rounded-lg p-1 pointer-events-auto shadow-md">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.15, 2.0))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.15, 0.5))}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setZoom(1); setPan({ x: 50, y: 40 }); }}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-slate-800 mx-0.5" />
          <button
            onClick={() => setShowAttackOnly(!showAttackOnly)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${
              showAttackOnly 
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80 font-mono' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Attack Path Only</span>
          </button>
        </div>

        {/* Attack Replay Player */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 backdrop-blur rounded-lg px-2.5 py-1 pointer-events-auto shadow-md text-xs">
          <span className="text-slate-400 font-mono">Kill-Chain Replay:</span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-mono transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          {activeStepIndex !== null && (
            <span className="text-cyan-400 font-mono text-[11px]">
              Step {activeStepIndex + 1}/{filteredEdges.length}
            </span>
          )}
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      >
        <svg className="w-full h-full">
          <defs>
            {/* Directed Edge Arrow Marker */}
            <marker
              id="arrow-normal"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
            </marker>
            <marker
              id="arrow-threat"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0.5 L 10 5 L 0 9.5 z" fill="#38bdf8" />
            </marker>
            
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.5" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Scaled & Translated Graph World */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Directed Edges */}
            {filteredEdges.map((edge, index) => {
              const srcPos = nodePositions.get(edge.src);
              const dstPos = nodePositions.get(edge.dst);
              if (!srcPos || !dstPos) return null;

              const isStepActive = activeStepIndex !== null && activeStepIndex === index;
              const isThreat = edge.isAnomalous || Boolean(edge.matchedTTP);

              // Curved bezier or line
              const dx = dstPos.x - srcPos.x;
              const dy = dstPos.y - srcPos.y;
              const cx = (srcPos.x + dstPos.x) / 2;
              const cy = (srcPos.y + dstPos.y) / 2 - (dx !== 0 ? Math.sin(index) * 20 : 0);

              const strokeColor = isStepActive 
                ? '#38bdf8' 
                : isThreat 
                  ? '#f43f5e' 
                  : '#475569';
              
              const markerId = isStepActive 
                ? 'url(#arrow-active)' 
                : isThreat 
                  ? 'url(#arrow-threat)' 
                  : 'url(#arrow-normal)';

              const strokeWidth = isStepActive ? 3 : isThreat ? 2 : 1.2;

              return (
                <g key={edge.id} className="transition-all">
                  <path
                    d={`M ${srcPos.x} ${srcPos.y} Q ${cx} ${cy} ${dstPos.x} ${dstPos.y}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isThreat ? undefined : '4 2'}
                    markerEnd={markerId}
                    className={isThreat ? 'animate-pulse' : ''}
                  />

                  {/* Relation label badge */}
                  <g transform={`translate(${cx}, ${cy})`}>
                    <rect
                      x="-42"
                      y="-9"
                      width="84"
                      height="18"
                      rx="4"
                      fill={isThreat ? '#4c0519' : '#0f172a'}
                      stroke={isThreat ? '#f43f5e' : '#334155'}
                      strokeWidth="1"
                      className="opacity-95"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={isThreat ? '#fda4af' : '#94a3b8'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      {edge.relation.toUpperCase()}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Nodes */}
            {visibleNodes.map((node) => {
              const pos = nodePositions.get(node.id);
              if (!pos) return null;

              const isSelected = selectedNodeId === node.id;
              const isSeed = node.isSeed || (highlightedNodeIds && highlightedNodeIds.includes(node.id));

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNode(node);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Glow for APT Seed / Anomalies */}
                  {isSeed && (
                    <circle
                      r="26"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      className="animate-ping opacity-60"
                    />
                  )}

                  {/* Node Capsule / Pill */}
                  <rect
                    x="-68"
                    y="-22"
                    width="136"
                    height="44"
                    rx="8"
                    className={`transition-all duration-200 ${getNodeBorder(node, isSelected)}`}
                  />

                  {/* Icon Badge */}
                  <g transform="translate(-54, -10)">
                    {getNodeIcon(node.type)}
                  </g>

                  {/* Node Title & Subtitle */}
                  <text
                    x="-32"
                    y="-4"
                    fill="#f8fafc"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {node.label.length > 13 ? node.label.slice(0, 12) + '…' : node.label}
                  </text>

                  <text
                    x="-32"
                    y="11"
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {node.subLabel && node.subLabel.length > 15
                      ? node.subLabel.slice(0, 14) + '…'
                      : node.subLabel || node.type.toUpperCase()}
                  </text>

                  {/* Type badge in corner */}
                  <circle
                    cx="56"
                    cy="-12"
                    r="4"
                    fill={
                      node.type === 'socket' ? '#f43f5e' :
                      node.type === 'process' ? '#38bdf8' :
                      node.type === 'file' ? '#f59e0b' : '#c084fc'
                    }
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend & Help Footer */}
      <div className="border-t border-slate-900 bg-slate-950/95 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-300">Entity Types:</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Process</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> File</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Socket (C2)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Principal</span>
        </div>
        <div className="text-slate-500 font-mono">
          Click any node to inspect CDM provenance record
        </div>
      </div>
    </div>
  );
};
