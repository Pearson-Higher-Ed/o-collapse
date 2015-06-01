/*global describe, it*/
'use strict';

var expect = require('expect.js');

var Collapse = require('./../src/js/Collapse');

describe('Collapse', function() {

	it('should initialize', function() {
		expect(new Collapse()).to.not.be(undefined);
	});
});
