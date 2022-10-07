+++
title = "Run"
weight = 1
+++
## Prerequisites
Make sure you have the following dependencies to run NSM:

* A Kubernetes Cluster - good options include:
  * [kind](https://kind.sigs.k8s.io/) - usually the easiest choice.  Run:
    
    ``` curl -L https://raw.githubusercontent.com/networkservicemesh/integration-k8s-kind/v1.6.0/cluster-config.yaml | kind create cluster --config -```

  * [gke](https://github.com/networkservicemesh/integration-k8s-gke/blob/v1.6.0/README.md)
  * [azure](https://github.com/networkservicemesh/integration-k8s-aks/blob/v1.6.0/README.md)
  * [aws](https://github.com/networkservicemesh/integration-k8s-aws/blob/v1.6.0/README.md)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Install Spire
If you do not already have Spire on your system install Spire

Follow the instructions [in the README.md](https://github.com/networkservicemesh/deployments-k8s/blob/v1.6.0/examples/spire/README.md)

## Install NSM
If you do not already have NSM infrastructure on your system install NSM

Follow the instructions [in the README.md](https://github.com/networkservicemesh/deployments-k8s/blob/v1.6.0/examples/basic/README.md)


# Examples

Try one of the many [examples](https://github.com/networkservicemesh/deployments-k8s/blob/release/v1.6.0/README.md)
