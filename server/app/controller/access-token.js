const Controller = require('egg').Controller
const fs = require('fs-extra')
const config = require('../../../config/config')
const { DIST_ROOT } = config
// const entries = require(`${DIST_ROOT}/.entries.json`)

class templateController extends Controller {
  async index() {
    const { ctx } = this
    let template
    template = await renderTemplate(ctx.state.common.templateName)
    ctx.type = 'text/html'
    ctx.body = template
  }
}

module.exports = templateController

function renderTemplate(name) {
  const filepath = `${DIST_ROOT}/${entries[name]}`
  return fs
    .readFile(filepath)
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
    })
}