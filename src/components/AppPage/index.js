import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import SimpleNavigation from '../SimpleNavigation';

export default  class Home extends Component {
  static backgroundColor = '#000';
  static navigationButtonColor = '#f0f0f0';
  static navigationLineColor = '#f0f0f0'
  static footer = {
    color: '#ffffff',
    opacity: 0.5
  }
  static logo = {
    color: '#f0f0f0',
    type: 'simple'
  }
  static navigators = {
    color: '#f0f0f0',
    data: [
      { position: 'left', text: 'about', path: '/about' },
      { position: 'right', text: 'let\'s talk', path: '/contact' }
    ]
  }

  static navigations = {
    component: SimpleNavigation,
    props: {}
  }

  static contextTypes = {
    application: PropTypes.object
  }

  constructor (props, context) {
    super(props, context);

    const { location } = props;

    this.query = qs.parse(location.search);
  }

  setApplicationStyle = () => {
    const { application } = this.context;
    const constructor = this.constructor;
    
    constructor.navigations.props = {
      ...this.props,
      ...constructor.navigations.props,
      isMobile: this.props.isMobile,
      color: constructor.navigationLineColor
    };

    if (constructor.position === 'fixed') {
      application.setAppBarPositionStyle(constructor.position);
    } else {
      application.setAppBarPositionStyle('absolute');
    }

    application.setNavigationButtonColor(constructor.navigationButtonColor);
    application.setNavigationsPanelBackgroundColor(constructor.backgroundColor);
    application.setLogoStyle({ ...constructor.logo });
    application.setNavigators(constructor.navigators);
    application.setBackgroundColor(constructor.backgroundColor);
    application.setFooterStyle(constructor.footer);
    application.setNavigations(constructor.navigations);
    if (application.setSimpleNavigationLineColor) {
      application.setSimpleNavigationLineColor(constructor.navigationLineColor);
    }
    application.changeNavigationButtonState('close');
  }

  componentDidMount () {
    this.setApplicationStyle();
  }
}

