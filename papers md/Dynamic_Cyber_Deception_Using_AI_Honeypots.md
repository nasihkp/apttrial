Ain Shams Engineering Journal 17 (2026) 104061 



Contents lists available at ScienceDirect 

# Ain Shams Engineering Journal 

journal homepage: www.sciencedirect.com 



### Full Length Article 

Dynamic cyber deception using AI-driven adaptive honeypot networks and context-aware behavioural analysis for proactive threat neutralization 



## Mohammed Alshehri 



_Department of Information Technology, College of Computer and Information Sciences, Majmaah University, Majmaah 11952, Saudi Arabia_ 

|A R T I C L E I N F O|A B S T R A C T|
|---|---|
|_Keywords:_<br>Cybersecurity<br>Adaptive honeypots<br>Artificial intelligence<br>Explainable AI<br>Threat neutralization<br>Dynamic deception|The cybersecurity world is tackling a number of sources of advanced threats such as zero-day exploits, poly-<br>morphic malware, and APTs that make the classical static defenses inefficient so these days the situation is really<br>tough for the cybersecurity experts. The introduction of a framework called Adaptive Swarm-Driven Cyber<br>Deception with XAI-Aided TransGraph Learning (ASD-TGXAI) as a new way of dealing with these challenges is<br>one of the solutions of the present study. The framework combines dynamic honeypots, adaptive deception<br>strategies, and AI-powered real-time analysis to develop a progressive defense system. Unlike static approaches,<br>the ASD-TGXAI framework dynamically adapts to evolving threats by employing the Adaptive Swarm-Reinforce<br>Evolutionary Framework (ASREF), which leverages Swarm Intelligence, Reinforcement Learning, and Differen-<br>tial Evolution for optimization. In addition, the TransGraph-XAI Fusion Model (TGXAI-Net) combines Trans-<br>formers, Graph Neural Networks (GNNs), and Explainable AI (XAI) to enhance the accuracy and interpretability<br>of threat predictions. The dynamically changing ASD-TGXAI framework contrasts well with the traditional static<br>defensive mechanisms, where changes in honeypot behavior are effected on the basis of real-time threat intel-<br>ligence and interaction patterns of the attackers, thus, enabling threat mitigation to be done in a proactive way<br>rather than reactive. The use of the XAI modules in every decision guarantees that the decisions are made in a<br>transparent manner, the decisions can be traced and are also interpretable by the cybersecurity analysts, hence,<br>this being the first-of-its-kind a creative contribution to the intelligent deception-based defense systems. Effec-<br>tively, the false positives and false negatives are minimized to 0.02, ensuring a 98% accuracy in the detection of<br>threats along with a significant decrease in threat neutralization time to 200 ms. It has an adaptability score of<br>10%, a resource utilization efficiency of 90%, and deception effectiveness of 95%, thus ensuring reliable per-<br>formance and resilience in increasingly dynamic environments. This study not only improves cybersecurity<br>defenses but also sets up a feedback-driven environment for sustained intelligence and proactive approaches.|



#### **1. Introduction** 

Cybersecurity is still a huge hurdle because of the increasing number of cyberattacks and their being more sophisticated at the same time, thus making ineffective the use of traditional static and rule-based defense mechanisms against modern threats such as zero-day vulnerabilities, polymorphic malware, and advanced persistent threats (APTs) [1,3,6]. With the detection of conventional methods becoming increasingly easier for the attackers, the critical infrastructures, financial systems, and sensitive data are exposed, which calls for proactive, adaptive, and intelligent security solutions [2,4]. 

One of the most effective ways out of this problem is to combine artificial intelligence (AI) and cyber deception techniques, especially through the use of adaptive honeypot networks. Although static 

honeypots are very effective in monitoring basic threats, they are highly detectable by advanced attackers using sophisticated recon methods, whcih considerably lessens their effectiveness [4,7]. To counter this drawback, the idea of dynamic AI-driven honeypots has been put forward, which have the ability to constantly alter their activities and settings so they can be very similar to the real systems, thus giving rise to the confusion of the attackers and the boosting of the protection against the ever-changing threats [8,11]. Not only do these adaptive methods disrupt attacks, but they also allow for the gathering of intelligence on the attackers' tactics, techniques, and procedures (TTPs), which in turn helps in reinforcing the overall cybersecurity posture [10,13]. 

The fundamental element of this methodology is an AI-based adaptive honeypot apparatus that does real-time processing of security data on a large scale. The deployment of machine learning algorithms leads 

_E-mail address:_ ma.alshehri@mu.edu.sa. 

https://doi.org/10.1016/j.asej.2026.104061 

Received 28 May 2025; Received in revised form 4 January 2026; Accepted 13 February 2026 

Available online 3 March 2026 

2090-4479/© 2026 The Author(s). Published by Elsevier B.V. on behalf of Faculty of Engineering, Ain Shams University. This is an open access article under the CC BY-NC-ND license ( http://creativecommons.org/licenses/by-nc-nd/4.0/ ). 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

to the detection of anomalies and malevolent patterns, which in turn, cause the immediate activation of the context-sensitive and the carryingout of the responses such as changing the network configuration dynamically, imitating the user behavior or injecting the misleading data [5,8,9,14]. Aside from the immediate threat elimination, these systems play a part in the long-term defense strategies by always learning and fine-tuning the models of the attacker’s behavior [11,15]. The significant advancement in the research is the context-aware behavioral analysis which not only captures the patterns but also the whole process of the attackers’ objectives, strategies and decision making [12,17,18]. The system, through the analysis of the reconnaissance stages and behavioral context, can foresee the attack intentions and consequently, preemptively implement the specific deceptive measures to distract the attackers from the crucial assets [9,13]. Such a function brings about a significant change in the cybersecurity field as it pushes the discipline from the mere reactive stage to that of predictive and proactive ones [5,12]. 

The goal of the study is to create a honeypot network which adapts itself over time using machine learning algorithms, thus accomplishing three main goals: the attackers being misled to the wrong places and not detecting the legitimate systems, gaining intelligence with a very high level of fidelity on the methods and tools used for attacks, and the intelligence being used for the improvement of security strategies in the future [8,10,14]. The combination of deception, adaptability, and predictive intelligence makes the proposed system a very effective means of defense against present-day cyber-attacks [13,16]. 

In fact, this research is a major breakthrough in cybersecurity and it does so by shifting the focus from passive monitoring to active participation and mitigation of cyber threats. The proposed framework makes it possible to have a resilient digital ecosystem that can endure even the most sophisticated attacks while at the same time contributing intelligence that is actionable to the wider cybersecurity infrastructures and promoting long-term innovation and collaboration in the area of cybersecurity [5,7,13–15]. 

#### _1.1. Contributions and novelty of the proposed work_ 

#### _1.1.1. Novel contributions_ 

- ASD-TGXAI – The integrated framework of unified adaptive deception and explainable intelligence that comprises detection, deception, optimization, and XAI as a closed-loop system. 

- ASREF – Real-time autonomous evolution of honeypot strategies through hybrid optimization of Swarm Intelligence, Reinforcement Learning, and Differential Evolution. 

- TGXAI-Net – A deep learning model that merges Transformers (temporal modeling), GNNs (relational reasoning), and XAI for interpretable attack behavior forecasting. 

- PWT Preprocessing – The Preserve-While-Transform strategy that secures cyber-behavioral semantics throughout the feature extraction process. 

- Proactive Deception Loop – An intelligent system that is aware of the context and proactively changes the attack surface for defense that is smart, adaptive, and therefore non-reactive detection rather than just detection. 

#### _1.1.2. How this work advances the state-of-the-art_ 

The proposed framework revolutionizes the cyber deception and intrusion detection fields significantly, and the following points illustrate how: 

- Static/Reactive to Adaptive/Proactive Defense: Regular systems only react post-attack. ASD-TGXAI, on the other hand, foresees the attacker's actions and constantly changes the attack surface, thus confusing and restraining the enemy in an active manner. 

- Isolated Detection to Intelligence-Driven Engagement: Current IDS and deception systems run in their own domains. ASD-TGXAI integrates detection, deception, optimization, learning, and explanation into a continuous intelligent system. 

- Black-Box Models to Explainable Cyber Defense: The former deep learning-based IDS were not user-friendly and thus not transparent. TGXAI-Net, to the contrary, gives understandable predictions and thus helps to build trust, allow auditing, and meet regulations. 

- • Heuristic Configuration to Mathematically Guided Optimization: ASREF does not rely on manually configured deception policies; rather, it autonomously evolves strategies based on attacker behavior using a principled optimization loop. 

- Dataset-Driven Models to Behavior-Preserving Intelligence: The preprocessing of PWT retains cyber-behavioral semantics allowing for the reliable extraction of intelligence that can be used for longterm attack understanding and adaptive defense. 

#### _1.1.3. Novelty and paradigm shift_ 

The fundamental breakthrough of this research is the paradigm of Adaptive Swarm-Driven Cyber Deception with XAI-Aided TransGraph Learning (ASD-TGXAI). This framework is radically different from the conventional defense systems that concentrate merely on detection. It can: 

- Continuously sense the behavior of the attacker, 

- Automatically helplessness overpowering through ASREF, 

- Connect the dots of the attack flow and perception aided by TGXAINet, and. 

- Offer human-like, comprehensible judgments through XAI. 

Consequently, the cybersecurity defense chain is transformed from a passive, monitoring approach to a self-adaptive, proactive, and explainable system, thus gaining remarkable benefits in terms of accuracy, deception effectiveness, and response time. The overall contribution of the study is depicted in Fig. 1. 

The content of the paper includes a literature survey in Section 2 which reviews existing methodologies and their limitations in dynamic cyber deception. Section 3 describes the proposed methodology, incorporating the ASD-TGXAI framework. In Section 4, the results and discussion are preseted, with Section 5 providing the study's conclusion. 

#### **2. Literature survey** 

Recent research (2020–2025) has shown a really clear and significant evolution in the usage of static honeypots and rule-based defenses towards the use of AI-driven, adaptive, and context-aware cyber deception frameworks. For example, Shinde et al. [23] and Wan et al. [20] were early contributors who came up with the concepts of intent prediction and hypergame-based deception respectively. They were followed by even more sophisticated methods that fused ML, reinforcement learning, and behavioral modeling (Odemis et al. [19] Aggarwal et al. [21], Veluchamy & Soundar [25]). The focus of the current developments is on the networks of adaptive honeypots (Ahmed et al. [8], Moric et al. [22], Abdul et al. [24], Guan et al. [26]) and on defenses that are proactive involving SDN, MTD, and deception (Rehman et al. [7], Yang et al. [4], Zhou et al. [27]). Many of them, though, are not capable of performing dynamic reconfiguration, scaling, or mathematically grounded optimal control, which restricts their adaptability to large-scale networks. 

The simultaneous progress of cyber-physical systems has made it necessary to use intelligent multi-objective optimization which is far beyond the capabilities of deterministic tools like HOMER. The recent literature puts more stress on resilience, security, and XAI, hybrid optimization, and deep reinforcement learning as factors (Feng & Hu [35], Hemmati et al. [36], Kumar et al. [37], Xu et al. [38], Sun et al. [39], Li [44], Lami [48], Moosavi et al. [46], Mendonça [49], Goel [50] 

2 

_M. Alshehri_ 

_Ain Shams Engineering Journal 17 (2026) 104061_ 



**Fig. 1.** Contribution of the work. 

Shaier et al. [54], Abdolahzadeh [55]). On the other hand, the singleobjective and heuristic limitations of HOMER call for the development of hybrid techniques that will couple advanced forecasting (ARIMA/ LSTM) with multi-objective evolutionary optimization (NSGA-II, MOPSO) [56,57]. 

The proposed work creatively integrates prediction and optimization by introducing a hybrid framework where the HOMER model is the foundation, subsequently improved by Advanced Time-Series Forecasting + Metaheuristic Optimization (ATF-MO) and a Multi-Objective Decision Support Layer (MODSL) with ranking based on AHP. Moreover, in the light of fractional optimal control theory (Holel & Hasan, 2023), the model is adopting Caputo–Katugampola fractional dynamics to deliver an adaptive honeypot behavior that is not only theoretically optimal, but also stable and history-aware [51–53]. Consequently, the attackers are engaged for longer, their neutralization is quicker, and the energy consumed in the deception process is less [40,41]. In this way, the proposed method not only combines the previously mentioned three powerful components but also pushes the envelope of the state-of-the-art techniques through the establishment of a strong and generalizable AIdriven adaptive deception, mathematically guaranteed optimal control, and multi-objective intelligent optimization framework [4,7,8,19–27,35–39,42–50,54,55]. 

for their high false negatives, scalability issues, and inefficiencies in such methods. To overcome these problems, the Adaptive Swarm-Driven Cyber Deception with XAI-Aided TransGraph Learning (ASD-TGXAI) committed integrating dynamic honeypots, adaptive deception strategies, and real-time AI-based analysis. The architecture of the proposed adaptive cybersecurity framework is illustrated in the Fig. 2. 

#### _3.1. Data collection_ 

The dataset was from a Dionaea Honeypot in North California from 05/07/2022 to 05/08/2022, which logged 27,574 connections with possible mass scanners and security researchers. It included protocol, transport, type, destination, source, and time stamp https://www.kagg le.com/datasets/startingsecurity/cybersecurity-honeypot-attacks/code. 

#### _3.2. Data preprocessing_ 

Data Preprocessing steps are critical for the quality of the inputs to the AI models, which identify, analyse, and respond accordingly to cyber threats. The pre-processing stages are represented in Fig. 3. 

#### _3.2.1. Noise removal_ 

In cybersecurity datasets such as Dionaea Honeypot, noise removal removes redundant or unnecessary information such as data inaccuracies, duplicate connections, and irrelevant activities. With previously known benign activity patterns, the algorithms such as outlier identification or simple filtering schemes is employed to remove or eliminate the irrelevancies in entries. Let the dataset be represented by _D_ = { _d_ 1 _, d_ 2 _,_ ⋯ _, dn_ } _,_ where _di_ represents an individual data point, and the aim is to remove the noise. The process of noise removal can be formalized as follows in the equation (1): 



This equation represents the basic noise removal process, ensuring that the remaining dataset is relevant, accurate, and suitable for further analysis or model training. 

#### _3.2.2. Normalization_ 

This requires normalization before biases during training; the forms are categorized into normalization for time data and feature scaling of numerical data such as the time for the connections, the ports numbers, and data transferred amounts. While this can normalize data with regard to timestamps and easily understood forms, it normalizes the data further on other forms by converting a one-hot or label- encoded form in cases of categorical data into a numeric one. Let _ti_ be the timestamp of the _i_<sup>_th_</sup> data point. The normalized timestamp _t_<sup>ʹ</sup> _i_<sup>is calculated as follows in</sup> the equation (2): 



Where, _tmin_ is the minimum timestamp in the dataset. _tmax_ is the maximum timestamp in the dataset. _t_<sup>ʹ</sup> _i_<sup>is the normalized timestamp for</sup> the _i_<sup>_th_</sup> data point. This equation represents the normalizing procedure applied to continuous (numerical) and categorical features, making sure that all features are scaled appropriate for the machine learning models. 

#### **3. Proposed methodology** 

#### _3.2.3. Labeling_ 

The work elaborates on an adaptive honeypot network, which is AIpowered through a context-aware behavioural analysis for a cybersecurity system that can anticipate. Conventional systems that have statically provisioned configurations are incapable of effectively combating modern threats such as zero-day exploits and polymorphic malware, thus making the risk of critical infrastructures increasing. Current dynamic cyber deception techniques have been criticized in the literature 

Labeling needs to be precise to train the models in supervised machine learning for detecting attacks and categorizing incoming traffic. Attack classification is done using human expertise, contextual descriptors, and predefined categories. Advanced types of attacks can be identified using more identifiers like attack intensity, target protocol, and source IP behaviour patterns. Adding security professionals may improve the detection skills of models and data quality. 

3 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 



**Fig. 2.** Architecture of the proposed adaptive cybersecurity framework. 

_3.2.4. Balancing_ 

To balance class imbalance in security datasets such that AI models are not biased, data for majority classes have to be under sampled, and examples for minority classes have to be oversampled. Data 

augmentation makes the AI learn the more diverse variety of attack types it can identify by creating synthetic copies for those attack types with fewer instances, but cost-sensitive learning incurs higher penalties for misclassifying rare attack types. 

4 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 



**Fig. 3.** data pre-processing. 

#### **Integration with dynamic cyber deception** 

The above preprocessing steps support the central idea of “Dynamic Cyber Deception” as they prepare the data to assist honeypots in adapting and behaving dynamically, based on insights from AI. It removes noise and balances the data so that accurate attack detection could be ensured; this is what is important to proactively engage adversaries through adaptive honeypot networks. 

**For instance** 

- A well-balanced dataset helps the honeypot network to detect rare as well as common attack vectors so that it is not deceiving security researchers or attackers. 

- Proper labeling will help the honeypot present realistic patterns of behaviour in such a manner that attackers become convinced that they are interacting with real, vulnerable systems. 

- With this normalization and standardization of feeds, behavioural analysis systems can watch the patterns that traffic generates through honeypot behaviour and continue to evolve according to changing threat patterns. 

Using these techniques on data preprocessing ensures that AI models driving the honeypots will be trained based on high-quality, robust data, thereby having proactive intelligent neutralization using contextual responses. 

In order to maintain the essential attack-related properties, every preprocessing operation was along with a Preserve-While-Transform (PWT) validation strategy. Instead of doing data cleaning or transformation blindly, statistical and behavioral integrity checks were applied at every stage. 

- Noise Removal: The measures of Entropy and Information Gain were applied to make sure that the attack signatures were not accidentally removed (entropy deviation kept below 2%)(refer Table 1). 

- Normalization: The original packet sequence and session behavior being unchanged were guaranteed by using the temporal correlation metrics 

- Labeling: The security analysts’ cross-validation and Cohen’s Kappa (0.89 agreement score) guaranteed the attack categories’ semantic correctness 

- Balancing: The feature variance was preserved and the uniqueness of the minority class was maintained by SMOTE and cost-sensitive learning (Distribution Integrity Score ≥ 0.94). 

The quality of the data was improved through preprocessing, but the cyber-behavioral properties necessary for accurate detection and explainability in ASD-TGXAI were not compromised. 

The preprocessing pipeline was constructed to keep the dataset's cyber-behavioral authenticity intact while at the same time making the model more learnable. The removal of noise is done in such a way that an entropy-based filter only allows the stripping off of redundant data points that have no significance and at the same time, the removal of meaningless malicious patterns is avoided. The normalization is applied using Min–Max scaling without altering the temporal ordering which is necessary for the sequential flow of Transformer–GNN–XAI analysis thus protecting it. The labeling is based on expert-assisted semantics and is cross-validated using Cohen’s Kappa to avoid the mislabeling of sophisticated attacks like APTs and lateral movement behaviors. Lastly, instead of the naive approach of oversampling, the techniques of SMOTE and cost-sensitive balancing are employed which were statistically speaking, the rare attack classes have retained their uniqueness thus preventing overfitting and improving generalization. Unlike existing works that consider preprocessing a single cleaning task, ASD-TGXAI connects preprocessing to cyber-behavior preservation making sure that the critical attack patterns remain accessible for explainable threat intelligence. As a result of these concurrent “preserve-while-transform” validations, no significant intruder behavior was lost during preprocessing, thus ensuring that TGXAI-Net is fed high-integrity data 

**Table 1** 

Data preprocessing and preservation strategy. 

|Preprocessing<br>Step|Algorithms Used/Method|Property Preserved|Validation Metric Used|Benefit to TGXAI-Net|
|---|---|---|---|---|
|Noise Removal|Outlier detection, duplicate<br>removal, entropy filtering|Attack pattern signatures,<br>Packet behavior entropy|Information Gain (IG),<br>ΔEntropy_<_2% deviation|Removes useless logs while retaining malicious<br>patterns|
|Normalization<br>Labeling|i<br>Min–max scaling (Eq. 2),<br>timestamp normalization<br>Semi-supervised labeling+SME<br>rule validation|Relative temporal ordering&<br>packet flow behavior<br>True attack categorization and<br>behavioral semantics|Temporal correlation score<br>(TCS≥0.92)<br>Label accuracy cross-check;<br>Cohen's Kappa=0.89|Prevents bias in ML models while keeping<br>sequence intact (needed for Transformer+ GNN)<br>Ensures high-quality ground truth for supervised<br>learning|
|Data Balancing|SMOTE+cost-sensitive learning+<br>minority oversampling|Attack feature variance and<br>semantic uniqueness|Distribution Integrity Score<br>(DIS≥0.94)|Avoids model bias; preserves minority attack<br>behavior (e.g., APT, zero-day)|



5 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

allowing it to make excellent anomaly predictions and adversarial reasoning. 

#### _3.3. Honeypot network design_ 

real-world systems and adapt to persistent attack patterns. It adjusts the level of traffic and the patterns of interaction to mimic real system behaviour, which makes the system appear more realistic to attackers as per the equation (4): 

#### _N_ ( _t_ ) = _g_ ( _E_ ( _t_ ) _, A_ ( _t_ ) _, I_ ( _t_ ) _, C_ ( _t_ ) ) (4) 

Honeypot Network Design is a network design of honeypots forms a crucial part of effective intelligence gathering of the attackers, simultaneously maintaining the dynamic and adaptive ability and mimicking the critical environment in the system. The components that form the core of Honeypot Network Design, in alignment with methodology and objectives for dynamic cybersecurity deception [28]. Fig. 4 illustrates the design of the honeypot network. 

#### _3.3.1. Dynamic honeypots_ 

In order to build a responsive honeypot network, simulating critical system environments like databases, Internet of Things devices, and application servers is very important. To make attackers gain access to open ports and services, these honeypots must emulate the settings, vulnerabilities, and behaviours exhibited by real systems. Another point is that honeypots should be dynamically configured, so their behaviour is dynamically changed to persistent attack patterns. This encompasses interactive engagement and network traffic adaptation. Through this, the honeypot changes system reactions to accommodate engagements from attackers. This ensures a tighter defense against possible attacks. The response _R_ ( _t_ ) of the honeypot at time _t_ is a function of system settings _S_ ( _t_ ), attacker actions _A_ ( _t_ ), and vulnerability exposure _V_ ( _t_ ) as per the equation (3): 



Where, _R_ ( _t_ ) is the response of the honeypot at time _t_ , _S_ ( _t_ ) represents the system settings and configurations at time _t_ (e.g., open ports, services), _A_ ( _t_ ) denotes the actions taken by the attacker at time _t_ (e.g., probing, exploiting vulnerabilities), _V_ ( _t_ ) denotes the vulnerabilities that the honeypot is simulating or exposing at time _t_ , _T_ ( _t_ ) denotes timedependent factors like traffic volume and engagement level. This equation models how the honeypot modifies its behaviour according to the attacker's activities and the system configuration so that it simulates 

Where, _N_ ( _t_ ) is the network traffic generated by the honeypot at time _t E_ ( _t_ ) represents the engagement level with the attacker at time _t_ (e.g., probing, interaction frequency), _A_ ( _t_ ) denotes the actions taken by the attacker at time _t_ , _I_ ( _t_ ) is the level of interaction simulated by the honeypot, which can be something like emulating legitimate service responses, _C_ ( _t_ ) is the configuration of the network traffic patterns at time with dynamic adjustments of _t_ based on observed attacker behaviour. This equation is formulated in such a way that it leads the honeypot network to change its traffic patterns to imitate the real system environments of the data interactions and thus, the changes in the traffic patterns are made according to the ongoing interactions. This will help in keeping the engagement ongoing and making the vulnerabilities of the systems indistinguishable. 

#### _3.3.2. Deception strategies_ 

Deception is regarded as a crucial ingredient to make sure the attackers come to the honeypot network and do not regard it as a trap. In other words, the environment should not just lure the attackers but also mislead them to a certain degree so as to make them disclose their TTPs. 

#### a) Realistic System Vulnerabilities 

These traps can be set up to portray vulnerabilities of real nature in hardware and software configurations, such as the use of outdated software, the presence of open ports, or the use of poorly configured authentication mechanisms. This should go hand in hand with the existences of weaknesses that correlate with the active attack paths in order to make the honeypot's disguise convincing. For example, installing known CVEs within the system is a deceit to the attackers to think that they find an unpatched system. 



**Fig. 4.** Architecture of the honeypot network. 

6 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

#### b) Multi-layered deception 

Honeypots use emulated services, fictitious credentials, and decoy files and data to lure attackers. The credentials are put in places that are easily accessible, such as configuration files or open services, so people will be encouraged to steal. Researchers can monitor malicious activity and gain further insight into the techniques of an attack by simulating actual systems through simulated services such as SSH, FTP, HTTP, or DNS servers. In addition, the dummy data mimics the working systems so that the attackers believe that they are dealing with the real target. 

#### _3.3.3. Continuous adaptation and evolution_ 

In the design of the honeypot network, interaction with attackers is not to be exposed through making the response of the network adaptive and dynamic in its nature. Dynamic systems for constant monitoring and changing the honeypot's setup or strategies in response are implemented to achieve this. Through behavioural feedback loops adapting honeypot behaviour to respond to patterns of attacks by adjusting vulnerabilities and deception layers in tandem with attacker strategies or refocusing 

- _u_ ( _t_ ) ∈ R<sup>_m_</sup> be the control input (deception actions): vulnerability exposure, service-emulation depth, fake-data release rate, interaction latency adjustments. 

- _d_ ( _t_ ) denote attacker-driven disturbances (recon probes, exploit attempts), estimated by TGXAI-Net in real time. 

We model system evolution with a Caputo fractional derivative of order _α_ ∈(0 _,_ 1](memory effect): 



with initial condition _x_ (0) = _x_ 0. Here _A, B, G_ are appropriate dimension matrices (or nonlinear operators if preferred). 

Interpretation: the fractional derivative means the current rate of change depends on a weighted history of _x_ ( _τ_ ) for _τ_ ≤ _t_ . 

_3.3.5.3. Optimal control objective._ Design _u_ ( _t_ ) to maximize deception utility while minimizing resource cost and risk of accidental exposure. A typical cost functional: 



honeypot services to imitate certain system conditions, it achieves this end. 

#### where: 

#### _3.3.4. Honeypot isolation and security_ 

To ensure that the honeypot network does not become a liability, it should be isolated and separated from the main production network. Proper isolation prevents attackers from pivoting into real systems and ensures that any attack interactions remain confined within the controlled environment. Techniques include: 

- **Segmentation of the Network:** Honeypots must be placed in isolated network segments that are cut off from other critical production systems. This is to ensure that if an attacker gains access to the honeypot, they will not be able to move laterally into other parts of the network. 

- • **Analysis of Network Traffic:** Real-time network traffic analysis tools must be used to track interactions between the attackers and the honeypot. These can help detect attempts to exploit vulnerabilities that could break the isolation. 

#### _3.3.5. Applying fractional dynamics_ + _optimal control to adaptive honeypots_ 

_3.3.5.1. Why fractional models?._ Fractional derivatives (non-integer orders) naturally capture memory, long-range dependence, and multiscale temporal dynamics — properties that match attacker behaviour (e.g., slow reconnaissance, dormant APT activity, bursty scans). Using fractional dynamics for honeypot state evolution lets the defender model how past interactions influence current system vulnerability perception and attacker engagement, enabling smoother, anticipatory control. 

_3.3.5.2. State, control and disturbance definitions._ Let: 

- _x_ ( _t_ ) ∈ R<sup>_n_</sup> be the honeypot state vector, e.g. 

- _x_ ( _t_ ) = [ _e_ ( _t_ ) _, r_ ( _t_ ) _, s_ ( _t_ )]<sup>⊤</sup> where 

- _e_ ( _t_ ) = engagement level (how engaged attacker is), 

- _q_ 1 _, q_ 2 _, q_ 3 _>_ 0 weight engagement, resource use, and residual risk, 

- _R_ penalises aggressive control action (to avoid unrealistic behavior switching), 

- _S_ ( _x_ ( _T_ )) is terminal cost (e.g., residual attacker intelligence value), 

- Risk(⋅) measures potential for honeypot to be recognized or to enable lateral movement (can be predicted by TGXAI-Net). 

Goal: find admissible _u_<sup>*</sup> ( _t_ ) minimizing _J_ subject to (1) and constraints _u_ min ≤ _u_ ( _t_ ) ≤ _u_ max, safety constraints on _x_ ( _t_ ), and discrete reconfiguration cost limits. 

_3.3.5.4. Necessary conditions_ — _fractional Pontryagin principle._ For fractional dynamics, necessary optimality conditions are analogous to Pontryagin’s principle but use fractional adjoint operators. Define Hamiltonian: 





with appropriate terminal condition depending on _S_ . Optimal control must satisfy: 



projected onto admissible set. 

_3.3.5.5. Numerical solution approaches._ Solving fractional optimal control analytically is rarely possible; use numeric/direct methods: 

**Direct discretization (recommended)** 

- _r_ ( _t_ ) = resource utilization, 

- _s_ ( _t_ ) = simulated-service realism score. 

7 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

- Approximate fractional derivative via Grünwald–Letnikov (GL) or L1 scheme: 



- Transcribe the continuous problem to an NLP: discretize _x,u_ - _>_ solve with hybrid optimization- ASREF (Swarm + RL + DE). The ASREF (Swarm + RL + DE) to search for near-optimal control sequences, using TGXAI-Net predictions as disturbance model; this avoids explicit adjoint computations and is practical for real-time reconfiguration. 

_3.3.5.6. Estimation of fractional order_ **_α_** _._ Estimate _α_ from honeypot interaction logs (autocorrelation, power-law decay of response functions). Fit fractional models via least squares or use system identification (nonlinear optimization) so the model reflects the real memory effect of attacker behaviour. 

#### _3.3.5.7. Stability and robustness._ 

- Fractional stability uses Mittag–Leffler bounds: if eigenvalues of _A_ are in appropriate sector, solutions decay in a controlled manner. Use Lyapunov-like fractional methods to ensure boundedness of _x_ ( _t_ ) under chosen control. 

- Include robust constraints in optimization to account for model mismatch and TGXAI-Net prediction uncertainty (chance constraints or min–max robust control). 

#### _3.3.5.8. How this integrates into ASD-TGXAI._ 

- TGXAI-Net provides real-time _d_ ( _t_ ) estimates (attacker intent, likelihood of escalation) and risk scores used in Risk( _x, d_ ) term of the cost. 

- ASREF is used as the online controller optimizer: it searches for _u_ ( _t_ ) sequences (or control policy parameters) that minimize discretized cost _J_ under fractional dynamics approximations—this is practical for online adaptation. 

- RL layer can learn a feedback policy _u_ = _πθ_ ( _x_ ) where the policy is trained on fractional-dynamics simulations (model-based RL). 



**Fig. 5.** The flow chart of honeypot model inclusion in the proposed work. 

5. Choose solver: For offline design, use direct collocation + NLP. For online adaptation, use ASREF to search control actions over short horizon (MPC-like). 

6. Validate on cyber-range with simulated APTs; adjust _q_ -weights to meet operational trade-offs. 

7. Deploy with rollback checkpoints, XAI validation, and safe-guards as in your existing adaptive update logic. Fig. 5 shows the flow chart of the inclusion of honeypot model in the projected approach. 

_3.3.5.10. Example (toy) discrete formulation._ At time-step _n_ with step _h_ and GL weights _w_<sup>(</sup> _k_<sup>_α_):</sup> 1 _n h_<sup>_α_</sup> ∑ _w_<sup>(</sup> _k_<sup>_α_)</sup><sup>_xn_−</sup><sup>_k_=</sup><sup>_Axn_+</sup><sup>_Bun_+</sup><sup>_Gdn_</sup> (7) _k_ =0 

Solve for _xn_ iteratively. Optimize { _un_ }<sup>_N_</sup> _n_ =<sup>−</sup> 0<sup>1to minimize discretized</sup><sup>_J_;</sup> use ASREF (DE to mutate candidate _u_ -trajectories, PSO/Swarm to explore, RL to warm-start). 

#### _3.3.5.11. Benefits & challenges._ **Benefits** 

- XAI explains why a particular control _u_ ( _t_ ) is chosen (which features of _d_ ( _t_ ) and _x_ ( _t_ ) drove the decision), allowing analysts to audit adaptive behavior. 

- Models attacker memory and slow-evolving threats (APTs) better. 

#### _3.3.5.9. Practical implementation._ 

1. Identify states _x_ and controls _u_ ; instrument honeypots to log required features. 

2. Estimate _α_ from historic honeypot traces (autocorrelation, memory test). 

- Enables proactive control with long-term planning (anticipatory deception). 

- Natural fit for data-driven policy learning (RL + fractional model). 

#### **Challenges** 

3. Derive discrete fractional dynamics using GL/L1 for realtime compatibility. 

4. Define cost function _J_ including deception utility and safety constraints. 

- Increased computational cost (fractional derivatives are historydependent). 

- Parameter estimation (α, A,B) requires care and good data. 

- Numerical solvers need careful tuning; real-time constraints may prefer ASREF or MPC approximations. 

8 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

|| _x_ ( _t_ )|| ≤ _δ_ ∀ _t_ (11) 

_M. Alshehri_ 

_3.3.5.12. Engagement gain under Fractional-Control vs. Integer-Order control (ΔAIT)._ What it measures: How much more effectively the fractional-order honeypot keeps the attacker engaged compared to conventional (integer-order) honeypot control. **Metric Definition** 

Δ _AIT_ = _AITfractional_ − _AITinteger_ (8) 

#### Where: 

- AIT – Attacker Interaction Time (total time an adversary stays inside the deception environment). 

#### **Measurement Approach** 

#### Where: 

- _x_ ( _t_ ) = state of honeypot–attacker interaction dynamics 

- δ = safe bounded region 

#### **Measurement Approach** 

- Introduce unpredictable behavior (e.g., polymorphic malware). 

- Examine whether system state remains bounded. 

#### **Interpretation** 

- Run parallel experiments with both control strategies. 

- Log attacker engagement duration, depth of interaction, and number of triggered deception layers. 

#### **Interpretation** 

- A higher ΔAIT means better deception effectiveness. 

_3.3.5.13. Reduction in detection-to-neutralization time (DNT)._ What it measures: Efficiency—how fast the honeypot detects and neutralizes a threat after initial contact. 

_DNT_ = _tneutralization_ − _tdetection_ (9) 

- If x(t) stays within bounded limits → control strategy is resilient. 

_3.3.5.16. Interpretability of control decisions (XAI concordance score)._ What it measures: Explains why the adaptive honeypot took an action. Ensures AI decisions are interpretable. _Agreements with Human Expert XAI C_ = (12) _Total Decisions_ 

#### **Measurement Approach** 

- For a sample of honeypot actions, compare model explanation (feature attribution) with expert evaluation. 

#### **Measurement Approach** 

#### **Interpretation** 

- Track timestamps in system logs. 

   - High XAI Concordance → decisions are explainable, trustworthy. 

- Compare fractional-controlled honeypot vs. baseline. 

#### **Interpretation** 

- Lower DNT = faster reaction and proactive defense. 

_3.3.5.14. Resource cost per unit deception utility (control energy)._ What it measures: Optimizes deception efficiency—achieves maximum attacker engagement with minimum computational energy spent. 

_Energy used CE_ = (10) _Deception Utility_ 

#### Where: 

- Energy_used = CPU + memory utilization during adaptive control decisions. 

- Deception Utility = weighted score (interaction depth, commands executed, service paths explored). 

#### **Interpretation** 

- Lower Control Energy = smarter deception at lower cost. 

_3.3.5.15. Robustness under model mismatch (boundedness of_ **_x_** ( **_t_** ) _)._ What it measures: System stability when attacker behaviors do NOT match the prediction model or when noise enters the system. 

The assessment framework relies on quantitative measures that contrast fractional-order optimal control with conventional integerorder strategies. Engagement Gain (ΔAIT) indicates how effectively the deception is carried out, while Detection-to-Neutralization Time reflects the agility of the response. Control Energy expresses the computational cost in relation to the deception utility. Robustness is gauged by the boundedness of the interaction state x(t), thus, ensuring stability in the face of adversarial unpredictability. Lastly, XAI Concordance measures whether the system's decisions are understandable and consistent with human reasoning. Together, these indicators serve as a comprehensive validation of the performance as well as the interpretability of adaptive honeypots under fractional optimal control. 

#### _3.3.6. Integration with AI and machine learning_ 

AI models will be interfaced with a honeypot network design and deployed in pursuit of optimizing an attack's detectability, adaptive changes, or even deception on a Dynamic Cyber Deception scheme. 

- **Data Collection for Model Training:** The model shall ensure the continuous updating of honeypot behaviour regarding attack prediction along with analysis regarding future attacker action by feeding captured attacker interaction logs to machine-learning models. 

- **Automated Attack Response:** The AI will help to respond to attacks by dynamically modifying deception strategies or providing feedback leading to the automated deployment of new honeypots in real time. 

9 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

The Honeypot Network Design is based on the deployment of dynamic, adaptive, and evolvable systems that is adapted in real-time to effectively engage attackers. Through the simulation of realistic vulnerabilities, multi-layered deception strategies, and AI-driven adaptation, the honeypot network collects valuable threat intelligence while proactively neutralizing cyber threats. 

#### _3.4. Integration of novel hybrid techniques for advanced cybersecurity_ 

In order to fix the faults of the current methods in the field of dynamic cyber deception and proactive threat mitigation, there have been created two new hybrid techniques on a conceptual level. These are the mixes of more than one already advanced method by which the cybersecurity systems get improved in terms of their better adaptability, efficiency, and precision. 

#### _3.4.1. Adaptive Swarm-Reinforce Evolutionary framework (ASREF)_ 

Static methods, which have been generally along static or purely heuristic lines, are not very effective in the case of evolving cyber 

threats. To this effect, there is a significant demand for a hybrid intelligent optimization technique that would: (i) maintain a balance between resource efficiency and a high level of deception effectiveness, (ii) adjust the honeypot configuration automatically from the viewpoint of interacting with different attacker profiles, and (iii) generate the configurations that are resistant to advanced persistent threats. Thus, a novel Adaptive Swarm-Reinforce Evolutionary Framework (ASREF) is proposed, which integrates Swarm Intelligence (SI), Reinforcement Learning (RL), and Differential Evolution (DE) techniques to the different cyber threats challenges arising from their evolution. SI optimizes resource allocation and attacker engagement strategies, RL dynamically adapts honeypot configurations based on attacker behaviour, and DE improves robustness by fine-tuning deception parameters against APTs. This integration guarantees efficient, adaptive, and robust approaches to cybersecurity optimization. 

The architecture of the proposed ASREF is displayed in the Fig. 6 ASREF is designed to dynamically optimize honeypot configurations to overcome the weaknesses of existing optimization techniques, which integrate three state-of-the-art approaches. 



**Fig. 6.** Architecture of the proposed ASREF. 

10 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

**Mechanism(mathematical expressions are available at** Append **ix)** 

- Swarm Intelligence initially explores a wide range of potential honeypot setups. 

- Reinforcement Learning adjusts these setups very closely to the intruder behaviour in the real-time situation, thus ensuring high engagement and data collection. 

- Differential Evolution determines the parameters like decoy placement, interaction depth, and service emulation by addressing complicated, multi-objective problems. 

#### **Outcome** 

ASREF generates a network of honeypots that are adaptive and resource-efficient, thus, the attacker’s interaction is maximized and the risk of detection is minimized. The security team is enabled to collect intelligence on the new threats in a proactive manner and come up with the countermeasures. 

Algorithm 1: Adaptive Swarm–Reinforce Evolutionary Framework (ASREF) 

|Purpose: Dynamically optimize honeypot configurations to maximize deception utility<br>while minimizing risk and resource cost.|
|---|
|Input:|
|• Initial honeypot population:_P_0|
|• Attacker interaction stream:_D_|
|• Fitness function:_F_(⋅)|
|• Learning rate:_η_<br>|
|Maximum iterations:_T_|
|Output:<br>i|
|• Optimized honeypot configuration:_P_<sup>*</sup>|
|i<br>Procedure:|
|1.Initialization|
|1.1 Set population_P_←_P_0|
|1.2 Initialize reinforcement policy_πθ _randomly|
|1.3 Initialize velocities_vi _for all particles_pi_ ∈_P_|
|1.4 Set personal best_p_<sup>_best_</sup><br>_i_<br>←_pi _and global best_g_<sup>_best_</sup>|
|2.Iterative Optimization|
|**for**_t_=1 to_T_**do**|
|2.1 Observe attacker behavior_dt_ ∈_D_<br>i|
|2.2 Evaluate fitness for each particle:|
|i<br>_fi_ =_F_(_pi,dt_)|
|Swarm Intelligence Module (Exploration)|
|**for each**particle_pi_ ∈_P_**do**|
|_vi_←_ωvi_ + _c_1_r_1<br>(<br>_p_<sup>_best_</sup><br>_i_<br>−_pi_<br>)<br>+_c_2_r_2<br>(<br>_g_<sup>_best_ </sup>−_pi_<br>)|
|_pi_←_pi_ + _vi_|
|**end for**|
|**Reinforcement Learning Module (Adaptation)**|
|2.3 Select action:<br>|
|_at_ ∼_πθ_(_st_)|
|<br>2.4 Receive reward:|
|_rt_ =deception\_gain−risk−resource\_cost|
|2.5 Update policy parameters:<br>|
|_θ_←_θ_ +_η_∇_θ_log_πθ_(_at_|_st_)⋅_rt_|
|<br>**Differential Evolution Module (Refinement)**|
|**for each**candidate_pi_ ∈_P_**do**|
|_mi_ =_pa_ + _F_(_pb_−_pc_)_,a,b,c_∕=_i_|
|Perform crossover between_pi _and_mi _to obtain_ui_|
|**if**_F_(_ui, dt_)_> F_(_pi, dt_)**then**|
|_pi_←_ui_<br>**endif**|
|**end for**|
|2.6 Update personal and global bests:|
|_p_<sup>_best_</sup><br>_i_<br>←argmax<br>(<br>_F_(_pi_)_,F_<br>(<br>_p_<sup>_best_</sup><br>_i_<br>))|
|_g_<sup>_best_</sup>←argmax<br>_i_<br>_F_(_pi_)|
|**end for**|
|Return|
|Result|
|Set_P_<sup>*</sup>←_g_<sup>_best_</sup>and return_P_<sup>*</sup>|



#### _3.4.2. TransGraph-XAI fusion model (TGXAI-Net)_ 

Most of the current threat prediction models fail to have sufficient contextual understanding and, as a result, they react with a delay and give partial insights. The issue is made even more difficult by raising the prediction accuracy through the inclusion of contextual factors for a 

better understanding of the attacker's behavior. Besides that, there is a requirement for a set of proactive defense measures by means of explainable intelligence that is capable of dealing with intricately structured attacks like lateral movements and multi-vector threats. CDPLT is the answer to these deficiencies in an effective manner. Hence, a novel TransGraph-XAI Fusion Model (TGXAI-Net) is presented, which is a hybrid of Transformers, Graph Neural Networks (GNNs), and Explainable AI, (XAI), aimed at the enhancement of both the accuracy and the explainability of threat prediction. It employs a Transformer layer to capture sequential patterns in attack behaviour, uses a GNN for complex relationships or interactions between entities within the network, and XAI allows transparence in actionable insights. By integrating all these approaches, TGXAI-Net proactively predicts attacker behaviour, addresses lateral movements, and multi-vector threats while offering clear explanations for decision-making, thus empowering defenders with both precision and transparency. Fig. 7 shows the architecture of the proposed TGXAI-Net. 

#### a) Transformers 

Transformers is representing contextual sequences of historical and live attack data by capturing long-term dependencies in attack behaviour. Input sequences of attack features at each time step are augmented with positional encodings to maintain the sequential order [32]. It is the core mechanism of self-attention that computes relationships between each element of a sequence using the following equation (13): 



Multi-head attention is then applied in order to let the model attend to different viewpoints as per the equation (14): 



These steps enable accurate modeling of sequences in proactive threat prediction. 

By this, it effectively models contextual sequences of attack data capturing both short and long dependencies, which is really important for finding and predicting the attacker's behaviours, especially where contextual patterns evolve with time. 

#### b) Graph Neural networks (GNNs) 

GNNs is effective for capturing relationships between attack vectors and contextual features. The attack network is represented as a graph; each attack vector as a node and the connections or interactions between them as edges. GNNs aggregate information from the neighbouring nodes in order to update each node's representation, aiding in the capturing of complex dependencies in the attack behaviour [33]. It is typically given in terms of the following node update rule as per the equation (15): 



Where, _h_<sup>(</sup> _v_<sup>_k_)</sup> is the feature vector for node _v_ at layer _k_ , and _Avu_ is the adjacency matrix. After many layers, the last node representation is used for classification or prediction, which is represented as in the equation (16): 



This process helps GNNs to capture the relationships and interactions that are very important to understand complex attack patterns. 

c) Explainable AI (XAI) 

11 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 



**Fig. 7.** Architecture of the proposed TGXAI-Net. 

XAI seeks to make the predictions of AI models transparent and understandable, thus allowing for actionable insight in decision-making. Understanding why a model has made a specific prediction enhances trust and allows the user to make informed decisions. One common method in XAI is the usage of LIME, which stands for Local Interpretable Model-agnostic Explanations, approximating complex models with simpler, interpretable models locally [34]. The model's prediction for an instance _x_ is approximated by equation (17): 



- Transformers depict changes over time in attack sequences, and are 

- able to detect very subtle patterns and trends. 

- Graph Neural Networks track how the different attack attributes (for instance: source, target, method) relate to each other, thus enabling a complete understanding of the threats. 

- XAI (Explainable Artificial Intelligence) helps to ensure that the forecasting can be understood by the users and thus it can also prove the reasoning behind the threat predictions which in turn enhance decision-making. 

#### **Outcome:** 

Where, ∅ _i_ ( _x_ ) are the features of the simpler model and _αi_ are the learned coefficients. Another one is Shapley Additive Explanations (SHAP). It gives value to every feature based on how much contribution that feature does for the model's output as per the equation (18): 



Where, _f_ ( _S_ ) is the prediction by the model on the feature set _S_ and _N_ is the collection of all the features. XAI aids in understanding and trusting model decisions. 

TGXAI-Net is a cybersecurity system that is equipped with threat neutralization capabilities that are proactive. So, it effectively reduces the times that the system is not operating, increases its toughness, and even allows to easily understand what the intruder was thinking and doing. However, the deployment of ASREF and TGXAI-Net solves the problems that are most severely felt by adaptive cyber defenses: 

- Enhanced Adaptability: The two methods handle the threat situation in a dynamic manner thereby addressing the problem of real-time relevance immediately. 

**Mechanism** 

12 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

- Resource Efficiency: With HIOT, computational and network resources are used optimally while the deception effectiveness is at its maximum. 

- Proactive Defense: CDPLT will be able to foresee the threats that are going to happen even before they do and will make a response fast enough to cause little or no damage. 

- Actionable Insights: The two methods are not only being clear but also being actionable they open the way to informed decisionmaking for long-term cybersecurity strategies. 

#### _3.5.2. Context adaptation_ 

The behavioural insights from the observation will be used to make immediate changes in honeypot tactics. Such changes might comprise alterations to network configurations, the development of fake vulnerabilities, and the deployment of adaptive deception strategies to maintain unpredictability. The enhancements will guarantee that the honeypot remains an attacker-friendly and attractive site, thus, the collection of usable intel will be intensified. 

#### _3.5.3. Integration with AI models_ 

With the integration of cutting-edge optimization and machine learning research, the new strategies are reshaping the cybersecurity landscape from simple reactive defenses to sophisticated, adaptive measures that can effectively deal with advanced cyber threats. 

|Algorithm 2: TransGraph-XAI Fusion Network (TGXAI-Net)|
|---|
|Purpose: Predict attacker intent and attack progression using temporal, structural, and<br>explainable modeling.|
|Input:<br>|
|• Attack event sequence:_S_ = {_e_1_,e_2_,_⋯_,en_}<br>• Network interaction graph:_G_ = (_V, E_)<br>|
|• Initial node/feature matrix:_X_∈R<sup>|</sup><sup>_V_|×</sup><sup>_d_</sup>|
|Output:|
|• Threat prediction:̂_y_|
|• Explanation map:_E_xai|
|Procedure:|
|Temporal Modeling (Transformer Encoder)|
|1.1 Embed the attack sequence_S_with positional encoding:|
|_S_<sup>ʹ </sup>=Embed(_S_) + PosEnc(_S_)|
|1.2 Compute self-attention representations:|
|_Zt_ = TransformerEncoder(_S_<sup>ʹ</sup>)|
|Structural Modeling (Graph Neural Network)|
|2.1 Initialize node representations:<br>_H_<sup>(0) </sup>= _X_|
|2.2 For each graph convolution layer_k_=1 to_L_:|
|_H_<sup>(</sup><sup>_k_) </sup>=_σ_<br>(<br>_WkH_<sup>(</sup><sup>_k_−1) </sup>+AggregateNeighbors<br>(<br>_H_<sup>(</sup><sup>_k_−1)</sup>_, G_<br>))|
|Feature Fusion|
|3.1 Fuse temporal and structural features:|
|_Z_fused =Concat<br>(<br>_Zt,H_<sup>(</sup><sup>_L_))</sup>|
|Threat Prediction|
|4.1 Compute class probabilities:|
|_y_ =Softmax<br>(<br>_W_out_Z_fused+_b_out<br>)|
|Explainability Module|
|5.1 Compute post-hoc feature attributions:<br>̂|
|_E_xai = Explain<br>(̂<br>_y,Z_fused<br>)<br>using SHAP|
|Return Results|
|Return̂_y_and_E_xai|



#### _3.5. Context-aware behavioural analysis_ 

The Context-Aware Behavioral Analysis serves as an instrument to heighten the adaptive honeypot network capabilities featuring live surveillance, intruder behaviour classification, and automatic alteration of the honeypot plan. The goal here is to escalate the interaction with aggressors, enhance the application of the deception techniques, gather the valuable pieces of intelligence, and make sure that the honeypot stays a feasible and unanticipated target. It is a self-adjusting mechanism for prevailing dangers and it leads to the improvement of the cybersecurity system by embedding advanced machine learning models and installing feedback loops. 

#### _3.5.1. Real-time monitoring_ 

The objective is to create an adaptive honeypot network that will be augmented with the help of machine learning by the real-time classification of attacker behaviour which will be a collaborative effort. It would involve the classification in real-time of goals, methods, and decisions of the attacker. The system is endowed with such functions that allow it to carry out a real-time response upgrade through anomaly detection and behavioural clustering which could, in fact, disclose a degree of operational transparency for the malicious side. 

This approach will be to analyze the behavioral data with the help of more advanced machine learning techniques like reinforcement learning and contextual neural networks. These machine learning models would be trained on both the past and the ongoing interactions of the attackers with the honeypot, so they would continually update their learning and therefore, be able to resist new threats. 

#### _3.5.4. Behavioural feedback loops_ 

Such a mechanism will set up a feedback loop that permanently improves the system based on the responses of the attackers. The loop will continuously change the characteristics of the honeypot, such as the interaction level and the decoy deployment strategy, so that the engagement is always prolonged and the attackers are facing increased difficulty. 

For the full implementation of Context-Aware Behavioural Analysis the following steps are recommended: i. Behavioral classification models should be developed and trained using the labeled honeypot interaction datasets. ii. Real-time context adaptation algorithms should be implemented for the real-time dynamic modification of honeypot configurations. iii. System testing and validation must be done in a controlled environment that scales well and gives high accuracy. iv. Behavioral analysis should be integrated with wider cybersecurity frameworks to share threat intelligence in a more unified manner. This method guarantees that it adopts previous techniques while being an aggressive and flexible system in its role as an adaptive and dynamic one. 

#### _3.6. Threat neutralization and intelligence gathering_ 

The main point of the Adaptive Honeypot Network is to bring to the fore the changeover from a conventional threat management strategy where attacks are just redirected to a complete approach where threats are neutralized in controlled settings and, thereafter, the generation of actional intelligence that not only drives the immediate defensive reaction but also helps in the drafting of strategic improvements in the cybersecurity area over the long term. The mere thought of embedding a proactive defense layer with constant intelligence collection changes the entire notion of cybersecurity from just being a reactive management of threats to that of proactive threat prevention. 

#### _3.6.1. Proactive defense_ 

The adaptive honeypot network is expected to eliminate threats as it redirects the attackers to controlled environments where their actions will be closely monitored and analyzed. This is made possible by the deployment of dynamic, context-sensitive honeypots that mimic the real-world environments of the systems that are deceiving users into engaging with them. The use of the technology not only blocks access to the actual systems but also alters the environment so as to give the attacker a wider area of operations after he is caught. Such a defensive measure by means of isolating the attackers in a controlled environment, thus, lessening the immediate threat to production systems and providing valuable intelligence. Additionally, the system employs realtime behavioural analysis to detect and respond to changes in attacker tactics so as to remain an attractive target. 

13 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

#### _3.6.2. Intelligence gathering_ 

Knowing how to gather intelligence is one of the most important elements of the whole process. Basically, it is through this that security experts can figure out the tricks, the techniques and basically the whole method that is used by the attackers. By actually analysing the data that is collected, it provides very valuable and actionable threat intelligence for the next defense strategies. 

#### _3.6.3. Maximized resource utilization_ 

Since honeypots are only chosen and set up dynamically based on the threat intelligence and attacker profiles, this makes the best of computational and networking resources. In this way, resources are not wasted, and the interaction with potential attackers is maximized. Moreover, the effectiveness of resource usage has also been improved by means of AIbased optimization techniques. 

**Key intelligence collection methods** 

#### _3.6.4. Proactive neutralization_ 

- Attacker Behaviour Logging and Analysis: The system is actively recording and analyzing the attackers' interactions in the honeypot environment. The logs contained instances of the attackers taking advantage of the system, lateral movement, credential theft, and data extraction. This will explain the goals, means, and tools of the attacker. 

- Uncovering TTPs: The system will be capable of revealing the conduct of the attackers by analysing the data. For instance, a series of attempts to penetrate a specific vulnerability might point out a lurking danger. This kind of information is very helpful for the security teams to both prevent and kill the future attacks. 

- Correlating Attacks with Threat Actors: Once the system has done through processing of threat intelligence, it will then connect the attack methods that have been seen with the profiles of undisclosed threat actors. Thus, the organizations will be able to tell who is behind the attacks and set the right countermeasure. 

#### **Output: Actionable Threat Intelligence** 

Threat neutralization and intelligence gathering should yield actionable threat intelligence that fortifies the security of any organization. The knowledge gained will be used to both update existing security measures and create new defense strategies. The following key aspects are outputted among the elements involved in this process: 

- Detection of Vulnerability: The system finds and informs the organizations about all types of vulnerabilities that have been the subject of targeting and attempting exploitation by the criminals, thus making it possible for organizations to focus and prioritize their efforts in patching and mitigating. 

- Advanced Detection Rules: The security teams by adopting the tactics from honeypot interactions can improve their detection rules and response mechanisms through continuous learning. 

- Proactive Defense Strategy: This intelligence breaks the ground for a proactive defense strategy that will be able to predict the attackers' behavior and consequently, to defeat them before the critical systems are attacked. 

- Threat Actor Profiling: Understanding the behavior and techniques of various threat actors will enable organizations to create defenses that are more tailored to their particular threat landscape. 

Expected Outcome: The expected outcomes of the proposed adaptive cybersecurity framework are several transformational results consisting of dynamic honeypots and AI-based context aware behavioral evaluation: 

Dynamic Cyber Defense: The adaptive honeypot network undergoes constant changes along with the cyber threats that are constantly changing. This system is not a fixed one like the traditional ones. The moving system continuously adjusts itself according to the real-time configuration and deception by the attacker's behavior; thus, it remains robust and inaccessible to the most intricate threat actors while reducing the exposure risk significantly. 

Enhanced Threat Detection: The machine learning algorithms that are in use together with the anomaly detection and contextual information will result in the improved and precise identification of cyberattacks as well as their predictability being enabled. This is an illustration of a highly advanced proactive detection device, e.g., zeroday vulnerabilities, APT, etc., and thus, fortifying the security posture. 

It has a proactive capability to engage with the attackers, where it simulates real-world scenarios and reacts towards their tactics. This way of proactive action thwarts cyber threats before they become threatening to the core systems. With dynamic deception strategy, the threat actors are never left un-guided, hence are not able to compromise real assets, thus creating time for implementing additional security mechanisms. 

#### _3.6.5. Comprehensive threat intelligence_ 

It collects actionable intelligence about the behaviours of attackers including the TTPs of the attackers. This intelligence will be used in continuous improvement loops which allow a cybersecurity team to improve its defenses better. Since the framework will know the motives and tactics behind the attacks of attackers, it predicts attack vectors for times to come and alter them, creating a security ecosystem which is feedback-driven. 

Overall, this paper proposed a groundbreaking approach to cybersecurity named ASD-TGXAI based on the integration of dynamic honeypots with AI-driven deception and explainable machine learning. This was developed to combat attacks such as zero-day exploits and polymorphic malware. ASREF was designed in such a manner that it modifies its configurations dynamically in real time according to the attacker's behaviour for proactive mitigation of threats. This is a combination of Swarm Intelligence, Reinforcement Learning, and Differential Evolution for the optimization of resources and deception effectiveness. TGXAINet incorporates Transformers, GNN, and XAI to brighten up the threat prediction with the help of the transparency that is added. The system increases the capability of the device, lowers the false positives, and produces the actionable intelligence, thus, making a significant change in the security of the cyberspace by the very mechanism of the cybersecurity going from reactive to proactive, context-aware threat neutralization. The next section presents the description of the performance evaluation of the proposed model. 

#### _3.7. Threat model and attack mitigation scope_ 

#### _3.7.1. Threat model definition_ 

We consider an intelligent and adaptive adversary operating in a networked cyber-physical environment with the goal of compromising system confidentiality, integrity, and availability, or extracting sensitive operational intelligence. The attacker is assumed to possess the following capabilities: 

1. Reconnaissance capability: The attacker can perform passive and active scanning, fingerprinting services, probing ports, and analyzing traffic patterns to infer system behavior. 

2. Interaction capability: The attacker can interact with deployed services (including honeypots), generate malicious traffic, inject malformed packets, and attempt protocol abuse. 

3. Adaptation capability: The attacker can modify strategies based on observed system responses (e.g., evasion, mimicry, timing variation). 

4. Automation capability: The attacker can launch large-scale automated attacks (botnets, scripted intrusion attempts). 

5. Limited internal access: The attacker is not assumed to have privileged insider access or full system compromise at the initial stage. 

The attacker is not assumed to: 

14 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

**Table 2** 

Comparative mapping of attack types and system components. 

|Attack Type|Attacker Objective|Behavioral Signature|TGXAI-Net Detection|ASREF Mitigation|
|---|---|---|---|---|
|Port scanning<br>Credential brute force|Discover services<br>Gain access|High SYN rate, sequential probes<br>Repeated failed logins|Temporal anomaly detection<br>Sequence pattern learning|Adaptive honeypot exposure<br>Credential deception|
|Exploit probing|Find vulnerabilities|Malformed inputs, payload attempts|Feature deviation detection|Vulnerability mirroring|
|Lateral movement|Spread within network|Internal scan bursts<br>i|Graph relational modeling|Dynamic network topology<br>i|
|C2 communication|Maintain control|Periodic low-volume traffic|Transformer temporal memory|Traffic redirection|
|Evasion tactics|Avoid detection|i<br>Randomized, sparse signals|Attention-based pattern fusion|i<br>Policy adaptation|



##### **Table 3** 

Defense mapping to system components. 

|Attack Type|TGXAI-Net|ASREF|Honeypot|XAI|
|---|---|---|---|---|
|Reconnaissance|✓Temporal anomaly|✓Adaptive bait|✓Decoy services|✓Feature attribution|
|Exploitation|✓Sequence learning|✓Policy adjustment|✓Vulnerable decoys|✓Root cause|
|Lateral movement|✓Graph relations|—|✓Credential traps|✓Path explanation|
|C2 communication<br>i|✓Pattern detection|—|✓Sinkholes<br>i|✓Flow attribution|
|Data exfiltration|✓Temporal drift|—|✓Fake sensitive files|✓Volume/source|
|Evasion|✓Robust fusion|✓Exploration|✓Dynamic behavior|✓Transparency|
|Insider threats|✓Behavioral modeling|✓Risk-aware tuning|✓Activity traps|✓Analyst insight|



**Table 4** 

Comparative analysis with existing systems. 

|System|Recon|Exploit|Lateral|C2|Exfil|Evasion|XAI|Adaptive Deception|
|---|---|---|---|---|---|---|---|---|
|Signature-based IDS|✓|✓|⨯|⨯|⨯|⨯|⨯|⨯|
|<br>ML IDS (CNN/LSTM)|✓|✓|⨯|⨯|⨯|Δ|⨯|⨯|
|Graph IDS|✓|✓|✓|⨯|⨯|Δ|⨯|⨯|
|Honeypot only|Δ|Δ|⨯|⨯|⨯|⨯|⨯|✓|
|Proposed Framework|✓|✓|✓|✓|✓|✓|✓|✓|



✓ Supported Δ Partially supported ⨯ Not supported. 

- control the core defense infrastructure, 

- bypass cryptographic protections without computational cost, 

- or physically compromise hardware components. 

The proposed framework primarily focuses on external, semiadaptive, and automated attackers, rather than fully privileged insider threats or nation-state adversaries. The comparative mapping of proposed model is shown in Tables 2–4, respectively. 

#### _3.7.2. Attack types considered_ 

dynamically according to the observance of the attacking patterns, thus making the deception more effective while reducing the risk and operational cost at the same time. 

Furthermore, the use of explainability comes as a support allowing security analysts to comprehend the decisions made by the model which in turn enhances trust, auditability, and regulatory compliance. It is this comprehensive detection, deception, adaptation, and explanation integration that makes the framework capable of handling the technical and human-centered aspects of cyber defense that are usually overlooked by the existing systems. 

The system mitigates the following categories of attacks: 

#### _3.7.3. Mitigation mechanisms_ 

1. Reconnaissance Attacks 

2. (e.g., port scanning, service enumeration, banner grabbing) 

The suggested framework reduces these threats using the following mechanisms: 

3. Credential-Based Attacks 

4. (e.g., brute-force login, dictionary attacks, credential stuffing) 

5. Malware and Exploit Delivery 

6. (e.g., payload injection, exploit probing, shellcode delivery) 

7. Lateral Movement and Pivoting 

8. (e.g., SMB probing, internal scanning, privilege escalation attempts) 

9. Command-and-Control (C2) Communication Attempts 

10. (e.g., beaconing, periodic callbacks, encrypted covert channels) 

11. Adversarial Evasion Behavior 

12. (e.g., low-and-slow attacks, traffic mimicry, timing obfuscation) 

The proposed framework stands out from conventional intrusion detection systems that mainly emphasize classification by applying a behavioral, relational, and adaptive threat modeling approach. TGXAINet not only captures the characteristics of the attacks over time, but also their structural paths, thus allowing an early warning of such coordinated multi-stage attacks as lateral movement and C2 communication. ASREF, in turn, strategically places and configures the honeypots 

- Timestamp learning (Transformer): It finds short and long-term dependencies in the behavior of attackers and underlines detection of very slow or stealthy attacks. 

- Graph representation (GNN): It detects anomalies in the relations and lateral movements by analyzing the communication structure. 

- Interpretability (XAI): It delivers explanations for threat predictions that are understandable to humans and hence, helps in forensic analysis and builds trust. 

- Adaptive honeypot optimization (ASREF): It reshapes the deception area very thoughtfully in order to trap, delay, and confuse the attackers all the while using minimum resources. 

The explicit threat model makes it clear that the proposed framework is not for pure signature-based or vulnerability-specific attacks but for behavioral- and interaction-driven networks-observable cyber threats. The proposed TransGraph-XAI Fusion Network (TGXAI-Net) is different from traditional intrusion detection systems that use static rules or single traffic features in that it takes advantage of both temporal and 

15 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

structural learning to identify changing attacker strategies and relational propagation patterns. Moreover, the Adaptive Swarm-Reinforce Evolutionary Framework (ASREF) guarantees that the deception environment is continually evolving in line with the attacker's behavior, thus creating a moving target defense. This combination makes it possible for the system to not just detect threats but also take the initiative in steering the behavior of the attackers, which in turn leads to an increase in the cost of an attack, a decrease in the probability of a successful attack, and thus an improvement in the overall cyber resilience. 

#### _3.8. Deployment and SOC integration considerations_ 

#### A. Real-World deployment architecture 

This framework aims to have a modular deployment in enterprise and critical-infrastructure settings. It can be integrated with the alreadyexisting security operations center (SOC) without the need to replace the core components. The system can be accepted as a layered analytics and deception service that would be an interface to: 

- Network sensors (IDS/IPS, NetFlow, packet brokers), 

- Endpoint Detection and Response (EDR) systems, 

- SIEM/SOAR platforms, 

**Table 6** 

Comparative analysis. 

|Feature|Traditional|ML-based|Proposed|
|---|---|---|---|
||SOC|SOC|Framework|
|Signature detection|✓|✓|✓|
|Behavior modeling|⨯|✓|✓|
|Attack progression|⨯|⨯|✓|
|inference||||
|Adaptive deception|⨯|⨯|✓|
|Explainable alerts|⨯|Δ|✓|
|Automated adaptation|⨯|Δ|✓|



✓ Supported Δ Partially supported ⨯ Not supported. 

The framework from a deployment viewpoint is non-disruptive and interoperable, working as an overlay rather than a replacement for existing SOC tools. It does not only add intelligence and adaptation to existing SIEM/SOAR pipelines but also enhance their functionality instead of duplicating it. The system, despite being more complex and integrated, has a modular architecture that allows it to be deployed incrementally, for instance, starting out with passive monitoring and slowly allowing adaptive response and deception as the organization matures. Therefore, the entire framework can be considered suitable not only for high-security environments but also for progressive adoption in enterprise SOCs. 

- Deception technologies and honeypot infrastructures. 

#### **4. Results and discussion** 

#### **Deployment Layers** 

1. Data Ingestion Layer: It gathers the logs, flows, alerts, and event sequences from IDS, firewalls, EDR, and SIEM. 

2. Analysis Layer (TGXAI-Net): It does temporal-structural modeling and threat inference. 

3. Adaptation Layer (ASREF): It adjusts honeypot strategies and defensive responses dynamically. 

4. Explainability and Visualization Layer: It offers interpretable alerts and analyst dashboards. 

5. Response Orchestration Layer: It interacts with SOAR platforms for automated or semi-automated mitigation. 

The deployment of the system can be centrally carried out or through a hybrid edge-cloud configuration, where the edge sensor carries out the initial feature extraction and the high-level inference takes place. The SOC integration workflow and comparative analysis are depicted in Tables 5 and 6, respectively. 

While traditional SOC pipelines mainly deal with alert aggregation and signature based detection, the new framework comes in with behavioral inference, adaptive deception, and explainability as quite the operational capabilities. TGXAI-Net not only increases situational awareness but also creates a model of attack progression and intent which lets the analysts rank the risks of threats and decide the order of alerts based on the predicted risk rather than just the alerts. ASREF makes it possible to dynamically change the location of the deception assets reconfiguring the whole defense from reactive to proactive and adaptive. The explainability module guarantees transparency which is important for operational adoption because it helps analysts understand and trust model decisions. 

**Table 5** 

SOC integration workflow. 

|Step|SOC Component|Integration Action|
|---|---|---|
|1|IDS/EDR|Export alerts and telemetry|
|2|SIEM|Correlate events into sequences|
|3|TGXAI-Net|Infer threat intent and progression<br>i|
|4|ASREF|Adapt honeypot configuration|
|5|SOAR|i<br>Trigger response or analyst ticket|
|6|XAI|Explain detection and response|



The results suggest that the model provides excellent cybersecurity by improving the detection of threats, decreasing the number of false positives and negatives, and allowing for the quicker elimination of threats. The results make it clear that the model is able to fortify the system against intrusions in a very effective manner by improving threat detection, reducing the false positive and negative rates, and speeding up the threat neutralization process. The framework, therefore, is claimed to be a very big step forward in terms of the adaptability, scalability, and efficiency of resource use compared to the current methods, the capability and novelty of the framework in handling the emerging cyber threats being the main reason. The proposed model is first connected to other existing strategies such as the Dynamic Game Model (DGM) [16], AI-Based Security Framework (AI-BSF) [18], AIBased Intrusion Detection System (AI-IDS) [7], and BERT [20]. 

#### _4.1. Experimental setup_ 

- (i) Development tool 

The tool used is Python, which was primarily applied for the development and implementation of the framework. 

- (ii) Dataset 

The dataset used here is the one from Dionaea Honeypot consisting of a total number of 27,574 connections within a month. 

- (iii) Libraries in Python 

Used for the training and evaluation are TensorFlow, Scikit-learn, and PyTorch. 

- (iv) Hardware Specifications 

- **Processor:** Intel Core i9 (10th Gen), 3.7 GHz. 

- **RAM:** 32 GB DDR4. 

- **GPU:** NVIDIA GeForce RTX 3080 (10 GB GDDR6X). 

- **Storage:** 1 TB NVMe SSD. 

16 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

#### _4.2. Database analysis_ 

The dataset gathered from the Dionaea Honeypot was rich with detailed logs that captured various aspects of the potential cyberattacks. These logs included information such as the connection protocols, source/destination IPs, timestamps, and types of activities. Noise removal techniques helped in cleaning the dataset by removing redundant entries, normalization was used for ensuring consistency between categorical and numerical features, and label encoding was applied for consistency. To tackle the problem of imbalanced classes, synthetic data augmentation was employed, which significantly enhanced the model's capability to identify rare attack patterns. The statistical analysis revealed that the attacks were varied in their methods, therefore, it helped in the decision of which deception strategies to use. The dataset became a strong foundation for the training of the machine learning models that were designed to ensure the detection of threats and the execution of response in the honeypot system. 

Fig. 8 depicts the threat detection accuracy of the proposed model that has been compared with other existing techniques such as DGM, AIBSF, AI-IDS, and BERT. The threat detection accuracy of the proposed model is 0.98, while the threat detection accuracies of the DGM, AI-BSF, AI-IDS, and BERT are 0.85, 0.88, 0.92, and 0.96, respectively. A significant enhancement can be seen in the proposed model. The proposed model, by far, is the major factor that has led to the accuracy improvement of the threat detection process, thus making the identification of the threats more reliable and effective. This, in turn, allows for the precise and timely deflection of such threats that results in stronger cybersecurity and fewer security breaches. 

Fig. 9 presents the comparison of the FPR of the proposed model with that of other state-of-the-art methods, which include DGM, AI-BSF, AIIDS, and BERT. FPR of the proposed model is 0.02, whereas FPRs of DGM, AI-BSF, AI-IDS, and BERT are 0.08, 0.06, 0.04, and 0.03, respectively. The proposed architecture constitutes a considerable upgrade. Such a way notably lowers the value of FPR, i.e., significantly improves the quality of the reduction of mistaken threat classifications, thus resulting in a more accurate level of threat detection with fewer false alarms at the maximum efficiency of a cybersecurity system. 

The false negative rate (FNR) of the novel architecture is illustrated 





**Fig. 9.** FPR of the proposed model. 



**Fig. 10.** FNR of the proposed model. 

in Fig. 10 in comparison to the same of other methods like DGM, AI-BSF, AI-IDS, and BERT. The FNR of the proposed model is 0.02, while those of DGM, AI-BSF, AI-IDS, and BERT are 0.12, 0.1, 0.08, and 0.04 respectively. It shows a significant leap forward for this design. The false negative rate has been dramatically reduced by the proposed model. As a result, its ability to identify threats correctly is enhanced. Hence, more accurate detection, less missed threats, and an overall stronger cybersecurity system will be the outcome. 

Fig. 11 compares the threat neutralisation time of the proposed framework with the current methods such as DGM, AI-BSF, AI-IDS, and 

**Fig. 8.** Threat detection accuracy of the proposed model. 

17 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 



**Fig. 11.** Threat neutralization time of the proposed model. 



**Fig. 12.** Adaptability score of the proposed model. 

BERT. For the proposed approach, the threat neutralisation time is 200 m/s whereas for DGM, AI-BSF, AI-IDS, and BERT, it is 500 m/s, 450 m/s, 300 m/s, and 250 m/s, respectively. This is a novel structure. The proposed model considerably reduces the time for threat neutralization, hence enhancing the response capability of the system to threats. This discovery leads to a faster mitigation of threats, which improves the efficiency and responsiveness of the cybersecurity framework. 

Fig. 12 compares the adaptability score of the proposed framework with other existing techniques-DGM, AI-BSF, AI-IDS, and BERT. Here, the adaptability score of the proposed approach is 10%. DGM, AI-BSF, 



**Fig. 13.** Resource utilization efficiency of the proposed model. 

AI-IDS, and BERT have an adaptability score of 8%, 7%, 6%, and 5%, respectively. This kind of organization is a new concept. The proposed model helps to enhance its adaptability level to better match evolving threats with dynamic environments, thereby improving model capability to attain high detection accuracy in varying circumstances, thus adding more robust and flexible performance aspects to cybersecurity performance. 

Fig. 13 represents the resource utilisation efficiency of the proposed framework compared with the existing techniques. In this scenario, the proposed method possesses a resource utilisation efficiency of 0.90, and DGM, AI-BSF, AI-IDS, and BERT has resource utilisation efficiency of 



**Fig. 14.** Deception effectiveness of the proposed model. 

18 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

0.70, 0.75, 0.80, and 0.85, respectively. Such type of organisation is a new concept. The proposed model ensures significant improvement in the efficiency of resource utilization while maintaining the optimization of the system performance without losing any accuracy. Such innovation ensures proper use of resources to enhance the detection of threats while having efficient operation for a more sustainable and high-performance cybersecurity framework. 

Fig. 14 depicts the effectiveness of deception based on the proposed structure compared with the existing techniques, DGM, AI-BSF, AI-IDS, and BERT. For this case, the deception effectiveness value of the proposed approach is 0.95 compared to 0.65, 0.70, 0.80, and 0.85 deception effectiveness values for DGM, AI-BSF, AI-IDS, and BERT respectively. The concept of such an organization is a new concept. Such an organization improves the deception effectiveness significantly so that its deception ability and confusability toward adversaries increase. This advancement in cybersecurity enhances more robust defenses against attackers, reducing the likelihood of successful breaches and improving overall system resilience. 

With regards to data gathering completeness, Fig. 15 represents the proposed framework compared to existing methodologies DGM, AI-BSF, AI-IDS, and BERT. For this case, the value for data gathering completeness of the proposed method is 0.95, while values for DGM, AIBSF, AI-IDS, and BERT are 0.60, 0.70, 0.75, and 0.85 respectively. The design is an invention. Data completeness will be significantly improved within the proposed model, ensuring highly comprehensive and accurate data acquisition regarding threats. This is necessarily strengthening the foundation basis upon which detection takes place, making the system more decisional and enhancing overall effectiveness in cybersecurity. 

Fig. 16 presents the scalability comparison of the proposed model with the DGM, AI-BSF, AI-IDS, and BERT approaches. Scalability in the proposed model is 9 MB/sec, wherein DGM, AI-BSF, AI-IDS, and BERT hold a value of 5 MB/sec, 6 MB/sec, 7 MB/sec, and 8 MB/sec, respectively. It is an invention. Scalability significantly improves in the proposed model as compared to others, providing faster processing and handling capabilities through larger volumes of data. This improvement brings in scalability that supports the system in managing high demands properly, thus maintaining even robust performance with increasing 



**Fig. 15.** Data collection completeness of the proposed model. 



**Fig. 16.** Scalability of the proposed model. 



**Fig. 17.** System downtime of the proposed model. 

scale operations. 

The comparison of the proposed model and DGM, AI-BSF, AI-IDS, and BERT techniques is depicted in Fig. 17 for system downtime. The proposed model's system downtime is 4 h per year, whereas DGM, AIBSF, AI-IDS, and BERT have values of 12 h per year, 10 h per year, 8 h per year, and 6 h per year, respectively. It is a creation. The proposed model significantly lowers the downtime of the system, thereby making the system more reliable and available. The above improvement is indicative of the system running more continuously, thus disruptions are minimised, and performance is maintained at a stable level, which is vital for the implementation of efficient and effective cybersecurity 

19 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

operations. 

As per the experimental findings, ASD-TGXAI is capable of achieving a threat detection precision of 98.0% while the incidences of false positives and false negatives are concurrently decreased to 0.02. In consequence, ASD-TGXAI is far superior to other deception-based security frameworks. The dynamic deception technique can lead the attacker to the trap at a quicker pace and shorten the average response time to new threats, while the performance test under various network conditions indicates the steadiness and trustworthiness of the framework. The study results point out that ASD-TGXAI is not only capable of detecting malicious activities with high accuracy, but also can smartly and safely interact with the attacker, thus network resilience will not be compromised. 

The proposed model exceeds the current methods in many substantial aspects. Hence, it greatly enhances cybersecurity capabilities. The model is able to raise the precision of threat detection while at the same time reducing the number of false positives and false negatives. Moreover, it takes less time for the threats to be neutralized, so correspondingly, the responses are quicker. Besides adaptability, the efficient use of resources and the effectiveness of deception methods are some of the factors that contribute to system performance in a dynamic environment. This will help collect data more entirely and scalable, which improves threat detection for bigger volumes of data in an efficient manner. Besides, its system is such that it shortens the downtime period and increases the reliability and availability of the system. These new features, in general, help to bring a stronger, more efficient, and more resilient framework to cybersecurity, thus the proposed model can be considered a pioneering innovation in terms of modern threats for mitigation and protection. 

#### _4.3. Analysis on the robustness of the proposed ASD-TGXAI model_ 

To demonstrate that the proposed ASD-TGXAI model is reliable beyond just one environment, we conducted more comparative experiments for different optimization methods (GA, PSO, and SA) and datasets from various regions (financial sector and Industrial IoT network). Consistently, the model was better than any other method that we used for optimization, as the Table 7 reveals. The ASD-TGXAI was able to detect a threat with an accuracy of 98%, which is more than the cases of GA (94%), PSO (92%), and Simulated Annealing (90%) put together. The false positive rate was similarly lowered to 0.02, thus indicating that the model was very sensitive and accurate in distinguishing legitimate traffic from attack patterns. Regarding the framework's agility in carrying out the tasks, it was able to neutralize the threat in the shortest time (200 ms) as compared to other methods, which were between 350–500 ms. The model was subjected to testing with datasets taken from two diverse locations and still managed to do a great job by achieving 96% accuracy with the financial sector's dataset and 93% accuracy with the industrial IoT environment. These results confirm that the ASD-TGXAI model is not only suitable for various cybersecurity scenarios but also irrespective of the dataset or the optimization routine used. Validation in such diverse environments indicates that the proposed model's performance is not only consistent but also scalable and 

**Table 8** 

Sensitivity analysis of the proposed model. 

|Sensitivity<br>Parameter<br>Analyzed|Scenario/<br>Variation<br>Applied|Impact on<br>Detection<br>Accuracy<br>(%)|Impact on<br>FPR<br>(False<br>Positive<br>Rate)|Observations|
|---|---|---|---|---|
|**Threat**|Low→|98→97→|0.02→|System|
|**Intensity**<br>**(Number of**<br>**concurrent**<br>**attacks)**|Medium→<br>High|96|0.03→<br>0.04|maintains<br>stability with<br>only a minor<br>drop under high<br>attack load.|
|**Polymorphic**<br>**Malware**|Low (Static<br>malware)|98|0.02|TGXAI-Net easily<br>classifies|
|**Variability**<br>(Mutation<br>frequency)||||repeatable<br>signatures.|
||Medium<br>(Obfuscated<br>payloads)|97|0.03|ASREF adapts<br>deception rules<br>automatically.|
||High (Fast<br>evolving)|95|0.04|Transformer+<br>GNN maintains<br>advantage over<br>baseline IDS.|
|**Resource**|100%→75%|98→96→|0.02→|System|
|**Availability**|→50%|94|0.03→|gracefully|
|(CPU/GPU<br>throttling)|utilization||0.05|degrades without<br>failure.|
|**False Attack**|No noise→|98→97→|0.02→|Shows|
|**Injection**<br>**(Noise**<br>**tolerance)**|Moderate→<br>High|96|0.03→<br>0.04|robustness in<br>noisy network<br>traffic.|



adaptable, hence making it a dependable universal cyber defense solution. 

#### _4.4. Sensitivity analysis_ 

In order to assess robustness, a comprehensive sensitivity analysis was conducted, which involved the variation of key factors that influenced the situation, such as the intensity of the threat, the mutability of the malware, the availability of resources, and the noise level in the incoming traffic. The results (Table 8) indicate that the ASD-TGXAI model keeps its performance at a consistently high level, although there are changes in environmental and attack conditions. During a simulation of a high-frequency polymorphic malware, the detection accuracy was only lowered from 98% to 95%, thus proving that the Transformer–GNN fusion capability is efficiently to capture temporal and relational threat features even when signatures are evolving. Under a scenario with reduced computational resources (50% GPU availability), the model was still able to detect correctly in 94% of the cases, thus showing that the system has a capability for graceful degradation and a high level of operational reliability, which is an indispensable feature for the deployment of the cybersecurity of the edge or IoT in a resourceconstrained environment. Even if the network traffic was heavily polluted with noise (false alerts and dummy connections), the false 

**Table 7** 

Analysis on the robustness of the proposed model. 

|Optimization Technique/Region|Threat Detection Accuracy<br>(%)|False Positive Rate<br>(FPR)|Neutralization Time<br>(ms)|Adaptability Score<br>(%)|Resource Utilization<br>(%)|
|---|---|---|---|---|---|
|**Proposed ASD-TGXAI**(Our|**98**|**0.02**|**200**|**10**|**90**|
|Model)||||||
|Genetic Algorithm (GA)|94|0.06|350|6|78|
|Particle Swarm Optimization<br>(PSO)|92|0.07|420|5|75|
|Simulated Annealing (SA)|90|0.08|500|4|72|
|Region A (Financial Sector Data)|96|0.03|230|8|85|
|Region B (Industrial IoT Data)|93|0.05|310|6|80|



20 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

positives were at a very low level of 0.04, thus verifying the stability and resilience of the deception-based learning mechanism. These findings are in line with the fact that the system under consideration is not only robust in the case of a normal scenario, but it is also capable of withstanding stresses, volatility, and uncertainty. 

#### _4.5. Analysis on the efficiency of the proposed ASD-TGXAI framework_ 

The efficiency of the ASD-TGXAI framework was put to test through an extensive benchmarking exercise as compared to the three most advanced dynamic cybersecurity frameworks of the last decade: Reinforcement-Learning Honeypot Framework (RL-Honeynet), GraphBased Intrusion Detection (GNN-IDS), and Transformer-Based Threat Prediction System (Trans-IDS). The comparison (shown in Table 9) was made on the basis of uniformly defined performance metrics that are Detection Accuracy, False Positive Rate (FPR), False Negative Rate (FNR), Threat Neutralization Time, Resource Utilization, and Deception Efficiency, which are also recommended in cybersecurity research, thereby, making the evaluation objective and comparable. While the competing models were confined to either static deception or linear threat prediction, ASD-TGXAI took advantage of Swarm Intelligence–based optimization, dynamic honeypot adaptation, and Explainable AI integration, thus, it could follow attacker behavior in real time and change defenses accordingly. The experimental results revealed that ASD-TGXAI was able not only to record the highest detection accuracy (98%) but also to obtain the lowest false positive and false negative rates (0.02 each), thus, indicating the strong reliability of the system. Besides, the average threat neutralization time has been shortened by ASD-TGXAI up to 200 ms, thus, outstripping other existing frameworks, which were still in need of significantly longer decisionmaking cycles. The present results are consistent with the view that the ASD-TGXAI framework is capable of delivering better performance through proactive deception, autonomous adaptation, and transparent XAI-driven decision-making. 

The performance assessment confirms that ASD-TGXAI outperforms existing models due to its self-adaptive deception strategy, multi-modal AI fusion, and XAI-based decision transparency, making it more efficient, reliable, and scalable in real-time cyber environments. 

#### _4.6. Analysis on optimal performance of the REF (Reinforcement_ – _Evolutionary_ – _Swarm Fusion) optimizer_ 

In order to maximize the performance of the REF (Reinforcement–Evolutionary–Swarm Fusion) optimizer within the ASD-TGXAI setup, a hybrid grid–random search technique was used to carry out a systematic parameter tuning strategy. At first, parameter intervals for Swarm Intelligence (population size, inertia weight, cognitive/social coefficients), Reinforcement Learning (learning rate, exploration–exploitation decay, discount factor), and Differential Evolution (mutation factor and crossover probability) were determined by referring to benchmark standards in the literature. Next, an automated sensitivity analysis was performed for each configuration with 10 experimental runs, and the influence of each parameter set on the threeperformance metrics (shown in Table 10): threat detection accuracy, false positive rate, and response time was measured. The results pointed 

**Table 10** 

Parameter tuning table. 

|Optimization|Parameter|Range|Final|Impact Observed|
|---|---|---|---|---|
|Layer||Tested|Optimal<br>Value||
|Swarm|Population|20–100|50|Higher sizes|
|Intelligence|Size|||increased|
|(PSO)||||convergence<br>time with no<br>accuracy gain|
||Inertia|0.4–0.9|0.72|Stable|
||Weight (w)|||convergence,<br>avoids|
|||||premature<br>stagnation|
||Cognitive/|1.0–2.5|c1= 1.4,|Balanced global|
||Social<br>i||c2= 1.7|vs. local|
||Coefficients<br>(c1, c2)|||exploration|
|Differential|Mutation|0.3–0.9|0.6|Lower values|
|Evolution<br>(DE)|Factor (F)|||slowed learning,<br>higher reduced<br>stability|
||Crossover|0.2–0.9|0.75|Improved|
||Probability<br>(CR)|||exploitation of<br>refined solutions|
|Reinforcement|Learning Rate|0.1–0.5|0.3|Optimal balance|
|Learning (Q-|(α)|||between new|
|Learning)||||and old<br>knowledge|
||Discount|0.5–0.99|0.92|Strong long-term|
||Factor (γ)|||threat avoidance|
||Exploration|0.85–0.995|0.97|Faster|
||Decay|||convergence to|
||(ε-decay)|||optimal policy|



out that ASD-TGXAI had strong robustness characteristics as its performance fluctuation was only ±1.8% around parameter changes, thus the fused optimizer was shown to be quite insensitive to small tuning deviations. The final parameters were chosen based on the criteria of maximizing global convergence speed and minimizing local stagnation, thereby proving that the integration of Swarm Intelligence (exploration), Differential Evolution (diversification), and Reinforcement Learning (exploitation/adaptation) led to the optimizer being stable under fluctuating situations of attack patterns. 

#### **Sensitivity Outcome Summary** 

- Accuracy varied only by ±1.8%, confirming robustness. 

- False positive rate increased slightly only when: 

- PSO population size _<_ 30 (underexploration) 

- DE mutation _>_ 0.8 (too random) 

- Reinforcement learning tuning had the highest impact on convergence speed. 

The tuning and sensitivity experiments prove that REF is not dependent on any single hyperparameter to perform well. By combining exploration (Swarm Intelligence), diversification (Differential 

**Table 9** 

Comparison table – efficiency analysis of the proposed model. 

|Framework/Approach|Detection<br>Accuracy|FPR|FNR|Avg. Threat Neutralization<br>Time|Deception/Adaptability<br>Score|Resource Utilization<br>Efficiency|
|---|---|---|---|---|---|---|
|RL-Honeynet (Reinforcement-Learning|91%|0.10|0.09|820 ms|65%|72%|
|Honeypots)|||||||
|Graph-Based IDS (GNN-IDS)|93%|0.07|0.06|610 ms|72%|78%|
|Transformer-Based IDS (Trans-IDS)|95%|0.05|0.04|430 ms|80%|85%|
|Proposed ASD-TGXAI Framework|98%|0.02|0.02|200 ms|95%|90%|



21 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri_ 

Evolution), and exploitation (Reinforcement Learning), the optimizer converges faster and maintains consistent threat detection performance even under dynamic cyber-attack variations. 

#### _4.7. Comprehensive assessment_ – _balancing predictive accuracy and interpretability_ 

Balancing predictive accuracy and interpretability in TGXAI-Net was achieved through a staged architecture that assigns dedicated roles to each module. The Transformer component first performs deep temporal–context modeling to identify sequential attack patterns, such as lateral movements characteristic of Advanced Persistent Threats (APTs). The flow chart of the model is shown in Fig. 18 and the comparative study is shown in Table 11. The output embeddings are subsequently fed into the Graph Neural Network (GNN) which produces an attack—interaction graph for examining all kinds of relationships—nodes, user activities, IP transitions, and system processes. At last, Explainable AI (XAI) is utilized after the prediction through SHAP and Layer-wise Relevance Propagation (LRP), revealing what features, nodes, edges, or temporal patterns were the ones that influenced the decision. Rather than pushing XAI into the learning pipeline (which might lead to lower accuracy), interpretability is produced after the prediction to maintain the model's fidelity. In testing, TGXAI-Net maintained 98% detection rates for APT scenarios while still being able to present justifications in a manner that is easily understood by humans, with security analysts able to examine the list of features and interactions among the nodes according to their contribution rankings. This method guarantees that TGXAI-Net continues to be very predictive while at the same time providing transparency and auditability—essential conditions for cybersecurity environments. 

**Table 11** 

Algorithmic balance strategy. 

|Component|Why It Improves<br>Accuracy|Why It Improves<br>Interpretability|
|---|---|---|
|Transformer (Temporal<br>Reasoning)|Detects hidden attack<br>patterns, lateral<br>movement, time-series<br>anomalies|Attention weights identify<br>which timestamps/packets<br>contributed most|
|Graph Neural Network<br>(Relational<br>Understanding)|Maps attack propagation<br>paths across hosts|Visual node–edge graph<br>shows how the attack<br>spreads|
|XAI (SHAP**þ**LRP)|No impact on training<br>accuracy (used post-<br>prediction)|Produces ranked feature<br>and node importance<br>explanations|



**Table 12** 

Performance comparison. 

|Framework|Accuracy|Interpretability|APT Detection<br>Capability|
|---|---|---|---|
|Traditional DL|87–92%|No Black box|Weak (misses slow/|
|(CNN/LSTM)|||hidden threats)|
|Transformer only|94%|Partial|Detects temporal<br>anomalies|
|TGXAI-Net (ours)|98%|Full (XAI+ Graph+<br>Attention)|Strong (detects stealth<br>and lateral movements)|



initiated the attack and why. 

As per Table 12, the Interpretability is achieved without sacrificing accuracy, because XAI is applied at the decision stage—not during training—allowing TGXAI-Net to remain a high-performance predictive model while still producing transparent, explainable threat insights. 

Decision Transparency Example (APT Attack Scenario). 

- TGXAI-Net flagged an APT attack because: 

- Node Server-02 suddenly initiated outbound authentication attempts, 

- Access pattern deviated from normal privilege escalation sequence, 

- Transformer attention focused on abnormal time intervals, 

- SHAP highlighted credential harvesting and lateral movement features. 

Security analysts were presented a visualization showing which node 

#### _4.8. Continuous adaptability testing of dynamic honeypot network_ 

To confirm the ongoing versatility of the Dynamic Honeypot Network, a two-stage testing strategy was put in place: (1) controlled attack simulations, and (2) live attacker engagement on a monitored and isolated cloud subnet. The first stage involved high-fidelity cyber-range simulations that were performed with the help of Metasploit, Kali-based APT scripts, and polymorphic malware generators in order to assess how rapidly the honeypots change their deception surface in response to repeated reconnaissance or exploit attempts. In the second stage, the honeypot subnet was deliberately made accessible to the Internet 



**Fig. 18.** Flowchart describing the TGXAI workflow for APT attack. 

22 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

through passive advertisement in open malware forums and Shodan indexing in order to lure real-world attackers. Throughout both stages, the Adaptive Swarm-Reinforce Evolutionary Framework (ASREF) was constantly monitoring the behavioral pattern of the attackers and thus, changing the honeypot (OS fingerprint, services, banners, port exposure) accordingly in the real-time. The adaptability score was calculated based on three dynamic behavior metrics: 

- (i) reaction latency (time to change deception strategy), 

- (ii) policy reinforcement success, and 

(iii) attacker engagement duration. 

The ASD-TGXAI honeypot framework is shown by the above results (Table 13) to be efficient in its deception performance to a large extent both in the simulations and in the uncontrolled real attacker scenarios. Even though the real attacker interactions led to more variability (for instance, unpredictable attack timing, payload diversity), the honeypot kept an adaptation time of less than 250 ms, thus demonstrating its capability to change its service profile prior to the attackers leaving. The extension of the engagement time in real-world scenarios suggests that the attackers considered the honeypot as a real and exploitative system. The slight drop in performance during real attacks (96% → 92%) is put down to more complex and evasive behaviors; however, the system is always in a state of self-optimization through ASREF feedback and XAIbased threat attribution, thereby confirming its high level of robustness and adaptability. The dynamic honeypot is thus able to demonstrate dependable proactive adaptability and real-time deception effectiveness, ascertained, on the one hand, by synthetic attackers and, on the other hand, by genuine attackers. 

#### _4.9. Evaluation of multi-layered deception strategies_ 

The multi-layered deception strategies—simulated vulnerabilities, fabricated data assets, and fake service exposure—were exemplary in terms of the metrics related to attacker engagement and deception performance indicating their success. These strategies were applied to three deception layers: (i) surface-level deception (open ports, banners), (ii) service emulation (database/API mimicry), and (iii) deep deception (fake credentials, honey-files, and decoy data exfiltration traces). The investigation mainly focused on the period of time that attackers were interacting with the system before they detected the illusion, whether the attacker attempted to exploit, and whether there was an attempt of exfiltration or lateral movement. 

**Table 14** 

Quantitative evaluation of multi-layered deception effectiveness. 

|Metric (Indicator)|Measurement Definition|Result<br>(%)/Value|
|---|---|---|
|Attacker Interaction Time<br>(AIT)|Avg. time attacker stays engaged<br>before disengaging|19.3 sec|
|Deception Belief Rate<br>(DBR)|<br>% of attackers attempting exploit<br>execution on fake vulnerabilities|93%|
|Failed Exploitation Rate<br>(FER)|% of exploitation attempts trapped<br>within honeypot layers|97%|
|Lateral Movement|<br>% of attackers attempting to pivot|89%|
|Attempt Rate (LMAR)|deeper into fake network<br>i||
|<br>Fake Data Access Rate<br>(FDAR)|<br>% of attackers accessing honey-files<br>or false data repositories|92%|
|Detection-to-|<br>Avg. time from detection to|200 ms|
|Neutralization Time|neutralization|(measured)|



- Failed Exploitation Rate (FER): the percentage of attacks that were confined to the honeypot and did not proceed to real assets. 

- Lateral Movement Attempt Rate (LMAR): shows how convincing the fake environment was. 

These metrics were perpetually tracked by the Adaptive Swarm Reinforce Evolutionary Framework (ASREF), which facilitated the dynamic adjustment of deception components (vulnerability severity, service banners, dummy credentials). 

The findings in Table 14, demonstrate that the multi-layer trick strategy was able to make the attackers believe that the honeypot system had vulnerable assets. The very high Deception Belief Rate of 93% shows that the attackers considered the simulated services as real, a Failed Exploitation Rate of 97% also confirms that nearly all the harmful actions were in the deception layer, i.e., they did not reach the real infrastructure. The extended average attacker interaction time (19.3 s) shows that the attackers were behaviorally engaged and therefore, they kept exploring the deception environment instead of leaving the attack at an early stage, which is the main way of confirming the effectiveness of deception. The bar chart showing the comparison of multi-layer deception metrics is shown in Fig. 19. 

Finally, the Lateral Movement Attempt Rate (89%) confirms that attackers perceived the honeypot as part of a real distributed system, validating the authenticity of the simulated topology and fake credentials. Overall, these quantitative observations confirm that the ASDTGXAI framework not only diverts attackers but also sustains deception long enough to extract behavioral intelligence for predictive defense learning. 

Metrics to measure deception effectiveness were: 

- Attacker Interaction Time (AIT): average time attacker remained engaged. 

- Deception Belief Rate (DBR): percentage of attackers who attempted exploitation assuming the system was real. 

**Table 13** 

Adaptability evaluation of dynamic honeypot network (simulation vs. real 

attackers) **.** 

|Evaluation Parameter|Simulated Attacks<br>(Cyber Range)|Real Attackers<br>(Internet Exposed)|
|---|---|---|
|Avg. Adaptation Time (ms)|180 ms|220 ms|
|Honeypot Strategy Reinforcement<br>Success (%)|96%|92%|
|Attacker Engagement Duration<br>(avg. per session)<br>i|14.2 min|18.6 min|
|Service Reconfiguration Frequency|Dynamic (per probe)|Highly Dynamic (per<br>packet burst)|
|Percentage of Successful Deception<br>(attacker belief rate)|94%|91%|
|Data Collected Per Engagement<br>(MB/session)|420 MB||





**Fig. 19.** The comparative analysis of multi-layer deception metrics. 

23 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

**Table 15** 

Feedback loop update frequency vs. system stability. 

|Adaptation State|Update Frequency|Trigger Condition|Risk Level|Mitigation Strategy|
|---|---|---|---|---|
|Low activity/routine scanning|~30 sec|No change in threat behavior|Low|Stability-first: adjustments logged, not applied<br>immediately|
|Medium activity/suspicious<br>probing|5–8 sec|Multiple failed logins, exploratory port scans|Moderate|RL ensures adaptive yet controlled evolution<br>i|
|High activity/active<br>exploitation|500–800 ms|Zero-day signatures, lateral movement attempts<br>l|High|XAI-based justification validation+ rollback<br>checkpoint|
|Extreme anomaly/system<br>deviation|Immediate halt+<br>Reversion|Conflicting AI predictions or abnormal decision<br>oscillation|Very High|Auto-rollback to last stable behavioral checkpoint|



#### _4.10. Adaptive feedback loop and honeypot update frequency_ 

The ASD-TGXAI framework adjusts honeypot behavior dynamically using a closed feedback loop driven by three learning modules (refer Table 15): Transformer-GNN threat classification, Reinforcement Learning (RL) policy updating, and Swarm-Differential optimization of deception parameters. The honeypot adapts its visible behavior—services, vulnerabilities, banners, open ports, and data cues—based on new incoming attack patterns. The update frequency is controlled by a real-time adaptive scheduler. Instead of updating continuously (which may cause instability), the honeypot behavior is refreshed based on evaluation windows triggered by: 

- Significant shifts in attacker intent, 

- Confidence threshold drops in model predictions, 

- Detection of new or polymorphic attack signatures. 

The average update frequency is: 

- Normal traffic conditions: every 30 s 

- Active attack/anomaly recognized: every 5–8 s 

- Critical threat (APTs, lateral movement detected): sub-second microupdates (~500–800 ms) 

Initially, the dataset was examined for class imbalance, where the most frequent attack types (e.g., port scans, brute-force attempts) were the main source of samples, while zero-day exploits or APT reconnaissance appeared only a few times. To avoid the bias in the learning three complementary techniques were implemented—data augmentation for rare attacks, SMOTE-based synthetic minority oversampling, and costsensitive learning during model training. During the augmentation phase, behavior-preserving transformation rules (e.g., controlled timestamp perturbation, payload mutation) were used to synthetically expand rare attack samples. When it comes to structured numerical attributes, SMOTE created synthetic samples between the minority instances. At the same time, cost-sensitive learning penalized the misclassification of rare attacks by increasing their loss weight in the Reinforcement Learning (RL) reward matrix and in Transformer-based classification loss. While training, the model was constantly checking class-wise accuracy, thus minority classes were able to reach similar recall and precision values. These combined techniques enabled the model to learn in a balanced way without changing the inherent attack characteristics. 

Bias-free learning is critical in cybersecurity because undetected rare attacks often lead to the most severe system breaches. By integrating augmentation + SMOTE + cost-sensitive learning, the system maintains (from Table 16): 

Rapid adaptation is advantageous for deception credibility, but it can introduce risks such as: 

- Over-fitting the deception behavior (honeypot becomes too reactive and predictable) 

- Oscillating behavior (frequent changes may expose that the system is 

- artificial) 

- Behavior drift (honeypot updates become inconsistent with network realism) 

- High recall (97%) on rare attacks 

- Balanced F1-score distribution across attack classes 

- Zero overfitting symptoms, confirmed through stratified K-fold testing 

The combination of augmentation and cost-sensitive learning ensures that rare APT-style attacks are detected with the same reliability as common cyber intrusions. This guarantees that ASD-TGXAI does not merely detect frequent attacks—it learns to defend against high-impact, low-frequency threats that matter most. 

To prevent this, the framework includes: 

- Stability Guardrails: updates applied only when confidence _>_ 85% 

- Rollback Checkpoints: previous state is restored if post-update 

_4.12. Comparative baseline evaluation with existing deception and honeypot systems_ 

- anomaly is detected 

- XAI Validation: decisions are explained using SHAP to ensure logical reasoning 

To demonstrate the effectiveness of the proposed ASD-TGXAI framework, we compare it against representative baseline deception 

If the system detects that a rapid adaptation may create unrealistic behavior, the update is throttled and queued until the risk drops below threshold. 

Thus, the feedback loop allows controlled dynamic behavior—fast enough to deceive attackers but safeguarded against erratic or unintended honeypot changes. 

#### _4.11. Ensuring AI models were not biased toward frequent attacks_ 

Several data-level and algorithm-level bias mitigation strategies were implemented to make sure that the AI models in ASD-TGXAI did not exhibit bias towards that kind of attacks that occurred frequently. 

**Table 16** 

Techniques used to prevent model bias toward rare attacks. 

|Challenge|Applied Technique|Impact on Model|
|---|---|---|
|Few samples for rare/<br>advanced attacks|Data Augmentation<br>(Behavior-preserving)|Expands dataset diversity<br>without altering behavior<br>patterns|
|Class imbalance<br>i|SMOTE (Synthetic<br>Minority<br>Oversampling)|Ensures adequate<br>representation of rare attacks|
|Misclassification of rare|Cost-sensitive learning|Prioritizes correct detection|
|threats<br>i|(Weighted Loss)<br>i|of rare attacks|
|Overfitting to majority|Stratified training+K-|Ensures fair evaluation across|
|classes|fold validation|all attack categories|



24 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

**Table 17** 

Comparative evaluation with existing honeypot and deception systems. 

|Model/System|Adaptivity|Explainability|Threat Detection<br>Accuracy (%)|False Positive<br>Rate|Attacker Engagement<br>Time (ms)|Neutralization Time<br>(ms)|Resource<br>Utilization (%)|
|---|---|---|---|---|---|---|---|
|Static Honeypot (Low-<br>interaction)|No|No|78|0.15|120|650|40|
|High-Interaction<br>Honeypot|No|No|85|0.10|210|520|70|
|Rule-based Deception|Partial|No|88|0.08|240|480|75|
|System||||||||
|ML-based IDS+|Partial|No|92|0.06|260|410|80|
|Honeypot||||||||
|Adaptive Deception (non-<br>XAI)|Yes|No|95|0.04|300|320|85|
|Explainable IDS (XAI<br>only)|No|Yes|94|0.05|190|370|78|
|Proposed ASD-TGXAI|Yes|Yes|98|0.02|360|200|90|



and honeypot systems that reflect the state-of-practice and state-of-theart in cyber deception and intrusion detection. The baselines include static honeypots, rule-based deception, machine learning-based IDS, and recent adaptive deception frameworks. 

The comparative data in Table 17 without a doubt show the superiority of the suggested ASD-TGXAI framework over other deception and honeypot-based systems. Static honeypots are the ones that are used in the traditional way and display very low detection accuracy (78–85%) and, thus, very high neutralization delays due to the inability to adapt and lack of behavioral intelligence. At the same time, the rule-based and machine learning-assisted honeypots improve their detection though they still remain passive and show even more false positives due to the use of rigid thresholds and lack of contextual reasoning. Deceptive adaptive systems without being able to explain their actions manage to have the highest detection accuracy (95%) and very fast response times, but transparency issues still affect them, and that limits the ability to trust, audit, and accept by the operator. Models of explainable IDS can gain trust but do not have dynamic deception and engagement mechanisms. Nevertheless, ASD-TGXAI obtains the highest detection accuracy (98%), the lowest false positive rate (0.02), the longest engagement time with the attacker (360 ms), and the fastest neutralization time (200 ms). This is made possible by the combined application of adaptive optimization (ASREF), contextual behavioral modeling (TGXAI-Net), and explainability (XAI), which are implemented jointly. What is more, even though the use of resources is higher (90%), it indicates that the computational resources are used purposefully to obtain excellent security outcomes. To sum up, ASD-TGXAI is the only one that offers the trinity of adaptability, intelligence, and transparency, thus surpassing both static and adaptive baselines and ushering the state-of-the-art in proactive cyber deception and threat mitigation. 

#### _4.13. Ablation Study: Module-wise contribution analysis_ 

To quantify the individual contribution of each major component of the proposed ASD-TGXAI framework, we conduct an ablation study by selectively disabling or replacing core modules and measuring the impact on system performance. Specifically, we analyze the contributions of: 

(from 0.02 to 0.07) thus it is shown that the use of contextual threat modeling via Transformers and GNNs is indispensable for the timely and trustworthy threat identification. Turning off ASREF results in longer neutralization (280 ms vs. 200 ms) and lower attacker engagement (240 ms vs. 360 ms), thus making the case for adaptive optimization being the key to the quick setup of deception and the prevention of detection in real time. The removal of the fractional-order controller results in a longer response time while slightly reducing the detection accuracy, thus proving its necessity in carving out the memory of the attacker and allowing the controlling moves to be anticipatory. In short, the ablation study has shown that the superior capabilities of ASD-TGXAI come from the combined effect of its components rather than from any single module alone. 

#### _4.14. Practical feasibility: execution time, resource overhead, and latency_ 

In order to assess the practicality of the proposed ASD-TGXAI framework for real-world application, we assess its computational execution time, system resource overhead, and operational latency during realistic cyber-range workloads. The framework is compared to baseline deception and IDS systems on the same hardware (Intel Xeon 32-core CPU, 64 GB RAM, NVIDIA RTX 3090 GPU) and under similar attack loads. In exchange for significantly heightened security performance, the complete ASD-TGXAI framework incurs moderate computational overhead, as demonstrated in Table 18. The time taken on average per decision in execution is 48 ms thereby making real-time adaptation possible within sub-second operational constraints (see Table 19). 

The utilization of CPU (22%) and GPU (18%) is, however, more than that of static honeypot and rule-based IDS systems, but the overhead is accepted for the sake of the considerable decrease in response latency (200 ms vs. 420–480 ms) and detection accuracy increase mentioned earlier. Therefore, the proposed framework is able to strike a favorable balance between the costs of computation and the effectiveness of cybersecurity, showcasing that not only is ASD-TGXAI theoretically advanced, but also that it is practically feasible for deployment in the real-world cyber defense environments. 

#### **5. Conclusion** 

- TGXAI-Net (Transformer + GNN + XAI threat modeling), 

- ASREF (Adaptive Swarm-Reinforce Evolutionary optimization), 

- Fractional-Order Optimal Controller (FOC), 

- XAI explainability layer. 

The ablation study results illustrated in Table 5 provide solid evidence that each of the modules has a very important role in the performance of the ASD-TGXAI framework in general. The removal of TGXAI-Net brings about the most significant decline in detection accuracy (from 98% to 91%) and also an increase in the false positive rate 

The research introduced ASD-TGXAI, a cutting-edge cybersecurity system that is able to traverse the barriers imposed by conventional static protection measures that do not yield to such aggressive cyber threats. ASREF employs the integration of Swarm Intelligence, Reinforcement Learning, and Differential Evolution to optimize the resource allocations through dynamic honeypots powered by AI with different methods ensuring continuous adaptability and robustness. In addition, the TGXAI-Net model that combines Transformers, GNNs, and XAI not only improves the accuracy of threat prediction but also provides 

25 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

**Table 18** 

Ablation study results. 

|Configuration|TGXAI-<br>Net|ASREF|Fractional<br>Controller|XAI|Detection<br>Accuracy (%)|False Positive<br>Rate|Neutralization Time<br>(ms)|Engagement Time<br>(ms)|Resource<br>Utilization (%)|
|---|---|---|---|---|---|---|---|---|---|
|Full ASD-TGXAI<br>(Proposed)|✓|✓|✓|✓|98|0.02|200|360|90|
|Without TGXAI-Net|⨯|✓|✓|✓|91|0.07|310|210|85|
|Without ASREF|✓|⨯|✓|✓|93|0.06|280|240|80|
|Without Fractional|✓|✓|⨯|✓|94|0.05|260|260|82|
|Controller||||||||||
|Without XAI|✓|✓|✓|⨯|97|0.03|205|350|88|
|Baseline (No adaptive<br>modules)|⨯|⨯|⨯|⨯|88|0.09|420|180||



**Table 19** 

Practical feasibility evaluation. 

|System|Avg. Execution Time per Decision (ms)|CPU Overhead (%)|GPU Overhead (%)|Memory Usage (GB)|End-to-End Response Latency (ms)|
|---|---|---|---|---|---|
|Full ASD-TGXAI (Proposed)|48|22|18|9.2|200|
|Without TGXAI-Net|31|15|5|5.6|310|
|Without ASREF|36|17|12|6.3|280|
|Without Fractional Controller|34|16|11|6.1|260|
|Traditional Static Honeypot|12|8|0|2.1|480|
|Rule-based IDS+Honeypot|18|10|0|2.8|420|



transparency into the intruder’s movement. As a result, the framework transforms the landscape of cybersecurity by transitioning from reactive defenses to proactive and context-aware threat neutralization thus increasing adaptability, lowering false positives, and creating actionable intelligence. The experimental results validate the proposed model and demonstrate its capability of achieving excellent threat detection of 98% with an enormous reduction of false positives to 0.02, and false negatives to 0.02, as well as fast neutralization in 200 ms. Compared with the existing solutions, the model is 10% more flexible and 90% more resource-consuming. The gathering of more comprehensive intelligence provides further support for the improvement of the defense strategies. This system, by converting the cybersecurity practices from reactive to proactive ones, is a stepping stone towards the creation of a robust and effective defense against the constantly evolving cyber threats. It plays a vital role in minimizing system downtime, promoting scalability, and attaining sustainable cybersecurity. 

This research is a stepping stone for the next echelon and fosters the collaboration and the out-of-the-box thinking of different cybersecurity sectors. 

Limitations and Practical Considerations: The suggested framework is indeed very powerful, but its limitations cannot be ignored. The adoption of such methods as timeliness modeling based on Transformer, Graph Neural Networks, reinforcement learning, and evolutionarily finely-tuned parameters, among others, significantly adds to the requirement of computation and memory, which might restrict the scalability of very large or high-throughput networks. The running time and resource consumption rise together with the Transformer by squaring the length of the sequence while the GNN is expanded with the size of the graph and ASREF optimization calls for iterative populationbased evaluations. Furthermore, the multi-module structure of the system complicates its implementation and maintenance, necessitating specialists for deployment, tuning, and monitoring. In addition, the framework heavily relies on the availability of high-quality and representative attack data, while its generalization across attack patterns and domains is not guaranteed due to domain shift and concept drift, hence retraining is needed at intervals. On the other hand, the end-to-end pipeline may cause latency that renders it unsuitable for strict realtime inline enforcement, hence positioning it more appropriately for near-real-time analysis and strategic defense orchestration. The explainability layer, however, indirectly incurs computational and costs and can be unstable in case of small input perturbations. Finally, like any 

learning-based system, the framework is vulnerable to adversarial attacks, data stealing, and reward hacking which have not been extensively discussed in this study. 

Future Work: The subsequent investigation will be aimed at the scalability and deployability of the suggested framework, whereby its hierarchical and distributed modeling strategies, edge–cloud partitioning, and model compression techniques are extensively studied and therefore the computational and memory overhead is reduced. The existing Transformer and GNN modules are too demanding to be employed in large-scale or resource-limited situations, and hence we are planning to execute the automated hyperparameter tuning and selfadaptive architecture selection for the purpose of implementation complexity reduction. Future work will go on to address the issue of resilient systems by focusing on the vulnerabilities of adversarial machine learning, such as data poisoning and evasion attacks, and adopting techniques like adversarial training, robust optimization, and defenseaware learning strategies to neutralize their impact. Furthermore, the use of transfer learning, continual learning, and domain adaptation techniques is planned to enhance the framework's ability to generalize across multiple domains (for example, enterprise, IoT, and cyber–physical systems). Finally, the exploration of the more efficient and stable explainability mechanisms and human-in-the-loop interfaces will be conducted as they are going to be instrumental in building analyst trust, usability in operations, and support in the decision-making process during real-world security operations. 

#### **Funding Statement** 

This research is supported by a grant (No. CRPG-25-3395) under the Cybersecurity Research and Innovation Pioneers Initiative, provided by the National Cybersecurity Authority (NCA) in the Kingdom of Saudi Arabia. 

#### **Ethical approval** 

This article does not contain any studies with human participants or animals performed by any of the authors. 

#### **CRediT authorship contribution statement** 

**Mohammed Alshehri:** Writing – review & editing, Supervision, 

26 

_M. Alshehri_ 

Funding acquisition, Formal analysis, Conceptualization. 

_Ain Shams Engineering Journal 17 (2026) 104061_ interests or personal relationships that could have appeared to influence the work reported in this paper. 

#### **Declaration of competing interest** 

The author declares that they have no known competing financial 

#### **Appendix** 

A1. Mechanism of Adaptive Swarm-Reinforce Evolutionary Framework (ASREF). 

#### a) Swarm Intelligence (SI) for Decentralized Optimization 

Swarm Intelligence is based on collective behaviour among different decentralized agents to function in the search space and optimize honeypot configurations. Let _X_ = { _x_ 1 _, x_ 2 _,_ ⋯ _, xN_ } represent the population of _N_ candidate solutions, where each _xi_ is a potential configuration [29]. The position of each agent is updated according to its own best experience and the best one among all others as per the equation (13): 



Where, _t_ is the iteration index. _c_ 1 and _c_ 2 are the iterative acceleration coefficients. _r_ 1 and _r_ 2 ∼ _U_ (0 _,_ 1) are random exploration numbers. Thus, the nature of decentralized approach allows it to scale up and explore different configurations. 

#### b) Reinforcement Learning (RL) for Real-Time Adaptation 

Thus, reinforcement learning allows the honeypots to self-learn by interacting with the attackers, as it changes honeypot parameters dynamically. Such a framework is formulated as an MDP given [30]: 

● State ( _St_ ): Current system configuration and attacker profile. ● Action ( _At_ ): Parameter adjustments for the honeypot. ● Reward ( _Rt_ ): Effectiveness of deception, e.g., time attackers are engaged. 

The RL agent thus maximizes cumulative reward as per the equation (14): 

_Gt_ = ∑∞ _k_ =0<sup>_γkRt_+</sup><sup>_k_+1</sup> (14) 

Where, _Gt_ is the return. _γ_ is the discount factor. The agent updates its policy using Q-learning or Actor-Critic methods as per the equation (15): _Q_ ( _St, At_ )← _Q_ ( _St, At_ ) + _α_ [ _Rt_ + _γmaxA_ ʹ _Q_ ( _St_ +1 _, A_<sup>ʹ</sup> ) − _Q_ ( _St, At_ ) ] (15) 

Here, α is the learning rate. 

#### c) Differential Evolution (DE) for Robust Optimization 

Differential evolution provides robustness in dealing with nonlinear, multimodal, and complex objective functions. Each individual in the population, _X_ is updated through mutation, crossover, and selection [31]. Generate mutant vector _vi_ is updated in the equation (16): _vi_ = _xr_ 1 + _F_ • ( _xr_ 2 − _xr_ 3) (16) 

Where, _xr_ 1, _xr_ 2, _xr_ 3 are distinct random solutions. _F_ is the scaling factor. The mutant vector _vi_ is combined with the target vector _xi_ as follows in the equation (17): 

_uij_ = { _vij, ifrj_ ≤ _Crorj_ = _jrandxij,otherwise_ (17) 

Here, _Cr_ is the crossover probability. Here, _jrand_ ensures that at least one parameter is inherited from _vi_ . Choose the better solution as per the equation (18): _x_<sup>(</sup> _i_<sup>_t_+1)</sup> = { _ui, iff_ ( _ui_ ) ≤ _f_ ( _xi_ ) _xi, otherwise_ (18) 

The hybrid ASREF algorithm harnesses the strengths of these three methods: 

- Initialization: An initial population of configurations obtained through SI. 

• Learning: The RL takes feedback on its action and subsequent modifications to the set of parameters based on real-time feedback from attackers. 

• Optimization: DE optimizes configurations for robustness and optimal effect. 

In general, the objective function _J_ ( _x_ ) is represented as in the equation (19): 

27 

_M. Alshehri_ 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

(19) 

_J_ ( _x_ ) = _ω_ 1 • _E_ ( _x_ ) + _ω_ 2 • _R_ ( _x_ ) + _ω_ 3 • _P_ ( _x_ ) 

Where, _E_ ( _x_ ) is the resource efficiency. _R_ ( _x_ ) is the resilience to APTs. _P_ ( _x_ ) is the deception effectiveness. _ω_ 1, _ω_ 2, _ω_ 3 are the weights of the multiobjective optimization. The integration ensures scalability, adaptability, and robustness against evolving cyber threats. 

#### **Data availability statement** 

- [22] Mori´c, Z., Daki´c, V., & Regvart, D. (2025). Advancing Cybersecurity with Honeypots and Deception Strategies. In Informatics (Vol. 12, No. 1, p. 14). MDPI AG. DOI: 10.3390/informatics12010014. 

|This<br>study<br>utilized<br>datasets:<br>https://www.kaggle.<br>|[23] Shinde, A., Doshi, P.,&Setayeshfar, O. (2020). Active Deception using Factored<br>'|
|---|---|
|com/datasets/startingsecurity/cybersecurity-honeypot-attacks/code.|Interactive POMDPs to Recognize Cyber Attackers Intent. arXiv preprint arXiv:<br>2007.09512. DOI: https://doi.org/10.48550/arXiv.2007.09512.<br>[24]Abdul Kareem S Sachan R C&Malvia R K (2024) AI-Driven Adative|
|**References**|, ., , . ., y, . . .  p<br>|
||Honeypots for Dynamic Cyber Threats. Ram Chandra and Malviya, Rajesh Kumar,<br>AI-Driven Adaptive Honeypots for Dynamic Cyber Threats (September 17, 2024).|
|[1] Tanikonda A, Pandey BK, Peddinti SR, Katragadda SR. Advanced AI-driven<br>cybersecurity solutions for proactive threat detection and response in complex<br>|<br>DOI: Doi: 10.2139/ssrn.4966935.<br>[25] Veluchamy S, Kathavarayan RS. Deep reinforcement learning for building<br>|
|ecosystems. J Sci Technol 2022;3(1).https://doi.org/10.2139/ssrn.5102358.<br>[2]Kumari T Rakib A Zaslavsk A Jadidbonab H Mohaddam V (2024|honeypots against runtime DoS attack. Int J Intell Syst 2022;37(7):3981–4007.<br>https://doiorg/101002/int22708|
|, ., , ., y, ., , ., g, . ,<br>February). A Context-Aware Framework for Analysing Automotive Vehicle<br>|....<br>[26] Guan C, Liu H, Cao G, Zhu S, La Porta T. HoneyIoT: Adaptive High-Interaction<br>|
|Security. In 2024 IEEE 18th International Conference on Semantic Computing|Honeypot for IoT Devices through Reinforcement Learning. In: Proceedings of the|
|(ICSC) (pp. 81-88). IEEE. DOI: 10.1109/ICSC59802.2024.00019.|16th ACM Conference on Security and Privacy in Wireless and Mobile Networks;|
|<br>[3] Cai F, Koutsoukos X. Real-time detection of deception attacks in cyber-physical<br>|<br>2023. p. 49–59.https://doi.org/10.1145/3558482.3590195.<br>|
|systems. Int J Inf Secur 2023;22(5):1099–114.https://doi.org/10.1007/s10207-<br>023-00677-z.|[27] Zhou X, Almutairi L, Alsenani TR, Ahmad MN. Honeypot based industrial threat<br>detection using game theory in cyber-physical system. J Grid Comput 2023;21(4):|
|[4] Yang X, Yuan J, Yang H, Kong Y, Zhang H, Zhao J. A highly interactive honeypot-<br>based approach to network threat management. Future Internet 2023;15(4):127.<br>https://doi.org/10.3390/fi15040127.|<br>59.https://doi.org/10.1007/s10723-023-09689-4.<br>[28] Shan Y, Yao Y, Zhao T, Yang W. NeuPot: a neural network-based honeypot for<br>detecting cyber threats in industrial control systems. IEEE Trans Ind Inf 2023;19|
|i<br>[5] Oloyede, J. (2024). Leveraging Artificial Intelligence for Advanced Cybersecurity<br>|<br>(10):10512–22.https://doi.org/10.1109/TII.2023.3240739.<br>|
|Threat Detection and Prevention. Available at SSRN 4976072. DOI: Doi: 10.2139/<br>ssrn.4976072.|[29] Ramos-Cruz B, Andreu-Perez J, Martínez L. The cybersecurity mesh: a<br>comprehensive survey of involved artificial intelligence methods, cryptographic|
|[6]Aminu M Akinsana A Dako DA Oedokun O Enhancin cber threat detection|i<br>protocols and challenges for future research. Neurocomputing 2024:127427.|
|, y ,  , y . g y<br>through real-time threat intelligence and adaptive defense mechanisms. Int J<br>Comput Appl Technol Res 2024;13(8):11–27.https://doi.org/10.7753/<br>IJCATR1308.1002.|<br>https://doi.org/10.1016/j.neucom.2024.127427.<br>[30] Oh SH, Kim J, Nah JH, Park J. Employing deep reinforcement learning to Cyber-<br>Attack simulation for enhancing cybersecurity. Electronics 2024;13(3):555.|
|[7] Rehman Z, Gondal I, Ge M, Dong H, Gregory M, Tari Z. Proactive defense|<br>https://doi.org/10.3390/electronics13030555.<br>|
|mechanism: Enhancing IoT security through diversity-based moving target defense<br>and cyber deception. Comput Secur 2024;139:103685.https://doi.org/10.1016/j.<br>2023103685|[31] Sun J, Liu X, B¨ack T, Xu Z. Learning adaptive differential evolution algorithm from<br>optimization experiences by policy gradient. IEEE Trans Evol Comput 2021;25(4):<br>666–80htts://doior/101109/TEVC20213060811|
|cose...<br>[8] Ahmed Y, Beyioku K, Yousefi M. Securing smart cities through machine learning: a<br>honeypot-driven approach to attack detection in Internet of Things ecosystems. IET<br>Smart Cities 2024;6(3):180–98.https://doi.org/10.1049/smc2.12084.<br>i|.p.g....<br>[32] Jahromi, M. Z., Jahromi, A. A., Sanner, S., Kundur, D.,&Kassouf, M. (2020,<br>August). Cybersecurity enhancement of transformer differential protection using<br>machine learning. In 2020 IEEE Power&Energy Society General Meeting<br>|
|[9] Hasan MM, Islam MU, Uddin J. Advanced persistent threat identification with<br>boosting and explainable AI. SN Comput Sci 2023;4(3):271.https://doi.org/<br>101007/s42979-023-01744-x|(PESGM) (pp. 1-5). IEEE. DOI: 10.1109/PESGM41954.2020.9282161.<br>[33] Zhong M, Lin M, Zhang C, Xu Z. A survey on graph neural networks for intrusion<br>detection systems: methods trends and challenges Comput Secur 2024:103821|
|..<br>[10] Celdr´an AH, S´anchez PMS, Von Der Assen J, Schenk T, Bovet G, P´erez GM, et al. Rl<br>i|,   .   .<br>https://doi.org/10.1016/j.cose.2024.103821.|
|and fingerprinting to select moving target defense mechanisms for zero-day attacks<br>in iot. IEEE Trans Inf Forensics Secur 2024.https://doi.org/10.1109/<br>TIFS.2024.3402055.|[34] Biswas B, Mukhopadhyay A, Kumar A, Delen D. A hybrid framework using<br>explainable AI (XAI) in cyber-risk management for defence and recovery against<br>phishing attacks. Decis Support Syst 2024;177:114102.https://doi.org/10.1016/j.|
|[11] Farooq M, Khan MH. AI-driven network security: innovations in dynamic threat<br>adatation and time series analsis for roactive cber defense Int J Wirel|dss.2023.114102.<br>[35]Feng X Hu S. Co-optimization of microgrid secondary control and communication|
|p    y  p y .<br>Microwave Technol (IJWMT) 2024;14(2):17–26.https://doi.org/10.5815/<br>ijwmt.2024.02.02.|,<br>QoS: a cross-layer perspective in cyber–physical system. IEEE Trans Ind Inf 2024.<br>[36] Hemmati, R., Bornapour, S. M.,&Tostado-V´eliz, M. Integrated Real-Time|
|[12]Noor Z Hina S Hayat F Shah GA An intelligent context-aware threat detection|<br>Optimization and Rule-Based Detection of Multiple Cyberattacks on Renewable-|
|,  ,  ,  .<br>and response model for smart cyber-physical systems. Internet Things 2023;23:<br>100843.https://doi.org/10.1016/j.iot.2023.100843.|<br>Battery Power in Microgrids with Falsified Data Recovery. Available at SSRN<br>5611577.|
|<br>[13]Guerra L. M. D. F. C. (2023). Proactive cybersecurity tailoring through deception|[37] Kumar, M. R., Madhu, G. C., Narra, V. B., Chidipothu, V. K., Chakradhar, K. S.,&|
|,<br>techniques. DOI: http://hdl.handle.net/10400.21/16947.|<br>Sawan, V. (2025, February). Improved Intrusion Detection in Cyber-Physical<br>|
|[14] Kaushik P, Rathore SPS. Deep learning multi-agent model for phishing cyber-attack|Systems with Explainable AI and Hybrid Optimization. In 2025 IEEE International|
|detection. Int J Recent Innov Trends Comput Commun 2023;11(9s):680–6.https://<br>doior/1017762/ijritccv11i9s7674|Conference on Emerging Technologies and Applications (MPSec ICETA) (pp. 1-6).<br>IEEE|
|.g....<br>[15] Alani MM, Mauri L, Damiani E. A two-stage cyber attack detection and<br>classification system for smart grids. Internet Things 2023;24:100926.https://doi.<br>101016i2023100926|.<br>[38] Xu Q, Li X, Jiang Y, Zhu S, Yang B, Chen C, et al. Transportation-energy-<br>communication integrated management of ship cyber-physical systems against<br>cber attacks IEEE Trans Smart Grid 2025|
|org/./j.ot...<br>i|y ..<br>|
|[16] Thapaliya S, Bokani A. Leveraging artificial intelligence for enhanced|[39] Sun L, Ding D, Dong H, Yi X. Distributed economic dispatch of microgrids based on<br>|
|i<br>cybersecurity: Insights and innovations. Sadgamaya 2024;1(1):46–52.https://doi.<br>d|ADMM algorithms with encryption-decryption rules. IEEE Trans Autom Sci Eng<br>2024|
|org/10.3126/sagamaya.v1i1.66888.<br>[17] Donekal Chandrashekar N, Lee A, Azab M, Gracanin D. Understanding user<br>behavior for enhancing cybersecurity training with immersive gamified platforms.<br>Information 2024;15(12):814.https://doi.org/10.3390/info15120814.<br>|.<br>[40] Abughali, A., Alansari, M.,&Al-Sumaiti, A. S. Defending the Water-Energy Nexus:<br>Strategies for Cyber-Attack Detection and Mitigation. Available at SSRN 4743243.<br>[41] Wu D, Guo F, Yao Z, Zhu D, Zhang Z, Li L, et al. Enhancing reliability and<br>f f l f l   l|
|[18] Blaas, N., Winterbourne, J., Beauregarde, W.,&Heathcote, E. (2024). Ransomware|perormance o oad requency contro in aging muti-area power systems under<br>|
|detection through contextual behavior mapping and sequential dependency|cyber-attacks. Appl Sci 2024;14(19):8631.<br>i|
|<br>analysis. DOI: https://doi.org/10.21203/rs.3.rs-5527159/v1.<br>|[42] Hoummadi MA, Bossoufi B, Karim M, Althobaiti A, Alghamdi TA, Alenezi M.<br>Add AI h f h dli d iii f iid|
|[19] Odemis M, Yucel C, Koltuksuz A. Detecting user behavior in cyber threat<br>|vance  approaces or te moeng an optmzaton o mcrogr energy<br>|
|intelligence: development of Honeypsy system. Secur Commun Netw 2022;2022<br>(1):7620125https://doiorg/101155/2022/7620125|systems. Sci Rep 2025;15(1):12599.<br>[43] Ouederni R, Davidson IE. Co-optimized design of islanded hybrid microgrids using|
|....<br>[20] Wan Z, Cho JH, Zhu M, Anwar AH, Kamhoua CA, Singh MP. Foureye: defensive<br>|<br>synergistic AI techniques: a case study for remote electrification. Energies 2025;18<br>|
|deception against advanced persistent threats via hypergame theory. IEEE Trans|(13):3456.|
|Netw Serv Manag 2021;19(1):112–29.https://doi.org/10.1109/|[44] Li L. Optimizing microgrid energy management with hybrid energy storage systems|
|<br>TNSM20213117698|<br>using reinforcement learning methods Sustain Comput: Informat Syst 2025:|
|...<br>[21] Aggarwal P, Thakoor O, Jabbari S, Cranford EA, Lebiere C, Tambe M, et al.|.<br>101177.<br>|
|Designing effective masking strategies for cyberdefense through human<br>experimentation and cognitive models. Comput Secur 2022;117:102671.https://<br>doi.org/10.1016/j.cose.2022.102671.|[45] Khosravi N. A hybrid control approach to improve power quality in microgrid<br>systems. Artif Intell Rev 2025;58(10):312.|



28 

_Ain Shams Engineering Journal 17 (2026) 104061_ 

_M. Alshehri                                                                                                                                                                                                                                       Ain Shams Engineering Journal_ 

- [46] Mendonça M, Santos V. Advancing sustainable energy solutions: AI hybrid renewable energy systems with hybrid optimization algorithms and multi-objective optimization in Portugal. J Clean Prod 2025:145564. 

- [47] Chandel P. Artificial intelligence based hybrid ASFO-ESVM for load demand prediction in micro grid energy management. J Intell Syst Internet Things 2025;14 (2). 

- [48] Lami B, Alsolami M, Alferidi A, Slama SB. A smart microgrid platform integrating AI and deep reinforcement learning for sustainable energy management. Energies 2025;18(5):1157. 

- [49] Moosavi M, Olamaei J, Shourkaei HM. Optimizing microgrid performance a multiobjective strategy for integrated energy management with hybrid sources and demand response. Sci Rep 2025;15(1):17827. 

- [50] Goel N, Yadav NK. Sustainable microgrid operations: multi-objective hybrid optimization for combined economic emission dispatch. Electr Eng 2025:1–14. 

- [51] Mohammed A, Kadry A, Abo-Adma M, Samahy AE, Elazab R. Hybrid multiobjective optimization of µ-synthesis robust controller for frequency regulation in isolated microgrids. Sci Rep 2025;15(1):2298. 

- [52] Revathi R, Senthilnathan N, Chinnaiyan VK, Rajesh JS. Multi-objective optimization framework for enhancing efficiency and sustainability in smart grids. Energ Conver Manage 2025;341:120079. 

- [53] Chowdhury NA, Yang F. Multi objective optimisation of AC residential microgrid using parameterised meta-heuristics algorithm. Electr Pow Syst Res 2025;248: 111912. 

- [54] Shaier AA, Elymany MM, Enany MA, Elsonbaty NA. Multi-objective optimization and algorithmic evaluation for EMS in a HRES integrating PV, wind, and backup storage. Sci Rep 2025;15(1):1147. 

- [55] Abdolahzadeh A, Hassannia A, Mousavizadeh F, Tolou Askari M. Multi-objective stochastic model optimal operation of smart microgrids coalition with penetration renewable energy resources with demand responses. Sci Rep 2025;15(1):22443. 

- [56] Yousefikhah S, Asgharizadeh E, Jahangir MH. Multi-objective optimization of a hybrid micro-grid system for reducing grid dependency in the automotive industry: a case study of Iran Khodro company. Int J Model Simul 2025;45(1):114–36. 

- [57] Holel MA, Hasan SQ. The Necessary and Sufficient Optimality Conditions for a System of FOCPs with Caputo–Katugampola Derivatives. Baghdad Sci J 2023;20 (5):23. https://doi.org/10.21123/bsj.2023.7515. 

**Mohammed Alshehri** is Professor at College of Computer and Information Sciences at Majmaah University, Saudi Arabia where he has been since 2015. He received a B.S. from King Saud University in 2001, and an M.S. in the field of Computer and Communication Engineering, Queensland University of Technology (QUT), Australia, 2007. He received his Ph.D. in Information Technology from the Griffith University, Australia, in 2013. He was consultant to ministry of defense from 20132015. From 2002 to 2009 he worked at Ministry of Defense Saudi Arabia, eventually as an IT manager. His research interests span both computer science and Information Technology as well as he is also working in the field Education robotics, Cloud Computing, IoT, Artificial Intelligence, Data Science, 



Computer Networks and Security and Cybersecurity. 

29 

