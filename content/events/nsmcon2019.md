+++
title = "NSMCon"
subtitle = ["Nov 18, 2019 | San Diego, California","Colocated with [Kubecon+CloudNativeCon 2019](https://events.linuxfoundation.org/events/kubecon-cloudnativecon-north-america-2019/)"]
date = "2019-11-18"
publishDate ="2019-08-02"
toc = true
[[buttons]]
  name="Register"
  href="https://events.linuxfoundation.org/events/kubecon-cloudnativecon-north-america-2019/register/"
+++

# Schedule

Monday Nov 18, 2019 | San Diego, California

{{% talk time="09:00am" title="Keynotes" %}} {{% /talk %}}
{{% talk time="09:15am" title="NSM, a network noob's point of view" %}}
The Network Service Mesh advertises itself as a novel approach to complex networking. 
This statement is just as intriguing as it is vague! This talk will shed light on NSM by 
providing clear, tangible definitions and explanations of virtual wires, network service 
endpoints, network services and NSM's architecture from a network noob's point of view. 
Together we shall arrive at an accurate, actionable mental model of NSM, what it is and 
how it works. 
### Speaker
{{% speaker name="Dominik Tornow - Principal Engineer, Cisco Systems" github="dtornow" linkedin="dtornow" img="/img/events/nsmcon2019/tornow.png" %}}
Dominik is a Principal Engineer in the Office of the CTO at Cisco. He focuses on systems modeling, specifically 
conceptual and formal modeling, to support the design and documentation of complex software systems.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="09:45am" title="Adopting Network Service Mesh with Meshery"
                      speaker1Name="Lee Calcote" 
                      speaker1Title="Founder"
                      speaker1Company="Layer5"
                      speaker2Name="Girish R Ranganathan" 
                      speaker2Title="Chief Architect"
                      speaker2Company="Layer5"
                      speaker3Name="Prem Sankar" 
                      speaker3Title="Director of Engineering"
                      speaker3Company="Lumina Networks"
                      %}} 
Trying to understand the service mesh strata? Brace yourself. It gets a bit meshy. Data plane, 
control plane, and a… management plane. What is a management plane and how is it different 
than a control plane?

Learn how Meshery, an open source, multi-service mesh management plane integrates with 
Network Service Mesh as we discuss and demonstrate their complimentary architecture. As a 
multi-mesh management plane, Meshery manages the lifecycle of NSM, providing insight into its 
CNFs while facilitating benchmarking of various configuration scenarios of 
Network Service Mesh.

See how these three service mesh planes combine to facilitate performance comparisons of 
services (applications) on and off the mesh and across different meshes. Understand the caveats 
of onboarding your applications onto a service mesh as Meshery validates best practices 
configuration of NSM and its CNFs.

### Speakers
{{% speaker name="Lee Calcote - Founder, Layer5" github="leecalcote" linkedin="leecalcote" twitter="lcalcote" img="/img/events/nsmcon2019/leecalcote.jpeg" %}}
Lee Calcote is an innovative product and technology leader, passionate about empowering engineers with efficient 
and effective solutions. As Founder of Layer5, he is at the forefront of the cloud native movement. Open source, 
advanced and emerging technologies have been a consistent focus through Calcote’s tenure at SolarWinds, Seagate, 
Cisco and Schneider Electric. An advisor, author, and speaker, Calcote is active in the community as a Docker Captain, 
Cloud Native Ambassador and Google Summer of Code Mentor.
{{% /speaker %}}
{{% speaker name="Girish R Ranganathan - Chief Architect, Layer5" github="girishranganathan" linkedin="girishranganathan" twitter="ingenious_G" img="/img/events/nsmcon2019/girish_ranganathan.jpg" %}}
Girish is a software technologist who has played a pivotal role in architecting and developing a variety of large 
scale distributed systems on a range of platforms including microservices, service meshes and serverless. He strongly 
believes that simple ideas can go a long way into building efficient, reliable, secure and scalable systems.
{{% /speaker %}}
{{% speaker name="Prem Sankar - Director of Engineering, Lumina Networks" twitter="premsankar" github="gpremsankar" linkedin="premsankar" %}}
Prem Sankar Gopannan brings two decades of experience to bear as Lumina Networks’ Director of Engineering. At Lumina, 
he leads 5G product strategy where he leverages his open source expertise. Previous to his role at Lumina, Prem 
managed SDN product strategy focusing on cloud-native architecture and product delivery within cloud and networking 
domains. An active evangelist of Microservices and SDN/Telco/Edge Cloud architectures, Prem is commonly found leading 
Cloud Native NF and Kubernetes sessions and workshops. His engagement includes opensource summits, Opendaylight, 
OPNFV, Intel SDN/NFV developer labs and Open networking summits, extends digitally through his technology 
microblog: <a href="http://twitter.com/premsankar"><i class="fab fa-twitter"></i></a>.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="10:15am" title="BREAK" %}}
Coffee and refreshments will be offered during this 15 minute break.
{{% /talk %}}
{{% talk time="10:30am" title="Network Service Mesh + SDN for Application Quality of Experience" %}}
Telcos, ISPs, and enterprises are looking to adopt cloud-native solutions in the face of industry transitions to NFV, 
5G, edge computing, IoT, and multi-cloud connectivity. Network Service Mesh facilitates the move to cloud-native by 
providing a toolset for containerized applications to take advantage of advanced networking capabilities.  In this 
session, Bruce McDougall and Zia Syed will present and demonstrate an NSM solution which enables container-based 
applications to request their own network "Quality of Experience". The solution itself is an integration of NSM with 
the team’s microservices-based SDN system nicknamed “Voltron”.  The combination allows NSM to offer services such as 
traffic engineering, path steering, or even virtual topology creation to containerized applications with use cases 
spanning 5G, network slicing, and next-gen VPNs.

### Speakers
{{% speaker name="Bruce McDougall - Systems Architect, Cisco Systems" github="brmcdoug" linkedin="bruce-mcdougall-02503a1" %}}
Bruce McDougall is a Systems Architect at Cisco where he has spent 10 years working with some of the world’s most 
sophisticated Web/OTT and Telco operators on high scale network architecture, Segment Routing, MPLS, SDN, and network 
automation. Prior to Cisco, Bruce spent a number of years as a network engineer and architect working in both the web 
and service provider sectors.  His goal is to help large scale network operators move toward centralized control planes 
and common API-driven dataplanes across all transport networks, which will improve the ability to innovate on top of 
the network, and lead to massive increases in operational scale.
{{% /speaker %}}
{{% speaker name="Zia Syed - System Engineer, Cisco Systems" linkedin="therealziasyed" %}}
Zia Syed is a Software Systems Engineer at Cisco, where he has launched his career by taking on new challenges in 
application and network optimization.  Over the past three years, he has worked with modern tech stacks, open-source 
solutions, and futuristic innovations to develop transformations in scalability, automation, and efficiency for Web 
operators. Before joining Cisco, Zia graduated from Cal Poly San Luis Obispo with a degree in Computer Science.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="11:00am" title="Integrating Tungsten Fabric and Network Service Mesh " %}}
Come learn how we have integrated Tungsten Fabric and NSM to supercharge Kubernetes networking! Learn how to connect 
your pods to advanced network services which have been battle hardened in telecom and large enterprise environments. 
In addition to presenting an integration, we discuss how the technology between the two works and how both communities 
collaborated together to achieve a common goal.  If time permits, we will also show a demo.
### Speaker
{{% speaker name="Sukhdev Kapur - Distinguished Engineer, Juniper Networks" twitter="sukhdevk" github="sukhdev-8" linkedin="sukhdev-kapur-9ba996" img="/img/events/nsmcon2019/sukhdev.jpg" %}}
Sukhdev Kapur is Distinguished Engineer at Juniper Networks. He is part of Contrail Software Development team. He is 
on the TSC of Tungsten Fabric and Akraino Edge Stack (open source projects under Linux Foundation). He is also on 
Technical Advisory Council of LF Edge.  Sukhdev is a networking veteran with 20+ years in highly available distributed 
systems, cloud computing, disaster recovery, policy based mobile workloads mgmt, and software defined networks.  He 
holds several patents in cloud computing, hierarchical data center deployments, cloud based disaster recovery, high 
availability, etc.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="11:30am" title="Building upon NSM to create inter-cluster private L3 networks" %}}
The NSM inter-domain feature adds the ability for NSM to create connections between clients and network service 
endpoints in different NSM domains, e.g. Kubernetes clusters.  Building upon this capability, it’s possible to create 
network service endpoints that dynamically form a common private L3 routing domain to interconnect workloads hosted in 
multiple NSM domains.  This presentation and demo will explore an example implementation of a virtual L3 network 
service endpoint, the NSM inter-domain deployment, and resulting dataplane connectivity details across multiple 
Kubernetes clusters.  We will discuss the integration of existing application service mesh L4-L7 features with 
the virtual L3 NSE to highlight the simplifications in the application admin experience.
### Speakers
{{%speaker name="Tim Swanson - Senior Technical Lead, Cisco Systems" twitter="tiswanso" github="tiswanso" %}}
Tim is a senior technical lead engineer at Cisco in the office of the CTO for Cloud Platform & Solutions. Tim’s 
current focuses are on multicloud solutions, service meshes, and contributing to related opensource c
ommunities—primarily, Istio. Previously, Tim was an active contributor to OpenStack. Prior to open-source work, 
Tim was primarily involved in developing embedded features for Cisco’s physical networking products, with a focus 
on manageability. His spare time consists coaching sports and generally being active with his 2 children.
{{% /speaker %}}
{{% speaker name="John Joyce - Principal Engineer, Cisco Systems" github="john-a-joyce" %}}
John is a principal engineer at Cisco responsible for developing cloud infrastructure and solutions. As part of the 
Cloud CTO Office, John currently focuses on contributing to the Kubernetes, Istio  and Network Service Mesh 
communities and building multicloud solutions. Previously, John was an active contributor to OpenStack. John has a 
long history contributing to various Cisco virtual and physical networking products.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="12:00pm" title="LUNCH - sponsored by Juniper Networks" %}}
Lunch will be provided during this one hour break courtesy of our lunch sponsor 
{{< figure src="/img/events/nsmcon2019/juniper-networks-logo.svg" link="https://www.juniper.net" >}}
{{% /talk %}}
{{% talk time="01:00pm" title="How SMI inspired NSM traffic observability" %}}
NSM effort was launched in order to address gaps in handling complicated L2 and L3 use cases. Now celebrating its 1st 
release, the project can be proud of a pretty stable state and a wide variety of features. It came to a point where 
it needs to focus on integrating solutions and increasing easy adoption and observability. Meanwhile, given that 
Service Mesh is a hot topic with different competing implementations on the cloud native landscape, the open source 
project SMI was born with broad industry support to unite all efforts in this area under a common specification. 
Starting with the idea to adopt SMI for the non-standard  L2/L3 use cases that NSM covers, the outcome turned out to 
be bigger than expected, reflecting in an improvement of the traffic observability - an important step forward the 
project usability. In this session we will introduce details around the SMI adoption and the practical results of the 
community efforts in the direction of increasing monitoring capabilities.
### Speaker
{{% speaker name="Ivana Atanasova - Open Source Engineer, VMware" twitter="ivanabyov" github="ivanayov"%}}
Ivana Atanasova is part of the VMware’s Open Source Program Office. She’s been contributing to OpenFaaS as a project 
member and later became contributor to Network Service Mesh. Previously she has been working on Apache Brooklyn and 
Brooklyn Blockstore, as well as a contractor with the Institute of Mathematics and Informatics at the Bulgarian 
Academy of Sciences for NLP related projects. She's been speaking to various events including KubeCon, 
Open Networking Summit and Open Source Summit EU. 
{{% /speaker %}}
{{% /talk %}}
{{% talk time="01:30pm" title="I hear you like meshes, here’s a mesh to connect your meshes" %}}
There are many application service mesh related projects (Istio, Linkerd, SMI, etc.).  Network Service Mesh (NSM) 
aims to solve a slightly different problem.  Used together they are immensely powerful.   NSM can be used to solve 
microservice specific multicloud connectivity issues, but even with that connectivity, application service mesh 
integration doesn’t come for free.  Application service mesh solutions are great in single cloud environments but 
become unwieldy or unusable across multiple environments.  In this talk and demo we will show an NSM multicloud 
application connectivity solution with Istio integration to provide the control, security and observability 
applications require ACROSS multiple clouds.  We will demo Istio service discovery working with NSM connected 
workloads.  Envoy with form an application service mesh on top of the network mesh created by NSM.  This will allow 
Istio to provide seamless control over microservices regardless of how they are connected.
### Speakers
{{% speaker name="John Joyce - Principal Engineer, Cisco Systems" github="john-a-joyce" %}}
John is a principal engineer at Cisco responsible for developing cloud infrastructure and solutions. As part of the 
Cloud CTO Office, John currently focuses on contributing to the Kubernetes, Istio  and Network Service Mesh 
communities and building multicloud solutions. Previously, John was an active contributor to OpenStack. John has a 
long history contributing to various Cisco virtual and physical networking products.
{{% /speaker %}}
{{% speaker name="Tim Swanson - Senior Technical Lead, Cisco Systems" twitter="tiswanso" github="tiswanso" %}}
Tim is a senior technical lead engineer at Cisco in the office of the CTO for Cloud Platform & Solutions. Tim’s 
current focuses are on multicloud solutions, service meshes, and contributing to related opensource c
ommunities—primarily, Istio. Previously, Tim was an active contributor to OpenStack. Prior to open-source work, 
Tim was primarily involved in developing embedded features for Cisco’s physical networking products, with a focus 
on manageability. His spare time consists coaching sports and generally being active with his 2 children.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="02:00pm" title="Can NSM provide networking superpowers for 5G?" %}}
The presentation will:
* describe how 5G benefits from cloud native applications
* show the network separation challenge these applications need to solve
* propose a solution to these challenges using NSM
* outline the necessary additions and improvments to NSM Ericsson is proposing
* demo (optional)
### Speaker
{{% speaker name="Tamas Zsiros - Expert end-to-end systems archtecture, Ericsson" twitter="weldroid" github="weldroid" linkedin="tamaszsiros" %}}
Tamas Zsiros is an engineer, architect and technical leader in Ericsson AB with more than 19 years of professional 
experience in the cloud, IP and telecommunications areas, living in Stockholm, Sweden. He is currently driving 
digitalization and cloud native transformation for Business Area Digital Services applications including telco VNFs, 
OSS and BSS. He has played a key role in platform shifts of telecom applications from monolithic architectures 
through component driven development to microservice-based cloud native architecture, coordinating evolution of 
applications and cloud infrastructure. He is an experienced speaker and has extensive multicultural experience 
gained through living and working around the globe.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="02:30pm" title="Composing Hybrid Service Chains in the CNF Testbed with NSM" %}}
This is the community journey of bringing together Cloud Native Network Functions (CNFs) and Virtual Networking 
Functions (VNF) using Network Service Mesh (NSM) to facilitate policy-driven, declarative and on-demand L2/L3 network 
use cases in the CNF Testbed.

The CNF Testbed initiative provides a vendor-neutral space to explore and evaluate open source networking technologies 
and their interoperability, in addition to fostering collaboration between the various projects and communities.

A hybrid use case running across OpenStack and Kubernetes (K8s) will be shown. The former will represent the 
traditional and established Networking Function Virtualization concepts, where an application is run in a virtual 
machine called a VNF. The K8s cluster will demonstrate CNFs. NSM is used to stitch all of the connections together 
from container to container, container to VM and cluster to cluster.
### Speaker
{{% speaker name="Taylor Carpenter - Partner / Senior Factotum, Vulk Coop" twitter="ixx" github="taylor" linkedin="taylorcc" %}}
Partner at Vulk Cooperative - http://vulk.coop | Project Lead cncf.ci + CNF Testbed. OpenSource advocate, using 
Linux since 1994 with the 1.0 release and gnu tools on other unix systems before that. OpsDev geek. Elixir and 
Ruby programmer. Proponent of improving user experience (UX) in all endeavors including group collaboration, 
end-user applications, developer tools, APIs. Taylor has helped companies (startups to enterprise) with integrations 
and modernizing their platforms for over 18 years. This covers many domains such as networking, security and 
financial with companies including Nortel Networks, Bank of America, and IBM. He’s also helped design and 
run the technology needs of organizations such as Lonestar Ruby Conference.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="3:00pm" title="BREAK" %}}
Coffee and refreshments will be offered during this 30 minute break.
{{% /talk %}}
{{% talk time="03:30pm" title="Service Programming using SRv6 and NSM" %}}
With the advent of Edge Computing, Cloud Native network transformation and evolution towards In-Network Computing, 
NSM combined with network programming concepts of SRv6 can provide a highly efficient framework to design large 
scale services.
### Speaker
{{% speaker name="Daniel Bernier - Senior Technical Architect, Bell Canada" %}}
Daniel is a Senior Architect in the Network Strategy team at Bell Canada involved in research and development of 
disruptive technologies transforming the Telco space. He is currently working on the edge cloud strategy and 
cloud-native transformation leveraging optimized CP/UP separation and advances in network and hardware 
programming for cost effectiveness. He is involved in various open source community projects such as FD.io, 
Network Service Mesh and P4.org. He is also participating at the IETF, co-authoring and collaborating on various 
drafts for SPRING based service-programming and SFC.
{{% /speaker %}}
{{% /talk %}}
{{% talk time="04:00pm" title="Speakers panel - Q&A" %}}
Join the NSM Community for an open Q&A of speakers and contributors.
{{% /talk %}}

# Why Attend NSMCon?
{{< img-text img="/img/events/NSMCon1.png">}}
Are you running workloads in multiple clusters? Across multiple clouds: on-premises, hybrid, multicloud, or public cloud? Do they need to interact with legacy workloads running in less “cloudy” environments? Network Service Mesh (NSM) ties them all together, at the granularity of individual workloads, not cluster/VPCs/data centers. 

NSM is a community-driven CNCF Sandbox project that is rapidly gaining momentum because of its ability to simplify connectivity between workloads, independent of where they are running. It extends an IP reachability domain to workloads running in multiple clusters, legacy environments, on-premises, or in a public cloud, communicating with the protocols they are currently using.

NSM does this at the granularity of individual workloads. Your workloads have connectivity to just the workloads they need nothing more, nothing less. NSM brings the useful features of a Service Mesh from the lofty heights of HTTP all the way down to IP itself. Applications and Application Service Meshes, such as Istio, run unaltered on top, leaving the hybrid/multicloud IP connectivity to NSM.

The project emerged organically as a community project to solve these problems by applying the Service Mesh thought process all the way down to IP with the global peering mentality of the Internet itself – without breaking your existing environment.

Join the people building and using NSM at Network Service Mesh Con for a day of tutorials, deep dives, and use cases to learn how NSM works, what it can do for you, and, most importantly, what’s coming next.
{{< /img-text >}}

# Sponsors

{{% sponsor_section sponsor_type="Event Sponsors" %}}
{{< sponsor_logo sponsor_name="Cisco Systems" src="/img/events/nsmcon2019/cisco-logo.svg" href="https://www.cisco.com/">}}
{{< sponsor_logo sponsor_name="Doc.ai" src="/img/events/nsmcon2019/doc.ai-logo.svg" href="https://doc.ai/" >}}
{{% /sponsor_section %}}
{{% sponsor_section %}}
{{< sponsor_logo sponsor_name="VMWare" src="/img/events/nsmcon2019/vmware-logo.svg" href="https://www.vmware.com/" >}}
{{% /sponsor_section %}}

{{% sponsor_section sponsor_type="Lunch Sponsor"%}}
{{< sponsor_logo sponsor_name="Juniper Networks" src="/img/events/nsmcon2019/juniper-networks-logo.svg" href="https://www.juniper.net/" >}}
{{% /sponsor_section %}}
