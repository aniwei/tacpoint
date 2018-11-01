import React, { Component, cloneElement } from 'react';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Project from '../../pages/Project';
import Home from '../../pages/Home';
import Contact from '../../pages/Contact';
import About from '../../pages/About';
import Access from '../../pages/Access';

import Footer from '../AppFooter';

import { 
  TRANSITION_PROPERTY 
} from '../../contants';

export default class AppScene extends Component {

  state = {
    transitionProperty: TRANSITION_PROPERTY['1024']
  }

  componentDidMount () {
    document.addEventListener('modechange', this.onModeChange, false);
  }

  componentWillUnmount () {
    document.removeEventListener('modechange', this.onModeChange, false);
  }

  onModeChange = ({ data: { transitionProperty } }) => {
    if (this.state.transitionProperty !== transitionProperty) {
      this.setState({
        transitionProperty
      });
    }
  }

  onMapStyles = (styles) => {
    if (styles.transform !== undefined) {
      return {
        ...styles,
        transform: `translateX(${styles.transform}%)`,
        height: '100%'
      }
    }

    return {
      ...styles,
      height: '100%'
    }
  }

  getAnimatedProperty = (type) => {
    const { transitionProperty } = this.state;
    const style = {};

    transitionProperty.map(({ name, value }) => {
      style[name] = value[type];
    });

    return style;
  }

  render () {
    return (
      <div className="app__scene">
        <div className="scene">
          <AnimatedSwitch
            atEnter={this.getAnimatedProperty('from')}
            atLeave={this.getAnimatedProperty('from')}
            atActive={this.getAnimatedProperty('to')}
            mapStyles={this.onMapStyles}
            className="scene__animated"
          >
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/project" component={Project} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/access" component={Access} />
            </Switch>
          </AnimatedSwitch>
        </div>
      </div>
    );
  }
}