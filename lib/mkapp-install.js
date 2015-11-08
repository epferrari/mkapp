var clc = require('cli-color');
var boilerplate = require('./boilerplate.js');
var installDeps = require('./install-deps.js');

module.exports = function mkappInstall(){
	return installDeps()
	.then(boilerplate)
	.then(function(){
		console.log(clc.green("Ready for develoment! To begin type ") + clc.white.bgGreen(' mkapp go '));
	})
	.catch(function(err){
		console.log(clc.red(err));
	});
};
