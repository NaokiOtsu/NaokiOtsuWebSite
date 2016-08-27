var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var webpackStream = require('webpack-stream');

gulp.task('js', function(callback) {
	
	var config = require('../config/webpack/');
	
	var devicies = ['pc', 'sp'];
	
	devicies.forEach(function(device) {
		var jsDir = './js/' + device + '/';
		
		if (!fs.existsSync(jsDir)) return;
		
		var dirs = fs.readdirSync(jsDir);
		dirs.forEach(function(dir) {
			var path = jsDir + dir + '/index.js';
			
			if (fs.existsSync(path)) {
				config.entry[device + '/' + dir] = path;
				return;
			}
		});
	});
	
	gulp.src('./js/')
		.pipe(plumber())
		.pipe(webpackStream(config))
		.pipe(gulp.dest('../public/js/'))
		.on('end', function() {
			callback();
		});
		
		if (config.watch) {
			callback();
		}
});