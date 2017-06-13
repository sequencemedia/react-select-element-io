const path = require('path')

const modulePath = process.cwd()
const serverPath = path.resolve(modulePath, 'server')
const configPath = path.resolve(serverPath, 'config')
const config = require(path.join(configPath, 'gulp'))

const gulp = require('gulp')
const webpack = require('webpack-stream')
const server = require('gulp-develop-server')

gulp
  .task('default', ['webpack', 'watch', 'server', 'watch-server'], () => {
    console.log('[React Select Element]')
  })
  .task('webpack', () => (
    gulp.src([])
      .pipe(webpack(config.webpack.run))
      .pipe(gulp.dest(config.public.app))
  ))
  .task('watch', () => {
    gulp
      .watch(config.client.app, ['webpack'])
    gulp
      .watch(path.resolve(serverPath, 'views/**/*.*'), server.restart)
  })
  .task('server', () => {
    server.listen({ path: 'app' })
  })
  .task('watch-server', () => {
    gulp
      .watch(['app.js'], server.restart)
  })
