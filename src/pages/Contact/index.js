import React from 'react';
import classnames from 'classnames';
import Scene from '../../components/Scene';
import SimpleNavigation from '../../components/SimpleNavigation';
import Context from '../../Context';

class Contact extends React.Component {
  static backgroundColor = '#8b8b8b';
  static logoColor = '#1a1a1a';
  static navigationButtonColor = '#1a1a1a';
  static navigators = [
    { position: 'left', text: 'projects', path: '/' },
    { position: 'right', text: 'about', path: '/about' }
  ];

  state = {
    waiting: false,
    fields: {}
  }

  componentDidMount () {
    const { 
      setBackgroundColor, 
      setLogoColor, 
      setNavigations, 
      setNavigationButtonColor,
      setNavigators
    } = this.props;

    setBackgroundColor(Contact.backgroundColor);
    setLogoColor(Contact.logoColor);
    setNavigations(
      <SimpleNavigation />
    );

    setNavigators(Contact.navigators);

    setNavigationButtonColor(Contact.navigationButtonColor);

    if (this.googleMap) {
      this.createGoogleMap();
    }
  }

  componentWillUnmount () {
  }

  onFormButtonClick = () => {
    const { fields } = this.state;

    this.isSending = true;

    fetch('./data/message.json', {
      method: 'POST',
      body: JSON.stringify(fields)
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      alert('Message successfully!');

      this.isSending = false;
    })
    .catch(err => {
      alert('Sorry, has a network error.');

      this.isSending = true;
    });
  }

  onFormInputChange = (name, { target }) => {
    const { value } = target;
    const { fields } = this.state;

    fields[name] = value;

    this.setState({
      fields
    });
  }


  createGoogleMap () {
    const { application } = this.props;

    application.onGoogleScriptLoaded = () => {
      new google.maps.Map(this.googleMap, {
        zoom: 15,    
        center: new google.maps.LatLng(39.9493, 116.3975),    
        mapTypeId: google.maps.MapTypeId.ROADMAP    
      });    
    }
  }

  getScrollRect = () => {
    const { 
      scrollTop: top,
      scrollHeight: height
    } = document.documentElement;

    return { top, height };
  }

  isEveryFieldsNull = () => {
    const { fields } = this.state;
    const keys = Object.getOwnPropertyNames(fields);

    if (keys.length === 0) {
      return true;
    }

    return !keys.some(key => fields[key]);
  }

  headerRender () {
    return (
      <Scene.Header>
        <div className="scene__page-header-title-wrap">
          <div className="scene__grid">
            <div className="scene__grid-inner">
              <div className="col-20 col-s-24">
                <h3 className="scene__page-header-title">Drop us a line</h3>
              </div>
            </div>
          </div>
        </div>
      </Scene.Header>
    );
  }

  fieldRender () {
    const { getFormInputList } = this.props;
    const { fields } = this.state;
    const inputList = getFormInputList();

    const inputElements = inputList.map(input => {
      const { key } = input;
      return (
        <li className="scene__form-item" key={key}>
          <div className="scene__form-unit">
            <input className="scene__input-text" value={fields[key]} {...input} onChange={(e) => this.onFormInputChange(key, e)} />
          </div>
        </li>
      );
    });

    console.log('fields', fields, !this.isEveryFieldsNull())

    const classes = classnames({
      'scene__form-button': true,
      'animated': true,
      'fadeInUp': !this.isEveryFieldsNull()
    });

    return (
      <div className="scene-contact__form">
        <div className="scene__form">
          <div className="scene__form-body">
            <ul className="scene__form-list">
              {inputElements} 
            </ul>
          </div>
          <div className="scene__form-footer">
            <button className={classes} type="button" onClick={this.onFormButtonClick}>
              <i className="scene-icon-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  socialRender () {
    const { getSocialList, getContactInfomation } = this.props;
    const social = getSocialList();
    const contactInformation = getContactInfomation();

    const socialElements = social.map(soc => {
      const { iconClassName, link, name } = soc;

      return (
        <a key={name} className="scene__page-footer-information-site-link" href={link}>
          <i className={iconClassName}></i>
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
  }

  footerRender () {
    const { getSocialList, getContactInfomation } = this.props;
    const social = getSocialList();
    const contactInformation = getContactInfomation();

    const socialElements = social.map(soc => {
      const { iconClassName, link, name } = soc;

      return (
        <a key={name} className="scene__page-footer-information-site-link" href={link}>
          <i className={iconClassName}></i>
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
          <h3 className="scene__page-footer-title">Visit us</h3>
          
          <div className="scene__page-footer-information">
            {infomationElements}

            <div className="scene__page-footer-information-site">
              {socialElements}
            </div>
          </div>
        </div>
      </Scene.Footer>
    );
  }

  googleMapRender () {
    return (
      <div className="scene-contact__map">
        <div className="scene-contact__map-inner" ref={ref => this.googleMap = ref}></div>
      </div>
    );
  }

  bodyRender () {
    return (
      <Scene.Body>
        {this.fieldRender()}
        {this.googleMapRender()}
      </Scene.Body>
    );
  }

  render () {

    return (
      <Scene waiting={this.waiting} name="contact">
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
      context => <Contact {...context} {...props} />
    }
  </Context.Consumer>
}