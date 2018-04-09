
module.exports = () => {
  return async function (ctx, next) {
    ctx.state.common = {}
    return next()
  }
}