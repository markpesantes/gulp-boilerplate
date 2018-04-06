# gulp-boilerplate
Starter [gulpfile.js](https://github.com/markpesantes/gulp-boilerplate/blob/master/gulpfile.js) and [package.json](https://github.com/markpesantes/gulp-boilerplate/blob/master/package.json) for scss and es6

## Getting Started

Install dependencies:

```bash
$ npm install
```

## Usage

### Tasks

```bash
$ gulp watch
```

Automatically watch files for changes within the stylesheets directory, and run the styles and scripts tasks.

```bash
$ gulp build
```

Build and optimize the current project to the `build` directory. This includes minification of scss & JS, and babel transpiling of ES6.
