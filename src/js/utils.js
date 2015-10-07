export function dispatchEvent(element, name) {
	if (document.createEvent && element.dispatchEvent) {
		const event = document.createEvent('Event');

		event.initEvent(name, true, true);
		element.dispatchEvent(event);
	}
};

export function forEach(array, callback) {
	for (let i = 0, l = array.length; i < l; i++) {
		callback.call(this, i, array[i]);
	}
};
