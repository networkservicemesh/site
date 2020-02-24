+++
title = "NSMCon EU 2020"
subtitle = ["March 30,2020 | Amsterdam, The Netherlands","Colocated with [Kubecon+CloudNativeCon EU 2020](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/)"]
date = "2019-11-18"
publishDate ="2019-08-02"
toc = true
[[buttons]]
  name="Register"
  href="https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/register/"
[[buttons]]
  name="Become a Sponsor"
  href="/pdf/NSMConEU2020Prospectus.pdf"
+++

# Schedule

March 30,2020 | Amsterdam, The Netherlands

{{% talk time="09:00am" title="Keynotes" %}}
{{% /talk %}}
{{% talk time="09:15am" title="Inside Network Service Mesh" %}}
The Network Service Mesh (NSM) is a novel, ambitious approach to implement cloud native networking. At the core of NSM 
is a set of APIs designed to implement scalable, reliable, on-demand connectivity between Network Service Endpoints. 
Using a systems modeling approach, this talk will shed light on NSM’s APIs and architecture. Together, we shall
untangle the mesh and arrive at a concise and accurate mental model of NSM’s internals, its core components and
their interactions - If you want to know how the Network Service Mesh works, this presentation is for you.

### Speaker
{{% speaker name="Dominik Tornow - Principal Engineer, Cisco Systems" github="dtornow" linkedin="dtornow" img="/img/events/nsmcon2019/tornow.png" %}}
Dominik is a Principal Engineer in the Office of the CTO at Cisco. He focuses on systems modeling, specifically 
conceptual and formal modeling, to support the design and documentation of complex software systems.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="09:45am" title="A Break From the Past, Why CNFs Must Move Beyond the NFV Mentality" %}}
Cloud native software approaches are infiltrating Telcos at an ever accelerating pace. The conundrum many operators
find themselves faced with, is understanding what it really means to be cloud native, and how these principles
apply to their networks. Adopting legacy approaches from the NFV era forces paradigms onto the network that potentially
erode some if not most of the benefits that making this transition promised in the first place. Technologies such as
NSM present new opportunities for tackling these challenges via adopting cloud native software practices.

### Speaker
{{% speaker name="Jeffrey Saelens - Principal Engineer, Charter Communications" twitter="nerdengineering" github="jeffsaelens" linkedin="jeffrey-saelens-30211020" img="/img/events/nsmconeu2020/jeffrey_saelens.jpg"%}}
Jeffrey Saelens is a Principal Architect in Charter Communications’ Office of the CTO. Starting his career in the
US Army, Jeffrey was a Green Beret who focused on communications and systems engineering. After leaving the military,
he dove into the service provider world heavily focusing on NFV and SDN transformations within data center, core and
access networks.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="10:15am" title="BREAK" %}}
{{% /talk %}}
{{% talk time="10:30am" title="Offloading dataplane from the network services for Telco usecases" %}}
Network Service Mesh provides a better framework to solve some of the key challenging telco requirements that cannot 
be addressed today using kubernetes primary networking model. The seminar will highlight the proposals that can
enhance Network service mesh framework to support telco use cases.

### Speakers
{{% speaker name="Roshini Ratnam - Networking and Connectivity Architect, Ericsson" github="roshnihp" linkedin="roshini-r-0995763b" twitter="roshnihp" %}}
Roshini Ratnam, is an Architect in Cloud Native Connectivity at Ericsson. Roshini has above 10 years of experience in
various Telecom and Networking projects with different organizations including Ericsson, Nokia Networks and Cisco
Systems. In her current role she mainly focuses on leading connectivity and networking solutions for cloud native
applications. This also includes prototyping solutions for Telecom-specific requirements.
{{% /speaker %}}
{{% speaker name="Anders Franzen - Technology Specialist, Ericsson" %}}
Anders Franzen is an engineer in Ericsson AB with 30+ years of professional experience in HA-systems,
networking and operating systems for telco. Living in Stockholm, Sweden. He is currently working with the
transition into the cloud native paradigm
{{% /speaker %}}
{{% /talk %}}
{{% talk time="11:00am" title="Using DNS to smooth your NSM adoption" %}}
Network Service Mesh is rapidly evolving to support more complex topologies, especially in hybrid or multicloud 
environments.  In these environments service advertisement and discovery also become significantly more complex.
There are two distinct problems.  The first is discovery of NSM network services by all the NSM deployments.
The second is workload services and endpoints must be discoverable on the NSM created interfaces.   In this
presentation and demo we will show how externaldns (https://github.com/kubernetes-sigs/external-dns) integrated with
NSM can meet all the complex service advertisement and discovery issues multicloud environments require. We will go 
into detail on how to configure NSM and NSEs to provide service discovery to the workloads.  Additionally, we will
show how externaldns can be used to register Floating Inter-domain NSRs to allow discovery of NSM network services.

### Speakers
{{% speaker name="John Joyce - Principal Engineer, Cisco Systems" github="john-a-joyce" img="/img/events/nsmcon2019/johnjoyce.jpg" %}}
John is a principal engineer at Cisco responsible for developing cloud infrastructure and solutions. As part of the 
Cloud CTO Office, John currently focuses on contributing to the Kubernetes, Istio  and Network Service Mesh 
communities and building multicloud solutions. Previously, John was an active contributor to OpenStack. John has a 
long history contributing to various Cisco virtual and physical networking products.
{{% /speaker %}}
{{% speaker name="Tim Swanson - Senior Technical Lead, Cisco Systems" twitter="tiswanso" github="tiswanso" linkedin="tim-swanson-7379264" img="/img/events/nsmcon2019/timswanson.png" %}}
Tim is a senior technical lead engineer at Cisco in the office of the CTO for Cloud Platform & Solutions. Tim’s 
current focuses are on multicloud solutions, service meshes, and contributing to related opensource c
ommunities—primarily, Istio. Previously, Tim was an active contributor to OpenStack. Prior to open-source work, 
Tim was primarily involved in developing embedded features for Cisco’s physical networking products, with a focus 
on manageability. His spare time consists coaching sports and generally being active with his 2 children.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="11:30am" title="The NSM Operator" %}}
This presentation intends to demonstrate the benefits of a kubernetes operator, a quick introduction to operator-sdk
and operator lifecycle manager using the nsm-operator as an example.

## Speaker
{{% speaker name="Alexandre Menezes - Service Reliability Engineer - SRE, Red Hat" %}}
A cloud native developer and SRE.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="12:00pm" title="LUNCH" %}}
{{% /talk %}}
{{% talk time="01:00pm" title="NSM Interdomain:  Functional Walkthrough, Use-cases, and Demo" %}}
The ability of Network Service Mesh to provide connections between network service clients and endpoints regardless
of their deployment domain is very attractive and exciting for those providing infrastructure for multi-cluster and
multi-cloud applications.  However, NSM’s highly distributed architecture and flexibility in the component
implementations can make it difficult to understand the deployment and usage of an interdomain capable NSM setup.
This talk will walk-through the NSM components involved, various control-plane flows, and domain specific deployment
requirements for interdomain NSM.  We will also introduce some of the control-plane deployment variations, such as
floating interdomain.  Additionally, we will demonstrate an NSM interdomain deployment to highlight component and
domain specific details, as well as, usage with specific clients and endpoints for a network-service.

### Speakers
{{% speaker name="Tim Swanson - Senior Technical Lead, Cisco Systems" twitter="tiswanso" github="tiswanso" linkedin="tim-swanson-7379264" img="/img/events/nsmcon2019/timswanson.png" %}}
Tim is a senior technical lead engineer at Cisco in the office of the CTO for Cloud Platform & Solutions. Tim’s 
current focuses are on multicloud solutions, service meshes, and contributing to related opensource c
ommunities—primarily, Istio. Previously, Tim was an active contributor to OpenStack. Prior to open-source work, 
Tim was primarily involved in developing embedded features for Cisco’s physical networking products, with a focus 
on manageability. His spare time consists coaching sports and generally being active with his 2 children.
{{% /speaker %}}
{{% speaker name="John Joyce - Principal Engineer, Cisco Systems" github="john-a-joyce" img="/img/events/nsmcon2019/johnjoyce.jpg" %}}
John is a principal engineer at Cisco responsible for developing cloud infrastructure and solutions. As part of the 
Cloud CTO Office, John currently focuses on contributing to the Kubernetes, Istio  and Network Service Mesh 
communities and building multicloud solutions. Previously, John was an active contributor to OpenStack. John has a 
long history contributing to various Cisco virtual and physical networking products.
{{% /speaker %}}

{{% /talk %}}
{{% talk time="01:30pm" title="Attesting, Authenticating and Authorizing NSM Components with SPIRE" %}}
In the course of normal operation, many different NSM components touch the control and data paths. Any one of
these services could be compromised to modify or capture network traffic. To prevent this, NSM can use SPIRE, a
CNCF project which creates a secure X.509 encryption certificate for each service based on its true identity as
reported by Kubernetes (or other infrastructure like AWS), interpreted by rules specified in the SPIRE configuration.
In this talk, we will discuss what NSM operators need to know about SPIRE: how it ensures security, how to configure
it to secure NSM traffic, and how to operate a scalable and reliable central SPIRE server in the context of NSM.

### Speakers
{{% speaker name="Ilya Lobkov - Software Engineer, Xored" github="lobkovilya" linkedin="ilya-lobkov-44465b122" %}}
Ilya Lobkov develops NSM at Xored. 
{{% /speaker %}}
{{% speaker name="Daniel Feldman - Principal Software Engineer, Scytale.io" twitter="d_feldman" github="dfeldman" linkedin="dfeldman" %}}
Daniel Feldman works on SPIFFE service authentication technology, including SPIRE and Scytale Enterprise. He previously
implemented service authentication at Veritas Technologies.  
{{% /speaker %}}
{{% /talk %}}
{{% talk time="02:00pm" title="Traffic visualization solutions for NSM" %}}
Тhe NSM project already announced its second release and is now in a pretty good stage of capabilities it can offer,
including inter-domain connectivity, DNS support, secure gRPC communication and more. It also provides communication
visibility of dropped and successfully transmitted bytes and packets between each connected client and endpoint.
The community would like to go further and provide a really good and interactive way to observe the network traffic
and topology - something we find highly beneficial and important for increasing the adoption of the project. In this
talk we’re going to share different visualization solutions we have explored for NSM, demonstrate some of them with
a 4G LTE network example deployed with NSM, share the path for their further integration and what we want to change
and improve in that direction. The talk is aiming to provoke a discussion around the preferences of those interested
in adopting the project and using such functionality in future.

### Speaker
{{% speaker name="Ivana Atanasova - Open Source Engineer, VMware" twitter="ivanabyov" github="ivanayov" linkedin="ivana-atanasova-15119b98" img="/img/events/nsmcon2019/ivanaatanasova.jpg"%}}
Ivana Atanasova is part of the VMware’s Open Source Program Office. She’s been contributing to OpenFaaS as a project 
member and later became contributor to Network Service Mesh. Previously she has been working on Apache Brooklyn and 
Brooklyn Blockstore, as well as a contractor with the Institute of Mathematics and Informatics at the Bulgarian 
Academy of Sciences for NLP related projects. She's been speaking to various events including KubeCon, 
Open Networking Summit and Open Source Summit EU. 
{{% /speaker %}}
{{% /talk %}}
{{% talk time="02:30pm" title="CN-WAN: a Cloud Native (SD-)WAN for Microservice Applications" %}}
SDWAN provides WAN optimization services such as latency reduction, throughput improvement, TCP optimization, and
packet loss prevention. However, existing solutions can’t  offer such services with microservices granularity. As a
result, cloud native applications are missing the opportunity to efficiently use those precious WAN resources on both
the user-to-app as well as the app-to-app path. In this presentation we introduce the concept of a Cloud-Native WAN,
the evolution of SDWAN to support cloud-native applications. In particular we show how to leverage the NSM forwarder
construct to plug a microservice application to the entry point of an SDWAN to offer optimizations with microservice
granularity. The proposed approach allows developers to declare specific application traffic SLAs using simple
configurations applied to the application workload objects. We show a proof of concept implementation where using
CN-WAN significantly improves the application quality of experience.

### Speakers
{{% speaker name="Fabio Maino - Distinguished Engineer, Cisco Systems" linkedin="fabio-maino-4132301" %}}
Fabio Maino is a Distinguished Engineer in the Enterprise Networking CTO team at Cisco where he leads a small team of
engineers that are exploring the boundaries between Enterprise Networks and the Cloud Native ecosystem. Fabio has
about 50 patents filed with the US PTO, is one of the founders of the OpenOverlayRouter.org open source project,
and has a PhD in Computer Networking and Security from Politecnico di Torino, Italy.   
{{% /speaker %}}
{{% speaker name="Lorand Jakab - Software Engineer, Cisco Systems" linkedin="lorand" %}}
Lorand Jakab is a Software Engineer in the Enterprise Networking CTO team at Cisco, His interest in Cloud Native and
networks comes from his work with LISP network overlays in the OpenOverlayRouter.org open source project, of which
he is one of the founders. Lorand has a phD in Computer Science from Universitat Politècnica de Catalunya,
BarcelonaTech.   
{{% /speaker %}}
{{% /talk %}}
{{% talk time="03:00pm" title="BREAK" %}}
{{% /talk %}}
{{% talk time="03:30pm" title="Cloud-native SR-IOV with Network Service Mesh" %}}
Advertising hardware devices in Kubernetes is possible through the device plugin framework. An example of such a 
plugin is the Intel SR-IOV network device plugin that lets you discover and advertise hardware network devices in
Kubernetes. In this talk, we’ll introduce a new forwarding plane that enables the SR-IOV device plugin for use with
Network Service Mesh (NSM) – a CNCF Sandbox project solving complicated L2/L3 use cases challenging the existing
network model in Kubernetes. Combining that with the high-performance features of SR-IOV makes it possible to consume
hardware devices in a cloud-native way using the NSM API. This benefits every enterprise software demanding
cloud-native high-performance behavior - for example, industry use cases like Telco, Fintech, High-Frequency
Tradings, HPC systems and more.

### Speakers
{{% speaker name="Radoslav Dimitrov - Open Source Software Engineer, VMware" twitter="radoslav_dimitr" github="rdimitrov" linkedin="radoslavdimitrov" %}}
Radoslav Dimitrov is working as a full-time Open Source Software Engineer at VMware. Currently, he’s contributing
to the Network Service Mesh project, but before that he was working on other open source projects like OpenStack,
OPNFV, QEMU and OpenFaaS. He has spoken at previous LF events like Open Network Summit and Open Source Summit.
Prior to his work at VMware, he worked remotely for a French-based virtualization company focused on HPC systems
and ARM devices.
{{% /speaker %}}
{{% speaker name="Przemyslaw Lal - Software Engineer,  Intel/TietoEVRY" github="przemeklal" %}}
Cloud software engineer with over 4 years of experience in cloud-native infrastructure software development,
specialized in enabling Kubernetes for NFV use cases, including data plane acceleration, advanced network interfaces
plumbing features and optimization of hardware resources allocation for Kubernetes workloads. He has contributed to
various open-source projects such as OpenStack, Intel CPU Manager for Kubernetes, SRIOV CNI plugin, SRIOV Network
Device Plugin and, most recently, Network Service Mesh.
{{% /speaker %}}

### Speakers
{{% /talk %}}
{{% talk time="04:00pm" title="NSM Customer Success! QoE, L3VPN, and NAT64 oh my!" %}}
In this session, Zia Syed and Dan Bernier will present an NSM Customer Success story! After meeting at NSMCon 2019,
Bell and Cisco partnered together to combine their NSM visions. In this session, Zia and Dan will present how they
took NSM proof-of-concept ideas and made them into functional use-cases that benefit Bell’s business goals.

At first, the NSM solution was one that enabled container-based applications to request their own network 
"Quality of Experience" using a SDN system nicknamed “Jalapeno”. The combination allowed NSM to offer services such as 
traffic engineering, path steering, or even virtual topology creation to containerized applications. Since then,
the use-cases have grown, with L3-VPN taking center stage as an NSM service created out of this partnership.
One of Bell’s key use cases is to attach a cloud-native network function (NFV) endpoint directly to an L3VPN VRF.
With NSM we can do this!

### Speakers
{{% speaker name="Zia Syed - System Engineer, Cisco Systems" linkedin="therealziasyed" img="/img/events/nsmcon2019/ziasyed.jpeg" %}}
Zia Syed is a Software Systems Engineer at Cisco, where he has launched his career by taking on new challenges in 
application and network optimization.  Over the past three years, he has worked with modern tech stacks, open-source 
solutions, and futuristic innovations to develop transformations in scalability, automation, and efficiency for Web 
operators. Before joining Cisco, Zia graduated from Cal Poly San Luis Obispo with a degree in Computer Science.
{{% /speaker %}}
{{% speaker name="Daniel Bernier - Senior Technical Architect, Bell Canada" github="dabernie" twitter="danbernie01" linkedin="dabernie" img="/img/events/nsmcon2019/dbernier.jpg" %}}
Daniel is a Senior Architect in the Network Strategy team at Bell Canada involved in research and development of 
disruptive technologies transforming the Telco space. He is currently working on the edge cloud strategy and 
cloud-native transformation leveraging optimized CP/UP separation and advances in network and hardware 
programming for cost effectiveness. He is involved in various open source community projects such as FD.io, 
Network Service Mesh and P4.org. He is also participating at the IETF, co-authoring and collaborating on various 
drafts for SPRING based service-programming and SFC.
{{% /speaker %}}
{{% /talk %}}

# Why Attend NSMCon?
{{< img-text img="/img/events/NSMCon1.png">}}
Are you running workloads in multiple clusters? Across multiple clouds: on-premises, hybrid, multi-cloud, or public cloud? Do they need to interact with legacy workloads running in less “cloudy” environments? Network Service Mesh (NSM) ties them all together, at the granularity of individual workloads, not clusters/VPCs/data centers. 

NSM, a community-driven CNCF Sandbox project, is rapidly gaining momentum because simplifies connectivity between workloads, independent of where they run. It extends an IP reachability domain to workloads running in multiple clusters, legacy environments, on-premises, or in a public cloud, communicating with the existing protocols.

NSM does this at the granularity of individual workloads. Your workloads have connectivity to just the workloads they need - nothing more, nothing less. NSM brings the useful features of a Service Mesh from the lofty heights of HTTP all the way down to IP itself. Applications and Application Service Meshes, such as Istio, run unaltered on top, leaving the hybrid/multicloud IP connectivity to NSM.

The project emerged organically as a community project to solve these problems by applying the Service Mesh thought process all the way down to IP with the global peering mentality of the Internet itself – without breaking your existing environment.

Join the people building and using NSM at Network Service Mesh Con for a day of tutorials, deep dives, and use cases to learn how NSM works, what it can do for you, and, most importantly, what’s coming next.
{{< /img-text >}}

# Become a Sponsor

Review [NSMCon Prospectus](/pdf/NSMConEU2020Prospectus.pdf) and contact sponsors@networkservicemesh.io to secure your sponsorship today.
