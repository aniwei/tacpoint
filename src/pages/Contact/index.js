import React from 'react';

import Scene from '../../components/Scene';
import Context from '../../Context';

class Contact extends React.Component {
  static backgroundColor = '#8b8b8b';
  static logoColor = '#1a1a1a';

  state = {
    waiting: false
  }

  componentDidMount () {
    const { setBackgroundColor, setLogoColor } = this.props;

    setBackgroundColor(Contact.backgroundColor);
    setLogoColor(Contact.logoColor);

    window.addEventListener('scroll', this.onWindowScroll);

    if (this.googleMap) {
      this.createGoogleMap();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    const { top } = this.getScrollRect();

    this.setState({
      categoryOffset: top
    });
  }

  createGoogleMap () {
    const { application } = this.props;

    application.onGoogleScriptLoaded = () => {
      new google.maps.Map(this.googleMap, {
        zoom: 15,    
        center: new google.maps.LatLng(39.9493, 116.3975),    
        mapTypeId: google.maps.MapTypeId.ROADMAP    
      });    
    }
  }

  getScrollRect = () => {
    const { 
      scrollTop: top,
      scrollHeight: height
    } = document.documentElement;

    return { top, height };
  }

  headerRender () {
    return (
      <Scene.Header>
        <div className="scene__page-header-title-wrap">
          <div className="scene__grid">
            <div className="scene__grid-inner">
              <div className="col-10">
                <h3 className="scene__page-header-title">Drop us a line</h3>
              </div>
            </div>
          </div>
        </div>
      </Scene.Header>
    );
  }

  headerDescriptionRender () {
    return (
      <div className="scene__page-header-description-wrap">
        <div className="scene__grid">
          <div className="scene__grid-inner">
            <div className="col-4 col-offset-7">
              <div className="scene__page-header-description">
                <div className="scene__page-header-description-inner">
                  <p className="scene__page-header-description-text">
                    Tacpoint is an innovative end-to-end interactive design and software development agency specializing in mobile, web, and custom enterprise applications.                                                         </p>
                  <p className="scene__page-header-description-text">
                    We are the intersection of design and technology. Our multidisciplinary team of strategists, designers, and technical architects work in unison to delivery iconic solutions that are scalable, adaptable, and grows with you over time. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  footerRender () {
    return (
      <Scene.Footer>
        <div className="scene__page-footer-inner">
          <h3 className="scene__page-footer-title">Visit us</h3>
          
          <div className="scene__page-footer-information">
            <ul className="scene__page-footer-informationlist">
              <li className="scene__page-footer-information-item">577 Airport Blvd, Suite 160, Burlingame, CA 94010</li>
              <li className="scene__page-footer-information-item">hello@tacpoint.com</li>
              <li className="scene__page-footer-information-item">650.577.3140</li>
            </ul>

            <div className="scene__page-footer-information-site">
              <a className="scene__page-footer-information-site-link" href="javascript:;">
                  <i className="scene-icon-white-fb"></i>
              </a>
              <a className="scene__page-footer-information-site-link" href="javascript:;">
                  <i className="scene-icon-white-tw"></i>
              </a>
              <a className="scene__page-footer-information-site-link" href="javascript:;">
                  <i className="scene-icon-white-in"></i>
              </a>
              <a className="scene__page-footer-information-site-link" href="javascript:;">
                  <i className="scene-icon-white-ig"></i>
              </a>
            </div>
          </div>
        </div>
      </Scene.Footer>
    );
  }

  bodyRender () {
    return (
      <Scene.Body>
        <div className="scene-contact__form">
          <div className="scene__form">
            <div className="scene__form-body">
              <ul className="scene__form-list">
                <li className="scene__form-item">
                  <div className="scene__form-unit">
                    <input className="scene__input-text" type="text" placeholder="name" />
                  </div>
                </li>
                <li className="scene__form-item">
                  <div className="scene__form-unit">
                    <input className="scene__input-text" type="text" placeholder="email" />
                  </div>
                </li>
                <li className="scene__form-item">
                  <div className="scene__form-unit">
                    <input className="scene__input-text" type="text" placeholder="message" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="scene__form-footer">
              <button className="scene__form-button" type="button">
                <i className="scene-icon-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="scene-contact__map">
          <div className="scene-contact__map-inner" ref={ref => this.googleMap = ref}></div>
        </div>
      </Scene.Body>
    );
  }

  render () {

    return (
      <Scene waiting={this.waiting}>
        {this.headerRender()}
        
        {this.bodyRender()}
        {this.footerRender()}
      </Scene>
    );
  }
}

export default (props) => {
  return <Context.Consumer>
    {
      context => <Contact {...context} {...props} />
    }
  </Context.Consumer>
}