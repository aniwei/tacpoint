import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { 
  COLORS 
} from '../../contants';

export default class AppFoot extends Component {
  static contextTypes = {
    application: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      color: COLORS.WHITE,
      opacity: 0.5,
      position: 'relative'
    };

    context.application.setFooterStyle = (color) => {
      this.setState({ ...color });
    }

    context.application.setFooterFixed = () => {
      this.setState({
        position: 'fixed'
      });
    }

    context.application.clearFooterFixed = () => {
      this.setState({
        position: 'relative'
      })
    }
  }

  render () {
    const style = { position: this.state.position };

    return (
      <div className="app__footer" style={style}>
        <div className="app__copyright" style={{ color: this.state.color }}>©2018 Tacpoint, Inc.</div>
      </div>
    );
  }
}