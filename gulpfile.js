var gulp = require('gulp')
var debug = require('gulp-debug')
var addSrc = require('gulp-add-src')
var exec = require('child_process').execSync
var del = require('del')

gulp.task('clean', function () {
  return del(['dist/**/*'])
})

gulp.task('build', ['clean'], function () {
  return exec('webpack')
})

gulp.task('default', ['build'], function () {
  return gulp
    .src('index.html')
    .pipe(addSrc('dist/**/*', {base: '.'}))
    .pipe(debug())
})
