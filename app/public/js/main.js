require(['domReady', 'views/App', 'bootstrap'], function(domReady, App){
  domReady(function() {
    $('#intro-modal').modal('show');
  });
});
