'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var validate = require('gulp-w3c-css');
var htmlhint = require("gulp-htmlhint");
const babel = require('gulp-babel');
var beautify = require('gulp-beautify');
var breakdance = require('gulp-breakdance');
var uglify = require('gulp-uglify');
var uglifyInline = require('gulp-uglify-inline');
var align = require('gulp-align');

var options = {
    output: {
        comments: true
    }
};

gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/css/**/*.scss', ['sass']);
});

gulp.task('w3c', function() {
    return gulp.src("./*.html")
    .pipe(validate())
    .pipe(gulp.dest("./w3cErrors"));
});

gulp.task('htmlhint', function(){
    return gulp.src("./src/*.html")
    .pipe(htmlhint())
});

gulp.task('beautify', function(){

    return gulp.src('./assets/js/**/*.js')
      .pipe(beautify({indent_size: 2}))
      .pipe(gulp.dest('./public/'))

});

gulp.task('babel', function(){
    return gulp.src('./assets/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./assets/js/dist'))
});

gulp.task('breakdance', function() {
    return gulp.src('./*.html')
      .pipe(breakdance([options]))
      .pipe(gulp.dest('./assets/bar'));
  });

  gulp.task('uglify-inline', function() {
    gulp.src('./*.html')
      .pipe(uglifyInline(options))
      .pipe(gulp.dest('./assets/dist'))
  });

  gulp.task('align', function () {
    return gulp.src('./assets/js/*.js')
        .pipe(align())
        .pipe(gulp.dest('./assets/js/dist'))
})

gulp.task('js', ['beautify', 'babel', 'align']);
gulp.task('html',['htmlhint', 'uglify-inline','breakdance']);
gulp.task('css', ['w3c', 'sass', 'watch']);
gulp.task('default', ['js', 'html', 'css']);