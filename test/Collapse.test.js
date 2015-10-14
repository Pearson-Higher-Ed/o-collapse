/*global describe, it, before, beforeEach, after*/

import expect from 'expect.js';
import componentHandler from 'o-component-handler';
import Collapse from './../src/js/Collapse';
import { dispatchEvent, isExpanded } from './helpers';

describe('Collapse', () => {

	beforeEach(() => {
		document.body.innerHTML = '';
	});

	it('should initialize', () => {
		expect(new Collapse(document.body)).to.not.be(undefined);
	});

	it('should throw when no arguments are provided', () => {
		expect(() => new Collapse()).to.throwException(function (e) {
			expect(e).to.be.a(TypeError);
			expect(e.message).to.match(/1 argument required/);
		});
	});

	it('should accept a string argument', () => {
		new Collapse('body');
	});

	describe('Collapse.destroy()', () => {

		let bodyDelegate;

		before(() => {
			bodyDelegate = Collapse.bodyDelegate;
		});

		after(() => {
			Collapse.bodyDelegate = bodyDelegate;
		});

		it('should destroy', () => {
			let destroyed = false;
			Collapse.bodyDelegate = {
				destroy: () => { destroyed = true; }
			};

			Collapse.destroy();

			expect(destroyed).to.be(true);
		});

	});

	describe('show()', () => {

		it('should expand the element', () => {
			const element = document.createElement('div');
			document.body.appendChild(element);

			const collapsible = new Collapse(element);

			expect(isExpanded(element)).to.be(false);

			collapsible.show();

			expect(isExpanded(element)).to.be(true);
		});

		it('should set aria-expanded="true" on the trigger elements', () => {
			const element = document.createElement('div');
			element.id = 'collapse';
			document.body.appendChild(element);

			const linkTrigger = document.createElement('a');
			linkTrigger.setAttribute('data-toggle', 'o-collapse');
			linkTrigger.setAttribute('href', '#collapse');
			linkTrigger.setAttribute('aria-expanded', false);
			document.body.appendChild(linkTrigger);

			const buttonTrigger = document.createElement('button');
			buttonTrigger.setAttribute('data-toggle', 'o-collapse');
			buttonTrigger.setAttribute('data-target', '#collapse');
			buttonTrigger.setAttribute('aria-expanded', false);
			document.body.appendChild(buttonTrigger);

			const collapsible = new Collapse(element);

			collapsible.show();

			expect(linkTrigger.getAttribute('aria-expanded')).to.be('true');
			expect(buttonTrigger.getAttribute('aria-expanded')).to.be('true');
		});

		it('should emit oCollapse.show', function (done) {
			const element = document.createElement('div');
			document.body.appendChild(element);

			const collapsible = new Collapse(element);

			element.addEventListener('oCollapse.show', function (e) {
				expect(e.target).to.be(element);
				done();
			});

			collapsible.show();
		});

	});

	describe('hide()', () => {

		it('should collapse the element', () => {
			const element = document.createElement('div');
			document.body.appendChild(element);

			const collapsible = new Collapse(element);
			collapsible.show();
			collapsible.hide();

			expect(isExpanded(element)).to.be(false);
		});

		it('should set aria-expanded="false" on the trigger elements', () => {
			const element = document.createElement('div');
			element.id = 'collapse';
			element.classList.add('o-collapse--expanded');
			document.body.appendChild(element);

			const linkTrigger = document.createElement('a');
			linkTrigger.setAttribute('data-toggle', 'o-collapse');
			linkTrigger.setAttribute('href', '#collapse');
			linkTrigger.setAttribute('aria-expanded', true);
			document.body.appendChild(linkTrigger);

			const buttonTrigger = document.createElement('button');
			buttonTrigger.setAttribute('data-toggle', 'o-collapse');
			buttonTrigger.setAttribute('data-target', '#collapse');
			buttonTrigger.setAttribute('aria-expanded', true);
			document.body.appendChild(buttonTrigger);

			const collapsible = new Collapse(element);

			collapsible.hide();

			expect(linkTrigger.getAttribute('aria-expanded')).to.be('false');
			expect(buttonTrigger.getAttribute('aria-expanded')).to.be('false');
		});

		it('should emit oCollapse.hide', function (done) {
			const element = document.createElement('div');
			document.body.appendChild(element);

			const collapsible = new Collapse(element);

			element.addEventListener('oCollapse.hide', function (e) {
				expect(e.target).to.be(element);
				done();
			});

			collapsible.show();
			collapsible.hide();
		});

	});

	describe('toggle()', () => {

		it('should toggle the collapse state of the element', () => {
			const element = document.createElement('div');
			document.body.appendChild(element);

			const collapsible = new Collapse(element);
			collapsible.toggle();

			expect(isExpanded(element)).to.be(true);

			collapsible.toggle();

			expect(isExpanded(element)).to.be(false);
		});

	});

	describe('click event', () => {

		it('should toggle element', () => {
			const element = document.createElement('div');
			element.id = 'click';
			element.classList.add('o-collapse');
			document.body.appendChild(element);

			const linkTrigger = document.createElement('a');
			linkTrigger.setAttribute('data-toggle', 'o-collapse');
			linkTrigger.setAttribute('href', '#click');
			document.body.appendChild(linkTrigger);

			const buttonTrigger = document.createElement('button');
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

		it('should create a new Collapse instance if the target does not have one', () => {
			const element = document.createElement('div');
			element.id = 'not-initialized';
			element.classList.add('o-collapse');
			document.body.appendChild(element);

			const trigger = document.createElement('button');
			trigger.setAttribute('data-toggle', 'o-collapse');
			trigger.setAttribute('data-target', '#not-initialized');
			document.body.appendChild(trigger);

			componentHandler.upgradeAllRegistered();

			dispatchEvent(trigger, 'click');

			expect(isExpanded(element)).to.be(true);
		});

		it('should work when the event target is nested below the trigger element', () => {
			const element = document.createElement('div');
			element.id = 'nested-target';
			element.classList.add('o-collapse');
			document.body.appendChild(element);

			const trigger = document.createElement('button');
			trigger.setAttribute('data-toggle', 'o-collapse');
			trigger.setAttribute('data-target', '#nested-target');
			document.body.appendChild(trigger);

			const nested = document.createElement('span');
			trigger.appendChild(nested);

			componentHandler.upgradeAllRegistered();

			dispatchEvent(nested, 'click');

			expect(isExpanded(element)).to.be(true);
		});

		it('should collapse all other elements under the same parent when data-parent is defined and an element is expanded', () => {
			const parentElement = document.createElement('div');
			parentElement.id = 'parent';
			document.body.appendChild(parentElement);

			const childElements = [];

			for (let i = 0; i < 2; i++) {
				const toggleElement = document.createElement('button');
				toggleElement.setAttribute('data-toggle', 'o-collapse');
				toggleElement.setAttribute('data-target', "#item-" + (i + 1));
				toggleElement.setAttribute('data-parent', '#parent');

				const targetElement = document.createElement('div');
				targetElement.id = "item-" + (i + 1);
				targetElement.classList.add('o-collapse');

				parentElement.appendChild(toggleElement);
				parentElement.appendChild(targetElement);

				childElements.push({ toggleElement: toggleElement, targetElement: targetElement });
			}

			componentHandler.upgradeAllRegistered();

			dispatchEvent(childElements[0].toggleElement, 'click');

			expect(isExpanded(childElements[0].targetElement)).to.be(true);

			dispatchEvent(childElements[1].toggleElement, 'click');

			expect(isExpanded(childElements[1].targetElement)).to.be(true);
			expect(isExpanded(childElements[0].targetElement)).to.be(false);
		});

		it('should collapse the expanded element when data-parent is defined', () => {
			const parentElement = document.createElement('div');
			parentElement.id = 'parent';
			document.body.appendChild(parentElement);

			const childElements = [];

			for (let i = 0; i < 2; i++) {
				const toggleElement = document.createElement('button');
				toggleElement.setAttribute('data-toggle', 'o-collapse');
				toggleElement.setAttribute('data-target', "#item-" + (i + 1));
				toggleElement.setAttribute('data-parent', '#parent');

				const targetElement = document.createElement('div');
				targetElement.id = "item-" + (i + 1);
				targetElement.classList.add('o-collapse');

				parentElement.appendChild(toggleElement);
				parentElement.appendChild(targetElement);

				childElements.push({ toggleElement: toggleElement, targetElement: targetElement });
			}

			componentHandler.upgradeAllRegistered();

			dispatchEvent(childElements[0].toggleElement, 'click');

			expect(isExpanded(childElements[0].targetElement)).to.be(true);

			dispatchEvent(childElements[0].toggleElement, 'click');

			expect(isExpanded(childElements[0].targetElement)).to.be(false);
		});

	});

});
