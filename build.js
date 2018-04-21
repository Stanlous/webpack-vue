const webpack = require('webpack')
const IS_PRODUCTION = process.env.NODE_ENV == 'production'
console.log('IS_PRODUCTION:', IS_PRODUCTION)

const prodConfig = require('./config/webpack/webpack.prod.js')
const compiler = webpack(prodConfig)

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

function fail(err) {
  // FriendlyErrorsWebpackPlugin has handled and logged errors,
  // so it's not necessary to log errors again, just exit process.

  // console.error(err)
  process.exit(1)
}
