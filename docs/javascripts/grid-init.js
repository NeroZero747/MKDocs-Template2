// grid-init.js — inject header filters into Grid.js headers
(function () {
  function toArray(tbl) {
    const headers = [...(tbl.tHead?.rows?.[0]?.cells || [])].map(th => th.innerText.trim());
    const rows = [...(tbl.tBodies?.[0]?.rows || [])].map(tr => [...tr.cells].map(td => td.innerText.trim()));
    return { headers, rows };
  }
  const uniq = a => [...new Set(a)];
  const isNum = v => /^-?\d+(?:[.,]\d+)?$/.test(v.replace(/\s/g,''));
  const isDate = v => !isNaN(Date.parse(v));
  function detectType(values){
    const nonEmpty = values.filter(v => v !== '');
    const n = nonEmpty.length; if(!n) return 'text';
    const num = nonEmpty.filter(isNum).length;
    const dat = nonEmpty.filter(isDate).length;
    if (num/n > 0.9) return 'number';
    if (dat/n > 0.9) return 'date';
    return 'text';
  }

  function run() {
    if (!window.gridjs) return;
    document.querySelectorAll('table.gridify').forEach(tbl => {
      if (tbl.dataset.gridified) return;
      if (!tbl.tHead || !tbl.tBodies?.length) return;
      const { headers, rows } = toArray(tbl);

      const wrapper = document.createElement('div');
      tbl.parentNode.insertBefore(wrapper, tbl);
      tbl.remove();

      let grid = new gridjs.Grid({
        columns: headers,
        data: rows,
        search: false,
        sort: true,
        pagination: { enabled: true, limit: 10 },
        resizable: true,
        fixedHeader: true
      });
      grid.render(wrapper);

      // After render, inject controls into header
      const headCells = wrapper.querySelectorAll('.gridjs-thead .gridjs-th');
      const ctrls = [];
      headCells.forEach((th, i) => {
        const title = th.textContent.trim(); th.innerHTML = '';
        const wrap = document.createElement('div'); wrap.className='th-wrap';
        const lab = document.createElement('span'); lab.className='th-label'; lab.textContent=title;
        const box = document.createElement('div'); box.className='th-filter';

        const colVals = rows.map(r=>r[i]);
        const type = detectType(colVals);
        let ctrl;
        if (type === 'text'){
          const values = uniq(colVals).filter(Boolean).slice(0,50).sort();
          if (values.length && values.length <= 12){
            ctrl = document.createElement('select');
            const o=document.createElement('option'); o.value=''; o.textContent='(All)'; ctrl.append(o);
            values.forEach(v=>{ const op=document.createElement('option'); op.value=String(v).toLowerCase(); op.textContent=v; ctrl.append(op); });
          } else {
            ctrl = document.createElement('input'); ctrl.type='search'; ctrl.placeholder='Filter…';
          }
        } else {
          ctrl = document.createElement('input'); ctrl.type='search'; ctrl.placeholder='Filter…';
        }
        box.append(ctrl); wrap.append(lab, box); th.append(wrap); ctrls[i]=ctrl;
      });

      function apply(){
        const filtered = rows.filter(r => {
          for (let i=0;i<ctrls.length;i++){
            const c = ctrls[i]; if(!c) continue;
            const cell = String(r[i] ?? ''); const txt = cell.toLowerCase();
            if (c.tagName==='SELECT'){ const v=c.value.trim(); if (v && txt !== v) return false; }
            else { const q=c.value.trim().toLowerCase(); if (q && !txt.includes(q)) return false; }
          }
          return true;
        });
        grid.updateConfig({ data: filtered }).forceRender();
      }
      const deb = (fn,ms=120)=>{ let t; return ()=>{ clearTimeout(t); t=setTimeout(fn,ms); } };
      ctrls.forEach(c=>{
        if (!c) return;
        c.addEventListener(c.tagName==='SELECT' ? 'change' : 'input', deb(apply));
      });

      wrapper.dataset.gridified = '1';
    });
  }
  document.addEventListener('DOMContentLoaded', run);
  if (window.document$) window.document$.subscribe(run);
})();
