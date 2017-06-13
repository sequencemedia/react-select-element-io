
module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        server: {
          connection: {
            host: 'localhost',
            port: process.env.PORT
          }
        }
      }
    default:
      return {
        server: {
          connection: {
            host: 'localhost',
            port: 5000
          }
        }
      }
  }
}
