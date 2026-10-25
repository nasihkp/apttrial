Computers & Security 137 (2024) 103631 



Contents lists available at ScienceDirect 

# Computers & Security 

journal homepage: www.elsevier.com/locate/cose 



## Analysis of statistical properties of variables in log data for advanced anomaly detection in cyber security 



### Markus Wurzenberger<sup>∗</sup> , Georg Höld, Max Landauer, Florian Skopik 

_AIT - Austrian Institute of Technology, Giefinggasse 4, Vienna, 1210, Austria_ 

#### A R T I C L E I N F O 

#### A B S T R A C T 

_Keywords:_ Log analysis Anomaly detection Intrusion detection 

Log lines consist of static parts that characterize their structure and enable assignment of event types, and event parameters, i.e., variable parts that provide specific information on system processes, such as host and user names, IP addresses, and file operations. Many detection approaches only focus on anomalous event type occurrences, i.e., they parse log lines to derive unique event identifiers and subsequently detect anomalies in event sequences or event count vectors, but neglect variable parts of log lines entirely during analysis. This is especially problematic, when monitoring strongly structured log data that contains only a small number of distinct event types, for example, logs that consist of strict key value pairs, i.e., parameters that occur consistently throughout all log lines, such as it is case in access and audit logs. Thus, novel approaches are required, which focus on analysis of log lines’ variable parts. In this paper, we propose the variable type detector (VTD), a novel unsupervised approach that autonomously analyzes variable log line parts to enable anomaly detection. It assigns data types to each variable, which also include probability distributions for discrete and continuous variables. The VTD raises an alarm if a variable’s data type changes. Furthermore, it implements a robust indicator function that reduces false positives by tracking the data type history of each variable and reports only significant data type changes. Additionally, an event indicator enables event-based anomaly detection by taking into account the data types of all variables of a single event type. The evaluation conducted on open-source log data, demonstrates the effectiveness of the VTD compared to conventional anomaly detection approaches, such as time series analysis and PCA. Consequently, the VTD acts as a solution that extends the intrusion detection capabilities of security information and event management (SIEM) and integrates with modern concepts of endpoint detection and response (EDR) and extended detection and responses (XDR), while simultaneously serving as an asset for process monitoring that supports user and entity behavior analytics (UEBA). 

##### **1. Introduction** 

Today, most intrusion detection systems (IDS) that monitor log data apply signature-based approaches. However, signature-based approaches enable only detection of known attacks and thus are not capable of disclosing smart adversaries that utilize advanced and sophisticated attack techniques, including zero-day exploits that cannot be exposed by signatures. It is a cumbersome task to maintain signatures and keep them up-to-date. In addition, they mostly focus on single events or artifacts and do not analyze complex system processes that reflect themselves in characteristic event sequences that might be violated by attacks (Liao et al., 2013). 

Sophisticated anomaly-based (Chandola et al., 2009; Nassif et al., 2021; He et al., 2016b) detection algorithms that enable detection of unknown attacks are thus a promising extension of conventional IDS and other security measures, such as antivirus scanners. However, state of the art anomaly detection algorithms that analyze log data either follow rule-based approaches that autonomously learn rules such as correlations between log events (Friedberg et al., 2015) or implement event-based analysis methods that analyze the occurrence of eventtypes defined by static log line parts rather than analyzing variable log parts. When using log-based anomaly detection, the first step is usually parsing a log line (Wurzenberger et al., 2019). The parser assigns an event type to each processed log line, which could, for example, be 

* Corresponding author. 

_E-mail addresses:_ markus.wurzenberger@ait.ac.at (M. Wurzenberger), georg.hoeld@ait.ac.at (G. Höld), max.landauer@ait.ac.at (M. Landauer), florian.skopik@ait.ac.at (F. Skopik). 

https://doi.org/10.1016/j.cose.2023.103631 Received 25 May 2023; Received in revised form 25 October 2023; Accepted 28 November 2023 Available online 4 December 2023 0167-4048/© 2023 The Author(s). Published by Elsevier Ltd. This is an open access article under the CC BY license (http://creativecommons.org/licenses/by/4.0/). 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

based on a specific event parameter (e.g., syscall number), static parts (i.e., log line parts that occur in all lines that belong to the same event type) or a regular expression that matches the log line. Many parsers are capable of recognizing static and variable parts in log lines (Zhu et al., 2019). For this purpose, the parser dissects log lines into tokens, i.e., substrings, split at predefined separators such as white spaces, and uses the static parts that form the structure of log lines to define event types. When applying rule-based detection, values such as IP addresses and usernames can be combined to reveal unknown combinations, or single variables can be analyzed to expose anomalous values, such as IP addresses that have not occurred during the training phase (Landauer et al., 2023a). Furthermore, rule-based detection is capable of correlating events over time and thus monitoring complex processes that are represented by certain sequences of log events (Friedberg et al., 2015). Many well-established anomaly detection approaches operate purely on the level of event types and neglect content of variables. Many of these detection approaches solely focus on anomalous event type occurrences, i.e., after event types have been derived through parsing or unique identifiers such as Syscalls or IP addresses, they subsequently detect anomalies in event sequences or event count vectors, but neglect variable parts of log lines entirely during analysis. Other approaches such as principal component analysis (PCA), support vector machines (SVM), invariants mining and decision trees use an event count matrix to detect anomalies within time windows (He et al., 2016b). Another event-based anomaly detection technique that however does not rely on parsing is log line clustering, which can be applied to reveal outliers (Wurzenberger et al., 2017) and carry out time series analysis (Landauer et al., 2020, 2018b). While all these approaches have been evaluated in detail and have shown excellent anomaly detection results, there is still a missing piece: The majority of state of the art approaches do not analyze variable parts of log lines in detail and primarily focus on event types. More specifically, currently there are no other approaches that attempt to assign statistical properties to variable tokens and track those over time. However, this is especially important to automate log data analysis that, for example, encompasses a rather strict structure, such as access logs and system monitoring logs that mainly include key-valuepairs, i.e., parameters that occur consistently throughout all log lines, and thus a rather low number of different event types. In this kind of log data almost all lines have the same structure, i.e. the same static parts that define the event type. For that reason, mentioned event-based algorithms provide only limited results for anomaly detection on such uniform logs. Note that it is generally possible to derive event identifiers from categorical parameters even for uniformly structured log lines and apply event-based anomaly detection methods as if different event types are available. However, our approach fundamentally differs from this idea as we assign statistical properties to all variable parts of log lines (categorical or not) and leverage these properties for anomaly detection. However, due to the increasing complexity of today’s cyber infrastructures caused by the emergence and combination of modern technology concepts such as the Internet of Things (IoT), Cyber Physical Systems (CPS), as well as cloud, fog, and edge computing merged with legacy components to operate contemporary use cases such as Smart Cities, Smart Mobility, and Industry 4.0, log data gets more complex and diverse as well (Zhao et al., 2022). While established security information and event management (SIEM) and endpoint detection response (EDR) lean on intrusion detection approaches that are able to monitor known event types and their known variables, such as user names in authentication events, IP addresses in access events, or file paths in file open events, they are not able to do so for unknown log formats and their event syntax (Chung et al., 2023). This applies in particular to application logs ranging from different access and mail log formats to vast amounts of custom application logs. Hence, in this paper we propose a novel unsupervised (Goldstein and Uchida, 2016) approach that autonomously analyzes variable log line parts to enable anomaly detection. The main contributions of this paper are: 

1. A novel approach that assigns a type based on statistical properties to each variable token of a log line and raises an alert if the type changes, 

2. a robust indicator function that reduces false positives during anomaly detection, by considering the history of data types assigned to each token, 

3. an event-based detection mechanism that takes into account the data types of all tokens of an event type, which enables event-based detection for log data that includes only a small number of different event types, because of uniformly structured log lines. 

The remainder structures as follows: Section 2 summarizes related work. Section 3 introduces the concept and process flow of the variable type detector (VTD), followed by Sect. 4 that describes the algorithmic model of the VTD in details. Section 5 evaluates the VTD, discusses selection of input parameters, and compares it to other approaches. Finally, Sect. 6 concludes the paper. 

##### **2. Related work** 

This section summarizes background and related work. One of the VTD’s main aspects is identifying the statistical distribution of the values of log lines’ variable tokens. Statistics applies goodness-of-fit (gof) tests to determine whether it is likely that a variable originates from a specific distribution or not. Examples are a Kolmogorov-Smirnov test to test the likelihood of a test sample to originate from a standard normal distribution or a _𝑍𝐴_ Zhang test to test the likelihood of a test sample to originate from a standard uniform distribution. There exist plenty of works comparing and evaluating gof tests, such as (D’Agostino, 2017), (Razali et al., 2011), (Zhang, 2002). Additionally, there exist gof tests that estimate parameters of distributions. Examples are the Kolmogorov-Smirnov (KS) test that tests the likelihood of a test sample to originate from a normal distribution with estimated mean and variance (Knuth, 2014), and the _𝑍𝐴_ Zhang test that tests the likelihood of a test sample to originate from a uniform distribution with estimated extremes (Zhang, 2002). Just a few works have evaluated gof tests with estimated parameters in detail. Thereby, they omit comparison of different test statistics or estimation methods (Evans et al., 2017), (Boyerinas, 2016). 

Many intrusion detection approaches rely on the analysis of the occurrences of event types in log data. To assign event types to log lines and to prepare them for further analysis, log-based anomaly detection employs mainly clustering and parsing approaches that define event types by recognizing patterns of static tokens occurring in log lines and prepare the log lines for further analysis (Landauer et al., 2020). There exist several algorithms to automatically generate parsers for event type classification (He et al., 2016a). While these approaches are capable of recognizing static and variable parts in log lines, they do not provide any further analysis of variables occurring in log data. However, templates derived from parser generators can be applied for intrusion detection in form of allow-lists. While conventional signaturebased IDS rely on block-lists and thus can only detect previously known, i.e., observed, attacks, allow-list approaches are also capable of revealing simple unkonw attacks (Liao et al., 2013), (Chauhan et al., 2013). 

Conventional intrusion detection algorithms that analyze the occurrences of event types in log data are, for example, (i) logistic regression, which uses a statistical model and computes for classification the probability of a state (normal, anomalous) using a logistic function (Besharati et al., 2019), (ii) decision trees that predict states using a tree structure diagram (Moon et al., 2017), and (iii) support vector machines that construct a hyperplane to separate classes (Liang et al., 2007). Unsupervised intrusion detection methods include (i) clustering (Landauer et al., 2020), which enables outlier detection (Wurzenberger et al., 2017) and time series analysis (TSA) (Landauer et al., 2018b), (ii) principal component analysis (PCA), which conducts dimension reduction to reveal anomalies in high-dimensional data (Xu et al., 2009), and (iii) 

2 

_Computers & Security 137 (2024) 103631_ 

###### _M. Wurzenberger, G. Höld, M. Landauer et al._ 

invariants mining, which analyzes linear relationships between events (Lou et al., 2010). Many modern anomaly detection approaches, such as Deeplog (Du et al., 2017), and extensions of Deeplog (Chen et al., 2022), make use of artificial intelligence and artificial neural networks to learn and analyze workflows in log data, but focus primarily on event types and event sequences (Chen et al., 2021), (Fu et al., 2009), (He et al., 2016b). Moreover, there are still many obstacles in the application of such algorithms, ranging from feature extraction to training models for complex system log data (Himler et al., 2023). However, as Sect. 5.5 demonstrates using PCA and TSA as example, intrusion detection methods that analyze occurrences of event types do not perform well enough in detecting stealthy attacks carried out by smart adversaries such as advanced persistent threats (APT) (Alshamrani et al., 2019) that trigger normal event occurrences, and can only be revealed by analyzing variable log parts. 

Anomaly detection approaches that spotlight analyzing variable parts of logs, assess single variables separately, or focus on specific pre-defined variables (Kondo et al., 2017). Other approaches rely on monitoring correlations between variables of log data (Miah et al., 2020) (Allagi and Rachh, 2019) (Oeda and Hashimoto, 2017). However, these algorithms relate more to data science, than anomaly detection, because variables have to be selected manually, which in turn requires data knowledge, and thus could merely implement supervised intrusion detection. Currently, there exists no general approach to automatically classify and analyze all variables of log data for anomaly detection. However, the variable correlation detector (VCD) approach presented in Landauer et al. (2021a) employs iterative selection of categorical variables to automatically assess correlations specifically between categorical, i.e., discrete, variables occurring in log data, which excludes other types of variables. 

The application areas of the VTD are manifold. Many security teams and security operation centers (SOC) use security information and event management (SIEM) platforms to collect all security related data and information of monitored infrastructures, including events provided by intrusion detection systems and anomaly detection algorithms, such as the VTD (Bhatt et al., 2014). As part of the AMiner, an anomaly-based detection log analysis agent (Landauer et al., 2023b), the VTD is part of an endpoint detection and response (EDR) solution. The evaluation in Sect. 5 applies the VTD to logs of various network components, which demonstrates its suitability for extended detection and responses (XDR) that incorporates logs across an entire network for intrusion detection purposes (Arfeen et al., 2021). Since the VTD implements anomalybased intrusion detection, it is also suitable to be applied for user and entity behavior analytics (UEBA) by building a model of normal system behavior and tracking its changes (Shashanka et al., 2016). Finally, a promising area of application is the analysis of log data from physical access control systems, such as key card systems that log the usage of cards on various access terminals (Skopik et al., 2022). 

##### **3. Variable type detector concept** 

The following section introduces the concept of the Variable Type Detector (VTD) approach (see Fig. 1). The VTD analyzes log lines that have been converted into tokens and have event types assigned to them. Accordingly, the first step sanitizes log lines (SD), i.e., dissects them into tokens and assigns event types. Any parser, such as Wurzenberger et al. (2019), is suitable for this preprocessing step. 

Afterwards, the VTD analyzes each token of the currently processed log line. First, it initializes the tokens’ data type (IT), which can be chronological, static, ascending, descending, continuous, unique, discrete, or other. Before the VTD is able to determine the data type of a token, the event type of the log line has to be observed a certain number of times. The VTD defines event types by the static parts that occur in a log line and thus characterize the structure of the lines. Because of the procedure the VTD uses to assign data types to tokens, only pre-defined sample sizes, i.e., numbers of log lines that have to be observed before 



**Fig. 1.** Process flow of the VTD. Boxes with dashed lines characterize optional steps. 

the VTD is able to determine the data types of tokens, are allowed. By default these are 50, 100, 150, and 200. For more details see Sec. 4.2. Based on the observed values of each token, the VTD tests if a token possesses one of the mentioned data types. If the assigned type is continuous or discrete, the VTD also determines the values’ distribution. If none of the types fits a token, the VTD assigns the type other. 

Once the VTD assigned a data type to a token, it monitors in periodic update steps (UT), if the type changed over time. The VTD uses statistical tests to estimate if a token’s data type change is significant or not. This means the data type change has to be observed in a sufficient number of periods. If the VTD detects a significant data type change, it raises an alarm, because it indicates anomalous system behavior. Afterwards, it re-initializes the data type of the token. 

Besides detecting anomalies by recognizing data type changes of tokens, the VTD also computes token and event indicators (CI) to detect anomalies. These indicators are more robust against false positives, because they take into account the history of a token’s data types. The event indicator builds upon the token indicator and considers all tokens of an event type to detect changes in system behavior. Section 4.4 discusses the indicators in details. 

Finally, the VTD reports anomalies (RA). Additionally, there are two optional steps. The first, selects tokens (ST), removes tokens with data type static and tokens with an unstable data type, i.e., frequently changing data type, from the detection process. This reduces false positives and also increases performance of the VTD, because fewer tokens are part of the detection process. Furthermore, the VTD implements the feature of computing indicator weights (CW). The indicator weights reduce the influence of unstable token indicators on the event indicator. Thus, the indicator weights increase robustness of the event indicator. 

##### **4. Variable type detector algorithm** 

The following section describes the procedure of the VTD<sup>1</sup> approach in details. 

##### _4.1. Sanitize log data_ 

The first step of the VTD approach dissects each log line _𝑙_ into a list of tokens  = [ _𝑡_ 1 _, 𝑡_ 2 _,_ … _, 𝑡𝑛_ ], where _𝑛_ ∈ N is the number of tokens log line _𝑙_ consists of. Furthermore, the sanitization process assigns an event type _𝑒_ ∈  to each log line _𝑙_ , where  is the set of all event types 

> 1 https://github.com/ait-aecid/logdata-anomaly-miner/blob/master/source/ root/usr/lib/logdata-anomaly-miner/aminer/analysis/VariableTypeDetector. py. 

3 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 



**Fig. 2.** VTD example. 

occurring in the monitored log data. This can be achieved, for example, by any classifier, such as the tree-like parser the AMiner<sup>2</sup> (Landauer et al., 2023a) applies. The AMiner uses AECID-PG<sup>3</sup> (Wurzenberger et al., 2019) to generate a parser that defines also the event types _𝑒_ ∈  that occur in the monitored log data. In this case, event types _𝑒_ are defined by the set of paths of the parser that match a log line _𝑙_ . Furthermore, the parser dissects log lines _𝑙_ into tokens _𝑡_ ∈  at locations defined by the parser. Additionally, the parser provides the information, which tokens _𝑡_ are static and which are variable. An alternative would be to use clustering, e.g., incremental clustering (Wurzenberger et al., 2017) that enables online analysis of log lines, to assign an event type _𝑒_ to each log line _𝑙_ . A template generator, such as AECID-TG<sup>4</sup> (Wurzenberger et al., 2020) can be applied to generate the list of tokens  for each cluster, i.e., event type _𝑒_ . Fig. 2 shows example log data of a specific event type _𝑒_ . Below the log lines, the figure depicts a template that defines the event type _𝑒_ . The template consists of static tokens cpu_temp= and fan_freq=, as well as three variable tokens represented by gray boxes and a paragraph § symbol. 

##### _4.2. Initialize types_ 

Next, the VTD initializes the types of all variable tokens _𝑡_ ∈  . Variable tokens _𝑡_ can adopt the following types: (1) chronological, (2) static, (3) ascending or descending, (4) continuous, (5) range, (6) unique, (7) discrete, and (8) other. 

To identify each token _𝑡_ ∈  correctly and not mix them up, the VTD carries out this step event-wise for all event types _𝑒_ ∈  and for all tokens _𝑡𝑒,_ 1 _, 𝑡𝑒,_ 2 _,_ … _, 𝑡𝑒,𝑛𝑒_ , where _𝑛𝑒_ ∈ N is the number of variable tokens occurring in event type _𝑒_ . For example, the event type _𝑒_ depicted in Fig. 2 possesses the tokens _𝑡𝑒,_ 1, _𝑡𝑒,_ 2 and _𝑡𝑒,_ 3. Furthermore, the VTD applies statistical tests, such as the Kolmogorov Smirnov (KS) test (Knuth, 2014) and the multinomial test (Read and Cressie, 2012), to assign a type to a token _𝑡_ . When the VTD assigns the type continuous or discrete, it also attempts to assign a specific probability distribution to the token. Thus, the algorithm first has to observe a certain number of log lines _𝑙𝑒,𝑖_ ∈ , with  the set of monitored log lines, of an event type _𝑒_ to be able to assign and initialize types to tokens _𝑡𝑒,𝑖_ , where _𝑖_ ∈[1 _, 𝑛𝑒_ ] and _𝑛𝑒_ is the number of variable tokens occurring in event type _𝑒_ . Empirical investigation (see Sect. 5.4) showed that a number of 150 observations yields sufficient results. Hence, observing an event type _𝑒_ 150 times triggers the initialization of the types of its tokens _𝑡𝑒,𝑖_ . However, especially the frequency by which an event type _𝑒_ occurs, strongly influences if the number of observations required to trigger the initialization of types is a good choice or not. A larger number of observed occurrences leads to a more accurate type assignment, especially when a probability distribution has to be estimated as it is the case for the types continuous and discrete. For a rarely occurring event type this implicates that it takes 

a longer time span until the VTD triggers its initialization. Otherwise, a low number of required observations means that there is a higher potential for assigning a wrong type to the token. For example, ascending or descending might be wrongly selected instead of continuous when some consecutive values happen to be ordered by chance. 

For the purpose of assigning a type to a token _𝑡_ of any event, the VTD applies several tests to its values _𝑣𝑡,_ 1 _, 𝑣𝑡,_ 2 _,_ … _𝑣𝑡,𝑛𝑡_ , where _𝑣𝑡,_ 1 is the first observed value of _𝑡_ and _𝑣𝑡,𝑛𝑡_ the last one, and _𝑛𝑡_ ∈ N the number of observed values of token _𝑡_ . The first test examines if a token _𝑡_ possesses the type _chronological_ , i.e., if the values _𝑣𝑡,𝑖_ , with _𝑖_ ∈[1 _, 𝑛𝑡_ ], of token _𝑡_ have the structure of a timestamp. Considering the first token _𝑡𝑒,_ 1 of event type _𝑒_ in Fig. 2, this means that the VTD checks if in all 150 observations token _𝑡𝑒,_ 1 took a value of the structure b d HH:MM:SS, where b represents the month name, d the day, HH the hours, MM the minutes and SS the seconds of the timestamp. In this case, the test evaluates true, because _𝑡𝑒,_ 1 represents the timestamp of the event type’s log lines. If one test of the VTD’s test sequence evaluates true, it assigns the currently tested type to the token and skips the remaining tests. Thus, the order of the tests is essential and we chose it as defined in the beginning of this section, to avoid that a wrong type is unintentionally assigned to a token, e.g., timestamps would also fall into the class of discrete tokens. 

The second test checks if a token _𝑡_ has the type _static_ . A variable token still can have the data type static, since, for example, a variable that is a placeholder for an IP address, could have a static value, because only a single IP address appears in the log data at hand. This test evaluates true, if all values _𝑣𝑡,𝑖_ of a token _𝑡_ are identical. Before testing if token _𝑡_ maintains an ascending, descending or continuous type, the VTD assesses if all values _𝑣𝑡,𝑖_ of a token _𝑡_ are numerical, because these types require numeric values. If the values _𝑣𝑡,𝑖_ of token _𝑡_ are numeric the VTD proceeds with testing if the values _𝑣𝑡,𝑖_ are ascending or descending and otherwise directly continues with testing for the discrete type. Assuming the values _𝑣𝑡,𝑖_ are numeric, the VTD checks if the values _𝑣𝑡,𝑖_ of token _𝑡_ are _ascending_ or _descending_ by verifying, if the values _𝑣𝑡,𝑖_ of token _𝑡_ satisfy the condition _𝑣𝑡,_ 1 ≤ _𝑣𝑡,_ 2 ≤ … ≤ _𝑣𝑡,𝑛𝑡_ for ascending or _𝑣𝑡,_ 1 ≥ _𝑣𝑡,_ 2 ≥ … ≥ _𝑣𝑡,𝑛𝑡_ for descending. 

The following tests for the continuous, range and discrete type are the key elements of the VTD. Testing for these two types requires statistical tests, which have a significantly higher complexity than the non-statistical tests for the other types. The implementations of these tests have to ensure high performance, while simultaneously requiring a limited amount of resources, to enable host-based online anomaly detection. 

First, the VTD applies the test for the _continuous_ data type. Thus, the values _𝑣𝑡,𝑖_ of a token _𝑡_ have to satisfy the following conditions: (i) By default all values _𝑣𝑡,𝑖_ have to be integers. Optionally the VTD considers also floats. (ii) The values _𝑣𝑡,𝑖_ must have a certain uniqueness. By default the cardinality # _𝑡_ of the set of all different values  _𝑡_ = { _𝑣𝑡,𝑖_ } token _𝑡_ takes, has to be at most 20% of the number of observations _𝑛_ , i.e., the values _𝑣𝑡,𝑖_ of token _𝑡_ must satisfy the condition # _𝑡_ ≤ 0 _._ 2 ⋅ _𝑛_ . This means, on average each unique value occurs at least 5 times. This ensures values are neither continuous nor unique. Otherwise, the VTD skips the test and proceeds with the test for the unique data type. 

Next, since tests in statistics, such as the KS test require independent and identically distributed observations of a random variable, the VTD computes the Durbing-Watson (DW) statistic (Turner, 2020) to decide whether values _𝑣𝑡,𝑖_ are independent or not. The DW test (see Definition 1) checks, if there is a presence of auto-correlation at lag 1 in a given sample. Therefore, the values _𝑣𝑡,𝑖_ are considered dependent, if _𝑑< 𝑑𝐿,𝛼_ (positive correlation) or (4 − _𝑑_ ) _< 𝑑𝐿,𝛼_ (negative correlation) respectively, and independent otherwise, with the critical value _𝑑𝐿,𝛼_ w.r.t. the significance level _𝛼_ . 

> 2 https://github.com/ait-aecid/logdata-anomaly-miner. 

> 3 https://github.com/ait-aecid/aecid-parsergenerator. 

> 4 https://github.com/ait-aecid/aecid-template-generator. 

**Definition 1** _(Durbin-Watson Statistic)._ Let { _𝑣𝑖_ ∶1 ≤ _𝑖_ ≤ _𝑛_ } be a test sample. The Durbing-Watson statistic is given by: 

4 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

**Table 1** 

Pre-specified distributions and parameters. 

|distribution|parameters|
|---|---|
|normal|_𝜇_,_𝜎_<sup>2</sup>|
|uniform|max,min|
|beta_𝛼_,_𝛽_: (0.5,0.5), (1,5), (5,1)|max,min|
|beta_𝛼_,_𝛽_: (2,5), (5,2)|_𝜇_,min/max|





If the values _𝑣𝑡,𝑖_ of token _𝑡_ satisfy the two conditions for the continuous data type and are independent,<sup>5</sup> the VTD tests if the sample has one of the distributions listed in Table 1. It is not possible to cover all kinds of distributions, except with methods, such as the empirical distribution for continuous distributions. The distributions the VTD uses by default, are the most common ones, that often appear in log data for sensor measurements such as temperature or manufacture variances. Therefore, the VTD first estimates the parameters mean _𝜇_ (see Definition 2), variance _𝜎_<sup>2</sup> (see Definition 3), min and max (Park, 2018). The beta distribution is defined on the interval [0 _,_ 1] and the parameters _𝛼_ and _𝛽_ control its shape. However, estimating _𝛼_ and _𝛽_ yields inaccurate values. Therefore, we rather focus on specifically selected beta distributions, than on the family of beta distributions. We chose the five parameter combinations of ( _𝛼, 𝛽_ ) Table 1 mentions, which lead to the shapes Fig. 3 depicts. Additionally, Table 1 specifies the parameters on which basis location and scale of the different distributions are estimated. Together with the normal and the uniform distributions, the VTD covers the most common shapes that distributions of measurements take. 

##### **Definition 2** _(sample mean)._ 



where _𝑛_ is the sample size and { _𝑋𝑖_ ∶ _𝑖_ ∈ N≤ _𝑛_ } is the sample. 

**Definition 3** _(sample variance)._ 



where _𝑛_ is the sample size, { _𝑋𝑖_ ∶ _𝑖_ ∈ N≤ _𝑛_ } the sample and _𝑋_ the sample mean. 

Next, the VTD tests the observed values against the distributions specified by the estimated parameters. Therefore, it applies the KS test from Theorem 4. The KS test tests for all specified distributions the null hypothesis _𝐻_ 0 _the sample 𝑣𝑡,𝑖 is distributed with the tested distribution_ against _𝐻_ 1 _the sample 𝑣𝑡,𝑖 is not distributed with the tested distribution_ . The KS test (see Theorem 4) provides a test statistic _𝐶_ that defines the _𝑝_ - values. The _𝑝_ -value assesses the probability that under the assumption that the null hypothesis is correct, we would obtain test results at least as extreme as the test result of observed values. 

**Theorem 4** _(Kolmogorov Smirnov Test). Let 𝑥_ 1 _, 𝑥_ 2 _,_ … _, 𝑥𝑛 be the observed values in increasing order and 𝐹 a given continuous distribution function. Then the Kolmogorov Smirnov statistic is_ 



> 5 Note, in case the values _𝑣𝑡,𝑖_ of token _𝑡_ satisfy both conditions and are not independent, the VTD assigns the range type. 





<!-- Start of picture text -->
Fig. 3.  Beta distributions.<br><!-- End of picture text -->

The KS test is a goodness-of-fit test. This means we test a sample, in our case _𝑣𝑡,𝑖_ , against a single completely specified distribution, e.g., the standard normal distribution _𝑁_ (0 _,_ 1). The KS test rejects the nullhypothesis _𝐻_ 0 that the sample has the distribution, if the test statistic is greater than a critical value _𝑐𝛼_ , where _𝛼_ ∈[0 _,_ 1] is the significance of the test. Equation (5) defines the critical value _𝑐𝛼_ , which specifies that the KS test rejects the null hypothesis _𝐻_ 0 in _𝛼_ many cases if test samples have been generated under the null hypothesis _𝐻_ 0. 



However, we have already estimated the distribution’s parameters using the same sample so that it matches the sample as good as possible. Hence, the _𝑝_ -value is biased. Thus, we have to compute the _𝑝_ -value differently, using another procedure than simply applying the KS test. However, the test statistic _𝐶_ of the KS test remains the same, but we adapt the critical values _𝑐𝛼_ . Thus, we apply the Monte Carlo Method (Mackay, 1998) to compute the critical values _𝑐𝛼_ for the sample sizes the VTD should be able to use, for example, sample sizes _𝑛_ ∈{50 _,_ 100 _,_ 150 _,_ 200} and significance _𝛼_ ∈{0 _._ 01 _,_ 0 _._ 05 _,_ 0 _._ 1} for all distributions listed in Table 1. Next, we choose all distributions that have a test statistic _𝐶_ lower than the critical value _𝑐𝛼_ . Then, we compute the approximated _𝑝_ -value _𝑞_ as in Eq. (6). We need to scale the result, so that the minimum is equal to the significance _𝛼_ . Afterwards, the VTD assigns the best distribution to token _𝑡_ , i.e., the one yielding the highest _𝑞_ -value, as type. If more than one distribution fit the sample, the VTD remembers all these distributions and will use them later during the update step (UT) (cf. Sec. 4.3). If none of the distributions match the sample, the VTD optionally assigns the empirical distribution specified by the sample of the token or proceeds with the test procedure. Exemplary, the second token _𝑡_ 2 of the event type _𝑒_ depicted in Fig. 2 is a float that gets assigned the type continuous with distribution _𝑁_ (58 _._ 528 _,_ 67 _._ 423). 



In case, the _𝑣𝑡,𝑖_ of token _𝑡_ are continuous but not independent the VTD assigns the type _range_ . Since the values _𝑣𝑡,𝑖_ are only a sample, i.e., there could be some statistical deviations that lead to false positives during anomaly detection, the VTD computes the interval boundaries for token _𝑡_ as shown in Eq. (7), where _𝑐_ ∈[0 _,_ ∞) is a constant that stretches or narrows the interval. _𝑐_ should be chosen close to zero for large initialization sizes, and _𝑐_ should be chosen larger the smaller the initialization size. 





upper limit = max( _𝑣𝑡,𝑖_ ) + _𝑐_ (max( _𝑣𝑡,𝑖_ ) −min( _𝑣𝑡,𝑖_ )) 

5 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

The sixth test checks if the values _𝑣𝑡,𝑖_ of token _𝑡_ are all _unique_ , i.e., if # = _𝑛_ , where _𝑛_ is the number of observed values. Finally, the VTD executes the test for the _discrete_ data type. Before, the VTD applies the test it verifies if the number of different values is lower or equal to 20% of the sample size, i.e., if the sample _𝑣𝑡,𝑖_ of values of token _𝑡_ satisfies the condition #≤ 0 _._ 2 ⋅ _𝑛_ . If yes, it assigns the token the type discrete and the relative frequencies of the unique values. Considering the third token _𝑡_ 3 of the event type _𝑒_ depicted in Fig. 2, we spot two different values: increasing and decreasing. If we additionally assume that the sample size is 100, the sample satisfies the condition for the test for the discrete data type. Thus, the VTD assigns token _𝑡_ 3 the type discrete and the list of relative frequencies [decreasing: 60%, increasing: 40%]. 

Finally, if during the testing procedure none of the types matches token _𝑡_ , the VTD assigns the type _others_ to the token. After initializing a token _𝑡_ , the VTD starts the anomaly detection process. 

##### _4.3. Update types_ 

The update step tests if tokens _𝑡𝑖_ of an event _𝑒_ still comply with their assigned type. If not, it raises an alert (for more details see Sec. 4.7). The VTD triggers the update of the types periodically after an event _𝑒_ has occurred _𝑛_ times. By default _𝑛_ is set to 50. However, _𝑛_ should not be too large or small. A larger _𝑛_ leads to more accurate results of the tests. But, it also implies that the time until a token _𝑡_ is evaluated increases, and anomalies are detected with longer delays, which is crucial for events _𝑒_ that occur rarely. A smaller _𝑛_ enables earlier detection of anomalies, but also implies a higher possibility for a false positive. 

During the update step for tokens _𝑡_ of the types chronological, static, ascending and descending, as well as unique, the VTD applies the same tests as described in the previous section. If a test evaluates negative the VTD raises an alert. Additionally, it sets the type to other, which triggers a new initialization during the next update step. Furthermore, the option to define a parameter that delays the next initialization for a specified number of update steps exists. This increases the chance for anomaly free data, when assigning a new type. 

For tokens _𝑡_ of the continuous type with independent values, the VTD first verifies if all _𝑛_ observed values _𝑤𝑡,𝑖_ ( _𝑤_ refers to values observed within one update cycle, while _𝑣_ refers to values observed during initialization) are numerical. Afterwards, it applies a KS test to verify if the distribution of the _𝑛_ newly observed values _𝑤𝑡,𝑖_ is the same as the currently assigned one. Therefore, the critical value _𝑐𝛼_ has to be modified. The Monte Carlo method yields the critical values _𝑐𝛼_ for sample sizes _𝑛_ ∈{50 _,_ 100 _,_ 150 _,_ 200} and significance _𝛼_ ∈{0 _._ 01 _,_ 0 _._ 05 _,_ 0 _._ 1} for all distributions listed in Table 1. However, this time it takes the sample sizes of the initialization and update step into account. This is necessary, because during initialization we estimated the distribution of the observed values _𝑣𝑡,𝑖_ , which is error-prone. Now we estimate if the new values _𝑤𝑡,𝑖_ origin from the distribution of the values _𝑣𝑡,𝑖_ observed during initialization. Thus, we have to balance this error. Again, this step can be done before applying the VTD, since the critical values _𝑐𝛼_ are independent from the data at hand and only depend on the sample sizes, significance and distribution family. This improves performance and saves runtime. 

The VTD applies the KS test to test the update values _𝑤𝑡,𝑖_ against the distribution observed during the initialization. If the test evaluates positive, the VTD proceeds with the data type initially assigned. If the test evaluates negative, the VTD first checks, if one of the other fitting distributions from the initialization matches the update values _𝑤𝑡,𝑖_ . If one of these distributions fits, the VTD assigns it as new type to token _𝑡_ . In the case that during the initialization the empirical distribution was chosen, the VTD applies the two-sided KS test to verify if the update values _𝑤𝑡,𝑖_ origin from the same distribution as the initial values _𝑣𝑡,𝑖_ . Otherwise, the VTD repeats the initialization step. As mentioned, first the VTD assigns the type other, before it reinitializes the type. 

For tokens _𝑡_ of the range type, i.e., continuous values that are not independent, the update step distinguishes two cases. First, if all values _𝑤𝑡,𝑖_ of token _𝑡_ lie within the interval [lower limit, upper limit] (see Eq. (7)) for a specified number of update steps the VTD adjusts the interval by reinitializing the interval limits with the current values, i.e., the VTD narrows or stretches the interval so that it reflects the actual range of the values of token _𝑡_ as exact as possible. Secondly, if one of values _𝑤𝑡,𝑖_ lies outside the interval, the VTD assigns token _𝑡_ the type other, before it reinitializes the token’s type. 

For the update step of discrete tokens _𝑡_ , we have to consider two cases: (i) new values of the variable occur that have not been observed during the initialization, and (ii) the number of unique values # _𝑡_ stays the same. In case (i), first the VTD verifies the uniqueness criteria from the initialization for each of the update values _𝑤𝑡,𝑖_ . If the values still satisfy the criteria, the relative frequencies of the values of token _𝑡_ are updated considering both the relative frequencies observed during the initialization and the ones from the newly observed values. If the values of token _𝑡_ do not satisfy the uniqueness criteria anymore, the VTD assigns the type other and repeats the initialization for token _𝑡_ during the next update step. 

For the discrete type, the VTD remembers the relative frequencies of the unique values  _𝑡_ of token _𝑡_ and how many values _𝑣𝑡,𝑖_ of token _𝑡_ it observed so far. Therefore, it remembers how many values it has taken into account to estimate the relative frequencies. In case (ii), the VTD applies the _𝜒_<sup>2</sup> -test of homogeneity (see Theorem 5), to test if the observed values _𝑣𝑡,𝑖_ and the update values _𝑤𝑡,𝑖_ origin from the same distribution. If the test evaluates positive, the VTD updates the distribution of token _𝑡_ with the newly observed values _𝑤𝑡,𝑖_ and increases the number of totally observed values respectively. If the test evaluates negative, the VTD repeats the initialization. As mentioned, first the VTD assigns the type other, before it reinitializes the type. 

**Theorem 5** _(𝜒_<sup>2</sup> _-Test of homogeneity). Let_ { **_𝑥_** _𝑖_ ∶= { _𝑥𝑖,_ 1 _,_ … _, 𝑥𝑖,𝑛𝑖_ } ∶ _𝑖_ ∈ N≤ _𝑘_ } _be a sequence of samples of independent discrete random variables 𝑋𝑖 with underlying distribution functions 𝑃𝑖 and let_  _be the combined sample space of all 𝑋𝑖. The test statistic of the k sample 𝜒_<sup>2</sup> _-test of homogeneity is_ 



_where 𝑂𝑖,𝑎 is the number of observations of value 𝑎 in the 𝑖-th sample_ **_𝑥_** _𝑖 and 𝐸𝑖,𝑎 is defined through the following formula._ 



_In the above formula 𝑛𝑖 is the size of sample_ **_𝑥_** _𝑖 and 𝑛𝑎 is the number of total observations of value 𝑎 in the combined sample_ **_𝑥_** ∪ = ∪ _𝑖_ ∈N≤ _𝑘_ **_𝑥_** _𝑖._ 

In the application of the VTD, _𝑘_ equals 2 and the two tests samples **_𝑥_** 1 and **_𝑥_** 2 are the observed values _𝑣𝑡,𝑖_ and the update values _𝑤𝑡,𝑖_ . The tested null hypothesis of the _𝜒_<sup>2</sup> -test for homogeneity is 



against the alternative hypothesis 



In case of the continuous and discrete type, the VTD does not discard the type of a token _𝑡_ immediately, if a single test fails. Instead, the VTD remembers the results of the last _𝑚_ tests, by default _𝑚_ = 30. Furthermore, it applies a binomial test (see Theorem 6) to estimate if the type of a token _𝑡_ actually changed or if the negative tests result from the significance of the test. Thus, a significant number of tests has to fail before the VTD raises an alert and repeats the initialization. For tokens of the type other, the VTD repeats the initialization immediately. 

6 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

**Theorem 6** _(Binomial Test). The test statistic of the binomial test is_ 



_where 𝑛 is the sample size, 𝑝_ 0 _the probability of the reference binomial distribution, 𝑐 the number of successes in the test sample and 𝐵_ ( _𝑖_ | _𝑝_ 0 _, 𝑛_ ) _as defined below._ 



_The binomial test is positive if 𝑇 is greater than the significance level 𝛼 of the binomial test._ 

##### _4.4. Compute indicators_ 

Some tokens that occur in log data possess an unstable type that changes frequently. This raises the potential that the VTD generates false positives, when it considers data type changes at a single point in time. We compute and use an indicator to mitigate the negative effects of unstable tokens. Besides token indicators _𝑇𝐼𝑡_ the VTD also computes event indicators _𝐸𝐼𝑒_ that reflect the current state of an event type _𝑒_ and are even more robust than token indicators. 

##### _4.4.1. Token indicator_ 

The token indicator _𝑇𝐼𝑡_ considers the history of data types _𝐷𝑇𝑡_ a token _𝑡_ adopted as Fig. 4 depicts. Therefore, we define the vectors _𝐷𝑇𝑡,𝑟𝑒𝑓_ and _𝐷𝑇𝑡,𝑐𝑜𝑛_ as shown in Eq. (12) and Eq. (13), where _𝑛_ 0 _< 𝑛_ 1 _< 𝑛_ 2 _< 𝑛_ 3 are natural numbers. _𝐷𝑇𝑡,𝑟𝑒𝑓_ is a reference vector that stores the data types _𝑑𝑡𝑡_ token _𝑡_ adopted between the update steps _𝑛_ 0 and _𝑛_ 1. _𝐷𝑇𝑡,𝑐𝑜𝑛_ is a control vector that stores the data types _𝑑𝑡𝑡_ token _𝑡_ adopted between the update steps _𝑛_ 2 and _𝑛_ 3. Fig. 4 depicts the time windows the two vectors consider. The scale represents the update steps and the time windows move one step forward in each update step. Note, it is possible to configure the number of update steps, after which the VTD computes the indicator. By default the value is set to 10. If the indicator is computed in each update step, this would increase the false positive rate, since the indicator analyzes long term behavior. The token indicator _𝑇𝐼𝑡_ for token _𝑡_ considers the similarity between _𝐷𝑇𝑡,𝑟𝑒𝑓_ and _𝐷𝑇𝑡,𝑐𝑜𝑛_ . The token indicator _𝑇𝐼𝑡_ ∈[0 _,_ 1] is close to 1 if the two vectors are dissimilar, which implies a high probability for an anomaly. Empirical studies showed that an anomaly threshold of _𝑇𝐼𝑡_ = 0 _._ 7 is reasonable. Equation (14) computes the token indicator, with _𝑑𝑎𝑡𝑎𝑡𝑦𝑝𝑒𝑠_ the set of all occurring data types. Equation (15) defines _𝑑𝑡𝑦𝑝𝑒_ , where _ℎ𝑡𝑦𝑝𝑒_ (⋅) returns how often a specific data type _𝑡𝑦𝑝𝑒_ occurs in a vector _𝐷𝑇𝑡,_ ⋅, E _𝑐𝑜𝑛𝑡_ (⋅) is the mean of the expected values from the entries with the data type _𝑐𝑜𝑛𝑡𝑖𝑛𝑢𝑜𝑢𝑠_ , and _𝜎𝑐𝑜𝑛𝑡_<sup>2(⋅)thevarianceoftheexpectedval-</sup> ues from the entries with the data type _𝑐𝑜𝑛𝑡𝑖𝑛𝑢𝑜𝑢𝑠_ . If a data type _𝑡𝑦𝑝𝑒_ does not appear in the reference vector _𝐷𝑇𝑡,𝑟𝑒𝑓_ , _𝑑𝑡𝑦𝑝𝑒_ is defined as the relative frequency of _𝑡𝑦𝑝𝑒_ in the vector _𝐷𝑇𝑡,𝑐𝑜𝑛_ . In case the data type _𝑡𝑦𝑝𝑒_ is neither discrete, nor range, nor continuous, _𝑑𝑡𝑦𝑝𝑒_ represents the difference of the relative frequencies in the vectors _𝐷𝑇𝑡,𝑟𝑒𝑓_ and _𝐷𝑇𝑡,𝑐𝑜𝑛_ . If _𝑡𝑦𝑝𝑒_ is discrete, it returns the maximum of the difference of relative frequencies of discrete data types in the vectors _𝐷𝑇𝑡,𝑟𝑒𝑓_ and _𝐷𝑇𝑡,𝑐𝑜𝑛_ , and the difference of relative frequencies of how often new values have been added to the discrete distribution of vectors _𝐷𝑇𝑡,𝑟𝑒𝑓_ and _𝐷𝑇𝑡,𝑐𝑜𝑛_ , which _ℎ𝑡𝑦𝑝𝑒,𝑛𝑒𝑤𝑣𝑎𝑙𝑢𝑒_ (⋅) returns. In case of the continuous data type, _𝑑𝑡𝑦𝑝𝑒𝑠_ splits into three parts, which the equation weighs evenly. The first part takes into account the difference between the expected values E _𝑐𝑜𝑛𝑡_ of the occurrences of the variable data type in the reference vector _𝐷𝑇𝑡,𝑟𝑒𝑓_ and the control vector _𝐷𝑇𝑡,𝑐𝑜𝑛_ . The second part considers the variance _𝜎𝑐𝑜𝑛𝑡_<sup>2inthesameway.Finally,partthreeassessesthatatleastoneof</sup> the two parameters E _𝑐𝑜𝑛𝑡_ and _𝜎𝑐𝑜𝑛𝑡_<sup>2changed,whichisequaltoadata</sup> type change. Thus, this part is always<sup>1</sup> 3<sup>,ifE</sup><sup>_𝑐𝑜𝑛𝑡_,</sup><sup>_𝜎_</sup> _𝑐𝑜𝑛𝑡_<sup>2,orbothchanged,</sup> which is represented by the indicator function 1 _𝑐ℎ𝑎𝑛𝑔𝑒_ . In case of the range data type, for the reference and control vector two intervals _𝐼𝑡,𝑟𝑒𝑓_ 



**Fig. 4.** Example for computing the token indicator. In this case _𝑛_ 0 refers to point 1 on the time line, _𝑛_ 1 to 4, _𝑛_ 2 to 7, and _𝑛_ 3 to 10. 

and _𝐼𝑡,𝑐𝑜𝑛_ are computed. The lower and upper limits are the mean of the lower and upper limits of the appearing range types in the vectors. The corresponding part of the token indicator is calculated as the length of the symmetric difference len( _𝐼𝑡,𝑟𝑒𝑓_ Δ _𝐼𝑡,𝑐𝑜𝑛_ ) divided by the length of the union of the two intervals len( _𝐼𝑡,𝑟𝑒𝑓_ ∪ _𝐼𝑡,𝑐𝑜𝑛_ ). 







_𝑡𝑦𝑝𝑒_ ∈ _𝑑𝑎𝑡𝑎𝑡𝑦𝑝𝑒𝑠_ 



<!-- Start of picture text -->
⎧<br>ℎ𝑡𝑦𝑝𝑒 ( 𝐷𝑇𝑡,𝑐𝑜𝑛 )<br>⎪⎪ 𝑛 3− 𝑛 2+1 , if  ℎ𝑡𝑦𝑝𝑒 ( 𝐷𝑇𝑡,𝑟𝑒𝑓 ) = 0,<br>⎪ ℎ𝑡𝑦𝑝𝑒 ( 𝐷𝑇𝑡,𝑐𝑜𝑛 ) 1 E 𝑐𝑜𝑛𝑡 ( 𝐷𝑇𝑡,𝑟𝑒𝑓 )−E 𝑐𝑜𝑛𝑡 ( 𝐷𝑇𝑡,𝑐𝑜𝑛 )<br>⎪ 𝑛 3− 𝑛 2+1 ( 3 |||| max { E 𝑐𝑜𝑛𝑡 ( 𝐷𝑇𝑡,𝑟𝑒𝑓 ) , E 𝑐𝑜𝑛𝑡 ( 𝐷𝑇𝑡,𝑐𝑜𝑛 ) } || ||<br>⎪<br>⎪⎪ + 1 3 ||||| max 𝜎 { 𝑐𝑜𝑛𝑡 2 𝜎𝑐𝑜𝑛𝑡 2( 𝐷𝑇 ( 𝐷𝑇𝑡,𝑟𝑒𝑡,𝑟𝑒𝑓𝑓 )− 𝜎 ) ,𝜎 𝑐𝑜𝑛𝑡 2 𝑐𝑜𝑛𝑡 2 ( 𝐷𝑇 ( 𝐷𝑇𝑡,𝑐𝑜𝑛𝑡,𝑐𝑜𝑛 ) ) } ||||| + 1 3 1 𝑐ℎ𝑎𝑛𝑔𝑒 ) ,<br>⎪<br>⎪ if  𝑡𝑦𝑝𝑒 is continuous,<br>⎪<br>𝑑𝑡𝑦𝑝𝑒 = ⎨ ℎ𝑡𝑦𝑝𝑒 ( 𝐷𝑇𝑡,𝑐𝑜𝑛 ) len( 𝐼𝑡,𝑟𝑒𝑓 Δ 𝐼𝑡,𝑐𝑜𝑛 ) , if  𝑡𝑦𝑝𝑒 is range, (15)<br>⎪ 𝑛 3− 𝑛 2+1 ( len(∪( 𝐼𝑡,𝑟𝑒𝑓 ,𝐼𝑡,𝑐𝑜𝑛 )) )<br>⎪⎪⎪max {|||| ℎ𝑡𝑦𝑝𝑛 1 𝑒 −( 𝐷𝑇𝑛 0+1 𝑡,𝑟𝑒𝑓 ) − ℎ𝑡𝑦𝑝𝑛 3 𝑒 −( 𝐷𝑇𝑛 2+1 𝑡,𝑐𝑜𝑛 ) |||| ,<br>⎪⎪ |||| ℎ𝑡𝑦𝑝𝑒,𝑛𝑒𝑤𝑣𝑎𝑙𝑢𝑒𝑛 1− 𝑛 0+1( 𝐷𝑇𝑡,𝑟𝑒𝑓 ) − ℎ𝑡𝑦𝑝𝑒,𝑛𝑒𝑤𝑣𝑎𝑙𝑢𝑒𝑛 3− 𝑛 2+1( 𝐷𝑇𝑡,𝑐𝑜𝑛 ) ||||} ,<br>⎪<br>⎪ if  𝑡𝑦𝑝𝑒 is discrete,<br>⎪|||| ℎ𝑡𝑦𝑝𝑛 1 𝑒 −( 𝐷𝑇𝑛 0+1 𝑡,𝑟𝑒𝑓 ) − ℎ𝑡𝑦𝑝𝑛 3 𝑒 −( 𝐷𝑇𝑛 2+1 𝑡,𝑐𝑜𝑛 ) |||| , else.<br>⎪⎩<br><!-- End of picture text -->

##### _4.4.2. Event indicator_ 

The event indicator _𝐸𝐼𝑒_ ∈[0 _,_ 1] of event _𝑒_ builds on the token indicator. The event indicator _𝐸𝐼𝑒_ considers the information of all token indicators _𝑇𝐼𝑡_ of event _𝑒_ . Again, values of _𝐸𝐼𝑒_ close to 1 indicate anomalous system behavior. Empirical studies showed that an anomaly threshold of _𝐸𝐼𝑒_ = 0 _._ 6 is reasonable. Equation (16) computes the event indicator, where _𝑡𝑒,𝑖_ with _𝑖_ ∈{1 _,_ 2 _,_ … _, 𝑛_ } is the _𝑖_ -th considered token of event _𝑒_ and _𝑛_ the number of the tokens _𝑡𝑒,𝑖_ of event _𝑒_ . 



The inverse of the tangent tan<sup>−1</sup> in Eq. (16) ensures that the event indicator _𝐸𝐼𝑒_ reports an accurate value for anomaly detection, if a couple of _𝑇𝐼𝑡_ of event _𝑒_ are moderately high as well as if only one _𝑇𝐼𝑡_ is significantly high. Therefore, it is possible to detect gradual change in system behavior that could not be detected with traditional anomaly detection systems. Traditional anomaly detection approaches usually consider single log lines or log lines within a single time window that reflect specific punctuated events. 

##### _4.5. Select tokens_ 

The step select tokens (ST) is optional and removes tokens from the VTD’s procedure that are not suitable for anomaly detection and computing an indicator. ST considers the data type reference vector _𝐷𝑇𝑡,𝑟𝑒𝑓_ 

7 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

of each token. First, it removes all tokens _𝑡_ from the detection process for which _𝐷𝑇𝑡,𝑟𝑒𝑓_ only includes the data type static. Second, it removes all tokens _𝑡_ for which the most common data type in _𝐷𝑇𝑡,𝑟𝑒𝑓_ does not exceed a certain percentage of occurrences. By default the threshold is 0 _._ 6, i.e., considering the example in Fig. 4, the most common data type has to occur at least 3 times that the VTD considers the token for anomaly detection. 

The ST step offers two advantages. First, it increases the performance of the VTD, because the procedure has to consider less tokens. Second, it improves the robustness of the VTD with respect to false positives, because it removes tokens with unstable data types from the detection process. Especially the latter contributes to a higher accuracy and better usability. The reason for this is that anomaly detection learns a model of normal system behavior and afterwards detects deviations from it. Thus, monitoring unstable system behavior leads to an increased number of false positives, which contributes to alert flooding (Julisch, 2003). Alert flooding disguises actual anomalies and exhausts security analysts during manual investigation of alerts. 

##### _4.6. Compute indicator weights_ 

Similarly to ST, the computation of weights _𝐼𝑊𝑡_ ∈[0 _,_ 1] for the token indicator _𝑇𝐼𝑡_ increases the robustness of the event indicator _𝐸𝐼𝑒_ . The weights _𝐼𝑊𝑡_ ensure that tokens with generally unstable data types, i.e., tokens _𝑡_ that often posses high indicators _𝑇𝐼𝑡_ , have less influence on the event indicator _𝐸𝐼𝑒_ . Equation (17) computes the indicator weight _𝐼𝑊𝑡_ for token _𝑡_ , where _𝑛_ is the total number of computed indicators and _𝑚_ the number of previously computed token indicators _𝑇𝐼𝑡,𝑖_ considered for computing _𝐼𝑊𝑡_ . The formula for the event indicator adapts as shown in Eq. (18). Furthermore, Eq. (17) takes into account only token indicators that exceed 0 _._ 5.<sup>6</sup> Consequently, the higher previous token indicators _𝑇𝐼𝑡,𝑖_ have been, the lower is their weight _𝐼𝑊𝑡_ and thus their influence on the event indicator _𝐸𝐼𝑒_ . 





##### _4.7. Report anomalies_ 

The VTD is able to report anomalies (RA) on three occasions. First, it detects changes of the type of a single token _𝑡_ . In case of the discrete and continuous data type, the VTD applies a binomial test to verify if a change in type is significant or occurs due to the significance of the test that estimates the distribution of the values _𝑣𝑡_ of token _𝑡_ . However, this method is rather error prone, because especially tokens with unstable data type lead to many false positives. Thus, the VTD implements a token indicator _𝑇𝐼𝑡_ that takes into account the history of data types _𝑑𝑡𝑡_ a token _𝑡_ has taken. The token indicator increases robustness against false positives and allows to remove tokens with unstable data types from the detection procedure. Finally, the event indicator _𝐸𝐼𝑒_ reports anomalies on the basis of event types. Thus, it is even more robust against false positives than the _𝑇𝐼𝑡_ . Additionally, the VTD offers the option to include indicator weights in the computation of the event indicator. This reduces the influence of unstable tokens on the event indicator _𝐸𝐼𝑒_ . We suggest to use all three detection mechanisms and rate anomalies differently, in particular, with decreasing weights for the following sequence: (i) event indicator anomalies, (ii) token indicator anomalies, and (iii) data type changes. 



**Fig. 5.** Run time comparison of the test statistics in seconds. 

##### **5. Evaluation** 

This section describes evaluation results. First, we compare a number of test statistics for goodness-of-fit (GOF) tests to justify the application of the KS test for processing continuous and independent variables. Furthermore, the sections describe the properties of the data used for the remaining evaluation. We assess the selection of input parameters for the VTD, the _𝐹_ 1-score, provide ROC-plots, and compare the VTD approach to time series analysis (TSA) and principal component analysis (PCA). Finally, we assess the effects of the application of indicator weights. If not stated otherwise we use the VTD<sup>7</sup> implementation with indicator weights for the AMiner,<sup>8</sup> an anomaly detection system that monitors log data. In the remaining section we consider the first day of the data sets as initialization and training time. 

##### _5.1. Comparison of test statistics_ 

This section compares six test statics for the GOF and homogeneity test the VTD applies to monitor continuous variables that are independent and identical distributed. We assess the performance with respect to run time and the power of the GOF test statistics of the KS (Knuth, 2014), Cramér-von Mises (CM) (Glen and Leemis, 2017), AndersonDarling (AD) (Anderson, 2011) test statistic and three test statistics of Zhang (ZK, ZC, ZA) (Zhang, 2002). Fig. 5 compares the run time of the six test statistics. The plot depicts the time (in seconds) it takes to compute the test statistic on _̃𝑛_ = 1 _._ 000 _._ 000 uniformly distributed test samples of size _𝑛_ = 100, where the null distribution is the uniform distribution. The simulation has been executed on an Intel core i7-8565U @ 1.80 GHz on Windows 10. Fig. 5 shows that the CM test statistic provides the best run time closely followed by the KS test statistic. The run times of both are significantly lower than the run times of the other test statics. 

Fig. 6 depicts the mean power of the six GOF test statistics. The distributions for the power computation are the investigated distributions listed in Table 1, using synthetic data. Even though the KS test has not the highest test power, its significantly shorter run time in comparison to other test statistics and the sufficiently high mean power, justifies using the KS test statistic in the VTD approach. 

> 7 https://github.com/ait-aecid/logdata-anomaly-miner/blob/ development/source/root/usr/lib/logdata-anomaly-miner/aminer/analysis/ VariableTypeDetector.py. 

> 8 https://github.com/ait-aecid/logdata-anomaly-miner. 

> 6 Note, this value can be changed according to the log data at hand. 

8 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 



**Fig. 6.** Mean power comparison of the test statistics. 

##### _5.2. Test data_ 

To assess the accuracy and detection capabilities of the VTD approach, we used the AIT Log Data Set V2.0<sup>9</sup> which is available as open access via Zenodo and has been generated applying the approach described in (Landauer et al., 2021b, 2022). The AIT Log Data Set V2.0 is one of the few available labeled open source log data sets that includes anomalies which originate from realistic cyber attacks and not only system faults. Thus, using this data set allows other scientists to reproduce the evaluation results and objectively compare other intrusion detection approaches. The AIT Log Data Set V2.0 contains log data from 8 different testbeds. In brief, each of the datasets corresponds to a testbed representing a small enterprise network including mail server, file share, WordPress server, VPN, firewall, etc. To evaluate the VTD approach, we used the available access logs that protocol the requests to the cloud server that runs the file share, the intranet server that runs the Wordpress instance, and the mail server that runs Horde<sup>10</sup> group ware of all 8 testbeds, which contain normal system and user behavior as well as traces of 7 or 8 attacks. The logs include the following attacks: nmap service_scan (all except shaw), attacker http traffic, dirb scan, WPScan, webshell upload, remote command execution, privilege escalation (all except wheeler), which relate to compromising an intranet server and a data exfiltration. Thus, the simulated attacker carries out a multi-step attack to execute a data exfiltration that includes scans (nmap, WPScan, dirb), a webshell upload that exploits a vulnerability in the WordPress plugin wpDiscuz (CVE-2020-24186<sup>11</sup> ), password cracking (John the Ripper<sup>12</sup> ), privilege escalation, remote command execution, and data exfiltration (DNSteal<sup>13</sup> ). Fig. 7 depicts the testbeds’ network topology and the attack steps. Furthermore, Fig. 8 shows example logs and how the VTD reports data type changes. The data sets are fully labeled, which allows to use them for detailed evaluation purposes. The first 5 rows of Table 2 summarize properties of the data sets, including the time span the data covers (DataLength), the length of the anomalies (AnomLength), the number of lines (NumLinesData), the number of anomalous lines (NumLinesAnom), and the number of users that were active in the testbeds (NumUser). The table emphasizes the heterogeneity of the log data with respect to all these parameters. The evaluation of the VTD is not affected by imbalance in the data, because 

> 9 https://zenodo.org/record/5789064. 

> 10 Horde Groupware 5.2.17, https://horde.org/apps/webmail. 



**Fig. 7.** Testbed network topology: Steps (1) -(3) mark the attacker’s path to compromise the intranet server and steps (a)-(c) represent connections related to the data exfiltration attack vector (Landauer et al., 2022). 

in contrast to classification approaches that rely on deep learning and artificial neural networks, the VTD follows an unsupervised anomaly detection approach that does not require a distinct training phase. 

##### _5.3. 𝐹_ 1 _-score_ 

For the computation of the _𝐹_ 1-score, we split the considered time into smaller intervals. In the remaining evaluation, we use 300 and 600 seconds as evaluation time window (ETW) size. This assumption bases on the results of Sect. 5.4.2. To be able to compute the _𝐹_ 1-score,<sup>14</sup> we define true positives (TP), false positives (FP), and false negatives (FN) as follows: We consider an ETW as positive if we observe a positive indicator, i.e., an indicator of the VTD with a confidence higher than the configured anomaly confidence threshold. If an ETW includes a positive indicator and overlaps with an anomaly, we consider it as TP, and if it does not overlap with an anomaly as FP. We consider ETWs that overlap with an anomaly, but do not include a positive indicator as FN. Note, each positive indicator only counts for a single ETW. This means that the TP rate cannot reach 1, if a single positive indicator covers two or more ETW that include anomalies. In this way, we can compute the _𝐹_ 1-score using the standard procedure. 

##### _5.4. Parameter selection_ 

The following section discusses selecting the VTD’s input parameters using the _𝐹_ 1-score. 

##### _5.4.1. Initialization and update step sizes_ 

First, we assess the selection of the number of lines for initialization and the number of lines for each update step. For this purpose, we computed the _𝐹_ 1 for several combinations of initialization and update step sizes. Fig. 9 plots the results as heatmap for ETW size 300s and Fig. 10 for ETW size 600s. Both figures use a confidence threshold of 0 _._ 7. The figures indicate high _𝐹_ 1 scores for update step sizes up to 200 lines. According to the two figures, the two most promising combinations for initialization and update step sizes are 150∕20 and 300∕150, because they are local maxima in both figures, have the smallest ratio (150∕20 better than 200∕20), and have a smaller update than initialization size. For the remaining evaluation section we will stick with the combination 150∕20, because an indicator with an update step size of 150 would cover more than seven times the number of lines as with an update step 

> 11 https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-24186. 

> 12 https://www.openwall.com/john/. 

> 13 https://github.com/m57/dnsteal. 

> 14 _𝐹_ 1 = 2 precision + recallprecision⋅recall<sup>=</sup> 2TP+2FPTP+FN<sup>.</sup> 

9 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

**Fig. 8.** Example logs from the intranet access logs of the fox testbed. The bottom part shows the output of the VTD analyzing the user agent, which data type changes from static (stat) to discrete (d). 

**Table 2** 

Test data properties. 

||fox|harrison|russell<br>mitchell|santos|shaw|wardbeck|wheeler|wilson|
|---|---|---|---|---|---|---|---|---|
|DataLength|5 d|5 d|4 d|4 d|6 d|5 d|5 d|6 d|
|AnomLength|22 min|41 min|3 min|3 min|2 min|3 min|18 min|22 min|
|NumLinesData|537262|544165|88571|183176|168621|234501|643824|745821|
|NumLinesAnom|410842|415377|7696|7795|5227|5300|431561|428117|
|NumUser|16|15|10|18|13|17|22|24|
|MeanIndiLeng|103.31 s|98.65 s|770.78 s|323.39 s|498.02 s|344.52 s|89.65 s|99.6 s|
|MaxConfAnom|0.90|0.85|0.76|0.75|0.75|0.70|0.85|0.89|
|MaxConfNorm|0.56|0.76|0.58|0.68|0.70|0.61|0.71|0.71|
|99%ConfNorm|0.43|0.49|0.50|0.32|0.42|0.39|0.44|0.43|
|95%ConfNorm|0.29|0.28|0.30|0.20|0.24|0.14|0.16|0.25|











**Fig. 9.** Heatmap of the _𝐹_ 1-score for VTD indicators considering varying step sizes for the initialization and update steps with a time interval length of 300s. 

**Fig. 10.** Heatmap of the _𝐹_ 1-score for VTD indicators considering varying step sizes for the initialization and update steps with a time interval length of 600s. 

of 20. Note, the larger the update step size, the longer it takes until the VTD approach yields a detection result. 

##### _5.4.2. ETW size_ 

Table 2 provides the mean time a single indicator evaluation covers (MeanIndiLeng) for update step size 20 as obtained in Sect. 5.4.1, i.e., the mean number of seconds that pass until a single event type has been observed in 10 update steps. Since the data mimics realistic user 

behavior, the users only operate between 05:00 and 23:00, with some variability to simulate realistic working hours. This means, to compute the MeanIndiLeng, we only took into account log lines that have been generated in this time span. The mean over the MeanIndiLeng over all eight data sets is equal to 290 _._ 99 seconds. Consequently, choosing an ETW of 300s leads on average to one indicator evaluation per ETW. However, during the evaluation, we also consider the ETW size 600s, 

10 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

because log lines do not occur equidistantly, which could lead to the issue that there occur less than one indicator evaluation per ETW. 

##### _5.4.3. Anomaly confidence threshold_ 

The last four rows of Table 2 provide information about the maximum confidence during the anomaly time intervals (MaxConfAnom), the maximum confidence in the normal time intervals (MaxConfNorm), as well as the 99% and 95% quantile of the indicator value in the normal time intervals (95%ConfNorm, 99%ConfNorm). Note, Fig. 14 points out that the indicator after an anomaly can still have high confidence values for several update steps. The reason for this is that the adaption after an anomaly back to the normal behavior takes some time, since the indicator takes into account values from several update steps. Therefore, to alleviate this effect, in Table 2, we extended the anomaly time interval by twenty minutes to compute the confidences. This allows to better distinguish between the confidences during anomalous and normal behavior. 

The confidence values in Table 2 show that for all data sets the highest indicator confidence occurs during anomalies. Comparing the quantiles with the MaxConfNorm reveals that high confidences during normal behavior are outliers. For example, considering the shaw data set, the highest confidence during normal behavior (0 _._ 7) is close to the confidence during anomalies (0 _._ 75), but the values of the 99%-quantile (0 _._ 32) and the 95%-quantile (0 _._ 2) are significantly lower. 

Hence, based on the information provided in Table 2, we set the anomaly confidence threshold to 0 _._ 7, the minimum MaxConfAnom of all 8 data sets. With this setting, the VTD is able to detect all anomalies, while simultaneously the number of FP is kept to a minimum as the remaining evaluation will show. Note, although with this setting the VTD will detect all anomalies, this does not prohibit FN from occurring, because anomalies can span over more than one ETW, and the indicator confidence might exceed the anomaly confidence threshold not in all of these ETWs. 

##### _5.5. ROC plot evaluation_ 

The following section examines ROC plots and compares the VTD to two other anomaly detection approaches, principal component analysis (PCA) (Xu et al., 2009) and time series analysis (TSA) (Landauer et al., 2018a). For the comparison we used implementations of the PCA<sup>15</sup> and the TSA<sup>16</sup> that are available for the AMiner. The detectors were configured with two days of initialization and window size one hour each. For the VTD we used the input parameters derived in Sect. 5.4. 

Fig. 11 plots the ROC for the VTD, the PCA, and the TSA for ETW sizes 300s and 600s with varying anomaly confidence thresholds. The VTD overall performs significantly better than both other approaches. Additionally, the figure demonstrates that the VTD reaches a high TPR, while simultaneously maintaining a rather low FPR, which relates to a large area under the ROC. Note, in the comparison at hand, the TSA suffers from a short initialization time. Consequently, the TSA raises an alert in each time step. 



**Fig. 11.** ROC-plot of the VTD, PCA and TSA with time interval lengths of 300s 

and 600s. 





**Fig. 12.** Heatmap of the run time of the VTD in seconds. 

##### _5.6. Run time performance_ 

The following section evaluates the VTD’s run time performance with respect to initialization and update step size. Fig. 12 plots a heatmap of the run times. The figure indicates an increasing run time for smaller step sizes, whereby the impact of the update step size is significantly higher. The reason for this is that the update procedure is computational intensive. 

##### _5.7. Distribution of variable types_ 

> 15 https://github.com/ait-aecid/logdata-anomaly-miner/blob/development/ 

> source/root/usr/lib/logdata-anomaly-miner/aminer/analysis/PCADetector.py 

> - Configuration parameters: window_size: 36000; min_anomaly_score: 1.1; min_variance: 0.98; num_windows: 72; paths: “/model/model/client_ip/client_ip”, “/model/model/fm/request/method”, “/model/model/status_code”, “/model/model/combined/combined/user_agent”. 

> 16 https://github.com/ait-aecid/logdata-anomaly-miner/blob/ 

development/source/root/usr/lib/logdata-anomaly-miner/aminer/analysis/ TSAArimaDetector.py Configuration parameters: ETD: min_num_vals: 1000; max_num_vals: 1500; save_values: False; track_time_for_tsa: True; waiting_time_for_tsa: 100; num_sections_waiting_time_for_tsa: 10; TSA: num_periods_tsa_ini: 2; num_division_time_step: 24; alpha: 0.05; num_min_time_history: 20; num_max_time_history: 3000; force_period_length: True; set_period_length: 86400; min_log_lines_per_time_step: 1. 

The following section assesses the distribution and occurrence of variable types (see Sect. 4.2) in the test data, exemplified by the fox data set. Table 3 provides the percentage distribution of the variable types in the fox data set during the VTD analysis. In total the data set includes 26 variables that were analyzed and during the VTD analysis there occurred 25783 initialization and update steps. The first row of the table provides the distribution of variable types for all variables, the second row of the variables that have been selected for anomaly detection (see Sect. 4.5), and the third row of the variables that have been selected for anomaly, and changed their type at least once. Note, the last column mentions the variables that were initialized and recognized to be too unstable for the analysis with the VTD. 

11 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

**Table 3** 

Distribution of variable types in the VTD analysis for the fox data set. 

||others|static|discrete|ascend|descend|unique|range|cont|no type|
|---|---|---|---|---|---|---|---|---|---|
|all|0.02|0.51|0.25|0.03|0.00|0.03|0.00|0.01|0.15|
|selected|0.02|0.60|0.29|0.04|0.00|0.04|0.00|0.01|0.00|
|selected||||||||||
|unstable|0.04|0.02|0.72|0.10|0.00|0.10|0.00|0.02|0.00|





**Fig. 13.** Indicator confidence without weights. (For interpretation of the colors in the figure(s), the reader is referred to the web version of this article.) 

**Fig. 14.** Indicator confidence with weights. (For interpretation of the colors in the figure(s), the reader is referred to the web version of this article.) 

Additionally, the VTD tends to classify content sizes occurring in log data as continuous. This unwanted behavior could be suppressed, by only testing decimal values for continuous variable types. 

##### _5.8. Indicator weights_ 

Next, we assess the effect of the indicator weights. Fig. 13 plots the progression of the VTD indicator confidence without weights, while Fig. 14 plots it with weights. Both figures consider the fox data set.<sup>17</sup> 

Both figures include a horizontal brown line that marks the anomaly confidence threshold 0 _._ 7 obtained in Sect. 5.4.3. Additionally, we marked the anomaly interval in red in the bottom of the graph. The black bins mark the update steps, which are equivalent to the indicator evaluations. While Fig. 13 indicates that without weights the indicator cannot distinguish between normal and anomalous behavior and consequently generated a huge number of FP, Fig. 14 demonstrates the positive impact of the indicator weights. When using the indicator weights, FPs only occur during the initialization phase in the very beginning of the data sets and after an anomaly has occurred, which both is expectable, because it takes some time for the indicator to adapt to the normal behavior. 

##### **6. Conclusion and future work** 

In this paper we presented a novel approach for anomaly detection in textual computer log data that analyzes the properties of variables occurring in log lines. We propose the variable type detector (VTD) approach that autonomously recognizes the type of variables, including the types chronological, static, ascending or descending, continuous, range, unique, and discrete. For the discrete type, the VTD also provides the relative frequencies of the observed values of the variable. 

> 17 The 8 data sets have been generated using a model driven approach. Therefore, all data sets share the same infrastructure, but during generation of the data, parameters, such as number of users and attack parameters, have been altered. Thus, the results for the evaluation of the indicator weights are the same for all data sets. Hence, we decided to choose one of the data sets as an illustrative example to be able to show easy comprehensible plots that prove the impact of the indicator weights on the number of FPs. 

To specify continuous probability distributions, the VTD applies the Kolmogorov-Smirnov goodness of fit test. Furthermore, the VTD automatically selects variables that are suitable for anomaly detection by assessing the stability of the data type the variables possess. To increase the accuracy and reduce the number of false positives, we introduced an indicator function that weighs the different variables during the anomaly detection process. 

We provided a detailed evaluation that assesses the VTD’s detection capabilities and accuracy using 8 different labeled open source data sets. First, we discussed test data properties and provided a detailed procedure for selecting the VTD’s input parameters using the _𝐹_ 1-score. Based on the input parameter selection, we assessed the TPR and FPR using ROC plots, and compared the VTD to PCA and TSA. Finally, we discussed the run time performance with respect to initialization and update step size. The evaluation results demonstrate the potential of the VTD to extend state-of-the-art intrusion detection solutions currently applied by SIEM and EDR. Currently, the VTD is part of the log anomaly detection tool AMiner,<sup>18</sup> which has been integrated as EDR solution and central log analysis component with proprietary SIEM solutions, such as IBM’s QRadar<sup>19</sup> and into research prototypes of threat hunting platforms (e.g., PANDORA<sup>20</sup> ) and security frameworks (e.g., GUARD (Repetto et al., 2022)) via message queues, such as Apache Kafka,<sup>21</sup> and Syslog. The ability of the VTD to autonomously analyze any kind of log data and specifically custom application logs is an important element to improve intrusion detection in complex cyber infrastructures. 

In the future, we plan to improve the assessment of the continuous data type by adding more probability distributions. Additionally, we intend to introduce a time series data type. Subsequently, we aim to apply the VTD in different use cases that also include log data that contains, for example, physical measurements (e.g., IoT) to assess the continuous and range data type in more details. Finally, we plan to further investigate the applicability of the VTD in real world scenarios together with SOC experts. 

> 18 https://github.com/ait-aecid/logdata-anomaly-miner. 

> 19 https://www.ibm.com/qradar. 

> 20 https://www.pandora-edidp.eu/. 

> 21 https://kafka.apache.org/. 

12 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

##### **CRediT authorship contribution statement** 

**Markus Wurzenberger:** Conceptualization, Funding acquisition, Investigation, Methodology, Project administration, Supervision, Visualization, Writing – original draft, Writing – review & editing. **Georg Höld:** Conceptualization, Formal analysis, Investigation, Methodology, Software, Validation, Visualization, Writing – review & editing. **Max Landauer:** Conceptualization, Data curation, Software, Writing – review & editing. **Florian Skopik:** Conceptualization, Funding acquisition, Supervision, Writing – review & editing. 

##### **Declaration of competing interest** 

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper. 

##### **Data availability** 

Links to data and source code are shared in the article. Both are open source. 

##### **Acknowledgements** 

The work in this paper has received funding from the European Union - European Defence Fund under GA no. 101103385 (AInception). Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union. The European Union cannot be held responsible for them. 

##### **References** 

Allagi, S., Rachh, R., 2019. Analysis of network log data using machine learning. In: 2019 IEEE 5th International Conference for Convergence in Technology (I2CT). IEEE, pp. 1–3. 

- Alshamrani, A., Myneni, S., Chowdhary, A., Huang, D., 2019. A survey on advanced persistent threats: techniques, solutions, challenges, and research opportunities. IEEE Commun. Surv. Tutor. 21, 1851–1877. 

- Anderson, T.W., 2011. Anderson-Darling tests of goodness-of-fit. Int. Encyclop. Stat. Sci. 1, 52–54. 

- Arfeen, A., Ahmed, S., Khan, M.A., Jafri, S.F.A., 2021. Endpoint detection & response: a malware identification solution. In: 2021 International Conference on Cyber Warfare and Security (ICCWS). IEEE, pp. 1–8. 

- Besharati, E., Naderan, M., Namjoo, E., 2019. Lr-hids: logistic regression host-based intrusion detection system for cloud environments. J. Ambient Intell. Humaniz. Comput. 10, 3669–3692. 

- Bhatt, S., Manadhata, P.K., Zomlot, L., 2014. The operational role of security information and event management systems. IEEE Secur. Priv. 12, 35–41. 

- Boyerinas, B.M., 2016. Determining the statistical power of the Kolmogorov-Smirnov and Anderson-Darling goodness-of-fit tests via Monte Carlo simulation. Technical Report. Center of Naval Analyses Arlington United States. 

- Chandola, V., Banerjee, A., Kumar, V., 2009. Anomaly detection: a survey. ACM Comput. Surv. 41, 1–58. 

- Chauhan, H., Kumar, V., Pundir, S., Pilli, E.S., 2013. A comparative study of classification techniques for intrusion detection. In: 2013 International Symposium on Computational and Business Intelligence. IEEE, pp. 40–43. 

- Chen, Y., Luktarhan, N., Lv, D., 2022. Logls: research on system log anomaly detection method based on dual lstm. Symmetry 14, 454. 

- Chen, Z., Liu, J., Gu, W., Su, Y., Lyu, M.R., 2021. Experience report: deep learning-based system log analysis for anomaly detection. preprint. arXiv:2107.05908. 

- Chung, M.H., Yang, Y., Wang, L., Cento, G., Jerath, K., Raman, A., Lie, D., Chignell, M.H., 2023. Implementing data exfiltration defense in situ: a survey of countermeasures and human involvement. ACM Comput. Surv. 

- D’Agostino, R., 2017. Goodness-of-Fit-Techniques. Routledge. 

- Du, M., Li, F., Zheng, G., Srikumar, V., 2017. Deeplog: anomaly detection and diagnosis from system logs through deep learning. In: Proceedings of the 2017 ACM SIGSAC Conference on Computer and Communications Security, pp. 1285–1298. 

- Evans, D.L., Drew, J.H., Leemis, L.M., 2017. The distribution of the Kolmogorov–Smirnov, Cramer–von Mises, and Anderson–Darling test statistics for exponential populations with estimated parameters. In: Computational Probability Applications. Springer, pp. 165–190. 

- Friedberg, I., Skopik, F., Settanni, G., Fiedler, R., 2015. Combating advanced persistent threats: from network event correlation to incident detection. Comput. Secur. 48, 35–57. 

- Fu, Q., Lou, J.G., Wang, Y., Li, J., 2009. Execution anomaly detection in distributed systems through unstructured log analysis. In: 2009 Ninth IEEE International Conference on Data Mining. IEEE, pp. 149–158. 

- Glen, A.G., Leemis, L.M., 2017. Computational Probability Applications. Springer. 

- Goldstein, M., Uchida, S., 2016. A comparative evaluation of unsupervised anomaly detection algorithms for multivariate data. PLoS ONE 11, e0152173. 

- He, P., Zhu, J., He, S., Li, J., Lyu, M.R., 2016a. An evaluation study on log parsing and its use in log mining. In: 2016 46th Annual IEEE/IFIP International Conference on Dependable Systems and Networks (DSN), pp. 654–661. 

- He, S., Zhu, J., He, P., Lyu, M.R., 2016b. Experience report: system log analysis for anomaly detection. In: 2016 IEEE 27th International Symposium on Software Reliability Engineering (ISSRE). IEEE, pp. 207–218. 

- Himler, P., Landauer, M., Skopik, F., Wurzenberger, M., 2023. Towards detecting anomalies in log-event sequences with deep learning: open research challenges. In: Proceedings of the 2023 European Interdisciplinary Cybersecurity Conference, pp. 71–77. 

- Julisch, K., 2003. Clustering intrusion detection alarms to support root cause analysis. ACM Trans. Inf. Syst. Secur. 6, 443–471. 

- Knuth, D.E., 2014. Art of Computer Programming, Volume 2: Seminumerical Algorithms. Addison-Wesley Professional. 

- Kondo, N., Okubo, M., Hatanaka, T., 2017. Early detection of at-risk students using machine learning based on lms log data. In: 2017 6th IIAI International Congress on Advanced Applied Informatics (IIAI-AAI). IEEE, pp. 198–201. 

- Landauer, M., Höld, G., Wurzenberger, M., Skopik, F., Rauber, A., 2021a. Iterative selection of categorical variables for log data anomaly detection. In: European Symposium on Research in Computer Security. Springer, pp. 757–777. 

- Landauer, M., Skopik, F., Frank, M., Hotwagner, W., Wurzenberger, M., Rauber, A., 2022. Maintainable log datasets for evaluation of intrusion detection systems. IEEE Trans. Dependable Secure Comput. 

- Landauer, M., Skopik, F., Wurzenberger, M., Hotwagner, W., Rauber, A., 2021b. Have it your way: generating customized log datasets with a model-driven simulation testbed. IEEE Trans. Reliab. 70, 402–415. https://doi.org/10.1109/TR.2020.3031317. 

- Landauer, M., Skopik, F., Wurzenberger, M., Rauber, A., 2020. System log clustering approaches for cyber security applications: a survey. Comput. Secur. 92, 101739. 

- Landauer, M., Wurzenberger, M., Skopik, F., Hotwagner, W., Höld, G., 2023a. Aminer: A Modular Log Data Analysis Pipeline for Anomaly-Based Intrusion Detection. ACM, New York, NY, pp. 1–16. 

- Landauer, M., Wurzenberger, M., Skopik, F., Hotwagner, W., Höld, G., 2023b. Aminer: a modular log data analysis pipeline for anomaly-based intrusion detection. In: Digital Threats: Research and Practice, vol. 4, pp. 1–16. 

- Landauer, M., Wurzenberger, M., Skopik, F., Settanni, G., Filzmoser, P., 2018a. Dynamic log file analysis: an unsupervised cluster evolution approach for anomaly detection. Comput. Secur. 79, 94–116. https://doi.org/10.1016/j.cose.2018.08.009. https:// www.sciencedirect.com/science/article/pii/S0167404818306333. 

- Landauer, M., Wurzenberger, M., Skopik, F., Settanni, G., Filzmoser, P., 2018b. Time series analysis: unsupervised anomaly detection beyond outlier detection. In: International Conference on Information Security Practice and Experience. Springer, pp. 19–36. 

- Liang, Y., Zhang, Y., Xiong, H., Sahoo, R., 2007. Failure prediction in ibm bluegene/l event logs. In: Seventh IEEE International Conference on Data Mining (ICDM 2007). IEEE, pp. 583–588. 

- Liao, H.J., Lin, C.H.R., Lin, Y.C., Tung, K.Y., 2013. Intrusion detection system: a comprehensive review. J. Netw. Comput. Appl. 36, 16–24. 

- Lou, J.G., Fu, Q., Yang, S., Xu, Y., Li, J., 2010. Mining invariants from console logs for system problem detection. In: 2010 USENIX Annual Technical Conference (USENIX ATC 10). 

- Mackay, D.J.C., 1998. Introduction to Monte Carlo methods. In: Learning in Graphical Models. Springer, pp. 175–204. 

- Miah, M.I., Zendehboudi, S., Ahmed, S., 2020. Log data-driven model and feature ranking for water saturation prediction using machine learning approach. J. Pet. Sci. Eng. 194, 107291. 

- Moon, D., Im, H., Kim, I., Park, J.H., 2017. Dtb-ids: an intrusion detection system based on decision tree using behavior analysis for preventing apt attacks. J. Supercomput. 73, 2881–2895. 

- Nassif, A.B., Talib, M.A., Nasir, Q., Dakalbab, F.M., 2021. Machine learning for anomaly detection: a systematic review. IEEE Access 9, 78658–78700. 

- Oeda, S., Hashimoto, G., 2017. Log-data clustering analysis for dropout prediction in beginner programming classes. Proc. Comput. Sci. 112, 614–621. 

- Park, K.I., 2018. Fundamentals of Probability and Stochastic Processes with Applications to Communications. Springer. 

- Razali, N.M., Wah, Y.B., et al., 2011. Power comparisons of Shapiro-Wilk, KolmogorovSmirnov, Lilliefors and Anderson-Darling tests. J. Stat. Model. Anal. 2, 21–33. 

- Read, T.R., Cressie, N.A., 2012. Goodness-of-Fit Statistics for Discrete Multivariate Data. Springer Science & Business Media. 

- Repetto, M., Duzha, A., Kolodziej, J., 2022. A cybersecurity framework to guarantee reliability and trust for digital service chains–guard. In: 2022 22nd IEEE International Symposium on Cluster, Cloud and Internet Computing (CCGrid). IEEE, pp. 763–766. 

- Shashanka, M., Shen, M.Y., Wang, J., 2016. User and entity behavior analytics for enterprise security. In: 2016 IEEE International Conference on Big Data (Big Data). IEEE, pp. 1867–1874. 

13 

_M. Wurzenberger, G. Höld, M. Landauer et al._ 

_Computers & Security 137 (2024) 103631_ 

- Skopik, F., Wurzenberger, M., Höld, G., Landauer, M., Kuhn, W., 2022. Behavior-based anomaly detection in log data of physical access control systems. IEEE Trans. Dependable Secure Comput. 

- Turner, P., 2020. Critical values for the Durbin-Watson test in large samples. Appl. Econ. Lett. 27, 1495–1499. 

- Wurzenberger, M., Höld, G., Landauer, M., Skopik, F., Kastner, W., 2020. Creating character-based templates for log data to enable security event classification. In: Proceedings of the 15th ACM Asia Conference on Computer and Communications Security, pp. 141–152. 

- Wurzenberger, M., Landauer, M., Skopik, F., Kastner, W., 2019. Aecid-pg: a tree-based log parser generator to enable log analysis. In: 2019 IFIP/IEEE Symposium on Integrated Network and Service Management (IM). IEEE, pp. 7–12. 

- Wurzenberger, M., Skopik, F., Landauer, M., Greitbauer, P., Fiedler, R., Kastner, W., 2017. Incremental clustering for semi-supervised anomaly detection applied on log data. In: Proceedings of the 12th International Conference on Availability, Reliability and Security, pp. 1–6. 

- Xu, W., Huang, L., Fox, A., Patterson, D., Jordan, M.I., 2009. Detecting large-scale system problems by mining console logs. In: Proceedings of the ACM SIGOPS 22nd Symposium on Operating Systems Principles, pp. 117–132. 

- Zhang, J., 2002. Powerful goodness-of-fit tests based on the likelihood ratio. J. R. Stat. Soc., Ser. B, Stat. Methodol. 64, 281–294. 

- Zhao, X., Jiang, Z., Ma, J., 2022. A survey of deep anomaly detection for system logs. In: 2022 International Joint Conference on Neural Networks (IJCNN). IEEE, pp. 1–8. 

- Zhu, J., He, S., Liu, J., He, P., Xie, Q., Zheng, Z., Lyu, M.R., 2019. Tools and benchmarks for automated log parsing. In: 2019 IEEE/ACM 41st International Conference on Software Engineering: Software Engineering in Practice (ICSE-SEIP). IEEE, pp. 121–130. 

**Dr. Markus Wurzenberger** is a senior scientist and project manager at the Austrian Institute of Technology. Since 2014 he is part of the Cyber Security Research Group of AIT’s Center for Digital Safety and Security. His main research interests are log data analysis with focus on anomaly detection and cyber threat 









intelligence (CTI). Markus obtained a PhD in computer science in 2021. In 2015 Markus obtained his master’s degree in Technical Mathematics at the Vienna University of Technology. 

**Georg Höld** , MSc. is a junior scientist at the Austrian Institute of Technology. He received a bachelor’s degree in technical mathematics in 2018 from the Vienna University of Technology. Since then, he is part of the cyber security research program, working on novel anomaly detection methods applicable on log data. In 2022 he obtained a Master’s degree in technical mathematics at TU Vienna in collaboration with the AIT. 

**Dr. Max Landauer** joined the Austrian Institute of Technology in 2017 and is currently employed as a Scientist in the Cyber Security Research Group. His main research interests are anomaly detection, cyber threat intelligence, log data analysis, and cyber security testbeds. Max obtained his master’s degree in Computer Science in 2018 and finished his PhD studies in 2022 at the Vienna University of Technology. 

**Dr. Dr. Florian Skopik** is Head of the Cyber Security Research Program at the Austrian Institute of Technology (AIT) with a team comprising around 30 people. He spent 10+ years in cyber security research, before, and partly in parallel, another 15 years in software development. Nowadays, he coordinates national and large-scale international research projects, as well as the overall research direction of the team. His main interests are centered on critical infrastructure protection, smart grid security, and national cyber security and defense. 

14 

