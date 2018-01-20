if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod.config.js');
} else {
  module.exports = require('./dev.config.js');
}
