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
  '@babel/proposal-export-default-from',
  '@babel/proposal-export-namespace-from',
  [
    '@babel/proposal-class-properties',
    {
      loose: false
    }
  ],
  [
    'minify-dead-code-elimination',
    {
      optimizeRawSize: true
    }
  ],
  [
    'module-resolver', {
      alias: {
        'react-select-element-io': './'
      }
    }
  ]
]

module.exports = {
  presets,
  plugins
}
