+++
title = "Enterprise Users"
weight = 1
date = "2021-06-21"
+++
## The Problem

### Background
Historically, workloads have been run in some sort of Runtime Domain:

![K8s Runtime Domain](/img/concepts/k8s_runtime_domain.svg#3x1)
![VM Runtime Domain](/img/concepts/vm_runtime_domain.svg#3x1)
![DC Runtime Domain](/img/concepts/dc_runtime_domain.svg#3x1)

A Runtime Domain is a system on which workloads are run.  It's fundamentally a compute domain.

Each of those Runtime Domains have brought along exactly one Connectivity Domain:

![K8s Connectivity Domain](/img/concepts/k8s_connectivity_domain.svg#3x1)
![VM Connectivity Domain](/img/concepts/vm_connectivity_domain.svg#3x1)
![DC Connectivity Domain](/img/concepts/dc_connectivity_domain.svg#3x1)

Each workload has a single option (possibly with nerd knobs) of what connectivity domain to be connected to, and only
workloads in a given runtime domain could be part of its connectivity domain.

In short: Connectivity Domains are strongly coupled to Runtime Domains.

A central tenant of [Cloud Native](https://github.com/cncf/toc/blob/main/DEFINITION.md) is Loose Coupling.

What Runtime Domain a workload is running in is a [non-sequitur](https://en.wikipedia.org/wiki/Non_sequitur_(literary_device)) to its communications needs.  Workloads that are part of
the same App need Connectivity between each other no matter where they are running.

One example of this problem is connectivity between workloads running in multiple K8s Clusters in a 
multi-cloud/hybrid cloud environment:

![K8s MultiCluster](/img/concepts/k8s_multi_cluster.svg)

How do workloads communicate independent of where they are running?

It's not just a problem of cluster to cluster communication.  In the diagram below: 
- The Red Pods need to communicate with each other
- The Greed Pods need to communicate with each other
- The Red Pod with the Green outline needs to communicate with both the other Red Pods *and* the other Green Pods
- Pods in different clusters that are neither Red nor Green should be communicating with each other.

![K8s MultiCluster2](/img/concepts/k8s_multi_cluster_2.svg)


### Problem Statement

How do you enable workloads collaborating together to produce an App communicate independent of where those workloads are running?

## The NSM Solution

Network Service Mesh allows individual workloads, where ever they are running to connect securely to Network Service(s) that
are independent of where they run:

![NSM Solution](/img/concepts/nsm_solution.svg)

The Kubernetes CNI of your choice provides intra-cluster networking continues for every Pod.  Network Service Mesh does not require you to replace
your CNI, nor does it interfere in any way with what you are accustomed to getting from your CNI for intra-cluster networking.

NSM is architecturally independent of the Runtime Domain.  While it supports K8s, it is not limited to it:

![NSM Solution2](/img/concepts/nsm_solution_2.svg)

## NSM and Traditional Service Mesh

Network Service Mesh is complementary to traditional Service Meshes like Linkerd, Istio, Kuma, and Consul.

### Payloads
Traditional Service Meshes predominantly focus on L7 payloads like HTTPS.  If a workload send an HTTPS message, they only guarantee
that the HTTPS message itself gets to the other side and the HTTPS response gets back to the workload.  In the intervening process
the ethernet headers, ip headers, and even the TCP connection may have been stripped away and replaced.  The payload being tranported
across the Mesh truly is the L7 HTTPS message.

Network Service Mesh provides a similar service for transporting payloads that are IP Packets.
This can be particularly effective for certain kinds of legacy workloads, like DBs, that are using bespoke protocols
for replication over IP:

![DB Replication](/img/concepts/db_replication.svg)

### Better Together

A Traditional Service Mesh itself can be viewed as a Network Service.  Network Service Mesh can be used to connect a workload
to multiple 'Service Mesh' Network Services that are not associated with the local cluster running the workload.

![Traditional Service Mesh](/img/concepts/traditional_service_mesh.svg)

## Cross Company Network Services

Because Network Service Mesh decouples Network Services from the underlying Runtime Domain, it is possible to workloads from multiple companies
connected to a single shared Network Service Mesh to allow collaboration between specific workloads from those companies without
having to expose the entire Runtime domain in which those workloads run:

![Multi Corp](/img/concepts/multi_corp.svg)

## NSM and Zero Trust

The resent [White House Executive Order on Cyber Security](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/) says
of Zero Trust:

> In essence, a Zero Trust Architecture allows users full access but only to the bare minimum they need to perform their jobs.  If a device is compromised, zero trust can ensure that the damage is contained.

This is the heart and soul of Network Service Mesh.  Workloads can be connected to small highly granular Network Services that only involve
their immediate collaborators for a particular purpose (like DB replication).  Because Network Service Mesh authentication uses the same Spiffe ID that the 
workloads themselves use to communicate at L7, the auditability of the system based on a cryptographic identity extends from L3-L7.
