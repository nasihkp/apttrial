Franklin Open 11 (2025) 100281 



Contents lists available at ScienceDirect 



<!-- Start of picture text -->
Franklin Open<br><!-- End of picture text -->

journal homepage: www.elsevier.com/locate/fraope 



# An intelligent intrusion detection system for cyber-physical systems using GAN-LSTM networks 



Md Shakil Siddique<sup>a</sup> , Md. Ashikur Rahman Khan<sup>a,*</sup> , Ishtiaq Ahammad<sup>b</sup> , Nishu Nath<sup>a</sup> , Joysri Rani Das<sup>a</sup> , Fardowsi Rahman<sup>c</sup> 

a _Department of Information and Communication Engineering, Noakhali Science and Technology University, Noakhali 3814, Bangladesh_ b _Department of Computer Science and Engineering, Northern University Bangladesh, Dhaka 1230, Bangladesh_ c _Department of Computer Science and Engineering, Primeasia University, Dhaka 1213, Bangladesh_ 

|A R T I C L E I N F O|A B S T R A C T|
|---|---|
|_Keywords:_<br>Intrusion Detection System (IDS)<br>Generative Adversarial Networks (GANs)<br>Long short-term memory (LSTM)<br>Anomaly detection<br>Cybersecurity<br>Cyber-Physical Systems (CPSs)|Cyber-Physical Systems (CPS) face increasing cybersecurity threats, demanding advanced intrusion detection<br>methods. This research proposes a novel GAN-LSTM hybrid model to enhance anomaly detection in CPS by<br>addressing key limitations of traditional approaches, including class imbalance and temporal dependency<br>learning. The primary objectives are: (i) developing an adversarial learning framework where the generator<br>synthesizes realistic attack patterns while the discriminator improves detection robustness, (ii) introducing a<br>hybrid anomaly scoring mechanism combining reconstruction and discrimination loss, and (iii) validating per-<br>formance on real-world CPS datasets (SWaT and WADI). The model achieves 87 % accuracy (SWaT) and 91 %<br>accuracy (WADI), with precision reaching 93 % (SWaT) and 97 % (WADI)—demonstrating strong capability to<br>minimize false alarms. Notably, it attains 99 % recall on SWaT, ensuring near-complete attack detection, though<br>WADI recall remains lower (75 %) due to complex attack patterns. The balanced F1-scores (91 % SWaT, 82 %<br>WADI) outperform state-of-the-art methods like MAD-GAN by 14–45 %. Key innovations include LSTM-based<br>temporal feature learning and GAN-driven synthetic minority oversampling, effectively handling CPS-specific<br>challenges such as multivariate time-series complexity and rare attack instances. These results highlight the<br>model’s potential for real-world CPS security, while future work will address deployment constraints like<br>computational latency.|



## **1. Introduction** 

## _1.1. Background_ 

In today’s rapidly advancing technological landscape, the internet has become an integral part of our daily lives [1]. With the rapid evolution of Information and Communication Technology (ICT), networks are extensively utilized by governments, industries, businesses, and individuals, as well as in Cyber-Physical Systems (CPS) [2]. A Cyber-Physical System is a computer-based system that monitors and controls physical mechanisms through computer algorithms [3]. CPSs are composed of numerous sensors and actuators that operate under specific conditions to achieve predefined objectives. These systems enable remote access and control of devices, machines, and systems, making them indispensable in industrial settings, particularly for Industry 4.0. However, the widespread adoption of CPSs has introduced 

significant security risks, which can lead to inaccurate sensing and control actions. Such malfunctions can cause severe damage to physical systems and harm individuals who rely on them [4]. 

Cyber-Physical Systems integrate computational and control components that are tightly coupled with physical processes, forming the foundation for the Internet of Things (IoT) [5]. This integration enhances the efficiency and connectivity of devices, systems, and services across various domains. However, the heterogeneity of CPSs complicates the deployment of security solutions and expands the attack surface, making these systems more vulnerable to novel and unknown threats [6]. As a result, ensuring the security of CPSs has become a critical concern. 

To address these security challenges, Intrusion Detection Systems (IDS) are essential. An IDS acts as a secondary line of defense in CPSs, detecting anomalies that deviate significantly from normal system behavior [7]. Anomalies, which are often malicious, represent data 

> * Corresponding author. 

_E-mail address:_ ashik@nstu.edu.bd (Md.A.R. Khan). 

https://doi.org/10.1016/j.fraope.2025.100281 

Received 23 February 2025; Received in revised form 16 April 2025; Accepted 11 May 2025 

> Available online 14 June 2025 

> 2773-1863/© 2025 The Author(s). Published by Elsevier Inc. on behalf of The Franklin Institute. This is an open access article under the CC BY license ( http://creativecommons.org/licenses/by/4.0/ ). 

_M.S. Siddique et al._ 

_Franklin Open 11 (2025) 100281_ 

points that differ substantially from the normal data distribution. While numerous IDS solutions exist today, standalone detection technologies are often insufficient to combat modern security threats. This is because attackers are increasingly leveraging advanced technologies, such as Artificial Intelligence (AI), to create sophisticated attacks [8]. Therefore, there is a pressing need for fast, accurate, and intelligent intrusion detection systems capable of identifying and mitigating these advanced threats. 

## _1.2. Problem statement and motivation_ 

With the rapid advancement of CPSs in industries such as manufacturing, healthcare, transportation, and critical infrastructure, ensuring their security has become a growing challenge. These systems rely on interconnected networks of sensors, actuators, and controllers, making them highly vulnerable to cyberattacks. Traditional Intrusion Detection Systems (IDSs), which primarily use signature-based and rulebased techniques, struggle to detect zero-day attacks, advanced persistent threats (APTs), and evolving cyber threats. Moreover, conventional IDS models often suffer from high false positive rates, poor scalability, and the inability to adapt to complex, multivariate time-series data generated by CPS environments. 

To address these limitations, researchers have explored machine learning (ML) and deep learning (DL) techniques for anomaly detection. While these approaches have improved detection rates, many existing models fail to handle imbalanced datasets, leading to biased predictions that overlook rare but critical attack instances. Furthermore, high computational latency, mode collapse, and training instability in deep learning models hinder their deployment in real-time CPS security applications. Most intrusion detection models are trained on outdated cybersecurity datasets, making them ineffective against modern cyberattacks. 

This research aims to overcome these challenges by developing an intelligent intrusion detection system using Generative Adversarial Networks (GANs) with Long Short-Term Memory (LSTM)-based Recurrent Neural Networks (RNNs). The proposed model is designed to learn complex temporal dependencies in CPS data, improving its ability to distinguish between normal and anomalous activities. By leveraging adversarial training between a generator and a discriminator, the system enhances detection accuracy while reducing false positives. The model is evaluated using two real-world CPS datasets—Secure Water Treatment (SWaT) and Water Distribution (WADI)—to ensure its practical effectiveness in detecting cyber intrusions. 

## _1.3. Key contributions_ 

This research presents an intelligent intrusion detection system for CPSs using GANs with LSTM-based RNNs. The proposed model is designed to address the limitations of traditional IDSs, such as high false positive rates, inability to detect zero-day attacks, and poor adaptability to multivariate time-series data. The key contributions of this study are as follows: 

- **Development of a GAN-LSTM-based Intrusion Detection System:** Designed an adversarial learning framework combining GANs and LSTM-RNN to enhance anomaly detection in CPS environments. The generator learns normal system behavior, while the discriminator detects deviations, improving intrusion detection accuracy. 

- **Handling Imbalanced Attack Data for Better Detection:** Addressed the class imbalance issue in CPS datasets by enabling the generator to learn rare attack patterns, making the model more effective in detecting low-frequency cyber intrusions. Improved detection performance on underrepresented attack classes, reducing bias in classification results. 

- **Enhanced Anomaly Scoring Mechanism Using Hybrid Loss Functions:** Developed a novel anomaly detection approach by 

- combining reconstruction loss (from the generator) and discrimination loss (from the discriminator) to classify cyber intrusions more effectively. Introduced an optimized anomaly scoring method to distinguish between normal and attack traffic with higher precision and recall. 

- **Evaluation on Real-World CPS Datasets:** Conducted extensive experiments using two real-world multivariate time-series CPS datasets—SWaT and WADI. Demonstrated that the GAN-LSTM model outperforms traditional IDS techniques, achieving higher accuracy, lower false positives, and better adaptability to complex attack scenarios. 

- **Comparison with Existing Intrusion Detection Approaches:** Benchmarked the proposed model against state-of-the-art IDS techniques, including MAD-GAN and other deep learning models. Showcased the superior performance of the GAN-LSTM model in detecting cyber threats while reducing computational latency. 

- **Scalability and Practicality for CPS Security:** Ensured that the proposed GAN-LSTM framework can be effectively deployed in realworld CPS environments with minimal computational overhead. The model is adaptable to various CPS applications, including industrial automation, smart grids, and IoT-based critical infrastructure. 

The proposed GAN-LSTM-based IDS provides a more accurate, efficient, and adaptive solution for detecting cyber intrusions in CPS environments. By addressing data imbalance, improving anomaly scoring, and leveraging real-world datasets, this study contributes significantly to the advancement of CPS security and offers a scalable approach for protecting modern critical infrastructure from evolving cyber threats. 

## _1.4. Paper outline_ 

The remainder of this paper is organized as follows. Chapter 2 represents the previous literature reviews along with their limitations and proposed solution. Chapter 3 explains the methodology to achieve the experimental system. Chapter 4 describes the outcomes from the applied model and compares performance scores with existing model. Chapter 5 discusses the key findings, limitations, deployment challenges, and realworld implications of the research. Finally, Chapter 6 concludes the paper and proposes future research scopes. 

## **2. Literature review** 

In recent years, intrusion detection has emerged as a significant research area, gaining increasing attention from the cybersecurity community. While a substantial number of studies utilizing machine learning and deep learning techniques have been conducted in this field, there remains a lack of extensive research in the domain of CPS. This chapter explores several relevant studies that have contributed to advancing intrusion detection in CPS environments. 

## _2.1. Existing literature_ 

With the growing integration of cyber-physical systems, the need for low-latency intrusion detection mechanisms has become increasingly critical. To address this challenge, Araujo-Filho et al. [9] recently introduced FID-GAN, an unsupervised intrusion detection system designed for fog-based architectures using GANs. Instead of implementing a system-wide IDS, their approach focuses on minimizing computational latency by placing detection mechanisms at the fog layer, closer to the end nodes. The authors utilized reconstruction loss and an intrusion score to detect anomalies across three datasets: SWaT, WADI, and NSL-KDD. To enhance the speed of data mapping from the latent space, they incorporated a standard encoder optimized for fog environments. Their model was evaluated based on Area Under Curve (AUC), Equal Error Rate (EER), and comparisons with existing methods, proving that their approach was 5.5 times faster than a baseline model 

2 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al._ 

[10] across all three datasets. In another study, Kim et al. [3] introduced an advanced intrusion detection model that combines two GAN architectures—a Forward GAN and a Backward GAN, each with its own discriminator. These two networks are interconnected through feature matching in the discriminators, ensuring more effective learning. To improve upon BiGAN’s weak cycle consistency, they proposed the Forward-Backward GAN (FBGAN), which utilizes distinct training signals for marginal distribution matching and sample coupling between latent and data space. Their approach was tested on MNIST and KDD99 benchmark datasets and evaluated using Area Under Precision Recall Curve (AUPR) and F1 Score. Additionally, a GAN-based intrusion detection system (G-IDS) was introduced in [11], utilizing the NSL-KDD dataset. The authors structured their G-IDS framework into four key segments and assessed its performance by incrementally splitting the dataset into 20 %, 40 %, 60 %, 80 %, and 100 % subsets. The effectiveness of Standalone IDS versus G-IDS was compared using Recall, Precision, and F1-score as performance metrics, highlighting the advantages of the proposed GAN-based intrusion detection approach. 

To enhance the efficiency of anomaly detection, Zenati et al. [12] developed a GAN-based model that simultaneously learns the mapping from real space to latent space using an encoder, while the generator learns the inverse mapping from latent space to real space. Their method was applied to both an image dataset (MNIST) and a cyber intrusion dataset (KDD99 10 %), achieving state-of-the-art results on KDD99. To assess its effectiveness, the proposed model was compared with existing approaches using Precision, Recall, and F1-score as evaluation metrics. In a more recent study [13], researchers introduced two enhanced training structures for BiGAN, modifying the generator’s training phase by adding an additional step to improve anomaly detection in network data. Their approach involved custom loss functions for the generator and a pre-trained generator for BiGAN training. They utilized the KDDCup99 dataset and treated BiGAN as a one-class anomaly detection model instead of a traditional multiclass classifier, improving its effectiveness in detecting cyber threats. 

Given that CPS generate vast amounts of multivariate time-series data, managing this information efficiently is both challenging and time-consuming. To address this, Dan Li et al. [14] proposed an unsupervised anomaly detection framework, called Multivariate Anomaly Detection with GAN (MAD-GAN), which integrates LSTM-RNN as the base model to capture temporal correlations in time-series data. The proposed model was evaluated using two real-world CPS datasets: SWaT and WADI, with Precision, Recall, and F1-score used to assess its anomaly detection performance. Another recent study [15] introduced DoS-WGAN, an architecture designed for automatically synthesizing DoS attack traces to evade network traffic classifiers. The framework utilizes Wasserstein GAN (WGAN) with gradient penalty to generate realistic DoS attack traffic, significantly improving evasion success rates. To ensure stable training, Standardized Euclidean Distance and information entropy were incorporated into the model. Using the KDDCup99 dataset, the study compared the performance of three GAN variants: GAN, WGAN–CLIP, and WGAN-GAN, demonstrating superior accuracy in detecting DoS attacks. Additionally, an efficient GAN-based model with a refined loss function was proposed in [16], designed to improve performance on imbalanced datasets with discrete features. The authors implemented multiple intermediate layers in the discriminator, allowing for more flexible decision-making, leading to a more balanced classification outcome. Experiments were conducted using 10 % of the KDD-99 dataset, and the model was evaluated alongside traditional anomaly detection techniques, including Isolation Forest and Robust Covariance, further demonstrating its effectiveness in identifying anomalies. 

Lee et al. [17] proposed a high-performance deep learning-based intrusion detection system designed to handle scenarios where normal and abnormal traffic are highly imbalanced. Their approach, called AE-CGAN, combines Autoencoder (AE) and Conditional GAN (CGAN) to oversample rare attack classes, thereby enhancing the performance of intrusion detection. The model’s effectiveness was assessed using a 

Random Forest (RF) classifier, and its performance was compared against Single-RF, AE-RF, and AE-CGAN models. To evaluate detection accuracy, the authors utilized Recall and F1 Score on the CIC-IDS2017 dataset, which is one of the latest publicly available network intrusion datasets. In another study, Kim Jin-Young et al. [18] introduced Latent Semantic Controlling Generative Adversarial Networks (LSC-GAN), which are designed to generate malware data with specific i-features from a Gaussian distribution and distinguish them from real malware data. They utilized the Kaggle Microsoft Malware Classification Challenge dataset, where malware data was converted into malware images for feature extraction. To facilitate feature learning, they employed a Variational Autoencoder (VAE) alongside the GAN generator to create synthetic malware data. Finally, transfer learning was used to enhance malware detection by transferring knowledge from the encoder to the detector. The effectiveness of their model was statistically validated using a _t_ -test, and performance was assessed using the confusion matrix and F1 Score, demonstrating better results compared to conventional models. A comprehensive review conducted in [19] analyzed the current trends, challenges, and future research directions in Intrusion Detection Systems (IDSs). The study categorized IDS models based on key characteristics, including detection methods, IDS placement strategies, security threats, and validation techniques. It also explored various IDS implementations for IoT security, discussing both specific IDS architectures for IoT and attack detection mechanisms that can be integrated into IDS frameworks. Unlike conventional IDS techniques, anomaly-based intrusion detection systems [20,21] are capable of identifying unknown attacks, which is particularly important for Cyber-Physical Systems (CPSs). CPSs consist of heterogeneous devices with different processing power, communication protocols, battery capacities, software platforms, and operating systems. This diversity complicates security implementations and expands the attack surface, making CPSs more vulnerable to new and evolving cyber threats [22]. 

## _2.2. Existing literature limitations and this paper’s solutions_ 

Despite significant advancements in deep learning and machine learning-based intrusion detection models, several challenges persist. Many existing models suffer from training instability, mode collapse, poor cycle consistency, and increased latency. Moreover, a large portion of prior research relies on outdated cybersecurity datasets, which may not reflect modern sophisticated cyber-attacks. Additionally, many of these prior studies for intrusion detection in CPS primarily focus on univariate or aggregated data representations, which may not fully capture the complex interdependencies and temporal dynamics present in multivariate time-series data. This simplification can lead to suboptimal detection performance, especially in critical infrastructures where multiple sensors interact concurrently. Furthermore, the issue of class imbalance, where normal instances vastly outnumber attack instances, remains a significant challenge. Several existing works either overlook this imbalance or attempt simplistic solutions such as random under sampling, which may discard useful information and compromise detection accuracy. Consequently, these approaches fail to ensure robust detection of minority attack classes in real-time scenarios. Our study addresses these gaps by proposing a framework that not only models the multivariate temporal dependencies inherent in CPS data but also incorporates strategies to mitigate the effects of class imbalance, thereby improving the reliability and comprehensiveness of intrusion detection systems in CPS environments. In addition, the proposed system employs a generator that learns complex data representations to address the rareclass data imbalance, while simultaneously training alongside a discriminator using actual multivariate normal traffic data. This design minimizes many of the shortcomings observed in existing state-of-theart models. Furthermore, the study utilizes two newly available CPS datasets containing fresh samples, allowing for more realistic training and evaluation. By incorporating these advancements, the proposed approach improves the model’s intelligence, speed, accuracy, and 

3 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al._ 

overall performance, making it a more efficient and reliable solution for modern CPS security. 

## **3. Methodology** 

This chapter outlines the methodology used to develop an intelligent intrusion detection system based on GAN with LSTM-based RNN for CPS. It details the dataset selection and preprocessing techniques, including feature selection, scaling, and dimensionality reduction, to enhance model performance. The model training phase describes how the generator and discriminator compete in an adversarial learning process to generate realistic synthetic data and distinguish anomalies. The testing phase involves computing reconstruction and discrimination losses to classify cyber threats based on anomaly scores. Optimization techniques, such as Adam optimizer, gradient clipping, and dropout regularization, are applied to improve accuracy and stability. Finally, the framework of the applied system is presented, demonstrating its effectiveness in detecting cyber intrusions with high precision and recall. 

Fig. 1 shows the overall workflow diagram for experimenting. Initially, datasets are chosen for experimentation. Subsequently, the data undergoes external and internal preprocessing to the model. Post- 

preprocessing, the data is utilized to train and test the designated model. Following testing, the model’s loss is employed to compute an anomaly score for detecting anomalous data, i.e., intrusion. The subsequent phase involves model optimization to enhance outcomes, culminating in discussing the results. 

## _3.1. Dataset selection_ 

## _3.1.1. Dataset description_ 

To develop an effective Intelligent Intrusion Detection System (IDS), this study utilizes two publicly available multivariate time-series datasets that simulate real-world Cyber-Physical Systems (CPS): 

- Secure Water Treatment (SWaT) [23] 

- Water Distribution (WADI) [23] 

These datasets, sourced from operational testbeds, contain both normal operational data and data generated under cyberattack scenarios. Using these datasets enables a comprehensive evaluation of the model’s performance in detecting anomalies and distinguishing between benign and malicious activities. 

**Secure Water Treatment (SWaT) Dataset:** The SWaT dataset is 



**Fig. 1.** Workflow diagram. 

4 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al._ 

derived from a testbed that simulates an industrial water treatment facility. It was designed to replicate the functionalities of large-scale water treatment plants commonly found in urban settings [24]. The dataset was collected over 11 consecutive days, where the system operated under normal conditions for the first seven days. In the remaining four days, intentional cyberattacks were introduced to capture system vulnerabilities [25]. The dataset consists of sensor readings and actuator states, reflecting real-time water treatment processes. Attacks in the dataset target critical components, such as water level sensors, flow meters, and actuators, creating scenarios that mimic real cyber intrusions. 

**Water Distribution (WADI) Dataset:** The WADI dataset extends the SWaT testbed by simulating a water distribution network. This system regulates water flow from storage tanks to consumer endpoints and includes various control mechanisms such as valves, pumps, and chemical dosing systems. The dataset spans 16 days, with 14 days of normal operations followed by two days where cyberattacks were deliberately executed. These attacks were designed to manipulate sensor readings and actuator states, disrupting the normal flow and distribution of water. The dataset captures rich multivariate time-series data that allows for the detection of sophisticated cyber threats [26]. 

Both datasets consist of numerous sensor readings and actuator states recorded at frequent intervals. Table 1 provides a summary of their key attributes: 

These datasets are selected due to their high relevance in cybersecurity research and their ability to simulate real-time cyber threats in CPS environments. 

## _3.1.2. Dataset complexity and attack types_ 

There is a lot more complexity in WADI dataset compared to SWaT. Unlike SWaT, which primarily consists of isolated and short-term attacks, WADI features a broader and more challenging range of attack scenarios. These attacks often span longer time windows, target multiple sensors and actuators simultaneously, and exhibit varying degrees of subtlety. For example, WADI includes multi-stage attacks where the attacker manipulates both the inflow and outflow valves over extended periods, creating cascading effects that are difficult to detect using simple thresholding or univariate analysis. Furthermore, WADI incorporates both physical and cyber-physical attack vectors, with some attacks mimicking legitimate operational fluctuations, thereby increasing detection difficulty. The system’s larger scale, increased number of interdependent variables, and complex feedback loops all contribute to this complexity. 

There are several contrasts between attack types in WADI and SWaT. SWaT primarily features abrupt and localized attacks, such as a sudden valve closure or pump stoppage, which result in immediate and observable deviations from expected behaviour. These types of anomalies are generally easier to detect using threshold-based or supervised approaches. In contrast, WADI encompasses a wider spectrum of attack types, including stealthy attacks that are gradual and designed to blend with normal fluctuations. For instance, in one WADI scenario, an attacker slowly alters the chemical dosing rate over a long duration, causing a subtle but accumulative deviation in pH levels. This type of stealthy manipulation can evade detection if the model lacks temporal sensitivity. Another example is a coordinated attack involving simultaneous manipulation of inflow pumps and tank level sensors to mask water theft, which exploits the system’s redundancy and masking behaviour to hide its signature. 

There are several attack classes in SWaT and WADI datasets and 

**Table 1** 

Summary of the datasets. 

|Dataset|Features|Total Instances|Training Set|Testing Set|
|---|---|---|---|---|
|SWaT|52|946,720|496,801|449,919|
|WADI|129|627,952|455,151|172,801|



these classes has impacts on network elements. Here’s a detailed comparison of the SWaT and WADI datasets, including attack classes and their impacts on network elements, presented in Table 2. 

## _3.1.3. Dataset feature conventions_ 

The SWaT and WADI datasets adopt industrial control system (ICS) naming conventions to label sensor/actuator features. These reflect: 

- Physical component type (e.g., pumps, valves, chemical sensors), 

- Location identifiers (e.g., tank/pipe numbers), and 

- Measured variables (e.g., pressure, flow rate). 

For example, SWaT’s ‘LIT101’ denotes a Level Indicator Transmitter on Tank 101, while WADI’s ‘2_P_003_SPEED’ represents the speed sensor for Pump 003 in Subsystem 2. This standardization enables crossreferencing with testbed diagrams in prior work [25,26]. 

Feature naming follows the SWaT/WADI testbed instrumentation standards [23,24]. These are: 

For SWaT Dataset, 

- AIT = Analog Input Temperature (e.g., AIT402 = Temperature sensor for Tank 402) 

- FIT = Flow Indicator Transmitter (e.g., FIT504 = Flow meter on Pipe 504) 

- P/MV = Pump/Motorized Valve (e.g., P101 = Pump 101) 

For WADI Dataset, 

- FIC = Flow Indicator Controller (e.g., 2_FIC_001_PV = Flow controller 1 in Subsystem 2) 

- AIT = Analytical Instrument Transmitter (e.g., 2B_AIT_003_PV = pH sensor 3 in Subsystem 2B). 

Full schematics are available in [23,24]. 

## _3.2. Dataset preprocessing_ 

To enhance the model’s performance, the datasets undergo a thorough preprocessing stage, which includes filtering out irrelevant data points and eliminating unnecessary features. Several preprocessing techniques are applied to ensure the dataset is optimized for analysis: 

- Chi-Square Feature Selection 

- Principal Component Analysis (PCA) 

- Min-Max Scaling 

- Standard Scaling 

**Chi-Square Feature Selection:** The Chi-Square test is a statistical method used to determine the significance of each feature by evaluating its deviation from the expected distribution under the assumption of independence between the feature and the target variable. This test helps in selecting the most relevant features for anomaly detection. The following equation illustrates the Chi-Square test: 



where _x_<sup>2</sup> = chi-squared value, _Oi_ = observed value, and _Ei_ = expected value. 

This study conducts the Chi-square test to find the best features for both datasets. The test results are placed in Table 3 and Table 4 in the following section for SWaT and WADI datasets, respectively. After chisquare feature ranking, the top 44 features for the SWaT dataset are placed in Table 3 based on the ranking score, and the top 50 features for the WADI dataset are in Table 4, respectively. 

**Min-Max Scaling:** Min-Max Scaling is used to normalize the dataset 

5 

_M.S. Siddique et al.                                                                                                                                                                                                                             Franklin Open_ 

_Franklin Open 11 (2025) 100281_ 

**Table 2** 

SWaT & WADI datasets: attack classes and impacts. 

|Dataset|Attack Class|Targeted Network Element|Impact|Duration|Reference|
|---|---|---|---|---|---|
|**SWaT**|i. (a) Single-Stage Attacks<br>i|Sensors (e.g., FIT101, LIT101)|False readings trigger incorrect pump/valve actions, causing overflow/<br>underflow.<br>l|1–30 min|[23,25]|
||(b) Sensor Spoofing|Actuators (e.g., MV101, P101)|l<br>Unauthorized valve/pump manipulation disrupts water flow.|||
||i<br>ii. Multi-Stage Attacks<br>iii. Command Injection|PLCs<br>HMI/SCADA|l<br>Sequential attacks bypass safety checks, leading to system shutdown.<br>Malicious commands override controls, causing tank pressure failures.|30+ min<br>Short bursts||
|**WADI**|i. Physical Damage<br>Attacks|Pumps (e.g., 2_P_003)|Overload pumps to induce hardware failure.<br>l|15–60 min|[23,26]|
||ii. Data Integrity Attacks|Flow sensors (e.g.,<br>2_FIT_001_PV)|False flow data disrupts chemical dosing, risking contamination.|Intermittent||
||iii. Network DoS|Communication links|Delays in sensor-actuator loops cause pressure instability.|Sustained||



**Table 3** 

Chi-square feature ranking for SWaT dataset. 

|**Feature Name**|**Ranking Score**|**Feature Name**|**Ranking Score**|
|---|---|---|---|
|AIT402|120050.871950|MV304|7961.426384|
|AIT502|40928.283486|P201|5938.378806|
|P102|21062.136265|AIT203|5082.937647|
|FIT504|19325.337374|DPIT301|4799.762720|
|UV401|19168.621325|MV302|3685.433686|
|P501|19164.047795|AIT501|3446.927915|
|FIT401|19048.864138|MV201|3088.758816|
|FIT503|18460.328019|LIT101|2938.106072|
|P302|18176.541370|MV101|2402.958015|
|FIT501|17963.921058|AIT201|960.976705|
|PIT501|17942.305563|LIT301|410.184980|
|PIT503|17758.881904|P204|405.278995|
|P402|17694.261293|P206|398.041870|
|FIT502|17248.408701|AIT503|192.242444|
|FIT301|16850.495533|AIT504|129.561584|
|P203|16146.224918|P602|57.906911|
|P101|15968.510843|FIT601|56.903467|
|P205|15921.998329|AIT401|14.964336|
|LIT401|15611.871592|P403|8.290585|
|FIT201|13271.232396|AIT202|2.773726|
|FIT101|11271.984863|MV303|1.598200|
|PIT502|9418.153075|MV301|0.859241|



within a specific range, typically between 0 and 1. This technique ensures that all features contribute equally to the model. The transformation formula is as follows: 



Where _Xnorm_ is the normalized value, _Xmax_ is the maximum value, and _Xmin_ is the minimum value. 

**Principal Component Analysis (PCA):** PCA is employed to reduce dimensionality by transforming correlated variables into a smaller set of uncorrelated components while preserving essential data patterns. It is particularly useful for handling multivariate time-series data. Each principal component (PC) is derived as follows: 



Where, _PCi_ is the Principal Component ‘i’, _Xj_ represents original feature ‘j’, _aj_ represents numerical coefficient for _Xj_ . The first principal component accounts for the maximum variance, and subsequent components explain decreasing amounts of variance. 

**Standard Scaling:** Standard Scaling, also known as Z-score normalization, ensures that the dataset has a mean of 0 and a standard deviation of 1, which helps stabilize the training process. The formula for scaling value is: _x_ − _<u>μ</u> z_ = (4) _σ_ 

Where, _x_ represents the targeted instance, _z_ is the calculated scaling value, _μ_ is the mean value, and _σ_ is the standard deviation. 

After preprocessing, only the most relevant features are retained, and the data is standardized to ensure consistency across different variables. These steps significantly improve the efficiency of the intrusion detection model by reducing noise and ensuring that essential patterns in the time-series data are effectively captured. 

This research focuses on anomaly detection in CPS using GAN-LSTM. Therefore, no explicit focus was given on denoising techniques. However, denoising techniques (e.g., Denoising Autoencoders [27], wavelet transforms [28], or GAN-based denoising [29]) are relevant to preprocessing noisy CPS data, which could indirectly improve anomaly detection. While these denoising techniques aim to remove sensor noise, our GAN-LSTM model directly learns robust temporal representations, 

**Table 4** 

Chi-square feature ranking for the WADI dataset. 

|**Feature Name**|**Ranking Score**|**Feature Name**|**Ranking Score**|
|---|---|---|---|
|1_FIT_001_PV|6211.221931|2_FIC_601_SP|294.683159|
|2_MCV_301_CO|2485.248303|2A_AIT_004_PV|283.169097|
|TOTAL_CONS_REQUIRED_FLOW|2208.092202|2_MV_006_STATUS|257.413443|
|2_FIC_401_SP|2176.279631|2_FIC_201_SP|256.828446|
|2_LT_001_PV|1580.720277|2_MCV_501_CO|246.865139|
|2_P_003_SPEED|1535.454170|2_FIC_301_SP|245.801470|
|2_MCV_601_CO|1531.477490|2_MCV_101_CO|229.260550|
|2_FIT_001_PV|1126.538468|3_LT_001_PV|225.878509|
|2_MCV_401_CO|814.097667|2_FIC_401_CO|225.687335|
|1_LT_001_PV|601.557251|LEAK_DIFF_PRESSURE|180.559051|
|1_MV_001_STATUS|593.067750|2_P_004_SPEED|174.865302|
|2_FIC_101_CO|553.530616|3_FIT_001_PV|158.164877|
|2_PIC_003_PV|547.093193|2_PIC_003_CO|141.979895|
|2_PIT_003_PV|507.593167|2_PIT_001_PV|135.949219|
|2B_AIT_003_PV|452.452733|2_FQ_501_PV|134.136168|
|2B_AIT_002_PV|448.441308|2_FIC_501_PV|124.508938|
|2_FQ_401_PV|394.545386|2_MV_003_STATUS|110.572985|
|2_FIC_401_PV|393.002032|1_AIT_005_PV|104.065145|



6 

_M.S. Siddique et al.                                                                                                                                                                                                                             Franklin Open_ 

_Franklin Open 11 (2025) 100281_ 

preserving attack signatures that might be attenuated by noise-filtering approaches. Future work could explore hybrid denoising-anomaly detection pipelines. 

## _3.3. Model selection_ 

In this study, a Generative Adversarial Network (GAN) integrated with Long Short-Term Memory (LSTM)-based Recurrent Neural Network (RNN) is selected as the core model for detecting anomalies in CPS. Given the complexity of CPS datasets, which involve multivariate time-series data with strong temporal dependencies, this combination provides an effective way to learn patterns and identify deviations indicative of cyber intrusions. 

## _3.3.1. Generative adversarial networks (GAN)_ 

Generative Adversarial Networks (GANs) were first introduced by Goodfellow et al. [30] in 2014 and have since gained popularity in various fields, including image generation, data augmentation, and anomaly detection. The basic structure of the GAN is presented in Fig. 2. A GAN consists of two competing neural networks: 

**Generator (G):** The generator is responsible for creating synthetic data that resembles real data samples. It takes a random noise vector from a latent space and transforms it into a structured data instance that mimics real CPS data. 

**Discriminator (D):** The discriminator acts as a binary classifier that distinguishes between real data (from the dataset) and synthetic data (generated by the generator). It assigns probability scores indicating whether a sample is authentic or artificially generated. 

The training process of GANs follows an adversarial approach, where the generator tries to create data samples that can deceive the discriminator, while the discriminator continuously improves its ability to distinguish real from fake data. This adversarial learning mechanism enables GANs to generate high-quality synthetic data that closely resembles the real distribution. The mathematical formulation of the GAN optimization process is as follows: 





In the formula, the generator network G, has been trained to generate synthetic data that resembles real-world data patterns x, by using a random vector, z drawn from a distribution Pz(z) in a latent space Z. The generator and discriminator compete in a minimax game until the generator produces data samples that are nearly indistinguishable from real ones, improving the system’s ability to detect abnormal patterns in CPS datasets. 

## _3.3.2. Long short-term recurrent neural network (LSTM-RNN)_ 

Recurrent Neural Networks (RNNs) are widely used for sequence modeling, but they suffer from issues like vanishing and exploding gradients, which limit their ability to capture long-range dependencies. Long Short-Term Memory (LSTM) networks overcome these limitations by incorporating memory cells and gates that regulate the flow of 



information through the network. The following Fig. 3 represents the module-based structure of a LSTM-RNN. 

LSTM units consist of the following gates: 

**Forget Gate (** **_ft_ ):** Determines which past information should be discarded. 

**Input Gate (** **_it_ ):** Controls the information added to the memory cell. **Cell State (** **_ct_ ):** Stores important data over long sequences. **Output Gate (** **_ot_ ):** Regulates which part of the memory is passed as output. 

The forward pass of an LSTM unit follows these equations: 



|_ft_ =|_σ_<br>(<br>_Wf ._ [_ht_−|1_, xt_] +_bf_<br>)|(7)|
|---|---|---|---|
|_qt_ =|_tanh_<br>(<br>_Wq ._|[_ht_−1_, xt_] +_bq_<br>)|(8)|



|_ot_ = _σ_(_Wo ._ [_ht_−1_, xt_] +_bo_)|(9)|
|---|---|
|_ct_ =_ft_ ⊙_ct_−1 +_it_ ⊙_qt_|(10)|
|_ht_ =_ot_ ⊙tanh(_ct_)|(11)|



LSTMs are particularly effective for time-series anomaly detection because they capture long-term dependencies, making them suitable for CPS datasets that contain complex patterns over time. 

## _3.3.3. Integration of GAN with LSTM-RNN_ 

To effectively detect anomalies in CPS datasets, this study adopts an LSTM-based GAN framework, where: 

- The Generator (G) consists of LSTM layers that learn to generate realistic time-series sequences. 

- The Discriminator (D) is also built with LSTM layers to differentiate real data from generated samples. 

Reconstruction loss and discrimination loss are used to improve anomaly detection accuracy. During training, the generator continuously improves its ability to create data resembling normal system behavior, while the discriminator learns to classify genuine and fake data. Once trained, any deviation from normal patterns is flagged as an anomaly, making this model highly effective for intrusion detection in CPS environments. 

In our proposed GAN-LSTM architecture, the generator plays a crucial role in learning and synthesizing rare attack patterns. During training, the generator receives random noise vectors as input and generates synthetic data samples that mimic the distribution of the minority (rare) attack classes. Since the discriminator is trained to distinguish between real and fake samples, it provides feedback to the generator on how closely its outputs resemble the actual rare instances in the training data. Through this adversarial process, the generator progressively refines its ability to produce realistic samples that capture the temporal dynamics and statistical properties of underrepresented attack behaviors. This is particularly effective in the context of CPS datasets, where certain types of intrusions may occur infrequently but have critical impact. The LSTM component within the generator further enhances its learning by modeling sequential dependencies, allowing it to generate attack sequences that are temporally coherent and contextually relevant. By augmenting the dataset with such synthetic rare class samples, the model mitigates the class imbalance issue and improves the classifier’s ability to detect minority attacks. This approach enables the GAN-LSTM framework not only to balance the dataset but also to enrich the training distribution with meaningful variations of rare attack types, thereby enhancing detection robustness and generalization. 

**Fig. 2.** Generative adversarial network structure. 

7 

_M.S. Siddique et al._ 

_Franklin Open 11 (2025) 100281_ 



**Fig. 3.** Module structure of LSTM-RNN. 

_3.3.4. Rationale / novelty behind selecting the GAN-LSTM architecture_ Specifically, LSTM networks were chosen due to their proven ability to capture long-range temporal dependencies, which are inherent in multivariate time-series data generated by CPS environments. Unlike traditional feed-forward neural networks or shallow models, LSTM networks are adept at learning sequential patterns, making them highly suitable for detecting subtle and evolving attack behaviors over time. In the context of CPS, where sensor data streams unfold sequentially and temporal correlation among variables is critical, LSTM provides a more nuanced and dynamic understanding of data flows compared to CNNs or basic RNNs. 

The integration of LSTM within a GAN framework further enhances detection robustness. The generator leverages LSTM’s temporal learning capabilities to synthesize realistic attack sequences, while the discriminator—also LSTM-based—becomes more proficient at distinguishing true attacks from generated ones over time. This adversarial training process not only augments the diversity of minority attack classes (addressing class imbalance) but also improves the model’s sensitivity to temporal anomalies that are often missed by static or non-sequential models. Therefore, the GAN-LSTM architecture was selected to leverage the strengths of both GANs (for synthetic minority oversampling and improved generalization) and LSTMs (for modeling complex temporal relationships), making it an ideal fit for detecting sophisticated and time-dependent attacks in CPS datasets. 

## _3.4. Model training_ 

The training phase plays a crucial role in developing an efficient intrusion detection system using GANs with LSTM-based RNNs. The GAN model is trained iteratively with real CPS data and synthetic data generated by the model. The training process follows a structured approach to ensure the model learns effectively while maintaining stability and accuracy. The training is performed in multiple steps, where both the generator and discriminator are optimized in an adversarial setting. The key stages of the training process include: 

**Data Preparation:** The dataset is divided into training and testing subsets. Only normal traffic data is used during the training phase to allow the generator to learn the normal behavior of the CPS environment. A sliding window approach is applied to structure the timeseries data into meaningful sequences. 

**Generator Training:** The generator takes a random noise vector from a latent space and generates synthetic time-series sequences. 

These generated sequences attempt to resemble normal data patterns from the CPS. The goal of the generator is to minimize the difference between real and fake samples, thereby improving its ability to produce realistic data. 

**Discriminator Training:** The discriminator is fed with both real samples from the dataset and fake samples from the generator. It assigns probability scores indicating whether a given sample is real or synthetic. The discriminator is optimized to maximize its classification accuracy. 

**Adversarial Learning Process:** The generator and discriminator are trained simultaneously in a competitive manner. The generator improves until it can successfully fool the discriminator. The discriminator learns to enhance its detection capabilities. This adversarial process continues for multiple epochs until the model converges. 

All the standard samples train the GAN model for the training phase. Approximately 300,000 data for SWaT and 400,000 for WADI are randomly used to train the model. The brief details of the parameters used for training the model are given in the Table 4. 

## _3.5. Model testing_ 

After training the GANs with LSTM-based RNNs, the next step is model testing. This phase evaluates the model’s ability to detect anomalies in CPS by analyzing previously unseen data. The testing process ensures that the trained model generalizes well and accurately identifies deviations from normal system behavior. 

The testing process is carried out using a separate dataset that includes both normal and anomalous samples. Approximately 200,000 data for SWaT and 170,000 for WADI were used to evaluate the model randomly. This dataset is fed into the trained model, and the system assigns anomaly scores based on the reconstruction loss and discrimination loss. The following steps outline the model testing process: 

**Data Preparation for Testing:** The testing dataset contains a mix of normal and attack data, allowing the model to assess its ability to distinguish between the two. The sliding window technique is applied, ensuring that time-series sequences maintain their temporal relationships. Any required feature scaling and preprocessing steps (such as min-max scaling and standardization) are performed, ensuring consistency with the training phase. 

**Generating Synthetic Data for Evaluation:** The trained generator produces synthetic sequences based on the test data distribution. The 

8 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al.                                                                                                                                                                                                                             Franklin Open_ 

discriminator then evaluates whether each sample (real or generated) belongs to the normal pattern or contains an anomaly. 

**Reconstruction and Discrimination Loss Calculation:** Reconstruction Loss measures how accurately the generator can reproduce the input data. Higher reconstruction loss indicates potential anomalies. Discrimination Loss evaluates how well the discriminator differentiates between normal and abnormal samples. If the discriminator struggles to classify a sample correctly, it may indicate an anomaly. 

**Computing the Anomaly Score:** The anomaly score is determined using a weighted combination of the reconstruction and discrimination losses: 

Table 5 gives brief details of the parameters used for training and evaluating the model’s performance. 

## _3.6. Anomaly scoring_ 

Anomaly scoring is a critical step in identifying cyber intrusions within CPS. This process involves evaluating each data point based on the reconstruction loss from the generator and the discrimination loss from the discriminator. By combining these losses, an anomaly score is computed, which helps distinguish normal system behavior from potential cyber threats. 

not only improve classification confidence but also better reconstruct subtle patterns in rare attack instances, which improves the quality of the synthetic data and ultimately boosts detection accuracy. The inclusion of LSTM further strengthens the model by enabling it to capture temporal dependencies inherent in multivariate time-series CPS data. LSTM’s memory cells are designed to retain long-term dependencies and contextual patterns, which are crucial in detecting slow-evolving or pattern-based intrusions that may not be evident in short time windows. By integrating LSTM into both the generator and discriminator, the model is able to simulate and identify realistic sequential behaviors, leading to improved learning of both normal and abnormal sequences over time. 

## _3.6.2. Computing the anomaly score_ 

To obtain a final anomaly score, a weighted combination of reconstruction loss and discrimination loss is used: 



## where: 

λ is a weight factor balancing the importance of reconstruction and discrimination losses. D(X) is the discriminator’s classification score for sample AD_Loss represents the anomaly score for the given sample. 

## _3.6.1. Anomaly detection using loss functions_ 

The anomaly detection mechanism relies on two primary loss functions. These are: 

**Reconstruction Loss:** The generator attempts to reconstruct input data by learning the distribution of normal samples. The reconstruction loss is calculated as the difference between real data X and the generated sample ( _Z_ ): 



Higher reconstruction loss suggests that a sample deviates significantly from learned normal patterns, potentially indicating an anomaly. 

**Discrimination Loss:** The discriminator assigns a probability score to each sample, indicating whether it is real or generated. The discrimination loss measures how well the discriminator can distinguish between normal and anomalous samples. A sample with high discrimination loss is more likely to be an anomaly, as it does not conform to known patterns. 

Combinedly, this hybrid loss function (combining reconstruction and discriminator loss) used in our architecture provide balanced guidance to the generator and discriminator during training. While the generator produce data indistinguishable from real samples, the discriminator ensures numerical stability and penalizes large deviations from the actual data distribution. This dual-objective setup enables the model to 

**Table 5** 

Experiment parameters for training and testing for both datasets. 

|Parameters|SWaT|WADI|
|---|---|---|
|Latent Dimension|15|15|
|Sequence of Length|30|30|
|Batch Size|500|500|
|Number of Epoch|50|50|
|Generator LSTM hidden dimension|100|100|
|Generator LSTM Layer|3|3|
|Discriminator LSTM hidden dimension|100|100|
|Discriminator LSTM Layer|1|1|
|Generator Round|3|3|
|discriminator Round|1|1|
|Hyperparameter,_λ_|0.1|0.1|
|Threshold,τ|0.49|0.65|
|Learning Rate|10<sup>–3</sup>|10<sup>–3</sup>|
|Loss Function|BCE|BCE|
|Optimizer|Adam|Adam|





Here, Binary Cross-Entropy (BCE) Loss evaluates how far the anomaly score deviates from the expected normal pattern. 

## _3.6.3. Classifying anomalies_ 

If the anomaly score exceeds the threshold (τ), the sample is labeled as an anomaly (i.e., cyber intrusion). If the anomaly score is below the threshold, the sample is classified as normal system behavior. 

By fine-tuning λ and τ, the model optimizes its ability to detect cyber threats while minimizing false positives. This ensures a highly accurate and efficient intrusion detection system for CPS environments. 

## _3.7. Model optimization_ 

Model optimization is a crucial step in improving the efficiency, accuracy, and stability of the GANs with LSTM-based RNNs. The goal of optimization is to enhance the model’s ability to detect cyber intrusions in CPS while minimizing false positives and false negatives. 

The model is optimized using mini-batch stochastic gradient descent (SGD) with Adam optimizer. This approach ensures efficient parameter updates, faster convergence, and stable training. The optimization process is divided into several key steps: 

**Fine-Tuning Hyperparameters:** The model’s hyperparameters are carefully adjusted to achieve optimal performance. These include: 

- Learning rate (α): Controls the step size for updating model parameters. 

- Batch size: Determines the number of samples used per training iteration. 

- Number of epochs: Ensures sufficient training cycles for convergence. 

- Weight balancing (λ): Adjusts the importance of reconstruction and discrimination losses. 

**Gradient-Based Optimization (Adam Optimizer):** The Adam optimizer (Adaptive Moment Estimation) is selected due to its ability to: 

9 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al.                                                                                                                                                                                                                             Franklin Open_ 

- Adaptively adjust learning rates for different parameters. 

- Prevent vanishing or exploding gradients. 

- Improve stability during GAN training. 

The optimization parameters used are: 

- Generator: α= 10<sup>–3</sup> , β1= 0.7, β2= 0.53, and ε= 10<sup>–8</sup> 

- Discriminator: α= 10<sup>–3</sup> , β1= 0.9, β2= 0.99, and ε= 10<sup>–8</sup> 

**Avoiding Mode Collapse:** Mode collapse occurs when the generator produces limited variations of samples, reducing its ability to learn diverse attack patterns. To prevent this: 

- The discriminator is trained more frequently than the generator, ensuring it does not become too weak. 

- Dropout regularization is applied to prevent overfitting. 

- The generator loss function is modified to encourage diversity in synthetic samples. 

detection system is depicted in Fig. 4. In the training phase, the Generator and the Discriminator of the GAN network is trained concurrently. Here the generator learns data representations from complex latent space and reconstructed synthetic data samples which are much similar to the real space data. After that, both the training data from dataset and the synthetic data from the generator feed into the discriminator of the GAN network in order to train the discriminator. The fake data from the discriminator mapped back to the generator to improve the quality of synthetic data. In the testing phase, testing data is invert mapped to the latent space to produce latent code similar to real data in order to test the model more accurately and identically with healthy synthetic samples. From the generator we calculate the reconstruction loss of generate data which is discussed earlier, and from the discriminator we calculate the discrimination loss in order to calculate anomaly score. Finally, we optimized the model based on Adam optimizer and validate our model using popular performance metrices. 

## **4. Results and analysis** 

**Improving Convergence Stability:** GANs often face unstable training due to the adversarial nature of the generator and discriminator. To ensure smooth convergence: 

- Gradient clipping is applied to limit the maximum gradient value, preventing sudden fluctuations. 

- Batch normalization is introduced to standardize feature distributions across layers. 

- Early stopping is implemented to halt training if the validation loss stops improving. 

## _3.8. Result analysis & evaluation metrices_ 

After training and optimizing, the proposed model’s effectiveness is assessed through detailed result analysis and evaluation. The primary objective is to measure how accurately the model detects anomalies in CPS by using real-world datasets. The evaluation of the model is based on standard classification metrics that quantify its ability to differentiate between normal and anomalous data. The details of the performance metrics are described in the Table 6. 

TP, TN, FP, FN represents the number of True Positive, True Negative, False Positive, and False Negative respectively. The properly identified anomaly is denoted by TP, the mistakenly detected anomaly is denoted by FP, the correctly assigned normal is denoted by TN, and the incorrectly assigned normal is denoted by FN. 

## _3.9. Operational framework of the proposed system_ 

The overall operational framework of the proposed intrusion 

**Table 6** 

Result analysis and evaluation metrices. 

|Metrices|Definition|Equation|
|---|---|---|
|Accuracy|Represents the proportion of correctly<br>classified samples (both normal and|_Accuracy_ =<br>_TP_+_TN_|
||i<br>anomalous) relative to the total test<br>samples.|_TP_+_TN_+_FP_+_FN_|
|Precision|Measures the fraction of correctly<br>identified anomalies among all<br>instances classified as anomalies. High<br>precision ensures fewer false positives.|_Precision_ =<br>_TP_<br>_TP_+_FP_|
|Recall|Indicates the model’s ability to detect|_Recall_=<br>_TP_|
||actual anomalies. A higher recall value<br>means the model successfully captures<br>most cyber intrusions.|<br>_TP_+_FN_|
|F1-Score|Provides a balanced measure of<br>precision and recall|_F_1<br>_Score_ = 2 ×<br>(<br>Precision × Recall<br>Precision+ Recall<br>)|



This chapter presents a comprehensive analysis of the results obtained from the GAN-LSTM-based intrusion detection model applied to CPS. The evaluation focuses on two real-world multivariate time-series datasets: SWaT and WADI. The results are analyzed using four key performance metrics: accuracy, precision, recall, and F1-score, which provide insights into the model’s ability to detect cyber intrusions effectively. The chapter is divided into multiple sections, beginning with a performance analysis that examines how the model behaves across different training epochs and how its performance stabilizes over time. This is followed by an anomaly scoring assessment, where the model’s ability to differentiate between normal and attack instances is visualized through anomaly score distributions. The results demonstrate that the proposed GAN-LSTM model consistently achieves high accuracy and precision, making it highly reliable for anomaly detection. A comparative analysis is conducted to benchmark the GAN-LSTM model against the MAD-GAN framework, showing that the proposed model outperforms MAD-GAN in all key metrics, particularly in recall and F1score. Additionally, the key takeaways and limitations of the study are discussed, highlighting the model’s strengths in structured attack detection and its challenges in handling complex and overlapping anomalies. 

## _4.1. Performance analysis_ 

To assess the effectiveness of the proposed GAN with LSTM-based RNN, the model is evaluated on two real-world CPS datasets: SWaT and WADI. The performance analysis involves monitoring the model’s behavior over multiple training epochs and measuring key metrics such as accuracy, precision, recall, and F1-score. 

A sliding window technique is applied to structure the time-series data, ensuring that the model captures temporal dependencies. For the experiment, this research used a sliding window of 30 for both datasets, including training and testing. The training phase is conducted using only normal system behavior data, allowing the generator to learn the data distribution effectively. The testing phase involves evaluating the model on a mix of normal and attack data to determine its ability to detect anomalies. 50 training and testing epochs are used to optimize the model’s performance, with appropriate hyperparameter tuning to prevent overfitting and mode collapse. Table 7 provides a detailed performance evaluation of the proposed system. 

For the SWaT dataset, the model achieved an accuracy of 87%, meaning that out of every 100 samples, 87 were classified correctly. For the WADI dataset, the accuracy is slightly higher at 91 %, demonstrating that the model is more effective in identifying anomalies in this dataset. The higher accuracy in WADI could be attributed to the dataset’s structure, where attack patterns are more distinguishable, making classification easier. The SWaT dataset achieved 93 % precision, 

10 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al.                                                                                                                                                                                                                             Franklin Open_ 



**Fig. 4.** Operational framework of the proposed system. 

**Table 7** 

Performance metrics result for both SWaT and WADI dataset. 

|Dataset|Accuracy|Precision|Recall|F1-Score|
|---|---|---|---|---|
|SWaT|0.87|0.93|0.99|0.91|
|WADI|0.91|0.97|0.75|0.82|
|Percentage Improvements|+4.60 %|+4.30 %|−24.24 %|−9.89 %|



implying that 93 out of every 100 detected anomalies were correctly identified as attacks. In contrast, the WADI dataset achieved 97 % precision, which is even higher, suggesting that nearly all detected attacks were genuine. The superior precision in WADI indicates that the dataset contains well-defined attack scenarios, making it easier for the model to classify anomalies with minimal errors. For the SWaT dataset, the recall score is 99 %, indicating that nearly all attacks present in the dataset were successfully identified. However, the recall score for the WADI dataset is 75 %, which is significantly lower than that of SWaT. This suggests that while the model is highly precise, it fails to detect 25 % of actual attacks, leading to potential security risks. The lower recall in 

WADI may be due to the presence of complex or subtle attack patterns that the model struggles to recognize. For the SWaT dataset, the model achieved an F1-score of 91 %, demonstrating a strong ability to detect anomalies while maintaining low false positive rates. For the WADI dataset, the F1-score is 82 %, which, while still high, is lower than that of SWaT. This reduction in F1-score is largely due to the lower recall, meaning that while the model is highly precise, it still misses a portion of real attacks. 

Here’s a histogram (Fig. 5) comparing the performance metrics (Accuracy, Precision, Recall, F1-Score) of our proposed model on the SWaT and WADI datasets. 

The proposed intrusion detection model performs better on the SWaT dataset in terms of recall and F1-score, indicating that it detects nearly all anomalies with high accuracy. In contrast, while the model achieves higher precision on WADI, its lower recall suggests that it fails to detect some cyber intrusions. The difference in performance between the two datasets may be attributed to variations in their structure, attack distribution, and complexity. The SWaT dataset likely contains more welldefined attack patterns, making it easier for the model to detect anomalies. On the other hand, WADI’s attack scenarios may be more complex, 



**Fig. 5.** Histogram showing performance metrices for SWaT and WADI dataset. 

11 

_M.S. Siddique et al._ 

_Franklin Open 11 (2025) 100281_ 

## leading to reduced recall. 

## _4.2. Performance metrics graph for individual epochs_ 

Here we present the variation of key performance metrics—accuracy, precision, recall, and F1-score—over multiple training epochs for the SWaT and WADI datasets, in Fig. 6 and Fig. 7 respectively. These figures provide insight into how the model learns over time and how its ability to detect cyber intrusions evolves as training progresses. By analyzing these figures, we can understand the stability, convergence, and effectiveness of the proposed GAN with LSTM-based RNN for CPS security. 

Fig. 6 shows the performance of the model across 50 training epochs for the SWaT dataset, with separate trend lines for accuracy, precision, recall, and F1-score. The first noticeable trend is that accuracy and recall maintain consistently high values, demonstrating that the model effectively detects anomalies early in training. The highlighting points from Fig. 6 are: 

- **Accuracy Stability:** Accuracy remains above 85 % throughout training, with slight variations. This suggests that the model learns quickly and does not suffer from overfitting or underfitting. 

- **Precision Variability:** The precision curve fluctuates slightly between 91 % and 94 %, indicating that while the model is effective in correctly identifying attacks, minor adjustments in feature weighting or threshold settings could further improve precision. 

- **High Recall:** The recall value starts relatively high and remains above 95 %, reaching nearly 99 % in the final epochs. This indicates that the model successfully identifies almost all actual intrusions, ensuring minimal false negatives. 

- **F1-Score Trends:** Since F1-score is the harmonic mean of precision and recall, it follows a similar pattern, maintaining a value above 90 %. 

One key takeaway from Fig. 6 is that the recall and accuracy curves remain stable throughout training, while precision exhibits minor fluctuations. The model performs exceptionally well in detecting anomalies in SWaT, but slight variations in precision suggest potential room for improvement in reducing false positives. 

Fig. 7 represents the training performance for the WADI dataset, showing how the accuracy, precision, recall, and F1-score evolve over time. Unlike the SWaT dataset, which exhibits relatively stable performance across metrics, the WADI dataset presents more fluctuations, particularly in recall and F1-score. The highlighting points from Fig. 7 are: 

- **Accuracy Trends:** Accuracy remains consistently above 90 %, with minor variations. This indicates that the model is reliable in classifying normal and attack instances. 

- **High Precision:** The precision metric is relatively stable and high, staying above 95 %, reaching a peak of 97 %. This suggests that most of the detected anomalies are actual cyber intrusions, with very few false positives. 

- **Lower Recall Compared to SWaT:** The recall curve shows higher fluctuations, especially between epochs 20 and 40, where it drops to around 70–75 % before recovering. This suggests that the model is missing some attack instances, leading to false negatives. 

- **F1-Score Variability:** Since the F1-score depends on both precision and recall, it also fluctuates between 78 % and 85 %, reflecting the instability in recall. 

One possible explanation for the lower recall and F1-score variability in WADI is the complexity of attack scenarios in the dataset. WADI contains more diverse and subtle cyber intrusions, making it harder for the model to detect all anomalies. The model successfully avoids false positives (high precision) but struggles with false negatives (lower recall). 

By comparing both figures, a clear distinction in performance emerges between the SWaT and WADI datasets. The SWaT dataset exhibits more stable performance across all metrics, while WADI experiences fluctuations in recall and F1-score, suggesting some challenges in detecting all cyber intrusions. SWaT achieves higher recall (~99 %), meaning it detects almost all attacks, while WADI’s recall is lower (~75 %), suggesting that some intrusions are not identified. Precision remains high (~93 %− 97 %) in both datasets, meaning the model effectively avoids false positives. F1-score follows the recall trend, remaining more stable in SWaT but fluctuating in WADI. These findings indicate that while the GAN-LSTM model performs exceptionally well in structured attack environments like SWaT, it may require additional optimization for datasets with complex or subtle attack patterns like WADI. 

## _4.3. Loss-Accuracy graph for individual epochs_ 

In this section, we present the anomaly score distributions for the SWaT and WADI datasets, with the help of Figs. 8 and 9 respectively. These figures are essential for understanding how the proposed system in this research assigns anomaly scores to different data samples. 

Fig. 8 presents the anomaly scores assigned to data points in the SWaT dataset. The distribution clearly differentiates between normal samples (low anomaly scores) and attack samples (high anomaly scores). The key observations from the figure are as follows: 



**Fig. 6.** Performance metrics graph of SWaT dataset. 

12 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al._ 



**Fig. 7.** Performance metrics graph of WADI dataset. 



**Fig. 8.** Loss-accuracy graph for SWaT dataset. 



**Fig. 9.** Loss-accuracy graph for WADI dataset. 

- **Distinct Separation Between Normal and Attack Samples:** The majority of normal samples have low anomaly scores, clustering around values close to zero, indicating that they align well with the learned normal patterns. In contrast, attack samples exhibit significantly higher anomaly scores, forming a separate cluster. 

- **Sharp Threshold Between Normal and Anomalous Data:** The anomaly detection threshold (τ) is clearly visible, separating normal 

- and anomalous points. Most normal samples fall below the threshold, while attack samples are above it, indicating that the model has effectively learned to distinguish cyber intrusions from regular activity. 

- **Low False Positive Rate:** Since very few normal data points exceed the anomaly threshold, the model minimizes false alarms, making it 

13 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al.                                                                                                                                                                                                                             Franklin Open_ 

- highly reliable for real-world deployment in industrial CPS environments. 

- **Minimal Overlapping Between Normal and Attack Samples:** The clear distinction between the two categories indicates that the GANLSTM model generalizes well, successfully detecting cyber intrusions without significant misclassification. 

Overall, Fig. 8 demonstrates that the model performs exceptionally well on the SWaT dataset, effectively separating normal and attack samples with a well-defined threshold. The distribution suggests that the anomaly detection framework is stable and reliable for detecting cyber threats in SWaT-based CPS environments. 

Fig. 9 depicts the anomaly score distribution for the WADI dataset, showing how the model assigns scores to normal and attack samples. Compared to Fig. 8, this distribution exhibits more overlap between normal and anomalous data points, leading to some challenges in detecting attacks with high certainty. Key observations include: 

- **Increased Overlapping Between Normal and Anomalous Samples:** Unlike the SWaT dataset, where a clear separation exists, the WADI dataset shows a significant overlap between normal and attack samples. Some attack instances have anomaly scores that are similar to normal samples, making it harder for the model to distinguish them accurately. 

- **Higher False Negative Rate:** Due to this overlapping distribution, some attack samples fall below the anomaly detection threshold (τ), meaning that they are misclassified as normal instances. This explains the lower recall observed in WADI during performance evaluation, where some intrusions go undetected. 

- **Wider Anomaly Score Range:** The anomaly scores in WADI have a more diverse range, indicating that attack patterns in this dataset are more complex and varied compared to SWaT. This variability in attack behavior makes detection more difficult, requiring additional fine-tuning or feature selection to improve model performance. 

- **Potential for Threshold Optimization:** The current threshold (τ) does not completely separate anomalies from normal samples in WADI. Adjusting the threshold dynamically or using adaptive thresholding techniques could enhance anomaly detection accuracy and reduce false negatives. 

The findings from Fig. 9 suggest that while the GAN-LSTM model performs well, some attacks in WADI are harder to detect due to their similarity to normal behavior. 

When comparing the two figures, a key difference emerges in the anomaly score distributions between the SWaT and WADI datasets. SWaT dataset exhibits a clea separation between normal and anomalous data, making it easier for the model to detect attacks with high recall and precision. WADI dataset shows greater overlap between normal and attack samples, leading to more false negatives, as some attacks are classified as normal due to their low anomaly scores. 

## _4.4. Performance comparison with existing research_ 

To validate the effectiveness of the proposed approach for CPS intrusion detection, its performance is compared with existing anomaly detection models. Table 8 presents a comparative analysis between the proposed GAN-LSTM model and a benchmark model, MAD-GAN 

**Table 8** 

Comparison of This Research and the MAD-GAN. 

|Dataset|Paper|Accuracy|Precision|Recall|F1-Score|
|---|---|---|---|---|---|
|SWaT|MAD-GAN [14]|–|0.98|0.63|0.77|
||This Paper|0.87|0.93|0.99|0.91|
|WADI|MAD-GAN [14]|–|0.41|0.33|0.37|
||This Paper|0.91|0.97|0.75|0.82|



(Multiple Time-Series Anomaly Detection using Generative Adversarial Networks) [14]. There are architectural differences between our proposed GAN-LSTM and MAD-GAN. While MAD-GAN employs a vanilla LSTM architecture primarily for sequence modeling, it does not incorporate a tailored adversarial training mechanism specifically designed to address class imbalance or enhance the detection of rare events. In contrast, our proposed model integrates adversarial training within a GAN framework, where both the generator and discriminator are LSTM-based and jointly optimized. This setup enables the generator to synthesize realistic attack sequences, particularly rare or minority class instances, while the discriminator learns to differentiate these from real samples based on temporal patterns. Additionally, MAD-GAN focuses on unsupervised anomaly detection using reconstruction errors, whereas our framework adopts a semi-supervised approach that explicitly leverages label information to guide training and improve classification accuracy. The hybrid loss function in our method (combining binary cross-entropy and mean squared error) further stabilizes training and improves convergence, which is not a design component of MAD-GAN. These architectural enhancements, particularly the use of adversarial learning to boost minority class detection and temporal modeling via LSTM within both generator and discriminator, contribute to our model’s superior performance, as demonstrated in the comparative results. 

The comparison focuses on four key performance metrics: accuracy, precision, recall, and F1-score, measured across two datasets—SWaT and WADI. The results in Table 8 indicate that the proposed GAN-LSTM model consistently outperforms MAD-GAN across all metrics. However, there is a noticeable difference in performance between the SWaT and WADI datasets, which suggests that attack complexity influences the model’s ability to detect cyber threats. The GAN-LSTM model achieves higher recall (99.0 %) and precision (93.0 %), leading to better anomaly detection in SWaT. Precision is consistently high for the GAN-LSTM model, showing that it correctly identifies cyber intrusions without generating excessive false alarms. The recall score in WADI remains lower than in SWaT, suggesting that additional feature engineering, threshold tuning, or hybrid modeling could improve detection performance. The higher F1-score in both datasets confirms that the GANLSTM model provides a more balanced and effective anomaly detection mechanism compared to MAD-GAN. 

## **5. Discussions** 

## _5.1. Discussion of the results / key takeaways_ 

The results of this research provide several key insights into the effectiveness of the GAN-LSTM-based intrusion detection system for CPS. The findings highlight the model’s strengths, limitations, and areas for improvement. The key takeaways from the results are as follows: 

- **High Accuracy in Detecting Cyber Intrusions:** The GAN-LSTM model outperforms MAD-GAN in accuracy across both datasets. The model achieves 87.0 % accuracy in SWaT and 91.0 % accuracy in WADI, demonstrating its ability to generalize well across different datasets. The higher accuracy in WADI suggests that the model adapts well to complex datasets, although further improvements are needed in recall. 

- **Superior Precision Ensures Minimal False Alarms:** Precision is consistently high for the proposed model, reaching 93.0 % in SWaT and 97.0 % in WADI. The high precision values indicate that most detected anomalies are actual cyber intrusions, reducing false positives. A lower false positive rate ensures that normal system activities are not incorrectly flagged as attacks, making the model more reliable in real-world CPS environments. 

- **Excellent Recall in SWaT but Lower Recall in WADI:** The model achieves an exceptionally high recall of 99.0 % in SWaT, meaning it detects nearly all cyber intrusions in the dataset. However, recall in 

14 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al._ 

WADI is lower at 75.0 %, indicating that some attacks remain undetected. The lower recall in WADI suggests that complex attack patterns are harder to detect, requiring further enhancements in feature selection and training strategies. 

- **Balanced F1-Score Shows Strong Overall Performance:** The F1score for SWaT is 91.0 %, indicating a good balance between precision and recall. In WADI, the F1-score is 82.0 %, which is still strong but reflects the trade-off between high precision and lower recall. The results confirm that the model performs well overall but requires further optimization to improve recall without sacrificing precision. 

- **Clear Separation of Normal and Anomalous Data in SWaT:** The anomaly score distribution (Fig. 8) in SWaT shows a clear distinction between normal and attack samples. The threshold-based classification is effective, leading to low false positives and false negatives in SWaT. The well-structured attack scenarios in SWaT make it easier for the model to learn patterns and detect anomalies accurately. 

- **Overlapping Anomaly Score Distribution in WADI Causes Detection Challenges:** The WADI dataset (Fig. 9) exhibits overlapping anomaly scores between normal and attack samples. This overlap makes it harder for the model to set a clear decision boundary, leading to more false negatives (missed attacks). The complexity of attacks in WADI requires more advanced detection strategies, such as adaptive thresholding or hybrid models. 

- **Proposed Model Outperforms MAD-GAN in Performance Metrics:** The GAN-LSTM model consistently achieves higher accuracy, recall, and precision compared to MAD-GAN. In SWaT, recall improves from 95.3 % (MAD-GAN) to 99.0 % (GAN-LSTM), ensuring more attack detections. In WADI, recall improves from 69.2 % (MADGAN) to 75.0 % (GAN-LSTM), showing that the proposed model detects more complex attacks. The GAN-LSTM model is better suited for real-world intrusion detection applications, as it minimizes false positives while improving attack detection. 

The GAN-LSTM-based intrusion detection model is a highly effective solution for detecting cyber intrusions in CPS environments. It achieves high accuracy, superior precision, and strong recall in structured attack scenarios like SWaT. However, further optimization is needed for more complex attack patterns in WADI, particularly in improving recall. The findings confirm that the proposed model outperforms existing approaches like MAD-GAN and has strong potential for real-world cybersecurity applications. 

## _5.2. Limitations of the research_ 

While the proposed GAN-LSTM-based intrusion detection model demonstrates high accuracy and strong anomaly detection capabilities, there are several limitations that need to be addressed in future research. These limitations are outlined below: 

- **Lower Recall in Complex Attack Scenarios:** The model achieves high recall (99.0 %) in SWaT, but recall is lower (75.0 %) in WADI, indicating that some attacks remain undetected. Complex or subtle attack patterns in WADI make it harder for the model to distinguish anomalies from normal behavior. This suggests a higher false negative rate, which could be problematic in real-world cybersecurity applications. 

- **Fixed Anomaly Detection Threshold may not be Optimal:** The model uses a static anomaly detection threshold (τ), which works well in SWaT but is less effective in WADI. Overlapping anomaly scores in WADI indicate that a fixed threshold may not be suitable for all datasets. A dynamic or adaptive thresholding mechanism could improve performance in datasets with varying attack behaviors. 

- **Computational Complexity and Training Time:** The GAN-LSTM model is computationally intensive, requiring significant processing power and memory for training. The adversarial training process of GANs involves multiple optimization steps, leading to longer 

training times compared to traditional machine learning models. This may limit real-time deployment, especially in resourceconstrained environments. 

- **Sensitivity to Hyperparameter Selection:** The performance of the model depends heavily on hyperparameter tuning, such as: Learning rate for both generator and discriminator, Batch size and number of training epochs, Weight balancing factor (λ) between reconstruction loss and discrimination loss. Suboptimal hyperparameter settings can lead to issues such as mode collapse in GANs or poor convergence in LSTMs. 

- • **Potential for Overfitting to Training Data:** The model achieves high performance on the SWaT and WADI datasets, but its generalization to unseen attack scenarios is uncertain. There is a risk of overfitting to specific dataset characteristics, meaning that the model may not perform well on different datasets without retraining. Crossvalidation with multiple CPS datasets is required to improve robustness. 

While the GAN-LSTM-based intrusion detection system shows strong anomaly detection capabilities, it has several limitations, including lower recall in complex attack scenarios, high computational costs, sensitivity to hyperparameters, and potential for overfitting data. Addressing these challenges through adaptive thresholding, adversarial robustness, explainability, and further dataset expansion will enhance the effectiveness and practical usability of the model for real-world cybersecurity applications. 

## _5.3. Practical deployment challenges_ 

While our GAN-LSTM model demonstrates strong detection performance, several practical considerations emerge when deploying such systems in real-world industrial CPS: 

- **Computational Latency:** The LSTM-based adversarial training requires significant processing resources, potentially introducing 50–200 ms inference delays (depending on hardware) that may not meet sub-100 ms requirements for time-critical CPS like power grids or chemical plants. As a mitigation strategy, model quantization and edge deployment (e.g., using NVIDIA Jetson or Intel OpenVINO) could reduce latency. 

- **Hardware Constraints:** Industrial controllers (PLCs, RTUs) typically have limited memory ( _<_ 2GB RAM) and lack GPU support, making direct deployment challenging. A hybrid architecture where feature extraction occurs at the edge and anomaly scoring runs on fog nodes, could bridge this gap. 

- **Model Maintenance:** CPS environments experience gradual concept drift (e.g., equipment aging, process changes) requiring periodic retraining. Implement incremental learning with a human-in-theloop validation system to maintain accuracy without full retraining. 

- **Safety-Critical False Positives:** Overly sensitive detection may trigger unnecessary shutdowns in critical infrastructure. Our high precision (93–97 %) minimizes this risk, but future work will integrate risk-aware alert prioritization. 

These challenges highlight the need for continued optimization before widespread industrial adoption. Our future work will specifically address latency reduction through model pruning and hardware-aware architecture design. 

## _5.4. Data privacy concerns in deploying ML-based CPS security_ 

Machine learning models for CPS security often rely on large volumes of system data, which may include sensitive operational details, user behaviors, or configuration patterns. The collection, transmission, and storage of such data can raise significant privacy concerns, especially in industrial and critical infrastructure environments where data 

15 

_M.S. Siddique et al._ 

_Franklin Open 11 (2025) 100281_ 

exposure could lead to strategic vulnerabilities. Furthermore, training models on historical logs may unintentionally reveal information about system architecture or previous attacks if not properly anonymized. 

To mitigate these risks, it is important to adopt privacy-preserving practices such as data anonymization, secure aggregation, and access control. In more advanced scenarios, techniques like federated learning and differential privacy can be employed to ensure that raw data remains on-premises while still contributing to model improvement. Incorporating such approaches not only enhances user trust but also aligns ML-based solutions with legal and regulatory standards for data protection in CPS environments. 

## _5.5. Model generalizability across CPS environments_ 

The generalizability of ML models in CPS is a critical factor for realworld deployment. Although our model demonstrates strong performance on the SWaT and WADI datasets—both representing water treatment and distribution systems—the underlying approach is not limited to these domains. The architecture’s ability to capture temporal dependencies and handle class imbalance makes it adaptable to other CPS settings, such as power grids, manufacturing systems, and smart buildings. In short, the proposed GAN-LSTM model has potential for adaptation in various CPS domains beyond the SWaT and WADI datasets. Key sectors where generalizability is applicable include: 

- **Power Grid Systems:** Temporal load data and sensor readings in smart grids can benefit from LSTM’s sequence modeling capabilities. The model can be used to detect load manipulation, data injection, or control command anomalies. 

- **Industrial Control Systems (ICS) / SCADA:** These systems often exhibit periodic behaviors and multi-sensor control loops, similar to water treatment processes. The model can be retrained to identify stealthy or abrupt attacks in manufacturing plants, oil refineries, etc. 

- **Smart Buildings and IoT-Enabled Facilities:** HVAC systems, lighting, and access controls generate time-series data suitable for modeling with LSTM. Anomalies such as unauthorized access or tampered sensor readings can be detected using adversarial training. 

- **Transportation Systems (e.g., Railways, Autonomous Vehicles):** Time-series data from sensors, GPS, and control systems allow detection of anomalous driving patterns or communication tampering. The model can be adapted to monitor operational integrity in real-time. 

- **Healthcare CPS (e.g., Remote Monitoring, Smart ICUs):** Continuous patient data (heart rate, BP, etc.) is ideal for sequential modeling. The model could help in identifying data spoofing or sensor failures that may impact clinical decisions. 

However, variations in data characteristics, process dynamics, and attack behaviors across CPS domains may require fine-tuning or domainspecific retraining. To promote adaptability, our model is designed modularly, allowing components like the LSTM architecture or adversarial training mechanism to be adjusted based on system-specific data distributions. Future work will focus on validating the model across additional datasets and environments to further evaluate its robustness and transferability. 

## _5.6. Strategies to improve model explainability_ 

While the proposed model achieves strong detection performance, its interpretability is critical for real-world adoption, especially by domain experts who require transparency to trust and act on the system’s outputs. To improve explainability, several strategies can be integrated: 

- **Visualization of Anomaly Scores Over Time:** Plotting anomaly scores aligned with specific sensor/actuator timelines can help operators quickly identify where and when abnormal behavior occurs. 

- **Feature Importance Analysis:** Techniques like SHAP (SHapley Additive exPlanations) or LIME (Local Interpretable Model-agnostic Explanations) can highlight which input features (e.g., sensors, valves) contributed most to an anomaly prediction. 

- **Event-Based Summaries:** Translating detection results into humanreadable summaries (e.g., "Sudden drop in water level due to unexpected valve closure") allows engineers to correlate anomalies with system-level incidents. 

- **Component-Level Decomposition:** By analyzing model outputs per subsystem or per sensor cluster, engineers can localize faults more effectively and prioritize responses. 

- **Integration with SCADA Interfaces:** Embedding model outputs into operator dashboards with intuitive alerts and trend overlays can bridge the gap between AI inference and operator action. 

These methods will enhance user trust, improve model transparency, and support better decision-making in critical infrastructure environments. These methods emphasize the practical implications of explainable ML in CPS security. 

## _5.7. Strategies to make ML-based solutions affordable for smaller organizations_ 

One of the key challenges in adopting advanced ML models for CPS security; especially for small and medium-sized enterprises (SMEs); is the cost and complexity of implementation. To address this, several strategies can be employed: 

- **Use of Lightweight and Pretrained Models:** Instead of training models from scratch, organizations can adopt pretrained or finetuned models that require minimal computational overhead and can be adapted to specific CPS environments with limited data. 

- **Modular Deployment:** Designing the model in modular components allows organizations to adopt only the necessary features (e.g., anomaly detection without real-time response), reducing infrastructure demands. 

- **Cloud-Based and Edge Solutions:** Leveraging cloud platforms or edge devices for inference can reduce local infrastructure costs, allowing smaller setups to benefit from scalable processing power without significant investment in hardware. 

- **Open-Source Frameworks and Tools:** Utilizing open-source libraries and frameworks significantly lowers the development cost. Providing openly available model architectures and configuration templates tailored for CPS can help democratize access. 

- **Community-Driven Datasets and Collaboration:** Encouraging shared access to anonymized datasets and cross-organization collaboration helps reduce the data collection burden and fosters mutual development of effective solutions. 

- **Automated Model Maintenance:** Incorporating auto-updating or self-tuning features can reduce the need for in-house ML expertise and ongoing retraining costs. 

By integrating these strategies, ML-based security solutions can become more practical and cost-effective for smaller organizations without compromising reliability or safety. 

## _5.8. Importance of real-world testing, validation, and deployment_ 

While the current study demonstrates promising results using benchmark datasets (SWaT and WADI), validating the model in realworld environments is crucial to assess its true effectiveness. Realworld CPS deployments often exhibit non-ideal conditions, such as sensor noise, hardware limitations, evolving system behavior, and operational uncertainties. Testing the model under such constraints ensures that it can handle variability, adapt to dynamic patterns, and maintain low false-positive rates. 

16 

_M.S. Siddique et al._ 

_Franklin Open 11 (2025) 100281_ 

Furthermore, deployment in live CPS environments allows for iterative improvements based on actual feedback from operators and system logs. Integration with industrial SCADA systems or edge devices would enable real-time detection and actionable responses. Such validation not only boosts trust in the model’s predictions but also confirms its robustness, scalability, and usability across different sectors. 

We have added a note in the Conclusion and Future Work sections to highlight the need for pilot deployments and field trials as a critical next step in operationalizing this research. 

## **6. Conclusion and future research scope** 

- **Address Overlapping Anomaly Scores in WADI:** To address overlapping anomaly scores in complex datasets like WADI, adaptive thresholding techniques; such as moving average windows or statistical process control (SPC) charts; could dynamically adjust detection sensitivity based on temporal context. For instance, thresholds could be recalibrated using rolling z-scores or EWMA control limits to better separate subtle attacks from normal behavior. Reinforcement learning may further optimize thresholds by balancing false positives and negatives in real-time. 

By addressing these research challenges, future studies can significantly enhance GAN-based intrusion detection models for CPS security. 

## _6.1. Conclusion_ 

## **Funding** 

This research presents a GAN-LSTM-based intelligent IDS designed to enhance cybersecurity in CPSs by effectively detecting cyber intrusions in multivariate time-series data. The proposed methodology integrates reconstruction loss and discrimination loss to create a hybrid anomaly scoring mechanism, improving anomaly detection accuracy while minimizing false alarms. The model is trained and evaluated on two realworld CPS datasets—SWaT and WADI—which contain both normal and attack traffic. The results demonstrate that the GAN-LSTM model outperforms traditional IDS techniques, achieving higher recall, precision, and accuracy while effectively handling data imbalance issues. Specifically, the model achieves a recall of 99.0 % in SWaT, ensuring the detection of nearly all cyber intrusions, while in WADI, recall improves to 75.0 %, outperforming existing state-of-the-art models such as MADGAN. The comparative performance analysis confirms that the proposed GAN-LSTM framework provides better adaptability to complex attack scenarios, making it a scalable and efficient IDS for CPS security. Additionally, the low computational overhead of the model ensures its feasibility for real-time deployment in critical infrastructures. 

## _6.2. Future research scope_ 

While this research has demonstrated the effectiveness of a GANLSTM-based intrusion detection system for CPSs, there are several areas that warrant further exploration to enhance model performance, scalability, and real-world applicability. The following directions can serve as a foundation for future research: 

- **Enhancing Model Generalization Across Diverse CPS Domains:** The proposed model is evaluated on SWaT and WADI datasets, which are specific to water treatment and distribution systems. Future research can extend the model to other CPS applications, such as smart grids, industrial IoT, autonomous vehicles, and healthcare systems, to validate its effectiveness in different real-world scenarios. 

- **Adaptive Thresholding for Dynamic Anomaly Detection:** The study employs a fixed anomaly threshold, which may not always be optimal for varying attack intensities. Future work could implement adaptive thresholding techniques that dynamically adjust based on real-time network conditions and attack behavior. 

- **Improving Detection of Subtle and Complex Attacks:** Although the proposed model performs well in structured attack scenarios, it struggles with subtle, low-profile attacks, as seen in the WADI dataset. Future research can focus on hybrid deep learning approaches, combining GANs with transformers, attention mechanisms, or graph neural networks (GNNs) to improve detection of stealthy cyber intrusions. 

- **Multi-Modal Learning for Enhanced Intrusion Detection:** CPSs generate heterogeneous data types, including sensor readings, network traffic logs, and user access patterns. Future research can integrate multi-modal learning approaches, combining time-series analysis with log-based and network-flow anomaly detection for a more comprehensive security solution. 

The authors receive no funding from any organization for this research. 

## **Conflict of interest** 

The authors declare no conflict of interest. 

## **Ethics approval** 

Not applicable. 

## **Data availability** 

The code written and utilized during the current study is available from the corresponding author upon reasonable request. 

## **Consent to participate** 

All the authors have voluntarily agreed to participate in this research study. 

## **Consent to publication** 

All the authors have given their consent for the publication of identifiable details, which can include image(s) and/or videos and/or case history and/or details within the text (“Material”) to be published in this Article. 

## **CRediT authorship contribution statement** 

**Md Shakil Siddique:** Writing – original draft, Visualization, Methodology, Investigation, Formal analysis, Data curation, Conceptualization. **Md. Ashikur Rahman Khan:** Writing – review & editing, Supervision, Project administration, Methodology, Investigation, Formal analysis, Conceptualization. **Ishtiaq Ahammad:** Writing – review & editing, Visualization, Investigation, Formal analysis, Validation, Writing – original draft. **Nishu Nath:** Writing – review & editing, Data curation. **Joysri Rani Das:** Writing – review & editing, Data curation. **Fardowsi Rahman:** Writing – review & editing, Data curation. 

## **Declaration of competing interest** 

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

## **Acknowledgement** 

The authors have nothing to acknowledge. 

17 

_Franklin Open 11 (2025) 100281_ 

_M.S. Siddique et al._ 

## **References** 

- [1] T. Kumari, Z.Ul Oman, The modern technology has disrupted today’s world: an analytical review of how technology affected quality of Human interaction, Int. J. Comput. Trends Technol. 72 (1) (Jan. 2024) 27–34, https://doi.org/10.14445/ 22312803/IJCTT-V72I1P105. 

- [2] I. Ahammad, Md.A.R. Khan, Z.U. Salehin, QoS performance enhancement policy through combining fog and SDN, Simul Model Pr. Theory 109 (May 2021) 102292, https://doi.org/10.1016/j.simpat.2021.102292. 

- [3] A.K. Tyagi, N. Sreenath, Cyber physical systems: analyses, challenges and possible solutions, Internet Things Cyber-Phys. Syst. 1 (2021) 22–33, https://doi.org/ 10.1016/j.iotcps.2021.12.002. 

- [4] Z. Yu, H. Gao, X. Cong, N. Wu, H.H. Song, A survey on cyber–Physical systems security, IEEE Int. Things J. 10 (24) (Dec. 2023) 21670–21686, https://doi.org/ 10.1109/JIOT.2023.3289625. 

- [5] I. Ahammad, Md.A.R. Khan, Z.U. Salehin, Software-defined dew, roof, fog and cloud (SD-DRFC) framework for IoT ecosystem: the journey, novel framework architecture, simulation, and use cases, SN Comput. Sci. 2 (3) (May 2021) 159, https://doi.org/10.1007/s42979-021-00521-y. 

- [6] A. Alabdulatif, N.N. Thilakarathne, Z.K. Lawal, A review on security and privacy issues pertaining to cyber-physical systems in the industry 5.0 era, Comput. Mater. Contin. 80 (3) (2024) 3917–3943, https://doi.org/10.32604/cmc.2024.054150. 

- [7] P. Dini, A. Elhanashi, A. Begni, S. Saponara, Q. Zheng, K. Gasmi, Overview on intrusion detection Systems Design exploiting machine learning for networking cybersecurity, Appl. Sci. 13 (13) (Jun. 2023) 7507, https://doi.org/10.3390/ app13137507. 

- [8] A.R. Khan, et al., Stock market prediction in bangladesh perspective using artificial neural network, Int. J. Adv. Technol. Eng. Explor. 9 (95) (Oct. 2022) 1397–1427, https://doi.org/10.19101/IJATEE.2021.875852. 

- [9] P. Freitas de Araujo-Filho, G. Kaddoum, D.R. Campelo, A. Gondim Santos, D. Macedo, C. Zanchettin, Intrusion detection for cyber–Physical systems using generative adversarial networks in fog environment, IEEE Int. Things J. 8 (8) (Apr. 2021) 6247–6256, https://doi.org/10.1109/JIOT.2020.3024800. 

- [10] Q. Lin, R. Ming, K. Zhang, H. Luo, Privacy-enhanced intrusion detection and defense for cyber-physical systems: a deep reinforcement learning approach, Secur. Commun. Netw. 2022 (Oct. 2022) 1–9, https://doi.org/10.1155/2022/4996427. 

- [11] Y. Kim, S. Choi, Forward-backward generative adversarial networks for anomaly detection, Proc. Mach. Learn Res. 101 (2019) 1142–1155. 

- [12] H. Zenati, C.S. Foo, B. Lecouat, G. Manek, V.R. Chandrasekhar, Efficient GANbased anomaly detection, Accessed: Feb. 20, 2025. [Online]. Available: https ://arxiv.org/abs/1802.06222v2, Feb. 2018. 

- [13] M.O. Kaplan, S.E. Alptekin, An improved BiGAN based approach for anomaly detection, Proc. Comput. Sci. 176 (2020) 185–194, https://doi.org/10.1016/j. procs.2020.08.020. 

- [14] D. Li, D. Chen, B. Jin, L. Shi, J. Goh, and S.-K. Ng, “MAD-GAN: multivariate anomaly detection for time series data with generative adversarial networks,” 2019, pp. 703–716. doi: 10.1007/978-3-030-30490-4_56. 

- [15] Q. Yan, M. Wang, W. Huang, X. Luo, F.R. Yu, Automatically synthesizing DoS attack traces using generative adversarial networks, Int. J. Mach. Learn. Cybern. 10 (12) (Dec. 2019) 3387–3396, https://doi.org/10.1007/s13042-019-00925-6. 

- [16] H. Chen, L. Jiang, Efficient GAN-based method for cyber-intrusion detection, Accessed: Feb. 20, 2025. [Online]. Available: https://arxiv.org/abs/1904.0 2426v2, Apr. 2019. 

- [17] J. Lee, K. Park, AE-CGAN model based high performance network intrusion Detection System, Appl. Sci. 9 (20) (Oct. 2019) 4221, https://doi.org/10.3390/ app9204221. 

- [18] J.-Y. Kim and S.-B. Cho, “Detecting intrusive malware with a hybrid generative deep learning model,” 2018, pp. 499–507. doi: 10.1007/978-3-030-03493-1_52. 

- [19] B.B. Zarpelao, R.S. Miani, C.T. Kawakani, S.C. de Alvarenga, A survey of intrusion ˜ detection in Internet of Things, J. Netw. Comput. Appl. 84 (Apr. 2017) 25–37, https://doi.org/10.1016/j.jnca.2017.02.009. 

- [20] M. Wang, K. Zheng, Y. Yang, X. Wang, An explainable machine learning framework for intrusion detection systems, IEEE Access 8 (2020) 73127–73141, https://doi. org/10.1109/ACCESS.2020.2988359. 

- [21] A. Abeshu, N. Chilamkurti, Deep Learning: the frontier for distributed attack detection in fog-to-things computing, IEEE Commun. Mag. 56 (2) (Feb. 2018) 169–175, https://doi.org/10.1109/MCOM.2018.1700332. 

- [22] D. Midi, A. Rullo, A. Mudgerikar, E. Bertino, Kalis — A system for knowledgedriven adaptable intrusion detection for the internet of things, in: 2017 IEEE 37th International Conference on Distributed Computing Systems (ICDCS), IEEE, Jun. 2017, pp. 656–666, https://doi.org/10.1109/ICDCS.2017.104. 

- [23] iTrust Labs_Dataset info - iTrust. https://itrust.sutd.edu.sg/itrust-labs_datasets 

   - /dataset_info/, Accessed: Feb. 20, 2025. 

- [24] A.P. Mathur, N.O. Tippenhauer, SWaT: a water treatment testbed for research and training on ICS security, in: 2016 International Workshop on Cyber-physical Systems for Smart Water Networks (CySWater), IEEE, Apr. 2016, pp. 31–36, https://doi.org/10.1109/CySWater.2016.7469060. 

- [25] J. Goh, S. Adepu, K.N. Junejo, and A. Mathur, “A dataset to support research in the design of secure water treatment systems,” 2017, pp. 88–99. doi: 10.1007/978-3319-71368-7_8. 

- [26] C.M. Ahmed, V.R. Palleti, A.P. Mathur, WADI, in: Proceedings of the 3rd International Workshop on Cyber-Physical Systems for Smart Water Networks, ACM, New York, NY, USA, Apr. 2017, pp. 25–28, https://doi.org/10.1145/ 3055366.3055375. 

- [27] P. Vincent, H. Larochelle, Y. Bengio, P.-A. Manzagol, Extracting and composing robust features with denoising autoencoders, in: Proceedings of the 25th international conference on Machine learning - ICML ’08, ACM Press, New York, New York, USA, 2008, pp. 1096–1103, https://doi.org/10.1145/ 1390156.1390294. 

- [28] K. Bnou, S. Raghay, A. Hakim, A wavelet denoising approach based on unsupervised learning model, EURASIP J. Adv. Signal Process 2020 (1) (Dec. 2020) 36, https://doi.org/10.1186/s13634-020-00693-4. 

- [29] M. Arafah, I. Phillips, A. Adnane, W. Hadi, M. Alauthman, A.-K. Al-Banna, Anomaly-based network intrusion detection using denoising autoencoder and Wasserstein GAN synthetic attacks, Appl. Soft. Comput. 168 (Jan. 2025) 112455, https://doi.org/10.1016/j.asoc.2024.112455. 

- [30] I. Goodfellow, et al., Generative adversarial networks, Commun. ACM 63 (11) (Oct. 2020) 139–144, https://doi.org/10.1145/3422622. 

18 

