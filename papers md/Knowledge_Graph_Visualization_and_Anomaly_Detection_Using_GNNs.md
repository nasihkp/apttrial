Computer Networks 288 (2026) 112632 



Contents lists available at ScienceDirect 

# Computer Networks 

journal homepage: www.elsevier.com/locate/comnet 



## Knowledge graph visualization and anomaly detection from cyber threat intelligence dataset using graph neural networks based methods 

Ali Yilmaz<sup>a</sup> , Resul Das<sup>b,c</sup> ,<sup>∗</sup> , Mehmet Ozdem d , Berk Canberk<sup>c</sup> 

a _Van Yuzuncu Yil University, Computer Science Research And Application Center, Van, Turkiye_ 

b _Firat University, Faculty of Technology, Department of Software Engineering, 23119, Elazig, Turkiye_ 

c _Edinburgh Napier University, School of Computing, Engineering and The Built Environment, Department of Cyber Security and System Engineering, Edinburgh, Scotland, UK_ 

d _Turk Telekom, Aydinlikevler, Ankara, Turkiye_ 

### A R T I C L E I N F O 

### A B S T R A C T 

_Keywords:_ Knowledge graph visualization Graph neural networks Anomaly detection Comparative analysis Graph visualization DDoS detection 

The growing scale and sophistication of modern cyberattacks demand anomaly detection models capable of capturing non-Euclidean and highly relational patterns embedded within network traffic. This study introduces a unified and interpretable graph-based framework for network anomaly detection that systematically evaluates four representative graph neural network (GNN) architectures — GCN, GAT, GIN, and GraphSAGE — under identical experimental settings. Using the UNSW-NB15 benchmark dataset, IP addresses are modeled as graph nodes and communication flows are modeled as directed edges with flow-level attributes, enabling the extraction of structural attack behaviors. To provide complementary external robustness evidence, the framework is additionally evaluated on CIC-DDoS2019 under a DDoS-focused scenario and on a CSE-CIC-IDS2018-based diverse intrusion dataset under a broader multi-attack benchmark setting. A consistent preprocessing pipeline, standardized model configuration, 5-fold stratified cross-validation, statistical validation, and sensitivity analysis are employed to evaluate robustness and stability. Experimental results show that GIN and GraphSAGE achieve the strongest performance, with F1-scores of 0.9693 ± 0.0007 and 0.9721 ± 0.0006, respectively, and ROC-AUC values above 0.99 across folds. In addition, computational profiling is conducted to analyze inference latency, throughput, the number of trainable parameters, and GPU memory usage, highlighting the scalability advantages of aggregation-based models. Beyond quantitative evaluation, a dynamic D3.js-based attack topology visualization is presented to reveal attacker–target interactions, dominant attack categories, and high-frequency communication paths. Overall, this study provides a reproducible benchmarking and visualization framework for interpretable and structurally aware graph-based cybersecurity analytics. 

#### **1. Introduction** 

Modern cyberattacks continue to grow in scale and sophistication, making traditional anomaly detection techniques increasingly inadequate. Conventional machine learning and deep learning models are primarily designed for Euclidean or tabular data representations and may therefore be limited in capturing irregular topology, relational dependencies, and inter-object interactions that naturally arise in network traffic. Graph-based learning methods address this limitation by explicitly modeling entities and their relationships through message passing and neighborhood aggregation mechanisms [1,2]. As a result, there is a growing need for detection frameworks that model interactions between network entities more effectively. Graph Neural Networks (GNNs) have emerged as strong candidates for this purpose because 

they learn from both node attributes and the structural relationships encoded within network graphs. 

Recent studies have demonstrated the effectiveness of GNN architectures, including GCN, GAT, GIN, and GraphSAGE, in cybersecurity tasks such as intrusion detection, anomaly detection, malware analysis, and attack behavior modeling. These architectures can exploit both node-level attributes and structural dependencies, making them suitable for modeling complex communication patterns in network traffic [2–4]. These models leverage neighborhood aggregation mechanisms to represent complex interaction patterns and have achieved strong performance across multiple datasets. Despite these advancements, clear guidance on selecting the most suitable GNN architecture 

∗ Corresponding author. 

_E-mail addresses:_ aliyilmaz@yyu.edu.tr (A. Yilmaz), rdas@firat.edu.tr (R. Das), mehmet.ozdem@turktelekom.com.tr (M. Ozdem), b.canberk@napier.ac.uk (B. Canberk). 

https://doi.org/10.1016/j.comnet.2026.112632 

Received 17 December 2025; Received in revised form 26 July 2026; Accepted 28 July 2026 

Available online 7 August 2026 

1389-1286/© 2026 The Authors. Published by Elsevier B.V. This is an open access article under the CC BY-NC-ND license ( http://creativecommons.org/licenses/bync-nd/4.0/ ). 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

under consistent conditions remains limited. Existing research typically evaluates these models in heterogeneous experimental settings, making comparisons difficult and reducing the interpretability of their performance differences. Furthermore, while GNN-based anomaly detection has gained traction, most studies focus solely on quantitative metrics. The structural nature of attacks — such as how malicious flows propagate or how attacker–target relationships form — remains underexplored from a visual and interpretative perspective. This gap highlights the need for a unified framework that combines robust performance evaluation with a qualitative understanding of attack behaviors. Motivated by these challenges, this study provides a systematic comparison of four widely used GNN architectures under fully standardized experimental conditions. A unified preprocessing pipeline, identical two-layer model architectures, and 5-fold stratified crossvalidation are employed to ensure methodological fairness. Network flows from the UNSW-NB15 dataset are represented as nodes, and edges are created based on shared IP-level communication, enabling the extraction of meaningful structural patterns. Since graph construction may become a bottleneck at scale, a simple and reproducible graph construction strategy is adopted in this benchmarking framework [5]. Comprehensive analyses of contemporary cyber threats emphasize the urgent need for proactive problem-solving techniques and intelligent tools to safeguard digital domains [6]. Addressing this need, this study introduces a structure-aligned framework that employs GNN for knowledge graph visualization and anomaly detection within cyber threat intelligence datasets. Additionally, a dynamic D3.js-based attack visualization is introduced to reveal attacker–target relationships and dominant attack types, providing an intuitive layer of interpretability that complements the quantitative evaluation. 

#### _1.1. Problem definition_ 

Anomaly detection plays a critical role in fields such as cybersecurity, network monitoring, and fraud analysis, where identifying irregular behaviors is essential for preventing widespread damage. Traditional detection techniques, including statistical analysis, signaturebased methods, and classical machine learning models, often fall short in today’s large-scale and structurally complex network environments, as they assume tabular Euclidean data and struggle to capture longterm dependencies or interactions between communicating entities [7]. Real network behavior is inherently graph-structured, with nodes and edges representing entities and their contextual relationships, with anomalies appearing as deviations in communication frequency, protocol usage, latency, data volume, or unexpected interactions among rarely connected nodes. Modeling such deviations requires expressive, topology-aware learning approaches — particularly Graph Neural Networks (GNNs) — to capture the structural dependencies embedded in network traffic. However, the literature lacks a clear understanding of how various GNN architectures perform under identical experimental conditions, and research examining structural factors influencing their performance remains limited. Additionally, the absence of intuitive and scalable visualization techniques for representing attacker–target relationships in graph-structured data poses challenges for interpreting anomaly patterns effectively, underscoring the need for rigorous comparative analyses and improved interpretability tools. 

#### _1.2. Main contributions_ 

The novelty of this study lies in presenting a unified and interpretable benchmarking framework for GNN-based intrusion detection, rather than proposing a new GNN architecture. Unlike studies that focus on a single model or rely on heterogeneous experimental settings, this work evaluates GCN, GAT, GIN, and GraphSAGE under a common preprocessing pipeline, graph construction strategy, hyperparameter settings, and evaluation protocol. The framework is further supported by stratified cross-validation, sensitivity analysis, external 

validation on CIC-DDoS2019, and a D3.js-based attack topology visualization module. Therefore, the main contribution of this study is a reproducible benchmarking and visualization framework that enables fair model comparison, robustness assessment, and interpretable cybersecurity analysis. 

Accordingly, the main contributions are summarized as follows: 

- **Unified GNN benchmarking:** Four representative graph neural network (GNN) architectures — GCN, GAT, GIN, and GraphSAGE — are systematically evaluated under the same preprocessing pipeline, graph construction strategy, hyperparameter configuration, and evaluation protocol. This unified setting enables a fair comparison and allows performance differences to be attributed more reliably to architectural characteristics. 

- **Robust evaluation and sensitivity analysis:** Both standard train–test evaluation and _𝑘_ -fold cross-validation procedures are employed to assess model generalization, stability, and robustness. In addition, sensitivity analyses are conducted to examine the influence of key architectural and training parameters, including layer depth, hidden dimension size, dropout rate, and learning-rate scheduling. 

- **External robustness validation:** In addition to the primary UNSW-NB15 benchmark, the evaluated models are tested on CICDDoS2019 as a DDoS-focused complementary validation dataset and on a CSE-CIC-IDS2018-based diverse intrusion dataset as broader benchmark robustness evidence. These additional experiments are intended to strengthen external validation under different traffic-generation processes and attack mixtures, rather than to claim complete generalization across all cyberattack families. 

- **Interpretable graph visualization:** A dynamic D3.js-based visualization module is developed to illustrate attacker–target relationships and dominant attack types. This visualization converts model-confirmed anomalies into interactive graph representations, thereby enhancing situational awareness and supporting the interpretation of attack propagation patterns. 

- **Architecture-level performance insights:** The experimental results provide comparative insights into the strengths of different GNN architectures. In particular, GIN and GraphSAGE exhibit strong performance across multiple evaluation settings, highlighting the importance of expressive neighborhood aggregation in capturing subtle structural patterns of network anomalies. 

#### _1.3. Motivation_ 

With cyber threats increasingly stealthy and complex, there is a growing need for detection models that can understand the structural and temporal characteristics of traffic data. GNNs have emerged as a promising approach due to their capacity to model relational information in graphs. However, practitioners lack clear guidance on which GNN variant should be employed under different constraints. In addition, little work has been done to combine quantitative performance with qualitative visual analysis in anomaly detection. This study is motivated by the need to close that gap—providing both a rigorous performance comparison and an intuitive understanding of attack propagation patterns. Our findings also emphasize the importance of robust evaluation strategies, as _𝑘_ -fold cross-validation consistently improves detection performance across all tested GNN architectures, revealing hidden generalization capabilities that standard training may overlook. 

#### _1.4. Limitations and challenges_ 

While this study provides valuable insights into the effectiveness and interpretability of GNN-based anomaly detection, several limitations should be acknowledged. First, although UNSW-NB15 is a widely used benchmark dataset, it may not fully reflect the scale, diversity, 

2 

_Computer Networks 288 (2026) 112632_ 

###### _A. Yilmaz et al._ 

and temporal variability of real-world operational network environments. To partially address this concern, we additionally evaluated the proposed models on the CIC-DDoS2019 dataset, which provides a DDoS-focused benchmark with different traffic characteristics. The results on CIC-DDoS2019 demonstrate that the proposed graph-based models also achieve strong performance on an external dataset. Nevertheless, further validation on larger, more heterogeneous, and real-time traffic datasets would provide a more comprehensive assessment of generalization. Second, the current graph construction strategy treats network traffic as a static, aggregated communication graph. This design was adopted to model structural relationships among network flows and IP-level interactions and to ensure a controlled comparison among the evaluated GNN architectures. Although temporal characteristics are partially captured through flow-level attributes such as duration, inter-packet timing, jitter, and traffic-rate statistics, the current formulation does not explicitly model graph evolution across consecutive time windows. Therefore, temporal or dynamic graph modeling remains an important direction for future research. Third, certain GNN architectures may exhibit computational and memory constraints when applied to large-scale graphs, particularly in full-batch or densely connected graph settings. Although mini-batch neighbor sampling helps reduce computational overhead, scalability may still become challenging in high-volume, real-time intrusion detection scenarios. In addition, the latency results reported in this study do not yet demonstrate compliance with strict sub-second operational IDS requirements, since they are obtained under batch-mode inference on benchmark data. Future work will therefore focus on streaming deployment, online graph updates, and latency-constrained inference under real network traffic rates. Despite these limitations, the proposed dynamic D3.js visualization successfully maps attacker–target relationships and highlights dominant attack types, providing an interpretive layer that complements the quantitative results. Future work may also extend the proposed framework toward interdependent, spatial, and multi-layer graph representations. Such models could support the analysis of cascading dependencies, supply-node failures, geographically localized attacks, and infrastructure-level robustness beyond the static traffic-graph setting considered in this study [8]. Future work may also explore heterophilyaware message-passing strategies, such as two-way flow or disentangled aggregation schemes, to better separate benign–malicious or attacker– victim interaction patterns in graphs where neighboring nodes may not share similar behavioral labels [9,10]. 

The current study does not provide certified adversarial robustness guarantees. The experiments are conducted under a standard supervised benchmark setting, where the feature extraction pipeline, graph construction process, training data, and model parameters are assumed to be trusted. Under a stronger adaptive threat model, a white-box or gray-box attacker could perturb flow-level attributes or manipulate graph connectivity to reduce the detection confidence of the GNN. Such attacks may influence both node/edge representations and the message-passing process. Therefore, the reported results should be interpreted as benchmark-level robustness under clean evaluation conditions, rather than as adversarial robustness. Future work will investigate gradient-based evasion, topology-aware perturbation attacks, adversarial training, and black-box adaptive attack settings. 

#### _1.5. Paper organization_ 

This paper is organized as shown in Fig. 1. Section 1 introduces the motivation and objectives of the study, highlighting the limitations of traditional anomaly detection methods and the potential of GNNs in network security contexts. It also outlines the scope of the research and key contributions. Section 2 reviews related work on GNN-based anomaly detection. Section 3 describes the dataset, the preprocessing pipeline, and the model architectures. Section 4 presents experimental results, including both quantitative metrics and graph visualizations. Finally, Section 5 concludes the study and outlines the directions for future work. 



**Fig. 1.** Organization of the paper 

#### **2. Related works** 

In recent years, deep learning models capable of learning from graph-structured data have become a prominent area of research, particularly in applications involving networked data. In this context, graph neural networks (GNNs) have emerged as powerful approaches that perform learning by considering both the features of individual nodes and the structural relationships between them. Core GNN architectures include the Graph Convolutional Network (GCN), GraphSAGE, and the Graph Attention Network (GAT). For instance, the GraphSAGE model aggregates the features of randomly sampled neighbors to update each node’s representation. GAT, on the other hand, employs an attention mechanism during message passing to assign different weights to neighboring nodes, enabling the learning of more distinctive and meaningful representations. These architectures provide effective tools for modeling complex interaction patterns, particularly in domains such as cybersecurity, network traffic analysis, and fraud detection, where inter-node relationships play a critical role. This study presents a systematic review of recent research over the past decade that employs GCN-, GraphSAGE-, and GAT-based methods within these application areas. 

W. Lo et al. proposed E-GraphSAGE, a GNN-based system for intrusion detection in IoT networks. A variation of the GraphSAGE model is used to overcome the limitations of traditional NIDS methods. The model represents network flow data as nodes and edges in graph form, while using flow properties as node and source IP relationships as edge information. In the experiments conducted on four different IoT attack 

3 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

datasets (e.g., NetFlow versions of BoT-IoT, ToN-IoT), E-GraphSAGE showed the highest performance compared to existing methods. High accuracy and F1 Scores were achieved in both binary and multi-class classification. The main contribution is the successful application of the GraphSAGE approach, which also takes edge properties into account, to IoT NIDS problems [11]. 

FN-GNN, a flow-based Network Intrusion Detection System (NIDS), was proposed by H. Tran and M. Park, [12]. In this model, each network flow is represented as a node based on its flow characteristics, while flows that share the same source or destination IP address are connected via edges. The architecture combines the GCN and GraphSAGE (specifically SAGEConv) layers. Experiments conducted on two standard IDS datasets, CIC-IDS2017 and UNSW-NB15, demonstrated that FN-GNN significantly outperformed previous methods, achieving remarkably high accuracy rates of 99.76% and 98.65%, respectively. These results indicate that FN-GNN provides a scalable and highperforming solution for detecting attacks based on flow-level network data [12]. 

BS-GAT is a Network Intrusion Detection System (NIDS) model designed by Y. Wang et al. for IoT devices operating in edge-computing environments. The model adopts a graph construction strategy based on behavioral similarity, utilizing the Graph Attention Network (GAT) architecture. In this setting, data flows are represented as nodes, while behavioral rules between flows serve as edges, with edge weights dynamically adjusted according to behavioral similarity. Binary classification experiments conducted on recent NetFlow-based datasets such as NF-BoT-IoT-v2 and NF-ToN-IoT-v2 show that BS-GAT achieves over 99% in key performance metrics, including error rate, sensitivity, specificity, and accuracy. In multi-class scenarios, overall accuracy exceeds 93%. These results indicate that the proposed BS-GAT method significantly outperforms existing approaches, particularly in complex multi-class intrusion detection settings [13]. 

CAGN-GAT Fusion, a hybrid model that combines a contrastive attentive neural network of graphs and a GAT, was proposed by M. A. Jahin et al. and presented at the IEA/AIE 2025 conference. The model integrates context-aware features from both nodes and edges with attention mechanisms to enhance representation learning. Its performance was evaluated on four benchmark intrusion detection datasets: KDD-CUP99, NSL-KDD, UNSW-NB15, and CIC-IDS2017, all of which contain relatively limited numbers of labeled samples. The results demonstrate that CAGN-GAT Fusion consistently achieves competitive accuracy, sensitivity, and F1 scores across all datasets. The study particularly highlights the reliability of the model in data-scarce environments, emphasizing the robustness of GNN-based methods in such scenarios [4]. 

ASA-GNN, an Adaptive Sampling and aggregate graph neural network model, was proposed by Y. Tian et al. for the detection of financial fraud. The model enhances representation learning by sampling neighbors with similar profiles to fraudulent transactions and mitigates camouflage effects using a neighborhood diversity metric based on entropy. Extensive experiments on three real-world financial transaction datasets show that ASA-GNN outperforms both traditional methods and earlier GNN-based models. It particularly distinguishes fraudulent transactions more effectively than generic GNNs such as GCN and GraphSAGE [25]. Heterogeneous GAT, proposed by Q. Sha et al. is a graph-based model for credit card fraud detection that incorporates multiple node types (users, merchants, transactions). The model constructs a heterogeneous graph based on user-transaction-merchant interactions and applies GAT to assign dynamic attention weights to different relation types. A time-delay mechanism captures temporal fraud patterns, while SMOTE and cost-sensitive learning address class imbalance. Experiments on the IEEE-CIS Fraud Detection dataset show that the method outperforms GCN, GAT, and GraphSAGE baselines in both accuracy and AUC [26]. Bitcoin GCN, introduced by A. Asiri and K. Somasundaram, applies a GCN to detect illicit transactions in Bitcoin networks. Using the elliptic dataset, transactions are classified as licit 

or illicit. The proposed GCN model achieves 98. 5% precision and 0.9441 AUC, outperforming previous approaches. This demonstrates the effectiveness of GCNs in the detection of cryptocurrency fraud [27]. 

L. Yin et al. proposed a scalable IoT botnet detection framework that integrates GraphSAINT-based subgraph sampling with a deep Graph Isomorphism Network (GIN). By leveraging the expressive power of GIN across multiple layers, the model effectively captures the complex topologies of diverse IoT botnet structures, including C2, P2P, and Chord architectures. The approach demonstrated superior performance compared to several baseline GNN models, highlighting its effectiveness in large-scale graph-based anomaly detection. This study underscores the potential of combining subgraph sampling with powerful GNN architectures for accurate and efficient botnet detection in dynamic IoT environments [28]. 

Y. Zhao et al. introduced AD-FG, a federated Graph Neural Network framework designed for cross-domain IoT anomaly detection. The model employs a dual-branch encoder architecture, combining a GCNbased structural encoder with a GIN-based attribute encoder to capture both topological and semantic flow information. Leveraging federated learning, AD-FG shares only structural embeddings among clients, ensuring attribute-level privacy. Experimental results on heterogeneous IoT traffic demonstrate that AD-FG outperforms existing federated and GNN-based methods, indicating the effectiveness of incorporating GIN into privacy-preserving, distributed anomaly detection systems [29]. A. Jobe et al. proposed a hybrid anomaly detection framework for industrial IoT power grids by integrating temporal modeling with graph-based structural learning. Their approach combines an LSTM for processing sensor time-series data with GIN-based node embeddings that capture spatial relationships among grid components. By training separate GINs for different node types, the model mitigates overfitting. The results on simulated power grid scenarios highlight the benefit of incorporating GIN, demonstrating enhanced anomaly detection performance when structural graph information is fused with temporal dynamics [30]. 

Recent studies in Advanced Persistent Threat (APT) detection have demonstrated the utility of GINs in modeling complex attack behaviors. Do et al. show that GIN outperforms GCN and DGCNN in detecting APT malware through graph representations. Additionally, GINs have been incorporated into spatio-temporal and provenance-based detection frameworks, including GHUNTER proposed by Z. Cheng et al. which leverages GIN embeddings to trace multi-stage attack sequences. These findings highlight GIN’s capacity to capture nuanced structural patterns in system-level graphs, making it well-suited for identifying sophisticated and stealthy cyber threats [31]. 

GNNs have emerged as a particularly powerful paradigm for cybersecurity anomaly detection, as demonstrated by the diverse studies summarized in Table 1. By explicitly modeling network traffic and host interactions as graph structures, GNN-based approaches leverage message passing, attention mechanisms, and multilayer aggregation to capture both local and global patterns of malicious behavior. Architectures like GAT highlight spatial correlations among nodes, while sampling and aggregation methods (e.g., GraphSAGE) ensure scalability on large log and flow datasets. Hybrid models that fuse convolutional and attention layers further enhance detection accuracy, and temporal extensions operating on dynamic multigraphs excel at tracing evolving attack campaigns. Collectively, the metrics and use cases presented in Table 1 underscore the flexibility, robustness, and high performance of GNNs in identifying anomalies across conventional enterprise networks, IoT environments, and industrial control systems. GNNs thus stand out for their ability to generalize across heterogeneous data sources and maintain state-of-the-art detection rates without reliance on hand-crafted features. These recent studies demonstrate the successful application of GNN architectures — particularly GCN, GraphSAGE, GIN, and GAT — in cybersecurity and fraud detection tasks. GraphSAGE and GIN-based models have demonstrated high performance in IoT attack detection by leveraging edge features, while GAT-based 

4 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

**Table 1** 

Recent GNN-based anomaly detection studies in cybersecurity. 

|Ref.|Objective|GNN Model/Architecture|Dataset(s)|Metrics|Results/Highlights|
|---|---|---|---|---|---|
|[14]|Advanced IoT intrusion<br>detection using attention to<br>capture spatial correlations|Graph Attention Network<br>(GAT)|NSL-KDD|Accuracy, Precision,<br>Recall, F1 (binary &<br>multi)|Binary: 98.0% (F1≈98%);<br>Multi-class: 99.2%|
|[15]|IIoT IDS with mini-batch<br>sampling & temporal<br>correlation|Custom GIDS (multi-edged<br>temporal GNN)|BoT-IoT,<br>ACI-IoT-2023,<br>OPCUA|Accuracy, F1<br>(binary & multi)|Binary: 93.6%–100%<br>(F1≈94%–100%); Multi:<br>92.3%–99.9%<br>(F1≈94%–99.9%)|
|[16]|Optimize IoT intrusion<br>detection via attribute-graphs|GraphSAGE (variants) vs.<br>GCN, GAT|NF-BoT-IoT,<br>NF-ToN-IoT|F1-Score (binary &<br>multi)|GraphSAGE best: Binary<br>F1≈0.985–1.000; Multi<br>F1≈0.628–0.840|
|[17]|SDN-based DoS anomaly<br>detection with GNN<br>embeddings|GraphSAGE+ classical<br>detectors (HBOS, CBLOF,<br>PCA)|SDN traffic (DoS)|Accuracy, Detection<br>Rate|Accuracy 97%; Detection<br>rate 94%|
|[7]|Anomaly detection from<br>firewall Logs|GraphSAGE, GCN, GAT,<br>GCN+GAT|Firewall logs|Accuracy, Precision,<br>Recall, F1|99% accuracy, 98% F1|
|[18]|Anomaly detection in network<br>traffic via cross-domain<br>federated graph representation<br>learning.|GCN, GIN|CIC-IDS2017|Accuracy, Precision,<br>Recall, F1|The proposed method<br>achieved the highest F1<br>(79.19%) 99.5% F1-score|
|[19]|Advanced dynamic<br>graph-based malware<br>detection|GCN, GAT, GIN, and a<br>hybrid Transformer-based<br>GNN|Large proprietary<br>malware behavior<br>dataset|Accuracy, F1, False<br>Positive Rate (FPR).|GraphShield achieved the<br>highest F1 (99.5%)|
|[20]|DDoS attack detection in IoT<br>systems|GRU|CIC-IoT-2023,<br>NSL-KDD and<br>Edge-IIoTset|Detection accuracy,<br>FPR, Precision,<br>Recall, F1|99% accuracy with FPR ≈<br>0.05–0.1)|
|[12]|Sequential IoT botnet<br>detection in multigraphs|Gated GCN (temporal<br>edges)|BoT-IoT, Mirai|Accuracy, Precision,<br>Recall, F1|BoT-IoT: 99.97%; Mirai:<br>99.99% (all metrics)|
|[21]|Federated learning for<br>network attack detection|Attention-based graph<br>neural networks|NSL-KDD, KDD Cup<br>99|Accuracy, Precision,<br>Recall, F1-score.|Achieved near-perfect<br>accuracy (≈99.98%)|
|[22]|GNN-IDS modeling attack<br>graphs in IoT networks|Custom GNN-IDS|CIC-IoT-2023|(No. specified)|‘‘High detection accuracy’’<br>on CIC-IoT-2023|
|[23]|Anomalous node detection in<br>blockchain networks|GAT, subtree-based<br>attention mechanism|CIC-IoT-2023|Macro-AUC,<br>Macro-F1,<br>Macro-Recall,<br>G-Mean|Recall and G-Mean above<br>0.98|
|[24]|Graph-based IDS capturing<br>device interactions|Custom GNN-IDS on flow<br>graphs|CIC-IoT-2023|F1-Score, AUC-ROC|F1≈0.90, AUC≈0.92|



methods have achieved notable improvements in multi-class scenarios through the use of attention mechanisms. In financial fraud detection, approaches combining neighbor sampling and attention layers outperform traditional GNNs in accuracy. Overall, GNNs stand out as powerful tools for modeling inter-node relationships in the analysis of cyber threats and fraudulent behaviors. Recent advancements in structural data modeling have significantly shifted the paradigm of anomaly detection and network analytics toward graph-based architectures. To address the computational bottlenecks associated with large-scale graph structures, contemporary frameworks have heavily focused on system-level enhancements; for instance, [32] introduced a topology-aware graph processing engine that optimizes execution paths and memory localization, paving the way for low-latency deep learning inferences on massive topological datasets. Concurrently, within the cybersecurity domain, the integration of multi-faceted preprocessing pipelines and rigorous stability validations has become standard practice. A notable example is the work by [33], which demonstrated that combining strict feature selection mechanisms with comprehensive sensitivity analysis within an optimized hybrid model yields highly robust detection rates against sophisticated cyber threat variants like ransomware. Furthermore, the necessity of handling multi-attack scenarios and overlapping structural boundaries has driven the adoption of advanced node classification pipelines; [34] successfully leveraged Graph Convolutional Neural Networks (GCNs) within a multi-label classification paradigm to systematically map complex node interactions and group dependencies. Collectively, these recent contributions underscore the vital synergy between structural topology awareness, hybrid 

security modeling, and scalable graph neural inference, establishing a robust baseline for advanced cyber threat intelligence frameworks. 

In summary, the existing literature has demonstrated the robust performance of architectures such as GCN, GAT, GIN, and GraphSAGE in cybersecurity applications; however, comprehensive comparative evaluations of these architectures under standardized experimental conditions, analyses of their generalization capabilities using crossvalidation, and dynamic visualization analyses of detected anomalies remain limited. To overcome these limitations, the network-based visualizations presented in Figs. 17 and 18 significantly contribute to the qualitative dimension of the study. These visualizations systematically reveal the attack relationships and dominant attack types identified by the model across the network topology, enabling structural analysis of relational patterns beyond mere quantitative performance metrics. Thus, the proposed approach visually represents the network-level distribution of attacks, density regions, and dominant threat types, supporting strong classification success. This enhances both analytical depth and the interpretability of the model. The combined use of tables and visualizations enables a holistic evaluation of the developed method and distinguishes the study methodologically from similar approaches in the literature. 

#### **3. Methodology and implementation** 

This section outlines the materials and methodological approach employed in this study. The model training and evaluation workflow for GNN-based anomaly detection is shown in Fig. 2. The proposed model 

5 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

training and evaluation workflow provides an end-to-end framework for GNN-based anomaly detection. In the initial stage, data preprocessing operations — such as handling missing values, label encoding, and feature standardization — ensure consistent scaling and improve feature comparability. Subsequently, graph construction is performed by creating edges among flow records sharing the same source or destination IP address, thereby capturing host-centric communication dependencies among flows. This representation allows the graph to model both repeated activities originating from the same source and coordinated traffic directed toward the same destination. 

The shared IP-based graph construction strategy was selected because IP addresses represent the primary communication entities in network traffic. Flows that share the same source or destination IP are likely to reflect related host-level behavior, repeated communication attempts, scanning activities, or coordinated attack patterns. By connecting such records, the graph captures contextual dependencies among flows that are not directly observable in a purely tabular representation. This enables the GNN models to aggregate information from neighboring flows associated with the same communication entity and to learn both individual flow-level characteristics and structural interaction patterns. Alternative graph construction strategies were also considered, including direct host-to-host source–destination IP graphs, feature-similarity-based k-nearest-neighbor graphs, port- or protocolbased graphs, time-windowed dynamic graphs, and heterogeneous graphs containing IP, flow, port, and service nodes. Heterogeneous graph formulations can represent multiple node and relation types and may provide richer semantic representations through relationaware or homogeneity-aware message passing. However, such designs require additional modeling decisions, including node-type definitions, relation-specific aggregation rules, and edge-weighting mechanisms; therefore, they are left as a future extension in this study [35]. However, these alternatives introduce additional design choices, such as distance thresholds, temporal window sizes, edge weighting schemes, or heterogeneous message-passing mechanisms. Since the main objective of this study is to compare different GNN architectures under a controlled and reproducible setting, the shared IP-based construction was adopted as an interpretable, computationally manageable, and methodologically consistent strategy. Model training follows a fivefold stratified cross-validation scheme to enhance robustness against class imbalance and to provide a reliable estimate of the model’s generalization ability. Within each fold, training is conducted using mini-batch neighbor sampling (NeighborLoader) to efficiently process graph data while preserving local neighborhood information. The twolayer architecture, combined with ReLU activation and dropout regularization, mitigates overfitting and enables effective message passing across connected nodes. During the training loop, parameter updates are optimized using the Adam optimizer and the Cross-Entropy Loss function. 

Finally, model evaluation is carried out using multiple performance metrics, including accuracy, precision, recall, F1-score, ROC-AUC, and PR-AUC. The workflow concludes with a visualization phase, where the detected anomalies and their relational patterns are represented as network graphs. These visualizations, generated using NetworkX and JSON-based sigma graph exports, facilitate the interpretation of anomaly propagation and interaction patterns across nodes. Overall, this integrated workflow provides a reproducible, interpretable, and scientifically rigorous methodological framework for graph-based anomaly detection, encompassing data preprocessing, sampling, model training, evaluation, and visualization in a unified pipeline. We begin by describing the dataset used for anomaly detection, followed by the preprocessing steps and the implementation details of the selected GNN models. 

#### _3.1. Threat model_ 

The proposed framework is designed as a graph-based network anomaly detection layer rather than an authentication or access-control mechanism. Therefore, it does not replace preventive security mechanisms such as multi-factor authentication, quantum-resistant two-factor authentication, or high-security access-control schemes. Instead, it complements such mechanisms by monitoring network-flow behavior after communication activity occurs. Prior studies emphasize that explicitly defining adversary capabilities is essential for evaluating authentication and access-control systems [36], and recent quantum-resistant schemes such as Quantum2FA further highlight the importance of robust two-factor authentication for secure access in mobile and emerging computing environments [37]. 

In the considered threat model, the attacker may be either external or internal. The attacker may generate malicious traffic such as scanning, exploitation attempts, denial-of-service flows, reconnaissance activity, or compromised-host communications. The attacker may also possess valid or stolen credentials; therefore, initial authentication may be bypassed or successfully completed. Under this assumption, the proposed framework functions as a post-authentication, defensein-depth detection layer. The framework analyzes flow-level attributes and IP-level relational dependencies, including source and destination IP addresses, ports, protocols, services, connection states, packet and byte statistics, duration, and traffic-rate features. These attributes are represented in graph form to identify abnormal structural communication patterns. Thus, even if authentication is compromised, the GNN-based model can still support detection by identifying suspicious source–destination relationships, repeated connection attempts, abnormal service usage, or high-volume attack flows. 

The attacker is assumed to have no control over the training process, model parameters, monitoring infrastructure, feature extraction pipeline, dataset labels, or evaluation procedure. Moreover, adversarial learning attacks such as training-data poisoning or white-box evasion are outside the scope of this study. Since UNSW-NB15 and CIC-DDoS2019 provide network-flow-level records rather than user authentication logs, the proposed model does not verify user identity. Instead, it detects abnormal behavior after access or communication has occurred, making it complementary to secure authentication and access-control mechanisms. 

#### _3.2. Dataset_ 

In this study, we used the UNSW-NB15 dataset, a widely used benchmark for network intrusion detection. The dataset was generated by the Australian Centre for Cyber Security (ACCS) in 2015 and simulates realistic modern network traffic, including both normal and malicious activities [38]. It contains a wide variety of attack categories such as Fuzzers, Backdoors, Shellcode, Exploits, and DoS, offering a more diverse and up-to-date alternative compared to older datasets like KDD’99 or NSL-KDD. Table 2 summarizes the key features of the UNSWNB15 dataset, including traffic flow statistics, protocol-level attributes, and content-based indicators used for anomaly detection. To provide an additional external robustness assessment beyond the primary UNSWNB15 benchmark, CIC-DDoS2019 was considered as a complementary benchmark dataset. CIC-DDoS2019 was developed by the Canadian Institute for Cybersecurity at the University of New Brunswick to support the evaluation of modern DDoS detection methods. The dataset contains benign traffic and several up-to-date DDoS attack types and provides flow-based features extracted using CICFlowMeter. Compared with UNSW-NB15, CIC-DDoS2019 is more specialized, as it focuses primarily on DDoS attack scenarios. Therefore, it was used as a complementary dataset to evaluate the robustness of the proposed approach under a DDoS-focused intrusion detection setting rather than to claim complete generalization across all cyberattack families. By adding CICDDoS2019, we further evaluate the proposed framework under a different traffic-generation process and a DDoS-focused scenario, which is 

6 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 





**Fig. 2.** Flowchart of data processing, training, and evaluation in the GNN framework. 

particularly relevant since recent studies highlight that evolving DDoS attacks require detection methods that are not only accurate but also robust, adaptive, and interpretable [39]. 

To further broaden the external robustness assessment, we additionally evaluated the proposed framework on a CSE-CIC-IDS2018-based diverse intrusion dataset containing multiple attack families beyond DDoS traffic. The additional dataset includes Benign, Bot, Brute Force FTP, Brute Force SSH, Brute Force Web, Brute Force XSS, DDoS-HOIC, DDoS-LOIC-HTTP, DoS-GoldenEye, DoS-Hulk, DoS-SlowHTTP, DoSSlowloris, and SQL Injection classes. Compared with CIC-DDoS2019, this dataset provides a broader benchmark setting because it includes botnet, brute-force, web-application, SQL-injection, DoS, and DDoS attack categories. Therefore, the three datasets are interpreted as follows: UNSW-NB15 is used as the primary multi-category benchmark dataset, CIC-DDoS2019 is used as a complementary DDoS-focused robustness benchmark, and the CSE-CIC-IDS2018-based dataset is used to provide 

broader benchmark robustness evidence under a more diverse intrusion setting. These additional experiments are not intended to claim complete generalization to all possible cyberattack families, such as APTs, zero-day attacks, encrypted attacks, or operational IoT botnets. In the CSE-CIC-IDS2018-based experiment, IP addresses were modeled as graph nodes and communication flows were modeled as directed edges with flow-level attributes. Node-level statistical features were computed only from the training split to avoid validation/test feature leakage. Flow-level edge features were standardized by fitting the scaler on the training split and applying only transformation to validation and test splits. The message-passing graph was constructed only from training edges, whereas validation and test edges were used only for evaluation. The Infiltration class was excluded because only five records were available after preprocessing, which was insufficient for reliable training, validation, and testing. This exclusion is explicitly reported for transparency. 

7 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

**Table 2** 

UNSW-NB15 dataset features and descriptions. 

|Feature|Description|
|---|---|
|id|Unique flow ID|
|srcip|Source IP address<br>|
|sport|Source port number|
|dstip<br>|Destination IP address<br>|
|dsport|Destination port number|
|dur|Duration of the flow|
|proto|Protocol used (e.g., TCP, UDP)<br>|
|service|Application service|
|state|Connection state|
|spkts/dpkts|Source/Destination packet count|
|sbytes/dbytes|Bytes from source/destination|
|rate|Byte transfer rate|
|sttl/dttl|Source/Destination TTL|
|sload/dload|Source/Destination load|
|sloss/dloss|Packet loss in each direction|
|sinpkt/dinpkt|Inter-packet arrival time|
|sjit/djit|Jitter for source/destination|
|swin/dwin|TCP window size|
|stcpb/dtcpb|TCP base sequence numbers|
|tcprtt|TCP round trip time|
|synack/ackdat|TCP handshake timing features|
|smean/dmean|Mean packet size (src/dst)|
|trans_depth|Transaction depth|
|response_body_len|HTTP response size|
|ct_srv_src|Same service to source IP count|
|ct_state_ttl|Same state and TTL count|
|ct_dst_ltm|Destinations in last 100 flows|
|ct_src_dport_ltm|Src ports used by src IP|
|ct_dst_sport_ltm|Dst ports used by dst IP|
|ct_dst_src_ltm|Src-dst IP pair frequency|
|is_ftp_login|FTP login status|
|ct_ftp_cmd|Number of FTP commands|
|ct_flw_http_mthd|HTTP methods count|
|ct_src_ltm|Source IP frequency|
|ct_srv_dst|Service to destination frequency|
|is_sm_ips_ports|Same src-dst IPs and ports|
|attack_cat|Attack category (e.g., DoS, Fuzzers)|
|label|Binary class (0: normal, 1: attack)|



#### _3.3. Data preprocessing_ 

In the preprocessing stage, the UNSW-NB15 dataset was split into 80% training and 20% testing sets in separate training and test CSV files. Within the training portion, a validation set was further separated to evaluate the generalization performance and to prevent overfitting. While the standard practice was to reserve 10%–20% of the training data for validation, we observed that varying this ratio affects the stability of the model: a larger validation set provides a more reliable estimate of generalization but reduces the effective training size, whereas a smaller validation set maximizes training data but risks unreliable validation metrics. Irrelevant columns, meaningless data, and empty rows were removed. The selection of irrelevant rows and columns was performed by excluding metadata fields (e.g., identifiers such as ‘id’) that do not contribute to predictive capacity, as well as attributes with a high proportion of missing or constant values. Additionally, rows with corrupted entries or non-numeric placeholders were filtered out to avoid introducing noise into the learning process. Categorical variables such as proto, service, and state were converted to numeric form using one-hot encoding. All remaining numeric features were z-score normalized using StandardScaler. Finally, features, labels, and training/test masks were converted to PyTorch tensors. 

In this study, two distinct classification settings were considered. For the binary anomaly detection task, the label attribute was used as the target variable, where normal traffic was represented as class 0 and attack traffic as class 1. For the multi-class attack-family classification task, the attack_cat attribute was used as the target variable. In this setting, normal traffic samples were explicitly assigned to the ‘‘Normal’’ category and combined with the nine attack categories available in 

**Table 3** 

Class-wise distribution of the UNSW-NB15 training and test sets. 

|Class|Train count|Train %|Test count|Test %|
|---|---|---|---|---|
|Analysis|2,140|0.416|537|0.418|
|Backdoors|1,862|0.362|467|0.363|
|DoS|13,080|2.545|3,273|2.547|
|Exploits|35,619|6.929|8,906|6.929|
|Fuzzers|19,395|3.773|4,851|3.774|
|Generic|172,383|33.535|43,098|33.532|
|Normal|257,026|50.001|64,257|49.995|
|Recon|11,188|2.176|2,799|2.178|
|Shellcode|1,207|0.235|304|0.237|
|Worms|138|0.027|36|0.028|
|**Total**|**514,038**|**100.000**|**128,528**|**100.000**|



the UNSW-NB15 dataset, resulting in a single 10-class label vector. The resulting class labels were encoded using a label encoding strategy and used consistently during model training and evaluation. This distinction ensures that the binary setting evaluates normal-versus-attack discrimination, whereas the multi-class setting evaluates the ability of the models to distinguish among Normal and different attack families. 

To explicitly characterize class imbalance, the class-wise distribution of the training and test sets is reported in Table 3. The training set contains 514,038 samples, while the test set contains 128,528 samples. Although the binary normal/attack distribution is nearly balanced, the multi-class attack-category distribution is highly imbalanced. In the training set, the most frequent class is Normal with 257,026 samples, whereas the least frequent class is Worms with 138 samples, yielding an imbalance ratio of 1862.51:1. The corresponding imbalance ratio in the test set is 1784.92:1. Therefore, class-weighted Focal Loss was used to reduce majority-class dominance. Class weights were computed from training-set class frequencies using square-root smoothing, mean normalization, and clipping. 

The imbalance ratio is 1862.51:1 for the training set and 1784.92:1 for the test set, computed as the ratio between the most frequent and least frequent classes. Although class-weighted Focal Loss was used to reduce majority-class dominance, the class-wise results for extremely rare categories should be interpreted cautiously. In particular, the Worms class contains only 36 samples in the UNSW-NB15 test set. Therefore, class-specific metrics for such rare categories are statistically fragile and should be interpreted together with class support values, Macro-F1, Weighted-F1, and confusion matrix patterns rather than aggregate Accuracy alone. 

#### _3.4. GNN architectures_ 

In this section, we provide an overview of the graph neural network (GNN) architectures evaluated in this study. We focus on four widely adopted models: GCN, GAT, GIN, and GraphSAGE. Each of these architectures captures neighborhood information through different aggregation strategies, enabling robust representation learning on graph-structured data. The following subsections detail the core mechanisms and motivations behind each model. The general workflow of a basic GNN model is illustrated in Fig. 3. 

#### _3.5. Model training procedure_ 

All GNN architectures evaluated in this study — GCN, GAT, GIN, and GraphSAGE — were trained within a unified framework to ensure comparability. Each model used the same preprocessing pipeline, including one-hot encoding for categorical features and z-score normalization for numerical ones. IP addresses are modeled as graph nodes, and communication flows between source and destination IP addresses are modeled as directed edges with flow-level attributes. Specifically, an edge between two nodes was created if their corresponding flows shared either the same source IP address or the same destination IP 

8 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 





**Fig. 3.** The workflow of a simple GNN model. 



**Fig. 4.** Normalized sum aggregation in GCN. 

where _𝐼_ is the identity matrix. The degree matrix is defined as: 



and the normalized adjacency matrix becomes: 



A single GCN layer performs the following transformation: _𝐻_<sup>(</sup><sup>_𝑙_+1)</sup> = _𝜎_<sup>(</sup><sup>_̂_</sup> _𝐴𝐻_<sup>(</sup><sup>_𝑙_)</sup> _𝑊_<sup>(</sup><sup>_𝑙_))</sup> (6) 

where _𝜎_ is a non-linear activation function such as ReLU, _𝑊_<sup>(</sup><sup>_𝑙_)</sup> is the trainable weight matrix of layer _𝑙_ , and _𝐻_<sup>(0)</sup> = _𝑋_ . 

In the model used in this study, two GCN layers are stacked: 



address. This approach was selected to accurately represent direct interactions between communicating entities, capturing meaningful communication patterns and potential attack propagation paths within the network traffic. 

All models shared the same general architecture, consisting of two graph convolution layers with 128 hidden units, ReLU activation, and a dropout rate of 0.3. Training was performed for 100 epochs using the Adam optimizer with a learning rate of 0.005 and a weight decay of 1e-4. Although the standard GNN formulation is commonly expressed using cross-entropy loss, the final imbalanced multi-class experiments reported in this study used class-weighted/class-balanced Focal Loss to reduce majority-class dominance. Cross-entropy is therefore presented as the baseline formulation, whereas the reported rare-class-aware experiments are based on Focal Loss. Depending on the experimental setting, the output layer dimension was set to 2 for binary anomaly detection using the label attribute, or to 10 for multi-class attackfamily classification using the attack_cat attribute, where the classes correspond to Normal and the nine attack categories. 

#### _3.6. Graph convolutional networks_ 

The GCN model used in this study follows the spectral convolutional formulation with layer-wise propagation defined as Eq. (1) 



(1) 

where _̂𝐴_ is the symmetrically normalized adjacency matrix with added self-loops. Two stacked GCN layers transform input features into 2- dimensional output vectors for binary classification. 

The input feature matrix of the graph is denoted as: 



where _𝑁_ is the number of nodes and _𝐹_ is the number of features per node. 

The graph is represented by its adjacency matrix _𝐴_ ∈ R<sup>_𝑁_×</sup><sup>_𝑁_</sup> , and self-loops are added: 





The output of the model is passed through a softmax function to obtain class probabilities: 



The training loss is calculated using the cross-entropy loss function: 



where _𝑦𝑖_ is the true label and _̂𝑦𝑖_ is the predicted probability for node _𝑖_ . 

Model performance is evaluated using precision, recall, F1 score, ROC-AUC, and PR-AUC metrics on the test set. As illustrated in Fig. 4, the normalized sum aggregation combines the feature vector of each node with that of its neighbors using weights inversely proportional to the square root of their degree products, preventing numerical explosion and balancing contributions from low- and high-degree nodes, thus improving training stability. This operation is a core component of the graph Laplacian normalization underlying GCNs [40]. The Graph Convolutional Network (GCN) model used in this study operates on a node feature matrix _𝑋_ , where each row corresponds to a node and its associated feature vector, as shown in Eq. (2). The graph structure is encoded through the adjacency matrix _𝐴_ , and self-loops are added to obtain _̃𝐴_ , as defined in Eq. (3). The degree matrix _̃𝐷_ is constructed from _𝐴_ using Eq. (4), which allows us to compute the normalized adjacency matrix _̂𝐴_ as described in Eq. (5). 

Each GCN layer propagates and transforms node features through neighborhood aggregation based on the normalized adjacency matrix, as formalized in Eq. (6). In this model, two GCN layers are stacked, with the first layer applying a ReLU activation function Eq. (7), and the second performing a linear transformation Eq. (8). The output node representations are passed through a softmax function to compute class probabilities, as shown in Eq. (9). During training, the model is optimized using the cross-entropy loss function over the labeled nodes Eq. (10). These equations collectively describe the complete mathematical foundation of the GCN architecture employed for anomaly detection on the UNSW-NB15 dataset. 

9 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 





**Fig. 5.** Attention mechanism. 

#### _3.7. Graph attention networks_ 

Graph Attention Networks (GAT) enhance traditional graph convolutions by applying a masked self-attention mechanism on graphstructured data. Unlike GCNs, which treat all neighbors equally or proportionally to their degree, GAT assigns learnable attention coefficients to each neighbor during aggregation. 

Given a node feature matrix _𝑋_ ∈ R<sup>_𝑁_×</sup><sup>_𝐹_</sup> , the attention mechanism operates on pairs of nodes ( _𝑖, 𝑗_ ) ∈ , and computes attention coefficients: 



where _𝑊_ ∈ R<sup>_𝐹_′×</sup><sup>_𝐹_</sup> is a learnable weight matrix, _⃗𝑎_ ∈ R<sup>2</sup><sup>_𝐹_′</sup> is the attention vector, and ∥ denotes vector concatenation. 



**Fig. 6.** MLP as aggregator. 

The coefficients _𝑒𝑖𝑗_ are normalized using the softmax function over the neighborhood  _𝑖_ : 



Each node’s representation is then updated as a weighted sum of its neighbors: 



where _𝜎_ is a non-linear activation function, typically ELU. To stabilize training and capture multiple aspects of neighborhood influence, GAT employs multi-head attention: 



where ∥ denotes concatenation, _𝐾_ is the number of attention heads, and each head has its own parameters. In the final GAT layer, head outputs are usually averaged instead of concatenated: 



The output is passed to a softmax classifier to generate prediction probabilities: 



As illustrated by the attention diagram in Fig. 5, the learnable attention coefficients _𝛼𝑖𝑗_ enable the model to dynamically weight each neighbor’s contribution based on feature similarity, allowing it to focus on the most informative connections and suppress noisy or irrelevant ones. This mechanism is critical because it overcomes the uniformaveraging limitation of traditional GCNs, greatly enhancing expressivity and robustness in capturing complex relational patterns [2]. 

Each GAT layer computes node representations by learning attention coefficients between a node and its neighbors, as described in Eq. (11). These coefficients are normalized across each node’s neighborhood using a softmax function, ensuring comparability Eq. (12). The node feature is then updated through a weighted aggregation of neighboring features, as shown in Eq. (13). To increase expressiveness and training stability, multi-head attention is used, with outputs concatenated as in Eq. (14). In the final layer, head outputs are averaged instead Eq. (15). These node representations are then passed to a softmax function for class probability estimation Eq. (16), and the training is performed using the cross-entropy loss function defined in Eq. (10). The training objective is the same as in the GCN model, using cross-entropy loss over labeled nodes. 

#### _3.8. Graph isomorphism network_ 



Here,  ( _𝑣_ ) denotes the set of neighboring nodes of _𝑣_ , and MLP<sup>(</sup><sup>_𝑘_)</sup> is a learnable multi-layer perceptron at the _𝑘_ th layer. The model omits the _𝜖_ parameter typically used in the generalized form of GIN. Each MLP consists of a sequence of linear transformations and nonlinear activations, generally defined as: 

MLP( _𝑥_ ) = **𝐖** 2 ⋅ _𝜎_ ( **𝐖** 1 ⋅ _𝑥_ ) (18) 

10 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 



**Fig. 7.** GraphSAGE-based anomaly detection workflow diagram. 

where _𝜎_ (⋅) represents a non-linear activation function, typically ReLU. After two GINConv layers, the output **𝐳** _𝑣_ of each node is passed through a softmax layer for binary classification: 



The model is trained using the cross-entropy loss function applied over the training mask  : 



where _𝑦𝑣_ is the ground-truth label and _̂𝑦𝑣_ is the predicted probability for node _𝑣_ . 

In GIN, node representations are updated by aggregating the sum of a node’s own features and those of its neighbors, followed by a multilayer perceptron (MLP), as shown in Eq. (18). Each MLP, described in Eq. (19), applies a nonlinear transformation to learn expressive embeddings. After two GINConv layers, the output of each node is passed through a softmax classifier to predict its class label Eq. (20). The training objective is to minimize the cross-entropy loss over labeled nodes, defined in Eq. (20). 

#### _3.9. Graph sample and aggregatE_ 

GraphSAGE extends the neighborhood aggregation idea by introducing a learnable function that samples and aggregates features from a node’s local neighborhood to compute its embedding. Instead of using the entire neighborhood, GraphSAGE employs a fixed-size neighborhood sampling, making it scalable for large graphs. 



Here, AGG<sup>(</sup><sup>_𝑘_)</sup> (⋅) denotes an aggregation function such as mean, LSTM, or max pooling. In our implementation, we utilize the mean aggregator: 



The learnable weight matrix _𝑊_<sup>(</sup><sup>_𝑘_)</sup> transforms the aggregated vector into the updated representation. Non-linearity is applied via a function _𝜎_ , commonly ReLU. 

For a 2-layer GraphSAGE, the full update sequence is: 



The final node embeddings _⃗ℎ_<sup>(2)</sup> _𝑣_<sup>arepassedthroughasoftmaxclas-</sup> sifier to obtain class probabilities: 



Model parameters _𝑊_<sup>(1)</sup> _, 𝑊_<sup>(2)</sup> are learned by minimizing the crossentropy loss on the labeled nodes. 

The GraphSAGE workflow shown in Fig. 7 illustrates how fixedsize neighbor sampling and feature aggregation feed into the SAGE convolution prior to classification. By combining each node’s own attributes with a summary of its local neighborhood, this process enables scalable, inductive learning on large, dynamically changing log graphs, capturing both individual and contextual patterns that are vital for accurately distinguishing normal traffic from anomalies. GraphSAGE updates node embeddings by sampling a fixed number of neighbors and applying an aggregation function, followed by a linear transformation, as formalized in Eq. (22). The mean aggregator is used in our model, as described in Eq. (23), to combine a node’s own features with those of its neighbors. The update process is repeated across two layers, where the first layer uses ReLU activation Eq. (24), and the second applies a linear transformation Eq. (25). The resulting embeddings are then passed to a softmax classifier Eq. (25). The model parameters are learned by minimizing the cross-entropy loss on the labeled nodes Eq. (20). The algorithm 1 outlines in detail how intrusion detection is performed using a GraphSAGE-based approach on a globally constructed graph from UNSW-NB15 flows, employing stratified K-fold validation to preserve class balance throughout the evaluation process. 

#### _3.10. Attack topology visualization_ 

To improve interpretability and provide intuitive insights into detected anomalies, we present a dynamic attack topology visualization. Specifically, we generate interactive graphs from correctly classified anomalies in the test dataset for each evaluated GNN model. In these graphs, each attacker and target IP address is represented as a separate node, while edges represent attack traffic directed from the attackers to the targets. Edges are color-coded according to the specific attack type identified. 

The visualization uses a force-directed graph layout implemented with the D3.js library, as seen in Fig. 17, enabling intuitive exploration of structural patterns in the anomaly data. The visualization supports dynamic interaction: hovering over an edge reveals quantitative details of the attacks between the two nodes. Furthermore, the thickness of an edge scales dynamically with the attack frequency; as the frequency of a particular attack type increases, edges become thicker, effectively highlighting critical attack vectors. Compared to previous work that primarily focuses on static or single-model-specific visualizations, our approach is both model-agnostic (applicable to GCN, GAT, GIN, 

11 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

|**Algorithm** **1** GraphSAGE-based Intrusion Detection with Stratified<br>K-Fold|
|---|
|**Input:** UNSW-NB15 network flows<br>**Output:** Fold-based predictions and evaluation metrics<br>**Preprocessing:**<br>Load CSVs; fill missing _attack_cat_ with ‘‘Normal’’<br>Encode attack categories via LabelEncoder<br>Convert feature columns to numeric; replace NaN with zeros<br>Encode {protocol, state, service} using LabelEncoder<br>Standardize all features using StandardScaler (fit on train)<br>**Global** **Graph** **Construction:**<br>Concatenate train and test into all_df<br>Extract _𝑋_ (node features) and _𝑌_ (labels)<br>Build _edge_index_ via **create_edges**(src_ip grouping, max_neighbors,<br>bidirectional links)<br>Form PyG Data object _𝐷_= (_𝑋, 𝑒𝑑𝑔𝑒_𝑖𝑛𝑑𝑒𝑥, 𝑌_)<br>**Model** **(GraphSAGE):**|
|Two SAGEConv layers: _𝑖𝑛_𝑑𝑖𝑚_→_ℎ𝑖𝑑_𝑑𝑖𝑚_→_𝑛𝑢𝑚_𝑐𝑙𝑎𝑠𝑠𝑒𝑠_<br>Forward pass: ReLU(conv1) → Dropout → conv2<br>Loss: CrossEntropyLoss; Optimizer: Adam (lr = 0.005, wd = 10<sup>−4</sup>)<br>**Stratified** **K-Fold:**<br>Initialize StratifiedKFold(_𝑘_= 5, shuffle = True)<br>**for** each fold (_𝑡𝑟𝑎𝑖𝑛_𝑖𝑑𝑥, 𝑡𝑒𝑠𝑡_𝑖𝑑𝑥_) **do**<br>Create _train_mask_ and _test_mask_<br>Create NeighborLoader for train/test (num_neighbors = [10,5],<br>batch_size = 1024)<br>_#_ _Training_<br>**for** each epoch **do**<br>**for** each batch in train_loader **do**<br>Move batch to device<br>_𝑜_←_𝑚𝑜𝑑𝑒𝑙_(_𝑏𝑎𝑡𝑐ℎ.𝑥, 𝑏𝑎𝑡𝑐ℎ.𝑒𝑑𝑔𝑒_𝑖𝑛𝑑𝑒𝑥_)<br>_𝑜_seed ←_𝑜_[0 ∶_𝑏𝑎𝑡𝑐ℎ_𝑠𝑖𝑧𝑒_], _𝑦_seed ←_𝑏𝑎𝑡𝑐ℎ.𝑦_[0 ∶_𝑏𝑎𝑡𝑐ℎ_𝑠𝑖𝑧𝑒_]<br>Compute loss(_𝑜_seed_, 𝑦_seed); backpropagate; update parame-<br>ters<br>**end** **for**<br>**end** **for**<br>_#_ _Evaluation_|
|Gather predictions over test_loader seed nodes<br>Compute classification report and confusion matrix for the fold<br>**end** **for**|



and GraphSAGE) and incorporates interactive, dynamically adjustable graphical elements, significantly enhancing analysts’ ability to interpret complex and evolving cybersecurity threats. The algorithm 2 delimits an end-to-end GraphSAGE-based intrusion detection pipeline that integrates anomaly extraction with attack-type aggregation to generate a structured JSON graph, subsequently allowing dominant attack-type visualization through an interactive D3 force-directed interface. 

#### _3.11. Implementation details_ 

The proposed framework was implemented in Python using PyTorch 2.10.0+cu128 and PyTorch Geometric 2.7.0. All experiments were conducted in Google Colab on an NVIDIA Tesla T4 GPU with 15,360 MiB of memory, as verified by nvidia-smi. The NVIDIA driver reported CUDA 13.0 support, while the PyTorch build used CUDA 12.8, as indicated by the +cu128 suffix in the PyTorch version. To improve reproducibility, the random seed was fixed to 42 for NumPy and PyTorch. Although PyTorch used CUDA 12.8 and the NVIDIA driver reported CUDA 13.0 support, no runtime issues occurred; minor numerical differences may still arise across different GPU/CUDA environments. The UNSW-NB15 flow records were used as input, using the training and testing CSV files. Invalid and missing values were replaced with zero. The categorical fields protocol, state, and service 

**Algorithm 2** End-to-End GraphSAGE Intrusion Detection and Dominant Attack-Type Visualization **Input:** UNSW-NB15 network flow records **Output:** Interactive dominant attack-type graph (D3 visualization) **Preprocessing & Graph Construction:** Load CSVs; convert invalid/missing values → 0 Encode _protocol, state, service_ via LabelEncoder Standardize numerical features using StandardScaler Group by _src_ip_ ; sample up to _max_neighbors_ ; create bidirectional edges Build PyG Data objects for training and testing **GraphSAGE Model & Mini-batch Training:** Two-layer GraphSAGE: hidden → num_classes, where num_classes = 10 (Normal + 9 attack categories) Forward: ReLU(conv1) → Dropout → conv2 Use NeighborLoader (num_neighbors = [10,5], batch_size = 1024) **for** each epoch **do for** each batch in train_loader **do** _𝑜_ ← _𝑚𝑜𝑑𝑒𝑙_ ( _𝑏𝑎𝑡𝑐ℎ.𝑥, 𝑏𝑎𝑡𝑐ℎ.𝑒𝑑𝑔𝑒_  𝑖𝑛𝑑𝑒𝑥_ ) Compute loss on seed nodes; backpropagate and update parameters **end for end for Anomaly Extraction & sigma_graph.json Generation:** Predict on test batches; collect anomaly samples ( _𝑙𝑎𝑏𝑒𝑙_ = 1) Build a NetworkX graph _𝐺_ : nodes = IPs, edges = (src,dst) For each edge, accumulate attack-type counts (attack_counts) Convert _𝐺_ to JSON: node list + edge list (with weight & attack_type) Load existing sigma_graph.json if available and deduplicate by (source,target,attack_type) Save updated JSON file **D3-Based Dominant Attack Graph:** Load graph.json; and remove self-loops/normal edges Compute dominant attack type per (source, target) Assign node roles: attacker/target / both Define color scale (attack types) and width scale (weights) Render force-directed graph with curved edges and labels Display side table (Source, Destination, Type, Count) 

were encoded using LabelEncoder, and the numerical attributes were normalized using StandardScaler. The graph was constructed at the IP level: nodes correspond to IP addresses, and edges correspond to communication flows between src_ip and dst_ip. Flows were grouped according to src_ip; for each source node, up to max_neighbors = 50 destination nodes were retained, and bidirectional edges were created between source and destination IP addresses. Node features were obtained by aggregating flow-level statistics for each IP node, including byte-level, packet-level, and duration-related attributes. The processed graphs were then converted into PyTorch Geometric Data objects for training and testing. 

For classification, a two-layer GraphSAGE model was used. The first GraphSAGE layer maps input node features to a hidden representation, followed by ReLU activation and dropout. The second GraphSAGE layer maps the hidden representation to 10 output classes, corresponding to the Normal class and nine attack categories. The model was trained using the Adam optimizer with a learning rate of 0.005, dropout rate of 0.3, and 100 training epochs. Mini-batch training was performed using PyTorch Geometric NeighborLoader with num_neighbors = [10, 5] and batch_size = 1024. The training loader used shuffle=True, while the test loader used shuffle=False. During training, the loss was computed only on the seed nodes of each sampled mini-batch. After inference, records predicted as non-Normal classes were treated as anomalous records and converted into a NetworkX graph, where nodes correspond to IP addresses and edges correspond to source–destination communication 

12 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 



**Fig. 8.** ROC and precision–recall curves obtained from the GraphSAGE model. The curves indicate high separability and low false positive rates. 

pairs. For each edge, attack-type frequencies were accumulated and stored as attack_counts. The graph was exported to sigma_graph.json, including node and edge lists with edge weights and dominant attack types. When an existing JSON file was available, duplicate edges were removed using the (source, target, attack_type) key. 

The generated JSON file was then visualized using D3.js. Normal edges and self-loops were removed, and the dominant attack type was computed for each source–destination pair. Nodes were assigned attacker, target, or both roles, while edge colors represented attack categories and edge widths represented attack frequency. The final visualization was displayed as an interactive force-directed graph with curved edges, labels, and a side table listing source, destination, attack type, and count. To ensure a fair comparison, all evaluated models were trained under the same hyperparameter configuration: learning rate = 0.005, hidden dimension = 128, dropout = 0.3, and number of epochs = 100. In addition to the implementation settings above, we further report the reproducibility and computational profiling details. The random seed was fixed to 42 for Python random, NumPy, and PyTorch. The hardware environment consisted of an NVIDIA Tesla T4 GPU with 15,360 MiB memory, NVIDIA driver version 580.82.07, and CUDA 13.0 support as reported by nvidia-smi. The evaluation set used for runtime profiling contained 128,528 samples and 126 mini-batches. Runtime measurements were averaged over 10 repeated inference runs after 3 warm-up runs to reduce measurement variance. The computational profiling included trainable parameter count, inference time, batch latency, sample latency, throughput, and peak GPU memory usage for each evaluated GNN model. These results are summarized in Table 8. 

#### **4. Experimental results and evaluation** 

This study presented a comparative evaluation of four prominent GNN architectures-GCN, GAT, GIN, and GraphSAGE—for the task of anomaly detection in network traffic using the UNSW-NB15 dataset. Both standard training and K-fold cross-validation (CV) strategies were applied to assess the generalization capabilities of each model. Table 11 demonstrates the position of the proposed model by holistically comparing the performance of recent studies conducted on the same dataset. Our study provides a more comprehensive evaluation compared to other approaches in the literature by using multiple GNN architectures (GCN, GAT, GIN, GraphSAGE) and reporting a broad set of metrics (Precision, Recall, F1, ROC-AUC, PR-AUC, Accuracy) for both multi-class and binary classification. The inclusion of the PR-AUC metric, in particular, more realistically reflects the model’s performance 

in imbalanced data structures. Furthermore, the presented networkbased visualizations make a significant qualitative contribution to the study. These visualizations intuitively reveal the attack relationships and dominant attack types detected by the model through the network structure, enabling the analysis of not only quantitative results but also relational patterns. 

Table 5 illustrates that while all models benefit from the application of K-fold validation, the most notable performance improvements are observed in GIN and GraphSAGE. For instance, GraphSAGE, which initially achieved an F1-score of 0.939, increased to 0.9726 after K- Fold CV. Similarly, GIN improved from 0.945 to 0.9677 in F1-score, confirming the advantage of increased training robustness through stratified sampling. These improvements were consistent across other evaluation metrics, including ROC-AUC and PR-AUC, underscoring the significance of cross-validation in mitigating overfitting and enhancing reliability on unseen attack patterns. From an architectural perspective, the results demonstrate that neighborhood sampling (GraphSAGE) and expressive aggregation mechanisms (GIN) yield more stable and accurate embeddings for anomaly detection. In contrast, GAT and GCN performed relatively weakly in capturing subtle or imbalanced attack behaviors, although they still produced competitive results after K-Fold training. 

Table 4 presents the fold-level statistical validation results obtained from 5-fold stratified cross-validation. The consistently small standard deviations and narrow 95% confidence intervals indicate that the reported performance values are stable across different data partitions rather than being the result of a single favorable split. In particular, GraphSAGE and GIN maintain the highest F1-score and AUC values with very limited variation, confirming the robustness and benchmark-level robustness of the proposed graph-based anomaly detection framework. In addition to quantitative evaluation, the visual representation of attack patterns using the graph-based directed topology shown in Fig. 18 offers intuitive insights into how anomalies propagate between attacker and target IP addresses. This topology highlights the directed and often asymmetric nature of malicious interactions, emphasizing how a limited set of attacker nodes initiates diverse connections across multiple target hosts. This visualization was constructed using D3.js, taking advantage of anomalous flows extracted from the test set to create an interactive and dynamic depiction of malicious behavior. The attack graph illustrates dense and diverse connections originating from a small set of attacker nodes toward numerous target hosts. Different attack categories (e.g., Reconnaissance, Exploits, Shellcode) are encoded as color-coded edges, facilitating a high-level understanding of the distribution and heterogeneity of adversarial activities. This structural representation further emphasizes the 

13 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 



**Fig. 9.** ROC and PR curves from K-fold validation of GraphSAGE indicate robust anomaly separability and minimal false positives across all folds. 

**Table 4** 

Five-fold statistical validation results of GNN models with 95% confidence intervals for F1-score. 

|Model|Accuracy|Precision|Recall|F1-score<br>95% CI|for F1-score|ROC-AUC|PR-AUC|
|---|---|---|---|---|---|---|---|
|GCN|0.9502 ± 0.0008|0.9615 ± 0.0008|0.9606 ± 0.0012|0.9610 ± 0.0007<br>[0.9602|, 0.9618]|0.9884 ± 0.0003|0.9931 ± 0.0002|
|GAT|0.9482 ± 0.0016|0.9543 ± 0.0014|0.9651 ± 0.0014|0.9597 ± 0.0012<br>[0.9581|, 0.9612]|0.9877 ± 0.0008|0.9927 ± 0.0005|
|GIN|0.9609 ± 0.0009|0.9751 ± 0.0015|0.9635 ± 0.0016|0.9693 ± 0.0007<br>[0.9684|, 0.9701]|0.9928 ± 0.0002|0.9958 ± 0.0001|
|GraphSAGE|0.9644 ± 0.0008|0.9724 ± 0.0005|0.9719 ± 0.0009|0.9721 ± 0.0006<br>[0.9714|, 0.9729]|0.9946 ± 0.0002|0.9969 ± 0.0001|



**Table 5** 

Performance comparison of different GNN models (Normal and K-Fold). 

|Model|Prec.|Rec.|F1|ROC-AUC|PR-AUC|
|---|---|---|---|---|---|
|||**Normal** <br>|**Train**<br>|||
|GCN|0.863|0.984|0.919|0.990|0.993|
|GAT|0.811|0.985|0.890|0.987|0.991|
|GIN|0.908|0.987|0.945|0.993|0.995|
|GraphSAGE|0.903|0.978|0.939|0.992|0.994|
|||**K-Fold** **Cross**|**Validation**|||
|GCN|0.9609|0.9604|0.9607|0.9879|0.9928|
|GAT|0.9505|0.9668|0.9586|0.9877|0.9926|
|GIN|0.9709|0.9644|0.9677|0.9918|0.9951|
|GraphSAGE|0.9725|0.9726|0.9726|0.9948|0.9970|



capability of GNN-based models to capture and differentiate complex interdependencies inherent in malicious traffic flows. 

To examine whether the GraphSAGE results are sensitive to the selected neighbor sampling depth, an additional sensitivity check was conducted using [5,3], [10,5], and [20,10] under the same experimental protocol. As shown in Table 7, the performance remains highly stable across the tested settings, with only negligible differences in Accuracy and F1-score. The default [10,5] setting corresponds to the configuration used in the main GraphSAGE experiments and provides a balanced trade-off between local neighborhood coverage and computational cost. Although [20,10] provides slightly larger neighborhood coverage, it does not yield a meaningful performance improvement and slightly increases inference time. 

Table 6 summarizes the baseline and best-performing ablation configurations for all evaluated GNN models. The results show that the selected baseline settings provide stable and competitive performance across architectures. While GraphSAGE achieves the highest overall scores with several alternative settings, GAT shows nearly identical baseline and best performance, indicating robustness to the tested variations. GCN benefits from a two-layer configuration, suggesting 

that excessive propagation depth may reduce performance. For GIN, improvements are mainly obtained through lower dropout and cosine learning-rate scheduling. Overall, Table 6 demonstrates that the common hyperparameter setting offers a fair comparison baseline, while the ablation results reveal architecture-specific sensitivity to layer depth, hidden dimension, dropout, and learning-rate schedule. Although Table 8 reports total inference latency, this value should be interpreted as batch-mode inference time over the complete evaluation workload rather than as real-time per-flow detection latency. The runtime profiling set contains 128,528 samples and 126 mini-batches; therefore, deployment relevance is better assessed using throughput, average batch latency, and average per-sample latency in addition to total wall-clock time. From an operational IDS perspective, high-speed streaming environments may require sub-second or near-real-time detection. The current implementation is therefore best understood as an offline/batch graph-based IDS evaluation framework rather than a fully optimized streaming IDS. Real-time deployment would require additional system-level components, including incremental graph updates, sliding-window graph construction, streaming neighbor sampling, lowlatency model serving, and hardware-aware optimization. The 128,528sample evaluation set provides a controlled benchmark workload for reproducible comparison, but real production traffic volumes may vary substantially depending on network bandwidth, observation interval, flow aggregation policy, and monitoring scope. 

Table 8 shows that the evaluated GNN architectures differ notably in terms of computational complexity, parameter count, inference latency, throughput, and memory requirements. The GAT model has the highest computational cost due to its multi-head attention mechanism, with 630,090 trainable parameters, 10.39 s inference time, and 2.51 GB peak GPU memory usage. In contrast, GraphSAGE and GIN achieve lower latency and higher throughput, making them more computationally efficient. In particular, GIN provides a strong efficiency trade-off with a 3.29× speed-up and 39,019 samples/s throughput, while GraphSAGE offers a scalable alternative for large graphs through its fixed-size neighborhood sampling strategy. Although GCN has the lowest number 

14 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

**Table 6** 

Summary of baseline and best-performing ablation configurations for GraphSAGE, GAT, GCN, and GIN. 

|Model|Configuration|Accuracy|Macro-F1|Weighted-F1|Main Observation|
|---|---|---|---|---|---|
|GraphSAGE|Baseline: 3 layers, hidden=64, dropout=0.3, constant LR|0.93|0.65|0.92|Stable default setting|
|GraphSAGE|Best: 2 layers/hidden=128/hidden=256/dropout=0.5|**0.96**|**0.69**|**0.97**|Several settings reached the best score|
|GAT|Baseline: 3 layers, hidden=128, dropout=0.3, constant LR|0.95|0.69|0.95|Sensitive to layer depth|
|GAT|Best: 2 layers, hidden=128, dropout=0.3, constant LR|**0.95**|**0.69**|**0.95**|Best performance obtained with deeper GAT|
|GCN|Baseline: 3 layers, hidden=128, dropout=0.3, constant LR|0.89|0.58|0.88|Improved with deeper propagation|
|GCN|Best: 2 layers, hidden=128, dropout=0.3, constant LR|**0.95**|**0.66**|**0.94**|Three layers produced the best result|
|GIN|Baseline: 3 layers, hidden=128, dropout=0.3, constant LR|0.93|0.65|0.92|Strong baseline performance|
|GIN|Best: dropout=0.1/cosine LR|**0.95**|**0.67**|**0.96**|Best result achieved with lower dropout or cosine schedule|



##### **Table 7** 

Sensitivity of GraphSAGE to neighbor sampling depth on UNSW-NB15 under the same experimental <u>protocol.</u> 



<!-- Start of picture text -->
num_neighbors Accuracy F1-score Inference time(s)<br>[5,3] 96.43% 97.20% 3.62<br>[10,5] 96.44% 97.21% 3.75<br>[20,10] 96.45% 97.22% 3.91<br><!-- End of picture text -->





**Fig. 10.** Confusion matrix and performance values. 

of trainable parameters, it performs worse than GraphSAGE and GIN in terms of inference time. These results indicate that attention-based GAT improves representational capability at the cost of higher latency and memory usage, whereas GraphSAGE and GIN are more suitable for large-scale network security applications requiring low latency and high throughput. 

As shown in Fig. 11, the proposed model appears to achieve high overall accuracy and weighted-F1 values. Despite the successful results obtained, the relatively low macro-F1 value indicates that classification performance is limited in minority attack classes. To mitigate the impact of class imbalance, a class-weighted Focal Loss was employed during model training. The class weights were computed based on class frequencies to increase the contribution of minority classes to the loss function. To reduce the risk of instability and overfitting caused by excessive weighting, square-root-based smoothing and clipping were applied to the weights. WeightedRandomSampler was not used in order to preserve the original data distribution and to avoid potential memorization caused by excessive repetition of minority-class samples. Model selection was performed based on the Macro-F1 score, which provides a more reliable evaluation criterion for imbalanced multiclass classification tasks. The results show that most misclassifications occur between behaviorally similar attack categories, such as DoS– Exploits, Backdoors–DoS, Fuzzers–DoS, and Reconnaissance–Exploits. These errors are systematic and mainly arise from overlapping traffic characteristics and class imbalance, particularly for minority classes such as Analysis, Backdoors, and Worms. 

As shown in Fig. 12, the proposed model achieves strong multiclass classification performance on the CIC-DDoS2019 dataset. The 

confusion matrix indicates that the model correctly identifies most benign and DDoS attack categories, with particularly high recognition rates for BENIGN, DrDoS_NTP, DrDoS_NetBIOS, TFTP, and UDP-lag classes. Some misclassifications are mainly observed among closely related DDoS variants, such as DrDoS_DNS, DrDoS_LDAP, DrDoS_SNMP, DrDoS_SSDP, and DrDoS_UDP, which is expected due to their similar traffic characteristics. The training curves further show that the loss decreases steadily, while Accuracy, Macro-F1, and Weighted-F1 improve and stabilize over the training epochs, indicating stable convergence and good generalization behavior. 

As seen in Table 9, the results demonstrate that the proposed edge-based GNN models also achieve strong performance on the CICDDoS2019 dataset, which was used as an additional benchmark to evaluate cross-dataset generalization. Among the evaluated models, SAGE achieved the best overall performance with an Accuracy of 0.9596, Macro-F1 of 0.7710, and Weighted-F1 of 0.9560. GCN produced very similar results, while GIN and GAT also maintained high performance. These findings indicate that the proposed graph-based approach is not limited to UNSW-NB15 and remains effective on a DDoS-focused dataset. 

Overall, the experimental findings and graph-based visualization collectively emphasize that expressive GNN variants such as GIN and GraphSAGE are better suited for capturing the topological intricacies of network traffic. Moreover, the incorporation of K-Fold validation proves to be a valuable training strategy that enhances model robustness and generalization, especially in cybersecurity scenarios characterized by class imbalance and evolving attack vectors. 

As illustrated in Fig. 8, the ROC curve of the GraphSAGE model shows near-perfect discrimination ability, while the precision–recall curve remains flat and close to 1.0, reflecting the model’s excellent handling of class imbalance and its capability to identify anomalies with minimal false alarms precisely. Figs. 8 and 9 present the ROC and precision–recall (PR) curves of the most successful GNN model under two training regimes: standard training and K-fold cross-validation, respectively. While both setups yield high performance, the curves in Fig. 9 (K-Fold) are slightly more robust and smoother, especially in the tail regions of the PR curve, indicating improved generalization and stability. This visual consistency aligns with the quantitative metrics reported earlier, where K-fold cross-validation led to marginal gains in F1-score and AUC values. These findings underscore the effectiveness of cross-validation in improving model reliability, particularly for complex and imbalanced network traffic data. Fig. 10 shows a confusion matrix, and evaluation metrics indicate an exceptionally high-performing anomaly detection model. Out of the total predictions, the model correctly classified 62,968 normal instances and 64,265 anomaly instances, with only 1289 false positives and 6 false negatives Fig. 13 shows that both training and validation subsets exhibit closely aligned loss trajectories, indicating that the model achieves stable convergence without signs of overfitting. In parallel, Fig. 14 shows that the validation accuracy remained nearly constant at approximately 99%, confirming the model’s strong benchmark-level robustness and consistent predictive performance throughout the training process. The precision score of 0.98 reflects the model’s strong ability to minimize false alarms, confirming that nearly all instances identified as anomalies are indeed true anomalies. Similarly, the recall value of 0.99 

15 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

**Table 8** 

Computational complexity and efficiency comparison of GNN models under 100 epoch. 



<!-- Start of picture text -->
Model Complexity trend Trainable parameters Epoch setting Inference time (s) Batch latency (ms) Sample latency (ms) Throughput (samples/s) Peak GPU memory (GB) Relative speed-up<br>GAT 𝑂 (| 𝐸 | ⋅ 𝐾 ⋅ 𝐻 ) 630,090 100 10.39 82.48 0.0809 12,366 2.51 1.00×<br>GraphSAGE 𝑂 (| 𝑉 | ⋅ 𝑆 𝐿 ) 347,082 100 3.75 29.74 0.0292 34,295 0.34 2.77×<br>GCN 𝑂 (| 𝐸 |) 306,122 100 6.58 52.23 0.0512 19,529 0.66 1.58×<br>GIN 𝑂 (| 𝐸 | + | 𝑉 | ⋅ 𝐶 MLP) 430,349 100 3.29 26.14 0.0256 39,019 0.34 3.16×<br><!-- End of picture text -->







**Fig. 11.** Multi-class confusion matrix and performance values on the UNSW-NB15 dataset. 







**Fig. 12.** Multi-class confusion matrix and performance evaluation on the CIC-DDoS2019 dataset. 

demonstrates that the model successfully detects almost all anomalous events, with an extremely low rate of missed attacks. The F1-score of 0.98, as the harmonic mean of precision and recall, signifies an optimal balance between detection accuracy and reliability, making 

the classifier robust in both identifying true positives and avoiding false detections. Furthermore, the ROC-AUC (0.99) and PR-AUC (0.99) metrics highlight the model’s excellent discriminative capacity between normal and abnormal traffic behaviors, even under varying threshold 

16 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

**Table 9** 

Performance comparison of the evaluated GNN models based on the CICDDoS2019 dataset. 

|Model|Dataset|Accuracy|Macro-F1|Weighted-F1|
|---|---|---|---|---|
|SAGE|CIC-DDoS2019|**0.9596**|**0.7710**|**0.9560**|
|GCN|CIC-DDoS2019|0.9592|0.7709|0.9557|
|GIN|CIC-DDoS2019|0.9554|0.7655|0.9523|
|GAT|CIC-DDoS2019|0.9552|0.7644|0.9520|





**Fig. 13.** Training vs validation loss. 



**Fig. 14.** Validation accuracy vs epochs. 

conditions. These values collectively indicate that the classifier maintains high sensitivity and specificity across a wide decision boundary range. These results confirm that the proposed detection approach achieves state-of-the-art performance with minimal classification errors, demonstrating both operational reliability and benchmark-level robustness for real-world intrusion detection tasks. The minimal false negatives are particularly significant for cybersecurity applications, where missed anomalies could correspond to undetected attacks, while the low false-positive rate ensures operational efficiency by reducing unnecessary alerts. 

#### _4.1. Additional robustness evaluation on the CSE-CIC-IDS2018-based diverse intrusion dataset_ 

To address the limited DDoS-specific scope of CIC-DDoS2019, we conducted an additional evaluation on a CSE-CIC-IDS2018-based diverse intrusion dataset containing benign, botnet, brute-force, webapplication, SQL-injection, DoS, and DDoS traffic categories. This experiment provides a broader benchmark setting than CIC-DDoS2019 

and allows the proposed edge-based GNN framework to be assessed under a more diverse multi-attack scenario. However, the results are interpreted as broader benchmark robustness evidence rather than as complete generalization to all real-world cyberattack families. Table 10 shows that all evaluated models remain effective on the additional CSE-CIC-IDS2018-based diverse intrusion dataset. On the natural test split containing 45,664 samples, all models achieved Accuracy values above 0.9935 and Weighted-F1 values of approximately 0.9961. GCN achieved the highest Macro-F1 score of 0.8683, followed closely by GraphSAGE, GAT, and GIN. On the majority-downsampled balanced test split containing 9889 samples, Macro-F1 scores increased, with GCN again achieving the best Macro-F1 of 0.8857. These results strengthen the external robustness assessment of the proposed framework beyond UNSW-NB15 and the DDoS-focused CIC-DDoS2019 dataset. Nevertheless, the gap between Macro-F1 and Weighted-F1 indicates that rare classes remain more challenging than majority classes. In particular, Brute Force Web, Brute Force XSS, and SQL Injection have substantially lower support than the dominant DoS/DDoS and benign classes. Therefore, the additional experiment supports broader benchmark robustness under a more diverse intrusion setting, but the revised manuscript avoids claiming complete generalization to all possible attack families. 

Fig. 15 presents the confusion matrix of the best-performing GCN model on the natural test split of the additional CSE-CIC-IDS2018-based diverse intrusion dataset. The model correctly classifies most majority classes, including Benign, Bot, Brute Force FTP/SSH, DDoS-LOIC-HTTP, and DoS variants. However, the remaining errors are concentrated in rare or structurally similar classes. In particular, Brute Force Web is partially confused with Brute Force XSS and SQL Injection, while a subset of DDoS-HOIC samples is misclassified as Brute Force XSS. These results explain why the Weighted-F1 score remains very high whereas the Macro-F1 score is lower. Therefore, the confusion matrix supports a balanced interpretation of the additional dataset results: the proposed framework shows strong robustness under a more diverse benchmark setting, but rare web-attack and SQL-injection classes remain challenging. This limitation is particularly important for very low-support classes. For example, the SQL Injection class in the CSE-CIC-IDS2018based experiment has only 11 test samples, of which 7 are correctly classified in the reported confusion matrix. Therefore, its class-specific performance should be regarded as statistically fragile. This reinforces that rare-class results should not be overinterpreted and should be evaluated together with support values, Macro-F1, Weighted-F1, and confusion matrix analysis. 

The training curves in Fig. 16 further indicate that the rare-aware GCN model converges rapidly and remains stable during validation. Accuracy and weighted-F1 remain consistently high after the initial epochs, whereas Macro-F1 stays lower due to rare classes with limited support. This confirms that the proposed rare-class-aware training strategy improves stability, while also showing that minority-class detection remains more difficult than majority-class detection. 

Fig. 17 presents a comprehensive network attack graph illustrating the dominant attack types and their corresponding frequencies across all source–destination pairs derived from the UNSW-NB15 dataset. Each directed edge denotes the most frequent attack type between a specific source and destination, while the edge thickness reflects the relative number of occurrences, representing attack intensity. Nodes are visually categorized as attackers, targets, or both, using distinct icons to emphasize their functional roles within the network topology. The color scheme of edges differentiates various attack types, facilitating rapid identification of predominant intrusion behaviors and inter-host communication patterns. The panel on the right complements the graphical layout by listing detailed source–destination pairs along with their dominant attack type and occurrence count, offering precise quantitative insight into the frequency distribution underlying the visualized relations. Together, the graph and the tabular view provide a dual-perspective analytical framework — linking structural network 

17 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

**Table 10** 

Performance of the evaluated edge-based GNN models on the additional CSE-CIC-IDS2018-based diverse intrusion dataset. 

|Model|Test setting|Accuracy|Macro-F1|Weighted-F1|Inference time (s)|Throughput|
|---|---|---|---|---|---|---|
|GAT|Natural test|0.9935|0.8666|0.9961|0.8718|52,380.34|
|GCN|Natural test|0.9936|0.8683|0.9961|0.8411|54,290.00|
|GIN|Natural test|0.9935|0.8640|0.9961|0.7510|60,802.57|
|GraphSAGE|Natural test|0.9936|0.8667|0.9961|0.7945|57,471.55|
|GAT|Majority-downsampled balanced test|0.9922|0.8841|0.9939|0.2447|40,418.82|
|GCN|Majority-downsampled balanced test|0.9923|0.8857|0.9941|0.1379|71,711.00|
|GIN|Majority-downsampled balanced test|0.9921|0.8806|0.9939|0.1283|77,098.97|
|GraphSAGE|Majority-downsampled balanced test|0.9922|0.8841|0.9939|0.3610|27,397.11|



**Table 11** 

Recent GNN-based anomaly detection studies in cybersecurity using the UNSW-NB15 dataset. 

|Ref.|Objective|GNN Model/Architecture|Dataset(s)|Metrics|Results|
|---|---|---|---|---|---|
|[42]|Hybrid IoT anomaly detection<br>combining local & global patterns|GraphSAGE + GAT|UNSW-NB15|Accuracy (binary)|98% accuracy, outperforming<br>standalone GNNs|
|[43]|Propose a graph anomaly detection<br>method with hyperbolic embedding|GAT and Deep Graph Infomax|UNSW-NB15,<br>CICIDS2017,<br>CampusNet-Logs|F1-score, MCC|F1≈0.9341; MCC≈0.9049|
|[44]|Interactive visualization and<br>performance analysis of dynamic<br>cyber-attack graphs|GAT, SigmaJS|UNSW-NB15|Macro-F1, Micro-F1|Macro-F1: 0.9117–0.9125;<br>Micro-F1: 0.9315–0.9177|
|[45]|Class-imbalance problem in<br>intrusion detection|GraphSAGE, E-ResGAT|UNSW-NB15,<br>CIC-IDS2017|F1-score, Accuracy,<br>ROC-AUC|≈97% accuracy and F1, nearly<br>100% ROC-AUC|
|[46]|Anomaly detection at the data-link<br>level|Graph Attention Network|UNSW-NB15,<br>CIC-IDS2017|Accuracy, Precision,<br>Recall, F1|0.9785, 0.9779, 0.9785, 0.9786|
|[47]|Elastic GNN to retain knowledge<br>across tasks.|Elastic Graph Neural Network|UNSW-NB15,<br>CIC-IDS2017|Accuracy|Reached 98.44% detection<br>accuracy on UNSW-NB15|
|[48]|A novel graph embedding<br>approach for enhancing GNNs|Custom graph convolution +<br>SAGEConv|UNSW-NB15,<br>CIC-IDS2017|Accuracy, Recall,<br>Weighted F1-score, etc.|Achieved 98.65% weighted<br>F1-score on UNSW-NB15 (and<br>99.76% on CIC-IDS2017)|
|[49]|Integrate residual connections into<br>GNNs to handle extreme class<br>imbalance and enhance<br>minority-class detection in IDS.|E-GraphSAGE and E-ResGAT|UNSW-NB15,<br>DarkNet2020,<br>CSE-CIC-IDS2018,<br>ToN-IoT|F1-score (weighted &<br>macro for<br>binary/multi-class)|Binary classification<br>(F1_w≈99.50%, F1_m≈98.37%)|
|[50]|Enhance NIDS embeddings via<br>fused GCN + SAGEConv|FN-GNN (GCN + GraphSAGE)|CIC-IDS2017,<br>UNSW-NB15|Accuracy (binary)|99.76% (CIC-IDS2017), 98.65%<br>(UNSW-NB15)|
|[51]|Enhance network anomaly<br>detection in IoT and general<br>networks by leveraging GNNs|Hybrid GraphSAGE + GAT|UNSW-NB15|Accuracy, False<br>Positive Rate, etc.|Reported ≈98% detection<br>accuracy|
|[52]|Behavioral anomaly detection on<br>flow graphs|Generic GNN (node<br>embeddings + classifier)|UNSW-NB15|Accuracy (binary &<br>multi)|∼90% binary accuracy<br>(SOTA-comparable)|
|Our paper|Graph-based anomaly detection<br>and attack visualization|GCN, GAT, GIN, SAGE|UNSW-NB15|Precision, Recall, F1,<br>ROC-AUC, PR-AUC,<br>ACC|Multi-class (0.97, 0.97, 0.95,<br>0.99, 0.96) Binary<br>classification (0.98, 0.99, 0.98,<br>0.99, 0.99, 0.99)|



dynamics with statistical attack prevalence — to highlight critical nodes, recurrent threat vectors, and high-risk communication pathways requiring enhanced defensive attention. We also developed a project, SIMURG, that categorizes and visualizes different network attacks — capable of working with dynamic data — using different colors [53]. Unlike conventional classification metrics, which summarize model performance only at the class level, Fig. 18 provides topology-level and frequency-aware insight into the detected anomalies. It enables analysts to identify where anomalies occur, which attack types dominate specific source–destination relations, and which nodes or communication paths require priority attention. Therefore, the proposed visualization improves anomaly analysis by complementing standard performance metrics with attacker–target role identification, high-frequency path prioritization, and structural interpretation of attack propagation. To further assess the robustness of the proposed framework beyond the primary UNSW-NB15 benchmark and the DDoS-focused CIC-DDoS2019 validation, an additional evaluation was conducted on the CSE-CICIDS2018-based diverse intrusion dataset. This dataset includes multiple attack families, such as benign traffic, botnet activity, brute-force attacks, web-application attacks, SQL injection, DoS, and DDoS categories, thereby providing a broader multi-attack evaluation setting. As reported in Table 10, all evaluated GNN models achieved high overall performance on the natural test split, with Accuracy values above 0.9935 and Weighted-F1 values around 0.9961. Among the evaluated 

models, GCN achieved the highest Macro-F1 score, reaching 0.8683 on the natural test split and 0.8857 on the majority-downsampled balanced test split. These results indicate that the proposed edgebased graph representation remains effective under a more diverse benchmark scenario and provides stronger benchmark-level robustness evidence beyond a purely DDoS-focused validation setting. However, the difference between Weighted-F1 and Macro-F1 also shows that high overall performance should be interpreted together with classwise metrics under severe class imbalance. The confusion matrix in Fig. 15 further shows that most majority classes are classified correctly, whereas minority or structurally similar classes, particularly Brute Force Web, Brute Force XSS, and SQL Injection, remain more challenging. In addition, the training and validation curves in Fig. 16 indicate stable convergence, supporting the reliability of the reported CSE-CIC-IDS2018-based results. 

#### **5. Conclusion** 

This study presented a unified, reproducible, and interpretable graph-based benchmarking framework for network anomaly detection by evaluating GCN, GAT, GIN, and GraphSAGE under a common preprocessing pipeline, graph construction strategy, training configuration, and evaluation protocol. By modeling IP addresses as graph nodes and communication flows as directed edges with flow-level attributes, the 

18 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 





**Fig. 15.** Confusion matrix of the GCN model on the natural test split of the additional CSE-CIC-IDS2018-based diverse intrusion dataset. 





**Fig. 16.** Training stability of the GCN model on the additional CSE-CIC-IDS2018-based diverse intrusion dataset: Loss curves and validation metrics. 

proposed framework incorporates structural communication patterns into intrusion detection and enables a fair comparison of representative GNN architectures. The primary evaluation on UNSW-NB15 showed that GIN and GraphSAGE achieved the strongest overall performance, with F1-scores of 0.9693 ± 0.0007 and 0.9721 ± 0.0006, respectively. Stratified cross-validation, statistical validation, sensitivity analysis, and runtime profiling confirmed the stability of the results and showed that aggregation-based models provide a favorable balance between detection performance and computational efficiency. External robustness was further assessed using two additional datasets. CIC-DDoS2019 

was used as a complementary DDoS-focused benchmark, while the CSE-CIC-IDS2018-based dataset provided a broader multi-attack evaluation setting including botnet, brute-force, web-application, SQLinjection, DoS, and DDoS traffic categories. The CSE-CIC-IDS2018based results showed that the proposed edge-based graph representation remains effective under more diverse benchmark conditions, with GCN achieving the best Macro-F1 scores on both the natural and majority-downsampled balanced test splits. At the same time, the classwise analysis showed that rare and structurally similar classes remain challenging, indicating the importance of interpreting Weighted-F1 

19 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 



**Fig. 17.** Graph-based representation of attacker–target relations and attack categories in the UNSW-NB15 dataset. Each edge is color-coded by attack type. 

together with Macro-F1 and per-class results. Beyond quantitative performance, the D3.js-based attack topology visualization improves interpretability by mapping detected anomalies onto attacker–target relationships and highlighting dominant communication paths. Overall, the findings support the effectiveness of the proposed framework across diverse benchmark settings, while avoiding unsupported claims of complete generalization to all real-world cyberattack families. Future work will focus on temporal and dynamic graph modeling, streaming graph updates, latency-constrained deployment, heterogeneous graph construction, and validation on larger operational network datasets. 

#### **CRediT authorship contribution statement** 

**Ali Yilmaz:** Software, Methodology, Investigation, Formal analysis, Data curation, Conceptualization, Visualization, Validation, . **Resul Das:** Writing – review & editing, Writing – original draft, Visualization, Validation, Supervision, Project administration, Methodology, Investigation, Funding acquisition, Formal analysis, Conceptualization. **Mehmet Ozdem:** Writing – original draft, Resources, Investigation, Conceptualization. **Berk Canberk:** Supervision, Project administration, Conceptualization. 

#### **Declaration of competing interest** 

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

#### **Acknowledgments** 

This study is derived from Ali Yılmaz’s PhD dissertation, titled ‘‘Graph Neural Networks Based Anomaly Detection from Log Records’’ (Thesis No: 999962) at Firat University. The core framework of this thesis research was subsequently extended and internationalized during Prof. Dr. Resul Das’s postdoctoral tenure at Edinburgh Napier University (Scotland, UK), which was funded by the Scientific and Technological Research Council of Türkiye (TÜBİTAK) under the BİDEB 2219 Program. Finally, the practical application, optimization, and finalization of this integrated work were fully supported and realized under the TÜBİTAK 1515 Frontier R&D Laboratories Support Program for the Türk Telekom 6G R&D Lab (Project No. : 5249902). 

20 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 



**Fig. 18.** Visualization of source–destination attack relations and frequencies based on dominant attack types in UNSW-NB15. 

#### **Data availability** 

The authors do not have permission to share data. 

#### **References** 

- [1] J. Zhou, G. Cui, S. Hu, Z. Zhang, C. Yang, Z. Liu, L. Wang, C. Li, M. Sun, Graph neural networks: A review of methods and applications, AI Open 1 (2020) 57–81, http://dx.doi.org/10.1016/j.aiopen.2021.01.001, URL https:// www.sciencedirect.com/science/article/pii/S2666651021000012. 

- [2] P. Veličković, G. Cucurull, A. Casanova, A. Romero, P. Liò, Y. Bengio, Graph attention networks, in: International Conference on Learning Representations, ICLR, 2018, p. 12, URL https://arxiv.org/abs/1710.10903. 

- [3] K. Xu, W. Hu, J. Leskovec, S. Jegelka, How powerful are graph neural networks? 2019, URL https://arxiv.org/abs/1810.00826. 

- [4] M.A. Jahin, S. Soudeep, F.A. Farid, M. Mridha, R. Kabir, M.R. Islam, H.A. Karim, CAGN-GAT fusion: A hybrid contrastive attentive graph neural network for network intrusion detection, 2025, arXiv preprint arXiv:2503.00961. 

- [5] X. Gan, GraphService: Topology-aware constructor for large-scale graph applications, ACM Trans. Arch. Code Optim. 22 (1) (2025) http://dx.doi.org/10.1145/ 3689341. 

- [6] A. Yılmaz, R. Daş, Analysis of cybersecurity attacks and solution approaches, Int. J. Grid Util. Comput. 17 (3) (2026) 238–261, http://dx.doi.org/ 10.1504/IJGUC.2026.154426, URL https://www.inderscienceonline.com/doi/10. 1504/IJGUC.2026.154426. 

- [7] A. Yılmaz, R. Das, A novel hybrid approach combining GCN and GAT for effective anomaly detection from firewall logs in campus networks, Comput. Netw. (2025) 111082. 

- [8] J. Zhang, E. Yeh, E. Modiano, Robustness of interdependent random geometric networks, IEEE Trans. Netw. Sci. Eng. 6 (3) (2019) 474–487, http://dx.doi.org/ 10.1109/TNSE.2018.2846720. 

- [9] C. Huang, Y. Wang, Y. Jiang, M. Li, X. Huang, S. Wang, S. Pan, C. Zhou, Flow2GNN: Flexible two-way flow message passing for enhancing GNNs beyond homophily, IEEE Trans. Cybern. 54 (11) (2024) 6607–6618, http://dx.doi.org/ 10.1109/TCYB.2024.3412149. 

- [10] J. Zhang, E. Modiano, Connectivity in interdependent networks, IEEE/ACM Trans. Netw. 26 (5) (2018) 2090–2103, http://dx.doi.org/10.1109/TNET.2018. 2863715. 

- [11] W.W. Lo, S. Layeghy, M. Sarhan, M. Gallagher, M. Portmann, E-graphsage: A graph neural network based intrusion detection system for IoT, in: NOMS 20222022 IEEE/IFIP Network Operations and Management Symposium, IEEE, 2022, pp. 1–9. 

- [12] D.-H. Tran, M. Park, FN-GNN: A novel graph embedding approach for enhancing graph neural networks in network intrusion detection systems, Appl. Sci. 14 (16) (2024) http://dx.doi.org/10.3390/app14166932, URL https://www.mdpi. com/2076-3417/14/16/6932. 

- [13] Y. Wang, Z. Han, Y. Du, J. Li, X. He, BS-GAT: a network intrusion detection system based on graph neural network for edge computing, Cybersecurity 8 (1) (2025) 27. 

- [14] S. Saxena, J. Grover, S. Singhal, Exploring graph neural networks for robust network intrusion detection, Procedia Comput. Sci. 258 (2025) 3630–3639. 

- [15] A.S. Ahanger, S.M. Khan, F. Masoodi, A.O. Salau, Advanced intrusion detection in internet of things using graph attention networks, Sci. Rep. 15 (1) (2025) 9831. 

- [16] S. Yang, W. Pan, M. Li, M. Yin, H. Ren, Y. Chang, Y. Liu, S. Zhang, F. Lou, Industrial internet of things intrusion detection system based on graph neural network, Symmetry 17 (7) (2025) http://dx.doi.org/10.3390/sym17070997, URL https://www.mdpi.com/2073-8994/17/7/997. 

21 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 

- [17] T. Ngo, J. Yin, Y.-F. Ge, H. Wang, Optimizing IoT intrusion detection—A graph neural network approach with attribute-based graph construction, Information 16 (6) (2025) http://dx.doi.org/10.3390/info16060499, URL https://www.mdpi. com/2078-2489/16/6/499. 

- [18] Y. Zhao, Z. Liu, J. Pang, Anomaly detection in network traffic via cross-domain federated graph representation learning, Appl. Sci. 15 (11) (2025) 6258. 

- [19] E. Amer, S. El-Sappagh, T. Abuhamad, B.A.S. Al-Rimy, A. Mohasseb, GraphShield: advanced dynamic graph-based malware detection using graph neural networks, Expert Syst. Appl. (2025) 129812. 

- [20] M. Anjum, A.K. Dutta, A. Elrashidi, S. Shahab, A. Aldrees, Z.A. Shaikh, A. Aljohani, GraphFedAI framework for DDoS attack detection in IoT systems using federated learning and graph based artificial intelligence, Sci. Rep. 15 (1) (2025) 28050. 

- [21] W. Jianping, Q. Guangqiu, W. Chunming, J. Weiwei, J. Jiahe, Federated learning for network attack detection using attention-based graph neural networks, Sci. Rep. 14 (1) (2024) 19088. 

- [22] W. Marfo, D.K. Tosh, S.V. Moore, Enhancing network anomaly detection using graph neural networks, in: 2024 22nd Mediterranean Communication and Computer Networking Conference, MedComNet, 2024, pp. 1–10, http://dx.doi. org/10.1109/MedComNet62012.2024.10578278. 

- [23] Z. Chang, Y. Cai, X.F. Liu, Z. Xie, Y. Liu, Q. Zhan, Anomalous node detection in blockchain networks based on graph neural networks, Sensors 25 (1) (2024) 1. 

- [24] R. Zaccagnino, A. Cirillo, A. Guarino, N. Lettieri, D. Malandrino, G. Zaccagnino, Towards a geometric deep learning-based cyber security: Network system intrusion detection using graph neural networks, in: Proceedings of the 20th International Conference on Security and Cryptography, SECRYPT, SciTePress, INSTICC, 2023, pp. 394–401, http://dx.doi.org/10.5220/0012085700003555. 

- [25] Y. Tian, G. Liu, J. Wang, M. Zhou, Transaction fraud detection via an adaptive graph neural network, 2023, arXiv preprint arXiv:2307.05633. 

- [26] Q. Sha, T. Tang, X. Du, J. Liu, Y. Wang, Y. Sheng, Detecting credit card fraud via heterogeneous graph neural networks with graph attention, 2025, arXiv preprint arXiv:2504.08183. 

- [27] A. Asiri, K. Somasundaram, Graph convolution network for fraud detection in bitcoin transactions, Sci. Rep. 15 (1) (2025) 11076. 

- [28] L. Yin, W. Chen, X. Luo, H. Yang, Efficient large-scale IoT botnet detection through graphsaint-based subgraph sampling and graph isomorphism network, Mathematics 12 (9) (2024) http://dx.doi.org/10.3390/math12091315, URL https://www.mdpi.com/2227-7390/12/9/1315. 

- [29] Y. Zhao, Z. Liu, J. Pang, Anomaly detection in network traffic via cross-domain federated graph representation learning, Appl. Sci. 15 (11) (2025) http://dx. doi.org/10.3390/app15116258, URL https://www.mdpi.com/2076-3417/15/11/ 6258. 

- [30] A. Jobe, R. Ky, S. Luo, A. Dhamsania, S. Purohit, E. Serra, Power grid anomaly detection via hybrid LSTM-GIN model (student abstract), in: Proceedings of the AAAI Conference on Artificial Intelligence, vol. 38, 2024, pp. 23525–23527. 

- [31] C. Do Xuan, D. Huong, A new approach for APT malware detection based on deep graph network for endpoint systems, Appl. Intell. 52 (12) (2022) 14005–14024. 

- [32] X. Gan, TianheGraph: Topology-aware graph processing, ACM Trans. Archit. Code Optim. (2025) http://dx.doi.org/10.1145/3750450. 

- [33] K. Zhang, Y. Wang, U.A. Bhatti, Y. Zhou, M. Jin, Enhanced ransomware attacks detection using feature selection, sensitivity analysis, and optimized hybrid model, J. Big Data 12 (1) (2025) 245, http://dx.doi.org/10.1186/s40537-02501289-1. 

- [34] J. Lyu, G. Xu, F. Bao, Y. Zhou, Y. Liu, S. Lu, W. Zheng, Multi-label classification model using graph convolutional neural network for social network nodes, Comput. Model. Eng. Sci. (2025) http://dx.doi.org/10.32604/cmes.2025.075239. 

- [35] T. Meng, Y. Shou, W. Ai, J. Du, H. Liu, K. Li, A multi-message passing framework based on heterogeneous graphs in conversational emotion recognition, Neurocomputing 569 (2024) 127109, http://dx.doi.org/10.1016/ j.neucom.2023.127109, URL https://www.sciencedirect.com/science/article/pii/ S0925231223012328. 

- [36] D. Wang, P. Wang, Two birds with one stone: Two-factor authentication with security beyond conventional bound, IEEE Trans. Dependable Secur. Comput. 15 (4) (2018) 708–722, http://dx.doi.org/10.1109/TDSC.2016.2605087. 

- [37] Q. Wang, D. Wang, C. Cheng, D. He, Quantum2FA: Efficient quantum-resistant two-factor authentication scheme for mobile devices, IEEE Trans. Dependable Secur. Comput. 20 (1) (2023) 193–208, http://dx.doi.org/10.1109/TDSC.2021. 3129512. 

- [38] N. Moustafa, J. Slay, UNSW-NB15: a comprehensive data set for network intrusion detection systems (UNSW-NB15 network data set), in: 2015 Military Communications and Information Systems Conference, MilCIS, IEEE, 2015, pp. 1–6. 

- [39] D. Javaheri, S. Gorgin, J.-A. Lee, M. Masdari, Fuzzy logic-based DDoS attacks and network traffic anomaly detection methods: Classification, overview, and future perspectives, Inform. Sci. 626 (2023) 315–338, http://dx.doi.org/10. 1016/j.ins.2023.01.067, URL https://www.sciencedirect.com/science/article/pii/ S0020025523000683. 

- [40] T.N. Kipf, M. Welling, Semi-supervised classification with graph convolutional networks, 2016, CoRR abs/1609.02907 URL http://arxiv.org/abs/1609.02907. 

- [41] H. Latif, J. Paillissé, J. Yang, A. Cabellos-Aparicio, P. Barlet-Ros, Unveiling the potential of graph neural networks for BGP anomaly detection, in: Proceedings of the 1st International Workshop on Graph Neural Networking, 2022, pp. 7–12. 

- [42] A. Dadhania, P. Dave, J. Bhatia, R. Mehta, M. Kumhar, S. Tanwar, A. Alabdulatif, Software defined network and graph neural network-based anomaly detection scheme for high speed networks, Cyber Secur. Appl. 3 (2025) 100079. 

- [43] H. Zhang, Y. Zhou, H. Xu, J. Shi, X. Lin, Y. Gao, Graph neural network approach with spatial structure to anomaly detection of network data, J. Big Data 12 (1) (2025) 105. 

- [44] M. Soylu, R. Das, Prediction and graph visualization of cyber attacks using graph attention networks, Comput. Secur. (2025) 104534. 

- [45] G.-Y. Yang, F. Wang, K.-H. Yeh, GNN-enhanced traffic anomaly detection for next-generation SDN-enabled consumer electronics, IEEE Trans. Consum. Electron. (2025) 1, http://dx.doi.org/10.1109/TCE.2025.3620095. 

- [46] X. Gao, L. Tan, S. Chen, P. Zhang, J. Wang, Malicious traffic detection on tofino using graph attention model, Appl. Sci. 15 (13) (2025) 7179. 

- [47] T.-T. Nguyen, M. Park, EL-GNN: A continual-learning-based graph neural network for task-incremental intrusion detection systems, Electronics 14 (14) (2025) http: //dx.doi.org/10.3390/electronics14142756, URL https://www.mdpi.com/20799292/14/14/2756. 

- [48] D.-H. Tran, M. Park, FN-GNN: A novel graph embedding approach for enhancing graph neural networks in network intrusion detection systems, Appl. Sci. 14 (16) (2024) 6932. 

- [49] L. Chang, P. Branco, Embedding residuals in graph-based solutions: the E- ResSAGE and E-ResGAT algorithms. A case study in intrusion detection, Appl. Intell. 54 (8) (2024) 6025–6040. 

- [50] Z. Sun, A.M. Teixeira, S. Toor, GNN-IDS: Graph neural network based intrusion detection system, in: Proceedings of the 19th International Conference on Availability, Reliability and Security, ARES ’24, Association for Computing Machinery, New York, NY, USA, 2024, pp. 1–12, http://dx.doi.org/10.1145/ 3664476.3664515. 

- [51] W. Marfo, D.K. Tosh, S.V. Moore, Enhancing network anomaly detection using graph neural networks, in: 2024 22nd Mediterranean Communication and Computer Networking Conference, MedComNet, IEEE, 2024, pp. 1–10. 

- [52] T. Altaf, X. Wang, W. Ni, G. Yu, R.P. Liu, R. Braun, GNN-based network traffic analysis for the detection of sequential attacks in IoT, Electronics 13 (12) (2024) http://dx.doi.org/10.3390/electronics13122274, URL https://www.mdpi. com/2079-9292/13/12/2274. 

- [53] R. Das, M.O. Kaya, SIMURG: Strategic intelligent framework for real-time 3D visualization and high-altitude analysis of global cyber threats, EAI Endorsed Trans. Ind. Netw. Intell. Syst. 13 (3) (2026). 

**Ali Yılmaz** is a lecturer at Van Yuzuncu Yil University. He obtained his B.Sc. in Computer Engineering from Suleyman Demirel University in 2013, his M.Sc. in Electrical and Electronics Engineering from Siirt University in 2019, and his Ph.D. in Software Engineering from Fırat University in 2026. His research interests include cybersecurity, computer networks, graph neural networks (GNNs), IoT/M2M applications, software quality assurance, data analysis, and visualization. 



**Resul Daş** is a full Professor in the Department of Software Engineering at Firat University, Turkey. He is currently a Visiting Professor and Researcher in the Department of Cyber Security and System Engineering at Edinburgh Napier University, UK, under the prestigious TUBITAK-BIDEB 2219 Postdoctoral Research Fellowship program. He earned his B.Sc. and M.Sc. degrees in Computer Science from Firat University in 1999 and 2002, respectively, and obtained his Ph.D. in Electrical and Electronics Engineering in 2008. From 2017 to 2018, he conducted research as a Postdoctoral Fellow at the University of Alberta, Canada. Between 2000 and 2011, he served as a lecturer in the Department of Informatics while concurrently working as a network and system administrator at the University’s IT Center. Since 2002, he has been a certified instructor in the Cisco Networking Academy Program, delivering CCNA and CCNP courses. Prof. Daş has held significant leadership roles, including Head of the Software Engineering Department (2020–2023). He is a member of the Türk Telekom Network Science Board and has served as an Academic Consultant for prominent technology firms such as Logo Software, Netaş, Türk Telekom, AktifTech, and DGH Software on major TUBITAK and Ministry of Industry-supported R&D projects. Professor Resul Das is globally recognized for his 



22 

_A. Yilmaz et al._ 

_Computer Networks 288 (2026) 112632_ 



academic excellence, having been consistently listed among the "World’s Top 2% Most Influential Scientists" by Stanford University for seven consecutive years (2019–2025). According to Google Scholar, he holds an h-index of 32 with over 6500 citations. He serves as an Associate Editor for several prestigious journals, including Internet of Things (Elsevier), Alexandria Engineering Journal (Elsevier), Telematics and Informatics Reports (Elsevier), IEEE Open Journal of the Communications Society (OJ-COMS), and the International Journal of Grid and Utility Computing (Inderscience). To date, he has successfully supervised 8 Ph.D. and 10 M.Sc. graduates. His primary research interests include computer networks, cybersecurity, AI-based IoT and systems engineering, graph data science and visualization, and software quality assurance and testing. 

**Mehmet Özdem** received his BS degree from Başkent University, Department of Electrical and Electronics Engineering in 2002, his MS degree from Middle East Technical University, Institute of Informatics in 2007, and his PhD degree from Gazi University, Institute of Science, Department of Electrical and Electronics Engineering in 2021. He has more than 20 years of experience in the Telecommunications industry. He worked in many groups (investment, planning, operation, quality assurance, and architecture teams). He currently works as the Network Architecture & Quality Assurance Director and Head of R&D Centers, following responsibilities in Turk Telekom. Currently, he is Vice President of ITU (International Telecommunication Union) SG12 and QSDG organizations. He is also a board member of the Wireless Broadband Alliance. He lectures part-time at universities and has international certificates such as CCIE, PMP, and ITIL. 



**Berk Canberk** (Senior Member, IEEE) is a full professor at Edinburgh Napier University, UK. His research focuses on AI-powered Digital Twins, IoT communication, and Smart Wireless Networks, spanning Technology Readiness Levels (TRL) 1 to 6. As a leading expert in Digital Twin technologies, he specializes in real-time synchronization, AI-driven orchestration, and semantic communication frameworks. He leads the Broadband Communication Research Group (www. bcrg.uk), where he currently supervises 1 postdoctoral researcher, 5 Ph.D. students, 2 B.Sc. students, and 2 research associates. He has previously supervised 8 Ph.D. and 20 M.Sc. graduates. His publication record includes more than 87 journal articles, 96 conference papers, and 10 patents, of which 40 journal articles, 32 conference papers, and 6 patents are specifically focused on Digital Twins. Since 2020, he has secured over £1.5M in research funding as Principal Investigator. He serves as Lead Editor of the IEEE ComSoc Best Readings in Digital Twins and as Area Editor for IEEE Communications Surveys and Tutorials. He has also served as Associate Editor for IEEE Transactions on Vehicular Technology, Elsevier Computer Networks, and IEEE Communications Letters, and has taken on key roles as General Chair, TPC Chair, and Organizing Committee Member at several IEEE conferences. Prof. Canberk is also an External Board Member and academic advisor to BTS company. Prior to his current position, he was a Full Professor at Istanbul Technical University (ITU), where he served as Associate Professor (2016–2021) and Full Professor (2021–2022) in the Department of Computer Engineering. He was previously a Postdoctoral Researcher at the Georgia Institute of Technology, USA. He holds a Ph.D. in Computer Science from ITU, an M.Sc. in Telecommunications Engineering from Chalmers University of Technology, Sweden, and a B.Sc. in Electrical Engineering from ITU. 

23 

