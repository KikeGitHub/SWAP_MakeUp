(function(){
    var loadMain=function(){
        var s=document.createElement('script');
        s.src='js/script.js';
        s.defer=true;
        s.setAttribute('data-noncritical','true');
        document.body.appendChild(s);
    };
    if('requestIdleCallback' in window){
        requestIdleCallback(loadMain,{timeout:2500});
    }else{
        window.addEventListener('load',loadMain);
    }
})();
