import React from 'react';

import Scene from '../../components/Scene';
import Context from '../../Context';

const SCALE = 1.2;

class About extends React.Component {
  static backgroundColor = '#f0f0f0';
  static logoColor = '#1a1a1a';

  state = {
    waiting: false,
    categoryOffset: 0
  }

  componentDidMount () {
    const { setBackgroundColor, setLogoColor } = this.props;

    setBackgroundColor(About.backgroundColor);
    setLogoColor(About.logoColor);

    window.addEventListener('scroll', this.onWindowScroll);
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
        <div className="sence__page-header-title-wrap">
          <div className="sence__grid">
            <div className="sence__grid-inner">
              <div className="col-10">
                <h3 className="sence__page-header-title">
                  <p>We craft delightful experiences.</p>
                  <p>We craft efficiency.</p>
                  <p>We help forward-thinking businesses succeed in digital culture.</p>
                </h3>
              </div>
            </div>
          </div>
        </div>
        {this.headerDescriptionRender()}
      </Scene.Header>
    );
  }

  headerDescriptionRender () {
    return (
      <div className="sence__page-header-description-wrap">
        <div className="sence__grid">
          <div className="sence__grid-inner">
            <div className="col-4 col-offset-7">
              <div className="sence__page-header-description">
                <div className="sence__page-header-description-inner">
                  <p className="sence__page-header-description-text">
                    Tacpoint is an innovative end-to-end interactive design and software development agency specializing in mobile, web, and custom enterprise applications.                                                         </p>
                  <p className="sence__page-header-description-text">
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
        <div className="sence__page-footer-inner">
          <h3 className="sence__page-footer-title">Let’s talk.</h3>

          <div className="sence__grid">
            <div className="sence__grid-inner">
              <div className="col-4 col-offset-7">
                <div className="sence__page-footer-information">
                  <ul className="sence__page-footer-informationlist">
                    <li className="sence__page-footer-information-item">577 Airport Blvd, Suite 160, Burlingame, CA 94010</li>
                    <li className="sence__page-footer-information-item">hello@tacpoint.com</li>
                    <li className="sence__page-footer-information-item">650.577.3140</li>
                  </ul>

                  <div className="sence__page-footer-information-site">
                    <a className="sence__page-footer-information-site-link" href="javascript:;">
                      <i className="sence-icon-black-fb"></i>
                    </a>
                    <a className="sence__page-footer-information-site-link" href="javascript:;">
                      <i className="sence-icon-black-tw"></i>
                    </a>
                    <a className="sence__page-footer-information-site-link" href="javascript:;">
                      <i className="sence-icon-black-in"></i>
                    </a>
                    <a className="sence__page-footer-information-site-link" href="javascript:;">
                      <i className="sence-icon-black-ig"></i>
                    </a>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
      </Scene.Footer>
    );
  }

  bodyRender () {
    const { categoryOffset } = this.state;
    const style = {
      transform: `translateY(${-categoryOffset}px)`
    };

    return (
      <Scene.Body>
        <div className="sence__grid" >
          <div className="sence__grid-inner">
            <div className="col-4">
              <div className="sence__category" style={style}>
                <span className="sence__category-line" style={{ transform: 'rotate(-35deg)' }}></span>
                <div className="sence__grid">
                    <div className="sence__grid-inner">
                      <div className="col-6" >
                          <ul className="sence__category-list">
                            <li className="sence__category-item">
                              <a href="">analytics</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">branding</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">data</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">graphics</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">ux/ui</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">development</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">marketing</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">presentation</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">app</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">strategy</a>
                            </li>
                            <li className="sence__category-item">
                              <a href="">web</a>
                            </li>
                          </ul>
                        </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="col-8">
              <div className="sence-about__object">
                <img className="sence-about__image" src="image/img-about-office.jpg" alt="" />
              </div>
            </div>
          </div>
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
      context => <About {...context} {...props} />
    }
  </Context.Consumer>
}