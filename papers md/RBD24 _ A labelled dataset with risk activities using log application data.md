Computers & Security 150 (2025) 104290 



Contents lists available at ScienceDirect 

# Computers & Security 

journal homepage: www.elsevier.com/locate/cose 



### Full length article 

## RBD24 : A labelled dataset with risk activities using log application data 



Albert Calvo<sup>a,b</sup> ,<sup>∗</sup> , Santiago Escuder a , Nil Ortiz<sup>a</sup> , Josep Escrig<sup>a</sup> , Maxime Compastié<sup>a</sup> 

a _i2CAT, The Internet Research Center, Carrer del Gran Capità, 2-4, Barcelona, 08034, Catalonia, Spain_ b _Universitat Politècnica de Catalunya, Carrer de Jordi Girona, 31, Barcelona, 08034, Catalonia, Spain_ 

A R T I C L E I N F O 

#### A B S T R A C T 

_Keywords:_ Cybersecurity Risk activities Application logs 

This paper introduces the Risk Activities Dataset 2024 (RBD24), an open-source dataset designed to facilitate the identification and analysis of risk activities within the cybersecurity domain. The RBD24 Dataset is derived from multimodal application logs collected over a two-week period at a Spanish state university, identifying activities aligned with the early stages of the attack scenario. This dataset paves the way for novel User and Entity behaviour Analytics (UEBA) and risk assessment frameworks within the cybersecurity domain. In detail, the dataset offers a fully user-centric approach by providing ground-truth data for various risk behaviours, including cryptocurrency activities, outdated software usage, P2P file sharing, and phishing incidents. These ground-truth data, identified through intrusion detection systems (IDS) and experimental campaigns, are represented as a set of indicators extracted from DNS, HTTP, SSL, and SMTP protocol logs. This dataset is expected to be a valuable resource for developing and benchmarking cybersecurity models, particularly in the realm of risk behaviour assessment. 

##### **1. Introduction** 

The present hyperconnected society, characterized by the extensive number of connected devices, has led to a significant increase in the potential number of cyberthreat victims. During 2021, malicious actions doubled compared to the previous year, resulting in enormous economic losses. It is estimated that DDoS attacks alone have caused the loss of 1 million worker hours (ENISA, 2021). From the threat actors’ perspective, cybercrime has evolved into a highly lucrative activity targeting businesses, governments, and critical infrastructure systems, employing sophisticated techniques to deceive security mechanisms, extract intellectual property from companies, and demand ransoms for sabotages or disruptions to normal business activities, causing significant economic losses (Anderson et al., 2019). The application of Artificial Intelligence (AI) has become a cornerstone in cybersecurity teams, enhancing the efficiency and accuracy of predicting and classifying various attack vectors and potential risks. From a technical perspective, AI enables automated threat analysis, significantly improving the capabilities of cybersecurity teams by providing more accurate assessments and reducing the mean response time to threats. The AI techniques employed in this domain are diverse, ranging from simple yet effective rule-based systems to complex machine learning approaches, including deep learning architectures (Okoli et al., 2024). For instance the rule-based systems are commonly employed within Intrusion Detection Systems (IDS) which have proven effective in threat 

detection by leveraging a well-defined set of predefined patterns, allowing them to quickly identify known attack signatures and enabling a rapid response to latent threats. 

Furthermore, the use of Machine Learning (ML) for developing algorithms and statistical models has been extensively explored, offering greater flexibility by enabling the generalization of behaviours and facilitating data-driven decision-making. In this context, practitioners have employed both supervised and unsupervised techniques to analyse the behaviour of various threats within corporate networks. As an illustrative use case, see Heine et al. (2020), malware detection can be achieved using supervised learning by analysing historical network and incident data, curating a dataset, applying a supervised classification algorithm, and using this model to infer online data, thereby computing the probability of malware in the latent space. On the other hand, the same malware detection intent can be achieved using non-supervised learning, where in this case it is analysed online data and determined out-of-distribution network traces that can be aligned to a potential threat behaviour 

The efforts in the cybersecurity domain to enhance robust analysis are significant. Within the context of defensive security, solutions based on User and Entity Behaviour Analytics (UEBA) are particularly important, enabling organizations to adopt a proactive posture (Shashanka et al., 2016). Unlike traditional threat detection approaches, which 

> ∗ Corresponding author at: i2CAT, The Internet Research Center, Carrer del Gran Capità, 2-4, Barcelona, 08034, Catalonia, Spain. _E-mail address:_ albert.calvo@i2cat.net (A. Calvo). 

> https://doi.org/10.1016/j.cose.2024.104290 

> Received 20 September 2024; Received in revised form 8 December 2024; Accepted 16 December 2024 

> Available online 20 December 2024 

> 0167-4048/© 2024 The Authors. Published by Elsevier Ltd. This is an open access article under the CC BY-NC-ND license ( http://creativecommons.org/licenses/bync-nd/4.0/ ). 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 

primarily react to latent threats within the infrastructure, UEBA techniques focus on user-centric analysis, offering a more robust and resilient approach. Specifically, UEBA techniques allow for a deeper understanding of user and entity behaviour, identifying risk patterns that may pose a thread allowing the cybersecurity operators to effectively reduce the attack surface by providing targeted mitigation strategies (Salitin and Zolait, 2018; Martín et al., 2021). Similar to traditional threat detection systems, UEBA approaches rely in a diverse array of ML-driven systems, for instance using non-supervised clustering techniques (Wang et al., 2014) or supervised learning using Neural Networks architectures (Moghaddam and Helmy, 2011). 

The development of data-driven approaches in cybersecurity is a significant challenge, requiring high quality datasets for training and benchmarking models. In this context, practitioners often rely on opensource datasets due to the difficulty of obtaining proprietary ones. However, the number of publicly available datasets for benchmarking data-driven approaches is extremely limited, as the data is sensitive and subject to stringent privacy and security regulations. The everevolving nature of the threat landscape in cybersecurity requires novel datasets that capture emerging and previously untracked threats. Unfortunately, many works in threat detection still rely on outdated datasets due to data scarcity. As threats evolve, so too must the data collected by monitoring tools. Relying on older datasets not only risks omitting new patterns but also reduces the realism of experiments. Simulated environments used to generate data often lack the complexity and unpredictability of real-world scenarios, further limiting the applicability of such datasets. Moreover, most publicly available datasets overrepresent network traces, particularly those derived from pcap files and network traffic, primarily collected through NAC and NIDS-based monitoring. Nevertheless, in recent years, the cybersecurity domain has evolved towards more holistic approaches, utilizing SIEM platforms to gain better insights by integrating diverse data sources, including application logs, network traces, and endpoint data. This overemphasis neglects the diversity of data sources, especially those found in application logs. The introduction of RBD24 addresses this gap by focusing on multimodal application logs, capturing a broader range of data modalities and offering a more realistic reflection of diverse cybersecurity threats. In addition to its contribution to User and Entity behaviour Analytics (UEBA) for threat detection, the dataset supports applications in risk behaviour assessment, paving the way for more effective detection techniques. To bridge the gap in UEBA analysis using ML-driven techniques, a novel open-source dataset called the Risk Behavioural Dataset 2024 (RBD24) has been created. This dataset comprises a collection of observed risk activities from real users at a Spanish state university over a two-week period, where different multimodal application logs are preprocessed to build samples that accurately represents user’s behaviour. To generate the dataset, a set of sensors were deployed across the enterprise network, providing visibility into the activities of nearly two thousand different users. This setup allowed the extraction of application logs from sources correlated with specific risk activities, using behavioural rules alerts derived from the IDS and by sending phishing campaigns to the population. In detail, the proposed dataset represents one of the earliest efforts to provide ground-truth data aimed at advancing user and entity behaviour analytics, as well as risk assessment solutions, within the cybersecurity domain. The key contributions of our proposed work are as follows: 

- **Catalog of Labelled Risk Activities** The dataset contains a set of labelled risk activities extracted from real users, providing a novel ground truth dataset to support the development of effective User and Entity behaviour Analytics (UEBA) approaches with focus on profiling user behaviour and computing the associated risk during the early stages of the kill chain. 

- **User-centric multimodal Application Logs** The RBD24 dataset is built using application logs that represent the highest abstraction level in the OSI model. Specifically, it includes information 

from DNS, HTTP, SSL, and SMTP protocols. This multimodality allows us to profile different entities from various perspectives, thereby broadening the scope of entity analysis. Furthermore, the proposed activities are structured according to the enterprise asset inventory, allowing to match the generated samples to concrete entities and users. 

- **Proposed Set of Indicators** The proposed dataset preprocesses various application logs from users and constructs a set of 83 distinct indicators. As demonstrated in the experimental section, the proposed indicators exhibit statistical significance, achieving promising benchmarking results. Furthermore, a full description of the proposed features is included in the annex, allowing for the extension of the dataset with additional risk activities. 

The remainder of this article is structured as follows: Section 2 reviews similar data-driven approaches and compares our proposed dataset with other open-source initiatives. Section 3 explains the dataset generation procedure, while Section 4 presents a detailed analysis of the proposed dataset. The article concludes in Section 5 with a discussion of conclusions and future work. 

##### **2. Literature review** 

Within any critical system, obtaining datasets to build ground truth information is complex. On one hand, several open source datasets propose simulating threats in laboratory environments, with the challenge that they are difficult to generalize. On the other hand, other proposals obtains ground truth information from real sources. Furthermore, these datasets also differ in the entities and information sources included in the study, with most existing datasets not incorporating multimodal sources. A summary table of the existing datasets within the domain is provided in Table 1. The table describes the _Data Origin_ , which explains the acquisition of data; the _Data Source_ , detailing the modalities included in the dataset; the _Data Type_ , indicating whether the dataset contains raw data or a set of computed features (Ad-hoc features); the _Related Task_ , which outlines the main purpose of the dataset; and the _Use-Cases_ , detailing where the datasets have been used 

In the domain of Intrusion Detection Systems, the UNSW-NB15 dataset (2015) (Moustafa and Slay, 2015) stands out as a significant baseline to benchmark threat detection algorithms. The dataset comprises the simulation of both legitimate and non-legitimate traffic in a controlled environment, the latter comprises nine distinct attacks, including worms, fuzzers, and botnet-related attacks. The dataset captures network traffic flows, providing a set of computed ad-hoc features for the posterior analysis. Studies like Jing and Chen (2019) and Faker and Dogdu (2019) highlight the application supervised learning models, such as Support Vector Machines (SVM) or deep learning techniques for intrusion detection, using the UNSW-NB15 dataset as baseline. Applications extend to feature selection (Kasongo and Sun, 2020), and data visualization (Yin et al., 2023). In the realm of botnet detection, Velasco-Mata et al. (2023) focuses on real-time detection, while Nugraha et al. (2020) employs deep learning techniques. These studies primarily use CTU-13 (2014) (García et al., 2014) as a benchmark, featuring 13 scenarios with labelled legitimate and botnet traffic. The CTU-13 dataset employs various virtual machines, infected with different malwares (e.g., SPAM sending, Peer to Peer, DDoS), alongside real university network traffic. The dataset provides network layer information in the form of NetFlows, a standard developed by Cisco Systems for monitoring and collecting IP network traffic data. In 2020, the same authors introduced the IoT-23 dataset (Garcia et al., 2020), mirroring CTU-13’s structure but focusing on IoT networks, with legitimate traffic generated by real IoT devices and non-legitimate traffic simulated using a Raspberry Pi attacking the network in a controlled laboratory environment. Alharbi and Alsubhi (2021) employs graphbased machine learning techniques for intrusion detection, utilizing both CTU-13 and IoT-23 datasets as benchmarks. Other works, such as Akash et al. (2022), Kozik et al. (2021), and Alanazi and Aljuhani 

2 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 

**Table 1** 

Summary of datasets, their origins, features, and related use-cases. **B** and **M** stand for benign and malign data. 

|Dataset ID|Data origin|Data source|Data type|Related task|Use-cases|
|---|---|---|---|---|---|
|UNIX (1998)|Real|UNIX csh<br>interpreter|Raw data|Behaviour modelling|Greenberg (1988)<sup>a</sup>, Iglesias<br>et al. (2012) and Folino et al.<br>(2023)|
|CTU-13 (2014)|**B**: Real<br>**M**: VM simulated|Network|Ad-hoc features|Botnet detection|García et al. (2014)<sup>a</sup>,<br>Velasco-Mata et al. (2023)<br>and Nugraha et al. (2020)|
|UNSW-NB15 (2015)|**B**: Lab simulated<br>**M**: Lab simulated|Network|Ad-hoc features|Intrusion detection|Moustafa and Slay (2015)<sup>a</sup>,<br>Jing and Chen (2019), Faker<br>and Dogdu (2019), Kasongo<br>and Sun (2020) and Yin et al.<br>(2023)|
|ISA (2019)|Lab simulated|Network, Host,<br>Questionnaire|Ad-hoc features|Behaviour modelling|Bitton et al. (2020)<sup>a </sup>and<br>Folino et al. (2023)|
|Aposemat IoT-23 (2020)|**B**: Lab simulated<br>**M**: Lab simulated|Network|Raw data|IoT botnet detection|Garcia et al. (2020)<sup>a</sup>, Alharbi<br>and Alsubhi (2021), Akash<br>et al. (2022), Kozik et al.<br>(2021) and Alanazi and<br>Aljuhani (2022)|
|MM-TBM (2019)|**B**: Lab simulated<br>**M**: Lab simulated|Network|Ad-hoc features|APT detection|Ioannou et al. (2019)<sup>a</sup>|
|DAPT (2020)|**B**: Lab simulated<br>**M**: Lab simulated|Network, Host|Raw data|APT detection|Myneni et al. (2020)<sup>a</sup>|
|BETH (2021)|Real|Network, Kernel|Raw data|Anomaly detection|Highnam et al. (2021)<sup>a</sup>|
|Unravelled (2023)|**B**: Lab simulated<br>**M**: Lab simulated|Network, Host|Raw data|APT detection|Myneni et al. (2023)<sup>a</sup>|
|Malware (2023)|**B**: Lab simulated<br>**M**: Sandbox|API calls|Raw data|Behaviour modelling|Catak et al. (2020)<sup>a</sup>, Oliveira<br>and Sassi (2021) and Catak<br>and Yazı (2021)|
|**RBD24** **(2024)**|Real|Application Logs|Ad-hoc features|Behaviour modelling|–|



> a Citations denote the articles where the datasets are presented. 

(2022), concentrate specifically on IoT networks for botnet detection using Machine Learning, primarily in the IoT-23 dataset. 

An alternative use case involves anomaly detection in networks data. Highnam et al. (2021) is to introduce the Beth dataset (2021), incorporating real labelled data from honeypots placed in a cloud service, capturing both legitimate and non-legitimate traffic. Techniques like one-class SVM, Variational Autoencoders (VAE), and Isolation Forest are applied for benchmarking, yielding optimal results. Other anomaly detection use cases revolve around Advanced Persistent Threats (APTs), which are complex and challenging to distinguish from normal traffic due to their multistage nature. An APT attack has different stages, defined in the kill chain, such as reconnaissance, establish Footlhold, Lateral Movement and Data Exfiltration. One of the first efforts to detect APT is the Markov Multi-phase Transferable Belief Model (MMTBM) (Ioannou et al., 2019). It uses Markov chains to predict, detect and track APT. The used dataset is generated in a controlled network environment with both attack and legitimate traffic, it includes three network features: _signature id_ , _timestamp_ , and _dst ip_ . Further, in Neuschmied et al. (2022) proposes a multistage VAE model for APT detection. A publicly available APT dataset, DAPT 2020 (Myneni et al., 2020), is created in a controlled network environment, featuring benign traffic generated by routine business operations and malicious traffic generated by deliberate attacks. Additionally, Myneni et al. (2023) introduces UNREVEALED 2023, an improved and broader dataset for APT detection. 

A more behaviour-focused use case involves human risk behaviour assessment using the Information Security Awareness (ISA) dataset (Bitton et al., 2020). This dataset explores human risk behaviour when using smartphone devices, featuring information from 162 users and three types of features extracted from surveys, mobile agents, and network traffic analysis. Users are exposed to various security challenges, and their responses are monitored. For human behaviour classification, the dataset UNIX (1988) introduced by Greenberg (1988), based 

on UNIX command traces classifies users based on real commands during sessions. Iglesias et al. (2012) utilizes this dataset to create EvaBCD, an approach that models and classifies user behaviour profiles using different ML techniques. Recently, Folino et al. (2023) leverages the ISA and UNIX datasets for anomaly detection and behaviour classification, employing an ensemble model approach. In the field of malware behaviour, studies often centre around Application Programming Interface (API) calls made by malware. These API calls depict how the malware interacts with the Operation System or other libraries within the same device. Researchers use online resources like VirusShare or VirusTotal to gather various malware, executing them in a sandbox environment such as Cuckoo to mine resulting API calls. For example, Catak and Yazı (2021) introduces a Windows Portable Executable File infecting malware dataset for malware family classification. In Catak et al. (2020), a classification model based on Long Short-Term Memory (LSTM) is proposed for identifying malware families, while Oliveira and Sassi (2021) applies Deep Graph Convolutional Neural Networks (DGCNN) to the same task. In comparison with the analysed datasets, RBD24 is the first dataset in the literature to use multi-modal application logs to provide novel use cases based on behaviour modelling within the scope of risk assessment. Furthermore, the dataset offers data samples extracted from real entities, contributing a unique resource to the scarce number of datasets that share real-world data. 

##### **3. The dataset generation architecture** 

This section outlines the proposed system architecture for generating various risk activity datasets using application logs. Specifically, the application logs contain information regarding events that occur in the entity applications, categorized as Layer 7 of the OSI Model (Day and Zimmermann, 1983). By analysing these application logs, it is possible to correlate concrete user-level activities. For example, web browsing 

3 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 



**Fig. 1.** The dataset generation pipeline preprocesses the application logs from the corporate network, structures them according to entities and users inventory, and labels them based on the IDS and phishing simulation appliances. 

activities can be determined by analysing HTTP and DNS logs, while email-related activities, such as sending or receiving emails, can be inferred from SMTP application log data. To associate these application logs with risk activities, two different heuristics are proposed to build the ground truth. The first heuristic involves identifying risk activities by using an on-premises IDS to determine logs that contain Indicators of Compromise (IOC) associated with specific activities. The second heuristic involves the generation of phishing emails and analysing the users who interact with these artifacts. Section 3.1 explains the proposed heuristics in depth, as well as the set of risk activities included in the RBD24. 

To collect and preprocess the application logs, a dataset generation pipeline has been implemented. This pipeline allows the collection of logs from the source, the preprocessing of logs from various applications, and the refinement of the resulting datasets. In detail, a set of networks sensors are deployed on-premises, connected to the main internal switches, as port mirror (SPAN) to capture all traffic generated within the network, which is then converted by the sensors into Zeek (formerly known as Bro) logs providing visibility on multimodal application data from all devices connected to the network.<sup>1</sup> The data is then stored in a data lake, utilizing Elasticsearch with pseudoanonymization of all collected data for the study through the native Elasticsearch anonymization functions, ensuring both data privacy for further analysis.<sup>2</sup> The dataset generation pipeline processes the collected application logs and generates data samples. After the collection _Log Collection_ phase, the _Sample Generation_ component generates data samples from the raw application logs. These samples summarize the behaviour of an entity and are represented by a set of indicators that effectively capture the entity’s behaviour over a fixed period of time. This sample generation approach reduces the complexity of working with raw data by maintaining a set of representative samples for analysis using predictive methods, while also naturally anonymizing the generated dataset. Section 3.2 provides an in-depth explanation of the proposed structure and indicators. Afterward, the _entity and user aggregation_ step correlates the generated entity samples with their respective users, using asset inventory information for this mapping. Finally, the samples are labelled according to the two proposed labelling heuristics, using the _Labelling_ component. The proposed architecture is illustrated in Fig. 1. The dataset is available in the following RBD24 Zenodo repository RBD24 dataset.<sup>3</sup> The dataset is structured according to different risk activities, with each activity stored in Parquet format. 

> 1 Zeek Repository: https://docs.zeek.org/en/master/index.html. 

> 2 Elasticsearch Repository: https://github.com/elastic/elasticsearch. 

> 3 DOI RBD24 dataset: https://doi.org/10.5281/zenodo.13787590. 

##### _3.1. The catalog of risk activities_ 

This section explains the various risk activities included in the RBD24 dataset, along with a comprehensive description of the heuristics used to label the ground truth data. The first strategy involves executing real case studies within the infrastructure and analysing how different users behave in response. During this project, it is included as part of the dataset the executions provided in Calvo et al. (2023). Although this methodology provides a high-quality dataset, it is constrained by economic and operational capabilities. Each experimental campaign requires instantiating new servers to launch the attack and is also limited by the capacity of SOC team to handle additional alerts from users. In these attack simulations, the labelled data contains users who interact with phishing artifacts as positive observations, while negative users are those who received the phishing email but do not interact with it, either by ignoring it or by not entering their credentials. The second heuristic used to label risk activities involves selecting IDS alerts that are associated with risk behaviour, such as cryptocurrency mining, the usage of non-updated software, or users sending credentials via non-encrypted protocols. In this study, the set of IDS rules are extracted from the baseline alerts set by the Suricata IDS, available in the following repositories (Lin, 2006; Manh Tuong, 2021). In this case, the compromised users, with a positive label, are labelled according to their match with the IDS alert, while the negative set does not exhibit the risk behaviour. The following strategies were used to construct each risk activity: 

- Cryptocurrency activity. This activity captures entities that have installed a crypto miner agent that could be engaging to the mining of cryptocurrencies and the validation of crypto transactions. Preventing these activities helps to alleviate stress on the network and computing resources by prohibiting actions that are not permitted according to internal policies. 

- Outdated software activity (Flash version). This activity identifies users who do not have the Flash software updated to the latest version or interact with applications with outdated flash version, which can lead to critical vulnerabilities. In detail, this software is used to visualize animations and rich Internet applications. The rule looks into the user-agent header to detect the Flash version used. During the creation of the dataset the rule labels users with versions lower than _32.0.0.387_ , allowing to analyse users which not regularly install updates. 

- Outdated software activity (TLS connections). Similar to the previous activity focused on outdated software (such as Flash versions), this activity profiles users by detecting _JA3_ signatures associated with obsolete communication protocols, which are still present in some TLS connections of some applications or services. The activity is modelled targeting _JA3_ signatures related to old communication protocols, which are present in TLS connections. 

4 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 

- P2P activity. This risk activity includes users that have applications such as BitTorrent, LibTorrent..., using the peer-to-peer (P2P) protocol. While this protocol is widely used for file transfer, it is also a common malware distribution channel (Kalafut et al., 2006), and against common network policies. A set of rules is used to determine users engaging in activities that utilize the P2P protocol by filtering the content of the HTTP user-agent header. 

- Non-encrypted activities. This dataset identifies entities that transmit credentials over non-encrypted channels. The heuristic used to capture this insecure practice focuses on detecting users who include a basic authentication token (encoded in base64) within the ‘‘Authorization’’ HTTP header. Specifically, it targets instances where anonymous credentials are used, characterized by the username ‘‘anonymous’’ and an empty password, which translates to the base64 string _YW5vbnltb3VzOg==_ . 

- Phishing activity. This activity comprises users who have been compromised in three phishing simulations (Calvo et al., 2023). In the first campaign, the emails were designed to request users to log into an e-commerce third-party service. The second campaign involved emails asking users to enter their credentials to renew their corporate login. The third campaign focused on malware execution by sending a spreadsheet containing supposed corporate information with different macros, thereby exposing the user and allowing us to build the dataset. 

These alerts can be further categorized into two groups: active and passive risk alerts, depending on how they are raised at the user level. Active risk alerts require the user to perform a proactive action, either intentionally or unintentionally, to generate alerts associated with this type of risk. This could involve clicking a link, downloading, and executing a file, among other actions. _Phishing_ , _Crypto_ , and _P2P_ alerts fall into this category. Passive risk alerts are associated with activities that can happen without the user’s direct actions. These risks depend mostly on the configuration of the applications and services with which the user interacts, as the user does not proactively select how external applications are configured or which protocols they use. _OutFlash_ , _OutTLS_ , and _NonEnc_ alerts are classified under this category. 



**Fig. 2.** The samples are obtained from the collection of log data, and a set of ad-hoc features (indicators) is computed. These samples are then aggregated by device and user categories and labelled according to specific risk activities. 

strategically sent to groups of university workers who have access to a corporate smartphone, thereby capturing both smartphone and desktop entities. On the other hand, the rest of the alerts are general alerts raised by all users on the network. Table 2 provides a summary of the risk activities included in the RBD24 dataset, as well as the dataset’s structure at both the user and sample levels. Additionally, the data is categorized by desktop ( _𝐷𝐸_ ) and smartphone ( _𝑆𝑀_ ) devices. For each risk activity, the positive samples refers to observations vulnerable (labelled as 1), while samples labelled as 0 represent observations captured within the same interval but exhibiting benign behaviour. The same sampling interval is maintained for both classes to ensure the consistency and reliability of the proposed datasets. 

In detail, the samples are formulated using a total of 83 distinct indicators, constructed based on information extracted from raw application logs, as well as the HTTP, SSL, and SMTP protocols. A comprehensive description of the proposed indicators for each modality is provided in Appendix. These indicators are categorized into spatiotemporal indicators, network usage indicators, and communication indicators: 

##### _3.2. Dataset structure and proposed indicators_ 

Each risk activity in the RBD24 dataset is represented by a set of samples, which are organized according to the entity and user to which they belong, along with their corresponding labels. This structure is illustrated in Fig. 2. The generated samples are feature vectors containing a set of indicators that represent the behaviour of an entity associated with a specific user, identified by _𝑢𝑠𝑒𝑟_  𝑖𝑑_ , within a specified time range, defined by a timestamp called _𝑡𝑖𝑚𝑒𝑖𝑛𝑖_ , with a fixed sample length _𝑘_ . The value of _𝑘_ is set to 1 h based on the on-premises resources available for processing the raw data and our previous experimentation, as demonstrated in Calvo et al. (2023). This study shows that a sample length of 1 h provides a good balance between resource utilization and predictive performance. Additionally, a sliding window with a stride of 10 min is applied, meaning that every 10 min, a new sample containing 1 h of information in the form of feature indicators is generated. Technically speaking, the RBD24 dataset encompasses 586,510 unique samples, from 1772 unique users, with a global inventory of almost 1386 workstations and 1024 portable entities. Typically, each user has at least one workstation device and one portable device such a smartphone or a tablet device. In detail, the smartphones and tablet devices include both iOS and Android systems, whereas workstations span Linux, Windows, and macOS computers. The segmentation of entities into workstations and smartphones is performed to allow a finegrained analysis allowing stakeholders to launch specific remediation policies according to the device typology. All the datasets, except for the _Phishing_ dataset, contain more workstation information. This is due to the nature of the alerts raised. Phishing emails are simulated and 

- **Temporal Indicators** This category of indicators describe aspects of the entity behaviour related to describe when the time windows occurs, such as whether the time window ( _𝑇 𝑊_ ) occurs during labour hours or during holidays. Furthermore, in this category, indicators related to volumetry are included, which statistically describe the interlog time between occurrences of different logs, as well as the mean and standard deviation of the frequency of logs. This set of features are categorized in Volumetry and Timestamp types. 

- **Network Usage Indicators** This category of indicators describe the usage of network artifacts describing the ports, ip and domains within the time windows. Some of the indicators included in this category are the one related to port usage, such as _𝑑𝑛𝑠_  𝑐𝑜𝑚𝑚𝑜𝑛_  𝑡𝑐𝑝_  𝑟𝑎𝑡𝑖𝑜_ defines the ratio of DNS applications logs using the tcp protocol or the indicator _𝑑𝑛𝑠_  𝑛𝑜𝑛_  𝑟𝑒𝑠𝑒𝑟𝑣𝑒𝑑_  𝑑𝑠𝑡𝑟𝑎𝑡𝑖𝑜_  𝑟𝑎𝑡𝑖𝑜_ which describe the ratio of DNS logs using a non reserved port. Furthermore, in this category, it is described a set of indicators related to domain and ip usage. One illustrative indicator in this category is to determine if the destination domain or ip is categorized as malicious using information from Threat Intelligence. In detail, it is determined if the destination ip or domain is categorized as malicious comparing the network artifact with a list of external open threat intelligence data. Throughout a partnership with INCIBE-ICARO we have access to a dynamic MISP feed which contain a set of IOC affecting to worldwide institutions. This set of features are categorized in Port Usage, Domain Usage and IP Usage types. 

5 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 

**Table 2** 

The RBD24 dataset comprises various risk activities collected from real entities and users over a period of 15 days, with the samples segmented by Desktop (DE) and Smartphone (SM) devices. 

|DatasetId|Risk activity|Device|Benign (0)<br>[#User/#Samples]|Risk (1)<br>[#User/#Samples]|
|---|---|---|---|---|
|Crypto|Miner Checking|DE<br>SM|738/161 202<br>613/180 021|11/1343<br>4/956|
|OtFlh|Otdtdft|DE|738/161 202|56/10 820|
|uas|uae soware|SM|613/180 021|22/6639|
|OtTLS|OtdtdTLS|DE|738/161 202|18/2458|
|u|uae|SM|613/180 021|11/2930|
|P2P|P2PAtiit|DE|738/161 202|177/35 892|
||cvy|SM|613/180 021|94/21 688|
|||DE|738/161 202|291/59 943|
|NonEnc|Non-encrypted|SM|613/180 021|167/41 434|
|||DE|98/13 864|19/3072|
|Phishing|Phishing email|SM|117/34 006|26/8968|



- **Communication Indicators** This category of indicators comprises indicators which describes properties of the different networks protocols included in the _𝑇 𝑊_ . In this category, it is included information related to versions of different protocols used by the network modalities included in the study such as ratio of application logs using a specific ssl version (features related: _𝑠𝑠𝑙_  𝑣𝑒𝑟𝑠𝑖𝑜𝑛_  𝑣_ 10, _𝑠𝑠𝑙_  𝑣𝑒𝑟𝑠𝑖𝑜𝑛_  𝑣_ 20 and _𝑠𝑠𝑙_  𝑣𝑒𝑟𝑠𝑖𝑜𝑛_  𝑣_ 30). Another successful indicator included in this category is related to properties associated with _𝑆𝑀𝑇 𝑃_ information (in/out emails) such as the ratio of characters included in the subject or ratio of received emails with hazardous extensions (such as .zip, .rar or .exe). This set of features are categorized in Status code, Protocol Usage and Properties types. 

##### **4. Dataset analysis** 

In this section, we present a thorough analysis of the proposed risk activities. Section 4.1 offers an in-depth examination of the statistical significance of the various datasets generated, while Section 4.2 evaluates the predictive performance of the indicators developed in this study. 

##### _4.1. Statistical significance_ 

Fig. 3 illustrates the user-level behaviour using a time series representation of _𝐷𝑁𝑆_  𝑐𝑜𝑢𝑛𝑡_ , _𝐻𝑇 𝑇 𝑃_  𝑐𝑜𝑢𝑛𝑡_ , _𝑆𝑆𝐿_  𝑐𝑜𝑢𝑛𝑡_ , and _𝑆𝑀𝑇 𝑃_  𝑐𝑜𝑢𝑛𝑡_ features for two legitimate users. The data is split into smartphone and workstation entities. Daily plots show DNS, HTTP, and SSL activities, revealing cyclic patterns with decreased activity on Fridays and weekends (* on the x-axis). Hourly plots depict log distribution, with peaks during working hours (08:00 AM to 06:00 PM) and minimal activity on weekends likely due to backups or off-hours use. SMTP data, plotted separately, represents email events, in this plot are only shown the received emails. Further, to statistically compare the different datasets are proposed the following distance-based Analysis both based to study the dissimilarity between the risk activity datasets: 

- **Shared Users Analysis** : This analysis involves quantifying the number of positively shared users between datasets. In this analysis, the ratio of the number of shared users between datasets _𝑛_ and _𝑚_ is compared (see eq: (1)). | _𝑈𝑛_ ∩ _𝑈𝑚_ | 

- d1 _𝑛,𝑚_ = (1) min(| _𝑈𝑛_ | _,_ | _𝑈𝑚_ |) 

- **Non-shared Analysis** : The second approach is based on Euclidean distances between datasets, focusing on non-shared positive users. In this method, the Euclidean distance is calculated between the mean of each normalized feature across datasets 

_𝐷_ , enabling a comprehensive assessment of dataset similarity or dissimilarity (see eq: (2)): 



The analysis of the heatmap reveals that the behaviour associated with the risk activity of _NonEnc_ appears to encompass a broader spectrum, as it can be observed in the substantial overlap of positive users with several other datasets, including _Crypto_ , _OutdatedFlash_ , _P2P_ , and _OutTLS_ . This observation can be attributed to the nature of _NonEncrypted_ , as it often involves different actions that breach multiple security controls. For instance, _Crypto_ alerts might also raise _NonEnc_ , as some agents used in cryptomining send credentials in plain text. Finally, the overlapping between _NonEnc_ and _OutTLS_ , _OutFlash_ , and to a certain extent _P2P_ is casual, as applications or services that are not maintained or malicious can raise these three alerts. However, these alerts are not related to each other. 

On the other hand, minimal or no overlap is observed in the remaining dataset pairs, indicating that the datasets are unique and do not share behavioural characteristics. This suggests that excepting the pair _NonEnc_ and _Crypto_ that have a causal relation, the alerts triggered focuses on different sets of users baring in mind that some alerts,although not related between they, can have some casual relation due to the applications and services that users access. Finally, it is worth mentioning that _Cypto_ does create strict alerts this way creating more reliable datasets (see Fig. 4). 

On the other hand, analysing the behaviours in Fig. 5, it is noticeable that _Phishing_ showcase the highest difference between datasets, this might be due the nature of the labelling process. Whilst the pair _P2P_ and _NonEncripted_ demonstrate the lowest distance. It is noteworthy that despite being calculated with no shared users, this proximity suggests a similarity in behaviour between users associated with _P2P_ and _NonEnc_ . 

After assessing both similarity approaches we can conclude that _NonEnc_ behaviour may have a wider impact across different datasets, potentially due to its alerting mechanism. Whilst _P2P_ activity might raise some False Positives. On the other hand, other behaviours such as _Phishing_ and _Crypto_ exhibit more isolated effects, suggesting targeted actions towards specific subsets of users and more reliable datasets. 

##### _4.2. Predictive performance_ 

In this section is studied the ability of binary classification algorithm accurately identify and distinguish between risky and benign samples for each independent dataset. To this end, we performed the classification of the different risk activities to benchmark the predictive performance of the proposed indicators. In this experiment, a binary classification model at the sample level is trained using the _XGBoost_ , 

6 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 



**Fig. 3.** Traffic and event behaviour analysis. From left to right, it is included the telemetry of two legitimate users included in the RBD24 Dataset (P2P activity), segmented by application protocols (DNS, HTTP and SSL) and SMTP events for a period of two weeks. The hourly visualization shows the average telemetry between workdays and weekends. 

the labels are assigned as 1 for users compromised in risk activities and 0 for users with benign activities. Technically speaking, _XGBoost_ is an ensemble learning method that aggregates the outputs of multiple weak learners, typically decision trees, to construct a robust predictive model (Chen and Guestrin, 2016). 

All experiments were run by randomly splitting each dataset into 80% for training, and 20% for testing. The splits were made at the user level, meaning no users were shared between the test and training splits. As the data was highly imbalanced, downsampling was applied to the legitimate traffic samples to achieve a balanced dataset. 

Table 3 presents the experimental results of the different classification models trained for the risk activities included in the RBD24 Dataset. The table includes F1, F1 macro, Accuracy, True Positive Rate (TPR) and False Positive Rate (FPR) metrics to compare the models. We chose TPR and FPR as in cybersecurity is crucial to detect threats, in our case the risky-behaviour. Analysing the results, it is noticeable that some behaviours are more generalizable than others. The results show that _𝑃 ℎ𝑖𝑠ℎ𝑖𝑛𝑔_ , _𝑂𝑢𝑡𝐹 𝑙𝑎𝑠ℎ_ and _𝑃_ 2 _𝑃_ risk activities have the highest F1-Score metrics for desktop entities, while _𝑁𝑜𝑛𝐸𝑛𝑐_ and _𝑃_ 2 _𝑃_ have the highest F1-Score for smartphone entities. Furthermore, 

**Table 3** 

Predictive performance using binary classification. 

Desktop (DE) 

||Crypto|OutFlash|OutTLS|P2P|NonEnc|Phishing|
|---|---|---|---|---|---|---|
|F1|0,63|0.75|0.62|0.74|0.72|0.76|
|F1 macro|0.63|0.68|0.59|0.68|0.67|0.73|
|Accuracy|0.63|0.70|0.59|0.69|0.68|0.73|
|TPR|0.65|0.92|0.68|0.90|0.85|0.87|
|FPR|0.39|0.52|0.51|0.52|0.49|0.41|
|Smartphone|(SM)||||||
||Crypto|OutFlash|OutTLS|P2P|NonEnc|Phishing|
|F1|0.18|0.60|0.54|0.67|0.71|0.58|
|F1 macro|0.40|0.52|0.60|0.57|0.63|0.57|
|Accuracy|0.48|0.53|0.60|0.59|0.65|0.57|
|TPR|0.11|0.71|0.82|0.83|0.87|0.60|
|FPR|0.16|0.64|0.28|0.64|0.57|0.46|



it is observed that, on average, samples captured from desktop devices tend to generalize better, achieving an F1-score of 0 _._ 70±0 _._ 07, compared 

7 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 



**Fig. 4.** Heat-map of the percentage of users shared between risk activities, segmented according Desktop and Smartphone devices. 

to samples collected from smartphone devices, which only obtained an F1-score of 0 _._ 55 ± 0 _._ 20. This disparity in performance can be attributed to the nature of the alerts raised, which may not accurately reflect smartphone-specific activities in the data. As a result, the overall performance for smartphone datasets is lower than that of desktop datasets. This is further compounded by the limited amount of data in certain smartphone categories, such as the _𝐶𝑟𝑦𝑝𝑡𝑜_ dataset, where the model struggled to make accurate predictions. This indicates that smartphone datasets might be more effective as supplementary information rather than as standalone datasets, particularly when seeking robust predictive performance. Finally, considering the FPR, we observe that _Crypto_ and _Phishing_ have the lowest FPR. This indicates that amongst all the samples classified as Positive, they exhibit the lowest rate of false positives. This could be attributed to the fact that _Phishing_ and _Crypto_ are Active risks. However, despite being an Active risk, _P2P_ has one of the highest FPRs. This is likely due to its widespread use as a file transfer protocol, which increases the likelihood of false positives. On the other hand, when analysing _OutFlash_ , _OutTLS_ , and _NonEnc_ , their FPRs are noticeably higher compared to the alerts associated with Active risks. This may be due to the fact that some legitimate services or applications are poorly maintained, resulting in a rise in false positives. In these Passive risks, users may be legitimately using the network, but the accessed applications or services lack proper maintenance. Finally, across all cases, we observe that the detection rate of positive samples, reflected by the TPR, consistently exceeds the detection rate of negative samples, represented by the TNR (True Negative Rate). Since _𝑇 𝑁𝑅_ = 1 − _𝐹 𝑃 𝑅_ , this implies that our models are biased towards correctly classifying positive samples. 



**Fig. 5.** Heat-map of the Euclidean distances between risk activities with only nonshared positive users, segmented according Desktop and Smartphone devices. 

Compared to the open-source datasets designed for supervised learning, as discussed in Section 2, the predictive performance of the proposed method is similar to other initiatives that rely on real data analysis and focus on behaviour analysis. For instance, using the ISA (2019) dataset, the authors in Folino et al. (2023) achieved an F1score of 0.85 with Gradient Boosting techniques, which is comparable to the F1-score reported in this manuscript. However, it is important to consider that our case encompasses a broader scope in terms of the number of users and devices, as we incorporate both desktops and smartphones devices. Additionally, the ISA dataset is carried in a more controlled environment, as an agent is installed on every mobile phone. On the other hand, when comparing results to datasets focused on different tasks, such as botnet or intrusion detection, the models exhibit better generalization due to the nature of these tasks. These tasks often involve more distinct patterns and less class overlap, making classification easier. Moreover, these datasets – often simulated in controlled environments – allow for better balancing of noise and false positives, further enhancing generalization. In this context, datasets based on lab-simulated data for supervised learning, such as the CTU13 (2014) dataset, enable near-perfect generalization of behaviour. For instance, using the Gradient Boosting algorithm trained on this dataset achieves an F1-score close to 1, as shown in Oliveira and Sassi (2021) and Hastie et al. (2009). Other examples of supervised learning applications include the UNSW-15 (2015) dataset, which achieves an F1-score of approximately 94% (Kasongo and Sun, 2020) when using the XGBoost algorithm, and the Aposemat IoT-23 (2020) dataset, where the Extra Trees Classifier achieves near-perfect F1-score (Alharbi and Alsubhi, 2021) (see Table 4). 

8 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 

**Table 4** 

##### **CRediT authorship contribution statement** 

Hyperparameter Optimization Space and Best hyper-parameters. 

|Hyperparameter search space||
|---|---|
|Hyperparameter|Search space|
|Learning rate(lr)|0.1 , 0.01|
|Max depth(md)|3, 5, 7, 10|
|MinChild weight(mcw)|1, 3, 5|
|# of estimators(nest)|100, 200|
|Reg alpha(ra)|0, 0.1|
|Best hyperparameters||
|Entity<br>Dataset ID|Best parameters|
|DE<br>Crypto|lr:0.01, md:3, mcw:5, nest:100, ra:0.1|
|DE<br>OutFlash|lr:0.01, md:3, mcw:1, nest:200, ra:0.1|
|DE<br>OutTLS|lr:0.01, md:3, mcw:5, nest:100, ra:0.1|
|DE<br>P2P|lr: 0.01, md:5, mcw:5, nest:100, ra:0.1|
|DE<br>NoNEnc|lr:0.01, md:7, mcw:5, nest:100, ra:0|
|DE<br>Phishing|lr:0.1, md:7, mcw:1, nest:100, ra:0.1|
|SM<br>Crypto|lr:0.01, md:7, mcw:3, nest:100, ra:0|
|SM<br>OutFlash|lr:0.01, md:3, mcw:3, nest:100, ra:0|
|SM<br>OutTLS|lr:0.01, md:5, mcw:3, nest:100, ra:0.1|
|SM<br>P2P|lr:0.01, md:3, mcw:5, nest:100, ra:0.1|
|SM<br>NoNEnc|lr:0.01, md:3, mcw:5, nest:100, ra:0|
|SM<br>Phishing|lr:0.01, md:3, mcw:1, nest:100, ra:0.1|



**Albert Calvo:** Writing – review & editing, Writing – original draft, Methodology, Investigation, Formal analysis, Conceptualization. **Santiago Escuder:** Writing – original draft, Methodology, Investigation, Formal analysis. **Nil Ortiz:** Validation, Resources, Methodology, Data curation. **Josep Escrig:** Writing – review & editing, Validation, Supervision, Resources, Project administration. **Maxime Compastié:** Writing – review & editing, Validation, Funding acquisition. 

##### **Declaration of competing interest** 

The authors declare the following financial interests/personal relationships which may be considered as potential competing interests: Maxime Compastie reports financial support was provided by Internet Research Center. Maxime Compastie reports a relationship with Internet Research Center that includes: employment. If there are other authors, they declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

##### **Acknowledgements** 

##### **5. Conclusion** 

This paper introduces one of the earliest efforts to create an opensource behavioural dataset, featuring a comprehensive set of risk activities labelled from real-world entities from a regional state Spanish university. Our analysis shows that the labelled activities exhibit strong statistical significance and deliver promising predictive performance, suggesting that users with identified risk behaviours possess distinct, uniquely identifiable patterns. Given the inherent challenges in generating real-world ground-truth multimodal datasets within the cybersecurity domain, this dataset is particularly valuable. We believe that the unique contribution of RBD24 can significantly enhance the development and validation of cybersecurity models focused on user and entity behaviour analytics. 

This work was performed in collaboration with the Cybersecurity Agency of Catalonia and received funding from the CDTI CERVERA research and innovation program supported under Grant Agreement no. CER-20231019 and ExtremeXP (EXPerimentation driven and user eXPerience oriented analytics for eXtremely Precise outcomes and decisions) supported under Grant Agreement no. 101093164. The content of this article does not reflect the official opinion of the European Union, the CDTI, or any other institution. Responsibility for the information and views expressed therein lies entirely with the authors. 

##### **Appendix. RBD24 proposed indicators** 

See Table A.1. 

**Table A.1** 

|DNS indicators||||
|---|---|---|---|
|Feature ID|Feature name|Feature type|Description|
|ID_TW|ID|–|TW Identifier|
|DNS_timestamp|Timestamp|–|TW Timestamp|
|DNS_count|Count of DNS Events|Volumetry|A simple counter of events|
|DNS_interlog|Interlog DNS Occurrence|Volumetry|Interlog time between logs|
|DNS_pro_tcp|Protocol TCP Ratio|Protocol Usage|Ratio of TCP events in the sequence|
|DNS_pro_udp|Protocol UDP Ratio|Protocol Usage|Ratio of UDP events in the sequence|
|DNS_rcode_noer|Ratio of Noerror rcode|Status Code|Ratio of Noerror rcode events|
|DNS_rcode_nxd|Ratio of Nxdomain rcode|Status Code|Ratio of events with Nxdomain rcode|
|DNS_noauth|Auth Answer|Status Code|Ratio of events with positive authoritative answer|
|DNS_compromised|Compromised domains|Domain Usage|Ratio of events with compromised domains|
|DNS_socialmedia|SocialMedia domains|Domain Usage|Ratio of events with socialmedia domains|
|DNS_ip_usage|Compromised IP|Domain Usage|Ratio of events with compromised IPs|
|DNS_non_reserved_dstport|Non-reserved port dst|Port Usage|Ratio of events using ports higher than 1000|
|DNS_non_reserved_srcport|Non-reserved port src|Port Usage|Ratio of events using ports higher than 1000|
|DNS_usual_dstport_ratio|Usual source port|Port Usage|Ratio of events using usual source ports (5353 & 53)|
|DNS_usual_srcport_ratio|Usual destination port|Port Usage|Ratio of events using usual destination ports (5353 & 53)|
|HTTP indicators||||
|Feature ID|Feature name|Feature type|Description|
|HTTP_timestamp|Timestamp|–|TW Timestamp|
|HTTP_count|HTTP events|Volumetry|A simple counter of events|
|HTTP_interlog|Interlog HTTP occurrence|Volumetry|Interlog time between logs|
|HTTP_reqlen|HTTP Request body Length|Property|HTTP Request body Length|
|HTTP_reslen|HTTP Response body Length|Property|HTTP Response body Length|
|HTTP_metget|HTTP Method GET|Protocol|Ratio of HTTP GET methods in the sequence|
|HTTP_metpost|HTTP Method POST|Protocol|Ratio of HTTP POST methods in the sequence|



( _continued on next page_ ) 

9 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 

**Table A.1** ( _continued_ ). 

|DNS indicators<br>Feature ID|Feature name|Feature type|Description|
|---|---|---|---|
|HTTP_methead|HTTP Method HEAD|Protocol|Ratio of HTTP HEAD methods in the sequence|
|HTTP_metput|HTTP Method PUT|Protocol|Ratio of HTTP PUT methods in the sequence|
|HTTP_metdel|HTTP Method DELETE|Protocol|Ratio of HTTP DELETE methods in the sequence|
|HTTP_st40x|HTTP status code 40x|Status Code|Ratio of events with status code 40x Error|
|HTTP_st20x|HTTP status code 20x|Status Code|Ratio of events with status code 20x Success|
|HTTP_st30x|HTTP status code 30x|Status Code|Ratio of events with status code 30x (redirect)|
|HTTP_user_agent|HTTP User Agent|Property|Ratio of HTTP events using a common User Agent|
|SSL indicators||||
|Feature ID|Feature name|Feature type|Description|
|SSL_timestamp|Timestamp|–|TW Timestamp|
|SSL_count|SSL events|Volumetry|A simple counter of events|
|SSL_interlog|Interlog SSL occurrence|Volumetry|Interlog time between logs|
|SSL_ver10|SSL Version 10|Protocol|Ratio of events using SSL version 10|
|SSL_ver20|SSL Version 20|Protocol|Ratio of events using SSL version 20|
|SSL_ver30|SSL Version 30|Protocol|Ratio of events using SSL version 30|
|SSL_established|SSL Established|Property|Ratio of SSL Established connections|
|SMTP indicators||||
|Feature ID|Feature name|Feature type|Description|
|SMTP_timestamp|Timestamp|–|TW Timestamp|
|SMTP_count|SMTP events|Volumetry|A simple counter of events|
|SSL_interlog|Interlog SMTP occurrence|Volumetry|Interlog time between logs|
|SMTP_meanhops|Mean Hops|Property|Mean hops of received emails|
|SMTP_subjlen_chars|Subject Length (chars)|Property|Mean length of the subjects (chars)|
|SMTP_subjlen_words|Subject Length (words)|Property|Mean length of the subjects (words)|
|SMTP_wordchar_ratio|Words/Chars Ratio|Property|subject_words//subject_chars|
|SMTP_phishing_words|Phishing Words|Property|Phishing words in the email subject|
|SMTP_reply|Incoming Reply Emails|Property|Number of incoming emails that are replies|
|SMTP_forward|Incoming Forward Emails|Property|Number of incoming emails that are forwards|
|SMTP_spam|Incoming Spam Emails|Property|Number of incoming emails marked as spam|
|SMTP_normal_files|Normal Files|Property|Number of normal files attached|
|SMTP_attached_files|Attached Files|Property|Number of files attached|
|SMTP_hazard_ext|Hazardous Extensions|Property|Number of hazardous extensions found|
|SMTP_hazard_filenames|Hazardous Filenames|Property|Number of hazardous filenames|



##### **Data availability** 

The dataset is shared in zenodo. 

##### **References** 

- Akash, N.S., Rouf, S., Jahan, S., Chowdhury, A., Uddin, J., 2022. Botnet detection in IoT devices using random forest classifier with independent component analysis. J. Inf. Commun. Technol. 21 (2), 201–232. http://dx.doi.org/10.32890/jict2022.21.2.3, URL: https://e-journal.uum.edu.my/index.php/jict/article/view/15424. Number: 2. 

- Alanazi, M., Aljuhani, A., 2022. Anomaly detection for internet of things cyberattacks. Comput. Mater. Continua 72 (1), 261–279. http://dx.doi.org/10.32604/cmc.2022. 024496, URL: https://www.techscience.com/cmc/v72n1/46892. 

- Alharbi, A., Alsubhi, K., 2021. Botnet detection approach using graph-based machine learning. IEEE Access 9, 99166–99180. http://dx.doi.org/10.1109/ACCESS. 2021.3094183, URL: https://ieeexplore.ieee.org/abstract/document/9471889. Conference Name: IEEE Access. 

- Anderson, R., Barton, C., Böhme, R., Clayton, R., Gañán, C., Grasso, T., Levi, M., Moore, T., Vasek, M., 2019. Measuring the changing cost of cybercrime. In: Proceedings of the 18th Annual Workshop on the Economics of Information Security. WEIS 2019, Boston, pp. 1–32. 

- Bitton, R., Boymgold, K., Puzis, R., Shabtai, A., 2020. Evaluating the information security awareness of smartphone users. In: Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems. CHI ’20, Association for Computing Machinery, New York, NY, USA, pp. 1–13. http://dx.doi.org/10.1145/3313831. 3376385. 

- Calvo, A., Escuder, S., Escrig, J., Arias, M., Ortiz, N., Guijarro, J., 2023. A datadriven approach for risk exposure analysis in enterprise security. In: 2023 IEEE 10th International Conference on Data Science and Advanced Analytics (DSAA). IEEE, Thessaloniki, Greece, pp. 1–9. http://dx.doi.org/10.1109/DSAA60987.2023. 10302480, URL: https://ieeexplore.ieee.org/abstract/document/10302480. 

- Catak, F.O., Yazı, A.F., 2021. A benchmark API call dataset for windows PE malware classification. http://dx.doi.org/10.48550/arXiv.1905.01999, URL: http: //arxiv.org/abs/1905.01999. arXiv:1905.01999 [cs]. 

- Catak, F.O., Yazı, A.F., Elezaj, O., Ahmed, J., 2020. Deep learning based sequential model for malware analysis using windows exe API calls. PeerJ Comput. Sci. 6, e285. http://dx.doi.org/10.7717/peerj-cs.285, URL: https://www.ncbi.nlm.nih. gov/pmc/articles/PMC7924690/. 

- Chen, T., Guestrin, C., 2016. Xgboost: A scalable tree boosting system. In: Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining. KDD ’16, Association for Computing Machinery, New York, NY, USA, pp. 785–794. http://dx.doi.org/10.1145/2939672.2939785, URL: https://dl.acm. org/doi/10.1145/2939672.2939785. 

- Day, J., Zimmermann, H., 1983. The OSI reference model. Proc. IEEE 71 (12), 1334– 1340. http://dx.doi.org/10.1109/PROC.1983.12775, URL: https://ieeexplore.ieee. org/abstract/document/1457043. Conference Name: Proceedings of the IEEE. 

- ENISA, E., 2021. Telecom security incidents 2021. URL: https://www.enisa.europa.eu/ publications/telecom-security-incidents-2021. 

- Faker, O., Dogdu, E., 2019. Intrusion detection using big data and deep learning techniques. In: Proceedings of the 2019 ACM Southeast Conference. In: ACM SE ’19, Association for Computing Machinery, New York, NY, USA, pp. 86–93. http://dx.doi.org/10.1145/3299815.3314439. 

- Folino, G., Otranto Godano, C., Pisani, F.S., 2023. An ensemble-based framework for user behaviour anomaly detection and classification for cybersecurity. J. Supercomput. 79 (11), 11660–11683. http://dx.doi.org/10.1007/s11227-023-05049x. 

- García, S., Grill, M., Stiborek, J., Zunino, A., 2014. An empirical comparison of botnet detection methods. Comput. Secur. 45, 100–123. http://dx.doi.org/10. 1016/j.cose.2014.05.011, URL: https://www.sciencedirect.com/science/article/pii/ S0167404814000923. 

- Garcia, S., Parmisano, A., Erquiaga, M.J., 2020. IoT-23: A labeled dataset with malicious and benign IoT network traffic. http://dx.doi.org/10.5281/zenodo.4743746, URL: https://zenodo.org/records/4743746. 

- Greenberg, S., 1988. USing UNIX: COLLECTED TRACES OF 168 USers. Alberta Res. Counc. 1, 1–12, URL: http://hdl.handle.net/1880/45929. 

- Hastie, T., Rosset, S., Zhu, J., Zou, H., 2009. Multi-class AdaBoost. Stat. Interface 2 (3), 349–360. http://dx.doi.org/10.4310/SII.2009.v2.n3.a8, URL: https://link.intlpress. com/JDetail/1806634576447516674. Publisher: International Press of Boston. 

- Heine, F., Laue, T., Kleiner, C., 2020. On the evaluation and deployment of machine learning approaches for intrusion detection. In: 2020 IEEE International Conference on Big Data (Big Data). IEEE, Virtual, pp. 4594–4603. http://dx.doi.org/10.1109/ BigData50022.2020.9378479. 

- Highnam, K., Arulkumaran, K., Hanif, Z.D., Jennings, N., 2021. BETH dataset: Real cybersecurity data for unsupervised anomaly detection research. In: Proceedings of the Conference on Applied Machine Learning for Information Security. 3095, ceur-ws.org, Arlington, Virginia, pp. 1–12, URL: https://www.semanticscholar. 

10 

_A. Calvo et al._ 

_Computers & Security 150 (2025) 104290_ 

org/paper/BETH-Dataset%3A-Real-Cybersecurity-Data-for-Anomaly-HighnamArulkumaran/e2eaecc74eb46d87b4f6f85ba2693d168dd6d9e2. 

- Iglesias, J., Angelov, P., Ledezma Espino, A., Sanchis de Miguel, A., 2012. Creating evolving user behavior profiles automatically. IEEE Trans. Knowl. Data Eng. 24, 854–867. http://dx.doi.org/10.1109/TKDE.2011.17. 

- Ioannou, G., Louvieris, P., Clewley, N., 2019. A Markov multi-phase transferable belief model for cyber situational awareness. IEEE Access 7, 39305–39320. http: //dx.doi.org/10.1109/ACCESS.2019.2897923. 

- Jing, D., Chen, H.-B., 2019. SVM based network intrusion detection for the UNSWNB15 dataset. In: 2019 IEEE 13th International Conference on ASIC (ASICON). IEEE, Chongqing, China, (ISSN: 2162-755X) pp. 1–4. http://dx.doi.org/10.1109/ ASICON47005.2019.8983598, URL: https://ieeexplore.ieee.org/abstract/document/ 8983598. 

- Kalafut, A., Acharya, A., Gupta, M., 2006. A study of malware in peer-to-peer networks. In: Proceedings of the 6th ACM SIGCOMM Conference on Internet Measurement. IMC ’06, Association for Computing Machinery, New York, NY, USA, pp. 327–332. http://dx.doi.org/10.1145/1177080.1177124. 

- Kasongo, S.M., Sun, Y., 2020. Performance analysis of intrusion detection systems using a feature selection method on the UNSW-NB15 dataset. J. Big Data 7 (1), 105. http://dx.doi.org/10.1186/s40537-020-00379-6. 

- Kozik, R., Pawlicki, M., Choraś, M., 2021. A new method of hybrid time window embedding with transformer-based traffic data classification in IoT-networked environment. Pattern Anal. Appl. 24 (4), 1441–1449. http://dx.doi.org/10.1007/ s10044-021-00980-2. 

- Lin, S., 2006. Suricata/files/rules/emerging-p2p.rules at master seanlinmt/suricata. URL: https://github.com/seanlinmt/suricata/blob/master/files/rules/emergingp2p.rules. 

- Manh Tuong, S., 2021. Suricata-rules/emerging-policy.rules at main ⋅ vncloudsco/suricata-rules. URL: https://github.com/vncloudsco/suricatarules/blob/main/emerging-policy.rules. 

- Martín, A.G., Beltrán, M., Fernández-Isabel, A., Martín de Diego, I., 2021. An approach to detect user behaviour anomalies within identity federations. Comput. Secur. 108, 102356. http://dx.doi.org/10.1016/j.cose.2021.102356, URL: https://www. sciencedirect.com/science/article/pii/S0167404821001802. 

- Moghaddam, S., Helmy, A., 2011. Multidimensional modeling and analysis of wireless users online activity and mobility: a neural-networks map approach. In: Proceedings of the 14th ACM International Conference on Modeling, Analysis and Simulation of Wireless and Mobile Systems. MSWiM ’11, Association for Computing Machinery, New York, NY, USA, pp. 401–408. http://dx.doi.org/10.1145/2068897.2068965. 

- Moustafa, N., Slay, J., 2015. UNSW-NB15: a comprehensive data set for network intrusion detection systems (UNSW-NB15 network data set). In: 2015 Military Communications and Information Systems Conference (MilCIS). IEEE, Canberra, ACT, Australia, pp. 1–6. http://dx.doi.org/10.1109/MilCIS.2015.7348942, URL: https://ieeexplore.ieee.org/document/7348942. 

- Myneni, S., Chowdhary, A., Sabur, A., Sengupta, S., Agrawal, G., Huang, D., Kang, M., 2020. DAPT 2020 - constructing a benchmark dataset for advanced persistent threats. In: Wang, G., Ciptadi, A., Ahmadzadeh, A. (Eds.), Deployable Machine Learning for Security Defense. In: Communications in Computer and Information Science, Springer International Publishing, Cham, pp. 138–163. http://dx.doi.org/ 10.1007/978-3-030-59621-7_8. 

- Myneni, S., Jha, K., Sabur, A., Agrawal, G., Deng, Y., Chowdhary, A., Huang, D., 2023. Unraveled — A semi-synthetic dataset for advanced persistent threats. Comput. Netw. 227, 109688. http://dx.doi.org/10.1016/j.comnet.2023.109688, URL: https: //www.sciencedirect.com/science/article/pii/S1389128623001330. 

- Neuschmied, H., Winter, M., Stojanović, B., Hofer-Schmitz, K., Božić, J., Kleb, U., 2022. APT-attack detection based on multi-stage autoencoders. Appl. Sci. 12 (13), 6816. http://dx.doi.org/10.3390/app12136816, URL: https://www.mdpi. com/2076-3417/12/13/6816. Number: 13 Publisher: Multidisciplinary Digital Publishing Institute. 

- Nugraha, B., Nambiar, A., Bauschert, T., 2020. Performance evaluation of botnet detection using deep learning techniques. In: 2020 11th International Conference on Network of the Future (NoF). IEEE, Bordeaux, France, pp. 141–149. http: //dx.doi.org/10.1109/NoF50125.2020.9249198, URL: https://ieeexplore.ieee.org/ abstract/document/9249198. 

- Okoli, U.I., Obi, O.C., Adewusi, A.O., Abrahams, T.O., Okoli, U.I., Obi, O.C., Adewusi, A.O., Abrahams, T.O., 2024. Machine learning in cybersecurity: A review of threat detection and defense mechanisms. World J. Adv. Res. Rev. 21 (1), 2286–2295. http://dx.doi.org/10.30574/wjarr.2024.21.1.0315, Last Modified: 2024-01-27T08:42+05:30 Number: 1 Publisher: World Journal of Advanced Research and Reviews. 

- Oliveira, A.S.D., Sassi, R.J., 2021. Behavioral malware detection using deep graph convolutional neural networks. Int. J. Comput. Appl. 174 (29), 1–8, URL: https: //ijcaonline.org/archives/volume174/number29/31858-2021921218/. 

- Salitin, M.A., Zolait, A.H., 2018. The role of user entity behavior analytics to detect network attacks in real time. In: 2018 International Conference on Innovation and Intelligence for Informatics, Computing, and Technologies (3ICT). IEEE, Danvers, MA, pp. 1–5. http://dx.doi.org/10.1109/3ICT.2018.8855782, URL: https: //ieeexplore.ieee.org/abstract/document/8855782. 

- Shashanka, M., Shen, M.-Y., Wang, J., 2016. User and entity behavior analytics for enterprise security. In: 2016 IEEE International Conference on Big Data (Big Data). IEEE, Washington D.C., USA, pp. 1867–1874. http://dx.doi.org/10.1109/BigData. 2016.7840805. 

- Velasco-Mata, J., González-Castro, V., Fidalgo, E., Alegre, E., 2023. Real-time botnet detection on large network bandwidths using machine learning. Sci. Rep. 13 (1), 4282. http://dx.doi.org/10.1038/s41598-023-31260-0, URL: https://www.nature. com/articles/s41598-023-31260-0. Number: 1 Publisher: Nature Publishing Group. 

- Wang, Z., Tu, L., Guo, Z., Yang, L.T., Huang, B., 2014. Analysis of user behaviors by mining large network data sets. Special Section: Innovative Methods and Algorithms for Advanced Data-Intensive Computing, Future Gener. Comput. Syst. Special Section: Innovative Methods and Algorithms for Advanced Data-Intensive Computing, 37, 429–437. http://dx.doi.org/10.1016/j.future.2014.02.015.URL: https: //www.sciencedirect.com/science/article/pii/S0167739X14000405, 

- Yin, Y., Jang-Jaccard, J., Xu, W., Singh, A., Zhu, J., Sabrina, F., Kwak, J., 2023. IGRFRFE: a hybrid feature selection method for MLP-based network intrusion detection on UNSW-NB15 dataset. J. Big Data 10 (1), 15. http://dx.doi.org/10.1186/s40537023-00694-8. 

11 

