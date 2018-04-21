const path = require('path')

module.exports = {
  STATIC_ROOT: path.join(__dirname, '../static'),
  DIST_ROOT: path.join(__dirname, '../public'),
  PROJECT_ROOT: path.join(__dirname, '..'),
  // without the last slash '/', in css the url will be 
  // background: url('/public741162362826a6f50df76d67292a2ffa.png')
  PUBLIC_PATH: '/public/' 
}