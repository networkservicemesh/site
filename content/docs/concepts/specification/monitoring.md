+++
title = "Connection Monitoring API"
description = "Concept of Connection Monitoring API in NSM"
short= "monitoring"
date = "2024-02-13"
+++

# Connection Monitoring API

## Description

Connection Monitoring API allows users to monitor NSM connections. This functionality can be used to build some third-party applications. An example of such application is [NSM Dashboard](https://github.com/networkservicemesh/cmd-dashboard-ui).

## Concept

1. All NSM components except Network Service Client provide a Monitor Connection Server. 
2. Users can connect to these servers using a Monitor Connection Client and monitor connections owned by different NSM components. 
3. The components can send Connection Events to all subscribed Monitor Connection Clients if any connection is created, changed or deleted.

Each NSM component montors connections of the next component in the chain. If the next component generates a Connection Event, the current component receives this event and sends it back to the previous component in the chain.

## Types of events

**INITIAL_STATE_TRANSFER:** MonitorConnection Server sends an event with this type to MonitorConnection Client when the client makes the first request. The event with this type contains all connections owned by the MonitorConnection Server.

**UPDATE:** Monitor Connection Server sends an event with this type when a connection changes. For example, the state of the connection has been changed.

**DELETE:** Monitor Connection Server sends event with this type when the connection has been closed.

### An example of UPDATE event

![update-event](/img/concepts/specification/monitoring/update-event.svg)

### An example of INITIAL_STATE_TRANSFER and DELETE event

![initial-transfer-and-delete-event](/img/concepts/specification/monitoring/initial-transfer-and-delete-event.svg)

## References

- [NSM Connection Monitoring API Definition](https://github.com/networkservicemesh/api/blob/release/v1.10.0/pkg/api/networkservice/connection.proto#L79-L81)
- [Code implementation](https://github.com/networkservicemesh/sdk/tree/release/v1.10.0/pkg/networkservice/common/monitor)
- [See other concepts](../)
