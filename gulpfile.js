let gulp = require('gulp');
let sass = require('gulp-sass');
let header = require('gulp-header');
let cleanCSS = require('gulp-clean-css');
let rename = require("gulp-rename");
let uglify = require('gulp-uglify-es').default;
let sassLint = require('gulp-sass-lint');
let eslint = require('gulp-eslint');
let pkg = require('./package.json');
let browserSync = require('browser-sync').create();

/**
 * Banner for the compiled CSS files
 */
const banner = [
  '/*! ========================================================================= *\n',
	' *  <%= pkg.title %> \n',
	' *  ========================================================================= *\n',
	' *  Version: <%= pkg.version %>\n',
	' *  Author: <%= pkg.author %>\n',
	' *  ========================================================================= *\n',
	' *  GitHub Repo: <%= pkg.repository.url %>\n',
	' *  ========================================================================= *\n',
  ' *  Copyright Ⓒ ' + (new Date()).getFullYear(),'\n',
  ' *  Licensed under <%= pkg.license %>\n',
  ' *  ========================================================================= *\n',
  ' */\n\n',
  ''
].join('');

/**
 * This task copies the third party libraries needed for the runtime
 * from ./node_modules into ./vendor folder.
 */
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'));

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./vendor/font-awesome'));

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))
});

/**
 * This task is responsible for linting the Javascript files.
 */
gulp.task('js:lint', function () {
  return gulp.src('./js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * This task compiles SASS files to CSS.
 */
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./css'))
});

/**
 * This task is responsible for linting the SASS files.
 */
gulp.task('sass:lint', function () {
  return gulp.src('scss/**/*.s+(a|c)ss')
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false
      },
      files: {ignore: 'node_modules/**/*.s+(a|c)ss'},
      rules: {
        'no-ids': 1,
        'no-mergeable-selectors': 0
      },
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

/**
 * This minifies CSS files.
 */
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

/**
 * This task will run CSS complile and minify tasks all together.
 */
gulp.task('css', ['css:compile', 'css:minify']);

/**
 * This task minifies Javascript files.
 */
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

/**
 * This task runs the Javascript minify task.
 */
gulp.task('js', ['js:minify']);

/**
 * The Default 'gulp' task which runs the CSS, JS and Vendor tasks at once.
 */
gulp.task('default', ['css', 'js', 'vendor']);

/**
 * This tasks initialises and runs the browserSync.
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

/**
 * The Dev task which runs CSS and JS tasks with browserSync.
 */
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});

/**
 * This task runs the dev task in watch mode.
 */
gulp.task('watch:dev', ['dev'], function() {
  gulp.watch('./js/**/*.js', ['js:lint']);
  gulp.watch('./scss/**/*.s+(a|c)ss', ['sass:lint']);
});
