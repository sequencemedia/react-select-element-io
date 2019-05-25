const path = require('path')

const modulePath = process.cwd()
const clientPath = path.resolve(modulePath, 'client')
const serverPath = path.resolve(modulePath, 'server')
const appPath = path.resolve('./app.js')

const gulp = require('gulp')
const server = require('gulp-develop-server')

gulp
  .task('watch', () => gulp.watch([
    clientPath.concat('/**/*'),
    serverPath.concat('/**/*'),
    appPath
  ], { name: 'watch' }, (next) => {
    server.restart()

    return next()
  }))

gulp
  .task('server', (next) => {
    server.listen({ path: appPath })

    return next()
  })

gulp
  .task('default', gulp.parallel('watch', 'server'))
