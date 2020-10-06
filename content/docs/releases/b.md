+++
title = "Borealis release v0.2.0"
weight = 1
date = "2019-11-27"
+++

NSM is released through a set of helm charts, which are easily deployable in your Kubernetes cluster:

```bash
helm repo add nsm https://helm.nsm.dev/
helm install nsm/nsm
```

*NOTE: NSM v0.2.0 was released against Helm 2, other version have not been tested.*

Please follow the [Quickstart Guide](https://github.com/networkservicemesh/networkservicemesh/blob/release-0.2/docs/guide-quickstart.md) for more details.

There are also [Examples](https://github.com/networkservicemesh/examples/tree/release-0.2) that illustrate the usage of NSM in more complex scenarios.

# Kubernetes Compatibility
NSM is extremely insensitive to changes in Kubernetes, and as such is generally expected to work with post 1.11 versions of Kubernetes
without issue.

NSM v0.2.0 has been successfully integration tested with Kubernetes versions:

- 1.12.10
- 1.13.12
- 1.14.10
- 1.15.11
- 1.16.2, 1.16.15
- 1.17.11
- 1.18.8
- 1.19.0

Note: Some Kubernetes versions listed here are more recent than NSM v0.2.0 because NSM v0.2.0 has been tested with
new Kubernetes versions as they have been released to verify continued compatibility.

# Changes since version 0.1.0

v0.2.0 major themes:

- [Interdomain](#interdomain)
- [DNS](#dns)
- [Security](#security)
- [Network Service Endpoint Developer Improvements](#network-service-endpoint-developer-improvements)
- [Testing](#testing)

## Interdomain

In version 0.1.0 (Andromeda) Network Service Mesh supported providing per-Pod Network Services within a single cluster:
![IntraDomain](/img/releases/borealis/intradomain.png)

In version 0.2.0 (Borealis) Network Service Mesh introduces interdomain support, allowing a Network Service to span
multiple clusters:
![InterDomain](/img/releases/borealis/interdomain.png)

By default, each cluster in Network Service Mesh has a "Network Service Registry Domain" associated with it.
Unless other wise specified, Network Service Endpoint Pods (NSEs) in that cluster register in that domain, and 
Pods seeking to connect to a Network Service (NS) are connected to Network Services in that domain.

With the introduction of interdomain, an NSE in one cluster may register with *any* "Network Service Registry Domain"
including one in a different cluster or even a 'floating' domain not associated with any cluster.

Likewise, a Pod can connect to a Network Service that is registered in a different domain.  The introduction of 
interdomain fulfills the Network Service Mesh promise of decoupling 'where' a Pod is running from what Network
Services it may consume.

Consumption is straightforward and by name, with an interdomain Network Service specifiable as:

```
${ns name}@${network service domain name}
``` 

For example: ```secure-intranet-connectivity@yoyodyne.com```

Notably, while the default implementation of interdomain utilizes DNS SRV records to allow location of the Network Service
Registries for a given domain, that is an implementation detail.  Network Service Registry domains do not necessarily
have to correspond to DNS domains.

## DNS

When a Pod connects to a Network Service, a vWire is plugged into that Pod,typically in the form of an additional interface,
with non-conflicting-with-the-cluster routes indicating what traffic should go to the Network Service.

Developers don't generally think in IP addresses, they think in DNS domain names.

In version 0.2.0 each Network Service may optionally provide information on DNS servers for resolution that are accessible
*via* the vWire for that Network Service.  Network Service Mesh provides 'parallel' DNS resolution across the K8s clusters
DNS and the DNS of each Network Service (if provided) using a sidecar and the 
CoreDNS [Fanout Plugin](https://github.com/networkservicemesh/fanout/).

![DNS Fanout](/img/releases/borealis/dns.png)

In this way DNS that is private (not available on the public internet)can be provided *for a Network Service* without disturbing the normal DNS 
resolution within the cluster.


## Security
Version 0.2.0 supports Spiffe/Spire support for workload identities, paving the way for sophisticated policies governing
admission of a Pod or workload to a Network Service.

## Network Service Endpoint Developer Improvements

Network Service Mesh has multiple constituencies:

1.  **Application Developers** - who simply want the simplest path from what they want to having it
2.  **Network Service Endpoint Developers** - who write the NSEs that provide the Network Services
3.  **Operators** - who operate the NSM infrastructure (and often the K8s clusters).  Note: App Devs are often also 
the operators, so operations must be very very simple.

Most of our focus has been on Application Developers and Operators, but NSE Developers are also important to the growth
of the NSM ecosystem.  Several improvements have been made to make it easier to write NSEs.

### API simplification
The number and complexity of APIs needed for development is a key factor to the cognitive load involved in successful
development.  Network Service Mesh strives to keep it's APIs simple and small in number.

Network Service Mesh previously had two APIs for requesting, closing, and monitoring a connection from a Client to and 
Endpoint, one for local mechanisms like kernel interface, memif, etc and one for remote mechanisms like vxlan, srv6, 
gre, etc.  These two APIs were almost semantically identical, but for the local/remote mechanism split.  
These were simplified down to a single API.

### Shift to a chain oriented sdk

Keeping APIs simple and few is key to rapid development.  A Network Service Endpoint (NSE) has to supply a very small
number of simple GRPC APIs to the outside world to function, but may have to carry out a number of internal
activities to meet those requests.

The Network Service Mesh SDK for writing NSEs was adapted to allow the 'chaining' together of a list of implementations
of those APIs which receive an incoming call, do their piece of the work, and then make an outgoing call *to exactly
the same API*.  This allows small bits of functionality to be written as 'chain elements' and then reused to construct
a wide array of NSEs.  An NSE author may only need to write a few 'chain elements' to do work that has not been done
before and reuse existing chain elements to build out their NSE. 

### Internal jaeger tracing for chains

As part of the shift to chain a chain oriented SDK, the option to allow jaeger tracing *through* those internal chain
elements was added, allowing for much more detailed tracing not only between separate components, but *within* those
components.

### Examples factored out into examples/ repo

Network Service Mesh's 'example' NSEs where factored out of the main repo and into an 
[examples repo](https://github.com/networkservicemesh/examples)  to allow for easier consumption and contribution.

## Testing
### Increased testing
Network Service Mesh runs PR by PR testing on:

1.  Vanilla Kubernetes on bare metal on Packet
2.  GKE
3.  EKS
4.  AKS

Testing increased from 269 tests in v0.1.0 to 458 tests in v0.2.0.

### Introduction of cloudtest
[cloudtest](https://github.com/networkservicemesh/cloudtest) is a multi-cloud testing tool that allows scheduling 
tests across multiple cluster instances in  public clouds.

It is extremely persistent, working around a number of small instabilities in various clouds abilities to 
reliably provide new clusters on demand.  This has allowed a vast expansion of testing.
