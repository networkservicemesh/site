+++
title = "NSM in K8s"
weight = 4
date = "2021-06-21"
+++

## Kubernetes Networking is IntraCluster

Kubernetes Networking provides a simple, useful Networking model for Pods/Services to communicate intra-cluster.

![IntraCluster](/img/concepts/nsmk8s/intra-cluster.svg)

Additionally, various kinds of other communication can be provided at the 'Edge' of the cluster.

![ClusterEdge](/img/concepts/nsmk8s/cluster-edge.svg)

Network Service Mesh enables individual workloads to have their own per-workload 'Edge'.

![Network Service Edge](/img/concepts/nsmk8s/ns-edge.svg)

## Adding Network Service(s) to a Pod
In Kubernetes, any Pod can add a Network Service using an annotation:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  annotations:
    networkservicemesh.io: "kernel://my-networkservice-1"
spec:
  ...
```

```yaml
  annotations:
    networkservicemesh.io: "kernel://my-networkservice-1"
```

simply requests that the Pod have kernel interface injected into its kernel network namespace that is connected to
a Network Service named "my-networkservice-1".

Optionally, the kernel interface name "nsm-1" can be requested:

```yaml
  annotations:
    networkservicemesh.io: "kernel://my-networkservice-1/nsm-1"
```

Or decorate the request with labels

- app: foo
- version: v1.1

```yaml
  annotations:
    networkservicemesh.io: "kernel://my-networkservice-1/nsm-1?app=foo&version=v1.1"
```

Multiple Network Services can be requested as a comma-separated list:

```yaml
  annotations:
    networkservicemesh.io: "kernel://my-networkservice-1/nsm-1?app=foo&version=v1.1, kernel://my-networkservice-2"
```

## IPAM and Routing

For each Network Service connected to a Pod, a new kernel interface will be injected into the Pod, with an IP address 
assigned by the {{<color "#008A00" >}}Endpoint{{< /color >}} providing the Network Service, and optional routes
indicating which IPs should be routed from the Pod to the Network Service.

In order to avoid IP collisions, NSM prevents the use of IP addresses or routes from Prefixes in use in the cluster.

## DNS

A Network Service may optionally provide DNS service *for* that Network Service.  The DNS provided by a Network Service
may be scoped to only to be consulted for certain DNS domains and/or subdomains.

When a Pod does a DNS query, it is fanned out in parallel to

- The Kubernetes Cluster DNS (over the CNI interface in the Pod)
- Any other Network Service to which the Pod is connected that is providing DNS service for that DNS domain.  

The first positive DNS response received is the one returned to the Pod.
