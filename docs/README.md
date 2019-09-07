---
home: true
heroImage: /logo.png
actionText: Get Started →
actionLink: /guide/
meta:
  - name: google-site-verification
    content: ypsB9NFIxGEr1b5D0BoZ0dyVzt8lLkilkI0dO755M54
features:
- title: Express, Koa, Hapi
  details: Monitor API Operations, trace API requests and responses and collects metrics in Node.js microservices 
- title: Swagger / Open API
  details: With Swagger specification provided, monitor API Operations defined in the spec
- title: Monitoring in Seconds 
  details: Start monitoring right away using Built-In Telemetry, without any infrastructure requirements 
- title: Prometheus
  details: Exposes metrics in Prometheus format - use Prometheus and Grafana for API monitoring and alerting
- title: ElasticSearch  
  details: Store API request/response traces in Elasticsearch and perform detailed analysis of API usage over time 
- title: Grafana and Kibana
  details: Analyze API traffic in Kibana and Grafana, build Visualizations and Dashboards, setup Alerting
footer: MIT Licensed | Copyright © 2019 slana.tech
pageClass: dashblocks-landing
---

![sample](ui0950.gif)

## Quick start

### Install 

```bash
npm install swagger-stats --save
```

### Express  
```javascript
var swStats = require('swagger-stats');
var apiSpec = require('swagger.json');

app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));
```
 
### Koa  
```javascript
var swStats = require('swagger-stats');
var apiSpec = require('swagger.json');
var e2k = require('express-to-koa');

app.use(e2k(swStats.getMiddleware({ swaggerSpec:apiSpec })));
```

### Hapi
```javascript
const swStats = require('swagger-stats');
const swaggerSpec = require('./petstore.json');

const init = async () => {

    server = Hapi.server({
        port: 3040,
        host: 'localhost'
    });

    await server.register({
        plugin: swStats.getHapiPlugin,
        options: {
             swaggerSpec:swaggerSpec
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
```
<br/>
<br/>

### Start monitoring: navigate to `http://<your app host:port>/swagger-stats/ui`

 