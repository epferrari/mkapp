var opener = require('opener');
var Promise = require('bluebird');
var clc = require('cli-color');
var fs = require('fs');
var child_process = require('child_process');
var join = require('path').join;

var DEV_CONTEXT = 'dev';
var nullO = Object.create(null);

Promise.promisifyAll(fs);

module.exports = function dev(){

	var config = require('./parse-config')();

	var scaffoldOptions = {
		dest: config.DEV_DIR,
		createAdmin: config.CREATE_ADMIN_APP
	};


	var lint = require('./lint');
	var scaffoldDev = require('./scaffold/build').bind(nullO,scaffoldOptions);
	var lessDev = require('./lessCSS').bind(nullO,DEV_CONTEXT);
	var copyDev = require('./copy').bind(nullO,DEV_CONTEXT);
	var transpileDev = require('./transpile').bind(nullO,DEV_CONTEXT);
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
