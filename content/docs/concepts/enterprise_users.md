+++
title = "NSM Concepts"
description = "for Enterprise Users"
weight = 1
date = "2021-06-21"
+++
## The Problem

### Problem Statement

How do you enable workloads to collaborate to produce an App communication independent of where those workloads are running?

### Background
Historically, workloads have been run in some sort of Runtime Domain:

![K8s Runtime Domain](/img/concepts/enterprise/3x1/k8s_runtime_domain.svg)
![VM Runtime Domain](/img/concepts/enterprise/3x1/vm_runtime_domain.svg)
![DC Runtime Domain](/img/concepts/enterprise/3x1/dc_runtime_domain.svg)

A Runtime Domain is a system on which workloads are run.  It's fundamentally a computing domain.

Each of those Runtime Domains has brought along exactly one Connectivity Domain:

![K8s Connectivity Domain](/img/concepts/enterprise/3x1/k8s_connectivity_domain.svg)
![VM Connectivity Domain](/img/concepts/enterprise/3x1/vm_connectivity_domain.svg)
![DC Connectivity Domain](/img/concepts/enterprise/3x1/dc_connectivity_domain.svg)

Each workload has a single option of what connectivity domain to be connected to, and only
workloads in a given runtime domain could be part of its connectivity domain.

In short: Connectivity Domains are Strongly Coupled to Runtime Domains.

A central tenant of [Cloud Native](https://github.com/cncf/toc/blob/main/DEFINITION.md) is Loose Coupling.  In a Loosely Coupled system, the ability for each workload to receive service from alternative providers is preserved.

What Runtime Domain a workload is running in is a [non-sequitur](https://en.wikipedia.org/wiki/Non_sequitur_(literary_device)) to its communications needs.  Workloads that are part of
the same App need Connectivity between each other no matter where they are running.

One example of this problem is connectivity between workloads running in multiple K8s Clusters in a 
multi-cloud/hybrid cloud environment:

![K8s MultiCluster](/img/concepts/enterprise/k8s_multi_cluster.svg)

How do workloads communicate independently of where they are running?

It's not just a problem of a cluster to cluster communication.  In the diagram below: 

- The {{<backgroundcolor "#FF9999" >}}Red{{< /backgroundcolor >}} Pods need to communicate with each other
- The {{<backgroundcolor "#CCFF99" >}}Green{{< /backgroundcolor >}} Pods need to communicate with each other
- The {{<backgroundcolor "#FF9999" >}}Red{{< /backgroundcolor >}} Pod with the {{<backgroundcolor "#CCFF99" >}}Green{{< /backgroundcolor >}} outline needs to communicate with both the other {{<backgroundcolor "#FF9999" >}}Red{{< /backgroundcolor >}} Pods *and* the other {{<backgroundcolor "#CCFF99" >}}Green{{< /backgroundcolor >}} Pods
- Pods in different clusters that are neither {{<backgroundcolor "#FF9999" >}}Red{{< /backgroundcolor >}} nor {{<backgroundcolor "#CCFF99" >}}Green{{< /backgroundcolor >}} should not be communicating with each other.

![K8s MultiCluster2](/img/concepts/enterprise/k8s_multi_cluster_2.svg)

## The NSM Solution

Network Service Mesh allows individual workloads, where ever they are running to connect securely to Network Service(s) that
are independent of where they run:

![NSM Solution](/img/concepts/enterprise/nsm_solution.svg)

The Kubernetes CNI of your choice provides intra-cluster networking continues for every Pod.  Network Service Mesh does not require you to replace
your CNI, nor does it interfere in any way with what you are accustomed to getting from your CNI for intra-cluster networking.

NSM is architecturally independent of the Runtime Domain.  While it supports K8s, it is not limited to it:

![NSM Solution2](/img/concepts/enterprise/nsm_solution_2.svg)

## NSM and Traditional Service Mesh

Network Service Mesh is complementary to traditional Service Meshes like Linkerd, Istio, Kuma, and Consul.

### Payloads
Traditional Service Meshes predominantly focus on L7 payloads like HTTPS.  If a workload sends an HTTPS message, meshes only guarantee
that the HTTPS message itself gets to the other side and the HTTPS response gets back to the workload.  In the intervening process
the ethernet headers, IP headers, and even the TCP connection may have been stripped away and replaced.  The payload being transported
across the Mesh truly is the L7 HTTPS message.

Network Service Mesh provides a similar service for transporting payloads that are IP Packets.
This can be particularly effective for certain kinds of legacy workloads, like DBs, that are using bespoke protocols
for replication over IP:

![DB Replication](/img/concepts/enterprise/db_replication.svg)

### Better Together

A Traditional Service Mesh itself can be viewed as a Network Service.  Network Service Mesh can be used to connect a workload
to multiple 'Service Mesh' Network Services that are not associated with the local cluster running the workload.

![Traditional Service Mesh](/img/concepts/enterprise/traditional_service_mesh.svg)

## Cross Company Network Services

Because Network Service Mesh decouples Network Services from the underlying Runtime Domain, it allows workloads from multiple companies
connected to a single shared Network Service Mesh to collaborate with specific workloads from those companies without
having to expose the entire Runtime domain in which those workloads run:

![Multi Corp](/img/concepts/enterprise/multi-corp.svg)

## NSM and Zero Trust

The recent [White House Executive Order on Cyber Security](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/) says
of Zero Trust:

> In essence, a Zero Trust Architecture allows users full access but only to the bare minimum they need to perform their jobs.  If a device is compromised, zero trust can ensure that damage is contained.

This is the heart and soul of Network Service Mesh.  Workloads can be connected to small highly granular Network Services that only involve
their immediate collaborators for a particular purpose (like DB replication).  Because Network Service Mesh authentication uses the same Spiffe ID that the 
workloads themselves use to communicate at L7, the auditability of the system based on a cryptographic identity extends from L3-L7.
