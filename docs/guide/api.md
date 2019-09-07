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
  
## `path` and `method` parameters

If you specified `apiop` as one of the values of `fields` parameter, you also need to pass parameters `path` and `method`.
`path` and `method` values define for which specific api operations statistics should be returned.

* `method` - API operation method, i.e. `GET`, `POST` ... 
* `path` - API operation path, such as `/v2/pet/{petId}`   
   
<br/>   
   
## Examples

### Get statistics via API 

```
$ curl http://<your app host:port>/swagger-stats/stats
```
```json
{
  "startts": 1501647865959,
  "all": {
    "requests": 7,
    "responses": 7,
    "errors": 3,
    "info": 0,
    "success": 3,
    "redirect": 1,
    "client_error": 2,
    "server_error": 1,
    "total_time": 510,
    "max_time": 502,
    "avg_time": 72.85714285714286,
    "total_req_clength": 0,
    "max_req_clength": 0,
    "avg_req_clength": 0,
    "total_res_clength": 692,
    "max_res_clength": 510,
    "avg_res_clength": 98,
    "req_rate": 1.0734549915657108,
    "err_rate": 0.4600521392424475
  },
  "sys": {
    "rss": 59768832,
    "heapTotal": 36700160,
    "heapUsed": 20081776,
    "external": 5291923,
    "cpu": 0
  },
  "name": "swagger-stats-testapp",
  "version": "0.90.1",
  "hostname": "hostname",
  "ip": "127.0.0.1"
}
```

### Get timeline statistics and statistics per method: 

```
$ curl http://<host:port>/swagger-stats/stats?fields=method,timeline
```

### Get statistics statistics for API operation `GET /v2/pet/{petId}`:

```
$ curl http://<host:port>/swagger-stats/stats?fields=apiop&method=GET&path=/v2/pet/{petId}
```

## Statistics 

<a name="jsd-stats"/>
<br/>
<br/>

### stats

> Stats object is returned by /stats API. It always inlcudes main properties (`startts`, `name`, `version`, `hostname`, `ip`), `all` statistics, and `sys&#39; statistics. Depending on parameters passed to /stats API call, additional statistics properties will be included as well.

|Name           |Type     |Description
|:--------------|:--------|:----------
|`startts`|integer|timestamp when collection of statistic started - application start time
|`name`|string|Name
|`version`|string|Version
|`hostname`|string|Hostname
|`ip`|string|IP address
|`all`|[baselinestats](#jsd-baselinestats)|baselinestats object
|`sys`|[sysstats](#jsd-sysstats)|sysstats object



<a name="jsd-baselinestats"/>
<br/>
<br/>

### baselinestats

> Baseline statistics object. Provides core metrics on request-reponse processing. Baseline statistics are calculated in in several different contexts.
* `all` stats contains total values for all requests and responses
* In `timeline`, each bucket contains baseline stats calculated for a time interval
* In `method` baseline stats are calculated per each request method
* `apistats` provides baseline stats per each API Operation


|Name           |Type     |Description
|:--------------|:--------|:----------
|`requests`|integer|Total number of requests received
|`responses`|integer|Total number of responses sent
|`errors`|integer|Total number of error responses
|`info`|integer|Total number of informational responses
|`success`|integer|Total number of success responses
|`redirect`|integer|Total number of redirection responses
|`client_error`|integer|Total number of client error responses
|`server_error`|integer|Total number of server error responses
|`total_time`|integer|Sum of total processing time (from request received to response finished)
|`max_time`|integer|Maximum observed processed time
|`avg_time`|number|Average processing time
|`total_req_clength`|integer|Total (Sum) of Content Lengths of received requests
|`max_req_clength`|integer|Maximum observed Content length in received requests
|`avg_req_clength`|number|Average Content Length in received requests
|`total_res_clength`|integer|Total (Sum) of Content Lengths of sent responses
|`max_res_clength`|integer|Maximum observed Content Length in sent responses
|`avg_res_clength`|number|Average Content Length in sent responses
|`req_rate`|number|Request Rate
|`err_rate`|number|Error Rate

<a name="jsd-sysstats"/>
<br/>
<br/>

### sysstats

> System statistics - memory usage and CPU usage of node process. As returned by process.memoryUsage() and process.cpuUsage().

|Name           |Type     |Description
|:--------------|:--------|:----------
|`rss`|integer|Memory Usage - Resident Set Size, as returned by process.memoryUsage()
|`heapTotal`|integer|Memory Usage - Total Size of the Heap, as returned by process.memoryUsage()
|`heapUsed`|integer|Memory Usage - Heap actually Used, as returned by process.memoryUsage()
|`external`|integer|Memory Usage - External memory, as returned by process.memoryUsage()
|`cpu`|integer|CPU Usage % - as returned by process.cpuUsage(), calculated per [https://github.com/nodejs/node/pull/6157](https://github.com/nodejs/node/pull/6157)
