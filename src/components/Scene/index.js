import React, { Component, createElement, isValidElement } from 'react';
import classnames from 'classnames';

import Loading from '../Loading';
import NetworkError from '../NetworkError';
import Context from './Context';

const enableRender = ({ waiting, networkError, element }) => {
  if (!waiting && !networkError) {
    return element;
  }
}

const Header = ({ children }) => {

  return <Context.Consumer>
    {
      ({ waiting, networkError }) => enableRender({
        waiting,
        networkError,
        element: (
          <div className="scene__page-header">
            {isValidElement(children) || Array.isArray(children) ? children : createElement(children)}
          </div>
        )
      })
    }

  </Context.Consumer>
}

const Body = ({ children }) => {
  return <Context.Consumer>
    {
      ({ waiting, networkError }) => enableRender({
        waiting,
        networkError,
        element: (
          <div className="scene__page-body">
            {isValidElement(children) || Array.isArray(children) ? children : createElement(children)}
          </div>
        )
      })
    }

  </Context.Consumer>
}

const Footer = ({ children }) => {
  return <Context.Consumer>
    {
      ({ waiting, networkError }) => enableRender({
        waiting,
        networkError,
        element: (
          <div className="scene__page-footer">
            {isValidElement(children) || Array.isArray(children) ? children : createElement(children)}
          </div>
        )
      })
    }

  </Context.Consumer>
}

export default class Scene extends Component {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  render () {
    const { waiting, networkError, name } = this.props;
    const { onReload } = this.props;
    const classes = classnames({
      'scene_content': true,
      'animated': true,
      'fadeIn': !waiting || !networkError
    });

    return (
      <Context.Provider value={{ waiting, networkError }}>
        <div className="scene__container">
          <div className={`scene-${name}`}>
            {
              networkError ?
                <NetworkError onReload={onReload} /> :
                <Loading {...this.props} waiting={waiting} onReload={onReload}  />    
            }
            
            <div className={classes}>
              {(networkError || waiting) ? null : this.props.children}
            </div>
          </div>
        </div>
      </Context.Provider>
    );
  }
}