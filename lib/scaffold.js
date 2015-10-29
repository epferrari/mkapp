var Promise = require('bluebird');
var clc = require('cli-color');

var promisify = Promise.promisify;
var ncp = promisify(require('ncp').ncp);

module.exports = function scaffold(){
	console.log('Scaffolding application. Here we go!');
	ncp('./node_modules/mkapp/boilerplate','./src')
	.then(function(){
		var msg = "Copied boilerplate app from package";
		console.log(clc.green.bold(msg));
	})
	.catch(function(err){
		var msg = "An error occured copying boilerplate app. "+ err;
		console.log(clc.red.bold(msg));
	});
};
