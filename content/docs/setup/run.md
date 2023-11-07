+++
title = "Run"
weight = 1
+++
## Prerequisites
Make sure you have the following dependencies to run NSM:

* [docker](https://www.docker.com/get-started/)
* [go](https://go.dev/dl/)
* A Kubernetes Cluster - good options include:
  * [kind](https://kind.sigs.k8s.io/) - usually the easiest choice.  Run:
    
    ```bash
    echo "
    kind: Cluster
    apiVersion: kind.x-k8s.io/v1alpha4
    nodes:
    - role: control-plane
    - role: worker
    - role: worker" | kind create cluster --config -
    ```
    The cluster creation command is passed the configuration to run 2 worker nodes, and most examples require at least 2 worker nodes to run. Please keep this in mind if you use another tool for running a Kubernates cluster.
  * [minikube](https://minikube.sigs.k8s.io/docs/)
  * [microk8s](https://microk8s.io/)
  * [k3s](https://k3s.io/)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* Cloud k8s integrations to run NSM system tests (not necessary to run the examples below):
  * [gke](https://github.com/networkservicemesh/integration-k8s-gke/blob/v1.11.0/README.md)
  * [azure](https://github.com/networkservicemesh/integration-k8s-aks/blob/v1.11.0/README.md)
  * [aws](https://github.com/networkservicemesh/integration-k8s-aws/blob/v1.11.0/README.md)

## Install Spire
If you do not already have Spire on your system install Spire

Follow the instructions [in the README.md](https://github.com/networkservicemesh/deployments-k8s/blob/v1.11.0/examples/spire/single_cluster/README.md)

## Install NSM
If you do not already have NSM infrastructure on your system install NSM

Follow the instructions [in the README.md](https://github.com/networkservicemesh/deployments-k8s/blob/v1.11.0/examples/basic/README.md)


# Examples

Try one of the many [examples](https://github.com/networkservicemesh/deployments-k8s/blob/release/v1.11.0/README.md)
