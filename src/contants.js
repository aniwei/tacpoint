// colors
const COLORS = {
  BLACK: 'black',
  WHITE: 'white'
};

// scene animation
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

// google map script url
const GOOGLE_MAP_JS_URL = '//ditu.google.cn/maps/api/js?sensor=true&language=en';

// project supports type
const PROJECT_LAYOUT_TYPE = {
  IMAGE: 'image',
  TEXT: 'text',
  SWIPER: 'swiper'
};

const SOCIAL_LIST = [
  { name: 'facebook', link: '', iconClassName: 'scene-icon-black-fb' },
  { name: 'twitter', link: '', iconClassName: 'scene-icon-black-tw' },
  { name: 'in', link: '', iconClassName: 'scene-icon-black-in' },
  { name: 'instagram', link: '', iconClassName: 'scene-icon-black-ig' }
];

const CONTACT_INFORMATION = [
  { key: 'address', value: '577 Airport Blvd, Suite 160, Burlingame, CA 94010' },
  { key: 'email', value: 'hello@tacpoint.com' },
  { key: 'phoneNumber', value: '650.577.3140' }
];

const PARTNER_LIST = [
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' }
];


const FORM_INPUT_LIST = [
  { key: 'name', placeholder: 'name', type: 'text' },
  { key: 'email', placeholder: 'email', type: 'text' },
  { key: 'message', placeholder: 'message', type: 'text' }
];

export {
  FORM_INPUT_LIST,
  PARTNER_LIST,
  CONTACT_INFORMATION,
  SOCIAL_LIST,
  IS_MOBILE,
  PROJECT_LAYOUT_TYPE,
  COLORS,
  GOOGLE_MAP_JS_URL,
  TRANSITION_PROPERTY,
  WIDTH_LIST
};