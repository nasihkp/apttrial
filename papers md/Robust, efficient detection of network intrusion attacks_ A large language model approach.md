Computer Networks 287 (2026) 112559 



Contents lists available at ScienceDirect 

# Computer Networks 

journal homepage: www.elsevier.com/locate/comnet 



## Robust, efficient detection of network intrusion attacks: A large language model approach<sup>$,$$</sup> 



Giancarlo Iannizzotto ∗, Andrea Nucita, Andrea Siragusa 

_Department of Cognitive Science, Education and Cultural Studies (COSPECS), University of Messina, Messina, Italy_ 

### A R T I C L E I N F O 

### A B S T R A C T 

_Keywords:_ Network intrusion detection Deep learning Large language models (LLMs) Edge computing Cybersecurity 

Network intrusion detection systems (NIDS) are critical for safeguarding modern organizations against an increasing number of different cyber threats. Traditional NIDS approaches, whether signature-based or anomaly-based, exhibit limitations in detecting novel or complex attacks and often struggle with adaptability in dynamic network environments. This paper introduces LLM-NIRED (Large Language Model-based Network Intrusion Robust Efficient Detection), a novel network intrusion detection system (NIDS) leveraging advanced Large Language Models (LLMs) that aims to provide a flexible, memory efficient solution that is robust to previously unseen networks and suitable for running on edge devices. In this context, we define ‘robust’ as the model’s demonstrated capacity to generalize effectively across unseen network topologies and novel traffic distributions, a common failing point for traditional deep learning-based NIDS. By treating network traffic as sequences of tokens, our fine-tuned model identifies complex attack patterns. While rich anomaly-based profiles constructed from the same datasets can also detect similar traffic behaviors, our LLM-based approach natively captures sequential dependencies, with accuracy approaching 99% on zero-overlap external datasets. It outperforms state-of-the-art deep learning and BERT-based NIDS in generalization, while exhibiting better memory efficiency and inference times comparable to existing transformer-based approaches. Furthermore, we explore the feasibility of deploying a lightweight variant of LLM-NIRED (TinyLLM) on resource-constrained edge devices, showcasing its potential for on-edge analysis with minimal computational overhead. 

#### **1. Introduction** 

Intrusions into network infrastructures pose a significant and escalating threat to organizations globally, potentially leading to severe data breaches, substantial financial losses, and irreparable reputational damage [1]. To counteract such a threat, Intrusion Detection Systems (IDS) typically operate on two primary principles: signature-based detection and anomaly-based detection [2]. Signature-based systems identify threats by matching observed network activities against a database of known attack patterns, offering high accuracy for previously identified threats but failing to detect novel or zero-day attacks. Conversely, anomaly-based systems analyze network operations and compare them against a predefined profile of normal system behavior, flagging deviations as suspicious. While this approach holds greater potential for detecting unknown attacks, it is often plagued by high false positive rates due to the dynamic nature of network traffic [1]. The 

optimal strategy for robust intrusion detection, therefore, often involves a mixed approach, combining the strengths of both methodologies [3]. 

The increasing complexity of cyber attacks, including advanced persistent threats (APTs) and distributed denial-of-service (DDoS) campaigns, necessitates more sophisticated detection mechanisms. In this context, deep learning (DL) has emerged as a promising paradigm for intrusion detection systems, owing to its inherent capability to capture intricate and non-linear attack patterns that are often imperceptible to traditional methods [4]. 

To fully contextualize the application of Deep Learning (DL) in Network Intrusion Detection Systems (NIDS), it is helpful to view these models as an evolutionary continuum of pattern recognition tools, each addressing the limitations of its predecessor. Early deep learning adoptions heavily utilized Convolutional Neural Networks (CNNs); originally designed for computer vision, CNNs were adapted to extract localized, high-resolution features from network traffic by treating packet byte structures as multidimensional grids [3]. However, because 

- $ This article is part of a Special issue entitled: ‘Cybersec Attacks and Defenses’ published in Computer Networks. 

- $$ This work was partially supported by project SERICS (PE00000014) under the MUR National Recovery and Resilience Plan funded by the European Union - NextGenerationEU. 

- ∗ Corresponding author. 

_E-mail addresses:_ giancarlo.iannizzotto@unime.it (G. Iannizzotto), andrea.nucita@unime.it (A. Nucita), andrysiragusa@gmail.com (A. Siragusa). 

https://doi.org/10.1016/j.comnet.2026.112559 

Received 30 October 2025; Received in revised form 1 June 2026; Accepted 5 July 2026 Available online 11 July 2026 

1389-1286/© 2026 The Authors. Published by Elsevier B.V. This is an open access article under the CC BY license ( http://creativecommons.org/licenses/by/4.0/ ). 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

network traffic is intrinsically time-series data, Recurrent Neural Networks (RNNs) and their advanced variants, such as Long Short-Term Memory (LSTM) networks, gained prominence. Unlike CNNs, RNNs maintain an internal state, allowing them to capture the temporal context and sequential nature of packets within a continuous flow [3]. 

Despite their temporal advantages, traditional sequential models like RNNs can lose critical information when processing very long input sequences [5]. To overcome this, the Transformer architecture was introduced, replacing sequential recurrence with a self-attention mechanism [6]. Transformers evaluate the entire sequence simultaneously, allowing them to process data in parallel and capture long-range dependencies between distant network events seamlessly [5]. Large Language Models (LLMs) represent the massive scaling of this Transformer architecture. By treating flow characteristics (such as IPs, ports, and protocols) as sequences of ‘tokens’ analogous to words in a sentence, LLMs transcend traditional mathematical feature-extraction. They evaluate network behavior semantically, understanding the ‘grammar’ of normal traffic to identify the subtle, complex deviations indicative of modern cyber threats [7]. 

The recent proliferation of interconnected devices, particularly within the Internet of Things (IoT) ecosystem, has amplified the need for distributed intrusion detection systems (DIDS) [1]. DIDS offer distinct advantages over centralized IDS (CIDS), including enhanced scalability, greater adaptability to heterogeneous network environments, and improved data privacy by processing data closer to its source, leveraging edge-computing approaches. The adoption of edge computing, a distributed computing paradigm where data processing occurs near the data generation source rather than in centralized data centers or the cloud, is increasingly vital for DIDS, especially in IoT contexts [8]. In fact, edge computing significantly reduces latency, conserves bandwidth, and facilitates real-time data processing, which is crucial for instantaneous threat response. However, edge-based DIDS face challenges related to limited computational resources and the imperative to operate effectively with localized data [9]. As a consequence, reducing computational complexity and memory footprint, while maintaining accuracy and robustness, is a requirement for future DIDS approaches [10] and suggests the adoption of combined or tiered intrusion detection architectures able to manage both timely, on-line detection and more complex and insidious threats. 

In this view, this paper introduces LLM-NIRED<sup>1</sup> (Large Language Model-based Network Intrusion Robust Efficient Detection), a research initiative intended to develop a Tier-2 network intrusion detection system grounded in deep learning techniques, specifically in Large Language Models (LLMs). In this architectural context, a Tier-2 system functions as a secondary deep-inspection engine. Rather than performing high-speed inline packet filtering (which is typically handled by primary Tier-1 defenses like Suricata), a Tier-2 NIDS is dedicated to the analysis of complex, ambiguous, or pre-flagged traffic flows that require deeper contextual evaluation. 

The core objectives of LLM-NIRED are multifaceted: 

- To develop _adaptable models_ capable of lightweight fine-tuning, thereby evolving with emerging threat landscapes. 

- To demonstrate the capacity of the proposed approach to _generalize effectively across unseen network topologies and novel traffic distributions_ , a common failing point for traditional deep learning NIDS. 

- To pave the way for _distributed edge/on-device detection_ using lightweight and resource-optimized large language models, thus addressing resource constraints on edge nodes. 

> 1 The base model for LLM-NIRED is publicly available though the Huggingface repository at: https://huggingface.co/PathSRL8/mistral_cidds_ finetuning. 

LLM-NIRED leverages the power of Large Language Models to process and understand sequential data, treating network traffic flows as analogous to natural language sequences [11]. This semantic approach allows the system to identify complex behavioral patterns indicative of intrusions, offering a paradigm shift from traditional numerical and feature-engineering-heavy methods. Our contributions include a detailed exposition of the LLM-NIRED methodology and comprehensive experimental results demonstrating its robust generalization capabilities across unseen network topologies compared to existing transformer-based models. Furthermore, we provide an analysis of its operational feasibility, highlighting significant improvements in memory utilization and parameter efficiency, particularly validating its potential for TinyML and resource-constrained edge device deployment. 

#### **2. Related work** 

The field of network intrusion detection has seen a rapid evolution, driven by a deeper understanding of cyberattacks and machine learning techniques. This section provides a review of existing literature, categorizing approaches based on their underlying methodologies to contextualize the unique contributions of LLM-NIRED. 

Traditional IDS often rely on statistical analysis, rule-based systems, or classical machine learning algorithms. While not the primary focus of this paper’s deep learning-centric approach, these methods form the foundational understanding of NIDS. For instance, statistical methods detect anomalies by identifying deviations from normal traffic baselines, while rule-based systems rely on expert-defined signatures. Classical machine learning algorithms, such as Support Vector Machines (SVM), Decision Trees (DT), K-means, DBSCAN, and Naive Bayes (NB), have been widely employed for both classification and clustering in NIDS [1]. Ensemble methods, combining multiple models [12], and evolutionary algorithms for optimization [13] also contribute to improving performance. However, these approaches often struggle with the increasing volume, velocity, and variety of network traffic, as well as the sophistication of modern, stealthy attacks. They typically require extensive feature engineering and may not generalize well to unseen attack patterns. 

DarkVec [14] and i-DarkVec [15] are notable examples that apply word embedding techniques, traditionally from Natural Language Processing (NLP), to analyze darknet traffic, that is, traffic routed to unused or unallocated IP spaces, typically indicative of automated scanning or malicious reconnaissance. While they use embeddings (often associated with deep learning), their core mechanism for clustering and identifying similar senders is not a deep neural network for classification. DarkVec treats source IPs as ‘‘words’’ and temporal sequences of IPs as ‘‘phrases’’ to build embeddings, which are then used for semisupervised or unsupervised clustering. It defines ‘‘services’’ based on destination ports to group packet sequences. The original DarkVec method processes all data in a single batch, creating a static embedding space. i-DarkVec improves upon this by implementing incremental training, updating embeddings progressively as new data arrives, enhancing scalability and adaptability to dynamic traffic changes. These methods are particularly effective for identifying coordinated activities like botnets by grouping senders with similar behaviors over time, demonstrating the power of representing network flows as linguistic sequences. 

The capacity of deep learning to capture complex attack patterns has spurred numerous studies in intrusion detection. A systematic literature review by Yang et al. [1] highlights the increasing focus on anomalybased NIDS, emphasizing the importance of rigorous pre-processing techniques such as data cleaning (handling noisy, inaccurate, or incomplete data), managing imbalanced datasets (e.g., using SMOTE or ADASYN oversampling/undersampling), data transformation (categorical to numerical, normalization), feature selection, and feature extraction (e.g., PCA, LDA, autoencoders). Following these rigorous 

2 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

pre-processing steps, the evaluation of such deep learning models relies on standardized performance indicators; the adopted common evaluation metrics include accuracy, precision, recall, F1-score, and False Alarm Rate (FAR). 

Ferrag et al. [3] provide a comprehensive overview of deep learning approaches for cybersecurity intrusion detection, evaluating various architectures on real network traffic datasets. They discuss Restricted Boltzmann Machines (RBMs) for combining generative models with classification, Deep Belief Networks (DBNs) for improved performance over SVMs, and Autoencoders for dimensionality reduction and feature extraction, especially effective in anomaly detection where the model is trained on ‘normal’ traffic and flags data it cannot faithfully reconstruct. Convolutional Neural Networks (CNNs) are recognized for high-resolution feature extraction, and Recurrent Neural Networks (RNNs) are highlighted for their suitability in analyzing sequential data like network traffic due to their ability to maintain internal state and capture temporal context. Dense Neural Networks (DNNs), or Fully Connected layers, are also widely used for classifying normal versus anomalous traffic. In general, CNNs and Deep Autoencoders demonstrated superior performance in terms of detection rates, whereas DBNs and DBMs excelled in identifying particular attack types. However, the paper does not describe in detail the data pre-processing approach adopted to produce the presented results. Notably, data pre-processing is considered a very critical step when working with deep learning architectures, as it may strongly affect the overall performance of the proposed approach. 

Akgun et al. [4] proposed a new Distributed Denial of Service (DDoS) attack detection model based on deep learning. Though focused only on a specific type of attack (that is, DDoS) this work is important because it emphasized rigorous data cleaning (removing redundant, zero, null, or duplicate data) and feature selection using Info Gain Attribute Evaluation. An innovative CNN model was introduced, with Inception-like blocks, that was designed to process features effectively by subdividing them into bytes, especially for features with high maximum values (e.g., timestamp). The presented model achieved high accuracy in DDoS detection (99.30% multi-class and 99.99% binary classification) on the CIC-DDoS2019 dataset, underscoring the importance of data pre-processing. 

Further deep learning contributions include lightweight models based on CNN and knowledge distillation [16], which aim for high performance with low complexity, and hybrid deep learning models like EAID-OADRHM (LSTM-Autoencoder with improved Snow Ablation Optimizer for dimensionality reduction) [17]. LSTM models with advanced optimization strategies have also been explored, such as in [18]. For edge computing environments, CNN-based intrusion detection systems have been proposed to analyze large amounts of data in real time, enhancing accuracy and reducing false positives despite limited resources [9]. Ensemble models combining Balanced Bagging, XGBoost, and Random Forest have also been explored for datasets with class imbalance and overlap, such as UNSW-NB15 [19]. All the above approaches strongly rely on complex feature selection [20] and data filtering and pre-processing, which may lead to computational and time overhead and, in some cases, to hidden data leakage from the test to the training dataset (for example, when using multifold cross-validation [21], also in combination with data normalization approaches [22]). The Transformer architecture, initially introduced by Vaswani et al. [6], revolutionized NLP and has since found applications in NIDS [5]. Its key strength lies in handling sequential data and capturing long-range dependencies through the self-attention mechanism, allowing parallel processing and faster training compared to recurrent neural networks (RNNs). BERT (Bidirectional Encoder Representations from Transformers) is a Transformer variant based solely on encoders, making it suitable for classification tasks. It is pre-trained using techniques like masked language modeling and next sentence prediction, allowing it to consider tokens in both directions [23]. 

Nguyen and Watabe [24] proposed a flow-based NIDS utilizing BERT, treating network flows as linguistic sequences to improve domain adaptation, where most traditional ML classifiers meet their limitations. Their approach aimed to overcome poor generalization across different domains by leveraging BERT’s ability to understand context. Similarly, [25] proposed an IDS combining BERT with SMOTE (Synthetic Minority Over-sampling Technique) for data balancing and a Multi-Layer Perceptron (MLP) classifier. This combination aimed for high accuracy even with imbalanced datasets by leveraging BERT’s contextual understanding of network information. 

Long et al. [5] also presented a Transformer-based intrusion detection model for anomaly detection, specifically designed to overcome the limitations of traditional Seq2Seq models, which can lose critical information with long input sequences. Their model uses an encoder-only Transformer with a fully connected layer and Softmax for classification, relying on the attention mechanism to focus on relevant parts of the input. 

Kumar Nandi et al. [26] provided a comprehensive overview of Large Language Models (LLMs) in cyber-defense, highlighting their potential to enhance threat detection. LLMs, built on the Transformer architecture, are capable of understanding and generating natural language by being trained on vast textual data, and their self-attention mechanism enables parallel information processing and captures longterm dependencies, making them efficient. As a consequence, popular LLMs like BERT and GPT (Generative Pre-trained Transformer) are often pre-trained and then fine-tuned for specific IDS tasks. 

In cybersecurity, LLMs can analyze massive volumes of diverse data, including network traffic and system logs, to identify anomalies indicative of suspicious behavior. By treating network traffic as sequences of tokens, analogous to language, LLMs can model threat behavior, detect anomalies, and identify new attack variants using NLP-inspired methods. Specific applications include phishing email detection, automated security routines, incident response, and even creating dynamic honeypots and Distributed Denial of Service attack detection [27]. 

Kheddar [28] provides a more updated analysis of the utilization of Transformers and Large Language Models (LLMs) in IDS. An extensive taxonomy of various Transformer models is proposed, including Attention-based methods, hybrid CNN/LSTM-Transformers, and LLMs like BERT and GPT. The considered applications span diverse environments such as computer networks, IoT, critical infrastructure, cloud computing, and autonomous vehicles (AVs), including critical issues like interpretability, scalability, and adaptability to evolving threats. 

A novel approach using a Gaussian Mixture Model on top of a BERTbased encoder has been recently introduced by Adjewa et al. [29]. The proposed method also entails a data pre-processing pipeline that applies the Privacy-Preserving Fixed-Length Encoding (PPFLE) technique by Ferrag et al. [30] to translate the input data into a more suitable format, and the ByteLevelBPETokenizer [31] to divide the encoded text into subword units. The discrimination ability of the proposed approach is tested on the CSE-CIC-IDS-2018 dataset and is claimed to obtain a recall of 100%, but most of the experimentation is concentrated on the attack classification accuracy, whereas recall alone is used to measure the performance of the proposed approach for attack discrimination. 

A very recent approach to network intrusion detection was introduced in [32], where a combination of LLM and Retrieval Augmented Generation (RAG) based on a specialized embedding model named FE-Net is applied to detect several classes of attacks. The proposed approach outperforms several works in the literature and paves the way for flexible LLM architectures that do not rely on fine-tuning to adapt to mutated network and traffic conditions; however, the combined architecture shows high computational and memory requirements that render it less suitable for low-resource edge devices. 

LLM-based techniques arguably represent the most recent and advanced approach to NIDS, and LLM-NIRED aims to contribute significantly to this emerging area by demonstrating the efficacy of its customized LLM architecture and data processing pipeline. 

3 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

#### **3. Proposed methodology** 

LLM-NIRED is centered on developing a network intrusion detection system (NIDS) that leverages deep learning techniques, specifically Large Language Models (LLMs). The overarching goal is to develop a scalable and flexible system capable of robust and accurate cyberattack detection by deploying an LLM model at the network edge. To achieve this, the methodology is divided into an offline Training Phase and an online Inference Phase. During the Training Phase, raw data is pre-processed and the model is fine-tuned. Conversely, during the Inference Phase, incoming network flows are dynamically transformed into prompts (with the ‘Output’ field left empty) and fed to the model for real-time prediction. 

The initial effort is on Data Collection and Pre-processing, where raw network traffic data is first acquired, anonymized, and prepared for consumption by the learning model. Although the proposed approach is inherently designed to operate efficiently with real-life network data, sampled by such tools as Suricata [33], the performance and validation tests detailed in this work were primarily conducted using publicly available datasets to ensure repeatability. The output of this phase is structured into a standardized prompt format, treating network flow characteristics as sequential ‘‘tokens’’ suitable for the language model, for instance: 

#### <s>### Instruction: 

Check if the given traffic flow is normal or suspicious, output must be normal or suspicious 

#### ### Input: 

Start frame: 2017-03-14T17:43:57.172000, End frame: 2017-03-14T17:44:17.172000, Source IP: OPENSTACK\_NET, Duration: 162917.484, Protocol: TCP, Source port: 2, Destination IP: 1, Destination port: 1, Number of packets: 16772 

#### ### Output: 

normal</s> 

In the example above, the desired output for that specific sample is specified for the sake of training; whereas, for the inference phase, the ‘‘Output’’ field is left empty. 

Subsequently, the process entails Model Tuning and integration, focusing on specializing the core detection mechanism. A Large Language Model (LLM), specifically Mistral-7B v0.1 [34], is selected as the foundational architecture. This model is then fine-tuned for the specific domain of network intrusion. 

Following these developmental stages, System Implementation involves deploying a prototype NIDS within a controlled environment to test its operational reality. 

The final phase, Evaluation and Refinement, requires the system to undergo rigorous assessment using real-world datasets. The evaluation criteria place a primary focus on accuracy, the rate of false positives (False Alarm Rate - FAR), the F1-Score, and the response times (inference times). This phase includes a crucial comparative evaluation strategy against state-of-the-art NIDS models, testing the Mistral model on external datasets and assessing alternative approaches on the project’s own reference data. 

Computational efficiency is also taken into account, requiring detailed measurement of GPU memory utilization and inference times to validate the system’s feasibility for operation in resource-constrained edge computing environments. As a consequence, testing the viability of highly compressed models via TinyML techniques (such as TinyMistral), demonstrated that high accuracy can be restored with minimal incremental fine-tuning on new network data. 



**Fig. 1.** Types of cyber attacks. 

#### _3.1. Data sources and pre-processing_ 

The effectiveness of deep learning models in intrusion detection heavily relies on the diversity and quality of the datasets used for training and evaluation, which must reflect real-world scenarios, encompassing both benign and malicious activities. Network threat detection datasets are categorized by data type and attack scenarios, including network traffic-based (DoS/DDoS), application/protocol-specific (SQL injection, XSS), IoT, system/host-based (U2R, R2L), hybrid (APTs), synthetic/simulated, and legacy datasets (e.g., KDD Cup 1999). Fig. 1 illustrates common types of cyber attacks. 

For its real-life application, LLM-NIRED will primarily focus on Suricata logs, with the flexibility to incorporate other datasets and generate synthetic data where real data are insufficient. Suricata [33] is an IDS that analyzes network traffic in real-time, logging detailed information at the packet, flow, and protocol levels. Its logs, structured in JSON format, capture metadata such as IP addresses, ports, protocols, timestamps, traffic volume, and application-specific details (HTTP, DNS, TLS). It also generates alerts based on predefined attack signatures. 

For complex attacks like APTs, analyzing combined flows across all protocols is recommended to capture the full sequence of communication and subtle interactions that might otherwise be missed [5]. However, flow-level logs may not retain some critical information from traffic data, thus inherently reducing the effectiveness of the IDS. 

In order to capture the most significant and salient information, LLM-NIRED is able to incorporate data directly from PCAP (Packet Capture) files or from Suricata packet-level logs, thus gathering highly granular network traffic information [35]. A custom Python script was developed to process PCAP and Suricata packet-level logs and extract core information from each packet (see Table 1). 

The extracted information is subsequently aggregated into flows based on source/destination IPs, ports, and protocols, with flows being closed after a defined timeout or protocol change. For each flow, a set of features is generated and stored to represent the traffic within a dataset. 

Consequently, LLM-NIRED can be considered a flow-based approach, even though it can process packet-level logs by internally aggregating the input data into network flows. 

LLM-NIRED intentionally retains environment-specific identifiers, such as MAC addresses, IP addresses, and raw sequence numbers, within its input data. While classical machine learning models tend to memorize such topology, severely hindering their generalizability across networks, our experimental results (detailed in Sections 4.5.1 and 4.7) demonstrate that LLM-NIRED does not merely memorize these 

4 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

**Table 1** 

#### _3.2. LLM-NIRED model fine-tuning_ 

Data extracted from PCAP files and Suricata <u>packet</u> logs. 

|Category|Details|
|---|---|
|Generic protocol<br>information|MAC addresses (source/destination),<br>timestamp, frame length, and high-level<br>protocol identification (IP, TCP, UDP,<br>ARP).|
|Network Protoc.<br>Specifics (IP,<br>TCP/UDP)|Source/destination IP addresses and<br>ports, IP protocol type (TCP, UDP,<br>ICMP), TTL, and TCP flags (SYN, ACK,<br>FIN, RST, PSH, URG), sequence, and<br>acknowledgment numbers.|
|Application Layer<br>Protocol Details|HTTP methods/headers/URLs, DNS<br>queries and responses, SMB2 commands,<br>mDNS multicast addresses.|



specific details. Instead, the LLM leverages its semantic processing capabilities to abstract these identifiers, utilizing them to capture higherlevel contextual aspects, such as recognizing that a specific sequence of packets belongs to the same stateful flow or originates from the same actor. This allows the model to maintain robust generalization across unseen network topologies. Furthermore, we acknowledge that the current pipeline does not extract TLS-derived features (e.g., JA3/SNI or certificate fields). As modern networks are increasingly encrypted, incorporating such TLS metadata remains essential for our future work. 

To ensure comparability, this paper utilizes only standard and publicly accessible datasets in the experiments conducted. Thus, the data pre-processing procedure involves direct extraction from the datasets, duplicate removal, normalization, and class balancing. 

Duplicate removal involves removing redundant instances (such as zero, null, or duplicated data) from the dataset. The main purpose is to prevent data bias and avoid overestimating the model’s performance, as demonstrated by studies where removing duplicates led to more accurate results [36]. For instance, in this work, several duplicate instances were eliminated from the CIDDS datasets during pre-processing. 

Normalization is applied to numerical fields to ensure they operate within uniform intervals, in such a way that all features are placed on a comparable scale. This procedure is essential for increasing the effectiveness of intrusion detection models. In the context of LLM-NIRED experimentation, pre-processing included min–max normalization followed by scaling to ensure values fell within a specific range. 

Class balancing is necessary because datasets used for intrusion detection are frequently imbalanced, meaning that one class (typically normal traffic) is significantly more represented than the minority class (attacks). Without balancing, deep learning models tend to favor the majority class. To balance the data for the LLM-NIRED model training, two different approaches were adopted in different experiments: 

1. In some tests, undersampling of the majority class was adopted, where a random number of samples from the majority class (e.g., ‘normal’ instances in some tests) was removed until their count matched the number of samples in the minority class (e.g., ‘suspicious’ instances). 

2. In other tests, SMOTE (Synthetic Minority Oversampling Technique) [37] was adopted, which generates new synthetic examples of the minority class based on feature similarity to combat data imbalance. This approach ensures that the model can learn significant patterns from less frequent attack classes 

It is crucial to note that all data cleaning and pre-processing operations were defined strictly prior to the model training phase and remained constant to optimize performance. To prevent any data leakage, balancing techniques, such as Undersampling the majority class or applying SMOTE, were executed entirely separately on the training and testing sets, except when explicitly replicating the pre-split conditions of competitor models (e.g., [25]). 

The core of LLM-NIRED’s model development is the application of LLMs for network intrusion detection. This approach treats network traffic as a sequence of ‘‘tokens’’, akin to words in natural language. Each network packet or flow becomes a token, and a sequence of packets/flows forms a ‘‘sentence’’ describing network behavior [26]. Rather than operating as a pure anomaly detection regime trained exclusively on benign data, LLM-NIRED performs supervised binary classification. The model learns to distinguish between normal communication patterns and malicious activities by being trained on a dataset containing both benign and attack traffic classes. This supervised approach, supported by the aforementioned class balancing techniques (undersampling and SMOTE), enables the model to effectively capture the complex structural differences between normal flows and sophisticated attacks that traditional rule-based systems might miss. 

LLM-NIRED specifically utilizes as its base the Mistral Large Language Model, namely ‘Mistral-7B-v0.1’, which was selected over alternatives like Llama variants [38] or Mixtral [39] due to its highly efficient tokenizer and sliding window attention mechanism. These features allow it to handle the long context sequences required for network flows while maintaining a low memory footprint suitable for edgeconstrained environments. The fine-tuning process is conducted using QLora PEFT (Parameter-Efficient Fine-Tuning) techniques [40], which efficiently adapt pre-trained models to specific tasks by significantly reducing the number of parameters requiring updates. 

The prompt structure for LLM-NIRED’s LLM input is standardized: 

#### <s>### Instruction: 

Check if the given traffic flow is normal or suspicious, output must be normal or suspicious ### Input: 

[Flow_Details_Here] 

### Output: 

[Expected_Label_Here] 

During training, the ‘[Expected_Label_Here]’ string is provided in the prompt; conversely, during inference, the model fills this field in as its outcome. An example of a complete prompt for the training phase is therefore: 

#### <s>### Instruction: 

Check if the given traffic flow is normal or attack, output must be normal or attack ### Input: 

Start frame: 2017-04-12 12:25:21.859, Duration: 0.05, 

Source IP: OPENSTACK_NET, Source port: 63370, Protocol: TCP, Destination IP: EXT_SERVER, Destination port: 8000, Number of packets: 6, Bytes: 515, Flags: .AP.SF 

Start frame: 2017-04-14 09:44:21.027, Duration: 0.07, 

Source IP: OPENSTACK_NET, Source port: 63370, Protocol: TCP, Destination IP: EXT_SERVER, Destination port: 8000, Number of packets: 6, Bytes: 589, Flags: .AP.SF 

### Output: 

normal</s> 

Training datasets are balanced, typically through undersampling of the majority class (e.g., ‘‘normal’’ traffic) to mitigate classification bias caused by data imbalance. Model optimization also addresses GPU memory saturation by adjusting parameters such as batch size and employing 4-bit quantization with ‘nf4’ configuration. 

#### _3.3. Evaluation metrics_ 

The performance of LLM-NIRED is evaluated using the following standard metrics commonly employed in intrusion detection research [1,3,5,23]. 

5 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

We define _𝑇𝑃_ (True Positives) as the number of instances of attack traffic correctly identified as attacks, _𝑇𝑁_ (True Negatives) as the number of instances of normal traffic correctly identified as normal, _𝐹𝑃_ (False Positives) as the number of instances of normal traffic incorrectly classified as attacks (also referred to as False Alarm Rate ( _𝐹𝐴𝑅_ )), FN (False Negatives) as the number of instances of attack traffic incorrectly classified as normal. 

Consequently, we adopt the following standard metrics: 

- **Accuracy:** The proportion of correctly classified instances (both normal and attack) 

      - TP + TN 

- **𝐀𝐜𝐜𝐮𝐫𝐚𝐜𝐲** = TP + TN + FP + FN 

- **Precision:** The proportion of true positive predictions among all positive predictions 

   - TP 

**𝐏𝐫𝐞𝐜𝐢𝐬𝐢𝐨𝐧** = 

      - TP + FP 

- **Recall (Detection Rate - DR):** The proportion of true positive predictions among all actual positive instances TP 

- **𝐑𝐞𝐜𝐚𝐥𝐥** = 

   - TP + FN 

- **F1-score:** The harmonic mean of Precision and Recall, providing a balanced measure 

- **𝐅𝟏** - **𝐬𝐜𝐨𝐫𝐞** = 2 ×<sup>Precision × Recall</sup> 

         - Precision + Recall 

- **False Alarm Rate (FAR):** The proportion of false positives (normal traffic incorrectly classified as attack) relative to the total number of normal events [1] 

FP **𝐅𝐀𝐑** = FP + TN 

#### **4. Experimental results** 

Our experimental evaluation of LLM-NIRED involved several phases, progressing from initial fine-tuning tests on aggregated datasets to more complex scenarios involving direct PCAP processing and extensive comparisons with state-of-the-art NIDS models. 

#### _4.1. Datasets used_ 

The experiments used a variety of datasets to ensure a comprehensive evaluation: 

- **CIDDS** [41] **Datasets:** CIDDS-001 Large was utilized exclusively for training, comprising 28,159,140 total samples (25,178,585 normal; 2,980,555 attack). Testing was conducted on strictly separated subsets: CIDDS-001 Internal (20,000 samples: 10,000 normal, 10,000 attack), CIDDS-001 External (20,000 samples, evenly split), and CIDDS-002 (20,000 samples, evenly split). To ensure strict separation and prevent data leakage, an overlap analysis was conducted to check for shared flows, temporal overlap, and near-duplicates. This analysis confirmed that while CIDDS-001 Internal has a 71.06% overlap with the training data, CIDDS-001 External and CIDDS-002 have 0% overlap with CIDDS-001 Large, ensuring highly rigorous testing conditions. 

- **Mixed Datasets (Non-CIDDS):** To test multi-domain generalization, a custom mixed dataset of 1,164,853 samples was compiled (68% attack, 32% normal). An analysis of the attack volume revealed the following distribution: Ransomware (77.3%), Packet Injection Attacks (18.6%), and other minor attacks (4.1%). The benign traffic (∼32%) was actively gathered by executing a script to capture Wireshark traffic across approximately 1500 secure websites. 

- **Comparison Datasets:** For direct benchmarking, three standard datasets were used. UNSW-NB15 (originally ∼2,218,764 normal vs. 321,283 attack), NSL-KDD 2009 (utilizing its predefined KDDTrain+ and KDDTest+ splits), and CIC-IDS-2017 [42] (2,830,743 labeled flows) were dynamically split into standard 80/20 train/test ratios. 

#### _4.2. Model training and evaluation_ 

The number of instances used for fine-tuning varies significantly depending on the specific dataset and the experimental phase being conducted. Here are the approximate or exact numbers of training instances used after the pre-processing and balancing steps: 

- **CIDDS-001 Large (Main Comparative Tests):** When comparing the approach against other literature, the CIDDS Large dataset was balanced via undersampling. This yielded 1,480,555 normal samples and 1,480,555 attack samples, totaling 2,961,110 instances for the training set. 

- **UNSW-NB15 Dataset:** After removing duplicates and applying the SMOTE oversampling technique, the dataset reached 250,000 total instances (150,000 attack and 100,000 normal). Because 80% of the data was allocated to the training set, the fine-tuning was performed on 200,000 instances. Notably, as explained in Section 4.5.2, we applied SMOTE before splitting the dataset into train/test datasets for the sake of comparability with other approaches, and we demonstrated that the effects on the comparison of applying SMOTE before splitting were negligible. 

- **NSL-KDD 2009 Dataset:** SMOTE was applied exclusively to the training set to prevent bias. The final training set contained 137,926 instances, broken down into 67,343 normal, 45,927 DoS, 11,656 Probe, 8000 R2L, and 5000 U2R. 

- **CIC-IDS 2017 Dataset:** Following duplicate removal and SMOTE balancing, the training data contained a total of 978,500 instances (500,000 normal and 478,500 attacks divided among DoS, DDoS, PortScan, BruteForce, Web Attacks, and Infiltration). 

#### _4.3. Baseline and preliminary tests_ 

LLM-NIRED underwent various sets of tests aimed at investigating the model’s behavior across different datasets and establishing a baseline to evaluate the influence of fine-tuning on accuracy. 

#### _4.3.1. Baseline performance without fine-tuning_ 

To quantify the performance gains achieved through task-specific adaptation, we first evaluated the base Mistral-7B v0.1 model (without fine-tuning) on the CIC-IDS 2017 dataset. As anticipated for a model lacking domain-specific adaptation to structured network features, the zero-shot performance was limited. The base model achieved an Accuracy of 57.08%, an F1-Score of 65.04%, a Precision of 54.87%, and a Recall of 79.84%. This baseline clearly demonstrates that standard LLMs cannot inherently classify raw network telemetry out-of-the-box, strongly justifying the proposed fine-tuning pipeline. 

#### _4.3.2. Preliminary tests with fine tuning_ 

To take advantage of the task-specific adaptation, the LLM-NIRED model was fine-tuned on the CIDDS-External-Server Week 1 (CIDDSExW01) dataset, following a well-established data aggregation approach via the Network Flow Aggregator (NTFA) tool [43]. In contrast, the CIDDS-External-Server Week 4 (CIDDS-ExW04) dataset was used to evaluate the model, revealing a promising accuracy of 96.8%. 

In order to investigate the impact of the packet data aggregation method on IDS performance, we subsequently reverted to direct PCAP file processing, which extracts granular flow information and preserves detailed TCP flags and other features typically lost in conventional 

6 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

**Table 2** 

Network flow features. 

|Feature|Value|
|---|---|
|Start frame|2017-04-12 12:25:21.859|
|Duration|0.05|
|Source IP|OPENSTACK_NET|
|Source port|63370|
|Protocol|TCP|
|Destination IP|EXT_SERVER|
|Destination port|8000|
|Number of packets|6|
|Bytes|515|
|Flags|.AP.SF|



aggregation approaches. The chosen training dataset CIDDS [41] combined with other publicly available attack/normal traffic datasets, such as ‘‘Ransomware PCAP repository’’ (Aleta, Bart, BitPaymer) [44], PCAP Attack [45], Netresec Packet Injection Attacks [46] and some Darknet Trace data kindly provided by the Darkvec project [47,48]. All datasets for this specific experiment were composed of PCAP data, which was preprocessed and aggregated into flows using a Python script, from which a final set of features was extracted. A representative sample of these flow features is presented in Table 2. 

The aforementioned flow features were transformed into prompts and used to fine-tune the LLM-NIRED model, using 4-bit NormalFloat (NF4) quantization with double quantization and a bfloat16 compute datatype. The AdamW optimizer provided the optimal balance between rapid convergence and stability compared to standard Adam and Adafactor. The learning rate was set to 1 × 10<sup>−4</sup> , coupled with a cosine scheduler. 

To stabilize training updates and simulate a larger batch size under GPU memory constraints, gradient accumulation steps were set to 4. Finally, early stopping with a patience of 4 was introduced to prevent overfitting in the latter iterations. Combined with iterative refinements to the prompt structure, removing less informative features to reduce the token load and computational burden, these optimizations directly account for a resulting accuracy of 99.0%. To prevent any evaluation artifacts or data leakage, all hyperparameter tuning and early stopping metrics were evaluated strictly using a dedicated validation split from the training data, keeping the test sets entirely isolated until the final evaluation phase. 

#### _4.4. General performance comparison with the literature_ 

LLM-NIRED with fine-tuning was benchmarked against several notable approaches, including: 

- TFT/TFTKD [16] 

- EAID-OADRHM [17] 

- The CNN-based model described in [9] 

- An Ensemble model [19] 

- GPT-4 and Llama 3 models [49] 

**Table 3** 

Comparative summary of intrusion detection models in literature and LLMNIRED. 

|Dataset|Model|Accur.<br>(%)|Prec.<br>(%)|Rec.<br>(%)|F1<br>(%)|
|---|---|---|---|---|---|
|KDDCup/|TFT<sup>a</sup>|94.26|–|–|96.58|
|NSL-KDD|TFTKD<sup>a</sup>|93.91|–|–|96.10|
||LLM-NIRED|**99.52**|**99.60**|**99.44**|**99.52**|
|UNSW-NB15|TFT<sup>a</sup>|93.31|–|–|95.31|
||TFTKD<sup>a</sup>|93.46|–|–|95.38|
||LLM-NIRED|**99.36**|**98.96**|**99.76**|**99.36**|
|CIC-IDS-2017|TFT<sup>a</sup>|99.51|–|–|98.87|
||TFTKD<sup>a</sup>|98.32|–|–|98.58|
||LLM-NIRED|**99.56**|**99.52**|**99.60**|**99.54**|
|CIC-IDS-2017|EAID-OADRHM<sup>b</sup>|99.58|96.99|96.41|96.68|
||LLM-NIRED|**99.56**|**99.52**|**99.60**|**99.56**|
|NSL-KDD|EAID-OADRHM<sup>b</sup>|99.46|99.46|99.46|99.46|
||LLM-NIRED|**99.52**|**99.60**|**99.44**|**99.52**|
|CIC-IDS-2017|CNN<sup>c</sup>|98.5|97.8|98.2|98.0|
||LLM-NIRED|**99.56**|**99.52**|**99.60**|**99.54**|
|UNSW-NB15|Ensemble model<sup>d</sup>|97.80|97.76|98.31|98.01|
||LLM-NIRED|**99.36**|**98.96**|**99.76**|**99.36**|
|NSL-KDD|GPT-4<sup>e</sup>|98.2|–|–|–|
||Llama3<sup>e</sup>|97.5|–|–|–|
||BERT<sup>e</sup>|97.9|–|–|–|
||LLM-NIRED|**99.52**|–|–|–|
|CIC-IDS-2017|GPT-4<sup>e</sup>|96.7|–|–|–|
||Llama3<sup>e</sup>|95.4|–|–|–|
||BERT<sup>e</sup>|95.8|–|–|–|
||LLM-NIRED|**99.56**|–|–|–|



**Note** : Empty cells (—) indicate metrics not reported by the original authors. a Results from Wang et al. [16]. b Results from Alhayan et al. [17]. c Results from Reddy [9]. d Results from Zoghi and Serpen [19]. e Results from Wu et al. [49]. 

language models. Specifically, the exhaustive systematic study by Bui et al. [51] evaluated over 50 hyper-parameterized classical ML models (including Random Forest and XGBoost) against fine-tuned LLMs for intrusion detection. Their results conclusively demonstrated that the semantic processing and non-linear feature extraction performed by transformer-based architectures provide a statistically significant performance advantage over classical ML techniques. Therefore, rather than replicating classical ML baselines whose performance limitations have already been established in recent literature, our comparative analysis deliberately focuses on state-of-the-art Deep Learning and Transformer-based NIDS (e.g., flow-based BERT variants). These architectures represent the most advanced frontiers in NIDS research in terms of exploration potential, providing a much more rigorous benchmark to demonstrate LLM-NIRED’s relative capabilities and to justify its computational complexity. 

- A BERT-based model [50]. 

Table 3 provides a comprehensive summary of LLM-NIRED’s performance, demonstrating its improvements over competing approaches. 

The results presented in Table 3 were obtained by applying LLMNIRED to the same datasets adopted by each competitor approach and comparing the produced results with those reported in the related papers. LLM-NIRED consistently demonstrates superior or highly competitive performance in terms of accuracy, precision, recall, and F1-score. This includes comparisons against CNN-based models, LSTMAutoencoders, LLMs, and other AI-based IDS systems. 

While classical machine learning algorithms such as Random Forest and XGBoost are highly efficient and standard in production NIDS, recent comprehensive benchmarking has demonstrated their limitations in capturing complex sequential flow relationships compared to 

_4.5. Direct comparative analysis with best performing BERT-based approaches_ 

The core of the LLM-NIRED project is its novel application of a Large Language Model (Mistral), which leverages the Transformer architecture and the analogy of treating network traffic as sequential tokens (therefore being assimilated to a language) to detect anomalies. To ensure a comparison against the most relevant state-of-the-art models within the linguistic sequence/Transformer paradigm for Network Intrusion Detection Systems (NIDS), we selected the two best performers in the relevant literature and set up an experimental framework replicating the entire pipeline of these two models (e.g., the BERT tokenization, embedding extraction, and MLP classification process) 

7 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

**Table 4** 

Comparison between LLM-NIRED and Flow-Based BERT. 

|Model|CIDDS 00<br>Internal|1|CIDDS 001<br>External||CIDDS 00|2|
|---|---|---|---|---|---|---|
||Accur.|F1|Accur.|F1|Accur.|F1|
|LLM-NIRED|99.6%|99.5%|98.9%|98.9%|99.1%|99%|
|Flow-Based|||||||
|BERT [24]|99.4%|99.4%|89.5%|90.4%|91.6%|88%|



**Table 5** 

**Table 6** 

Comparison of LLM-NIRED with BERT+Classifier on UNSW-NB15 dataset. 

|Model|Feats.|Accur.|Prec.|Rec.|F1|
|---|---|---|---|---|---|
|LLM-NIRED<br> (SMOTE)|15|99.36%|98.96%|99.76%|99.36%|
|LLM-NIRED<br> (Undersampl.)|15|98.72%|98.18%|99.28%|98.73%|
|BERT+Classif.<sup>a</sup><br> Ali et al. [25]|49|99.20%|99.06%|99.61%|99.34%|



> a Results as reported in [25]. 

Selected network traffic features. 

|Specificity|Feature names|
|---|---|
|General|Duration, Proto, Service, Flag, Source Bytes, Destination<br>Bytes, Source TTL, Destination TTL, Source Packets,<br>Destination Packets, State, Source Service Count, Destination<br>Service Count, Source Service Error Rate, Destination Service<br>Error Rate, Source Same Service Rate, Destination Same<br>Service Rate, Wrong Fragment Flag, Urgent Flag, Land<br>Attack Flag|
|CIC-IDS-2017|Total Fwd Packets, Total Backward Packets, Flow Bytes/s,<br>ACK Flag Count, SYN Flag Count, RST Flag Count|



**Table 7** 

Comparison of LLM-NIRED with BERT+Classifier on CIC-IDS-2017 dataset. 

|Model|Feats.|Accur.|Prec.|Rec.|F1|
|---|---|---|---|---|---|
|LLM-NIRED<br> (SMOTE)|12|99.28%|98.73%|99.84%|99.28%|
|LLM-NIRED|12|99.56%|99.52%|99.60%|99.56%|
|(Undersampling)||||||
|BERT+Classifier<sup>a</sup><br> Ali et al. [25]|85|99.39%|99.39%|99.39%|99.99%|



> a Results reported in [25]. 

and testing it on the LLM-NIRED reference dataset (CIDDS). As a consequence, the adopted methodology established a rigorous comparative evaluation strategy consisting of two parts: testing LLM-NIRED with the data used in the literature to test the competing approaches and then, conversely, testing the competing approaches on the data proposed in this paper to validate and test LLM-NIRED. 

Such a complex process was considered essential to validate the LLM-NIRED superiority, especially its efficiency and reduced complexity (eliminating intermediate steps like embedding extraction and separate classifier training). 

**Table 8** 

Comparison between LLM-NIRED and BERT+Classifier on NSL-KDD 2009 dataset. 

|Model|Feats.|Accur.|Prec.|Rec.|F1|
|---|---|---|---|---|---|
|LLM-NIRED<br> (SMOTE)|15|99.52%|99.60%|99.44%|99.52%|
|LLM-NIRED|15|98.65%|98.53%|98.77%|98.65%|
|(Undersampling)||||||
|BERT+Classifier<sup>a</sup><br> Ali et al. [25]|42|99.33%|99.34%|99.33%|99.33%|



> a Results reported in [25]. 

#### _4.5.1. Comparison with flow-based BERT masked language model_ 

LLM-NIRED was compared against the BERT-based NIDS proposed by Nguyen and Watabe [24], using common CIDDS datasets (001 Internal, 001 External, 002) for testing after training on CIDDS-001 Large. Our approach (LLM-NIRED, using Mistral-7B v0.1 with undersampling for balancing) demonstrated superior performance, particularly in terms of generalization to unseen network topologies (CIDDS001 External and CIDDS-002). Table 4 summarizes the comparison. 

As shown in Table 4, LLM-NIRED’s performance on CIDDS-001 Internal is comparable, but it significantly surpasses the reference model on CIDDS-001 External and CIDDS-002, indicating a stronger generalization capability across different network scenarios. 

#### _4.5.2. Comparison with BERT Transformer+MLP_ 

This comparison focused on evaluating LLM-NIRED against a BERT +MLP approach [25] on widely recognized datasets: UNSW-NB15, NSLKDD 2009, and CIC-IDS-2017. We replicated their data preprocessing (duplicate removal, SMOTE) and also tested with undersampling. LLMNIRED used a reduced set of features compared to the BERT+MLP approach (e.g., 15 vs. 49 for UNSW-NB15, 12 vs. 85 for CIC-IDS-2017, 15 vs. 42 for NSL-KDD 2009). Table 5 reports the selected features. 

Tables 6, 7, and 8 present the detailed comparative results. LLMNIRED demonstrates strong performance, with high accuracy even with a reduced feature subset, leading to greater computational efficiency. The impact of SMOTE versus undersampling on performance was not significantly different. 

We also tested the BERT+MLP approach from [25] on our reference CIDDS-001 Large dataset. The process involved tokenization, BERT embedding extraction, and MLP classification. Table 9 provides a direct comparison of LLM-NIRED versus the implemented BERT+Classifier on CIDDS. 

##### **Table 9** 

Comparison between LLM-NIRED and BERT+Classifier on CIDDS datasets. 

|Model|CIDDS 00|1|CIDDS 00|1|CIDDS 0|02|
|---|---|---|---|---|---|---|
||Internal||External||||
||Accur.|F1|Accur.|F1.|Accur.|F1|
|LLM-NIRED|99.6%|99.5%|98.9%|98.9%|99.1%|99%|
|BERT + Class.|96.5%|97%|47.4%|30%|87.8%|88%|



LLM-NIRED demonstrates superior performance across all CIDDS datasets, suggesting that its direct fine-tuning on structured prompts (eliminating intermediate steps like embedding extraction and separate classifier training) enhances predictive accuracy. The textual structure of prompts appears to aid in effectively representing implicit network traffic relationships, indicating a partial capacity for learning underlying network topology patterns. 

#### _4.5.3. Memory usage and latency_ 

Memory consumption, particularly GPU memory, is critical for realworld deployment. LLM-NIRED, after a sequence of optimizations, showed a GPU memory usage of approximately 6.8 GB during training and 4.7 GB during evaluation. 

In contrast, the BERT+Classifier approach involves distinct phases. BERT embedding extraction used about 1.6 GB GPU memory, while MLP training consumed approximately 8.4 GB, which remained constant during MLP evaluation. Tokenization, being a lightweight operation, typically runs on the CPU. Table 10 summarizes the memory comparison. 

LLM-NIRED demonstrates lower memory consumption, attributable to its strategy of fine-tuning a pre-trained Mistral model rather than training a BERT model from scratch, coupled with a separate MLP 

8 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

**Table 10** 

#### _4.7. Evaluation on obfuscated and encrypted traffic_ 

Comparison of GPU memory usage between LLM-NIRED and BERT+Classifier. 

|Phase|BERT+Classifier|LLM-NIRED|
|---|---|---|
|||Fine Tuning|
|Training|8.4 GB|6.8 GB|
|Evaluation|8.4 GB|4.7 GB|
|Embedding Extraction|1.6 GB|–|
|Tokenization|0 GB|0 GB|



**Table 11** 

Evaluation metrics of the TinyLLM model on CIDDS datasets. 

|Dataset|Accuracy|Precision|Recall|F1-score|
|---|---|---|---|---|
|CIDDS 001 Internal|98.86%|0.9797|0.9972|0.9884|
|CIDDS 001 External|97.63%|0.9648|0.9893|0.9769|
|CIDDS 002|99.17%|0.9854|0.9987|0.9920|



**Table 12** 

Evaluation metrics of the Full LLM-NIRED model on CIDDS datasets (for comparison). 

|Dataset|Accuracy|Precision|Recall|F1-score|
|---|---|---|---|---|
|CIDDS 001 Internal|99.60%|0.9960|0.9960|0.9959|
|CIDDS 001 External|98.92%|0.9878|0.9905|0.9891|
|CIDDS 002|99.11%|0.9916|0.9902|0.9909|



classifier. As a consequence, LLM-NIRED is more suitable for running on edge devices. 

It is worth considering that the RLFE-IDS architecture [32], combining LLM and RAG with an optimized embedding approach, is reported to require about 15 GB of GPU memory. 

LLM-NIRED achieved an average latency of 311 ms per sample, while the BERT+Classifier approach showed an average latency of 344 ms per sample when considering the entire pipeline (tokenization, embedding extraction, and classification). LLM-NIRED is thus marginally faster in overall inference time. Notably, because the model produces a single classification token per sample, this measured latency is directly equivalent to the Time To First Token (TTFT). 

#### _4.6. TinyML and edge device performance_ 

To assess LLM-NIRED’s suitability for resource-constrained environments, we evaluated a TinyLLM variant of its base model, specifically ‘TinyMistral-6x248M-Instruct’, an optimized Mistral-based model leveraging a Mixture of Experts (MoE) architecture [52]. This model balances linguistic capabilities with compact size, ideal for edge deployment. 

The TinyLLM was fine-tuned on CIDDS Large and tested on CIDDS001 Internal, External, and 002. Table 11 presents the evaluation metrics for the TinyLLM on CIDDS datasets, while Table 12 provides a direct comparison with the full LLM-NIRED model. 

The TinyLLM model achieved a peak GPU memory usage of 1.6 GB during fine-tuning and around 868 MB during inference, significantly less than the full LLM-NIRED model. The average latency on GPU was 175.4 ms (5.70 samples per second). Conversely, on a standard CPU (Intel i7-4790K), without quantization, the TinyLLM model showed an average latency of 473 ms (2.11 samples per second). Furthermore, preliminary tests conducted on a standard Raspberry Pi 5 board using the CPU-only version of the TinyLLM model yielded a latency (again, equivalent to the TTFT) of approximately 2 s per sample. This empirically confirms the practical applicability of the proposed lightweight variant as a Tier-2 deep inspection detector, capable of running on highly resource-constrained edge devices while offering a strong balance between performance and resource efficiency. 

To address potential vulnerabilities to adversarial evasion techniques, we evaluated the robustness of LLM-NIRED against payload encryption and flow obfuscation. Using a custom Python script based on the Scapy library [53], targeted transformations were applied to the attack traffic within the CIC-IDS 2017 dataset. Specifically, payload content was subjected to XOR encryption using a dynamic SHA-256 derived key, and the involved IP addresses underwent deterministic obfuscation via hashing. The pre-trained LLM-NIRED model was evaluated in a zero-shot inference setting on a balanced subset of 2500 obfuscated samples (1250 normal and 1250 attack). The model demonstrated exceptional resilience, achieving an Accuracy of 99.92%, an F1-Score of 99.92%, a Precision of 99.84%, and a Recall of 100%. These results confirm that because LLM-NIRED analyzes aggregated flow telemetry and structured metadata rather than relying on Deep Packet Inspection (DPI), it successfully generalizes and maintains nearperfect detection capabilities even when payloads are encrypted and IPs are obfuscated. 

#### **5. Discussion** 

The comprehensive experimental results demonstrate the advantages of LLM-NIRED over traditional and even advanced Network Intrusion Detection methods based on LLM architectures. LLM-NIRED’s consistently high accuracy across a diverse range of datasets, including CIDDS, UNSW-NB15, NSL-KDD, and CIC-IDS-2017, underscores its robust performance. Even with a reduced feature set, LLM-NIRED maintains competitive or superior detection rates, indicating its ability to learn highly informative representations from raw network flow data. 

An important strength of LLM-NIRED is its generalization capability. The comparative analysis with BERT-based models, such as those by Nguyen and Watabe [24] and Ali et al. [25], highlighted LLM-NIRED’s superior performance, especially on previously unseen network topologies (e.g., CIDDS-001 External and CIDDS-002 for the former analysis, and various large-scale datasets for the latter). This suggests that the LLM’s inherent capacity to understand contextual relationships within sequential data, treating network flows as a ‘‘language’’, is a key differentiator. The fine-tuning approach on structured prompts allows the model to directly learn the mapping between network behavior descriptions and threat labels, bypassing complex multi-stage pipelines often seen in BERT+classifier models. 

From an operational efficiency standpoint, LLM-NIRED also presents notable improvements over the state of the art. Its GPU memory consumption during training and inference is lower than the full BERT+MLP approach, largely due to the parameter-efficient fine-tuning (QLora PEFT) of a pre-trained Mistral LLM. This contrasts with approaches that might involve training separate components or require more extensive parameter updates. While the inference time for LLMNIRED is comparable to or slightly faster than the BERT+MLP pipeline, the reduced memory footprint makes it more suitable for deployment on systems with limited GPU resources. 

The successful evaluation of a TinyLLM variant of LLM-NIRED is a critical step towards realizing distributed intrusion detection on true edge devices. The TinyMistral model, despite its significantly smaller size and lower memory requirements (in the order of hundreds of MBs during inference), still maintains very high accuracy on standard CIDDS datasets. The demonstrated feasibility of CPU-only inference, albeit at a reduced speed, further expands its applicability to microcontrollers and other resource-constrained IoT devices (such as a standard Raspberry Pi 4 or 5) where dedicated GPUs are not available. This low power, low latency on-device processing capability aligns perfectly with the future direction of cybersecurity, especially for protecting decentralized IoT ecosystems. 

9 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

The conceptual parallel between network traffic and sequential data is effectively captured by the LLM architecture. By treating traffic as a structured sequence with grammar-like constraints, rather than literally as natural language, LLM-NIRED identifies subtle deviations from normal network behavior. 

This allows LLM-NIRED to identify subtle deviations from normal network behavior that might constitute novel attacks or parts of larger, complex APTs. The detailed feature extraction from PCAP files, including low-level protocol details and TCP flags, combined with the LLM’s contextual understanding, creates a powerful mechanism for comprehensive threat analysis. 

#### **6. Scope and limitations** 

While LLM-NIRED demonstrates strong classification capabilities, some limitations must be acknowledged. First, due to throughput constraints, the system is currently more suitable to function as a Tier-2 deep inspection engine rather than a Tier-1 inline packet filter. In a practical deployment scenario, we envision LLM-NIRED operating in tandem with high-throughput filtering mechanisms (such as those featured by Suricata) that discard the vast majority of benign traffic, routing only highly ambiguous, pre-flagged, or sensitive flows to the LLM for rigorous semantic evaluation. Second, while the memory footprint is evaluated, true deployment on resource-constrained edge devices within IoT ecosystems requires extensive profiling of power consumption, thermal output, and resilience under high load, which remain future objectives. Additionally, the inherent lack of explainability in LLMs [54] makes it difficult to provide immediate, actionable reasoning to Security Operations Centers. Finally, while our latest experiments confirm that the model is highly robust against payload encryption and specific flow-level IP obfuscation, its resilience against more advanced adversarial packet mutation or header spoofing evasion attacks remains an area for future evaluation. 

#### **7. Conclusions and future work** 

In this paper, we introduced LLM-NIRED (Large Language Modelbased Robust Early Detection of Network Intrusion Attacks), a novel approach for distributed and early network intrusion detection leveraging Large Language Models (LLMs) within an edge computing paradigm. Our work demonstrates that by treating network traffic flows as sequences of tokens, LLM-NIRED effectively captures complex and often subtle attack patterns, achieving consistently high accuracy across diverse and challenging datasets. Furthermore, our latest evaluations validate the model’s native resilience; because it analyzes structured metadata rather than relying on Deep Packet Inspection, it successfully generalizes even when payloads are encrypted and flow-level IP obfuscation is applied. The empirical evaluation showcased LLM-NIRED’s superior generalization capabilities and computational efficiency (lower memory consumption, competitive latency) compared to state-of-theart deep learning and BERT-based NIDS. Furthermore, the successful deployment and evaluation of a TinyLLM variant of LLM-NIRED confirmed its viability for robust threat detection on resource-constrained edge devices, aligning with the growing demands of IoT security. The rapid adaptability of LLM-NIRED to new network environments through minimal incremental fine-tuning represents a significant practical advantage for deployment in varied operational settings. Ultimately, the proposed solution is scalable and flexible because its inference relies on semantic sequence processing rather than rigid, hard-coded protocol parsers. Furthermore, it proves to be energy-efficient for edge deployment, as demonstrated by the TinyLLM variant, which drastically reduces the memory footprint and computational requirements compared to the full model. 

Future work for LLM-NIRED focuses on significantly advancing the system, beginning with the investigation of more sophisticated 

prompt engineering techniques that integrate meta-information or temporal context directly into the prompt structure. Moving beyond the Mistral model, an evaluation of diverse LLM architectures, particularly advanced Mixture-of-Experts (MoE) models, should be considered. Furthermore, deeper optimization for resource-constrained edge environments is crucial, necessitating Enhanced TinyML Optimization and Hardware Acceleration. This involves investigating dynamic quantization and pruning strategies, alongside exploring dedicated hardware accelerators, specifically Neural Processing Units (NPUs) on edge devices, to enable highly efficient on-device inference. To address the inherent black-box nature of LLMs, future research will prioritize the integration of Explainable AI (XAI) frameworks. Developing interpretable wrappers around LLM-NIRED will be essential to provide Security Operations Centers (SOCs) with transparent, actionable reasoning for the model’s predictions. We will also expand our adversarial robustness evaluations to assess the system’s resilience against more advanced evasion techniques, such as targeted packet mutation and header spoofing. A primary challenge involves the Evaluation on Zero-Day and Advanced Persistent Threat (APT) Datasets, as labeled examples of these complex attacks are scarce. Consequently, future efforts will concentrate on developing unsupervised or self-supervised learning strategies applied directly to raw network traffic to accurately identify novel attack signatures. Additionally, the LLM’s inherent generative capabilities could be leveraged to systematically create synthetic attack patterns for model training against future unknown threats. Finally, a federated LLM model will be explored for privacy-preserving, distributed detection of complex and heterogeneous cyberattacks, as described in the most recent literature [55]. 

#### **CRediT authorship contribution statement** 

**Giancarlo Iannizzotto:** Writing – review & editing, Writing – original draft, Validation, Supervision, Methodology, Investigation, Formal analysis, Conceptualization. **Andrea Nucita:** Writing – original draft, Methodology, Investigation, Formal analysis, Conceptualization. **Andrea Siragusa:** Writing – original draft, Software, Investigation, Formal analysis, Data curation. 

#### **Declaration of competing interest** 

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

#### **Data availability** 

Data will be made available on request. 

#### **References** 

- [1] Z. Yang, X. Liu, T. Li, D. Wu, J. Wang, Y. Zhao, H. Han, A systematic literature review of methods and datasets for anomaly-based network intrusion detection, Comput. Secur. 116 (2022) 102675, http://dx.doi.org/10.1016/j.cose. 2022.102675. 

- [2] K. Scarfone, P. Mell, Guide to Intrusion Detection and Prevention Systems (IDPS), Special Publication 800–94, National Institute of Standards and Technology, 2007, http://dx.doi.org/10.6028/NIST.SP.800-94. 

- [3] M.A. Ferrag, L. Maglaras, S. Moschoyiannis, H. Janicke, Deep learning for cyber security intrusion detection: Approaches, datasets, and comparative study, J. Inf. Secur. Appl. 50 (2020) 102419, http://dx.doi.org/10.1016/j.jisa.2019.102419. 

- [4] D. Akgun, S. Hizal, U. Cavusoglu, A new DDoS attacks intrusion detection model based on deep learning for cybersecurity, Comput. Secur. 118 (2022) 102748, http://dx.doi.org/10.1016/j.cose.2022.102748. 

- [5] Z. Long, H. Yan, G. Shen, X. Zhang, H. He, L. Cheng, A transformer-based network intrusion detection approach for cloud security, J. Cloud Comput. 13 (1) (2024) 5, http://dx.doi.org/10.1186/s13677-023-00574-9. 

- [6] A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A.N. Gomez, Ł. Kaiser, I. Polosukhin, Attention is all you need, in: Advances in Neural Information Processing Systems, 2017, pp. 5998–6008, doi:dl.acm.org/doi/10.5555/3295222. 3295349. 

10 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

- [7] I. Hasanov, S. Virtanen, A. Hakkala, J. Isoaho, Application of large language models in cybersecurity: A systematic literature review, IEEE Access 12 (2024) 176751–176778, http://dx.doi.org/10.1109/ACCESS.2024.3505983. 

- [8] P. Mahadevappa, R.K. Murugesan, R. Al-amri, R. Thabit, A.H. Al-Ghushami, G. Alkawsi, A secure edge computing model using machine learning and IDS to detect and isolate intruders, MethodsX 12 (2024) 102597, http://dx.doi.org/10. 1016/j.mex.2024.102597. 

- [9] S. Reddy, AI-based intrusion detection systems for edge computing environments, Int. J. Inf. Tech. Manag. Inf. Syst. 11 (2020) 45–53, URL: https://iaeme.com/MasterAdmin/Journal_uploads/IJITMIS/VOLUME_11_ISSUE_ 1/IJITMIS_11_01_007.pdf. (Accessed 04 October 2025). 

- [10] N. Chaabouni, M. Mosbah, A. Zemmari, C. Sauvignac, P. Faruki, Network intrusion detection for IoT security based on learning techniques, IEEE Commun. Surv. & Tutorials 21 (3) (2019) 2671–2701, http://dx.doi.org/10.1109/COMST. 2019.2896380. 

- [11] E. Nwafor, U. Baskota, M.S. Parwez, J. Blackstone, H. Olufowobi, Evaluating large language models for enhanced intrusion detection in internet of things networks, in: GLOBECOM 2024 - 2024 IEEE Global Communications Conference, 2024, pp. 3358–3363, http://dx.doi.org/10.1109/GLOBECOM52923.2024. 10901300. 

- [12] M. Showrov Hossen, M. Jamal Hossain, M. Abdul Masud, M. Samsuzzaman, C. Bepery, Anomaly based network intrusion detection using ensemble classifiers, in: 2022 4th International Conference on Sustainable Technologies for Industry 4.0, STI, 2022, pp. 1–6, http://dx.doi.org/10.1109/STI56238.2022.10103301. 

- [13] A. Mora, P. Merino, D. Hernández, P. García-Sánchez, A. Fernández-Ares, Chapter Thirteen - Applying evolutionary methods for the optimization of an intrusion detection system to detect anomalies in network traffic flows, in: A. Biswas, A.P. Tonda, R. Patgiri, K.K. Mishra (Eds.), Applications of Nature-Inspired Computing and Optimization Techniques, in: Advances in Computers, vol. 135, Elsevier, 2024, pp. 313–347, http://dx.doi.org/10.1016/bs.adcom.2023.11.008. 

- [14] L. Gioacchini, L. Vassio, M. Mellia, I. Drago, Z.B. Houidi, D. Rossi, DarkVec: Automatic analysis of darknet traffic with word embeddings, in: Proceedings of the 17th International Conference on Emerging Networking EXperiments and Technologies, Association for Computing Machinery, New York, NY, USA, 2021, pp. 76–89, http://dx.doi.org/10.1145/3485983.3494863. 

- [15] L. Gioacchini, L. Vassio, M. Mellia, I. Drago, Z.B. Houidi, D. Rossi, I-DarkVec: Incremental embeddings for darknet traffic analysis, ACM Trans. Internet Technol. 23 (3) (2023) http://dx.doi.org/10.1145/3595378. 

- [16] L.-H. Wang, Q. Dai, T. Du, L.f. Chen, Lightweight intrusion detection model based on CNN and knowledge distillation, Appl. Soft Comput. 165 (2024) 112118, http://dx.doi.org/10.1016/j.asoc.2024.112118. 

- [17] F. Alhayan, A. Alshuhail, A.O.A. Ismail, O. Alrusaini, S. Alahmari, A.E. Yahya, S.S. Albouq, M. Al Sadig, Enhanced anomaly network intrusion detection using an improved snow ablation optimizer with dimensionality reduction and hybrid deep learning model, Sci. Rep. 15 (1) (2025) 13270, http://dx.doi.org/10.1038/ s41598-025-97398-1. 

- [18] R. Devendiran, A.V. Turukmane, Dugat-LSTM: Deep learning based network intrusion detection system using chaotic optimization strategy, Expert Syst. Appl. 245 (2024) 123027, http://dx.doi.org/10.1016/j.eswa.2023.123027. 

- [19] Z. Zoghi, G. Serpen, Building an intrusion detection system on UNSW-NB15: Reducing the margin of error to deal with data overlap and imbalance, Concurr. Comput.: Pract. Exp. 36 (2024) http://dx.doi.org/10.1002/cpe.8242. 

- [20] H. Yu, W. Zhang, C. Kang, Y. Xue, A feature selection algorithm for intrusion detection system based on the enhanced heuristic optimizer, Expert Syst. Appl. 265 (2025) 125860, http://dx.doi.org/10.1016/j.eswa.2024.125860. 

- [21] P. Zhang, Model selection via multifold cross validation, Ann. Statist. 21 (1) (1993) 299–313, http://dx.doi.org/10.1214/aos/1176349027. 

- [22] M.A. Bouke, A. Abdullah, An empirical study of pattern leakage impact during data preprocessing on machine learning-based intrusion detection models reliability, Expert Syst. Appl. 230 (2023) 120715, http://dx.doi.org/10.1016/j.eswa. 2023.120715. 

- [23] L.D. Manocchio, S. Layeghy, W.W. Lo, G.K. Kulatilleke, M. Sarhan, M. Portmann, FlowTransformer: A transformer framework for flow-based network intrusion detection systems, Expert Syst. Appl. 241 (2024) 122564, http://dx.doi.org/10. 1016/j.eswa.2023.122564. 

- [24] L.G. Nguyen, K. Watabe, Flow-based network intrusion detection based on BERT masked language model, in: Proceedings of the 3rd International CoNEXT Student Workshop, ACM, 2022, pp. 7–8, http://dx.doi.org/10.1145/3565477.3569152. 

- [25] Z. Ali, W. Tiberti, A. Marotta, D. Cassioli, Empowering network security: BERT transformer learning approach and MLP for intrusion detection in imbalanced network traffic, IEEE Access 12 (2024) 137618–137633, http://dx.doi.org/10. 1109/ACCESS.2024.3465045. 

- [26] S. Kumar Nandi, R. Ratti, S. Ranbir Singh, S. Nandi, Prompt engineering-based network intrusion detection system, IEEE Access 13 (2025) 190859–190871, http://dx.doi.org/10.1109/ACCESS.2025.3629761. 

- [27] E.P. Farias, A.B. de Neira, L.F. Borges, M. Nogueira, Transformers model for DDoS attack detection: A survey, Comput. Netw. 270 (2025) 111433, http: //dx.doi.org/10.1016/j.comnet.2025.111433. 

- [28] H. Kheddar, Transformers and large language models for efficient intrusion detection systems: A comprehensive survey, Inf. Fusion 124 (2025) 103347, http://dx.doi.org/10.1016/j.inffus.2025.103347. 

- [29] F. Adjewa, M. Esseghir, L. Merghem-Boulahia, C. Kacfah, LLM-based continuous intrusion detection framework for next-gen networks, in: 2025 International Wireless Communications and Mobile Computing, IWCMC, 2025, pp. 1198–1203, http://dx.doi.org/10.1109/IWCMC65282.2025.11059643. 

- [30] M.A. Ferrag, M. Ndhlovu, N. Tihanyi, L.C. Cordeiro, M. Debbah, T. Lestable, N.S. Thandi, Revolutionizing cyber threat detection with large language models: A privacy-preserving BERT-based lightweight model for IoT/iIoT devices, IEEE Access 12 (2024) 23733–23750, http://dx.doi.org/10.1109/ACCESS.2024. 3363469. 

- [31] F. Adjewa, M. Esseghir, L. Merghem-Boulahia, Efficient federated intrusion detection in 5G ecosystem using optimized BERT-based model, in: 2024 20th International Conference on Wireless and Mobile Computing, Networking and Communications, WiMob, 2024, pp. 62–67, http://dx.doi.org/10.1109/ WiMob61911.2024.10770340. 

- [32] X. Li, Z. Zheng, M. Zhao, Y. Zhao, L. Shi, B. Wang, RLFE-IDS: A framework of intrusion detection system based on retrieval augmented generation and large language model, Comput. Netw. 268 (2025) 111341, http://dx.doi.org/10.1016/ j.comnet.2025.111341. 

- [33] M.S. Kursheeth, T. Sree, S. Vadivu, Y.S.S. Harsha, N. Rajagopalan, Suricatabased intrusion detection and isolation system for local area networks, in: 2024 International Conference on Signal Processing, Computation, Electronics, Power and Telecommunication, IConSCEPT, 2024, pp. 1–5, http://dx.doi.org/10.1109/ IConSCEPT61884.2024.10627890. 

- [34] A.Q. Jiang, A. Sablayrolles, A. Mensch, C. Bamford, D.S. Chaplot, D. de las Casas, F. Bressand, G. Lengyel, G. Lample, L. Saulnier, L.R. Lavaud, M.-A. Lachaux, P. Stock, T.L. Scao, T. Lavril, T. Wang, T. Lacroix, W.E. Sayed, Mistral 7B, 2023, URL: https://arxiv.org/abs/2310.06825, arXiv:2310.06825. (Accessed 04 October 2025). 

- [35] G. Harris, M. Richardson, PCAP Capture File Format, Internet-Draft draftietf-opsawg-pcap-06, Internet Engineering Task Force, 2025, URL: https: //datatracker.ietf.org/doc/draft-ietf-opsawg-pcap/06/. (Accessed 04 October 2025). 

- [36] A. Aghabagherloo, A. Abadi, S. Sarkar, V.A. Dasu, B. Preneel, Impact of data duplication on deep neural network-based image classifiers: Robust vs. Standard models, in: 2025 IEEE Security and Privacy Workshops, SPW, 2025, pp. 177–183, http://dx.doi.org/10.1109/SPW67851.2025.00023. 

- [37] N.V. Chawla, K.W. Bowyer, L.O. Hall, W.P. Kegelmeyer, SMOTE: synthetic minority over-sampling technique, J. Artif. Int. Res. 16 (1) (2002) 321–357, http://dx.doi.org/10.5555/1622407.1622416. 

- [38] A. Abdennebi, K. Nadjia, L. Lahlou, M. Younis, H. Ould-Slimane, Sec-Llama: a compact fine-tuned LLM for network intrusion detection in kubernetes clusters, in: 2025 IEEE International Conference on Machine Learning for Communication and Networking, ICMLCN, 2025, pp. 1–7, http://dx.doi.org/10.1109/ ICMLCN64995.2025.11140090. 

- [39] M.A. Ferrag, F. Alwahedi, A. Battah, B. Cherif, A. Mechri, N. Tihanyi, T. Bisztray, M. Debbah, Generative AI in cybersecurity: A comprehensive review of LLM applications and vulnerabilities, Internet Things Cyber-Phys. Syst. 5 (2025) 1–46, http://dx.doi.org/10.1016/j.iotcps.2025.01.001. 

- [40] T.G. Shalini, P. Geetha, Y. R, A. R, Fine-tuning an LLM using QLORA and PEFT with RLHF dataset, in: 2025 International Conference on Visual Analytics and Data Visualization, ICVADV, 2025, pp. 638–644, http://dx.doi.org/10.1109/ ICVADV63329.2025.10961936. 

- [41] M. Ring, S. Wunderlich, D. Gruedl, D. Landes, A. Hotho, Flow-based benchmark data sets for intrusion detection, in: Proceedings of the 16th European Conference on Cyber Warfare and Security, ECCWS, ACPI, 2017, pp. 361–369. 

- [42] I. Sharafaldin, A. Habibi Lashkari, A.A. Ghorbani, Toward generating a new intrusion detection dataset and intrusion traffic characterization, in: Proceedings of the 4th International Conference on Information Systems Security and Privacy - ICISSP, INSTICC. SciTePress, 2018, pp. 108–116, http://dx.doi.org/10.5220/ 0006639801080116. 

- [43] K. Karim, H. Ragab Hassen, H. Batatia, NTFA: Network flow aggregator, in: H. Zantout, H. Ragab Hassen (Eds.), Proceedings of the International Conference on Applied Cybersecurity (ACS) 2023, Springer Nature Switzerland, Cham, 2023, pp. 21–28, http://dx.doi.org/10.1007/978-3-031-40598-3_3. 

- [44] GRSST, Public University of Navarre, Ransomware Dataset, 2022, URL: http: //dataset.tlm.unavarra.es/ransomware/. (Accessed 04 October 2025). 

- [45] S.e. Bousseaden, PCAP-ATTACK: A Repository of PCAP Files for IDS Testing, 2020, URL: https://github.com/sbousseaden/PCAP-ATTACK. (Accessed 04 October 2025). 

- [46] Netresec AB, Publicly available PCAP files for training and testing, 2025, URL: https://www.netresec.com/?page=PcapFiles. (Accessed 04 October 2025). 

- [47] SmartData@PoliTO, Politecnico di Torino, DarkVec: A tool for identifying obfuscated URLs, 2021, URL: https://github.com/SmartData-Polito/darkvec. (Accessed 04 October 2025). 

- [48] M. Boffa, G. Milan, L. Vassio, I. Drago, M. Mellia, Z.B. Houidi, Towards NLPbased processing of honeypot logs, in: 2022 IEEE European Symposium on Security and Privacy Workshops, EuroS&PW, IEEE, 2022, pp. 314–321, http: //dx.doi.org/10.1109/EuroSPW55150.2022.00038. 

- [49] Y. Wu, B. Zou, Y. Cao, Current status and challenges and future trends of deep learning-based intrusion detection models, J. Imaging 10 (2024) 254, http://dx.doi.org/10.3390/jimaging10100254. 

11 

_G. Iannizzotto et al._ 

_Computer Networks 287 (2026) 112559_ 

- [50] L.G. Nguyen, K. Watabe, A method for network intrusion detection using flow sequence and BERT framework, in: ICC 2023 - IEEE International Conference on Communications, IEEE, 2023, pp. 3006–3011, http://dx.doi.org/10.1109/ ICC45041.2023.10279335. 

- [51] M.-T. Bui, M. Boffa, R.V. Valentim, J.M. Navarro, F. Chen, X. Bao, Z.B. Houidi, D. Rossi, A systematic comparison of large language models performance for intrusion detection, Proc. ACM Networks (CoNEXT4) (2024) http://dx.doi.org/ 10.1145/3696379. 

- [52] M4-ai, TinyMistral-6x248m-instruct, 2024, URL: https://huggingface.co/M4-ai/ TinyMistral-6x248M-Instruct. (Accessed 04 October 2025). 

- [53] P. Biondi, G. Potter, Scapy: The Python-based interactive packet manipulation program, 2025, URL: https://scapy.net/. (Accessed 04 October 2025). 

- [54] P.R. Houssel, S. Layeghy, P. Singh, M. Portmann, EX-NIDS: A framework for explainable network intrusion detection leveraging large language models, Comput. Electr. Eng. 129 (2026) 110826, http://dx.doi.org/10.1016/j.compeleceng.2025. 110826. 

- [55] H. Rezaei, R. Taheri, M. Shojafar, FedLLMGuard: A federated large language model for anomaly detection in 5G networks, Comput. Netw. 269 (2025) 111473, http://dx.doi.org/10.1016/j.comnet.2025.111473. 

12 

