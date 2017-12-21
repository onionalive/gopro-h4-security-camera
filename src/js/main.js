import goPro from './modules/goPro';
import $ from 'jquery';
window.$ = $;

$(document).ready(function () {
	
	const goProInstance = new goPro();
	goProInstance.init();
});