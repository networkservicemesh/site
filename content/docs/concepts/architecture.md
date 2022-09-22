+++
title = "Architecture"
weight = 3
date = "2021-06-21"
+++

## Key Concepts
### Network Services

A Network Service is a set of Connectivity, Security, and Observability features at L3 and above to which workloads may individually connect.

![Network Service Venn Diagram](/img/concepts/architecture/ns_venn.svg)

Examples of Network Services include:

- A simple distributed vL3 that allows workloads to communicate via IP, optionally with DNS service for that vL3.
- A traditional Network Service like Istio, Linkerd, Consul, or Kuma running over a vL3.  This allows specific workloads to be admitted to that Service Mesh, independent of where they run.
It also allows a single workload to connect to multiple traditional service meshes.  This can allow a workload to connect both to a company's Service Mesh, and also to the Service Meshes of its partners simultaneously.

More sophisticated features (IPS, etc) can be composed into Network Services to add additional Security and Observability features.

### Clients

A {{<color "#0050EF" >}}Client{{< /color >}} in Network Service Mesh, sometimes also called a {{<color "#0050EF" >}}Network Service Client (NSC){{</color>}} is a workload that asks to be connected to a Network Service
by name.  A {{<color "#0050EF" >}}Client{{< /color >}} is independently authenticated (currently by Spiffe ID), and must be authorized to be attached to attach to a Network Service.

For each Network Service to which a {{<color "#0050EF" >}}Client{{< /color >}} wishes to be connected, in addition to the name of that Network Service and the identity of the Client,
an optional set of 'labels' (key value pairs) may be provided.  These 'labels' may be used by Network Service for {{<color "#008A00" >}}Endpoint{{< /color >}} selection, or by {{<color "#008A00" >}}Endpoints{{< /color >}} themselves
to influence how the {{<color "#008A00" >}}Endpoint{{< /color >}} provides service to the {{<color "#0050EF" >}}Client{{< /color >}}.

A {{<color "#0050EF" >}}Client{{< /color >}} may be a:

- Pod
- VM
- Physical Server

### vWires

That which connects a {{<color "#0050EF" >}}Client{{< /color >}} to an {{<color "#008A00" >}}Endpoint{{< /color >}} is a {{<color "#6A00FF" >}}vWire{{< /color >}} or {{<color "#6A00FF" >}}Virtual Wire{{< /color >}}.

![vWire](/img/concepts/architecture/vWire.svg)

The contract of a {{<color "#6A00FF" >}}vWire{{< /color >}} is:

- A packet ingressing the {{<color "#6A00FF" >}}vWire{{< /color >}} at the {{<color "#0050EF" >}}Client{{< /color >}} will egress at the {{<color "#008A00" >}}Endpoint{{< /color >}}
- A packet ingressing the {{<color "#6A00FF" >}}vWire{{< /color >}} at the {{<color "#008A00" >}}Endpoint{{< /color >}} will egress the {{<color "#6A00FF" >}}vWire{{< /color >}} at the {{<color "#0050EF" >}}Client{{< /color >}}
- Only packets that ingressed the {{<color "#6A00FF" >}}vWire{{< /color >}} at the {{<color "#0050EF" >}}Client{{< /color >}} will egress at the {{<color "#008A00" >}}Endpoint{{< /color >}}
- Only packets that ingressed the {{<color "#6A00FF" >}}vWire{{< /color >}} at the {{<color "#0050EF" >}}Client{{< /color >}} will egress the {{<color "#6A00FF" >}}vWire{{< /color >}} at the {{<color "#008A00" >}}Endpoint{{< /color >}}
- An {{<color "#008A00" >}}Endpoint{{< /color >}} may have multiple incoming {{<color "#6A00FF" >}}vWires{{< /color >}}.
- A {{<color "#0050EF" >}}Client{{< /color >}} may have multiple outgoing {{<color "#6A00FF" >}}vWires{{< /color >}}.
- Each {{<color "#6A00FF" >}}vWire{{< /color >}} carries traffic for exactly one Network Service.

In short, a {{<color "#6A00FF" >}}vWire{{< /color >}} acts like a virtual Wire between {{<color "#0050EF" >}}Client{{< /color >}} and {{<color "#008A00" >}}Endpoint{{< /color >}}.

It should be noted that a {{<color "#0050EF" >}}Client{{< /color >}} *may* request the same Network Service multiple times, and thus have mutiple {{<color "#6A00FF" >}}vWires{{< /color >}} that happen to connect
it to a particular {{<color "#008A00" >}}Endpoint{{< /color >}}.

### Endpoints

An {{<color "#008A00" >}}Endpoint{{< /color >}} in Network Service Mesh, sometimes called a Network Service {{<color "#008A00" >}}Endpoint{{< /color >}} or NSE is the 'thing' provides the Network Service to the {{<color "#0050EF" >}}Client{{< /color >}}.

Network Service Mesh constructs a {{<color "#6A00FF" >}}vWire{{< /color >}} between the {{<color "#0050EF" >}}Client{{< /color >}} and the {{<color "#008A00" >}}Endpoint{{< /color >}}:

![NSE](/img/concepts/architecture/nse.svg)

An {{<color "#008A00" >}}Endpoint{{< /color >}} may be

- a Pod running in the same K8s cluster
- a Pod running in a different K8s cluster
- a VM
- an aspect of the physical network
- Anything else to which packets can be delivered for processing


## Network Service API


### Request
A {{<color "#6A00FF" >}}vWire{{< /color >}} between a {{<color "#0050EF" >}}Client{{< /color >}} and Network Service is created by a {{<color "#0050EF" >}}Client{{< /color >}} sending a 'Request' GRPC call to NSM.

![Request](/img/concepts/architecture/request.svg)

### Close
A {{<color "#6A00FF" >}}vWire{{< /color >}} between a {{<color "#0050EF" >}}Client{{< /color >}} and a Network Service is formally Closed by sending a 'Close' GRPC call to NSM.


### Monitor
A {{<color "#6A00FF" >}}vWire{{< /color >}} between a {{<color "#0050EF" >}}Client{{< /color >}} and a Network Service always has a finite expire time.  The {{<color "#0050EF" >}}Client{{< /color >}} may (and usually does) send new 'Request' messages
to 'refresh' the {{<color "#6A00FF" >}}vWire{{< /color >}}.  If a {{<color "#6A00FF" >}}vWire{{< /color >}} exceeds its expire time without being refreshed, NSM cleans up the {{<color "#6A00FF" >}}vWire{{< /color >}}.

A {{<color "#0050EF" >}}Client{{< /color >}} may use a 'MonitorConnection' streaming GRPC call to NSM to get updates on the status of a {{<color "#6A00FF" >}}vWire{{< /color >}} it has to a Network Service.

## Registry

The Network Service Registry (NSR) component tracks Network Services and Network Service {{<color "#008A00" >}}Endpoints{{</color>}}. It can use either in-memory volatile storage or Kubernetes custom resource storage.

Clients and Endpoints don't connect directly to the Registry; they connect to the Network Service Manager which is a proxy for the registry. This simplifies NSM's internal data flows since Clients and Endpoints need to connect to the Manager anyway.

For development purposes on single-node clusters the Manager can be configured to run a local in-memory Registry within its container, but in most k8s deployments the Registry will run independently and the Manager will connect to the Registry using a socket.

### Network Service Endpoint

A {{<color "#008A00" >}}Network Service Endpoint{{< /color >}} ({{<color "#008A00" >}}NSE{{< /color >}} or {{<color "#008A00" >}}Endpoint{{< /color >}}) provides one or more Network Services.  It registers a list
of Network Services (by name) that it provides, and the 'destination labels' it is advertising for each Network Service.


### Network Service

A Network Service is identified by name, and has a payload type (either IP by default, or Ethernet). Network Services are registered with the Network Service Manager which passes their data to the Network Service Registry for storage, usually as Kubernetes custom resources like this one:

```yaml
---
apiVersion: networkservicemesh.io/v1
kind: NetworkService
metadata:
  name: simple-network-service
spec:
  payload: IP
```

Optionally, a Network Service may specify a list of 'matches'.  These matches allow matching the 'source labels' a {{<color "#0050EF" >}}Client{{< /color >}} sends
with its Request to 'destination labels' advertised by the {{<color "#008A00" >}}Endpoint{{< /color >}} when it registers as providing the Network Service.

For example:
```yaml
---
apiVersion: networkservicemesh.io/v1
kind: NetworkService
metadata:
  name: service-mesh@finance.example.com
spec:
  payload: IP
  matches:
    - source_selector:
        service: envoy-proxy
      routes:
        - destination_selector:
            service: vl3
    - source_selector:
      routes:
      - destination_selector:
          service: envoy-proxy
```

If a {{<color "#0050EF" >}}Client{{< /color >}} provided no 'source labels' with its Request for the 'service-mesh' Network Service, it would not match the 'service: envoy-proxy'
for the first match, and so would fall through to the final 'catch all' match with no source_selector, and be matched to {{<color "#008A00" >}}Endpoint{{< /color >}}
that advertised a Network Service named 'service-mesh' with 'destination label' 'service: envoy-proxy'.

If a {{<color "#0050EF" >}}Client{{< /color >}} provided a 'source label' of 'service: envoy-proxy' it would match the first match and be matched to an {{<color "#008A00" >}}Endpoint{{< /color >}}
that advertised a Network Service named 'service-mesh' with 'destination label' 'service: vl3'

### Registry Domains

Network Service Mesh allows multiple independent mutually ignorant Registry Domains.

The Network Service Registry Domain of a Network Service is indicated by suffixing an '@domain' to the Network Service Name. 
So for example, a Network Service named 'service-mesh' in the 'finance.example.com' domain would be 'service-mesh@finance.example.com'

The reference implementation of Network Service Mesh locates the Registry Server for a Registry Domain by looking up a SRV record
for the name of the domain.  This is not the only permissible way to do it, it is done as one example that permits scaling to
'internet scale'.

## Inter-domain

A {{<color "#0050EF" >}}Client{{< /color >}} may request a Network Service from any Network Service Registry Domain independent of where it is running.
Whether the lookup from the Registry for that Registry Domain is permitted, and whether the {{<color "#0050EF" >}}Client{{< /color >}} is permitted to connect
to that Network Service is a matter of policy, not a matter of where the {{<color "#0050EF" >}}Client{{< /color >}} is running.

An {{<color "#008A00" >}}Endpoint{{< /color >}} may register as providing a Network Service in any Network Service Registry Domain independent of where it is running.
Whether the {{<color "#008A00" >}}Endpoint{{< /color >}} is permitted to register in that Registry Domain is a matter of policy, not a matter of where the {{<color "#008A00" >}}Endpoint{{< /color >}} is running.

### Floating Inter-domain

A Network Service Registry Domain need not be associated directly with *any* Runtime Domain.  It may be a purely logical
Registry, with {{<color "#0050EF" >}}Clients{{< /color >}} and {{<color "#008A00" >}}Endpoints{{< /color >}} running across many different Runtime Domains that the Registry Domain has no direct association with.

When run in this mode, it is referred to as a 'floating' Registry Domain.

## Advanced Features

Network Service Mesh's 'match' process for selecting candidate {{<color "#008A00" >}}Endpoints{{< /color >}} to provide a Network Service can be used to
implement a variety of advanced features:

- [Composition](#composition)
- [Selective Composition](#selective-composition)
- [Topologically Aware Endpoint Selection](#topologically-aware-endpoint-selection)
- [Topologically Aware Scale from Zero](#topologically-aware-scale-from-zero)

### Composition

Sometimes a Network Service is provided by a graph of {{<color "#008A00" >}}Endpoints{{< /color >}} composed together to serve that workload.
For example, it is likely simplest when providing a Traditional Service Mesh as a Network Service to Compose
an Envoy Proxy (managed by an Istio or Kuma control plane) with a vL3 (providing a virtual L3 domain):

![Composition](/img/concepts/architecture/composition.svg)

```yaml
---
apiVersion: networkservicemesh.io/v1
kind: NetworkService
metadata:
  name: service-mesh@finance.example.com
spec:
  payload: IP
  matches:
    - source_selector:
        service: envoy-proxy
      routes:
        - destination_selector:
            service: vl3
    - source_selector:
      routes:
      - destination_selector:
          service: envoy-proxy
```

Please note: there is nothing magic about the choice of labels as 'service: ...' as with all labels, the choice is arbitrary,
its the matching that matters.

#### Selective Composition

Sometimes it is desirable to have different {{<color "#0050EF" >}}Clients{{< /color >}} receive a different composition of {{<color "#008A00" >}}Endpoints{{< /color >}} to provide a Network Service.

For example, imagine that a {{<color "#0050EF" >}}Client{{< /color >}} is version v1.1 of an app foo.  It is known that v1.1 of app foo has a security
vulnerability.  There is a plan to remediate to foo version v1.2 with the fix.  The schedule for that is six weeks out.
App foo needs to stay in deployment in the interim.

An expensive IPS can provide protection from the vulnerability.  By keying off of labels provided by the {{<color "#0050EF" >}}Clients{{< /color >}} when
they Request the Network Service, NSM can selectively interpose an IPS between all instances of foo v1.1 and the vL3
for the Network Service.

![Selective Composition](/img/concepts/architecture/selective-composition.svg)

```yaml
---
apiVersion: networkservicemesh.io/v1
kind: NetworkService
metadata:
  name: secure-vl3@sales.example.com
spec:
  payload: IP
  matches:
    - source_selector:
        app: foo
        version: "v1.1"
      routes:
        - destination_selector:
            provides: ips
    - source_selector:
        provided: ips
      routes:
        - destination_selector:
            provides: vl3
    - source_selector:
        routes:
        - destination_selector:
            provides: vl3
```

All other workloads using the Network Service continue normally without the IPS.

Please note: there is nothing magic about the choice of labels as:

- provides
- provided
- app
- version

as with all labels, the choice is arbitrary, it's the matching that matters.

### Topologically Aware Endpoint Selection

Topology for both {{<color "#0050EF" >}}Clients{{< /color >}} and {{<color "#008A00" >}}Endpoints{{< /color >}} can be expressed by source or destination labels.  Examples:

- nodeName
- clusterName
- zone
- cloudProvider

etc.

Network Service Mesh supports dynamic specification of destination labels based on the source labels in the Request.
In a destination_selector `{{ .labelName }}` will substitute in the value for labelName from the source labels of the Request.
For example `{{ .nodeName }}` is substituted with the value of `nodeName` from the source labels.

```yaml
---
apiVersion: networkservicemesh.io/v1
kind: NetworkService
metadata:
  name: local-vl3@marketing.example.com
spec:
  payload: IP
  matches:
    - source_selector:
      routes:
        - destination_selector:
            nodeName: "{{  .nodeName }}"
```

Would cause each {{<color "#0050EF" >}}Client{{< /color >}} to be matched to an {{<color "#008A00" >}}Endpoint{{< /color >}} on the same Node when it Requests 'local-vl3@marketing.example.com'

### Topologically Aware Scale from Zero

Topologically Aware Endpoint Selection is very useful.  It requires an {{<color "#008A00" >}}Endpoint{{< /color >}} to be
available that matches the topology constraints for every {{<color "#0050EF" >}}Client{{< /color >}} that might request
a Network Service.  This is expensive.  Imagine running an {{<color "#008A00" >}}Endpoint{{< /color >}} on every Node 
in a 5000 Node Cluster.  Fortunately, the NSM match mechanism can be used to enable Topologically Aware Scale from Zero.

```yaml
---
apiVersion: networkservicemesh.io/v1
kind: NetworkService
metadata:
  name: local-vl3@marketing.example.com
spec:
  payload: IP
  matches:
    - source_selector:
      routes:
        - destination_selector:
            nodeName: "{{  .nodeName }}"
    - source_selector:
      routes:
        - destination_selector:
            supplier: true
```

If there is already an {{<color "#008A00" >}}Endpoint{{< /color >}} running to provide the Network Service on the same Node as the {{<color "#0050EF" >}}Client{{< /color >}}, the first match selects it.
If there is not, the second match sends the request to a 'Supplier' which will start the {{<color "#008A00" >}}Endpoint{{< /color >}} on the desired node,
and then return an error.  The error will trigger an attempt to 'reselect'.  The reselect will find the newly created {{<color "#008A00" >}}Endpoint{{< /color >}}
and connect the {{<color "#0050EF" >}}Client{{< /color >}} to it.

