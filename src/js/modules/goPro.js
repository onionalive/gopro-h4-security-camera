import GoPro from 'goproh4';
/**
 * This is the goPro class
 */
class goPro {
	constructor() {
		this.camera = new GoPro.Camera({
			mac: [212, 217, 25, 203, 194, 173]
		});
		this.media = [];
	}

	init() {
		// this.camera.ready();
		this.getCameraData();
		this.clickEventhandlers();
	}

	getCameraData() {
		let macAddressArray = this.camera._mac;
		let macAddress = '';
		for (let i = 0; i < this.camera._mac.length; i++) {
			macAddress += this.camera._mac[i];
		}

		$('.broadcastip span').text(this.camera._broadcastip);
		$('.ip span').text(this.camera._ip);
		$('.mac span').text(macAddress);
		$('.ready span').text(this.camera._ready);
	}

	clickEventhandlers() {

		$('.turn-off').on('click', () => {
			this.camera.powerOff();
		});

		$('.show-status').on('click', () => {
			this.getCameraData();
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