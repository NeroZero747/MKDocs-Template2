// table-tools.js — Header-embedded column filters
(function(){
  const isNum  = v => /^-?\d+(?:[.,]\d+)?$/.test(v.replace(/\s/g,''));
  const isDate = v => !isNaN(Date.parse(v));
  const uniq = a => [...new Set(a)];

  function sampleColumn(table, colIdx, limit=500){
    const vals = [];
    const rows = table.tBodies[0]?.rows || [];
    for (let i=0; i<rows.length && vals.length<limit; i++)
      vals.push((rows[i].cells[colIdx]?.textContent || '').trim());
    return vals;
  }
  function detectType(values){
    const nonEmpty = values.filter(v => v !== '');
    const n = nonEmpty.length;
    const num = nonEmpty.filter(isNum).length;
    const dat = nonEmpty.filter(isDate).length;
    if (n && num/n > 0.9) return 'number';
    if (n && dat/n > 0.9) return 'date';
    return 'text';
  }

  function applyFilters(table){
    const tBody = table.tBodies[0]; if(!tBody) return;
    const rows = [...tBody.rows];
    const headRow = table.tHead?.rows?.[0]; if(!headRow) return;
    const ctrls = [...headRow.cells].map(th => th.querySelector('.th-filter select, .th-filter input'));

    rows.forEach(tr => {
      let show = true;
      for (let i=0; i<ctrls.length && show; i++){
        const ctrl = ctrls[i]; if(!ctrl) continue;
        const raw = (tr.cells[i]?.textContent || '').trim();
        const txt = raw.toLowerCase();
        if (ctrl.tagName === 'SELECT'){
          const v = ctrl.value.trim().toLowerCase(); if (v && txt !== v) show = false;
        } else {
          const q = ctrl.value.trim().toLowerCase(); if (q && !txt.includes(q)) show = false;
        }
      }
      tr.style.display = show ? '' : 'none';
    });
  }

  function makeHeaderFilters(table){
    const thead = table.tHead || table.createTHead();
    const headRow = thead.rows[0] || thead.insertRow(0);

    [...headRow.cells].forEach((th, colIdx) => {
      if (th.dataset.hasFilter === '1') return;
      const label = th.textContent.trim(); th.textContent = '';
      const wrap = document.createElement('div'); wrap.className='th-wrap';
      const lab = document.createElement('span'); lab.className='th-label'; lab.textContent=label;
      const filterBox = document.createElement('div'); filterBox.className='th-filter';

      const values = sampleColumn(table, colIdx);
      const type = detectType(values);
      let ctrl;
      if (type === 'text'){
        const uniques = uniq(values).filter(v=>v!=='' ).slice(0,50).sort();
        if (uniques.length && uniques.length <= 12){
          ctrl = document.createElement('select');
          const optAll = document.createElement('option'); optAll.value=''; optAll.textContent='(All)'; ctrl.append(optAll);
          uniques.forEach(v=>{ const o=document.createElement('option'); o.value=v.toLowerCase(); o.textContent=v; ctrl.append(o); });
        } else {
          ctrl = document.createElement('input'); ctrl.type='search'; ctrl.placeholder='Filter…';
        }
      } else {
        // numeric/date → simple text filter; (range UI can be added later)
        ctrl = document.createElement('input'); ctrl.type='search'; ctrl.placeholder='Filter…';
      }

      filterBox.append(ctrl); wrap.append(lab, filterBox); th.append(wrap); th.dataset.hasFilter='1';
      const on = () => applyFilters(table);
      ctrl.addEventListener(ctrl.tagName==='SELECT' ? 'change' : 'input', on);
    });
  }

  window.__makeHeaderFilters = makeHeaderFilters;
  window.__applyHeaderFilters = applyFilters;
})();
