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

    this.getProject();
  }

  getProject = () => {
    fetch('./data/project.json', {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({ data: res.project, waiting: false }))
    .catch(err => alert('Sorry, has a network error.'));
  }

  
  headerRender () {
    const { data } = this.state;

    return <Scene.Header>
      {
        () => (
          <div>
            <div className="scene__page-header-title-wrap">
              <div className="scene__grid">
                <div className="scene__grid-inner">
                  <div className="col-10">
                    <h3 className="scene__page-header-title">{data.name}</h3>
                  </div>
                </div>
              </div>
            </div>
            {this.headerDescriptionRender()}
          </div>
        )
      }
    </Scene.Header>;
  }

  headerDescriptionRender () {
    const { data } = this.state;

    if (data) {
      const { breif, categories } = data;

      const breifElement = breif.map((breif, index) => {
        return (
          <p className="scene__page-header-description-text" key={index}>
            {breif}          
          </p>
        );
      });

      const categoriesElement = (
        <p className="scene__page-header-description-extra">
          {categories.map(cate => cate.name).join('   ')}
        </p>
      );



      return (
        <div className="scene__page-header-description-wrap">
          <div className="scene__grid">
            <div className="scene__grid-inner">
              <div className="col-4 col-offset-7">
                <div className="scene__page-header-description">
                  <div className="scene__page-header-description-inner">
                    {breifElement}
                    {categoriesElement}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  footerRender () {
    return <Scene.Footer>
      {
        () => (
          <div className="scene__page-footer-inner">
            <h3 className="scene__page-footer-title">Let’s talk.</h3>

            <div className="scene__grid">
              <div className="scene__grid-inner">
                <div className="col-4 col-offset-7">
                  <div className="scene__page-footer-information">
                    <ul className="scene__page-footer-informationlist">
                      <li className="scene__page-footer-information-item">577 Airport Blvd, Suite 160, Burlingame, CA 94010</li>
                      <li className="scene__page-footer-information-item">hello@tacpoint.com</li>
                      <li className="scene__page-footer-information-item">650.577.3140</li>
                    </ul>

                    <div className="scene__page-footer-information-site">
                      <a className="scene__page-footer-information-site-link" href="javascript:;">
                        <i className="scene-icon-black-fb"></i>
                      </a>
                      <a className="scene__page-footer-information-site-link" href="javascript:;">
                        <i className="scene-icon-black-tw"></i>
                      </a>
                      <a className="scene__page-footer-information-site-link" href="javascript:;">
                        <i className="scene-icon-black-in"></i>
                      </a>
                      <a className="scene__page-footer-information-site-link" href="javascript:;">
                        <i className="scene-icon-black-ig"></i>
                      </a>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
        )
      }   
    </Scene.Footer>
  }

  bodyRender () {

    return (
      <Scene.Body>

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