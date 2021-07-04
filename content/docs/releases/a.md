+++
title = "Andromeda release v0.1.0"
short = "v0.1.0"
image = "/img/releases/andromeda.png"
weight = 3
date = "2019-05-14"
publishDate ="2019-04-03"
+++


| Date        | Git actions           | Notes  |
| ------------- |:-------------| :-----: |
| 2019-04-23     | `git branch nsm-v0.1` | Ensure all required issues are in “done” state in the [project](https://github.com/networkservicemesh/networkservicemesh/projects/7). |
| 2019-04-30     | `git tag nsm-v0.1.0` | The designated release date. Ensure CI/CD is passing. Run extra testing. |
| 2019-05-14     | `git tag nsm-v0.1.1` | Apply all pending patches that fix urgent issues. CI/CD passes + additional testing. |


# Initial Features

v0.1.0 (Andromeda) is the initial release of Network Service Mesh.

## Initial infra components
### NSMgr
The Network Service Manager is a per Node control plane component run as a Daemonset to provide NSM to each Node in the cluster.
### Dataplane
NSM Dataplane components which enable the data plane for vWires on a Node.  Its usually also installed as a Daemonset.
Two implementations of the Dataplane role are provided:
#### vppagent
Supports mechanisms:

- kernel interface
- memif
- direct memif
- vxlan

#### kernel
Supports mechanisms:

- kernel interface
- vxlan

 
