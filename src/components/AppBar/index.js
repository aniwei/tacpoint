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

  componentWillReceiveProps (nextProps, context) {
    this.setState({
      open: context.application.navigationState === 'open' || this.state.open
    });
  }

  onNavigationClear = () => {
    const { application } = this.context;

    application.createEventEmitter('clearnavigations');
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
    const { position, visible } = this.state;
    const classes = classnames({
      'animated': true,
      'app__header': true,
      'fixed': position === 'fixed',
      'fadeIn': visible,
      'fadeOut': !visible
    });
    
    return (
      <div className={classes}>
        {this.clearButtonRender()}
        {this.navigationButtonRender()}
        {this.logoRender()}
      </div>
    );
  }
}