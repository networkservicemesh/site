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

NSM v0.0.2 has been successfully integration tested with Kubernetes versions:

- 1.12.10
- 1.13.12
- 1.14.10
- 1.15.11
- 1.16.2, 1.16.15
- 1.17.11
- 1.18.8
- 1.19.0

Note: Some Kubernetes versions listed here are more recent than NSM v0.0.2 because NSM v0.0.2 has been tested with
new Kubernetes versions as they have been released to verify continued compatibility.
