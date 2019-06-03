const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const pkg = require('./package.json');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const wiredep = require('wiredep');
const urlAdjuster = require('gulp-css-url-adjuster');
const bowerlibs = require('main-bower-files');

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
  ' *  Copyright Ⓒ ' + new Date().getFullYear(),
  '\n',
  ' *  Licensed under <%= pkg.license %>\n',
  ' *  ========================================================================= *\n',
  ' */\n\n',
  ''
].join('');

const CONFIG = {
  filenames: {
    dev: {
      scripts: 'main.js',
      bowerJS: 'vendor.js',
      bowerCSS: 'vendor.css',
      styles: 'styles.css'
    },
    prod: {
      scripts: 'main.bundle.js',
      bowerJS: 'vendor.bundle.js',
      bowerCSS: 'vendor.bundle.css',
      styles: 'styles.bundle.css'
    }
  },
  paths: {
    dev: {
      root: 'temp',
      scripts: 'temp/js',
      styles: 'temp/css',
      libs: 'temp/libs',
      assets: 'temp/assets',
      fonts: 'temp/assets/fonts'
    },
    src: {
      root: 'src',
      scripts: 'src/scripts',
      styles: 'src/sass',
      libs: 'src/libs',
      index: 'src/index.html',
      assets: 'src/assets',
      fonts: 'src/assets/fonts',
      bower: 'src/bower_components'
    },
    prod: {
      root: 'dist',
      scripts: 'dist/js',
      styles: 'dist/css',
      libs: 'dist/libs',
      assets: 'dist/assets',
      fonts: 'dist/assets/fonts'
    }
  }
};

gulp.task('scripts:build', () => {
  return gulp
    .src([`${CONFIG.paths.src.scripts}/**/*.js`, `!${CONFIG.paths.src.scripts}/**/*.test.js`])
    .pipe(gutil.env.env === 'production' ? gutil.noop() : sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gutil.env.env === 'production' ? gutil.noop() : sourcemaps.write())
    .pipe(
      gutil.env.env === 'production'
        ? concat(CONFIG.filenames.prod.scripts)
        : concat(CONFIG.filenames.dev.scripts)
    )
    .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
    .pipe(
      gutil.env.env === 'production'
        ? rename({
          suffix: '.min'
        })
        : gutil.noop()
    )
    .pipe(
      gutil.env.env === 'production'
        ? header(banner, {
          pkg: pkg
        })
        : gutil.noop()
    )
    .pipe(
      gutil.env.env === 'production'
        ? gulp.dest(`${CONFIG.paths.prod.scripts}`)
        : gulp.dest(`${CONFIG.paths.dev.scripts}`)
    );
});

gulp.task('scripts:lint', () => {
  return gulp
    .src(`${CONFIG.paths.src.scripts}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('styles:build', () => {
  return gulp
    .src(`${CONFIG.paths.src.styles}/**/*.s+(a|c)ss`)
    .pipe(
      sass({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      })
    )
    .pipe(autoprefixer({ browsers: AUTO_PREFIX_BROWSERS }))
    .pipe(
      urlAdjuster({
        prependRelative: '../'
      })
    )
    .pipe(
      gutil.env.env === 'production'
        ? concat(CONFIG.filenames.prod.styles)
        : concat(CONFIG.filenames.dev.styles)
    )
    .pipe(
      gutil.env.env === 'production'
        ? header(banner, {
          pkg: pkg
        })
        : gutil.noop()
    )
    .pipe(gutil.env.env === 'production' ? cleanCSS() : gutil.noop())
    .pipe(
      gutil.env.env === 'production'
        ? rename({
          suffix: '.min'
        })
        : gutil.noop()
    )
    .pipe(
      gutil.env.env === 'production'
        ? gulp.dest(CONFIG.paths.prod.styles)
        : gulp.dest(CONFIG.paths.dev.styles)
    )
    .pipe(browserSync.stream());
});

gulp.task('styles:lint', () => {
  return gulp
    .src(`${CONFIG.paths.src.root}/**/*.s+(a|c)ss`)
    .pipe(
      sassLint({
        options: {
          formatter: 'stylish',
          'merge-default-rules': false
        },
        files: { ignore: 'node_modules/!**!/!*.s+(a|c)ss' },
        rules: {
          'no-ids': 1,
          'no-mergeable-selectors': 0
        },
        configFile: '.sass-lint.yml'
      })
    )
    .pipe(sassLint.format());
});

gulp.task('clean', () => {
  if (gutil.env.env === 'production') {
    return del(CONFIG.paths.prod.root);
  }
  if (gutil.env.env === 'development') {
    return del(CONFIG.paths.dev.root);
  }
  if (gutil.env.env === 'all') {
    return del([CONFIG.paths.dev.root, CONFIG.paths.prod.root]);
  }
  return del([CONFIG.paths.dev.root, CONFIG.paths.prod.root]);
});

gulp.task('move:assets', () => {
  return gulp
    .src([`${CONFIG.paths.src.assets}/**/*`], { base: CONFIG.paths.src.root })
    .pipe(gutil.env.env === 'production' ? imagemin() : gutil.noop())
    .pipe(
      gutil.env.env === 'production'
        ? gulp.dest(CONFIG.paths.prod.root)
        : gulp.dest(CONFIG.paths.dev.root)
    );
});

gulp.task('move:libs', () => {
  return gulp
    .src([`${CONFIG.paths.src.libs}/**/*`], { base: CONFIG.paths.src.root })
    .pipe(
      gutil.env.env === 'production'
        ? gulp.dest(CONFIG.paths.prod.libs)
        : gulp.dest(CONFIG.paths.dev.libs)
    );
});

gulp.task('move:bower:fonts', () => {
  return gulp
    .src(bowerlibs('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(
      gutil.env.env === 'production'
        ? gulp.dest(CONFIG.paths.prod.fonts)
        : gulp.dest(CONFIG.paths.dev.fonts)
    );
});

gulp.task('bundle:bower', () => {
  let target = gulp.src(
    [
      CONFIG.paths.src.index,
      `${CONFIG.paths.src.root}/**/*.html`,
      `${CONFIG.paths.src.root}/**/*.jade`,
      `${CONFIG.paths.src.root}/**/*.php`,
      `!${CONFIG.paths.src.bower}/**/*`,
      `!${CONFIG.paths.src.libs}/**/*`
    ],
    { base: CONFIG.paths.src.root }
  );

  let js = gulp.src(wiredep().js);
  let css = gulp.src(wiredep().css);

  return target
    .pipe(
      inject(
        js
          .pipe(
            concat(
              gutil.env.env === 'production'
                ? CONFIG.filenames.prod.bowerJS
                : CONFIG.filenames.dev.bowerJS
            )
          )
          .pipe(
            gutil.env.env === 'production'
              ? gulp.dest(CONFIG.paths.prod.scripts)
              : gulp.dest(CONFIG.paths.dev.scripts)
          )
      )
    )
    .pipe(
      inject(
        css
          .pipe(
            concat(
              gutil.env.env === 'production'
                ? CONFIG.filenames.prod.bowerCSS
                : CONFIG.filenames.dev.bowerCSS
            )
          )
          .pipe(
            urlAdjuster({
              replace: ['../fonts', '../assets/fonts']
            })
          )
          .pipe(
            gutil.env.env === 'production'
              ? gulp.dest(CONFIG.paths.prod.styles)
              : gulp.dest(CONFIG.paths.dev.styles)
          )
      )
    );
});

gulp.task('inject', () => {
  let target = gulp.src(
    [
      `${CONFIG.paths.src.root}/**/*.html`,
      `${CONFIG.paths.src.root}/**/*.jade`,
      `${CONFIG.paths.src.root}/**/*.php`,
      `!${CONFIG.paths.src.bower}/**/*`,
      `!${CONFIG.paths.src.libs}/**/*`
    ],
    { base: CONFIG.paths.src.root }
  );

  let devSources = gulp.src(
    [
      `${CONFIG.paths.dev.scripts}/**/*.js`,
      `${CONFIG.paths.dev.styles}/**/*.css`,
      `!${CONFIG.paths.dev.scripts}/**/*.test.js`
    ],
    {
      read: false
    }
  );

  let devInjectionOptions = {
    ignorePath: CONFIG.paths.dev.root,
    addRootSlash: false
  };

  let prodSources = gulp.src(
    [
      `${CONFIG.paths.prod.scripts}/**/*.js`,
      `${CONFIG.paths.prod.styles}/**/*.css`,
      `!${CONFIG.paths.prod.scripts}/**/*.test.js`
    ],
    { read: false }
  );

  let prodInjectionOptions = {
    ignorePath: CONFIG.paths.prod.root,
    addRootSlash: false
  };

  return target
    .pipe(
      gutil.env.env === 'production'
        ? htmlmin({
          collapseWhitespace: true
        })
        : gutil.noop()
    )
    .pipe(
      gutil.env.env === 'production'
        ? inject(prodSources, prodInjectionOptions)
        : inject(devSources, devInjectionOptions)
    )
    .pipe(
      gutil.env.env === 'production'
        ? gulp.dest(CONFIG.paths.prod.root)
        : gulp.dest(CONFIG.paths.dev.root)
    );
});

gulp.task(
  'build',
  gulp.series(
    'move:assets',
    'move:bower:fonts',
    gulp.parallel('scripts:build', 'styles:build'),
    'bundle:bower',
    'inject'
  ),
  callback => {
    callback();
  }
);

gulp.task('browserSync', callback => {
  browserSync.init({
    server: {
      baseDir: CONFIG.paths.dev.root
    }
  });
  callback();
});

gulp.task('watch:styles', () => {
  gulp.watch(`${CONFIG.paths.src.styles}/**/*.s+(a|c)ss`, gulp.series('styles:build'));
});

gulp.task('watch:scripts', () => {
  gulp
    .watch(`${CONFIG.paths.src.scripts}/**/*.js`, gulp.series('scripts:build'))
    .on('change', browserSync.reload);
});

gulp.task('watch:pages', () => {
  gulp
    .watch(
      [
        `${CONFIG.paths.src.root}/**/*.php`,
        `${CONFIG.paths.src.root}/**/*.html`,
        `${CONFIG.paths.src.root}/**/*.jade`
      ],
      gulp.series('inject')
    )
    .on('change', browserSync.reload);
});

gulp.task('watch:assets', () => {
  gulp
    .watch(`${CONFIG.paths.src.assets}/**/*`, gulp.series('move:assets', 'move:libs'))
    .on('change', browserSync.reload);
});

gulp.task('watch', gulp.parallel('watch:styles', 'watch:scripts', 'watch:pages', 'watch:assets'));

gulp.task('serve', gulp.series('browserSync', 'watch'));
