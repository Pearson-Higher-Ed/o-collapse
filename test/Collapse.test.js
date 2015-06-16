/*global describe, it, before, after*/
'use strict';

var expect = require('expect.js');

var Collapse = require('./../src/js/Collapse');

describe('Collapse', function () {

	it('should initialize', function () {
		expect(new Collapse(document.body)).to.not.be(undefined);
	});

	it('should throw when called without \'new\'', function () {
		expect(function () { Collapse(); }).to.throwException(function (e) { // jshint ignore:line
			expect(e).to.be.a(TypeError);
			expect(e.message).to.match(/constructor requires \'new\'/);
		});
	});

	it('should throw when no arguments are provided', function () {
		expect(function () { new Collapse(); }).to.throwException(function (e) {
			expect(e).to.be.a(TypeError);
			expect(e.message).to.match(/1 argument required/);
		});
	});

	it('should throw when element argument is not an instance of HTMLElement', function () {
		expect(function () { new Collapse({}); }).to.throwException(function (e) {
			expect(e).to.be.a(TypeError);
			expect(e.message).to.match(/element must be HTMLElement/);
		});
	});

	describe('Collapse.init()', function () {

		before(function () {
			var element1 = document.createElement('div');
			element1.setAttribute('data-o-component', 'o-collapse');
			document.body.appendChild(element1);

			var element2 = document.createElement('div');
			element2.setAttribute('data-o-component', 'o-collapse');
			document.body.appendChild(element2);
		});

		it('should init all collapsible elements', function () {
			var collapsibles = Collapse.init();
			expect(collapsibles.length).to.be(2);
		});

		it('should work when element is a selector', function () {
			var collapsibles = Collapse.init('body');
			expect(collapsibles.length).to.be(2);
		});

	});

	describe('Collapse.destroy()', function () {

		var bodyDelegate;

		before(function () {
			bodyDelegate = Collapse.bodyDelegate;
		});

		after(function () {
			Collapse.bodyDelegate = bodyDelegate;
		});

		it('should destroy', function () {
			var destroyed = false;
			Collapse.bodyDelegate = {
				destroy: function () { destroyed = true; }
			};

			Collapse.destroy();

			expect(destroyed).to.be(true);
		});

	});

	describe('show()', function () {

		it('should expand the element', function () {
			var element = document.createElement('div');
			document.body.appendChild(element);

			var collapsible = new Collapse(element);

			expect(isExpanded(element)).to.be(false);

			collapsible.show();

			expect(isExpanded(element)).to.be(true);
		});

		it('should set aria-expanded="true" on the trigger elements', function () {
			var element = document.createElement('div');
			element.id = 'collapse';
			document.body.appendChild(element);

			var linkTrigger = document.createElement('a');
			linkTrigger.setAttribute('data-toggle', 'o-collapse');
			linkTrigger.setAttribute('href', '#collapse');
			linkTrigger.setAttribute('aria-expanded', false);
			document.body.appendChild(linkTrigger);

			var buttonTrigger = document.createElement('button');
			buttonTrigger.setAttribute('data-toggle', 'o-collapse');
			buttonTrigger.setAttribute('data-target', '#collapse');
			buttonTrigger.setAttribute('aria-expanded', false);
			document.body.appendChild(buttonTrigger);

			var collapsible = new Collapse(element);

			collapsible.show();

			expect(linkTrigger.getAttribute('aria-expanded')).to.be('true');
			expect(buttonTrigger.getAttribute('aria-expanded')).to.be('true');
		});

		it('should emit oCollapse.show', function (done) {
			var element = document.createElement('div');
			document.body.appendChild(element);

			var collapsible = new Collapse(element);

			element.addEventListener('oCollapse.show', function (e) {
				expect(e.target).to.be(element);
				done();
			});

			collapsible.show();
		});

	});

	describe('hide()', function () {

		it('should collapse the element', function () {
			var element = document.createElement('div');
			document.body.appendChild(element);

			var collapsible = new Collapse(element);
			collapsible.show();
			collapsible.hide();

			expect(isExpanded(element)).to.be(false);
		});

		it('should set aria-expanded="false" on the trigger elements', function () {
			var element = document.createElement('div');
			element.id = 'collapse';
			element.classList.add('o-collapse--expanded');
			document.body.appendChild(element);

			var linkTrigger = document.createElement('a');
			linkTrigger.setAttribute('data-toggle', 'o-collapse');
			linkTrigger.setAttribute('href', '#collapse');
			linkTrigger.setAttribute('aria-expanded', true);
			document.body.appendChild(linkTrigger);

			var buttonTrigger = document.createElement('button');
			buttonTrigger.setAttribute('data-toggle', 'o-collapse');
			buttonTrigger.setAttribute('data-target', '#collapse');
			buttonTrigger.setAttribute('aria-expanded', true);
			document.body.appendChild(buttonTrigger);

			var collapsible = new Collapse(element);

			collapsible.hide();

			expect(linkTrigger.getAttribute('aria-expanded')).to.be('false');
			expect(buttonTrigger.getAttribute('aria-expanded')).to.be('false');
		});

		it('should emit oCollapse.hide', function (done) {
			var element = document.createElement('div');
			document.body.appendChild(element);

			var collapsible = new Collapse(element);

			element.addEventListener('oCollapse.hide', function (e) {
				expect(e.target).to.be(element);
				done();
			});

			collapsible.show();
			collapsible.hide();
		});

	});

	describe('toggle()', function () {

		it('should toggle the collapse state of the element', function () {
			var element = document.createElement('div');
			document.body.appendChild(element);

			var collapsible = new Collapse(element);
			collapsible.toggle();

			expect(isExpanded(element)).to.be(true);

			collapsible.toggle();

			expect(isExpanded(element)).to.be(false);
		});

	});

	describe('click event', function () {

		it('should toggle element', function () {
			var element = document.createElement('div');
			element.id = 'click';
			element.setAttribute('data-o-component', 'o-collapse');
			document.body.appendChild(element);

			var linkTrigger = document.createElement('a');
			linkTrigger.setAttribute('data-toggle', 'o-collapse');
			linkTrigger.setAttribute('href', '#click');
			document.body.appendChild(linkTrigger);

			var buttonTrigger = document.createElement('button');
			buttonTrigger.setAttribute('data-toggle', 'o-collapse');
			buttonTrigger.setAttribute('data-target', '#click');
			document.body.appendChild(buttonTrigger);

			new Collapse(element);

			dispatchEvent(linkTrigger, 'click');
			expect(isExpanded(element)).to.be(true);

			dispatchEvent(linkTrigger, 'click');
			expect (isExpanded(element)).to.be(false);

			dispatchEvent(buttonTrigger, 'click');
			expect(isExpanded(element)).to.be(true);

			dispatchEvent(buttonTrigger, 'click');
			expect (isExpanded(element)).to.be(false);
		});

		it('should create a new Collapse instance if the target does not have one', function () {
			var element = document.createElement('div');
			element.id = 'not-initialized';
			element.setAttribute('data-o-component', 'o-collapse');
			document.body.appendChild(element);

			var trigger = document.createElement('button');
			trigger.setAttribute('data-toggle', 'o-collapse');
			trigger.setAttribute('data-target', '#not-initialized');
			document.body.appendChild(trigger);

			dispatchEvent(trigger, 'click');

			expect(isExpanded(element)).to.be(true);
		});

		it('should work when the event target is nested below the trigger element', function () {
			var element = document.createElement('div');
			element.id = 'nested-target';
			element.setAttribute('data-o-component', 'o-collapse');
			document.body.appendChild(element);

			var trigger = document.createElement('button');
			trigger.setAttribute('data-toggle', 'o-collapse');
			trigger.setAttribute('data-target', '#nested-target');
			document.body.appendChild(trigger);

			var nested = document.createElement('span');
			trigger.appendChild(nested);

			dispatchEvent(nested, 'click');

			expect(isExpanded(element)).to.be(true);
		});

	});

});

function dispatchEvent(element, name, data) {
	if (document.createEvent && element.dispatchEvent) {
		var event = document.createEvent('Event');
		event.initEvent(name, true, true);

		if (data) {
			event.detail = data;
		}

		element.dispatchEvent(event);
	}
}

function isExpanded(element) {
	return element.classList.contains('o-collapse--expanded') &&
		element.getAttribute('aria-expanded') === 'true';
}
