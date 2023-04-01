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
    'module-resolver', {
      root: ['.'],
      cwd: 'babelrc',
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
