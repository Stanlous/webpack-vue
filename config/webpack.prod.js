const path = require('path');
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { getEntries } = require('./util')
const { DIST_ROOT, STATIC_ROOT } = require('./config')
const entry = getEntries({
  production: true
})

const prodConfig = {
  entry,
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash].js',
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin({
      filename: `css/[name].css`
    }),
    ...htmlPlugin()
  ]
}

module.exports = merge(common, prodConfig)



function htmlPlugin() {
  return Object.keys(entry).map((name) => {
    return new HtmlWebpackPlugin({
      filename: `${DIST_ROOT}/${name}.html`,
      chunks: ['vendor', name],
      inject: true,
      template: `${STATIC_ROOT}/base.html`
    })
  })
}