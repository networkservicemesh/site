  import {Octokit, App} from "https://cdn.skypack.dev/octokit@2.0.10";

  document.addEventListener('DOMContentLoaded', async function () {
    const repoLinkToIdMap = {
      "api": {
        "sdk": "cell-KUktbazg4igNnRH6aAHL-71",
      },
      "sdk": {
        "sdk-kernel": "cell-KUktbazg4igNnRH6aAHL-11",
        "sdk-k8s": "cell-KUktbazg4igNnRH6aAHL-12",
        "cmd-map-ip-k8s": "cell-KUktbazg4igNnRH6aAHL-46",
        "cmd-cluster-info-k8s":"cell-9nbd_pPUJAVFhgSJ7Byz-12",
        "cmd-ipam-vl3":"cell-9nbd_pPUJAVFhgSJ7Byz-15",
        "cmd-nsmgr": "cell-KUktbazg4igNnRH6aAHL-16",
        "cmd-nsmgr-proxy": "cell-KUktbazg4igNnRH6aAHL-57",
        "cmd-nse-vfio": "cell-KUktbazg4igNnRH6aAHL-55",
        "cmd-registry-memory": "cell-KUktbazg4igNnRH6aAHL-50",
        "cmd-registry-proxy-dns": "cell-KUktbazg4igNnRH6aAHL-54",
        "cmd-nse-remote-vlan":"cell-YMB4rWHzFTmKYcXhytok-7",
        "cmd-csi-driver": "cell-9nbd_pPUJAVFhgSJ7Byz-23",
        "cmd-dashboard-backend": "cell-Semdq0w2--LJRfWncIDz-5",
      },
      "sdk-kernel": {
        "sdk-vpp": "cell-KUktbazg4igNnRH6aAHL-10",
        "sdk-sriov": "cell-KUktbazg4igNnRH6aAHL-20",
        "cmd-nse-l7-proxy": "cell-9nbd_pPUJAVFhgSJ7Byz-9"
      },
      "sdk-vpp": {
        "cmd-nsc-vpp": "cell-KUktbazg4igNnRH6aAHL-45",
        "cmd-nse-icmp-responder-vpp": "cell-KUktbazg4igNnRH6aAHL-44",
        "cmd-nse-firewall-vpp":"cell-YWTRKo84t5DHiULYztLq-3",
        "cmd-forwarder-vpp": "cell-KUktbazg4igNnRH6aAHL-15",
        "cmd-nse-simple-vl3-docker": "cell-tK4_8g8Ls3PgPuG9fXJk-2",
        "cmd-nsc-simple-docker": "cell-9nbd_pPUJAVFhgSJ7Byz-5",
        "cmd-nse-vlan-vpp": "cell-9nbd_pPUJAVFhgSJ7Byz-17",
        "cmd-nse-vl3-vpp": "cell-Prku3oC4CS7h4xE_tYkA-12",
        "cmd-lb-vl3-vpp": "cell-9nbd_pPUJAVFhgSJ7Byz-20",
      },
      "sdk-sriov": {
        "cmd-nse-vlan-vpp": "cell-9nbd_pPUJAVFhgSJ7Byz-25",
        "cmd-nsc-init": "cell-9nbd_pPUJAVFhgSJ7Byz-24",
        "cmd-forwarder-sriov":"cell-KUktbazg4igNnRH6aAHL-19",
        "cmd-nsc": "cell-KUktbazg4igNnRH6aAHL-49",
        "sdk-ovs": "cell-Prku3oC4CS7h4xE_tYkA-13",
        "cmd-forwarder-vpp": "cell-Prku3oC4CS7h4xE_tYkA-6",
        "cmd-nse-icmp-responder": "cell-KUktbazg4igNnRH6aAHL-56",
      },
      "sdk-ovs": {
        "cmd-forwarder-ovs":"cell-Prku3oC4CS7h4xE_tYkA-9",
      },
      "sdk-k8s": {
        "cmd-forwarder-sriov": "cell-9nbd_pPUJAVFhgSJ7Byz-28",
        "cmd-nse-supplier-k8s": "cell-KUktbazg4igNnRH6aAHL-48",
        "cmd-registry-k8s": "cell-KUktbazg4igNnRH6aAHL-47",
        "cmd-exclude-prefixes-k8s": "cell-KUktbazg4igNnRH6aAHL-51",
        "cmd-forwarder-vpp": "cell-YMB4rWHzFTmKYcXhytok-3",
        "cmd-admission-webhook-k8s": "cell-9nbd_pPUJAVFhgSJ7Byz-29",
        "cmd-forwarder-ovs": "cell-9nbd_pPUJAVFhgSJ7Byz-32",
      },
      "cmd-nsc-vpp": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-2",
      },
      "cmd-nse-simple-vl3-docker" : {
        "deployment-k8s": "cell-9nbd_pPUJAVFhgSJ7Byz-6",
      },
      "cmd-nsc-simple-docker" : {
        "deployment-k8s": "cell-9nbd_pPUJAVFhgSJ7Byz-26",
      },
      "cmd-lb-vl3-vpp" : {
        "deployment-k8s": "cell-WCTNbeuQuTkYa4PUqZn_-4",
      },
      "cmd-nse-l7-proxy": {
        "deployment-k8s": "cell-WCTNbeuQuTkYa4PUqZn_-5",
      },
      "cmd-nse-icmp-responder-vpp": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-3",
      },
      "cmd-forwarder-vpp": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-4",
      },
      "cmd-nse-vlan-vpp": {
        "deployment-k8s": "cell-WCTNbeuQuTkYa4PUqZn_-2",
      },
      "cmd-forwarder-ovs": {
        "deployment-k8s": "cell-Prku3oC4CS7h4xE_tYkA-10",
      },
      "cmd-forwarder-sriov": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-5",
      },
      "cmd-nse-supplier-k8s": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-6",
      },
      "cmd-registry-k8s": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-7",
      },
      "cmd-map-ip-k8s": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-8",
      },
      "cmd-admission-webhook-k8s": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-9",
      },
      "cmd-exclude-prefixes-k8s": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-10",
      },
      "cmd-nsc-init": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-11",
      },
      "cmd-nsc": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-12",
      },
      "cmd-nsmgr": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-13",
      },
      "cmd-nsmgr-proxy": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-14",
      },
      "cmd-nse-icmp-responder": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-15",
      },
      "cmd-nse-firewall-vpp": {
        "deployment-k8s": "cell-WCTNbeuQuTkYa4PUqZn_-1",
      },
      "cmd-nse-vl3-vpp": {
        "deployment-k8s": "cell-WCTNbeuQuTkYa4PUqZn_-3",
      },
      "cmd-cluster-info-k8s": {
        "deployment-k8s": "cell-9nbd_pPUJAVFhgSJ7Byz-27",
      },
      "cmd-ipam-vl3": {
        "deployment-k8s": "cell-WCTNbeuQuTkYa4PUqZn_-6",
      },
      "cmd-nse-vfio": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-16",
      },
      "cmd-registry-memory": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-17",
      },
      "cmd-registry-proxy-dns": {
        "deployment-k8s": "cell-ltp6VKm9YOJ7lEqRLLzF-18",
      },
      "cmd-nse-remote-vlan": {
        "deployment-k8s":"cell-u3GWNTIGmyiFT0szW0Ro-1",
      },
      "cmd-csi-driver": {
        "deployment-k8s":"cell-WCTNbeuQuTkYa4PUqZn_-7",
      },
      "cmd-dashboard-backend": {
        "deployment-k8s":"cell-Semdq0w2--LJRfWncIDz-3",
      },
      "cmd-dashboard-ui": {
        "deployment-k8s":"cell-Semdq0w2--LJRfWncIDz-4",
      },
      "deployment-k8s": {
        "integration-tests": "cell-ltp6VKm9YOJ7lEqRLLzF-20",
      },
      "integration-tests": {
        "integration-k8s-kind": "cell-ltp6VKm9YOJ7lEqRLLzF-26",
      },
      "integration-k8s-kind": {
        "integration-k8s-gke": "cell-ltp6VKm9YOJ7lEqRLLzF-28",
        "integration-k8s-aks": "cell-ltp6VKm9YOJ7lEqRLLzF-30",
        "integration-k8s-packet": "cell-ltp6VKm9YOJ7lEqRLLzF-31",
        "integration-k8s-aws": "cell-ltp6VKm9YOJ7lEqRLLzF-32",
        "integration-k8s-interdomain": "cell-9nbd_pPUJAVFhgSJ7Byz-16",
      },
    }

    function recursiveColor(elem, color) {
      var fill = elem.getAttribute("fill")
      if (fill && fill != "none") {
        elem.setAttribute("fill",color)
      }
      var stroke = elem.getAttribute("stroke")
      if (stroke) {
        elem.setAttribute("stroke",color)
      }

      for (const child of elem.children) {
        recursiveColor(child, color)
      }
    }

    function wrapLink(elem, url) {
      if (!elem) {
        return
      } 
      var parent = elem.parentElement
      var link = svgDocument.createElementNS('http://www.w3.org/2000/svg', "a")
      link.setAttribute("href", url)
      link.setAttribute("target", "_blank")
      link.appendChild(cell)
      parent.appendChild(link)
    }

    var repoMap = document.querySelector(".repoMap")
    if (!repoMap) {
      return
    }
    var svgDocument = repoMap.getSVGDocument()
    if (!svgDocument) {
      return
    }

    const octokit = new Octokit()

    const searchIterator = octokit.paginate.iterator(octokit.rest.search.issuesAndPullRequests, {
      q: "org:networkservicemesh+is:pr+*/networkservicemesh/*+in:title+is:open+is:unmerged",
    });

    for await (const {data} of searchIterator) {
      for (const elem of data) {
        var prefix = "Update from update/networkservicemesh/"
        if (!(elem.title.startsWith(prefix))) {
          continue
        }
        var inRepo = elem.title.replace(prefix, "")
        var outRepo = elem.repository_url.replace("https://api.github.com/repos/networkservicemesh/", "")
        var pr_url = elem.pull_request.html_url
        if (!repoLinkToIdMap[inRepo]) {
          continue
        }
        var id = repoLinkToIdMap[inRepo][outRepo]
        if (!id) {
          continue
        }
        var cell = svgDocument.getElementById(id)
        wrapLink(cell, pr_url)
        recursiveColor(cell, "red")
      }
    }
  })
