var Promise = require('bluebird');
var fs = require('fs-extra');
var clc = require('cli-color');
var yesOrNo = require('../utilities/promptAsync').yesOrNo;
var APP_ROOT = require('app-root-path').toString();
var join = require('path').join;
var shell = require('shelljs');

Promise.promisifyAll(fs);

module.exports = clean;

function clean(path,silent){
	var absPath = join(APP_ROOT,path);
	var $home = shell.exec('echo ~/').output.replace('\n','');

	if(path == $home || absPath == $home){
		return Promise.reject('Poor life decision. mkapp wants no part of this madness');
	}
	if(!path || !path.length || ['./','.','/'].indexOf(path) !== -1){
		return Promise.reject('mkapp will not delete your project root');
	}
	if(/^\.{2}\/?.*/.test(path)){
		return Promise.reject('mkapp will not delete files outside your project');
	}

	return (silent ? Promise.resolve : areYouSure)(absPath)
	.then(function(){
		return fs.emptyDirAsync(absPath);
	})
	.then(function(){
		var msg = "Cleaned directory "+absPath;
		logSuccess(msg);
	})
	.catch(function(err){
		var msg = "Could not clean directory: "+absPath;
		var reason = "Error: "+err;
		logError(msg);
		return Promise.reject(reason);
	});
}


function areYouSure(path){
	return new Promise(function(resolve,reject){
		process.stdout.write('\x07');
		logAlert('Are you sure you want to delete the contents of '+path+'? This can\'t be undone');
		yesOrNo('Overwrite?'.yellow,'N')
		.then(resolve)
		.catch(function(){
			console.log('did not clean directory');
		});
	});
}

function logError(err){
	console.log(clc.red(err));
}

function logSuccess(msg){
	console.log(clc.green(msg));
}

function logAlert(msg){
	console.log(clc.yellow(msg));
}
