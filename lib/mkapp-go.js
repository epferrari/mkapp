var opener = require('opener');
var Promise = require('bluebird');
var clc = require('cli-color');
var fs = require('fs');

var lint = require('./lint.js');
var clean = require('./mkapp-clean.js');
var scaffold = require('./scaffold.js');
var compileCSS = require('./less-compile.js');
var watchJS = require('./watchJS.js');
var copy = require('./copy-statics.js');
var transpile = require('./transpile.js');
var startNodemon = require('./startNodemon.js');


Promise.promisifyAll(fs);

module.exports = function go(port){
	lint("./src")
	.then(function(){
		return scaffold();
	})
	.then(compileCSS)
	.then(watchJS)
	.then(function(){
		return copy();
	})
	.then(function(){
		return transpile('dev');
	})
	.then(startNodemon)
	.then(function(){
		opener('http://localhost:'+port+'/admin');
		opener('http://localhost:'+port+'/app');
	})
	.catch(function(err){
		console.log(clc.red.bold('FAIL!!!!'));
		console.log(clc.red(err));
	});
};
