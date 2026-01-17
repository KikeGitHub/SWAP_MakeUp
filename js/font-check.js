(function(){
  if('fonts' in document){
    document.fonts.ready.then(function(){
      document.documentElement.classList.add('fonts-loaded');
    }).catch(function(){
      // If font loading API not available or fails, just proceed
    });
  }
})();