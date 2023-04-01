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

const clientPath = path.resolve('./client')
const assetsPath = path.resolve('./public/assets/js')

const {
  env: {
    NODE_ENV = 'production'
  } = {}
} = process

module.exports = (env, { mode = NODE_ENV } = {}) => ({
  mode,
  entry: {
    app: {
      import: [
        path.join(clientPath, 'index.js')
      ],
      dependOn: [
        'vendors'
      ]
    },
    vendors: [
      'react',
      'react-dom',
      'prop-types',
      'react-router',
      'react-router-dom'
    ]
  },
  output: {
    path: assetsPath,
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
        path.join(assetsPath, '*.js'),
        path.join(assetsPath, '*.js.map')
      ]
    }),
    new EnvironmentPlugin({ NODE_ENV }),
    new SourceMapDevToolPlugin({ filename: '[name].js.map' })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  },
  experiments: {
    backCompat: false
  }
})
