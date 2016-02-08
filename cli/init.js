var shell = require('shelljs');
var clc = require('cli-color');
var shell = require('shelljs');
var Promise = require('bluebird');
var resolve = require('resolve');
var join = require('path').join;
var fs = require('fs');

Promise.promisifyAll(fs);

var configure = require('./configure');
var downloadBoilerplate = require('./download-boilerplate');
var copyBoilerplate = require('./copy-boilerplate');
var scaffold = require('./scaffold.js');
var yesOrNo = require('./promptAsync.js').yesOrNo;
var clean = require('./clean.js');

var APP_ROOT = require('app-root-path').toString();
var CONFIG_PATH = join(APP_ROOT,'./mkapp_config.json');



function promptSrcOverwrite(srcDirectory){
	return new Promise(function(resolve,reject){
		if(shell.test('-d',join(APP_ROOT,srcDirectory))){
			process.stdout.write('\x07');
			logAlert('Your source directory ('+srcDirectory+') isn\'t empty, do you want to overwrite it?');
			return yesOrNo('Overwrite?'.yellow,'N')
			.then(resolve)
			.catch(function(){
				reject('SKIP');
			});
		} else {
			resolve();
		}
	});
}


module.exports = function mkappInit(version){
	console.log(clc.bold('Welcome to mkapp! This will walk you through project setup'));

	var config = {};

	return configure()
	.then(function(){
		return fs.readFileAsync(CONFIG_PATH,'utf-8');
	})
	.then(function(data){
		config = JSON.parse(data);
	})
	.then(function(){
		return promptSrcOverwrite(config.SRC_DIR);
	})
	.then(function(){
		return clean(config.SRC_DIR,true)
	})
	/*
	.then(function(){
		return scaffold(config.SRC_DIR,config.CREATE_ADMIN_APP);
	})
	*/
	.then(function(){
		var getBoilerplate;
		try{
			// local node_modules/mkapp, copy from installed mkapp package
			var localMkapp = require( resolve.sync('mkapp',{basedir: process.cwd()}) );
			getBoilerplate = copyBoilerplate;
		}catch(err){
			console.log('no local mkapp?)');
			// mkapp should be installed locally to work correctly
			// no local node_modules/mkapp, download boilerplate from github and check version matches global installed mkapp
			getBoilerplate = downloadBoilerplate;
		}
		return getBoilerplate(config.SRC_DIR,version);
	})
	.catch(function(err){
		if(err !== 'SKIP') return Promise.reject(err);
	})
	.then(function(){
		logSuccess('App setup complete!');
		console.log(clc.green('Review the mkapp_config.json file, then type ') + clc.white.bgGreen(' mkapp dev '))
	})
	.catch(function(err){
		if(err === 'ABORT'){
			console.log('Setup Canceled');
		}else{
			logError(err);
		}
	});
}



function logError(err){
	console.log(clc.red('An error occurred initializing app. Error: ' + err));
}

function logSuccess(msg){
	console.log(clc.green(msg));
}

function logAlert(msg){
	console.log(clc.yellow(msg));
}
