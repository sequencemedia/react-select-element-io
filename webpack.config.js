require('@babel/register')({
  ignore: [
    /node_modules/
  ]
})

const path = require('path')

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
  EnvironmentPlugin
} = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const modulePath = process.cwd()
const clientPath = path.resolve(modulePath, 'client')
const assetsPath = path.resolve(modulePath, 'public/assets')

module.exports = ({ NODE_ENV = 'production' } = process.env) => ({
  mode: NODE_ENV,
  entry: {
    app: path.resolve(clientPath, 'index.js')
  },
  output: {
    path: path.join(assetsPath, 'js'),
    filename: '[name].js'
  },
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: [
        path.join(assetsPath, 'js').concat('/*.js'),
        path.join(assetsPath, 'js').concat('/*.js.map')
      ]
    }),
    new EnvironmentPlugin({ NODE_ENV })
  ]
})
