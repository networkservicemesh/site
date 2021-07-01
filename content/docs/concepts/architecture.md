+++
title = "Architecture"
weight = 3
date = "2021-06-21"
+++

## Network Services

A Network Service is a set of Connectivity, Security, and Observability features at L3 and above to which workloads may individually connect.
A Network Service is an *abstract* thing.

Examples of Network Services would include:
- A simple distributed vL3 that allows the workloads connected to it to communicate via IP, optionally with DNS service for that vL3
- A Traditional Network Service like Istio, Linkerd, Consul, or Kuma running over a vL3.  This allows specific workloads to be admitted to that Service Mesh, independent of where they run.
It also allows a single workload to connect to multiple Traditional Service Meshes.  This can allow a workload to connect both to a companies Service Mesh, and also to the Service Meshes of its partners simultaneously.

More sophisticated features (IPSes, etc) can be composed into Network Services to add additional Security and Observability Features.

## Clients

A 'Client' in Network Service Mesh, sometimes also called a Network Service Client (NSC) is a workload that asks to be connected to a Network Service
by name.  A Client is independently authenticated (currently by Spiffe ID), and must be authorized to be attached to attach to a Network Service.

For each Network Service to which a Client wishes to be connected, in addition to the name of that Network Service and the identity of the client,
an optional set of 'labels' (key value pairs) may be provided.  These 'labels' may be used by Network Service for Endpoint selection, or by Endpoints themselves
to influence how the Endpoint provides service to the Client.

## Endpoints

A 'Endpoint' in Network Service Mesh, sometimes called a Network Service Endpoint or NSE is the 'thing' that a Client is connected to which
provides the Network Service to the Client.

An Endpoint may be 
- a Pod running in the same K8s cluster
- a Pod running in a different K8s cluster
- a VM
- an aspect of the physical network
- Anything else to which packets can be delivered for processing

## vWires

That which connects a Client to an Endpoint is a 'vWire' or Virtual Wire.  The contract of a vWire is:
- A packet ingressing the vWire at the Client will egress at the Endpoint
- A packet ingressing the vWire at the Endpoint will egress the vWire at the Client
- Only packets that ingressed the vWire at the Client will egress at the Endpoint
- Only packets that ingressed the vWire at the Client will egress the vWire at the Endpoint
- An Endpoint may have multiple incoming vWires.
- A Client may have multiple outgoing vWires.
- Each vWire carries traffic for exactly one Network Service.

In short, a vWire acts like a virtual Wire between Client and Endpoint.

It should be noted that a Client *may* request the same Network Service multiple times, and thus have mutiple vWires that happen to connect
it to a particular Endpoint.

## Request/Close/Monitor

A vWire between a Client and Network Service is established by a Client sending a 'Request' GRPC call to NSM.
A vWire between a Client and a Network Service is formally Closed by sending a 'Close' GRPC call to NSM.
A vWire between a Client and a Network Service always has a finite expire time.  The Client may (and usually does) send new 'Request' messages
to 'refresh' the vWire.  If a vWire exceeds its expire time without being refreshed, NSM cleans up the vWire.

A Client may use a 'Monitor' streaming GRPC call to NSM to get updates on the status of a vWire it has to a Network Service.

## Composition

## Registries

As with any other Mesh, Network Service Mesh has Network Service Registries (NSR) in which Network Services and Network Service Endpoints are registered

### Network Service

### Network Service Endpoint

### Registry Domains

Network Service Mesh allows multiple independent mutually ignorant Registry Domains.

## Inter-domain

### Floating Inter-domain

## NSM in K8s



