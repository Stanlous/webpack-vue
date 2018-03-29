const IS_PRODUCTION = process.env.NODE_ENV == 'production'
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  loaders: {
    stylus: IS_PRODUCTION
    ? ExtractTextPlugin.extract({
        use: 'css-loader!stylus-loader',
        fallback: 'vue-style-loader' 
      })
    : 'vue-style-loader!css-loader!stylus-loader',
  },
}