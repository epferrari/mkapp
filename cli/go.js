var opener = require('opener');
var Promise = require('bluebird');
var clc = require('cli-color');
var fs = require('fs');
var child_process = require('child_process');
var resolve = require('resolve');

var lint = require('./lint');
var clean = require('./clean');
var scaffold = require('./scaffold');
var lessCSS = require('./lessCSS');
var copy = require('./copy');
var watch = require('./watch');
var transpileDev = require('./transpile').bind(Object.create(null),'dev');
var serveDev = require('./serve-dev');

Promise.promisifyAll(fs);

module.exports = function go(){

	/* ensure a mkapp_config.json */
	try {
		var config = require(resolve.sync('./mkapp_config.json',{basedir: process.cwd()}));
	}catch(err){
		return Promise.reject("ERROR: could not find local mkapp_config.json at project root.");
	}

	if(!config.PORT){
		return Promise.reject("ERROR: could not find valid PORT configuration in mkapp_config.json");
	}

	return lint("./src")
	.then(scaffold)
	.then(lessCSS)
	.then(copy)
	.then(transpileDev)
	.then(watch)
	.then(serveDev)
	.then(function(){
		opener('http://localhost:'+config.PORT+'/admin');
		opener('http://localhost:'+config.PORT+'/app');
	});
};
