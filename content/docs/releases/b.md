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
