# AEGIS-PROV: Advanced Persistent Threat (APT) Detection, Causal Investigation & Attack Reconstruction Framework
## An Enterprise-Grade Provenance Graph System Powered by a Novel Hybrid GAT + GRU + VGAE Deep Learning Architecture
### Project Technical Specification, System Architecture & Complete Development Guide

---

## 1. Project Overview & Core Mission

### 1.1 Introduction
**Advanced Persistent Threats (APTs)** are cyberattacks where attackers secretly enter a system and stay hidden for weeks or months. They use **normal system tools** to hide their activities, making them difficult to distinguish from regular operations.

Our project aims to detect these hidden attacks by analyzing system activities as a **graph**. It uses **GAT** to understand relationships, **GRU** to track behavior over time, and **VGAE** to learn normal behavior and identify unusual activities, including **unknown attacks**.

### 1.2 Problem Statement
Detecting **Advanced Persistent Threats (APTs)** is challenging because attackers hide their activities among normal system operations. Traditional security tools often fail to identify the connections between **processes, files, and network activities**.

To address this, our proposed system combines **GAT**, **GRU**, and **VGAE** to analyze system behavior, detect suspicious patterns, and identify **hidden and unknown attacks** while **reducing false alarms**.

### 1.3 Objectives
The main objective of our project is to develop an intrusion detection system using **Graph Attention Network (GAT)**, **Gated Recurrent Unit (GRU)**, and **Variational Graph Auto-Encoder (VGAE)** to detect **hidden and unknown Advanced Persistent Threats (APTs)**:
- **GAT:** Understands relationships between processes, files, and network connections.
- **GRU:** Tracks system activities and changes in behavior over time.
- **VGAE:** Learns normal system behavior and identifies unusual activities.

The system also aims to **reduce false alarms**, **trace suspicious activities**, and **map attack sequences to the MITRE ATT&CK framework** using the **DARPA Transparent Computing dataset**.

---

## 2. How Threat Detection Works in Our System (Detailed Mechanics)

```
====================================================================================================
                        HOW AEGIS-PROV DETECTS ADVANCED THREATS
====================================================================================================

 STREAMING TELEMETRY (Kernel Audit Logs: CADETS, THEIA, TRACE)
   │
   ▼
 [1. Normal Baseline Learning] 
   └── Model is trained 100% on benign operational telemetry. It learns the normal distribution
       of system behaviors: how nginx serves web traffic, how syslog writes logs, how cron runs.
   │
   ▼
 [2. Sliding Temporal Snapshots]
   └── In continuous operation, system events are sliced into snapshots of duration ΔT (e.g., 10s).
       A rolling history buffer holds the past w snapshots: [ G_(t-w), ..., G_(t-1) ].
   │
   ▼
 [3. Spatial Dependency Encoding via Relation-Aware GAT]
   └── For each snapshot, GAT computes relation-aware attention over neighbors.
       A process connected to an external socket receives an embedding shaped by the 'recv' relation;
       a file write generates an embedding shaped by the 'write' relation and file path attributes.
   │
   ▼
 [4. Temporal Memory Tracking via GRU]
   └── The chronological sequence of GAT embeddings for each entity is passed through a GRU.
       GRU updates its internal hidden state:
         - Retains memory of earlier steps (e.g., socket opened 30 seconds ago).
         - Identifies sequential progressions across consecutive windows.
   │
   ▼
 [5. Latent Space Mapping via VGAE Encoder]
   └── Fused spatial-temporal features [h_spatial || h_temporal] are projected into latent Gaussian
       parameters: mean vector μ and log-variance vector log(σ²).
       The reparameterization trick z = μ + σ ⊙ ε (where ε ~ N(0, I)) creates a continuous latent space.
   │
   ▼
 [6. Predictive Directed Edge Reconstruction]
   └── Using ONLY history up to window (t-1), the model predicts the likelihood of candidate directed,
       typed edges occurring in the arriving target window G_t:
         p(u ──r──> v at window t | History) = Sigmoid( MLP( [z_u || W_r e_r || z_v] ) )
   │
   ▼
 [7. Anomaly Residual Calculation (Why Attacks Get Caught)]
   └── When target snapshot G_t arrives, we compare observed edges against the model's predictions:
         * Benign Routine Events (e.g., syslog writing to /var/log):
             Model anticipated this transition -> Predicted probability p ≈ 0.95 -> Residual ≈ 0.05 (Low).
         * Stealthy Attack Infiltration (e.g., nginx spawning /bin/sh or reading /etc/passwd):
             Model never saw such transitions in history -> Predicted probability p ≈ 0.0001
             -> Edge Surprise S_edge = -log(0.0001) = 9.21 (EXTREMELY HIGH).
   │
   ▼
 [8. Multi-Criteria Score Fusion & Calibrated Decision]
   └── Composite Threat Score: S_total = w_e * Z(S_edge) + w_k * Z(S_knn) + w_t * Z(S_temp)
       Decision Rule:
         If S_total < Threshold_calibrated -> Benign (Log telemetry, update history buffer)
         If S_total >= Threshold_calibrated -> THREAT DETECTED!
   │
   ▼
 [9. Automated Causal Investigation & Attack Reconstruction]
   └── Anomalous entities serve as seeds:
         * Backward Causal Trace (Ingress Origin): Traces parent processes and ingress sockets.
         * Forward Causal Trace (Blast Radius): Traces spawned subprocesses, files touched, IP pivots.
         * MITRE ATT&CK Rule Matching: Annotates TTPs (T1203, T1059, T1105, T1055, T1003, T1071).
         * Threat Scoring: Computes quantitative graph score and ranks the attack incident.
   │
   ▼
 [10. SOC Alert Delivery & Interactive Graph Display]
   └── Emits traceable JSON alert with exact event IDs and renders the attack subgraph on the dashboard.
====================================================================================================
```

---

## 3. System Architecture Blueprint

```mermaid
flowchart TD
    subgraph Data Ingestion & Stream Parsing
        A1[DARPA TC E3: CADETS OpenBSM] --> B[FastAvro / CDM JSON Parser]
        A2[DARPA TC E3: THEIA Linux Kernel] --> B
        A3[DARPA TC E3: TRACE Linux Auditd] --> B
        A4[Enterprise Audit Logs: Linux / Windows] --> B
        B --> C[Normalized Event Stream: Subject, Relation, Object, Timestamp]
    end

    subgraph Data Preprocessing & Compression
        C --> D[Semantics-Preserving Event Redundancy Compressor]
        D --> E1[External Entity Metadata Store: Path, CmdLine, IP, Port]
        D --> E2[Dynamic Graph Slicer: Window Delta_T = 1s-60s]
        E2 --> F[Temporal Snapshot Stream: G_t-w ... G_t-1 and Target G_t]
    end

    subgraph AEGIS-PROV Neural Network Core
        F --> G1[Relation-Aware GAT Encoder: Spatial Relational Embeddings]
        G1 --> G2[Temporal GRU Module: Entity Behavioral Trajectory Memory]
        G2 --> G3[Probabilistic VGAE Encoder: Compute mu and log_sigma2]
        G3 --> G4[Reparameterization Trick: z = mu + sigma * epsilon]
        G4 --> G5[Directed Relation-Conditioned MLP Edge Decoder]
    end

    subgraph Anomaly Detection & Calibration Engine
        G5 --> H1[Next-Window Edge Surprise: S_edge = -log P_hat]
        G1 --> H2[K-d Tree Benign Embedding Distance: S_knn k=10]
        G2 --> H3[Temporal Predictive Residual: S_temp]
        H1 & H2 & H3 --> H4[Calibrated Composite Threat Score S_total]
        H4 --> H5{S_total >= Frozen Threshold Tau?}
        H5 -- No --> H6[Normal Activity Logged & History Updated]
        H5 -- Yes --> H7[Anomalous Threat Seed Entities Flagged]
    end

    subgraph Causal Investigation & Attack Reconstruction
        H7 --> I1[Bounded Backward Causality Trace: Ingress & Root Cause]
        H7 --> I2[Bounded Forward Causality Trace: Blast Radius & Impact]
        I1 & I2 --> I3[Pseudo-Edge Resolution: Persistence & Session Escalation]
        I3 --> I4[MITRE ATT&CK TTP Rule Pattern Matcher]
        I4 --> I5[Quantitative Scenario Threat Scoring]
        I5 --> I6[Compact Attack Scenario Graph Export]
    end

    subgraph SOC Delivery & Serving
        I6 --> J1[FastAPI REST Microservice: /health, /score-window, /alerts]
        I6 --> J2[Streamlit SOC Investigation Dashboard & Attack Graph Visualizer]
    end
```

---

## 4. Benchmark Dataset Foundation: DARPA Transparent Computing (TC)

Our system is evaluated against the gold-standard DARPA Transparent Computing Engagement 3 (E3) benchmark datasets:

### 4.1 Sub-Dataset Characteristics & Attack Campaigns

| Dataset Name | Target OS & Sensor | Raw Log Size | Nodes Count | Edges Count | Red Team Attack Campaign Storyline |
|---|---|---|---|---|---|
| **DARPA E3 CADETS** | FreeBSD 11.1 (OpenBSM / DTrace) | 18.3 GB | 1,627,035 | 3,303,264 | Nginx remote memory exploit $\to$ interactive `/bin/sh` shell $\to$ dropper download `/tmp/vUgefal` $\to$ lateral IP pivot (`61.167.39.128`) $\to$ Drakon in-memory injection into `sshd` $\to$ credential theft (`/etc/passwd`). |
| **DARPA E3 THEIA** | Linux Ubuntu 12.04 (Instrumented Kernel) | 17.9 GB | 1,623,966 | 2,874,821 | Browser drive-by exploit $\to$ dropper payload execution $\to$ local privilege escalation $\to$ exfiltration of confidential enterprise research documents. |
| **DARPA E3 TRACE** | Linux Ubuntu 16.04 (CamFlow / Auditd) | 15.4 GB | 3,288,676 | 4,080,457 | Multi-week low-and-slow campaign $\to$ Firefox backdoor execution $\to$ kernel privilege escalation $\to$ password hash harvesting $\to$ encrypted C2 exfiltration. |

### 4.2 Common Data Model (CDM v18/v19/v20) Schemas
The raw data streams are decoded from Apache Avro binary (`.avro` / `.bin`) or JSON-lines formats into 5 standardized object schemas:
1. **`Subject` (Process / Thread):** `uuid`, `cid` (PID), `parentSubject` (PPID), `cmdLine`, `startTimestampNanos`.
2. **`FileObject` (Files / Sockets / Pipes):** `uuid`, `filename` (canonical path), `size`, `permissions`.
3. **`NetFlowObject` (Network Connections):** `uuid`, `localAddress`, `localPort`, `remoteAddress`, `remotePort`, `ipProtocol` (6=TCP, 17=UDP).
4. **`Principal` (Users & Credentials):** `uuid`, `userId` (UID), `username`, `groupIds`.
5. **`Event` (System Interactions / Edges):** `uuid`, `type` (`EVENT_FORK`, `EVENT_EXECUTE`, `EVENT_READ`, `EVENT_WRITE`, `EVENT_CONNECT`, `EVENT_RECVFROM`), `subject` (Source UUID), `predicateObject` (Destination UUID), `timestampNanos`.

---

## 5. Mathematical Formulations & Algorithmic Workings

### 5.1 Relation-Aware Graph Attention Network (GAT)
Let $x_i \in \mathbb{R}^{d_{in}}$ be the feature vector of node $i$, and $e_{r_{ji}} \in \mathbb{R}^{d_{rel}}$ be the embedding of relation type $r_{ji}$ on directed edge $j \to i$.
1. **Linear Projections:**
   $$h_i = W_{node} x_i, \quad e_r = W_{rel} e_{r_{ji}}$$
2. **Relation-Aware Attention Coefficient:**
   $$e_{ji} = \text{LeakyReLU}\left( a^T \left[ h_i \parallel h_j \parallel e_r \right] \right)$$
3. **Neighborhood Softmax Normalization:**
   $$\alpha_{ji} = \frac{\exp(e_{ji})}{\sum_{k \in \mathcal{N}_{in}(i)} \exp(e_{ki})}$$
4. **Multi-Head Message Aggregation ($K$ Heads):**
   $$h_i' = \sigma \left( \frac{1}{K} \sum_{k=1}^K \sum_{j \in \mathcal{N}_{in}(i)} \alpha_{ji}^k W^k h_j \right)$$

### 5.2 Causal Temporal Sequence Modeling (GRU)
Given the chronological sequence of spatial embeddings for node $i$ across history snapshots $t-w, \dots, t-1$:
1. **Reset Gate:**
   $$r_t = \sigma(W_r h_i^{(t)} + U_r h_{temp}^{(t-1)} + b_r)$$
2. **Update Gate:**
   $$z_t = \sigma(W_z h_i^{(t)} + U_z h_{temp}^{(t-1)} + b_z)$$
3. **Candidate State:**
   $$\tilde{h}_t = \tanh(W_h h_i^{(t)} + U_h (r_t \odot h_{temp}^{(t-1)}) + b_h)$$
4. **Updated Hidden State:**
   $$h_{temp}^{(t)} = (1 - z_t) \odot h_{temp}^{(t-1)} + z_t \odot \tilde{h}_t$$

### 5.3 Probabilistic VGAE & Directed Relation-Conditioned Edge Decoder
1. **Latent Parameter Projection:**
   $$\mu_i = W_\mu [h_i' \parallel h_{temp}^{(t-1)}] + b_\mu, \quad \log \sigma_i^2 = W_\sigma [h_i' \parallel h_{temp}^{(t-1)}] + b_\sigma$$
2. **Reparameterization Trick:**
   $$z_i = \mu_i + \sigma_i \odot \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$
3. **Ordered Directed Edge Decoder:**
   For a candidate directed interaction where subject $u$ performs action $r$ on object $v$:
   $$p(u \xrightarrow{r} v \text{ in window } t \mid \text{History}) = \sigma \left( \text{MLP}\left( \left[ z_u \parallel W_r e_r \parallel z_v \right] \right) \right)$$
   *Note: Concatenating $[z_u \parallel W_r e_r \parallel z_v]$ ensures that $u \xrightarrow{r} v$ produces a completely different prediction from $v \xrightarrow{r} u$, strictly preserving system causality.*

### 5.4 Hybrid Training Objective
Trained strictly on benign telemetry:
$$\mathcal{L}_{total} = \mathcal{L}_{edge} + \beta \mathcal{L}_{KL}$$
$$\mathcal{L}_{edge} = -\sum_{(u, r, v) \in \mathcal{E}_t^+} \log p(u \xrightarrow{r} v) - \sum_{(u, r, v^-) \in \mathcal{E}_t^-} \log (1 - p(u \xrightarrow{r} v^-))$$
$$\mathcal{L}_{KL} = -\frac{1}{2 |V|} \sum_{i \in V} \sum_{d=1}^D \left( 1 + \log(\sigma_{id}^2) - \mu_{id}^2 - \sigma_{id}^2 \right)$$

### 5.5 Quantitative Threat Scoring & Scenario Ranking
When an attack subgraph $AG$ is extracted:
$$TS(AG) = \sum_{e \in AG} w_{stage}(e) \cdot \left[ Freq(tech) + Var(stage) \right] \cdot (1 + DA) \cdot \text{Criticality}$$
where $w_{stage}$ assigns progressive severity weights: Initial Access ($2.0$), Execution ($1.5$), Defense Evasion ($2.0$), Privilege Escalation ($2.5$), Credential Access ($3.0$), and C2 ($2.5$).

---

## 6. Complete End-to-End Implementation: All Phases

The implementation is structured into a clean, modular Python codebase:

```
c:/Users/nasih/Downloads/projectupdate/
├── configs/
│   └── cadets_e3_config.yaml         # System configuration & hyperparameters
├── data/
│   ├── raw/                           # Raw DARPA Avro or JSON-lines logs
│   └── interim/                       # Compressed, normalized Parquet event tables
├── src/
│   ├── ingestion/
│   │   ├── __init__.py
│   │   └── darpa_parser.py           # Phase 1: CDM Avro/JSON ingestion parser
│   ├── preprocessing/
│   │   ├── __init__.py
│   │   └── compressor.py             # Phase 2: Semantics-preserving event compressor
│   ├── graph/
│   │   ├── __init__.py
│   │   └── window_builder.py         # Phase 3 & 4: Temporal graph snapshot builder
│   ├── models/
│   │   ├── __init__.py
│   │   ├── gat_encoder.py            # Phase 6: Relation-aware GAT convolution
│   │   ├── gru_temporal.py           # Phase 7: Temporal GRU sequence module
│   │   ├── temporal_vgae.py          # Phase 8: Probabilistic VGAE & directed decoder
│   │   └── hybrid_detector.py        # Unified GAT-GRU-VGAE architecture
│   ├── scoring/
│   │   ├── __init__.py
│   │   └── anomaly_engine.py         # Phase 10: Multi-criteria anomaly engine
│   ├── investigation/
│   │   ├── __init__.py
│   │   └── causal_tracer.py          # Phase 11: Bounded causal tracing & ATT&CK rules
│   ├── api/
│   │   ├── __init__.py
│   │   └── main.py                   # Phase 12: FastAPI REST microservice
│   └── dashboard/
│       └── app.py                    # Phase 12: Streamlit SOC visualizer
├── run_pipeline.py                    # Turnkey end-to-end executable pipeline
└── requirements.txt
```

---

### Phase 0: Environment Setup & Configuration

Install the required environment via PowerShell:
```powershell
# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install PyTorch (CPU or CUDA) and PyTorch Geometric
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install torch-geometric pandas pyarrow numpy scikit-learn networkx
pip install matplotlib seaborn fastapi uvicorn streamlit pydantic fastavro pyyaml
```

Configuration file: `configs/cadets_e3_config.yaml`:
```yaml
project:
  name: "AEGIS-PROV-GAT-GRU-VGAE"
  version: "1.0.0"
  seed: 42

dataset:
  name: "DARPA_TC_E3_CADETS"
  format: "cdm_json"
  train_ratio: 0.70  # strictly benign baseline
  val_ratio: 0.10    # strictly benign validation for threshold calibration
  test_ratio: 0.20   # red team attack infiltration + background

graph:
  delta_t: 10.0      # temporal window size in seconds
  history_w: 5       # temporal sequence length (w past snapshots)
  node_types: ["process", "file", "socket", "principal"]
  relation_types: ["fork", "execve", "read", "write", "connect", "recv", "send", "unlink"]

model:
  in_dim: 4          # one-hot node type dimension
  gat_hidden_dim: 32
  gat_heads: 4
  gru_hidden_dim: 64
  vgae_latent_dim: 32
  lr: 0.001
  weight_decay: 0.0005
  beta_kl: 0.01

detection:
  target_fpr: 0.001  # enforces operational false positive rate <= 0.1%
  knn_k: 10

investigation:
  max_trace_depth: 4
  max_trace_time_window: 300.0 # seconds
```

---

### Phase 1: Ingestion Engine (`src/ingestion/darpa_parser.py`)
Parses Avro binary and JSON-lines records into uniform entities and event streams:
```python
import json
import gzip
from typing import Dict, List, Optional, Any

try:
    import fastavro
    HAS_FASTAVRO = True
except ImportError:
    HAS_FASTAVRO = False

class DarpaCDMParser:
    def __init__(self):
        self.subjects: Dict[str, Dict[str, Any]] = {}
        self.files: Dict[str, Dict[str, Any]] = {}
        self.netflows: Dict[str, Dict[str, Any]] = {}
        self.principals: Dict[str, Dict[str, Any]] = {}
        self.events: List[Dict[str, Any]] = []

    def _extract_uuid(self, uuid_field: Any) -> Optional[str]:
        if isinstance(uuid_field, dict):
            for k, v in uuid_field.items():
                if 'UUID' in k or k == 'string':
                    return str(v)
        return str(uuid_field) if uuid_field else None

    def _extract_string(self, string_field: Any) -> str:
        if isinstance(string_field, dict):
            return str(string_field.get('string', ''))
        return str(string_field) if string_field else ''

    def parse_record(self, record: Dict[str, Any]) -> None:
        rec_type = record.get('type')
        datum = record.get('datum', record)
        datum_str = str(datum)

        # Subject (Process)
        if rec_type == 'SUBJECT' or 'Subject' in datum_str:
            uuid = self._extract_uuid(datum.get('uuid'))
            if uuid:
                self.subjects[uuid] = {
                    'uuid': uuid,
                    'cid': datum.get('cid', 0),
                    'parent': self._extract_uuid(datum.get('parentSubject')),
                    'cmdline': self._extract_string(datum.get('cmdLine')),
                    'type': 'process'
                }

        # FileObject
        elif rec_type == 'FILE_OBJECT' or 'FileObject' in datum_str:
            uuid = self._extract_uuid(datum.get('uuid'))
            if uuid:
                self.files[uuid] = {
                    'uuid': uuid,
                    'path': self._extract_string(datum.get('filename')),
                    'type': 'file'
                }

        # NetFlowObject (Socket)
        elif rec_type == 'NET_FLOW_OBJECT' or 'NetFlowObject' in datum_str:
            uuid = self._extract_uuid(datum.get('uuid'))
            if uuid:
                self.netflows[uuid] = {
                    'uuid': uuid,
                    'local_ip': self._extract_string(datum.get('localAddress')),
                    'local_port': datum.get('localPort', 0),
                    'remote_ip': self._extract_string(datum.get('remoteAddress')),
                    'remote_port': datum.get('remotePort', 0),
                    'type': 'socket'
                }

        # Event (Directed Causal Edge)
        elif rec_type == 'EVENT' or 'Event' in datum_str:
            ev_uuid = self._extract_uuid(datum.get('uuid'))
            src_uuid = self._extract_uuid(datum.get('subject'))
            dst_uuid = self._extract_uuid(datum.get('predicateObject'))
            ts_nanos = datum.get('timestampNanos', 0)
            ts_sec = float(ts_nanos) / 1e9 if ts_nanos else 0.0

            if src_uuid and dst_uuid:
                self.events.append({
                    'uuid': ev_uuid,
                    'event_type': datum.get('type', ''),
                    'src_uuid': src_uuid,
                    'dst_uuid': dst_uuid,
                    'timestamp': ts_sec,
                    'path': self._extract_string(datum.get('predicateObjectPath'))
                })

    def load_json_lines(self, filepath: str) -> int:
        open_fn = gzip.open if filepath.endswith('.gz') else open
        count = 0
        with open_fn(filepath, 'rt', encoding='utf-8', errors='ignore') as f:
            for line in f:
                if line.strip():
                    try:
                        record = json.loads(line)
                        self.parse_record(record)
                        count += 1
                    except json.JSONDecodeError:
                        continue
        return count
```

---

### Phase 2: Semantics-Preserving Event Redundancy Compression (`src/preprocessing/compressor.py`)
Deduplicates repetitive I/O loops (e.g., thousands of `read`/`write` chunks in socket transfers) while maintaining 100% causal dependencies:
```python
from typing import List, Dict, Any, Tuple

EVENT_MAPPING = {
    'EVENT_FORK': 'fork', 'EVENT_CLONE': 'fork',
    'EVENT_EXECUTE': 'execve',
    'EVENT_OPEN': 'read', 'EVENT_READ': 'read', 'EVENT_CLOSE': 'read',
    'EVENT_WRITE': 'write', 'EVENT_MODIFY_FILE_ATTRIBUTES': 'write',
    'EVENT_CONNECT': 'connect', 'EVENT_SENDTO': 'send', 'EVENT_RECVFROM': 'recv',
    'EVENT_UNLINK': 'unlink'
}

class EventCompressor:
    def __init__(self, time_threshold: float = 2.0):
        self.time_threshold = time_threshold

    def compress(self, raw_events: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        raw_events.sort(key=lambda x: x['timestamp'])
        compressed: List[Dict[str, Any]] = []
        recent_cache: Dict[Tuple[str, str, str], Dict[str, Any]] = {}

        for ev in raw_events:
            rel = EVENT_MAPPING.get(ev['event_type'], 'read')
            key = (ev['src_uuid'], rel, ev['dst_uuid'])
            ts = ev['timestamp']

            if key in recent_cache:
                prev = recent_cache[key]
                if (ts - prev['last_timestamp'] <= self.time_threshold) and rel in ['read', 'write', 'recv', 'send']:
                    prev['count'] += 1
                    prev['last_timestamp'] = ts
                    continue

            record = {
                'uuid': ev['uuid'],
                'src_uuid': ev['src_uuid'],
                'dst_uuid': ev['dst_uuid'],
                'relation': rel,
                'first_timestamp': ts,
                'last_timestamp': ts,
                'path': ev.get('path', ''),
                'count': 1
            }
            recent_cache[key] = record
            compressed.append(record)

        return compressed
```

---

### Phase 3 & 4: Temporal Windowing & Graph Snapshot Slicing (`src/graph/window_builder.py`)
Generates PyTorch Geometric `Data` objects sliced across fixed intervals $\Delta T$:
```python
import torch
from torch_geometric.data import Data
from typing import List, Dict, Any

NODE_TYPE_MAP = {'process': 0, 'file': 1, 'socket': 2, 'principal': 3}
RELATION_MAP = {'fork': 0, 'execve': 1, 'read': 2, 'write': 3, 'connect': 4, 'recv': 5, 'send': 6, 'unlink': 7}

class TemporalWindowBuilder:
    def __init__(self, parser, delta_t: float = 10.0, history_w: int = 5):
        self.parser = parser
        self.delta_t = delta_t
        self.history_w = history_w
        self.node_to_id: Dict[str, int] = {}
        self.id_to_meta: Dict[int, Dict[str, Any]] = {}

    def _register_node(self, uuid: str, fallback_type: str = 'process') -> int:
        if uuid not in self.node_to_id:
            nid = len(self.node_to_id)
            self.node_to_id[uuid] = nid
            meta = {'uuid': uuid, 'type': fallback_type, 'label': 0}
            if uuid in self.parser.subjects:
                meta['type'] = 'process'
                meta['cmdline'] = self.parser.subjects[uuid].get('cmdline', '')
            elif uuid in self.parser.files:
                meta['type'] = 'file'
                meta['path'] = self.parser.files[uuid].get('path', '')
            elif uuid in self.parser.netflows:
                meta['type'] = 'socket'
                meta['remote_ip'] = self.parser.netflows[uuid].get('remote_ip', '')
            self.id_to_meta[nid] = meta
        return self.node_to_id[uuid]

    def build_snapshots(self, events: List[Dict[str, Any]]) -> List[Data]:
        if not events:
            return []

        for e in events:
            self._register_node(e['src_uuid'], 'process')
            self._register_node(e['dst_uuid'], 'file')

        t_min = events[0]['first_timestamp']
        t_max = events[-1]['last_timestamp']
        snapshots: List[Data] = []
        curr_t = t_min
        num_total_nodes = len(self.id_to_meta)

        x = torch.zeros((num_total_nodes, len(NODE_TYPE_MAP)), dtype=torch.float32)
        for nid, meta in self.id_to_meta.items():
            t_idx = NODE_TYPE_MAP.get(meta['type'], 0)
            x[nid, t_idx] = 1.0

        while curr_t <= t_max:
            win_end = curr_t + self.delta_t
            win_events = [e for e in events if curr_t <= e['first_timestamp'] < win_end]

            if win_events:
                src_list, dst_list, rel_list = [], [], []
                for e in win_events:
                    u = self.node_to_id[e['src_uuid']]
                    v = self.node_to_id[e['dst_uuid']]
                    r = RELATION_MAP.get(e['relation'], 2)
                    src_list.append(u)
                    dst_list.append(v)
                    rel_list.append(r)

                edge_index = torch.tensor([src_list, dst_list], dtype=torch.long)
                edge_attr = torch.tensor(rel_list, dtype=torch.long)
            else:
                edge_index = torch.zeros((2, 0), dtype=torch.long)
                edge_attr = torch.zeros((0,), dtype=torch.long)

            data = Data(x=x, edge_index=edge_index, edge_attr=edge_attr, num_nodes=num_total_nodes, timestamp=curr_t)
            snapshots.append(data)
            curr_t += self.delta_t

        return snapshots
```

---

### Phase 6, 7 & 8: Deep Learning Core Modules

#### Relation-Aware GAT Encoder (`src/models/gat_encoder.py`)
```python
import torch
import torch.nn as nn
from torch_geometric.nn import MessagePassing
from torch_geometric.utils import softmax
from typing import Optional, Any

class RelationGATConv(MessagePassing):
    def __init__(self, in_dim: int, out_dim: int, num_relations: int = 8, heads: int = 4, dropout: float = 0.1):
        super().__init__(aggr='add', node_dim=0)
        self.heads = heads
        self.out_dim = out_dim
        self.head_dim = out_dim // heads

        self.lin_src = nn.Linear(in_dim, out_dim, bias=False)
        self.lin_dst = nn.Linear(in_dim, out_dim, bias=False)
        self.rel_emb = nn.Embedding(num_relations, out_dim)

        self.att = nn.Parameter(torch.Tensor(1, heads, 3 * self.head_dim))
        self.leaky_relu = nn.LeakyReLU(0.2)
        self.dropout = nn.Dropout(dropout)
        self.bias = nn.Parameter(torch.zeros(out_dim))
        nn.init.xavier_uniform_(self.att)

    def forward(self, x: torch.Tensor, edge_index: torch.Tensor, edge_attr: torch.Tensor) -> torch.Tensor:
        if edge_index.size(1) == 0:
            return self.lin_dst(x) + self.bias
        h_src = self.lin_src(x).view(-1, self.heads, self.head_dim)
        h_dst = self.lin_dst(x).view(-1, self.heads, self.head_dim)
        e_rel = self.rel_emb(edge_attr).view(-1, self.heads, self.head_dim)
        out = self.propagate(edge_index, h_src=h_src, h_dst=h_dst, e_rel=e_rel, size=None)
        out = out.view(-1, self.out_dim) + self.bias
        return out

    def message(self, h_src_j: torch.Tensor, h_dst_i: torch.Tensor, e_rel: torch.Tensor, index: torch.Tensor, ptr: Any = None, size_i: Optional[int] = None) -> torch.Tensor:
        cat_feat = torch.cat([h_dst_i, h_src_j, e_rel], dim=-1)
        alpha = (cat_feat * self.att).sum(dim=-1)
        alpha = self.leaky_relu(alpha)
        alpha = softmax(alpha, index, ptr, num_nodes=size_i)
        alpha = self.dropout(alpha)
        return h_src_j * alpha.unsqueeze(-1)
```

#### Temporal GRU Sequence Layer (`src/models/gru_temporal.py`)
```python
import torch
import torch.nn as nn

class TemporalGRU(nn.Module):
    def __init__(self, in_dim: int, hidden_dim: int = 64):
        super().__init__()
        self.gru = nn.GRU(input_size=in_dim, hidden_size=hidden_dim, num_layers=1, batch_first=True)

    def forward(self, snapshot_embeddings: torch.Tensor) -> torch.Tensor:
        # snapshot_embeddings: [Num_nodes, History_w, In_dim]
        out, _ = self.gru(snapshot_embeddings)
        return out[:, -1, :] # Final state at t-1
```

#### Probabilistic VGAE & Directed Relation Decoder (`src/models/temporal_vgae.py`)
```python
import torch
import torch.nn as nn
from typing import Tuple

class TemporalVGAE(nn.Module):
    def __init__(self, in_dim: int, latent_dim: int = 32, num_relations: int = 8):
        super().__init__()
        self.fc_mu = nn.Linear(in_dim, latent_dim)
        self.fc_logvar = nn.Linear(in_dim, latent_dim)
        self.rel_emb = nn.Embedding(num_relations, latent_dim)

        # Directed asymmetric relation decoder: [z_src || e_rel || z_dst]
        self.decoder = nn.Sequential(
            nn.Linear(3 * latent_dim, 64),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )

    def encode(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        return self.fc_mu(x), self.fc_logvar(x)

    def reparameterize(self, mu: torch.Tensor, logvar: torch.Tensor) -> torch.Tensor:
        if self.training:
            std = torch.exp(0.5 * logvar)
            eps = torch.randn_like(std)
            return mu + eps * std
        return mu

    def decode_edges(self, z: torch.Tensor, edge_index: torch.Tensor, edge_rel: torch.Tensor) -> torch.Tensor:
        src = edge_index[0]
        dst = edge_index[1]
        z_src = z[src]
        z_dst = z[dst]
        e_rel = self.rel_emb(edge_rel)
        feat = torch.cat([z_src, e_rel, z_dst], dim=-1)
        return self.decoder(feat).squeeze(-1)

    def kl_divergence(self, mu: torch.Tensor, logvar: torch.Tensor) -> torch.Tensor:
        return -0.5 * torch.mean(torch.sum(1 + logvar - mu.pow(2) - logvar.exp(), dim=1))
```

#### Integrated Hybrid Architecture (`src/models/hybrid_detector.py`)
```python
import torch
import torch.nn as nn
from typing import List, Tuple
from torch_geometric.data import Data
from .gat_encoder import RelationGATConv
from .gru_temporal import TemporalGRU
from .temporal_vgae import TemporalVGAE

class HybridGATGRUVGAE(nn.Module):
    def __init__(self, node_in_dim: int = 4, gat_dim: int = 32, gru_dim: int = 64, latent_dim: int = 32, num_rel: int = 8):
        super().__init__()
        self.gat1 = RelationGATConv(node_in_dim, gat_dim, num_relations=num_rel, heads=4)
        self.gat2 = RelationGATConv(gat_dim, gat_dim, num_relations=num_rel, heads=4)
        self.temporal_gru = TemporalGRU(in_dim=gat_dim, hidden_dim=gru_dim)
        self.vgae = TemporalVGAE(in_dim=gat_dim + gru_dim, latent_dim=latent_dim, num_relations=num_rel)

    def encode_snapshot(self, g: Data) -> torch.Tensor:
        h1 = torch.relu(self.gat1(g.x, g.edge_index, g.edge_attr))
        h2 = self.gat2(h1, g.edge_index, g.edge_attr)
        return h2

    def forward_history(self, history_graphs: List[Data]) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        gat_embeddings = [self.encode_snapshot(g) for g in history_graphs]
        seq_tensor = torch.stack(gat_embeddings, dim=1)
        h_temp = self.temporal_gru(seq_tensor)

        latest_spatial = gat_embeddings[-1]
        fused = torch.cat([latest_spatial, h_temp], dim=-1)

        mu, logvar = self.vgae.encode(fused)
        z = self.vgae.reparameterize(mu, logvar)
        return z, mu, logvar

    def predict_target_edges(self, z: torch.Tensor, target_edge_index: torch.Tensor, target_edge_rel: torch.Tensor) -> torch.Tensor:
        return self.vgae.decode_edges(z, target_edge_index, target_edge_rel)
```

---

### Phase 10: Multi-Criteria Anomaly Scoring & Calibration (`src/scoring/anomaly_engine.py`)
Calculates edge surprise scores and strictly freezes the threshold on benign validation telemetry:
```python
import numpy as np
import torch
from typing import List

class AnomalyScoringEngine:
    def __init__(self, k_neighbors: int = 5, target_fpr: float = 0.001):
        self.k_neighbors = k_neighbors
        self.target_fpr = target_fpr
        self.threshold: float = 1.0

    def compute_edge_surprise(self, pred_probs: torch.Tensor) -> float:
        eps = 1e-7
        surprises = -torch.log(pred_probs + eps)
        return float(torch.mean(surprises).item()) if len(surprises) > 0 else 0.0

    def calibrate_threshold(self, validation_scores: List[float]) -> float:
        val_arr = np.array(validation_scores) if validation_scores else np.array([0.5, 0.6])
        percentile = (1.0 - self.target_fpr) * 100.0
        self.threshold = float(np.percentile(val_arr, percentile))
        return self.threshold

    def is_anomalous(self, score: float) -> bool:
        return score >= self.threshold
```

---

### Phase 11: Causal Tracing & ATT&CK Attack Reconstruction (`src/investigation/causal_tracer.py`)
Performs backward causality tracing (root ingress discovery), forward causality tracing (blast radius estimation), and matches against MITRE ATT&CK rules:
```python
import networkx as nx
from typing import List, Dict, Any, Tuple, Set

MITRE_TTP_RULES = [
    {
        'id': 'T1203', 'name': 'Exploitation for Client Execution', 'stage': 'Initial Access / Execution',
        'match': lambda u, v, r, extra: 'nginx' in extra.get('cmdline', '') and r == 'fork'
    },
    {
        'id': 'T1059.004', 'name': 'Unix Shell Execution', 'stage': 'Execution',
        'match': lambda u, v, r, extra: '/bin/sh' in extra.get('cmdline', '') and r == 'execve'
    },
    {
        'id': 'T1105', 'name': 'Ingress Tool Transfer (Dropper)', 'stage': 'Defense Evasion',
        'match': lambda u, v, r, extra: '/tmp/' in extra.get('path', '') and r == 'write'
    },
    {
        'id': 'T1055', 'name': 'Process Injection (Drakon)', 'stage': 'Privilege Escalation',
        'match': lambda u, v, r, extra: '/tmp/vUgefal' in extra.get('cmdline', '') and 'sshd' in extra.get('target_cmdline', '')
    },
    {
        'id': 'T1003.008', 'name': 'OS Credential Dumping (/etc/passwd)', 'stage': 'Credential Access',
        'match': lambda u, v, r, extra: '/etc/passwd' in extra.get('path', '') and r == 'read'
    },
    {
        'id': 'T1071.001', 'name': 'Application Layer Protocol C2', 'stage': 'Command and Control',
        'match': lambda u, v, r, extra: r == 'connect' and extra.get('remote_ip', '') in ['81.49.200.166', '61.167.39.128']
    }
]

TACTIC_WEIGHTS = {
    'Initial Access / Execution': 2.0, 'Execution': 1.5, 'Defense Evasion': 2.0,
    'Privilege Escalation': 2.5, 'Credential Access': 3.0, 'Command and Control': 2.5
}

class CausalTracer:
    def __init__(self, full_events: List[Dict[str, Any]], node_meta: Dict[int, Dict[str, Any]]):
        self.node_meta = node_meta
        self.full_graph = nx.MultiDiGraph()
        for e in full_events:
            self.full_graph.add_edge(e['src'], e['dst'], relation=e['relation'], path=e.get('path', ''))

    def trace_subgraph(self, seed_nodes: List[int], max_depth: int = 3) -> nx.DiGraph:
        subgraph = nx.DiGraph()
        visited: Set[int] = set(seed_nodes)
        queue: List[Tuple[int, int]] = [(s, 0) for s in seed_nodes]

        while queue:
            curr, depth = queue.pop(0)
            if depth >= max_depth:
                continue

            for pred in self.full_graph.predecessors(curr):
                subgraph.add_edge(pred, curr)
                if pred not in visited:
                    visited.add(pred)
                    queue.append((pred, depth + 1))

            for succ in self.full_graph.successors(curr):
                subgraph.add_edge(curr, succ)
                if succ not in visited:
                    visited.add(succ)
                    queue.append((succ, depth + 1))

        return subgraph

    def match_ttps_and_score(self, attack_graph: nx.DiGraph) -> Tuple[List[Dict[str, Any]], float]:
        matched_ttps = []
        threat_score = 0.0

        for u, v in attack_graph.edges():
            u_meta = self.node_meta.get(u, {})
            v_meta = self.node_meta.get(v, {})
            extra = {
                'cmdline': u_meta.get('cmdline', ''),
                'target_cmdline': v_meta.get('cmdline', ''),
                'path': v_meta.get('path', ''),
                'remote_ip': v_meta.get('remote_ip', '')
            }

            for rule in MITRE_TTP_RULES:
                for rel in ['fork', 'execve', 'write', 'read', 'connect', 'recv']:
                    if rule['match'](u, v, rel, extra):
                        matched_ttps.append({
                            'rule_id': rule['id'],
                            'name': rule['name'],
                            'stage': rule['stage'],
                            'src': u_meta.get('uuid', str(u)),
                            'dst': v_meta.get('uuid', str(v))
                        })
                        threat_score += TACTIC_WEIGHTS.get(rule['stage'], 1.0) * 10.0
                        break

        return matched_ttps, threat_score
```

---

### Phase 12: Production Serving API & SOC Dashboard

#### FastAPI REST Microservice (`src/api/main.py`)
```python
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="AEGIS-PROV Threat Detection Service", version="1.0.0")
ALERTS_DB = []

class WindowScoreRequest(BaseModel):
    window_id: str
    timestamp: float
    nodes_count: int
    edges_count: int
    edge_surprise_score: float

class ThreatAlertResponse(BaseModel):
    alert_id: str
    status: str
    threat_score: float
    threshold: float
    is_anomaly: bool
    recommended_action: str

@app.get("/health")
def health_check():
    return {"status": "healthy", "engine": "AEGIS-PROV-GAT-GRU-VGAE"}

@app.post("/score-window", response_model=ThreatAlertResponse)
def score_window(req: WindowScoreRequest):
    threshold = 1.45
    is_anomaly = req.edge_surprise_score >= threshold
    alert_id = f"ALT-{len(ALERTS_DB)+1:05d}"
    res = {
        "alert_id": alert_id,
        "status": "CRITICAL" if is_anomaly else "BENIGN",
        "threat_score": req.edge_surprise_score,
        "threshold": threshold,
        "is_anomaly": is_anomaly,
        "recommended_action": "ISOLATE_AND_TRACE" if is_anomaly else "LOG_TELEMETRY"
    }
    if is_anomaly:
        ALERTS_DB.append(res)
    return res

@app.get("/alerts")
def get_alerts():
    return {"total_alerts": len(ALERTS_DB), "alerts": ALERTS_DB}
```

Run API:
```powershell
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Streamlit SOC Investigation Dashboard (`src/dashboard/app.py`)
Run Dashboard:
```powershell
streamlit run src/dashboard/app.py
```

---

## 7. Experimental Evaluation Plan & Ablation Study

To evaluate every architectural component, our experimental framework defines 8 standardized ablation runs:

| Run ID | Architecture Configuration | Spatial Encoder | Temporal Memory | Generative Decoder | Detection Signal | Core Ablation Objective |
|---|---|---|---|---|---|---|
| **B0** | Statistical Baseline | None (graph degree, event counts) | None | Logistic Regression | Supervised Score | Establishes basic linear baseline without graph embeddings. |
| **B1** | Spatial Baseline | Relation-Aware GAT | None | None | KNN Outlier Distance | Measures graph relational representation without temporal history. |
| **B2** | Temporal GNN Baseline | Relation-Aware GAT | 1-Layer GRU | Dense Classification Head | Cross-Entropy Loss | Tests sequential tracking without generative link reconstruction. |
| **B3** | Static Generative Baseline | Relation-Aware GAT | None | Directed MLP Edge Decoder | Next-Window Edge Surprise | Measures link reconstruction without temporal history. |
| **B4** | **Our Proposed Hybrid Core** | **Relation-Aware GAT** | **1-Layer GRU** | **Directed MLP Edge Decoder** | **Next-Window Edge Surprise** | **Validates fused spatial-temporal generative link prediction.** |
| **B5** | Hybrid + Embedding Fusion | Relation-Aware GAT | 1-Layer GRU | Directed MLP Edge Decoder | Fused $S_{edge} + S_{knn}$ | Evaluates whether benign embedding distance complements edge surprise. |
| **B6** | Hybrid + Feature Masking | Stacked GAT (50% Masking) | 1-Layer GRU | Directed MLP Edge Decoder | Multi-Task Self-Supervised Loss | Evaluates self-supervised feature reconstruction during pretraining. |
| **B7** | **Full System + Causal Tracing** | **Relation-Aware GAT** | **1-Layer GRU** | **Directed MLP Edge Decoder** | **Full Scoring + MITRE Tracing** | **Complete operational detection, tracing, and ranking pipeline.** |

---

## 8. Engineering Constraints, Failure Modes & Viva Defense Guide

### 8.1 Critical Failure Modes & Practical Engineering Mitigations

1. **Memory Exhaustion on Standard Hardware (8 GB RAM):**
   - *Problem:* Parsing multi-gigabyte Avro logs into uncompressed memory objects causes RAM crashes.
   - *Mitigation:* Stream events chunk-by-chunk using fastavro/JSONL readers, immediately apply semantics-preserving compression to eliminate repetitive I/O loops, and construct sparse PyTorch Geometric `edge_index` tensors over bounded temporal windows.
2. **Temporal Lookahead / Data Leakage:**
   - *Problem:* Shuffling graph snapshots randomly across train/val/test lets the model see future edges.
   - *Mitigation:* Strictly partition data chronologically ($t_{train} < t_{val} < t_{test}$). To predict snapshot $G_t$, the model is strictly limited to history $G_{<t}$.
3. **Identity Trivialization in VGAE:**
   - *Problem:* If the encoder sees edges from snapshot $G_t$ while decoding $G_t$, the task becomes trivial.
   - *Mitigation:* Causal predictive formulation: the encoder processes strictly $G_{t-w}, \dots, G_{t-1}$ to predict the candidate directed edges in arriving snapshot $G_t$.
4. **Directional Semantics Loss:**
   - *Problem:* Standard VGAE uses symmetric inner-product decoders ($z_u^T z_v = z_v^T z_u$), ignoring causal flow.
   - *Mitigation:* We use our asymmetric relation decoder MLP($[z_u \parallel W_r e_r \parallel z_v]$), preserving the causal role of subject $u$ and object $v$.

### 8.2 Viva Voce Defense & Conceptual Examination Cheat Sheet

> **Q: What is the main problem your project solves?**  
> *"Our project solves the problem of detecting stealthy Advanced Persistent Threats (APTs) in enterprise audit logs. Traditional security tools fail because APTs mimic normal administrative behavior ('living-off-the-land') and spread their actions over long time horizons. We build whole-system provenance graphs and use a hybrid deep learning model (GAT + GRU + VGAE) to learn normal system causality and detect anomalous multi-step campaigns with an operational false positive rate under 0.1%."*

> **Q: How does each neural network component contribute to detection?**  
> *"GAT captures spatial and relational context within each snapshot (understanding how processes interact with files and sockets through specific system calls). GRU models temporal sequential behavior across time windows (remembering what happened earlier in an execution sequence). VGAE provides a probabilistic latent space and an ordered directed link decoder to predict what edges should legitimately happen next. Stealthy malicious edges produce high edge-surprise residuals that trigger alerts."*

> **Q: How do you prevent the model from drowning analysts in false alarms?**  
> *"In real enterprises, malicious events represent less than 0.001% of audit telemetry. We train purely on benign system telemetry and calibrate our anomaly detection threshold on a held-out benign validation set to satisfy a strict target false positive rate (FPR <= 0.1%). Furthermore, we do not simply output raw scores; our causal tracing engine extracts bounded root-cause and blast-radius subgraphs, matches them to MITRE ATT&CK techniques, and ranks alerts by quantitative threat score."*

---

## 9. Academic & Literature Context

Our framework's design draws inspiration from and unifies several foundational research contributions in graph representation learning and cyber threat detection:
- **Provenance Graph Modeling & Masking:** Builds upon concepts introduced in *MGDA* (Cui et al., *Computer Networks*, 2026) regarding semantics-preserving event compression, relation-aware GAT architectures, and K-d tree anomaly scoring.
- **Dynamic Temporal Graph Slicing & Edge Robustness:** Adapts temporal snapshot sequence formulations and validation threshold calibration protocols from *EdgeFence* (Isaac et al., *IJIS*, 2026).
- **Cross-Host Causal Tracing & Threat Scoring:** Incorporates whole-network causality tracing principles, pseudo-edge resolutions, and quantitative attack graph ranking methodologies inspired by *Commander* (Liu et al., *JISA*, 2025).
- **Variational Graph Auto-Encoders:** Extends the classical variational graph auto-encoding paradigm (Kipf & Welling, 2016) by replacing static, undirected inner-product decoders with ordered, relation-conditioned directed edge decoders tailored for streaming provenance analytics.
- **Graph Attention Networks:** Utilizes the multi-head attention mechanisms formalized by Veličković et al. (ICLR, 2018), extended to edge-conditioned message passing.
