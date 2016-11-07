// Look in `./config` folder for `webpack.*.config.js`
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./client/config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./client/config/webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./client/config/webpack.dev');
}
