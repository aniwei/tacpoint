import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import qs from 'query-string';
import Context from '../../Context';

import Scene from '../../components/Scene';

class Home extends Component {

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
    const { location } = this.props;
    const query = qs.parse(location.search);

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

          this.setState(state);
        })
        .catch(error => {
          this.setState({
            networkError: error
          });
        });
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
            <Link 
              to={to}
              key={id}
            >
              <li className={classes}>
                {name}
              </li>
            </Link>
          );
        }
      } else {
        return (
          <Link 
            to={to}
            key={id}
          >
            <li className={classes}>
              {name}
            </li>
          </Link>
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

  categoriesRender () {
    const { location } = this.props;
    const { categories, selectedCategories } = this.state;
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
        <Link 
          to={to}
          key={id}
          onClick={() => {
            this.onCategoryLinkClick(id, isInclude);
          }}
        >
          <li className={classes}>{name}</li>
        </Link>
      );
    });

    return (
      <div className="clo-6">
        <ul className="scene__category-list scene__category-capability">
          {categoryElements}
        </ul>
      </div>
    );
  }

  clientsRender () {
    const { location } = this.props;
    const { selectedClients, clients } = this.state;
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
        <Link 
          to={to}
          onClick={() => this.onClientLinkClick(id, isInclude)}
          key={id}  
        >
          <li className={classes}>{name}</li>
        </Link>
      );
    });

    return (
      <div className="clo-6">
        <ul className="scene__category-list scene__category-capability">
          {clientElements}
        </ul>
      </div>
    );
  }

  filtersRender () {
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

  bodyRender () {
    return (
      <Scene.Body>
        {
          () => (
            <div className="scene__grid">
              <div className="scene__grid-inner">
                {this.projectsRender()}
                {this.filtersRender()}
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