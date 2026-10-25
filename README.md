# AEGIS-PROV: Enterprise APT Provenance Graph Threat Detection & Investigation

An enterprise-grade cyber threat investigation and attack reconstruction platform rewritten as a high-performance React application. Powered by a hybrid Graph Attention Network (GAT), Gated Recurrent Unit (GRU), and Variational Graph Auto-Encoder (VGAE) deep learning architecture on DARPA Transparent Computing (TC E3 CADETS / THEIA / TRACE) telemetry.

---

## Key Features

- **Interactive Provenance Attack Graph:** Visual directed acyclic provenance graph with pan/zoom, interactive node inspection (Subject/Process, FileObject, NetFlow/Socket, Principal), relation tags, and step-by-step kill-chain animation.
- **Real-Time SOC Dashboard:** Live threat kill-chain incident feeds, risk score gauges against calibrated threshold $\tau$, host isolation, and incident JSON export.
- **Automated Bounded Causal Tracing:** Root-cause ingress discovery via backward causality traversal and blast radius estimation via forward process/socket expansion.
- **MITRE ATT&CK TTP Correlation:** Automated matching of attack steps to techniques (T1203, T1059.004, T1105, T1055, T1003.008, T1071.001) with quantitative multi-stage threat scoring.
- **Turnkey Pipeline Execution Simulator:** Replicates the complete 6-stage training and scoring pipeline with real-time console streaming logs.
- **Neural Architecture & Ablation Lab:** Empirical breakdown of runs B0 through B7 validating spatial attention, temporal GRU sequence memory, and directed link surprise decoders.
- **REST API Serving Studio:** Interactive testing of production microservice endpoints (`/health`, `/score-window`, `/alerts`).
- **Research Library:** Curated theoretical foundation with 23 indexed peer-reviewed papers and Viva Voce defense guide.

---

## Tech Stack

- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, JetBrains Mono & Inter typography
- **Icons:** Lucide React
- **Datasets:** DARPA Transparent Computing Engagement 3 (CADETS, THEIA, TRACE)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build
```
