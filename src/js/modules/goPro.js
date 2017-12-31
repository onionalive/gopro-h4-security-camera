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
		$('.turn-on').on('click', () => {
			this.turnCameraOn();
		});

		$('.turn-off').on('click', () => {
			this.turnCameraOff();
		});

		$('.show-status').on('click', () => {
			this.getStatus();
		});

		$('.take-picture').on('click', () => {
			this.takePicture();
		});

		$('.show-media').on('click', () => {
			const media = this.getMedia();
			$('.media-list').text('');
			console.log(media);

			// needs to be updated to run this only after above has finished
			if (media !== undefined && media.length > 0 ) {
				$('.media-list').text(media);
			} else {
				$('.media-list').text('No media or no SD card');
			}
		})
	}

	getStatus() {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/gopro_status',
			success: (res) => {
				console.log(res);
			},
			error: (err) => {
				console.log(err);
			}
		})
	}

	getMedia() {
		let media = [];
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/get_media',
			success: (res) => {
				media = res;
			},
			error: (err) => {
				console.log(err);
			}
		});

		return media;
	}

	turnCameraOff() {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/gopro_off',
			success: (res) => {
				console.log(res);
			},
			error: (err) => {
				console.log(err);
			}
		})
	}

	turnCameraOn() {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/gopro_on',
			success: (res) => {
				console.log(res);
			},
			error: (err) => {
				console.log(err);
			}
		})
	}

	takePicture() {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/take_picture',
			success: (res) => {
				console.log(res);
			},
			error: (err) => {
				console.log(err);
			}
		})
	}
}

export default goPro;