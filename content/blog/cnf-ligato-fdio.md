+++
title = "CNFs with a Dose of Ligato and FD.io/VPP"
type = "blog"
author = "Chris Metz"
date = "17 Nov 2018"
weight = 1
+++ 
Cloud Native Network Functions (CNFs) are containerized instances of a classic physical or virtual network functions (VNF). A fast dataplane incorporating current and future VNFs functions is tablestakes. Exposing the CNF dataplane to applications and plugins requires a control plane agent with APIs.
 <!--more--> 

# Introduction

Many Public, private and hybrid cloud operators have arrived at the on-ramp to “interstate cloud native”. Some have even blown through the metering lights and are accelerating, ready to leave those still picking up speed in the dust. Cloud native offers heaps of advantages: deployment velocity, horizontal scalability, resiliency, faster devops, optimized resource utilization and really cool project names with neat looking icons. 

Carving up application monoliths into smaller chunks of code called microservices; packaging up microservices into containers; housing said containers in PODs running on hosts (virtual or physical); using Kubernetes to orchestrate and schedule POD placements commanded by applications across standard Kubernetes (K8S) APIs - is THE way – the cloud native way.

Applications are king in cloud native land. But, you don’t hear a whole lot about networking in this space. Why is that so? A few thoughts. 

* __App developers don’t care about networking__ (sadly, treated as a gut course for many comp sci majors). They care about apps, how quickly they can be hacked, scrubbed of bugs and deployed to the cloud. 

* __Networking has its own language spoken only by fellow network geeks__ (full disclosure: I am a network geek). They get IPv4, ACLs, /32s, BGP, VXLAN tunnels, IPv6, Segment Routing, MPLS GRE, Service Chains and all that stuff (please consult your favorite network lexicon for more). What does all of that mean to the cloud native apps developer!? Nothing. Zero. Zip.

* __Speed mismatch between classic and cloud native network deployment and operations.__ The former is big monolithic “boxes” (physical or virtual), installed in one location in the network by smart network people, occasionally visited by smart network people for upgrades/troubleshooting (this is mutable infrastructure! See below) and generally left alone. Forever. The latter is bang-bang: PODs up! Here are the PODs you can talk to! Here are the services. Speak. PODs Out! All automated. All game time decisions. This is an absurdly simple comparison but you get the picture.

To be fair, Kubernetes (k8s) does define the [Container Network Interface (CNI)](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) – an API for network plugins that “bootstrap” and manage inter-POD communications. In other words, this provides network connectivity and makes the network transparent to PODs. That’s all good, but it also means PODs can’t really use other network services, such as security or QoS. Furthermore, k8s defines services and policies, which also have to be mapped into network configurations but there is no formal API to achieve this. Therefore it’s up to the network plugin implementers to figure out the mapping. 

Fortunately, the cloud native community is beginning to realize that networking is really important. Spurred on by innovations such as [FD](https://fd.io/).io (user space software data plane) and [BPF](https://opensource.com/article/17/9/intro-ebpf) (enhanced Berkeley Packet Filter), throughput is now seen as critical. The need for cloud native network functions (CNF) has been identified. CNF-enabling open source projects are active and code is up there in github repos. Vendors (legacy “big box” and new startups) are implementing and shipping CNFs. 

Cloud native seems ALL IN on networking.


# What is a CNF?

A virtual network function (VNF), is a software implementation of a network function traditionally performed on a physical device. Examples include IPv4/v6 routing, VPN gateway, L2 bridge/switch, firewall, NATs and tunnel encap/decap. 

Let’s lay out a few character traits of a VNF personality:

* __Deal mostly with L2 frames (Ethernet) and L3 (IP) packets.__ In some cases like a firewall or NAT, they could jump up to L4 to include TCP or UDP port numbers. Tuple bloat can occur if you drop down to L2 and include MAC, ethertype, VLAN, etc.). 

* __Typically come with more than one interface.__ Packet processing is sandwiched between input and output interfaces. Proof point is the extinction of one-armed routers.

* __Fast data plane.__ No dawdling in packet processing. Keep those packets moving, else users and apps will not be happy.

You get the idea. These are network functions, virtualized, with features and functions inherited from their physical antecedents. VNFs can be connected or combined together as building blocks to offer a full-scale networking communication service. 

VNFs are not nor can they be classified as web server entities with a full-blow TCP/UDP network stack. At this time. A VNF network stack is composed of network functions with the aforementioned traits. This is an important distinction when discussing a home for VNF stacks below. Please do not answer the door when “Techno Network Terminology Parsing Police” (TNTPP) come knocking. Let's try to cover all the bases with this: 

__VNF Stack is defined as the layer-specific packet processing functions (i.e. forwarding, policies, stats, etc.) required to realize the desired network function in virtual environments.__  

So, what exactly is a cloud native network function (CNF)? We could go with “ __[.. a VNF built and deployed using cloud native technologies ..]( https://github.com/State-of-the-Edge/glossary/blob/master/edge-glossary.md#virtualized-network-function-vnf)__”. Not bad but need a bit more to get the feel.  The first portion in this definition, “a VNF”, translates to a containerized instance of a VNF.



## User-in-Space

Let’s proceed to the “built” in this definition by cracking open a physical or virtual host with its own host operating system (i.e. Linux) allegedly supporting one or more CNFs. Inside you might find one or more of these CNFs (and/or application containers too) living inside Kubernetes pods. To simplify the discussion, let’s stay with containers and CNFs and assume they exist in pods. A VNF stack is now a CNF stack.

The CNFs could run a portion of their functions in what is referred to as user space. You will also find the host OS kernel providing various utilities including a TCP/IP network stack. All of the containers on this host rely on this single network stack. All packets in and out of user space must pass through the kernel. In this scenario, a CNF consists of one piece of function in user space and the other piece, the network stack, residing in the kernel. We can capture this notion with a figure below.

![Container Use Space and Host Kernel](/img/blog/user-space-kernel.png)

Does the CNF stack belong in the kernel? Must new CNFs rely on the kernel network functions? 

Maybe not. We could decide to park the entire CNF in user space. Now you can have each and every CNF run its own network stack including the data plane, each packaged with its own control and management plane instances. There is no need for the CNF to rely on the kernel network stack. 

How does a CNF residing in user space help?

* __Elevated performance throughput__ as now the CNF can talk directly to the physical network interface card (NIC) with the goal of keeping pace with the speed developments happening in this space.

* __Accelerated network innovation__ development and roll-out. CNF developers can go to town and paint their innovations on a large user space canvas. It is THE opportunity to mandate all CNFs run in user space. It just make sense.

* __Fast recovery__. If anything happens to the user space CNF stack (e.g. upgrade, crash, etc.), it DOES NOT bring down the whole node. You just restart it quickly and continue on with your work.

* __[12-Factor App Methodology](https://12factor.net/) applied to CNFs.__The nexus of innovation lives in the cloud. Adopting all or some of the principles in the design, development and deployment of CNFs is a no brainer. There is no downside. Just do it. 



![CNFs in User Space](/img/blog/user-space-CNF.png)



Take a look at these two figures and see if they resonate. The CNFs avoid the kernel altogether. Note that other pods (not shown) using the kernel can continue to operate business as usual.


## Don't Touch That! I'll Make You a New One.

The “deployed” can be realized through the use of the __[immutable infrastructure](https://www.digitalocean.com/community/tutorials/what-is-immutable-infrastructure)__ pattern. This means _“thou shall NOT TOUCH a software image in production”_. EVER. If changes are needed (e.g. bug fix, config mods, new feature upgrades), the image is destroyed, a new image created, and then cycled into production. Create – Deploy – Destroy, Rinse and Repeat. Clean, consistent, predictable and simple. 

Another take on the notion of immutable infrastructure says we can put place workloads (i.e. CNFs) anywhere in the network with confidence because all CNFs reside in user space. The kernel infrastructure never changes and thus is immutable. 

Think about this in the context of a mission-critical IT CNF, perhaps an advanced firewall. And suppose a new patch needs to be applied to this CNF image, STAT! If the zip code of the new CNF image is “userland”, then we can feel confident nothing will break. The kernel infrastructure is untouched – Immutable. __Don’t stress – immutable is best.__


## What else does a CNF need?

There are several not-to-be-left-unsaid properties we would like to see in CNFs moving forward.

* __Interface support__. CNFs must be interface-flexible meaning support for all of the different flavors of cloud native virtualized network interfaces (e.g. veth, memif). They should also be able to handle multiple interfaces concurrently, instead of just one as has been the case to date.

* __Observability__. CNFs must/must/must generate a robust suite of telemetry, logs, tracing, stats as a data feed into cloud native management solutions such as [Prometheus](https://prometheus.io/). This cannot be overlooked.

* __Programmability__. Cloud native deployment velocity dictates rapid CNF placement and turn up with the desired functions. Recall the need to map k8s services and policies to the network components. Or program a common software data plane to provide a new CNF function. Agents and APIs can make this happen. 

There are a few others such as CNF meshes and service chains but these are topics for future installments.

So there you have it. CNFs are containerized VNFs built and deployed with cloud native technologies. CNFs run in user space for maximum performance, isolation and “innovation-abiliy”. CNFs accommodate cloud native virtual network interfaces, incorporate observability functions and and interact with agents and APIs to manage CNF functions. CNFs should exploit immutable infrastructure deployment best practices with impunity. And goes without saying, all happening with the expressed written consent of the major league cloud native network community.

On to the discussion of the CNF data plane and programmability.


# Slow Down! You are going too fast!

[FD.io]( https://fd.io/) is touted as the “Universal Dataplane”. Cloud native networks will need every ounce of capacity, scale, functions and services that a software data plane can offer. Even then that might not be enough but fear not, the “innovationists” never stop working on something bigger/faster/better.  If this plot sounds familiar, please reference the history of the Internet.  

FD.io/VPP is an open source project sponsored by the Linux Foundation. It enjoys broad industry support and VPP itself has been implemented and deployed in products for years. For expediency purposes lets quickly list some its features that make FD.io attractive as a software data plane for CNFs:

* High Performance on the order of 1Tb throughput with a million routes on industry standard Intel and ARM processors. 

* Resource efficient.

* Developer-friendly and written in C

* Runs in user space 

* [Tons of L2, L3 and L4 features]( https://wiki.fd.io/view/VPP/Features) with too many to enumerate.

* Tons of exportable telemetry, logs, stats, etc.

* Plugin-ability. Customized functions to be easily hacked up and implemented into the VPP packet processing system

* High-speed shared memory interface [Memif]( https://www.youtube.com/watch?v=6aVr32WgY0Q) for inter-VPP communications

* Operates in bare metal, VM and container platforms.

* Programmability. This is necessary (see below).

We can be pretty confident that with the FD.io/VPP dataplane, CNF performance will be there as needed. Feature extensibility and plugin-ability offers future protection, developers will be down with it and operations folks will love it. 

For more information, you can tune into the [FD.io YouTube channel]( https://www.youtube.com/channel/UCIJ2OP6_i1npoHM39kxvwyg), pull down a very good whitepaper from [here]( https://fd.io/wp-content/uploads/sites/34/2017/07/FDioVPPwhitepaperJuly2017.pdf), puruse a [deck presented at ONS Europe 2018](https://events.linuxfoundation.org/wp-content/uploads/2017/12/High-Performance-Cloud-Native-Networking-K8s-Unleashing-FD.io-Maciek-Konstantynowicz-Giles-Heron-Cisco.pdf)) or open up your browser and exercise Google. Lots out there. 


# Someone Tell It What to Do

We have our CNF data plane. But a data plane alone, no matter how fast, doth not a network make. We need a programmable data plane. We need the ability for CNFs to communicate with other control and management microservices in the cloud native network. How can we do that?

[Ligato]( https://ligato.io/) is the answer.  The bumper sticker version of Ligato follows.

__Ligato is an open source project that provides a platform and code samples for development of cloud native VNFs. It includes a VNF agent for VPP ( FD.io ) and a Service Function Chain (SFC) Controller for stitching virtual and physical networking.__


For those looking into Ligato for the first time, it might not be 100% clear about what it is. How does it relate to CNFs? What apps and plugins are we talking about? Let’s clear that up right now. 

Ligato is composed of 3 x basic components: CN-infra, VPP agent and the SFC controller, all written in Go. Let's describe each.

* __[CN-infra](https://github.com/ligato/cn-infra)__, is a software platform that allows developers to build cloud native microservices. It is largely comprised of a set of plugins (<sigh> … an overloaded term for sure) where each plugin performs a specific function. They come with lifecycle management (i.e. initialization and graceful shutdown). It is the combination of plugins and lifecycle management that define the CN-infra platform is and can do.

* CN-infra comes OOTB (out-of-the-box) with plugins galore to choose from. If we scan the [CN-infra github examples folder(https://github.com/ligato/cn-infra/tree/master/examples), you will find an abundance of plugins supporting different functions including those for APIs, datastores, messaging and logging. One more point about plugins and that is the developer is not required to use all plugins – merely those specific to the microservice(s) they wish to build. 

* App developers can create their own application-specific plugins. For example, if a new microservice requires kafka messages to be consumed and written to a database, the developer could use the CN-infra Kafka plugin to ingest the messages and an application plug-in to write the messages to a database. 

The __[VPP agent]( https://github.com/ligato/vpp-agent) is the second family member living under the Ligato roof.__ Basically it is a set of VPP-specific plugins built on top of CN-Infra. The use of one or more of these plugins (along with any other application plugins) exposes FD.io/VPP functionality (e.g. forwarding, packet service treatment, stats generation, etc.) to other CN-infra plugin and/or external control/management applications.
	
![VPP Agent](/img/blog/vpp-agent-single.png)

Let’s examine how the VPP agent fits into a CNF with an FD.io/VPP dataplane. In figure above we show a container (in user space of course) with an FD.io/VPP dataplane and the VPP agent. We described earlier the notion of user space CNFs and so DPDK drivers are used here to speak directly to the NIC and bypass the kernel.  

On top of is the VPP agent. There is a set of OOTB plugins providing northbound APIs for configuring and managing default VPP functions such interface configuration, L2 bridge domains, L3 IP routing/VRFs, L4 namespaces, ACLs and segment routing. Other plugins extending FD.io/VPP control and management API access can be incorporated into the agent. [GoVPP]( https://wiki.fd.io/view/GoVPP) is a Go-based toolset allowing plugins to communicate with the VPP process. And finally, the VPP agent and all sundry pieces inherit lifecycle management from CN-infra. Pretty cool, heh?

The __[SFC Controller]( https://github.com/ligato/sfc-controller)__ is the third piece of the Ligato puzzle. The “SFC” in SFC Controller offers a hint of what it is supposed to do. Yes, that’s right – it strings together a set of CNFs into a service function chain. 

We are fast approaching the well-known attention span threshold and I need to go to the store. Let’s punt on the SFC Controller for now and save it for a future blog. 

  
# Almost Done

What have we got so far?


* __Decent definition of a CNF. VNF workloads living in containers.__ Maybe not the most complete but good enough for now.

* __Cloud Native-ized, open source software-based data plane bulging with features.__ FD.io cuts it.

* __Compendium of functional plugins backed up by open source libraries, documentation, examples, lifecycle management and a credo of “only use what is needed”.__ Environment is friendly for creating and applying customized plugins. Ligato!

* __Agent for control and management of VPP-based data plane.__ The VPP agent offered up with Ligato.


Where do we go from here? The answer is …

#### The Programmable VPP vSwitch!

_By bolting the control plane VPP agent and VPP data plane together, a programmable VPP vSwitch is created – a CNF really - a basic CNF building block - the foundation for high-performance container network solutions._

![programmable vpp vswitch](/img/blog/prog-vpp-vswitch.png)

Absent the requisite cloud native management and control plane pieces, it is perfectly legal to picture this as a CNF. Modern networks (physical or virtual) require that switches are outfitted with a variety of interfaces accommodating different devices, hosts, capacities, services and network configurations. Same applies here but now we are dealing with the new (memifs) and the legacy (e.g.veth). 

Switches provide high-throughput L2/L3 forwarding. And not just for slinging packets - also present are policies, QoS, stats export and so on. These cannot, I repeat cannot impact performance. This is the case here with the VPP vSwitch. And it is programmable. And fast. Very.

We have the programmable VPP vSwitch. Throw in a little user space data plane functionality, immutability deployment practices, Kubernetes lifecycle management, and the tools to build customized microservice and we have the pieces in place to craft up cool CNF-flavored solutions.

Where do we go from here? I would hazard a guess – more cool CNF solutions. 

Stay tuned.



