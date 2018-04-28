const egg = require('egg')
const port = process.env.SERVER_PORT || 10010

const workers = Number(process.argv[2] || require('os').cpus().length)
egg.startCluster({
  port,
  workers,
  baseDir: __dirname,
})