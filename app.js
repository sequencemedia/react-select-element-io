require('module-alias/register')
require('@babel/register')

const debug = require('debug')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const Handlebars = require('handlebars')

const {
  renderToString
} = require('@sequencemedia/react-router-render')

const {
  default: config
} = require('react-select-element-io/server/config')

const {
  default: routes
} = require('react-select-element-io/client/routes')

const {
  env: {
    DEBUG = 'react-select-element-io'
  }
} = process

debug.enable(DEBUG)

const log = debug('react-select-element-io')

log('`react-select-element-io` is awake')

const modulePath = process.cwd()
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const assetsPath = path.resolve(publicPath, 'assets')

nconf
  .argv().env()
  .defaults(config)

async function start ({ host = 'localhost', port = 5000 } = {}) {
  const server = Hapi.server({ host, port })

  server.events.on('start', () => {
    const {
      info
    } = server

    log(info)
  })

  server.events.on('stop', () => {
    const {
      info
    } = server

    log(info)
  })

  await server.register([inert, vision])

  server.views({
    relativeTo: modulePath,
    path: path.join(serverPath, 'views'),
    engines: {
      html: {
        module: Handlebars,
        compileMode: 'sync',
        compileOptions: {
          isCached: true
        }
      }
    }
  })

  server.route([
    {
      method: 'GET',
      path: '/favicon.ico',
      handler (request, h) {
        return h.redirect('/assets/favicon.ico')
      }
    },
    {
      method: 'GET',
      path: '/assets/{path*}',
      handler: {
        directory: {
          path: path.normalize(assetsPath),
          listing: false,
          index: false
        }
      }
    }, {
      method: '*',
      path: '/',
      handler ({ url: { pathname = '/' } }, h) {
        return h.view('index', { app: renderToString({ location: pathname }, routes) })
      }
    }
  ])

  await server.start()
}

start(nconf.get('server'))
