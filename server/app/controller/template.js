const Controller = require('egg').Controller
const fs = require('fs-extra')
const config = require('../../../config/config')
const { DIST_ROOT } = config
// const entries = require(`${DIST_ROOT}/.entries.json`)

class TemplateController extends Controller {
  async index() {
    const { ctx } = this
    let template
    template = await renderTemplate.call(this, ctx.state.common.templateName)
    ctx.type = 'text/html'
    ctx.body = template
  }
}

module.exports = TemplateController

function renderTemplate(name) {
  const filepath = process.env.NODE_ENV == 'production'
    ? `${DIST_ROOT}/${require(`${DIST_ROOT}/.entries.json`)[name]}`
    : `${DIST_ROOT}/${name}`
  return fs
    .readFile(filepath)
    .then((data) => {
      return data
    })
    .catch((err) => {
      this.app.error('ERR_IO', err)
    })
}