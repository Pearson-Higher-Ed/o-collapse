import Collapse from './src/js/Collapse';

export default Collapse;

const constructAll = () => {
	Collapse.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);
