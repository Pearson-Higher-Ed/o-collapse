/*global require, module*/
'use strict';

var Collapse = require('./src/js/Collapse');

var constructAll = function () {
	Collapse.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = Collapse;
