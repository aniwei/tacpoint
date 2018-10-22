import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const noop = (() => {});

const LINE_INIT_ANGLE = -25.75;
const ANGLE_SCALE = 60 / 180;

export default class SimpleNavigation extends Component {
  state = {
    alpha: LINE_INIT_ANGLE,
    beta: 0,
    gamma: 0
  }

  componentDidMount () {
    const { isMobile } = this.props;

    if (isMobile) {
      document.addEventListener('orientation', this.onOrientation, false);
    }
  }

  componentWillUnmount () {
    const { isMobile } = this.props;

    if (isMobile) {
      document.removeEventListener('orientation', this.onOrientation, false);
    }
  }

  onOrientation = ({ data: { alpha, beta, gamma }}) => {
    this.setState({
      alpha: LINE_INIT_ANGLE + parseInt(alpha * ANGLE_SCALE),
      beta: parseInt(ANGLE_SCALE * beta),
      gamma: parseInt(ANGLE_SCALE * gamma)
    });
  }

  render () {
    const { alpha, beta, gamma } = this.state;
    const { backgroundColor, lineColor } = this.props;
    const style = { backgroundColor };
    const transform = `rotateZ(${beta}deg)`;

    return (
      <div className="app__simple-navigation" style={style}>
        <span className="app__simple-navigation-line" style={{ borderColor: lineColor, transform }}></span>
        {this.props.children}
      </div>
    );
  }
}

