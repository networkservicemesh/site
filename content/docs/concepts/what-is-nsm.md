+++
title = "What is Network Service Mesh?"
weight = 1
image = "/img/concepts/what-is-nsm.jpg"
publishDate = "2018-10-10"
description = "A guide to core concepts"
+++

Network Service Mesh (**NSM**) is a novel approach to solving complicated [L2](https://en.wikipedia.org/wiki/Data_link_layer)/[L3](https://en.wikipedia.org/wiki/Network_layer) use cases in [Kubernetes](https://kubernetes.io) that are tricky to address within the existing [Kubernetes Network Model](https://caylent.com/kubernetes-networking-model/). Inspired by [Istio](https://istio.io), Network Service Mesh maps the concept of a service mesh to L2/L3 payloads.

In this document, we cover [what Network Service Mesh is](#what) and [which problems it solves](#problem-statement) using a series of examples:

1. [Request access to an external interface](#request)
1. [Connecting two services](#services)
1. [Hooking up an external device](#external-device)
1. [Creating an L2 bridge service](#bridge-service)
1. [Creating a distributed bridge domain](#bridge-domain)


# Problem Statement

Multifaceted networks such as telcos, ISPs, and advanced enterprise networks are rearchitecting their solutions with the advent of a range of new networking technologies, including:

* [Network function virtualization](https://en.wikipedia.org/wiki/Network_function_virtualization) (**NFV**)
* [5G networks](https://en.wikipedia.org/wiki/5G)
* [Edge computing](https://www.networkworld.com/article/3224893/what-is-edge-computing-and-how-it-s-changing-the-network.html)
* [Internet of Things](https://www.sap.com/trends/internet-of-things.html) (aka **IoT**) devices

Each of these technologies brings a significant increase in the total number of connected devices, available bandwidth per device, and cloud service load.

Operators of multifaceted networks with advanced L2/L3 use cases currently find container networking solutions ill suited for their next-generation architecture. Lack of support for advanced networking use cases is actively excluding multiple industries from adopting the new cloud native paradigm.

Current-generation container networking technologies primarily focus on homogenous, low-latency, high-throughput, immutably deployed, Ethernet/IP, enterprise-centric application clusters. These assumptions do not fit with the needs of telcos, ISPs, and advanced enterprise networks.

Finally, current cloud native solutions allow for dynamic deployment configuration, but the realization of that deployment is mostly immutable. [Container Networking Interface](https://github.com/containernetworking/cni) (CNI) concerns itself only with network allocation during a Pod's initialization and deletion phases.

The current pattern works for wiring monolithic Virtual Network Functions (**VNF**s) together but is antithetical to the cloud native paradigm. Merely translating current existing monolithic VNF patterns into cloud native equivalents does not inherently provide the scalability, resiliency, manageability that cloud native adopters have come to expect. In fact, translating current models may result in a *higher* total cost of ownership due to the cost of infrastructure refactoring, testing, and training while simultaneously reducing isolation and creating a larger attack surface.

Realizing the full advantage of the cloud native paradigm for NFV use cases requires satisfying at least two conditions:

* VNFs must be modified or rewritten to mirror the architecture found in [12-factor apps](https://12factor.net/)
* An API should exist that allows the VNF to specify its networking intent dynamically and through an abstract API

When these two conditions are met, NFV apps may be capable of horizontal scaling while making efficient use of networking resources. When a [software-defined network](https://www.opennetworking.org/sdn-definition) (**SDN**) is involved, the development of NFV apps and SDN may also occur independently due to loose coupling.

# What is Network Service Mesh? {#what}

NSM adds the following properties to networking in Kubernetes:

{{< features >}}

These goals are accomplished using a simple set of APIs designed to facilitate connectivity either between containers running services or with an external endpoint. New connections negotiate their connection properties. These properties include but are not limited to:

* The type of network interface, for example Linux Interface, MemIf, or vhost-user
* The payload type, for example Ethernet, IP, MPLS, or L2TP

## Example 1 — Request for an interface {#request}

The simplest NSM example is requesting access to an external interface, for example a radio network service. Consider a Kubernetes Pod that requires access to a network interface. The interface is configured and plumbed into the Pod. This scenario may occur either through a dynamic call from a process within the Pod or from an [init container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) that sets up the radio service before the main Pod container.

{{< figure src="/img/what-is-nsm/interface.png" caption="Adding a radio service" width="70" >}}

NSM also interacts with the [Kubernetes Device Plugin API](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/) (DPAPI). In this scenario, we interact with a radio service with a limited number of interfaces. Another use case with a similar pattern is [single-root input/output virtualization](https://en.wikipedia.org/wiki/Single-root_input/output_virtualization) (SR-IOV).

For example, suppose we have a set of SR-IOV interfaces managed by DPAPI. The Pod spec would request a device using the `limits` label:

```yaml
spec:
  containers:
    - name: "..."
      image: "..."
      resources:
        limits:
          sriov.nsm.xyz.io: 1
```

When the Pod starts, Kubernetes injects an environment variable into the Pod. In this scenario, it is `sriov_$(DEVICE_ID)`. When the Pod connects, the connection claims `sriov_$(DEVICE_ID)`. On success, NSM injects the DPAPI-managed SR-IOV interface into the container.

In both examples, NSM uses DPAPI to ensure device availability while injecting an interface into the Pod.
 
## Example 2 — Connecting two services {#services}

Consider an endpoint which requests a tunnel to a network service through an SDN. The network service, SDN, and client negotiate with each other the parameters of the tunnel. Suppose the client is only able to communicate over a VXLAN tunnel while the network service provides VXLAN and GRE. The negotiation results in a VXLAN tunnel.

Highlighting the dynamic properties of this negotiation is essential. For example, it is possible to negotiate for a shared memory interface if all components support it and both Pods are on the same Node. If the two Pods are on separate Nodes, a shared memory instance would be considered unsupported, and another approach would be selected instead.

{{< figure src="/img/what-is-nsm/two-pods.png" caption="Connecting two services" width="70" >}}

## Example 3 — External device {#external-device}

Hooking up an external device is similar to hooking up two network services. The external Network Service Mesh (**eNSM**) exposes the device as a network service and is responsible for synchronizing and configuring the device. The eNSM negotiates the connection properties on behalf of the external device and configures the device with the resolved properties once the negotiation is complete. 

{{< figure src="/img/what-is-nsm/external-device.png" caption="Connecting an external device using an eNSM" width="70" >}}

## Example 4 — L2 bridge service {#bridge-service}

NSM exposes the bridging CNF through a bridge service. The bridge service handles requests to connect to the bridge using the standard NSM patterns as demonstrated in the previous examples.

In this scenario, the bridge service is a network service that runs in a pod. The bridge service receives the connection requests and configures the data plane to connect the pod to the bridging CNF.

{{< figure src="/img/what-is-nsm/bridge.png" caption="Connecting pods to a bridge" width="70" >}}

## Example 5 — Distributed bridge domain {#bridge-domain}

The distributed bridge domain example is similar to the bridge service shown in [Example 4](#bridge-service). However, instead of connecting Pods to a single bridge, they are connected to multiple bridges.

The SDN(s) manage and provide the Pod-to-Pod, and bridge-to-bridge interconnects. NSM considers the interconnection data path out of the scope of its responsibilities.

One thing to note is that Pods still receive their Kubernetes networking interface from CNI. This approach is designed to interoperate with existing Kubernetes patterns while providing additional capabilities when necessary.

{{< figure src="/img/what-is-nsm/multi-bridge-overview.png" caption="Overview of Distributed Bridge Domain" width="70" >}}

{{< figure src="/img/what-is-nsm/multi-bridge.png" caption="Connecting a Pod to multiple bridges" width="70" >}}
