export type NodeType = 'process' | 'file' | 'socket' | 'principal';

export type RelationType = 
  | 'fork' 
  | 'execve' 
  | 'read' 
  | 'write' 
  | 'connect' 
  | 'recv' 
  | 'send' 
  | 'unlink';

export interface CDMSubject {
  uuid: string;
  cid: number; // PID
  parent?: string; // PPID UUID
  cmdline: string;
  type: 'process';
  startTimestampNanos?: number;
}

export interface CDMFile {
  uuid: string;
  path: string;
  type: 'file';
  size?: number;
  permissions?: string;
}

export interface CDMNetFlow {
  uuid: string;
  local_ip?: string;
  local_port?: number;
  remote_ip: string;
  remote_port: number;
  type: 'socket';
  ipProtocol?: number; // 6 = TCP, 17 = UDP
}

export interface CDMPrincipal {
  uuid: string;
  userId: number;
  username: string;
  type: 'principal';
}

export interface CDMEvent {
  uuid: string;
  event_type: string;
  relation: RelationType;
  src_uuid: string;
  dst_uuid: string;
  timestamp: number;
  path?: string;
  count?: number;
}

export interface GraphNode {
  id: number;
  uuid: string;
  type: NodeType;
  label: string;
  subLabel?: string;
  cmdline?: string;
  path?: string;
  remote_ip?: string;
  remote_port?: number;
  cid?: number;
  userId?: number;
  username?: string;
  isAnomalous?: boolean;
  isSeed?: boolean;
  isInBlastRadius?: boolean;
  tactic?: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  src: number;
  dst: number;
  relation: RelationType;
  timestamp: number;
  first_timestamp?: number;
  last_timestamp?: number;
  count: number;
  path?: string;
  surpriseScore?: number;
  isAnomalous?: boolean;
  matchedTTP?: string;
}

export interface MitreTTP {
  id: string;
  name: string;
  stage: string;
  src: string;
  dst: string;
  details?: string;
  weight: number;
}

export interface ThreatAlert {
  alert_id: string;
  timestamp: string;
  host: string;
  risk_score: number;
  threshold: number;
  initial_ingress: string;
  kill_chain_stage: string;
  status: 'CRITICAL' | 'HIGH' | 'INVESTIGATING' | 'RESOLVED' | 'BENIGN';
  recommended_action: string;
  flagged_nodes: number[];
  flagged_edges: string[];
  ttps: MitreTTP[];
  subgraphSize: { nodes: number; edges: number };
}

export interface TemporalSnapshot {
  windowId: number;
  timestamp: number;
  deltaT: number;
  numNodes: number;
  numEdges: number;
  edges: GraphEdge[];
  surpriseScore: number;
  isAnomaly: boolean;
}

export interface AblationBenchmark {
  id: string;
  name: string;
  spatialEncoder: string;
  temporalMemory: string;
  generativeDecoder: string;
  detectionSignal: string;
  precision: number;
  recall: number;
  fpr: number;
  f1: number;
  latencyMs: number;
  highlight?: boolean;
  description: string;
}

export interface PipelineStageState {
  stage: number;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  details: string;
  logs: string[];
}
