function setup(config) {
  config = config || require('fuse-test-runner').TestConfig;
  
  config.snapshotDir = 'src/tests/snapshots';
  config.snapshotExtension = 'json';

  var jsdom = require('jsdom').jsdom;

  global.document = jsdom('');
  global.window = document.defaultView;
  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js'
  };
}

module.exports = {
  setup
}