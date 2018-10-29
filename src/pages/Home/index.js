import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import qs from 'query-string';
import Context from '../../Context';

import Scene from '../../components/Scene';
import AppPage from '../../components/AppPage';
import { COLORS } from '../../contants';

const MOUSE_MOVING_SCALE = 15;
const START_ANGLE = 135;

class Navigations extends Component {
  static contextTypes = {
    application: PropTypes.object
  }

  state = {
    type: 'categories'
  }

  onCategoryLinkClick = (...args) => {
    const { onCategoryLinkClick } = this.props;

    onCategoryLinkClick(...args);
  }

  onClientLinkClick = (...args) => {
    const { onClientLinkClick } = this.props;

    onClientLinkClick(...args);
  }

  onTitleClick = (type) => {
    this.setState({ type });
  }

  clear = () => {
    const { onClear } = this.props;

    if (typeof onClear === 'function') {
      onClear();
    }
  }

  categoriesRender () {
    const { type } = this.state;
    const { location } = this.props;
    const { categories, selectedCategories } = this.props;
    const query = qs.parse(location.search);

    query.clients = query.clients || [];

    const categoryElements = categories.map((client) => {
      const { id, name } = client;
      const index = selectedCategories.indexOf(id);
      const isInclude = index !== -1;
      const classes = classnames({
        'scene__category-item_highlight': isInclude,
        'scene__category-item': true
      });

      let categories = selectedCategories.slice();

      if (isInclude) {
        categories.splice(index, 1);
      } else {
        categories = selectedCategories.concat(id)
      }

      const to = `/?${qs.stringify({ ...query, categories: categories.join(',') })}`;

      return (
        <li className={classes} key={id}>
          <Link 
            to={to}
            onClick={() => {
              this.onCategoryLinkClick(id, isInclude);
            }}
          >
            {name}
          </Link>
        </li>
      );
    });

    return (
      <div className="col-12 col-xs-24">
        <div className={classnames({
          'scene__category-box': true,
          'active': type === 'categories',
          'animated': true
        })}>
          <h3 className="scene__category-title" onClick={() => this.onTitleClick('categories')}>
            TYPE OF<br />PROJECT
          </h3>
          <ul className="scene__category-list scene__category-capability">
            {categoryElements}
          </ul>
        </div>
      </div>
    );
  }

  clientsRender () {
    const { type } = this.state;
    const { location } = this.props;
    const { selectedClients, clients } = this.props;
    const query = qs.parse(location.search);


    // console.log(selectedClients);
    query.clients = query.clients || [];

    const clientElements = clients.map((client, i) => {
      const { id, name } = client;
      // const index = selectedClients === id;
      const isInclude = selectedClients === id
      const classes = classnames({
        'scene__category-item_highlight': isInclude,
        'scene__category-item': true
      });
      

      // const clients = (
      //   isInclude ? 
      //     selectedClients.concat().splice(index, 1) : 
      //     selectedClients.concat(id)
      // ).join(',');

      const clients = id;

      const to = `/?${qs.stringify({ ...query, clients: isInclude ? null : clients })}`;

      return (
        <li className={classes} key={id} >
          <Link 
            to={to}
            onClick={() => this.onClientLinkClick(id, i, isInclude)}
          >
            {name}
          </Link>
        </li>
      );
    });

    return (
      <div className="col-12 col-xs-24 scene__category-client">
        <div className={classnames({
          'scene__category-box': true,
          'active': type === 'client',
          'animated': true
        })}>
          <h3 className="scene__category-title" onClick={() => this.onTitleClick('client')}>
            CLIENT
          </h3>
          <ul className="scene__category-list scene__category-capability">
            {clientElements}
          </ul>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="col-8 col-offset-4 col-m-10 col-offset-m-0 col-s-12 col-offset-s-9 col-xs-12 col-offset-xs-6 scene-home__category">
        <div className="scene-home__category-content">
          <div className="scene__category">
            <div className="scene_grid">
              <div className="scene__grid-inner">
                {this.categoriesRender()}
                {this.clientsRender()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends AppPage {
  static backgroundColor = '#000';
  static navigationButtonCOlor = '#f0f0f0';
  static footer = {
    color: '#ffffff'
  }
  static logo = {
    color: '#f0f0f0',
    type: 'simple'
  }
  static navigators = {
    color: '#f0f0f0',
    data: [
      { position: 'left', text: 'about', path: '/about' },
      { position: 'right', text: 'let\'s talk', path: '/contact' }
    ]
  }

  static navigations = {
    component: Navigations,
    props: {}
  }

  static contextTypes = {
    application: PropTypes.object
  }

  state = {
    waiting: true,
    networkError: null,
    projects: [],
    categories: [],
    clients: [],
    selectedCategories: [],
    selectedClients: null,
    selectedClientIndex: 0,
  }

  componentWillUnmount () {
    const { isMobile } = this.props;

    if (isMobile) {
      document.removeEventListener('moving', this.onMoving);
    }

    document.removeEventListener('onClearNavigations', this.onClearNavigations, false);
  }

  componentDidMount () {
    const { query, props } = this;
    const { application } = this.context;
    let { categories, clients } = query;

    categories = categories || '';
    clients = clients || null;

    const selectedCategories = categories.length > 0 ? categories.split(',').map(cate => cate - 0) : [];
    const selectedClients = clients ? clients - 0 : null;

    this.setState({
      selectedCategories,
      selectedClients
    }, () => {
      const isUnselected = 
        selectedCategories.length === 0 && 
        selectedClients === null;

      Home.logo.type = isUnselected ? 'full' : 'simple';

      const promise = Promise.all([
        this.getProjectList(),
        this.getCategoryList(),
        this.getClientList()
      ]);

      promise
        .then(res => {
          const state = {
            networkError: null,
            waiting: false,
            ...res[0],
            ...res[1],
            ...res[2]
          };

          this.setState(state, () => {
            const { selectedClients, clients } = this.state;
            const color = (clients[selectedClients] || Home.logo).color;
            
            Home.navigations.props = {
              ...props,
              ...this.state,
              onCategoryLinkClick: this.onCategoryLinkClick,
              onClientLinkClick: this.onClientLinkClick,
              onClear: this.onClearSelectedList
            };

            if (selectedClients === null) {
              application.createEventEmitter('linestatechange', {
                open: false
              });
            } else {
              application.createEventEmitter('linestatechange', {
                open: true,
                color: clients[selectedClients].color,
                angle: START_ANGLE + 110 / clients.length * selectedClients
              });
            }

            Home.logo.color = color;
            
            super.componentDidMount();

            application.changeNavigationButtonState(!isUnselected ? 'open' : 'close');
          });
        })
        .catch(error => {
          this.setState({
            networkError: error
          });
        });
    });


    const { isMobile } = this.props;
   
    if (!isMobile) {
      document.addEventListener('moving', this.onMoving, false);
    }

    document.addEventListener('clearnavigations', this.onClearNavigations, false);
  }

  onClearNavigations = () => {
    this.setState({
      selectedCategories: [],
      selectedClientIndex: null,
      selectedClients: null
    });

    const { application } = this.context;

    application.setLogoStyle({
      ...this.constructor.logo
    });
  }

  onClearSelectedList = () => {
    const { setNavigations } = this.props;

    this.setState({
      selectedClients: null,
      selectedCategories: []
    }, () => {
      setNavigations(this.navigationsRender());
    });
  }

  onClientLinkClick = (client, index, isInclude) => {
    const { clients } = this.state;
    const { application } = this.context;
    

    this.setState({
      selectedClients: isInclude ? null : client,
      selectedClientIndex: isInclude ? null : index,
    }, () => {
      const { selectedClients, selectedCategories } = this.state;
      const isUnselected = selectedCategories.length === 0 && selectedClients === null;

      // debugger;
      setTimeout(() => {
        application.setLogoStyle({
          type: isUnselected ? 'full' : 'simple',
          color: isUnselected ? Home.logo.color : (clients[index] || Home.logo).color
        });
      }, 500)
      

      if (selectedClients === null) {
        application.createEventEmitter('linestatechange', {
          open: false
        });
      } else {
        application.createEventEmitter('linestatechange', {
          open: true,
          color: clients[selectedClients].color,
          angle: START_ANGLE + 110 / clients.length * selectedClients
        });
      }

      Home.navigations.props = {
        ...this.props,
        ...this.state,
        onCategoryLinkClick: this.onCategoryLinkClick,
        onClientLinkClick: this.onClientLinkClick,
        onClear: this.onClearSelectedList
      };

      application.forceUpdateNavigationPanel();

      application.changeNavigationButtonState(isUnselected ? 'close' : 'open');
    
    });
  }

  onCategoryLinkClick = (category, isInclude) => {
    const { application } = this.context;
    const { selectedCategories } = this.state;
    const index = selectedCategories.indexOf(category);

    const newSelectedList = selectedCategories.slice();

    if (isInclude) {
      newSelectedList.splice(index, 1);

      this.setState({
        selectedCategories: newSelectedList
      }, () => {
        const { selectedClients, selectedCategories } = this.state;
        const isUnselected = 
          selectedCategories.length === 0 && 
          selectedClients === null;

        application.setLogoStyle({
          type: isUnselected ? 'full' : 'simple',
        });

        if (selectedClients === null) {
          application.setLogoStyle({
            color: Home.logo.color
          });
        }

        Home.navigations.props = {
          ...this.props,
          ...this.state,
          onCategoryLinkClick: this.onCategoryLinkClick,
          onClientLinkClick: this.onClientLinkClick,
          onClear: this.onClearSelectedList
        };

        application.forceUpdateNavigationPanel();
        application.setLogoStyle({
          ...this.constructor.logo
        });

        application.changeNavigationButtonState(isUnselected ? 'close' : 'open');
      });
    } else {
      newSelectedList.push(category);

      this.setState({
        selectedCategories: newSelectedList
      }, () => {
        const { selectedClients, selectedCategories } = this.state;
        const isUnselected = 
          selectedCategories.length === 0 && 
          selectedClients === null;

        application.setLogoStyle({
          type: isUnselected ? 'full' : 'simple',
        });

        if (selectedClients === null) {
          application.setLogoStyle({
            color: Home.logo.color
          });
        }

        if (selectedClients === null) {
          application.createEventEmitter('linestatechange', {
            open: false
          });
        } else {
          application.createEventEmitter('linestatechange', {
            open: true,
            color: clients[selectedClients].color
          });
        }

        Home.navigations.props = {
          ...this.props,
          ...this.state,
          onCategoryLinkClick: this.onCategoryLinkClick,
          onClientLinkClick: this.onClientLinkClick,
          onClear: this.onClearSelectedList
        };

        application.setLogoStyle({
          ...this.constructor.logo
        });

        application.forceUpdateNavigationPanel();

        application.changeNavigationButtonState(isUnselected ? 'close' : 'open');
      });
    }
  }

  onProjectMouseEnter = (project, e) => {
    console.log(e);
  }

  onProjectMouseLeave = () => {

  }

  onMouseOver = (e) => {
    console.log(e);
  }

  getProjectList () {
    return new Promise((resolve, reject) => {
      fetch('./data/projects.json', {
        method: 'GET'
      })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject({
        type: 'PROJECT_LIST',
        code: 'ERROR',
        message: err.message
      }));
    });
  }

  getCategoryList () {
    return new Promise((resolve, reject) => {
      fetch('./data/categories.json', {
        method: 'GET'
      })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject({
        type: 'CATEGORY_LIST',
        code: 'ERROR',
        message: err.message
      }));
    });
  }

  getClientList () {
    return new Promise((resolve, reject) => {
      fetch('./data/clients.json', {
        method: 'GET'
      })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject({
        type: 'CLIENT_LIST',
        code: 'ERROR',
        message: err.message
      }));
    });
  }

  projectsRender () {
    const { projects, selectedCategories, selectedClients } = this.state;

    const projectElements = projects.map((project, index) => {
      const classes = classnames({
        'scene__project-item': true,
        'scene__project-item_highlight': false
      });

      const { name, id, clientId, categories } = project;
      const to = `/project?id=${id}`;

      if (selectedCategories.length > 0 || selectedClients) {
        if (
          categories.some(cate => selectedCategories.includes(cate.id)) ||
          selectedClients === clientId
        ) {
          return (
            <li 
              className={classes} 
              key={id} 
              onMouseEnter={(e) => this.onProjectMouseLeave(project, e)}
              onMouseLeave={(e) => this.onProjectMouseEnter(project, e)}
            >
              <Link
                to={to}
              >
                {name}
              </Link>
            </li>
          );
        }
      } else {
        return (
          <li className={classes}>
            <Link 
              to={to}
              key={id}
            >
              {name}
            </Link>
          </li>
        );
      }

      
    });

    return (
      <div className="col-12 col-m-14 col-s-24 scene-home__project">
        <div className="scene__project">
          <ul className="scene__project-list">
            {projectElements}
          </ul>
        </div>
      </div>
    );
  }

  navigationsRender = () => {

    return (
      <Navigations 
        {...this.props}
        onCategoryLinkClick={this.onCategoryLinkClick}
        onClientLinkClick={this.onClientLinkClick}
        onClear={this.onClearSelectedList}
        {...this.state}
      />
    );
  }

  bodyRender () {
    const { isMobile } = this.props;

    return (
      <Scene.Body>
        {
          () => (
            <div className="scene__grid">
              <div className="scene__grid-inner">
                {this.projectsRender()}
                {!isMobile && this.navigationsRender()}
              </div>
            </div>
          )
        }
      </Scene.Body>
    );
  }

  render () {
    return (
      <Scene waiting={this.state.waiting} light name="home">
        <div className="scene-home">
          {this.bodyRender()}
          <Line {...this.props} />
        </div>
      </Scene>
    );
  }
}

class Line extends Component {
  static propTypes = {
    application: PropTypes.object
  }

  state = {
    angle: START_ANGLE,
    translate: 0,
    color: COLORS.WHITE,
    open: false
  }

  componentWillUnmount () {
    const { isMobile } = this.props;

    if (!isMobile) {
      document.removeEventListener('moving', this.onMoving);
    } else {
      document.removeEventListener('orientation', this.onOrientation, false);
    }

    document.removeEventListener('linestatechange', this.onLineStateChange, false);
  }

  componentDidMount () {
    const { isMobile } = this.props;
   
    if (!isMobile) {
      document.addEventListener('moving', this.onMoving, false);
    } else {
      document.addEventListener('orientation', this.onOrientation, false);
    }

    document.addEventListener('linestatechange', this.onLineStateChange, false);
  }

  onLineStateChange = ({ data: state }) => {
    this.setState({
      ...state
    })
  }

  onOrientation = ({ data: { alpha, beta, gamma }}) => {
    const { getWindowSize } = this.props;
    const { height, width } = getWindowSize();
    const halfHeight = height / 2;
    const halfWidth = width / 2;

    const offsetX = (alpha) * (60 / 180) ;
    const offsetY = (beta) * (60 / 180);

    this.setState({
      translate: `${offsetX}px, ${offsetY}px`
    });
  }

  onMoving = ({ data: { x, y } }) => {
    const { getWindowSize } = this.props;
    const { height, width } = getWindowSize();
    const halfHeight = height / 2;
    const halfWidth = width / 2;

    const offsetX = (x - halfWidth) * (60 / halfWidth) ;
    const offsetY = (y - halfHeight) * (60 / halfHeight);

    this.setState({
      translate: `${offsetX}px, ${offsetY}px`
    });
  }

  render () {
    const { angle, translate, color, open } = this.state;

    const style = {
      transform: `rotate(${angle}deg) translate(${translate})`,
      backgroundColor: color
    }

    return (
      <div className={classnames({
        'scene-home__line': true,
        'animated': true,
        'fadeIn': open
      })} style={style}></div>
    );
  }
}

export default withRouter((props) => {
  return <Context.Consumer>
    {
      context => <Home {...context} {...props} />
    }
  </Context.Consumer>
});