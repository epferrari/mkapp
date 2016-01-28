var fs = require('fs-extra');
var join = require('path').join;
var Promise = require('bluebird');
var clc = require('cli-color');
var APP_ROOT = require('app-root-path').toString();

Promise.promisifyAll(fs);

module.exports = function copy(context){

	var config = require('./parse-config')();
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

	function copyFiles(scope){
		console.log('copying '+scope+' static files to '+targetDir);
		return Promise.all([
			fs.copyAsync(join(APP_ROOT,SRC_DIR,scope,'index.html'),join(APP_ROOT,targetDir,scope,'index.html')),
			fs.copyAsync(join(APP_ROOT,SRC_DIR,scope,'assets'),join(APP_ROOT,targetDir,scope,'assets'))
		]);
	}

	return Promise.all([
		copyFiles('public'),
		(config.CREATE_ADMIN_APP ? copyFiles('admin') : Promise.resolve())
	])
	.then(function(){
		console.log(clc.green('Successfully copied static assets'));
	})
	.catch(function(err){
		var msg = "An error occured copying static files.";
		console.log(clc.red(msg));
		return Promise.reject(err);
	});
}

function contextError(){
	return Promise.reject('Error: Invalid context argument passed to `copy`. Valid arguments are are "dev" and "dist"');
}
