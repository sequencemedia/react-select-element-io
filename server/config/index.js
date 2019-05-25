
module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        server: {
          host: 'localhost',
          port: process.env.PORT
        }
      }
    default:
      return {
        server: {
          host: 'localhost',
          port: 5000
        }
      }
  }
}
