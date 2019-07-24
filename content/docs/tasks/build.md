+++
title = "Building Network Service Mesh"
weight = 1
+++
{{< requirement title="Prerequisites" >}}
To build Network Service Mesh, you'll need to install the following:

Tool | Notes
:----|:-----
[Go](https://golang.org) | Version [1.11](https://golang.org/dl/) or higher is recommended
[Protocol Buffers](https://developers.google.com/protocol-buffers/) |
[shellcheck](https://www.shellcheck.net/) | Only used for `make check`)
[Docker](https://docker.com) | For building containers
[Vagrant](https://www.vagrantup.com/docs/installation/) | If you want to use the supplied two-node Kubernetes cluster for testing

On a Mac:

```bash
brew install dep golang protobuf protoc-gen-go shellcheck
```
{{< /requirement >}}

# Cloning

```bash
git clone https://github.com/networkservicemesh/networkservicemesh
cd networkservicemesh
```

# Building

All of the actual code in Network Service Mesh builds as pure Go:

```bash
go generate ./...
go build ./...
```

To accomplish meaningful things using NSM, you will need to build various Docker containers and deploy them to Kubernetes. This is achievable via normal Docker/Kubernetes commands, but to speed development, some `make` machinery has been added to make things easy.

## Building and saving container images using the `make` machinery

You can build all of the containers needed for NSM, including a variety of Network Service Endpoints (NSEs) and NSCs (Network Service Clients) that are useful for testing (but not part of the core) using this command:

```bash
make k8s-build
```

If you are using the vagrant machinery to run your K8s cluster (described a bit further down), you really want to use:

```bash
make k8s-save
```

instead of 

```bash
make k8s-build
```

because `make k8s-save` will build your containers and save them in scripts/vagrant/images where they can be loaded by the vagrant K8s cluster.

You can also selectively rebuild any component, say the nsmd, with:

```bash
make k8s-nsmd-save
```

# Running the NSM code

Network Service Mesh provides a handy vagrant setup for running a two node K8s cluster.  Once you've done `make k8s-save`, you can deploy to it with:

```bash
make k8s-deploy
```

By default this will:
1. Spin up a two node K8s cluster from scripts/vagrant if one is not already running.
2. Delete old instances of NSM config if present
3. Load all images from scripts/vagrant/images into the master and worker node
2. Deploy the nsmd and vppagent-dataplane Daemonsets
3. Deploy a variety of Network Service Endpoints and Network Service Clients
4. Deploy the crossconnect-monitor (a useful tool for debugging)

You can check to see things working by typing:

```bash
make k8s-check
```

which will try pinging from NSCs to NSEs.

You can remove the effects of k8s-deploy with:

```bash
make k8s-delete
```

As in the case with save and build, you can always do this for a particular component, like `make k8s-nsc-deploy` or `make k8s-nsc-delete`.

## Having more control over the deployment

The described quick start method works for fast deployments and quick tests. However, the build infrastructure provides a fine-grained control over the deployments.

### Working with the vagrant setup

To spin the default 2 node vagrant setup with Kubernetes on top type:

```bash
make vagrant-start
```

At any point, you can `make vagrant-suspend` and `make vagrant-resume` to pause and restore the spawn virtual nodes. If for some you need to rebuild or completely destroy the vagrant environment, use `make vagrant-restart` and `make vagrant-destroy`.

To point your `kubectl` to the Kubernetes deployment in the virtual nodes, use:

```bash
source scripts/vagrant/env.sh
```

### Deploying the NSM infrastructure

Network Service Mesh consists of a number of system pods, which take care of service registration, provide the dataplane functionality, do monitoring and observability. Once you have configured your `kubectl` to the desired Kubernets master (may or may not be set through vagrant), you can initiate the NSM infrastructure deployment and deletion using `make k8s-infra-deploy` and `make k8s-infra-delete`.

### Deploying the ICMP example and testing it

The project comes with a simple, ready to test ICMP example. It deploys a number of ICMP responder NSEs and connects NSCs to them. This shows same and cross-node communication and is good for visualising it with the provided monitoring tools.
The commands to deploy and delete it are `make k8s-icmp-deploy` and `make k8s-icmp-delete`. Checking the operability of the ICMP example is done through `make k8s-check`.

### Deploying the VPN composed Network Service

One of the big advantages on Network Service Mesh is NS composition, i.e. forming a complex service out of a number of simple NSEs. The project comes with an example that implements the "secure-intranet-connectivity" Network Service which connects together a simple ACL based packet filtering firewall and a simulated VPN gateway NSEs. Deploying it is done through `make k8s-vpn-deploy` and to uninstall it run `make k8s-vpn-delete`. Checking VPN's operability is done with `make k8s-check`.


# Helpful Logging tools

Over the course of developing NSM, you may find yourself wanting to look at logs for various NSM components. This command will dump all logs for all running nsmd Pods in the cluster (you'll wanto to redirect these to a file).

```bash
make k8s-nsmd-logs
```

This works for any component in the system.

Of particular utility:

```bash
make k8s-crossconnect-monitor-logs
```

dumps the logs from the crossconnect-monitor, which has been logging new crossconnects as they come into existence and go away throughout
the cluster.

# Regenerating code

If you change [`types.go`](https://github.com/networkservicemesh/networkservicemesh/blob/master/k8s/pkg/apis/networkservice/v1/types.go) or any of the `.proto` files you will need to be able to run `go generate ./...` to regenerate the code.

In order to be able to do that you need to have these tools installed:

Tool | What to run to install
:----|:----------------------
`protobuf` | `./scripts/install-protoc.sh`
`protoc-gen-go` | `go install github.com/golang/protobuf/protoc-gen-go`
`deepcopy-gen` | `go install k8s.io/code-generator/cmd/deepcopy-gen`

Then run:

```bash
go generate ./...
```

# Updating Deps

If you need to add new dependencies to the vendor/ directory.
1.  [Install dep](https://golang.github.io/dep/docs/installation.html)
2.  Run `dep ensure`

# Shellcheck

As part of our continuous integration process, we run `shellcheck` on all shell scripts in the repo.
To run `shellcheck` locally, you need to [install it](https://github.com/koalaman/shellcheck#installing).

# Canonical source on how to build

The [`.circleci/config.yml`](https://github.com/networkservicemesh/networkservicemesh/blob/master/.circleci/config.yml) file is the canonical source of how to build Network Service Mesh in case this file becomes out of date.
