var Promise = require('bluebird');
var fs = require('fs-extra');
var clc = require('cli-color');
var yesOrNo = require('./promptAsync').yesOrNo;
var APP_ROOT = require('app-root-path').toString();
var join = require('path').join;

Promise.promisifyAll(fs);

module.exports = clean;

function clean(path,silent){

	var absPath = join(APP_ROOT,path);
	return (silent ? Promise.resolve : areYouSure)(path)
	.then(function(){
		return fs.emptyDirAsync(absPath);
	})
	.then(function(){
		var msg = "Cleaned directory "+path;
		logSuccess(msg);
	})
	.catch(function(err){
		var msg = "Could not clean directory: "+path;
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
