const routes = require('./route')
const { camelize, r, fail } = require('./util.js')
const STR_GET = 'get'
const KEY_MIDDLEWARE_NAME = Symbol('kails:middleware-name')
const path = require('path')

module.exports = app => {
  const { router } = app
  Object.keys(routes).forEach((location) => {
    const [method, pathname] = splitLocation(location)
    let {
      middlewares = [],
      action,
      template,
      controller
    } = routes[location]

    if (!template && !controller) {
      fail(`template or controller is required for "${location}"`)
    }
    middlewares = getRawMiddlewares(middlewares, app)
    if (action) {
      middlewares.push(actionMiddleware(action, app.config.ACTION_ROOT))
    }
    if (template) {
      middlewares.push(app.middleware.template(template))
    }

    let controllerName, controllerMethod;
    if (template) {
      controllerName = 'template'
      controllerMethod = 'index'
    } else {
      [controllerName, controllerMethod] = controller.split('.').map(x => x.trim())
    }

    generateRouter(app, method, pathname, middlewares, controllerName, controllerMethod)
  })
}

function generateRouter (app, method, pathname, middlewares, controllerName, controllerMethod) {
  app.router[method](pathname, ...middlewares, app.controller[controllerName][controllerMethod])
}

function actionMiddleware (action, actionRoot) {
  return async (ctx, next) => {
    action = getRawAction(action, actionRoot)
    let data
    try {
      data = await action.call(ctx, ctx)
      ctx.state.common.actionData = data
    } catch(e) {
      //---------TODO
      this.app.emit('error', e)
    }
    return next()
  }
}

function getRawMiddlewares (middlewares, app) {
  return middlewares.map((name) => {
    let mid = app.middlewares[camelize(name)]
    if (!mid) {
      fail(`Middleware '${name}' not exists.`)
    }
    return typeof mid === 'function'
      ? mid()
      : mid.default()
  })
}


function getRawAction (id, actionRoot) {
  if (typeof id === 'function') {
    return id
  }
  const [paths, m] = id.split('.')
  const filename = path.join(
    actionRoot,
    ...paths.split('/'))

  let action

  try {
    action = r(filename)
  } catch (e) {
    fail(e)
  }

  const handler = action
    ? m
      ? action[m]
      : action
    : null

  if (typeof handler !== 'function') {
    fail(`Action "${id}" is should be a function.`)
  }

  handler[KEY_MIDDLEWARE_NAME] = id

  return handler
}

function splitLocation (location) {
  let [
    method,
    pathname
  ] = location.split(' ').map(x => x.trim())

  if (!pathname) {
    pathname = method
    return [STR_GET, pathname]
  }

  return [method.toLowerCase(), pathname]
}