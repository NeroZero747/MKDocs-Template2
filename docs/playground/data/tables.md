# Data Tables

<div class="table-modern" markdown>

| Job       | Owner | Schedule | SLA |
|:----------|:-----:|:--------:|---:|
| Providers | DART  | 02:00    | 15 |
| Members   | DART  | 03:00    | 20 |
| Claims    | DART  | Hourly   | 30 |

</div>{.datatable .js-filters}


---

<div class="table-modern datatable js-filters" markdown>

| Job       | Owner | Schedule | SLA |
|:----------|:-----:|:--------:|---:|
| Providers | DART  | 02:00    | 15 |
| Members   | DART  | 03:00    | 20 |
| Claims    | DART  | Hourly   | 30 |

</div>


---
<div class="datatable" data-per-page="3" data-per-page-select="[3,5,10]" markdown>

| Job | SLA |
| --- | --- |
| A   | 10  |
| B   | 20  |
| C   | 30  |
| D   | 40  |

</div>

---


**Filter:** 
<button class="md-button chip" data-filter="*">All</button>
<button class="md-button chip ok" data-filter="ok">OK</button>
<button class="md-button chip warn" data-filter="warn">Delay</button>

<div class="table-modern table-striped table-hover js-tagfilter" markdown>

| Job       | Status                                   | SLA (min) |
|:----------|:-----------------------------------------|----------:|
| Providers | <span class="chip ok">OK</span>          |        15 |
| Members   | <span class="chip">Normal</span>         |        20 |
| Claims    | <span class="chip warn">Delay</span>     |        30 |

</div>

<script>
(function () {
  function attach() {
    const tableWrap = document.querySelector('.js-tagfilter');
    if (!tableWrap || tableWrap.dataset.tagInit) return;
    tableWrap.dataset.tagInit = 1;

    const table = tableWrap.querySelector('table');
    const buttons = document.querySelectorAll('[data-filter]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-filter');
        [...table.tBodies[0].rows].forEach(tr => {
          const cell = tr.cells[1]?.textContent.toLowerCase();
          const isMatch = key === '*' ||
            (key === 'ok' && cell.includes('ok')) ||
            (key === 'warn' && cell.includes('delay'));
          tr.style.display = isMatch ? '' : 'none';
        });
      });
    });
  }
  document.addEventListener('DOMContentLoaded', attach);
  if (window.document$) window.document$.subscribe(attach);
})();
</script>

---

**Max SLA (minutes):** <input id="slaMax" type="range" min="0" max="60" value="30" oninput="slaOut.textContent=this.value"> <span id="slaOut">30</span>

<div class="table-modern js-sla-filter" markdown>

| Job       | SLA (min) |
|:----------|----------:|
| Providers |        15 |
| Members   |        20 |
| Claims    |        30 |

</div>

<script>
(function () {
  function run() {
    const wrap = document.querySelector('.js-sla-filter');
    const tbl  = wrap?.querySelector('table');
    const rng  = document.getElementById('slaMax');
    if (!tbl || !rng || wrap.dataset.slaInit) return;
    wrap.dataset.slaInit = 1;

    function apply() {
      const maxVal = Number(rng.value);
      for (const tr of tbl.tBodies[0].rows) {
        const val = Number(tr.cells[1].innerText.trim());
        tr.style.display = (val <= maxVal) ? '' : 'none';
      }
    }
    rng.addEventListener('input', apply);
    apply();
  }
  document.addEventListener('DOMContentLoaded', run);
  if (window.document$) window.document$.subscribe(run);
})();
</script>

---
<div>
  <label>Job contains: <input id="gFilter" placeholder="type…" /></label>
</div>

<!-- Put a simple Markdown table that Grid.js will convert -->
<div class="gridify" markdown>
| Job       | Owner | SLA |
|:----------|:-----:|----:|
| Providers | DART  |  15 |
| Members   | DART  |  20 |
| Claims    | DART  |  30 |
</div>

<script>
(function () {
  function run() {
    const raw = document.querySelector('table'); // the table Grid.js will transform
    if (!raw || raw.dataset.gfInit) return;
    raw.dataset.gfInit = 1;

    // Convert table to arrays
    const headers = [...raw.tHead.rows[0].cells].map(th => th.innerText.trim());
    const rowsAll = [...raw.tBodies[0].rows].map(tr => [...tr.cells].map(td => td.innerText));

    // Replace table with Grid.js
    const mount = document.createElement('div');
    raw.parentNode.insertBefore(mount, raw);
    raw.remove();

    const grid = new gridjs.Grid({
      columns: headers,
      data: rowsAll,
      search: true,
      sort: true,
      pagination: { enabled: true, limit: 10 },
      resizable: true,
      fixedHeader: true
    }).render(mount);

    // External filter on column 0
    const input = document.getElementById('gFilter');
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      const filtered = rowsAll.filter(r => (r[0] || '').toLowerCase().includes(q));
      grid.updateConfig({ data: filtered }).forceRender();
    });
  }
  document.addEventListener('DOMContentLoaded', run);
  if (window.document$) window.document$.subscribe(run);
})();
</script>

---
<div class="table-modern datatable js-filters js-copy js-queryfilter" markdown>

| Job       | SLA |
|:----------|----:|
| Providers |  15 |
| Members   |  20 |
| Claims    |  30 |

</div>

<script>
(function () {
  function getParam(k){ return new URLSearchParams(location.search).get(k) || ''; }
  function run() {
    const wrap = document.querySelector('.js-queryfilter');
    const tbl  = wrap?.querySelector('table');
    if (!tbl || wrap.dataset.queryInit) return;
    wrap.dataset.queryInit = 1;

    const q = getParam('q').toLowerCase();
    const maxSla = Number(getParam('maxSla') || Infinity);

    for (const tr of tbl.tBodies[0].rows) {
      const job = tr.cells[0].innerText.toLowerCase();
      const sla = Number(tr.cells[1].innerText);
      tr.style.display = (job.includes(q) && sla <= maxSla) ? '' : 'none';
    }
  }
  document.addEventListener('DOMContentLoaded', run);
  if (window.document$) window.document$.subscribe(run);
})();
</script>

---

