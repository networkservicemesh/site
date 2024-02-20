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

## Example of UPDATE event

On the **Diagram 1** you can see when NSM sends **UPDATE** event. It has the following steps:
1. NSM components monitor each other
2. Forwader changes a connection context of one of connections
3. Forwarder sends **UPDATE** event with the changed connection to NSMgr
4. NSMgr sends **UPDATE** event with the changed connection to NSC

<img src="/img/concepts/specs/monitoring/update-event.svg" style="border: 1px dashed black; padding: 0.8em">

 *Diagram 1: an example of UPDATE event in NSM*

## Example of INITIAL_STATE_TRANSFER, UPDATE and DELETE event

**Diagram 2** shows when NSM sends **INITIAL_STATE_TRANSFER**, **UPDATE** and **DELETE** events. Steps:
1. 3rd-party app start to monitor connections of NSMgr
2. NSMgr sends **INITIAL_STATE_TRANSFER** event with all its connections
3. NSC connects to NSE
4. NSMgr sends **UPDATE** event with the new connection established between NSC and NSE
5. NSC closes the connection
6. NSMgr sends **DELETE** event with the closed connection

<img src="/img/concepts/specs/monitoring/initial-transfer-and-delete-event.svg" style="border: 1px dashed black; padding: 0.8em">

 *Diagram 2: an example of INITIAL_STATE_TRANSFER, UPDATE and DELETE event in NSM*

## References

- [NSM Connection Monitoring API Definition](https://github.com/networkservicemesh/api/blob/release/v1.10.0/pkg/api/networkservice/connection.proto#L79-L81)
- [Code implementation](https://github.com/networkservicemesh/sdk/tree/release/v1.10.0/pkg/networkservice/common/monitor)
- [See other concepts](../)
