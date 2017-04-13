// https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e
var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var nodemon = require('gulp-nodemon')
var sass = require('gulp-sass')

gulp.task('default', ['browser-sync'], function () {
})

gulp.task('browser-sync', ['nodemon', 'sass'], function() {
  browserSync.init({
    proxy: 'http://localhost:5000',
    files: ['app/public/**/*.*'],
    browser: 'google chrome',
    port: 7000,
		reloadDelay: 500,
  })

  gulp.watch('app/public/css/*.scss', ['sass']);
  gulp.watch('app/public/**/*.html').on('change', browserSync.reload);
})

gulp.task('sass', function() {
  return gulp.src('app/public/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/public/css'))
    .pipe(browserSync.stream());
})

gulp.task('nodemon', function (cb) {
  var started = false

  return nodemon({
    script: './app/bin/www',
    ignore: [
      'app/public/',
      'gulpfile.js',
      'node_modules/'
    ],
  }).on('start', function () {
    if (!started) {
			setTimeout(cb, 500)
      started = true
    }
  })
})
