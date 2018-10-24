import React, { Component, cloneElement } from 'react';
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
        opacity: 1
      },
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
    return (
      <div className="app__header">
        {this.clearButtonRender()}
        {this.navigationButtonRender()}
        {this.logoRender()}
      </div>
    );
  }
}