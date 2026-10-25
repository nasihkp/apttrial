Computers & Security 156 (2025) 104509 



Contents lists available at ScienceDirect 

# Computers & Security 

journal homepage: www.elsevier.com/locate/cose 



### Full length article 

## Threat detection in reconfigurable Cyber–Physical Systems through Spatio-Temporal Anomaly Detection using graph attention network 



Roberto Canonico , Francesco Lista, Annalisa Navarro , Giancarlo Sperlí ∗, Andrea Vignali 

_Department of Electrical Engineering and Information Technology (DIETI), University of Naples Federico II, Via Claudio 21, Naples, Italy_ 

#### A R T I C L E I N F O 

#### A B S T R A C T 

_Keywords:_ Anomaly detection Multivariate Time Series Unsupervised learning Cyber–Physical Systems 

Chronicles of the last few years show that industrial Cyber–Physical Systems are the target of dangerous cyberattacks and face multiple threats. It is important to react as promptly as possible to such attacks and take proper countermeasures. Anomaly detection is a key activity in a Cyber–Physical System’s defense strategy. It involves analyzing sensor data, modeled as a Multivariate Time Series, to identify deviations from expected behavior, that may indicate potential cyber threats or attacks. 

In this paper, we design a novel framework integrating spatial and temporal modules to unveil spatiotemporal dependencies within sensor data in Cyber–Physical Systems to detect possible intrusions. We propose a novel strategy based on time series correlation to build a graph minimizing the number of sensors’ connections to unveil spatial dependencies between multimodal time series. The prediction and reconstruction losses are then leveraged to detect anomalies. The proposed framework has been evaluated on a real-world Cyber–Physical System, on which we evaluated both the efficacy and efficiency with respect to different competing approaches. The experimental analysis shows that the proposed framework outperforms eight state-of-the-art ones by increasing the precision of 0.59% while reducing both the training time (21.05%) for each epoch and memory occupation (77.8%) with respect to the best competitor in the literature. These characteristics make it particularly suitable for industrial environments that need periodic reconfigurations. 

##### **1. Introduction** 

In the modern world, Cyber–Physical Systems (CPSs) integrate advanced computational capabilities, sensing, and control within physical components (Kayan et al., 2022; Chae et al., 2023), to perform a plethora of tasks in automated industrial plants and critical infrastructures (Olowononi et al., 2021; He et al., 2024). These systems can interact with human subjects to support them in different sectors and activities (e.g., energy, transportation, healthcare, water, and manufacturing). A recent study<sup>1</sup> shows that the global market size for CPSs was evaluated more than $ 7 billion in 2021 while it has been foreseen to reach more than $ 20 billions by 2031 (see Table 1). 

Since they operate in critical infrastructures and/or interact very tightly with the physical environment and human beings, CPSs must not only be efficient and able to guarantee real-time constraints but also satisfy dependability, safety, and security requirements (Olowononi et al., 2021; Goknil et al., 2023; Hasan et al., 2023). For these reasons, security has become a first-class engineering requirement for CPSs (Segovia-Ferreira et al., 2024). Recent cybersecurity attacks on 

CPS have highlighted the vulnerability of these systems that makes them exposed to a plethora of security threats, which could have significant consequences, affecting lives, economies, and national security (Kumar et al., 2022; Mahboubi et al., 2024). Specifically, cyber– physical attacks affect the service continuity of a CPS, producing an impact that may range from minor performance degradation of single components to severe malfunction and cascading failures with potentially fatal consequences (Canonico and Sperlì, 2023). Attacks may also lead to the leakage of sensitive data and information (Jbair et al., 2022). 

Traditional signature-based attack detection approaches are unsuitable to protect complex infrastructures from unknown attacks. Hence, CPS protection has been recently approached by applying Artificial Intelligence (AI)-based techniques for anomaly detection in _Multivariate Time Series_ (MTS) such as those produced by periodic sampling of heterogeneous sensors (Li and Jung, 2023; Chen et al., 2023; Wang et al., 2024). Since anomalies are infrequent in real-world scenarios, making 

> ∗ Corresponding author. 

_E-mail addresses:_ roberto.canonico@unina.it (R. Canonico), fra.lista@studenti.unina.it (F. Lista), annalisa.navarro@unina.it (A. Navarro), giancarlo.sperli@unina.it (G. Sperlí), andrea.vignali@unina.it (A. Vignali). 

> 1 https://www.businessresearchinsights.com/market-reports/cyber-physical-system-market-100757. 

https://doi.org/10.1016/j.cose.2025.104509 

Received 15 November 2024; Received in revised form 24 April 2025; Accepted 26 April 2025 

> Available online 10 May 2025 

0167-4048/© 2025 The Authors. Published by Elsevier Ltd. This is an open access article under the CC BY-NC-ND license ( http://creativecommons.org/licenses/bync-nd/4.0/ ). 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 

**Table 1** Acronyms. 

|Symbol|Description|
|---|---|
|AI|Artificial Intelligence|
|CPS|Cyber–Physical System|
|DAGMM|Deep Autoencoding Gaussian Mixture Model|
|GDN|Graph Deviation Network|
|GDP|Generalized Pareto Distribution|
|GMM|Gaussian Mixture Model|
|GNN|Graph Neural Networks|
|LSTM|Long-Short Term Memory|
|MSE|Mean Squared Error|
|MSMP|Multi-Stage Multi-Point|
|MSSP|Multi-Stage Single Point|
|MTS|Multivariate Time Series|
|POT|Peaks Over Threshold|
|SSMP|Single Stage Multi-Point|
|SSSP|Single Stage Single Point|
|VAE|Variational Autoencoder|



the data distribution unbalanced (Luo et al., 2021b), researchers are increasingly interested in exploring unsupervised techniques for anomaly detection in this context (Zhong et al., 2023; He et al., 2021). 

So far, the majority of state-of-the-art methods aim to identify anomalies by focusing on a single dimension (spatial or temporal) while only a few methodologies (Tian et al., 2023; Ding et al., 2023) combine both analyses to deal with the anomaly detection task within CPSs. These methodologies are mainly evaluated in terms of effectiveness (e.g. F1-score) but other important criteria, such as training time, energy efficiency, or memory occupation, are not taken into account. 

For instance, most approaches presented in the literature assume the system setup as a static configuration (Ding et al., 2023; SegoviaFerreira et al., 2024). Yet, the flexibility required by modern engineering approaches (e.g. Industry 4.0 and its evolution) requires frequent plant reconfigurations, that mainly rely on changing the sequence of operations or adapting the manufacturing process (Bellavista et al., 2023). This scenario implies retraining the anomaly detector to identify the new normal behavior and event patterns generated under these settings. Hence, reducing training time in many industrial scenarios is of uttermost importance to deal with frequent plant setup reconfigurations that would require running another training phase to learn the ‘‘normal’’ system behavior under the new settings (Audibert et al., 2020). 

##### _1.1. Contribution_ 

In this paper, we propose a deep learning-based unsupervised approach to detect attacks on CPS by unveiling anomalies in time series data from several sensors. Specifically, the proposed approach jointly considers spatial and temporal analysis based on a graph attention network to capture model dependencies between multivariate time series. In the first stage, we propose a novel strategy to create a graph for each time window _𝑊_ by only considering connections between the most correlated sensors. This approach aims to jointly reduce the complexity of the graph analysis and speed up the training phase. A graph attention mechanism with multi-head attention is designed to capture spatial dependencies between MTS for achieving an enhanced feature representation of input data. Successively, temporal dependencies in MTS are inferred by using a temporal convolution on time slices. Finally, this approach combines reconstruction and prediction losses for threshold and anomaly score evaluation. 

Summarizing, the main novelties of the proposed approach concern: 

- Design of a novel framework that uses spatial and temporal modules to unveil spatio-temporal dependencies within CPSs for identifying possible anomalies by combining prediction and reconstruction losses; 

- A novel strategy based on time series correlation to build a graph minimizing the number of sensors’ connections to unveil spatial dependencies between MTS to reduce both training time (up to 21.05%) and memory space (up to 77.8%) of the model; 

- An experimental analysis of the proposed framework on a realworld CPS, that has been affected by different types of attacks (i.e., Single Stage Single Point (SSSP), Single Stage Multi-Point (SSMP), Multi-Stage Single Point (MSSP), Multi-Stage Multi-Point (MSMP)) with respect to several state-of-the-art approaches. 

The manuscript is organized as follows. In Section 2, we provide a comprehensive review of approaches proposed in the literature, also discussing their pros and cons. The proposed framework has been described in Section 3, also formalizing the addressed task. In Section 4, we describe the experimental protocol and the hyperparameter optimization while the obtained results have been discussed in Section 5. Finally, Section 6 summarizes the main findings of the analysis as well as possible future directions. We expand all the acronyms used in this paper in Table 1. 

##### **2. Related work** 

In the last decade, anomaly detection in large-scale infrastructures has proven to be one of the most complex tasks (Erhan et al., 2021), requiring sophisticated methodologies to unveil deceptive threats. An in-depth analysis has been presented by Canonico and Sperlì (2023), where the authors classified attacks against industrial CPSs according to the attacker’s methodology into two macro-categories: deception- and network-based attacks. The former involves injecting deceptive data into the industrial control system whilst the latter concerns the forgery or manipulation of network packets. 

The various types of attacks mentioned can affect two distinct types of data flowing through a CPS: network data and sensor data. Consequently, the literature is divided: attack detection is performed by analyzing either network data or sensor data (Luo et al., 2021a). Different datasets have been collected for testing these approaches (see Radoglou-Grammatikis et al., 2022b,a for network data). More recent approaches have demonstrated that a comprehensive analysis of both types of data can detect both types of attacks (Canonico et al., 2025a). Therefore, we have designed a two-stage unsupervised deep learning framework that simultaneously considers both sensor/actuator data and network data, improving detection performance (Canonico et al., 2025b). 

While these latter works focus on designing an all-encompassing detection strategy, in this paper, we explore how the stage of the framework based on sensor data can be made more efficient. In fact, the complexity of CPSs has grown exponentially in terms of the number of sensors and interconnections, and consequently anomaly detection based on sensor data has become increasingly challenging (González et al., 2024; Ding et al., 2023). 

For this reason, several approaches have been proposed to identify anomalies in time series that can be classified into two main groups (Schmidl et al., 2022; Guan et al., 2024). The _traditional_ approaches mainly rely on statistical analysis to unveil some unknown patterns (Puggini and McLoone, 2018; Carletti et al., 2023; Sartor et al., 2024) while _deep learning_ models aim at learning feature representation or anomaly scores through neural networks (see Pang et al., 2021 for a review on this topic). Deep learning-based approaches can be further categorized into two paradigms (Zhao et al., 2020), namely forecasting- (Zhang et al., 2023) and reconstruction-based models (Miao et al., 2024). 

Within the latter category, some approaches have been designed to exploit the analysis of temporal dependencies for anomaly detection. The method called _Omnianomaly_ (Su et al., 2019) relies on a Variational Autoencoder (VAE) to compute the reconstruction probability on the reconstructed input to unveil anomalies. In turn, _USAD_ (Audibert et al., 

2 

_Computers & Security 156 (2025) 104509_ 

###### _R. Canonico et al._ 

2020) uses a two-phase training schema based on autoencoders and adversarial strategy. Another approach is the Long-Short Term Memory (LSTM)-VAE (Park et al., 2018), which combines LSTM and VAE to capture temporal dependencies and probabilistic factors in a continuous latent space. The Deep Autoencoding Gaussian Mixture Model (DAGMM) (Zong et al., 2018) uses a Gaussian Mixture Model (GMM) to infer low-dimensional features that are, successively, processed through a deep autoencoder to compute the anomaly score. 

Other approaches aim at unveiling spatial dependencies to identify anomalies through the Graph Neural Networks (GNNs) (Corso et al., 2024; Jiang and Chen, 2023), in which the node representation is affected by its neighboring vertices in a graph structure. Furthermore, an attention mechanism turned out to be an effective component of the sequence-to-sequence models in many deep learning applications (Brauwers and Frasincar, 2023). An approach based on both approaches has been designed by Deng and Hooi (2021). They developed the Graph Deviation Network (GDN) to perform structure learning on MTS using an attention mechanism on the graph to identify anomalies, whose interpretation is provided through attention weights. 

Lastly, researchers have focused their attention on designing approaches to combine spatial and temporal analysis (Zhao et al., 2020; Huang et al., 2024). A Multimodal Spatial–Temporal Graph Attention Network (MST-GAT) exemplifies this strategy, leveraging a multimodal graph attention mechanism and temporal convolution to infer spatial and temporal features from MTS. Its objective is to optimize both reconstruction and prediction modules simultaneously (Ding et al., 2023). 

Anomaly detection in large-scale systems has become more and more challenging due to the difficulty of identifying abnormal behaviors due to the large number of sensors required for the continuous monitoring process and the dynamic configuration of the entire system. Although these methods can achieve accurate results, they are hindered by slow training speeds since they do not consider training time, energy consumption, or space occupancy in their performance evaluations (Audibert et al., 2020). 

In this paper, we addressed two goals: (i) minimize computational requirements of the anomaly detector (i.e., model complexity and memory footprint) through a strategy based on MTS correlations to reduce the graph’s edges; (ii) reduce the model training time by combining a reconstruction method relying on Mean Squared without using Deep Learning models with a novel graph-building method. 

##### **3. Framework** 

This section describes the proposed framework (see Section 3.2), detailing each component designed to address the anomaly detection task defined in Section 3.1. 

Our framework is based on unsupervised learning by training exclusively on data that reflects normal sensor behavior. This approach ensures that all attack types remain unseen during training, improving the model’s ability to detect novel threats. 

##### _3.1. Task definition_ 

Anomaly detection is one of the main tasks in the context of Industry 4.0, whose aim is to identify samples having a behavior that significantly differs from most of the other ones (Li and Jung, 2023). 

In CPSs, anomalies can manifest as errors, malfunctions, sensor faults, or unexpected deviations in operational patterns. These deviations may stem from various causes, including hardware failures, environmental disturbances, or cyber threats such as unauthorized intrusions and attacks. According to the definitions in Table 3, an anomaly is a deviation from expected behavior, which may indicate a potential security incident. In this work, we focus on anomalies caused by security threats, like unauthorized access or malicious actions, corresponding to an intrusion or attacks. 

**Table 2** 

Symbols. 

|Symbol|Description|
|---|---|
|_𝛼_<sup>_𝑙𝑠_</sup><br>_𝑖𝑗_|Scaled dot-product attention between i and j for<br>layer _𝑙_ and head _𝑠_<br>|
|A<br>|Adjacency matrix|
|_𝐶_<sup>_𝑘_</sup><br>_𝑖_|Candidate set of K connected nodes with i|
|_𝛥_|Length of Time Window|
|_𝐻_<sup>_𝑖_</sup>|Node _𝑖_’s state of Graph Attention Network|
|_ℎ_<sup>_𝑙_+1</sup><br>_𝑖_|node _𝑖_’s representation of Multi-Head Attention|
|IQR|Inter-Quartile Range|
|K|Number of edges for each node|
|_𝜁𝑖𝑛_|learnable input data transformation|
|_𝜆_|Regularization parameter|
|_𝑙_|Layer of Graph Attention Network|
|_𝑟𝑒𝑐_|Reconstruction loss|
|_𝑝𝑟𝑒𝑑_|Prediction loss|
|N|Number of sensors|
|_𝑁𝑖_|Set of neighbors of node i|
|POT|Peaks Over Threshold|
|S|Set of attention heads|
|_𝑠𝑖_|Anomaly score|
|_𝑇_<sup>_𝑙_</sup>|Temporal representation at level _𝑙_|
|X|An instance of MTS|
|_𝜃_|Anomaly Threshold|
|W|Time window|
|_𝑊𝑒𝑖𝑔ℎ𝑡_<sup>_𝑙𝑠_</sup>|Weighted Matrix|



**Table 3** 

Terminology and definitions. 

_Source:_ Adapted from National Institute of Standards and Technology (NIST) (2025). 

|Term|Definition|
|---|---|
|Intrusion|An event where an unauthorized entity attempts<br>or gains access to a system or its resources.|
|Threat|A potential event that could negatively affect a<br>system by enabling unauthorized access, damage,<br>alteration, or disruption of its data or services.|
|Attack|A deliberate action aimed at disrupting, degrading,<br>or destroying the functionality of a system or its<br>data.|
|Anomaly|A deviation from expected behavior or<br>performance, based on system requirements or<br>predefined standards.|



In our vision, Anomaly Detection has been modeled as an unsupervised task (see Definition 3.1) by leveraging the MTS collected from sensors deployed throughout the CPS (Pang et al., 2021). Specifically, a MTS is composed of various univariate time series, whose values are related to the measurements made by a specific sensor (Yang et al., 2023). Table 2 summarizes the symbols list used in this paper. 

**Definition 3.1.** Anomaly Detection task. Let _𝑋_ = { _𝑥_ 1 _,_ … _, 𝑥𝑇_ } be a multivariate time series, where each element _𝑥𝑖_ ∈ _𝑅_<sup>_𝑁_</sup> represents measurement values from _𝑁_ sensors at a specific time instant _𝑖_ . The anomaly detection task aims to identify an unseen observation _̂𝑥𝑡_ , where _𝑡> 𝑇_ , as an anomaly if its anomaly score _𝑠𝑡_ , which represents the difference between the normal behavior and the observed one, is greater than a given threshold _𝜃_ ( _𝑠𝑡 > 𝜃_ ). 

MTS are preferred over univariate ones for two main reasons (Su et al., 2019): (i) the primary goal is to capture the overall status of the infrastructure; and (ii) an incident can be caused by different factors that can be better modeled through a MTS. 

Dealing with an unsupervised task, we only use normal samples during the model’s training phase, also choosing a threshold parameter ( _𝜃_ ). During the test phase, the test anomaly score will be compared with _𝜃_ threshold to determine whether a time window is anomalous or not. 

3 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 



**Fig. 1.** Architectural overview of the proposed framework, that is mainly made up of three modules: (i) _Spatial_ , inferring spatial features by applying graph attention on graph structure built on the correlation between sensors’ time series, (ii) _temporal_ , extracting features over time through the temporal convolution on sequential data, and (iii) _Anomaly score_ , computing the anomaly score according to the reconstruction and prediction errors. 

##### _3.2. Architecture of the proposed framework_ 

In this section, we describe the proposed framework for anomaly detection, whose overall architecture is shown in Fig. 1, which is mainly composed of three modules: 

- _Graph structure learning_ : use of correlation between sensors’ time series is fundamental to building a graph structure, whose analysis enables the capture of spatial dependencies. On top of the graph, a _GraphAttentionNetwork_ is used to implement an attention network on graphs and, consists of _Graph attention_ and _MultiHeadattention_ integrating a single layer of attention on graph and multi-head attention, respectively; 

- _Temporal Analysis_ : implements a temporal convolution on sequential data in order to unveil temporal dependencies; 

- _Anomaly score_ : computes the anomaly score based on reconstruction and prediction errors. 

##### _3.2.1. Pre-processing module_ 

Before feeding the data into the proposed framework, pre-processing steps are applied, including Min-Max normalization, which scales variable values to the [0 _,_ 1] range using Eq. (1): 



where _𝑋_ and _𝑋_<sup>′</sup> represent the original and normalized values while _𝑋𝑚𝑖𝑛_ and _𝑋𝑚𝑎𝑥_ are the minimum and maximum scores of the feature considered in the dataset, respectively. 

##### _3.2.2. Spatial module_ 

In the first stage of the proposed framework, we perform a spatial analysis between the different sensors within a CPS. We model the system as a graph in which each vertex _𝑣_ ∈ _𝑉_ is a sensor while their relationships are edges. Hence, the graph structure is composed of _𝑁_ nodes and each node stores a univariate time series coming from a single sensor while edges represent the dependencies between different time series. Specifically, we build a graph to design the connection between sensors by exploiting their correlation. We compute sensors’ correlation through the cosine similarity between their values in a time window _𝑊_ . Successively, we define _𝑁𝑖_ = { _𝑗_ | _𝑗_ ∈ _𝐶𝑖_<sup>_𝑘_}asthe</sup> set of neighbors of the node _𝑖_ , where _𝐶𝑖_<sup>_𝑘_isthecandidatesetof</sup> connected nodes ranked based on a similarity function with _𝑖_ . Hence, each element _𝑎𝑖,𝑗_ of the adjacency matrix _𝐴_ is 1 if _𝑗_ is one of the _𝐾_ most similar nodes and 0 otherwise ( _𝐴_ = { _𝐴𝑖𝑗_ = 1| _𝑗_ ∈ _𝐶𝑖_<sup>_𝐾_}).</sup> The correlation analysis among different sensors enables a reduction in the number of connections ( _𝐾_ ) for each node, also decreasing both computational time and memory requirements of the model. Hence, identifying an appropriate value for _𝐾_ is a key parameter within the proposed framework for determining a trade-off between the model’s effectiveness and computational efficiency. 

This module aims at learning a feature representation through a neural network-enabled mapping function _𝜙_ (⋅) ∶ _𝑉_ → _𝑍_ , where _𝑉_ = { _𝑣_ 1 _, 𝑣_ 2 _,_ … _, 𝑣𝑇_ } is a multivariate time series, where each node _𝑣𝑖_ ∈ _𝑅_<sup>_𝑁_</sup> while _𝑍_ ∈ _𝑅_<sup>_𝑘_</sup> ( _𝑘≪𝑁_ ) be a representation space. Thus, the input size for the subsequent layer is reduced to _𝑊𝑁𝑘_ , where _𝑘, 𝑊≪𝑁_ , leading to a substantial decrease in computational complexity for the upcoming operations and mitigating the noise of the individual sensors. 

4 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 

During the training phase, we use a sliding window with length _𝛥_ to produce a fixed-length input at each time ( _𝑉_ ∈ _𝑅_<sup>_𝑁_×</sup><sup>_𝛥_</sup> ). A _GraphAttentionNetwork_ is built on the graph for each time window in order to dynamically weigh the relationships, emphasizing those that are most relevant to the designed task by learning flexible representation. It first applies a linear transformation to compute node states _𝐻_<sup>_𝑙_</sup> by multiplying the previous one ( _𝐻_<sup>_𝑙_−1</sup> ) with the kernel of the actual layer ( _𝑙_ ), where the initial input is _𝐻_<sup>0</sup> = ( _𝑉_ ⋅ _𝜁𝑖𝑛_ ), in which _𝜁𝑖𝑛_ ∈ _𝑅_<sup>_𝑁_×</sup><sup>_𝛥_</sup> is the learnable input data transformation. Successively, the node states are aggregated to form an expanded representation, wherein each node state appears as many times as it has neighbors, that is, successively, scaled, and multiplied by the attention kernel. These outcomes are processed through a leaky ReLU activation function to compute the attention scores, which are then normalized. Finally, the neighbor node states are multiplied by the normalized attention scores and summed for each node. 

Finally, we combine neighbors embedding of node _𝑣𝑖_ through the _Multi-Head_ attention to update the representation of _𝑣𝑖_ ( _ℎ_<sup>_𝑙_</sup> _𝑖_<sup>+1</sup> ) at the successive layer ( _𝑙_ + 1) for each attention head _𝑠_ ∈ _𝑆_ . The updated representation is computed by multiplying the weighted matrix ( _𝑊𝑒𝑖𝑔ℎ𝑡_<sup>_𝑙𝑠_</sup> ) of _𝑠𝑡ℎ_ attention head at layer ( _𝑙_ ) for the representation of each connected node at the same layer ( _ℎ_<sup>_𝑙_</sup> _𝑗_<sup>)andthescaleddot-product</sup> attention (Vaswani et al., 2017) between node _𝑖_ and _𝑗_ ( _𝛼𝑖,𝑗_<sup>_𝑙𝑠_).</sup> 

##### _3.2.3. Temporal analysis module_ 

Once computed the spatial dependencies through a graph attention network, this module aims to find temporal dependencies by learning a neural network-enabled mapping function ( _𝜏_ (⋅) ∶ _𝑋_ → _𝑅_ ) to distinguish anomalies from normal data within the space generated by this function. 

Hence, we update the node’s representation ( _𝑇_<sup>_𝑙_+1</sup> ) at the layer _𝑙_ + 1 by performing the temporal convolution on two consecutive embeddings learned from the graph ( _𝐻_<sup>_𝑙_−1</sup> and _𝐻_<sup>_𝑙_</sup> ). This network is composed of three 2D Convolution Neural Network (CNN) layers through the standard convolution between the temporal representation at the previous layer ( _𝑇_<sup>_𝑙_</sup> ) and the kernel size, whose output is processed through the ReLU function. 

##### _3.2.4. Anomaly score module_ 

The last module aims to compute the anomaly score by combining reconstruction ( _𝑟𝑒𝑐_ ) and prediction ( _𝑝𝑟𝑒𝑑_ ) losses, that are computed through the Mean Squared Error (MSE) between the output of the temporal convolution and the input time window of the graph over all the possible windows ( _𝑇_ − _𝑤_ ) and a neural network model that takes the output of the temporal convolution as input. Once computed both the loss, they are combined through the _𝜆_ hyperparameter, which is used to balance the two losses ( = _𝜆_  _𝑟𝑒𝑐_ + (1 − _𝜆_ ) _𝑝𝑟𝑒𝑑_ ). 

Furthermore, threshold selection is the most relevant parameter for making the final decision on identifying anomalies in multivariate time series. As shown in Erhan et al. (2021), the most typical method for anomaly detection is based on the box plot, which is mainly on the interquartile range, while other selection strategies rely on the non-parametric method. Hence, we evaluate the following different methodology for establishing the threshold: 

1. _Median + 1.5_ × _IQR_ : The median is calculated on the validation set reconstruction error, while IQR is calculated between the 25th and 75th percentile on the reconstruction error of the validation set. 

2. _99th percentile_ : The threshold is calculated as the 99th percentile on the reconstruction error of the validation set. 

3. _Mean + 3_ × _Standard Deviation_ : Both mean and standard deviation are calculated on the reconstruction error of the validation set. 

**Table 4** 

Hyper-parameter tuning to optimize both the modules (GAT and Prediction) of the 

<u>proposed</u> approach. 

||Parameter|Range|Description|
|---|---|---|---|
|e|K|5/10/20/30|Number of nodes most similar<br>to the selected one.|
|modul|Head|2/4/8|Number of head in the attention<br>module of the graph.|
|GAT|Num layers|2/4/8|Number of multi-head attention<br>layers.|
||Hidden<br>units|25/50/100|Embedded space of each<br>attention head in the multi-head<br>attention layer.|
||Epochs|2/5/10/20|Full model training cycle on the<br>entire training dataset.|
||Learning<br>rate|0.01/0.001/0.0001|It computes the step size during<br>training function while|
|ule|||minimizing loss function.|
|ediction mod|_𝜆_|0.2/0.5/0.8|Parameter to balance the<br>relevance of two optimization<br>objectives: reconstruction and<br>prediction.|
|Pr|Prediction<br>model|MLP/LSTM/<br>GRU/BI-LSTM|Parameter to balance the<br>relevance of two optimization<br>objectives: reconstruction and<br>prediction.|
||Threshold|99_𝑡ℎ_ percentile, IQR,<br>Mean+3*std (with<br>and without POT)|It is used to discriminate if a<br>sample is anomalous or not.|



4. _Peaks Over Threshold (POT)_ (Su et al., 2019): The POT method is an approach used in the analysis of extremes to model events that exceed a certain threshold. This method is based on the theory of extremes and assumes that extremes above a certain threshold follow a distribution called the Generalized Pareto Distribution (GPD). 

##### **4. Experimental analysis** 

In this section, we describe the experimental protocol (see Section 4.1) applied on a real-world CPS – whose data characterization has been provided in Section 4.2 – for evaluating the efficiency and effectiveness of the proposed approach through the quantitative measures described in Section 4.3. 

##### _4.1. Experimental protocol_ 

The aim of the experimental analysis concerns the efficiency and effectiveness evaluation of the proposed framework in detecting different cyber-attacks. We first performed a hyperparameter optimization by tuning the ones according to the range detailed in Table 4. Once this optimization has been completed, we assessed the efficacy and efficiency of the proposed framework with respect to different baselines on a real-world dataset in terms of several metrics. 

The experimental analysis has been conducted on the SWaT dataset,<sup>2</sup> whose details about the testbed are explained in Section 4.2. The metrics used to evaluate the results are further explained in Section 4.3. 

The evaluation has been carried out on the Platform-as-a-Service (PaaS) Google Colab,<sup>3</sup> whose instance is composed of 2vCPU2.2 GHz, 13 GB RAM, and one T4 Graphical Processing Unit (GPU). The implementation of the architecture leverages TensorFlow2<sup>4</sup> and Keras.<sup>5</sup> 

> 2 https://itrust.sutd.edu.sg/itrust-labs_datasets/. 

> 3 https://colab.research.google.com. 

> 4 https://www.tensorflow.org/. 

> 5 https://keras.io/. 

5 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 

**Table 5** 

Effectiveness evaluation of the proposed framework varying K parameter. 

|K|Class|Precision|Recall|F1|
|---|---|---|---|---|
|5|0|95.69|99.44|97.52|
||1|95.39|72.12|82.14|
|10|0|**95.64**|**99.92**|**97.73**|
||1|**99.31**|**71.68**|**83.26**|
|20|0|95.72|98.84|97.25|
||1|90.94|72.49|80.67|
|30|0|95.83|98.33|97.06|
||1|87.75|73.36|79.85|



**Table 6** 

Evaluation of our framework’s efficiency while varying heads number. 

|Head|Class|Precision|Recall|F1|
|---|---|---|---|---|
|2|0|**95.64**|**99.92**|**97.73**|
||1|**99.31**|**71.68**|**83.26**|
|4|0|95.70|99.75|97.68|
||1|97.88|72.12|83.05|
|8|0|95.85|98.09|96.96|
||1|86.09|73.61|79.36|



**Table 7** 

Effectiveness evaluation of the proposed framework varying the number of layers in 

the attention <u>graph.</u> 

|Layers|Class|Precision|Recall|F1|
|---|---|---|---|---|
|2|0|**95.64**|**99.92**|**97.73**|
||1|**99.31**|**71.68**|**83.26**|
|4|0|95.68|99.75|97.67|
||1|97.88|71.99|82.96|
|8|0|94.35|99.96|97.07|
||1|99.60|62.78|77.02|



- _Precision_ : The percentage of positive predictions that are actually correct. It is calculated as the ratio of the number of True Positives ( _𝑇𝑃_ ) to the sum of _𝑇𝑃_ and False Positives ( _𝐹𝑃_ ) ( _𝑇𝑃𝑇𝑃_ + _𝐹𝑃_<sup>).</sup> 

- _Recall_ : A measure of the model’s ability to correctly identify all positive instances. It indicates the percentage of _𝑇𝑃_ that have been correctly identified among all positive instances. It is calculated as the ratio of _𝑇𝑃_ to the sum of False Negatives ( _𝐹𝑁_ ) and _𝑇𝑃_ ( _𝑇𝑃𝑇𝑃_ + _𝐹𝑁_<sup>).</sup> 

- _F1-score_ : The harmonic mean of Precision and Recall. It provides a single measure of the model quality (<sup>2×</sup> _𝑃𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛_<sup>_𝑃𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛_</sup> +<sup>×</sup> _𝑅𝑒𝑐𝑎𝑙𝑙_<sup>_𝑅𝑒𝑐𝑎𝑙𝑙_).</sup> 

- _False Positive Rate (FPR)_ : The rate of _𝐹𝑃_ among all actual negative samples, composed of True Negatives ( _𝑇𝑁_ ) and _𝐹𝑃_ ( _𝐹𝑃𝐹𝑃_ + _𝑇𝑁_<sup>).</sup> 

TensorFlow was used for example for GATs and CNN, as well as tensor computations and GPU acceleration. Keras was utilized for high-level model definition, training, and evaluation. Additionally, NetworkX<sup>6</sup> was used for graph-related computations such as edge representation, and Scikit-Learn<sup>7</sup> provided utility functions like cosine similarity for feature engineering. 

##### _4.2. Dataset characterization_ 

SWaT represents a scaled-down version of an industrial water treatment plant, composed of 6 main processes. The dataset, whose sample has 51 features, was collected over 11 days, during which the system worked 24 h a day, non-stop. The first 7 days describe the normal operation of the system, while all attacks were carried out in the following 4 days. The dataset is composed of 496.800 and 449.919 (11.98% of anomalies) samples as train and test, respectively. In this dataset, 36 attacks were generated systematically with respect to sensors and components, that can be composed of four types: 

- Single Stage Single Point Attacks (SSSP): In this case, the attack is aimed at a single point or vulnerability in the target system (26 attacks). 

- Single Stage Multi Point Attacks (SSMP): In this case, multiple points or vulnerabilities within the system are hit simultaneously or in rapid succession in a single step (4 attacks). 

- Multi Stage Single Point Attacks (MSSP): In this case, a sequence of successive actions or steps are performed, all aimed at exploiting a single vulnerability or point in the system (2 attacks). 

- Multi Stage Multi Point Attacks (MSMP): In this case, multiple phases can be used, each of which can affect different points or vulnerabilities in the system (4 attacks). 

##### _4.3. Evaluation metrics_ 

In this section, we describe how to evaluate the efficiency of the proposed approach. It is worth noting that we do not consider accuracy as a suitable measure since the dataset is highly unbalanced, as shown in Section 4.2. Hence, we consider the following measure based on the state-of-the-art analyses (Audibert et al., 2020; Ding et al., 2023): 

> 6 https://networkx.org/. 

> 7 https://scikit-learn.org/. 

##### _4.4. Hyperparameter tuning_ 

Once the experimental protocol and dataset have been presented, we provide a detailed description of the fine-tuning process undertaken to optimize the model parameters. Specifically, we assess the effectiveness of the proposed framework optimizing the hyperparameters of both its modules through a grid search described in Table 4. 

At the beginning of this procedure, we optimize the hyperparameters related to the graph-building strategy, which is the first module of the proposed framework. 

The first parameter to be optimized is the _𝐾_ value, which defines the edge number in the graph by choosing the nodes most similar to the one considered, as shown in Section 3.2.2. Table 5 shows the results obtained varying the parameter _𝐾_ according to the experimental protocol defined in Section 4.1. _𝐾_ = 10 results the best configuration for all considered metrics. 

Subsequently, we evaluate the number of independent attention heads employed in the model, detailing the results in Table 6. Table 6 shows that 2 heads achieve the highest values for all metrics. Specifically, each attention head independently calculates its own attention weights to capture different features of the data from different perspectives. 

Another important parameter is the number of layers _𝑙_ , which represents the number of multi-headed attention layers that are stacked on top of each other in the model. Specifically, each multi-headed attention layer takes as input the results of the previous layer (or the original inputs for the first layer) and applies its multi-headed attention to produce a new set of outputs that are then passed to the next layer. Stacking multiple layers of attention on top of each other should allow the model to learn more complex representations of the data.The results obtained tuning _𝑙_ are shown in Table 7. It is worth noticing that the configuration with 2 heads achieves the best results. 

Furthermore, hidden units represent the size of the output space for each attention head in the multi-head attention layer. Specifically, each attention head transforms the input into a new space with a size equal to hidden units. This is done by multiplying the input by a matrix of weights (or ‘‘kernel’’) that has dimension (input size, hidden units), where input size is the size of the input. Transforming the input into a new space of hidden units dimension allows the model to learn richer and more complex representations of the data. Table 8 shows the results 

6 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 

**Table 8** 

Effectiveness evaluation of the proposed framework varying the number of hidden units for each attention layer. 

|Hidden units|Class|Precision|Recall|F1|
|---|---|---|---|---|
|25|0|95.74|98.55|97.12|
||1|88.96|72.74|80.04|
|50|0|**95.64**|**99.92**|**97.73**|
||1|**99.31**|**71.68**|**83.26**|
|100|0|95.79|98.32|97.04|
||1|87.49|73.11|79.66|



obtained by varying the number of hidden units, highlighting that the best configuration is obtained with Hidden Units = 50. 

Summarizing, we have designed a GAT architecture built on a graph model with 10 connections (K=10) for each node, using an attention mechanism comprising two heads and two multi-head attention layers, each with 50 hidden units. 

In the next step, we investigate the training parameters (i.e. number of epochs _𝑒𝑝_ and learning rate). A single epoch refers to a complete cycle of training over the entire training dataset. The outcome of the analysis is summarized in Table 9a. The configuration with _𝑒𝑝_ = 5 – showing the best results for all metrics – is chosen. In turn, Table 9b shows the optimization results for the learning rate. It is possible to note that the model achieves the highest results for _𝐿𝑅_ = 0 _._ 001. 

In the following step we choose the artificial intelligence model to be leveraged in the prediction module (see Table 10). The following models are tested: Long Short-Term Memory (LSTM), Bidirectional Long Short-Term Memory (Bi-LSTM), Gated Recurred Unit (GRU) and Multi-layer Perceptron (MLP). MLP is also tested with different configurations for the number of layers and neurons per layer. Among all the models evaluated, the best is MLP with 3 layers (neurons per layer: [128 _,_ 64 _,_ 32]), showing the best results for all evaluation metrics. 

Successively, we optimize the _𝜆_ hyperparameter (see Table 11), which is responsible for balancing the relative importance between the two optimization objectives: reconstruction and prediction. Specifically, if the _𝜆_ value is close to 1, the reconstruction loss will weight more, and vice versa if it is close to 0. 

The last key parameter to be chosen is the threshold, which has a significant impact on the results of anomaly detection. A lower value of the threshold may lead to many _𝐹𝑃𝑠_ (i.e., normal data points misclassified as anomalies), while a higher value may result in a high number of _𝐹𝑁𝑠_ (i.e. anomalous instances misclassified as normal ones). The results have been shown in Table 12 with and without POT method, observing that choosing _𝑡ℎ𝑟𝑒𝑠ℎ𝑜𝑙𝑑_ = 99 _𝑡ℎ_ percentile results in having the best results for both methods. 

##### **5. Results** 

This section describes the outcome of the experimental analysis aimed at evaluating both efficiency and effectiveness of the proposal. 

We first compare the proposed approach w.r.t. two different types of state-of-the-art methods according to the quantitative measure described in Section 4.3: (i) three monomodal methods (i.e., AE Provotar et al., 2019, DAGMM Zong et al., 2018, and LSTM-VAE Park et al., 2018) and (ii) five multimodal methods, including MAD-GAN (Li et al., 2019), OmniAnomaly (Su et al., 2019), USAD (Audibert et al., 2020), GDN (Deng and Hooi, 2021), and MST-GAT (Ding et al., 2023). Results are shown in Table 13. 

It is worth noticing that the proposed approach achieves the highest precision score while the highest scores for the other measures are obtained by MST-GAT. Both approaches rely on the combination of spatial and temporal analysis to improve the effectiveness. Despite USAD and GDN show good precision values, they perform poorly in Recall leading to a lower F1-score. This is probably because such models focus on a single dimension of MTSs failing to capture complex relationships that are typical of the data generated in CPSs, where the subcomponents are tightly interconnected. 

With respect to MST-GAT, the proposed approach improves the precision score of 0.59% (relative increment) by integrating a correlation analysis in the graph-building procedure, exploiting the relationships between sensors. In turn, MST-GAT achieves higher performance w.r.t. our proposal in terms of recall (1.01%) and F1 (0.35%) although our approach achieves a lower value of FPR that implies a decrement of _𝐹𝑃𝑠_ of about 46.6%. 

We compare the proposed approach w.r.t. different configurations of MST-GAT to understand the main differences between the two approaches. Specifically, we consider the configuration of MST-GAT without temporal convolution (Temp), intra- and inter-modal attention modules (Modal), or attention mechanism by assigning equal weight to each neighbor (Attention) or replacing the top-K strategy with a fully connected graph. We further evaluate the proposed approach using a fully connected graph, which corresponds to removing the the correlation analysis from the graph-building process in our framework. The result of this analysis has been shown in Table 14, in which it is possible to note how integrating the fully connected graph in the proposed approach greatly decreases its performance due to noise in the connection between entities. 

Finally, we perform the efficiency evaluation of the proposed framework, analyzing both memory occupancy and training time. Specifically, the proposed approach occupies 0.65 MB of total space, where the largest contribution is given by the spatial module (0.57 MB) while the modules for Temporal Analysis and Anomaly scores employ 0.03 MB and 0.06 MB, respectively. Furthermore, Table 15 summarizes the efficiency analysis of the proposed approach comparing it with different baselines. The proposed approach reduces both training time (21.05%) for each epoch and memory occupation (77.8%) with respect to MSTGAT. Despite USAD and Omnianomaly show a lower training time, their effectiveness is worsened in terms of F1 by 5.17% and 6.44% respectively compared to the proposed approach. 

To sum up, compared to MST-GAT – which is the best baseline in terms of performance – we decrease the model complexity by reducing 

**Table 9** 

Hyperparameter optimization of the proposed approach evaluated in terms of Precision (Pre.) Recall (Rec.) and F1 measures for each class 

(C). 

|(a) Effecti<br>number o|veness of anal<br>f epochs (_Ep._).|ysis varying the|||(b) Effectiv<br>learning ra|eness of anal<br>te (LR).|ysis varying the|||
|---|---|---|---|---|---|---|---|---|---|
|Ep.|C.|Pre.|Rec.|F1|LR|C.|Pr.|Rec.|F1|
|2|0|95.40|99.21|97.27|0.01|0|95.31|99.96|97.58|
||1|93.46|70.25|80.21||1|96.39|72.38|81.80|
|5|0|**95.64**|**99.92**|**97.73**|0.001|0|**95.64**|**99.92**|**97.73**|
||1|**99.31**|**71.68**|**83.26**||1|**99.31**|**71.68**|**83.26**|
|10|0|95.79|99.42|97.57|0.0001|0|95.75|99.30|97.49|
||1|95.27|72.80|82.53||1|94.34|72.61|82.06|
|20|0|95.31|99.96|97.58||||||
||1|99.64|69.38|81.80||||||



7 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 

**Table 10** 

Effectiveness of analysis varying models in prediction module. 

|Model|Class|Precision|Recall|F1|
|---|---|---|---|---|
|MLP|0|95.65|99.31|97.44|
|512/256/128/64/32|1|94.36|71.93|81.63|
|MLP|0|95.59|99.73|97.61|
|256/128/64/32|1|97.70|71.37|82.48|
|MLP|0|**95.64**|**99.92**|**97.73**|
|128/64/32|1|**99.31**|**71.68**|**83.26**|
||0|95.34|99.96|97.59|
|LSTM|1|99.64|69.63|81.97|
||0|95.52|99.24|97.34|
|BI-LSTM|1|93.76|71.06|80.84|
||0|95.61|99.54|97.53|
|GRU|1|96.15|71.56|82.05|



**Table 11** 

Effectiveness of analysis varying the _𝜆_ parameter. 

|_𝜆_|Class|Precision|Recall|F1|
|---|---|---|---|---|
|0.2|0|95.41|99.96|97.63|
||1|99.64|70.13|82.32|
|0.5|0|**95.64**|**99.92**|**97.73**|
||1|**99.31**|**71.68**|**83.26**|
|0.8|0|95.84|98.55|97.18|
||1|89.05|73.42|80.49|



**Table 12** 

Effectiveness of analysis varying the threshold with and without POT. 

||Method|Threshold|Class|Precision|Recall|F1|
|---|---|---|---|---|---|---|
|T|99_𝑡ℎ_|104|0|**95.64**|**99.92**|**97.73**|
|PO|percentile|.|1|**99.31**|**71.68**|**83.26**|
|out|IQR|061|0|94.54|73.36|82.62|
|ith||.|1|95.87|99.32|97.56|
|W|Mean+3* standard|087|0|95.52|99.94|97.68|
||deviation|.|1|99.47|70.87|82.00|
||99_𝑡ℎ_ercentile|108|0|**95.41**|**99.96**|**97.63**|
|OT|p|.|1|**99.64**|**70.06**|**82.27**|
|h P|IQR|182|0|88.06|99.96|93.63|
|Wit||.|1|98.43|15.68|27.05|
||Mean+3* standard|182|0|87.91|99.96|93.54|
||deviation|.|1|98.30|14.43|25.17|



**Table 13** 

Effectiveness evaluation of the <u>proposed</u> approach with respect to several baselines. 

|Method|Precision|Recall|F1|FPR|
|---|---|---|---|---|
|AE|72.63|52.63|61.03|2.6994|
|DAGMM|27.46|69.52|39.37|24.9955|
|MAD-GAN|98.97|63.74|77.54|0.0903|
|LSTM-VAE|96.24|59.91|73.85|0.3186|
|OmniAnomaly|98.25|64.97|78.22|0.1575|
|USAD|98.51|66.18|79.17|0.1362|
|GDN|99.35|68.12|80.82|0.0607|
|MST-GAT|98.73|**72.41**|**83.55**|0.1267|
|**Proposed** **model**|**99.31**|71.68|83.26|0.0677|



the number of edges between nodes leveraging MTSs’ correlation. Additionally – in contrast to MST-GAT – we do not leverage VAE, leading to a further decrease in memory occupancy. This is achieved without sacrificing model performance, as we obtain comparable F1 score and Recall while slightly improving Precision. 

**Table 14** 

Effectiveness comparison of the proposed approach with and without graph building strategy and different configurations of MST-GAT. 

|Method|Precision|Recall|F1|
|---|---|---|---|
|**Proposed** **model**|**99.31**|71.68|83.26|
|MST-GAT|98.73|**72.41**|**83.55**|
|Modal|97.36|70.12|81.52|
|Temp|96.73|69.54|80.91|
|Proposed model with|96.63|67.52|79.50|
|fully connected graph||||
|Top K|91.62|65.10|76.12|
|Att|70.21|67.76|68.96|



###### **Table 15** 

Efficiency analysis of the proposed approach w.r.t. different baselines. 

|Model|Graph space|Training time/epoch|
|---|---|---|
|Proposed|**0.00248** **MB**|30 min|
|MST-Graph|0.0112 MB|38 min|
|Proposed withfully connected|0.0198 MB|45 min|
|USAD|–|**0.06** **min**|
|Omnianomaly|–|13 min|



behavior. Detecting anomalies within the data is crucial to ensuring the quality of service of the equipment and to timely identify and resolve unusual behaviors or potential problems, particularly those caused by cyber threats. 

This paper presented a novel framework using different modules to unveil spatio-temporal dependencies within CPS for identifying possible anomalies. We further proposed a novel approach for graph building to minimize the number of connections between sensors, that are abundantly present in modern infrastructure, to minimize both training time and memory occupation. We also leverage a combination of loss reconstruction and loss prediction to compute the anomaly score. The experimental analysis shows that the proposed approach reduces both the training time (21.05%) for each epoch and the memory occupation (77.8%) with respect to MST-GAT while improving detection performance by 0.59% in terms of precision. Despite USAD and Omnianomaly show a lower training time, they achieve a lower effectiveness performance, by 5.17% and 6.44%, respectively, in terms of F1 score than the proposed approach. 

Future works will be devoted to evaluating the proposed framework in other application scenarios also considering different types of attacks. In addition, we plan to extend the proposed framework by integrating analysis from network traffic data, whose outcome may be combined with the ones from sensor data through a suitable fusion strategy. 

##### **CRediT authorship contribution statement** 

**Roberto Canonico:** Writing – original draft, Validation, Software, Methodology, Investigation, Formal analysis, Data curation, Conceptualization. **Francesco Lista:** Writing – original draft, Validation, Software, Methodology, Investigation, Formal analysis, Data curation, Conceptualization. **Annalisa Navarro:** Writing – original draft, Validation, Software, Methodology, Investigation, Formal analysis, Data curation, Conceptualization. **Giancarlo Sperlí:** Writing – original draft, Validation, Software, Methodology, Investigation, Formal analysis, Data curation, Conceptualization. **Andrea Vignali:** Writing – original draft, Validation, Software, Methodology, Investigation, Formal analysis, Data curation, Conceptualization. 

##### **Declaration of competing interest** 

##### **6. Conclusion** 

Over the past decade, a significant amount of industrial equipment has been monitored using multivariate time series data to track its 

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

8 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 

##### **Acknowledgments** 

This work has been funded by the project NextGenerationEU via PNRR - DM 352 (CUP: E66G22000400009) and it was partially supported by project cyberHuman, part of the SERICS program (PE000 00014) under the MUR National Recovery and Resilience Plan funded by the European Union - NextGenerationEU. 

##### **Data availability** 

The authors do not have permission to share data. 

##### **References** 

- Audibert, J., Michiardi, P., Guyard, F., Marti, S., Zuluaga, M.A., 2020. USAd: UnSupervised anomaly detection on multivariate time series. In: Proceedings of the 26th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining. KDD ’20, Association for Computing Machinery, New York, NY, USA, pp. 3395–3404. http://dx.doi.org/10.1145/3394486.3403392. 

- Bellavista, P., Bicocchi, N., Fogli, M., Giannelli, C., Mamei, M., Picone, M., 2023. Requirements and design patterns for adaptive, autonomous, and context-aware digital twins in industry 4.0 digital factories. Comput. Ind. 149, 103918. http: //dx.doi.org/10.1016/j.compind.2023.103918. 

- Brauwers, G., Frasincar, F., 2023. A general survey on attention mechanisms in deep learning. IEEE Trans. Knowl. Data Eng. 35 (4), 3279–3298. http://dx.doi.org/10. 1109/TKDE.2021.3126456. 

- Canonico, R., Esposito, G., Navarro, A., Romano, S.P., Sperlí, G., Vignali, A., 2025a. An anomaly-based approach for cyber-physical threat detection using network and sensor data. Comput. Commun. 108087. 

- Canonico, R., Esposito, G., Navarro, A., Romano, S.P., Sperlí, G., Vignali, A., 2025b. Empowered cyber-physical systems security using both network and physical data. Comput. Secur. 104382. 

- Canonico, R., Sperlì, G., 2023. Industrial cyber-physical systems protection: A methodological review. Comput. & Secur. 135, 103531. http://dx.doi.org/10.1016/j.cose. 2023.103531. 

- Carletti, M., Terzi, M., Susto, G.A., 2023. Interpretable anomaly detection with DIFFI: Depth-based feature importance of isolation forest. Eng. Appl. Artif. Intell. 119, 105730. http://dx.doi.org/10.1016/j.engappai.2022.105730. 

- Chae, J., Lee, S., Jang, J., Hong, S., Park, K.-J., 2023. A survey and perspective on industrial cyber-physical systems (ICPS): From ICPS to AI-augmented ICPS. IEEE Trans. Ind. Cyber- Phys. Syst. 1, 257–272. http://dx.doi.org/10.1109/TICPS.2023. 3323600. 

- Chen, Z., Ma, M., Li, T., Wang, H., Li, C., 2023. Long sequence time-series forecasting with deep learning: A survey. Inf. Fusion 97, 101819. http://dx.doi.org/10.1016/ j.inffus.2023.101819. 

- Corso, G., Stark, H., Jegelka, S., Jaakkola, T., Barzilay, R., 2024. Graph neural networks. Nat. Rev. Methods Prim. 4 (1), 17. 

- Deng, A., Hooi, B., 2021. Graph neural network-based anomaly detection in multivariate time series. Proc. AAAI Conf. Artif. Intell. 35 (5), 4027–4035. http://dx.doi.org/ 10.1609/aaai.v35i5.16523. 

- Ding, C., Sun, S., Zhao, J., 2023. MST-gat: A multimodal spatial–temporal graph attention network for time series anomaly detection. Inf. Fusion 89, 527–536. http://dx.doi.org/10.1016/j.inffus.2022.08.011. 

- Erhan, L., Ndubuaku, M., Di Mauro, M., Song, W., Chen, M., Fortino, G., Bagdasar, O., Liotta, A., 2021. Smart anomaly detection in sensor systems: A multi-perspective review. Inf. Fusion 67, 64–79. http://dx.doi.org/10.1016/j.inffus.2020.10.001. 

- Goknil, A., Nguyen, P., Sen, S., Politaki, D., Niavis, H., Pedersen, K.J., Suyuthi, A., Anand, A., Ziegenbein, A., 2023. A systematic review of data quality in CPS and IoT for industry 4.0. ACM Comput. Surv. 55 (14s), http://dx.doi.org/10.1145/3593043. 

- González, G.G., Tagliafico, S.M., Fernández, A., Sena, G.G., Acuña, J., Casas, P., 2024. One model to find them all deep learning for multivariate time-series anomaly detection in mobile network data. IEEE Trans. Netw. Serv. Manag. 21 (2), 1601–1616. http://dx.doi.org/10.1109/TNSM.2023.3340146. 

- Guan, S., He, Z., Ma, S., Gao, M., 2024. Multivariate time series anomaly detection with variational autoencoder and spatial–temporal graph network. Comput. & Secur. 142, 103877. http://dx.doi.org/10.1016/j.cose.2024.103877. 

- Hasan, M.K., Habib, A.A., Shukur, Z., Ibrahim, F., Islam, S., Razzaque, M.A., 2023. Review on cyber-physical and cyber-security system in smart grid: Standards, protocols, constraints, and recommendations. J. Netw. Comput. Appl. 209, 103540. http://dx.doi.org/10.1016/j.jnca.2022.103540. 

- He, S., Li, Z., Wang, J., Xiong, N.N., 2021. Intelligent detection for key performance indicators in industrial-based cyber-physical systems. IEEE Trans. Ind. Inform. 17 (8), 5799–5809. http://dx.doi.org/10.1109/TII.2020.3036168. 

- He, S., Zhou, Y., Yang, Y., Liu, T., Zhou, Y., Li, J., Wu, T., Guan, X., 2024. Cascading failure in cyber–physical systems: A review on failure modeling and vulnerability analysis. IEEE Trans. Cybern. 1–19. http://dx.doi.org/10.1109/TCYB. 2024.3411868. 

- Huang, X., Chen, N., Deng, Z., Huang, S., 2024. Multivariate time series anomaly detection via dynamic graph attention network and informer. Appl. Intell. 1–23. http://dx.doi.org/10.1007/s10489-024-05575-y. 

- Jbair, M., Ahmad, B., Maple, C., Harrison, R., 2022. Threat modelling for industrial cyber physical systems in the era of smart manufacturing. Comput. Ind. 137, 103611. http://dx.doi.org/10.1016/j.compind.2022.103611. 

- Jiang, C., Chen, N.-Z., 2023. Graph neural networks (GNNs) based accelerated numerical simulation. Eng. Appl. Artif. Intell. 123, 106370. http://dx.doi.org/10.1016/j. engappai.2023.106370. 

- Kayan, H., Nunes, M., Rana, O., Burnap, P., Perera, C., 2022. Cybersecurity of industrial cyber-physical systems: A review. ACM Comput. Surv. 54 (11s), http://dx.doi.org/ 10.1145/3510410. 

- Kumar, R., Kela, R., Singh, S., Trujillo-Rasua, R., 2022. APT attacks on industrial control systems: A tale of three incidents. Int. J. Crit. Infrastruct. Prot. 37, 100521. http://dx.doi.org/10.1016/j.ijcip.2022.100521. 

- Li, D., Chen, D., Jin, B., Shi, L., Goh, J., Ng, S.-K., 2019. MAD-gan: Multivariate anomaly detection for time series data with generative adversarial networks. In: International Conference on Artificial Neural Networks. Springer, pp. 703–716. http://dx.doi.org/10.1007/978-3-030-30490-4_56. 

- Li, G., Jung, J.J., 2023. Deep learning for anomaly detection in multivariate time series: Approaches, applications, and challenges. Inf. Fusion 91, 93–102. http: //dx.doi.org/10.1016/j.inffus.2022.10.008. 

- Luo, Y., Xiao, Y., Cheng, L., Peng, G., Yao, D., 2021a. Deep learning-based anomaly detection in cyber-physical systems: Progress and opportunities. ACM Comput. Surv. 54 (5), 1–36. 

- Luo, Y., Xiao, Y., Cheng, L., Peng, G., Yao, D.D., 2021b. Deep learning-based anomaly detection in cyber-physical systems: Progress and opportunities. ACM Comput. Surv. 54 (5), http://dx.doi.org/10.1145/3453155. 

- Mahboubi, A., Luong, K., Aboutorab, H., Bui, H.T., Jarrad, G., Bahutair, M., Camtepe, S., Pogrebna, G., Ahmed, E., Barry, B., Gately, H., 2024. Evolving techniques in cyber threat hunting: A systematic review. J. Netw. Comput. Appl. 232, 104004. http://dx.doi.org/10.1016/j.jnca.2024.104004. 

- Miao, J., Tao, H., Xie, H., Sun, J., Cao, J., 2024. Reconstruction-based anomaly detection for multivariate time series using contrastive generative adversarial networks. Inf. Process. & Manag. 61 (1), 103569. http://dx.doi.org/10.1016/j.ipm. 2023.103569. 

- National Institute of Standards and Technology (NIST), 2025. Cybersecurity glossary. https://csrc.nist.gov/glossary. 

- Olowononi, F.O., Rawat, D.B., Liu, C., 2021. Resilient machine learning for networked cyber physical systems: A survey for machine learning security to securing machine learning for CPS. IEEE Commun. Surv. & Tutor. 23 (1), 524–552. http://dx.doi.org/ 10.1109/COMST.2020.3036778. 

- Pang, G., Shen, C., Cao, L., Hengel, A.V.D., 2021. Deep learning for anomaly detection: A review. ACM Comput. Surv. 54 (2), http://dx.doi.org/10.1145/3439950. 

- Park, D., Hoshi, Y., Kemp, C.C., 2018. A multimodal anomaly detector for robot-assisted feeding using an LSTM-based variational autoencoder. IEEE Robot. Autom. Lett. 3 (3), 1544–1551. http://dx.doi.org/10.1109/LRA.2018.2801475. 

- Provotar, O.I., Linder, Y.M., Veres, M.M., 2019. Unsupervised anomaly detection in time series using LSTM-based autoencoders. In: 2019 IEEE International Conference on Advanced Trends in Information Theory. ATIT, pp. 513–517. http://dx.doi.org/10. 1109/ATIT49449.2019.9030505. 

- Puggini, L., McLoone, S., 2018. An enhanced variable selection and isolation forest based methodology for anomaly detection with OES data. Eng. Appl. Artif. Intell. 67, 126–135. http://dx.doi.org/10.1016/j.engappai.2017.09.021. 

- Radoglou-Grammatikis, P., Kelli, V., Lagkas, T., Argyriou, V., Sarigiannidis, P., 2022a. DNP3 intrusion detection dataset. http://dx.doi.org/10.21227/s7h0-b081. 

- Radoglou-Grammatikis, P., Rompolos, K., Lagkas, T., Argyriou, V., Sarigiannidis, P., 2022b. IEC 60870-5-104 intrusion detection dataset. http://dx.doi.org/10.21227/ fj7s-f281. 

- Sartor, D., Barbariol, T., Susto, G.A., 2024. Bayesian active learning isolation forest (b-ALIF): A weakly supervised strategy for anomaly detection. Eng. Appl. Artif. Intell. 130, 107671. http://dx.doi.org/10.1016/j.engappai.2023.107671. 

- Schmidl, S., Wenig, P., Papenbrock, T., 2022. Anomaly detection in time series: a comprehensive evaluation. Proc. VLDB Endow. 15 (9), 1779–1797. http://dx.doi. org/10.14778/3538598.3538602. 

- Segovia-Ferreira, M., Rubio-Hernan, J., Cavalli, A., Garcia-Alfaro, J., 2024. A survey on cyber-resilience approaches for cyber-physical systems. ACM Comput. Surv. 56 (8), http://dx.doi.org/10.1145/3652953. 

- Su, Y., Zhao, Y., Niu, C., Liu, R., Sun, W., Pei, D., 2019. Robust anomaly detection for multivariate time series through stochastic recurrent neural network. In: Proceedings of the 25th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining. KDD ’19, Association for Computing Machinery, New York, NY, USA, pp. 2828–2837. http://dx.doi.org/10.1145/3292500.3330672. 

- Tian, Z., Zhuo, M., Liu, L., Chen, J., Zhou, S., 2023. Anomaly detection using spatial and temporal information in multivariate time series. Sci. Rep. 13 (1), 4400. 

- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, Ł., Polosukhin, I., 2017. Attention is all you need. In: Guyon, I., Luxburg, U.V., Bengio, S., Wallach, H., Fergus, R., Vishwanathan, S., Garnett, R. (Eds.), Advances in Neural Information Processing Systems. Vol. 30, Curran Associates, Inc., URL: https://proceedings.neurips.cc/paper_files/paper/2017/file/ 3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf. 

9 

_R. Canonico et al._ 

_Computers & Security 156 (2025) 104509_ 

- Wang, J., Du, W., Cao, W., Zhang, K., Wang, W., Liang, Y., Wen, Q., 2024. Deep learning for multivariate time series imputation: A survey. arXiv preprint arXiv: 2402.04059. 

- Yang, Y., Zhang, C., Zhou, T., Wen, Q., Sun, L., 2023. Dcdetector: Dual attention contrastive representation learning for time series anomaly detection. In: Proceedings of the 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining. KDD ’23, Association for Computing Machinery, New York, NY, USA, pp. 3033–3045. http://dx.doi.org/10.1145/3580305.3599295. 

- Zhang, Z., Chen, Y., Zhang, D., Qian, Y., Wang, H., 2023. Ctfnet: Long-sequence timeseries forecasting based on convolution and time–frequency analysis. IEEE Trans. Neural Netw. Learn. Syst. 1–15. http://dx.doi.org/10.1109/TNNLS.2023.3294064. 

- Zhao, H., Wang, Y., Duan, J., Huang, C., Cao, D., Tong, Y., Xu, B., Bai, J., Tong, J., Zhang, Q., 2020. Multivariate time-series anomaly detection via graph attention network. In: 2020 IEEE International Conference on Data Mining. ICDM, pp. 841–850. http://dx.doi.org/10.1109/ICDM50108.2020.00093. 

- Zhong, Z., Fan, Q., Zhang, J., Ma, M., Zhang, S., Sun, Y., Lin, Q., Zhang, Y., Pei, D., 2023. A survey of time series anomaly detection methods in the aiops domain. arXiv preprint arXiv:2308.00393. 

- Zong, B., Song, Q., Min, M.R., Cheng, W., Lumezanu, C., Cho, D., Chen, H., 2018. Deep autoencoding gaussian mixture model for unsupervised anomaly detection. In: International Conference on Learning Representations. 

**Roberto Canonico** is Associate Professor at University of Naples Federico II since 2005. He received the Laurea degree (cum laude) in Electronic Engineering from University of Naples Federico II in 1995, and a Ph.D. in Computer Engineering from the same University in 2000. In 2000, he was a visiting Research Associate at Lancaster University, UK. His current research interests include Software Defined Networking, applications of AI to networking, green networking, resource management in cloud-native network architectures. 



**Francesco Lista** obtained the Master’s degree cum laude in Computer Engineering from the University of Napoli Federico II in 2024. His research interests concern the development of a DL-based anomaly detection framework for identifying cyber-attacks in industrial cyber–physical systems. He’s currently employed in industry and his current work is focused on cybersecurity and artificial intelligence. 









**Annalisa Navarro** obtained a Master’s degree cum laude in Computer Engineering at the University of Naples Federico II in 2022. She is currently a Ph.D. student of Information Technology and Electrical Engineering at the same university after working for six months as a Research Scholar. Her current research focuses on SD-WAN traffic analysis and automation by using ML techniques. 

**Giancarlo Sperlì** is an associate professor at the Department of Electrical Engineering and Information Technology of the University of Naples Federico II. He obtained his Ph.D. in Information Technology and Electrical Engineering at the same University defending his thesis: ‘‘Multimedia Social Networks’’. He is a member of the Pattern analysis and Intelligent Computation for mUltimedia Systems (PICUS) departmental research groups. His main research interests are in the area of Cybersecurity, Semantic Analysis of Multimedia Data and Social Networks Analysis. He served as guest editor of different special issues on International Journals. Finally, he has authored about 136 publications in international journals, conference proceedings and book chapters. 

**Andrea Vignali** obtained the Master’s degree cum laude in computer engineering at University of Naples Federico II in 2022. He is currently a Ph.D. student of Information Technology and Electrical Engineering at the same university. His research focuses on Natural Language Processing techniques, anomaly detection, and cybersecurity. 

10 

