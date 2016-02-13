var shell = require('shelljs');
var Promise = require('bluebird');
var clc = require('cli-color');
var yesOrNo = require('../promptAsync').yesOrNo;
var fs = require('fs');
var join = require('path').join;
var APP_ROOT = require('app-root-path').toString();

Promise.promisifyAll(fs);


module.exports = function copyProjectFiles($path){
	var installDir = join(APP_ROOT,$path);
	return new Promise(function(resolve,reject){
		console.log('copying boilerplate files from local mkapp package...');

		var pathToBoilerplate = join(APP_ROOT,'./node_modules/mkapp/boilerplate/*');
		var copiedFiles = shell.cp('-R',pathToBoilerplate,installDir);

		if(copiedFiles && copiedFiles.code !== 0){
			reject('could not copy boilerplate files from local mkapp package.');
		}else{
			console.log(clc.green('boilerplate project files copied to `'+$path+'` directory'));
			resolve();
		}
	});
}
