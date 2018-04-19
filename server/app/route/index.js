
module.exports = {
  // index
  'GET /': {
    middlewares: [
      // 'oauth'
    ],
    template: 'another.html'
  },

  // another
  'GET /another': {
    template: 'another.html'
  },

  // authorize
  'GET /authorize': {
    middlewares: [
      // 'oauth'
    ],
    template: 'index.html'
  },

  'POST /access_token': {
    controller: 'accessToken.index'
  }

}

