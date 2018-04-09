const path = require('path')
const config = require('../../config/config')
const { DIST_ROOT } = config

module.exports = {
  middleware: ['commonHeader'],
  keys: '123', //-----TODO
  // ACTION_ROOT: path.join(__dirname, '../app/action'),

  // egg-static: static server
  static: {
    prefix: '/app',
    dir: DIST_ROOT
  }
}