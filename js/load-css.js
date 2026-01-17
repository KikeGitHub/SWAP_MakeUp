// Lightweight CSS activator: turns preloaded style links into applied styles
// Runs deferred to avoid inline event handlers (CSP-friendly)
(function(){
  function applyPreloadedStyles(){
    var links = document.querySelectorAll('link[rel="preload"][as="style"]');
    for(var i=0;i<links.length;i++){
      try{ links[i].rel = 'stylesheet'; }catch(e){}
    }
  }

  function loadDeferredStyles(){
    var deferred = document.querySelectorAll('link[data-defer-stylesheet]');
    deferred.forEach(function(node){
      try{
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = node.getAttribute('href');
        document.head.appendChild(l);
      }catch(e){}
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      applyPreloadedStyles();
      if('requestIdleCallback' in window) requestIdleCallback(loadDeferredStyles);
      else setTimeout(loadDeferredStyles, 1500);
    });
  } else {
    applyPreloadedStyles();
    if('requestIdleCallback' in window) requestIdleCallback(loadDeferredStyles);
    else setTimeout(loadDeferredStyles, 1500);
  }
})();