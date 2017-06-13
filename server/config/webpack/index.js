const path = require('path')
const webpack = require('webpack')

const modulePath = process.cwd()
const clientPath = path.resolve(modulePath, 'client')
const assetsPath = path.resolve(modulePath, 'public/assets')

const {
  NODE_ENV
} = process.env

module.exports = {
  context: modulePath,
  devtool: 'source-map',
  entry: {
    index: [
      path.resolve(clientPath, 'src/app.js')
    ]
  },
  output: {
    path: path.join(assetsPath, 'js/app'),
    filename: '[name].js',
    publicPath: path.join(assetsPath, 'js/app')
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV || 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      comments: false,
      sourceMap: true,
      compress: {
        warnings: NODE_ENV !== 'production'
      }
    })
  ]
}
