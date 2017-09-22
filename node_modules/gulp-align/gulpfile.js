var gulp = require('gulp')
var align = require('./index')
var rename = require('gulp-rename')
var mocha = require('gulp-mocha')

gulp.task('generate', function (cb) {
    gulp.src('./test/example.js')
        .pipe(rename('example-aligned.js'))
        .pipe(align())
        .pipe(gulp.dest('./test'))
    cb()
})

gulp.task('default', ['generate'], function () {
    gulp.src('./test/index.js')
        .pipe(mocha())
})