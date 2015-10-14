import DomDelegate from 'dom-delegate';
import componentHandler from 'o-component-handler';
import { dispatchEvent, forEach } from './utils';

const CSS_CLASS = 'o-collapse';

export default class Collapse {

	constructor(element) {
		if (arguments.length === 0) throw new TypeError('Failed to construct Collapse: 1 argument required, but 0 provided.');
		if (!(element instanceof HTMLElement)) element = document.querySelector(element);
		if (!element) return;

		const triggerSelector =
			'[data-toggle="o-collapse"][href="#' + element.id + '"],' +
			'[data-toggle="o-collapse"][data-target="#' + element.id + '"]';

		this.target_ = element;
		this.triggers_ = document.querySelectorAll(triggerSelector);

		if (!element.classList.contains('o-collapse')) element.classList.add('o-collapse');

		if (!Collapse.bodyDelegate) {
			const bodyDelegate = new DomDelegate(document.body);

			bodyDelegate.on('click', '[data-toggle="o-collapse"]', (e) => {
				e.preventDefault();

				const trigger = getTrigger(e.target);
				const targets = getTargetsFromTrigger(trigger);

				if (trigger.hasAttribute('data-parent')) {
					const selector = '[data-parent="' + trigger.getAttribute('data-parent') + '"]';

					forEach(document.querySelectorAll(selector), (idx, el) => {
						const childTargets = getTargetsFromTrigger(el);

						forEach(childTargets, (index, childTarget) => {
							if (childTarget === targets[0]) return;

							const collapsible = getOrCreateInstance(childTarget);

							if (collapsible) collapsible.hide();
						});
					});
				}

				forEach(targets, (index, target) => {
					const collapsible = getOrCreateInstance(target);

					if (collapsible) collapsible.toggle();
				});
			});

			Collapse.bodyDelegate = bodyDelegate;
		}
	}

	/**
	 * Expands the collapsible element if it is not already expanded.
	 * @returns {undefined} undefined
	 */
	show() {
		const target = this.target_;
		const triggers = this.triggers_;

		if (target.classList.contains('o-collapse--expanded')) return;

		dispatchEvent(target, 'oCollapse.show');

		target.classList.add('o-collapse--expanded');
		target.setAttribute('aria-expanded', true);

		forEach(triggers, (index, trigger) => {
			trigger.setAttribute('aria-expanded', true);
		});
	}

	/**
	 * Collapses the collapsible element if it is not already collapsed.
	 * @returns {undefined} undefined
	 */
	hide() {
		const target = this.target_;
		const triggers = this.triggers_;

		if (!target.classList.contains('o-collapse--expanded')) return;

		dispatchEvent(target, 'oCollapse.hide');

		target.classList.remove('o-collapse--expanded');
		target.setAttribute('aria-expanded', false);

		forEach(triggers, (index, trigger) => {
			trigger.setAttribute('aria-expanded', false);
		});
	}

	/**
	 * Toggles the collapsible element based on its current state.
	 * @return {undefined} undefined
	 */
	toggle() {
		this[this.target_.classList.contains('o-collapse--expanded') ? 'hide' : 'show']();
	}

}


/**
 * Destroys all collapsible elements on the page.
 * @returns {undefined} undefined
 */
Collapse.destroy = () => {
	if (Collapse.bodyDelegate) Collapse.bodyDelegate.destroy();
};


/**
 * Register this component with the component handler.
 */
componentHandler.register({
	constructor: Collapse,
	classAsString: 'Collapse',
	cssClass: CSS_CLASS
});


/**
 * Private
 */

function getTrigger(element) {
	while (element && element.getAttribute('data-toggle') !== 'o-collapse') {
		element = element.parentElement;
	}

	return element;
}

function getTargetsFromTrigger(element) {
	const target = element.getAttribute('data-target') || element.getAttribute('href');

	return document.querySelectorAll(target);
}

function getOrCreateInstance(element) {
	let instance = componentHandler.getInstance(element, CSS_CLASS);

	if (!instance && element.classList.contains('o-collapse')) {
		componentHandler.upgradeElement(element, 'Collapse');
		instance = componentHandler.getInstance(element, CSS_CLASS);
	}

	return instance;
}
