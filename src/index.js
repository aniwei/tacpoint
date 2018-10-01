import 'whatwg-fetch';
import React, { Component, cloneElement } from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Project from './pages/Project';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Access from './pages/Access';

import Logo from './components/Logo';
import NavigationButton from './components/NavigationButton';

import Context from './Context';
import { 
  IS_MOBILE,
  COLORS, 
  WIDTH_LIST, 
  TRANSITION_PROPERTY,
  GOOGLE_MAP_JS_URL
} from './contants';

class App extends Component {
  state = {
    openNavigations: false,
    navigations: null,
    navigators: [],
    backgroundColor: COLORS.BLACK,
    logoColor: COLORS.WHITE,
    navigatorColor: COLORS.WHITE,
    logoType: 'simple',
    transitionProperty: TRANSITION_PROPERTY['1024'],
    isMobile: false
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize);
    
    this.onResize();
  }

  componentWillMount () {
    
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onScroll);
  }


  onResize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const index = WIDTH_LIST.concat(width).sort((x, y) => x - y).indexOf(width);

    this.width = width;
    this.height = height;

    this.setState({
      transitionProperty: TRANSITION_PROPERTY[WIDTH_LIST[index]],
      isMobile: IS_MOBILE[WIDTH_LIST[index]] === 'MOBILE'
    });
  }

  onNavigationClear = () => {
    if (this.navigations) {
      this.navigations.clear();
    }
  }

  onMapStyles = (styles) => {
    if (styles.transform !== undefined) {
      return {
        ...styles,
        transform: `translateX(${styles.transform}%)`
      }
    }

    return styles;
  }

  appendGoogleMapScript = (onLoaded) => {
    if (this.isGoogleScriptLoaded) {
      return onLoaded();
    }

    const script = document.createElement('script');

    script.type = 'application/javascript';
    script.src = GOOGLE_MAP_JS_URL;
    script.onload = () => {
      onLoaded();
    }

    document.body.appendChild(script);

    this.isGoogleScriptLoaded = true;
  }

  setNavigatorColor = (navigatorColor) => {
    this.setState({
      navigatorColor
    });
  }

  setLogoType = (logoType) => {
    this.setState({
      logoType
    });
  }

  setNavigations = (navigations) => {
    this.setState({
      navigations: cloneElement(navigations, {
        ref: ref => this.navigations = ref
      })
    });
  }

  setBackgroundColor = (backgroundColor) => {
    this.setState({ backgroundColor });
  }

  setLogoColor = (logoColor) => {
    this.setState({ logoColor });
  }

  setNavigators = (navigators) => {
    const { navigatorColor } = this.state;

    this.setState({
      navigators: navigators.map(nav => {
        const { position, text, path } = nav;  
        const classes = classnames({
          'app__navigator': true,
          [`app__navigator-${position}`]: true
        })
  
        return (
          <div className={classes} key={position} style={{ color: navigatorColor }}>
            <Link to={path}>
              {text}
            </Link>
          </div>
        );
      })
    });
  }

  onNavigationButtonClick = (action) => {
    this.setState({
      openNavigations: action === 'open'
    });
  }

  getWindowSize = () => {
    const self = this;

    return {
      get height () {
        return self.height;
      },
      get width () {
        return self.width;
      },
    };
  }

  getAnimatedProperty = (type) => {
    const { transitionProperty } = this.state;
    const style = {};

    transitionProperty.map(({ name, value }) => {
      style[name] = value[type];
    });

    return style;
  }

  scenesRender () {

    return (
      <div className="scene">
        <Home />
        <AnimatedSwitch
          atEnter={this.getAnimatedProperty('from')}
          atLeave={this.getAnimatedProperty('from')}
          atActive={this.getAnimatedProperty('to')}
          mapStyles={this.onMapStyles}
          className="scene__animated"
        >
          <Switch>
            <Route path="/project" component={Project} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/access" component={Access} />
          </Switch>
        </AnimatedSwitch>
      </div>
    );
  }

  layoutRender () {
    const { logoColor, logoType, navigations, openNavigations, navigators } = this.state;

    console.log(navigator)

    const classes = classnames({
      'app__navigation': true,
      'animated': true,
      'open': openNavigations
    });

    return (
      <div className="app__layout">
        <div className="app__header">
          <NavigationButton 
            open={openNavigations}
            onOpen={() => this.onNavigationButtonClick('open')} 
            onClose={() => this.onNavigationButtonClick('close')} 
          />
          <Logo color={logoColor} type={logoType} />
        </div>
        <div className="app__scene">
          {this.scenesRender()}
        </div>
        <div className="app__footer">
          <div className="app__copyright">©2018 Tacpoint, Inc.</div>
        </div>

        <div className={classes}>
          <div className="app__navigation-content">
            <div className="scene__grid">
              <div className="scene__grid-inner">
                {navigations}
              </div>
            </div>
          </div>
          <div className="app__navigation-clear" onClick={this.onNavigationClear}>
            <div className="scene__grid">
              <div className="scene__grid-inner">
                <div className="col-8 col-offset-4 col-m-10 col-offset-m-0 col-s-12 col-offset-s-9 col-xs-12 col-offset-xs-6 app__navigation-clear" onClick={this.onNavigationClear}>
                  <Link to="/">
                    + all projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {navigators}
      </div>
    );
  }

  provideContext = () => {
    return {
      application: this,
      isMobile: this.state.isMobile,
      openNavigator: this.openNavigator,
      closeNavigator: this.closeNavigator,
      setBackgroundColor: this.setBackgroundColor,
      setLogoColor: this.setLogoColor,
      setLogoType: this.setLogoType,
      setNavigations: this.setNavigations,
      setNavigators: this.setNavigators,
      setNavigatorColor: this.setNavigatorColor,
      getWindowSize: this.getWindowSize
    }
  }

  set onGoogleScriptLoaded (onLoaded) {
    this.appendGoogleMapScript(onLoaded);        
  }

  render () {
    const { backgroundColor } = this.state;
    const style = {
      backgroundColor
    };

    return (
      <Context.Provider value={this.provideContext()}>
        <div className="app" style={style}>
          {this.layoutRender()}
        </div>
      </Context.Provider>
    );
  }
}

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);