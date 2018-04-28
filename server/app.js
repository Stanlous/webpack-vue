const IS_PRODUCTION = process.env.NODE_ENV == 'production'

/** 
*   Don't define `compiler` here
*   because if you run `NODE_ENV=production pm2 start server/server.js`
*   `compiler` will run and start compiling!!!
**/ 
// const compiler = webpack(devConfig) 

module.exports = app => {
  if (!IS_PRODUCTION) {
    const attachDevServer = require('../builder/dev-server.js')
    attachDevServer(app)
  }
}