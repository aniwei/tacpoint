import React, { Component } from 'react';

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
          <div className={image.grid}>
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
        {this.props.children}
      </div>
    );
  }
}

class Swiper extends Component {
  render () {
    return null;
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
          return <Swiper key={index} />;
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