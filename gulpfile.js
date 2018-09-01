let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let del = require('del');
let htmlmin = require('gulp-htmlmin');
let runSequence = require('run-sequence');
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
 * Browser Support declaration
 * @type {string[]}
 */
const AUTO_PREFIX_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

/**
 * Banner for the compiled CSS files
 * @type {string}
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
 * Gulp Task - gulp vendor
 *
 * Copies the third party libraries needed for the runtime
 * from ./node_modules into ./vendor folder.
 */
gulp.task('vendor:copy', function() {
  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./src/vendor/bootstrap'));

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./src/vendor/font-awesome'));

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./src/vendor/jquery'))
});

/**
 * Gulp Task - gulp js:build
 *
 * Minify the Javascript file excluding tests and output
 * them to the dist folder.
 */
gulp.task('js:minify', function() {
  return gulp.src([
    './src/js/**/*.js',
    '!./src/js/**/*.test.js',
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

/**
 * Gulp Task - gulp js:lint
 *
 * Lints the Javascript files using the es-lint plugin.
 */
gulp.task('js:lint', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * Gulp Task - gulp sass:build
 *
 * Builds the SASS files converting them to CSS and
 * prefixes the classes for cross browser support.
 * Finally minify the file and output it to dist.
 */
gulp.task('sass:build', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(autoprefixer({browsers: AUTO_PREFIX_BROWSERS}))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

/**
 * Gulp Task - gulp sass:lint
 *
 * Lints SASS stylesheets.
 */
gulp.task('sass:lint', function () {
  return gulp.src('./src/sass/**/*.s+(a|c)ss')
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
 * Gulp Task - gulp html:minify
 *
 * Minify HTML files.
 */
gulp.task('html:minify', function() {
  return gulp.src(['./src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

/**
 * Gulp Task - gulp clean
 *
 * Cleans the distribution folder.
 */
gulp.task('clean', () => del(['dist']));

/**
 * Gulp Task - gulp
 *
 * The Default 'gulp' task which cleans the dist folder
 * first and runs the following tasks in sequence,
 *  1. gulp sass:build - Builds SASS
 *  2. gulp js:minify - Minify Javascript
 *  3. gulp vendor:copy - Copy the vendor libs
 *  4. gulp html:minify - Minify HTML files.
 */
gulp.task('default', ['clean'], function () {
  runSequence(
    'sass:build',
    'js:minify',
    'vendor:copy',
    'html:minify'
  );
});

/**
 * Gulp Task - gulp browserSync
 *
 * Initialises and runs the browserSync.
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

/**
 * Gulp Task - gulp dev
 *
 * The Dev task which runs CSS and JS tasks with browserSync.
 */
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./src/sass/**/*.sass', ['sass:build']);
  gulp.watch('./src/js/**/*.js', ['js:minify']);
  gulp.watch('./src/**/*.html', browserSync.reload);
});

/**
 * Gulp Task - gulp watch:dev
 *
 * This task runs the dev task in watch mode.
 */
gulp.task('watch:dev', ['dev'], function() {
  gulp.watch('./src/js/**/*.js', ['js:lint']);
  gulp.watch('./src/sass/**/*.s+(a|c)ss', ['sass:lint']);
});
