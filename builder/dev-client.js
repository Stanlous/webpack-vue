// for IE and other browsers whick do not support eventsource
require('eventsource-polyfill')
const hotClient = require('webpack-hot-middleware/client?reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
