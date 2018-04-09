const routes = require('./routes.js')
const { camelize, r, fail } = require('./util.js')
const STR_GET = 'get'
const KEY_MIDDLEWARE_NAME = Symbol('kails:middleware-name')
const path = require('path')

module.exports = app => {
  const { router, controller } = app
  Object.keys(routes).forEach((location) => {
    const [method, pathname] = splitLocation(location)
    const el = routes[location]
    let {
      middlewares = [],
      action,
      template
    } = el

    if (!template && !action) {
      fail(`template or action is required for "${location}"`)
    }

    middlewares = getRawMiddlewares(middlewares, app)
    
    // What an ugly code written by myself! Any idea to make it better?
    if (action && template) {
      return applyActionTemplate(app, method, pathname, middlewares, action, template)
    }
    if (action) {
      return applyAction(app, method, pathname, middlewares, action)
    }
    if (template) {
      return applyTemplate(app, method, pathname, middlewares, template)
    }

  })
}

function applyAction (app, method, pathname, middlewares, action) {
  middlewares.push(actionMiddleware(action, app.config.ACTION_ROOT))
  app.router[method](pathname, ...middlewares, app.controller.action.index)
}

function applyActionTemplate (app, method, pathname, middlewares, action, template) {
  middlewares.push(actionMiddleware(action, app.config.ACTION_ROOT))
  applyTemplate(app, method, pathname, middlewares, template)
}

function applyTemplate (app, method, pathname, middlewares, template) {
  middlewares.push(templateMiddleware(template))
  app.router.get(pathname, ...middlewares, app.controller.template.index)
}

function templateMiddleware (template) {
  return async (ctx, next) => {
    ctx.state.common.templateName = template
    await next()
  }
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
    await next()
  }
}

function getRawMiddlewares (middlewares, app) {
  return middlewares.map((name) => {
    let mid = app.middlewares[camelize(name)]
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