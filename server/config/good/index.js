const Good = require('@hapi/good')

export const good = {
  plugin: Good,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              response: '*'
            }
          ]
        }, {
          module: '@hapi/good-console'
        },
        'stdout'
      ]
    }
  }
}
