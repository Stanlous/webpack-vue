const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpacHotMiddleware = require('koa-webpack-hot-middleware')
const devConfig = require('../config/webpack/webpack.dev.js')
const open = require('opn')

module.exports = (app) => {
  // define `compiler` here!
  const compiler = webpack(devConfig)
  app.beforeStart(async () => {
    let opened = false
    compiler.hooks.done.tapAsync('nothing', (compiler, callback) => {
      if (opened) {
        return callback()
      }
      opened = true
      open(`http://localhost:${app.config.cluster.listen.port}`)
      callback()
    })
    app.use(webpackDevMiddleware(compiler, {
      publicPath: devConfig.output.publicPath
    }))
    app.use(webpacHotMiddleware(compiler))
  })
}