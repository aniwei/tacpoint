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

class App extends Component {
  state = {
    openNavigations: false,
    navigations: null,
    navigators: [],
    outterNavigators: [],
    backgroundColor: COLORS.BLACK,
    logoColor: COLORS.WHITE,
    navigatorColor: COLORS.WHITE,
    navigationButtonColor: COLORS.WHITE,
    logoType: 'simple',
    logoEvent: () => {},
    transitionProperty: TRANSITION_PROPERTY['1024'],
    isMobile: false
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize);
    this.onResize();

    if (this.isMobile && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.onDeviceOrientation, false);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onScroll);

    if (this.isMobile) {
      window.removeEventListener('deviceorientation', this.onDeviceOrientation, false);
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

  onResize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const index = WIDTH_LIST.concat(width).sort((x, y) => x - y).indexOf(width);

    this.width = width;
    this.height = height;

    // console.log(TRANSITION_PROPERTY[WIDTH_LIST[index]])
    this.isMobile = IS_MOBILE[WIDTH_LIST[index]] === 'MOBILE';

    this.setState({
      transitionProperty: TRANSITION_PROPERTY[WIDTH_LIST[index]],
      isMobile: this.isMobile
    });
  }

  onNavigatorClick = () => {
    this.clearNavigations();
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
        transform: `translateX(${styles.transform}%)`,
        height: '100%'
      }
    }

    return {
      ...styles,
      height: '100%'
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

  setLogoEvent = (logoEvent = function () {}) => {
    this.setState({
      logoEvent: () => {
        logoEvent();

        this.setState({
          openNavigations: false,
        });
      }
    });
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

  getAboutSwiperOptions = () => {
    return ABOUT_SWIPER_OPTIONS;
  }

  setNavigationButtonColor = (navigationButtonColor) => {
    this.setState({
      navigationButtonColor
    });
  }

  setNavigatorColor = (navigatorColor) => {
    this.setState({
      navigatorColor
    }, () => {
      if (this.navigators) {
        this.setNavigators(this.navigators);
      }
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
        ref: ref => {
          this.navigations = ref;
        }
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
    this.navigators = navigators;

    this.setState({
      navigators: navigators.map(nav => {
        const { position, text, path } = nav;  
        const classes = classnames({
          'app__navigator': true,
          [`app__navigator-${position}`]: true
        });

        console.log(path)
  
        return (
          <div className={classes} key={position} style={{ color: navigatorColor }}>
            <Link to={path} onClick={this.onNavigatorClick}>
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
        
        <AnimatedSwitch
          atEnter={this.getAnimatedProperty('from')}
          atLeave={this.getAnimatedProperty('from')}
          atActive={this.getAnimatedProperty('to')}
          mapStyles={this.onMapStyles}
          className="scene__animated"
        >
          <Switch>
            <Route path="/" component={Home} exact />
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
    const { 
      logoColor, 
      logoType, 
      navigations, 
      openNavigations, 
      navigators, 
      backgroundColor,
      navigationButtonColor,
      logoEvent
    } = this.state;

    const classes = classnames({
      'app__navigation': true,
      'animated': true,
      'open': openNavigations
    });



    return (
      <div className="app__layout" onMouseMove={this.onMouseMove}>
        <div className="app__header">
          <div className="app__navigation-clear" onClick={this.onNavigationClear}>
              <Link to="/">
                + all projects
              </Link>        
          </div>
          <NavigationButton 
            color={navigationButtonColor}
            open={openNavigations}
            onOpen={() => this.onNavigationButtonClick('open')} 
            onClose={() => this.onNavigationButtonClick('close')} 
          />
          <Logo color={logoColor} type={logoType} clearSelected={this.onNavigationClear} />
        </div>
        <div className="app__scene">
          {this.scenesRender()}
        </div>
        <div className="app__footer">
          <div className="app__copyright">©2018 Tacpoint, Inc.</div>
        </div>

        <div className="app__outter-navigator">
          {navigators}
        </div>
      
        <div className={classes} style={{ backgroundColor }}>
          <div className="app__navigation-content">
            <div className="scene__grid">
              <div className="scene__grid-inner">
                {navigations}
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
      </div>
    );
  }

  provideContext = () => {
    const { state } = this;

    return {
      application: this,
      get isMobile () {
        return state.isMobile;
      },
      openNavigator: this.openNavigator,
      closeNavigator: this.closeNavigator,
      clearNavigations: this.clearNavigations,
      setBackgroundColor: this.setBackgroundColor,
      setLogoColor: this.setLogoColor,
      setLogoType: this.setLogoType,
      setNavigationButtonColor: this.setNavigationButtonColor,
      setNavigations: this.setNavigations,
      setNavigators: this.setNavigators,
      setNavigatorColor: this.setNavigatorColor,
      setLogoEvent: this.setLogoEvent,
      getWindowSize: this.getWindowSize,
      getContactInfomation: this.getContactInfomation,
      getSocialList: this.getSocialList,
      getPartnerList: this.getPartnerList,
      getFormInputList: this.getFormInputList,
      getAboutSwiperList: this.getAboutSwiperList,
      getAboutSwiperOptions: this.getAboutSwiperOptions,
      getProjectSwiperOptions: this.getProjectSwiperOptions
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