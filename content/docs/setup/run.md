+++
title = "Run"
weight = 1
+++
## Prerequisites
Make sure you have the following dependencies to run NSM:

* A Kubernetes Cluster - good options include:
  * [kind](https://github.com/networkservicemesh/networkservicemesh/blob/master/docs/guide-kind.md) - usually the easiest choice
  * [vagrant](https://github.com/networkservicemesh/networkservicemesh/blob/master/docs/guide-vagrant.md) - useful if you need to debug at the Node Level
  * [gke](https://github.com/networkservicemesh/networkservicemesh/blob/master/docs/guide-gke.md)
  * [azure](https://github.com/networkservicemesh/networkservicemesh/blob/master/docs/guide-azure.md)
  * [aws](https://github.com/networkservicemesh/networkservicemesh/blob/master/docs/guide-aws.md)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [helm](https://helm.sh/)

## Install

```bash
helm repo add nsm https://helm.nsm.dev/ # Add the latest release nsm helm repo
helm install nsm/nsm # Install the nsm infrastructure in your Kubernetes Cluster
```

[More help with helm if you need it](https://github.com/networkservicemesh/networkservicemesh/blob/master/docs/guide-helm.md).

You should be able to confirm with

```bash
kubectl get pods | grep nsm
```

Output:
```
nsm-admission-webhook-584c8dd8cb-rj754   1/1     Running   0          107s
nsm-vpp-forwarder-274f9                  1/1     Running   0          105s
nsm-vpp-forwarder-6dvld                  1/1     Running   0          106s
nsm-vpp-forwarder-zc799                  1/1     Running   0          105s
nsmgr-7mvq4                              3/3     Running   0          106s
nsmgr-bkmwk                              3/3     Running   0          106s
nsmgr-lrvwg                              3/3     Running   0          107s
```

## Run

The nsm helm repo has three examples available:

```bash
helm search nsm | grep -i example
```

Output:

```
nsm/icmp-responder              0.2.0           0.2.0           Endpoints and Clients for ICMP Responder Use Case           
nsm/vpn                         0.2.0           0.2.0           Endpoints and Clients for VPN Use Case                      
nsm/vpp-icmp-responder          0.2.0           0.2.0           Endpoints and Clients for VPP ICMP Responder Use Case
```

* [icmp-responder](/docs/examples/icmp-responder/) - A simple example that connects an App Pod Client to a Network Service.
* [vpp-icmp-responder](/docs/examples/vpp-icmp-responder/) - A simple example that connects a vpp based Pod to a Network Service using memif.
* [vpn](/docs/examples/vpn/) - An example that simulates an App Pod Client connecting to a Network Service implemented as a chain simulating a [VPN Use Case](https://docs.google.com/presentation/d/1Vzmhv5vc10NyAa08ny-CCbveo0_fWkDckbkCD_N0fPg/edit#slide=id.g49bd4e8739_0_12)

The community maintains additional examples in [examples/](https://github.com/networkservicemesh/examples)


