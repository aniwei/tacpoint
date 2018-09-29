import React from 'react';

import Scene from '../../components/Scene';
import Context from '../../Context';

class Project extends React.Component {
  static backgroundColor = '#ffffff';
  static logoColor = '#1a1a1a';

  state = {
    waiting: true,
    data: null
  }

  componentDidMount () {
    const { setBackgroundColor, setLogoColor } = this.props;

    setBackgroundColor(Project.backgroundColor);
    setLogoColor(Project.logoColor);

    window.addEventListener('scroll', this.onWindowScroll);

    this.getProject();
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    
  }

  getProject = () => {
    fetch('./data/project.json', {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({ data: res.project, waiting: false }))
    .catch(err => alert('Sorry, has a network error.'));
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
        <div class="sence__page-header-title-wrap">
          <div class="sence__grid">
            <div class="sence__grid-inner">
              <div class="col-10">
                <h3 class="sence__page-header-title">Visa Fraud</h3>
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
      <div class="sence__page-header-description-wrap">
        <div class="sence__grid">
          <div class="sence__grid-inner">
            <div class="col-4 col-offset-7">
              <div class="sence__page-header-description">
                <div class="sence__page-header-description-inner">
                  <p class="sence__page-header-description-text">
                      In convallis leo at libero blandit, sit amet semper arcu sollicitudin. In venenatis ligula metus, eu consectetur ipsum tempor quis. Cras fringilla est id placerat ultricies. 
                  </p>
                  <p class="sence__page-header-description-extra">graphics   ux/ui   development</p>
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
      context => <Project {...context} {...props} />
    }
  </Context.Consumer>
}