const COLORS = {
  BLACK: 'black',
  WHITE: 'white'
};

const TRANSITION_PROPERTY = {
  '1440': [{ 
    name: 'opacity',
    value: { from: 0, to: 1 }
  }],
  '1024': [{
    name: 'opacity',
    value: { from: 0, to: 1 }
  }],
  '768': [{
    name: 'transform',
    vvalue: { from: 80, to: 0 }
  }, {
    name: 'opacity',
    vvalue: { from: 0, to: 1 }
  }],
  '375': [{
    name: 'transform',
    value: { from: 80, to: 0 }
  }, {
    name: 'opacity',
    value: { from: 0, to: 1 }
  }],
}

const WIDTH_LIST = [
  375, 768, 1024, 1440
];

const GOOGLE_MAP_JS_URL = '//ditu.google.cn/maps/api/js?sensor=true&language=en';

const PROJECT_LAYOUT_TYPE = {
  IMAGE: 'image',
  TEXT: 'text',
  SWIPER: 'swiper'
}

export {
  PROJECT_LAYOUT_TYPE,
  COLORS,
  GOOGLE_MAP_JS_URL,
  TRANSITION_PROPERTY,
  WIDTH_LIST
};