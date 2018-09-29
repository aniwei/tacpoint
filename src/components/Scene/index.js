import React, { Component } from 'react';
import classnames from 'classnames';

import Waiting from '../Waiting';

const Header = (props) => {
  return (
    <div className="sence__page-header">
      {props.children}
    </div>
  );
}

const Body = (props) => {
  return (
    <div className="sence__page-body">
      {props.children}
    </div>
  );
}

const Footer = (props) => {
  return (
    <div className="sence__page-footer">
      {props.children}
    </div>
  );
}

export default class Scene extends Component {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  state = {
    waiting: true
  };

  waiting = (waiting) => {
    this.setState({
      waiting
    })
  }

  render () {
    const { waiting } = this.state;

    return (
      <div className="sence__container">
        <Waiting waiting={waiting} />
        {this.props.children}
      </div>
    );
  }
}