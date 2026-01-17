// Lightweight CSS activator: turns preloaded style links into applied styles
// Runs deferred to avoid inline event handlers (CSP-friendly)
(function(){
  function applyPreloadedStyles(){
    var links = document.querySelectorAll('link[rel="preload"][as="style"]');
    for(var i=0;i<links.length;i++){
      try{ links[i].rel = 'stylesheet'; }catch(e){}
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyPreloadedStyles);
  } else {
    applyPreloadedStyles();
  }
})();