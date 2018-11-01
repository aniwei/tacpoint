import 'whatwg-fetch';
import React, { Component, cloneElement } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';



import AppBar from './components/AppBar';
import AppFooter from './components/AppFooter';
import AppNavigator from './components/AppNavigator';
import AppNavigationPanel from './components/AppNavigationPanel';
import AppScene from './components/AppScene';

import Context from './Context';
import { 
  IS_MOBILE,
  COLORS, 
  WIDTH_LIST, 
  CLIENT_IMAGES,
  TRANSITION_PROPERTY,
  GOOGLE_MAP_JS_URL,
  SOCIAL_LIST,
  CONTACT_INFORMATION,
  PARTNER_LIST,
  FORM_INPUT_LIST,
  ABOUT_SWIPER_LIST,
  ABOUT_SWIPER_OPTIONS,
  PROJECT_SWIPER_OPTIONS
} from './contants';

const THROTTLE_TIMEOUT = 50;
const noop = (() => {});

class App extends Component {
  static sharedApplication = () => {
    return App.application;
  }

  static childContextTypes = {
    application: PropTypes.object
  }

  constructor () {
    super();

    this.setIsMobile();

    this.state = {
      isMobile: this.isMobile
    };

    App.application = this;
  }

  getChildContext () {
    return {
      application: this
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize);
    this.onResize();

    document.addEventListener('navigationstatechange', this.onNavigationStateChange, false);

    if (this.isMobile && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.onDeviceOrientation, false);
      // window.addEventListener('scroll', this.onScroll, false);
    }
  }

  componentWillUnmount () {
    // window.removeEventListener('resize', this.onScroll);

    document.removeEventListener('navigationstatechange', this.onNavigationStateChange, false);

    if (this.isMobile) {
      window.removeEventListener('deviceorientation', this.onDeviceOrientation, false);
      // window.removeEventListener('scroll', this.onScroll, false);
    }
  }

  clearNavigations = () => {
    this.setState({
      navigations: null,
      openNavigations: false
    });
  }

  createEventEmitter = (type, data) => {
    const event = document.createEvent('HTMLEvents');

    event.initEvent(type, true, true);
    event.data = data;
    
    document.dispatchEvent(event);
  }

  onScroll = (e) => {
    if (!this.isLayoutScrolling) {
      const { target } = e;
      this.isLayoutScrolling = true;

      setTimeout(() => {
        const { scrollTop, scrollHeight } = target;
        this.isLayoutScrolling = false;
        this.createEventEmitter('layoutscrolling', {
          scrollTop,
          scrollHeight
        });
      }, THROTTLE_TIMEOUT / 5);
    }
    
  }

  onNavigationStateChange = ({ data: { type }}) => {
    this.navigationState = type;
  }

  onDeviceOrientation = (e) => {
    const { alpha, beta, gamma } = e;
    const { isMobile } = this.state;

    if (isMobile) {
      if (!this.isOrientating) {
        this.isOrientating = true;
        setTimeout(() => {
          this.createEventEmitter('orientation', {
            alpha, beta, gamma
          });
  
          this.isOrientating = false;
        }, THROTTLE_TIMEOUT);
      }
    }
  }

  onMouseMove = (e) => {
    const { isMobile } = this.state;
    const { pageX: x, pageY: y } = e;

    if (!isMobile) {
      if (!this.isMouseMoving) {
        this.isMouseMoving = true;
        setTimeout(() => {
          this.createEventEmitter('moving', {
            x, y
          });
  
          this.isMouseMoving = false;
        }, THROTTLE_TIMEOUT);
      }
    }
  }

  setIsMobile = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const index = WIDTH_LIST.concat(width).sort((x, y) => x - y).indexOf(width);

    this.width = width;
    this.height = height;

    this.isMobile = IS_MOBILE[WIDTH_LIST[index]] === 'MOBILE';
    this.widthIndex = index;
  }

  onResize = () => {
    
    if (!this.isResizing) {
      this.isResizing = true;

      this.setIsMobile();
      this.createEventEmitter('navigationstatechange', {
        type: 'close'
      });

      const transitionProperty = TRANSITION_PROPERTY[WIDTH_LIST[this.widthIndex]];

      if (this.state.transitionProperty !== transitionProperty) {
        setTimeout(() => {
          this.createEventEmitter('modechange', {
            transitionProperty
          });
  
          this.isResizing = false;
        }, THROTTLE_TIMEOUT);
      }
      
      this.setState({
        isMobile: this.isMobile
      });
    }
  }

  onNavigatorClick = () => {
    this.clearNavigations();
  }

  onNavigationClear = () => {
    if (this.navigations) {
      this.navigations.clear();
    }
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

  setBackgroundColor = (backgroundColor) => {
    this.setState({ backgroundColor });
  }

  getContactInfomation = () => {
    return CONTACT_INFORMATION;
  }

  getSocialList = () => {
    return SOCIAL_LIST;
  }

  getAboutSwiperList = () => {
    return ABOUT_SWIPER_LIST;
  }

  getProjectSwiperOptions = () => {
    return PROJECT_SWIPER_OPTIONS;
  }

  getClientImages = () => {
    return CLIENT_IMAGES;
  }

  getAboutSwiperOptions = () => {
    return ABOUT_SWIPER_OPTIONS;
  }

  getPartnerList = () => {
    return PARTNER_LIST;
  }

  getFormInputList = () => {
    return FORM_INPUT_LIST;
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

  layoutRender () {
    const { isMobile } = this.state;

    return (
      <div className="app__layout" onMouseMove={this.onMouseMove} onScroll={this.onScroll}>
        <AppBar />
        <AppScene />
        <AppFooter />
        { !isMobile && <AppNavigator /> }
        <AppNavigationPanel>  
          { isMobile && <AppNavigator /> }
        </AppNavigationPanel>  
      </div>
    );
  }

  provideContext = () => {
    const context = this;
    const { 
      state
    } = context;

    return {
      get isMobile () {
        return state.isMobile;
      },
      getWindowSize: this.getWindowSize,
      getContactInfomation: this.getContactInfomation,
      getSocialList: this.getSocialList,
      getPartnerList: this.getPartnerList,
      getFormInputList: this.getFormInputList,
      getAboutSwiperList: this.getAboutSwiperList,
      getAboutSwiperOptions: this.getAboutSwiperOptions,
      getProjectSwiperOptions: this.getProjectSwiperOptions,
      getClientImages: this.getClientImages
    }
  }

  set onGoogleScriptLoaded (onLoaded) {
    this.appendGoogleMapScript(onLoaded);        
  }

  render () {
    return (
      <Context.Provider value={this.provideContext()}>
        <div className="app" style={{ backgroundColor: this.state.backgroundColor }}>
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