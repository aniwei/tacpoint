import React, { Component } from 'react';

import { PROJECT_LAYOUT_TYPE } from '../../contants';

class Image extends Component {
  imageRender () {
    const { images } = this.props;

    return images.map((image, index) => {
      const imageElement = (
        <div className="scene-detail__object" key={index}>
          <img 
            className="scene-detail__image" 
            src={image.url}
          />
        </div>
      );

      if (image.grid) {
        return (
          <div className="scene__grid">
            <div className="scene__grid-inner">
              <div className={image.grid}>
                {imageElement}
              </div>
            </div>
          </div>
        );
      } 

      return imageElement;
    });
  }

  render () {
    return this.imageRender();
  }
}

class Text extends Component {
  render () {
    return this.props.children;
  }
}

class Swiper extends Component {

}

export default class Article extends Component {
  static Image = Image;
  static Text = Text;
  static Swiper = Swiper;

  layoutRender () {
    const { layout } = this.props;

    return layout.map(({ type, data }, index) => {
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
  }

  render () {
    return this.layoutRender();
  }
}