const errors = {
  'ERR_IO': (err) => {
    const error = new Error()
    error.message = err.message
    error.code = 'ERR_IO'
    return error
  }
}

function log(err, ctx, app) {
  try {
    ctx.logger.error(err);
  } catch (e) {
    app.logger.error(err);
    app.logger.error(e);
  }
}

function logError(config, app) {
  const ctx = app.createAnonymousContext()
  return (type, err) => {
    try {
      log(errors[type](err), ctx, app)
    } catch(e) {
      log(e, ctx, app)
    }
  }
}

module.exports = (app) => {
  app.addSingleton('error', logError)
}