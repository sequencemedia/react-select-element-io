
const {
  env: {
    NODE_ENV = 'development',
    PORT = 5000
  }
} = process

export default {
  server: {
    host: 'localhost',
    port: (
      NODE_ENV === 'production'
        ? PORT
        : 5000
    )
  }
}
