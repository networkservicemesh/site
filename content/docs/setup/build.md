+++
title = "Build"
weight = 2
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

In addition, to build NSM you will need:

* [Go 1.13 or later](https://golang.org/dl/)
* [Docker](https://docs.docker.com/install/)
* GNU make

## Build

You can build all of the containers needed for NSM, including a bunch of handle Network Service Endpoints (NSEs) and NSCs (Network Service Clients) that are useful for testing, but not part of the core with:

```bash
make k8s-build
```

And if you are using the Kind machinery to run your K8s cluster (described a bit further down), you really want to use the following:

```bash
make k8s-save
```

because ```make k8s-save``` will build your containers and save them in `scripts/vagrant/images` where they can be loaded by the Kins K8s cluster.

You can also selectively rebuild any component, say the `nsmd`, with ```make k8s-nsmd-save```

After installing you can verify it with `helm version`.

## Install

Network Service Mesh provides a handy [Kind](https://github.com/kubernetes-sigs/kind) setup for running a small K8s cluster. Once you've done ```make k8s-save```, you can deploy to it with:

```bash
make k8s-save                                                # build and save the NSM docker containers
make kind-start                                              # start up an nsm cluster named kind
export KUBECONFIG="$(kind get kubeconfig-path --name="nsm")" # Point kubectl at your kind instance
make k8s-load-images                                         # load NSM docker containers into kind
make helm-init                                               # initialize helm
make helm-install-nsm                                        # install the nsm infrastructure
```

## Run
* [icmp-responder](/docs/examples/icmp-responder/) - A simple example that connects an App Pod Client to a Network Service.  
```bash
make helm-install-icmp-responder
```
* [vpp-icmp-responder](/docs/examples/vpp-icmp-responder/) - A simple example that connects a vpp based Pod to a Network Service using memif.  
```bash
make helm-install-vpp-icmp-responder
```
* [vpn](/docs/examples/vpn/) - An example that simulates an App Pod Client connecting to a Network Service implemented as a chain simulating a [VPN Use Case](https://docs.google.com/presentation/d/1Vzmhv5vc10NyAa08ny-CCbveo0_fWkDckbkCD_N0fPg/edit#slide=id.g49bd4e8739_0_12)  
```bash
make helm-install-vpn
```

## Verify
You can check to see things are working properly by typing:

```bash
make k8s-check
```

which will try pinging from NSCs to NSEs.

## Uninstall

You can remove the effects of helm-install-% with:

```bash
make helm-delete-%
```

