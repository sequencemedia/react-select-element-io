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
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const modulePath = process.cwd()
const clientPath = path.resolve(modulePath, 'client')
const assetsPath = path.resolve(modulePath, 'public/assets/js')

module.exports = ({ NODE_ENV = 'production' } = process.env) => ({
  mode: NODE_ENV,
  entry: {
    app: path.resolve(clientPath, 'index.js')
  },
  output: {
    path: path.join(assetsPath),
    filename: '[name].js'
  },
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: [
        path.join(assetsPath).concat('/*.js'),
        path.join(assetsPath).concat('/*.js.map')
      ]
    }),
    new EnvironmentPlugin({ NODE_ENV }),
    new SourceMapDevToolPlugin({ filename: '[name].js.map' })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  },
  experiments: {
    backCompat: false
  }
})
