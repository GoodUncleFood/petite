/*
 *  Task runnning via Gulp
 *
 */

'use strict';


// Dependencies
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var exit = require('gulp-exit');
var istanbul = require('gulp-istanbul');

// Build defaults
gulp.task('default', function (callback) {
  console.log('Please specify a gulp task');
});


// Run all tests
gulp.task('test', function(callback){
  runSequence(
    'lint',
    'test:coverage',
    'test:unit',
    'test:kill',
    callback);
});

// Lint the codebase (but not the node_modules)
gulp.task('lint', function () {
  return gulp.src(['*.js','lib/**.js', 'test/**.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

// Run unit tests
gulp.task('test:unit', function () {
  return gulp.src(['test/**/*.js', '!test/**/_*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      ui : 'bdd'
    }).on('error', process.exit.bind(process, 1)))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: {
        global: {
          statements: 90,
          branches: 90,
          lines: 90,
          functions: 100
        },
        each: {
          statements: 66,
          branches: 33,
          lines: 33,
          functions: 100
        }
      }
    }).on('error', process.exit.bind(process, 1)));
});

// Run code coverage
gulp.task('test:coverage', function(){
  return gulp.src(['index.js', 'lib/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});


// Kill the test process by piping to exit
gulp.task('test:kill', function () {
  return gulp.src(['index.js'], {read: false})
  .pipe(exit());
});