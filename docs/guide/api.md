---
title:  "API"
categories: doc api
---

# API

swagger-stats exposes all statistics via `/swagger-stats/stats` API operation:

> **GET /swagger-stats/stats** 
   
   
If no parameters are specified, [default statistics](#jsd-stats) are returned   

<br/>   

## `fields` parameter

You may pass parameter `fields` to /swagger-stats/stats call to specify which additional statistic fields should be returned. 

`fields` parameter passed in query string. Multiple values can be specified for `fields` paramer as an array. 

Supported values for `fields` parameter are:

|Name           |Description
|:--------------|:----------
|`method`|Baseline Metrics per Requests Method
|`timeline`|Baseline Metrics collected for each 1 minute interval during last 60 minutes
|`lasterrors`|request and response details for the last 100 errors (last 100 error responses)
|`longestreq`|request and response details for top 100 requests that took longest time to process (time to send response)
|`apidefs`| API definitions froim swagger specification
|`apistats`|Baseline Metrics per each API Operation. API operation is path and method combination from the swagger spec. Swagger specification is optional. swagger-stats will detect and monitor API operations based on express routes.
|`apiop`|API Operation parameters metrics: parameter passed count, mandatory parameter missing count (for API Operation parameters defined in swagger spec)
|`errors`|Count of responses per each error code, top "not found" resources, top "server error" resources
|`all` or `*`|all fields

  
<br/>   
  
## **path** and **method** parameters

If you specified `apiop` as one of the values of `fields` parameter, you also need to pass parameters `path` and `method`.
`path` and `method` values define for which specific api operations statistics should be returned.

* `method` - API operation method, i.e. `GET`, `POST` ... 
* `path` - API operation path, such as `/v2/pet/{petId}`   
   
<br/>   
   
## Examples

Get timeline statistics and statistics per method: 

```
$ curl http://<host:port>/swagger-stats/stats?fields=method,timeline
```

Get statistics statistics for API operation `GET /v2/pet/{petId}`:

```
$ curl http://<host:port>/swagger-stats/stats?fields=apiop&method=GET&path=/v2/pet/{petId}
```