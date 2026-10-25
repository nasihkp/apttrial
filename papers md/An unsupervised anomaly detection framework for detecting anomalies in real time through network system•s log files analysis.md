High-Confidence Computing 1 (2021) 100030 



Contents lists available at ScienceDirect 

# ~~High-Conf~~ i ~~dence Computing~~ 

homepage: www.elsevier.com/locate/hcc 



## An unsupervised anomaly detection framework for detecting anomalies in real time through network system’s log files analysis 



Vannel Zeufack<sup>a</sup> , Donghyun Kim<sup>b</sup> , Daehee Seo<sup>c</sup> , Ahyoung Lee<sup>a,∗</sup> 

> a _Department of Computer Science, Kennesaw State University, Marietta, GA 30060, USA_ 

> b _Department of Computer Science, Georgia State University, Atlanta, GA 30303, USA_ 

> c _Faculty of Artificial Intelligence and Data Engineering, Sangmyung University, Seoul 03016, South Korea_ 

a r t i c l e i n f o 

### a b s t r a c t 

_Keywords:_ Anomaly detection Unsupervised machine learning Clustering OPTICS Log analysis 

Nowadays, in almost every computer system, log files are used to keep records of occurring events. Those log files are then used for analyzing and debugging system failures. Due to this important utility, researchers have worked on finding fast and efficient ways to detect anomalies in a computer system by analyzing its log records. Research in log-based anomaly detection can be divided into two main categories: batch log-based anomaly detection and streaming log- based anomaly detection. Batch log-based anomaly detection is computationally heavy and does not allow us to instantaneously detect anomalies. On the other hand, streaming anomaly detection allows for immediate alert. However, current streaming approaches are mainly supervised. In this work, we propose a fully unsupervised framework which can detect anomalies in real time. We test our framework on hdfs log files and successfully detect anomalies with an F-1 score of 83%. 

#### **1. Introduction** 

In today’s computing and networking systems, logging has become a widely embraced and important practice. It is the process of keeping records of events which occurred within a computing system. The records are kept into what is referred to as a log file. According to [1], more than five standards and more than five regulations enforce, in every continent, that a log management system must be included into the security systems. As computing systems are becoming increasingly large and complex [2–6], computing and networking systems are increasingly suffering from various vulnerability and failures. By recording events, logs allow system operators to detect and debug failures and easily recover from a working state if necessary. 

One important use of log file to the detection of any anomaly activities in any computing and networking system. Over years, anomaly detection based on log file analysis has been done almost manually by domain experts who read and interprets log files line by line. However, in this big data era, log files are becoming so large that it is almost impossible to timely analyze them in this manner. According to [7], approximately 2.5 quintillion bytes of data are created each day. Every minute, snapchat users share 527,760 photos, YouTube users watch 4,146,600 YouTube videos and 456,000 tweets are sent on Twitter. Consequently, it is of great importance to introduce more intelligent anomaly detection mechanisms which need less intervention of operators. 

Due to the reasons, many scholars have considered various ways to design more efficient and automated log-based anomaly detection. The state-of-the art approaches leverages the power of Machine Learning algorithms to detect patterns in log files and flag abnormalities. However, performing real time log analysis in an unsupervised setting remains a challenge. In this work, we propose a new fully unsupervised real time framework able to detect anomalies in real time. Our framework exploits the power of clustering to learn most frequent patterns from historical logs and uses fine-grained distance analysis to detect outliers. In various existing works, such unsupervised machine learning algorithm can be constructed based on a clustering algorithm. 

In this paper, the proposed algorithm is based on OPTICS [8], which is a better version of DBSCAN (Density based spatial clustering of applications with noise) [9] algorithm which solves DBSCAN’s issue of not being able to cluster points in varying density datasets. Compared to other alternative clutering algorithms such as K-Means clustering [10] and Agglomerative Hierarchical clustering [11], OPTICS algorithm is not sensitive to outliers and therefore perfect for anomaly detection. Moreover, it can determine arbitrary shaped clusters and requires few parameter tunings. 

Based on the core idea of the OPTICS, we have constructed the intended unsupervised streaming anomaly detection mechanism by proposing (a) knowledge based construction system, which consists of the following core sub-mechanisms; a new log parsing mechanism and a 

> ∗ Corresponding author. 

_E-mail addresses:_ vzeufack@students.kennesaw.edu (V. Zeufack), dhkim@gsu.edu (D. Kim), daehseo@smu.ac.kr (D. Seo), alee146@kennesaw.edu (A. Lee). 

https://doi.org/10.1016/j.hcc.2021.100030 

> Received 22 March 2021; Accepted 24 April 2021 

2667-2952/© 2021 The Author(s). Published by Elsevier B.V. on behalf of Shandong University. This is an open access article under the CC BY-NC-ND license (http://creativecommons.org/licenses/by-nc-nd/4.0/) 

_V. Zeufack, D. Kim, D. Seo et al._ 

_High-Confidence Computing 1 (2021) 100030_ 



**Fig. 1.** Log-based Anomaly Detection Framework. 

new feature extraction mechanism, and (b) streaming anomaly detection system, which consists of the following core sub-mechanisms; streaming log parsing, streaming feature extraction, and streaming anomaly detection. It is important to note that knowledge based construction system and streaming anomaly detection system are running concurrently. 

The rest of this paper is organized as follows. We first introduce the most significant researches and their limitations. Then, the major challenges of anomaly detection based on log file analysis will be discussed. The following sections will provide the details about the proposed solution and our simulation results. Finally, we conclude this paper with our perspective for future research directions. 

#### **2. Related work** 

For about a decade, machine learning has been the key tool to automate log analysis. Indeed, machine learning algorithms and structures have shown their capability to detect and learn very complex patterns. Since all significant prior research uses machine learning techniques, they share a common framework [12] (see Fig. 1). 

Log collection is the first step of the framework and is about gathering data. Logs could be collected in streaming or batch. The next step, log parsing, consists in extracting log templates. The third step, feature extraction, consists in extracting relevant features for the anomaly detection model. The final step uses the extracted features to perform anomaly detection. The anomaly detection system is usually a machine learning model. More details can be found in [12]. 

The cutting-edge results in log-based anomaly detection research can be classified into two broad categories: offline anomaly detection systems and online anomaly detection systems. 

#### _2.1. Offline anomaly detection systems_ 

Offline anomaly detection systems are mainly used to debug or detect anomalies after they occurred. Log analysis is performed after a significant number of logs is collected (may be at end of the day or the week or the month). Some of these approaches use unsupervised learning while others use supervised learning. 

Approaches using unsupervised learning do not require labeled logs (logs for which we know a priori what is normal and what is abnormal). There is no learning phase. They extract features and perform anomaly detection on the full log file. Here, we can mention PCA [13] which extracts state ratio vectors and message count vectors and uses Principal Component Analysis to detect anomalies. We also have LogCluster [14] which assigns weights to events and uses Agglomerative Hierarchical Clustering to detect patterns. Invariants Mining [15] extracts messages counts and uses singular value decomposition to learn invariants from the logs. 

Supervised learning approaches require labeled logs. They learn patterns from labeled logs and can flag, from a new batch, any pattern which deviates from the normal patterns. This is the case of LogRo- 

bust [16] who uses attention-based Bi-LSTM neural network to learn normal patterns and then detect anormal behavior given new batches. 

#### _2.2. Online anomaly detection systems_ 

Online or streaming anomaly detection systems perform anomaly detection in real time, as the events are recorded. Currently, these approaches use supervised learning. They learn patterns offline from normal logs and are placed in production to detect abnormal events in real time. 

One of the most prominent online anomaly detection system is DeepLog [17] which trains, offline, a log key anomaly detection model and a parameter value anomaly detection model. The trained models are used to detect anomalies in real time. Another interesting work is LogAnomaly [18] which learns normal patterns using LSTM neural network and can detect sequential and quantitative anomalies simultaneously. 

#### **3. Research challenges** 

Three major challenges emerge in log-based anomaly detection research: unsupervised streaming anomaly detection, feature engineering and new log entries management. 

#### _3.1. Unsupervised streaming anomaly detection_ 

Streaming anomaly detection can be defined as the process of finding issues and alerting in real-time. Indeed, in this big data era with faster computers, data is generated at a huge pace. Moreover, because nowadays computer systems are becoming increasingly complex, they are increasingly prone to failure. Hence, there is a necessity to build automated anomaly detection systems which can perform analysis at the same pace as data are generated. 

Even though some researchers were able to find ways to perform streaming anomaly detection, it remains a gap as the current state of the art approaches require normal (labeled) logs from which to learn normal patterns. However, obtaining labeled logs is sometimes expensive (require domain experts) and time consuming. This leads to the necessity of a streaming anomaly detection system which does not require normal logs. 

#### _3.2. Feature engineering_ 

In the previous works [17,18], the most exploited feature is the count of log templates by window. However, many approaches have shown satisfying results by exploring various types features including timestamp statistics, log parameter vectors and state ratio vectors. The diversity in feature extraction can be attributed to the richness and diversity of information included into log files. Hence, it is hard to determine exactly what features are best for anomaly detection. 

2 

_V. Zeufack, D. Kim, D. Seo et al._ 

_High-Confidence Computing 1 (2021) 100030_ 



**Fig. 2.** Unsupervised Anomaly Detection Framework. 

#### _3.3. Handling new log entries_ 

In a production environment, it could happen that a previously unseen event occurs. While some of the previous works flagged new log entries as abnormal, other approaches proposed that new log entries should be analyzed manually by domain experts [17] and others proposed that new log entries should to be approximated to the known log entry with most similar template [18]. Handling new log entries has shown to be a challenge as it requires the system to be retrained offline to account for the change. 

#### **4. Methodology** 

In this work, we will tackle the first major challenge which is to be able to build an unsupervised streaming anomaly detection system. To achieve that, we propose an unsupervised anomaly detection framework for detecting anomalies in real-time. Compared to other approaches, our framework does not require prior clean logs and can perform real time anomaly detection. An overview of our framework is shown in Fig. 2. 

#### _4.1. Framework overview_ 

Our framework has two main steps: knowledge base construction and streaming anomaly detection. The knowledge base construction phase learns normal patterns from the historical logs. During the streaming anomaly detection phase, an event is flagged as abnormal if it exhibits a pattern which differs from normal behavior. 

#### _4.1.1. Knowledge base construction_ 

This phase aims at building prior knowledge based on which our system will detect abnormalities. This knowledge base is built from his- 

torical logs which may or may not contain anomalies (in contrary to previous works who assumes having clean logs to start with). The key idea is to determine the most frequent patterns exhibited within a predefined window size. For example, considering a network log file, we can learn that, within a window of size of 100 events, users usually make 10 queries. Analyzing the logfile within small chunks (windows) is suitable for faster anomaly detection as we will no more need to have the full log file to perform an analysis. 

To learn the frequent patterns, the historical logs (training logs) are first parsed to extract log templates [19] (also named log keys in some other works). Next, the log file is divided into equal size windows. For each window, a message count vector is built. Each message count vector is combined to form an event count matrix. We use OPTICS [8] to cluster together similar windows. Finally, the centroid for each of the clusters is computed and represents our frequent patterns. 

#### _4.1.2. Streaming anomaly detection_ 

The streaming anomaly detection phase allows to determine, in realtime, whether an event is normal or abnormal. To determine whether an incoming event is normal, we analyze it in the context of the most recent window. We argue that the normality of an event can be inferred from the most recent events which occurred before it. 

Every time a new event occurs, it is first parsed and matched to its corresponding log template. Next, a window, including the new event and the _𝑘_ − 1 most recent events before it, is created. Then a message count vector is created for the newly created window. 

Next, each message count vector is compared to the closest vector from the knowledge base. If the distance between the vectors is above a threshold _𝛿_ then, the vector is considered abnormal. Otherwise, the vector is considered normal. The threshold _𝛿_ is set as the maximum distance from the centroid to the farthest vector within the corresponding cluster. 

3 

_V. Zeufack, D. Kim, D. Seo et al._ 

_High-Confidence Computing 1 (2021) 100030_ 



**Fig. 3.** Log Parsing Illustration. 



**Fig. 4.** Core Distance vs Reachability distance [8] 

Finally, if the vector was considered normal, then we consider the current event as normal. Otherwise, we investigate further by determining whether the current event is responsible for the abnormality of the window. 

detection. Moreover, it can determine arbitrary shaped clusters and requires few parameter tunings. 

OPTICS is a density-based algorithm. It allows to make groups without having to specify the number of groups in advance. This is a great asset for our problem as we do not know in advance how many clusters to expect. Density-based clustering algorithms consider a cluster to be an area with a huge density of points. The clusters are separated by areas of low density. The points in low density areas are usually considered noise or outliers. 

OPTICS is based on the observation that given a _MinPts_ (minimum number of points), clusters with a higher density are embedded within clusters with a lower density. The key idea is that higher density points should be processed first. OPTICS retains the clustering order using: the core distance and the reachability distance. 

The Core Distance is the minimum value of radius required to consider a point as a core point. If a point is not a core point, then its Core Distance is undefined. 

The Reachability Distance: the Reachability Distance between two points _𝑝_ and _𝑞_ is the maximum of the Core Distance of _𝑝_ and the Euclidean Distance (or some other distance metric) between _𝑝_ and _𝑞_ . Using OPTICS algorithm, we group together similar windows. Next for each cluster, we compute its centroid. The centroid of each cluster numerically represents a frequent pattern. 

#### _4.2. Log parsing_ 

#### _4.5. Streaming Anomaly Detection Algorithm_ 

Log parsing is the process of extracting for each log line, its template and parameters. As illustrated in Fig. 3, every log line is made a constant part and a variable part. Log parsing extracts the constant part. Since log parsing is not the focus of our study, we reuse the state-of-the art parser proposed in Drain [19]. Drain is an online log parsing approach with fixed depth tree. It allows to parse logs efficiently in real-time. 

#### _4.3. Feature extraction_ 

As [17], we believe that the occurrence of an event strongly depends on the occurrence of the most recent events that occurred before that event. Hence, we divide the log file into sliding windows. For each window, we capture its pattern by building an event count vector for the window. 

An event count vector is built by summing up the number of occurrences of each event within the window. For example, given a system containing 3 events, the vector [10, 5, 80] would mean that, within the window, event 1 has occurred 10 times, event 2 has occurred 5 times and event 3 has occurred 80 times. 

After combining all the event count vectors, we obtain an _𝑛_ × _𝑚_ event count matrix where _𝑛_ is the number of windows and _𝑚_ is the total number of events within the system. 

#### _4.4. Clustering using OPTICS [8]_ 

To group together similar windows and therefore determine frequent patterns, we use a clustering algorithm, namely OPTICS (Ordering points to identify the clustering structure) [20]. OPTICS is a better version of DBSCAN (Density based spatial clustering of applications with noise) [9] algorithm which solves DBSCAN’s issue of not being able to cluster points in varying density datasets. Compared to K-Means clustering [10] and Agglomerative Hierarchical clustering [11], OPTICS algorithm is not sensitive to outliers and therefore perfect for anomaly 

To assess the normality of an event, we first assess the normality of the window containing the event and the _𝑘_ − 1 most recent events before it. If the window is normal, so is the event. If the window is considered abnormal, we assess whether the current event is a major cause for that abnormality. To achieve that, we find the top _𝑗_ events accounting for the abnormality. If the current event is within the top _𝑗_ candidates, we flag it as abnormal. Otherwise, we flag it as normal. 

#### **5. Experiments** 

In this section, we describe the dataset used for our experiments, our evaluation metrics and our evaluation results. 

#### _5.1. HDFS logs Dataset [13]_ 

For our experiments we use HDFS (Hadoop Distributed File System) log data set. It a dataset generated by running Hadoop-based jobs on more than 200 Amazon’s EC2 nodes. The dataset has been labeled by Hadoop domain experts. Hadoop is an open source framework for efficiently storing and manipulating big data [21]. Among 11,197,954 log entries in the dataset, about 2.9% are abnormal. More details about the dataset can be found in [13]. Of the overall 11 million logs, we used 3 million for our experiments. 

#### _5.2. Experimental setup_ 

In our experiments, we used 70% of the dataset as training set and 30% as test set. The code was written using Python 3.7.9 on a windows 10 Enterprise 64-bit desktop with processor Intel(R) Core (TM) i7-9700 CPU @ 3.00GHz (8 CPUs), 3.0GHz (16 GB RAM). We used the OPTICS implementation from sklearn 0.23.2. 

4 

_V. Zeufack, D. Kim, D. Seo et al._ 

_High-Confidence Computing 1 (2021) 100030_ 



**Fig. 5.** Number of occurrences of each type of events in the log file. 



**Fig. 6.** Five of the most recurring events. 



**Fig. 7.** Five of the most recurring events. 

#### _5.3. Evaluation metrics_ 

#### _5.4. Evaluation results_ 

Our framework is evaluated according to precision, recall and F1Score. In the following formulas, _TP (True Positive)_ represents the number of reported anomalies which were real anomalies. _FP (False Positive)_ represents the number of reported anomalies which were not real anomalies. _FN (False Negative)_ represents the number of reported normal windows which were anomalies. 

Precision determines the percentage of reported anomalies which were real anomalies. It is computed as follows: 

_𝑇 𝑃 𝑃 𝑟𝑒𝑐𝑖𝑠𝑖𝑜𝑛_ = (1) _𝑇 𝑃_ + _𝐹 𝑃_ 

Recall determines the percentage of anomalies which were caught among all the anomalies. It is computed as follows: 

_𝑇 𝑃 𝑅𝑒𝑐𝑎𝑙𝑙_ = (2) 

_𝑇 𝑃_ + _𝐹 𝑁_ 

F1-Score is the weighted average of precision and recall and is computed as follows: 



In this section, we describe the results from implementing our framework on HDFS dataset. We provide the log parsing results, the feature extraction results, and the framework efficiency with respect to our evaluation metrics. 

#### _5.4.1. Log parsing results_ 

Using Drain [17] we were able to determine that our log file contains about 48 different events. Their repartition is shown in Fig. 5. From Fig. 5, we can learn that only 10 of those events have a real significance in the log file. The table in Fig. 6 below shows 5 of the most occurring events as well as their number of occurrences in the log file. Fig. 7 shows the repartition of the 10 most occurring events. 

#### _5.4.2. Feature extraction results_ 

In our experiments, we used 50 as window size. Approximately 2 million (size of training dataset) windows were generated for training. 

#### _5.4.3. Framework efficiency_ 

The chart in Fig. 8 below shows are framework efficiency. 

5 

_V. Zeufack, D. Kim, D. Seo et al._ 

_High-Confidence Computing 1 (2021) 100030_ 



**Fig. 8.** Framework Efficiency. 

71% of reported anomalies by our framework were indeed real anomalies. Our framework was able to detect all anomalies with a recall of 100%. The final combined F measure yields 83% which is a quite high result for an unsupervised framework. 

#### _5.4.4. Discussion_ 

It should be noted that we assume that the training logs are in majority normal. From our results, we can realize that our framework perform pretty well given that it has only being trained on around 2 million log lines. Moreover, we find that the precision is relatively average which is mainly due to the unsupervised nature of the framework. The precision could be made higher by increasing the training size. Also, we can argue that our results are better than DeepLog [15] which only works in a supervised setting, given normal logs for training. 

#### **6. Conclusion and future work** 

With the increasing complexity of today’s computer systems, timely and efficient anomaly detection has become necessary to prevent failures. As log files record precious information, they show up as a valuable resource for debugging and preventing failures. However, log file sizes have grown too large for humans to perform timely and efficient analysis. To solve this issue, many researchers have proposed automated anomaly detection frameworks. However, the current state-of-the art fails at providing an anomaly detection framework which can detect anomalies in real time without requiring normal or labeled logs. 

In this work, we proposed an unsupervised framework for real time anomaly detection. Our framework does not require neither normal nor labeled logs. Our framework has two main stages: a knowledge base construction stage which uses clustering for determining frequent patterns and a streaming anomaly detection phase for detecting anomalous events in real time. Our framework shows a novel perspective to anomaly detection in which, rather than alerting whenever an event trace is abnormal, we alert whenever an event seems abnormal in the context of the most recent events which occurred before it. We experimented our framework on an HDFS log dataset and obtained a great F-1 score of around 83%. 

In the future, we intend to explore the feasibility of an online unsupervised anomaly detection framework which can update itself in realtime without requiring periodic retraining. Moreover, we intend our feature extraction by exploiting the impact of the other rich features embedded in log files. 

#### **Declaration of Competing Interest** 

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

#### **References** 

- [1] D. Forte, The importance of log files in security incident prevention, Netw. Security (2009). 

- [2] Z. Cai, Z. He, X. Guan, Y. Li, Collective data-sanitization for preventing sensitive information inference attacks in social networks, IEEE Trans. Depend. Secure Comput. 15 (4) (2018) 577–590. 

- [3] Z. Cai, X. Zheng, A private and efficient mechanism for data uploading in smart cyber-physical systems, IEEE Trans. Netw. Sci. Eng. (TNSE) 7 (2) (2020) 766–775. 

- [4] Z. Cai, Z. He, Trading private range counting over big iot data, in: Proceedings of the 39th IEEE International Conference on Distributed Computing Systems (ICDCS 2019), 2019. 

- [5] Z. Cai, X. Zheng, J. Yu, A differential-private framework for urban traffic flows estimation via taxi companies, IEEE Trans. Ind. Inform. (TII) 15 (12) (2019) 6492–6499. 

- [6] X. Zheng, Z. Cai, Privacy-preserved data sharing towards multiple parties in industrial iots, IEEE J. Sel. Areas Commun. (JSAC) 38 (5) (2020) 968–979. 

- [7] Marr, B. (2018). Forbes. 21 May, [Online]. Available: https://www.forbes.com/ sites/bernardmarr/2018/05/21/how-much-data-do-wecreate-every-day-the-mindblowing-stats-everyone-should-read/#5b9fd28e60ba. 

- [8] M. Ankerst, M.M. Breunig, H.-P. Kriegel, J. Sander, OPTICS: ordering points to identify the clustering structure, Wiley Interdiscipl. Rev.: Data Min. Knowl. Discov. (2011). 

- [9] M. Ester, H.-P. Kriegel, J. Sander, X. Xu, A density-based algorithm for discovering clusters in large spatial databases with noise, in: Proceedings of 2nd International Conference on Knowledge Discovery and Data Mining, 1996. 

- [10] J.A. Hartigan, M.A. Wong, Algorithm AS 136: a _𝑘_ -means clustering algorithm, J. R. Stat. Soc. (1979) 100–108. Series C 

- [11] D. Defays, An efficient algorithm for a complete-link method, Comput. J. - Br. Comput. Soc. 20 (4) (1977) 364–366. 

- [12] S. He, J. Zhu, P. He, M.R. Lyu, Experience report: System log analysis for anomaly detection, in: Proceedings of IEEE 27th International Symposium on Software Reliability Engineering, 2016. 

- [13] W. Xu, L. Huang, A. Fox, D. Patterson, M.I. Jordan, Detecting large-scale system problems by mining console logs, in: Proceedings of the ACM Symposium on Operating Systems Principles, 2009. 

- [14] Q. Lin, H. Zhang, J.-G. Lou, Y. Zhang, X. Chen, Log clustering based problem identification for online service systems, in: Proceedings of IEEE/ACM 38th IEEE International Conference on Software Engineering Companion, 2016. 

- [15] J.-G. Lou, Q. Fu, S. Yang, Y. Xu, J. Li, Mining invariants from console logs for system problem detection, in: Proceedings of the USENIX Annual Technical Conference, 2010. 

- [16] X. Zhang, Y. Xu, H. Zhang, Y. Dang, C. Xie, X. Yang, J. Chen, X. He, R. Yao, J.-G. Lou, M. Chintalapati, F. Shen, D. Zhang, Robust log-based anomaly detection on unstable log data, in: Proceedins of the 2019 27th ACM Joint Meeting on European Software Engineering Conference and Symposium on the Foundations of Software Engineering, 2019. 

- [17] M. Du, F. Li, G. Zheng, V. Srikumar, Deeplog: anomaly detection and diagnosis from system logs through deep learning, in: Proceedings of ACM Conference on Computer and Communications Security (CCS), Dallas, 2017. 

- [18] W. Meng, Y. Liu, Y. Zhu, S. Zhang, D. Pei, Y. Liu, Y. Chen, R. Zhang, S. Tao, P. Sun, R. Zhou, Unsupervised detection of sequential and quantitative anomalies in unstructured logs, in: Proceedings of the Twenty-Eighth International Joint Conference on Artificial Intelligence (IJCAI-19), 2019. 

- [19] P. He, J. Zhu, Z. Zheng, M.R. Lyu, Drain: an online log parsing approach with fixed depth tree, in: Proceedings of IEEE 24th International Conference on Web Services, 2017. 

- [20] M.M. Breunig, H.-P. Kriegel, R.T. Ng, J. Sander, OPTICS-OF: identifying local outliers, in: Proceedings of the 3rd European Conference on Principles and Practice of Knowledge, Prague, 1999. 

- [21] AWS What is hadoop?[Online]. Available: https://aws.amazon.com/emr/details/ hadoop/what-is-hadoop/. 

6 

