+++
title = "Service Provider Users"
weight = 2
date = "2021-06-21"
+++

## The Problems

### Background

Service Providers are on a journey to virtualize Network Functions (NFs)

### Problem statement

### Cloud-native Network Functions (CNFs)

In the Cloud 1.0 version of Network Function Virtualizations (NFV) Network Functions(NFs) were instantiated
as Virtual Network Functions (VNFs).  VNFs where VMs, with the kind of 'imitate the physical world' semantics
common to Cloud 1.0.

As NFV moves towards being Cloud Native, VNFs need to make way for Cloud-native Network Functions (CNFs).
CNFs:
- Run in userspace in containers, not VMs
- Run in vanilla K8s, not a VIM
- Run with any CNI, not a highly tuned bespoke CNI.
- Embrace the [Cloud Native Definition](https://github.com/cncf/toc/blob/main/DEFINITION.md)'s notions of
  - Minimal Toil
  - Loose Coupling
  - Immutable Infrastructure

This presents challenges, because CNFs need to be able to: 
- Process packets
- Be strung together into Service Function Chains
- Exceed the performance possible with the Linux Kernel

At first glance, it appears that not *all* of these constraints can be met.

## The NSM Solution

Network Service Mesh (NSM) 
