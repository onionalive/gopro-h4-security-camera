/* jshint node: true */
/* jshint -W098 */
/* jshint -W079 */
var gulp 				= require('gulp');
var $           = require('gulp-load-plugins')();

var rimraf 			= require('rimraf');
var browserify  = require('browserify');

var runSequence	= require('run-sequence');
var vsource		 	= require('vinyl-source-stream');
var vbuffer		 	= require('vinyl-buffer');
var pngquant		= require('imagemin-pngquant');
var babelify    = require('babelify');


var dist = `dist/s`;

/* Clear Cache */
gulp.task('cacheclear', function () {
  $.cache.clearAll();
});


/* Compile Javascript */
gulp.task('javascript', ['eslint'], function () {
	var b = browserify({
		transform: [babelify.configure({
			presets: ["es2015"]
		})],
		entries: './src/js/main.js',
		debug: true,
	});

	var out =	b.bundle()
		.pipe(vsource('scripts.min.js'))
		.pipe(vbuffer())
		.on('error', function (e) {
			$.notify().write(e);
		});

	out.pipe($.sourcemaps.init({
			loadMaps: true,
		})).pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(dist + 'js'));


	return out.pipe($.buffer())
		.pipe(gulp.dest(dist + 'js'))
		.pipe($.rev.manifest(dist + 'js/manifest.json', {
			merge: true,
			base: '',
		}))
		.pipe(gulp.dest(''));

});

/** Build */
gulp.task('build', [
	'javascript'
]);

gulp.task('default', ['build']);