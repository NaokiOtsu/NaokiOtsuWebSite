var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function(callback) {
	
	var devicies = ['pc', 'sp'];
	
	var spritePaths = [];
	devicies.forEach(function(device) {
		
		var imagesDir = './images/' + device + '/';
		
		if (!fs.existsSync(imagesDir)) return;
		
		var dirs = fs.readdirSync(imagesDir);
		dirs.forEach(function(dir) {
			var path = imagesDir + dir + '/sprite/';
			
			// ディレクトリでない時
			if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) return;
			
			var ds = fs.readdirSync(path);
			
			ds.forEach(function(d) {
				var p = path + d;
				
				if (!fs.statSync(p).isDirectory()) return;
				
				spritePaths.push(p + '/');
			});
		});
	});
	
	var l = spritePaths.length;
	if (!l) {
		callback();
		return;
	}
	
	var count = 0;
	spritePaths.forEach(function(path) {
		createSprite(path, function() {
			count++;
			if (count == l) {
				callback();
			}
		});
	});
});

function createSprite(dirPath, callback) {
	var destImageDir = '../public/';
	var destSassDir = './scss/';
	var fileName = path.basename(dirPath);
	
	// dest path
	var destImagePath = dirPath.replace('./', destImageDir).replace(fileName + '/', '');
	var destImageName = fileName + '.png';
	
	// sass出力先パス
	var destScssPath = dirPath.replace('./images/', destSassDir).replace(fileName + '/', '');
	var destScssName = '_' + fileName + '.scss';
	
	// css内の画像パス
	var imageCssPath = destImagePath.replace('../public', '') + destImageName;
	// imageCssPath = imageCssPath.replace('/images/', '../../');
	
	var spriteData = gulp.src(dirPath + '*.png').pipe(spritesmith({
		imgName: destImageName,
		cssName: destScssName,
		imgPath: imageCssPath,
		cssFormat: 'scss',
		padding: 4,
		cssOpts: {
			variableNameTransforms: []
		}
	}));
	
	spriteData.css.pipe(gulp.dest(destScssPath));
	spriteData.img.pipe(gulp.dest(destImagePath)).on('end', function() {
		console.log('created sprite : ', destImagePath + destImageName);
		callback();
	});
}
