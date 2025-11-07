---
title: Layouts & Grids
tags: [layout, grid]
---

# Layouts & Grids

## Responsive columns
<div class="grid cols-3" markdown>
<div class="card">
### Extract
- SQL Server
- Oracle
- MongoDB
</div>
<div class="card">
### Transform
- Python
- Pandas / PyArrow
- Dask
</div>
<div class="card">
### Load
- Posit Connect Pins
- Parquet
- Snowflake (future)
</div>
</div>

## Cards with badges
<div class="grid cols-3" markdown>
<div class="card">
**Providers** <span class="badge">daily</span><br/>Owner: DART · SLA: **15m**
</div>
<div class="card">
**Members** <span class="badge">daily</span><br/>Owner: DART · SLA: **20m**
</div>
<div class="card">
**Claims** <span class="badge">hourly</span><br/>Owner: DART · SLA: **30m**
</div>
</div>

## KPIs
<div class="grid cards" markdown>
<div class="kpi ok">:material-check-circle <span class="value">99.9%</span> Success</div>
<div class="kpi warn">:material-timer-sand <span class="value">P95 14m</span> SLA</div>
<div class="kpi bad">:material-alert <span class="value">2</span> Incidents</div>
</div>

## KPIs
<div class="grid cols-3">
  <div class="kpi ok" markdown>:material-check-circle: <span class="value">99.9%</span> Success</div>
  <div class="kpi warn" markdown>:material-timer-sand: <span class="value">P95 14m</span> SLA</div>
  <div class="kpi bad" markdown>:material-alert: <span class="value">2</span> Incidents</div>
</div>


## KPIs
<div class="grid cards" markdown>

- <span markdown>:material-check-circle:</span>  
  **99.9%**  
  Success

- <span markdown>:material-timer-sand:</span>  
  **P95 14m**  
  SLA

- <span markdown>:material-alert:</span>  
  **2**  
  Incidents

</div>

## KPIs
<div class="grid cards" markdown>

- :material-check-circle: **99.9%**  
  Success

- :material-timer-sand: **P95 14m**  
  SLA

- :material-alert: **2**  
  Incidents

</div>


## KPIs
<div class="grid cols-3" markdown>
  <div class="kpi ok"><span class="md-icon" markdown>:material-check-circle:</span> <span class="value">99.9%</span> Success</div>
  <div class="kpi warn"><span class="md-icon" markdown>:material-timer-sand:</span> <span class="value">P95 14m</span> SLA</div>
  <div class="kpi bad"><span class="md-icon" markdown>:material-alert:</span> <span class="value">2</span> Incidents</div>
</div>


<div class="grid cols-4" markdown>
<div class="card">:material-check-decagram: **99.95%** uptime</div>
<div class="card">:material-timer-sand: **P95 12m** completion</div>
<div class="card">:material-database: **3** source systems</div>
<div class="card">:material-chart-timeline: **12** pipelines</div>
</div>

## Mermaid
```mermaid
flowchart LR
  subgraph Sources
    A[SQL Server]
    B[Oracle]
    C[MongoDB]
  end
  A --> T[Python Transform]
  B --> T
  C --> T
  T --> P[Posit Connect Pin]
  P --> BI[Dashboards]
```

<div class="card info-card" markdown>
  <div class="card-body">
    <div class="card-head">
      <div class="card-heading">Data Quality Gate</div>
    </div>
    Author: Geovany Guifarro
  </div>
</div>

---
title: Claims Extract
author: Geovany Guifarro
publisher: DART — CA Market Data Analytics & Reporting
---
