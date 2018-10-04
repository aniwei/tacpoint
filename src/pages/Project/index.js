import React from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';

import Scene from '../../components/Scene';
import SimpleNavigation from '../../components/SimpleNavigation';
import Context from '../../Context';
import Article from '../../components/Article';

class Project extends React.Component {
  static backgroundColor = '#ffffff';
  static logoColor = '#1a1a1a';
  static navigatorColor = '#1a1a1a';
  static navigationButtonColor = '#1a1a1a';
  static navigators = [
    { position: 'left', text: 'about', path: '/about' },
    { position: 'right', text: 'let\'s talk', path: '/contact' }
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
      setNavigatorColor,
      setNavigationButtonColor,
      setNavigations,
      location
    } = this.props;
    
    this.query = qs.parse(location.search);

    setBackgroundColor(Project.backgroundColor);
    setLogoColor(Project.logoColor);
    setNavigators(Project.navigators);
    setNavigatorColor(Project.navigatorColor);
    setNavigationButtonColor(Project.navigationButtonColor);
    setNavigations(
      <SimpleNavigation>
        {this.moreNavigationRender()}
      </SimpleNavigation>
    );

    this.getProject(this.query.id);
  }

  onNavigationMore = () => {
    const { location } = this.props;

    location.href = '/';
  }

  getProject = (id) => {
    const { setLogoColor } = this.props;

    fetch(`./data/project.json?id=${id}`, {
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

  onNextProjectClick = () => {
    this.getProject(parseInt(this.query.id) + 1);
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

  moreNavigationRender() {
    return (
      <div className="app__navigation-more" onClick={this.onNavigationMore}>
        <Link to="/">
          + more projects
        </Link>
      </div>
    );
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
            <p className="scene__page-footer-label">
              <Link to={`/project?id=${parseInt(this.query.id) + 1}`} onClick={this.onNextProjectClick}>
                next project
              </Link>
            </p>
            <h3 className="scene__page-footer-title">Visa Prepaid</h3>
          </div>
        )
      }   
    </Scene.Footer>
  }

  bodyRender () {
    const { data } = this.state;
    const { getProjectSwiperOptions } = this.props;
    const swipeOptions = getProjectSwiperOptions();

    return (
      <Scene.Body>
        {
          () => (
            <Article layout={data.layout} swipeOptions={swipeOptions} />
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