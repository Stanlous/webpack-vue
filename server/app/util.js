module.exports.camelize = function(name) {
  if (typeof name !== 'string') {
    return ''
  }
  let arr = name.split('-')
  return arr
    .filter(Boolean)
    .map((el, index) => {
      if (index === 0) {
        return el
      }
      let temp = el.split('')
      temp[0] = temp[0].toUpperCase()
      return temp.join('')
    })
    .join('')
}

module.exports.r = (id) => {
  const exports_ = require(id)
  return !exports_ || !exports_.__esModule
    ? exports_
    : exports_.default
}

module.exports.fail = (message = 'fatal error.', code = 1) => {
  const error = message instanceof Error
    ? message
    : new Error(message)

  console.error(error.stack)
  process.exit(code)
}

