---
title: Dashboards
tags: [dashboard, kpi]
---

# Dashboards

## KPI Row

<div class="grid cols-4" markdown>
<div class="card">:material-check-decagram: **99.95%** uptime</div>
<div class="card">:material-timer-sand: **P95 12m** completion</div>
<div class="card">:material-database: **3** source systems</div>
<div class="card">:material-chart-timeline: **12** pipelines</div>
</div>

## Pipeline Status
<div class="grid cards" markdown>
- :material-database: **Providers**
  Status: ✅ **OK** · Duration **12m**  
  [Runbook](../../operations/runbook.md){ .md-button }
- :material-account-multiple: **Members**
  Status: ✅ **OK** · Duration **18m**  
  [Runbook](../../operations/runbook.md){ .md-button }
- :material-file-document: **Claims**
  Status: ⚠️ **Delayed** · Duration **31m**  
  [Investigate](../../operations/troubleshooting.md){ .md-button .md-button--primary }
</div>

## Lineage Snapshot
```mermaid
sequenceDiagram
  participant S as SQL Server
  participant T as Transform
  participant P as Pin
  S->>T: SELECT new rows
  T->>T: cleanse / normalize
  T->>P: write parquet + metadata
```
