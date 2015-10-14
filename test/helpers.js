export function dispatchEvent(element, name, data) {
	if (document.createEvent && element.dispatchEvent) {
		const event = document.createEvent('Event');
		event.initEvent(name, true, true);

		if (data) {
			event.detail = data;
		}

		element.dispatchEvent(event);
	}
}

export function isExpanded(element) {
	return element.classList.contains('o-collapse--expanded') &&
		element.getAttribute('aria-expanded') === 'true';
}
