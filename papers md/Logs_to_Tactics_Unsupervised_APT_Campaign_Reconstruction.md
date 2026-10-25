International Journal of Information Security (2026) 25:79 https://doi.org/10.1007/s10207-026-01254-w 

**~~REGULAR CONTRIBUTION~~** 



# **From logs to tactics: unsupervised reconstruction of APT campaigns with MITRE-enriched meta-alerts** 

**Francesco Ferazza**<sup>**1,2**</sup> **· Cosimo Melella**<sup>**3**</sup> **· Konstantinos Mersinas**<sup>**4**</sup> **· Ricardo Lugo**<sup>**3**</sup> **· Rain Ottis**<sup>**3**</sup> 

Received: 28 January 2026 / Accepted: 3 April 2026 / Published online: 13 April 2026 © The Author(s) 2026 

#### **Abstract** 

The operational effectiveness of Security Operation Centres (SOCs) is increasingly hindered as analysts are overwhelmed with low-signal alerts from heterogeneous detection systems, leading to cognitive fatigue and impairing the ability to detect complex, multi-stage intrusions like Advanced Persistent Threats (APTs). To overcome the limitations of heuristic-based aggregation and the brittleness of supervised models in data-scarce environments, we present a fully unsupervised framework for the automated generation of high-level, MITRE ATT&CK-enriched meta-alerts. Our pipeline systematically integrates Graph Neural Networks (GNNs) to reconstruct coherent event sequences from noisy telemetry, Large Language Models (LLMs) for contextual summarization, and an advanced semantic clustering module based on transformer embeddings to group alerts with high contextual fidelity. The core of our contribution is a novel hybrid mapping engine that synergistically fuses a symbolic cybersecurity ontology with a BERT-based semantic classifier, demonstrably overcoming the individual weaknesses of each approach. We present a rigorous empirical evaluation using large-scale datasets from the NATO CCDCOE Crossed Swords exercise (XS), intentionally retaining their inherent noise and heterogeneity to validate the real-world applicability of our framework. Our results demonstrate that the framework achieves a significant reduction in alert triage volume while ensuring that no critical threats are dropped. Notably, our hybrid mapping engine achieves an F1-score of 87%, outperforming non-hybrid baselines. This work provides a validated blueprint for moving from reactive alert triage to proactive, context-aware threat investigation in modern SOCs. 

**Keywords** MITRE ATT&CK · Unsupervised learning · Alert triage · Security operations center (SOC) · Graph neural networks (GNN) · Natural language processing (NLP) · Cyber threat intelligence 

## **1 Introduction** 

Present-day cyber threats, particularly Advanced Persistent Threats (APTs), continue to evolve in sophistication, persistence, and stealth. These multi-stage intrusions are notoriously difficult to detect due to their ability to blend in with regular system activity and operate over extended timeframes. To combat them, organisations rely on diverse monitoring systems—from host-based intrusion detection (HIDS) to endpoint detection and response (EDR) and Linux 

> B Francesco Ferazza 

Francesco.Ferazza.2021@live.rhul.ac.uk 

> 1 Royal Holloway University of London, Egham, UK 

- 2 Marina Militare, Rome, Italy 

- 3 

- Tallinn University of Technology, Tallinn, Estonia 

> 4 

> Royal Holloway University of London, Egham, UK 

syslog monitoring, each producing massive volumes of heterogeneous alerts. However, this volume often results in alert fatigue, where security analysts are overwhelmed by false positives and redundant information, reducing the effectiveness of threat detection and increasing the likelihood of missing real attacks. This issue is a critical challenge in the field of human factors engineering for cybersecurity, as human attention and working memory are inherently limited resources. When exposed to excessive, repetitive, or low-value information, individuals experience cognitive overload, diminished focus, and reduced task performance— a phenomenon that undermines both situational awareness and security response capabilities. 

Compounding the problem, many logs lack ground truth labels or consistent formats, making it challenging to train supervised models or apply traditional rule-based detection techniques. In this work, we address critical challenges in 

123 

**79** Page 2 of 11 

F. Ferazza et al. 

unsupervised alert triage by designing and validating a modular, data-agnostic framework. Our primary contributions are: 

- **Demonstration of Graph-Based Sequential Reconstruction:** We demonstrate the necessity of graph-based modeling for reconstructing coherent attack sequences fromnoisy,heterogeneouslogs.OurGNN-basedapproach significantly outperforms traditional heuristic and timebased methods in maintaining sequence cohesion and tactical continuity, a prerequisite for meaningful downstream analysis. 

- **Rigorous Comparative Analysis of Semantic Clustering:** We conduct a comparative analysis of alert clustering techniques. We show that modern transformerbased embeddings (e.g., Sentence-BERT) combined with density-based algorithms like HDBSCAN yield a substantial improvement in cluster cohesion and semantic relevance over traditional baselines like TF-IDF, which often fail to capture the nuanced semantics of cybersecurity events. This provides empirical evidence for adopting more advanced NLP techniques in this domain. 

- **Design and Validation of a Hybrid MITRE Mapping Engine:** Our most significant contribution is a novel hybrid engine for MITRE ATT&CK mapping. We systematically address the known limitations of standalone approaches: ontology-based mappers offer precision but lack robustness, while semantic classifiers generalize well but can be opaque. Our ablation studies prove that fusing these two paradigms mitigates their respective weaknesses, boosting the F1-score and consistency of technique attribution. 

- **Comprehensive Evaluation on Realistic, Large-Scale Data:** We validate our entire framework on extensive, semi-structured datasets that reflect real-world operational challenges. Unlike studies that rely on sanitized or purely synthetic data, our evaluation on noisy telemetry from NATO exercises demonstrates the framework’s robustness and practical utility in high-volume, lowsignal environments. 

While we recognize that a unified transformer-based pipeline may further improve performance in some components, this work deliberately emphasises modularity, interpretability, and operational feasibility—critical properties for real-world SOC deployment. To validate this design, we evaluate our framework on two heterogeneous and realistic datasets: the XS24 Linux syslog collection and SentinelOne EDR telemetry from the NATO CCDCOE Crossed Swords exercise. Results show a significant reduction in alert volume, semantic enrichment of raw logs through ATT&CK technique mapping, and the reconstruction of coherent multistage attack campaigns across time and hosts. 

This paper is structured as follows: Section II reviews related work. Section III details the datasets used. Section IV describes our system architecture. Sections V and VI cover thealertclusteringandMITREmappingmethodologies.Section VII describes our multi-stage attack correlation logic and presents consolidated results and evaluations. Section VIII discusses the implications, and Section IX concludes the paper. 

## **2 Background and related work** 

### **2.1 MITRE ATT&CK framework and APT detection** 

The MITRE ATT&CK framework has become a foundational tool in cyber threat analysis, offering a structured and evolving knowledge base of adversarial tactics, techniques, and procedures (TTPs) [13]. By modelling the attack lifecycle through its matrix of tactics (e.g., Credential Access, Lateral Movement) and granular techniques (e.g., T1003.002—SAM credential dumping), it enables consistent representation and analysis of threats across disparate sources [4]. In the context of APTs, MITRE ATT&CK facilitatesmappingdiscreteeventstocoordinatedattackcampaigns. APTs typically unfold over time following logical phases, and effective mapping enables defenders to assess an attack’s progress and anticipate next steps [5]. Despite its usefulness, operationalising ATT&CK remains challenging, as security logs are often unstructured, requiring a semantic gap to be bridged, especially in environments without clear ground truth [6]. 

### **2.2 Alert aggregation and clustering techniques** 

Due to the high volume of raw alerts, alert aggregation and clustering are essential strategies for reducing analyst workload [3]. Classical methods rely on simple correlation rules (e.g., source IP, timestamp), but often struggle with false positives and fail to capture semantic relationships [14]. Recent works have introduced semantic techniques, such as using TF-IDF with cosine similarity for textual comparison. Density-based algorithms like DBSCAN have proven effective in grouping related alerts without needing a predefined number of clusters, enabling the identification of emergent patterns [15]. However, static feature extraction alone can miss the temporal and contextual connections needed to identify APTs across heterogeneous data sources [7]. 

### **2.3 GNN and NLP applications in log analysis** 

Graph Neural Networks (GNNs) have recently gained traction in cybersecurity for modeling relationships in log data, where nodes represent log entries and edges represent shared 

123 

Page 3 of 11 **79** 

From logs to tactics: Unsupervised reconstruction… 

context (e.g., PIDs, hosts) [16]. Unsupervised architectures like Graph Autoencoders (GAEs) can learn latent representations that capture complex patterns, improving event grouping over traditional heuristics [8]. Complementarily, advances in NLP models like BERT [9] and GPT have facilitated the semantic understanding of unstructured logs. Pre-trained models fine-tuned on cybersecurity corpora can generate meaningful embeddings for classification, summarization, and mapping [12]. Together, GNNs and NLP models create a powerful synergy: GNNs provide structure, while NLP provides interpretation [17]. 

### **2.4 The case for an unsupervised approach** 

Many existing log analysis pipelines are based on supervised learning, which requires clean, labeled datasets. In real-world environments like SOCs, labeling is expensive, error-prone, and often infeasible, especially with noisy or adversary-generated data [10]. Supervised models are also prone to overfitting and may fail to generalize to novel threats like APTs, which use custom tooling [18]. Similarly, static rule-based systems struggle with evolving threats. While prior work has explored GNNs for log structuring and NLP for semantic analysis, a holistic, fully unsupervised framework that integrates these components with a hybrid mapping engine remains an open challenge. This paper aims to fill that gap by presenting a complete, end-to-end pipeline designed for practical deployment in realistic, data-scarce SOC environments. 

**Table 1** System Architecture—Modules and Methods. 

|Module|Method Used / Rationale|
|---|---|
|Log Normalization|Regex + JSON parsing|
|Sequence Extraction|GNN (GCN)|
|Summarization|GPT-3.5-turbo|
|Clustering|S-BERT + HDBSCAN|
|MITRE Mapping|ATT&CK-BERT + Ontology fusion|
|Multi-stage Correlation|Rule-based detection|



#### **3.1.2 SentinelOne EDR logs from CCDCOE** 

This dataset consists of 925high-qualityalerts extractedfrom the SentinelOne EDR platform telemetry collected during the exercise. An automated and reproducible filtering pipeline was applied to ensure data integrity based on completeness, temporal relevance, and event richness. No manual “cherrypicking” was performed, and all timestamps were normalized to UTC. The resulting subset maintains a rich diversity of attack tactics, making it ideal for validating our methodology. 

To aid reproducibility while respecting data sharing constraints, we provide a compact anonymized example dataset and evaluation pseudo-code in Appendix A, which allows third parties to replicate the evaluation workflow on their own or synthetic telemetry without exposing original exercise data. 

### **3.2 System architecture** 

## **3 Materials and methods** 

### **3.1 Datasets** 

Our analysis utilizes two distinct and heterogeneous datasets from the NATO Cooperative Cyber Defence Centre of Excellence (CCDCOE) Crossed Swords 2024 exercise. 

Our proposed architecture processes raw security logs into high-level, actionable meta-alerts enriched with MITRE ATT&CK semantics. The pipeline consists of parsing and normalization, graph-based sequence extraction, NLP summarization, semantic clustering, and hybrid MITRE mapping. It operates in a fully unsupervised and modular fashion. Table 1 illustrates the system architecture. 

#### **3.1.1 XS24 Linux syslog dataset** 

#### **3.2.1 Data pre-processing and canonicalization** 

The XS24 dataset is a large-scale collection of syslog entries from Linux and Windows-based environments. While believed to contain malicious behavior, the logs are effectively unlabeled, providing a realistic foundation for unsupervised methods [11]. The logs originate from multiple generators (e.g., auditd, snoopy) with varying semantics, requiring normalization before analysis. The dataset lacks consistent IOCs, making it essential to infer context from the structure of logs. 

A critical prerequisite is the transformation of heterogeneous input data into a unified, canonical data model. For unstructured Linux syslogs, we use regular expressions to isolate core semantic content. For structured SentinelOne JSON logs, we apply a schema mapping process to extract key attributes. All timestamps are normalized to UTC to enable temporal correlation. The output is a collection of flat, normalized log representations ready for analysis. 

123 

**79** Page 4 of 11 

F. Ferazza et al. 

#### **3.2.2 Graph-based sequence extraction** 

To extract coherent event sequences, we construct a directed graph _G_ = _(V , E)_ , where each node represents a log entry and edges are formed based on shared execution context (PIDs), host identifiers, and temporal proximity. We employ a Graph Autoencoder (GAE) with a two-layer GCN encoder to learn latent embeddings that capture sequential and contextual relationships. The encoder transforms node features into dense representations, and the model is optimized via a binarycross-entropylosstoreconstructtheadjacencymatrix: 



After training, connected components are extracted as candidate event sequences. This GNN-based sequencing was compared against two baselines: a PID-Window Heuristic and Session-based Chunking. GNN sequencing yielded sequences with higher internal cohesion (average cosine similarity of node embeddings within sequences: 0.72 vs 0.49), reduced fragmentation (average sequence length increased by 43%, indicating fewer broken chains), and improved tactical continuity (sequences exhibited more coherent MITRE tactic progressions, as validated through manual inspection). 

Implementation details: the GCN encoder used 64-dimensional hidden layers and 32-dimensional latent representations, trained for 200 epochs using the Adam optimiser (lr = 0 _._ 01, _β_ 1 = 0 _._ 9, _β_ 2 = 0 _._ 999). Negative samples were drawnuniformlyfromnon-edgesata1:1positive-to-negative ratio per batch. On the SentinelOne dataset, the resulting graph comprised approximately 925 nodes and 3,200 edges (after applying the temporal proximity threshold of 300 seconds for same-host events). All reported GNN metrics are averaged across three independent runs; variance in cosine similarity across runs was below 0.01, indicating stable convergence. 

#### **3.2.3 NLP-based event summarization** 

Each log sequence from the GNN is transformed into a human-readable narrative. GPT-3.5-turbo [32] is used to summarize each sequence into a concise paragraph describing the likely attacker behavior in functional terms (e.g., “The actor performed privilege escalation via modification of SUID binaries”). Prompts were fixed-format, using a zeroshot instruction template that specified role, output length, and the requirement to use MITRE-compatible terminology. Temperature was set to 0 to ensure deterministic, reproducible outputs across pipeline runs. The prompt template is included in Appendix A. Summarization stability (i.e., intra-sequence consistency across prompt variants) was not formally evaluated in this study; this constitutes a known lim- 

itation addressed in Section VIII. These summaries serve as the input for the downstream clustering and mapping modules. 

## **4 Alert clustering and Meta-alert generation** 

### **4.1 Advanced semantic clustering with transformer embeddings** 

To group semantically related event summaries into coherent meta-alerts, our framework implements a state-of-the-art clustering module. While traditional methods like TF-IDF often fail to capture deep contextual nuances, modern transformer models generate rich, context-aware vector representations. Our pipeline adopts a two-stage process: 

1. **Embedding Generation:** Each event summary is vectorized using a Sentence-BERT (S-BERT) model [19], which is fine-tuned on security-related texts. 

2. **Density-Based Clustering:** The resulting vectors are clustered using HDBSCAN [20]. We selected HDBSCAN because it does not require a pre-specified number of clusters and is robust to clusters of varying shapes and densities—a common characteristic of security alert data—making it ideal for this use case. 

### **4.2 Baseline clustering methodology: TF-IDF with DBSCAN** 

To establish a benchmark, we implemented a baseline system using Term Frequency–Inverse Document Frequency (TF-IDF) to vectorize summaries, followed by the DBSCAN clustering algorithm. DBSCAN was chosen for its ability to handle noise and discover arbitrarily shaped clusters without requiring a predefined cluster count [15]. We performed a grid search to calibrate DBSCAN’s hyperparameters ( _eps_ and _min_samples_ ) by maximizing the Silhouette Score. 

We explicitly selected DBSCAN as a representative, widely-used lexical-density baseline to contrast the lexical TF-IDF feature space with our semantic S-BERT embeddings and the adaptive density clustering of HDBSCAN. This selection clarifies the performance delta attributable to semantic embeddings rather than an exhaustive search of legacy algorithms. 

### **4.3 Meta-alert formation and event grouping** 

Each cluster is transformed into a meta-alert, representing a higher-level abstraction of attacker behavior. A metaalert is composed of a summary narrative, temporal bounds, host diversity, a dominant MITRE tactic, and a severity distribution. These meta-alerts significantly reduce analyst 

123 

Page 5 of 11 **79** 

From logs to tactics: Unsupervised reconstruction… 

workload by collapsing hundreds of low-level events into a few enriched entities. In our evaluation, 925 raw alerts were distilled into 20 meta-alerts, with 25 events (2.7%) classified as noise that did not fit into any coherent cluster. This results in analysts reviewing 20 actionable meta-alerts instead of 925 raw alerts—a reduction of approximately 97.8%. No critical events were lost in this consolidation process. For the purposes of this evaluation, a “critical” event is operationally defined as any alert for which the hybrid mapping engine assigned at least one MITRE ATT&CK technique with a confidence score exceeding 0.5. Verification was performed by cross-referencing all 925 source alerts against their assigned cluster membership; no alert satisfying this definition was found to exist exclusively among the 25 noiseclassified events. 

## **5 MITRE ATT&CK mapping** 

Mapping detected behaviors to MITRE ATT&CK is a crucial step for providing semantic context. Our system employs a hybrid mapping strategy, combining ontological reasoning and deep semantic classification to maximize accuracy and resilience. 

### **5.1 Ontology-based mapping engine** 

Our symbolic mapping engine is based on an ad-hoc cybersecurity ontology structured in OWL and populated with data from MITRE ATT&CK and Sigma rules [21]. The ontology formally models entities and their relationships, such as (Procedure)-[uses]->(Tool). The inference process involves extracting entities (e.g., ‘PowerShell’, ‘LSASS memory’) and triggering logical rules to assign a technique, such as T1003.001. This method is deterministic and transparent but relies on explicit matches, making it less effective against novel descriptions. 

### **5.2 Semantic mapping: Multi-label ATT&CK classification with ATT&CK-BERT** 

To complement the symbolic engine, we implement a semantic mapping module based on a multi-label transformer classifier. The model consists of a pre-trained ATT&CKBERT base with a dense output layer using a sigmoid activation function, making it suitable for events that map to multiple TTPs simultaneously. The model was pre-trained on a curated cybersecurity corpus including CVE descriptions, public threat intelligence reports, and official MITRE documentation [22]. It was then fine-tuned on a proprietary dataset of 9,000 labeled text segments, split into 6,200 training and 2,800 validation samples covering 45 ATT&CK techniques. We use a binary cross-entropy loss function for training. 

It is important to distinguish two separate evaluations reported in this section. First, the _intrinsic evaluation_ of the standalone ATT&CK-BERT classifier: on a manually labeled held-out test subset of approximately 800 samples drawn from the same 9,000-sample fine-tuning corpus, the classifier achieved an F1-score of 87%, Precision@3 of 91%, and produced confident predictions (above the 0.5 sigmoid threshold) for 90% of test cases; the remaining 10% received no confident single-model prediction and are handled by the hybrid fusion logic. Second, the _system-level ablation_ (Table 2) evaluates all three mapping variants— symbolic-only, semantic-only, and hybrid—on the meta-alert annotation set derived from the exercise telemetry. In this more challenging real-world evaluation, the semantic-only variant achieves a lower F1 of 0.73, because operational meta-alert descriptions are noisier and more varied than the fine-tuning corpus. The hybrid engine achieves 0.87 on this same set, which is the figure cited in the abstract as the primary system-level result. 

Precision@ _k_ (here _k_ =3)isastandardinformationretrieval metric denoting the fraction of the top- _k_ predicted labels that match ground-truth annotations [33]; it is particularly appropriate for multi-label classification tasks where an event may legitimately map to several ATT&CK techniques simultaneously. 

On a manually labeled test subset, the classifier showed strong performance: F1-score of 87%, Precision@3 of 91%, and successfully mapped 90% of test cases (the remaining 10% received no confident predictions above the 0.5 threshold and were handled by the hybrid fusion logic). This semantic approach demonstrated superior robustness and generalizability compared to the ontology-only method. 

For transparency, we note that the ATT&CK-BERT finetuning corpus was annotated by a small team of three certified senior SOC analysts, covering 45 ATT&CK techniques and split into 6,200/2,800 (train/validation). On a randomly selected overlap subset (approximately 800 samples), Fleiss’ _κ_ = 0 _._ 79 indicated substantial inter-annotator agreement. Disagreements (approximately 18% of overlapping annotations) were resolved through discussion with a third senior analyst. Metrics reported (F1 and Precision@3) are macro-averaged across techniques to compensate for class imbalance; anonymized examples of label distributions appear in Appendix A (Table 5 shows test set technique frequencies for multi-label instances, counted once per technique) to support reproducibility. 

### **5.3 Fusion strategy and technique selection** 

A central innovation is our hybrid fusion strategy, which arbitrates between the ontology and the ATT&CK-BERT classifier outputs using a confidence-based, rule-driven approach. While a simplistic union or intersection of outputs would fail 

123 

**79** Page 6 of 11 

F. Ferazza et al. 

to resolve conflicts or leverage the relative strengths of each model, our fusion logic provides a more nuanced arbitration. Techniques identified by both models are accepted with the highest confidence. A high-confidence prediction from a single model is included if it surpasses a set threshold. In cases of conflict, precedence is given to the prediction with the higher normalized confidence score. Our ablation studies validate that this strategy leads to a more accurate final mapping, resulting in a robust, precise, and reliable output [23]. 

The compact ablation on the labeled mapping test set shows symbolic-only F1= 0 _._ 68, semantic-only F1= 0 _._ 73, and hybrid F1= 0 _._ 87, underscoring the complementary strengths of explicit rules and semantic inference. Table 2 illustrates the ablation performances. 

## **6 Multi-stage attack correlation** 

To reconstruct higher-order threat scenarios like APTs, our framework implements a correlation module to link metaalerts across time, hosts, and tactics into attack chains. 

### **6.1 Rule-based campaign reconstruction** 

We use a rule-based engine to infer campaign-level behaviors from meta-alerts. The rules are derived from the MITRE ATT&CK tactic progression model and Cyber Kill Chain logic[24],whichprescribeplausiblesequencesofadversarial behavior (e.g., Credential Access → Privilege Escalation). Candidate campaigns are constructed by finding sequences of meta-alerts that follow a logical tactic transition, are linked to the same host or subnet, and occur within a predefined time window [25]. 

### **6.2 Temporal, semantic, and host-based linking** 

To improve precision, we enrich the logic with three linking criteria: temporal proximity, semantic continuity based on ATT&CK relationships, and host correlation. This process filters coincidental co-occurrences, retaining only sequences consistent with known APT workflows. 

For reproducibility we used conservative default thresholds:temporalproximity=24hoursforcross-hostcampaigns (5 minutes for same-host rapid sequences), semantic continuity = allowed ATT&CK tactic transitions via lookup table, and host correlation = shared IP/hostname/authenticated user or same /24 subnet. These parameters are operatortunable; pseudocode used in the linking logic is provided in Appendix A. 

### **6.3 Case studies on detected attack chains** 

Our framework detected three distinct multi-stage campaigns from the SentinelOne dataset: 

- **Campaign 1 (Defense Evasion** → **Impact):** Involved over 60 hosts, marked by Linux persistence followed by ransomware-likebehavior.Interpretedasbroad-spectrum test activity. 

- **Campaign 2 (Privilege Escalation** → **Defense Evasion):** Focused on a narrow host set, featuring SUID binary manipulation and obfuscated PowerShell execution. Interpreted as a strong candidate for an internal pivot stage. 

- **Campaign 3 (Defense Evasion** → **Credential Access):** Showed sequential alerts on one host, including registry tampering and LSASS memory dumping. Interpreted as a classic lateral movement preparatory phase. 

To support the claim that our system reconstructs higherorder workflows, we compared our automated reconstructions to 12 documented attack scenarios from red-team after-action reports. The red team independently documented their intended attack campaigns during the exercise debrief. Campaign matching was evaluated along three dimensions: (i) _technique overlap_ , computed as the Jaccard similarity between the set of predicted ATT&CK technique IDs and the documented ground-truth techniques; (ii) _tactic sequence ordering_ , scored as a binary correct/incorrect judgment on whether the predicted tactic transition order matched the documented sequence; and (iii) _host involvement_ , treated as a required condition requiring at least one common host identifier or /24 subnet between the automated reconstruction and the documented campaign. A campaign match was credited only when all three criteria were satisfied. On these 12 documented campaigns, the micro-averaged per-campaign matching scores were Precision = 0 _._ 71, Recall = 0 _._ 66, F1 = 0 _._ 68. In a qualitative assessment by two senior analysts, ten of the twelve campaigns (83%) were judged to correctly capture the high-level adversarial intent and sequence. Anonymized per-campaign scoring tables and representative reconstructions are included in Appendix A. 

## **7 Results and evaluation** 

### **7.1 Clustering performance and alert reduction** 

On 925 SentinelOne alerts, the system grouped events into 20 coherent meta-alerts, identifying 25 (2.7%) as noise. This achieves a reduction in analyst triage items from 925 raw alerts to 20 actionable meta-alerts—a reduction of approximately 97.8%. The clustering quality was high, with a 

123 

Page 7 of 11 **79** 

From logs to tactics: Unsupervised reconstruction… 

|**Table 2** Ablation: Mapping<br>Engine Performance|Model|Precision|Recall|F1-score|
|---|---|---|---|---|
||Symbolic-only (Ontology)|0.71|0.65|0.68|
||Semantic-only (ATT&CK-BERT)|0.76|0.70|0.73|
||Hybrid Fusion (proposed)|0.85|0.89|0.87|



Silhouette score of 0.81 for the proposed S-BERT + HDBSCAN pipeline. 

The lexical baseline TF-IDF + DBSCAN achieved Silhouette = 0 _._ 48 and produced 72 actionable meta-alert clusters (with 6 additional noise points automatically filtered), resulting in a 92.2% reduction from 925 to 72 analyst-facing items. While both methods achieve substantial alert reduction, the proposed pipeline produces fewer, more semantically coherent clusters with higher Silhouette scores. This contrast highlights the performance gain from semantic embeddings and adaptive density selection (Table 3). 

understanding the attack chain’s sequence and a tactic heatmap that gave a “strategic overview” of threats across hosts. 

Feedback was gathered through structured debrief sessions with _n_ = 8 Blue Team participants and included Likertscale usefulness ratings and free-text comments; anonymized aggregated ratings and representative paraphrased quotes are provided in Appendix A. The authors participated in liaison/analyst roles during the exercise and received this feedback through exercise control as part of the formal postrun debriefing process. 

### **7.2 MITRE coverage and mapping accuracy** 

The hybrid engine annotated meta-alerts with MITRE techniques. Key findings include: 7 of 14 tactics observed (primarily post-compromise), with Credential Access and Defense Evasion being the top tactics. Technique-level granularity was achieved in 90% of meta-alerts (18 of 20), with the remaining 2 meta-alerts receiving only tactic-level classification due to insufficient specificity in the underlying event descriptions. The fusion model achieved an F1-score of 87% against manual annotation. 

To make evaluation transparent, we used macro-averaged F1 as the primary metric to account for class imbalance and reported Fleiss’ _κ_ = 0 _._ 79 for annotation agreement on the overlap set. Manual annotations were produced by two independent senior analysts (CISSP/GCFA); disagreements (approximately 18%) were resolved with a third senior analyst. The mapping evaluation covered the 45 techniques relevant to the exercise; anonymized annotation examples and the guideline are in Appendix A. 

### **7.3 Analyst interpretability and qualitative feedback** 

## **8 Discussion** 

### **8.1 Generalizability and deployment considerations** 

The framework’s modular and data-agnostic design allows it to generalize across different log sources, formats, and infrastructure environments. Deployment in a production SOC would require integration with log ingestion pipelines, periodic retraining of the ATT&CK-BERT classifier, customization of ontology rules, and scalability tuning. Its unsupervised nature makes it particularly suited for low-visibility or data-poor environments where supervised baselines are not feasible. 

As an initial robustness probe (without exposing additional raw data), we ran stratified subsampling experiments over the SentinelOne set; these three synthetic subsets showed low variance in results (Silhouette variance ≈ 0 _._ 05; mapping F1 variance ≈ 0 _._ 03), indicating that behavior is stable across different telemetry splits. While not a substitute for independently collected datasets, these checks add evidence the pipeline is not narrowly overfit to one partition. 

### **8.2 Limitations and threats to validity** 

Qualitative feedback from the Blue Team detection cell during the NATO exercise was consistently positive [11], obtained via short semi-structured interviews. Operators reported a drastic reduction in triage effort, as the meta-alert abstraction and MITRE labels allowed them to immediately grasp an activity’s intent. The NLP-generated summaries provided rapid context and enhanced situational awareness. The most enthusiastic feedback was for the visualization tools, including a timeline plot described as “critical” for 

Despite promising results, the implementation has limitations. We discuss them below alongside potential mitigation strategies. 

- **Dependence on summarization quality:** Misleading LLM-generated summaries can misinform downstream modules. _Mitigation:_ Employing few-shot prompting with examples of high-quality summaries can better 

123 

**79** Page 8 of 11 

F. Ferazza et al. 

**Table 3** Clustering: Baseline vs Proposed 

|Method|Silhouette|Meta-alerts|Noise|Reduction|
|---|---|---|---|---|
|TF-IDF + DBSCAN (baseline)|0.48|72|6<sup>*</sup>|92.2%|
|S-BERT + HDBSCAN (proposed)|0.81|20|25<sup>*</sup>|97.8%|



*Noise points are automatically filtered; reduction calculated from actionable meta-alerts only 

guide the LLM, and an analyst feedback loop could be used to flag and correct poor summaries. 

- **LLM version and summarization stability:** This study used GPT-3.5-turbo, which, while performant at the time of evaluation, has since been superseded by more capable models (e.g., GPT-4o, LLaMA 3, Mistral). Additionally, summarization consistency across prompt variants was not formally measured. _Mitigation:_ A systematic comparative evaluation of LLM generations on summarization quality—measured by downstream clustering and mapping performance—is a concrete next step. Fixing temperature to 0 and using templated prompts partially controls for within-model variability. 

- **Sensitivity to clustering parameters:** While robust, density-based clustering performance can vary with parameter choices. _Mitigation:_ We used HDBSCAN for the proposed pipeline because it adapts to varying cluster densities; DBSCAN remains as a baseline reference. A compact parameter table and the pseudocode for the parameter sweep are included in Appendix A. 

- **Ontology brittleness:** The rule-based engine can miss paraphrased expressions. _Mitigation:_ This is addressed by our hybrid design, where the ATT&CK-BERT-based classifier provides a semantic safety net. Regular, semiautomated updates to the ontology using new threat intelligence can also reduce brittleness. 

- **Evaluation scope:** The evaluation used exercise data and internal red-team documentation; broader real-world testing is part of our planned future work. _Mitigation:_ We include anonymized illustrative examples and reproducible evaluation pseudo-code in Appendix A to allow independent validation of the pipeline logic on other data. 

As a small sensitivity check related to concerns about ontology evolution, substituting a prior ATT&CK snapshot shifted mapping F1 by _<_ 2 _._ 5% absolute, suggesting moderate robustness; a deeper longitudinal study across several ontology releases remains future work. 

### **8.3 Ethical considerations** 

The deployment of an AI-driven framework for security analysis introduces ethical considerations that must be addressed. The primary concern is the risk of over-reliance on automated outputs, where an incorrect automated summary or MITRE mapping could lead an analyst to deprioritize a genuine threat 

or waste time on a false positive. Our framework emphasizes a human-in-the-loop approach, where the generated metaalerts serve as decision-support artifacts rather than final verdicts. Furthermore, the transparency of the ontology and the provision of confidence scores from the ATT&CK-BERT model are designed to help analysts understand the system’s reasoning. Future work will explore explainable AI (XAI) techniques to further illuminate the model’s decision-making process, ensuring that analysts remain in full control and can critically assess the system’s outputs. 

### **8.4 Integration in SOC workflows** 

To be usable, the framework must augment existing analyst workflows. Proposed integration strategies include exporting meta-alerts to SIEM dashboards, triggering automated enrichment based on predicted MITRE techniques, supporting visual investigations, and integrating with incident response playbooks. Initial feedback suggests analysts found the summaries and tactic-level classification intuitively useful in reducing triage fatigue. 

## **9 Conclusion and future work** 

### **9.1 Summary of contributions** 

This work presents a modular and fully unsupervised framework for generating high-level meta-alerts from raw, heterogeneous cybersecurity telemetry and mapping them to MITRE ATT&CK techniques. Our system directly addresses two core operational challenges in modern SOCs: the overwhelming volume of low-signal alerts, and the absence of labelled data that hampers the adoption of supervised detectionmethods.Bycombiningstructurallogmodellingthrough Graph Neural Networks, semantic summarization using large language models, unsupervised clustering, and a hybrid ATT&CK-BERT ontology mapping engine, our pipeline transforms disjointed logs into enriched and interpretable security artefacts. The results, validated on real-world exercise data, show that our system can reduce the volume of analyst-facing triage items by approximately 98%, map behaviors to 7 MITRE tactics with high confidence, and reconstruct multi-stage campaigns across time and hosts. These capabilities represent a significant step toward mov- 

123 

Page 9 of 11 **79** 

From logs to tactics: Unsupervised reconstruction… 

ing SOC operations from reactive triage to context-aware, proactive threat hunting. 

### **9.2 Directions for expansion and automation** 

To further improve scalability, accuracy, and operational value, we identify several areas for future work: 

- **Clustering Robustness:** Further investigation of parameter sensitivity and evaluation on diverse datasets can help optimize HDBSCAN performance across different SOC environments. 

- **LLM Generation Comparison:** This study relied on GPT-3.5-turbo. Future work will conduct a controlled comparison of summarization quality across LLM generations (e.g., GPT-4o, LLaMA 3.1, Mistral), measuring the downstream impact on clustering coherence and MITRE mapping accuracy. 

- **Dynamic MITRE Enrichment:** Integrating RAG-style components can enable the real-time retrieval of relevant TTP definitions, improving classification transparency and analyst trust. 

- **Analyst-in-the-Loop Feedback:** Introducing a semisupervised refinement loop enables the system to evolve in tandem with SOC analyst decisions, thereby improving both relevance and precision over time. 

- **Operational Tooling:** We aim to develop a productiongrade UI layer with interactive drill-down capabilities, tactical filtering, and timeline reconstruction, aligned with modern SOC workflows. 

### **9.3 Benchmarking with CALDERA and red team data** 

Toensuretheframeworkcanoperateunderadversarial,largescale, and realistic conditions, future work will focus on comprehensive benchmarking. This includes: testing against synthetic adversary emulations using CALDERA, Atomic Red Team, and MITRE ATT&CK Evaluations; evaluating performance on real red team engagements and capturethe-flag (CTF) scenarios with partial or full ground truth; and expanding metrics to assess incident triage time, false positive reduction, and analyst recall rates during high-alertvolume periods. These steps are essential to establishing the system as a viable decision-support tool for production SOCs, capable of scaling threat detection while preserving analyst interpretability and operational control. 

## **A Anonymized example log samples and evaluation Pseudo-code** 

This appendix contains small anonymized example records and compact pseudo-code illustrating the evaluation work- 

flow and ablation experiments. The examples below are synthetic and anonymized to avoid disclosure of any sensitive telemetry. Tables 4, 5, 6 illustrate respectively an example of canonicalized records, an anonymized label distribution, and an anonymized per-campaign scoring. 

### **A.1 Example canonicalized records (synthetic / anonymized)** 

### **A.2 Anonymized label distribution (illustrative)** 

### **A.3 Evaluation and ablation pseudo-code (compact)** 

- # High-level pseudo-code to reproduce evaluation steps 

- # 1. Preprocess logs -> canonical records 

- # 2. Build graphs and extract sequences (GAE) 

- # 3. Summarize sequences (GPT-3.5-turbo, T=0, fixed template) -> text 

- # 4. Compute embeddings (S-BERT) for summaries 

- # 5. Cluster embeddings with HDBSCAN (proposed) and DBSCAN (baseline) 

- # 6. Map clusters to MITRE: 

   - (a) Ontology-only, 

- # 

   - (b) ATT&CK-BERT-only, 

- # 

   - (c) Hybrid 

- # 7. Evaluate mapping vs annotated labels: compute macro-F1, P@k 

- # 8. Evaluate campaign reconstruction: # technique overlap (Jaccard) 

   - + ordering score + host match 

- # 9. Produce tables and per-campaign anonymized scores 

### **A.4 GPT-3.5-turbo summarization prompt template (anonymized)** 

The following template was used verbatim for all summarizations. Temperature was fixed to 0; no other sampling parameters were varied. 

System: You are a senior SOC analyst. Summarize the following sequence of security events in 2-3 sentences. Use MITRE ATT&CK terminology where appropriate. Do not speculate beyond what the events directly indicate. 

123 

**79** Page 10 of 11 

F. Ferazza et al. 

**Table 4** Canonicalized example records (anonymized, synthetic) 

|event_id|timestamp_utc|source_type|parsed_command / raw_message (truncated)|
|---|---|---|---|
|E0001|2024-06-12T08:23:12Z|sentinelone_edr|“ProcessCreate: cmd=\’powershell -EncodedCommand_. . ._\”|
|E0002|2024-06-12T08:24:05Z|linux_syslog|“SUDO: user=root; cmd=/bin/chmod +s /usr/bin/example”|
|E0003|2024-06-12T08:28:47Z|sentinelone_edr|“LSASS memory read attempt; process=svchost.exe”|



**Table 5** Illustrative label counts used in mapping evaluation (anonymized) 

|Technique (anonymized label)|Count|
|---|---|
|Credential Dump (T1003.x)|312|
|Defense Evasion (T1070/T1562)|275|
|Privilege Escalation (T1548/T1068)|143|
|Impact-related actions (T1486)|121|
|Other (aggregate)|574|



**Table 6** Per-campaign illustrative scoring (anonymized) 

|Campaign ID|Precision|Recall|F1|
|---|---|---|---|
|CAMP-A (synthetic)|0.75|0.72|0.74|
|CAMP-B (synthetic)|0.69|0.63|0.66|
|…|…|…|…|
|Aggregate (12 campaigns)|0.71|0.66|0.68|



**Dual Publication** The results/data/figures in this manuscript have not been published elsewhere, nor are they under consideration by another publisher. 

**Third Party Material** All of the material is owned by the authors and/or no permissions are required. 

**Open Access** This article is licensed under a Creative Commons Attribution 4.0 International License, which permits use, sharing, adaptation, distribution and reproduction in any medium or format, as long as you give appropriate credit to the original author(s) and the source, provide a link to the Creative Commons licence, and indicate if changes were made. The images or other third party material in this article are included in the article’s Creative Commons licence, unless indicated otherwise in a credit line to the material. If material is not included in the article’s Creative Commons licence and your intended use is not permitted by statutory regulation or exceeds the permitteduse,youwillneedtoobtainpermissiondirectlyfromthecopyright holder. To view a copy of this licence, visit http://creativecomm ons.org/licenses/by/4.0/. 

## **References** 

User: [Canonicalized event sequence as JSON list] 

### **A.5 Anonymized example per-campaign scoring (synthetic)** 

**Acknowledgements** The authors would like to acknowledge the organizers and participants of the NATO CCDCOE Crossed Swords 2024 exercise for providing the data and operational environment for this research. 

**Author Contributions** F.F. and C.M. are the main contributors, R.O., K.M.,R.L. did supervision and editing. 

**Funding** This research did not receive funding. 

**Data Availability** The datasets used for this study are not publicly available due to their NATO classified nature. Data access requests should be directedtothecorrespondingauthor(Francesco.Ferazza.2021@live.rhul. ac.uk) and will be evaluated upon reasonable request, subject to the necessary security clearances, institutional protocols, and possible redactions. 

### **Declarations** 

**Competing Interests** The authors declare no competing interests. 

1. CrowdStrike, Advanced Persistent Threats (APT) Explained, (2024). [Online]. Available: https://www.crowdstrike.com/en-us/ cybersecurity-101/threat-intelligence/advanced-persistent-threatapt/. Accessed: May 2025 

2. Wang, X., Yang, X., Liang, X., Zhang, X., Zhang, W., Gong, X.: Combating alert fatigue with AlertPro: Context-aware alert prioritization using reinforcement learning for multi-step attack detection. Computers & Security **137** , 103583 (2024) 

3. Tariq, S., Chhetri, M.B., Nepal, S., Paris, C.: Alert fatigue in security operations centres: Research challenges and opportunities. ACM Comput. Surv. **57** (9), 1–38 (2025) 

4. MITRE Corporation, “MITRE ATT&CK,” Accessed: May 2025. [Online]. Available: https://attack.mitre.org/ 

5. Khosravi, M., Tork Ladani, B.: Alerts correlation and causal analysis for APT based cyber attack detection. IEEE Access **8** , 162642–162656 (2020) 

6. Wei, S., et al.: “Fusing security alerts improves cyber-security: An alert normalization framework for heterogeneous devices,” IEEE Transactions on Dependable and Secure Computing, (2023) 

7. Wang, T., et al.: Identifying truly suspicious events and false alarms based on alert graph, In: Proc. IEEE Int. Conf, Communications (ICC) (2020) 

8. Kipf, T.N., Welling, M.: Variational graph auto-encoders, arXiv preprint arXiv:1611.07308 (2016) 

9. Devlin, J., et al.: BERT: Pre-training of deep bidirectional transformers for language understanding, arXiv preprint arXiv:1810.04805 (2018) 

10. IBM and Morning Consult, Global Security Operations Center Study Results, (2023). [Online]. Available: https://www.ibm.com/ downloads/cas/5AEDAOJN. Accessed: May 2025 

123 

Page 11 of 11 **79** 

From logs to tactics: Unsupervised reconstruction… 

11. NATO Cooperative Cyber Defence Centre of Excellence, Crossed Swords, (2024). [Online]. Available: https://ccdcoe.org/exercises/ crossed-swords/. Accessed: May 2025 

12. Ranade, P., Piplai, A., Joshi, A., Finin, T.: Cybert: contextualized embeddings for the cybersecurity domain. In: 2021 IEEE International Conference on Big Data (Big Data), pp. 3334–3342. IEEE (2021) 

13. Strom, B.E., Applebaum, A., Miller, D.P., Nickels, K.C., Pennington, A.G., Thomas, C.B.: “MITRE ATT&CK: Design and philosophy,” MITRE Corp., Tech. Rep., (2018) 

14. Piet, J., Fang, V., Khare, R., Coull, S., Paxson, V., Popa, R.A., Wagner, D.: Semantic-aware parsing for security logs. arXiv [Internet] (2025). arXiv:2506.17512. Available from: https://arxiv.org/abs/ 2506.17512. Cited 7 Apr 2026 

15. Ester, M., Kriegel, H.-P., Sander, J., Xu, X.: A density-based algorithm for discovering clusters in large spatial databases with noise, In: Proc. 2nd Int. Conf. Knowledge Discovery and Data Mining (KDD), pp. 226–231 (1996) 

16. Sozol, M.S., Saki, G.M., Rahman, M.M.: Anomaly detection in cybersecurity with graph-based approaches. Int. J. Sci. Res. Eng. Manag. (IJSREM) 8(8), 1–7 (2024) 

17. Bilot, T., El Madhoun, N., Al Agha, K., Zouaoui, A.: Graph neural networks for intrusion detection: a survey. IEEE Access 11, 49114– 49139 (2023) 

18. Ahmed, M., Mahmood, A.N., Islam, M.R.: A survey of anomaly detection techniques in financial domain. Futur. Gener. Comput. Syst. **55** , 278–288 (2016) 

19. Reimers, N., Gurevych, I.: Sentence-BERT: Sentence embeddings using siamese BERT-networks, In: Proc. Conf. Empirical Methods in Natural Language Processing (EMNLP), pp. 3982–3992 (2019) 

20. McInnes, L., Healy, J., Astels, S.: hdbscan: Hierarchical density based clustering. Journal of Open Source Software **2** (11), 205 (2017) 

21. Syed, Z., Padia, A., Finin, T.: UCO: A unified cybersecurity ontology, In: Proc. AAAI Workshop on Artificial Intelligence for Cyber Security (2016) 

22. Aghaei, E., Niu, X., Shadid, W., Al-Shaer, E.: SecureBERT: a domain-specific language model for cybersecurity. In: Li, F., Liang, K., Lin, Z., Katsikas, S.K. (eds.) Security and Privacy in Communication Networks. Secure Comm 2022. Lecture Notes of the Institute for Computer Sciences, Social Informatics and Telecommunications Engineering, vol. 462. Springer, Cham. https://doi. org/10.1007/978-3-031-25538-0_3 (2023) 

23. Piplai, A., Mittal, S., Joshi, A., Finin, T., Holt, J., Zak, R.: Creating cybersecurity knowledge graphs from malware after action reports. IEEE Access **8** , 211691–211703 (2020) 

24. Hutchins, E.M., Cloppert, M.J., Amin, R.M.: Intelligence-driven computer network defense informed by analysis of adversary campaigns and intrusion kill chains. Leading Issues in Information Warfare and Security Research **1** , 80 (2011) 

25. Mirheidari, S.A., Arshad, S., Jalili, R.: Alert correlation algorithms: A survey and taxonomy. In: International Symposium on Cyberspace Safety and Security, pp. 183–197. Springer International Publishing, Cham (2013) 

26. Davies, T.: Topological data analysis for anomaly detection in hostbased logs, arXiv preprint arXiv:2204.07074 (2022) 

27. Huang, Y., Feng, X., Feng, X., Qin, B.: The factual inconsistency problem in abstractive text summarization: A survey, arXiv preprint arXiv:2104.14839 (2021) 

28. Sharma, A.R.: How MITRE ATT&CK alignment supercharges your SIEM, Securonix Blog (2025) 

29. Albanese, M.: et al.: Towards AI-driven human-machine coteaming for adaptive and agile cyber security operation centers, arXiv preprint arXiv:2501.01234, (2025) 

30. MITRE Corporation, CALDERA: Automated Adversary EmulationSystem,(2024).[Online].Available: https://caldera.mitre.org/. Accessed: May 2025 

31. Du, M., et al.: DeepLog: Anomaly detection and diagnosis from system logs through deep learning, In: Proc. ACM SIGSAC Conf. Computer and Communications Security, pp. 1285–1298 (2017) 

32. OpenAI, GPT-3.5-turbo model card, (2023). [Online]. Available: https://platform.openai.com/docs/models/gpt-3-5-turbo. Accessed: May 2025 

33. Manning, C.D., Raghavan, P., Schütze, H.: Introduction to Information Retrieval. Cambridge University Press, ch. 8 (2008) (Evaluation in information retrieval) 

**Publisher’s Note** Springer Nature remains neutral with regard to jurisdictional claims in published maps and institutional affiliations. 

123 

