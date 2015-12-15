var shell = require('shelljs');
var clc = require('cli-color');
var shell = require('shelljs');
var Promise = require('bluebird');
var resolve = require('resolve');

var downloadBoilerplate = require('./download-boilerplate');
var copyBoilerplate = require('./copy-boilerplate');

var scaffold = require('./scaffold.js');
var yesOrNo = require('./promptAsync.js').yesOrNo;


function promptSrcOverwrite(resolve,reject){

	if(shell.test('-d','./src')){
		process.stdout.write('\x07');
		logAlert('Your src directory isn\'t empty, do you want to overwrite it?');
		return yesOrNo('Overwrite?'.yellow,'N')
		.then(resolve)
		.catch(function(){
			reject('SKIP');
		});
	} else {
		resolve();
	}
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


module.exports = function mkappInit(version){
	console.log(clc.bold('Welcome to mkapp! This will walk you through project setup'));

	return new Promise(promptSrcOverwrite)
	.then(function(){
		return scaffold('./src');
	})
	.then(function(){
		var boilerplate;
		console.log(process.cwd());
		try{
			// local node_modules/mkapp, copy from installed mkapp package
			var localMkapp = require( resolve.sync('mkapp',{basedir: process.cwd()}) );
			boilerplate = copyBoilerplate;
		}catch(err){
			console.log(err);
			console.log('no local mkapp?)');
			// no local node_modules/mkapp, download boilerplate from github and check version matches globally installed mkapp
			boilerplate = downloadBoilerplate;
		}
		return boilerplate(version);
	})
	.catch(function(err){
		if(err !== 'SKIP') return Promise.reject(err);
	})
	.then(function(){
		logSuccess('App setup complete!');
		if(!shell.test('-f','./mkapp_config.json')) {
			process.stdout.write('\x07');
			logAlert("Don't forget to create a mkapp_config.json at your project root");
		}else{
			console.log(clc.green('Review the mkapp_config.json file, then type ') + clc.white.bgGreen(' mkapp go '))
		}
	})
	.catch(function(err){
		if(err === 'ABORT'){
			console.log('Setup Canceled');
		}else{
			logError(err);
		}
	});
}
