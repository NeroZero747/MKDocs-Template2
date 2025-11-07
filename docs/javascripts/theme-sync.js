// theme-sync.js — keep components in sync with MkDocs Material palette
(function(){
  const root = document.documentElement;
  function currentScheme(){
    return root.getAttribute('data-md-color-scheme') || 'default';
  }
  function apply(){
    const scheme = currentScheme();
    document.body.dataset.colorScheme = scheme;
    window.dispatchEvent(new CustomEvent('schemechange', { detail:{ scheme } }));
  }
  // Run now
  apply();
  // Re-run on SPA page switches
  if (window.document$) window.document$.subscribe(apply);
  // Re-run when the scheme attribute changes (palette toggle)
  new MutationObserver(apply).observe(root, { attributes:true, attributeFilter:['data-md-color-scheme'] });
})();