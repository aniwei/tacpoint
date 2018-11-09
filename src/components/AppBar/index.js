import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import NavigationButton from '../NavigationButton';
import Logo from '../Logo';

import { 
  COLORS 
} from '../../contants';

export default class AppBar extends Component {
  static contextTypes = {
    application: PropTypes.object
  }

  constructor (props, context) {
    super(props, context);

    this.state = {
      navigationButtonColor: COLORS.BLACK,
      backgroundColor: COLORS.BLACK,
      navigationButtonState: 'close',
      logo: {
        color: COLORS.WHITE,
        type: 'simple',
        opacity: 1,
      },
      position: 'absolute',
      visible: true,
      open: context.application.navigationState === 'open' || false,
    }

    context.application.setAppBarBackgroundColor = (backgroundColor) => {
      this.setState({ backgroundColor });
    }
    
    context.application.enableAppBarScrollingEffect = () => {
      this.enabled = true;
    }

    context.application.disableAppBarScrollingEffect = () => {
      this.enabled = false;
    }

    context.application.setNavigationButtonColor = (navigationButtonColor) => {
      this.setState({ navigationButtonColor });
    }

    context.application.setLogoStyle = (logoStyle = {}) => {
      this.setState({ logo: { ...this.state.logo, ...logoStyle } });
    }

    context.application.changeNavigationButtonState = (navigationButtonState) => {
      this.setState({
        navigationButtonState
      });

      context.application.createEventEmitter('navigationbuttonstatechange', { type: navigationButtonState })
    }

    context.application.setAppBarPositionStyle = (position) => {
      if (this.state.position !== position) {
        this.setState({
          position: position
        });
      }
    }

    context.application.closeAppBar = () => {
      if (this.state.visible === true) {
        this.setState({
          visible: false
        });
      }
    }

    context.application.openAppBar = () => {
      if (this.state.visible === false) {
        this.setState({
          visible: true
        });
      }
    }
  }

  componentDidMount () {
    document.addEventListener('layoutscrolling', this.onLayoutScrolling, false);
  }

  componentWillUnmount () {
    document.removeEventListener('layoutscrolling', this.onLayoutScrolling, false);
  }

  componentWillReceiveProps (nextProps, context) {
    this.setState({
      open: context.application.navigationState === 'open' || this.state.open
    });
  }

  onLayoutScrolling = ({ data: { scrollTop: top } }) => {
    const { visible } = this.state;

    if (this.enabled) {
      if (top > 80) {
        if (top > this.originalScrollTop) {
          if (visible === true) {
            this.setState({
              visible: false
            });
          }
        } else {
          if (visible === false) {
            this.setState({
              visible: true
            });
          }
        }
      }
    }

    this.originalScrollTop = top;
  }

  onNavigationClear = () => {
    const { application } = this.context;

    application.createEventEmitter('clearnavigations');

    this.setState({
      navigationButtonState: 'close'
    });
  }

  onNavigationButtonClick = (type) => {
    const { application } = this.context;

    application.createEventEmitter('navigationstatechange', {
      type
    });
  }

  clearButtonRender () {
    const { navigationButtonState } = this.state;

    if (navigationButtonState === 'open') {
      return (
        <div className="app__navigation-clear" onClick={this.onNavigationClear}>
          <Link to="/">
            + all projects
          </Link>        
        </div>
      );
    }
  }

  moreButtonRender () {
    const { position, visible } = this.state;
    const classes = classnames({
      'app__navigation-clear app__navigation-button-more': true,
      'fadeIn': visible,
      'fadeOut': !visible,
      'animated': true
    });

    return (
      <div className={classes} onClick={this.onNavigationClear}>
        <Link to="/">
          + more projects
        </Link>        
      </div>
      );
  }

  navigationButtonRender () {
    const { navigationButtonColor, open } = this.state;

    return (
      <NavigationButton 
        color={navigationButtonColor}
        open={open}
        onOpen={() => this.onNavigationButtonClick('open')} 
        onClose={() => this.onNavigationButtonClick('close')} 
      />
    );
  }

  logoRender () {
    const { logo } = this.state;

    return (
      <Logo {...logo} onClick={this.onNavigationButtonClick} />
    );    
  }

  render () {
    const { position, visible, backgroundColor } = this.state;
    const classes = classnames({
      'app__header': true,
      'fixed': position === 'fixed',
    });

    const style = { backgroundColor };

    // console.log(style);
    
    return (
      <div className={classes} >
        <div style={style} className={classnames({ 'app__header-background': true,'animated': true, 'fadeIn': visible, 'fadeOut': !visible})}></div>
        {this.moreButtonRender()}
        {this.clearButtonRender()}
        {this.navigationButtonRender()}
        {this.logoRender()}
      </div>
    );
  }
}