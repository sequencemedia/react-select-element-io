const Good = require('good')

export const good = {
  register: Good,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              response: '*'
            }
          ]
        }, {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
}
