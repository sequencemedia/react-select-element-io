require('@babel/register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const hogan = require('hapi-hogan')

const modulePath = process.cwd()
const clientPath = path.resolve(modulePath, 'client')
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const configPath = path.resolve(serverPath, 'config')
const assetsPath = path.resolve(publicPath, 'assets')

const config = require(configPath)()

const {
  good
} = require(path.join(configPath, 'good'))

const {
  Renderer
} = require('react-routes-renderer')

const {
  Routes
} = require(path.join(clientPath, 'app/components'))

nconf
  .argv().env()
  .defaults(config)

const server = Hapi.server(nconf.get('server'))

async function start () {
  await server.register([good, inert, vision])

  const renderer = new Renderer()

  server.views({
    relativeTo: modulePath,
    path: path.join(serverPath, 'views'),
    engines: {
      html: {
        module: hogan,
        compileMode: 'sync',
        compileOptions: {
          isCached: true
        }
      }
    }
  })

  server.route([
    {
      method: '*',
      path: '/',
      handler: (request, h) => (
        renderer.render(Routes, '/')
          .then(({ rendered: app }) => h.view('index', { app }))
          .catch(() => Boom.badImplementation())
      )
    },
    {
      path: '/assets/{path*}',
      method: 'GET',
      handler: {
        directory: {
          path: path.normalize(assetsPath),
          listing: false,
          index: false
        }
      }
    }
  ])

  await server.start()

  console.log(`\nreact-select-element-io [${server.info.uri}]\n`)
}

start()
