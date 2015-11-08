var Promise = require('bluebird');
var clc = require('cli-color');
var __src = require('./constants.js').__src;

var ncp = Promise.promisify(require('ncp').ncp);

module.exports = function boilerplate(){
	console.log('unpacking boilerplate files from package...');
	return ncp('./node_modules/mkapp/boilerplate',__src)
	.then(function(){
		var msg = "Copied boilerplate app from package";
		console.log(clc.green(msg));
	})
	.catch(function(err){
		var msg = "An error occured copying boilerplate app. "+ err;
		return Promise.reject(msg);
	});
};
