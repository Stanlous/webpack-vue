const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { getEntries, isArray } = require('../util')
const { DIST_ROOT, STATIC_ROOT } = require('../config')
const entry = getEntries({ 
  production: false 
})

// enble HMR
Object.keys(entry).forEach((name) => {
  let value = entry[name]
  if (typeof value === 'string') {
    entry[name] = [value, hotMiddlewareScript]
  }
  if (isArray(value)) {
    entry[name] = value.concat(hotMiddlewareScript)
  }
})


const devConfig = {
  entry,
  output: {
    filename: '[name].js',
  },
  mode: 'development',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true
  // },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...htmlPlugin()
  ]
}

module.exports = merge(common, devConfig)


function htmlPlugin() {
  return Object.keys(entry).map((name) => {
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: ['vendor', name],
      inject: true,
      template: `${STATIC_ROOT}/base.html`
    })
  })
}
