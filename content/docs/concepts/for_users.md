+++
title = "For Users"
weight = 1
date = "2021-06-21"
description = "A guide to core concepts"
+++

## Intended Audience
This page provides a conceptual summary of Network Service Mesh (**NSM**) as it appears to users of NSM.  
Users of NSM are often application developers.

## The Problem

### Background
Historically, workloads have been run in some sort of Runtime Domain:

![K8s Runtime Domain](/img/concepts/k8s_runtime_domain.svg?svg-warning=0)
![VM Runtime Domain](/img/concepts/vm_runtime_domain.svg)

and each of those Runtime Domains have brought along exactly one Connectivity Domain:

![K8s Connectivity Domain](/img/concepts/k8s_connectivity_domain.svg)
![VM Connectivity Domain](/img/concepts/vm_connectivity_domain.svg)

Each workload had a single option (possibly with nerd knobs) of what connectivity domain to be connected to, and only
workloads in a given runtime domain could be part of its connectivity domain.

In short: Connectivity Domains are strongly coupled to Runtime Domains.

A central tenant of [Cloud Native](https://github.com/cncf/toc/blob/main/DEFINITION.md) is Loose Coupling.

What Runtime Domain a workload is running in is a [non-sequitur](https://en.wikipedia.org/wiki/Non_sequitur_(literary_device)) to its communications needs.  Workloads that are part of
the same App need Connectivity between each other no matter where they are running.

One example of this problem is connectivity between workloads running in multiple K8s Clusters in a 
multi-cloud/hybrid cloud environment:

![K8s MultiCluster](/img/concepts/k8s_multi_cluster.svg)

### Problem Statement

How do you insure that the workloads collaborating together to produce an App have exactly the Connectivity, Observability, and Security
between them that they need independent of where those workloads are running?

## The NSM Solution

Network Service Mesh allows individual workloads, where ever they are running to connect securely to Network Service(s) specific to the
Connectivity, Security, and Observability they need with other workloads in their application:

![NSM Solution](/img/concepts/nsm_solution.svg)

Kubernetes CNI provides intra-cluster networking continues for every Pod as before.

Even more broadly, NSM is architectually independent of the runtime environment.  While it supports K8s, it is not limited to it:

![NSM Solution2](/img/concepts/nsm_solution_2.svg)
