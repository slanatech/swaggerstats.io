---
title:  "Intro"
---

# Why

When developing microservices, it's essential to know right away whether your API behaves as expected. 
Are there errors ? How long does it take to execute specific requests ? What's the volume of API calls over time ? 

**swagger-stats** enables that for you Node.js apps and allows you to get these insights very quickly in your development process.
It traces REST API requests and responses in Node.js apps, and collects metrics per API Operation.

**swagger-stats** detects API operations based routes definitions in your app. You may also provide [Swagger (Open API) specification](https://swagger.io/specification/), 
and swagger-stats will match API requests with API Operations defined in swagger specification. 

**swagger-stats** exposes statistics and metrics per API Operation, such as `GET /myapi/:parameter`, or `GET /pet/{petId}`
 
With metrics exposed by **swagger-stats** you may spot problematic API endpoints, see where most of errors happens, 
catch long-running requests, analyze details of last errors, observe trends, setup alerting.

# What

**swagger-stats** provides:
* Metrics in [Prometheus](https://prometheus.io/) format, so you may use [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) to setup API monitoring and alerting
* Storing details about each API Request/Response in [Elasticsearch](https://www.elastic.co/), so you may use [Kibana](https://www.elastic.co/products/kibana) to perform analysis of API usage over time, build visualizations and dashboards  
* Built-in API Telemetry UI, so you may enable swagger-stats in your app, and start monitoring right away, with no additional tools required
* Exposing collected statistics via API, including:
* Counts of requests and responses(total and by response class), processing time (total/avg/max), 
content length(total/avg/max) for requests and responses, rates for requests and errors. 
This is baseline set of stats. 
* Statistics by Request Method: baseline stats collected for each request method
* Timeline: baseline stats collected for each 1 minute interval during last 60 minutes. Timeline helps you to analyze trends.
* Errors: count of responses per each error code, top "not found" resources, top "server error" resources
* Last errors: request and response details for the last 100 errors (last 100 error responses)
* Longest requests: request and response details for top 100 requests that took longest time to process (time to send response)
* Tracing: Request and Response details - method, URLs, parameters, request and response headers, addresses, start/stop times and processing duration, matched API Operation info
* API Statistics: baseline stats and parameter stats per each API Operation. API operation detected based on express routes, and based on [Swagger (Open API) specification](https://swagger.io/specification/) 
* CPU and Memory Usage of Node process

