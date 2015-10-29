var Promise = require('bluebird');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var clc = require('cli-color');

var lint = require('./lint.js');
var constants = require('./constants.js');
var __dev = constants.__dev;
var __src = constants.__src;

function watch(dest){
	return new Promise(function(resolve,reject){

		var outfile = __dev+"/"+dest+"/bundle.js";
		var b = browserify({
			entries:[__src+"/"+dest+"/index.jsx"],
			cache:{},
			packageCache:{}
		});

		b.transform('babelify');
		b.transform('reactify');
		b.plugin(watchify);

		b.on('update',handleUpdate);

		bundle().then(resolve).catch(reject);

		// run linting again before bundling files
		function handleUpdate(){
			console.log("a javascript file changed!");
			return lint(__src+"/"+dest).then(bundle);
		}


		function bundle(){
			return new Promise(function(resolve,reject){

				console.log('bundling javascript files for '+dest);
				var bundler = b.bundle().pipe(fs.createWriteStream(outfile));

				bundler.on('finish',function(){
					var msg = "created javascript bundle for "+dest;
					console.log(clc.green(msg));
					resolve();
				});

				bundler.on('error',function(err){
					var msg = "An error occured bundling "+dest;
					console.error(clc.red(msg));
					reject();
				});

			});
		}
	});
}

function watchJS(){
	return Promise.all([
		watch('admin'),
		watch('client')
	]);
}

module.exports = watchJS;
