import GoPro from 'goproh4';
import $ from 'jquery';
window.$ = $;

$(document).ready(function () {
	const cam = new GoPro.Camera({
		// ip: '10.5.5.9'
	});
});