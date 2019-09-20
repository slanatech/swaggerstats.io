---
home: true
heroImage: /logo.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Express, Fastify, Koa, Hapi
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

<br/>
<div style="text-align: center;width: 100%;">
  <a class="github-button" href="https://github.com/slanatech" data-size="large" aria-label="Follow @slanatech on GitHub">Follow</a>
  <a class="github-button" href="https://github.com/slanatech/swagger-stats" data-icon="octicon-star" data-size="large" aria-label="Star slanatech/swagger-stats on GitHub">Star</a>
  <a class="github-button" href="https://github.com/slanatech/swagger-stats/fork" data-icon="octicon-repo-forked" data-size="large" aria-label="Fork slanatech/swagger-stats on GitHub">Fork</a>
</div>
<br/>

![sample](ui0950.gif)

## Quick start

### Install 

```bash
npm install swagger-stats --save
```

### Express  
```javascript
var swStats = require('swagger-stats');
var apiSpec = require('./swagger.json');

app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));
```

### Fastify
```javascript
const swStats = require('swagger-stats');
const apiSpec = require('./swagger.json');

const fastify = require('fastify')({
 logger: true
});

fastify.register(swStats.getFastifyPlugin, {swaggerSpec:apiSpec});
```

### Koa  
```javascript
var swStats = require('swagger-stats');
var apiSpec = require('./swagger.json');
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

<ClientOnly>
  <githubbuttons/>
</ClientOnly>
