---
title:  "Stats"
categories: doc api
---

# stats

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
