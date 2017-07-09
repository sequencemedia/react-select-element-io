const path = require('path')

const modulePath = process.cwd()
const clientPath = path.resolve(modulePath, 'client')
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const configPath = path.resolve(serverPath, 'config')

module.exports = {
  public: {
    app: path.join(publicPath, 'assets/js/app')
  },
  client: {
    app: [
      path.join(clientPath, '**/*.js'),
      path.join(modulePath, 'node_modules/react-select-element/**/*.js')
    ]
  },
  webpack: {
    run: require(path.resolve(configPath, 'webpack'))
  }
}
