'use strict';

exports.dispatchEvent = function(element, name, data) {
	if (document.createEvent && element.dispatchEvent) {
		var event = document.createEvent('Event');
		event.initEvent(name, true, true);

		if (data) {
			event.detail = data;
		}

		element.dispatchEvent(event);
	}
};

exports.forEach = function (array, callback) {
	for (var i = 0, l = array.length; i < l; i++) {
		callback.call(this, i, array[i]);
	}
};
