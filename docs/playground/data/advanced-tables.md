# Advanced Tables

## 1) Modern styled Markdown table (no JS)

<div class="table-modern table-striped table-hover" markdown>

| Job       | Schedule | SLA (min) | Status                               |
| :-------- | :------: | --------: | :----------------------------------- |
| Providers |  02:00   |        15 | <span class="chip ok">OK</span>      |
| Members   |  03:00   |        20 | <span class="chip">Normal</span>     |
| Claims    |  Hourly  |        30 | <span class="chip warn">Delay</span> |

</div>

## 2) DataTables (search/sort/paginate + export) on a Markdown table

<div class="table-modern table-striped table-hover" markdown>

| Job       | Owner | Schedule | SLA (min) |
| :-------- | :---: | :------: | --------: |
| Providers | DART  |  02:00   |        15 |
| Members   | DART  |  03:00   |        20 |
| Claims    | DART  |  Hourly  |        30 |

</div>

<!-- Add datatable on the table after it’s rendered -->

{.datatable}

## 3) Per-column filters + “Copy table” (vanilla JS)

<div class="table-modern js-filters js-copy" markdown>

| Job       | Schedule | SLA (min) |
| :-------- | :------: | --------: |
| Providers |  02:00   |        15 |
| Members   |  03:00   |        20 |
| Claims    |  Hourly  |        30 |

</div>

## 4) Grid.js (spreadsheet-like: resize columns, search, pagination)

<div class="gridify" markdown>

| Column 1 | Column 2 | Column 3 |
| :------- | :------- | :------- |
| r1c1     | r1c2     | r1c3     |
| r2c1     | r2c2     | r2c3     |
| r3c1     | r3c2     | r3c3     |

</div>

## 5) Sticky first column + horizontal scroll shadows (wide tables)

<div class="table-wrap table-modern table-sticky-first" markdown>

| Metric              | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
| :------------------ | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: |
| Providers processed |  12 |  10 |  15 |  13 |  17 |  22 |  20 |  18 |  19 |  25 |  27 |  30 |
| Members onboarded   | 220 | 210 | 240 | 200 | 260 | 300 | 280 | 270 | 255 | 320 | 330 | 350 |
| Claims completed    |  95 | 105 | 100 |  98 | 103 | 110 | 108 | 106 | 111 | 115 | 116 | 120 |

</div>

## 6) Dense/compact numeric table (tabular numbers + right-aligned)

<div class="table-modern table-compact" markdown>

| Metric  | P50 {: .num } | P95 {: .num } | Max {: .num } |
| :------ | ------------: | ------------: | ------------: |
| SLA (m) |           9.5 |            13 |            21 |
| Size MB |           112 |           340 |          1024 |

</div>

## 7) Merged cells / groups (plain HTML table)

<div class="table-modern table-striped table-hover">
<table>
  <thead>
    <tr>
      <th rowspan="2">Job</th>
      <th colspan="2">Schedule</th>
      <th rowspan="2" class="num">SLA (min)</th>
    </tr>
    <tr>
      <th>Type</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Providers</td><td>Daily</td><td>02:00</td><td class="num">15</td></tr>
    <tr><td>Members</td><td>Daily</td><td>03:00</td><td class="num">20</td></tr>
    <tr><td>Claims</td><td>Hourly</td><td>—</td><td class="num">30</td></tr>
  </tbody>
</table>
</div>

## 8) Cells with icons, tooltips, badges (UI flourishes)

<div class="table-modern table-hover" markdown>

| Job       | Status                               | Notes                                     |
| :-------- | :----------------------------------- | :---------------------------------------- |
| Providers | <span class="chip ok">OK</span>      | On time :material-check-decagram:         |
| Members   | <span class="chip">Normal</span>     | Stable                                    |
| Claims    | <span class="chip warn">Delay</span> | Hover me{title="Investigating P95 spike"} |

</div>

## 9) Inline “card grid” alternative (when a table feels heavy)

<div class="grid cols-3" markdown>
<div class="card">
**Providers** <span class="chip ok">OK</span><br/>
Schedule: <code>02:00</code> · SLA: **15m**
</div>
<div class="card">
**Members** <span class="chip">Normal</span><br/>
Schedule: <code>03:00</code> · SLA: **20m**
</div>
<div class="card">
**Claims** <span class="chip warn">Delay</span><br/>
Schedule: <code>Hourly</code> · SLA: **30m**
</div>
</div>

## 10) “App panel” table with sticky header only

<div class="table-modern" markdown>

| Event time | Pipeline  | Result | Duration |
| :--------- | :-------- | :----- | -------: |
| 02:00:03   | Providers | OK     |      12m |
| 03:00:07   | Members   | OK     |      16m |
| 03:30:11   | Claims    | Delay  |      28m |

</div>
