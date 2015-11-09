var Promise = require('bluebird');
var fs = require('fs-extra');
var clc = require('cli-color');
var join = require('path').join;
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var envify = require('envify');

Promise.promisifyAll(fs,{context: fs});

var lint = require('./lint.js');
var constants = require('./constants.js');
var __dev = constants.__dev;
var __src = constants.__src;

function watch(dest){
	return new Promise(function(resolve,reject){

		var outfile = join(__dev,dest,"/bundle.js");
		var opts = {
			entries:[join(__src,dest,"/index.jsx")],
			extensions: ['.js','.jsx'],
			cache:{},
			packageCache:{}
		};

		var babelifyOptions = {
			presets: ["es2015","react"],
			plugins: ["transform-es2015-modules-commonjs"]
		};

		var bundler = browserify(opts);

		// setup browserify with plugins and transforms
		bundler.transform(babelify,babelifyOptions);
		//bundler.transform(require('reactify'));
		bundler.transform(envify);
		bundler.plugin(watchify);
		bundler.on('update',rebundle);



		// run linting again before re-bundling files
		function rebundle(){
			console.log("a javascript file changed!");
			return lint(join(__src,dest))
				.then(function(){
					return fs.ensureFileAsync(outfile)
				})
				.then(bundle);
		}

		function bundle(){
			return new Promise(function(resolve,reject){

				console.log('bundling javascript files for '+dest);

				var stream = bundler.bundle();

				stream.pipe(fs.createWriteStream(outfile));

				stream.on('end',function(){
					var msg = "created javascript bundle for "+dest;
					console.log(clc.green(msg));
					resolve();
				});

				stream.on('error',function(err){
					var msg = "An error occured bundling "+dest;
					console.error(clc.red(msg));
					reject(err);
				});
			});
		}

		// initial bundle
		return fs.ensureFileAsync(outfile)
		.then(bundle)
		.then(resolve)
		.catch(reject);

	});
}

function watchJS(){
	console.log('This next bit takes awhile. You should have gotten a snack.');
	return Promise.all([
		watch('admin'),
		watch('client')
	]);
}

module.exports = watchJS;
