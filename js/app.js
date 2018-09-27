;(function (window) {
  var routie = window.routie;
  var noop = function () {};
  var COLORS  = {
    BLACK: 'rgb(0, 0, 0)'
  };

  // css selector
  var querySelector = function (el) {
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  var setTransition = function (el, transition) {
    if (el) {
      el.style.mozTransision = transition;
      el.style.msTransision = transition;
      el.style.webkitTransision = transition;
      el.style.transision = transition;
    }
  }

  // scene class
  var Scene = function (el, options) {
    this.container = querySelector(el);

    Object.assign(this, options);

    this.init();

    return this.createRoute();
  };

  Scene.prototype = {
    constructor: Scene,
    init: function (){},
    distroy: function () {},
    appear: function () {
      
    },
    disppear: function () {},
    createRoute: function (route) {
      var self = this;
      var navigator = this.navigator;

      return function (params) {
        self.route = this;

        app.scenes.push(self);
        app.current = self;
        
        // resset left button
        app.navigator.prev
          .text(navigator.prev.text)
          .link(navigator.prev.link)
          .color(navigator.prev.color);

        // resset right button
        app.navigator.next
          .text(navigator.next.text)
          .link(navigator.next.link)
          .color(navigator.next.color);

        setTimeout(function () {
          self.appear(this, params);
        }, 0);
      }
    }
  }

  // navigator class
  var Navigator = function (el) {
    this.container = querySelector(el);
    this.path = null;

    var self = this;

    this.container.addEventListener('click', function () {
      app.navigate(self.path);
    }, false);
  }

  Navigator.prototype = {
    constructor: Navigator,
    text: function (text) {
      this.container.innerText = text;

      return this;
    },

    link: function (link) {
      this.path = link;

      return this;
    },

    color: function (color) {
      this.container.style.color = color;

      return this;
    }
  };
  
  // app controller
  var app = {
    current: null,
    scenes: [],

    setBackgroundColor: function (backgroundColor) {
      this.container.style.backgroundColor = backgroundColor;
    },

    start: function () {
      this.createApplication();
      this.createApplicationNavigation();
      this.registerRoutie();
    },

    createApplication () {
      this.container = querySelector('.app');

      this.container.style.backgroundColor = COLORS.BLACK;
    },

    createApplicationNavigation () {
      this.navigator = {
        prev: new Navigator('.navigator__prev'),
        next: new Navigator('.navigator__next'),
      };
    },

    transitionTo: function () {

    },

    // page route
    registerRoutie: function () {
      routie('', scenes.root);
      routie('/project/:name?', scenes.project);
      routie('/about', scenes.about);
      routie('/contact', scenes.contact);
    },
  };

  var scenes = {};

  scenes.root = new Scene('.scene-contact', {
    backgroundColor: '#fff',
    navigator: {
      prev: {
        path: '/about',
        text: 'About',
        color: '#1a1a1a'
      },

      next: {
        path: '/contact',
        text: 'Let\'s talk',
        color: '#1a1a1a'
      }
    },
    init: function () {
      this.container = querySelector('scene-project');
    },

    appear: function (route, params) {
      
    }
  });

  scenes.contact = new Scene('.scene-contact', {
    backgroundColor: COLORS.BLACK,
    navigator: {
      prev: {
        path: '/about',
        text: 'About',
        color: '#1a1a1a'
      },

      next: {
        path: '/contact',
        text: 'Let\'s talk',
        color: '#1a1a1a'
      }
    },
    init: function () {
    },

    appear: function (route, params) {
      if (this.backgroundColor) {
        app.setBackgroundColor(this.backgroundColor);
      }
    }
  });

  scenes.about = new Scene('.scene-about', {
    backgroundColor: '#fff',
    navigator: {
      prev: {
        path: '/about',
        text: 'About',
        color: '#1a1a1a'
      },

      next: {
        path: '/contact',
        text: 'Let\'s talk',
        color: '#1a1a1a'
      }
    },
    init: function () {
      this.container = querySelector('scene-about');
    },

    appear: function (route, params) {
      
    }
  });

  scenes.project = new Scene('.scene-project', {
    backgroundColor: '#fff',
    navigator: {
      prev: {
        path: '/about',
        text: 'About',
        color: '#1a1a1a'
      },

      next: {
        path: '/contact',
        text: 'Let\'s talk',
        color: '#1a1a1a'
      }
    },
    init: function () {
      this.container = querySelector('scene-project');
    },

    appear: function (route, params) {
      
    }
  });

  app.start();

})(window);