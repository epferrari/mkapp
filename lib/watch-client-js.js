var Promise = require('bluebird');
var fs = require('fs-extra');
var browserify = require('browserify');
var watchify = require('watchify');
var clc = require('cli-color');
var join = require('path').join;


Promise.promisifyAll(fs,{context: fs});

var lint = require('./lint.js');
var constants = require('./constants.js');
var __dev = constants.__dev;
var __src = constants.__src;

function watch(dest){
	return new Promise(function(resolve,reject){

		var outfile = join(__dev,dest,"/bundle.js");
		var b = browserify({
			entries:[join(__src,dest,"/index.jsx")],
			cache:{},
			packageCache:{}
		});

		// setup browserify with plugins and transforms
		b.transform(require('babelify'));
		b.transform(require('reactify'));
		b.transform(require('envify'));
		b.plugin(watchify);
		b.on('update',handleUpdate);

		// initial bundle
		fs.ensureFileAsync(outfile)
		.then(bundle)
		.then(resolve)
		.catch(reject);

		// run linting again before re-bundling files
		function handleUpdate(){
			console.log("a javascript file changed!");
			return lint(join(__src,dest))
				.then(function(){
					return fs.ensureFileAsync(join(__src,dest,"bundle.js"))
				})
				.then(bundle);
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
					reject(err);
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
