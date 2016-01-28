var opener = require('opener');
var Promise = require('bluebird');
var clc = require('cli-color');
var fs = require('fs');
var child_process = require('child_process');
var join = require('path').join;

var DEV_CONTEXT = 'dev';
var nullObject = Object.create(null);

Promise.promisifyAll(fs);

module.exports = function dev(){

	var config = require('./parse-config')();

	var lint = require('./lint');
	var scaffoldDev = require('./scaffold').bind(nullObject,config.DEV_DIR,config.CREATE_ADMIN_APP);
	var lessDev = require('./lessCSS').bind(nullObject,DEV_CONTEXT);
	var copyDev = require('./copy').bind(nullObject,DEV_CONTEXT);
	var transpileDev = require('./transpile').bind(nullObject,DEV_CONTEXT);
	var watch = require('./watch');
	var serveDev = require('./serve-dev');
	var openBrowser = function(){
		opener('http://localhost:'+config.PORT+'/app');
		if(config.CREATE_ADMIN_APP) opener('http://localhost:'+config.PORT+'/admin');
	};

	return lint(config.SRC_DIR)
		.then(scaffoldDev)
		.then(lessDev)
		.then(copyDev)
		.then(transpileDev)
		.then(watch)
		.then(serveDev)
		.then(openBrowser);
};
