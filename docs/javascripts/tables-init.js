// tables-init.js — Simple-DataTables + header-embedded filters
(function () {
  function enhance() {
    const nodes = document.querySelectorAll('table.datatable, .datatable table');
    nodes.forEach(tbl => {
      if (tbl.dataset.dtInit) return;
      if (tbl.classList.contains('gridify') || tbl.closest('.gridify')) return;

      // Build header filters before library init
      if (window.__makeHeaderFilters) window.__makeHeaderFilters(tbl);

      if ((tbl.classList.contains('datatable') || tbl.closest('.datatable')) && window.simpleDatatables) {
        const perPage = tbl.dataset.perPage ? Number(tbl.dataset.perPage) : 10;
        const perPageSelect = tbl.dataset.perPageSelect ? JSON.parse(tbl.dataset.perPageSelect) : [10,25,50,100];
        const dt = new simpleDatatables.DataTable(tbl, {
          searchable: true,
          fixedHeight: false,
          perPage,
          perPageSelect,
          labels: { placeholder: 'Search…', perPage: '{select} / page', noRows: 'No rows to display' }
        });
        const reapply = () => window.__applyHeaderFilters && window.__applyHeaderFilters(tbl);
        dt.on('datatable.page', reapply);
        dt.on('datatable.sort', reapply);
        dt.on('datatable.search', reapply);
      }
      tbl.dataset.dtInit = '1';
    });
  }
  document.addEventListener('DOMContentLoaded', enhance);
  if (window.document$) window.document$.subscribe(enhance);
})();
