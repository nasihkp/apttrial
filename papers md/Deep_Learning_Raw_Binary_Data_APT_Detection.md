International Journal of Machine Learning and Cybernetics (2026) 17:64 https://doi.org/10.1007/s13042-025-02853-0 

**ORIGINAL ARTICLE** 



# **Raw binary data usage with deep learning for advanced persistent threat attacks early stage detection** 

**Tero Bodström**<sup>**1**</sup> **· Timo Hämäläinen**<sup>**1**</sup> 

Received: 23 August 2024 / Accepted: 17 November 2025 / Published online: 2 February 2026 © The Author(s) 2026 

#### **Abstract** 

This paper presents a method for detecting anomalies directly from binary data using Deep Learning techniques. We aimed to support information security in network environments. The approach employs Deep Learning models based on neural networks to analyze raw binary data without preprocessing or transformation, allowing the detection of low-level deviations in the data patterns. The model’s performance with raw binary data was evaluated using three publicly available datasets: CIC-IDS2017, CIC-IDS2018, and IoT-IDS. Evaluation results indicated that the method can detect various types of attacks, with consistent performance on all tested datasets: the F1-scores were .9674 (CIC-IDS2017), .9911 (CICIDS2018), and .9957 (IoT-IDS). The paper outlines the method’s design and includes the model architecture, evaluation procedures, and observed performance metrics for anomaly detection tasks. The detection results are also presented and analyzed in detail. 

**Keywords** Anomaly detection · Binary data · Deep learning · Network attacks · Network security 

## **1 Introduction** 

Due to the growing number of sophisticated cyberattacks in today’s increasingly digitalized and interconnected world, new methods and tools are urgently needed to detect ongoing threats. Cyberattacks continue to evolve rapidly, and their global frequency tripled in 2020 during the COVID-19 pandemic  [1]. The pandemic also forced organizations to shift a significant portion of their workforce to home offices, relying heavily on remote connections. Many networks and systems were already insufficiently protected before this shift, and the adoption of new remote tools further expanded the potential attack surface. At the same time, network complexity increased as home networks gained remote access to organizational systems. The security of these home environments depends entirely on end users, who may not always 

> Tero Bodström tero.t.bodstrom@jyu.fi 

> Timo Hämäläinen 

> timo.t.hamalainen@jyu.fi 

> 1 Faculty of Information Technology, University of Jyväskylä, PL 35, 40014 Jyväskylä, Finland 

adhere to their organizations’ information security policies and requirements  [1–3]. 

In parallel, governments and critical institutions have long faced highly sophisticated attacks, particularly advanced persistent threats (APTs). These attacks can remain active for years within networks, often undetected, conducting espionage or data theft  [4]. Collectively, these challenges underscore the pressing need for more effective detection methods and tools. 

Motivated by persistent security challenges in organizational networks, this study explores techniques for identifying active cyberattacks. The research builds upon a theoretical understanding of APTs, among the most advanced and long-lasting forms of cyberattacks. Its primary objective is to support the development of effective detection and mitigation mechanisms [5] focused on the early stages of APT attacks, specifically reconnaissance and initial compromise. As a countermeasure, a Deep Learning (DL)-based anomaly detection approach is proposed. 

This work focuses on detecting anomalies in network traffic using raw binary input. The experiments were conducted without traditional preprocessing steps, such as data transformation or feature engineering. The novelty of the proposed method lies in its ability to operate without predefined data splitting or manual feature selection, both 

```
1 3
```

**<mark>64</mark>** <mark>Page 2 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

of which are common in existing approaches. Instead, the method directly utilizes raw binary network packet data as input to deep neural networks. This enables the model to automatically learn relevant patterns and features from the complete packet content, reducing preprocessing requirements while retaining all available information. By leveraging a full binary representation, the proposed approach simplifies the detection pipeline and preserves the richness of low-level data. The objective is to evaluate the feasibility of this approach for identifying anomalies in network communications. The presented DL-based detection method demonstrates that meaningful threat-related patterns can be extracted directly from binary-level data representations. 

During training and evaluation, multiple activation functions were tested. The Swish activation function, introduced by  [6], produced promising results when applied to binary data. However, certain performance limitations were observed, particularly related to sensitivity in binary classification tasks. To overcome this, a minor modification to the original Swish function was introduced, improving its responsiveness and accuracy for binary data analysis. 

The main contributions of this research are as follows: 

- Utilization of raw binary packet data for anomaly detection without the need for feature selection or data standardization using DL 

- Development of a modified Swish activation function that demonstrates greater sensitivity to small differences in binary data than the original version 

Section 2 presents the new architectural design in detail. Section 3 reviews the latest related research. Section 4 introduces the applied DL model, while Sect. 5 describes the required data types. Section 6 explains the dataset usage, and Sect. 7 discusses the modified Swish activation function. Section 8 presents the experimental results, followed by conclusions and future research directions in Sects. 9 and 10. 

## **2 Method presentation and test setup** 

There are many commercial products and academic studies that have attempted to address the issues surrounding cyber problems, such as detecting and stopping network attacks and identifying vulnerabilities in systems before they are hacked. However, the number of successful attacks continues to grow, so additional research efforts are needed to achieve more secure cyber environments. In this paper, we present the utilization of DL with raw binary data to detect anomalies caused by APT attacks early stages. The early stages of APT attacks often employ common network attack 

techniques, such as Distributed Denial of Service (DDoS), network scanning, port probing, brute-force login attempts, phishing-based intrusions, and malware delivery, which are well represented in publicly available network traffic datasets. The reasons for the utilization of raw binary data are based on black swan definitions  [7, 8], which are part of the theoretical foundation for this research  [5]. The term “black swan” refers to rare and unpredictable events with significant impact, as defined by Taleb [7], and it is difficult to detect. 

The authors  [9–11] stated that when tabular data are retrieved from a database or other dataset, different columns may have different types of data, such as numbers, text, and special characters. This can lead to a number of problems. The values in columns of tabular data often do not follow a normal (bell curve) distribution. In addition, they can include both continuous and categorical data, and sometimes show multiple patterns or groupings. To use this kind of data with neural networks, it usually needs to be transformed or simplified into a numerical format. However, this process can reduce the original complexity and richness of the data. An entire dataset can also be unevenly distributed; for example, some categories might appear much more often than others, making it hard for models to learn effectively from the dataset. To minimize some of these issues, tabular data can instead be represented as raw binary values, preserving the original structure and complexity found in the data. 

The objective in using raw data is to avoid any unnecessary manipulation or alteration and to keep the original complexity found in the data. Raw binary data was produced by directly converting packet capture (PCAP) files to binaries. Many academic research papers have demonstrated the usability of preprocessing methods for machine and Deep Learning. However, using preprocessing methods, such as feature selection, normalization, or standardization, may also lead to negative results due to the loss of important and useful information [12–14]. Black swans are not necessarily apparent in a normal distribution, as they are fat-tailed events with non-linear dynamical behavior. Therefore, from the perspective of black swans, one point in a dataset can be more important than the rest of the points [8]. 

In [5, 15], the authors defined APT attacks as multistage, multivector attacks and presented theoretical methods for detecting them. All the functionalities described in the concept paper [15] are not included as the main purpose in the current work is to verify if binary data can be utilized. The concept paper presents a Deep Learning stack with four “submodels” used together to improve overall detection; however, it is important to first verify the usability of the binary data. 

First, based on proposed DL models [15], we can state that the use of only a general artificial neural network (ANN) 

```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 3 of 18</mark> **<mark>64</mark>** 

in our research yielded poor performance; therefore, it was removed from the list of possible candidates as a standalone model. However, an ANN was tested and used as a classifier that took the output produced by other DL models as its own input. 

Second, the growing hierarchical self-organizing map (GHSOM) approach had problems with high-dimensional data, as the existing pairwise distances did not perform well, so it was also removed. Third, the gated recurrent unit (GRU) and long short-term memory (LSTM) methods had problems detecting anomalies as the data did not arrive in a specific order; rather, it was randomized. This randomization was used due to the function of the network protocols; that is, the packets were in order at the sending end, but there was no guarantee that the packets would arrive in the correct order when the traffic was captured from the data link layer (that is, from the Ethernet). Although temporal models, which handle time-series data, were not used. Further research on such models will be conducted in the future. 

The main purpose of this research was to investigate whether binary data can be effectively utilized with DL. Therefore, models with more complex architectures, such as transformers and other types of neural language processing (NLP) models, were not included in this study. Instead, the focus was placed on simpler architectures, which are easier to implement and interpret and sufficient for evaluating the feasibility of applying DL techniques to binary input data. By concentrating on these simpler models, the study could more directly assess the impact of binary data representation on learning performance without the additional complexity introduced by advanced architectures. 

The proposed DL models were programmed with Python 3.6, and the following supporting libraries were used: Tensorflow 2, Keras, Pandas, Numpy, and Scikit-learn. 

Training, validation, and testing were performed in an environment that used the following operating system and 

**Table 1** Mathematical approaches to APT attacks 

|Aspect|Mathematical approach|Description|
|---|---|---|
|Probabilistic|Bayesian networks,|Estimate attack likeli-|
|detection|machine learning<br>classifiers|hood and classify attacks<br>[18,19]|
|Multi-<br>stage attack<br>progression|Multi-stage attack<br>progression|Model sequential attack<br>phases with precondi-<br>tions and effects [20]|
|Similarity-<br>based detection|Correlation functions,<br>weighted similarity<br>matrices|Quantify similarity<br>between attack traces for<br>clustering [20]|
|Strategic<br>interaction<br>f|Game theory<br>frameworks|Model attacker–defender<br>interactions and opti-<br>mize defenses [21]|
|Effectiveness<br>evaluation|Statistical and math-<br>ematical effectiveness<br>models|Quantify security system<br>performance under APT<br>attacks[22]|



hardware configuration: CentOS-7 Linux, 12-core CPU, 64 GB RAM, and a GeForce RTX 2080 GPU. 

TensorFlow model configuration files to create the presented DL model are available at:  h t t p s : / / g i t h u b . c o m / t e r o b o d s t r o m / m o d e l c o n fi  g s 

## **3 Related work** 

A survey carried out by the authors of  [16] included different published APT detection methods. The main difference between a common malware attack and an APT attack is that the former is not targeted and is opportunistic, while the latter is targeted. The main characteristics of an APT attack are the following: (i) specific objectives and targets, (ii) highly organized and well-resourced, (iii) long-term campaign, and (iv) stealthy and evasive techniques. These characteristics make APT attacks more dangerous and difficult to detect than common attacks; in addition, APT attacks commonly take advantage of zero-day vulnerabilities. For these reasons, signature-based detection usually cannot identify APT attacks; instead, anomaly detection-based methods are required. The authors of  [17] have discussed the dynamic behavior of APT attacks in which the goals, strategies, or tactics can change during a campaign, increasing the difficulty of modeling them. The above-mentioned problems and detection difficulties have also been reported by other authors  [5]. Academic research has also provided mathematical formulas for defining APT attacks, and Table 1 presents some of these. From a mathematical point of view (as presented in the table), our research belongs to the category of probabilistic detection. 

The APT attack detection method used by the authors of  [23] is based on a parsed APT repository of known tactics, in which detected APT techniques are mapped. For detection, system logs and configuration files are collected and used as input data for a corresponding APT parser for technique identification. Subsequently, the identified technique is passed on to the APT matcher. 

The following auto-encoder variations were used for APT attack detection: variational autoencoder utilizing reconstruction probability (VAE-Prob)  [24] and memoryaugmented deep autoencoder (MemAE)  [25]. The authors of  [26] employed a convolutional neural network (CNN), while the authors of  [27] proposed two distinct hybrid DL models with a baseline test using a multilayer perceptron (MLP), CNN-MLP, and CNN-LSTM. Additionally, the authors of  [28] evaluated three different methods for APT detection in network traffic: a C5.0 decision tree, a Bayesian network, and a six-layer DL model. These studies utilized different datasets for evaluating detection performance and yielded promising detection results. The following datasets 

```
1 3
```

**<mark>64</mark>** <mark>Page 4 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

were used in the cited studies: CIC-IDS2017  [29], CICIDS2018  [29], CTU-13  [30], and NSL-KDD  [31]. 

The following research papers generally focused on network anomaly detection rather than APT attacks. However, it is important to highlight the methods they utilized. The authors of  [14] conducted a study that bears some similarity to the research presented in the current paper. Instead of using the raw binaries, they employed bytes from the packet and omitted the packet header section, substituting it with flow data in five columns. The authors of  [32] tested four different machine learning models for anomaly detection, including two traditional unsupervised models (K-means and self-organizing maps [SOM]), and two unsupervised DL models (the deep autoencoding Gaussian mixture model [DAGMM] and adversarially learned anomaly detection [ALAD]). 

In another study, the authors of  [33] compared two unsupervised DL models, an autoencoder and a restricted Boltzmann machine, for anomaly detection. The work in  [34] introduced a four-layer CNN for anomaly detection, where the dataset was converted into 480-bit chunks, incorporating information from the Internet Protocol (IP) header section. This DL model, with 480 dimensions in the input layer, was trained on raw data. A shallow convolutional neural network (S-CNN) and deep CNN (D-CNN) architecture were proposed by the authors of  [35] for multi-type attack classification, which included nine classes for modern attacks and one normal class. They utilized a 1D CNN for classification, which only required normalization of the input data, unlike the extensive manipulation required by other CNN methods (e.g., 2D CNN). 

The authors of  [36] proposed a DL hybrid model for anomaly detection, featuring four 1D CNN layers and four fully connected layers. Furthermore, the study of  [37] focused on a 2D CNN anomaly detection model. Instead of training the models from scratch, the researchers employed transfer learning, retraining existing models with new data. They extracted an eight-layer 2D CNN from a pre-existing 34-layer residual neural network and trained it using 2D grayscale images. The authors of  [38] combined a parallel 1D CNN with a GRU to bypass fixed detection rules, manual feature setups, and pure port detection, thus classifying malicious traffic from regular network traffic. 

In their research, the authors of  [39] tested four different DL models for anomaly detection: a multilayer perceptron (MLP), CNN, deep neural network (DNN), and an autoencoder (AE). Furthermore, the study in  [40] introduced a conditional variational auto-encoder (CVAE) that used a latent representation to encode normal and malicious network traffic. Unlike traditional autoencoders, which are typically unsupervised, the CVAE was trained using a semiunsupervised method. The datasets used in these studies 

included CIC-IDS2017, CIC-IDS2018, UNSW-NB15  [41], ISCX2012  [42], ICS Gas Pipeline dataset  [43], KDDCUP99  [44], and NSL-KDD99. 

The recent DL-based APT and anomaly detection research presented above illustrated that various DL models were used for solving common issues, and CNN models appeared to be used widely. Precise models or combinations of two known DL models (hybrid) were used and achieved high detection accuracy. Therefore, DL is a useful technology for improving anomaly detection. 

Interestingly, there was also a worrying phenomenon that appeared in nine of the 15 related articles  [24, 25, 28, 32, 33, 36, 37, 39, 40]. The KDD99 and NSL-KDD datasets, which are more than 20 years old, unrealistic, and highly manipulated, were widely used for the training, testing, and benchmarking of machine learning and DL models. Although the datasets were not commonly used alone, their continued use for comparison tests is questionable. 

Although there is not enough data to simulate real situations  [8] and perfect datasets do not exist, some datasets can be considered as providing more accurate results with regards to modern networks and attacks than others  [45]. Many of the datasets mentioned above, such as KDD99 and NSL-KDD, are outdated and not representative of modern network data and networks  [35, 45–54]. Thus, they should no longer be used as indicators of performance in relation to current networks. In 2007, the archiving authority of the KDD99 dataset announced publicly  [55] that the dataset should not be used and that studies using only KDD99 should be rejected. Furthermore, the author of  [48] noted dataset problems in 2014 and proposed measures against studies that used these outdated datasets. A similar view can be found in research on APT attacks. Multiple papers report the same trend, where APT attacks are sophisticated and evolving constantly with dynamic, stealthy, and evasive techniques. Thus, two-decade-old data cannot be expected to accurately simulate those attacks. 

Table 2 presents the earlier-mentioned research references, detection methods, pre-processing, detection types, and datasets used. 

The DL detection methods presented in this section were applied to partially different datasets, but many of the datasets have been commonly used in the field. However, the data preprocessing approaches varied considerably. Methods ranged from standardization and normalization to statistical analysis, specialized software tools, and manual techniques, such as trimming data to a specific length. This variation highlights that preprocessing must be tailored to the characteristics of each dataset. Selecting an inappropriate preprocessing method can lead to inaccurate or misleading results. 

```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 5 of 18</mark> **<mark>64</mark>** 

|**Table 2**Related work on<br>|References|Detection method|Pre-processing|Dataset|
|---|---|---|---|---|
|anomaly detection|[23]|APT parser|N/A|N/A|
||[24]|Variational autoencoder|Statistical analysis|CIC-IDS2017,|
|||utilizing reconstruction<br>probability (VAE-Prob)|i|NSL-KDD|
||[25]|Memory-augmented deep<br>autoencoder (MemAE)|Drop missing values, replace infinite val-<br>ues, remove single-value columns, one-hot|<br>CIC-IDS2017,<br>UNSW-NB15,|
||||encoding, min-max normalization|NSL-KDD|
||[26]|Convolutional neural net-<br>work (CNN)|Chosen|CIC-IDS2018|
||[27]|CNN-MLP, CNN-LSTM|CICFlowMeter tool|CTU-13|
||[28]|C5.0 decision tree, Bayes-<br>ian network, six-layer DL<br>model|RapidMiner software|NSL-KDD|
||[14]|LSTM-based DID-LSTM|N/A|CIC-IDS2017,<br>CIC-IDS2018|
||[32]|K-means, SOM, DAGMM,|Preprocessing mentioned, not detailed|KDDCUP99,|
|||ALAD|except timestamps|ISCX2012|
||[33]|Autoencoder, restricted<br>Boltzmann machine|All data converted to numerical values and<br>normalized 0–1|<br>KDDCUP99|
||[34]|Four-layer CNN|Packets cut to 60 bytes or padded; values<br>converted to decimals 0–255|Proprietary|
||[35]|S-CNN, D-CNN|Symbolic preprocessing, data cleaning,<br>normalization|UNSW-NB15|
||[36]|DL hybrid model|Feature numerization and normalization|NSL-KDD|
||[37]|2D CNN|Feature removal, normalization<br>i|KDDCUP99,<br>gas pipeline<br>data|
||[38]|Parallel 1D CNN with<br>GRU|SplitCap tool; selection of first 54 bytes of<br>packets|ISCX2012|
||[39]|MLP, CNN, DNN, AE|Feature transformation and normalization|UNSW-NB15,<br>NSL-KDD99|
||[40]|Conditional VAE (CVAE)|Scaled to zero mean and unit standard<br>deviation|CIC-IDS2017,<br>KDDCUP99|



## **4 The deep learning model** 

DL models are generally divided into shallow models and deep models, where the former consists of one or two hidden layers, and the latter, a higher number of hidden layers. Modern DL models can include ten to hundreds of layers. The purpose of hidden layers is to gain successive non-linear representations of the training data to increase modeling power and expressiveness  [56]. Empirical research by various authors  [57–59] has shown the importance of selecting the correct number of hidden layers and nodes. Shallow models were not capable of achieving high detection accuracy, but the results improved by increasing the number of hidden layers and the number of nodes in the layers, as well as a higher number of training iterations. Finding the correct number of hidden layers and nodes requires an analysis of the model results; thus, trial-and-error experiments are generally used to finding the best configuration. 

In the current study, the DL model for the binary data tests was selected from 11 different DL model types. First, six models (ANN, AE, CNN, RNN, LSTM, and GRU) were 

developed and tested independently with different losses, activation functions, optimizers, learning rates, kernel regularizers, layer amounts, nodes in layers, and architectural parameters in the different models. The various models were then stacked together, with the upper model’s output used as input to the second model, and were tested with the same hyperparameters. With the stacked models, ANN was used for the lower model for binary classification; thus, the stacked models were AE-ANN, CNN-ANN, RNN-ANN, LSTM-ANN, and GRU-ANN. With the models, both individually and stacked, more than 200 different model configurations were tested. Training and testing were run in the testing environment described in Sect. 2; thus, it was timeconsuming. With analysis, the entire process took approximately four months. 

The selection of model architectures was guided by an iterative grid search, where a set of hyperparameter combinations was formed multiple times based on detection performance against the primary dataset. Initially, the search included hyperparameter combinations for common DL architectures, such as ANN, AE, CNN, RNN, LSTM, and GRU. As the detection performance was not satisfactory, 

```
1 3
```

**<mark>64</mark>** <mark>Page 6 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

**Fig. 1** Architecture of the model, deep AE with an ANN binary classifier 





**Fig. 2** Layers structure 

|**Table 3**Model hyperparameters|||
|---|---|---|
|Hyperparameter|Auto-encoder|ANN|
|Hidden layers activation|Incswish|ReLU|
|Output layers activation|Incswish|Sigmoid|
|Kernel regularizer|l2(0.001)|l2(0.001)|



more complex hybrid DL networks were developed and tested. In the development phase, the detection performance of the model was first tested with 10  000 samples, and the models that achieved a required detection rate were tested with the partial randomly selected CIC-IDS2017 test set; the number of samples is presented in Sect. 6. 

The final model consisted of two joined DL models, as shown in Figs. 1 and 2. These figures display the model structure, including all layer nodes and trainable parameter counts. The first is an AE, which has 19 layers; the lowest presentation of the 12 176 dimensions was shrunk to 33 dimensions. The latter model is a seven-layer ANN with one output node. The AE had the following configuration: All the hidden layers and the output layer used Incswish activation (explained in detail later in this paper). The output data of the AE was used as input for the ANN. The ANN uses a rectified linear unit (ReLU) as an activation function in the hidden layers and the sigmoid function in a one-node output layer. Additionally, to slow down the learning speed and avoid overfitting, an L2-norm kernel regularizer was used with a value of 10<sup>_−_3</sup> . The final output loss function is binary cross-entropy with an adaptive moment estimation (Adam) optimizer, and the learning rate was set to 10<sup>_−_6</sup> . 

The final selected model used the hyperparameters presented in Tables 3 and 4. The latter table includes the hyperparameters used for training the model. 

The binary AE-ANN model was trained with 200,000 normal traffic and 200,000 attack packets; the data were split with 75% in the training set and 25% in the validation set. The packets were selected randomly from the dataset 

```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 7 of 18</mark> **<mark>64</mark>** 

|**Table 4**Traininghyperparameters||
|---|---|
|Hyperparameter|Value|
|Optimizer|Adam(learning_rate=0.000001)|
|batch size|15|
|Kernel Regularizer<br>fl|l2(0.001)|
|Shuffle|True|
|Epochs in the beginning|4|
|Epochs in transfer learning|2 per transfer|
|Earlystop patience|2 3|



and consisted of normal and attack packets, where the latter included all attack types (approximately the same amount from the various attacks). The datasets were split into ten smaller versions due to memory limitations with the server. Thus, the model was trained with the first smaller dataset and fine-tuned nine times with the remaining split datasets. The initial training with the first set was executed for four epochs, and two epochs were used for each remaining dataset for fine-tuning. 

The model predicts whether the arriving packet is normal or an attack, and all packets that are classified as normal are dropped from the flow. The model using a deep AE with an ANN binary classifier (binary AE-ANN) was able to predict normal traffic and attacks with good results when the threshold value for prediction was set at 0.63. The test results showed that all the attacks had a higher predicted value than that threshold; however, in some cases, normal traffic was predicted as higher (not normal) as well. Nevertheless, the model interpreted all packets that had a higher predicted value than the threshold as anomalies. 

All attack predictions fell within the range of 0.635712 to 0.640855. Based on this observation, the decision threshold was increased from 0.5 to 0.63, leaving a small safety margin between the threshold and the lowest attack prediction. Using the original threshold of 0.5, the number of false positives was 31,773; this number was 23,604 after adjusting the threshold, resulting in a reduction of 8,169 samples. This change in the threshold was relatively small when considered in the context of the overall test set size, indicating that the adjustment improved detection performance while having only a minor impact on the dataset balance. 

The purpose of the model was to detect and remove all packets that were recognized as normal traffic. This is because what we already know is not that interesting  [7]. The model dropped all the packets that were detected as normal, and the outlier packets, as original binaries, were sent for further analysis, for example, to a security operations center (SOC). This is a more secure way to accept some level of false positives (a normal packet misclassified as an outlier), instead of classifying attacks as normal (a false negative), when they are causing real threats to networks 



**Fig. 3** Architecture of the model, deep AE with ANN binary classifier 

and systems. The flow diagram in Fig. 3 and pseudocode in Algorithm 1 demonstrate the process. This process executes when there is data in a buffer, runs until the buffer is empty, and then waits for more data. 

```
1 3
```

**<mark>64</mark>** <mark>Page 8 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 



##### **Algorithm 1** Anomaly detection process 

The time complexity for the system is discussed next. The detection system with a DL model consists of three different functions: (i) buffers, (ii) if-else statements, and (iii) model predictions. The time complexity for the buffers and if-else statements is O(n) because all the inputs per function are processed. For the model, the prediction times for inputs 1, 10, 100, 1000, 10,000, and 100,000 were measured in seconds, and the time complexities were evaluated by the results in the Table 5. The model has O(n) growth when comparing the results, and thus, the overall time complexity is O(n). The prediction simulation was implemented as follows: A PCAP file with 100,000 packets was loaded into memory as binaries, and the script was read row by row to make a prediction. This is the same situation as when a network packet is saved to a buffer in binary format; thus, the binary writing to the buffer was not taken into account. It is worth mentioning that the time complexity tests were executed in a simulation environment; thus, the data were not read directly from a network interface. 

Additionally, we separately executed different time-complexity measurements for the model. The prediction test was run ten times with 100,000 samples; that is, 100,000 network packets were converted to arrays of length 12,176, and all data were given as one set (100,000 x 12,176), not packet by packet. By comparing test results to row-by-row reading, the difference is considerable. Reading 10,000 packets row by row took almost double the time (42 s), compared to reading a complete 100,000 sample at once (24 s). Table 6 shows the average time for the 100,000 predictions of the model. 

## **5 Data types for anomaly detection** 

The data types that were considered to support APT detection are presented in this section. With respect to the previous research and definitions, the main focus will be on using binary data for anomaly detection  [5, 15]. 

Network data packets are captured as hex values, where each hex data pair represents one byte of data, that is, eight bits. These data pairs form the overall packets. For example, in an Ethernet network, the maximum transmission unit (MTU) length of a packet is 1522 bytes by default. The IP header has a fixed length as long as the option field is not used, which is the current recommendation. The header sizes vary according to the protocol used, such as the Transmission Control Protocol (TCP), User Datagram Protocol (UDP), and Internet Control Message Protocol (ICMP). Our training, validation, and tests showed that, in a raw format, the input data ends can be padded with zeros so that the full length (12 176) is achieved. Although the protocol headers 

**Table 5** Time measurements in seconds 

|Input size|Seconds|
|---|---|
|1|0.0046|
|10|0.0408|
|100|0.4393|
|1000|4.2815|
|10,000|42.6018|
|100,000|426.4827|



**Table 6** Prediction times 

|DL model|Prediction time|
|---|---|
|AE-ANN|24 s|



```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 9 of 18</mark> **<mark>64</mark>** 

are not the same size, the neural networks can process the data correctly. 

The MTU in an Ethernet network is limited to 1522 bytes when a virtual local area network (VLAN) tag is in use, and one byte is eight bits. Thus, the network packets were converted to binary format and used as input for neural networks, resulting in a vector of 12 176 digits. Each index of the vector is one dimension, and thus the data have 12 176 dimensions: 



There were some advantages in using raw data. For example, when using binary data, normalization is not required, as all values are zeros or ones. This leads to a situation where the input dimensionality and neural network sizes are high; however, this approach prevents possible information loss caused by the pre-processing of data  [5, 7]. 

The number of dimensions has a great impact on the size of neural networks, which will directly impact memory usage. Other impacts of higher dimensions are (i) a higher number of trainable parameters, (ii) longer training times, (iii) longer prediction times, and (iv) an increased amount of training data. However, the larger size of the DL model was not necessarily a problem, as the authors of  [60] conducted experiments to estimate the optimal size of neural networks by mathematically evaluating the memory requirements. Based on their tests, the conclusion was contrary to the common belief that to avoid certain basic problems, neural networks must be much larger than normally expected. 

Additionally, one concern related to the high-dimensional data is the _curse of dimensionality_ . This known phenomenon can cause two issues: (i) the model will be highly overfit, and thus, the performance will be low; and (ii) highdimensional data are hard to cluster, and too many dimensions cause observations in a dataset to appear equidistant from one another (e.g., using Euclidean distance), so meaningful clusters cannot be formed. 

We acknowledge the risk of overfitting due to the highdimensional input space. To reduce this risk, the number of training epochs was limited, and early stopping was applied. In addition, the results on separate validation and test sets showed consistent performance, suggesting that overfitting was not a major issue in this study. 

## **6 Datasets** 

We mainly used the publicly available Intrusion Detection Evaluation Dataset (CIC-IDS2017)  [29] to train, validate, and test the DL models. The dataset was produced to allow the execution of a more realistic network attack detection 

test, compared to the outdated and unrealistic datasets that are widely used, including KDD98, KDDCUP99, and NSLKDD  [41, 61]. CIC-IDS2017 includes complete recorded network data traffic packets, and the network topology is similar to common organizational local networks. The authors acknowledge the fact that CIC-IDS2017 does not have all the attack vectors for full-scale APT attacks, but it includes early-stage attack vectors. However, it is commonly used for similar research (see Table 2), and was selected to benchmark the DL model because it has a wide range of different attacks, which are also used by APT, as well as consists entirely of unmanipulated network data. Another option was the DAPT 2020 dataset  [62], but it was rejected due to a lack of detailed ground truth for the packet capture (PCAP) files. 

An important observation for the dataset selection is that the results are valid with the dataset used and cannot be directly generalized to all networks, as we cannot assume that network traffic has linear growth in either normal traffic or attacks, or that a network topology does not have an effect on the data. Furthermore, networks are not directly comparable due to different topologies, variations in the number of devices, users, and software instances communicating. Thus, to verify the assumptions presented, the model was tested with other datasets: CIC-2018  [29] and an Internet of Things (IoT) network intrusion dataset (IoT-IDS) [63]. The latter is a smaller-scale dataset that includes fewer attack types than the others; however, it includes a man-in-themiddle (MITM) attack, which was not included in the other datasets. In addition, the network topology in IoT-IDS is different than the other datasets, including in terms of network address ranges. Furthermore, CIC-IDS2017 and CICIDS2018 do not contain all the same attack types. However, their network topologies are similar, although the topology in CIC-IDS2018 is more complicated. 

For our purposes, we extracted attack packets from separate PCAP files by attack type, as well as moving normal traffic to a separate file. These created PCAP files allowed us to train, validate, and test the results in a detailed manner. As APT attacks use multiple techniques during a campaign, we tested and were able to detect different attack types with good results. 

Training and validation sets were randomly selected from the normal traffic dataset, and attacks were randomly selected by attack type, creating nine smaller datasets (CICIDS2017), seven smaller attack sets (CIC-IDS2018), and four attack datasets (IoT-IDS), with comparable amounts of data (where possible). Traffic data generated by the different types of attacks varied considerably in the datasets. With CIC-IDS2017, two attack types that were left out of the training and validation sets were added to the test set as completely unknown attacks. Both the training and 

```
1 3
```

**<mark>64</mark>** <mark>Page 10 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

**Table 7** Test sets 

|Dataset|CIC-IDS|CIC-IDS|IoT-IDS|
|---|---|---|---|
|fi|2017|2018||
|Traffic type<br>fi|Amount|Amount|Amount|
|Normal traffic|1,100,710|1,144,046|79,841|
|_Attacks_||||
|FTP attack|50,000|50,000|N/A|
|SSH attack|50,000|50,000|N/A|
|DOS|59,331|80,000|54,646|
|Heartbleed|34,824|N/A|N/A|
|Web attack<br>i|16,062|35,255|N/A|
|Infiltration|15,035|3757|N/A|
|BOT|5061|49,883|85,596|
|DDOS|70,168|105,000|N/A|
|Portscan|50,000|N/A|17 357|
|MITM|N/A|N/A|91,887|
|Total|1,451,191|1,517,891|329,327|



in many contexts, particularly where subtle variations in input values are important. 

Initial tests from its creators showed that the Swish function performed better than the widely used ReLU. ReLU exhibited good performance in our research with a 1D CNN and supervised learning. However, performance dropped considerably when we tested AE and unsupervised learning. 

While we were testing the Swish function for our purposes, we found that it did not perform well enough. As our inputs were zeros and ones, this caused the output layer to limit all the predictions to the range [0... 0.7310586], as presented in the following Swish function f(X) outputs in Eqs. (3) and (4): 





validation datasets containing normal and attack data had 200,000 samples while utilizing CIC-IDS2017 and CICIDS2018, and they were split into smaller sets when necessary. However, training and validation datasets with IoT-IDS were approximately one-fifth the size of the other datasets, that is, roughly 40,000 samples per dataset, due to the dataset’s considerably smaller size. The test sets with unseen data were extracted from the original PCAP files, and the exact number of samples is presented in Table 7. 

## **7 Increased Swish activation function** 

The Swish activation function was first presented in 2017  [6]. The fundamental idea of this activation function (2) is that the weights are estimated dynamically by multiplying an input value by the sigmoid activation function itself. The beta value in the equation is set to one by default; thus, it does not have an effect when it is not changed. Swish activation executes the following equation during the training process: 



From a theoretical perspective, Swish is smoother and non-monotonic compared to ReLU, which allows it to propagate gradients more effectively, especially for small negative inputs. This property can help avoid the “dying ReLU” problem and support better gradient flow in deeper networks. The multiplicative interaction between the linear term _x_ and the bounded sigmoid function also provides a form of adaptive gating, where the function scales inputs in a continuous and data-dependent way. These characteristics explain why Swish has been observed to outperform ReLU 

Therefore, the results in the binary AE-ANN classes had many overlapping values, and the accuracy was not sufficient for our purposes. To make Swish more sensitive to minor differences, we added a mathematical constant. As the golden ratio equation has shown good performance in distributing values equally, for example, in hash tables  [64], we used it (1 + _√_ 5) _<u>/</u>_ 2, and the absolute value of the inverse golden ratio, (1 _− √_ 5) _/_ 2, to achieve greater sensitivity. 

From a theoretical perspective, the golden ratio has long been associated with balanced scaling properties in mathematics and computer science. Its irrational value avoids simple periodic repetition and ensures a more uniform distribution of outputs when applied as a multiplier. In the context of activation functions, this scaling broadens the output range while preserving smoothness, which increases the separation between binary input values. As a result, small variations in the input are amplified in a mathematically consistent way, improving the model’s ability to distinguish between classes. 

Together, these theoretical properties of Swish and the golden ratio scaling provide a rationale for why the modified activation function (Incswish) enhances sensitivity in binary input scenarios, beyond the empirical improvements observed in our experiments. 

After the final modifications and tests, we found that Equation 5 worked well with binary data (although assessing performance with other types of data would require more testing and validation): 



With the above equation and zeros and ones as input, the target range increased from the range previously mentioned 

```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 11 of 18</mark> **<mark>64</mark>** 



<!-- Start of picture text -->
Fig. 4  Incswish output values<br>[−5,3]<br><!-- End of picture text -->





<!-- Start of picture text -->
Fig. 5  Incswish output values<br>[−1,1]<br><!-- End of picture text -->





<!-- Start of picture text -->
f (0) = 0 (6)<br><!-- End of picture text -->

|**Table 8**Evaluation metrics||_f_(0) = 0<br>(6)|
|---|---|---|
|Metric|Formula||
|True positive rate, recall (TPR)|TP/(TP+FN)|_f_(1) = 1_._9139363<br>(7)|
|False negative rate (FNR)|FN/(TP+FN)|i|
|True negative rate (TNR)|TN/(TN+FP)|This modified activation function produces slightly negative|
|False positive rate (FPR)<br>|FP/(TN+FP)<br>|i<br>values for predictions instead of converting them to zero.|
|Positive predictive value, precision<br>(PPV)<br>Negative predictive value (NPV)|TP/(TP+FP)<br>TN/(TN+FN)|Figure4presents the non-linear values for Incswish (beta =<br>1), which were also presented in  [6]:|
|Accuracy (ACC)<br>F1-score(F1)|(TP+TN)/(TP+TN+FP+FN)<br>(2TP)/(2TP+FP+FN)|_Incswish_(_x_) :R_→_[_−_5_,_3]|



This modified activation function produces slightly negative values for predictions instead of converting them to zero. Figure 4 presents the non-linear values for Incswish (beta = 1), which were also presented in  [6]: 

to [0... 1.9139363]; thus, the non-linear activation function was now more sensitive to small changes inside DL models and data. We named the modified function ‘Incswish’, and the function’s f(x) output results are presented in the following equations: 

Figure 5 presents Incswish (beta = 1) in more detail. The values are for the following: 

_Incswish_ ( _x_ ) : R _→_ [ _−_ 1 _,_ 1] 

```
1 3
```

**<mark>64</mark>** <mark>Page 12 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

**Table 9** Detection accuracy metrics with the entire test dataset 

|Metric|CIC-IDS2017|CIC-IDS2018|IoT-IDS|
|---|---|---|---|
|TPR|1.0000|1.0000|1.0000|
|TNR|0.9786|0.9942|0.9732|
|FPR|0.0214|0.0058|0.0268|
|FNR|0.0000|0.0000|0.0000|
|PPV|0.9369|0.9825|0.9915|
|NPV|1.0000|1.0000|1.0000|
|ACC|0.9837|0.9956|0.9935|
|F1|0.9674|0.9911|0.9957|



**Table 10** Detection test results for different attack types with the entire test datasets 

|Traffic type<br>fi|CIC-IDS2017|CIC-IDS2018|IoT-IDS|
|---|---|---|---|
|Normal traffic|0.978|0.994|0.973|
|_Attacks_||||
|FTP attack|1.000|1.000|N/A|
|SSH attack|1.000|1.000|N/A|
|DOS|1.000|1.000|1.000|
|Heartbleed|1.000|N/A|N/A|
|Web attack|1.000|1.000|N/A|
|Infiltration|1.000|1.000|N/A|
|BOT|1.000|1.000|1.000|
|DDOS|1.000|1.000|N/A|
|Portscan|1.000|N/A|1.000|
|MITM|N/A|N/A|1.000|



## **8 Anomaly detection test results and evaluation** 

The evaluation of test results was based on standard detection metrics, as shown in Table 8. Table 9 summarizes the overall detection performance of the binary classifier across all the tested datasets. 

Detailed performance results, including class-specific metrics for normal traffic and various attack types, using the full test sets for each dataset, are presented in Table 10. 

By analyzing the results and metrics of the tests, the model was able to detect all attacks. The model achieved a true positive rate (TPR) of 1.0 across all datasets. This result indicates that the model was able to detect all attacks without missing any instances, demonstrating strong sensitivity. As a consequence, the false negative rate (FNR) was reduced to zero. The true negative rate (TNR) was also high, ranging between 0.9732 and 0.9942, which shows that only a small portion of normal traffic was incorrectly classified as attacks. In addition, the model reached high values for both the positive predictive value (PPV) and negative predictive value (NPV). These results further confirm that the predictions made by the model were consistently accurate, both when identifying attacks and when recognizing normal traffic. However, 2.2% of the normal packets were misclassified as attacks with CIC-IDS2017, 0.6% with CICIDS2018, and 2.7% with the IoT-IDS dataset. For the binary AE-ANN, the threshold varied between datasets. That is, all the packets that had a higher predicted value were probably attacks. However, the results also showed that there will be some normal traffic with higher predicted values. Regardless of the test set, the AE-ANN was able to detect all attack packets, with different small amounts of false positive (FP) packets—that is, normal packets misclassified as an attack. The area under the receiver operating characteristic curves (ROC-AUCs) for the primary dataset CIC-IDS2017 is shown in Fig. 6. The ROC-AUC shows that the model predicts with high confidence. 

Detection accuracy varied across the datasets, but overall performance remained solid. In the case of CIC-IDS2018, the network topology was similar, though more complex, 



**Fig. 6** ROC-AUCs for CIC-IDS2017 

```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 13 of 18</mark> **<mark>64</mark>** 



**Fig. 7** IoT-IDS confusion matrix detection results before (left) and after the re-training (right) 

than that of CIC-IDS2017, resulting in a minimal need for retraining. In contrast, the IoT-IDS dataset required weight reinitialization to achieve acceptable results. Figure 7 illustrates the detection accuracy both without transfer learning and with reinitialized weights and compares these with results from a newly trained model using confusion matrices. A key challenge with the IoT-IDS dataset was the limited amount of training data, approximately one-fifth of that available for the CIC-IDS datasets, which likely caused its lower detection accuracy. 

When comparing results in confusion matrices, the importance of transfer learning and reinitialization is obvious. The false negative and false positive rates decreased considerably; thus, performance improved. These results also confirm the earlier assumptions that when using the entire data packet in a raw binary mode and with network topology changes, transfer learning or reinitialization are required. 

Even though the overall detection rate was high with all tested datasets, the results showed that the best overall results (F1-Score, Table 9) were achieved with the dataset with the lowest number of different types of attacks, and performance started to decrease when the number of attacks increased. In addition, the IoT-IDS dataset contained less data than the other dataset; therefore, with more retraining data in IoT-IDS, the model could achieve a higher detection rate. 

As a result of the tests, metrics, and analysis, it can be stated that all the test results showed that raw binary data, without feature selection or any pre-processing, can be utilized for anomaly detection with high detection results. The DL model performed with slightly divergent results concerning the different datasets; therefore, it needs to be 

**Table 11** Test Results for related works and comparison 

|Research|Accuracy|Dataset|
|---|---|---|
|DL model|0.9837|CIC-IDS2017|
|DID-LSTM<sup>1</sup>|N/A|CIC-IDS2017|
|VAE Prob<sup>2</sup>|0.9177|CIC-IDS2017|
|CNN<sup>3</sup>|0.7464|CIC-2018|
|6-layer DL<sup>4</sup>|0.9885|NSL-KDD|
|<br>MemAE<sup>5</sup>|0.88|CIC-IDS2017|
|CNN-LSTM<sup>6</sup>|0.99|CTU-13|



1 Footnote content for DID-LSTM - 2 Footnote content for VAE Prob -<sup>3</sup> Footnote content for CNN -<sup>4</sup> Footnote content for 6-layer DL -<sup>5</sup> Footnote content for MemAE -<sup>6</sup> Footnote content for CNN-LSTM 

studied whether the underlying network topology was causing this phenomenon. 

Different attack type classifications were also employed to verify that packet headers, including IP addresses, did not disproportionately influence the high detection performance of the selected DL model. The network topologies in the chosen datasets varied, ranging from networks divided into attack and target segments to those where attackers and targets were within the same network, sharing identical IP addresses. This information was verified through analysis of the PCAP files. 

The IoT-IDS dataset, characterized by a more complex network setup and a smaller overall data size, resulted in a classification accuracy of 0.9935. The classification results did not indicate a clear distinction in accuracy between normal and attack traffic. If IP addresses had dominated the classification process, the results observed in the CICIDS2017 dataset would likely have been different. Specifically, attacks using mostly the same source and target IP addresses, due to passing via the gateway address, should have shown a higher rate of misclassifications, and normal 

```
1 3
```

**<mark>64</mark>** <mark>Page 14 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

**Table 12** Test results for related works and comparison 

|Research|Acc|Pre|Rec|F1|
|---|---|---|---|---|
|DID-LSTM<sup>1</sup>|||||
|CIC-IDS2017|N/A|0.992|0.998|0.994|
|CIC-IDS2018|N/A|0.933|0.923|0.927|
|VAE Prob<sup>2</sup>|||||
|NSL-KDD|0.8744|0.8968|0.8806|0.8887|
|CIC-IDS2017|0.9177|0.7508|0.7545|0.7526|
|CNN<sup>3</sup>|||||
|CIC-IDS2018|0.9514|N/A|N/A|N/A|
|6 layer DL<sup>4</sup>|||||
|NSL-KDD|0.9885|0.9872|0.9889|0.9854|
|MemAE<sup>5</sup>|||||
|NSL-KDD|0.8951|0.9062|0.8951|0.8993|
|UNSW-NB15|0.853|0.8774|0.853|0.8526|
|CIC-IDS2017|0.8800|0.9732|0.9153|0.9412|
|CNN-LSTM<sup>6</sup>|||||
|CTU-13|0.9900|0.9600|0.9300|0.9400|
|DL Model|||||
|CIC-IDS2017|0.9837|0.9369|1.0000|0.9674|
|CIC-IDS2018|0.9956|0.9825|1.000|0.9911|
|IoT-IDS|0.9674|0.9915|1.000|0.9957|



traffic should have been classified more accurately due to its use of different IP addresses than the attack traffic. 

### **8.1 Comparison to other related research results** 

This section compares the results of the proposed DL model, which utilizes raw binary data, with findings from existing APT detection research. Tables 11 and 12 summarize the test results from earlier studies reviewed in Sect. 3. When comparable experiments were conducted using the same datasets as in this study, those results were selected for inclusion, even if the original papers also employed other datasets. This approach ensures a consistent basis for comparison. In cases where studies did not report overall accuracy values, averages were calculated from the available results. Additionally, when multiple methods were presented within a study, only the one achieving the highest accuracy was considered. The referenced studies in Tables 11 and 12 are numbered as follows: (1)  [14], (2)  [24], (3)  [26], (4)  [28], (5)  [25], and (6)  [27]. 

As shown in Table 11, the proposed model achieved higher detection accuracy than the selected baseline methods when evaluated using the same dataset. This indicates the effectiveness of the proposed approach under directly comparable conditions. However, two of the three baseline models demonstrated higher accuracy when tested on different datasets. Such results should be interpreted cautiously, as variations in datasets, such as traffic patterns, attack types, and class distributions, can substantially influence model performance and make direct comparisons less meaningful. 

Table 12 presents detection results using standard evaluation metrics: accuracy, precision, recall, and F1-score. Based on F1-score comparison, the proposed DL model outperformed all other methods except DID-LSTM with the CIC-IDS2017 dataset and the 6-layer DL model. However, as the latter used the NSL-KDD dataset, a direct comparison is not entirely valid. When comparing the two most similar approaches, our proposed model and DID-LSTM, both demonstrated superior performance to other methods on the CIC-IDS2017 dataset. While DID-LSTM achieved slightly higher precision and F1-scores, the proposed model performed better in precision, recall, and F1-score with the CIC-IDS2018 dataset. These findings support the argument that DL models can effectively process non-preprocessed data while maintaining competitive detection accuracy. Other studies reporting higher accuracy often relied on hybrid or ensemble DL architectures, though typically applied to different datasets. 

Despite its advantages, the proposed DL model also presents several challenges: (i) its large size and high dimensionality result in substantial computational requirements; (ii) model training and updating demand significant processing power and time; (iii) adequate hardware resources, such as sufficient RAM and high-performance GPU/CPU capabilities, are necessary to handle the model’s scale and data dimensions; and (iv) The model’s time complexity is O(n), a limitation inherent to its DL architecture implemented with TensorFlow 2 and Keras. 

Several related works have proposed different approaches to anomaly detection. For instance,  [65] developed a 1D-CNN-based classifier that incorporated feature selection and protocol-based data categorization, achieving strong results on the UNSW-NB15 dataset. Similarly,  [66] introduced a hybrid model combining GRU and DAE architectures, using min-max normalization for preprocessing and demonstrating effective detection on the NSL-KDD dataset. The study by  [67] focused on packet payload data, extracting payloads from headers and constructing block sequences analyzed with LSTM and CNN networks, achieving high F1-scores across CSIC 2010, CIC-IDS2017, and SCX 2012 datasets. Further,  [68] proposed a BiLSTM-DNN model including a preprocessing phase, tested on custom datasets with strong detection results. Similarly,  [69] presented a deep autoencoder framework with multiple decoders, dimensionality reduction, and preprocessing, tested successfully on UNSW-NB15 and NetML-2020 datasets. Lastly,  [70] compared three anomaly detection models, DAGMM-EIF, DA-EIF, and MemAE-EIF, achieving excellent performance with KDDCUP99, NSL-KDD, and CICIDS2017 datasets. 

Taken together, these studies illustrate that the use of raw binary data in the proposed work represents a novel 

```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 15 of 18</mark> **<mark>64</mark>** 

and distinctive approach to anomaly detection. The model directly processes binary network packets without feature selection, normalization, or other preprocessing steps that may introduce bias or information loss. While a conceptually similar idea was explored in  [14], the foundational approach of utilizing data “as is” was first introduced in our earlier works  [5] and  [15], which also investigated byteand spatial-level data representations. 

Unlike existing raw-byte methods that process only a fixed segment (e.g., the first 54 or 60 bytes) of a packet, the proposed approach analyzes the entire packet. This enables the capture of more complete dependencies and contextual information. Furthermore, by avoiding header-payload splitting, which typically requires a itional preprocessing, the method maintains computational efficiency while leveraging all available information. 

From a state-of-the-art perspective, the proposed approach offers several practical advantages and limitations. It can be deployed locally on a single machine or integrated as a filtering mechanism within a centralized Security Operations Center (SOC), where data from distributed sources is aggregated and only anomalous packets are transmitted to the central server. This design provides scalability and flexibility, features seldom described in existing literature. 

Traditional anomaly detection approaches often rely heavily on feature selection, which can increase time complexity in real-time environments. Moreover, as network behavior evolves, selected features may become obsolete, potentially degrading detection accuracy. While feature selection reduces model size and computational cost, the proposed featureless approach ensures adaptability and minimizes the risk of missing emerging attack patterns. 

However, high-speed network environments impose significant hardware demands. The proposed model depends on GPU acceleration, and multiple GPUs may be required to handle large-scale traffic. Additionally, sufficient RAM is essential to manage high-volume, real-time packet streams. Careful consideration of system architecture, hardware capacity, and scalability is therefore vital for practical deployment. 

The model’s current limitations include relatively high time complexity due to model size and sequential data reading. Future research should examine whether larger batch reading or parallel input strategies could reduce this bottleneck. Furthermore, as the model is specifically designed for binary data derived from PCAP files, it is not directly applicable to other structured or unstructured data types without adaptation. Extending its applicability beyond network traffic analysis remains an important direction for future work. 

Overall, the comparison demonstrates that while existing detection approaches rely heavily on preprocessing and feature selection, the proposed method simplifies the pipeline 

by directly utilizing raw binary data, enabling the model to autonomously learn meaningful patterns and improving detection performance in early-stage APT scenarios. 

## **9 Conclusion** 

The requirement for more advanced technologies to detect ongoing network attacks is growing constantly because the number of networked devices and the amount of remote work are growing simultaneously, hence increasing the potential attack surface. Attackers, such as APT groups, are taking advantage of this increased attack surface. Systems are being developed rapidly, and security is often considered a support function that slows development and is thus added later. Moreover, sophisticated attackers take advantage of zero-day vulnerabilities, using stealth and masquerading techniques to avoid detection. Signature-based intrusion detection systems do not perform well against these types of unknown attacks. 

This paper demonstrated the use of raw binary data as input to a DL model for detecting APT-related attack patterns. The final model achieved consistent detection performance across all evaluated datasets-CIC-IDS2017 (F1-score: 0.9674), CIC-IDS2018 (F1-score: 0.9911), and IoT-IDS (F1-score: 0.9957). The approach processes entire network packets in binary form, without feature extraction, normalization, or other preprocessing. Although this increases input dimensionality, neural networks handled it well. Additionally, a modified Swish activation function improved sensitivity, contributing to the model’s detection performance. 

The DL model presented here functions as a proof of concept, demonstrating high detection accuracy with unprocessed binary data. Further research is needed to assess its performance in real-world environments and to address the remaining performance limitations identified during testing. 

Additionally, a specific concern was observed in the research on APT detection: the lack of good datasets for benchmarking different models and research. Accurate and standardized datasets would also help in accurately comparing the performance of detection methods. Comparison of results from different studies in which different datasets have been used is not a valid method. 

When considering the wider usage for the proposed DL model and raw binary data, it can be stated that it can be utilized for other types of anomaly detection, where all data streams are based on binaries, zeros, and ones. In other technology domains where the packet length is smaller and it possibly has a standard length (for example, 64 bits), it is obvious that the required DL model sizes will decrease, and data padding is not required. Thus, the detection processing 

```
1 3
```

**<mark>64</mark>** <mark>Page 16 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

speed will be much faster. However, model maximum sizes can be limited by hardware capacity and therefore need to be shrunk down. 

The proposed Deep Learning model presented in Sect. 4, together with the detection results discussed in Sect. 8, provide a clear answer to the first research question, demonstrating that raw binary data can indeed be effectively utilized for network anomaly detection. Furthermore, the modifications introduced to the Swish activation function in Sect. 7 address the second research question, showing a measurable improvement in detection performance. This enhancement results from increasing the sensitivity of the activation function and reducing overlap in binary classification, particularly when variations in the data are subtle. 

This study provides empirical evidence that anomaly detection can be performed using raw binary network data without any preprocessing. To the best of our knowledge, this is the first work to use full network packets in binary form as direct input to a DL model. 

## **10 Future work** 

This paper focused on detecting anomalies in binary data. The next step in the research will focus on creating synthetic data from attacks with different generative DL models. Additionally, the results of training and testing will be verified and compared with the results of this paper to determine whether synthetic data improves detection accuracy. Raw binary tabular data will also be utilized in this phase. In addition, the detection method with multiple DL models that was presented in  [15] will be studied. 

Additional tests are required to determine optimal raw data presentations for detection. Reduced and newly parameterized models are needed to support hex and hex-pair presentations, that is, 3044 and 1522 input dimensions. It must be verified whether lower-dimensional presentations considerably reduce training and detection times, as well as memory usage, while maintaining the same detection accuracy. If this is shown to be a valid assumption, it will be important for hardware selection. In addition, we will conduct a study by comparing the performance of models trained on raw binary data with models using preprocessed features. Furthermore, research on different types of data and files is recommended, including structured and unstructured data formats. 

The following matters should be considered in future work. When comparing tests in which the presentation of hex data (0- F) changes to integers, the values vary between zero and 15 with a single hex value (4 bits), and from zero to 255 with a pair of hexes (8 bits). Thus, standardization is not needed. Another possibility would be to use the IP 

packet fields. However, this would cause another type of issue. For example, the data field _source address_ is 32 bits long; in other words, it is formed with four hex pairs, and the highest possible value is ‘FF FF FF FF.’ When converted to an integer, the value is 4 294 967 295, which would lead to "shading" as a numeric difference with the lowest value ‘00 00 00 00,’ or just zero in an integer representation. Thus, there are two possibilities: (i) use standardization or (ii) obtain data values based on a single hex or hex pair, and the numeric range stays low. To avoid data manipulation, the latter option will be used in future work. 

To summarize, the following directions are proposed for future research: 

- Detection improvement with synthetic data - exploring the use of generated data to enhance model accuracy and robustness. 

- Evaluation of raw data formats - comparing different data formats to identify which is most effective for anomaly detection, with attention to both processing time and hardware performance. 

- Impact of data pre-processing - studying whether preprocessing steps improve detection performance and assessing the additional time required by the pre-processing pipeline. 

**Acknowledgements** The authors would like to express their sincere thanks to the editors, anonymous reviewers, and faculty of information technology. The authors do not have any connection to the Canadian Institute for Cybersecurity, University of New Brunswick, but they would like to thank the creators of the CIC-IDS2017 and CICIDS2018 datasets for providing extremely well-organized and easyto-use datasets. In addition, we thank the IoT-IDS dataset creators for the Wireshark filters, which helped a great deal to separate attack and normal packets from the PCAP files. 

**Author contributions** Tero Bodström is the first author, he executed research, wrote and edited the paper as a corresponding author. Timo Hämäläinen guided reseach and reviewed paper. 

**Funding** Open Access funding provided by University of Jyväskylä (JYU). The authors did not receive support from any organization for the submitted work. The authors have no relevant financial or nonfinancial interests to disclose. 

**Data availability** CIC-IDS2017 dataset:  h t t p s : / / w w w . u n b . c a / c i c / d a t a s e t s / i d s - 2 0 1 7 . h t m l CIC-IDS2018 dataset:  h t t p s : / / w w w . u n b . c a / c i c / d a t a s e t s / i d s - 2 0 1 8 . h t m l IoT-IDS dataset:  h t t p : / / o c s l a b . h k s e c u r i t y . n e t / D a t a s e t s / i o t - n e t w o r k - i n t r u s i o n - d a t a s e t Tensorflow model configuration files to create presented DL model are available:  h t t p s : / / g i t h u b . c o m / t e r o b o d s t r o m / m o d e l c o n fi  g s 

### **Declarations** 

**Conflict of interest** The authors declare no Conflict of interest. 

**Compliance with ethical standards** This article did not involve human 

```
1 3
```

International Journal of Machine Learning and Cybernetics (2026) 17:64 

<mark>Page 17 of 18</mark> **<mark>64</mark>** 

participants or animals. 

**Open Access** This article is licensed under a Creative Commons Attribution 4.0 International License, which permits use, sharing, adaptation, distribution and reproduction in any medium or format, as long as you give appropriate credit to the original author(s) and the source, provide a link to the Creative Commons licence, and indicate if changes were made. The images or other third party material in this article are included in the article’s Creative Commons licence, unless indicated otherwise in a credit line to the material. If material is not included in the article’s Creative Commons licence and your intended use is not permitted by statutory regulation or exceeds the permitted use, you will need to obtain permission directly from the copyright holder. To view a copy of this licence, visit  h t t p : / / c r e a t i v e c o m m o n s . o r g / l i c e n s e s / b y / 4 . 0 /. 

## **References** 

1. Elsayed MS, Le-Khac N-A, Jurcut AD (2021) Dealing with covid-19 network traffic spikes [cybercrime and forensics]. IEEE Secur Privacy 19(1):90–94 

2. Muheidat F, Tawalbeh M, Quwaider M, Saldamli G, et al. (2020) Predicting and preventing cyber attacks during covid-19 time using data analysis and proposed secure iot layered model. In: 2020 Fourth international conference on multimedia computing, networking and applications (MCNA), pp 113–118 (2020). IEEE 

3. Al Shammari A, Maiti RR, Hammer B (2021) Organizational security policy and management during covid-19. In: SoutheastCon 2021. IEEE, pp 1–4 

4. FireEye: FireEye: Government top target for APT attacks. h t t p s : / / w w w . fi  r e e y e . c o m / c o n t e n t / d a m / fi  r e e y e - w w w / g l o b a l / e n / s o l u t i o n s / p d f s / r p t - g o v e r n m e n t - a t r - b a c k g r o u n d e r . p d f. [Online; accessed Sep. 26, 2021] (2014) 

5. Bodström T, Hämäläinen T (2018) A novel method for detecting apt attacks by using ooda loop and black swan theory. In: International conference on computational social networks, pp 498–509. Springer 

6. Ramachandran P, Zoph B, Le QV (2017) Searching for activation functions 

7. Taleb NN (2007) The black swan: the impact of the highly improbable. Random house 

8. Taleb NN (2020) Statistical consequences of fat tails: real world preasymptotics, epistemology, and applications, 1. arXiv preprint arXiv:2001.10488 

9. Esmaeilpour M, Chaalia N, Abusitta A, Devailly FX, Maazoun W, Cardinal P (2022) Bi-discriminator gan for tabular data synthesis. Pattern Recogn Lett 159:204–210 

10. Xu L, Skoularidou M, Cuesta-Infante A, Veeramachaneni K (2019) Modeling tabular data using conditional gan. Adv Neural Inf Process Syst, 32 

11. Rizzato M, Morizet N, Maréchal W, Geissler C (2022) Stress testing electrical grids: generative adversarial networks for load scenario generation. Energy AI 9:100177 

12. Maharana, K., Mondal, S., Nemade, B.: A review: Data pre-processing and data augmentation techniques. Global transitions proceedings, 3(1), 91–99. In: International Conference on Intelligent Engineering Approach (ICIEA-2022) (2022) 

13. Pudjihartono N, Fadason T, Kempa-Liehr AW, O’Sullivan JM (2022) A review of feature selection methods for machine learning-based disease risk prediction. Front Bioinform 2:927312 

14. Soltani M, Siavoshani MJ, Jahangir AH (2022) A content-based deep intrusion detection system. Int J Inf Secur 1–16:547–562 

15. Bodström T, Hämäläinen T (2019) A novel deep learning stack for apt detection. Appl Sci 9(6):1055 

16. Khalid A, Zainal A, Maarof MA, Ghaleb FA (2021) Advanced persistent threat detection: a survey. In: 2021 3rd International cyber resilience conference (CRC), pp 1–6. IEEE 

17. Khosravi M, Ladani BT (2020) Alerts correlation and causal analysis for apt based cyber attack detection. IEEE Access 8:162642–162656 

18. Xuan CD, Nguyen TT (2024) A novel approach for apt attack detection based on an advanced computing. Sci Rep 14(1):22223 

19. Do Xuan C, Cuong NH (2024) A novel approach for apt attack detection based on feature intelligent extraction and representation learning. PLoS ONE 19(6):0305618 

20. Che Mat NI, Jamil N, Yusoff Y, Mat Kiah ML (2024) A systematic literature review on advanced persistent threat behaviors and its detection strategy. J Cybersecur 10(1):023 

21. Yan H, Zhang Q, Xie J, Lu Z, Chen S, Guo D (2021) An intelligent game theory framework for detecting advanced persistent threats. In: 2021 IEEE 27th international conference on parallel and distributed systems (ICPADS), pp 450–457 (2021). IEEE 

22. Klyaus T, Gatchin YA (2020) Mathematical model for information security system effectiveness evaluation against advanced persistent threat attacks. In: 2020 Wave electronics and its application in information and telecommunication systems (WECONF), pp 1–5. IEEE 

23. Zou Q, Sun X, Liu P, Singhal A (2020) An approach for detection of advanced persistent threat attacks. Computer 53(12):92–96 

24. Neuschmied H, Winter M, Hofer-Schmitz K, Stojanovic B, Kleb U (2021) Two stage anomaly detection for network intrusion detection. In: ICISSP, pp 450–457 

25. Min B, Yoo J, Kim S, Shin D, Shin D (2021) Network anomaly detection using memory-augmented deep autoencoder. IEEE Access 9:104695–104706 

26. Kim J, Shin Y, Choi E (2019) An intrusion detection model based on a convolutional neural network. J Multimedia Inf Syst 6(4):165–172 

27. Do Xuan C, Dao MH (2021) A novel approach for apt attack detection based on combined deep learning model. Neural Comput Appl 33(20):13251–13264 

28. Joloudari JH, Haderbadi M, Mashmool A, GhasemiGol M, Band SS, Mosavi A (2020) Early detection of the advanced persistent threat attack using performance analysis of deep learning. IEEE Access 8:186125–186137 

29. Sharafaldin I, Lashkari AH, Ghorbani AA (2018) Toward generating a new intrusion detection dataset and intrusion traffic characterization. ICISSp 1:108–116 

30. Garcia S, Grill M, Stiborek J, Zunino A (2014) An empirical comparison of botnet detection methods. Comput Secur 45:100–123 

31. The NSL-KDD Data Set - web.archive.org (1999)  h t t p s : / / w e b . a r c h i v e . o r g / w e b / 2 0 1 5 0 2 0 5 0 7 0 2 1 6 / h t t p : / / n s l . c s . u n b . c a / N S L - K D D / . Accessed 11 June 2025 

32. Kabir MA, Luo X (2020) Unsupervised learning for network flow based anomaly detection in the era of deep learning. In: 2020 IEEE sixth international conference on big data computing service and applications (BigDataService), pp 165–168. IEEE 

33. Dawoud A, Sianaki OA, Shahristani S, Raun C (2020) Internet of things intrusion detection: a deep learning approach. In: 2020 IEEE symposium series on computational intelligence (SSCI), pp 1516–1522. IEEE 

34. Sun Y, Ochiai H, Esaki H (2021) Deep learning-based anomaly detection in lan from raw network traffic measurement. In: 2021 55th annual conference on information sciences and systems (CISS), pp 1–5. IEEE 

35. Chapaneri R, Shah S (2019) Detection of malicious network traffic using convolutional neural networks. In: 2019 10th international conference on computing, communication and networking technologies (ICCCNT), pp 1–6. IEEE 

```
1 3
```

**<mark>64</mark>** <mark>Page 18 of 18</mark> 

International Journal of Machine Learning and Cybernetics (2026) 17:64 

36. Liu S, Jiang H, Li S, Yang Y, Shen L. A feature compression technique for anomaly detection using convolutional neural networks. In: 2020 IEEE 14th international conference on anti-counterfeiting, security, and identification (ASID). IEEE, pp 39–42 

37. Wang W, Wang Z, Zhou Z, Deng H, Zhao W, Wang C, Guo Y (2021) Anomaly detection of industrial control systems based on transfer learning. Tsinghua Sci Technol 26(6):821–832 

38. Wang B, Su Y, Nie J (2020) C-gru: a parallel neural network for malicious traffic classification. In: 2020 International conference on artificial intelligence and education (ICAIE), pp 32–35. IEEE 

39. Nagisetty A, Gupta GP (2019) Framework for detection of malicious activities in iot networks using keras deep learning library. In: 2019 3rd international conference on computing methodologies and communication (ICCMC), pp 633–637. IEEE 

40. Hannan A, Gruhl C, Sick B (2021) Anomaly based resilient network intrusion detection using inferential autoencoders. In: 2021 IEEE international conference on cyber security and resilience (CSR), pp 1–7. IEEE 

41. Moustafa N, Slay J (2015) Unsw-nb15: a comprehensive data set for network intrusion detection systems (unsw-nb15 network data set). In: 2015 Military Communications and Information Systems Conference (MilCIS), pp 1–6. IEEE 

42. Shiravi A, Shiravi H, Tavallaee M, Ghorbani AA (2012) Toward developing a systematic approach to generate benchmark datasets for intrusion detection. Comput Secur 31(3):357–374 

43. Beaver JM, Borges-Hink RC, Buckner MA (2013) An evaluation of machine learning methods to detect malicious scada communications. In: 2013 12th international conference on machine learning and applications, vol 2, pp 54–59. IEEE 

44. KDD Cup 1999 Data—kdd.ics.uci.edu.  h t t p s : / / k d d . i c s . u c i . e d u / d a t a b a s e s / k d d c u p 9 9 / k d d c u p 9 9 . h t m l. [Accessed 11-06-2025] (1999) 

45. Magán-Carrión R, Urda D, Díaz-Cano I, Dorronsoro B (2020) Towards a reliable comparison and evaluation of network intrusion detection systems based on machine learning approaches. Appl Sci 10(5):1775 

46. Nevavuori P, Kokkonen T (2019) Requirements for training and evaluation dataset of network and host intrusion detection system. In: World conference on information systems and technologies, pp 534–546. Springer 

47. Verma A, Ranga V (2018) Statistical analysis of cidds-001 dataset for network intrusion detection systems using distance-based machine learning. Procedia Comput Sci 125:709–716 

48. Gamayunov D (2014) Falsifiability of network security research: the good, the bad, and the ugly. In: Proceedings of the 1st ACM SIGPLAN workshop on reproducible research methodologies and new publication models in computer engineering, pp 1–3 

49. Mhamdi L, McLernon D, El-moussa F, Zaidi SAR, Ghogho M, Tang T (2020) A deep learning approach combining autoencoder with one-class svm for ddos attack detection in sdns. In: 2020 IEEE eighth international conference on communications and networking (ComNet), pp 1–6. IEEE 

50. Le DC, Zincir-Heywood AN, Heywood MI (2016) Data analytics on network traffic flows for botnet behaviour detection. In: 2016 IEEE symposium series on computational intelligence (SSCI), pp 1–7. IEEE 

51. Htwe CS, Thant YM, Thwin MMS (2020) Botnets attack detection using machine learning approach for iot environment. In: Journal of Physics: Conference Series, vol. 1646, p 012101. IOP Publishing 

53. Ali O, Cotae P (2018) Towards dos/ddos attack detection using artificial neural networks. In: 2018 9th IEEE annual ubiquitous computing, electronics & mobile communication conference (UEMCON), pp 229–234. IEEE 

54. Yulianto A, Sukarno P, Suwastika NA (2019) Improving adaboost-based intrusion detection system (ids) performance on cic ids 2017 dataset. In: Journal of Physics: Conference Series, vol 1192, p 012018. IOP Publishing 

55. Brugger T (2007) Kdd cup’99 dataset (network intrusion) considered harmful. KDnuggets Newsl 7(18):15 

56. Chollet F (2021) Deep learning with Python. Simon and Schuster 57. Odikwa H, Ifeanyi-Reuben N, Thom-Manuel OM (2020) An improved approach for hidden nodes selection in artificial neural network. Diabetes 1:2 

58. Gupta TK, Raza K (2020) Optimizing deep feedforward neural network architecture: a tabu search based approach. Neural Process Lett 51(3):2855–2870 

59. Feng G, Huang G-B, Lin Q, Gay R (2009) Error minimized extreme learning machine with growth of hidden nodes and incremental learning. IEEE Trans Neural Netw 20(8):1352–1357 

60. Bubeck S, Sellke M (2021) A universal law of robustness via isoperimetry. Adv Neural Inf Process Syst 34:28811–28822 

61. Bodström T, Hämäläinen T (2018) State of the art literature review on network anomaly detection with deep learning. Springer, pp 64–76 

62. Myneni S, Chowdhary A, Sabur A, Sengupta S, Agrawal G, Huang D, Kang M (2020) Dapt 2020-constructing a benchmark dataset for advanced persistent threats. In: International workshop on deployable machine learning for security defense, pp 138–163. Springer 

63. Kang H, Ahn DH, Lee GM, Yoo JD, Park KH, Kim HK (2019) IoT network intrusion dataset (2019).  h t t p : / / o c s l a b . h k s e c u r i t y . n e t / D a t a s e t s / i o t - n e t w o r k - i n t r u s i o n - d a t a s e t 

64. Knuth Donald E (1998) The art of computer programming vol 3: sorting and searching. Addison-Wesley Professional 

65. Hooshmand MK, Hosahalli D (2022) Network anomaly detection using deep learning techniques. CAAI Trans Intell Technol (2022) 

66. Kao M-T, Sung D-Y, Kao S-J, Chang F-M (2022) A novel twostage deep learning structure for network flow anomaly detection. Electronics 11(10):1531 

67. Liu J, Song X, Zhou Y, Peng X, Zhang Y, Liu P, Wu D, Zhu C (2022) Deep anomaly detection in packet payload. Neurocomputing 485:205–218 

68. Fu Z (2022) Computer network intrusion anomaly detection with recurrent neural network. Mob Inf Syst 2022:6576023 

69. Dutta V, Pawlicki M, Kozik R, Choraś M (2022) Unsupervised network traffic anomaly detection with deep autoencoders. Logic J IGPL 

70. Carrera F, Dentamaro V, Galantucci S, Iannacone A, Impedovo D, Pirlo G (2022) Combining unsupervised approaches for near real-time network traffic anomaly detection. Appl Sci 12(3):1759 

**Publisher's Note** Springer Nature remains neutral with regard to jurisdictional claims in published maps and institutional affiliations. 

52. Siddique K, Akhtar Z, Khan FA, Kim Y (2019) Kdd cup 99 data sets: a perspective on the role of data sets in network intrusion detection research. Computer 52(2):41–51 

```
1 3
```

