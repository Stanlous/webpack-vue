const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const IS_PRODUCTION = process.env.NODE_ENV == 'production'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')
const vueConfig = require('./vue-loader.conf.js')
const { DIST_ROOT, STATIC_ROOT, PROJECT_ROOT, PUBLIC_PATH } = config


module.exports = {
  output: {
    path: DIST_ROOT,
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use ExtractTextPlugin only in production,
        // because ExtractTextPlugin will make HRM not working
        use: IS_PRODUCTION
          ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
            })
          : [
              'style-loader',
              'css-loader'
            ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   name: "commons",
        //   chunks: "initial",
        //   minChunks: 2
        // }
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin([DIST_ROOT], {
      root: PROJECT_ROOT
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],

  resolve: {
    // @import '~style.styl' bases on 'modules'
    modules: [
      STATIC_ROOT, 
      "node_modules"
    ],
    // use Vue's version includes 'runtime' and 'compiler'
    // if not use this version, Vue'll only contain 'runtime',
    // so option 'template' in .vue will not be compiled,
    // and there will be an error.
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  }
}










