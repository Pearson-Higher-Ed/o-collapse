/*global module*/
'use strict';

var istanbul = require('browserify-istanbul');

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'browserify'],


		// list of files / patterns to load in the browser
		files: [
			// Polyfill PhantomJS as it's a similar Webkit version
			'http://polyfill.webservices.ft.com/v1/polyfill.js?ua=safari/4&features=default,WeakMap',
			'test/*.test.js'
		],


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/*.test.js': ['browserify']
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],


		// coverage reporter options
		coverageReporter: {
			dir: 'build/reports/coverage',
			reporters: [
				{ type: 'html', subdir: 'report-html' }
			]
		},


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		browserify: {
			debug: true,
			transform: ['debowerify', istanbul({
				ignore: ['node_modules/**', 'test/**']
			})]
		}

	});
};
