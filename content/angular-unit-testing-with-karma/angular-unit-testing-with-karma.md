Title: Make front-end unit tests easy with karma
Date: 2014-11-25 13:45
Modified: 2014-11-25 13:45
Category: FED
Tags: npm, fed-tooling
Slug: karma-unit-testing
Authors: Ralph Saunders
Summary:

Unit tests are good but can sometimes be a pain to work with. It doesn't have to
be this way though! With a good workflow unit testing should actually help
development rather than hinder it. With that in mind, front-end unit tests should:

- Source their dependencies without manual mangement
- Run when code changes
- Run in real browsers
- Be easy to interactively debug

## Introducing Karma

[Karma test runner](http://karma-runner.github.io/0.12/index.html) is a node
package that manages the running of unit tests and solves the issues above.

Setup is pretty straight forward and for the most part self-explanatory. They do
have a [page about it on their website
though](http://karma-runner.github.io/0.12/config/configuration-file.html).

Below is a Karma configuration file, some things to note:

- I'm using Jasmine for my unit tests
- I'm not loading my files using a pattern like `/Source/Scripts/**/**/*.js`
  because they need to be loaded in a specific order.
- Karma is going to run unit tests in the browsers defined. These browsers must
  be setup and ready to load web pages!
- I've set singleRun to false. This means the tests will re-run in the browser
  every time one of the files changes.

__karma.local.conf.js:__

    // Karma configuration
    // Generated on Tue Oct 28 2014 17:03:28 GMT+0000 (GMT Standard Time)

    module.exports = function(config) {
      config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'Source/Scripts/lib/bluebird-2.3.11.js',
            'Source/Scripts/lib/lodash-2.4.1.compat.min.js',
            'Source/Scripts/angular.js',
            'Source/Scripts/angular-mocks.js',
            'Source/Scripts/angular-animate.js',
            'Source/Scripts/lib/angular-google-maps.min.js',
            'Source/Scripts/lib/*.js',
            'Source/Scripts/app/**/*.js',
            'Source/Scripts/tests/**/*.js'
        ],


        // list of files to exclude
        exclude: [
          'gulpfile.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox', 'Chrome', 'IE'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
      });
    };

## Karma + Gulp

Running Karma from the cli directly is a bit of a chore, especially when the
arguments are probably going to be the same most of the time. Here's how I'm
using it with gulp:

    gulp.task('local-test', function(done) {
        karma.start({
            configFile: __dirname + '/karma.local.conf.js'
        }, done);
    });

Compare that with the task the build environment runs on our project:

    gulp.task('remote-test', function(done) {
        karma.start({
            configFile: __dirname + '/karma.conf.js',
            singleRun: true,
            reporters: 'teamcity'
        }, done);
    });

I'm overwriting a few variables in the karma config as part of the remote gulp
task. I only want the test to run once and we want karma to output using the
[TeamCity](https://www.jetbrains.com/teamcity/) reporter. TeamCity is the build
environment, and this means the output is present in TeamCity's build log.

