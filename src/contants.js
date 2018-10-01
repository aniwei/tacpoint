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
    value: { from: 80, to: 0 }
  }, {
    name: 'opacity',
    value: { from: 0, to: 1 }
  }],
  '375': [{
    name: 'transform',
    value: { from: 80, to: 0 }
  }, {
    name: 'opacity',
    value: { from: 0, to: 1 }
  }],
}

const IS_MOBILE = {
  '1440': 'PC',
  '1024': 'PC',
  '768': 'MOBILE',
  '375': 'MOBILE',
};

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
  IS_MOBILE,
  PROJECT_LAYOUT_TYPE,
  COLORS,
  GOOGLE_MAP_JS_URL,
  TRANSITION_PROPERTY,
  WIDTH_LIST
};