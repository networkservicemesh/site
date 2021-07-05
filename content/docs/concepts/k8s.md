+++
title = "NSM in K8s"
weight = 4
date = "2021-06-21"
+++

## Background

### Kubernetes Networking is IntraCluster

![IntraCluster](/img/concepts/nsmk8s/intra-cluster.svg)

![ClusterEdge](/img/concepts/nsmk8s/cluster-edge.svg)

![Network Service Edge](/img/concepts/nsmk8s/ns-edge.svg)

In Kubernetes, Network Service Mesh 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres-cl
  annotations:
    networkservicemesh.io: kernel://my-postgres-service
  labels:
    app: postgres-cl
spec:
  ...
```

