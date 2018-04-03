const config = require('../../config')
const { STATIC_ROOT } = config
const entries = require(`${STATIC_ROOT}/pages.js`)

const hasha = require('hasha')

module.exports = class Entries {
  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {

      const entry = {}
      Object.keys(entries).forEach((name) => {
        const reg = new RegExp(`^${name}.*?html$`)
        Object.keys(compilation.assets).forEach((filepath) => {
          reg.test(filepath) && (entry[`${name}.html`] = filepath)
        })
      })

      const entryStr = JSON.stringify(entry)
      compilation.assets['.entries.json'] = {
        source: function() {
          return entryStr
        },
        size: function() {
          return entryStr.length
        }
      }

      callback()
    })
    
  }
}






