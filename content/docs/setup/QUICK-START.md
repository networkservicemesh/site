+++
title = "Quick Start"
type = "setup"
summary = "Running NSM on an existing Kubernetes Cluster"
+++

# Quick Start Network Service Mesh

This document assumes you already have a kubernetes cluster with kubectl properly configured. If not,
[How to stand up a VM from scratch with everything for NSM](/docs/tutorials/complete-startup-guide.md)


### Create the daemonset

```
kubectl create -f https://github.com/ligato/networkservicemesh/blob/master/conf/sample/networkservice-daemonset.yaml

```

Now you should be able to see your Network Service Mesh daemonset running:

```
kubectl get pods
```
You should see:
```
NAME                   READY     STATUS    RESTARTS   AGE
networkservice-x5k9s   1/1       Running   0          5h
```
