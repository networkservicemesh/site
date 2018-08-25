+++
title = "Quick Start"
type = "setup"
summary = "Running NSM on an existing Kubernetes Cluster"
image= "/img/setup/quickstart.jpg"
+++

# Quick Start Network Service Mesh

This document assumes you already have a kubernetes cluster with kubectl properly configured. If not,
[How to stand up a VM from scratch with everything for NSM](/docs/tutorials/complete-startup-guide/)


### Create the daemonset

```
kubectl create -f https://raw.githubusercontent.com/ligato/networkservicemesh/master/conf/sample/networkservice-daemonset.yaml
```


### Verify the daemonset is running
Now you should be able to see your Network Service Mesh daemonset running:

```
kubectl get daemonset networkservice
```
You should see something like:
```
NAME             DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
networkservice   1         1         1         1            1           <none>          9m
```
