import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { 
  COLORS 
} from '../../contants';

export default class AppNavigator extends Component {
  static contextTypes = {
    application: PropTypes.object
  }

  constructor (props, context) {
    super(props, context);

    this.state = {
      color: COLORS.WHITE,
      data: [
        { position: 'left', text: 'about', path: '/about' },
        { position: 'right', text: 'let\'s talk', path: '/contact' }  
      ]
    } 

    context.application.setNavigators = (navigators = {}) => {
      const state = {
        ...this.state,
        ...navigators
      };

      this.setState(state);
    }
  }

  onNavigatorClick = () => {
    
  }

  navigatorsRender () {
    const { data, color } = this.state;

    return data.map(nav => {
      const { position, text, path } = nav;  
      const classes = classnames({
        'app__navigator': true,
        [`app__navigator-${position}`]: true
      });

      return (
        <div className={classes} key={position} style={{ color }}>
          <Link to={path} onClick={this.onNavigatorClick}>
            {text}
          </Link>
        </div>
      );
    })
  }

  render () {
    return (
      <div>
        {this.navigatorsRender()}
      </div>
    );
  }
}