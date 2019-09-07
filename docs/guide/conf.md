---
title:  "Configuration"
categories: doc configuration
---

# Configuration

swagger-stats supports multiple configurations options that you can pass when initializing swagger-stats middleware


Here is the list of supported options:


|Option         |Description |Example Value
|:--------------|:----------|:----------
|`name`|Your Service Name. Defaults to hostname if not specified. Will be returned in stats as specified.|`'myservice'`|
|`version`|Your Service Version. Will be returned in stats as specified.|`'1.0.0'`|
|`hostname`|Hostname. Will attempt to detect if not provided|`'myhost.mydomain.com'`|
|`ip`|IP Address. Will attempt to detect if not provided|`'127.0.0.1'`|
|`swaggerSpec`|Swagger specification object. Should be pre-validated and with resolved references. Optional.|swagger spec object|
|`uriPath`|Base path for swagger-stats APIs.<br/>If specified, will be used to serve UI, stats and metrics like this:<br>`/{uriPath}/ui`, `/{uriPath}/stats`, `/{uriPath}/metrics`<br/>If not specified, defaults to `/swagger-stats`|`'/myservice'`|
|`timelineBucketDuration`|Duration of timeline bucket in milliseconds. Default: `60000` (1min) making timeline 1 hour. Timeline always stores 60 last time buckets, with this option you may adjust timeline granularity and length.|`10000`|
|`durationBuckets`|Buckets for duration histogram metrics, in Milliseconds. Default:<br/>`[5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]`<br/>The default buckets are tailored to broadly measure API response time.Most likely needs to be defined per app to account for application specifics.|`[25, 100, 500, 5000, 10000]`|
|`requestSizeBuckets`|Buckets for request size histogram metric, in Bytes. Default:<br/>`[5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]`<br/>The default buckets are tailored to broadly measure API request size.Most likely needs to be defined per app to account for application specifics.|`[500, 10000, 10000]`|
|`responseSizeBuckets`|Buckets for response size histogram metric, in Bytes. Default:<br/>`[5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]`<br/>The default buckets are tailored to broadly measure API response size.Most likely needs to be defined per app to account for application specifics.|`[100, 200, 3000, 400,1000,10000]`|
|`apdexThreshold`|Apdex Threshold, in milliseconds. Default: `25`. <br/>In Apdex calculation, request considered Satisfied if it is answered in less then this Threshold (< 25ms), and request is Tolerating  if it's answered in less then Threshold * 4 (<100 ms)<br/><br/>Make sure both Threshold(i.e.25) and Threshold*4(i.e. 100) are buckets in `durationBuckets`, so Apex calculation can be done using Prometheus metrics<br/><br/>See [Apdex calculation](https://en.wikipedia.org/wiki/Apdex)|`25`|
|`onResponseFinish`|Callback to invoke when response is finished<br/>Application may implement it to trace Request Response Record (RRR), which is passed as parameter<br/>The following parameters are passed to this callback:<br/>`onResponseFinish(req,res,rrr)`<br/>- req - request<br/>- res - response<br/>- rrr - Request Response Record (RRR)|see sample|
|`authentication`|Enable Basic authentication: `true` or `false`. Default `false`.|`true`|
|`sessionMaxAge`|If authentication is enabled(`authentication=true`): Max Age of the session, in seconds. Default `900`|`100`|
|`onAuthenticate`|If authentication is enabled(`authentication=true`): Callback to authenticate request to `/swagger-stats/stats` and `/swagger-stats/metrics`<br/>Application must implement onAuthenticate to validate user credentials<br/>The following parameters are passed to this callback:<br/>`onAuthenticate(req,username,password)`<br/>- req - request<br/>- username - username<br/>- password - password<br/>Must return `true` if user authenticated, `false` if not|see sample|
|`elasticsearch`|Elasticsearch URL. If specified, enables storing of request response records in Elasticsearch. Default is empty (storing to Elasticsearch is disabled).|`'http://127.0.0.1:9200'`|


<br/>
<br/>


## Simplest Configuration

The simplest configuration for swagger-stats is no options at all. If you pass no options, swagger-stats will work based on defaults.
In this case, without swagger specification, swagger-stats will detect API operations on the fly based on express routes (i.e. `/myapi/:param`),
and it will calculate statistics for detected API operations.

> If your existing app does not have swagger specification, swagger-stats will detect and monitor API defined by Express routes 

```javascript
var express = require('express');
var app = module.exports = express();

var swStats = require('swagger-stats');
app.use(swStats.getMiddleware({}));
```

<br/>
<br/>


## Just the Spec Configuration

> Typically you would provide just the Swagger specification to swagger-stats and rely on defaults for other options

```javascript
var express = require('express');
var app = module.exports = express();
var swStats = require('swagger-stats');    
var apiSpec = require('swagger.json');
// Enable swagger-stats middleware in express app, passing swagger specification as option 
app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));

```  

## Full configuration 

```javascript

// Express 
var express = require('express');
var app = module.exports = express();

// Using swagger-parser to validate swagger spec
var swaggerParser = require('swagger-parser');

var specLocation = 'petstore.yaml';
var swaggerSpec = null;
var parser = new swaggerParser();


parser.validate(specLocation,function(err, api) {
  if (!err) {
    debug('Success validating swagger file!');
    swaggerSpec = api;

    // Enable swagger-stats middleware with all options
    app.use(swStats.getMiddleware({
      name: 'swagger-stats-authtest',
      version: '0.94.0',
      hostname: "hostname",
      ip: "127.0.0.1",
      timelineBucketDuration: 60000,
      swaggerSpec:swaggerSpec,
      uriPath: '/swagger-stats',
      durationBuckets: [50, 100, 200, 500, 1000, 5000],
      requestSizeBuckets: [500, 5000, 15000, 50000],
      responseSizeBuckets: [600, 6000, 6000, 60000],
      // Make sure both 50 and 50*4 are buckets in durationBuckets, 
      // so Apdex could be calculated in Prometheus 
      apdexThreshold: 50,    
      onResponseFinish: function(req,res,rrr){
        debug('onResponseFinish: %s', JSON.stringify(rrr));
      },
      authentication: true,
      sessionMaxAge: maxAge,
      elasticsearch: 'http://127.0.0.1:9200',
      onAuthenticate: function(req,username,password){
        // simple check for username and password
        return((username==='swagger-stats') 
            && (password==='swagger-stats'));
      }

    }));
    
    // . . . . . . . . 

  }
});
```
