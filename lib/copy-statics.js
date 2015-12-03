var fs = require('fs-extra');
var join = require('path').join;
var Promise = require('bluebird');
var clc = require('cli-color');

var constants = require('./constants.js');
var __src = constants.__src;
var __dist = constants.__dist;
var __dev = constants.__dev;

Promise.promisifyAll(fs);

module.exports = copyStatics;


function copyStatics(){
	var root = (process.env.NODE_ENV === 'production') ? __dist : __dev;

	console.log('copying static files to '+root);
	console.log('copying admin files...');

	return fs.copyAsync(join(__src,'admin/index.html'),join(root,'admin/index.html'))
	.then(function(){
		return fs.copyAsync(join(__src,'admin/assets'),join(root,'admin/assets'));
	})
	.then(function(){
		console.log('copying public files...');
		return fs.copyAsync(join(__src,'public/index.html'),join(root,'public/index.html'));
	})
	.then(function(){
		return fs.copyAsync(join(__src,'public/assets'),join(root,'public/assets'));
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
