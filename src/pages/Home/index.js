import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import qs from 'query-string';
import Context from '../../Context';

import Scene from '../../components/Scene';

const Navigations = withRouter(class Navigations extends Component {
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

      const categories = (
        isInclude ? 
          selectedCategories.concat().splice(index, 1) : 
          selectedCategories.concat(id)
      ).join(',');

      const to = `/?${qs.stringify({ ...query, categories })}`;

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

    query.clients = query.clients || [];

    const clientElements = clients.map((client) => {
      const { id, name } = client;
      const index = selectedClients.indexOf(id);
      const isInclude = index !== -1;
      const classes = classnames({
        'scene__category-item_highlight': isInclude,
        'scene__category-item': true
      });

      const clients = (
        isInclude ? 
          selectedClients.concat().splice(index, 1) : 
          selectedClients.concat(id)
      ).join(',');

      const to = `/?${qs.stringify({ ...query, clients })}`;

      return (
        <li className={classes} key={id} >
          <Link 
            to={to}
            onClick={() => this.onClientLinkClick(id, isInclude)}
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
});

class Home extends Component {
  static backgroundColor = '#000';
  static logoColor = '#f0f0f0';
  static navigatorColor = '#f0f0f0';
  static navigators = [
    { position: 'left', text: 'About', path: '/about' },
    { position: 'right', text: 'Let\'s talk', path: '/contact' }
  ];

  state = {
    waiting: true,
    networkError: null,
    projects: [],
    categories: [],
    clients: [],
    selectedCategories: [],
    selectedClients: []
  }

  componentDidMount () {
    const { location, setNavigations, setNavigators } = this.props;
    const { setBackgroundColor, setLogoColor, setNavigatorColor } = this.props;
    const query = qs.parse(location.search);

    setBackgroundColor(Home.backgroundColor);
    setLogoColor(Home.logoColor);
    setNavigators(Home.navigators);
    setNavigatorColor(Home.navigatorColor);

    this.setState({
      selectedCategories: query.categories ? query.categories.split(',').map(cate => cate - 0) : [],
      selectedClients: query.clients ? query.clients.split(',').map(client => client - 0) : []
    }, () => {
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
            setNavigations(this.navigationsRender());

            
          });
        })
        .catch(error => {
          this.setState({
            networkError: error
          });
        });
    });
  }

  onClearSelectedList = () => {
    this.setState({
      selectedClients: [],
      selectedCategories: []
    });
  }

  onClientLinkClick = (client, isInclude) => {
    const { selectedClients } = this.state;
    const index = selectedClients.indexOf(client);

    const newSelectedList = selectedClients.slice();

    if (isInclude) {
      newSelectedList.splice(index, 1);

      this.setState({
        selectedClients: newSelectedList
      });
    } else {
      newSelectedList.push(client);

      this.setState({
        selectedClients: newSelectedList
      });
    }
  }

  onCategoryLinkClick = (category, isInclude) => {
    const { selectedCategories } = this.state;
    const index = selectedCategories.indexOf(category);

    const newSelectedList = selectedCategories.slice();

    if (isInclude) {
      newSelectedList.splice(index, 1);

      this.setState({
        selectedCategories: newSelectedList
      });
    } else {
      newSelectedList.push(category);

      this.setState({
        selectedCategories: newSelectedList
      });
    }
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

      if (selectedCategories.length > 0 || selectedClients.length > 0) {
        if (
          categories.some(cate => selectedCategories.includes(cate.id)) ||
          selectedClients.includes(clientId)
        ) {
          return (
            <li className={classes} key={id}>
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
        ref={ref => this.navigations = ref}
        onCategoryLinkClick={this.onCategoryLinkClick}
        onClientLinkClick={this.onClientLinkClick}
        onClear={this.onClearSelectedList}
        {...this.state}
      />
    );
  }

  bodyRender () {
    const { isMobile } = this.props;

    console.log(isMobile);

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
      <Scene waiting={this.state.waiting} light>
        <div className="scene-home">
          {this.bodyRender()}
        </div>
      </Scene>
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