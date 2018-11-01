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
    value: { from: '80', to: 0 }
  }, {
    name: 'opacity',
    value: { from: '0', to: 1 }
  }],
  '375': [{
    name: 'transform',
    value: { from: '80', to: 0 }
  }, {
    name: 'opacity',
    value: { from: '0', to: 1 }
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
  { name: 'facebook', link: '', iconClassName: 'fb' },
  { name: 'twitter', link: '', iconClassName: 'tw' },
  { name: 'in', link: '', iconClassName: 'in' },
  { name: 'instagram', link: '', iconClassName: 'ig' }
];

const CONTACT_INFORMATION = [
  { key: 'address', value: '577 Airport Blvd, Suite 160, Burlingame, CA 94010' },
  { key: 'email', value: 'hello@tacpoint.com' },
  { key: 'phoneNumber', value: '650.577.3140' }
];

const FORM_INPUT_LIST = [
  { key: 'name', placeholder: 'name', type: 'text' },
  { key: 'email', placeholder: 'email', type: 'text' },
  { key: 'message', placeholder: 'message', type: 'text' }
];

const ABOUT_SWIPER_LIST = [
  { url: 'http://127.0.0.1:8080/static/image/img-about-office.jpg', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/img-about-office.jpg', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/img-about-office.jpg', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/img-about-office.jpg', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/img-about-office.jpg', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/img-about-office.jpg', alt: '' }
];

const CLIENT_IMAGES = [
  { url: 'http://127.0.0.1:8080/static/image/clients/client-0.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-1.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-2.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-3.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-4.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-5.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-6.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-7.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-8.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-9.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-10.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-11.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-12.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-13.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-14.png', alt: '' },
  { url: 'http://127.0.0.1:8080/static/image/clients/client-15.png', alt: '' },
];

const PARTNER_LIST = CLIENT_IMAGES;

const ABOUT_SWIPER_OPTIONS = {
  speed: 400,
  auto: 3000,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
};

const PROJECT_SWIPER_OPTIONS = {
  slidesPerView: 'auto',
  centeredSlides: true,
  slideActiveClass: 'scene__carousel-item_active',
  loop: true,
  autoplay: true
};

export {
  PROJECT_SWIPER_OPTIONS,
  ABOUT_SWIPER_OPTIONS,
  ABOUT_SWIPER_LIST,
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