var fs = require('fs-extra');
var join = require('path').join;
var Promise = require('bluebird');
var clc = require('cli-color');
var __src = require('./constants.js').__src;

Promise.promisifyAll(fs);

function copyStatics(dest){
	console.log('copying static files to '+dest);
	console.log('copying admin files...');
	return fs.copyAsync(join(__src,'admin/index.html'),join(dest,'admin/index.html'))
	.then(function(){
		return fs.copyAsync(join(__src,'admin/assets'),join(dest,'admin/assets'));
	})
	.then(function(){
		console.log('copying client files...');
		return fs.copyAsync(join(__src,'client/index.html'),join(dest,'client/index.html'));
	})
	.then(function(){
		return fs.copyAsync(join(__src,'client/assets'),join(dest,'client/assets'));
	})
	.then(function(){
		console.log(clc.green('Successfully copied static assets'));
	})
	.catch(function(err){
		var msg = "An error occured copying static files.";
		console.log(clc.red(msg));
		console.log(clc.red('Error: '+err));
	});
}

module.exports = copyStatics;
