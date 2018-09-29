const COLORS = {
  BLACK: 'black',
  WHITE: 'white'
};

const TRANSITION_PROPERTY = {
  '1440': [{ 
    name: 'opacity',
    value: {
      from: 0,
      to: 1
    }
  }],
  '1024': [{
    name: 'opacity',
    value: {
      from: 0,
      to: 1
    }
  }],
  '768': [{
    name: 'transform',
    value: {
      from: 80,
      to: 0
    }
  }, {
    name: 'opacity',
    value: {
      from: 0,
      to: 1
    }
  }],
  '375': [{
    name: 'transform',
    value: {
      from: 80,
      to: 0
    }
  }, {
    name: 'opacity',
    value: {
      from: 0,
      to: 1
    }
  }],
}

const WIDTH_LIST = [
  375, 768, 1024, 1440
];

export {
  COLORS,
  TRANSITION_PROPERTY,
  WIDTH_LIST
};