import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Loading extends Component {
  static propTypes = {
    dark: PropTypes.bool
  };

  static defaultProps = {
    dark: true
  }

  render () {
    const { dark, light, waiting } = this.props;
    const classes = classnames({
      'scene__waiting': true,
      'dark': dark,
      'light': light,
      'animated': true,
      'fadeInLeft': waiting,
      'fadeOutRight': !waiting
    });

    return (
      <div className={classes}>
        Loading...
      </div>
    );
  }
}