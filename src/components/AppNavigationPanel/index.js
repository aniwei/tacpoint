import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { 
  COLORS 
} from '../../contants';

export default class AppNavigationPanel extends Component {
  static contextTypes = {
    application: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      backgroundColor: COLORS.BLACK,
      color: COLORS.WHITE,
      open: context.application.navigationState  || false,
      navigations: null
    };

    context.application.setNavigations = (navigations) => {
      this.setState({
        navigations
      });
    };

    context.application.setNavigationsPanelBackgroundColor = (backgroundColor) => {
      this.setState({
        backgroundColor
      })
    }
  }

  componentWillReceiveProps (nextProps, context) {
    this.setState({
      open: context.application.navigationState === 'open' || this.state.open
    });
  }

  componentDidMount () {
    document.addEventListener('navigationstatechange', this.onNavigationStateChange, false);
    // document.addEventListener('navigationbuttonstatechange', this.onNavigationButtonStateChange, false);
  }

  componentWillUnmount () {
    document.removeEventListener('navigationstatechange', this.onNavigationStateChange, false);
    // document.removeEventListener('navigationbuttonstatechange', this.onNavigationButtonStateChange, false);
  }

  onNavigationStateChange = ({ data: { type } }) => {
    this.setState({
      open: type === 'open'
    });
  }

  onNavigatorClick = () => {
    
  }

  navigationsRender () {
    const { navigations } = this.state;

    if (navigations) {
      const { component, props } = navigations;

      return createElement(component, props || {});
    }
  }

  render () {
    const { backgroundColor, open } = this.state;
    const classes = classnames({
      'app__navigation': true,
      'animated': true,
      'open': open
    });

    return (
      <div className={classes} style={{ backgroundColor }}>
        <div className="app__navigation-content">
          <div className="scene__grid">
            <div className="scene__grid-inner">
              {this.navigationsRender()}
            </div>
          </div>

          <div className="app__navigation-clear" onClick={this.onNavigationClear}>
            <div className="scene__grid">
              <div className="scene__grid-inner">
                <div className="col-8 col-offset-4 col-m-10 col-offset-m-0 col-s-12 col-offset-s-9 col-xs-12 col-offset-xs-6 app__navigation-clear" onClick={this.onNavigationClear}>
                  <Link to="/">
                    + more projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}