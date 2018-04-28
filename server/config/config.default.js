const path = require('path')
const config = require('../../config/config')
const { DIST_ROOT, PUBLIC_PATH } = config

module.exports = {
  middleware: ['commonHeader'], 
  keys: '123', //-----TODO
  // ACTION_ROOT: path.join(__dirname, '../app/action'),

  // egg-static: static server
  static: { 
    prefix: PUBLIC_PATH,
    dir: DIST_ROOT
  },
  
  // egg-error
  error: {
    client: {} // tell egg to add one `egg-error` instanse
  }
}