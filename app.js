require('@babel/register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const Handlebars = require('handlebars')

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
  renderToString
} = require('@sequencemedia/react-router-render')

const {
  default: routes
} = require(path.join(clientPath, 'app/components/routes'))

nconf
  .argv().env()
  .defaults(config)

async function start ({ host = 'localhost', port = 5000 }) {
  const server = Hapi.server({ host, port })

  const handler = ({ url: { pathname = '/' } }, h) => h.view('index', { app: renderToString({ location: pathname }, routes) })

  await server.register([good, inert, vision])

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
      path: '/assets/{path*}',
      method: 'GET',
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
      handler
    }
  ])

  await server.start()

  console.log(`\nreact-select-element-io [${server.info.uri}]\n`)
}

start(nconf.get('server'))
