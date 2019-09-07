---
title:  "Quick Start"
categories: doc
---

# Quick Start

> Install swagger-stats

```
npm install swagger-stats --save
```

> Enable swagger-stats middleware in your node.js app 

```javascript
var swStats = require('swagger-stats');    

// Load your swagger specification 
var apiSpec = require('swagger.json');

// Enable swagger-stats middleware in express app, passing swagger specification as option 
app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));
```

> navigate to `http://<your app host:port>/swagger-stats/ui`    

