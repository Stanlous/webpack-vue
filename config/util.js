const config = require('./config.js')
const { STATIC_ROOT, DIST_ROOT } = config
const devPages = require(`${STATIC_ROOT}/pages-dev.js`)
const pages = require(`${STATIC_ROOT}/pages.js`)
const testPages = require(`${STATIC_ROOT}/pages-test.js`)

exports.getEntries = ({ production }) => {
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
      entry[name] = `${STATIC_ROOT}/${e[name]}`
    })
    return entry
  }
}

exports.isArray = isArray

exports.fail = fail


function fail(message) {
  message && console.error(message);
  process.exit(1)
}

function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]'
}