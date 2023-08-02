const debug = require('debug')

const log = debug('react-select-element-io')

log('`react-select-element-io` is awake')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env', {
      targets: {
        node: 'current',
        browsers: [
          'last 2 versions'
        ]
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ],
  [
    '@babel/react',
    {
      runtime: 'automatic'
    }
  ]
]

const plugins = [
  [
    'minify-dead-code-elimination',
    {
      optimizeRawSize: true
    }
  ]
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets,
    plugins
  }
}
