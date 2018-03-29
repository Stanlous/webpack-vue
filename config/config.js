const path = require('path')

module.exports = {
  STATIC_ROOT: path.join(__dirname, '../static'),
  DIST_ROOT: path.join(__dirname, '../public'),
  PROJECT_ROOT: path.join(__dirname, '..')
}