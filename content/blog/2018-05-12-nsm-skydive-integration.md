# Using skydive to visualize nsm concepts

It is always tricky for infrastructure projects, and especially networking infrasctructure projects, to explain their concepts, and what the project does effectively.
One always better understand concepts he can visualize over those explained with hundreds of words.
It is even harder for networking infractructure projects that introduce new way of interconnecting components across the underlying infrastructure. That's what the network service does.

To tackle down this situation, we propose to use Skydive.

## Skydive

Skydive is an opensource project for monitoring and troubleshooting cloud networking. It displays the networking topology with d3js.

![](https://github.com/skydive-project/skydive.network/raw/images/overview.gif)

Find more informations about skydive on the [documentation page](http://skydive.network/documentation/) or on the [github page](https://github.com/skydive-project/skydive).

Skydive relies on probes to retreive datas and create the topology. Such probes exists for docker, openstack, linux networking components (interfaces, network namespaces...).

Hence, in order to inject NSM datas to the topology we had to develop a dedicated probe.

## The NSM probe

To simplify the usage of the skydive topology graph, we dicided to run the NSM probe from the central component of skydive, the analyzer. The probe will then be notified of any new element, such as linux networking namespaces or docker containers, entering the graph.

The probe also has to listen to NSM events, such as point to point connectionis created by NSM between two pods. To this purpose, each NSM daemon is sending monitoring events over a grpc stream channel.

The probe will list NSM daemons available in the NSM domain. In the kubernetes context, this is done by asking the kubernetes API for registered NSM daemons. The NSM probe then connects to each one of them, and listen at monitoring events.

NSM daemons tell the probe about which pods are cross connected, with the linux networking namespace inode number of each pod. Since skydive is naturally monitoring networking namespaces, docker containers, and kubertnetes pods, we will be able to create new links between skydive nodes reprensenting those pods. Those links will reprensent the cross connect links created by NSM.

![](../../static/img/skydive-all.png)

With the help of the skydive team, we manage to find the correct filter to only display NSM elements in the graph, and highlight the crossconnect links.

![](../../static/img/skydive-nsm.png)

## Follow-up

- include deletion
- use for troubleshooting nsm
- vpp probe
