var fs = require('fs-extra');
var join = require('path').join;
var Promise = require('bluebird');
var clc = require('cli-color');
var APP_ROOT = require('app-root-path').toString();
var config = require(APP_ROOT + '/mkapp_config.json');

var SRC_DIR = config.SRC_DIR;
var DIST_DIR = config.DIST_DIR;
var DEV_DIR = config.DEV_DIR;

Promise.promisifyAll(fs);

module.exports = function copy(){
	var targetDir = (process.env.NODE_ENV === 'production') ? DIST_DIR : DEV_DIR;

	console.log('copying static files to '+targetDir);

	console.log('copying admin files...');
	return fs.copyAsync(join(APP_ROOT,SRC_DIR,'admin/index.html'),join(APP_ROOT,targetDir,'admin/index.html'))
	.then(function(){
		return fs.copyAsync(join(APP_ROOT,SRC_DIR,'admin/assets'),join(APP_ROOT,targetDir,'admin/assets'));
	})
	.then(function(){
		console.log('copying public files...');
		return fs.copyAsync(join(APP_ROOT,SRC_DIR,'public/index.html'),join(APP_ROOT,targetDir,'public/index.html'));
	})
	.then(function(){
		return fs.copyAsync(join(APP_ROOT,SRC_DIR,'public/assets'),join(APP_ROOT,targetDir,'public/assets'));
	})
	.then(function(){
		console.log(clc.green('Successfully copied static assets'));
	})
	.catch(function(err){
		var msg = "An error occured copying static files.";
		console.log(clc.red(msg));
		return Promise.reject(err);
	});
}
