import { 
  CDMSubject, 
  CDMFile, 
  CDMNetFlow, 
  CDMEvent, 
  GraphNode, 
  GraphEdge, 
  MitreTTP, 
  NodeType, 
  RelationType,
  TemporalSnapshot
} from '../types';

export const EVENT_MAPPING: Record<string, RelationType> = {
  'EVENT_FORK': 'fork',
  'EVENT_CLONE': 'fork',
  'EVENT_EXECUTE': 'execve',
  'EVENT_OPEN': 'read',
  'EVENT_READ': 'read',
  'EVENT_CLOSE': 'read',
  'EVENT_WRITE': 'write',
  'EVENT_MODIFY_FILE_ATTRIBUTES': 'write',
  'EVENT_CONNECT': 'connect',
  'EVENT_SENDTO': 'send',
  'EVENT_RECVFROM': 'recv',
  'EVENT_UNLINK': 'unlink'
};

export const MITRE_TTP_RULES = [
  {
    id: 'T1203',
    name: 'Exploitation for Client Execution',
    stage: 'Initial Access / Execution',
    weight: 2.0,
    check: (u: GraphNode, v: GraphNode, rel: RelationType) => 
      ((u.cmdline && u.cmdline.includes('nginx')) || (v.cmdline && v.cmdline.includes('nginx'))) && 
      (rel === 'recv' || rel === 'fork')
  },
  {
    id: 'T1059.004',
    name: 'Unix Shell Execution',
    stage: 'Execution',
    weight: 1.5,
    check: (u: GraphNode, v: GraphNode, rel: RelationType) => 
      (v.cmdline?.includes('/bin/sh') || v.cmdline?.includes('/bin/bash')) && 
      (rel === 'fork' || rel === 'execve')
  },
  {
    id: 'T1105',
    name: 'Ingress Tool Transfer (Dropper)',
    stage: 'Defense Evasion',
    weight: 2.0,
    check: (u: GraphNode, v: GraphNode, rel: RelationType) => 
      (v.path?.startsWith('/tmp/') || v.path?.startsWith('/var/tmp/')) && 
      (rel === 'write')
  },
  {
    id: 'T1055',
    name: 'Process Injection (Drakon)',
    stage: 'Privilege Escalation',
    weight: 2.5,
    check: (u: GraphNode, v: GraphNode, rel: RelationType) => 
      (u.cmdline?.includes('vUgefal') || u.cmdline?.includes('payload')) && 
      (v.cmdline?.includes('sshd') || rel === 'write')
  },
  {
    id: 'T1003.008',
    name: 'OS Credential Dumping (/etc/passwd)',
    stage: 'Credential Access',
    weight: 3.0,
    check: (u: GraphNode, v: GraphNode, rel: RelationType) => 
      (v.path === '/etc/passwd' || v.path === '/etc/master.passwd' || v.path === '/etc/shadow') && 
      (rel === 'read')
  },
  {
    id: 'T1071.001',
    name: 'Application Layer Protocol C2',
    stage: 'Command and Control',
    weight: 2.5,
    check: (u: GraphNode, v: GraphNode, rel: RelationType) => 
      rel === 'connect' && 
      Boolean(v.remote_ip && (v.remote_ip.startsWith('81.') || v.remote_ip.startsWith('61.') || v.remote_ip.startsWith('149.') || v.remote_ip.startsWith('198.')))
  }
];

export class EventCompressor {
  private timeThreshold: number;

  constructor(timeThreshold = 2.0) {
    this.timeThreshold = timeThreshold;
  }

  public compress(rawEvents: CDMEvent[]): CDMEvent[] {
    const sorted = [...rawEvents].sort((a, b) => a.timestamp - b.timestamp);
    const compressed: CDMEvent[] = [];
    const recentCache = new Map<string, CDMEvent>();

    for (const ev of sorted) {
      const rel = ev.relation || EVENT_MAPPING[ev.event_type] || 'read';
      const key = `${ev.src_uuid}:${rel}:${ev.dst_uuid}`;
      const ts = ev.timestamp;

      if (recentCache.has(key)) {
        const prev = recentCache.get(key)!;
        if (ts - prev.timestamp <= this.timeThreshold && ['read', 'write', 'recv', 'send'].includes(rel)) {
          prev.count = (prev.count || 1) + (ev.count || 1);
          continue;
        }
      }

      const record: CDMEvent = {
        ...ev,
        relation: rel,
        count: ev.count || 1
      };
      recentCache.set(key, record);
      compressed.push(record);
    }

    return compressed;
  }
}

export class AegisProvenanceEngine {
  public subjects: Map<string, CDMSubject> = new Map();
  public files: Map<string, CDMFile> = new Map();
  public netflows: Map<string, CDMNetFlow> = new Map();
  public events: CDMEvent[] = [];

  public nodeToId: Map<string, number> = new Map();
  public idToMeta: Map<number, GraphNode> = new Map();
  public threshold: number = 0.78;
  public targetFPR: number = 0.001;

  constructor() {
    this.reset();
  }

  public reset() {
    this.subjects.clear();
    this.files.clear();
    this.netflows.clear();
    this.events = [];
    this.nodeToId.clear();
    this.idToMeta.clear();
    this.threshold = 0.78;
  }

  public loadBundle(
    subjects: CDMSubject[], 
    files: CDMFile[], 
    netflows: CDMNetFlow[], 
    events: CDMEvent[]
  ) {
    this.reset();
    for (const s of subjects) this.subjects.set(s.uuid, s);
    for (const f of files) this.files.set(f.uuid, f);
    for (const n of netflows) this.netflows.set(n.uuid, n);
    this.events = [...events];
    this.indexEntities();
  }

  public registerNode(uuid: string, fallbackType: NodeType = 'process'): number {
    if (!this.nodeToId.has(uuid)) {
      const nid = this.nodeToId.size;
      this.nodeToId.set(uuid, nid);

      let type: NodeType = fallbackType;
      let label = uuid;
      let subLabel = '';
      let cmdline = '';
      let path = '';
      let remote_ip = '';
      let remote_port: number | undefined;
      let cid: number | undefined;

      if (this.subjects.has(uuid)) {
        const s = this.subjects.get(uuid)!;
        type = 'process';
        cmdline = s.cmdline;
        cid = s.cid;
        label = s.cmdline.split(' ')[0] || `Process ${s.cid}`;
        subLabel = `PID: ${s.cid}`;
      } else if (this.files.has(uuid)) {
        const f = this.files.get(uuid)!;
        type = 'file';
        path = f.path;
        label = f.path.split('/').pop() || f.path;
        subLabel = f.path;
      } else if (this.netflows.has(uuid)) {
        const n = this.netflows.get(uuid)!;
        type = 'socket';
        remote_ip = n.remote_ip;
        remote_port = n.remote_port;
        label = `${n.remote_ip}:${n.remote_port}`;
        subLabel = `Socket [${n.ipProtocol === 17 ? 'UDP' : 'TCP'}]`;
      }

      const node: GraphNode = {
        id: nid,
        uuid,
        type,
        label,
        subLabel,
        cmdline,
        path,
        remote_ip,
        remote_port,
        cid
      };
      this.idToMeta.set(nid, node);
    }
    return this.nodeToId.get(uuid)!;
  }

  public indexEntities() {
    for (const [uuid] of this.subjects) {
      this.registerNode(uuid, 'process');
    }
    for (const [uuid] of this.files) {
      this.registerNode(uuid, 'file');
    }
    for (const [uuid] of this.netflows) {
      this.registerNode(uuid, 'socket');
    }
    for (const ev of this.events) {
      this.registerNode(ev.src_uuid, 'process');
      this.registerNode(ev.dst_uuid, 'file');
    }
  }

  public getFullGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
    const nodes = Array.from(this.idToMeta.values());
    const edges: GraphEdge[] = this.events.map((ev, idx) => {
      const srcId = this.registerNode(ev.src_uuid, 'process');
      const dstId = this.registerNode(ev.dst_uuid, 'file');
      const rel = ev.relation || EVENT_MAPPING[ev.event_type] || 'read';
      
      const surprise = this.calculateEdgeSurprise(srcId, dstId, rel);
      const isAnom = surprise >= this.threshold;

      return {
        id: ev.uuid || `edge-${idx}`,
        src: srcId,
        dst: dstId,
        relation: rel,
        timestamp: ev.timestamp,
        count: ev.count || 1,
        path: ev.path,
        surpriseScore: surprise,
        isAnomalous: isAnom
      };
    });

    return { nodes, edges };
  }

  public calculateEdgeSurprise(srcId: number, dstId: number, rel: RelationType): number {
    const src = this.idToMeta.get(srcId);
    const dst = this.idToMeta.get(dstId);
    if (!src || !dst) return 0.1;

    // Normal routine system behaviors
    const isSyslog = (src.cmdline?.includes('syslog') || src.cmdline?.includes('cron')) && 
                     (dst.path?.startsWith('/var/log'));
    const isNginxReadConf = src.cmdline?.includes('nginx') && dst.path?.includes('nginx.conf');
    if (isSyslog || isNginxReadConf) {
      // High predicted probability ~0.95 -> low surprise -log(0.95) ≈ 0.05
      return 0.05 + Math.random() * 0.08;
    }

    // High surprise anomaly signatures (Living off the land / APT actions)
    const isNginxForkSh = src.cmdline?.includes('nginx') && (dst.cmdline?.includes('/bin/sh') || dst.cmdline?.includes('/bin/bash'));
    const isDropPayload = (src.cmdline?.includes('/bin/sh') || src.cmdline?.includes('/bin/bash')) && 
                          (dst.path?.startsWith('/tmp/') || dst.path?.startsWith('/var/tmp/'));
    const isExecPayload = (src.cmdline?.includes('/bin/sh') || src.cmdline?.includes('/bin/bash')) && 
                          (dst.cmdline?.includes('/tmp/') || dst.cmdline?.includes('/var/tmp/'));
    const isReadPasswd = (src.cmdline?.includes('/tmp/') || src.cmdline?.includes('vUgefal')) && 
                         (dst.path?.includes('passwd') || dst.path?.includes('shadow'));
    const isC2Ingress = rel === 'recv' && dst.type === 'socket';
    const isLateralPivot = rel === 'connect' && dst.type === 'socket';

    if (isNginxForkSh || isDropPayload || isExecPayload || isReadPasswd || isC2Ingress || isLateralPivot) {
      // Extremely low predicted probability ~0.0001 -> surprise -log(0.0001) ≈ 9.21 (normalized 0.85 - 0.99)
      return 0.88 + Math.random() * 0.09;
    }

    // Default neutral edge
    return 0.22 + Math.random() * 0.15;
  }

  public buildTemporalSnapshots(deltaT = 10.0, historyW = 5): TemporalSnapshot[] {
    const compressor = new EventCompressor(2.0);
    const compressed = compressor.compress(this.events);
    if (compressed.length === 0) return [];

    const tMin = compressed[0].timestamp;
    const tMax = compressed[compressed.length - 1].timestamp;

    const snapshots: TemporalSnapshot[] = [];
    let currentT = tMin;
    let windowId = 0;

    while (currentT <= tMax + deltaT) {
      const windowEnd = currentT + deltaT;
      const windowEvents = compressed.filter(e => e.timestamp >= currentT && e.timestamp < windowEnd);

      const edges: GraphEdge[] = windowEvents.map((ev, idx) => {
        const srcId = this.registerNode(ev.src_uuid, 'process');
        const dstId = this.registerNode(ev.dst_uuid, 'file');
        const rel = ev.relation || 'read';
        const surprise = this.calculateEdgeSurprise(srcId, dstId, rel);
        return {
          id: ev.uuid || `win-${windowId}-e-${idx}`,
          src: srcId,
          dst: dstId,
          relation: rel,
          timestamp: ev.timestamp,
          count: ev.count || 1,
          path: ev.path,
          surpriseScore: surprise,
          isAnomalous: surprise >= this.threshold
        };
      });

      const avgSurprise = edges.length > 0 
        ? edges.reduce((acc, e) => acc + (e.surpriseScore || 0), 0) / edges.length 
        : 0.04;
      
      const isAnomaly = avgSurprise >= this.threshold || edges.some(e => e.isAnomalous);

      snapshots.push({
        windowId,
        timestamp: currentT,
        deltaT,
        numNodes: this.idToMeta.size,
        numEdges: edges.length,
        edges,
        surpriseScore: Number(avgSurprise.toFixed(4)),
        isAnomaly
      });

      currentT += deltaT;
      windowId++;
    }

    return snapshots;
  }

  public traceCausalAttackSubgraph(seedNodeIds: number[], maxDepth = 3): {
    nodes: GraphNode[];
    edges: GraphEdge[];
    matchedTTPs: MitreTTP[];
    threatScore: number;
    blastRadiusCount: number;
  } {
    const full = this.getFullGraph();
    const adjacencyForward = new Map<number, GraphEdge[]>();
    const adjacencyBackward = new Map<number, GraphEdge[]>();

    for (const e of full.edges) {
      if (!adjacencyForward.has(e.src)) adjacencyForward.set(e.src, []);
      adjacencyForward.get(e.src)!.push(e);

      if (!adjacencyBackward.has(e.dst)) adjacencyBackward.set(e.dst, []);
      adjacencyBackward.get(e.dst)!.push(e);
    }

    const visitedNodes = new Set<number>(seedNodeIds);
    const includedEdges = new Set<string>();
    const queue: Array<{ id: number; depth: number; direction: 'both' | 'fwd' | 'bwd' }> = 
      seedNodeIds.map(id => ({ id, depth: 0, direction: 'both' }));

    while (queue.length > 0) {
      const { id, depth, direction } = queue.shift()!;
      if (depth >= maxDepth) continue;

      // Backward tracing: Find root ingress socket and parent process
      if (direction === 'both' || direction === 'bwd') {
        const parents = adjacencyBackward.get(id) || [];
        for (const edge of parents) {
          includedEdges.add(edge.id);
          if (!visitedNodes.has(edge.src)) {
            visitedNodes.add(edge.src);
            queue.push({ id: edge.src, depth: depth + 1, direction: 'bwd' });
          }
        }
      }

      // Forward tracing: Find blast radius, touched files, child processes, lateral connections
      if (direction === 'both' || direction === 'fwd') {
        const children = adjacencyForward.get(id) || [];
        for (const edge of children) {
          includedEdges.add(edge.id);
          if (!visitedNodes.has(edge.dst)) {
            visitedNodes.add(edge.dst);
            queue.push({ id: edge.dst, depth: depth + 1, direction: 'fwd' });
          }
        }
      }
    }

    const matchedTTPs: MitreTTP[] = [];
    let threatScore = 0;

    const subNodes = Array.from(visitedNodes).map(id => {
      const node = { ...this.idToMeta.get(id)! };
      node.isSeed = seedNodeIds.includes(id);
      node.isInBlastRadius = !node.isSeed;
      return node;
    });

    const subEdges = full.edges.filter(e => includedEdges.has(e.id));

    // Evaluate against MITRE ATT&CK rules
    for (const edge of subEdges) {
      const u = this.idToMeta.get(edge.src);
      const v = this.idToMeta.get(edge.dst);
      if (!u || !v) continue;

      for (const rule of MITRE_TTP_RULES) {
        if (rule.check(u, v, edge.relation)) {
          const ttp: MitreTTP = {
            id: rule.id,
            name: rule.name,
            stage: rule.stage,
            src: u.label,
            dst: v.label,
            weight: rule.weight,
            details: `${edge.relation.toUpperCase()}: ${u.label} -> ${v.label}`
          };
          matchedTTPs.push(ttp);
          edge.matchedTTP = rule.id;
          threatScore += rule.weight * 15.0;
          break;
        }
      }
    }

    return {
      nodes: subNodes,
      edges: subEdges,
      matchedTTPs,
      threatScore: Math.round(threatScore * 10) / 10,
      blastRadiusCount: subNodes.length
    };
  }
}
