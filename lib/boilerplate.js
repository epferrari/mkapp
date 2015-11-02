var Promise = require('bluebird');
var clc = require('cli-color');
var __src = require('./constants.js').__src;

var promisify = Promise.promisify;
var ncp = promisify(require('ncp').ncp);

module.exports = function boilerplate(){
	console.log('unpacking boilerplate files from package...');
	ncp('./node_modules/mkapp/boilerplate',__src)
	.then(function(){
		var msg = "Copied boilerplate app from package";
		console.log(clc.green(msg));
		console.log(clc.green.bold("Ready for develoment!"));
	})
	.catch(function(err){
		var msg = "An error occured copying boilerplate app. "+ err;
		console.log(clc.red.bold(msg));
	});
};
