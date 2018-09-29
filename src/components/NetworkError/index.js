import React, { Component } from 'react';
import classnames from 'classnames';

export default class NetworkError extends Component {
  onClick = () => {
    const { onReload } = this.props;

    onReload();
  }

  render () {
    return (
      <div className="scene__network-error">
        Sorry, has a network error. <a onClick={this.onClick}>Retry</a>
      </div>
    );
  }
}