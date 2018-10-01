import 'whatwg-fetch';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Project from './pages/Project';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Access from './pages/Access';

import Logo from './components/Logo';

import Context from './Context';
import { 
  COLORS, 
  WIDTH_LIST, 
  TRANSITION_PROPERTY,
  GOOGLE_MAP_JS_URL
} from './contants';

class App extends Component {
  state = {
    backgroundColor: COLORS.BLACK,
    logoColor: COLORS.WHITE,
    logoType: 'simple',
    transitionProperty: TRANSITION_PROPERTY['1024']
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
      transitionProperty: TRANSITION_PROPERTY[WIDTH_LIST[index - 1]]
    });
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

  setLogoType = (logoType) => {
    this.setState({
      logoType
    });
  }

  setBackgroundColor = (backgroundColor) => {
    this.setState({ backgroundColor });
  }

  setLogoColor = (logoColor) => {
    this.setState({ logoColor });
  }

  setNavigator = () => {

  }

  openNavigator = () => {
    
  }

  closeNavigator = () => {

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
        </AnimatedSwitch>·
      </div>
    );
  }

  navigatorsRender () {
    const { navigators } = this.state;


  }

  layoutRender () {
    const { logoColor, logoType } = this.state;

    return (
      <div className="app__layout">
        <div className="app__header">
          <Logo color={logoColor} type={logoType} />
          <div className="app__navigation">
            <div className="app__navigation-button">
            </div>

            <div className="app__navigation-content">

            </div>
          </div>
        </div>
        <div className="app__scene">
          {this.scenesRender()}
        </div>
        <div className="app__footer">
          <div className="app__copyright">©2018 Tacpoint, Inc.</div>
        </div>

        <div className="app__navigator app__navigator-left"></div>
        <div className="app__navigator app__navigator-right"></div>
      </div>
    );
  }

  provideContext = () => {
    return {
      application: this,
      openNavigator: this.openNavigator,
      closeNavigator: this.closeNavigator,
      setBackgroundColor: this.setBackgroundColor,
      setLogoColor: this.setLogoColor,
      setLogoType: this.setLogoType,
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