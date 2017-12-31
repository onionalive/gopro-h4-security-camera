# GoPro Hero 4 Security Camera

Use GoPro Hero 4 as a security camera.
Supports: 
- Live Stream
- Recording
- Take Photo
- Motion Detection

### Prerequisites

- Node

### Installing

Git clone and run install command

```
npm run setup
```

This should install all dependencies, compile all code and setup your ennvironment.

### Connecting To Your Go Pro

There are a few steps needed here since your GoPro Hero 4 does not connect directly to your wifi.

- Turn on your GoPro and connect it to the GoPro app on your smart phone.
- During this process - set and name and password for our GoPro. (e.g. Name: GOPRO PWD: password).
- Ensure your GoPro Hero 4's wifi is set to on.
- On your device running this software, connect to your GoPros wifi in the same way you would connect to any other wifi signal (the name and password being what you set before)

This should be it! By default - the GoPro connects to 10.5.5.9. This repo (using goproh4) connects to that.

When connected, you can manually view your GoPro files by navigating to [10.5.5.9](http://10.5.5.9/)
Additionally you can view your GoPro settings by navigating to [10.5.5.9/gp/gpControl](http://10.5.5.9/gp/gpControl)

### Connecting to multiple gopros

*This setction is untested and a work in progess*

When connected to a goPro via the method above, you can get the MAC address of your device by running:

```
console.log(this.camera._mac);
```

You should be able to connect to multiple different cameras by declaring the unique macAddress on each camera when initializing the creation.
An example of this being:

```
cameraOne = new GoPro.Camera({
	mac: 'xx:xx:xx:xx:xx:xx'
});

cameraTwo = new GoPro.Camera({
	mac: 'yy:yy:yy:yy:yy:yy'
});
```


### Viewing

Compile all the code
```
gulp
```

This runs the default gulp function in `gulpfile.babel.js` and outputs to the /dist directory.

Then, serve the files using express. From the root project directory run

```
node app.js
```

In your browser, navigate to [http://localhost:3000](http://localhost:3000)

## Built With

* [goproh4](https://github.com/citolen/goproh4) - The GoPro Hero 4 api

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks for everyone whos code we used, you da real MVP
