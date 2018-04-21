const webpack = require('webpack')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpacHotMiddleware = require('koa-webpack-hot-middleware')
const IS_PRODUCTION = process.env.NODE_ENV == 'production'
const devConfig = require('../config/webpack/webpack.dev.js')
const compiler = webpack(devConfig)

module.exports = app => {
  if (!IS_PRODUCTION) {
    app.beforeStart(async () => {
      app.use(webpackDevMiddleware(compiler, {
        publicPath: devConfig.output.publicPath
      }))
      app.use(webpacHotMiddleware(compiler))
    })
  }
}