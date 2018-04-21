const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const IS_PRODUCTION = process.env.NODE_ENV == 'production'

console.log('IS_PRODUCTION:', IS_PRODUCTION)

const app = express();
const devConfig = require('./config/webpack/webpack.dev.js')
const prodConfig = require('./config/webpack/webpack.prod.js')
const config = IS_PRODUCTION ? prodConfig : devConfig
const compiler = webpack(config)

if (IS_PRODUCTION) {
  return compiler.run((err, stats) => {
    if (err) {
      fail(err.stack || err)
      if (err.details) {
        fail(err.details)
      }
      return
    }
    const info = stats.toJson();

    if (stats.hasErrors()) {
      fail(info.errors);
      return
    }

  })
}

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
  writeToDisk: (filepath) => {
    console.log(filepath)
    return false
    return !/\.json$/.test(filepath)
  }
}))

app.use(webpackHotMiddleware(compiler))

app.listen(3001, function () {
  console.log('Example app listening on port 3001!\n');
});


function fail(err) {
  // FriendlyErrorsWebpackPlugin has handled and logged errors,
  // so it's not necessary to log errors again, just exit process.

  // console.error(err)
  process.exit(1)
}
