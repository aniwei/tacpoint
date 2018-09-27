;(function (window) {
  var routie = window.routie;
  
  var app = {

    start: function () {
      this.registerRoutie();
    },

    registerRoutie: function () {
      routie('*', function () {

      });

      routie('/project/:name?', function (name) {

      });

      routie('/about', function () {

      });

      routie('/contact', function () {

      });
    },


  };

  app.start();
})(window);