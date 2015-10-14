import componentHandler from 'o-component-handler';

export { default } from './src/js/Collapse';

const O_DOM_CONTENT_LOADED = 'o.DOMContentLoaded';

function upgradeAll() {
	componentHandler.upgradeDom('Collapse');
	document.removeEventListener(O_DOM_CONTENT_LOADED, upgradeAll);
}

document.addEventListener(O_DOM_CONTENT_LOADED, upgradeAll);
