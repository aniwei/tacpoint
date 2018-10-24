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
      opacity: 0.5
    };

    context.application.setFooterStyle = (color) => {
      this.setState({ ...color });
    }
  }

  render () {
    return (
      <div className="app__footer">
        <div className="app__copyright" style={{ color: this.state.color }}>©2018 Tacpoint, Inc.</div>
      </div>
    );
  }
}