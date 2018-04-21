const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpacHotMiddleware = require('koa-webpack-hot-middleware')
const IS_PRODUCTION = process.env.NODE_ENV == 'production'
const devConfig = require('../config/webpack/webpack.dev.js')
const compiler = webpack(devConfig)
const open = require('opn')


module.exports = app => {
  if (!IS_PRODUCTION) {
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
}