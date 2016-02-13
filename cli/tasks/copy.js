var fs = require('fs-extra');
var join = require('path').join;
var Promise = require('bluebird');
var clc = require('cli-color');
var APP_ROOT = require('app-root-path').toString();
var shell = require('shelljs');

Promise.promisifyAll(fs);

module.exports = function copy(context){

	var $$ = require('../utilities/parse-config')();
	var SRC_DIR = $$.SRC_DIR;
	var DEV_DIR = $$.DEV_DIR;
	var DIST_DIR = $$.DIST_DIR;

	if(context === 'dev'){
		targetDir = DEV_DIR;
	} else if(context === 'dist'){
		targetDir = DIST_DIR;
	} else {
		return contextError();
	}

	function copyGlobalFiles(scope,assetType,assetDirName){
		console.log('copying global '+assetType+' to '+scope+'/assets/'+assetDirName);

		var globalAssetPath = join(APP_ROOT,SRC_DIR,'assets',assetDirName);

		return fs.ensureDirAsync(globalAssetPath)
			.then(function(){
				return new Promise(function(resolve,reject){

					var localTargetDir = join(APP_ROOT,targetDir,scope,'assets',assetDirName);
					var copyFiles = shell.cp('-Rf',join(globalAssetPath,'*'),localTargetDir);

					if(!copyFiles || copyFiles && copyFiles.code !== 0){
						console.log(clc.green('successfully copied global '+assetType+' to '+scope));
						resolve();
					}else{
						reject('Could not copy global '+assetType+' to '+scope+'. Reason: '+copyFiles);
					}
				});
			});
	}

	function copyLocalFiles(scope){
		console.log('copying local static files and assets to '+scope)
		return Promise.all([
			fs.copyAsync(join(APP_ROOT,SRC_DIR,scope,'index.html'),join(APP_ROOT,targetDir,scope,'index.html')),
			fs.copyAsync(join(APP_ROOT,SRC_DIR,scope,'assets'),join(APP_ROOT,targetDir,scope,'assets'))
		]);
	}

	function copyAllFiles(scope){
		return Promise.all([
			copyGlobalFiles(scope,'fonts','fonts'),
			copyGlobalFiles(scope,'images','img'),
			copyLocalFiles(scope)
		]);
	}

	return Promise.all([
		copyAllFiles('public'),
		($$.CREATE_ADMIN_APP ? copyAllFiles('admin') : Promise.resolve())
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
