import GoPro from 'goproh4';
/**
 * This is the goPro class
 */
class goPro {
	constructor() {
		this.camera = new GoPro.Camera();
		this.media = [];
	}

	init() {
		this.camera.ready();
		this.clickEventhandlers();
	}

	clickEventhandlers() {
		$('.turn-on').on('click', () => {
			this.camera.powerOn();
		});

		$('.turn-off').on('click', () => {
			this.camera.powerOff();
		});

		$('.show-status').on('click', () => {
			console.log(this.camera);
		});

		$('.show-media').on('click', () => {
			this.camera.listMedia().then((result) => {
				// Clear media
				$('.media-list').text('');
				this.media = [];


				this.media.push(result);
			});

			// needs to be updated to run this only after above has finished
			if (this.media.length >0 ) {
				$('.media-list').text(this.media);
			} else {
				$('.media-list').text('No media or no SD card');
			}
		})
	}


}

export default goPro;