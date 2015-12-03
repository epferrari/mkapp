var opener = require('opener');
var Promise = require('bluebird');
var clc = require('cli-color');
var fs = require('fs');

var lint = require('./lint.js');
var clean = require('./mkapp-clean.js');
var scaffold = require('./scaffold.js');
var compileCSS = require('./less-compile.js');
var watchClientJS = require('./watch-clients-js.js');
var watchServerJS = require('./watch-server-js.js');
var copy = require('./copy-statics.js');
var transpile = require('./mkapp-transpile.js');
var serveDev = require('./serve-dev.js');
var child_process = require('child_process');

Promise.promisifyAll(fs);

module.exports = function go(){

	var PORT = process.env.PORT||3030;

	lint("./src")
	.then(function(){
		return scaffold();
	})
	.then(compileCSS)
	.then(watchClientJS)
	.then(function(){
		return copy();
	})
	.then(function(){
		return transpile('dev');
	})
	.then(watchServerJS)
	.then(serveDev)
	.then(function(){
		opener('http://localhost:'+PORT+'/admin');
		opener('http://localhost:'+PORT+'/app');
	})
	.catch(function(err){
		console.log(clc.red.bold('Zoiks, something went horribly wrong. Better fetch a bucket...'));
		console.log(clc.red(err));
	});
};
