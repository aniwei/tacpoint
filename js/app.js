;(function (window) {
  var routie = window.routie;
  var noop = function () {};

  // css selector
  var querySelector = function () {
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  // scene class
  var Scene = function (el, options, route) {
    this.container = querySelector(el);
    this.options = options || {};

    route = route || noop;

    return this.createRoute(route);
  };

  Scene.prototype = {
    constructor: Scene,
    createRoute: function (route) {
      var self = this;
      var options = this.options;
      var navigator = options.navigator;

      return function () {
        self.route = this;

        app.scenes.push(self);
        app.current = self;
        
        // resset left button
        app.navigator.prev
          .text(navigator.prev.text).link(navigator.next.link);

        // resset right button
        app.navigator.next
          .text(navigator.next.text).link(navigator.next.link);

        route.call(this, params);
      }
    }
  }

  // navigator class
  var Navigator = function (el) {
    this.container = querySelector(el);

    this.text = null;
    this.path = null;

    var self = this;

    this.constructor.addEventsListener('click', function () {
      app.navigate(self.path);
    }, false);
  }

  Navigator.prototype = {
    constructor: Navigator,
    text: function () {
      this.container.innerText = text;

      return this;
    },

    link: function (link) {
      this.path = link;

      return this;
    }
  };
  
  // app controller
  var app = {
    current: null,
    scenes: [],

    start: function () {
      this.registerRoutie();
    },

    getAppNavigation () {
      this.navigator = {
        prev: new Navigator('.navigator__prev'),
        next: new Navigator('.navigator__next'),
      };
    },

    transitionTo: function () {

    },

    // page route
    registerRoutie: function () {
      routie('', new Scene('.scene-contact', {
        navigator: {
          prev: {
            path: '/about',
            text: 'About'
          },

          next: {
            path: '/contact',
            text: 'Let\'s talk'
          }
        }
      }, function () {

      }));

      routie('*', function () {
        debugger;
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