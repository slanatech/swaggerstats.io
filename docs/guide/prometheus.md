---
title:  "Prometheus"
categories: doc
---

# Prometheus Support

## Metrics 

**swagger-stats** exposes metrics in [Prometheus](https://prometheus.io/) format, so you may use [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) for API monitoring and alerting

swagger-stats exposes Prometheus metrics via `/swagger-stats/metrics`:

> **GET /swagger-stats/metrics** 

The following metrics are provided:

|Name           |Type     |Labels |Description
|:--------------|:--------|:----------|:----------
|`api_all_request_total`|counter|-|The total number of all API requests received|
|`api_all_success_total`|counter|-|The total number of all API requests with success response|
|`api_all_errors_total`|counter|-|The total number of all API requests with error response|
|`api_all_client_error_total`|counter|-|The total number of all API requests with client error response|
|`api_all_server_error_total`|counter|-|The total number of all API requests with server error response|
|`api_all_request_in_processing_total`|gauge|-|The total number of all API requests currently in processing (no response yet)|
|`nodejs_process_memory_rss_bytes`|gauge|-|Node.js process resident memory (RSS) bytes|
|`nodejs_process_memory_heap_total_bytes`|gauge|-|Node.js process memory heapTotal bytes|
|`nodejs_process_memory_heap_used_bytes`|gauge|-|Node.js process memory heapUsed bytes|
|`nodejs_process_memory_external_bytes`|gauge|-|Node.js process memory external bytes|
|`nodejs_process_cpu_usage_percentage`|gauge|-|Node.js process CPU usage percentage|
|`api_request_total`|counter|method<br/>path<br/>code|The total number of all API requests|
|`api_request_duration_milliseconds`|histogram|method<br/>path<br/>code<br/>le|API requests duration|
|`api_request_size_bytes`|histogram|method<br/>path<br/>code<br/>le|API requests size|
|`api_response_size_bytes`|histogram|method<br/>path<br/>code<br/>le|API response size|

<br/>
<br/>


### Getting Prometheus Metrics Sample  

```
$ curl http://<your app host:port>/swagger-stats/metrics
```
```
# HELP api_all_request_total The total number of all API requests received
# TYPE api_all_request_total counter
api_all_request_total 302

# HELP api_all_success_total The total number of all API requests with success response
# TYPE api_all_success_total counter
api_all_success_total 267

# HELP api_all_errors_total The total number of all API requests with error response
# TYPE api_all_errors_total counter
api_all_errors_total 35

. . . .

# HELP api_request_total The total number of all API requests
# TYPE api_request_total counter
api_request_total{method="GET",path="/v2/pet/findByStatus",code="200"} 13
api_request_total{method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_total{method="GET",path="/v2/store/inventory",code="200"} 16
api_request_total{method="GET",path="/v2/user/{username}",code="200"} 18
api_request_total{method="POST",path="/v2/pet/{petId}",code="404"} 1
api_request_total{method="POST",path="/v2/pet/{petId}/uploadImage",code="200"} 18
api_request_total{method="POST",path="/v2/pet",code="200"} 16
api_request_total{method="PUT",path="/v2/user/{username}",code="200"} 12
api_request_total{method="GET",path="/v2/pet/findByTags",code="200"} 15

. . . .
# HELP api_request_duration_milliseconds API requests duration
# TYPE api_request_duration_milliseconds histogram
api_request_duration_milliseconds_bucket{le="5",method="GET",path="/v2/store/order/{orderId}",code="200"} 1
api_request_duration_milliseconds_bucket{le="10",method="GET",path="/v2/store/order/{orderId}",code="200"} 1
api_request_duration_milliseconds_bucket{le="25",method="GET",path="/v2/store/order/{orderId}",code="200"} 3
api_request_duration_milliseconds_bucket{le="50",method="GET",path="/v2/store/order/{orderId}",code="200"} 7
api_request_duration_milliseconds_bucket{le="100",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_bucket{le="250",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_bucket{le="500",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_bucket{le="1000",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_bucket{le="2500",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_bucket{le="5000",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_bucket{le="10000",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_bucket{le="+Inf",method="GET",path="/v2/store/order/{orderId}",code="200"} 16
api_request_duration_milliseconds_sum{method="GET",path="/v2/store/order/{orderId}",code="200"} 911
api_request_duration_milliseconds_count{method="GET",path="/v2/store/order/{orderId}",code="200"} 16
. . . . 

```

<br/>
<br/>



## Example Prometheus scrape configuration

<br/>

## Grafana Dashboards

**swagger-stats** Grafana Dashboards are published at [https://grafana.com/dashboards?search=swagger-stats](https://grafana.com/dashboards?search=swagger-stats)

<br/>
<br/>


### Simple scrape 

```yaml
scrape_configs:
  - job_name: 'sws-spectest'
    scrape_interval: '10s'
    metrics_path: '/swagger-stats/metrics'
    static_configs:
      - targets: ['localhost:3040']
```

<br/>

### Scrape with basic authentication enabled 

```yaml
  - job_name: 'sws-authtest'
    scrape_interval: '10s'
    metrics_path: '/swagger-stats/metrics'
    static_configs:
      - targets: ['localhost:3050']
    basic_auth:
      username: 'swagger-stats'
      password: 'swagger-stats'
```  
          
## Prometheus Queries

> Examples of Prometheus Queries using swagger-stats metrics

<br/>


### Get Request Rate, Error Rate, Success Rate

```
sum (irate(api_request_total[1m]))

sum (irate(api_request_total{code=~"^5..$"}[1m]))

sum (irate(api_request_total{code=~"^4..$"}[1m]))

sum (irate(api_request_total{code=~"^2..$"}[1m]))

```
<br/>

### Get % of errors 

```
( api_all_errors_total / api_all_request_total ) * 100
```

<br/>

### Get Apdex Score

> How Apdex Score is calculated: [Apdex Score](https://en.wikipedia.org/wiki/Apdex) 

```
(
  sum(irate(api_request_duration_milliseconds_bucket{le="25",code=~"^2..$"}[1m]))
+
  (sum(irate(api_request_duration_milliseconds_bucket{le="100",code=~"^2..$"}[1m])) / 2)
) / sum(irate(api_request_duration_milliseconds_count[1m]))
```

<br/>

### Get Apdex Score Trend

```
(
  sum(irate(api_request_duration_milliseconds_bucket{le="25",code=~"^2..$"}[1m]))
+
  (sum(irate(api_request_duration_milliseconds_bucket{le="100",code=~"^2..$"}[1m]))/2)
) / sum(irate(api_request_duration_milliseconds_count[1m]))
```
 
<br/>

### Get Request Rate by Method

```
sum by(method) (irate(api_request_total[1m]))
``` 

<br/>

### Get % of request answered within threshold, over time 

> Use `le="XX"` to set threshold, i.e. `le="25"` for % of request answered under 25 msec.
> Values of `le` should be from the list of bucket values specified in swagger-stats option `durationBuckets` 

```
( sum(irate(api_request_duration_milliseconds_bucket{le="25"}[1m])) /  sum(irate(api_request_duration_milliseconds_count[1m])) ) * 100
``` 
 
<br/>

### Get Top 3 API Calls by Path, over time 

```
topk(3, sum(irate(api_request_total[1m])) by (path))
```   

<br/>

### Get Top 3 5XX Errors By Path, over time 

```
topk(3, sum(irate(api_request_total{code=~"^5..$"}[1m])) by (path))
```   


<br/>

### Get Node.js process CPU Usage % 

```
nodejs_process_cpu_usage_percentage
```

<br/>

### Get Node.js process Used Heap in MB

```
(nodejs_process_memory_heap_used_bytes)/1048576
```

