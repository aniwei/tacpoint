import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';

import Project from './pages/Project';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

import Logo from './components/Logo';

import Context from './Context';
import { COLORS } from './contants';

class App extends Component {
  state = {
    backgroundColor: COLORS.BLACK,
    logoColor: COLORS.WHITE,
    logoType: 'simple'
  }

  setBackgroundColor = (backgroundColor) => {
    this.setState({ backgroundColor });
  }

  setLogoColor = (logoColor) => {
    this.setState({ logoColor });
  }

  scenesRender () {
    return (
      <div className="scene">
        <Route path="/" component={Home} exact />
        <Route path="/project" component={Project} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </div>
    );
  }

  layoutRender () {
    const { logoColor, logoType } = this.state;

    return (
      <div className="app__layout">
        <div className="app__header">
          <Logo color={logoColor} type={logoType} />
        </div>
        <div className="app__scene">
          {this.scenesRender()}
        </div>
        <div className="app__footer"></div>
      </div>
    );
  }

  provideContext = () => {
    return {
      setBackgroundColor: this.setBackgroundColor,
      setLogoColor: this.setLogoColor
    }
  }

  render () {
    const { backgroundColor } = this.state;
    const style = {
      backgroundColor
    };

    return (
      <Context.Provider value={this.provideContext()}>
        <div className="app" style={style}>
          {this.layoutRender()}
        </div>
      </Context.Provider>
    );
  }
}

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);