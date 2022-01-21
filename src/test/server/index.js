// dynamically export the server based on the environment

if (process.env.NODE_ENV === 'development') {
  // module.exports = require('./dev-server')
  module.exports = ''
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./test-server')
} else {
  module.exports = ''
}
