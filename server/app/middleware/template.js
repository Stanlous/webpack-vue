module.exports = (template) => {
  return async (ctx, next) => {
    ctx.state.common.templateName = template
    return next()
  }
}