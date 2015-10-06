/*jshint -W079 */

'use strict';

var DomDelegate = require('dom-delegate');
var WeakMap = require('o-weakmap');
var dispatchEvent = require('./utils').dispatchEvent;
var forEach = require('./utils').forEach;

function Collapse(element) {
	if (!(this instanceof Collapse)) throw new TypeError('Failed to construct Collapse: constructor requires \'new\'.');
	if (arguments.length === 0) throw new TypeError('Failed to construct Collapse: 1 argument required, but 0 provided.');
	if (!(element instanceof HTMLElement)) element = document.querySelector(element);
	if (!element) return;
	if (typeof Collapse.cache.get(element, this) !== 'undefined') return Collapse.cache.get(element, this);

	var triggerSelector =
		'[data-toggle="o-collapse"][href="#' + element.id + '"],' +
		'[data-toggle="o-collapse"][data-target="#' + element.id + '"]';

	this.target = element;
	this.trigger = document.querySelectorAll(triggerSelector);
	Collapse.cache.set(element, this);

	if (!element.classList.contains('o-collapse')) element.classList.add('o-collapse');

	if (!Collapse.bodyDelegate) {
		var bodyDelegate = new DomDelegate(document.body);

		bodyDelegate.on('click', '[data-toggle="o-collapse"]', function handleClick(e) {
			e.preventDefault();

			var trigger = getTrigger(e.target);
			var targets = getTargetsFromTrigger(trigger);

			if (trigger.hasAttribute('data-parent')) {
				var selector = '[data-parent="' + trigger.getAttribute('data-parent') + '"]';

				forEach(document.querySelectorAll(selector), function (idx, el) {
					var childTargets = getTargetsFromTrigger(el);

					forEach(childTargets, function (index, childTarget) {
						if (childTarget === targets[0]) return;

						var collapsible = getOrCreateInstance(childTarget);

						if (collapsible) collapsible.hide();
					});
				});
			}

			forEach(targets, function (index, target) {
				var collapsible = getOrCreateInstance(target);

				if (collapsible) collapsible.toggle();
			});
		});

		Collapse.bodyDelegate = bodyDelegate;
	}
}

Collapse.cache = new WeakMap();

/**
 * Initializes all collapsible elements on the page or within
 * the element passed in.
 * @param  {HTMLElement|string} element DOM element or selector.
 * @return {Collapse[]} List of Collapse instances that
 * have been initialized.
 */
Collapse.init = function (element) {
	var collapseEls = selectAll(element);
	var collapsibles = [];

	for (var i = 0, l = collapseEls.length; i < l; i++) {
		collapsibles.push(new Collapse(collapseEls[i]));
	}

	return collapsibles;
};

/**
 * Destroys all collapsible elements on the page.
 */
Collapse.destroy = function () {
	if (Collapse.bodyDelegate) Collapse.bodyDelegate.destroy();
};

/**
 * Expands the collapsible element if it is not already expanded.
 */
Collapse.prototype.show = function () {
	var target = this.target;
	var trigger = this.trigger;

	if (target.classList.contains('o-collapse--expanded')) return;

	dispatchEvent(target, 'oCollapse.show');

	target.classList.add('o-collapse--expanded');
	target.setAttribute('aria-expanded', true);

	forEach(trigger, function (index, trigger) {
		trigger.setAttribute('aria-expanded', true);
	});
};

/**
 * Collapses the collapsible element if it is not already collapsed.
 */
Collapse.prototype.hide = function () {
	var target = this.target;
	var trigger = this.trigger;

	if (!target.classList.contains('o-collapse--expanded')) return;

	dispatchEvent(target, 'oCollapse.hide');

	target.classList.remove('o-collapse--expanded');
	target.setAttribute('aria-expanded', false);

	forEach(trigger, function (index, trigger) {
		trigger.setAttribute('aria-expanded', false);
	});
};

/**
 * Toggles the collapsible element based on its current state.
 */
Collapse.prototype.toggle = function () {
	this[this.target.classList.contains('o-collapse--expanded') ? 'hide' : 'show']();
};

function selectAll(element) {
	if (!element) {
		element = document.body;
	} else if (!(element instanceof HTMLElement)) {
		element = document.querySelector(element);
	}

	return element.querySelectorAll('.o-collapse');
}

function getTrigger(element) {
	while (element && element.getAttribute('data-toggle') !== 'o-collapse') {
		element = element.parentElement;
	}

	return element;
}

function getTargetsFromTrigger(element) {
	var target = element.getAttribute('data-target') || element.getAttribute('href');
	return document.querySelectorAll(target);
}

function getOrCreateInstance(element) {
	var collapsible = Collapse.cache.get(element);

	if (!collapsible && element.classList.contains('o-collapse')) {
		collapsible = new Collapse(element);
	}

	return collapsible;
}

module.exports = Collapse;
