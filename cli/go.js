var opener = require('opener');
var Promise = require('bluebird');
var clc = require('cli-color');
var fs = require('fs');
var child_process = require('child_process');
var join = require('path').join;

var APP_ROOT = require('app-root-path').toString();
var CONFIG_PATH = join(APP_ROOT,'/mkapp_config.json');
var config = require(CONFIG_PATH);

var lint = require('./lint');
var clean = require('./clean');
var scaffoldDev = require('./scaffold').bind(Object.create(null),config.DEV_DIR);
var lessDev = require('./lessCSS').bind(Object.create(null),'dev');
var copy = require('./copy');
var watch = require('./watch');
var transpileDev = require('./transpile').bind(Object.create(null),'dev');
var serveDev = require('./serve-dev');

Promise.promisifyAll(fs);

module.exports = function dev(){

	if(!config.PORT){
		return Promise.reject("ERROR: could not find valid PORT configuration in mkapp_config.json");
	}

	return lint(config.SRC_DIR)
		.then(scaffoldDev)
		.then(lessDev)
		.then(copy)
		.then(transpileDev)
		.then(watch)
		.then(serveDev)
		.then(function(){
			opener('http://localhost:'+config.PORT+'/admin');
			opener('http://localhost:'+config.PORT+'/app');
		});
};
