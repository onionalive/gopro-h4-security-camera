var path = require('path');
var express = require('express');
var goPro = require('goproh4');

var app = express();

var staticPath = path.join(__dirname, '');
app.use(express.static(staticPath));

// Init camera and set mac address
// this mac-address is set to stepehens go-pro
camera = new goPro.Camera({
  mac: [212, 217, 25, 203, 194, 173]
});

// Grab goPro Status
app.post('/gopro_status', function(req, res) {
  var cameraStatus = [];
  camera.status().then(function (status) {
    cameraStatus.push(status);
  });
	res.send(camera.status());
});

// Turn Camera On
// Requires mac address if this is used before turn off
app.post('/gopro_on', function(req, res) {
  // Power Camera On
  camera.powerOn();
  // Return Camera Staus
	res.send(camera);
});

// Turn Camera Off
app.post('/gopro_off', function(req, res) {
  // Power Camera Off
  camera.powerOff();
  // Return Camera Status
	res.send(camera);
});

// Take Picture On Camera
app.post('/take_picture', function(req, res) {
  // Set Camera Mode
  camera.mode(goPro.Settings.Modes.Photo, goPro.Settings.Submodes.Photo.Single)
  // Set photo resolution
  .then(function () {
    return camera.set(goPro.Settings.PHOTO_RESOLUTION, goPro.Settings.PhotoResolution.R7MPMedium);
  })
  // Take picture
  .then(function () {
    return camera.start()
  })
  // Return Camera Status
  res.send(camera);
});

// Take Video On Camera
app.post('/take_video', function(req, res) {
  // Set camera mode
  camera.mode(goPro.Settings.Modes.Video, goPro.Settings.Submodes.Video.Video)
  // Set camera resolution
  .then(function () {
      return camera.set(goPro.Settings.VIDEO_RESOLUTION, goPro.Settings.VideoResolution.R1080S)
  })
  // Set camera framerate
  .then(function () {
      return camera.set(goPro.Settings.VIDEO_FPS, goPro.Settings.VideoFPS.F60)
  })
  
  // Begin recording
  .then(function () {
      return camera.start()
  })
  
  // Wait 30s
  .delay(30000)
  
  // Stop recording
  .then(function () {
      return camera.stop()
  })
  // Return Camera Status
  res.send(camera);
});

// start app
app.listen(3000, function() {
  console.log('listening');
});