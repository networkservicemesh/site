+++
title = "Connection Monitoring API"
description = "Concept of Connection Monitoring API in NSM"
short= "monitoring"
date = "2024-02-13"
+++

# Connection Monitoring API

## Description

Connection Monitoring API is one of the key features of NSM. It allows to get information about connections owned by NSM. This feature is used by other important features like healing, vl3, ...

## Benefits


## Concept

NSM Connection Monitoring API is simple:

1. An endpoint (NSMgr, Forwarder, NSE etc.) automatically launches MonitorConnection Server on start. 
2. Network Service Client can use MonitorConnection Client to monitor connections owned by the endpoint.
3. The endpoint sends ConnectionEvents to MonitorConnection Clients if any connection is changed or closed.


## Types of events

**INITIAL_STATE_TRANSFER:** MonitorConnection Server sends an event with this type to MonitorConnection Client when the client makes the first request. The event with this type contains all connections owned by the MonitorConnection Server.

**UPDATE:** Monitor Connection Server sends an event with this type when a connection changes. For example, the state of the connection has been changed.

**DELETE:** Monitor Connection Server sends event with this type when the connection has been closed.


## References

- [NSM Monitoring API](https://github.com/networkservicemesh/api/blob/release/v1.10.0/pkg/api/networkservice/connection.proto#L79-L81)
- [Code implementation](https://github.com/networkservicemesh/sdk/tree/release/v1.10.0/pkg/networkservice/common/monitor)
- [See other features](../)
