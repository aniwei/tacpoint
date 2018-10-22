import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import qs from 'query-string';
import Context from '../../Context';

import Scene from '../../components/Scene';

const MOUSE_MOVING_SCALE = 15;

class Navigations extends Component {
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

      const to = `/?${qs.stringify({ ...query, clients })}`;

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

class Home extends Component {
  static backgroundColor = '#000';
  static logoColor = '#f0f0f0';
  static navigatorColor = '#f0f0f0';
  static navigationButtonCOlor = '#f0f0f0';
  static navigators = [
    { position: 'left', text: 'about', path: '/about' },
    { position: 'right', text: 'let\'s talk', path: '/contact' }
  ];

  state = {
    waiting: true,
    networkError: null,
    projects: [],
    categories: [],
    clients: [],
    selectedCategories: [],
    selectedClients: null,
    selectedClientIndex: 0,
    lineAngle: 135,
    mouseMoveAngle: 0
  }

  componentWillMount () {
    const { clearNavigations } = this.props;

    clearNavigations();
  }

  componentWillUnmount () {
    const { isMobile } = this.props;

    if (isMobile) {
      document.removeEventListener('moving', this.onMoving);
    }
  }

  componentDidMount () {
    const { location, setNavigations, setNavigators, isMobile, setLogoType, setLogoEvent } = this.props;
    const { 
      setBackgroundColor, 
      setLogoColor, 
      setNavigatorColor,
      setNavigationButtonColor
    } = this.props;
    const query = qs.parse(location.search);

    setBackgroundColor(Home.backgroundColor);
    setLogoColor(Home.logoColor);
    setNavigators(Home.navigators);
    setNavigatorColor(Home.navigatorColor);
    setNavigationButtonColor(Home.navigationButtonCOlor);
    setLogoEvent(() => {
      this.setState({
        selectedCategories: [],
        selectedClientIndex: null,
        selectedClients: null
      }, () => {
        setNavigations(this.navigationsRender());
        setLogoType('full');
        setLogoColor(Home.logoColor);
      });
    });

    if (!isMobile) {
      document.addEventListener('moving', this.onMoving, false);
    }

    this.setState({
      selectedCategories: query.categories ? query.categories.split(',').map(cate => cate - 0) : [],
      // selectedClients: query.clients ? query.clients.split(',').map(client => client - 0) : []
      selectedClients: query.clients ? query.clients - 0 : null
    }, () => {
      const { selectedCategories, selectedClients } = this.state;
      const isUnselected = selectedCategories.length === 0 && selectedClients === null;

      const promise = Promise.all([
        this.getProjectList(),
        this.getCategoryList(),
        this.getClientList()
      ]);

      setLogoType(isUnselected ? 'full' : 'simple');

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
            setNavigations(this.navigationsRender());    
            
            setLogoColor(typeof selectedClients === 'number' ? (clients[selectedClients] || { color: 'white' }).color : Home.logoColor);
          });
        })
        .catch(error => {
          this.setState({
            networkError: error
          });
        });
    });
  }

  onMoving = ({ data: { x, y }}) => {
    const { getWindowSize } = this.props;
    const size = getWindowSize();

    this.setState({
      mouseMoveAngle: parseInt((y / size.height) * MOUSE_MOVING_SCALE)
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
    const { setNavigations, setLogoColor, setLogoType } = this.props;

    this.setState({
      selectedClients: isInclude ? null : client,
      selectedClientIndex: isInclude ? null : index,
      lineAngle: 135 + 110 / clients.length * index
    }, () => {
      const { selectedClients, selectedCategories } = this.state;
      const isUnselected = selectedCategories.length === 0 && selectedClients === null;

      setLogoType(isUnselected ? 'full' : 'simple');
      
      setNavigations(this.navigationsRender());
      setLogoColor(typeof selectedClients === 'number' ? (clients[index] || { color: 'white' }).color : Home.logoColor);
    });
  }

  // onClientLinkClick = (client, isInclude) => {
  //   const { setNavigations } = this.props;
  //   const { selectedClients } = this.state;
  //   const index = selectedClients.indexOf(client);

  //   const newSelectedList = selectedClients.slice();

  //   if (isInclude) {
  //     newSelectedList.splice(index, 1);

  //     this.setState({
  //       selectedClients: newSelectedList
  //     }, () => {
  //       setNavigations(this.navigationsRender());
  //     });
  //   } else {
  //     newSelectedList.push(client);

  //     this.setState({
  //       selectedClients: newSelectedList
  //     }, () => {
  //       setNavigations(this.navigationsRender());
  //     });
  //   }
  // }

  onCategoryLinkClick = (category, isInclude) => {
    const { setNavigations, setLogoType } = this.props;
    const { selectedCategories } = this.state;
    const index = selectedCategories.indexOf(category);

    const newSelectedList = selectedCategories.slice();

    if (isInclude) {
      newSelectedList.splice(index, 1);

      this.setState({
        selectedCategories: newSelectedList
      }, () => {
        const { selectedClients, selectedCategories } = this.state;
        const isUnselected = selectedCategories.length === 0 && selectedClients === null;

        setLogoType(isUnselected ? 'full' : 'simple');

        setNavigations(this.navigationsRender());
      });
    } else {
      newSelectedList.push(category);

      this.setState({
        selectedCategories: newSelectedList
      }, () => {
        const { selectedClients, selectedCategories } = this.state;
        const isUnselected = selectedCategories.length === 0 && selectedClients === null;

        setLogoType(isUnselected ? 'full' : 'simple');

        setNavigations(this.navigationsRender());
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
    const { selectedClients, selectedClientIndex, clients, lineAngle, mouseMoveAngle } = this.state;
    const style = {
      transform: `rotate(${lineAngle + mouseMoveAngle}deg)`,
      backgroundColor: (clients[selectedClientIndex] || { color: 'white' }).color
    }

    return (
      <Scene waiting={this.state.waiting} light name="home">
        <div className="scene-home">
          {this.bodyRender()}
          <div className={classnames({
            'scene-home__line': true,
            'animated': true,
            'fadeIn': typeof selectedClients === 'number'
          })} style={style}></div>
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