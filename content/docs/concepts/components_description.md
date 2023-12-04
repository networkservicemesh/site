+++
title = "Description of NSM components"
weight = 4
summary = "Network Service Mesh (NSM): The Hybrid/Multi-cloud IP Service Mesh"
+++

# NSM Services
1. **NetworkService** - used for requesting and closing connections between clients and endpoints.

```proto
service NetworkService {
    rpc Request(NetworkServiceRequest) returns (connection.Connection);
    rpc Close(connection.Connection) returns (google.protobuf.Empty);
}
```

2. **Registry** - used for registering and unregistering **Network Services** and **Network Service Endpoints** in NSM, as well as for searching

```proto
service NetworkServiceEndpointRegistry {
    rpc Register (NetworkServiceEndpoint) returns (NetworkServiceEndpoint);
    rpc Find (NetworkServiceEndpointQuery) returns (stream NetworkServiceEndpointResponse);
    rpc Unregister (NetworkServiceEndpoint) returns (google.protobuf.Empty);
}

service NetworkServiceRegistry {
    rpc Register (NetworkService) returns (NetworkService);
    rpc Find (NetworkServiceQuery) returns (stream NetworkServiceResponse);
    rpc Unregister (NetworkService) returns (google.protobuf.Empty);
}
```

3. **MonitorConnections** - used for monitoring connectons using specific selectors.

```proto
service MonitorConnection {
    rpc MonitorConnections(MonitorScopeSelector) returns (stream ConnectionEvent);
}
```

# **Network Service** Manager (NSMGR)

**Network Service Manager** is one of the key components of NSM, which is responsible for discovering **Network Services** and **Network Service Endpoints** and processing requests from clients. It must be located on the same machine as the NSM client in order to provide it with a connection to the NSM network. It can also serve as a registry if there is no real registry.

**Image**: https://github.com/networkservicemesh/cmd-nsmgr

**Implements**:
1. NetworkService
2. Registry
3. MonitorConnection

**Responsibilities**:
1. NetworkService discovery
2. Forwarder discovery
3. Storage for valid connections from clients
4. Provides access to the network namespace of the clients and endpoints for the forwarder
5. Can serve as a registry (optional) 

# Forwarder VPP
**Forwarder VPP** is one of the key components of NSM. Its main responsibility is to create network topoligies requested by NSM clients.  **Forwarder VPP** uses [**VPP Framework**](https://s3-docs.fd.io/vpp/24.02/) to create network topologies.

**Image**: https://github.com/networkservicemesh/cmd-forwader-vpp

**Implements**:
1. NetworkService

**Responsibilities**:
1. Creates client-side and endpoint-side interfaces
2. Chooses mechanism types for connections between clients and endpoints
3. Collects stats from interfaces
4. Load-balancing for endpoints beloning to the same **Network Service**
5. Works with `ConnectionContext`
```proto
message ConnectionContext {
    IPContext ip_context = 1;
    DNSContext dns_context = 2;
    EthernetContext ethernet_context = 3;
    map<string, string> extra_context = 4;
    uint32 MTU = 5;
}
```

# Forwarder OVS
**Forwarder OVS** is an analogue of **Forwarder VPP**, which uses **Open vSwitch (OVS)** as a backend for creating network topologies.

**Image**: https://github.com/networkservicemesh/cmd-forwarder-ovs

# Registry
**Registry** is used as a storage for **Network Service** and **Network Service Endpoint** entries.

**Image**: https://github.com/networkservicemesh/cmd-nsmgr

**Implements**:
1.  Registry

**Responsibilities**:
1. Stores **Network Service** and **Network Service Endpoint** entries
2. Calculates expirationo time for **Network Service Endpoints** and deletes expired ones

# Registry proxy DNS
**Registry proxy DNS** resolves IPs of remote registries in other NSM domains and proxies **Register**, **Unregister** and **Find** requests to those registries.

**Image**: https://github.com/networkservicemesh/cmd-registry-proxy-dns

**Implements**:
1.  Registry

**Responsibilities**:
1. Resolves IPs of remote registries using names of **Network Services** and **Network Service Endpoints**
2. Changes **Network Service Endpoint** URLs to DNS name of **Network Service Manager Proxy** on **Register**, **Unregister** and **Find** requests

# Network Service Manager Proxy (NSMGR Proxy)
**Network Service Manager Proxy** allows NSM to establish connections between clients and endpoints located in different NSM domains. This comonents is used for discovering remote **Network Services** and **Network Service Endpoints** and for proxing connection requests to other **Network Service Manager Proxies** located in other NSM domains.

**Image**: https://github.com/networkservicemesh/cmd-nsmgr-proxy


**Implements**:
1. NetworkService
2. Registry
3. MonitorConnection

**Responsibilities**:
1. **Network Service** and **Network Service Endpoint** discovery in other NSM domains
2. Swaps endpoint's local IP to domain's external IP
3. Translates **Network Service** and **Network Service Endpoint** names into names suitable for other NSM domains

# Admission Webhook k8s
Admission Webhook K8s simplifies working with NSM if NSM is deployed in a Kubernetes cluster. This component automatically injects NSM clients into Kubernetes pods with NSM annotations. It can also inject NSM clients into entire pod namespaces.

**Image**: https://github.com/networkservicemesh/cmd-admission-webhook-k8s

**Responsibilities**:
1. Injects NSM Clients into Kubernetes pods or namespaces if they have an NSM annotation


# Cluster Info K8s
**Cluster Info K8s** allows NSM to obtain information about the Kubernetes Cluster (for example, cluster, node, pod names) if NSM is deployed in this Kubernetes Cluster. This information can be used by other components (for example **Network Service Manager Proxy**).

**Image**: https://github.com/networkservicemesh/cmd-cluster-info-k8s

**Responsibilities**:
1. Obtains and updates information about the Kubernetes Cluster

# Exclude Prefixes K8s
**Exclude Prefixes K8s** collects prefixes from various sources in the Kubernetes Cluster including pods, services and config maps. These prefixes are used by NSM IPAM to avoid the intersection of prefixes of NSM and Kubernetes networks.

**Image**: https://github.com/networkservicemesh/cmd-exclude-prefixes-k8s

**Responsibilities**:
1. Obtains and updates prefixes used in the Kubernetes Cluster

# Map IP K8s
**Map IP K8s** builds and updates a map that transfers internal pods' IPs of the Kubernetes Cluster to the external nodes' IPs. This map is used by **Network Service Manager Proxy** for interdomain NSM scenarios when NSM is deployed in the Kubernetes Cluster.

**Image**: https://github.com/networkservicemesh/cmd-map-ip-k8s

**Responsibilities**:
1.  Builds and updates a map that transfers internal pods' IPs to external nodes' IPs

# Network Service Endpoint (NSE)
**Network Service Endpoint** provides NSM clients with access to **Network Services**.

**Image**: https://github.com/networkservicemesh/cmd-nse-icmp-responder

**Implements**:
1. NetworkService

**Responsibilities**:
1. Provides NSM clients with access to **Network Services**
2. Allocates IPs inside the NSM network for NSM clients and for itself

# Network Service Client (NSC)
**Network Service Client** allows external workloads to request access to NSM's **Network Services** and maintains connections ([Controlplane](https://networkservicemesh.io/docs/concepts/features/healing) and [Dataplane](https://networkservicemesh.io/docs/concepts/features/datapath_healing) healing). This component can also provide a local DNS Server for accessing NSM resources by their names. Supports only **kernel** and **vfio** mechanisms.

**Image**: https://github.com/networkservicemesh/cmd-nsc

**Responsibilities**:
1. Requests connections to **Network Services**
2. Connection healing
3. Can serve as a DNS Server

# External Client
**External Client** is any workload which wants to connect to NSM's **Network Services**. To achieve it **External Client** uses **Network Service Client** which should be located on the same machine.

# Network Service Client Init (NSC Init)
**Network Service Client Init** is used as **Init Container** inside Kubernetes pods with **External Clients**. Its main responsibility is to connect to **Network Service** before the main workload starts. Connection created by **NSC Init** is then used and maintained by **NSC**. This component supports only **kernel** and **vfio** mechanisms.

**Image**: https://github.com/networkservicemesh/cmd-nsc-init

**Responsibilities**:
1. Requests a connection to **Network Service**

# Network Service Endpoint vl3 (NSE vl3)
**Network Service Endpoint vl3** is used to build virtual L3 networks in NSM using [**VPP Framework**](https://s3-docs.fd.io/vpp/24.02/). vl3 networks are very similar to the standard network in a Kubernetes Cluster. vl3 Endpoints route traffic between clients connected to the vl3 network. They can also be configured to provide DNS for connected clients. 

**Image**: https://github.com/networkservicemesh/cmd-nse-vl3-vpp

**Implements**:
1. NetworkService

**Responsibilities**:
1. Builds virtual L3 network
2. Routes clients' traffic over the vl3 network
3. Provides a DNS Server
