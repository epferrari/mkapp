var Promise = require('bluebird');
var fs = require('fs-extra');
var clc = require('cli-color');
var join = require('path').join;
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var envify = require('envify');
var APP_ROOT = require('app-root-path').toString();


Promise.promisifyAll(fs,{context: fs});

var lint = require('./lint');



module.exports = bundler;

/**
* @param {string} context One of ['public','admin']
* @param {function} [onUpdate] callback for watchify
* @returns {function} bundle
*/
function bundler(context,onUpdate){
	if(["admin","public"].indexOf(context) === -1) return contextError;

	var config = require(APP_ROOT+'/mkapp_config.json');
	var DEV_DIR = config.DEV_DIR;
	var SRC_DIR = config.SRC_DIR;

	var outfile = join(APP_ROOT,DEV_DIR,context,"/bundle.js");
	var opts = {
		entries:[join(APP_ROOT,SRC_DIR,context,"/index.jsx")],
		extensions: ['.js','.jsx'],
		cache:{},
		packageCache:{}
	};

	var babelifyOptions = {
		presets: ["es2015","react"],
		plugins: ["transform-es2015-modules-commonjs"]
	};

	var b = browserify(opts);

	// setup browserify with plugins and transforms
	b.transform(babelify,babelifyOptions);
	b.transform(envify);
	b.plugin(watchify);

	if(onUpdate) b.on('update',onUpdate);

	function _bundle(){
		return new Promise(function(resolve,reject){

			console.log('bundling javascript files for '+context);

			var stream = b.bundle();

			stream.pipe(fs.createWriteStream(outfile));

			stream.on('end',function(){
				var msg = "created javascript bundle for "+context;
				console.log(clc.green(msg));
				resolve();
			});

			stream.on('error',function(err){
				var msg = "An error occured bundling "+context;
				console.error(clc.red(msg));
				reject(err);
			});
		});
	}

	function bundle(){
		return fs.ensureFileAsync(outfile)
		.then(_bundle);
	}

	return bundle;
}

function contextError(){
	return Promise.reject('Error: Invalid context argument passed to `bundler`. Valid arguments are are "admin" and "public"');
}
