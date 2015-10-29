var Promise = require('bluebird');
var clc = require('cli-color');
var opener = require('opener');

var lint = require('../lib/lint.js');
var startNodemon = require('../lib/startNodemon.js');
var watchJS = require('../lib/watchJS.js');
var transpile = require('../lib/transpile.js');

function go(port){
	lint("./src")
	.then(watchJS)
	.then(function(){
		return transpile('dev');
	})
	.then(startNodemon)
	.then(function(){
		opener('http://localhost:'+port+'/admin');
		opener('http://localhost:'+port+'/app');
	})
	.catch(function(err){
		console.log(clc.red.bold('Erroneous!'));
		console.log(clc.red(err));
	});
}

go(3030);
