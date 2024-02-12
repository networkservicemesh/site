+++
title = "NSM components"
weight = 4
summary = "Network Service Mesh (NSM): The Hybrid/Multi-cloud IP Service Mesh"
+++

## NSM gRPC Services
1. **NetworkService** is used for requesting and closing network connections between clients and endpoints.<br/>
**Proto File**: https://github.com/networkservicemesh/api/blob/main/pkg/api/networkservice/networkservice.proto
```proto
service NetworkService {
    rpc Request(NetworkServiceRequest) returns (connection.Connection);
    rpc Close(connection.Connection) returns (google.protobuf.Empty);
}
```

2. **Registry** is used for registering and unregistering **Network Services** and **Network Service Endpoints** in NSM, as well as for searching.<br/>
**Proto File**: https://github.com/networkservicemesh/api/blob/main/pkg/api/registry/registry.proto
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

3. **MonitorConnection** service is used for monitoring or searching connections with a specific selector.<br/>
**Proto File**: https://github.com/networkservicemesh/api/blob/main/pkg/api/networkservice/connection.proto
```proto
service MonitorConnection {
    rpc MonitorConnections(MonitorScopeSelector) returns (stream ConnectionEvent);
}
```

## Network Service Manager (NSMgr)
**Network Service Manager** is one of the key components of NSM, which is responsible for discovering **Network Services** and **Network Service Endpoints** and processing requests from clients. It must be located on the same machine as the NSM client in order to provide it with a connection to the NSM network. It can also serve as a registry if there is no real registry.

**Package**: https://github.com/networkservicemesh/cmd-nsmgr/pkgs/container/cmd-nsmgr

**Implements services**:
1. NetworkService
2. Registry
3. MonitorConnection

**Responsibilities**:
1. NetworkService discovery
2. Forwarder discovery
3. Storage for valid connections from clients
4. Provides access to the network namespace of the clients and endpoints for the forwarder
5. Can serve as a registry (optional) 

## Forwarder

**Forwarder** is one of the datapath providers in NSM. Its main responsibility is to configure network interfaces requested by NSM clients.

**Implements services**:
1. NetworkService

**Responsibilities**:
1. Creates client-side and endpoint-side interfaces
2. Chooses mechanism types for connections between clients and endpoints
3. Collects stats from interfaces
4. Load-balancing for endpoints beloning to the same **Network Service**
5. Fills in the `ConnectionContext` for the connection
```proto
message ConnectionContext {
    IPContext ip_context = 1;
    DNSContext dns_context = 2;
    EthernetContext ethernet_context = 3;
    map<string, string> extra_context = 4;
    uint32 MTU = 5;
}
```
6. Connects with other forwarders located in other NSM domains

### Forwarder VPP
**Forwarder VPP** uses [**VPP Framework**](https://s3-docs.fd.io/vpp/24.02/) as a backend to create network interfaces.

**Package**: https://github.com/networkservicemesh/cmd-forwarder-vpp/pkgs/container/cmd-forwarder-vpp

### Forwarder OVS
**Forwarder OVS** uses [**Open vSwitch (OVS)**](https://www.openvswitch.org/) as a backend to create network interfaces.

**Package**: https://github.com/networkservicemesh/cmd-forwarder-ovs/pkgs/container/cmd-forwarder-ovs

## Registry
**Registry** is used as a storage for **Network Service** and **Network Service Endpoint** entries.

**Package**: https://github.com/networkservicemesh/cmd-registry-k8s/pkgs/container/cmd-registry-k8s

**Implements services**:
1.  Registry

**Responsibilities**:
1. Stores **Network Service** and **Network Service Endpoint** entries
2. Calculates expiration time for **Network Service Endpoints** and deletes expired ones
3. Proxies interdomain queries to **Registry Proxy** if it's presented on the cluster

## Registry proxy DNS
**Registry proxy DNS** resolves IPs of remote registries in other NSM domains and proxies **Register**, **Unregister** and **Find** requests to those registries.

**Package**: https://github.com/networkservicemesh/cmd-registry-proxy-dns/pkgs/container/cmd-registry-proxy-dns

**Implements services**:
1.  Registry

**Responsibilities**:
1. Resolves IPs of remote registries using names of **Network Services** and **Network Service Endpoints**
2. Changes **Network Service Endpoint** URLs to DNS target of **Network Service Manager Proxy** on **Register**, **Unregister** and **Find** requests
3. Proxies local queries to the **Registry** on the cluster

## Network Service Manager Proxy (NSMgr Proxy)
**Network Service Manager Proxy** allows NSM to establish connections between clients and endpoints located in different NSM domains. This component is used for proxing connection requests to other **Network Service Manager Proxies** located in other NSM domains.

**Package**: https://github.com/networkservicemesh/cmd-nsmgr-proxy/pkgs/container/cmd-nsmgr-proxy

**Implements services**:
1. NetworkService
2. MonitorConnection

**Responsibilities**:
1. Swaps endpoint's local IP to domain's external IP
2. Translates **Network Service** and **Network Service Endpoint** names in the connection into names suitable for other NSM domains

## Admission Webhook k8s
Admission Webhook K8s simplifies working with NSM if NSM is deployed in a Kubernetes cluster. This component automatically injects NSM clients into Kubernetes pods with NSM annotations. It can also inject NSM clients into entire pod namespaces.

**Package**: https://github.com/networkservicemesh/cmd-admission-webhook-k8s/pkgs/container/cmd-admission-webhook-k8s

**Responsibilities**:
1. Injects NSM Clients into Kubernetes pods if they have an NSM annotation
2. Injects NSM Clients into all Kubernetes pods in a namespace if this namespace has an NSM annotation

## Cluster Info K8s
**Cluster Info K8s** allows NSM to work with cluster properties: https://github.com/kubernetes-sigs/about-api. This component can be used to simplify retrieval of the cluster domain name for **Network Service Manager Proxy**.

**Package**: https://github.com/networkservicemesh/cmd-cluster-info-k8s/pkgs/container/cmd-cluster-info-k8s

**Responsibilities**:
1. Obtains and updates information about the Kubernetes Cluster

## Exclude Prefixes K8s
**Exclude Prefixes K8s** collects prefixes from various sources in the Kubernetes Cluster including pods, services and config maps. These prefixes are used by NSM IPAM to avoid the intersection of prefixes of NSM and Kubernetes networks.

**Package**: https://github.com/networkservicemesh/cmd-exclude-prefixes-k8s/pkgs/container/cmd-exclude-prefixes-k8s

**Responsibilities**:
1. Obtains and updates prefixes used in the Kubernetes Cluster

## Map IP K8s
**Map IP K8s** builds and updates a map that transfers internal pods' IPs of the Kubernetes Cluster to the external nodes' IPs. This map is used by **Network Service Manager Proxy** for interdomain NSM scenarios when NSM is deployed in the Kubernetes Cluster.

**Package**: https://github.com/networkservicemesh/cmd-map-ip-k8s/pkgs/container/cmd-map-ip-k8s

**Responsibilities**:
1.  Builds and updates a map that transfers internal pods' IPs to external nodes' IPs

## Network Service Endpoint (NSE)
**Network Service Endpoint** provides NSM clients with access to **Network Services**.

**Package**: https://github.com/networkservicemesh/cmd-nse-icmp-responder/pkgs/container/cmd-nse-icmp-responder

**Implements services**:
1. NetworkService

**Responsibilities**:
1. Provides NSM clients with access to **Network Services**
2. Fills in remaining connection properties like IP, hardware addresses, and DNS configurations for the user's goals.

## Network Service Client (NSC)
**Network Service Client** allows external workloads to request access to NSM's **Network Services** and maintains connections ([Controlplane](https://networkservicemesh.io/docs/concepts/features/healing) and [Dataplane](https://networkservicemesh.io/docs/concepts/features/datapath_healing) healing). This component can also provide a local DNS Server for accessing NSM resources by their names.

**Package**: https://github.com/networkservicemesh/cmd-nsc/pkgs/container/cmd-nsc

**Responsibilities**:
1. Requests connections to **Network Services**
2. Connection healing
3. Can serve as a DNS Server

## External Client
**External Client** is any workload which wants to connect to NSM's **Network Services**. **Network Service Client** is required to establish the connection and should be located alongside **External Client**.

## Network Service Client Init (NSC Init)
**Network Service Client Init** is used as **Init Container** inside Kubernetes pods with **External Clients**. Its main responsibility is to connect to **Network Service** before the main workload starts. Connection created by **NSC Init** is then used and maintained by **NSC**.

**Package**: https://github.com/networkservicemesh/cmd-nsc-init/pkgs/container/cmd-nsc-init

**Responsibilities**:
1. Requests a connection to **Network Service**

## Network Service Endpoint vl3 (NSE vl3)
**Network Service Endpoint vl3** is used to build virtual L3 networks in NSM using [**VPP Framework**](https://s3-docs.fd.io/vpp/24.02/). vl3 networks are very similar to the standard network in a Kubernetes Cluster. vl3 Endpoints route traffic between clients connected to the vl3 network. They can also be configured to provide DNS for connected clients. 

**Package**: https://github.com/networkservicemesh/cmd-nse-vl3-vpp/pkgs/container/cmd-nse-vl3-vpp

**Implements services**:
1. NetworkService

**Responsibilities**:
1. Builds virtual L3 network
2. Routes clients traffic over the vl3 network
3. Provides a DNS Server


## NSM LABELS

There is a set of labels that can be used within the configuration files to define different behaviors based on user nessities. Each of these labels has a default value, but it can be replaced by simply specifying a well-defined value.
These labels are passed as an environment variable to the image that implements the endpoint.
- **NSM_LOG_LEVEL**: indicates the type of logs level that will be printed inside the container. Different types are provided,as **TRACE** or **DEBUG**, according to the specific use case where activity of debugging is required to monitor what is happening inside the pod.
- **NSM_CONNECT_TO**: specifies the URL to which the endpoint should connect. This is the variable that allows specifying which manager the corresponding pod should authenticate to and interface with.
- **NSM_LABELS**: it is used to associate a particular label to identify the pod. This label can then be used within the network service definition, for example, defining how a chain should be composed.
- **NSM_SERVICE_NAMES**: indicates which services the endpoint should be associated with. This helps in identifying endpoints for various network services.
- **NSM_CIRD_PREFIX**: it is a list of CIRD prefixes used to assign IP addresses to the created interfaces. Generally, prefixes like '172.16.0.0/31' are used to avoid ambiguity in address assignment; there are only two available addresses: 172.16.0.1 for the client interface and 172.16.0.0 for the corresponding endpoint interface
- **NSM_REGISTER_SERVICE**: indicates the endpoint's ability to register the corresponding network service. By default, it is set to false because, in various examples, the service is implemented through a specific file, usually named ``netsvc.yaml``

