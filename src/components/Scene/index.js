import React, { Component } from 'react';
import classnames from 'classnames';

import Waiting from '../Waiting';
import NetworkError from '../NetworkError';

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
    waiting: this.props.waiting
  };

  waiting = (waiting) => {
    this.setState({
      waiting
    })
  }

  render () {
    const { waiting, networkError } = this.state;
    const { onReload } = this.props;
    const classes = classnames({
      'scene_content': true,
      'show': !waiting || !networkError
    });

    debugger;

    return (
      <div className="sence__container">
        {
          networkError ?
            <NetworkError onReload={onReload} /> :
            <Waiting waiting={waiting} onReload={onReload} />    
        }
        
        <div className={classes}>
          {(networkError || waiting) ? null : this.props.children}
        </div>
      </div>
    );
  }
}