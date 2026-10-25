Applied Soft Computing Journal 167 (2024) 112447 



Contents lists available at ScienceDirect 

# Applied Soft Computing 

journal homepage: www.elsevier.com/locate/asoc 



## Detection of advanced persistent threat: A genetic programming approach 



### Abdullah Al Mamun<sup>a,∗</sup> , Harith Al-Sahaf<sup>a,b</sup> , Ian Welch<sup>a</sup> , Masood Mansoori<sup>a</sup> , Seyit Camtepe<sup>c</sup> 

a _School of Engineering and Computer Science, Victoria University of Wellington, Wellington, New Zealand_ b _College of Information Technology Engineering, Al-Zahraa University for Women, Karbala, Iraq_ c _Data61, CSIRO, Australia_ 

#### A R T I C L E I N F O 

#### A B S T R A C T 

_Keywords:_ APT Advanced Persistent Threat Evolutionary computation Genetic Programming Machine Learning CKC 

Advanced Persistent Threats (APTs) are an intimidating class of cyberattacks known for their persistence, sophistication, and targeted nature. These attacks, coordinated by highly motivated adversaries, pose a grave risk to organizations and individuals, often operating stealthily and evading detection. While existing research primarily focuses on applying Machine Learning (ML) methods to analyze network traffic data for APT detection, this article introduces a novel approach that utilizes Genetic Programming (GP). The proposed method not only detects APT attacks but also identifies their specific life cycle stages through the evolutionary capabilities of GP. Its effectiveness lies in its ability to excel in detecting intricate patterns, even within classes with a limited number of instances, a feat that is often challenging for traditional ML techniques. The method involves evolving and optimizing its models to effectively learn and adapt to complex APT behaviors. Experimentation with a publicly available dataset showcases the efficacy of the proposed method across diverse APT stages. The results demonstrate that the proposed method, GPC, achieves a 3.71% improvement in balanced accuracy compared to the best-performing model from related works. Moreover, a thorough analysis of the best-evolved GP model uncovers valuable insights about identified features and significant patterns. This research advances the APT detection paradigm by leveraging GP’s capabilities, providing a fresh and effective perspective on countering these persistent threats. 

##### **1. Introduction** 

The rising frequency of Advanced Persistent Threats (APTs) underscores the critical need for enhanced detection mechanisms. APTs are characterized by their sophistication, stealthiness, and ability to remain undetected for long periods while exfiltrating sensitive data or disrupting critical systems [1]. These targeted campaigns, often orchestrated by highly skilled and well-funded adversaries such as nation-states or criminal organizations, are customized to infiltrate specific organizations [2]. Successful APTs can result in a wide range of adverse consequences, including intellectual property theft, disruption of business operations, compromise of sensitive data, and threats to national security. The devastating impact of the SolarWinds cyberattack [3], where a Russian-state-sponsored group affected thousands of organizations, serves as a stark reminder of the real-world consequences of these sophisticated threats. 

The sophistication and adaptability of APTs necessitate continuous evolution in detection and mitigation strategies. The growing market for APT protection, anticipated to surpass 15 billion US dollars by 2026 (Fig. 1), underscores the need for innovative solutions. This significant 

growth highlights the increasing awareness of APT-associated risks and the urgency to develop more robust defense strategies. 

Many researchers have explored the use of Machine Learning (ML) techniques to detect APT attacks. For instance, Cho Do Xuan [4] proposed a technique that utilizes Random Forest to detect APT attacks based on abnormal behavior observed in network traffic. In another study, Cho et al. [5] employed deep learning techniques to detect APT attacks by analyzing IP-based network flows. However, it is important to recognize that there is no foolproof solution when it comes to detecting APT attacks, and it necessitates a multifaceted strategy. There are several reasons why existing ML solutions may not be sufficient to fully detect and defend against APT attacks. 

While existing solutions, including intrusion detection systems (IDS) and signature-based approaches, have played a vital role in safeguarding against cyber threats, they often struggle to keep pace with the constantly evolving tactics and techniques employed by APT actors. This struggle stems from several key limitations: 

> ∗ Corresponding author. 

_E-mail addresses:_ abdullah@ecs.vuw.ac.nz (A.A. Mamun), harith.alsahaf@alzahraa.edu.iq (H. Al-Sahaf), ian.welch@vuw.ac.nz (I. Welch), masood.mansoori@ecs.vuw.ac.nz (M. Mansoori), seyit.camtepe@data61.csiro.au (S. Camtepe). 

https://doi.org/10.1016/j.asoc.2024.112447 

Received 16 October 2023; Received in revised form 26 September 2024; Accepted 6 November 2024 

Available online 17 November 2024 

1568-4946/© 2024 The Author(s). Published by Elsevier B.V. This is an open access article under the CC BY license ( http://creativecommons.org/licenses/by/4.0/ ). 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 



**Fig. 1.** Revenue from APT protection market worldwide from 2015 to 2026. 

- **Difficulty in Identifying Novel Attack Vectors:** Traditional security solutions rely heavily on pre-defined signatures or rules to identify malicious activities. However, the evolving nature of APTs allows them to exploit novel attack vectors, rendering signature-based approaches ineffective against previously unseen threats [6]. 

- **Limited Ability to Analyze Complex Data Volumes:** The everincreasing volume and complexity of network traffic pose a significant challenge for traditional detection methods. Analyzing such vast amounts of data in real-time to identify subtle anomalies indicative of APT activity is often computationally prohibitive [7]. 

- **Inability to Adapt to Evolving Tactics:** APT adversaries are adept at adapting their tactics and techniques to circumvent existing defenses. ML models trained on historical data may struggle to identify deviations from established patterns, rendering them vulnerable to novel attack strategies [8]. 

- **Challenges in Multi-Stage Attack Detection:** The multi-stage nature of APT attacks, encompassing reconnaissance, weaponization, persistence, and exploitation, presents significant challenges for traditional detection models. These models may struggle to accurately identify and classify individual stages due to the high dimensionality and intricate relationships within the data. 

Recognizing these limitations highlights the urgent need for innovative and adaptable solutions capable of effectively detecting and mitigating APTs. This research addresses this critical gap by exploring the potential of Genetic Programming (GP) as a novel approach for APT detection. 

GP involves the evolution of computer programs using the Darwinian principle of survival of the fittest, aided by a specialized genetic crossover operator particularly designed for mating computer programs [9]. This methodology is employed to evolve computer programs for solving complex optimization problems. GP evolves computer programs using natural selection, enabling efficient solutions in highdimensional spaces, making it suitable for APT detection in scenarios with a large number of features. Furthermore, GP can adapt to changing environments and learn from limited data, which is crucial due to data imbalance in APT datasets. According to Banzhaf et al. [10] the ability of GP to adapt to changing environments comes from its ability to maintain genetic diversity in the population. By applying GP to network traffic data, this study aims to discover intricate patterns and relationships within the data that may signify previously unseen APT attacks. The successful development of a GP-based classifier for APT detection would offer several key advantages: 

- **Improved Detection Accuracy:** GP’s ability to evolve and adapt, through a fitness function tailored to APT detection, can overcome the limitations of traditional approaches. This may lead to the identification of both known and novel attack vectors, thereby enhancing the overall detection accuracy [11]. 

- **Real-Time Analysis Capability:** GP’s inherent parallelism allows for efficient analysis of large datasets in near real-time, enabling faster detection and response to emerging threats [12]. 

- **Reduced Reliance on Manual Intervention:** GP’s autonomous learning capabilities can minimize the need for manual signature creation and updates, reducing the workload on security personnel and enabling faster adaptation to new threats [13]. 

Furthermore, GP’s versatility is well-established, having demonstrably tackled various challenges across diverse domains, including classification [14], optimization [15], and feature selection [16]. GP’s ability to evolve customized rules enables effective management of imbalanced data, a common challenge for traditional ML models, as demonstrated by Galván-López et al. [17] and other studies. This adaptability positions GP to focus on the unique characteristics of APT behavior, potentially leading to more robust detection methods. 

This research contributes to the ongoing effort to combat APTs by pioneering the exploration of GP as a promising avenue for developing more robust and adaptable detection methods. By addressing the limitations of existing solutions and harnessing the unique capabilities of GP, this research holds the potential to significantly enhance the cybersecurity landscape and protect organizations and individuals from the ever-evolving threat of APTs. 

##### _1.1. Goals_ 

The overall aim of this study is to investigate the potential of GP as a novel approach for the effective classification of APTs across their lifecycle stages. This research employs GP to develop and optimize detection models, utilizing a set of features as inputs and a tailored fitness function. Through evolution, GP autonomously identifies the most relevant features and generates effective classification rules. The specific objectives of this study are as follows: 

- **Develop an individual representation for GP:** Designing an appropriate representation scheme for GP individuals to optimize their learning and evolution for accurate APT detection and classification across various attack stages. 

- **Evaluate GP performance:** Assess the effectiveness of the proposed GP-based method against established benchmarks for APT detection, providing a clear understanding of its relative strengths and weaknesses. 

- **Investigate efficiency and effectiveness:** Conduct a comprehensive analysis of the GP-based approach, evaluating its computational efficiency alongside its ability to accurately identify and classify APTs. 

- **Identify key features for APT detection:** Analyze the bestperforming GP individuals to determine the most significant features they utilize by GP for accurate APT detection, providing valuable insights into crucial indicators of APT activity. 

##### _1.2. Contributions_ 

The main contributions made by this study are twofold: 

- **Novel GP-based APT detection and classification method:** This research proposes a novel method utilizing GP for detecting and classifying APTs across their lifecycle stages. This method offers an innovative approach to overcome the limitations of traditional methods, potentially providing greater adaptability and effectiveness against evolving threats. 

- **In-depth analysis of significant attack patterns:** Through GP’s ability to identify important features, the research aims to uncover significant patterns within the data utilized for detection. By analyzing the most prominent features utilized by the bestperforming GP individuals will offer valuable insights into the crucial characteristics of APT behavior. 

2 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 



**Fig. 2.** Various stages of the Cyber Kill Chain. 

##### _1.3. Organization_ 

The rest of this paper is organized as follows: Section 2, provides a brief background discussing both the Cyber Kill Chain and GP, while Section 3 presents a literature review on recent works. Section 4, presents the proposed APT detection method. Technical details of the experiments are presented in Section 5, followed by the results and related discussion in Section 6. Further analysis is discussed in Section 7, and the article concludes with a summary and future work in Section 8. 

##### **2. Background** 

This section provides a brief discussion on the Cyber Kill Chain and GP. 

##### _2.1. Cyber Kill Chain_ 

The ‘‘Cyber Kill Chain’’ is a methodology used to describe the stages of a cyber attack [18]. It was developed by Lockheed Martin’s Computer Security Incident Response Team (LM-CIRT)<sup>1</sup> to help organizations understand and defend against cyberattacks, which may include APTs by breaking down the stages of a cyber attack and identifying potential countermeasures for each stage. The kill chain model outlines the various stages of an APT attack, from initial compromise to the final stages of exfiltration and exploitation. According to the model as shown in Fig. 2, it identifies what adversaries must complete to achieve their objectives, offering valuable insights into the tactics and strategies employed by cyber adversaries throughout the attack life cycle. These stages are: 

- **Reconnaissance** : The attacker gathers information about the target system and its vulnerabilities. 

- **Weaponization** : The attacker creates malware or another form of weapon to exploit the vulnerabilities of the target system. 

- **Delivery** : The attacker delivers the weapon to the target system, typically through social engineering, e.g., a phishing email, or other means. 

- **Exploitation** : The weapon is executed and used to gain a foothold in the target system. 

- **Installation** : The attacker installs additional tools or malware to maintain access to the target system. 

- **Command and control** : The attacker establishes communication channels to manage and control the compromised system. 

- **Actions on objectives** : The attacker achieves their ultimate goal, which can be to steal sensitive information, disrupt operations, or cause other types of damage. 

Building upon the existing research on APT attack models, Alshamrani et al. [19] identified a key limitation: many models either offer a high-level of detail with numerous stages (comprehensive but complex) or focus only on core aspects (more usable but less specific). While all 

> 1 https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-killchain.htm 

these models share common phases of operation (e.g. reconnaissance, intrusion, data exfiltration), their varying granularity can impact their effectiveness. 

To address this, they proposed a novel APT life cycle with five core phases: Reconnaissance, Foothold Establishment, Lateral Movement, Data Exfiltration, and Post-Exfiltration. This model strikes a balance between comprehensiveness and usability, providing a framework adaptable to various APT attacks. Understanding attacker tactics and techniques within these phases can be crucial for improving APT detection and prevention strategies. 

##### _2.2. Genetic programming_ 

Genetic programming (GP) is an evolutionary algorithm that uses the principles of natural selection to automatically generate computer programs [9]. GP starts with a population of random computer programs represented as trees, where each node in the tree represents an operation, such as addition or multiplication. These trees consist of both internal nodes, which represent operations or functions, and terminal nodes, which represent input variables or constants. 

The generated programs are evaluated based on a fitness function, which measures how well they perform a specific task. The individuals with better performance, i.e., fitness value, are more likely to be selected to participate in creating the subsequent generation. 

Over time, the population evolves through successive generations, with the fittest programs surviving and reproducing, whereas less fit programs are eliminated. Through this process of selection, crossover, and mutation; GP can automatically generate programs that solve complex problems in a wide range of domains, such as image recognition [20], optimization [21], and playing games [22]. 

There are several types of GP, such as Tree-based GP, Stack-based GP, Linear GP (LGP), and Extended Compact Genetic Programming (ECGP) [23]. Among these GP representations, we have decided to choose Tree-Based Genetic Programming due to its flexibility and ability to represent complex solutions in the form of trees. The hierarchical structure of the tree allows for the evolution of programs with variable lengths and diverse compositions, making it well-suited for capturing intricate patterns and relationships in the data. Several parameters are used to define the structure of a Tree-based GP: 

The depth of the tree refers to the length of the longest path from the root node to a terminal node, which in turn sets the GP tree’s maximum size. This depth impacts on the computational complexity and the ability of the GP algorithm to find the optimal solution. 

The function set defines the set of functions that can be used in the GP tree as non-leaf nodes. Common functions in the function set include arithmetic operations such as addition (+), subtraction (−), multiplication (∗), and division (∕), as well as logical operations such as ‘‘if-then-else’’. 

The terminal set defines the set of terminal nodes representing the variables/inputs or features used in the solution. The terminal set can include various attributes of the problem, such as numeric or categorical variables, which can be readily utilized. 

Fig. 3, represents the program _𝑚𝑖𝑛_ (5 _𝑦_ + _𝑥, 𝑥_ + 2 _𝑥_ ) as a GP tree structure. The terminal nodes in this tree are the variables _𝑥_ , _𝑦_ , and constants 2 and 5. The non-leaf nodes are functions chosen from the function set, such as addition (+), subtraction (−), multiplication (∗), and _𝑚𝑖𝑛_ in this example. 

##### **3. Literature review** 

In recent years, a growing body of research has been aimed at developing various methods for detecting APTs, each with its strengths and limitations. This section will discuss the current state of APT detection research. 

3 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 



**Fig. 3.** Genetic programming representation. 

##### _3.1. Signature-based detection_ 

Signature-based detection is a traditional and widely used approach for identifying malicious activity. It relies on pre-defined patterns or ‘‘signatures’’ known to be associated with specific attacks or malware [24–26]. These signatures can represent specific patterns in network traffic, system logs, file content, or other data sources. The approach offers strengths, including efficiency in matching real-time attacks against known signatures and ease of implementation requiring lower expertise compared to more sophisticated approaches [24]. 

However, signature-based detection’s primary drawback lies in its inability to detect novel or evolving threats [27]. This limitation is particularly problematic against APTs. Additionally, maintaining an upto-date signature database is challenging in a rapidly evolving threat landscape [24]. These limitations highlight the need for complementary or alternative approaches to strengthen cybersecurity defenses effectively. 

In addition to traditional signature-based methods, recent research explores novel approaches to address evolving cyber threats. For instance, Krishnapriya and Chithralekha [28] proposed an authenticationbased detection approach for spear-phishing emails, a common initial attack vector for APTs. This technique leverages stylometric, gender, and personality traits extracted from a trusted email dataset. While promising, potential challenges include difficulties in accurately distinguishing legitimate and malicious emails, especially when attackers employ sophisticated evasion tactics. 

##### _3.2. Anomaly-based detection_ 

Anomaly-based detection takes an alternative approach by identifying unusual behavior within data sources like network traffic and system logs [29]. It holds promise for detecting APTs by focusing on deviations from established patterns thus providing a signatureindependent approach. However, this method encounters challenges, notably high false-positive rates. Defining ‘‘normal’’ user behavior and network states is inherently complex, often leading to legitimate activities being misclassified as anomalies. This results in numerous false alarms, consuming valuable security resources [30]. 

Additionally, Debatty et al. [31] proposed an HTTP traffic graphbased APT detection algorithm. While they implemented a complete system with a web-based interactive interface, the study did not address the algorithm’s potential challenges in real-world settings. Further research is needed to evaluate its effectiveness against more diverse and sophisticated attacks. 

Zhao et al. [32] focused on extracting big data features to characterize different properties of malware-related DNS and their query patterns. However, the system might ineffective against malware that does not rely on domains and its focus on DNS traffic could limit its ability to detect infections using alternative communication methods. 

Moreover, Myneni et al. [33] highlighted the complexity of accurately detecting APT attacks using existing anomaly detection models. 

Their findings emphasize the necessity for more advanced learning models to achieve significant improvements in this domain. While anomaly-based detection presents a unique approach to cybersecurity, its limitations concerning false positives and the imperative for further refinement restrict its efficacy as a standalone solution against APTs. 

##### _3.3. Machine learning approaches_ 

Machine learning (ML) has emerged as a promising technique in the field of cybersecurity, including APT detection [34–36]. Various methods like monitoring [37] and data mining [38] have been employed with some success. However, traditional ML models like decision trees and support vector machines often struggle to effectively distinguish the different stages of complex APTs [39]. 

Several researchers have proposed ML approaches for APT detection, each offering unique methodologies and insights. For instance, Ghafir et al. [40] introduced MLAPT, a system comprising three phases: threat detection, alert correlation, and attack prediction. Utilizing eight detection modules targeting different APT life cycle phases, their method outperformed existing APT detection techniques. Similarly, Sexton et al. [41] proposed a statistical APT detector, correlating events across different stages statistically. However, both approaches require expert knowledge for setup and maintenance, limiting their widespread implementation. 

Another notable contribution is the Context-Based APT Detection Framework proposed by Giura and Wang [42]. This framework conceptualizes APT attacks as pyramids, with the top representing the attack goal and lateral planes denoting involved environments. While offering context awareness, its implementation also demands expert knowledge. Additionally, Chandra et al. [43,44] introduced cloud security and spear-phishing-based APT detection techniques, respectively. Despite their innovative approaches, these methods rely heavily on manual intervention and may not address the comprehensive detection of various APT stages. 

Furthermore, Balduzzi et al. [45] proposed SPuNge, which collects user-side data and applies machine learning algorithms for anomaly detection, focusing on the reconnaissance stage of APTs. Similarly, Nissim et al. [46] developed an active-learning-based method for detecting malicious Portable Document Format (PDF) files. These approaches, while addressing specific aspects of APTs, may lack the versatility to detect the full spectrum of APT stages. 

More recent contributions include DFA-AD by Sharma et al. [47], a multi-phase ML-based APT detection system utilizing classifiers like GP and Support Vector Machines (SVM). However, similar to previous methods, DFA-AD requires considerable expertise for implementation. Additionally, Shenwen et al. [48] proposed an APT detection method based on big data processing, utilizing the K-Nearest Neighbors ( _𝑘_ -NN) algorithm. Nevertheless, neither of these methods comprehensively addresses the detection of various APT stages, highlighting the ongoing challenge in developing versatile APT detection solutions. 

While the utilization of ML in APT detection demonstrates significant potential, these approaches often encounter notable limitations. One such challenge is the limited ability of traditional ML models to accurately differentiate between the diverse stages of complex APTs. This difficulty arises from the inherent constraints of these models in capturing the intricate relationships within the data, as highlighted by [49]. Moreover, many ML-based solutions rely heavily on expert knowledge for setup and maintenance, posing a barrier to their wider adoption and practical implementation. 

Furthermore, several studies tend to focus on specific aspects or stages of the APT lifecycle, rather than providing a comprehensive approach to identify and classify APTs across their diverse phases. This narrow focus can limit the effectiveness of these solutions in detecting the entirety of APT activities. As a result, there is a growing need for more versatile and adaptable detection methods to address these challenges effectively. 

4 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 

##### _3.4. Deep Learning techniques_ 

Deep Learning (DL) holds immense promise for APT detection, as evidenced by research conducted by [50], which extensively reviews DL techniques in this domain. These methods offer several advantages, including their ability to model complex relationships within data and handle large volumes of information efficiently. For instance, Yin et al. [51] proposed a recurrent neural network (RNN) intrusion detection method, showcasing DL’s effectiveness in improving intrusion detection systems’ performance for both binary and multiclass classification problems. Additionally, DL approaches, such as the multi-vector multistage modeling proposed by [52], provide a comprehensive framework for understanding APTs by modeling them as multi-dimensional events, thereby enhancing detection accuracy. 

Moreover, DL-based techniques demonstrate high accuracy in detecting known anomalies, as illustrated by Andropov et al. [53]. These methods leverage specific neural network architectures and data aggregation techniques to achieve remarkable accuracy rates. Furthermore, DL has shown promise in proactive APT detection, as seen in the study by [54], which focuses on identifying long attack sequences in the Industrial Internet of Things (IIoT) context. By utilizing deep learning models like Bidirectional Encoder Representations from Transformers (BERT), researchers have successfully reduced false alarm rates, enhancing the efficiency of APT detection systems. 

Despite these advancements, DL approaches in APT detection encounter certain limitations. One major challenge is their computational demands, particularly for complex models like RNNs, which require significant hardware resources and may be computationally expensive to train and deploy. Additionally, DL methods may struggle with unsupervised learning tasks, as highlighted by [55], who explored the use of autoencoders for detecting APTs. While these techniques show promise, they may require further adaptation and struggle to capture complex relationships within data effectively. 

While Deep Learning offers significant potential for APT detection, its limitations in computational demands, interpretability, scope, potential for overfitting, and challenges with unsupervised learning highlight the need for alternative approaches that can overcome these challenges. 

##### _3.5. Other detection methods_ 

While Deep Learning offers promising avenues, other detection methods tackle APT threats with varying approaches. Atapour et al. [56] proposed models representing APT attacks using kill chains, labeled transition diagrams, and message sequence diagrams. While effective in identifying specific features, their approach remains primarily theoretical and lacks practical implementation [57]. 

Challenges in Multi-Step Attacks are highlighted in a survey by Navarro et al. [58], who point out the inherent difficulties in detecting complex multi-step attacks. These challenges include information overload in network data, increasing difficulty in identifying connections as attack steps grow, unpredictable attacker behavior, and technical limitations of network infrastructure. 

Additionally, Patil et al. [59] introduced E-Audit, a hybrid approach for maintaining the causality of threat-likely events that correlates the threat-likely events directly from the audit logs. E-Audit is capable of identifying in-progress threat-like events, failed attack attempts, and successful attack-relevant events and finally provides the attack kill chain. However, the paper acknowledges potential false positives for sequences corresponding to rare techniques employed by attackers, indicating a limitation in the system’s ability to distinguish between legitimate and malicious activities. Furthermore, due to a lack of labeled data for different APT attacks, the sequential model training used in E- Audit may not be optimized for comprehensive detection across diverse attack scenarios. 

Xiong et al. [60] argue against overly complex multiphase models for practical detection, citing challenges in implementation and high 

detection overhead. They stress the need for more practical approaches to address these issues. In response, Milajerdi et al. [61] proposed HOLMES, an approach that uses generated graphs to summarize attacks and facilitate response. This method achieved high precision and low false alarms in simulations, demonstrating its effectiveness in real-time detection scenarios. 

C&C-Based Detection: Wang et al. [62] focused on detecting the HTTP-based C&C phase of APTs. While they introduced concurrent domains (CODD) to measure correlations, the system remains vulnerable to evasion tactics and cannot detect novel attacks. 

White-List Based Detection: [63] proposed a method that generates rules from system logs and utilizes ML for anomaly detection. However, it is limited to detecting only the initial phase of the APT lifecycle. 

While these methods offer diverse perspectives and contributions, limitations like theoretical approaches, difficulty in handling complex attacks, and limited scope highlight the need for adaptable and versatile solutions. 

##### _3.6. Summary_ 

In the landscape of APT detection, various methods have been explored, each with its advantages and limitations. Traditional approaches like signature-based and anomaly-based detection struggle with the complexity and adaptability of APTs. Machine learning and deep learning offer advancements in pattern recognition but face challenges in computational demands, interpretability, and narrow focus. Other methods, while insightful, have limitations in scope or vulnerability to evasion tactics. These limitations highlight the need for a versatile and adaptable solution. GP emerges as a compelling alternative, offering the potential to overcome these limitations through its ability to identify intricate patterns and generate tailored solutions without extensive hand-coding and with greater adaptability to the evolving threat landscape [64–66]. 

##### **4. The proposed method** 

This section provides a detailed discussion of the proposed GP-based APT detection method. The section starts by presenting the method structure to highlight the key components, such as the terminal set, function set, and output of GP. The normalization technique and the fitness function are also discussed. 

##### _4.1. Method structure_ 

The overall structure of the proposed method, as depicted in Fig. 4, involves several key steps. After preprocessing discussed in Sections 5.1–5.3, the dataset was first divided into a _training_ set and a _test_ set. Subsequently, both sets were normalized using the MinMaxScaler (calculated on the training set) discussed in Section 4.4. In the following step, the training set is passed to GP to evolve a model. The best model found at the end of the evolutionary process is then used to perform the classification. This approach ensures that the model is trained on a representative subset of the data and subsequently evaluated on unseen data to gauge its generalization performance. 

For binary classification, the training set was split into two classes, _benign_ and _malicious_ , following the approach outlined by Myneni et al. [33]. Benign behavior was labeled as one class, while other behaviors were labeled as malicious. GP utilized various functions to establish the relationships between features that resulted in the best fitness value. After a certain number (e.g. 50) of generations, the best-evolved model was created and its classification accuracy was evaluated using the test set. Eq. (1) illustrates the process of solving the binary classification problem using the proposed method. In this equation, _𝑥_ represents the score from the best-evolved GP individual, and _class_ 1 and _class_ 2 denote the benign and malicious classes, respectively. Prior to evaluation, 

5 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 





**Fig. 4.** The overall structure of the proposed method. 

the output of the GP individual goes through a sigmoid function to ensure it falls within a specific range (0 and 1). 



The proposed method extends the same GP approach used in binary classification to handle multi-class classification problems. In this approach, the training set is first preprocessed and labeled into multiple classes (as desired), and then fed into the GP algorithm to find the best model with the highest fitness value. Before evaluation, the GP individual’s output is passed through the same sigmoid function. We divided the sigmoid function’s output range into five equal parts, where each part corresponds to a specific class. GP evaluates the fitness value after each generation and tries to improve it in the next generation. 

In order to predict the class label for a given input, we use Eq. (2), where _𝑥_ represents the score from the best-evolved GP individual generated by the proposed method. The equation maps the value of _𝑥_ to one of the _𝑛_ classes using thresholds _𝜃_ 1 _, 𝜃_ 2 _,_ … _, 𝜃𝑛_ −1. Specifically, if _𝑥_ falls below _𝜃_ 1, the input is classified as _class_ 1; if _𝑥_ falls between _𝜃_ 1 and _𝜃_ 2, it is classified as _class_ 2, and so on, until the final _class 𝑛_ . This equation is used to predict the class label when there are multiple classes in the dataset. 



##### _4.2. Evolutionary process_ 

##### **Algorithm 1:** Fitness value calculation for GPC. 



<!-- Start of picture text -->
Input: Individual: 𝑥 (GP Expression or tree representing a potential solution);<br>Training Data: 𝑋𝑡𝑟𝑎𝑖𝑛 = { 𝑥 1 , 𝑥 2 ,  …  , 𝑥𝑛 } (Features);<br>Training Labels: 𝑦𝑡𝑟𝑎𝑖𝑛 = { 𝑦 1 , 𝑦 2 ,  …  , 𝑦𝑛 } (Corresponding labels)<br>Output: Fitness value<br>1 begin<br>2 Feed training data to GP;<br>3 while fitness value ≠ 1 𝑜𝑟 generations ≤ 50 do<br>4 Prediction ;<br>5 Compile 𝑥 into a function: 𝑓 ( 𝑥𝑖 );<br>6 for 𝑖 = 1 to 𝑛 do<br>7 𝑜𝑢𝑡𝑝𝑢𝑡𝑖 = sigmoid( 𝑓 ( 𝑥𝑖 )) ; // Apply sigmoid function to<br>𝑜𝑢𝑡𝑝𝑢𝑡𝑖 to ensure non-negative values<br>8 𝑜𝑢𝑡𝑝𝑢𝑡𝑖 =  𝑓 ( 𝑥𝑖 );<br>9 𝑝𝑟𝑒𝑑𝑖𝑐𝑡𝑒𝑑 _ 𝑙𝑎𝑏𝑒𝑙𝑖 = Classify ( 𝑜𝑢𝑡𝑝𝑢𝑡𝑖 );<br>10 end<br>11 Classify (Function) ;<br>12 if 0 . 0 ≤ 𝑜𝑢𝑡𝑝𝑢𝑡𝑖 ≤ 0 . 20 then<br>13 return "normal";<br>14 end<br>15 else if 0 . 20  < 𝑜𝑢𝑡𝑝𝑢𝑡𝑖 ≤ 0 . 40 then<br>16 return "reconnaissance";<br>17 end<br>18 else if 0 . 40  < 𝑜𝑢𝑡𝑝𝑢𝑡𝑖 ≤ 0 . 60 then<br>19 return "foothold establishment";<br>20 end<br>21 else if 0 . 60  < 𝑜𝑢𝑡𝑝𝑢𝑡𝑖 ≤ 0 . 80 then<br>22 return "lateral movement";<br>23 end<br>24 else<br>25 return "data exfiltration";<br>26 end<br>27 Fitness Calculation ;<br>28 𝑓 𝑖𝑡𝑛𝑒𝑠𝑠 = BalancedAccuracy( 𝑦𝑡𝑟𝑎𝑖𝑛, 𝑝𝑟𝑒𝑑𝑖𝑐𝑡𝑒𝑑 _ 𝑙𝑎𝑏𝑒𝑙𝑠 );<br>29 Output ;<br>30 return 𝑓 𝑖𝑡𝑛𝑒𝑠𝑠<br>31 end<br>32 end<br><!-- End of picture text -->

The evolutionary process used in this study is based on the principles of tree-based GP, which involves the application of genetic operators such as mutation, crossover, and selection to a population of candidate solutions. In this process, each candidate solution represents a possible solution to the APT detection problem, and genetic operators act on the solutions to create new offspring with potentially improved performance. 

The fitness of each solution is evaluated based on its performance on a set of evaluation metrics, with the best ones selected to form the next generation. To ensure continuous improvement, elitism is employed, where the fittest solutions from the previous generation are preserved. Over many generations, the population of candidate solutions evolves, and the solutions become progressively better at performing the desired task. This evolutionary process allows us to explore a large search space of possible solutions and find optimal solutions that may be difficult or infeasible to find using other methods. The core functionality of the evolutionary process is illustrated in Algorithm 1. 

The algorithm depicted here calculates the fitness value for GPC. It starts by compiling a candidate solution (a GP expression or tree denoted as _𝑥_ ) into a mathematical function that can be applied to the training data. The algorithm then iterates over each training instance, passing it through the function and applying the sigmoid function to ensure non-negative values. The classification function categorizes the output into predefined APT stages based on certain thresholds. To evaluate a solution’s quality, the predicted labels are compared with the actual labels using balanced accuracy as the performance metric. This iterative process continues for 50 generations or until the best performance level is reached. By continuously evaluating and selecting solutions with high fitness scores, the algorithm guides the evolutionary process towards progressively better solutions for the problem of APT detection. 

6 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 

##### _4.3. Program representation_ 

In this study, we have used tree-based GP [9], where the leaf nodes of an individual are taken from the terminal set, and all non-leaf nodes of the tree are chosen from the function set. We utilized all the features from the dataset as the terminal set for our GP model. These features were the input variables used by the GP evolutionary algorithm to evolve programs that perform well at APT detection. 

##### _4.3.1. Function set_ 

The function set includes four arithmetic operators: addition, subtraction, division, and multiplication, as well as a conditional _𝑖𝑓_ operator, represented as +, −, ∕, ∗, and _𝑖𝑓_ . The arithmetic operators have their normal meanings, except for ∕ which was used as a protected division to prevent ‘‘divide by zero’’ errors which return 1 if the denominator is zero. The _𝑖𝑓_ operator takes three arguments as input and returns the second argument if the first argument is greater than zero, the third argument is returned otherwise. All nodes in the function set produce a single output and all inputs and outputs of these nodes are floating values, making it possible for the output of one node to be used as input to another node. 

##### _4.3.2. Model output_ 

Each GP tree or individual’s output undergoes processing through a squashing function that restricts the output to a predetermined range. The proposed method uses the sigmoid function, as described in Eq. (3), which provides a continuous value within the range of (0, 1). 1 _𝑠_ ( _𝑥_ ) = (3) 1 + _𝑒_<sup>−</sup><sup>_𝑥_</sup> 

where _𝑥_ is the output of a GP individual, _𝑠_ is the sigmoid function, and _𝑒_ is Euler’s number that has a value approximately equal to 2.17828. 

##### _4.4. Normalization_ 

Since the numerical values of the features in the dataset have different ranges, normalization can be used to scale the values. We used MinMaxScaler normalization, where the minimum value is transformed to 0 and the maximum value is transformed to 1. All of the other values are transformed into a decimal value between 0 and 1. Mathematically, the normalization of a value is defined as: 



where, _𝑣𝑚𝑖𝑛_ and _𝑣𝑚𝑎𝑥_ , are the minimum and maximum values of a given feature respectively, and _𝑣_ is the original feature value. To normalize the test set, we used the same _𝑣𝑚𝑖𝑛_ and _𝑣𝑚𝑎𝑥_ values of the training set, to prevent any bias that may be introduced by having access to the entire dataset. 

##### _4.5. Fitness function_ 

Similar to other evolutionary computation methods, GP relies on a fitness function to guide the search process. In this study, GP is designed to maximize the balanced accuracy score, which is formally defined as: 



Where _𝑁_ is the total number of classes, _𝑐𝑜𝑟𝑟𝑒𝑐𝑡𝑖_ is the number of correctly classified samples in the _𝑖_ th class and _𝑡𝑜𝑡𝑎𝑙𝑖_ is the total number of samples in the _𝑖_ th class. 

##### _5.1. Dataset_ 

While there are several intrusion detection datasets available, those specifically focused on APTs are rare. DAPT-2020 dataset [33] is used in this study, which was created based on the APT attack model proposed by Alshamrani et al. [19]. The description of the features of the dataset is available on the official Github<sup>2</sup> link of CICFlowMeter. 

The DAPT-2020 dataset was created by analyzing network logs collected over five days. To create the dataset, a group of users was given access to a network to perform routine business operations to simulate normal traffic. Another team, the Red Team, composed of experienced cyber-attackers, then performed various real-world APT attacks on the network. The Red Team executed a week-long chain of attacks that involved software exploration, vulnerability exploitation, network foothold establishment, lateral movement, critical service exploitation, and data exfiltration. The Red Team was instructed to be stealthy and to carry out attacks in a way that would not trigger security alarms. Normal users continued with their routine operations throughout the week. Data was collected in the form of PCAP (Packet Capture) files and logs from each host, including system events, authentication logs, and logs from services such as WordPress and File Transfer Protocol (FTP). 

On Monday (the first day), the baseline for normal traffic was established by ensuring that no attacks were carried out. Throughout the rest of the week, as the Red Team carried out its various phases of the attack, the data was collected from all network interfaces. On Tuesday (the second day), the collected data included logs from the exploration and fingerprinting phase of the attack. On Wednesday (the third day), the collected data included logs from the exploitation phase. On Thursday (the fourth day), the data collected included logs from the lateral movement phase. Finally, on Friday (the fifth day), the collected data included logs from the data exfiltration phase. The authors studied various APT attack groups (e.g. APT41) and their methods (e.g. Target breach, RSA SecureID) in constructing the dataset. The methods employed to carry out the attack and create the dataset have been elaborated on in Section 5.2. 

##### _5.2. Attack techniques_ 

**Reconnaissance** : During the reconnaissance stage, several tools were used to identify potential vulnerabilities in the public network. These tools included Nmap, webscarab, sqlmap, dirbuster, nikto, burpsuite, and application account discovery tools. The objective was to discover the directory structure, weak authentication, and authorization to identify potential attack vectors. This information is useful in the later stages of the attack, as it allows attackers to identify the most vulnerable targets and develop a tailored attack plan. This stage was critical for attackers to move laterally and spread their attack within the network, allowing them to gain more access and control. 

**Foothold establishment** : The Foothold establishment stage involved the use of several tools such as PHP reverse shell, netcat, SQL vulnerability exploitation using SQLmap, and XSS exploitation for authentication bypass. Metasploitable was also used during this stage. The techniques employed include PHP reverse shell via DVWA, file upload, and adding malicious users to Badstore. 

**Lateral movement** : During the Lateral Movement stage in the dataset, the attackers used several tools including Nmap for scanning the local network, vsftpd, 2.3.4 vulnerability, weak SSH authentication, MySQL script for CVE-2012-2122, and Metasploit. The attackers explored the internal network from compromised VMs (Public VMs) and obtained a foothold on critical local systems. This stage was critical 

##### **5. Experimental design** 

This section details the experimental design, covering the dataset, attack technique, dataset analysis, and performance evaluation metrics. 

> 2 Available at: https://github.com/ahlashkari/CICFlowMeter/blob/master/ ReadMe.txt. 

7 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 

**Table 1** 

Removing unnecessary or biased features. 

|Index|Feature|Description|
|---|---|---|
|0|_Flow_ _ID_|ID for flow|
|1|_Src_ _IP_|Source IP|
|2|_Src_ _Port_|Source port|
|3|_Dst_ _IP_|Destination IP|
|6|_Timestamp_|Timestamp for each instance|
|36|_Fwd_ _PSH_ _Flags_|Number of times the PSH flag was set in packets traveling in the forward direction (0 for UDP)|
|38|_Fwd_ _URG_ _Flags_|Number of times the URG flag was set in packets traveling in the forward direction (0 for UDP)|
|39|_Bwd_ _URG_ _Flags_|Number of times the URG flag was set in packets traveling in the backward direction (0 for UDP)|
|54|_URG_ _Flag_ _Cnt_|Number of packets with URG|
|61|_Fwd_ _Byts/b_ _Avg_|Average number of bytes bulk rate in the forward direction|
|62|_Fwd_ _Pkts/b_ _Avg_|Average number of packets bulk rate in the forward direction|
|63|_Fwd_ _Blk_ _Rate_ _Avg_|Average number of bulk rate in the forward direction|
|64|_Bwd_ _Byts/b_ _Avg_|Average number of bytes bulk rate in the backward direction|
|65|_Bwd_ _Pkts/b_ _Avg_|Average number of packets bulk rate in the backward direction|
|66|_Bwd_ _Blk_ _Rate_ _Avg_|Average number of bulk rate in the backward direction|
|74|_Fwd_ _Seg_ _Size_ _Min_|Minimum segment size observed in the forward direction|
|71|_Init_ _Fwd_ _Win_ _Byts_|The total number of bytes sent in initial window in the forward direction|



for the attackers to move laterally and spread their attack within the network, allowing them to gain more access and control. 

**Data exfiltration** : Various tools, including FTP, SCP, PyExfil, and Google Drive, were employed for data exfiltration. The attackers used the FTP put method to transfer data from the local machine to the remote server, and large files were uploaded to the remote server using the SCP command. A weak authentication vulnerability (CVE-20177494) was exploited to gain elevated privileges for data exfiltration to a C&C server. Additionally, anonymous user access was used to transfer files to a remote location using the Wput tool. The attackers also used web-based uploads to Google Drive for data exfiltration. 

##### _5.3. Dataset preprocessing_ 

In preparation for model training, the network traffic data spanning five days underwent rigorous preprocessing to ensure its quality and suitability for machine learning tasks. Initially, all CSV files, representing data from each of the five days, were merged using a simple Python script. Subsequently, the combined dataset underwent preprocessing to maintain data integrity, involving the removal of duplicate entries, rows with missing values, and special characters. 

Following preprocessing, the training set was scrutinized to identify features potentially introducing bias towards output labels. A total of 17 such features were identified and subsequently removed, as detailed in Table 1. The first column represents the original index of features from the dataset. The detailed reasons for removing specific features are explained in a later paragraph. 

The DAPT-2020 dataset reveals interesting patterns in the distribution of IP addresses across different attack phases. Notably, distinct destination IPs (Dst IPs) are used for each phase: foothold establishment, lateral movement, and data exfiltration. Conversely, only one of these three IPs is used for reconnaissance. This differentiation suggests potential correlations between specific Dst IPs and corresponding attack stages. Machine learning models can leverage these inherent patterns to improve attack detection accuracy by learning and exploiting these relationships within the data. However, it is important to consider that real-world attack data may not exhibit such clear patterns. For instance, reconnaissance activities in actual attacks might originate from a diverse range of IP addresses rather than being limited to a few as observed in this dataset. Therefore, while utilizing these patterns can be beneficial, it is essential to validate the model’s performance on diverse and realistic datasets to ensure its effectiveness in practical scenarios. 

Similarly, the dataset also exhibits inconsistencies in the usage of source IPs (Src IPs). While two specific Src IPs are used for both reconnaissance and data exfiltration, eight distinct Src IPs are utilized for the other two phases. This inconsistency suggests limited effectiveness 

in relying solely on Src IPs for attack classification. Additionally, the source port feature, representing ephemeral ports, can be excluded from the dataset when applying machine learning models. These ports are randomly assigned and hold little to no inherent information regarding the attack type. Including them can introduce unnecessary noise and potentially hinder the model’s learning process. This exclusion improves the model’s focus on relevant features and potentially enhances its classification performance. 

Moreover, Features such as ‘‘ _Flow ID_ ’’ and ‘‘ _Timestamp_ ’’ did not contribute to the output class labels and were safely removed. These features are metadata or identifiers that do not directly correlate with the characteristics of the attack or benign behavior. ‘‘ _Flow ID_ ’’ typically serves as a unique identifier for network flows, while ‘‘ _Timestamp_ ’’ records the time at which an event occurred. Since these features do not inherently contain information about the nature of the network traffic or the presence of an attack, they were deemed irrelevant to the classification task. Additionally, this removal aligns with the baseline method [33], where similar features were excluded before inputting the dataset into the ML model. 

Furthermore, in real-life scenarios, attackers can easily spoof ‘‘ _Src IP_ ’’ and ‘‘ _Source Port_ ’’ for port scanning or malware injection, making a model based on these parameters ineffective. Furthermore, the data collection process had a limitation in that normal traffic was generated from specific machines (IP addresses), while various attacks were launched from machines with different IP addresses. As a result, these features could be used to identify the traffic of different phases. 

Further analysis of the dataset reveals that twelve features consistently are zero as shown in Table 1. These features lack variability which is crucial for providing meaningful information to a machine learning model, aiding in pattern recognition and prediction. Since these features do not contribute variability and, consequently, no valuable information to a machine learning model, these can be safely removed. Additionally, having such features in the dataset might increase the complexity of the model without adding any value to the predictions. Therefore, eliminating these features can simplify the model, improve its efficiency, and reduce the risk of overfitting. After removing all irrelevant features, the dataset used to train the model comprised 66 features. 

It is important to note that the DAPT-2020 dataset, consisting solely of numerical positive values, presents specific considerations for the function selection within our chosen machine learning approach. This characteristic aligns well with the chosen function set detailed in Section 4.3.1, which comprises basic arithmetic operations suitable for numerical data. This alignment allows the model to effectively explore potential relationships between features and contribute to accurate attack detection. 

Finally, the preprocessed dataset was partitioned into training (80%) and testing (20%) sets using the train_test_split function from the 

8 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 

scikit-learn library. This meticulous process ensured that the model was trained on a clean, well-prepared dataset, thereby enhancing its reliability and robustness in performance. 

##### _5.4. Benchmark schemes_ 

To evaluate the effectiveness of our approach, we compared it against the following benchmark schemes: Additionally, we have expanded the discussion in section 5.1 and section 5.3 to include how IP addresses were handled, why certain features were excluded, and the type of remaining features in the dataset. 

1. **OCSVM** [33]: We used this method as a benchmark, which employs the One-Class Support Vector Machine (OCSVM) for anomaly detection from the APT dataset. The authors of this method trained their model exclusively on normal traffic to establish a baseline for distinguishing anomalies. In our experiments, we adapted the test data labels to binary format, using ‘0’ for normal traffic and ‘1’ for anomalies, consistent with the binary nature of their proposed model. This benchmark allowed us to assess our method’s performance relative to a well-established APT detection technique. 

2. **MLP4NIDS** [67]: The MLP4NIDS approach focuses on intrusion detection, especially for internet-connected embedded devices. It leverages a multi-layer perceptron neural network, featuring hidden layers with 256 nodes each, dropout for regularization, and activation functions to introduce non-linearity. The model is trained using the Adam algorithm to minimize cross-entropy loss. In their experiment, MLP4NIDS achieved intrusion detection accuracy exceeding 99% and maintained a consistently low false positive rate below 0.7%. It is worth noting that the MLP4NIDS evaluation was conducted using the CICIDS2017 dataset. The choice was made because, due to the shortcomings of KDD-cup99 and NSL-KDD, authors restricted their dataset choices to either UNSW-NB15 or CICIDS2017. 

3. **Stacked Auto Encoder with Long Short-Term Memory (LSTMSAE)** – Although traditional stacked auto-encoders have been widely utilized in various studies, they fall short in detecting contextual anomalies, which are crucial in the context of APTs. This limitation arises because a standard stacked auto-encoder processes only a single network packet at a time. To address this challenge, Myneni et al. [68] propose a modified stacked auto-encoder that incorporates LSTM cells in place of the conventional hidden layer cells. LSTMs have proven effective in time-series analysis [69], allowing for the consideration of data over multiple time steps. This revised model, referred to as LSTM-SAE can compress network traffic packets across several consecutive time steps and subsequently reconstruct them. By training on a large set of normal data and evaluating on both attack and normal data, the model can effectively identify attacks that unfold over multiple packets. We have tuned the model for optimum performance using parameters such as encoding dimensions of [60, 35, 20], a timestep size of 3, 100 epochs, and a batch size of 32. Additionally, a dropout regularization of 0.2 was implemented to mitigate overfitting. 

4. **Conventional Classification Algorithms:** For comparison, we also considered four widely-used conventional classification algorithms: Decision Tree (DT), Support Vector Machine (SVM), Multilayer Perceptron (MLP), and Random Forest (RF). These benchmark schemes served as references to evaluate the effectiveness and efficiency of our GP-based approach in APT detection. 

**Table 2** 

The DAPT-2020 dataset <u>properties.</u> 

|Classes|No. of instances|Ratio (%)|
|---|---|---|
|Normal|129,223|98.23|
|Reconnaissance|4,489|3.40|
|Foothold establishment|8,624|6.52|
|Lateral movement|2,435|1.85|
|Data exfiltration|15|0.01|



##### _5.5. Evolutionary process and parameter settings_ 

The initial population of 1024 GP individuals is randomly generated using the ramped half-and-half method. The minimum and maximum depths of the trees in the initial population are set to two and six, and an individual is allowed to grow to a depth of ten during the evolutionary process. To maintain performance, the best 1% individuals from the current generation are copied directly to the next generation. The remaining individuals of the new generation are created using genetic operations such as one-point crossover and uniform mutation with probabilities of 0.80 and 0.19, respectively. The tournament selection method with a size of seven is used to maintain diversity during the mating process. The evolutionary process stops when the maximum number of 50 generations is reached or an ideal solution with a fitness value of 1, i.e., 100% accuracy, is found. These settings serve as typical configurations that are widely utilized in the GP field [70]. With the above settings applied, the GP algorithm was employed to determine the optimal output value within the range of 0 to 1. Values between 0 and 0.5 corresponded to the benign class, while any positive value greater than 0.5 indicated the malicious class. This range was chosen to create an equally distributed threshold for both classes, ensuring a balanced classification criterion. 

##### _5.6. Performance evaluation metrics_ 

The evaluation methods used for both binary and multi-class classification, specifically in the context of the proposed method are discussed in this section, along with the issues related to data imbalance. 

The DAPT-2020 dataset used in this study is imbalanced, with certain classes being outnumbered compared to others. For instance, the majority class, ‘‘Normal’’, has 129,223 samples in the dataset, while the minority class, ‘‘Data exfiltration’’, has only 15 samples in the dataset. The preprocessed dataset with instances from various stages is shown in Table 2. This class imbalance can occur when certain classes are rare or difficult to obtain, leading to a lack of representation in the dataset. To account for this imbalance, we used the balanced accuracy measure Eq. (5) instead of the typical accuracy measure to evaluate the classification performance of the proposed method and comparative methods. The comparative methods were deterministic and were run once, whereas our proposed method is stochastic, so we ran it 30 times with different seed/random values and calculated the average results over these runs. 

We have already conducted a two-tailed sample t-test to evaluate the significance of the observed differences between our proposed method and the compared methods, which is a widely used statistical test given the nature of our research question and the specific characteristics of our datasets 

##### **6. Results and discussion** 

This section presents the experimental results and discusses the performance of the proposed method compared to benchmark methods for both binary and multi-class classification tasks. 

In order to ensure the statistical significance of our results, we conducted significance tests to compare the performance of our proposed method with other benchmark schemes. These comparisons were 

9 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 

**Table 3** 

Comparison of results (%) between different methods and the <u>proposed</u> method. 

||Precision|Recall|F1-score|FPR|TNR|Balanced accuracy||
|---|---|---|---|---|---|---|---|
|||||||Binary|Multi-class|
|OCSVM|09.71 ↓|44.57 ↓|15.95 ↓|50.61 ↓|4.83 ↓|46.98 ↓|−|
|DT|94.83 ↑|91.83 ↓|93.31 ↑|0.61 ↑|99.20 ↑|95.61 ↑|76.04 ↓|
|SVM|61.20 ↑|64.60 ↓|62.85 ↓|5.00 =|64.60 ↓|79.80 ↓|48.06 ↓|
|MLP|83.56 ↑|83.20 ↓|83.38 ↓|2.00 ↑|82.83 ↓|90.60 ↑|62.50 ↓|
|RF|98.61 ↑|88.17 ↓|93.10 ↑|0.15 ↑|88.28 ↓|94.01 ↑|69.38 ↓|
|MLP4NIDS|89.65 ↑|83.98 ↓|98.31 ↓|15.98 ↓|84.02 ↓|93.80 ↑|64.37 ↓|
|LSTM_SAE|89.28±0_._06↑|63.33±2_._93↓|17.54±0_._35↓|61.74±2_._97↓|38.26±2_._97↓|50.80±0_._19↓|57.68±1_._95↓|
|GPC|37.89 ± 0.03|93.51 ± 0.02|91.22 ± 1.35|5.97 ± 2.50|94.03 ± 2.50|87.29 ± 0.01|79.75 ± 0.03|
|GPC(max)|37.87|98.22|93.61|1.95|98.05|89.27|85.13|



undertaken to validate the robustness and reliability of our evaluation results, particularly given the class imbalance within the dataset. A twotailed sample t-test was employed to determine statistical significance, wherein the mean from 30 independent runs was compared with a hypothetical value. This test was chosen due to its robustness for small samples with unknown distributions, providing a suitable method for assessing the significance of the results. Specifically, the hypothetical value was derived from the performance of the best baseline method, which was the DT in our case. A significance level of 95% was utilized in this study to ascertain the confidence of our findings. Within Table 3, symbols such as ↓’’, ↑’’, and ‘‘=’’ denote significantly worse, significantly better, and statistically indifferent performance compared to our proposed method, respectively. 



##### _6.1. Binary classification_ 

For binary classification (normal vs. malicious), the following metrics are used: Precision, Recall, F1-Score, False Positive Rate (FPR), True Negative Rate (TNR), and Balanced Accuracy. GPC exhibits notable strengths in specific metrics, achieving a high Recall rate of 93.51 ±0.02%, surpassing other methods. This emphasizes GPC’s proficiency in identifying true positive malicious instances, which is crucial for APT detection where missing such instances is highly undesirable. However, the Precision of 37.89 ±0.03% indicates that only 37.89% of predicted positive instances are true positives. While this suggests GPC’s capacity for accurate positive predictions, there is room for improvement in Precision and F1-score. 

The FPR of 5.97% indicates that 5.97% of predicted positive instances are false positives, potentially resulting in increased endpoint alerts. However, GPC outperforms OCSVM, MLP4NIDS, and LSTM_SAE in FPR. Furthermore, in the context of APTs, while false positives may trigger unnecessary investigations, disregarding TNR can be considerably more harmful due to the potential impact of a successful attack. GPC’s high TNR of approximately 94.03%, surpassing all other methods except DT, highlights its effectiveness in minimizing the risk of missing genuine malicious instances. Additionally, GPC achieves a promising balanced accuracy of 87.29% with a low standard deviation (0.01), indicating its effectiveness in distinguishing normal instances from APT attacks. Notably, GPC’s F1-score of 91.22% outperforms most other methods, demonstrating a superior balance between precision and recall, second only to DT, RF, and MLP4NIDS, which exhibit comparable performance in this regard. 

While other methods like DT, MLP, MLP4NIDS, and RF achieve better binary classification accuracy, GPC outperforms OCSVM, LSTM_SAE, and SVM, demonstrating its potential. However, this suggests that further investigation is needed to improve GPC’s performance in binary classification tasks, potentially through exploring hyperparameter tuning or feature engineering. 

**Fig. 5.** Average fitness value of the proposed method for 50 generations. 

in Table 3. GPC achieves an accuracy of 79.75% with a standard deviation of 0.03, showcasing its ability to effectively classify instances across multiple classes. This result highlights the superiority of GPC over other methods in accurately assigning instances to their respective APT stages. It is worth noting that the OCSVM method is unable to perform multi-class classification, as indicated by the ‘‘-’’ sign in the first row of the multi-class column. 

The superior performance of the proposed method in multi-class classification can be attributed to its ability to leverage GP’s inherent capabilities in evolving complex solutions that effectively handle the challenges of distinguishing between multiple classes of APT attacks. By harnessing the evolutionary process, the GPC evolves optimal solutions that capture and exploit intricate patterns and relationships in the data, leading to accurate classification across various APT attack stages. This demonstrates the effectiveness of GPC in addressing the complexities associated with APT detection and classification, particularly in multi-class scenarios. 

##### **7. Further analysis** 

This section offers an in-depth analysis of the proposed method, encompassing its convergence graph, the evolutionary process of classification, the examination of significant features, and runtime performance. It enlightens the model’s problem-solving process, encompassing its evolution, critical features, and operational efficiency during runtime. 

##### _7.1. Convergence_ 

##### _6.2. Multi-class classification_ 

The proposed method consistently outperforms other methods in multi-class classification (distinguishing different APT stages), as shown 

Fig. 5 presents the Convergence graph, which contains a box and whisker plot summarizing the fitness values obtained from 30 independent runs. This plot visualizes the convergence behavior of the 

10 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 



**Fig. 6.** Confusion matrix for binary classification. 







**Fig. 7.** Confusion matrix for multi-class classification. 

evolutionary process, indicating whether further iterations could potentially improve performance. The _𝑦_ -axis represents fitness values, while the _𝑥_ -axis represents generation number. 

During the initial exploration phase (0–15 generations), average fitness steadily increased to around 71%, indicating progress in evolving GP models during exploration, where various possibilities are explored for improvement. Additionally, this initial phase showcases relatively low standard deviation values, reflecting the stability of fitness improvement. From generation 16 onwards, the average fitness steadily increased, eventually reaching approximately 78%. However, the rate of improvement slowed down, indicating a shift towards the exploitation phase. During this phase, GP models concentrate on improving fitness by exploiting the most successful paths found during exploration. The observed convergence pattern suggests that the chosen number of generations is adequate and further extending the process might not yield significant improvement. 

##### _7.2. Binary classification analysis_ 

Using the proposed method, the average balanced accuracy for binary classification (normal vs. malicious) was 87.29%. This indicates that the model can correctly classify the instances as either positive or negative with a moderate level of accuracy. The accuracy scores obtained from 30 runs were consistently high, ranging from 84.91% to 89.62%, with a majority of the scores falling within the range of 87% to 89%. The confusion matrix of one of the best-evolved models for binary classification is shown in Fig. 6. This matrix serves as a valuable tool for gaining deeper insights into the model’s performance in distinguishing between classes. The proposed method correctly classified 80% benign samples and 97% malicious samples. Only 20% benign samples were misclassified as malicious, which, while consuming additional computational resources to verify, is not a critical concern. Importantly, the misclassification of only 3% of malicious samples as benign highlights the method’s effectiveness in minimizing false negatives, a crucial factor in security applications. 

##### _7.3. Multi-class classification analysis_ 

The confusion matrix in Fig. 7, shows the proposed method’s performance for multi-class classification (distinguishing different APT stages). The diagonal elements represent the number of correctly classified instances for each class. From the matrix, it can be seen that the proposed method correctly predicted lateral movement, established foothold, and data exfiltration with high accuracy. The off-diagonal elements represent the misclassification of instances. 

Among the misclassified instances, the majority of misclassified instances originate from the normal class, with relatively few instances from other malicious classes being misclassified as normal. Out of the 23,053 instances of the normal class, a total of 8,220 instances were mistakenly classified as malicious. Conversely, the misclassification of instances from other malicious classes as normal was relatively low. Only six (0.4%) instances of established foothold, six (1.3%) instances of reconnaissance, and two (0.2%.) instances of lateral movement were erroneously classified as normal traffic. This suggests that our classification model exhibits a higher accuracy than other benchmark schemes in correctly identifying the malicious stages, demonstrating its effectiveness in detecting APT attacks. 

To gain insights into the model’s decision-making process, we analyzed the most frequently utilized features by the best-performing GP individuals across 30 runs. We found that _Dst_Port_ , _TotLen_Fwd_Pkts_ , _TotLen_Bwd_Pkts_ , _Fwd_Pkt_Len_Min_ , _Pkt_Len_Std_ , _ACK_Flag_Cnt_ , _ECE_Flag_Cnt_ , _Down_Up_Ratio_ , and _Idle_Mean_ as the important features. The _Dst_Port_ was found to be the most important feature, followed by various packet sizes in the forward and backward directions, and the number of packets with _SYN_ , _PUSH_ , and _ACK_ flags. 

##### _7.4. Analysis of selected features_ 

GP trees evolve to find the best combination of features that maximize the fitness function. Fig. 8 exemplifies one of the best-evolved models for multi-class classification, achieving a balanced accuracy of 85.89% and using 41 features out of the available 66. This analysis reveals that specific features are frequently employed during the evolutionary process: 

- **Dst_Port:** The destination port of network traffic, crucial for identifying potential entry points used by APT attackers. 

- **Pkt_Len_Var:** Packet length variance, helpful in detecting deviations from typical traffic patterns associated with covert APT activities. 

- **Flow_IAT_Min:** Minimum time interval between packets within a flow, potentially indicative of malicious data exfiltration or C&C communication patterns. 

- **Subflow_Fw_Pkts:** Number of packets sent in the forward direction within a subflow, potentially revealing anomalous network behavior during lateral movement. 

- **Bwd_Pkts_s:** Number of packets per second sent in the backward direction, potentially useful in detecting data exfiltration activities. 

11 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 



**Fig. 8.** The symbolic expression of the best-evolved individual (solution) by the proposed method. 

**Fig. 9.** The frequency of features appeared in percentage for 30 GP runs. 

- **Bwd_Header_Len:** Length of the header in backward packets, potentially aiding in identifying suspicious traffic patterns. 

- **Flow_IAT_Mean:** Average time interval between packets within a flow, potentially indicative of deviations from normal traffic patterns. 

Fig. 9 shows the percentage of frequency of features used in 30 independent runs of the proposed GP experiments. To generate the Figure, individual feature names and their counts were recorded across 30 independent GP runs. The percentage of frequency for each feature was then calculated based on its occurrence in these runs, with 100% indicating features that appeared in all runs. In the figure, it is evident that the top 8 features were utilized in over 86% of the runs. Additionally, the figure highlights that 19 features were employed in nearly 80% (equivalent to appearing in at least 24 runs). 

The consistent selection of these features underscores their significance in the model’s ability to distinguish between normal and malicious traffic, particularly in identifying characteristics associated with specific APT stages. 

##### _7.5. Time analysis_ 

Time analysis is an essential factor in evaluating the practical applicability of a method for APT detection, as it determines the efficiency of deployment in real-time security systems, ensuring timely responses to potential APT threats and minimizing detection and mitigation delays. 

Table 4 compares the training and prediction times of the proposed method with other commonly used classification algorithms for both binary and multi-class scenarios. The training time is shown in minutes and seconds, while the prediction time is displayed in milliseconds. The tests were conducted on an x86_64 architecture with an Intel<sup>®</sup> Core™ 

i7-10700 CPU running at 2.90 GHz, featuring 16 cores with 2 threads per core and 16 GB of RAM. 

In the case of the proposed method, the average training or evolution time for binary classification was found to be 17 min and 38 s, with a standard deviation of 6 min and 10 s. For multi-class classification, the average evolution time was 16 min and 22 s, with a standard deviation of 4 min and 46 s. While the training process requires a significant amount of time, the proposed method exhibits superior prediction times in milliseconds compared to most comparative methods, except for DT. This translates to rapid real-time classification, making it suitable for applications demanding immediate threat detection and response, such as in industrial settings. 

##### _7.6. Transferability_ 

The proposed method exhibits high transferability across diverse cybersecurity domains, owing to the inherent adaptability and versatility of GP. GP’s capacity to identify intricate patterns and generate tailored solutions through evolutionary processes ensures its applicability beyond APT detection. As evidenced in prior studies [65,71,72], GP has proven effective in addressing various cybersecurity challenges, making it suitable for detecting a wide spectrum of threats. By leveraging past attack patterns, GP-based intrusion detection systems can identify both known and novel attack sequences, bolstering defense mechanisms against emerging threats. Thus, the proposed method stands as a versatile and reliable solution poised to address cybersecurity challenges across different contexts. However, it is essential to note some limitations. For instance, the effectiveness of GP relies heavily on the dataset’s characteristics. While GP can handle numerical data effectively, datasets with categorical or mixed data types may pose challenges for model training and performance. 

12 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 

**Table 4** 

Comparison of the training time (mm:ss) and the prediction time (ms) for various classifiers. 

||Binary classification||Multi-class classification||
|---|---|---|---|---|
||Training time (mm:ss)|Predict time (ms)|Training time (mm:ss)|Predict time (ms)|
|OCSVM|12:28|3.0647|–|–|
|DT|00:01|0.0001|00:001|0.0002|
|SVM|04:56|0.8097|05:40|0.8796|
|MLP|03:08|0.0027|03:12|0.0027|
|RF|00:08|0.0060|00:09|0.0066|
|MLP4NIDS|09:48|0.0014|09:48|0.0014|
|GPC|17:38|0.0003|16:22|0.0003|



##### **8. Conclusion and future work** 

##### **Acknowledgment** 

The study aimed to utilize the capabilities of GP to classify APTs across various stages of their attack cycle. The research addressed this objective by developing a novel GP-based method that autonomously selects and utilizes significant features from the data to distinguish between different attack stages. The method produced promising results, demonstrating its ability to handle both binary and multi-class classification tasks. It notably outperformed existing approaches in multi-class classification, achieving an average balanced accuracy of 79.75% and accurately detecting critical stages like foothold establishment and data exfiltration. Additionally, the study provided insights into the DAPT2020 dataset, analyzed GP’s evolutionary process, and identified crucial features for accurate detection. 

This research contributes to APT detection in two important ways. Firstly, it introduces a novel GP-based approach offering adaptability and the potential to overcome traditional method limitations. Leveraging GP’s learning and evolving abilities, this approach could provide a more robust solution for APT detection, strengthening cybersecurity defenses. Secondly, through GP’s feature identification, the study unveils important attack patterns, offering insights into APT behavior. This deeper understanding informs the development of more effective detection strategies and guides future research in APT mitigation. 

The proposed method for binary classification needs further investigation to achieve the same level of accuracy as top-performing methods. Additionally, exploring ensemble learning techniques, where multiple GP models are combined, holds promise in enhancing the overall accuracy and robustness of APT detection. By using ensemble techniques, the method could potentially offer improved detection capabilities against complex APT scenarios. Moreover, advanced feature engineering techniques require in-depth exploration to identify and construct additional features that can further enhance detection accuracy and the overall effectiveness of GP-based methods in APT detection. While GP can handle numerical data effectively, datasets with categorical or mixed data types pose challenges for model training and performance. By addressing these areas in future work, the GPbased approach holds the potential to evolve into a valuable tool for robust and adaptable detection of evolving APT threats, thereby enhancing overall cybersecurity defenses. 

##### **CRediT authorship contribution statement** 

**Abdullah Al Mamun:** Writing – original draft, Visualization, Investigation, Formal analysis, Conceptualization. **Harith Al-Sahaf:** Writing – review & editing, Validation, Supervision, Project administration, Conceptualization. **Ian Welch:** Writing – review & editing, Supervision, Project administration, Funding acquisition. **Masood Mansoori:** Writing – review & editing. **Seyit Camtepe:** Writing – review & editing. 

##### **Declaration of competing interest** 

The authors declare the following financial interests/personal relationships which may be considered as potential competing interests: Ian Welch reports financial support was provided by New Zealand Ministry of Business Innovation and Employment. 

This research was supported by the Cyber Security Research Programme ‘‘AI for Automating Response to Threats’’ Ministry of Business, Innovation, and Employment (MBIE), New Zealand, part of Catalyst Strategy Funds under Grant MAUX1912. 

##### **Data availability** 

##### The data is publicly available. 

##### **References** 

- [1] J. De Vries, H. Hoogstraaten, J. van den Berg, S. Daskapan, Systems for detecting advanced persistent threats: A development roadmap using intelligent data analysis, in: Proceedings of the International Conference on Cyber Security, IEEE, 2012, pp. 54–61. 

- [2] N. Virvilis, D. Gritzalis, T. Apostolopoulos, Trusted computing vs. Advanced persistent threats: Can a defender win this game? in: Proceedings of the International Conference on Ubiquitous Intelligence and Computing and 2013 IEEE 10th International Conference on Autonomic and Trusted Computing, IEEE, 2013, pp. 396–403. 

- [3] T. Seals, SolarWinds APT targets tech resellers in latest supply-chain cyberattacks, 2023, URL: https://threatpost.com/solarwinds-tech-resellers-supply-chaincyberattacks/175716/. (Accessed: 04 October 2023). 

- [4] C. Do Xuan, Detecting APT attacks based on network traffic using machine learning, J. Web Eng. (2021) 171–190. 

- [5] C. Do Xuan, M.H. Dao, H.D. Nguyen, APT attack detection based on flow network analysis techniques using deep learning, J. Intell. Fuzzy Systems 39 (3) (2020) 4785–4801. 

- [6] M. Ussath, D. Jaeger, F. Cheng, C. Meinel, Advanced persistent threats: Behind the scenes, in: Proceedings of the Annual Conference on Information Science and Systems, IEEE, 2016, pp. 181–186. 

- [7] M. Marchetti, F. Pierazzi, M. Colajanni, A. Guido, Analysis of high volumes of network traffic for advanced persistent threat detection, Comput. Netw. 109 (2016) 127–141. 

- [8] A. Venturi, C. Zanasi, On the feasibility of adversarial machine learning in malware and network intrusion detection, in: 2021 IEEE 20th International Symposium on Network Computing and Applications, NCA, IEEE, 2021, pp. 1–8. 

- [9] J.R. Koza, Genetic programming as a means for programming computers by natural selection, Stat. Comput. 4 (2) (1994) 87–112. 

- [10] W. Banzhaf, P. Nordin, R.E. Keller, F.D. Francone, Genetic Programming: An Introduction: on the Automatic Evolution of Computer Programs and Its Applications, Morgan Kaufmann Publishers Inc, 1998. 

- [11] J.V. Hansen, P.B. Lowry, R.D. Meservy, D.M. McDonald, Genetic programming for prevention of cyberterrorism through dynamic and evolving intrusion detection, Decis. Support Syst. 43 (4) (2007) 1362–1374. 

- [12] Z. Han, G. Qu, B. Liu, A. Liu, W. Cai, D. Burkard, Genetic algorithm based parallelization planning for legacy real-time embedded programs, in: 2018 First International Conference on Artificial Intelligence for Industries, AI4I, IEEE, 2018, pp. 96–99. 

- [13] K. Shafi, H.A. Abbass, An adaptive genetic-based signature learning system for intrusion detection, Expert Syst. Appl. 36 (10) (2009) 12036–12043. 

- [14] U. Bhowan, M. Zhang, M. Johnston, Genetic programming for classification with unbalanced data, in: Proceeding of the European Conference on Genetic Programming, Springer, 2010, pp. 1–13. 

- [15] Y. Yang, C.K. Soh, Fuzzy logic integrated genetic programming for optimization and design, J. Comput. Civ. Eng. 14 (4) (2000) 249–254. 

- [16] B. Tran, B. Xue, M. Zhang, Genetic programming for feature construction and selection in classification on high-dimensional data, Memet. Comput. 8 (1) (2016) 3–15. 

13 

_A.A. Mamun et al._ 

_Applied Soft Computing 167 (2024) 112447_ 

- [17] E. Galván-López, L. Vázquez-Mendoza, L. Trujillo, Stochastic semantic-based multi-objective genetic programming optimisation for classification of imbalanced data, in: Advances in Soft Computing: 15th Mexican International Conference on Artificial Intelligence, MICAI 2016, Cancún, Mexico, October 23–28, 2016, Proceedings, Part II 15, Springer, 2017, pp. 261–272. 

- [18] L. Martin, The cyber kill chain<sup>®</sup> , 2021, URL: https://www.lockheedmartin.com/ en-us/capabilities/cyber/cyber-kill-chain.html. (Accessed: 23 October 2021). 

- [19] A. Alshamrani, S. Myneni, A. Chowdhary, D. Huang, A survey on advanced persistent threats: Techniques, solutions, challenges, and research opportunities, IEEE Commun. Surv. Tutor. 21 (2) (2019) 1851–1877. 

- [20] B. Evans, H. Al-Sahaf, B. Xue, M. Zhang, Evolutionary deep learning: A genetic programming approach to image classification, in: Proceedings of the IEEE Congress on Evolutionary Computation, IEEE, 2018, pp. 1–6. 

- [21] D. Whitley, A genetic algorithm tutorial, Stat. Comput. 4 (1994) 65–85. 

- [22] S. Luke, et al., Genetic programming produced competitive soccer softbot teams for RoboCup97, Genet. Program. 1998 (1998) 214–222. 

- [23] M.T. Ahvanooey, Q. Li, M. Wu, S. Wang, A survey of genetic programming and its applications, KSII Trans. Internet Inf. Syst. 13 (4) (2019) 1765–1794. 

- [24] K. Scarfone, P. Mell, Intrusion detection and prevention systems, in: Handbook of Information and Communication Security, Springer, 2010, pp. 177–192. 

- [25] Y. Su, M. Li, C. Tang, R. Shen, A framework of apt detection based on dynamic analysis, in: 2015 4th National Conference on Electrical, Electronics and Computer Engineering, Atlantis Press, 2015, pp. 1047–1053. 

- [26] K.A.A. Alminshid, M.N. Omar, A framework of APT detection based on packets analysis and host destination, Iraqi J. Sci. (2020) 215–223. 

- [27] H.-J. Liao, C.-H.R. Lin, Y.-C. Lin, K.-Y. Tung, Intrusion detection system: A comprehensive review, J. Netw. Comput. Appl. 36 (1) (2013) 16–24. 

- [28] S. Krishnapriya, T. Chithralekha, Initial intrusion detection in advanced persistent threats (APT’s) using machine learning, in: International Conference on Intelligent Systems and Sustainable Computing, Springer, 2022, pp. 179–191. 

- [29] G. Giacinto, R. Perdisci, M. Del Rio, F. Roli, Intrusion detection in computer networks by a modular ensemble of one-class classifiers, Inf. Fusion 9 (1) (2008) 69–82. 

- [30] A. Patcha, J.-M. Park, An overview of anomaly detection techniques: Existing solutions and latest technological trends, Comput. Netw. 51 (12) (2007) 3448–3470. 

- [31] T. Debatty, W. Mees, T. Gilon, Graph-based APT detection, in: Proceedings of the International Conference on Military Communications and Information Systems, ICMCIS, IEEE, 2018, pp. 1–8. 

- [32] G. Zhao, K. Xu, L. Xu, B. Wu, Detecting APT malware infections based on malicious DNS and traffic analysis, IEEE Access 3 (2015) 1132–1142. 

- [33] S. Myneni, A. Chowdhary, A. Sabur, S. Sengupta, G. Agrawal, D. Huang, M. Kang, DAPT 2020-constructing a benchmark dataset for advanced persistent threats, in: Proceeding of the International Workshop on Deployable Machine Learning for Security Defense, Springer, 2020, pp. 138–163. 

- [34] P. Duessel, C. Gehl, U. Flegel, S. Dietrich, M. Meier, Detecting zero-day attacks using context-aware anomaly detection at the application-layer, Int. J. Inf. Secur. 16 (5) (2017) 475–490. 

- [35] J.B. Fraley, J. Cannady, The promise of machine learning in cybersecurity, in: Proceedings of the SoutheastCon 2017, IEEE, 2017, pp. 1–6. 

- [36] A. Tuor, S. Kaplan, B. Hutchinson, N. Nichols, S. Robinson, Deep learning for unsupervised insider threat detection in structured cybersecurity data streams, 2017, arXiv preprint arXiv:1710.00811. 

- [37] D.X. Cho, H.H. Nam, A method of monitoring and detecting APT attacks based on unknown domains, Procedia Comput. Sci. 150 (2019) 316–323. 

- [38] P.S. Charan, P.M. Anand, S.K. Shukla, DMAPT: Study of data mining and machine learning techniques in advanced persistent threat attribution and detection, in: Data Mining-Concepts and Applications, IntechOpen, 2021, pp. 63–78. 

- [39] A. Al Mamun, H. Al-Sahaf, I. Welch, S. Camtepe, Advanced persistent threat detection: A particle swarm optimization approach, in: Proceedings of the 32nd International Telecommunication Networks and Applications Conference, IEEE, 2022, pp. 1–8. 

- [40] I. Ghafir, M. Hammoudeh, V. Prenosil, L. Han, R. Hegarty, K. Rabie, F.J. Aparicio-Navarro, Detection of advanced persistent threat using machine-learning correlation analysis, Future Gener. Comput. Syst. 89 (2018) 349–359. 

- [41] J. Sexton, C. Storlie, J. Neil, Attack chain detection, Stat. Anal. Data Min.: ASA Data Sci. J. 8 (5–6) (2015) 353–363. 

- [42] P. Giura, W. Wang, A context-based detection framework for advanced persistent threats, in: Proceedings of the 2012 International Conference on Cyber Security, IEEE, 2012, pp. 69–74. 

- [43] J.V. Chandra, N. Challa, M.A. Hussain, Data and information storage security from advanced persistent attack in cloud computing, Int. J. Appl. Eng. Res. 9 (20) (2014) 7755–7768. 

- [44] J.V. Chandra, N. Challa, S.K. Pasupuleti, A practical approach to E-mail spam filters to protect data from advanced persistent threat, in: Proceedings of the 2016 International Conference on Circuit, Power and Computing Technologies, IEEE, 2016, pp. 1–5. 

- [45] M. Balduzzi, V. Ciangaglini, R. McArdle, Targeted attacks detection with spunge, in: Proceedings of the 11th Annual Conference on Privacy, Security and Trust, IEEE, 2013, pp. 185–194. 

- [46] N. Nissim, A. Cohen, C. Glezer, Y. Elovici, Detection of malicious PDF files and directions for enhancements: A state-of-the art survey, Comput. Secur. 48 (2015) 246–266. 

- [47] P.K. Sharma, S.Y. Moon, D. Moon, J.H. Park, DFA-AD: A distributed framework architecture for the detection of advanced persistent threats, Cluster Comput. 20 (1) (2017) 597–609. 

- [48] L. Shenwen, L. Yingbo, D. Xiongjie, Study and research of APT detection technology based on big data processing architecture, in: Proceedings of the 5th International Conference on Electronics Information and Emergency Communication, IEEE, 2015, pp. 313–316. 

- [49] A. Zimba, H. Chen, Z. Wang, M. Chishimba, Modeling and detection of the multistages of advanced persistent threats attacks based on semi-supervised learning and complex networks characteristics, Future Gener. Comput. Syst. 106 (2020) 501–517. 

- [50] T. Bodström, T. Hämäläinen, State of the art literature review on network anomaly detection with deep learning, in: Internet of Things, Smart Spaces, and Next Generation Networks and Systems, Springer, 2018, pp. 64–76. 

- [51] C. Yin, Y. Zhu, J. Fei, X. He, A deep learning approach for intrusion detection using recurrent neural networks, IEEE Access 5 (2017) 21954–21961. 

- [52] T. Bodström, T. Hämäläinen, A novel deep learning stack for APT detection, Appl. Sci. 9 (6) (2019) 1055. 

- [53] S. Andropov, A. Guirik, M. Budko, M. Budko, Network anomaly detection using artificial neural networks, in: Proceedings of the 20th Conference of Open Innovations Association, IEEE, 2017, pp. 26–31. 

- [54] K. Yu, L. Tan, S. Mumtaz, S. Al-Rubaye, A. Al-Dulaimi, A.K. Bashir, F.A. Khan, Securing critical infrastructures: deep-learning-based threat detection in IIoT, IEEE Commun. Mag. 59 (10) (2021) 76–82. 

- [55] H. Neuschmied, M. Winter, B. Stojanović, K. Hofer-Schmitz, J. Božić, U. Kleb, APT-attack detection based on multi-stage autoencoders, Appl. Sci. 12 (13) (2022) 6816. 

- [56] C. Atapour, I. Agrafiotis, S. Creese, Modeling advanced persistent threats to enhance anomaly detection techniques, J. Wirel. Mob. Netw. Ubiquitous Comput. Depend. Appl. 9 (4) (2018) 71–102. 

- [57] M.A. Talib, Q. Nasir, A.B. Nassif, T. Mokhamed, N. Ahmed, B. Mahfood, APT beaconing detection: A systematic review, Comput. Secur. (2022) 102875. 

- [58] J. Navarro, A. Deruyver, P. Parrend, A systematic survey on multi-step attack detection, Comput. Secur. 76 (2018) 214–249. 

- [59] R. Patil, S. Muneeswaran, V. Sachidananda, M. Gurusamy, E-Audit: Distinguishing and investigating suspicious events for APTs attack detection, J. Syst. Archit. 144 (2023) 102988. 

- [60] C. Xiong, T. Zhu, W. Dong, L. Ruan, R. Yang, Y. Cheng, Y. Chen, S. Cheng, X. Chen, CONAN: A practical real-time APT detection system with high accuracy and efficiency, IEEE Trans. Dependable Secure Comput. 19 (1) (2020) 551–565. 

- [61] S.M. Milajerdi, R. Gjomemo, B. Eshete, R. Sekar, V. Venkatakrishnan, Holmes: real-time apt detection through correlation of suspicious information flows, in: Proceedings of the IEEE Symposium on Security and Privacy, IEEE, 2019, pp. 1137–1152. 

- [62] X. Wang, K. Zheng, X. Niu, B. Wu, C. Wu, Detection of command and control in advanced persistent threat based on independent access, in: Proceedings of the 2016 IEEE International Conference on Communications, IEEE, 2016, pp. 1–6. 

- [63] I. Friedberg, F. Skopik, G. Settanni, R. Fiedler, Combating advanced persistent threats: From network event correlation to incident detection, Comput. Secur. 48 (2015) 35–57. 

- [64] H. Al-Sahaf, I. Welch, A genetic programming approach to feature selection and construction for ransomware, phishing and spam detection, in: Proceedings of the Genetic and Evolutionary Computation Conference Companion, ACM, 2019, pp. 332–333. 

- [65] T.C. John, M.S. Abbasi, H. Al-Sahaf, I. Welch, J. Jang-Jaccard, Evolving malice scoring models for ransomware detection: An automated approach by utilising genetic programming and cooperative coevolution, Comput. Secur. 129 (2023) 103215. 

- [66] A. Al Mamun, H. Al-Sahaf, I. Welch, S. Camtepe, Genetic programming for enhanced detection of advanced persistent threats through feature construction, Computers & Security 149 (2024) 104185. 

- [67] A. Rosay, F. Carlier, P. Leroux, MLP4NIDS: An efficient MLP-based network intrusion detection for CICIDS2017 dataset, in: Proceedings of the Machine Learning for Networking: Second IFIP TC 6 International Conference, Springer, 2020, pp. 240–254. 

- [68] S. Myneni, K. Jha, A. Sabur, G. Agrawal, Y. Deng, A. Chowdhary, D. Huang, Unraveled—A semi-synthetic dataset for advanced persistent threats, Comput. Netw. 227 (2023) 109688. 

- [69] W. Bao, J. Yue, Y. Rao, A deep learning framework for financial time series using stacked autoencoders and long-short term memory, PLoS One 12 (7) (2017) e0180944. 

- [70] Q.U. Ain, H. Al-Sahaf, B. Xue, M. Zhang, A multi-tree genetic programming representation for melanoma detection using local and global features, in: Proceedings of the 31st Australasian Joint Conference, 2018, Springer, 2018, pp. 111–123. 

- [71] M. Crosbie, G. Spafford, et al., Applying genetic programming to intrusion detection, in: Proceedings of the Working Notes for the AAAI Symposium on Genetic Programming, MIT Press, Cambridge, MA, 1995, pp. 1–8. 

- [72] M.S. Abbasi, H. Al-Sahaf, I. Welch, Automated behavior-based malice scoring of ransomware using genetic programming, in: Proceedings of the 2021 IEEE Symposium Series on Computational Intelligence, IEEE, 2021, pp. 1–8. 

14 

