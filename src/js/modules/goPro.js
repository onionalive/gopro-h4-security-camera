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

		$('.take-video').on('click', () => {
			this.takeVideo();
		});

		$('.show-media').on('click', () => {
			// Clear Media
			$('.media-list').text('');
			this.listMedia(); 
		})
	}

	listMedia() {
		this.camera.listMedia().then((result) => {  
			const media = result.media;

			let fileLinks = '';
	
			for (let directory of media) {
				let directoryName = directory.d;
				for (let file of directory.fs) {
					fileLinks += this.createFileLink(directoryName, file.n);
				}
			}
	
			if (fileLinks !== undefined && fileLinks.length > 0 ) {
				$('.media-list').append(fileLinks);
			} else {
				$('.media-list').text('No media or no SD card');
			}
		});
	}

	createFileLink(directoryName, fileName) {
		const fileLink = `
			<a target='_blank' href='http://10.5.5.9/videos/DCIM/${directoryName}/${fileName}'>${fileName}</a>
		`;

		return fileLink;
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

	takeVideo() {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/take_video',
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