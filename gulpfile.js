'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const inject = require('gulp-inject');

let css = ['./src/**/*.css'];
let js = [
  './src/assets/js/google.maps.js',
  './src/assets/js/scripts.js',
  './src/assets/js/utils.js',
  './src/assets/js/init.js'
];


gulp.task('sass', function () {
  return gulp.src('./src/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/assets/scss/*.scss', ['sass']);
});

gulp.task('local-env', function () {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
});

gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  return target.pipe(inject(gulp.src(js.concat(css), { read: false }), { relative: true }))
    .pipe(gulp.dest('./src'));
});

gulp.task('compress-js', function (cb) {
  return gulp.src('./src/assets/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify().on('error', function (e) {
      console.log(e);
    }))
    .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('compress-css', function () {
  gulp.src('./src/assets/css/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('move-data',function(){
  return gulp.src([
      './src/data/*.json',
  ]) 
  .pipe(gulp.dest('./dist/data/'));
});

gulp.task('index-dist', function () {
  var target = gulp.src('./src/index.html');
  return target.pipe(inject(gulp.src(js.concat(css), { read: false }), { relative: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['compress-js', 'compress-css', 'move-data', 'index-dist']);


