import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const noop = (() => {});

export default class SimpleNavigation extends Component {

  render () {
    const { backgroundColor, lineColor } = this.props;
    const style = { backgroundColor };

    return (
      <div className="app__simple-navigation" style={style}>
        <span className="app__simple-navigation-line" style={{ borderColor: lineColor }}></span>
      </div>
    );
  }
}

