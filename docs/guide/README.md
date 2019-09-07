---
title:  "Quick Start"
categories: doc
---

# Quick Start

## Installation

```
npm install swagger-stats --save
```

## Express   

Enable swagger-stats middleware in your Express App:

```javascript
var swStats = require('swagger-stats');    

// Load your swagger specification 
var apiSpec = require('./swagger.json');

// Enable swagger-stats middleware in express app, passing swagger specification as option 
app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));
```

See [Express Sample Application](https://github.com/slanatech/swagger-stats/blob/master/examples/testapp/testapp.js)

## Start Monitoring

Navigate to `http://<your app host:port>/swagger-stats/ui`

![dashboard](/ui.png)

    
## Koa  

You will need `express-to-koa` to use swagger-stats middleware in your Koa app

```javascript
var swStats = require('swagger-stats');
var apiSpec = require('./swagger.json');
var e2k = require('express-to-koa');

app.use(e2k(swStats.getMiddleware({ swaggerSpec:apiSpec })));
```

## Hapi

Register swagger-stats Hapi plugin in your Hapi app

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

See [Hapi sample application](https://github.com/slanatech/swagger-stats/blob/master/examples/hapijstest/hapijstest.js)

<br/>

