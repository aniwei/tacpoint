import React, { Component } from 'react';
import ReactSwiper from 'react-id-swiper';
import classnames from 'classnames';

import { PROJECT_LAYOUT_TYPE } from '../../contants';

class Image extends Component {
  imageRender () {
    const { images } = this.props;

    return images.map((image, index) => {
      const element = image.xs ? 
        (
          <picture>
            <source media="(max-width: 600px)" srcset={image.xs} />
            <img 
              className="scene-detail__image" 
              src={image.url}
            />
          </picture>
        ) : (
          <img 
            className="scene-detail__image" 
            src={image.url}
          />
        );

      const imageElement = (
        <div className="scene-detail__object" key={index}>
         {element} 
        </div>
      );

      if (image.grid) {
        return (
          <div className={image.grid} key={index}>
            {imageElement}
          </div>
        );
      } 

      return imageElement;
    });
  }

  render () {
    return (
      <div className="scene-detail__box">
        <div className="scene__grid">
          <div className="scene__grid-inner">
            {this.imageRender()}
          </div>
        </div>
      </div>
    );
  }
}

class Text extends Component {
  render () {
    return (
      <div className="scene-detail__box">
        {/* {this.props.children} */}
      </div>
    );
  }
}

class Swiper extends Component {
  state = {
    swipeIndex: 0
  }

  style = {
    container: {
      overflow: 'auto'
    }
  }

  componentDidMount () {

  }

  onTransitionEnd = (swipeIndex, element) => {
    const { onTransitionEnd } = this.props;

    if (typeof onTransitionEnd === 'function') {
      onTransitionEnd(swipeIndex, element);
    }

    this.setState({
      swipeIndex
    });
  }

  render () {
    const { swipeIndex } = this.state;
    const { swipes, options } = this.props;
    const { onTransitionEnd } = this;

    options.on = {
      transitionEnd: function () {
        onTransitionEnd(this.realIndex);
      }
    }

    const orderElements = [];
    const swipeElements = swipes.map((swipe, index) => {
      const { url, alt } = swipe;
      const classes = classnames({
        'scene__carousel-order-num': true,
        'scene__carousel-order_active': swipeIndex === index
      });
      orderElements.push(
        <span className={classes}>
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      );

      return (
          <div 
            key={index}
            className={classnames({
              'scene__carousel-item': true,
              'scene__carousel-item_active': index === swipeIndex
            })} 
          >
            <div className="scene__carousel-item-inner">
              <div className="scene-detail__object">
                <img 
                  className="scene-detail__image" 
                  src={url} 
                  alt={alt}
                />
              </div>
            </div>
        </div>
      );
    });

    return (
      <div className="scene-detail__box">
        <div className="scene__carousel">
          <div className="scene__carousel-inner">
            <div className="scene__carousel-slider">
              <ReactSwiper {...options}>
                {swipeElements}
              </ReactSwiper>
            </div>

            <div className="scene__carousel-order">
              {orderElements}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default class Article extends Component {
  static Image = Image;
  static Text = Text;
  static Swiper = Swiper;

  layoutRender () {
    const { layout } = this.props;
    const layoutElements = layout.map(({ type, data }, index) => {
      switch (type) {
        case PROJECT_LAYOUT_TYPE.IMAGE:
          return <Image images={data} key={index} />;
          break;

        case PROJECT_LAYOUT_TYPE.TEXT:
          return <Text key={index}>{data}</Text>;
          break;

        case PROJECT_LAYOUT_TYPE.SWIPER:
          return <Swiper options={this.props.swipeOptions} swipes={data} key={index}  />;
          break;
      }
    });

    return layoutElements;
  }

  render () {
    return (
      <div className="scene-detail__box">
        {this.layoutRender()}
      </div>
    );
  }
}