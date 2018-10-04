import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const noop = (() => {});

export default class NavigationButton extends Component {
  static propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  static defaultProps = {
    onOpen: noop,
    onClose: noop
  }

  state = {
    open: this.props.open
  }

  componentWillUnmount () {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open
      });
    }
  }

  onClick = () => {
    const { open } = this.state;
    const { onOpen, onClose } = this.props;

    this.setState({
      open: !open
    });

    open ? onClose() : onOpen();
  }

  render () {
    const { color } = this.props
    const { open } = this.state;
    const classes = classnames({
      'app__navigation-button': true,
      'open': open
    });

    return (
      <div className={classes} onClick={this.onClick}>
        <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.5">
            <g transform="translate(-37.000000, -21.000000)" fillRule="nonzero">
              <g transform="translate(37.000000, 21.000000)">
                <rect fill={color} opacity="0.01" x="0" y="0" width="40" height="40"></rect>
                <g fill={color} transform="translate(20.000000, 20.000000) rotate(90.000000) translate(-20.000000, -20.000000) translate(10.000000, 10.000000)">
                  <rect x="0" y="9" width="20" height="2"></rect>
                  <rect transform="translate(10.000000, 10.000000) rotate(90.000000) translate(-10.000000, -10.000000) " x="0" y="9" width="20" height="2"></rect>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

