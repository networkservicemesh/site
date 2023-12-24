+++
title = "Development of Network Service Endpoint"
description = "Concept of development NSE"
short = "devnse"
date = "2022-11-29"
+++


# Development of Network Service Mesh Endpoint 

## Description

Working with Network Service Mesh involves developing endpoints that set up and configure the network service. Specifically, in this article, we will only touch on the aspect of creating network points; more details about end points can be found [here](https://networkservicemesh.io/docs/concepts/architecture/#endpoints). Basic endpoints can be developed following the NSM protocol, using SDK and also using nsmctl.

## Concept

The endpoint is responsible for the following connection fields:

Select the connection mechanism for its forwarder.

**ConnectionContext**  where the endpoint has the right to control:
- **IPContext** - responsible for IP addresses for the client, endpoint, routes, prefixes, neighbors, and policy-based routing
- **DNSContext** - is responsible for setting up the DNS servers serving the connection.
- **EthernetContext** - allows you to control the poppy address for the client and endpoint interfaces, as well as set the vlan tag.
- **ExtraContext** - allows you to set your own parameters involved in the connection.

### Chain element

A chain element is a small piece of logic that processes part of an NSM request, which usually performs exactly one function.

For example, the chain element [timeout](https://github.com/networkservicemesh/sdk/blob/main/pkg/networkservice/common/timeout/server.go) closes the connection if the connection has expired.

To develop a chain element for an endpoint, you need to implement the Go interface.
```go
// NetworkServiceServer is the server API for NetworkService service.
type NetworkServiceServer interface {
	Request(context.Context, *NetworkServiceRequest) (*Connection, error)
	Close(context.Context, *Connection) (*emptypb.Empty, error)
}
```
Next, the package with the chained element can be included in the existing NSE chain or a new chain can be created.

For example, here is an example of creating a simple chain element that captures total requests and close for the NSE.
```go
package count

import (
    "sync/atomic"
    "github.com/sirupsen/logrus"
)

type myCountServer struct{
    closes, requests int32
}
// Close performs close and increments request count
func (s *myCountServer) Request(ctx context.Context, request *networkservice.NetworkServiceRequest) (*networkservice.Connection, error) {
    atomic.AddInt32(&s.requests, 1)
    logrus.Infof("total request count: %v", s.requests)
	return next.Server(ctx).Request(ctx, request)
}

func NewServer() NetworkServiceServer {
    return new(myCountServer)
}

// Close performs close and increments closes count
func (s *myCountServer) Close(ctx context.Context, connection *networkservice.Connection) (*empty.Empty, error) {
    atomic.AddInt32(&s.closes, 1)
    logrus.Infof("total close count: %v", s.requests)
	return next.Server(ctx).Close(ctx, connection)
}
```

A chain can be created using the chain elements [chain](https://github.com/networkservicemesh/sdk/tree/main/pkg/networkservice/core/chain) or [next](https://github.com/networkservicemesh/sdk/tree/main/pkg/networkservice/core/next). The difference between these chain elements is that when using `chain` logging will be added.


For example, for the example above we can create the following chain:

```go

var myChain = chain.NewServer(
    count.NewServer(),
    timeout.NewServer()
    ...
)
```

Look at the usage of chains in these repositories: https://github.com/networkservicemesh?q=nse-&type=all&language=&sort=



### Develop a new Network Service Endpoint with using `nsmctl`

To simplify the work of creating new endpoints, we have an experimental utility called `nsmctl`. Which allows you to generate folders for endpoints.

Requirements:
1. Install Go: https://go.dev/doc/install
2. Install nsmctl: go install github.com/networkservicemesh/nsmctl@latest


Once everything is installed, go to your go projects folder [GOPATH](https://go.dev/doc/code).

Next, create a folder with your NSE project:
```bash
nsmctl generate endpoint --name my-first-nse --path my-first-nse --go 1.20
```

After which, the folder my-first-nse will be created, where the starting files for developing your NSE project will be located.

```
my-first-nse
│   deployment.yaml
│   main.go
|   Dockerfile
└───internal
    └───pkg
        └───imports
                └───imports.go
```


Please note that generation is an experimental feature and errors may occur.

## References

1. https://github.com/networkservicemesh/api/blob/main/pkg/api/networkservice/connectioncontext.proto
2. https://networkservicemesh.io/docs/concepts/architecture/#endpoints
3. https://github.com/networkservicemesh/nsmctl
