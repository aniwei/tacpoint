import React from 'react';
import classnames from 'classnames';
import Scene from '../../components/Scene';
import Context from '../../Context';

class Access extends React.Component {
  static backgroundColor = '#1a1a1a';
  static logoColor = '#fff';

  state = {
    waiting: false,
    accessKey: ''
  }

  componentDidMount () {
    const { setBackgroundColor, setLogoColor } = this.props;

    setBackgroundColor(Access.backgroundColor);
    setLogoColor(Access.logoColor);

    window.addEventListener('scroll', this.onWindowScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onChange = (event) => {
    const { target: { value } } = event;
    const { setLogoType } = this.props;

    this.setState({
      accessKey: value
    });

    setLogoType(value ? 'full' : 'simple')
  }

  onButtonClick = () => {
    const { location, history } = this.props;
    const { accessKey } = this.state;

    location.state = {
      accessKey
    };

    history.push('/project');
  }



  formRender () {
    const { accessKey } = this.state;
    const classes = classnames({
      'scene__form-button': true,
      'animated': true,
      'fadeInLeft': !!accessKey,
    });

    return (
      <div className="scene__form">
        <div className="scene__form-body">
          <ul className="scene__form-list">
            <li className="scene__form-item">
              <div className="scene__form-unit">
                <input 
                  onChange={this.onChange} 
                  value={accessKey}
                  className="scene__input-text" 
                  type="password" 
                  placeholder="access key" 
                />
              </div>
            </li>
          </ul>
        </div>
        <div className="scene__form-footer">
          <button className={classes} type="button" onClick={this.onButtonClick}>
            <i className="scene-icon-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  }

  bodyRender () {

    return (
      <Scene.Body>
        <div className="scene-login">
          <div className="scene-login__content">
            {this.formRender()}
          </div>
        </div>
      </Scene.Body>
    );
  }

  render () {

    return (
      <Scene waiting={this.waiting}>
        {this.bodyRender()}
      </Scene>
    );
  }
}

export default (props) => {
  return <Context.Consumer>
    {
      context => <Access {...context} {...props} />
    }
  </Context.Consumer>
}