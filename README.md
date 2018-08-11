<p align="center">
    <img style="display:block;text-align:center" src="https://user-images.githubusercontent.com/25959096/43851144-7c0697f4-9b57-11e8-972b-cb5c6af9a01b.png" alt="logo" width="400" />
    <img style="display:block;text-align:center" src="https://user-images.githubusercontent.com/25959096/43851190-96e4c596-9b57-11e8-9653-74657d00a99f.png" alt="logo-text" width="600" />
    <h3 align="center">:construction:&ensp;&ensp;Work In Progress&ensp;&ensp;:construction:</h3>
    <h1 align="center">Gulp Static Seed</h1>
    <p align="center" style="font-size: 1.2rem;">A Gulp starter kit for HTML5 static website development with a congenial build process</p>
</p>

<!-- Badges -->
<p align="center">
  <a href="https://travis-ci.org/brionmario/gulp-static-seed">
    <img src="https://travis-ci.org/brionmario/gulp-static-seed.svg?branch=master" alt="Build Status" height="18">
  </a>
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="All Contributors" height="18">
  </a>
  <a href="https://david-dm.org/brionmario/gulp-static-seed">
    <img src="https://david-dm.org/brionmario/gulp-static-seed/status.svg" alt="dependencies Status" height="18">
  </a>
  <a href="https://david-dm.org/brionmario/gulp-static-seed?type=dev">
    <img src="https://david-dm.org/brionmario/gulp-static-seed/dev-status.svg" alt="devDependencies Status" height="18">
   </a>
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" height="18">
  </a>
</p>


This repository could be used by anyone who's looking for a quick starter kit for static website development. This boilerplate uses [Gulp](https://gulpjs.com/) for building and automating the workflow. Following are some key features we've included for you.
* Usage of [Sass: Syntactically Awesome Style Sheets](https://sass-lang.com/) over CSS.
* Ready to go build system using Gulp.
* Ability to use your favorite npm packages.
* Organized easy to use folder structure for beginners.

### Quick start

> The generated project have dependencies that require `node` together with `npm`.

**Make sure you have Node version >= 8.0 and (NPM >= 5 or [Yarn](https://yarnpkg.com) )**

```bash
# clone our repository
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/brionmario/gulp-static-seed.git

# change the directory
cd gulp-static-seed

# install the dependencies with npm
npm install

# start the development server
npm start

```

Once the dev server is fired up, it'll automatically open up a new tab. If not, navigate to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) manually in your browser.

# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Setting Up](#setting-up)
    * [Running the app](#running-the-app)
* [Configuration](#configuration)
* [Styling](#styling)
* [Built With](#built-with)
* [Contributing](#contributing)
* [Contributors](#contributors)
* [Copyright and License](#copyright-and-license)


# File Structure

```
gulp-static-seed/
 ├── assets/                        * static assets such as images, icons, fonts goes here
 ├── css/                           * the compiled main stylesheet and it's minified version is in this folder
 ├── js/                            * external javascript files are placed here
 ├── node_modules/                  * contains dependencies pulled from npm
 ├── scss/                          * styles folder
 │   ├── partials/                  * place all the sass partial stylesheets in this folder
 │   └── styles.scss                * the main stylesheet for the project which gets compiled to CSS
 │
 ├── vendor/                        * third party depencies you want to use in your project goes here.
 ├── .all-contributorsrc            * contains info ablout repo contributors
 ├── .editorconfig                  * helps define and maintain consistent coding styles between different editors and IDEs
 ├── .eslintrc                      * ecmascript linting configuration file
 ├── .gitignore                     * contains files that are ignored from git
 ├── .sass-lint.yml                 * sass linting configuration file
 ├── .travis.yml                    * travis ci configuration file
 ├── CONTRIBUTING.md                * project contributing guidelines
 ├── gulpfile.js                    * main buld configuration file. contains all the gulp tasks.
 ├── index.html                     * entry HTML file.
 ├── LICENSE.md                     * licensing information
 ├── package.json                   * contains all the npm scripts for building, running, deploying etc. and contains all the dependencies
 └── README.md                      * Readme file for the repository

```

# Getting Started
## Prerequisites
What you need to run this app:

* The generated project have dependencies that require `node` together with `npm`.
* Ensure you're running the latest stable versions Node and NPM.

>Make sure you have `Node` and `NPM` installed by running simple commands on the command line to see what version of each is installed.

* Node - Type `node -v` on the terminal.
* NPM -  Type `npm -v` on the terminal.

If you do not have them installed, click [here](https://nodejs.org/en/download/) and grab the latest stable version of `node` and `npm` will be automatically installed along with it. Or if you have `brew` already installed in your local machine, execute `brew install node` command to get `node`.

Once you have those, you should install these dependencies:
* `gulp-cli` (`npm install gulp-cli --global`)
* `gulp` (`npm install --global webpack-dev-server`)

## Setting Up
* `clone` the repository
* `cd gulp-static-seed` to change the directory
* `npm install` to install the dependencies with npm

## Running the app
After you have installed all dependencies you can now run the app. Run `npm start` to start a local server using `gulp` which will watch your stylesheets and javascript files for changes, compile, minify, build and reload the browser automatically using `browser-sync` library.
The dev server will be opened in a new tab and usually on http://localhost:3000 and the Access URLs will be displayed on the terminal.

#### server
```bash
npm start
```

### Other commands

#### build files
```bash
# all
npm run build
# javascript
npm run build:js
# sass
npm run build:sass
```

#### copy the libraries you want to have on the runtime from `node_modules` to vendor folder
```bash
npm run vendor
```

#### linting
```bash
# all
npm run lint
# javascript
npm run lint:js
# sass
npm run lint:sass
```

#### minify
```bash
# all
npm run minify
# javascript
npm run minify:js
# css
npm run minify:css
```

#### watch for code quality(linting) and run the dev server
```bash
npm run watch:dev
```

# Configuration
The `gulp` tasks are defined inside the `gulpfile.js` file found on the root of the application and you need to extend this file if you want to use any third party libraries other than the included `bootstrap`, `font-awesome` and `jquery` libs.

Go in to the folder and scroll down to the `vendor` gulp task and link your dependency.
Take a look at the bellow example:

Lets say that you want to add Google'a Material Design Icon Pack.

```bash

gulp.task('vendor', function() {

  ......


});

```

# Styling
The `styles.scss` file inside the `scss` directory is the main stylesheet for the project and will be compiled and minified into an external `.css` and is embedded in the `index.html` file.
If you want to add your own stylesheet, we recommend that you place it under the `scss/partials` folder and import it in the `styles.scss` file.

For example if you want to include the styles for a slider:
1) Create a `_slider.scss` partial file in the `scss/partials` directory.
3) In `styles.scss` add `@import 'partials/slider.scss';`

# Built With

<a href="https://www.npmjs.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/640px-Npm-logo.svg.png" alt="npm" height="20" /></a>&nbsp;&nbsp;
<a href="https://sass-lang.com/"><img src="https://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" alt="sass" height="30" /></a>&nbsp;&nbsp;
<a href="https://getbootstrap.com/docs/4.0/getting-started/introduction/"><img  src="https://camo.githubusercontent.com/8f12b9c1c1759161b9238fd2cec75fa26aad23e1/68747470733a2f2f676574626f6f7473747261702e636f6d2f646f63732f342e312f6173736574732f6272616e642f626f6f7473747261702d736f6c69642e737667" alt="bootstrap" height="30" /></a>&nbsp;&nbsp;
<a href="https://gulpjs.com/"><img style="display:inline-block;margin: 5px 10px" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png" alt="gulp" height="30" /></a>&nbsp;&nbsp;
<a href="https://jquery.com/"><img style="display:inline-block;margin: 5px 10px" src="https://cdn-images-1.medium.com/max/1600/0*g3ns8QALNBBH7CBA." alt="jquery" height="30" /></a>&nbsp;&nbsp;

# Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for contributing guidelines and to learn about our code of conduct.


# Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/25959096?v=4" width="80px;"/><br /><sub><b>Brion Mario</b></sub>](http://www.brionmario.com/)<br />[💻](https://github.com/brionmario/gulp-static-seed/commits?author=brionmario "Code") [📖](https://github.com/brionmario/gulp-static-seed/commits?author=brionmario "Documentation") [🐛](https://github.com/brionmario/gulp-static-seed/issues?q=author%3Abrionmario "Bug reports") [⚠️](https://github.com/brionmario/gulp-static-seed/commits?author=brionmario "Tests") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

# Copyright and License
Copyright &copy; 2018 Aparecium Labs. This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
