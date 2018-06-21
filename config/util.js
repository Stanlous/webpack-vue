const config = require('./config.js')
const { STATIC_ROOT, DIST_ROOT } = config
const devPages = require(`${STATIC_ROOT}/pages-dev.js`)
const pages = require(`${STATIC_ROOT}/pages.js`)
const testPages = require(`${STATIC_ROOT}/pages-test.js`)
const code = require('code-stringify')
const webpack = require('webpack');

exports.getEntries = ({ production }) => {
  return addBabelPolyfill(exports.entries({ production }))
}

exports.entries = ({ production }) => {
  if (production) {
    return distEntries(pages)
  }
  if (!isArray(devPages)) {
    return fail('exports in pages-dev.js must be an Array')
  }
  // key in pages and testPages should not be the same
  Object.keys(pages).some((key) => {
    if (key in testPages) {
      return fail(`pages.js and pages-test.js should not have the same key "${key}"`)
    }
  })
  let allEntries = Object.assign({}, pages, testPages)
  let entries = {}
  if (devPages.length) {
    devPages.forEach((key) => {
      entries[key] = allEntries[key]
    })
  } else {
    entries = allEntries
  }
  return distEntries(entries)

  function distEntries(e) {
    let entry = {}
    Object.keys(e).forEach((name) => {
      let val = e[name]
      if (isArray(val)) {
        entry[name] = val.map((path) => {
          return `${STATIC_ROOT}/${path}`
        })
      }
      if (isString(val)) {
        entry[name] = [`${STATIC_ROOT}/${val}`]
      }
    })
    return entry
  }
}

exports.isArray = isArray

exports.fail = fail

exports.envPlugin = (env) => {
  const merged = {}
  Object.keys(env).forEach(key => {
    // Use `process.env` prior to `env`
    const value = process.env[key] || env[key]
    merged[key] = code(value)
  })
  return new webpack.DefinePlugin({
    'process.env': merged
  }) 
}

function addBabelPolyfill (entries) {
  Object.keys(entries).forEach((name) => {
    entries[name].unshift('babel-polyfill')
  })
  return entries
}

function fail(message) {
  message && console.error(message);
  process.exit(1)
}

function isString (s) {
  return typeof s === 'string'
}

function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]'
}