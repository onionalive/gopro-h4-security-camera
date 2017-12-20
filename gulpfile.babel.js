/* jshint node: true */
/* jshint -W098 */
/* jshint -W079 */
var gulp 				= require('gulp');
var $           = require('gulp-load-plugins')();
var util = require('gulp-util');

var rimraf 			= require('rimraf');
var browserify  = require('browserify');

var vsource		 	= require('vinyl-source-stream');
var vbuffer		 	= require('vinyl-buffer');
var babelify    = require('babelify');


var dist = `dist/`;

/* Clear Cache */
gulp.task('cacheclear', function () {
  $.cache.clearAll();
});

/* Stylesheets */
gulp.task('styles', function () {
	const paths = [];

	var out = gulp.src('src/scss/main.scss')
		.pipe(util.noop())
		// Enable globbing in SASS files
		.pipe($.sassGlob())
		// Compile SASS
		.pipe($.sass({
			style: 'expanded',
			includePaths: paths
		}))
		// Log errors to terminal
		.on('error', $.sass.logError)
		// Raise notification if we hit an error
		.on('error', function (e) {
			$.notify().write(e);
		})
		// Minify CSS (in production only)
		.pipe($.csso())
		// Write CSS
		.pipe(gulp.dest(dist + 'css'));	
});


/* Compile Javascript */
gulp.task('javascript', function () {
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

	return out.pipe($.buffer())
		.pipe(gulp.dest(dist + 'js'))
});

/** Build */
gulp.task('build', [
	'javascript',
	'styles'
]);

gulp.task('default', ['build']);