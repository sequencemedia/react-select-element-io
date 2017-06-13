require('babel-register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('hapi')
const Boom = require('boom')

const inert = require('inert')
const vision = require('vision')
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
} = require(path.resolve(clientPath, 'app/components'))

const server = new Hapi.Server()

const renderer = new Renderer()

nconf.argv().env().defaults(config)

server.connection(nconf.get('server:connection'))

server.register([good, inert, vision], (e) => {
  if (e) throw e

  server.views({
    relativeTo: modulePath,
    path: path.resolve(serverPath, 'views'),
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

  server.route({
    method: '*',
    path: '/',
    config: {
      handler: ({ url: { path } }, reply) => {
        renderer.render(Routes, path)
          .then(({ rendered: react }) => {
            reply.view('index', { title: 'React Select Element', react })
          })
          .catch(reply)
      }
    }
  })
  server.route({
    path: '/assets/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: path.normalize(assetsPath),
        listing: false,
        index: false
      }
    }
  })
})

server.start(() => {
  server.log('info', `[React.Select.Element] ${server.info.uri}`)
})
