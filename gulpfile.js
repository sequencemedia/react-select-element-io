/* eslint-disable */

var path = require('path'),
	srcPath = path.resolve(__dirname, 'client/src'),
	serverPath = path.resolve(__dirname, 'server'),
	assetsPath = path.resolve(__dirname, 'public/assets'),
	config = require(path.resolve(serverPath, 'config/gulp')),
	gulp = require('gulp'),
	webpack = require('webpack-stream'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	server = require('gulp-develop-server'),
	sourcemaps = require('gulp-sourcemaps');

gulp
	.task('default', ['css', 'webpack', 'uglify', 'watch', 'server', 'watch-server'], function () {
		console.log('[React Select Element]');
	})
	.task('css', function() {
		return gulp.src(path.resolve(srcPath, 'css/**/*.css'))
			.pipe(sourcemaps.init())
			.pipe(uglifycss())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(path.resolve(assetsPath, 'css')));
	})
	.task('webpack', function () {
		return gulp.src([])
			.pipe(webpack(config.webpack.run))
			.pipe(gulp.dest(path.resolve(assetsPath, 'js/app/')));
	})
	.task('uglify', function () {
		return gulp.src(path.resolve(srcPath, '**/*.js!src/app.js'))
			.pipe(uglify())
			.pipe(gulp.dest(path.resolve(assetsPath, 'js/lib/')));
	})
	.task('watch', function () {
		gulp
			.watch(config.jshint.all, ['webpack']);
		gulp
			.watch(path.resolve(serverPath, 'views/**/*.*'), server.restart)
	})
	.task('server', function () {
		server.listen({ path: 'app' });
	})
	.task('watch-server', function () {
		gulp
			.watch(['app.js'], server.restart);
	});
