import React from 'react';
import ReactSwipe from 'react-swipe';

import Scene from '../../components/Scene';
import SimpleNavigation from '../../components/SimpleNavigation';
import Context from '../../Context';

const SCALE = 2.5;

class About extends React.Component {
  static backgroundColor = '#f0f0f0';
  static logoColor = '#1a1a1a';
  static navigatorColor = '#1a1a1a';
  static navigationButtonColor = '#1a1a1a';
  static navigators = [
    { position: 'left', text: 'projects', path: '/' },
    { position: 'right', text: 'let’s talk', path: '/contact' }
  ];

  state = {
    waiting: true,
    categoryOffset: 0,
    clients: [],
    categories: [],
    swiperIndex: '01',
    lineAngle: 35
  }

  componentDidMount () {
    const { 
      setBackgroundColor, 
      setLogoColor, 
      setNavigators, 
      setNavigatorColor,
      setNavigationButtonColor,
      setNavigations
    } = this.props;

    setBackgroundColor(About.backgroundColor);
    setLogoColor(About.logoColor);
    setNavigators(About.navigators);
    setNavigatorColor(About.navigatorColor);
    setNavigations(
      <Context.Consumer>
        {ctx => <SimpleNavigation {...ctx} />}
      </Context.Consumer>
    );
    setNavigationButtonColor(About.navigationButtonColor);

    const promise = Promise.all([
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

    window.addEventListener('scroll', this.onWindowScroll);
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    const { getWindowSize } = this.props;
    const { top, height: contentHeight } = this.getScrollRect();
    const { height } = getWindowSize();

    const angle = parseInt((top / (contentHeight - height)) * 90 - 55);

    this.setState({
      categoryOffset: top,
      lineAngle: angle
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

  getScrollRect = () => {
    const { 
      scrollTop: top,
      scrollHeight: height
    } = document.documentElement;



    return { 
      top: top === 0 ? document.body.scrollTop : top, 
      height 
    };
  }

  headerRender () {
    return (
      <Scene.Header>
        <div className="scene__page-header-title-wrap">
          <div className="scene__grid">
            <div className="scene__grid-inner">
              <div className="col-20 col-m-16 col-s-18 col-xs-24">
                <h3 className="scene__page-header-title">
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
      <div className="scene__page-header-description-wrap">
        <div className="scene__grid">
          <div className="scene__grid-inner">
            <div className="col-8 col-offset-14 col-m-10 col-offset-m-12 col-s-12 col-offset-s-12 col-xs-24 col-offset-xs-0">
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
    const { getSocialList, getContactInfomation } = this.props;
    const social = getSocialList();
    const contactInformation = getContactInfomation();

    const socialElements = social.map(soc => {
      const { iconClassName, link, name } = soc;

      return (
        <a key={name} className="scene__page-footer-information-site-link" href={link}>
          <i className={`scene-icon-black-${iconClassName}`}></i>
        </a>
      );
    });

    const infomationElements = (
      <ul className="scene__page-footer-informationlist">
        {
          contactInformation.map(info => <li 
            key={info.key}
            className="scene__page-footer-information-item"
          >
            {info.value}
          </li>)
        }
      </ul>
    );

    return (
      <Scene.Footer>
        <div className="scene__page-footer-inner">
          <h3 className="scene__page-footer-title">Let’s talk.</h3>

          <div className="scene__grid">
            <div className="scene__grid-inner">
              <div className="col-8 col-offset-14 col-m-10 col-offset-m-12 col-s-9 col-offset-s-12 col-xs-24 col-offset-xs-0">
                <div className="scene__page-footer-information">
                  {infomationElements}

                  <div className="scene__page-footer-information-site">
                    {socialElements}
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
      </Scene.Footer>
    );
  }

  partnerRender () {
    const { getPartnerList } = this.props;
    const partnerList = getPartnerList();

    const partnerElements = partnerList.map((partner, index) => {
      const { url, alt } = partner;
      return (
        <div className="col-6 col-xs-12" key={index}>
          <div className="scene__thumbnail-object">
            <img className="scene__thumbnail-image" src={url} alt={alt} />
          </div>
        </div>
      );
    });

    return (
      <div className="scene-about__partner">
        <div className="scene__thumbnail">
          <div className="scene__grid">
            <div className="scene__grid-inner">
              {partnerElements}
            </div>
          </div>
        </div>
      </div>               
    );
  }

  categoriesRender () {
    const { categoryOffset, categories, lineAngle } = this.state;
    const { isMobile } = this.props;
    const style = {
      transform: `translateY(${-categoryOffset / SCALE}px)`
    };

    const categoryElements = categories.map(cate => {
      const { id, name } = cate;

      return (
        <div key={id} className="col-24 col-xs-12 scene__category-item">{name}</div>
      );
    })

    return (
      <div className="scene__category" style={isMobile ? null : style}>
        <span className="scene__category-line" style={{ transform: `rotate(${lineAngle}deg)` }}></span>
        <div className="scene__category-list">
          <div className="scene__grid">
            <div className="scene__grid-inner">
              {categoryElements}
            </div>
          </div>
        </div>
      </div>
    );
  }

  swiperRender () {
    const { getAboutSwiperList, getAboutSwiperOptions } = this.props;
    const { swiperIndex } = this.state;
    const swiperList = getAboutSwiperList();

    const swiperElements = swiperList.map((swiper, index) => {
      const { alt, url } = swiper;

      return (
        <div className="scene__carousel-item-inner" key={index}>
          <img 
            className="scene-about__image" 
            src={url}
            alt={alt}
            key={index} 
          />
        </div>
      );
    });

    const options = {
      ...getAboutSwiperOptions(),
      transitionEnd: (index) => {
        index = index + 1;
        index = index < 10 ? `0${index}` : String(index);

        this.setState({
          swiperIndex: index
        });
      }
    }

    const length = swiperElements.length;
    const total = length < 10 ? `0${length}` : length;

    return (
      <div className="scene__carousel">
        <div className="scene__carousel-inner">
          <div className="scene-about__object">
            <div className="scene__carousel-slider">
              <ReactSwipe swipeOptions={options}>
                {swiperElements}
              </ReactSwipe>
            </div>
          </div>
          <div className="scene__carousel-order scene__carousel-order_brief">
            <span className="scene__carousel-order-num scene__carousel-order_active">{swiperIndex}</span>/<span className="scene__carousel-order-num">{total}</span>
          </div>
        </div>
      </div>
    );
  }

  bodyRender () {
    

    return (
      <Scene.Body>
        <div className="scene__grid" >
          <div className="scene__grid-inner">
            <div className="col-8 col-m-6 col-xs-24">
              {this.categoriesRender()}
            </div>

            <div className="col-16 col-m-18 col-xs-24">
              {this.swiperRender()}
            </div>
          </div>
        </div>

        {this.partnerRender()}
      </Scene.Body>
    );
  }

  render () {

    return (
      <Scene waiting={this.waiting} name="about">
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