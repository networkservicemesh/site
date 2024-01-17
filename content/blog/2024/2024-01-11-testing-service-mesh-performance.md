+++
title = "Testing Service Mesh Performance in Multi-Cluster Scenario: Istio vs Kuma vs NSM"
date = 2024-01-11
announce= "This article may be useful for those who are aware of service meshes and probably trying to improve scalability and connectivity between applications in Kubernetes and other container orchestration systems, e.g., adding encryption and authorization for application connections."
showToC = true
+++

# Testing Service Mesh Performance in Multi-Cluster Scenario: Istio vs Kuma vs NSM

## Introduction

This article may be useful for those who are aware of service meshes and probably trying to improve scalability and connectivity between applications in Kubernetes and other container orchestration systems, e.g., adding encryption and authorization for application connections.

Imagine your business is growing, so one Kubernetes cluster gets too much traffic and becomes overloaded, in other words it is no longer enough. As a result, you need more resources and in a short period of time. You also might need to meet new requirements and improve fault tolerance or isolate application resources for security purposes.

Since different service meshes have similar basic functionalities, and most of them support multi-cluster scenarios, they are a useful tool in addressing the described problems.

How do service meshes affect performance? There are [several](https://medium.com/elca-it/service-mesh-performance-evaluation-istio-linkerd-kuma-and-consul-d8a89390d630) [papers](https://layer5.io/resources/service-mesh-performance/analyzing-service-mesh-performance) comparing service mesh performance, but none says much about their application in a multi-cluster scenario, so the purpose of this paper is to provide an objective and reproducible testing process to compare the performance of selected service meshes in a dual cluster scenario. During the testing process, an optimal configuration is to be chosen for each service mesh to avoid a negative impact on the performance.

## Relevance

Many Kubernetes users employ such service meshes as Istio, Kuma or Consul. Since scaling is a mandatory requirement of any modern web application or service that allows one to increase performance under high load, this article covers cross-cluster scaling with different service meshes from the standpoint of their performance.

## Goal

The goal of the article is to assess the performance of different service meshes in the industrial scenarios using more than one cluster.

## Formulation of the Problem

The main problem of such assessment is providing reproducible, consistent and objective tests for service meshes in a multi-cluster topology that exclude any negative factors as an incorrect or non-optimal setup for a specific service mesh, network problems and resource availability. To do so, the following service meshes have been selected:

 - [Istio](https://istio.io/)
 - [Kuma](https://kuma.io/)
 - [NSM (Network Service Mesh)](https://networkservicemesh.io/)

For deployment, the following cluster providers have been chosen:
 - Equinix Metal, a highly performant cluster in terms of its hardware
 - AWS EKS as the most common solution among managed clusters.

## Setup

For each working environment (AWS and Equinix Metal), 2 identical side-by-side clusters have been set up to employ the following testing scenario:
 - One instance of Nginx deployment as a server workload;
 - One instance of [Fortio](https://fortio.org/) deployment as a Nginx client;
 - The client sends requests to the server.

![General deployment diagram](/img/blog/2024/01/11/Fig1.png)
*Figure 1. General deployment diagram*

This method was chosen as a first step in testing the performance of service meshes, and we planned to extend the experiments to more complex scenarios, so this paper covers the first step of our road map. So far, we have accumulated more than 1000 positive runs. About the same number of negative tests have been run to debug the environment and test scripts. The data collected this way enables us to say that the test scenario we have chosen has sufficient reproducibility and stability.

## AWS EKS clusters

The AWS clusters were set up using [eksctl CLI](https://eksctl.io/), each cluster consisting of a single node. The clusters were deployed on m5.2xlarge servers with the following parameters:

 - CPU: 8 vCPUs;
 - Memory: 32 GB RAM;
 - Network: up to 10 Gbps, MTU 1500;
 - Location: us-east-1 zone;
 - Load Balancer: ELB, Elastic Load Balancer.

Find the cluster setup scripts [in the project’s repository](https://github.com/pragmagic/service-mesh-performance-testing/tree/main/cluster-setup).

## Equinix Metal clusters

The Equinix Metal clusters were set using [clusterctl CLI](https://cluster-api.sigs.k8s.io/clusterctl/overview.html), each cluster consisting of 1 control plane and 1 worker node. The clusters were deployed on m5.2xlarge servers with the following parameters:

 - CPU: AMD EPYC 7402P, 24 cores;
 - Memory: 64 GB RAM;
 - Network: 2x10 Gbps network;
 - Location: Dallas;
 - Load Balancer: MetalLB, [provided by Equinix Metal](https://github.com/kubernetes-sigs/cloud-provider-equinix-metal#metallb-from-v0110-to-v0121).

Find the cluster setup scripts [in the project’s repository](https://github.com/pragmagic/service-mesh-performance-testing/tree/main/cluster-setup).

## Istio

We are currently using Istio v. 1.19.3 set up using instructions for [Multi-Primary on different networks](https://istio.io/latest/docs/setup/install/multicluster/multi-primary_multi-network/) installation. The connections are encrypted using [mTLS](https://istio.io/latest/docs/concepts/security/#mutual-tls-authentication). The workloads are connected via the standard [Istio multi-cluster DNS resolution](https://istio.io/latest/docs/ops/deployment/deployment-models/#dns-with-multiple-clusters). The data plane is [based on Envoy proxies](https://istio.io/latest/docs/ops/deployment/architecture/).

Find the deployment files and related deploy scripts in the [Istio folder](https://github.com/pragmagic/service-mesh-performance-testing/tree/main/istio) of the project’s repository.

## Kuma

We are currently using Kuma v.2.4.3 set up as a [Kuma multi-zone scenario](https://kuma.io/docs/2.4.x/production/deployment/multi-zone/) without the Egress component as [instructed](https://kuma.io/docs/2.4.x/production/cp-deployment/multi-zone/) by the Kuma documentation. The connections are encrypted using [mTLS](https://kuma.io/docs/2.4.x/policies/mutual-tls/). The workloads are connected via [Kuma DNS](https://kuma.io/docs/2.4.x/networking/dns/). The data plane is [based on Envoy proxies](https://kuma.io/docs/2.4.x/).

Find the deployment files and related deploy scripts in the [Kuma folder](https://github.com/pragmagic/service-mesh-performance-testing/tree/main/kuma) of the project’s repository.

The Kuma multi-zone scenario requires a separate [global control plane](https://kuma.io/docs/2.4.x/production/deployment/multi-zone/#components-of-a-multi-zone-deployment) to be deployed, which was done as per the instructions from "the Universal on Kubernetes using Helm" tab. However, we modified the scenario to use [in-memory database](https://kuma.io/docs/2.4.x/documentation/configuration/#memory) instead of Postgres. Despite this configuration loses data on restart, it is a great solution for performance testing.

## NSM

We are currently using NSM v. 1.11.1 set up as an [NSM 2-cluster scenario](https://github.com/networkservicemesh/deployments-k8s/tree/release/v1.11.1/examples/interdomain). The connections are encrypted using Wireguard, and the workloads are connected via NSM [vl3 DNS](https://github.com/networkservicemesh/deployments-k8s/tree/release/v1.11.1/examples/features/vl3-dns) in a flat [vl3 network](https://github.com/networkservicemesh/deployments-k8s/tree/release/v1.11.1/examples/features/vl3-dns). The data plane is based on the VPP framework.

NSM’s feature is that it works at the network level, so while other service meshes handle HTTP requests, NSM processes TCP/IP ones. Nevertheless, it provides flexible application communication, encryption and DNS capabilities, in other words, it has all the functionality that is required for this performance testing.

Find the deployment files and related deploy scripts in the [NSM folder](https://github.com/pragmagic/service-mesh-performance-testing/tree/main/nsm) of the project’s repository.

## Testing scenario

The general test script is as follows:

 - Deploy service mesh components, wait for all components to report as ready;
 - Deploy test workloads, wait for all of them to report as ready;
 - Connect to Fortio using the kubectl port-forwarding;
 - Use Fortio REST API to run tests;
 - Run a warm-up test, discard results;
 - Run the test one more time, save results;
 - Delete/cleanup all resources;
 - Iterate all of the above a specified number of times.

Fortio requires you to set a target QPS (queries per second) and either the total amount of queries, so the test duration will vary, or the test duration, so the number of queries will vary. For our scenario the duration was set to 1 minute, which we considered to be enough to capture intermediate performance drops if there were any. Moreover, we experimentally determined that one minute was sufficient to collect enough data to calculate the required percentiles.

During the initial testing, several QPS values had been employed, but for the final test, the QPS was set to be 6000 to get a better representation of maximum performance. All tested systems in all of our test scenarios have demonstrated the performance lower than the target, which is due to the fact we have been running our tests without multithreading with all queries executed in a sequence, meaning we are limited by the latency between client and server.

## Description of testing process

For each test run, the statistics calculated by Fortio are obtained that include such metrics as the average number of requests per second, minimum/average/maximum latency and several latency percentiles. For testing we have 2 environments and 3 service meshes. We use mean positive values for analysis. We check that the sample has no deviations from the mean values.

The following key metrics were selected for comparative analysis of the performance test results:

 - Average QPS, HTTP requests per second;
 - Average latency, ms;
 - 90th percentile, ms;
 - 99th percentile, ms;
 - 99.9th percentile, ms.

Such metrics as the minimum and maximum latencies are excluded, because they can be affected by single outliers. The average latency is interchangeable with the average QPS, but while the first is useful to compare it to the percentiles, the second enables one to understand the overall throughput. The Kubernetes [metrics server](https://github.com/kubernetes-sigs/metrics-server) is used to monitor the container CPU load to make sure that each container in a cluster is either well below the CPU limit or doesn't have a limit at all.

In this paper, we consider the results obtained for 2023-11-14 (AWS EKS) and 2023-11-16 (Equinix Metal). The summarized test results can be found in [this Google Sheet table](https://docs.google.com/spreadsheets/d/10A_UrzczgT2GbzbBoAvTHxYrErfv16JBcH-H2DvTLcw/).

## Results for AWS EKS clusters

The average QPS and latency values for these clusters as well as their latency percentiles are summarized in Table 1 and Fig. 2 and 3: the highest performance was obtained for NSM vl3, the second for Kuma and the third for Istio. For this parameter, the difference between NSM vl3 and Istio was almost 2.7 times and between NSM vl3 and Kuma 1.5 times. What was even more interesting was the difference between Kuma and Istio, which was 1.8 times in favor of Kuma. This was strange because both meshes use Envoy for data transfer, so we had expected them to demonstrate similar results.

The obtained latencies were another metrics worth considering (see Table 1, Figure 3): while Istio and Kuma had similar behavior for the 90th, 99th and 99.9th percentiles (their 90th percentile was close to the average latency, the 99th was significantly higher, and the 99.9th percentile was about 2 times larger than the 99th percentile), NSM vl3 demonstrated another behavior, so its 90th and 99th percentile were close to the average latency, and only the 99.9th percentile exceeded it significantly.

The data for the 90th and 99th percentiles showed that NSM vl3 provided a more stable latency. For NSM vl3, the likelihood to get a query 1.4 times slower than average was 1% and to get a query 3.3 times slower than average 0.1%. For Kuma, this likelihood was for 3.8x- and 8.2x- slower queries, respectively. For Istio, this likelihood was detected for 2.9x- and 5.4x- slower queries.

Hence in AWS EKS, Kuma and NSM significantly outperformed Istio for average QPS and for latency in all percentiles (90, 99, 99.9). Kuma was significantly faster than Istio in terms of average QPS, and but had similar latency behavior for the slowest requests.

| AWS |	QPS | Average latency |	P90 | P99 | P99.9 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Istio | 496.08 | 2.01 | 2.54 | 5.88 | 10.85 |
| Kuma | 886.37 | 1.13 | 1.30 | 4.28 | 9.33 |
| NSM vl3 | 1,332.38 | 0.74 | 0.84 | 1.04 | 2.45 |

*Table 1. Test results for the AWS EKS clusters.*

![AWS EKS average QPS comparison](/img/blog/2024/01/11/Fig2.png)

*Figure 2. Average QPS for the AWS EKS clusters.*

![AWS EKS latencies comparison](/img/blog/2024/01/11/Fig3.png)

*Figure 3. Average latency and latency percentiles for the AWS EKS clusters.*

## Results for Equinix Metal clusters

The average QPS and latency values for these clusters as well as their latency percentiles are summarized in Table 2 and Fig. 4 and 5. The average QPS value was highest for NSM vl3, so the difference between NSM vl3 and Istio was 2.7 times, and between NSM vl3 and Kuma 1.13 times. Kuma turned out to be 2.4 times faster than Istio. If compared to the AWS EKS environment, the relative difference between NSM vl3 and Istio maintained in the Equinix Metal clusters as well, while Kuma reduced its gap with NSM vl3, and increased the one with Istio.

Another interesting observation was that Kuma and NSM vl3 had similar percentile statistics: their 90th and 99th percentiles increased weakly if compared to the average latency, and the 99.9th was significantly higher than the 99th. Istio had a higher average latency, but it varied little up to the 99.9th percentile (see Table 2, Figure 5).

Hence in Equinix Metal, Kuma and NSM significantly outperformed Istio both for average QPS and for latency in the 90th and 99th percentiles. Kuma and NSM had similar performance for average QPS and latency in the 90th and 99th percentiles, with a slight advantage towards NSM. As for the 99.9th percentile, Kuma was more likely to have slow queries (2.5 ms against the 0.2-ms average).

| Packet | QPS | Average latency | P90 | P99 | P99.9 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Istio | 1,864.44 | 0.53 | 0.57 | 0.68 | 0.95 |
| Kuma | 4,538.77 | 0.22 | 0.25 | 0.29 | 2.55 |
| NSM vl3 | 5,148.70 | 0.19 | 0.24 | 0.29 | 1.04 |

*Table 2. Test results for the Equinix Metal clusters.*

![Equinix Metal average QPS comparison](/img/blog/2024/01/11/Fig4.png)

*Figure 4. Average QPS for the Equinix Metal clusters.*

![Equinix Metal latencies comparison](/img/blog/2024/01/11/Fig5.png)

*Figure 5. Average latency and latency percentiles for the Equinix Metal clusters.*

## Conclusion

The tests found big performance differences for the service meshes investigated in cross-cluster scenarios. In both testing environments, NSM vl3 showed the highest average QPS for cross-cluster connectivity scenarios. In comparison with Kuma the difference was 1.5 times on AWS and 1.13 times on Equinix Metal, in comparison with Istio the difference was 2.7 times in both environments. Kuma turned out to be 1.8 times faster than Istio in AWS, and 2.4 times faster in Equinix Metal for cross-cluster connectivity scenarios. This significant difference became a surprise to us, since both meshes use Envoy for data transfer, so we had expected their performances would be similar. Further research is required to understand the reasons for this difference.

Kuma’s better relative performance in the Equinix Metal environment may be explained by the different technologies for providing external services, but this assumption also requires additional investigation. To do so, we plan to add a heavy load test scenario to test our hypotheses about the relationship between performance and environment.

## About Us

We are developers at Pragmagic Inc. with sufficient experience in implementing CNCF projects.
Your feedback, whether positive or negative, is deeply appreciated, so feel free to contact us via nsm@pragmagic.io.

## Authors

 - Danil Uzlov, Software Engineer at Pragmagic Inc, https://pragmagic.io/ , nsm@pragmagic.io
 - Denis Tingaikin, Technical Lead at Pragmagic Inc, https://pragmagic.io/, nsm@pragmagic.io
 - Daniil Efremov, Director of Engineering at Pragmagic Inc, https://pragmagic.io/, nsm@pragmagic.io
 