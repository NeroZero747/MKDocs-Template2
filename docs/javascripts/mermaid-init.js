(function () {
  function run() {
    if (!window.mermaid) return;
    try {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'default'
      });
      if (mermaid.run) {
        mermaid.run({ querySelector: '.mermaid' });
      } else {
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
      }
    } catch (e) { console.error('Mermaid init error:', e); }
  }
  document.addEventListener('DOMContentLoaded', run);
  if (window.document$) window.document$.subscribe(run);
})();
