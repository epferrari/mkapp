var Promise = require('bluebird');
var babel = require('babel-core');
var glob = require('glob');
var flatten = require('lodash').flatten;
var fs = require('fs-extra');
var clc = require('cli-color');
var join = require('path').join;
var APP_ROOT = require('app-root-path').toString();


var globAsync = Promise.promisify(glob);
Promise.promisifyAll(fs,{context:fs});


function transformFileAsync(file){
	var babelOptions = {
		presets: ['es2015'],
		plugins: ['transform-es2015-modules-commonjs']
	};
	return Promise.promisify(babel.transformFile,{context:babel})(file,babelOptions);
}


module.exports = transpile;

/**
*
* @param {string} context One of ['dev','dist']
* @returns {Promise}
*/
function transpile(context){

	var config = require('../utilities/parse-config')();
	var SRC_DIR = config.SRC_DIR;
	var DEV_DIR = config.DEV_DIR;
	var DIST_DIR = config.DIST_DIR;

	if(context === 'dev'){
		targetDir = DEV_DIR;
	} else if(context === 'dist'){
		targetDir = DIST_DIR;
	} else {
		return contextError();
	}

	console.log('transpiling server javascript for %s into %s',context,targetDir);

	return Promise.all([
		globAsync( join(APP_ROOT,SRC_DIR,'/server/api/**/*.js') ),
		globAsync( join(APP_ROOT,SRC_DIR,'/condux/**/*.js') ),
		globAsync( join(APP_ROOT,SRC_DIR,'/middleware/**/*.js') ),
		globAsync( join(APP_ROOT,SRC_DIR,'/utils/**/*.js') )
	])
	.then(function(files){
		return flatten(files,true);
	})
	.map(function(fileName){
		var s = SRC_DIR.replace(/^(\.\/)(.*)$/,'$2');
		var d = targetDir.replace(/^(\.\/)(.*)$/,'$2');
		var outfile = fileName.replace(s,d);
		var transformed = transformFileAsync(fileName); // babelified file
		var ensured = fs.ensureFileAsync(outfile);

		return Promise.join(outfile,transformed,ensured,function(outfile,transformed){
			return {
				dest: outfile,
				contents: transformed.code
			};
		});
	})
	.map(function(file){
		return fs.writeFileAsync(file.dest,file.contents);
	})
	.then(function(){
		return transformFileAsync( join(APP_ROOT,SRC_DIR,'/server/index.js') );
	})
	.then(function(result){
		return fs.writeFileAsync(join(APP_ROOT,targetDir,"/server/index.js"),result.code);
	})
	.then(function(){
		var msg = 'transpilation complete!';
		console.log(clc.green(msg));
	});
}

function contextError(){
	return Promise.reject('Error: Invalid context argument passed to `transpile`. Valid arguments are are "dev" and "dist"');
}
