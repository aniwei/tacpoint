import React from 'react';

import Scene from '../../components/Scene';
import Context from '../../Context';
import Article from '../../components/Article';

class Project extends React.Component {
  static backgroundColor = '#ffffff';
  static logoColor = '#1a1a1a';
  static navigatorColor = '';
  static navigators = [
    {}
  ];

  state = {
    waiting: true,
    data: null
  }

  componentDidMount () {
    const { 
      setBackgroundColor, 
      setLogoColor,
      setNavigators,
      setNavigatorColor
    } = this.props;

    setBackgroundColor(Project.backgroundColor);
    setLogoColor(Project.logoColor);
    setNavigatorColor(Project.navigatorColor);
    setNavigators(Project.navigators);

    this.getProject();
  }

  getProject = () => {
    const { setLogoColor } = this.props;

    fetch('./data/project.json', {
      method: 'GET'
    }).then(res => res.json())
    .then(res => this.setState({ data: res.project, waiting: false }, () => {
      setLogoColor(res.project.color);
    }))
    .catch(err => {
      console.log(err);
      alert('Sorry, has a network error.');
    });
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
                  <div className="col-20 col-m-16 col-s-18 col-xs-24">
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
              <div className="col-8 col-offset-14 col-m-10 col-offset-m-12 col-s-12 col-offset-s-12 col-xs-24 col-offset-xs-0">
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
            <p className="scene__page-footer-label">next project</p>
            <h3 className="scene__page-footer-title">Visa Prepaid</h3>
          </div>
        )
      }   
    </Scene.Footer>
  }

  bodyRender () {
    const { data } = this.state;

    return (
      <Scene.Body>
        {
          () => (
            <Article layout={data.layout} />
          )
        }

      </Scene.Body>
    );
  }

  render () {

    return (
      <Scene waiting={this.state.waiting} name="detail">
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